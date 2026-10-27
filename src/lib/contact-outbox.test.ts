import assert from "node:assert/strict";
import { test } from "node:test";
import { dispatchContactSubmission, retryDueContactSubmissions } from "./contact-outbox.ts";

test("dispatches a pending inquiry with the production webhook timeout and records the result", async () => {
  const submissionId = "aabbccdd-1111-4222-8333-444455556666";
  const originalFetch = globalThis.fetch;
  const originalTimeout = AbortSignal.timeout;
  let configuredTimeout = 0;
  let webhookRequest: RequestInit | undefined;
  let finalState: unknown[] = [];

  const item = {
    submission_id: submissionId,
    submitted_at: "2026-10-27T12:00:37.061Z",
    name: "Test Contact",
    email: "test@example.invalid",
    company: null,
    service: "Not sure — I’ll describe the requirement",
    message: "TEST ONLY",
    industry_context: null,
    source_path: "/",
    retry_count: 1,
  };

  const database = {
    prepare(query: string) {
      return {
        bind(...values: unknown[]) {
          return {
            async all<T>() {
              if (query.includes("RETURNING submission_id, submitted_at")) {
                return { results: [item as T] };
              }
              if (query.includes("SET n8n_status = ?")) finalState = values;
              return { results: [] as T[] };
            },
          };
        },
      };
    },
  };

  try {
    Object.defineProperty(AbortSignal, "timeout", {
      configurable: true,
      value: (milliseconds: number) => {
        configuredTimeout = milliseconds;
        return new AbortController().signal;
      },
    });
    globalThis.fetch = async (_input, init) => {
      webhookRequest = init;
      return Response.json({ recorded: true, notificationStatus: "provider_accepted" });
    };

    await dispatchContactSubmission(
      {
        CONTACT_IDEMPOTENCY_DB: database,
        N8N_CONTACT_WEBHOOK_URL: "https://n8n.example.test/webhook/contact",
        N8N_CONTACT_WEBHOOK_TOKEN: "test-token",
      },
      submissionId,
    );

    assert.equal(configuredTimeout, 10_000);
    assert.equal(webhookRequest?.method, "POST");
    assert.equal(new Headers(webhookRequest?.headers).get("Idempotency-Key"), submissionId);
    assert.deepEqual(finalState, ["forwarded", 1, 1, 0, null, submissionId]);
  } finally {
    globalThis.fetch = originalFetch;
    Object.defineProperty(AbortSignal, "timeout", {
      configurable: true,
      value: originalTimeout,
    });
  }
});

test("scheduled retries replay recorded inquiries that still need a notification", async () => {
  const submissionId = "aabbccdd-1111-4222-8333-444455556667";
  const originalFetch = globalThis.fetch;
  const item = {
    submission_id: submissionId,
    submitted_at: "2026-10-27T12:00:37.061Z",
    name: "Test Contact",
    email: "test@example.invalid",
    company: null,
    service: "Test inquiry",
    message: "Clearly labeled test inquiry",
    industry_context: null,
    source_path: "/",
    retry_count: 1,
    notification_attempts: 0,
    notification_status: "not_verified",
    notification_next_retry_at: 0,
    notification_lease_expires_at: null,
  };
  const queries: string[] = [];
  let retryRequest: RequestInit | undefined;

  const database = {
    prepare(query: string) {
      queries.push(query);
      return {
        bind(..._values: unknown[]) {
          return {
            async all<T>() {
              if (
                query.includes("SELECT submission_id FROM contact_submissions") &&
                query.includes("notification_status IN")
              ) {
                return { results: [{ submission_id: submissionId }] as T[] };
              }
              if (query.includes("RETURNING submission_id, submitted_at, name, email, company")) {
                return { results: [item as T] };
              }
              return { results: [] as T[] };
            },
          };
        },
      };
    },
  };

  try {
    globalThis.fetch = async (_input, init) => {
      retryRequest = init;
      return Response.json({ recorded: true, notificationStatus: "not_verified" });
    };

    await retryDueContactSubmissions(
      {
        CONTACT_IDEMPOTENCY_DB: database,
        N8N_CONTACT_WEBHOOK_URL: "https://n8n.example.test/webhook/contact",
        N8N_CONTACT_WEBHOOK_TOKEN: "test-token",
      },
      1,
    );

    assert.equal(new Headers(retryRequest?.headers).get("X-NYG-Notification-Retry"), "1");
    assert.equal(new Headers(retryRequest?.headers).get("Idempotency-Key"), submissionId);
    assert.ok(
      queries.some((query) => query.includes("notification_status IN ('not_verified', 'failed')")),
    );
    assert.ok(queries.some((query) => query.includes("SET lease_expires_at = NULL")));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

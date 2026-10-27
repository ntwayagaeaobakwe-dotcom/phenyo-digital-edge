import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

type D1Result<T> = { results?: T[] };
type D1Database = {
  prepare: (query: string) => {
    bind: (...values: (string | number | null)[]) => {
      all: <T>() => Promise<D1Result<T>>;
    };
  };
};

type NotificationEnvironment = {
  CONTACT_IDEMPOTENCY_DB?: D1Database;
  CONTACT_IDEMPOTENCY_TOKEN?: string;
};

type RuntimeRequest = Request & {
  runtime?: { cloudflare?: { env?: NotificationEnvironment } };
};

const MAX_NOTIFICATION_ATTEMPTS = 5;
const NOTIFICATION_LEASE_SECONDS = 300;
const MAX_BODY_BYTES = 1024;
const bodySchema = z.discriminatedUnion("operation", [
  z.object({ operation: z.literal("claim"), submissionId: z.string().uuid() }).strict(),
  z
    .object({
      operation: z.literal("accepted"),
      submissionId: z.string().uuid(),
      attemptToken: z.string().uuid(),
    })
    .strict(),
  z
    .object({
      operation: z.literal("failed"),
      submissionId: z.string().uuid(),
      attemptToken: z.string().uuid(),
      errorCode: z.enum(["gmail_send_failed", "provider_unavailable"]),
    })
    .strict(),
]);

export const Route = createFileRoute("/api/contact/notification")({
  server: {
    handlers: {
      POST: async ({ request }) => handleNotificationRequest(request),
    },
  },
});

async function handleNotificationRequest(request: Request): Promise<Response> {
  const environment = (request as RuntimeRequest).runtime?.cloudflare?.env;
  const token = environment?.CONTACT_IDEMPOTENCY_TOKEN;
  const database = environment?.CONTACT_IDEMPOTENCY_DB;

  if (!token || !database) return jsonResponse({ error: "service_unavailable" }, 503);
  if (!safeTokenMatch(request.headers.get("authorization"), token)) {
    return jsonResponse({ error: "unauthorized" }, 401);
  }
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ error: "json_required" }, 415);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(await readBoundedBody(request, MAX_BODY_BYTES));
  } catch {
    return jsonResponse({ error: "invalid_request" }, 400);
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) return jsonResponse({ error: "invalid_request" }, 400);

  const { operation, submissionId } = parsed.data;
  const now = Math.floor(Date.now() / 1000);

  try {
    if (operation === "claim") {
      const attemptToken = crypto.randomUUID();
      const claimed = await database
        .prepare(
          `UPDATE contact_submissions
           SET notification_attempts = notification_attempts + 1,
               notification_lease_expires_at = ?,
               notification_lease_token = ?,
               notification_last_attempt_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
               updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
           WHERE submission_id = ?
             AND processing_state = 'accepted'
             AND sheets_status = 'recorded'
             AND notification_status IN ('not_verified', 'failed')
             AND notification_attempts < ?
             AND notification_next_retry_at <= ?
             AND (notification_lease_expires_at IS NULL OR notification_lease_expires_at < ?)
           RETURNING notification_attempts, notification_last_attempt_at`,
        )
        .bind(
          now + NOTIFICATION_LEASE_SECONDS,
          attemptToken,
          submissionId,
          MAX_NOTIFICATION_ATTEMPTS,
          now,
          now,
        )
        .all<{ notification_attempts: number; notification_last_attempt_at: string }>();

      const attempt = claimed.results?.[0];
      if (attempt) {
        return jsonResponse({
          claimed: true,
          submissionId,
          attemptToken,
          notificationAttempts: attempt.notification_attempts,
          lastNotificationAttempt: attempt.notification_last_attempt_at,
        });
      }

      const existing = await database
        .prepare(
          `SELECT notification_status, notification_attempts, notification_next_retry_at,
                  notification_lease_expires_at, sheets_status
           FROM contact_submissions WHERE submission_id = ?`,
        )
        .bind(submissionId)
        .all<{
          notification_status: string;
          notification_attempts: number;
          notification_next_retry_at: number;
          notification_lease_expires_at: number | null;
          sheets_status: string;
        }>();
      const state = existing.results?.[0];
      if (!state) return jsonResponse({ error: "submission_not_found" }, 404);
      if (state.notification_status === "provider_accepted") {
        return jsonResponse({
          claimed: false,
          notificationStatus: "provider_accepted",
          notificationAttempts: state.notification_attempts,
          submissionId,
        });
      }
      if (state.sheets_status !== "recorded") {
        return jsonResponse({ error: "inquiry_not_recorded" }, 409);
      }
      if (
        state.notification_status === "unavailable" ||
        state.notification_attempts >= MAX_NOTIFICATION_ATTEMPTS
      ) {
        return jsonResponse({
          claimed: false,
          notificationStatus: "unavailable",
          notificationAttempts: state.notification_attempts,
          submissionId,
        });
      }
      return jsonResponse(
        {
          claimed: false,
          retry: true,
          notificationStatus: state.notification_status,
          notificationAttempts: state.notification_attempts,
          nextRetryAt: state.notification_next_retry_at,
          leaseExpiresAt: state.notification_lease_expires_at,
          submissionId,
        },
        409,
      );
    }

    if (operation === "accepted") {
      const updated = await database
        .prepare(
          `UPDATE contact_submissions
           SET notification_status = 'provider_accepted',
               notification_next_retry_at = 0,
               notification_lease_expires_at = NULL,
               notification_lease_token = NULL,
               last_error = NULL,
               updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
           WHERE submission_id = ? AND notification_lease_token = ?
           RETURNING submission_id`,
        )
        .bind(submissionId, parsed.data.attemptToken)
        .all<{ submission_id: string }>();
      if (updated.results?.length) {
        return jsonResponse({
          updated: true,
          notificationStatus: "provider_accepted",
          submissionId,
        });
      }
      const alreadyAccepted = await database
        .prepare("SELECT notification_status FROM contact_submissions WHERE submission_id = ?")
        .bind(submissionId)
        .all<{ notification_status: string }>();
      if (alreadyAccepted.results?.[0]?.notification_status === "provider_accepted") {
        return jsonResponse({
          updated: false,
          notificationStatus: "provider_accepted",
          submissionId,
        });
      }
      return jsonResponse({ error: "notification_claim_expired" }, 409);
    }

    const failedAttempt = await database
      .prepare(
        "SELECT notification_attempts FROM contact_submissions WHERE submission_id = ? AND notification_lease_token = ?",
      )
      .bind(submissionId, parsed.data.attemptToken)
      .all<{ notification_attempts: number }>();
    const attemptCount = failedAttempt.results?.[0]?.notification_attempts;
    if (attemptCount === undefined) {
      return jsonResponse({ error: "notification_claim_expired" }, 409);
    }

    const unavailable = attemptCount >= MAX_NOTIFICATION_ATTEMPTS;
    const delaySeconds = Math.min(60 * 2 ** Math.max(attemptCount - 1, 0), 3_600);
    const updated = await database
      .prepare(
        `UPDATE contact_submissions
         SET notification_status = ?,
             notification_next_retry_at = ?,
             notification_lease_expires_at = NULL,
             notification_lease_token = NULL,
             last_error = ?,
             updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
         WHERE submission_id = ? AND notification_lease_token = ?
         RETURNING submission_id`,
      )
      .bind(
        unavailable ? "unavailable" : "failed",
        unavailable ? 0 : now + delaySeconds,
        parsed.data.errorCode,
        submissionId,
        parsed.data.attemptToken,
      )
      .all<{ submission_id: string }>();
    if (!updated.results?.length) return jsonResponse({ error: "notification_claim_expired" }, 409);
    return jsonResponse({
      updated: true,
      notificationStatus: unavailable ? "unavailable" : "failed",
      notificationAttempts: attemptCount,
      nextRetryAt: unavailable ? null : now + delaySeconds,
      submissionId,
    });
  } catch {
    console.error("Contact notification state request failed.");
    return jsonResponse({ error: "storage_unavailable" }, 503);
  }
}

function safeTokenMatch(header: string | null, token: string): boolean {
  if (!header?.startsWith("Bearer ")) return false;
  const candidate = header.slice(7);
  if (candidate.length !== token.length) return false;
  let difference = 0;
  for (let index = 0; index < token.length; index += 1) {
    difference |= candidate.charCodeAt(index) ^ token.charCodeAt(index);
  }
  return difference === 0;
}

async function readBoundedBody(request: Request, maximumBytes: number): Promise<string> {
  if (!request.body) throw new TypeError("Request body is missing");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maximumBytes) {
        await reader.cancel();
        throw new RangeError("Request body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

function jsonResponse(
  body: Record<string, string | number | boolean | null>,
  status = 200,
): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

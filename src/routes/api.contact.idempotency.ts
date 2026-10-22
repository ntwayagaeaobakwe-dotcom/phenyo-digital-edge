import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

type D1Result<T> = { results?: T[] };
type D1Database = {
  prepare: (query: string) => {
    bind: (...values: (string | number | null)[]) => {
      run: () => Promise<unknown>;
      all: <T>() => Promise<D1Result<T>>;
    };
  };
};

type IdempotencyEnvironment = {
  CONTACT_IDEMPOTENCY_DB?: D1Database;
  CONTACT_IDEMPOTENCY_TOKEN?: string;
};

type RuntimeRequest = Request & {
  runtime?: { cloudflare?: { env?: IdempotencyEnvironment } };
};

const bodySchema = z
  .object({
    operation: z.enum(["claim", "recorded", "release"]),
    submissionId: z.string().uuid(),
  })
  .strict();

const CLAIM_LEASE_SECONDS = 120;
const MAX_BODY_BYTES = 512;

export const Route = createFileRoute("/api/contact/idempotency")({
  server: {
    handlers: {
      POST: async ({ request }) => handleIdempotencyRequest(request),
    },
  },
});

async function handleIdempotencyRequest(request: Request): Promise<Response> {
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
    const body = await readBoundedBody(request, MAX_BODY_BYTES);
    payload = JSON.parse(body);
  } catch {
    return jsonResponse({ error: "invalid_request" }, 400);
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) return jsonResponse({ error: "invalid_request" }, 400);

  try {
    const { operation, submissionId } = parsed.data;

    if (operation === "claim") {
      const now = Math.floor(Date.now() / 1000);
      const leaseExpiresAt = now + CLAIM_LEASE_SECONDS;
      const claimed = await database
        .prepare(
          `INSERT INTO contact_idempotency (submission_id, state, lease_expires_at)
         VALUES (?, 'processing', ?)
         ON CONFLICT(submission_id) DO UPDATE SET
           state = 'processing',
           lease_expires_at = excluded.lease_expires_at,
           updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
         WHERE contact_idempotency.state = 'failed'
            OR (contact_idempotency.state = 'processing'
                AND contact_idempotency.lease_expires_at < ?)
         RETURNING submission_id`,
        )
        .bind(submissionId, leaseExpiresAt, now)
        .all<{ submission_id: string }>();

      if (claimed.results?.length) {
        return jsonResponse({ claimed: true, recorded: false, submissionId });
      }

      const existing = await database
        .prepare("SELECT state FROM contact_idempotency WHERE submission_id = ?")
        .bind(submissionId)
        .all<{ state: "processing" | "recorded" | "failed" }>();
      const state = existing.results?.[0]?.state;
      if (state === "recorded") {
        return jsonResponse({ claimed: false, recorded: true, submissionId });
      }
      if (state === "processing") {
        return jsonResponse({ claimed: false, recorded: false, retry: true, submissionId }, 409);
      }
      return jsonResponse({ error: "claim_failed" }, 503);
    }

    const state = operation === "recorded" ? "recorded" : "failed";
    const eligibleStates =
      operation === "release" ? "('processing', 'recorded')" : "('processing')";
    const updated = await database
      .prepare(
        `UPDATE contact_idempotency
       SET state = ?, lease_expires_at = NULL,
           updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
       WHERE submission_id = ? AND state IN ${eligibleStates}
       RETURNING submission_id`,
      )
      .bind(state, submissionId)
      .all<{ submission_id: string }>();

    if (!updated.results?.length && operation === "recorded") {
      const existing = await database
        .prepare("SELECT state FROM contact_idempotency WHERE submission_id = ?")
        .bind(submissionId)
        .all<{ state: "processing" | "recorded" | "failed" }>();
      if (existing.results?.[0]?.state === "recorded") {
        return jsonResponse({ updated: false, recorded: true, submissionId });
      }
    }

    if (!updated.results?.length) {
      return jsonResponse({ error: "submission_not_processing" }, 409);
    }
    return jsonResponse({ updated: true, recorded: state === "recorded", submissionId });
  } catch {
    console.error("Contact idempotency store request failed.");
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

async function readBoundedBody(request: Request, maxBytes: number): Promise<string> {
  if (!request.body) throw new TypeError("Request body is missing");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
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

function jsonResponse(body: Record<string, string | boolean>, status = 200): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

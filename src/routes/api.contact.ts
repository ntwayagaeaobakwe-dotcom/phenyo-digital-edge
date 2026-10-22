import { createFileRoute } from "@tanstack/react-router";
import { getRequestIP } from "@tanstack/react-start/server";
import { contactSubmissionSchema } from "@/lib/contact-intake";
import {
  dispatchContactSubmission,
  type ContactOutboxDatabase,
  type ContactOutboxEnvironment,
} from "@/lib/contact-outbox";

const MAX_REQUEST_BYTES = 8 * 1024;

type RateLimitBinding = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};
type ContactEnvironment = ContactOutboxEnvironment & {
  CONTACT_IDEMPOTENCY_DB?: ContactOutboxDatabase;
  CONTACT_SUBMISSION_LIMITER?: RateLimitBinding;
};
type RuntimeRequest = Request & {
  runtime?: { cloudflare?: { env?: ContactEnvironment } };
};

export const Route = createFileRoute("/api/contact")({
  server: { handlers: { POST: async ({ request }) => handleContactSubmission(request) } },
});

async function handleContactSubmission(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: "invalid_origin" }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ error: "json_required" }, 415);
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_REQUEST_BYTES) {
    return jsonResponse({ error: "request_too_large" }, 413);
  }

  const environment = (request as RuntimeRequest).runtime?.cloudflare?.env;
  const database = environment?.CONTACT_IDEMPOTENCY_DB;
  const limiter = environment?.CONTACT_SUBMISSION_LIMITER;
  if (!database || !limiter) {
    return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
  }

  const clientAddress = getRequestIP();
  if (!clientAddress) return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
  try {
    const rateLimitResult = await limiter.limit({ key: clientAddress });
    if (!rateLimitResult.success) {
      return jsonResponse({ error: "too_many_requests" }, 429, { "Retry-After": "60" });
    }
  } catch {
    console.error("Contact rate limit check failed.");
    return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(await readBoundedBody(request, MAX_REQUEST_BYTES));
  } catch (error) {
    const tooLarge = error instanceof RangeError;
    return jsonResponse(
      { error: tooLarge ? "request_too_large" : "invalid_request" },
      tooLarge ? 413 : 400,
    );
  }

  const parsed = contactSubmissionSchema.safeParse(payload);
  if (!parsed.success || parsed.data.companyWebsite?.trim()) {
    return jsonResponse({ error: "invalid_submission" }, 400);
  }

  const submission = parsed.data;
  try {
    const inserted = await database
      .prepare(
        `INSERT INTO contact_submissions (
           submission_id, submitted_at, name, email, company, service, message,
           industry_context, source_path, processing_state, n8n_status,
           sheets_status, notification_status, next_retry_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'accepted', 'pending',
                   'pending', 'not_verified', 0)
         ON CONFLICT(submission_id) DO NOTHING
         RETURNING submission_id`,
      )
      .bind(
        submission.submissionId,
        new Date().toISOString(),
        submission.name,
        submission.email,
        submission.company || null,
        submission.service,
        submission.message,
        submission.industryContext,
        submission.sourcePath,
      )
      .all<{ submission_id: string }>();

    if (!inserted.results?.length) {
      const existing = await database
        .prepare("SELECT processing_state FROM contact_submissions WHERE submission_id = ?")
        .bind(submission.submissionId)
        .all<{ processing_state: string }>();
      if (existing.results?.[0]?.processing_state !== "accepted") {
        return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
      }
    }
  } catch (error) {
    console.error("Contact inquiry could not be saved to D1.", {
      submissionId: submission.submissionId,
      reason: error instanceof Error ? error.name : "unknown",
    });
    return jsonResponse({ error: "inquiry_not_saved" }, 503);
  }

  // D1 is the acceptance boundary. n8n forwarding remains retryable if it fails.
  await dispatchContactSubmission(environment, submission.submissionId);
  return jsonResponse(
    { accepted: true, recorded: true, submissionId: submission.submissionId },
    202,
  );
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
        throw new RangeError("Request body exceeds the allowed size");
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
  body: Record<string, string | boolean>,
  status: number,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

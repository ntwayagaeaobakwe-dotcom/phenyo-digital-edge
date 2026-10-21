import { createFileRoute } from "@tanstack/react-router";
import { getRequestIP } from "@tanstack/react-start/server";
import { contactSubmissionSchema } from "@/lib/contact-intake";

const MAX_REQUEST_BYTES = 8 * 1024;
const UPSTREAM_TIMEOUT_MS = 10_000;

type RateLimitBinding = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};

type ContactEnvironment = {
  N8N_CONTACT_WEBHOOK_URL?: string;
  N8N_CONTACT_WEBHOOK_TOKEN?: string;
  CONTACT_SUBMISSION_LIMITER?: RateLimitBinding;
};

type RuntimeRequest = Request & {
  runtime?: { cloudflare?: { env?: ContactEnvironment } };
};

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => handleContactSubmission(request),
    },
  },
});

async function handleContactSubmission(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: "invalid_origin" }, 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ error: "json_required" }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ error: "request_too_large" }, 413);
  }

  const environment = (request as RuntimeRequest).runtime?.cloudflare?.env;
  const limiter = environment?.CONTACT_SUBMISSION_LIMITER;
  const webhookUrl = environment?.N8N_CONTACT_WEBHOOK_URL;
  const webhookToken = environment?.N8N_CONTACT_WEBHOOK_TOKEN;

  if (!limiter || !webhookUrl || !webhookToken) {
    return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
  }

  const clientAddress = getRequestIP();
  if (!clientAddress) {
    return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
  }

  try {
    const rateLimitResult = await limiter.limit({ key: clientAddress });
    if (!rateLimitResult.success) {
      return jsonResponse({ error: "too_many_requests" }, 429, { "Retry-After": "60" });
    }
  } catch {
    console.error("Contact rate limit check failed.");
    return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
  }

  let bodyText: string;
  try {
    bodyText = await readBoundedBody(request, MAX_REQUEST_BYTES);
  } catch (error) {
    if (error instanceof RangeError) {
      return jsonResponse({ error: "request_too_large" }, 413);
    }
    return jsonResponse({ error: "invalid_request" }, 400);
  }

  let untrustedPayload: unknown;
  try {
    untrustedPayload = JSON.parse(bodyText);
  } catch {
    return jsonResponse({ error: "invalid_request" }, 400);
  }

  const parsed = contactSubmissionSchema.safeParse(untrustedPayload);
  if (!parsed.success) {
    return jsonResponse({ error: "invalid_submission" }, 400);
  }

  if (parsed.data.companyWebsite?.trim()) {
    return jsonResponse({ error: "invalid_submission" }, 400);
  }

  let webhook: URL;
  try {
    webhook = new URL(webhookUrl);
    if (webhook.protocol !== "https:" || webhook.username || webhook.password) {
      return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
    }
  } catch {
    return jsonResponse({ error: "inquiry_service_unavailable" }, 503);
  }

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${webhookToken}`,
        "Content-Type": "application/json",
        "Idempotency-Key": parsed.data.submissionId,
      },
      body: JSON.stringify({
        submissionId: parsed.data.submissionId,
        submittedAt: new Date().toISOString(),
        name: parsed.data.name,
        email: parsed.data.email,
        service: parsed.data.service,
        message: parsed.data.message,
        industryContext: parsed.data.industryContext,
        sourcePath: parsed.data.sourcePath,
      }),
      redirect: "error",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!upstream.ok) {
      console.error("Contact workflow rejected a submission.", {
        submissionId: parsed.data.submissionId,
        status: upstream.status,
      });
      return jsonResponse({ error: "inquiry_not_confirmed" }, 502);
    }

    const result = (await upstream.json().catch(() => null)) as {
      status?: unknown;
      recorded?: unknown;
      submissionId?: unknown;
    } | null;

    if (
      result?.status !== "accepted" ||
      result.recorded !== true ||
      result.submissionId !== parsed.data.submissionId
    ) {
      console.error("Contact workflow did not confirm durable recording.", {
        submissionId: parsed.data.submissionId,
      });
      return jsonResponse({ error: "inquiry_not_confirmed" }, 502);
    }

    return jsonResponse(
      { accepted: true, recorded: true, submissionId: parsed.data.submissionId },
      202,
    );
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    console.error("Contact workflow request failed.", {
      submissionId: parsed.data.submissionId,
      reason: timedOut ? "timeout" : "network_error",
    });
    return jsonResponse({ error: "inquiry_not_confirmed" }, timedOut ? 504 : 502);
  }
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

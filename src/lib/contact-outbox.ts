export type ContactOutboxDatabase = {
  prepare: (query: string) => {
    bind: (...values: (string | number | null)[]) => {
      all: <T>() => Promise<{ results?: T[] }>;
    };
  };
};

export type ContactOutboxEnvironment = {
  CONTACT_IDEMPOTENCY_DB?: ContactOutboxDatabase;
  N8N_CONTACT_WEBHOOK_URL?: string;
  N8N_CONTACT_WEBHOOK_TOKEN?: string;
};

export type ContactOutboxItem = {
  submission_id: string;
  submitted_at: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
  industry_context: string | null;
  source_path: string;
  retry_count: number;
};

const MAX_RETRIES = 5;
const WEBHOOK_TIMEOUT_MS = 6_000;
const LEASE_SECONDS = 60;

export async function dispatchContactSubmission(
  environment: ContactOutboxEnvironment,
  submissionId: string,
): Promise<void> {
  const database = environment.CONTACT_IDEMPOTENCY_DB;
  const webhookUrl = environment.N8N_CONTACT_WEBHOOK_URL;
  const webhookToken = environment.N8N_CONTACT_WEBHOOK_TOKEN;
  if (!database || !webhookUrl || !webhookToken) return;

  let endpoint: URL;
  try {
    endpoint = new URL(webhookUrl);
    if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password) return;
  } catch {
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  let item: ContactOutboxItem | undefined;
  try {
    const claimed = await database
      .prepare(
        `UPDATE contact_submissions
         SET retry_count = retry_count + 1,
             lease_expires_at = ?,
             updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
         WHERE submission_id = ?
           AND n8n_status = 'pending'
           AND retry_count < ?
           AND next_retry_at <= ?
           AND (lease_expires_at IS NULL OR lease_expires_at < ?)
         RETURNING submission_id, submitted_at, name, email, company, service,
                   message, industry_context, source_path, retry_count`,
      )
      .bind(now + LEASE_SECONDS, submissionId, MAX_RETRIES, now, now)
      .all<ContactOutboxItem>();
    item = claimed.results?.[0];
  } catch (error) {
    console.error("Contact outbox claim failed.", {
      submissionId,
      reason: safeErrorName(error),
    });
    return;
  }
  if (!item) return;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${webhookToken}`,
        "Content-Type": "application/json",
        "Idempotency-Key": item.submission_id,
      },
      body: JSON.stringify({
        submissionId: item.submission_id,
        submittedAt: item.submitted_at,
        name: item.name,
        email: item.email,
        company: item.company,
        service: item.service,
        message: item.message,
        industryContext: item.industry_context,
        sourcePath: item.source_path,
      }),
      redirect: "manual",
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    const responseBody = (await response.json().catch(() => null)) as {
      recorded?: unknown;
      notificationStatus?: unknown;
    } | null;
    const sheetsRecorded = response.ok && responseBody?.recorded === true;
    const providerAccepted = responseBody?.notificationStatus === "provider_accepted";
    const failedPermanently = item.retry_count >= MAX_RETRIES;
    const delaySeconds = Math.min(60 * 2 ** Math.max(item.retry_count - 1, 0), 3_600);

    await database
      .prepare(
        `UPDATE contact_submissions
         SET n8n_status = ?,
             sheets_status = CASE WHEN ? = 1 THEN 'recorded' ELSE sheets_status END,
             notification_status = CASE WHEN ? = 1 THEN 'provider_accepted' ELSE notification_status END,
             next_retry_at = ?,
             lease_expires_at = NULL,
             last_error = ?,
             updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
         WHERE submission_id = ? AND n8n_status = 'pending'`,
      )
      .bind(
        sheetsRecorded ? "forwarded" : failedPermanently ? "retry_exhausted" : "pending",
        sheetsRecorded ? 1 : 0,
        providerAccepted ? 1 : 0,
        sheetsRecorded || failedPermanently ? 0 : now + delaySeconds,
        sheetsRecorded ? null : `n8n_http_${response.status}`,
        submissionId,
      )
      .all();
  } catch (error) {
    const failedPermanently = item.retry_count >= MAX_RETRIES;
    const delaySeconds = Math.min(60 * 2 ** Math.max(item.retry_count - 1, 0), 3_600);
    try {
      await database
        .prepare(
          `UPDATE contact_submissions
           SET n8n_status = ?, next_retry_at = ?, lease_expires_at = NULL,
               last_error = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
           WHERE submission_id = ? AND n8n_status = 'pending'`,
        )
        .bind(
          failedPermanently ? "retry_exhausted" : "pending",
          failedPermanently ? 0 : now + delaySeconds,
          safeErrorName(error),
          submissionId,
        )
        .all();
    } catch {
      console.error("Contact outbox failure state could not be saved.", { submissionId });
    }
  }
}

export async function retryDueContactSubmissions(
  environment: ContactOutboxEnvironment,
  limit = 20,
): Promise<void> {
  const database = environment.CONTACT_IDEMPOTENCY_DB;
  if (!database) return;
  const now = Math.floor(Date.now() / 1000);
  try {
    const due = await database
      .prepare(
        `SELECT submission_id FROM contact_submissions
         WHERE n8n_status = 'pending' AND retry_count < ?
           AND next_retry_at <= ?
           AND (lease_expires_at IS NULL OR lease_expires_at < ?)
         ORDER BY next_retry_at, created_at LIMIT ?`,
      )
      .bind(MAX_RETRIES, now, now, limit)
      .all<{ submission_id: string }>();
    for (const submission of due.results ?? []) {
      await dispatchContactSubmission(environment, submission.submission_id);
    }
  } catch (error) {
    console.error("Contact outbox retry scan failed.", { reason: safeErrorName(error) });
  }
}

function safeErrorName(error: unknown): string {
  if (!(error instanceof Error)) return "unknown_error";
  if (error.name === "TimeoutError" || error.name === "AbortError") return "timeout";
  if (error.name === "TypeError") return "network_error";
  return "delivery_error";
}

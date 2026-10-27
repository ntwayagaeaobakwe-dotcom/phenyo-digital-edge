ALTER TABLE contact_submissions
  ADD COLUMN notification_attempts INTEGER NOT NULL DEFAULT 0;

ALTER TABLE contact_submissions
  ADD COLUMN notification_next_retry_at INTEGER NOT NULL DEFAULT 0;

ALTER TABLE contact_submissions
  ADD COLUMN notification_lease_expires_at INTEGER;

ALTER TABLE contact_submissions
  ADD COLUMN notification_lease_token TEXT;

ALTER TABLE contact_submissions
  ADD COLUMN notification_last_attempt_at TEXT;

CREATE INDEX IF NOT EXISTS contact_submissions_notification_retry_due
  ON contact_submissions (
    n8n_status,
    sheets_status,
    notification_status,
    notification_next_retry_at,
    notification_lease_expires_at
  );

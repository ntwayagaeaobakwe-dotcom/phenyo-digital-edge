CREATE TABLE IF NOT EXISTS contact_submissions (
  submission_id TEXT PRIMARY KEY NOT NULL,
  submitted_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  industry_context TEXT,
  source_path TEXT NOT NULL,
  processing_state TEXT NOT NULL DEFAULT 'accepted'
    CHECK (processing_state IN ('accepted', 'rejected')),
  n8n_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (n8n_status IN ('pending', 'forwarded', 'retry_exhausted')),
  sheets_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (sheets_status IN ('pending', 'recorded', 'failed', 'not_verified')),
  notification_status TEXT NOT NULL DEFAULT 'not_verified'
    CHECK (notification_status IN ('not_verified', 'provider_accepted', 'failed', 'unavailable')),
  retry_count INTEGER NOT NULL DEFAULT 0,
  next_retry_at INTEGER NOT NULL DEFAULT 0,
  lease_expires_at INTEGER,
  last_error TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS contact_submissions_retry_due
  ON contact_submissions (n8n_status, next_retry_at, lease_expires_at);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at
  ON contact_submissions (created_at DESC);

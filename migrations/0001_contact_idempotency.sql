CREATE TABLE IF NOT EXISTS contact_idempotency (
  submission_id TEXT PRIMARY KEY NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('processing', 'recorded', 'failed')),
  lease_expires_at INTEGER,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS contact_idempotency_state_lease
  ON contact_idempotency (state, lease_expires_at);

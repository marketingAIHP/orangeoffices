CREATE TABLE lead_submissions (id TEXT PRIMARY KEY, idempotency_key TEXT NOT NULL UNIQUE, form_id TEXT NOT NULL, source_path TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, crm_status TEXT NOT NULL DEFAULT 'pending', email_status TEXT NOT NULL DEFAULT 'pending', retry_count INTEGER NOT NULL DEFAULT 0, zoho_record_id TEXT, last_error_code TEXT, payload_ciphertext TEXT NOT NULL, purge_after TEXT NOT NULL);
CREATE INDEX idx_leads_crm_status_created ON lead_submissions (crm_status, created_at);
CREATE INDEX idx_leads_purge_after ON lead_submissions (purge_after);

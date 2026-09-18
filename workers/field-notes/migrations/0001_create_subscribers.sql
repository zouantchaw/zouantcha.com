CREATE TABLE subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  created_at TEXT NOT NULL,
  source TEXT NOT NULL,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

CREATE INDEX idx_subscribers_created_at ON subscribers (created_at);

CREATE TABLE signup_attempts (
  id TEXT PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_signup_attempts_ip_created ON signup_attempts (ip_hash, created_at);

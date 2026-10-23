-- Additive only. Historic subscribers retain IDs, timestamps and all attribution.
-- No legacy consent, confirmation or membership is inferred/backfilled.
CREATE TABLE build_log_memberships (
  id TEXT PRIMARY KEY,
  subscriber_id TEXT NOT NULL REFERENCES subscribers(id),
  list TEXT NOT NULL CHECK (list = 'build-log'),
  status TEXT NOT NULL CHECK (status IN ('pending','confirmed','unsubscribed','suppressed')),
  created_at TEXT NOT NULL,
  current_request_id TEXT,
  confirmed_at TEXT,
  unsubscribed_at TEXT,
  suppressed_at TEXT,
  UNIQUE (subscriber_id, list)
);
CREATE TABLE build_log_requests (
  id TEXT PRIMARY KEY,
  membership_id TEXT NOT NULL REFERENCES build_log_memberships(id),
  consent_version TEXT NOT NULL,
  consent_copy TEXT NOT NULL,
  requested_at TEXT NOT NULL,
  page TEXT NOT NULL CHECK (page IN ('/log','/start')),
  source TEXT NOT NULL,
  referrer TEXT,
  src TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);
CREATE INDEX idx_build_log_requests_member ON build_log_requests(membership_id, requested_at);
CREATE TABLE build_log_tokens (
  digest TEXT PRIMARY KEY,
  membership_id TEXT NOT NULL REFERENCES build_log_memberships(id),
  request_id TEXT NOT NULL REFERENCES build_log_requests(id),
  action TEXT NOT NULL CHECK (action IN ('confirm','unsubscribe')),
  created_at TEXT NOT NULL,
  expires_at TEXT,
  consumed_at TEXT,
  revoked_at TEXT,
  operation_id TEXT,
  UNIQUE(request_id, action)
);
CREATE INDEX idx_build_log_tokens_member ON build_log_tokens(membership_id, action);
CREATE TABLE build_log_events (
  id TEXT PRIMARY KEY,
  membership_id TEXT NOT NULL REFERENCES build_log_memberships(id),
  request_id TEXT,
  event TEXT NOT NULL,
  created_at TEXT NOT NULL
);
-- Lifecycle evidence is append-only, including when operating through SQL.
CREATE TRIGGER build_log_events_no_update BEFORE UPDATE ON build_log_events BEGIN
  SELECT RAISE(ABORT, 'append_only');
END;
CREATE TRIGGER build_log_events_no_delete BEFORE DELETE ON build_log_events BEGIN
  SELECT RAISE(ABORT, 'append_only');
END;
CREATE TABLE build_log_outbox (
  logical_key TEXT PRIMARY KEY,
  membership_id TEXT NOT NULL REFERENCES build_log_memberships(id),
  request_id TEXT NOT NULL REFERENCES build_log_requests(id),
  kind TEXT NOT NULL CHECK(kind IN ('confirmation','draft')),
  outcome TEXT NOT NULL CHECK(outcome IN ('preview','provider-accepted','suppressed','failed','unknown')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  preview_json TEXT,
  dispatch_id TEXT,
  message_id TEXT,
  error_code TEXT
);
-- One atomic token UPDATE performs the transition, audit and invalidation.
CREATE TRIGGER build_log_confirm AFTER UPDATE OF consumed_at ON build_log_tokens
WHEN NEW.action = 'confirm' AND OLD.consumed_at IS NULL AND NEW.consumed_at IS NOT NULL
BEGIN
  UPDATE build_log_memberships SET status='confirmed', confirmed_at=NEW.consumed_at,
    unsubscribed_at=NULL WHERE id=NEW.membership_id;
  INSERT INTO build_log_events VALUES(NEW.operation_id, NEW.membership_id, NEW.request_id, 'confirmed', NEW.consumed_at);
END;
CREATE TRIGGER build_log_unsubscribe AFTER UPDATE OF consumed_at ON build_log_tokens
WHEN NEW.action = 'unsubscribe' AND OLD.consumed_at IS NULL AND NEW.consumed_at IS NOT NULL
BEGIN
  UPDATE build_log_memberships SET
    status=CASE WHEN status='suppressed' THEN status ELSE 'unsubscribed' END,
    unsubscribed_at=NEW.consumed_at, current_request_id=NULL WHERE id=NEW.membership_id;
  UPDATE build_log_tokens SET revoked_at=NEW.consumed_at
    WHERE membership_id=NEW.membership_id AND action='confirm' AND revoked_at IS NULL;
  INSERT INTO build_log_events VALUES(NEW.operation_id, NEW.membership_id, NEW.request_id, 'unsubscribed', NEW.consumed_at);
END;
CREATE VIEW build_log_eligible AS
  SELECT m.id AS membership_id, m.subscriber_id FROM build_log_memberships m
  JOIN build_log_requests r ON r.id=m.current_request_id AND r.membership_id=m.id
  WHERE m.list='build-log' AND m.status='confirmed' AND m.confirmed_at IS NOT NULL
    AND m.unsubscribed_at IS NULL AND m.suppressed_at IS NULL;

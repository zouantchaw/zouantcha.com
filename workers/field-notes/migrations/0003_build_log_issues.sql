-- Independent per-issue tokens; never change legacy subscriber/consent records.
CREATE TABLE build_log_issues (
  id TEXT PRIMARY KEY,
  content_digest TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE build_log_issue_recipients (
  issue_id TEXT NOT NULL REFERENCES build_log_issues(id),
  membership_id TEXT NOT NULL REFERENCES build_log_memberships(id),
  request_id TEXT NOT NULL REFERENCES build_log_requests(id),
  token_digest TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  consumed_at TEXT,
  operation_id TEXT,
  outcome TEXT NOT NULL CHECK(outcome IN ('unknown','provider-accepted','failed','suppressed')),
  message_id TEXT UNIQUE,
  error_code TEXT,
  delivered_at TEXT,
  PRIMARY KEY(issue_id,membership_id)
);
CREATE TRIGGER build_log_issue_unsubscribe AFTER UPDATE OF consumed_at ON build_log_issue_recipients
WHEN OLD.consumed_at IS NULL AND NEW.consumed_at IS NOT NULL
BEGIN
  UPDATE build_log_memberships SET
    status=CASE WHEN status='suppressed' THEN status ELSE 'unsubscribed' END,
    unsubscribed_at=NEW.consumed_at,current_request_id=NULL WHERE id=NEW.membership_id;
  UPDATE build_log_tokens SET revoked_at=NEW.consumed_at
    WHERE membership_id=NEW.membership_id AND action='confirm' AND revoked_at IS NULL;
  INSERT INTO build_log_events VALUES(NEW.operation_id,NEW.membership_id,NEW.request_id,'unsubscribed',NEW.consumed_at);
END;
CREATE TABLE build_log_provider_events (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  event TEXT NOT NULL CHECK(event IN ('email.delivered','email.bounced','email.complained')),
  created_at TEXT NOT NULL
);
CREATE TRIGGER build_log_provider_delivery AFTER INSERT ON build_log_provider_events
WHEN NEW.event='email.delivered'
BEGIN
  UPDATE build_log_issue_recipients SET delivered_at=NEW.created_at WHERE message_id=NEW.message_id;
END;
CREATE TRIGGER build_log_provider_suppression AFTER INSERT ON build_log_provider_events
WHEN NEW.event IN ('email.bounced','email.complained')
BEGIN
  UPDATE build_log_memberships SET status='suppressed',suppressed_at=NEW.created_at,current_request_id=NULL
    WHERE id=(SELECT membership_id FROM build_log_issue_recipients WHERE message_id=NEW.message_id);
  UPDATE build_log_tokens SET revoked_at=NEW.created_at WHERE action='confirm' AND revoked_at IS NULL
    AND membership_id=(SELECT membership_id FROM build_log_issue_recipients WHERE message_id=NEW.message_id);
  INSERT INTO build_log_events(id,membership_id,request_id,event,created_at)
    SELECT NEW.id,membership_id,request_id,'suppressed',NEW.created_at
    FROM build_log_issue_recipients WHERE message_id=NEW.message_id;
END;

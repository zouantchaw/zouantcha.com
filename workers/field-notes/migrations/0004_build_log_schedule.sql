CREATE TABLE build_log_scheduled_issues (
 id TEXT PRIMARY KEY, payload_json TEXT NOT NULL, content_digest TEXT NOT NULL,
 approved_at TEXT NOT NULL, scheduled_for_utc TEXT, sent_started_at TEXT,
 sent_finished_at TEXT, accepted INTEGER NOT NULL DEFAULT 0,
 held INTEGER NOT NULL DEFAULT 0, skipped INTEGER NOT NULL DEFAULT 0,
 status TEXT NOT NULL CHECK(status IN ('approved','sending','sent','cancelled'))
);
CREATE UNIQUE INDEX build_log_schedule_sunday ON build_log_scheduled_issues(scheduled_for_utc) WHERE scheduled_for_utc IS NOT NULL;

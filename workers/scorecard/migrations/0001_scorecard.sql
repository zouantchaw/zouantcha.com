CREATE TABLE scorecard_weeks (
  week TEXT PRIMARY KEY,
  cutoff_utc TEXT NOT NULL,
  window_start_utc TEXT NOT NULL,
  collected_at TEXT NOT NULL,
  values_json TEXT NOT NULL
);

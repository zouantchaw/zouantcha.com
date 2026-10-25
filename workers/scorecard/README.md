# Friday collector

`pnpm deploy:scorecard:staging` deploys only `zouantcha-scorecard-staging`, on workers.dev.
Its own D1 stores `scorecard_weeks`; all queries against Field Notes and Radar are
SELECT-only. No subscriber data leaves those source queries. The feed contains
aggregate counts, source statuses and explicitly provisional staging diagnostics.

Two UTC cron candidates (`12:00` and `13:00` Friday) are filtered at runtime to
08:00 America/Toronto, including DST. Only one runs. Since the metric definitions
use a **Friday noon** cutoff, the morning run snapshots the latest *completed*
noon window (the previous Friday), never the coming four hours. Each boundary
is converted separately. Duplicate cron/manual requests preserve the first row.
`POST /collect` with `Authorization: Bearer <COLLECTOR_SECRET>` forces the same
idempotent collector. It accepts no arbitrary SQL, database, date or historical
backfill input. Cron failures reject the event; failed reads never create zeros.

`GET /feed/<FEED_TOKEN>.csv` returns up to 52 descending weeks, no-store/noindex.
Observability is off to avoid logging path capabilities. Both tokens live in
keychain account `news`: services `scorecard-zouantcha` (feed) and
`scorecard-zouantcha-collector` (admin), and their matching Worker secrets.
The private Google workbook's hidden Feed!A1 necessarily contains its IMPORTDATA
capability; never copy the formula/URL into reports, PRs or logs. Rotate by
updating keychain + Worker secret + that private formula together.

The Friday tab references Feed, preserves blank unknowns and manual inputs,
and keeps CAD minor units separate from source currency. Google must permit
external imports once in the authenticated desktop UI. Do not make this workbook
public or publish private pipeline information.

## Source coverage and launch

- Production Field Notes coverage starts at the accepted 2026-10-24 release.
  Earlier/partial windows are unknown. Legacy captures do not imply consent.
  The owner QA address and fixture campaigns are excluded. Confirmations count
  first-ever event per membership; unsubscribes count distinct members/window.
- Radar binding is currently the staging ID in Radar's wrangler config.
  Its diagnostic JSON is **fixtures, not business actuals**. The Friday values
  stay blank. Paying accounts/MRR are provisional current-ledger diagnostics:
  existing invoice mirrors lack invoice-to-subscription paid-period coverage,
  historical status, currency/discount and complete refund movement evidence.
  In particular, a positive invoice once does not prove current paid coverage.
- At launch add the separately approved production Radar binding and validated
  live source-coverage/readiness adapters. Do not merely flip RADAR_ENV: actuals
  intentionally remain unavailable until those ledger joins meet
  `METRIC-DEFINITIONS.csv`. Weekly gross CAD receipts and cumulative collected
  CAD are queried; net/refund numbers require a successful refund movement ledger
  (the existing cumulative refunded_amount/refunded_at mirror is insufficient).
- GST/QST review is an operational reminder at CAD 20,000 collected, per A3.3.
  It is not a tax liability calculation, nor an inferred zero for live revenue.
- Stock snapshots cannot be reconstructed from today's status for a past noon.
  Manual conversations/reviews/proposals/deals have no automated source.

Migration: `0001_scorecard.sql` applies only to the collector's own staging D1.
The first remote table was created using the identical SQL through cf; existing
source D1 databases were not migrated or changed by the collector.

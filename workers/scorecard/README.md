# Friday collector

`pnpm deploy:scorecard:staging` deploys only `zouantcha-scorecard-staging`, on workers.dev.
Its own D1 stores `scorecard_weeks`; all queries against Field Notes and Radar are
SELECT-only. No subscriber data leaves those source queries. The feed contains
aggregate counts, source statuses and explicitly provisional staging diagnostics.

The collector runs **Friday 12:05 America/Toronto**, reporting the week ending
that day: **[previous Friday 12:00, this Friday 12:00)** Toronto. UTC cron
candidates `5 16 * * 5` and `5 17 * * 5` cover EDT and EST; the scheduled-time
guard accepts only Friday 12:05–12:59 Toronto, so the other candidate is a no-op.
Each noon boundary is converted separately: a spring-transition period lasts
167 hours and a fall-transition period 169 hours. For example, October 30, 2026
runs at 16:05 UTC for [October 23 16:00Z, October 30 16:00Z); November 6 runs at
17:05 UTC for [October 30 16:00Z, November 6 17:00Z).
Duplicate cron/manual requests preserve the first row.
`POST /collect` with `Authorization: Bearer <COLLECTOR_SECRET>` forces the same
idempotent collector. It accepts no arbitrary SQL, database, date or historical
backfill input. Manual runs use the latest completed Friday-noon period (before
Friday noon, that is still the preceding Friday). Cron failures reject the
event; failed reads never create zeros.

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

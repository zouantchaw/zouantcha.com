# Cloudflare deployment

## Migration state

As of October 8, 2026, production runs on Cloudflare at `www.zouantcha.com`
and `zouantcha.com` (308 to www). The existing Field Notes API runs at
`api.zouantcha.com`; site-to-API calls use the existing service binding and D1.
Both production Workers explicitly disable workers.dev and version previews.
The scoped previous host project has been retired after production acceptance.

GoDaddy now delegates DNS to `arely.ns.cloudflare.com` and
`mark.ns.cloudflare.com`. Registrar transfer is separate: GoDaddy requests an
additional SMS verification before transfer eligibility/code can be inspected.
No transfer purchase or charge has been initiated.

The original production source is commit `8ac3ade365999d550a4b5dea1db7b1a4c8797d4a`.
The detailed DNS export, source references and acceptance artifacts are in the
October 8 migration ledger in PKM Lab. Never copy subscriber exports or credentials
into that ledger.

## Resources

Cloudflare account: `lovethegame`, `0bb05130da965c096b12cc1f0637f763`.

| Surface | Resource | Data and bindings |
| --- | --- | --- |
| Site | `zouantcha-site` | OpenNext assets, `IMAGES`, `zouantcha-site-cache` R2, `zouantcha_site_events` Analytics Engine |
| Field Notes | Existing `zouantcha-field-notes` | Existing D1 `c47d87c8-911e-4330-a59b-bd4f817a69a9`, existing `INGEST_SECRET` |
| Internal signup | Site `FIELD_NOTES_API` | Service binding to the existing Worker; server `FIELD_NOTES_INGEST_SECRET` |

Owned production site hosts are `www.zouantcha.com` and `zouantcha.com`; apex
redirects to www with path and query intact. The Field Notes API host is
`api.zouantcha.com`. Both Wrangler configurations persist `workers_dev: false`
and `preview_urls: false`.

`migration.zouantcha.com` remains temporarily attached only as a DNS transition
bridge. The former authoritative provider has a www CNAME to that owned host and
an apex A record to the verified Cloudflare edge. Retain these only until the
former parent delegation TTL (172800 seconds) has expired, conservatively after
October 10, 2026 at 18:10 UTC. Then remove those two scoped bridge records and the
owned migration route. Do not remove unrelated former-provider records or the
separate TCP project.

Keep `pay`, `tcp` and `wiel` DNS records: they serve independent services. In
particular, `tcp.zouantcha.com` belongs to a separate employee QA project and is
outside this personal-site migration. Preserve Google MX and CAA records.

## Build and deploy

Use Node 24 and pnpm 10.28.0. Versions are pinned: Next 16.3.8, OpenNext 1.20.9,
Wrangler 4.148.0. Install only the declared build dependencies.

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build:cloudflare
pnpm deploy:cloudflare:built
```

Alternatively, `pnpm deploy:cloudflare` builds and deploys. Use the OpenNext
deploy command: it populates the remote R2 cache; direct site `wrangler deploy`
does not perform that step. Deployment currently uses authenticated manual CLI
access. No Git-connected Cloudflare Build token has been created for this project.

`wrangler secret put FIELD_NOTES_INGEST_SECRET` sets the site secret. Reuse the
existing authorized ingest credential; do not overwrite the backend secret or
recreate D1. For local Node development, put the server-only URL and existing
secret in an ignored `.env.local`; that lane uses ordinary authenticated fetch.

`pnpm deploy:field-notes` deploys the separate backend when its code/configuration
changes. Ordinary site deployments should not redeploy or migrate that database.
The subscriber export command remains private operator tooling and prints CSV.

## Staging

Deploy staging first. Production deploys require Wiel's explicit go-ahead.
Staging uses only workers.dev URLs, with no routes or custom domains:

- Site: https://zouantcha-site-staging.wiel.workers.dev
- Field Notes: https://zouantcha-field-notes-staging.wiel.workers.dev

```sh
pnpm exec wrangler d1 migrations apply zouantcha-field-notes-staging --config workers/field-notes/wrangler.jsonc --env staging --remote
pnpm deploy:field-notes:staging
pnpm deploy:staging
```

Both commands select `env.staging`. The site deploy builds with OpenNext and
populates the isolated `zouantcha-site-cache-staging` R2 cache. Its Analytics
Engine dataset is `zouantcha_site_events_staging`, and `FIELD_NOTES_API` binds
only to `zouantcha-field-notes-staging`. The backend's `DB` binds only to D1
`zouantcha-field-notes-staging` (`539380aa-21e6-4d8e-8059-e9f3860c38de`).
Assets and the Images binding belong to the staging site deployment.

Both staging Workers use the same fresh `FIELD_NOTES_INGEST_SECRET`; set it with
`wrangler secret put FIELD_NOTES_INGEST_SECRET --env staging` using each Worker's
config. Never reuse production credentials. The production backend continues to
read its existing `INGEST_SECRET`.

`SITE_ENV=staging` adds `X-Robots-Tag: noindex, nofollow` to every Worker response
and serves `robots.txt` with `Disallow: /`, including static assets and redirects.
The top-level configurations use `SITE_ENV=production` and retain production
response behavior. Verify staging pages and signup with headless agent-browser
at 1440 and 390 pixels; compare staging and production subscriber counts before
and after the staging-only signup.

## Runtime behavior

Published MDX compiles to modules at build time because runtime dynamic evaluation
is unavailable in Workers. Original frontmatter, headings, links, code components
and the whitepaper's custom code rendering are retained. Drafts stay unpublished.
OG fonts are byte-identical assets with their original licenses. Image resizing
uses Cloudflare Images through the Next adapter.

The wrapper runs before static assets to enforce apex redirects and resume
inline/download headers, then forwards static requests explicitly through `ASSETS`.
`/bitcoin-whitepaper` redirects to the existing canonical
`/blog/bitcoin-whitepaper`, preserving query parameters. No gating or ads are added.

`/api/events` accepts only known event names and safe path/property fields, without
query strings, email addresses or signup content. Page views, existing product
events and native Next web vitals write to the isolated Analytics Engine dataset.
Analytics failure does not block downloads or signups.

## Acceptance and cutover

The candidate passed 20 phone page checks, no runtime errors/overflow/legacy
platform requests, exact whitepaper text/code hashes and six byte-identical PDFs.
The existing start-page checks passed at 390/768/1440 widths, actual signup,
duplicate handling, invalid email, honeypot, service binding and native events.
The controlled signup fixture is retained as acceptance evidence, with exactly
one subscriber row. No customer email, booking, purchase or charge was triggered.

Production acceptance repeats the phone, exact whitepaper, PDF, signup, download,
metadata and native analytics checks on the final www domain. Valid TLS and
native OpenNext responses are verified on the owned hosts. Google mail, CAA,
pay/TCP/Wiel records remain intact. The obsolete wildcard web record is removed;
TCP's separate verification record remains.

```sh
npm ci --prefix scripts
SITE_URL=https://www.zouantcha.com node scripts/verify-personal-refinements.mjs
SITE_URL=https://www.zouantcha.com node scripts/verify-case-study-downloads.mjs
```

The start acceptance script creates an owned test subscription. Use a fixed
`FIELD_NOTES_TEST_EMAIL` for deduplication and avoid unnecessary repeated writes.

## Rollback

Retain original source, original DNS export and Worker version references before
cutover. A rollback restores the original web build/routes while preserving the
existing Field Notes database and ingest secret. Do not drop tables, recreate D1,
restore an old subscriber dump over new rows, revoke shared credentials or cancel
shared accounts. Retain a short DNS transition bridge only while resolver caches
may use the old delegation, with retirement recorded in the migration ledger.

## Build-log lifecycle

`0002_build_log_lifecycle.sql` is additive. It leaves the legacy `subscribers`
table unchanged and does not infer consent or membership for any historic row.
`build_log_requests` records the exact shared version/copy, page, time and bounded
attribution for an explicit request; lifecycle events are append-only. The
`build_log_eligible` view and `eligible()` helper require a confirmed membership
without opt-out or suppression. The old subscriber CSV is a capture archive,
**not** a confirmed-recipient list. Do not use it to send a build-log issue.

Tokens are 32 random bytes, stored as SHA-256 digests scoped to membership,
request and action. Confirmation expires after 24 hours; GET never consumes it.
An active confirmation is not rotated on retry. New requests have a 15-minute
email cooldown, at most 3 attempts per email hash/15 minutes, and 8 per IP
hash/15 minutes. Confirmation/opt-out paths allow 30 per IP hash/15 minutes.
Expiry requires a fresh signup after cooldown; no scheduled resend exists.
Opt-out revokes all confirmation tokens. Rejoin stays unsubscribed until a new
explicit confirmation. Suppression revokes only confirmation tokens, preserving
explicit opt-out and its audit record, and cannot be undone by signup.

Private preview mode is available only on staging. Its private `build_log_outbox` stores
HTML/text previews (including synthetic action links); inspect **only owned
fixtures** through authenticated D1 CLI tooling. There is no public outbox route.
Do not publish outbox bodies, tokens or recipients in reports, PRs or logs.
All email renderers use the approved `PUBLIC_POSTAL_ADDRESS` constant in
`app/lib/public-contact.ts`. There are no legal/privacy pages in this site.
A claim is made once per logical message, before transport. Outcomes are
`preview`, `provider-accepted`, `suppressed`, `failed`, `unknown`. A crash, timeout
or ambiguous result stays `unknown`; an operator must reconcile it privately.
There is no automatic retry or bulk-send endpoint. Acceptance is not delivery.
Definite failure or an ineligible dispatch revokes that request's confirmation
token in the same outcome batch. A later explicit signup may create a new request
after cooldown; the failed logical message is never resent. Unknown outcomes keep
their confirmation token usable and block fresh requests pending reconciliation.
Query-string redaction in Worker observability protects capability URLs.

The native structured `EMAIL.send` adapter sends confirmation messages only;
draft issues and campaigns are hard-disabled at the adapter. Staging live mode
requires the staging public origin and the exact allowlisted owner inbox
`zouantchaw74@gmail.com`. Its `EMAIL` binding restricts the sender to
`wiel@notify.zouantcha.com`; the application restricts the recipient. Explicit
preview mode never falls back to live sending. Production remains disabled until
the approved release resumes after owner inbox/link confirmation.

Release activation was approved by Wiel on 2026-10-24. Staging acceptance must
finish before production backup, migration, merge or deployment. The release
spec and report live in PKM `.claude-work/distribution-v2/specs/`. Activation controls:

1. Review the real public postal/footer address and exact From/Reply-To identity
   with Wiel. Verify current account sending eligibility, verified notify domain,
   quota and recipient policy; registration/DNS readiness alone is insufficient.
2. Configure backend `BUILD_LOG_MAIL_MODE=live`,
   `BUILD_LOG_PUBLIC_URL=https://www.zouantcha.com`, `EMAIL_SENDER_APPROVED=yes`,
   matching approved `EMAIL_FROM` / `EMAIL_EXPECTED_FROM` (on the verified notify
   domain), optional approved `EMAIL_REPLY_TO`, and real
   `EMAIL_PUBLIC_POSTAL_ADDRESS` if set. Templates always use the approved source
   constant; the readiness guard rejects a conflicting runtime address.
3. Choose `EMAIL_RECIPIENT_POLICY=allowlist` with exact comma-separated
   `EMAIL_ALLOWED_RECIPIENTS` for a controlled sending check, or explicitly approve
   `confirmed-public` for public signup confirmation. Keep environment values
   isolated; staging remains restricted to the approved test inbox.
4. Add the native backend `send_email` binding named `EMAIL` only after approval.
   Current official docs describe `allowed_sender_addresses` for sender limits,
   and `destination_address` or `allowed_destination_addresses` for recipient
   limits. These are different restriction choices, not interchangeable. Match
   the chosen supported binding variant to the approved policy; the application
   additionally checks the exact expected sender and an exact recipient allowlist
   when configured. Do not copy another application's binding.
5. Decide and verify provider event/suppression reconciliation before real issues.
   This candidate persists synchronous `E_RECIPIENT_SUPPRESSED` errors only; it
   does not implement authenticated bounce/complaint/delivery callbacks. Keep
   unknown outcomes held and the provider's drop-suppressed setting off unless a
   separately reviewed design can account for dropped recipients.
6. After explicit production approval, apply the additive migration to the
   existing production D1, deploy backend/site with their isolated bindings, and
   run controlled provider-acceptance and inbox verification as separate checks.
   No campaign scheduler, first issue or legacy enrollment is authorized here.

Official references checked October 23, 2026:
https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
and https://developers.cloudflare.com/email-service/configuration/send-bindings/.
The explicit opt-out form is implemented. RFC 8058 List-Unsubscribe-Post headers
and a one-click endpoint are not installed; the draft renderer emits neither.

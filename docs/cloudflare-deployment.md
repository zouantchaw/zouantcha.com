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

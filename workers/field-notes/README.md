# Field Notes storage

Durable email capture for `/start`. The public site stays on Vercel. This Worker is the only writer to the D1 database. It does not expose the subscriber list.

## Schema

`subscribers`: `id`, `email` (unique), `created_at`, `source`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`

## Export

From this directory, with Wrangler authenticated to the `lovethegame` Cloudflare account:

```bash
pnpm field-notes:export
```

Or:

```bash
wrangler d1 execute zouantcha-field-notes --remote --json --command "SELECT email, created_at, source, utm_source, utm_medium, utm_campaign FROM subscribers ORDER BY created_at"
```

Inspect without exporting:

```bash
wrangler d1 execute zouantcha-field-notes --remote --command "SELECT COUNT(*) AS n FROM subscribers"
```

Never query this database from a public route.

## Build-log issues (Resend)

`0003_build_log_issues.sql` is additive, separate from the original confirmation
and opt-out tokens. Cloudflare `EMAIL.send` remains confirmation-only. Resend
is the issue transport with `Wiel <wiel@news.zouantcha.com>`, Gmail Reply-To,
and the shared approved postal footer. The list, requests, consent, token digests,
eligibility and suppression stay in D1; no Resend audience import is performed.

`ISSUE_SEND_MODE=disabled` is the checked-in default in both environments.
For the single approved staging test, temporarily set `allowlist`. Authenticated
`POST /issues/test` accepts `{id,title,paragraphs}` through the separate staging
`ISSUE_ADMIN_SECRET` (keychain `resend-zouantcha-operator`, account `news`). It selects only the exact owner inbox from `build_log_eligible`;
there is no caller-supplied recipient, public bulk route or scheduler. Production
is additionally denied even if the mode is changed accidentally. A future real
broadcast activation needs a reviewed recipient policy, queue/quota handling and
explicit production approval. The issue content hash is immutable per ID and each
recipient/issue is atomically claimed once. Ambiguous sends stay `unknown`; no
automatic retry or token plaintext is retained. Reconcile through Resend privately.

Each issue recipient gets a fresh 32-byte unsubscribe capability, stored only as
a digest. HTML/text links and RFC 8058 headers point to the staging backend's
`/issues/unsubscribe?token=...` endpoint. GET shows a form without mutation.
Form-encoded `List-Unsubscribe=One-Click` POST needs no cookie/CSRF challenge and
atomically records opt-out, revokes confirmation tokens and removes eligibility.
Opt-outs remain usable after provider suppression; no callback clears suppression.

`POST /webhooks/resend` verifies exact raw bytes with Svix HMAC SHA-256,
constant-time crypto verification and a five-minute timestamp tolerance.
Only delivered, bounced and complained events are used. Provider event IDs are
deduplicated; delivery evidence never unsuppresses. Bounces/complaints atomically
suppress the associated member and revoke confirmation tokens. Unknown provider
message IDs receive 503 for retry (the webhook can beat the send response).
Signed events with an unrelated sender and unknown message ID are ignored; no
unrelated message creates local membership or state. A missing sender keeps the
unknown-message case retryable.

Secrets: keychain account `news`, service `resend-zouantcha`, plus staging secret
`RESEND_API_KEY`; signing key service `resend-zouantcha-webhook`, plus staging
`RESEND_WEBHOOK_SECRET`. The API key is sending-only, scoped to news.zouantcha.com.
Never print keys, email bodies or capability URLs. Restore send mode to disabled
after the one test. Apply/deploy only staging without a new production approval.

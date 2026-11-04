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
`POST /issues/test` accepts `{id,title,paragraphs,issue?}` through the separate staging
`ISSUE_ADMIN_SECRET` (keychain `resend-zouantcha-operator`, account `news`). It selects only the exact owner inbox from `build_log_eligible`;
there is no caller-supplied recipient, public bulk route or scheduler. Production sending requires the separately gated confirmed-public mode and explicit approval. The issue content hash is immutable per ID and each
recipient/issue is atomically claimed once. Ambiguous sends stay `unknown`; no
automatic retry or token plaintext is retained. Reconcile through Resend privately.

`issue` is the validated structured content used by the redesigned React Email
template: number, date, preheader, intro, built, broke, numbers, closing and CTA.
The CTA currently points only to `https://www.zouantcha.com/log`. The legacy
paragraph payload remains supported for existing private tooling. The content
digest includes the template version and structured fields. See `emails/README.md`
for tokens, the confirmation template, rendering and the local preview/lint gate.

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

## Production issue activation (pending Wiel's go)

Production remains `ISSUE_SEND_MODE=disabled`. After review, provision production
`ISSUE_ADMIN_SECRET`, `RESEND_API_KEY`, and `RESEND_WEBHOOK_SECRET` through Wrangler
secret input without logging their values. Store the operator and webhook secrets
under their existing keychain services with account `news-production`. Create the
Resend webhook at `https://api.zouantcha.com/webhooks/resend` for delivered, bounced,
and complained events. No production secret or webhook is provisioned by this PR.
Only with Wiel's explicit go, set production mode to `confirmed-public` and deploy.
The authenticated production endpoint is `POST /issues/send`; staging retains
`POST /issues/test` and `allowlist`. Neither accepts recipient selection.

Save the reviewed `{id,title,paragraphs,issue?}` payload in a private `issue.json`.
Run this exact command with shell tracing disabled (the response contains counts):

```sh
python3 - <<'PY_SEND'
import json, subprocess, urllib.request
secret = subprocess.check_output(['security','find-generic-password','-s','resend-zouantcha-operator','-a','news-production','-w'], text=True).strip()
request = urllib.request.Request('https://api.zouantcha.com/issues/send', data=open('issue.json','rb').read(), headers={'Authorization':'Bearer '+secret,'Content-Type':'application/json'}, method='POST')
with urllib.request.urlopen(request, timeout=600) as response:
    print(response.read().decode())
PY_SEND
```

Each invocation selects at most 50 unclaimed eligible members and pauses 600 ms
between transport attempts. If `resume` is true, pause briefly and rerun the exact
same command and payload until false. Already claimed recipients are skipped,
including failed and unknown outcomes. Reconcile unknown outcomes privately;
never retry them automatically. Content is immutable for an issue ID. Each
recipient has an independent 32-byte unsubscribe capability and RFC 8058 headers;
production links use the production API. Restore disabled mode after sending.

Worker strict gate (generate runtime declarations outside the checkout):

```sh
pnpm exec wrangler types /tmp/build-log-worker-types.d.ts --config workers/field-notes/wrangler.jsonc --env staging
pnpm exec tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution bundler --lib ES2022,DOM --skipLibCheck --esModuleInterop --jsx react-jsx /tmp/build-log-worker-types.d.ts workers/field-notes/src/index.ts workers/scorecard/src/index.ts
```

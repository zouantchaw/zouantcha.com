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

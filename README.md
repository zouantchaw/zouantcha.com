# zouantcha.com

Personal site and writing archive for Wielfried Zouantcha.

## Development

```bash
pnpm install
pnpm dev
```

The local site runs at `http://localhost:3000`.

## Build

```bash
pnpm build
```

## Field Notes

`/start` collects email addresses for Field Notes. Addresses are stored in Cloudflare D1 through a private Worker. The subscriber list is never exposed on the site.

Required server environment variables:

- `FIELD_NOTES_WORKER_URL`
- `FIELD_NOTES_INGEST_SECRET`

Export subscribers (Wrangler must be authenticated to the `lovethegame` Cloudflare account):

```bash
pnpm field-notes:export
```

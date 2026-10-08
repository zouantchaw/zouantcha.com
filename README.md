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

## Production

Cloudflare deployment commands are explicit; pushing to `main` alone does not deploy.
Production runs on `www.zouantcha.com` with the Field Notes API at `api.zouantcha.com`.
DNS is hosted on Cloudflare; both production Workers disable workers.dev and public previews.
See [the Cloudflare runbook](docs/cloudflare-deployment.md) for resources, deployment,
acceptance and rollback. The `/start` page links to the Workflow Review at
`https://cal.com/wielfried/intro`; keep this booking URL stable.

## Field Notes

`/start` collects email addresses for Field Notes. Addresses are stored in Cloudflare D1 through a private Worker. The subscriber list is never exposed on the site.

The site uses the `FIELD_NOTES_API` service binding. Required server values:

- `FIELD_NOTES_WORKER_URL`
- `FIELD_NOTES_INGEST_SECRET`

The existing Worker and D1 database are retained. This flow stores subscriptions;
it does not send email. Keep the ingest secret server-only and out of source control.

Published blog MDX is compiled before development/build/typecheck into ignored
`app/blog/generated` modules, preserving the existing components and whitepaper.
After editing MDX during development, run `pnpm content:build` and restart the dev
server. Drafts are excluded.

Export subscribers (Wrangler must be authenticated to the `lovethegame` Cloudflare account):

```bash
pnpm field-notes:export
```

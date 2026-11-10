# Repository guidance

- Stack: Next.js 16 App Router, React 19, TypeScript, OpenNext on Cloudflare Workers.
- Use Node 24 and pnpm 10.28.0; install with `pnpm install --frozen-lockfile`.
- Read `docs/cloudflare-deployment.md` before changing deployment configuration.
- Work staging-first; production deploys only with Wiel's explicit go-ahead.
- Deploy the staging backend with `pnpm deploy:field-notes:staging`.
- Build and deploy the staging site with `pnpm deploy:staging`.
- Production site command: `pnpm deploy:cloudflare` (requires explicit go-ahead).
- Production backend command: `pnpm deploy:field-notes` (requires explicit go-ahead).
- Keep staging bindings, databases, cache buckets, analytics, and secrets isolated.
- Keep staging on workers.dev with no custom domains or routes.
- Site copy lives in `app/lib/*.ts`.
- Do not add new test files.
- Run `pnpm typecheck` and verify with agent-browser at desktop and phone widths.
- Never print secrets or commit credentials, subscriber exports, or local env files.

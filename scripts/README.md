# Case study PDFs

The website serves reviewed static PDFs from `public/downloads`. Visitors download immediately, without a browser-print dialog or a PDF generation service.

After editing a case study or its figures:

1. `npm ci --prefix scripts`
2. `cd scripts && npx playwright install chromium` (first use only)
3. Start the site on localhost:3000, then run `npm run export:case-studies` from the repository root.
4. Inspect the generated PDFs and commit them with the article change.

`PDF_BASE_URL` overrides the source site. `CHROMIUM_PATH` can select an already-installed Chromium binary. Browser automation is isolated from the website's runtime dependencies.

The export keeps article text, images, source links, and the initial state of interactive figures. The opening links back to the live version for interaction. It does not publish visitor-selected state or fetch customer data. Analytics requests are blocked while exporting.

## Tracking and verification

`case_study_pdf_download` goes to the site's `/api/events` endpoint and then its
isolated Cloudflare Analytics Engine dataset, with the `case_study` slug. It
measures link activation, not completed reading or saving. Direct PDF requests
are not counted. No personal data is sent. Native downloads remain available
when JavaScript or analytics is blocked.

Run `SITE_URL=https://your-candidate-host node scripts/verify-case-study-downloads.mjs`.
It downloads four PDFs, checks filenames, intercepts native event requests without
sending test events, and checks that failed analytics does not block downloads.

Use the Cloudflare Analytics Engine SQL API to verify production ingestion:

```sql
SELECT blob1 AS event, count() AS rows
FROM zouantcha_site_events GROUP BY event FORMAT JSON
```

The schema stores event, path, safe property JSON, event count and optional web-vital
value. It excludes query strings, signup emails and visitor identifiers. See the
[Cloudflare runbook](../docs/cloudflare-deployment.md) for deployment and acceptance.

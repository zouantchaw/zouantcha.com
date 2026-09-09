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

`case_study_pdf_download` is a Vercel Analytics custom event with the `case_study` slug. It measures activation of the article's download link, not completed reading or saving. Direct requests to the PDF URL are not counted. It sends no personal data. The native download remains available when JavaScript or analytics is blocked.

Run `node scripts/verify-case-study-downloads.mjs` with the local site running. This downloads all four PDFs, verifies filenames, spies on the Vercel event call without sending test events, and checks that tracking failure does not block a download.

Custom events must be supported by the deployed Vercel project's plan. Check its Web Analytics Events panel after deployment; localhost verification does not establish production ingestion.

References:
- https://vercel.com/docs/analytics/custom-events
- https://vercel.com/docs/analytics/quickstart

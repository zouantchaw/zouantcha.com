import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const base = process.env.SITE_URL || 'http://localhost:3000'
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH })
try {
  const page = await browser.newPage({ acceptDownloads: true })
  const events = []
  await page.route('**/api/events', async route => {
    const payload = route.request().postDataJSON()
    if (payload?.event === 'case_study_pdf_download') events.push(payload)
    await route.fulfill({ status: 204 })
  })
  for (const slug of ['mtl-archives', 'portmind', 'diane-party-rentals', 'starthome']) {
    const hydrated = page.waitForRequest(request => request.url().endsWith('/api/events') && request.postDataJSON()?.event === 'case_study_view')
    await page.goto(`${base}/case-studies/${slug}`, { waitUntil: 'load' })
    await hydrated
    await page.locator('main h1').first().waitFor()
    events.length = 0
    const tracked = page.waitForRequest(request => request.url().endsWith('/api/events') && request.postDataJSON()?.event === 'case_study_pdf_download')
    const download = page.waitForEvent('download')
    await page.getByRole('link', { name: /Download .* case study as PDF/ }).click()
    const file = await download
    assert.equal(await file.failure(), null)
    assert.equal(file.suggestedFilename(), `${slug}-wiel-zouantcha.pdf`)
    await tracked
    assert.equal(events.length, 1)
    assert.equal(events[0].data.case_study, slug)
    console.log(`${slug}: PDF downloaded, one correctly attributed native event`)
  }
  await page.unroute('**/api/events')
  await page.route('**/api/events', route => route.abort())
  const blockedDownload = page.waitForEvent('download')
  await page.getByRole('link', { name: /Download .* case study as PDF/ }).click()
  assert.equal(await (await blockedDownload).failure(), null)
  console.log('Download succeeds with analytics failure')
} finally { await browser.close() }

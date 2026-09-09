import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH })
try {
  const page = await browser.newPage({ acceptDownloads: true })
  await page.route(/seline|vercel-insights|_vercel\/insights/, route => route.abort())
  for (const slug of ['mtl-archives', 'portmind', 'diane-party-rentals', 'starthome']) {
    await page.goto(`http://localhost:3000/case-studies/${slug}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => { window.downloadEvents = []; window.va = (...args) => window.downloadEvents.push(args) })
    const download = page.waitForEvent('download')
    await page.getByRole('link', { name: /Download .* case study as PDF/ }).click()
    const file = await download
    assert.equal(await file.failure(), null)
    assert.equal(file.suggestedFilename(), `${slug}-wiel-zouantcha.pdf`)
    const events = await page.evaluate(() => window.downloadEvents.filter(e => e[0] === 'event'))
    assert.equal(events.length, 1)
    assert.equal(events[0][1].name, 'case_study_pdf_download')
    assert.equal(events[0][1].data.case_study, slug)
    console.log(`${slug}: PDF downloaded, one correctly attributed Vercel event`)
  }
  await page.evaluate(() => { window.va = () => { throw new Error('blocked analytics') } })
  const blockedDownload = page.waitForEvent('download')
  await page.getByRole('link', { name: /Download .* case study as PDF/ }).click()
  assert.equal(await (await blockedDownload).failure(), null)
  console.log('Download succeeds with analytics failure')
} finally { await browser.close() }

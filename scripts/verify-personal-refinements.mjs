import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const base = process.env.SITE_URL || 'http://localhost:3000'
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_PATH,
})
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } })
try {
  const snapshot = () =>
    page.evaluate(() => ({
      title: document.title,
      article: document
        .querySelector('article.prose')
        ?.textContent.replace(/\s+/g, ' ')
        .trim(),
      anchors: Array.from(document.querySelectorAll('article.prose [id]')).map(
        (e) => e.id,
      ),
      images: Array.from(document.querySelectorAll('article.prose img')).map(
        (e) => ({ src: e.getAttribute('src'), alt: e.getAttribute('alt') }),
      ),
      links: Array.from(document.querySelectorAll('article.prose a')).map((e) =>
        e.getAttribute('href'),
      ),
      metadata: Array.from(
        document.querySelectorAll(
          'meta[name],meta[property],link[rel="canonical"]',
        ),
      ).map((e) =>
        Object.fromEntries(
          Array.from(e.attributes).map((a) => [a.name, a.value]),
        ),
      ),
      structured: Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      ).map((e) => JSON.parse(e.textContent)),
    }))
  await page.goto('https://www.zouantcha.com/blog/bitcoin-whitepaper', {
    waitUntil: 'domcontentloaded',
  })
  const production = await snapshot()
  assert(production.article.length > 10000)
  await page.goto(base + '/blog/bitcoin-whitepaper', {
    waitUntil: 'domcontentloaded',
  })
  assert.deepEqual(await snapshot(), production)
  console.log(
    'Bitcoin: production article, images, anchors, links, metadata and structured data match',
  )
  for (const route of [
    '/slides',
    '/slides/portmind-ml-project-brief.html',
    '/slides/portmind-past-seven-days.html',
    '/slides/portmind-weekly-update-2026-07-21-31.html',
  ]) {
    assert.equal((await page.goto(base + route)).status(), 404)
  }
  await page.goto(base + '/')
  assert.equal(await page.locator('a[href*="/slides"]').count(), 0)
  assert(await page.getByRole('heading', { name: 'Hi, I’m Wiel.' }).isVisible())
  await page.screenshot({ path: '/tmp/personal-refined-desktop.png' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base + '/')
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  )
  await page.screenshot({
    path: '/tmp/personal-refined-mobile.png',
    fullPage: true,
  })
  await page.goto(base + '/case-studies/portmind')
  await page.locator('.case-essay-section').nth(2).scrollIntoViewIfNeeded()
  await page.waitForFunction(() =>
    localStorage.getItem('personal-index:reading-position'),
  )
  await page.goto(base + '/')
  await page.locator('.continue-reading a').waitFor()
  assert.match(
    await page.locator('.continue-reading a').getAttribute('href'),
    /^\/case-studies\/portmind#/,
  )
  await page.getByRole('button', { name: 'Clear reading position' }).click()
  assert.equal(await page.locator('.continue-reading').count(), 0)
  assert.equal(
    await page.evaluate(() =>
      localStorage.getItem('personal-index:reading-position'),
    ),
    null,
  )
  for (const slug of [
    'reading-needs-a-second-pass',
    'moving-from-logseq-to-obsidian',
    'more-parallel-less-organized',
  ]) {
    assert.equal((await page.goto(base + '/blog/' + slug)).status(), 404)
  }
  console.log(
    'Slides removed; mobile layout, reading position, clear control and removed personal notes passed',
  )
} finally {
  await browser.close()
}

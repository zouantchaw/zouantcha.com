import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const base = process.env.SITE_URL || 'http://localhost:3000'
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_PATH,
})
const page = await browser.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
const routes = [
  '/',
  '/case-studies',
  '/about',
  '/contact',
  '/work',
  '/work/oloodi',
  '/work/ethos',
  '/work/saas-alerts',
  '/blog',
  '/bookshelf?year=2025',
  '/topics/montreal',
  '/slides',
  '/search?q=PortMind',
  '/case-studies/mtl-archives',
  '/case-studies/portmind',
  '/case-studies/diane-party-rentals',
  '/case-studies/starthome',
]
try {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const route of routes) {
      const res = await page.goto(base + route, {
        waitUntil: 'domcontentloaded',
      })
      assert.equal(res.status(), 200, route)
      await page.locator('main h1').first().waitFor()
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      )
      assert.equal(overflow, false, `horizontal overflow: ${width} ${route}`)
    }
    console.log(`Navigation and overflow: ${routes.length} pages at ${width}px`)
  }
  await page.goto(base + '/search?q=PortMind')
  assert((await page.locator('.result-row').count()) > 0)
  await page.goto(base + '/search?q=zzzzzznothing')
  assert.equal(await page.locator('.result-row').count(), 0)
  await page.getByRole('link', { name: 'clear the filters' }).click()
  await page.locator('.result-row').first().waitFor()
  assert((await page.locator('.result-row').count()) > 0)
  await page.goto(base + '/bookshelf?year=2025')
  assert.equal(await page.locator('.book-item').count(), 4)
  await page.getByRole('link', { name: 'List view', exact: true }).click()
  await page.locator('.book-list').waitFor()
  assert.equal(await page.locator('.book-list').count(), 1)
  await page.locator('.book-cover').first().click()
  await page.waitForURL('**/bookshelf/the-chip-2025')
  assert.match(await page.locator('h1').textContent(), /The Chip/)
  console.log(
    'Search, empty state, shelf filters, list view and book details passed',
  )
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base + '/')
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  assert(await page.getByRole('dialog', { name: 'Look around' }).isVisible())
  await page.keyboard.press('Escape')
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    'Menu ＋',
  )
  await page.goto(base + '/case-studies/diane-party-rentals')
  await page.getByRole('button', { name: 'Contents', exact: true }).click()
  const chapter = page.getByRole('dialog').locator('nav a').nth(2)
  const hash = await chapter.getAttribute('href')
  await chapter.click()
  assert(new URL(page.url()).hash === hash)
  await page
    .getByRole('button', { name: /Expand image:/ })
    .first()
    .click()
  const viewer = page.getByRole('dialog', { name: 'Image viewer' })
  assert(await viewer.isVisible())
  await viewer.getByRole('button', { name: 'Zoom in', exact: true }).click()
  assert(await viewer.getByText('150%', { exact: true }).isVisible())
  await page.keyboard.press('Escape')
  assert.equal(await page.locator('dialog[open]').count(), 0)
  console.log(
    'Mobile menu, focus restoration, contents navigation and image zoom passed',
  )
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(base + '/bookshelf?year=2025')
  await page.locator('.book-cover').first().hover()
  assert.equal(
    await page
      .locator('.book-cover')
      .first()
      .evaluate((el) => getComputedStyle(el).transform),
    'none',
  )
  console.log('Reduced-motion shelf passed')
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(base + '/topics/montreal')
    await page.getByRole('button', { name: /Preview reference:/ }).click()
    const selector = width === 390 ? 'dialog[open]' : '.reference-popover:popover-open'
    await page.locator(selector).waitFor()
    assert(await page.locator(selector).getByRole('link', { name: 'Open the full note ↗' }).isVisible())
    await page.keyboard.press('Escape')
    assert.equal(await page.locator(selector).count(), 0)
  }
  console.log('Desktop reference popover and mobile reading drawer passed')
  assert.deepEqual(errors, [])
} finally {
  await browser.close()
}

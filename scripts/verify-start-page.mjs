import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const base = process.env.SITE_URL || 'http://localhost:3000'
const unique = `field-notes-test-${Date.now()}@example.com`
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_PATH,
})

async function post(email, extra = {}) {
  const response = await fetch(`${base}/api/field-notes`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'start_page', ...extra }),
  })
  const body = await response.json().catch(() => ({}))
  return { status: response.status, body }
}

try {
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.addInitScript(() => {
    const record = (...args) => {
      const all = JSON.parse(sessionStorage.getItem('startEvents') || '[]')
      all.push(args)
      sessionStorage.setItem('startEvents', JSON.stringify(all))
    }
    const wrap = () => {
      const current = window.va
      if (current && current.__startWrapped) return
      const wrapped = (...args) => {
        record(...args)
        if (typeof current === 'function') current(...args)
      }
      wrapped.__startWrapped = true
      window.va = wrapped
    }
    wrap()
    setInterval(wrap, 20)
  })

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 })
    const response = await page.goto(`${base}/start`, { waitUntil: 'domcontentloaded' })
    assert.equal(response.status(), 200, `/start at ${width}`)
    await page.locator('main h1').first().waitFor()
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    )
    assert.equal(overflow, false, `horizontal overflow at ${width}`)
  }

  const invalid = await post('not-an-email')
  assert.equal(invalid.status, 400)
  assert.equal(invalid.body.error, 'invalid_email')

  const created = await post(unique, {
    utm_source: 'instagram',
    utm_medium: 'social',
    utm_campaign: '90day',
  })
  assert.equal(created.status, 200)
  assert.equal(created.body.ok, true)

  const duplicate = await post(unique)
  assert.equal(duplicate.status, 200)
  assert.equal(duplicate.body.ok, true)

  const honeypot = await post(`bot-${Date.now()}@example.com`, { website: 'https://spam.test' })
  assert.equal(honeypot.status, 200)
  assert.equal(honeypot.body.ok, true)

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${base}/start?utm_source=instagram&utm_medium=social&utm_campaign=90day`, {
    waitUntil: 'networkidle',
  })
  const recorded = async (name) =>
    page.evaluate((eventName) => {
      const events = JSON.parse(sessionStorage.getItem('startEvents') || '[]')
      return events.filter((event) => event[0] === 'event' && event[1]?.name === eventName)
    }, name)

  const viewEvents = await recorded('start_page_view')
  assert.equal(viewEvents.length > 0, true, 'start_page_view')

  const caseStudy = page.locator('.start-proof-card').first()
  assert.match(await caseStudy.getAttribute('href'), /utm_source=instagram/)
  await caseStudy.evaluate((el) => {
    el.addEventListener('click', (event) => event.preventDefault(), { capture: true })
  })
  await caseStudy.click()
  const caseEvents = await recorded('case_study_click')
  assert.equal(caseEvents.length > 0, true, 'case_study_click')
  assert.equal(caseEvents[0][1].data.case_study, 'mtl-archives')

  await page.locator('#field-notes-email').fill(unique)
  await page.getByRole('button', { name: 'Join Field Notes' }).click()
  await page.locator('.start-success').waitFor()
  assert.match(await page.locator('.start-success').textContent(), /You're in/)
  const signupEvents = await page.evaluate(() => JSON.parse(sessionStorage.getItem('startEvents') || '[]'))
  assert.equal(
    signupEvents.some((event) => event[1]?.name === 'field_notes_signup_attempt'),
    true,
    'field_notes_signup_attempt',
  )
  assert.equal(
    signupEvents.some((event) => event[1]?.name === 'field_notes_signup_success'),
    true,
    'field_notes_signup_success',
  )

  const work = page.getByRole('link', { name: 'Work with me' })
  assert.match(await work.getAttribute('href'), /utm_campaign=90day/)
  await page.evaluate(() => {
    document.querySelector('a[href*="/contact"]')?.addEventListener('click', (event) => event.preventDefault(), {
      capture: true,
    })
  })
  await work.click()
  const workEvents = await recorded('work_with_me_click')
  assert.equal(workEvents.length > 0, true, 'work_with_me_click')

  assert.equal(errors.length, 0, errors.join('\n'))
  console.log('Start page, mobile layout, signup, duplicate, invalid email, and analytics passed')
} finally {
  await browser.close()
}

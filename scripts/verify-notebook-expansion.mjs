import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const notes = [{"slug":"two-and-a-half-months","date":"2020-05-02","topic":"reading"},{"slug":"first-pair-programming","date":"2020-05-07","topic":"software"},{"slug":"transcript-to-note","date":"2020-05-08","topic":"reading"},{"slug":"hadnt-thought-about-the-form","date":"2020-05-09","topic":"software"},{"slug":"finishing-sinatra","date":"2020-05-17","topic":"software"},{"slug":"another-weekly-planner","date":"2020-05-24","topic":"everyday"},{"slug":"an-hour-before-rails","date":"2020-05-29","topic":"everyday"},{"slug":"forty-five-seconds-uphill","date":"2020-06-04","topic":"everyday"},{"slug":"seventy-one-hours","date":"2020-06-08","topic":"everyday"},{"slug":"the-map-already-existed","date":"2020-10-14","topic":"cities"},{"slug":"siddhartha-again","date":"2020-10-19","topic":"reading"},{"slug":"just-go-and-run","date":"2020-10-19","topic":"everyday"},{"slug":"ruby-and-machine-learning","date":"2020-10-25","topic":"software"},{"slug":"starting-with-the-rental-screen","date":"2023-10-19","topic":"software"},{"slug":"rental-app-still-has-to-rent","date":"2023-12-09","topic":"software"},{"slug":"same-book-different-moment","date":"2026-02-24","topic":"reading"},{"slug":"an-email-worth-keeping","date":"2026-03-13","topic":"software"},{"slug":"wrong-building","date":"2026-03-15","topic":"cities"},{"slug":"what-does-delivery-include","date":"2026-03-23","topic":"software"},{"slug":"country-i-said-id-never-visit","date":"2026-03-23","topic":"cities"},{"slug":"waiting-for-the-gym","date":"2026-04-07","topic":"everyday"},{"slug":"went-to-look-at-tables","date":"2026-04-27","topic":"everyday"},{"slug":"conversation-after-unloading","date":"2026-04-28","topic":"everyday"},{"slug":"local-content","date":"2026-05-19","topic":"software"},{"slug":"going-in-circles-with-codex","date":"2026-05-25","topic":"everyday"}]
const browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_PATH})
const page = await browser.newPage()
try {
 for (const note of notes) {
  const response = await page.goto('http://localhost:3000/blog/'+note.slug)
  assert.equal(response.status(),200,note.slug)
  assert(await page.locator('article').innerText().then(t=>t.includes('Edited for publication.')),note.slug)
  assert.equal(await page.locator('h1').count(),1)
 }
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:950})
  await page.goto('http://localhost:3000/blog')
  assert.equal(await page.locator('.result-row').count(),34)
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))
  await page.getByRole('link',{name:'2020',exact:true}).click()
  await page.waitForFunction(()=>document.querySelectorAll('.result-row').length===13)
  assert.equal(await page.locator('.result-row').count(),13)
  await page.getByRole('link',{name:'Everyday',exact:true}).click()
  await page.waitForFunction(()=>document.querySelectorAll('.result-row').length===5)
  assert.equal(await page.locator('.result-row').count(),5)
  await page.goto('http://localhost:3000/blog?topic=cities&year=2026')
  assert.equal(await page.locator('.result-row').count(),2)
  await page.screenshot({path:'/tmp/notebook-'+width+'.png',fullPage:true})
 }
 console.log('25 new notes render; original-year and topic filters pass at desktop and mobile widths.')
} finally {await browser.close()}

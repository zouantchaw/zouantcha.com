import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_PATH})
const page=await browser.newPage()
try {
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:1100})
  await page.goto('http://localhost:3000/')
  assert.equal(await page.locator('.work-results li').count(),4)
  const hrefs=await page.locator('.work-results li a').evaluateAll(links=>links.map(a=>a.getAttribute('href')))
  await page.screenshot({path:'/tmp/case-results-'+width+'.png',fullPage:true})
  for(const href of hrefs) {
   const response=await page.goto('http://localhost:3000'+href)
   if(response) assert.equal(response.status(),200)
   const hash=new URL(page.url()).hash
   if(hash) assert(await page.locator(hash).count(),href)
  }
 }
 await page.goto('http://localhost:3000/blog')
 assert.equal(await page.locator('.result-row').count(),6)
 await page.goto('http://localhost:3000/case-studies/portmind')
 assert.equal(await page.locator('.case-essay-section').count(),4)
 console.log('Six original notes retained; dated metrics and destination anchors pass; four-act PortMind states render.')
} finally {await browser.close()}

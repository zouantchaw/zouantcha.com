import { chromium } from 'playwright'
import { mkdir, readFile } from 'node:fs/promises'

// Run against the current local site: npm run export:case-studies.
const base = process.env.PDF_BASE_URL || 'http://localhost:3000'
const source = await readFile(new URL('../app/lib/work.ts', import.meta.url), 'utf8')
const slugs = [...source.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1])
if (!slugs.length) throw new Error('No case studies found')
await mkdir('public/downloads', { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH })
try {
  for (const slug of slugs) {
    const page = await browser.newPage({ viewport: { width: 1000, height: 900 }, reducedMotion: 'reduce' })
    // Exports should not register analytics visits.
    await page.route(/seline|vercel-insights|_vercel\/insights/, route => route.abort())
    await page.goto(`${base}/case-studies/${slug}`, { waitUntil: 'networkidle' })
    await page.locator('.case-essay h1').waitFor()
    // Activate lazy figures before printing their static state.
    for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 700) {
      await page.evaluate(y => window.scrollTo(0, y), y)
      await page.waitForTimeout(80)
    }
    await page.waitForLoadState('networkidle')
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach(img => { img.loading = 'eager' })
      await document.fonts.ready
      await Promise.all([...document.images].map(img => img.decode().catch(() => {})))
      for (const link of document.querySelectorAll('a[href^="/"]')) {
        link.href = `https://zouantcha.com${link.getAttribute('href')}`
      }
      const note = document.createElement('p')
      note.textContent = 'Wiel Zouantcha · Read and interact with this case study at '
      const link = document.createElement('a')
      link.href = `https://zouantcha.com${location.pathname}`
      link.textContent = link.href
      note.append(link)
      note.style.cssText = 'font-size:10px;color:#666;margin-top:16px'
      document.querySelector('.case-essay-header').append(note)
    })
    await page.addStyleTag({ content: `
      @media print {
        @page { size: A4; margin: 18mm 17mm 20mm; }
        body { background:white!important; }
        body > header, body > footer, body > a, nextjs-portal,
        .case-essay > nav, .case-essay > div:first-child, .case-study-download { display:none!important; }
        .site-main { padding:0!important; margin:0!important; }
        .case-essay { width:100%; margin:0; }
        .case-essay-body { display:block; }
        .case-essay-section { margin-top:28px; }
        .case-essay-section h2 { font-size:22px; margin-bottom:14px; break-after:avoid; }
        h1,h2,h3 { break-after:avoid; }
        .case-essay-section p, .case-essay-section li { font-size:11px; line-height:1.65; orphans:3; widows:3; }
        .case-essay > * + * { margin-top:26px; }
        figure { break-inside:avoid; }
        img { max-height:190mm; object-fit:contain; }
        table { font-size:10px; }
        tr { break-inside:avoid; }
        .case-essay-section figure { margin-block:18px; }
        .case-essay-section figcaption { font-size:9px; }
        * { animation:none!important; transition:none!important; }
      }
    ` })
    await page.pdf({ path: `public/downloads/${slug}.pdf`, printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: '<div style="font-size:9px;color:#777;width:100%;text-align:center">Wiel Zouantcha · <span class="pageNumber"></span> / <span class="totalPages"></span></div>' })
    console.log(`Exported ${slug}`)
    await page.close()
  }
} finally { await browser.close() }

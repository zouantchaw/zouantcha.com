import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { renderBuildLogIssue, renderConfirmation } from '../workers/field-notes/src/email'
import { issueOne, issueOneSubject } from '../emails/build-log'

async function main() {
  const directory = resolve(process.argv[2] || '.email-preview')
  await mkdir(directory, { recursive: true })
  // Deliberately inert preview URLs. Never export a real recipient capability.
  const unsubscribe = 'https://example.invalid/unsubscribe'
  const mails = {
    issue: await renderBuildLogIssue(issueOneSubject, issueOne.intro, unsubscribe, issueOne),
    confirmation: await renderConfirmation('https://zouantcha-site-staging.wiel.workers.dev/log/confirm?token=preview', unsubscribe),
  }
  const results: object[] = []
  for (const [name, mail] of Object.entries(mails)) {
    const html = mail.html
    const bytes = Buffer.byteLength(html)
    if (bytes >= 100_000 || /display\s*:\s*(?:inline-)?(?:flex|grid)|<svg\b|<link\b[^>]*stylesheet|@import|@font-face/i.test(html)) throw new Error(`${name}: email lint failed`)
    const imgs = html.match(/<img\b[^>]*>/gi) || []
    if (!imgs.length || imgs.some(img => !/\balt="[^"]+"/.test(img) || !/\bwidth="\d+"/.test(img) || !/\bheight="\d+"/.test(img))) throw new Error(`${name}: image attributes missing`)
    if (!/<html[^>]+lang="en"/.test(html) || !html.includes('\u200d') || /<a[^>]+(?:maps:|maps\.google|1010)/i.test(html)) throw new Error(`${name}: language/address gate failed`)
    if (html.includes('—') || mail.text.includes('—')) throw new Error(`${name}: em dash in copy`)
    await writeFile(resolve(directory, `${name}.html`), html)
    await writeFile(resolve(directory, `${name}.txt`), mail.text)
    // A strict Gmail-like degradation: all stylesheets removed, no web fonts.
    const gmail = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<link\b[^>]*>/gi, '')
    await writeFile(resolve(directory, `${name}-gmail.html`), gmail)
    // Chromium's automatic inversion is a stress test, not Gmail's private algorithm.
    // Remove color-scheme claims so Chromium does not exempt the page from inversion.
    await writeFile(resolve(directory, `${name}-gmail-forced-dark.html`), gmail.replace(/<meta\b[^>]*name="(?:supported-)?color-schemes?"[^>]*>/gi, ''))
    results.push({ template: name, bytes, images: imgs.length, lint: 'PASS', plainTextFromReactEmail: true, addressJoiners: true })
  }
  await writeFile(resolve(directory, 'issue-request.json'), JSON.stringify({ id: 'build-log-1-redesign-2026-10-25', title: issueOneSubject, paragraphs: issueOne.intro, issue: issueOne }, null, 2))
  await writeFile(resolve(directory, 'lint.json'), JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results, null, 2))
}
main().catch(error => { console.error(error.message); process.exitCode = 1 })

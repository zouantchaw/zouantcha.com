import type { Metadata } from 'next'
export const actionMetadata: Metadata = {
  title: 'Build log email preferences', description: 'Manage your build-log email request.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: 'no-referrer',
  openGraph: { title: 'Build log email preferences', description: 'Manage your build-log email request.', url: 'https://www.zouantcha.com/log' },
  twitter: { title: 'Build log email preferences', description: 'Manage your build-log email request.' },
  alternates: { canonical: 'https://www.zouantcha.com/log' },
}
export async function BuildLogAction({ action, searchParams }: { action: 'confirm' | 'unsubscribe'; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const token = typeof params.token === 'string' && /^[a-f0-9]{64}$/.test(params.token) ? params.token : ''
  const messages: Record<string, string> = {
    confirmed: 'Your email is confirmed. You have joined the build log.',
    unsubscribed: 'You are unsubscribed from the build log.',
    expired: 'This confirmation link has expired. Request a new signup from the build log.',
    invalid: 'This link is invalid or no longer active.',
    already_used: 'This confirmation link has already been used.',
    unavailable: 'This request could not be completed. Please try the original link again.',
    rate_limited: 'Please try the original link again in a few minutes.',
  }
  const result = typeof params.result === 'string' ? messages[params.result] : undefined
  const label = action === 'confirm' ? 'Confirm my email' : 'Unsubscribe'
  return <div className="site-shell start-page">
    <header className="start-hero"><p className="eyebrow">Build log</p><h1>{action === 'confirm' ? 'Confirm your email' : 'Leave the build log'}</h1></header>
    <section className="start-section">
      {result ? <p role="status">{result}</p> : token ? <>
        <p>{action === 'confirm' ? "Use the button to confirm you want Wiel's weekly build log by email." : 'Use the button to stop build-log emails. No login is needed.'}</p>
        <form className="start-form" method="post" action={`/api/build-log/${action}`}>
          <input type="hidden" name="token" value={token} />
          <button className="search-submit" type="submit">{label}</button>
        </form>
      </> : <p role="status">{messages.invalid}</p>}
      <p><a href="/log">Back to the build log</a></p>
    </section>
  </div>
}

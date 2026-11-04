import { redirect } from 'next/navigation'
import { pageMetadata } from 'app/lib/metadata'
import { ProfilePhoto } from 'app/components/profile-photo'
import { TrackAnchor } from 'app/components/track-link'
import { StartPageView } from 'app/components/start-page-view'
import { pickAttribution, withAttribution } from 'app/lib/field-notes'
import { site } from 'app/lib/site'
import { startCopy } from 'app/lib/start'

const title = 'Let’s talk. · Wiel Zouantcha'
const startMetadata = pageMetadata({
  title,
  description: startCopy.body,
  path: '/start',
  section: 'Work with me',
})

export const metadata = {
  ...startMetadata,
  title: { absolute: title },
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value
  const signup = first(params.signup)
  const error = first(params.error)
  const status = new URLSearchParams()
  if (signup === 'preview' || signup === 'pending_confirmation') status.set('signup', signup)
  if (error && ['invalid', 'invalid_email', 'rate_limited', 'unavailable'].includes(error)) status.set('error', error)
  // Old non-JavaScript signup returns still reach their feedback on the build log.
  // Only recognized status values and the existing bounded attribution survive.
  if (status.size) {
    redirect(withAttribution(`/log?${status.toString()}#field-notes`, pickAttribution(params)))
  }

  return (
    <div className="site-shell start-page">
      <StartPageView />
      <header className="start-hero">
        <div className="start-identity">
          <ProfilePhoto size={56} priority />
          <div>
            <p className="start-name">{site.name}</p>
            <p className="eyebrow">{startCopy.eyebrow}</p>
          </div>
        </div>
        <h1>{startCopy.headline}</h1>
        <p className="hero-intro">{startCopy.body}</p>
        <div className="hero-links">
          <TrackAnchor
            href={startCopy.projectIntroHref}
            event="project_intro_click"
            data={{ source_page: 'start', destination: 'cal.com/wielfried/intro', placement: 'hero' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {startCopy.primaryCta}
          </TrackAnchor>
        </div>
        <p className="start-note">{startCopy.note}</p>
      </header>
    </div>
  )
}

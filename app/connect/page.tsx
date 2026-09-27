import { pageMetadata } from 'app/lib/metadata'
import { ConnectPageView } from 'app/components/connect-page-view'
import { ProfilePhoto } from 'app/components/profile-photo'
import { TrackAnchor, TrackLink } from 'app/components/track-link'
import { connectCopy, mailto, site } from 'app/lib/site'
import { withSrc } from 'app/lib/source'

const title = `${site.name} · Connect`
const description =
  'Software engineer building production software across full-stack systems, data and applied AI. Open to engineering roles and select consulting.'

export const metadata = {
  ...pageMetadata({
    title,
    description,
    path: '/connect',
    section: 'Connect',
  }),
  title: { absolute: `${site.name} · Exploit Summit 2026` },
}

function readSrc(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  return (raw || 'exploit').trim().slice(0, 80)
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const src = readSrc(params.src)

  return (
    <div className="site-shell connect-page">
      <ConnectPageView />
      <header className="connect-hero">
        <ProfilePhoto size={72} priority />
        <div>
          <h1>{site.name}</h1>
          <p className="eyebrow">{connectCopy.eyebrow}</p>
        </div>
      </header>
      <p className="connect-body">{connectCopy.body}</p>
      <p className="connect-event">{connectCopy.event}</p>
      <div className="connect-actions">
        <TrackLink
          href={withSrc('/case-studies', src)}
          event="case_study_view"
          data={{ from: 'connect', src }}
          className="connect-button"
        >
          Selected Work
        </TrackLink>
        <TrackLink
          href={withSrc(site.resumePage, src)}
          event="connect_resume_click"
          data={{ from: 'connect', src }}
          className="connect-button"
        >
          Résumé
        </TrackLink>
        <TrackAnchor
          href={site.linkedin}
          event="linkedin_click"
          data={{ from: 'connect', src }}
          className="connect-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </TrackAnchor>
        <TrackAnchor
          href={mailto('Hello from Exploit Summit')}
          event="email_click"
          data={{ from: 'connect', src }}
          className="connect-button connect-button-primary"
        >
          Email Me
        </TrackAnchor>
      </div>
      <ul className="connect-proof">
        {connectCopy.proof.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

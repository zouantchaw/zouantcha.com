import { pageMetadata } from 'app/lib/metadata'
import { ProfilePhoto } from 'app/components/profile-photo'
import { FieldNotesForm } from 'app/components/field-notes-form'
import { TrackAnchor, TrackLink } from 'app/components/track-link'
import { StartPageView } from 'app/components/start-page-view'
import { pickAttribution, withAttribution } from 'app/lib/field-notes'
import { site } from 'app/lib/site'
import { startCopy, startProof } from 'app/lib/start'

const title = 'Wiel Zouantcha — Software, AI & Real Businesses'
const description =
  'Software engineer and operator documenting what I build, test and learn across software, AI and real businesses.'

const startMetadata = pageMetadata({
  title,
  description,
  path: '/start',
  section: 'Start',
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
  const attribution = pickAttribution(params)
  const subscribed = params.subscribed === '1' || params.subscribed === 'true'
  const errorParam = Array.isArray(params.error) ? params.error[0] : params.error
  const error =
    errorParam === 'invalid'
      ? 'Enter a valid email address.'
      : errorParam === 'rate_limited'
        ? 'Please try again in a few minutes.'
        : errorParam
          ? 'Something went wrong. Please try again.'
          : undefined

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
          <a href="#field-notes">{startCopy.primaryCta}</a>
          <a href="#work">{startCopy.secondaryCta}</a>
        </div>
        <p className="start-note">{startCopy.note}</p>
      </header>

      <section id="work" className="start-section" aria-labelledby="work-heading">
        <h2 id="work-heading" className="eyebrow">
          {startCopy.workHeading}
        </h2>
        <ul className="start-proof">
          {startProof.map((item) => (
            <li key={item.slug}>
              <TrackLink
                href={withAttribution(`/case-studies/${item.slug}`, attribution)}
                event="case_study_click"
                data={{ case_study: item.slug, from: 'start_page' }}
                className="start-proof-card"
              >
                <span className="start-proof-copy">
                  <span className="start-proof-title">{item.title}</span>
                  <span className="start-proof-problem">{item.problem}</span>
                  <span className="start-proof-metric">{item.proof}</span>
                </span>
                <span className="start-proof-cta">
                  View case study <span aria-hidden="true">→</span>
                </span>
              </TrackLink>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="field-notes"
        className="start-section start-field-notes"
        aria-labelledby="field-notes-heading"
      >
        <h2 id="field-notes-heading">{startCopy.fieldNotesHeading}</h2>
        {startCopy.fieldNotesBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <FieldNotesForm
          attribution={attribution}
          initialStatus={subscribed ? 'success' : error ? 'error' : 'idle'}
          initialMessage={subscribed ? startCopy.fieldNotesSuccess : error}
        />
      </section>

      <section className="start-section start-work-with-me" aria-labelledby="work-with-me-heading">
        <h2 id="work-with-me-heading">{startCopy.workWithMeHeading}</h2>
        <p>{startCopy.workWithMeBody}</p>
        <TrackAnchor
          href={startCopy.projectIntroHref}
          event="project_intro_click"
          data={{
            source_page: 'start',
            destination: 'cal.com/wielfried/intro',
          }}
          className="start-intro-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {startCopy.workWithMeCta}
        </TrackAnchor>
      </section>
    </div>
  )
}

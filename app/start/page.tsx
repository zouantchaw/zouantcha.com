import { pageMetadata } from 'app/lib/metadata'
import { ProfilePhoto } from 'app/components/profile-photo'
import { FieldNotesForm } from 'app/components/field-notes-form'
import { TrackAnchor, TrackLink } from 'app/components/track-link'
import { StartPageView } from 'app/components/start-page-view'
import { pickAttribution, withAttribution } from 'app/lib/field-notes'
import { site } from 'app/lib/site'
import { startCopy } from 'app/lib/start'
import { products, watchItems } from 'app/lib/distribution'
import { BUILD_LOG_UNAVAILABLE } from 'app/lib/build-log-consent'

const title = 'Start here · Wiel Zouantcha'
const description = 'Software engineer, building with AI. Sharing what I make and learn. Watch the work, join the Sunday build log, or work with me.'
const currentBuild = products.find((product) => product.id === 'radar-evenements')!
const featuredWatchItems = watchItems.filter((item) => ['rental-text', 'mtl-archives', 'portmind'].includes(item.id))

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
  const subscribed = params.signup === 'preview' || params.signup === 'pending_confirmation'
  const errorParam = Array.isArray(params.error) ? params.error[0] : params.error
  const error =
    (errorParam === 'invalid' || errorParam === 'invalid_email')
      ? 'Enter a valid email address.'
      : errorParam === 'rate_limited'
        ? 'Please try again in a few minutes.'
        : errorParam === 'unavailable'
          ? BUILD_LOG_UNAVAILABLE
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
          <TrackLink
            href={withAttribution('/watch', attribution)}
            event="contact_project_click"
            data={{ destination: 'watch', placement: 'start' }}
          >
            {startCopy.primaryCta}
          </TrackLink>
          <TrackLink href="#field-notes" event="contact_project_click" data={{ destination: 'log', placement: 'start' }}>{startCopy.secondaryCta}</TrackLink>
          <TrackLink href="#work-with-me" event="contact_project_click" data={{ destination: 'review', placement: 'start' }}>{startCopy.workCta}</TrackLink>
        </div>
      </header>

      <section className="start-section start-work-with-me" aria-labelledby="current-build-heading">
        <h2 id="current-build-heading">{startCopy.currentBuildHeading}</h2>
        <p>{currentBuild.description}</p>
        <TrackLink
          href={withAttribution(`/lab#${currentBuild.id}`, attribution)}
          event="product_interest_click"
          data={{ product: currentBuild.id, placement: 'start', destination: 'lab' }}
          className="start-intro-cta"
        >
          {startCopy.currentBuildCta}
        </TrackLink>
      </section>

      <section id="work" className="start-section" aria-labelledby="work-heading">
        <h2 id="work-heading" className="eyebrow">
          {startCopy.workHeading}
        </h2>
        <ul className="start-proof">
          {featuredWatchItems.map((item) => {
            const external = item.href.startsWith('https:')
            const props = {
              href: external ? item.href : withAttribution(item.href, attribution),
              event: 'watch_item_click',
              data: { content: item.id, destination: item.id, placement: 'start' },
              className: 'start-proof-card',
            }
            const content = (
              <>
                <span className="start-proof-copy">
                  <span className="eyebrow">{item.category} / {item.type}</span>
                  <span className="start-proof-title">{item.title}</span>
                  <span className="start-proof-problem">{item.description}</span>
                </span>
                <span className="start-proof-cta">
                  {external ? 'Watch short video ↗' : 'Read case study →'}
                </span>
              </>
            )
            return (
              <li key={item.id}>
                {external ? <TrackAnchor {...props}>{content}</TrackAnchor> : <TrackLink {...props}>{content}</TrackLink>}
              </li>
            )
          })}
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
        <p><TrackLink href={withAttribution('/log', attribution)} event="contact_project_click" data={{ destination: 'log', placement: 'start' }}>Read about the weekly build log →</TrackLink></p>
        <FieldNotesForm preview={process.env.SITE_ENV === 'staging'}
          returnTo="/start"
          attribution={attribution}
          initialStatus={subscribed ? 'success' : error ? 'error' : 'idle'}
          initialDelivery={params.signup === 'pending_confirmation' ? 'pending_confirmation' : 'preview'} initialMessage={subscribed ? startCopy.fieldNotesSuccess : error}
        />
      </section>

      <section id="work-with-me" className="start-section start-work-with-me" aria-labelledby="work-with-me-heading">
        <h2 id="work-with-me-heading">{startCopy.workWithMeHeading}</h2>
        <p>{startCopy.workWithMeBody}</p>
        <p>{startCopy.pricing}</p>
        <p>{startCopy.pricingNote}</p>
        <TrackAnchor
          href={startCopy.projectIntroHref}
          event="project_intro_click"
          data={{ source_page: 'start', destination: 'cal.com/wielfried/intro', placement: 'review' }}
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

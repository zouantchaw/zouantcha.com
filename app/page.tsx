import { pageMetadata, shareImage } from 'app/lib/metadata'
import {
  availabilityCta,
  capabilities,
  homeExperience,
  homeHero,
  proof,
  selectedWork,
  site,
} from 'app/lib/site'
import { ContinueReading } from 'app/components/continue-reading'
import { TrackAnchor, TrackLink } from 'app/components/track-link'
import Link from 'next/link'
import Image from 'next/image'

const homeTitle = `${site.name} · ${site.title}`
const homeMetadata = pageMetadata({
  title: homeTitle,
  description: site.description,
  path: '',
  section: 'Software & AI Engineer',
})

export const metadata = {
  ...homeMetadata,
  title: { absolute: homeTitle },
  openGraph: {
    ...homeMetadata.openGraph,
    title: site.name,
    description: site.title,
    images: [
      {
        url: shareImage(site.name, site.title, 'Software & AI Engineer'),
        width: 1200,
        height: 630,
        alt: `${site.name} | Software & AI Engineer`,
        type: 'image/png',
      },
    ],
  },
}

export default function Page() {
  return (
    <div className="site-shell index-home">
      <header className="index-hero">
        <div>
          <p className="eyebrow">{homeHero.eyebrow}</p>
          <h1 className="convert-hero">{homeHero.title}</h1>
          <p className="hero-intro">{homeHero.body}</p>
          <p className="hero-availability">
            <span className="availability-dot" aria-hidden="true" />
            <span>{homeHero.availability}</span>
          </p>
          <div className="hero-actions">
            <TrackLink
              href="/log"
              event="contact_project_click"
              data={{ from: 'home_hero', destination: 'log' }}
              className="hero-cta-primary"
            >
              Get the weekly build log <span aria-hidden="true">→</span>
            </TrackLink>
            <Link href="/start" className="hero-cta-secondary">Work with me</Link>
            <TrackLink
              href="/watch"
              event="contact_project_click"
              data={{ from: 'home_hero' }}
              className="hero-cta-tertiary"
            >
              Watch the work
            </TrackLink>
          </div>
        </div>
        <aside className="home-portrait">
          <div className="portrait-entry">
            <Link href="/about" className="portrait-link" aria-label="A little more about Wiel">
              <span className="portrait-crop">
                <Image
                  src="/images/wiel-avatar.jpg"
                  alt="Wiel Zouantcha"
                  width={460}
                  height={460}
                  priority
                  sizes="(max-width: 700px) 110px, (max-width: 1000px) 210px, 250px"
                />
              </span>
              <span className="portrait-tab" aria-hidden="true">↗</span>
            </Link>
          </div>
          <h2>Wiel Zouantcha</h2>
          <p>{site.location}</p>
        </aside>
      </header>

      <section className="work-results" aria-label="Proof points">
        <ul>
          {proof.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>
                <span className="work-result-value">{item.value}</span>
                <span className="work-result-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="selected-work" className="selected-work" aria-labelledby="selected-work-heading">
        <div className="section-heading-row">
          <h2 id="selected-work-heading" className="eyebrow">
            Selected work
          </h2>
          <Link href="/case-studies">All case studies ↗</Link>
        </div>
        <ul>
          {selectedWork.map((item) => (
            <li key={item.slug}>
              <TrackLink
                href={item.href}
                event="case_study_view"
                data={{ case_study: item.slug, from: 'home' }}
                className="selected-work-card"
              >
                <span className="selected-work-title">{item.title}</span>
                <span className="selected-work-problem">{item.problem}</span>
                <span className="selected-work-result">{item.result}</span>
                <span className="selected-work-stack">{item.stack}</span>
                <span className="selected-work-cta">{item.cta}</span>
              </TrackLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="selected-work" aria-labelledby="current-product-heading">
        <div className="section-heading-row">
          <h2 id="current-product-heading" className="eyebrow">Currently building</h2>
          <Link href="/lab">Products and experiments ↗</Link>
        </div>
        <ul><li>
          <TrackLink href="/lab#radar-evenements" event="product_interest_click" data={{ product: 'radar-evenements', placement: 'home', destination: 'lab' }} className="selected-work-card">
            <span className="selected-work-title">Radar Événements</span>
            <span className="selected-work-problem">Alerts from Québec's public event alcohol permits for rental companies, caterers, DJs and security firms.</span>
            <span className="selected-work-result">In progress</span>
            <span className="selected-work-cta">Follow the work →</span>
          </TrackLink>
        </li></ul>
      </section>

      <ContinueReading />

      <section className="how-i-work" aria-labelledby="how-i-work-heading">
        <h2 id="how-i-work-heading" className="eyebrow">
          How I work
        </h2>
        <div className="how-i-work-grid">
          {capabilities.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-experience" aria-labelledby="experience-heading">
        <div className="section-heading-row">
          <h2 id="experience-heading" className="eyebrow">
            Experience
          </h2>
          <Link href="/work">Full experience →</Link>
        </div>
        <ul>
          {homeExperience.map((role) => (
            <li key={role.company}>
              <Link href={role.href} className="home-experience-row">
                <span className="home-experience-company">{role.company}</span>
                <span className="home-experience-role">{role.role}</span>
                <span className="home-experience-period">{role.period}</span>
                {role.note ? <span className="home-experience-note">{role.note}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="availability-block" aria-labelledby="availability-heading">
        <h2 id="availability-heading">{availabilityCta.title}</h2>
        <p>{availabilityCta.body}</p>
        <div className="availability-actions">
          <TrackAnchor
            href={availabilityCta.primary.href}
            event="project_intro_click"
            data={{ source_page: 'home', destination: 'cal.com/wielfried/intro', placement: 'closing' }}
            className="hero-cta-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {availabilityCta.primary.label}
          </TrackAnchor>
          <TrackLink
            href={availabilityCta.secondary.href}
            event="contact_project_click"
            data={{ from: 'home', destination: 'start' }}
            className="hero-cta-secondary"
          >
            {availabilityCta.secondary.label}
          </TrackLink>
        </div>
      </section>

      <section id="interests" className="interest-index">
        <div className="interest-label">
          <h2 className="eyebrow">Around here</h2>
        </div>
        <article>
          <h3>
            <Link href="/topics/montreal">Montréal ↗</Link>
          </h3>
          <p>Old photographs, a port camera, and questions about Montréal.</p>
          <div>
            <Link href="/case-studies/mtl-archives">MTL Archives</Link> ·{' '}
            <Link href="/case-studies/portmind">PortMind ↗</Link>
          </div>
        </article>
        <article>
          <h3>
            <Link href="/blog">Writing ↗</Link>
          </h3>
          <p>Reading lists since 2022, plus notes on what I took from them.</p>
          <div>
            <Link href="/blog">Notes</Link> ·{' '}
            <Link href="/bookshelf">Bookshelf ↗</Link>
          </div>
        </article>
        <article>
          <h3>
            <Link href="/about">About ↗</Link>
          </h3>
          <p>A little more on how I got here, and how I like to work.</p>
          <div>
            <Link href="/about">The longer story ↗</Link>
          </div>
        </article>
      </section>
    </div>
  )
}

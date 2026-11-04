import { pageMetadata, shareImage } from 'app/lib/metadata'
import {
  capabilities,
  homeExperience,
  selectedWork,
  site,
} from 'app/lib/site'
import { ContinueReading } from 'app/components/continue-reading'
import { TrackLink } from 'app/components/track-link'
import Link from 'next/link'
import Image from 'next/image'

const homeRole = 'Software Engineer'
const homeDescription = 'Wiel Zouantcha is a software engineer working across product, data and applied AI. Explore his work, experience, reading and personal projects.'
const homeHero = {
  eyebrow: homeRole,
  title: 'Hi, I’m Wiel.',
  body: [
    { text: 'I’m a software engineer with experience across SaaS products, integrations and data systems. I’ve worked at ' },
    { text: 'SaaS Alerts', href: '/work/saas-alerts' },
    { text: ', ' },
    { text: 'Ethos', href: '/work/ethos' },
    { text: ' and ' },
    { text: 'Oloodi', href: '/work/oloodi' },
    { text: ', and I now build software independently.' },
  ] as { text: string; href?: string }[],
  personal: [
    { text: 'When I’m not coding, I’m usually ' },
    { text: 'reading', href: '/bookshelf' },
    { text: ', training, or spending time with family and friends.' },
  ] as { text: string; href?: string }[],
}

const homeTitle = `${site.name} · ${homeRole}`
const homeMetadata = pageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: '',
  section: homeRole,
})

export const metadata = {
  ...homeMetadata,
  title: { absolute: homeTitle },
  openGraph: {
    ...homeMetadata.openGraph,
    title: site.name,
    description: homeRole,
    images: [
      {
        url: shareImage(site.name, homeRole, homeRole),
        width: 1200,
        height: 630,
        alt: `${site.name} | ${homeRole}`,
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
          <h1>{homeHero.title}</h1>
          <p className="hero-intro">
            {homeHero.body.map((part, index) => part.href ? (
              <Link key={index} href={part.href}>{part.text}</Link>
            ) : part.text)}
          </p>
          <p className="hero-intro hero-personal">
            {homeHero.personal.map((part, index) => part.href ? (
              <Link key={index} href={part.href}>{part.text}</Link>
            ) : part.text)}
          </p>
          <div className="hero-actions">
            <Link href="/case-studies" className="hero-cta-primary">
              Case studies <span aria-hidden="true">→</span>
            </Link>
            <TrackLink
              href={site.resumePage}
              event="resume_click"
              data={{ from: 'home_hero' }}
              className="hero-cta-secondary"
            >
              Résumé
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
            <Link href="/about">The longer story ↗</Link> ·{' '}
            <Link href="/start">Follow what I’m building →</Link>
          </div>
        </article>
      </section>
    </div>
  )
}

import { site } from 'app/lib/site'
import { WorkResults } from 'app/components/work-results'
import { ContinueReading } from 'app/components/continue-reading'
import Link from 'next/link'
import Image from 'next/image'
export default function Page() {
  return (
    <div className="site-shell index-home">
      <header className="index-hero">
        <div>
          <p className="eyebrow">{site.title}</p>
          <h1>Hi, I’m Wiel.</h1>
          <p className="hero-intro">
            I design and build software. These days, I’m working on{' '}
            <Link href="/work/oloodi">workforce software at Oloodi</Link>,
            studying port imagery with{' '}
            <Link href="/case-studies/portmind">PortMind</Link>, and making{' '}
            <Link href="/case-studies/mtl-archives">
              Montréal’s old photographs
            </Link>{' '}
            easier to explore.
          </p>
          <p className="hero-intro hero-personal">
            I’m also a father, and I enjoy reading. You’ll find my{' '}
            <Link href="/bookshelf">reading lists</Link>,{' '}
            <Link href="/blog">writings and notes</Link> here too.
          </p>
          <div className="hero-links">
            <Link href="/case-studies">Start with the case studies ↗</Link>
            <a href="#interests">Or have a look around ↓</a>
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
          <p>Based in Washington, DC.</p>
          <Link href="/about">A little more about me ↗</Link>
        </aside>
      </header>
      <WorkResults />
      <ContinueReading />
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
            <Link href="/work">Software ↗</Link>
          </h3>
          <p>Staffing, commerce, rental deliveries, and home inspections.</p>
          <div>
            <Link href="/case-studies/diane-party-rentals">DPR</Link> ·{' '}
            <Link href="/case-studies/starthome">Starthome</Link> ·{' '}
            <Link href="/work/oloodi">Oloodi ↗</Link>
          </div>
        </article>
        <article>
          <h3>
            <Link href="/blog">Reading ↗</Link>
          </h3>
          <p>Reading lists since 2022, plus notes on what I took from them.</p>
          <div>
            <Link href="/blog">Reading notes</Link> ·{' '}
            <Link href="/bookshelf">Bookshelf ↗</Link>
          </div>
        </article>
      </section>
    </div>
  )
}

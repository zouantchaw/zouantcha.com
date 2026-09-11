import { WorkResults } from 'app/components/work-results'
import { ContinueReading } from 'app/components/continue-reading'
import Link from 'next/link'
import Image from 'next/image'
export default function Page() {
  return (
    <div className="site-shell index-home">
      <header className="index-hero">
        <div>
          <p className="eyebrow">
            A personal index / notes, software & other interests
          </p>
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
            I’m also a father and a reader. You’ll find my reading lists and
            writings and notes here too.
          </p>
          <div className="hero-links">
            <Link href="/case-studies">Start with the case studies ↗</Link>
            <a href="#interests">Or have a look around ↓</a>
          </div>
        </div>
        <aside className="home-portrait">
          <Image
            src="/images/wiel.jpg"
            alt="Wiel Zouantcha"
            width={250}
            height={285}
            priority
            sizes="(max-width: 700px) 120px, 250px"
          />
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

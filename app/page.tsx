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
          <h1>
            Some things I make.
            <br />
            Some things I’m
            <br />
            still figuring out.
          </h1>
          <p className="hero-intro">
            I’m Wiel. I build software, read widely, and tend to follow an
            interest further than I originally planned.
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
          <h2>
            Engineer, reader,
            <br />
            father. Usually curious.
          </h2>
          <p>
            This is where the finished work
            <br />
            and the loose ends meet.
          </p>
          <Link href="/about">A little more about me ↗</Link>
        </aside>
      </header>
      <section id="interests" className="interest-index">
        <div className="interest-label">
          <h2 className="eyebrow">Follow an interest</h2>
          <p>
            There isn’t only one
            <br />
            way through here.
          </p>
        </div>
        <article>
          <h3>
            <Link href="/topics/montreal">The city ↗</Link>
          </h3>
          <p>Old photographs, a port camera, and questions about Montréal.</p>
          <div>
            <Link href="/case-studies/mtl-archives">MTL Archives</Link> ·{' '}
            <Link href="/case-studies/portmind">PortMind ↗</Link>
          </div>
        </article>
        <article>
          <h3>
            <Link href="/work">The work ↗</Link>
          </h3>
          <p>Software for the people keeping things moving.</p>
          <div>
            <Link href="/case-studies/diane-party-rentals">DPR</Link> ·{' '}
            <Link href="/case-studies/starthome">Starthome</Link> ·{' '}
            <Link href="/work/oloodi">Oloodi ↗</Link>
          </div>
        </article>
        <article>
          <h3>
            <Link href="/blog">The margins ↗</Link>
          </h3>
          <p>Books, questions, and ideas I want to come back to.</p>
          <div>
            <Link href="/blog">Reading notes</Link> ·{' '}
            <Link href="/bookshelf">Bookshelf ↗</Link>
          </div>
        </article>
      </section>
    </div>
  )
}

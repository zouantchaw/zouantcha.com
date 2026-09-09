import Link from 'next/link'
import { ProfilePhoto } from 'app/components/profile-photo'
import { WorkRow } from 'app/components/work-row'
import { featuredWriting, mailto, site } from 'app/lib/site'
import { featuredWork } from 'app/lib/work'

export default function Page() {
  return (
    <div className="site-shell personal-home">
      <header className="personal-heading">
        <ProfilePhoto size={48} priority />
        <div><h1>{site.name}</h1><p>Design engineer · {site.location}</p></div>
      </header>
      <div className="personal-intro">
        <p>I’m Wiel. I design and build software, and I tend to follow an interest further than I originally planned.</p>
        <p>Browsing Montréal’s open data led me to <Link href="/case-studies/mtl-archives">MTL Archives</Link>. Watching the port became <Link href="/case-studies/portmind">PortMind</Link>, a research project about what vision models can actually tell us from those images. I like having room to ask a question, build something, and find out where I was wrong.</p>
        <p>At Oloodi, I work on workforce software across full-stack development and customer engineering. Some days that means fixing an order flow; others, walking an operations team through the product. Before that, I worked on commerce at Ethos and security integrations at SaaS Alerts. <Link href="/work">More about my work</Link>.</p>
        <p>I also help people turn their businesses and ideas into products, including <Link href="/case-studies/diane-party-rentals">Diane Party Rentals</Link> and <Link href="/case-studies/starthome">Starthome</Link>. Outside of that, I’m a father, a reader, and very interested in the city around me. <Link href="/about">A little more about me</Link>, or <a href={mailto()}>say hello</a>.</p>
      </div>
      <section className="personal-section">
        <div className="index-heading"><h2>Case studies</h2><Link href="/case-studies">View all <span aria-hidden="true">↗</span></Link></div>
        {featuredWork().map(item => <WorkRow key={item.slug} item={item} />)}
      </section>
      <section className="personal-section">
        <div className="index-heading"><h2>Writing</h2><Link href="/blog">All notes <span aria-hidden="true">↗</span></Link></div>
        {featuredWriting.map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="reading-row"><span>{post.title}</span><span className="reading-meta">{post.source}<span className="row-arrow" aria-hidden="true">↗</span></span></Link>)}
      </section>
    </div>
  )
}

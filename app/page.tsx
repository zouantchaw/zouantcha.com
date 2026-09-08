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
        <p>I design and build software, from the first sketch to the details people use every day.</p>
        <p>My work has taken me through security integrations at SaaS Alerts, commerce at Ethos, and workforce software at Oloodi. I like being involved in both how a product feels and how it works. <Link href="/work">More about my work</Link>.</p>
        <p>Alongside that, I’m building <Link href="/case-studies/mtl-archives">MTL Archives</Link>, a way to explore Montréal through old photographs, and <Link href="/case-studies/starthome">Starthome</Link>, an app for walking through and documenting a rental unit.</p>
        <p>I’m a father, a reader, and often somewhere in an archive of Montréal photographs. You can <Link href="/about">read more about me</Link>, find me on <a href={site.github}>GitHub</a>, or <a href={mailto()}>send me an email</a>.</p>
      </div>
      <section className="personal-section">
        <div className="index-heading"><h2>Selected work</h2><Link href="/case-studies">View all <span aria-hidden="true">↗</span></Link></div>
        {featuredWork().map(item => <WorkRow key={item.slug} item={item} />)}
      </section>
      <section className="personal-section">
        <div className="index-heading"><h2>Writing</h2><Link href="/blog">All notes <span aria-hidden="true">↗</span></Link></div>
        {featuredWriting.map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="reading-row"><span>{post.title}</span><span className="reading-meta">{post.source}<span className="row-arrow" aria-hidden="true">↗</span></span></Link>)}
      </section>
    </div>
  )
}

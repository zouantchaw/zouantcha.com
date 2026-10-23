import { pageMetadata } from 'app/lib/metadata'
import { watchCopy, watchItems } from 'app/lib/distribution'
import { TrackAnchor, TrackLink } from 'app/components/track-link'

export const metadata = pageMetadata({ title: watchCopy.heading, description: watchCopy.intro, path: '/watch', section: 'Watch' })
export default function Page() {
  return (
    <div className="site-shell start-page">
      <header className="start-hero"><p className="eyebrow">Build · Grow · Research</p><h1>{watchCopy.heading}</h1><p className="hero-intro">{watchCopy.intro}</p></header>
      <section className="start-section" aria-label="Builds and case studies">
        <ul className="start-proof">
          {watchItems.map(item => {
            const props = { href: item.href, event: 'watch_item_click', data: { content: item.id, destination: item.id, placement: 'watch' }, className: 'start-proof-card' }
            const content = <><span className="eyebrow">{item.category} / {item.type}</span><span className="start-proof-title">{item.title}</span><span className="start-proof-problem">{item.description}</span><span className="start-proof-cta">{item.type === 'Short video' ? 'Watch short video ↗' : 'Read case study →'}</span></>
            return <li key={item.id}>{item.href.startsWith('https:') ? <TrackAnchor {...props}>{content}</TrackAnchor> : <TrackLink {...props}>{content}</TrackLink>}</li>
          })}
        </ul>
      </section>
      <section className="start-section" aria-label="Keep following the work"><div className="hero-links"><TrackLink href="/log" event="contact_project_click" data={{ destination: 'log', placement: 'watch' }}>Get the weekly build log →</TrackLink><TrackLink href="/start" event="contact_project_click" data={{ destination: 'start', placement: 'watch' }}>Work with me →</TrackLink></div></section>
    </div>
  )
}

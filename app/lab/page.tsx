import { pageMetadata } from 'app/lib/metadata'
import { labCopy, products } from 'app/lib/distribution'
import { TrackLink } from 'app/components/track-link'
import Link from 'next/link'

export const metadata = pageMetadata({ title: labCopy.heading, description: labCopy.intro, path: '/lab', section: 'Products' })
export default function Page() {
  return (
    <div className="site-shell start-page">
      <header className="start-hero"><p className="eyebrow">Public data</p><h1>{labCopy.heading}</h1><p className="hero-intro">{labCopy.intro}</p></header>
      {products.map(product => <section key={product.id} id={product.id} className="start-section start-work-with-me" aria-labelledby={`${product.id}-heading`}><p className="eyebrow">{product.status}</p><h2 id={`${product.id}-heading`}>{product.name}</h2><p>{product.description}</p>{product.id === 'radar-evenements' ? <TrackLink href="/log" event="product_interest_click" data={{ product: product.id, placement: 'lab', destination: 'log' }} className="start-intro-cta">Follow the build →</TrackLink> : null}</section>)}
      <section className="start-section" aria-label="Existing research"><h2 className="eyebrow">Existing work</h2><div className="hero-links"><Link href="/case-studies/mtl-archives">MTL Archives →</Link><Link href="/case-studies/portmind">PortMind →</Link></div></section>
    </div>
  )
}

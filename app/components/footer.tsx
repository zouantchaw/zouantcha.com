import Link from 'next/link'
import { site } from 'app/lib/site'
import { TrackAnchor, TrackLink } from './track-link'

export default function Footer() {
  return (
    <footer className="site-footer site-shell">
      <TrackLink href="/contact" event="email_click" data={{ from: 'footer' }}>
        Get in touch ↗
      </TrackLink>
      <nav aria-label="Footer">
        <Link href="/watch">Watch</Link>
        <Link href="/log">Build log</Link>
        <Link href="/lab">Products</Link>
        <Link href="/blog">Writing</Link>
        <TrackLink href={site.resumePage} event="resume_click" data={{ from: 'footer' }}>
          Résumé
        </TrackLink>
        <TrackAnchor href={site.github} event="github_click" data={{ from: 'footer' }} rel="noopener noreferrer" target="_blank">
          GitHub ↗
        </TrackAnchor>
        <TrackAnchor href={site.linkedin} event="linkedin_click" data={{ from: 'footer' }} rel="noopener noreferrer" target="_blank">
          LinkedIn ↗
        </TrackAnchor>
        <Link href="/rss">RSS ↗</Link>
        <a href="#top">Back to top ↑</a>
      </nav>
    </footer>
  )
}

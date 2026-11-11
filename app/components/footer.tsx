import Link from 'next/link'
import { siteFooterNavigation } from 'app/lib/site'
import { TrackLink } from './track-link'

export default function Footer() {
  return (
    <footer className="frame-footer frame-shell">
      <div className="frame-footer-location"><Link href="/" className="frame-mark" aria-label="Wiel Zouantcha, home">wz</Link><span>Remote · US, Canada and Europe</span></div>
      <nav aria-label="Footer">
        {siteFooterNavigation.map(({ href, label }) => href.startsWith('/') ? (
          <TrackLink key={href} href={href} event="resume_click" data={{ from: 'footer' }}>{label}</TrackLink>
        ) : <a key={href} href={href}>{label}</a>)}
      </nav>
    </footer>
  )
}

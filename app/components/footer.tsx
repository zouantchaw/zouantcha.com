import Link from 'next/link'
import { site } from 'app/lib/site'
export default function Footer() {
  return (
    <footer className="site-footer site-shell">
      <Link href="/contact">Say hello ↗</Link>
      <nav aria-label="Footer">
        <a href={site.github}>GitHub ↗</a>
        <a href={site.linkedin}>LinkedIn ↗</a>
        <Link href="/rss">RSS ↗</Link>
        <Link href="/slides">Slides ↗</Link>
        <a href="#top">Back to top ↑</a>
      </nav>
    </footer>
  )
}

import Link from 'next/link'
import { mailto, site } from 'app/lib/site'
import { CopyEmail } from './copy-email'

export default function Footer() {
  return <footer className="site-footer site-shell">
    <div className="footer-contact"><a href={mailto()}>{site.email}</a><CopyEmail email={site.email}/></div>
    <div className="footer-bottom"><span>{site.location}</span><div><Link href="/work">Work</Link><a href={site.github}>GitHub</a><a href={site.linkedin}>LinkedIn</a><Link href="/rss">RSS</Link></div></div>
  </footer>
}

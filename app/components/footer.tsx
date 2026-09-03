import Link from 'next/link'
import { mailto, site } from 'app/lib/site'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="site-shell flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="font-mono text-[13px] text-ink">{site.name}</p>
          <p className="text-[13px] text-muted">
            {site.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
          <a href={mailto()} className="hover:text-ink">
            {site.email}
          </a>
          <a
            href={site.github}
            className="hover:text-ink"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            className="hover:text-ink"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            href={site.x}
            className="hover:text-ink"
            rel="noopener noreferrer"
            target="_blank"
          >
            X
          </a>
          <Link href="/rss" className="hover:text-ink">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  )
}

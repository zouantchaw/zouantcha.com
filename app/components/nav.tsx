'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Dialog } from './dialog'
const links = [
  { href: '/case-studies', label: 'Case studies' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Notes' },
  { href: '/bookshelf', label: 'Bookshelf' },
  { href: '/about', label: 'About' },
]
export function Nav() {
  const pathname = usePathname() ?? ''
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])
  return (
    <header id="top" className="site-navigation site-shell">
      <Link href="/" className="home-link" aria-label="Wiel Zouantcha, home">
        wiel zouantcha <span aria-hidden="true">↗</span>
      </Link>
      <nav className="desktop-navigation" aria-label="Main navigation">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'page'
                : undefined
            }
          >
            {item.label}
          </Link>
        ))}
        <Link className="search-link" href="/search">
          Find something <span aria-hidden="true">↗</span>
        </Link>
      </nav>
      <button
        className="menu-toggle"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Menu <span aria-hidden="true">＋</span>
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Look around"
        className="menu-dialog"
      >
        <nav aria-label="Mobile navigation">
          {[
            ...links,
            { href: '/search', label: 'Find something' },
            { href: '/contact', label: 'Say hello' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <p>A personal index. There isn’t only one way through here.</p>
      </Dialog>
    </header>
  )
}

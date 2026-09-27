'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Dialog } from './dialog'
import { TrackLink } from './track-link'

const links = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/resume', label: 'Résumé' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const pathname = usePathname() ?? ''
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])

  function NavItem({
    href,
    label,
    mobile,
  }: {
    href: string
    label: string
    mobile?: boolean
  }) {
    const current =
      pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined
    const inner = (
      <>
        {label}
        {mobile ? <span aria-hidden="true">↗</span> : null}
      </>
    )
    if (href === '/resume') {
      return (
        <TrackLink
          href={href}
          event="resume_click"
          data={{ from: mobile ? 'nav_mobile' : 'nav' }}
          onClick={() => setOpen(false)}
          aria-current={current}
        >
          {inner}
        </TrackLink>
      )
    }
    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        aria-current={current}
      >
        {inner}
      </Link>
    )
  }

  return (
    <header id="top" className="site-navigation site-shell">
      <Link href="/" className="home-link" aria-label="Wiel Zouantcha, home">
        wiel zouantcha <span aria-hidden="true">↗</span>
      </Link>
      <nav className="desktop-navigation" aria-label="Main navigation">
        {links.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
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
          {links.map((item) => (
            <NavItem key={item.href} {...item} mobile />
          ))}
        </nav>
      </Dialog>
    </header>
  )
}

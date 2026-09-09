'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { nav as links } from 'app/lib/site'

export function Nav() {
  const pathname = usePathname() ?? ''
  return (
    <header className="site-navigation site-shell">
      <Link href="/" className="home-link" aria-label="Wiel Zouantcha, home" aria-current={pathname === '/' ? 'page' : undefined}>WZ<span aria-hidden="true">.</span></Link>
      <nav aria-label="Main navigation">{links.map(item => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}>{item.label}</Link>
      })}</nav>
    </header>
  )
}

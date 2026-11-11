'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from './ui/sheet'

import { siteNavigation } from 'app/lib/site'

export function Nav() {
  const pathname = usePathname() ?? ''
  const [open, setOpen] = useState(false)
  return (
    <header id="top" className="frame-navigation frame-shell">
      <Link href="/" className="frame-lockup" aria-label="Wiel Zouantcha, home">
        <span className="frame-mark" aria-hidden="true">wz</span>
        <span>Wiel Zouantcha</span>
      </Link>
      <nav className="frame-desktop-nav" aria-label="Main navigation">
        {siteNavigation.map(({ href, label, primary }) => primary ? (
          <Button asChild key={href}><Link href={href}>{label}</Link></Button>
        ) : <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined}>{label}</Link>)}
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="frame-menu-toggle" aria-label="Open menu"><span aria-hidden="true"><i /><i /></span></Button>
        </SheetTrigger>
        <SheetContent className="frame-menu">
          <SheetHeader><SheetTitle>Look around</SheetTitle><SheetDescription>Explore Wiel’s work and build log.</SheetDescription></SheetHeader>
          <nav aria-label="Mobile navigation">
            {siteNavigation.map(({ href, label }) => <SheetClose asChild key={href}><Link href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link></SheetClose>)}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

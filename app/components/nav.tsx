'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { nav, site } from 'app/lib/site'

export function Nav() {
  const pathname = usePathname() ?? ''

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="site-shell flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Link
          href="/"
          className="whitespace-nowrap font-mono text-[13px] text-ink"
        >
          {site.name}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-0.5 text-[13px] text-muted sm:justify-end">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? 'rounded-md px-2.5 py-1.5 font-medium text-ink'
                    : 'rounded-md px-2.5 py-1.5 transition-colors duration-150 hover:text-ink'
                }
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

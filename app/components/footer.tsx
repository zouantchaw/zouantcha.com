import Link from 'next/link'

const links = [
  { href: '/', label: 'home' },
  { href: '/rss', label: 'rss' },
  { href: 'https://github.com/zouantchaw', label: 'github' },
  { href: 'https://twitter.com/love_thegame_', label: 'x' },
]

export default function Footer() {
  return (
    <footer className="pb-6 text-sm text-neutral-500 dark:text-neutral-400">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {links.map((link) => {
          const className =
            'underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 dark:decoration-neutral-700 dark:hover:text-neutral-50'

          if (link.href.startsWith('/')) {
            return (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            )
          }

          return (
            <a
              key={link.href}
              href={link.href}
              className={className}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          )
        })}
      </div>
    </footer>
  )
}

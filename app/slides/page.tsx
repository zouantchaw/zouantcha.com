import Link from 'next/link'
import { SectionLabel } from 'app/components/section-label'

export const metadata = {
  title: 'Slides',
  description: 'Shared slide decks and project briefs by Wiel Zouantcha.',
}

const slides = [
  {
    title: 'PortMind Weekly Update · July 21–31, 2026',
    description:
      'Research protocol, tool-harness split, Oloodi incubation agreement, and the next Port contact.',
    href: '/slides/portmind-weekly-update-2026-07-21-31.html',
  },
  {
    title: 'PortMind Weekly Update · July 14–21, 2026',
    description: 'Roadmap, reviewer-app screenshots, and the next PortMind conversations.',
    href: '/slides/portmind-past-seven-days.html',
  },
  {
    title: 'PortMind ML Project Brief',
    description: 'A project brief for the PortMind machine-learning work.',
    href: '/slides/portmind-ml-project-brief.html',
  },
]

export default function Page() {
  return (
    <div className="site-shell space-y-10">
      <header className="max-w-3xl space-y-5">
        <SectionLabel tone="gold">Research notes</SectionLabel>
        <h1 className="font-mono text-[32px] leading-[1.15] tracking-[-0.03em] text-ink sm:text-[40px]">
          Slides
        </h1>
        <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
          Shared slide decks and project briefs.
        </p>
      </header>

      <div>
        {slides.map((slide) => (
          <article key={slide.href} className="space-y-2 border-t border-line py-7">
            <h2 className="text-lg">
              <Link
                href={slide.href}
                className="underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {slide.title}
              </Link>
            </h2>
            <p className="leading-7 text-ink-soft">{slide.description}</p>
          </article>
        ))}
        <div className="border-t border-line" />
      </div>
    </div>
  )
}

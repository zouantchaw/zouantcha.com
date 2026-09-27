import { pageMetadata } from 'app/lib/metadata'
import Link from 'next/link'
import { TrackLink } from 'app/components/track-link'
import { experience, site, workIntro } from 'app/lib/site'

export const metadata = pageMetadata({
  title: 'Work',
  description:
    '5+ years shipping production software across SaaS, data systems and applied AI. Customer engineering, full-stack product work, integrations, and independent products.',
  path: '/work',
})

export default function Page() {
  return (
    <div className="site-shell personal-page space-y-16">
      <header className="max-w-3xl space-y-5">
        <p className="eyebrow">Where I’ve worked</p>
        <h1>{workIntro.title}</h1>
        <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
          <strong className="font-medium text-ink">{workIntro.lede}</strong>
        </p>
        <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
          {workIntro.body} The{' '}
          <Link href="/case-studies" className="underline underline-offset-4">
            case studies
          </Link>{' '}
          follow individual products in more detail.
        </p>
        <TrackLink
          className="inline-block text-sm"
          href={site.resumePage}
          event="resume_click"
          data={{ from: 'work' }}
        >
          Résumé
        </TrackLink>
      </header>

      <div>
        {experience.map((role) => (
          <section
            key={`${role.company}-${role.period}`}
            className="grid gap-4 border-t border-line py-10 md:grid-cols-[220px_minmax(0,1fr)]"
          >
            <div>
              <h2 className="text-lg">
                {role.href ? (
                  <a
                    href={role.href}
                    className="underline decoration-line underline-offset-4 hover:decoration-ink"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
              </h2>
              <p className="mt-1 text-sm text-muted">{role.period}</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.12em] text-muted">
                {role.role}
              </p>
              {role.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[17px] leading-7 text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
              <Link
                href={'/work/' + role.slug}
                className="inline-block text-sm"
              >
                More about this work ↗
              </Link>
            </div>
          </section>
        ))}
        <div className="border-t border-line" />
      </div>
    </div>
  )
}

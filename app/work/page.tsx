import Link from 'next/link'
import { SectionLabel } from 'app/components/section-label'
import { experience } from 'app/lib/site'

export const metadata = {
  title: 'Work',
  description:
    'Work history for Wiel Zouantcha: customer engineering, full-stack product work, integrations, and independent products.',
}

export default function Page() {
  return (
    <div className="site-shell personal-page space-y-16">
      <header className="max-w-3xl space-y-5">
        <SectionLabel>Where I’ve worked</SectionLabel>
        <h1 className="font-mono text-[32px] leading-[1.15] tracking-[-0.03em] text-ink sm:text-[40px]">
          Work
        </h1>
        <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
          Roles, companies, and the kind of problems I was hired to take on.
          For the systems themselves, see the{' '}
          <Link
            href="/case-studies"
            className="underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            case studies
          </Link>
          .
        </p>
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
                <p key={paragraph} className="text-[17px] leading-7 text-ink-soft">
                  {paragraph}
                </p>
              ))}
              {'caseStudy' in role && role.caseStudy ? (
                <Link
                  href={role.caseStudy}
                  className="inline-block text-sm underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  Read the case study →
                </Link>
              ) : null}
            </div>
          </section>
        ))}
        <div className="border-t border-line" />
      </div>
    </div>
  )
}

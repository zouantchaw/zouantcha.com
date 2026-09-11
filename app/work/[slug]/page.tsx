import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getWork, work } from 'app/lib/work'
import { experience } from 'app/lib/site'
const employers = experience.map((role) => role.slug)
export function generateStaticParams() {
  return [
    ...work.map((item) => ({ slug: item.slug })),
    ...employers.map((slug) => ({ slug })),
  ]
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return {
    title: experience.find((role) => role.slug === slug)?.company ?? 'Work',
  }
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getWork(slug)
  if (study) redirect('/case-studies/' + study.slug)
  const role = experience.find((role) => role.slug === slug)
  if (!role) notFound()
  return (
    <article className="site-shell personal-page">
      <Link href="/work" className="reader-back">
        ← Work
      </Link>
      <header className="space-y-5">
        <p className="eyebrow">
          {role.period} / {role.role}
        </p>
        <h1>{role.company}</h1>
      </header>
      <div className="max-w-3xl space-y-6 text-[19px] leading-8">
        {role.body.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <div className="max-w-3xl mt-12 space-y-12">
        {role.sections.map((section) => (
          <section key={section.title} className="space-y-5">
            <h2 className="text-2xl">{section.title}</h2>
            {section.body.map((text) => (
              <p key={text} className="text-[17px] leading-7 text-ink-soft">
                {text}
              </p>
            ))}
          </section>
        ))}
      </div>
      <nav className="mt-12 border-t border-line pt-8 flex flex-wrap gap-6">
        {role.href && (
          <a href={role.href} target="_blank" rel="noopener noreferrer">
            Visit {role.company} ↗
          </a>
        )}
        <Link href="/case-studies">Explore the case studies ↗</Link>
        <Link href="/contact">Talk about working together ↗</Link>
      </nav>
    </article>
  )
}

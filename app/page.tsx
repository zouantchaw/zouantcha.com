import Link from 'next/link'
import { ProfilePhoto } from 'app/components/profile-photo'
import { WorkRow } from 'app/components/work-row'
import {
  contact,
  featuredWriting,
  intro,
  mailto,
  record,
  site,
} from 'app/lib/site'
import { featuredWork } from 'app/lib/work'

export default function Page() {
  const selected = featuredWork()

  return (
    <div className="site-shell space-y-16 sm:space-y-20">
      <section className="pt-4 sm:pt-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:gap-16">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-muted">
              {intro.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-[36px] font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-[52px] lg:text-[64px]">
              {site.headline}
            </h1>
          </div>
          <ProfilePhoto
            size={640}
            shape="square"
            priority
            className="w-full max-w-[280px] lg:max-w-none"
          />
        </div>
      </section>

      <section className="max-w-2xl space-y-5">
        <p className="font-mono text-[13px] text-muted">{intro.title}</p>
        <div className="space-y-4 text-[17px] leading-7 text-ink-soft">
          {intro.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Link href="/case-studies" className="btn btn-primary">
            Case studies
          </Link>
          <Link href="/work" className="btn btn-secondary">
            Work
          </Link>
          <a href={mailto()} className="btn btn-ghost">
            Email
          </a>
        </div>
      </section>

      <section>
        <p className="font-mono text-[13px] text-muted">The record</p>
        <div className="mt-4 grid grid-cols-3 border-y border-line">
          {record.map((item) => (
            <Link
              key={item.value}
              href={item.href}
              className="space-y-1.5 border-r border-line px-3 py-5 last:border-r-0 sm:px-5 sm:py-7"
            >
              <p className="text-[22px] font-medium tracking-tight text-ink sm:text-[28px]">
                {item.value}
              </p>
              <p className="text-[12px] leading-5 text-muted sm:text-[13px]">{item.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <p className="font-mono text-[13px] text-muted">
          Selected work
          <Link href="/case-studies" className="ml-3 transition-colors hover:text-ink">
            All
          </Link>
        </p>
        <div>
          {selected.map((item) => (
            <WorkRow key={item.slug} item={item} />
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      <section className="space-y-2">
        <p className="font-mono text-[13px] text-muted">
          Writing
          <Link href="/blog" className="ml-3 transition-colors hover:text-ink">
            Index
          </Link>
        </p>
        <div>
          {featuredWriting.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="grid gap-1 border-t border-line py-5 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_72px] sm:items-baseline sm:gap-6"
            >
              <span className="text-[15px] text-ink">{post.title}</span>
              <span className="text-[13px] leading-5 text-muted">{post.summary}</span>
              <span className="font-mono text-[12px] text-muted sm:text-right">
                {post.source}
              </span>
            </Link>
          ))}
          <div className="border-t border-line" />
        </div>
      </section>

      <section className="grid gap-8 border-t border-line pt-12 sm:grid-cols-2">
        <div className="space-y-3">
          <p className="font-mono text-[13px] text-muted">Hiring</p>
          <h2 className="font-mono text-xl tracking-tight text-ink">
            {contact.hiring.title}
          </h2>
          <p className="max-w-md text-[14px] leading-6 text-ink-soft">
            {contact.hiring.body}
          </p>
          <a href={mailto('Software engineering role')} className="btn btn-primary mt-2">
            Email me
          </a>
        </div>
        <div className="space-y-3">
          <p className="font-mono text-[13px] text-muted">Projects</p>
          <h2 className="font-mono text-xl tracking-tight text-ink">
            {contact.project.title}
          </h2>
          <p className="max-w-md text-[14px] leading-6 text-ink-soft">
            I’m most useful when the work is real and the software shape is
            not obvious yet.
          </p>
          <a href={mailto(contact.project.subject)} className="btn btn-secondary mt-2">
            Tell me about the problem
          </a>
        </div>
      </section>
    </div>
  )
}

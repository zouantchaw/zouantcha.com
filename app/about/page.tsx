import Link from 'next/link'
import { ProfilePhoto } from 'app/components/profile-photo'
import { SectionLabel } from 'app/components/section-label'
import { about, mailto, site } from 'app/lib/site'

export const metadata = {
  title: 'About',
  description: `${site.name} is a full stack design engineer based in ${site.location}.`,
}

export default function Page() {
  return (
    <div className="site-shell personal-page space-y-16">
      <header className="max-w-3xl space-y-6">
        <div className="flex items-center gap-3.5">
          <ProfilePhoto size={56} priority />
          <div>
            <p className="font-mono text-[15px] text-ink">{site.name}</p>
            <p className="text-[13px] text-muted">{about.eyebrow}</p>
          </div>
        </div>
        <h1 className="font-mono text-[32px] leading-[1.15] tracking-[-0.03em] text-ink sm:text-[40px]">
          {about.title}
        </h1>
      </header>

      <div className="max-w-2xl space-y-5 text-[17px] leading-7 text-ink-soft">
        {about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="space-y-8 border-t border-line pt-12">
        <SectionLabel tone="olive">How I work</SectionLabel>
        <div className="grid gap-8 sm:grid-cols-2">
          {about.principles.map((principle) => (
            <div key={principle.title} className="space-y-2">
              <h2 className="text-lg">{principle.title}</h2>
              <p className="text-sm leading-6 text-ink-soft">{principle.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl space-y-4 border-t border-line pt-12">
        <SectionLabel tone="gold">Outside the work</SectionLabel>
        <p className="text-[17px] leading-7 text-ink-soft">{about.outside}</p>
      </section>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link
          href="/case-studies"
          className="underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          View case studies →
        </Link>
        <a
          href={mailto()}
          className="underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Get in touch ↗
        </a>
      </div>
    </div>
  )
}

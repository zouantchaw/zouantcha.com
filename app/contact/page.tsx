import { SectionLabel } from 'app/components/section-label'
import { contact, mailto, site } from 'app/lib/site'

export const metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.name} about full stack design engineering roles or independent projects.`,
}

export default function Page() {
  return (
    <div className="site-shell personal-page space-y-16">
      <header className="max-w-3xl space-y-5">
        <SectionLabel>Contact</SectionLabel>
        <h1 className="font-mono text-[32px] leading-[1.15] tracking-[-0.03em] text-ink sm:text-[40px]">
          {contact.title}
        </h1>
      </header>

      <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-2xl tracking-tight">{contact.hiring.title}</h2>
          <p className="text-[17px] leading-7 text-ink-soft">{contact.hiring.body}</p>
          <div className="space-y-2 pt-2 text-sm">
            <a
              href={mailto('Software engineering role')}
              className="block underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              className="block underline decoration-line underline-offset-4 hover:decoration-ink"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl tracking-tight">{contact.project.title}</h2>
          <p className="text-[17px] leading-7 text-ink-soft">{contact.project.body}</p>
          <p className="text-sm text-muted">
            Email subject: Project inquiry, [organization or problem]
          </p>
          <a
            href={mailto(contact.project.subject)}
            className="inline-block text-sm underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Tell me about the problem →
          </a>
        </section>
      </div>
    </div>
  )
}

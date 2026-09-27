import { pageMetadata } from 'app/lib/metadata'
import { CopyEmail } from 'app/components/copy-email'
import { TrackAnchor, TrackLink } from 'app/components/track-link'
import { contact, mailto, site } from 'app/lib/site'

export const metadata = pageMetadata({
  title: 'Contact',
  description: `Get in touch with ${site.name} about software engineering roles across product, data and applied AI, or selected consulting projects.`,
  path: '/contact',
})

function intentFrom(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  if (raw === 'role' || raw === 'project') return raw
  return undefined
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const intent = intentFrom(params.intent)
  const heading = intent ? contact.intents[intent].title : contact.title
  const subject = intent ? contact.intents[intent].subject : undefined

  return (
    <div className="site-shell personal-page space-y-16">
      <header className="max-w-3xl space-y-5">
        <p className="eyebrow">Contact</p>
        <h1>{heading}</h1>
        {intent ? (
          <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
            {contact.intents[intent].intro}
          </p>
        ) : null}
      </header>

      {!intent ? (
        <div className="contact-intents">
          <section>
            <h2>{contact.hiring.title}</h2>
            <p>{contact.hiring.body}</p>
          </section>
          <section>
            <h2>{contact.project.title}</h2>
            <p>{contact.project.body}</p>
          </section>
        </div>
      ) : null}

      <div className="contact-channels">
        <TrackAnchor
          href={mailto(subject)}
          event="email_click"
          data={{ from: 'contact', intent: intent || 'open' }}
        >
          {site.email}
        </TrackAnchor>
        <CopyEmail email={site.email} />
        <TrackAnchor
          href={site.linkedin}
          event="linkedin_click"
          data={{ from: 'contact' }}
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn ↗
        </TrackAnchor>
        <TrackAnchor
          href={site.github}
          event="github_click"
          data={{ from: 'contact' }}
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub ↗
        </TrackAnchor>
        <TrackLink
          href={site.resumePage}
          event="resume_click"
          data={{ from: 'contact' }}
        >
          Résumé
        </TrackLink>
      </div>

      {!intent ? (
        <div className="availability-actions">
          <TrackLink
            href="/contact?intent=role"
            event="contact_role_click"
            data={{ from: 'contact' }}
            className="hero-cta-secondary"
          >
            Discuss a role →
          </TrackLink>
          <TrackLink
            href="/contact?intent=project"
            event="contact_project_click"
            data={{ from: 'contact' }}
            className="hero-cta-secondary"
          >
            Discuss a project →
          </TrackLink>
        </div>
      ) : (
        <TrackAnchor
          href={mailto(subject)}
          event="email_click"
          data={{ from: 'contact', intent }}
          className="hero-cta-primary"
        >
          Email me →
        </TrackAnchor>
      )}
    </div>
  )
}

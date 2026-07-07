export const metadata = {
  title: 'Work',
  description: 'My work history.',
}

const roles = [
  {
    company: 'Oloodi Technologies',
    role: 'Customer Engineer (Contract)',
    period: 'January 2026 - Present',
    body: 'Working on KROW Workforce, a hospitality staffing platform with a web dashboard and mobile apps built for a live customer environment.',
    bullets: [
      'Translate sprint output, architecture tradeoffs, and product changes into founder and stakeholder recommendations.',
      'Bridge customer needs, engineering execution, and product quality in a small-team environment.',
    ],
  },
  {
    company: 'Ethos',
    role: 'Senior Full Stack Engineer',
    period: 'May 2022 - November 2025',
    body: 'Helped take the product from a single-tenant MVP to a multi-tenant SaaS serving 50+ merchant accounts.',
    bullets: [
      'Built identity management and access-control layers across Next.js, Node.js, and Azure.',
      'Built internal Jade and Ruby API layers that gave frontend teams a cleaner interface over complex backend operations.',
      'Wrote Shopify POS integrations with sub-100ms latency for real-time retail sync.',
      'Set frontend standards and drove architectural decisions across the Luna codebase in a five-person team.',
    ],
  },
  {
    company: 'Independent Consulting',
    role: 'Engineering Consultant',
    period: 'January 2023 - Present',
    body: 'Partner with small-business owners to gather requirements, architect practical systems, and ship production software.',
    bullets: [
      'Diane Party Rentals: custom ERP for quoting, inventory locking, and Stripe payments. Quote turnaround dropped from 24h to under 2h.',
      'Ballerz Football Academy: scheduling and payout platform for trainer availability, player bookings, and 100+ monthly sessions.',
    ],
  },
  {
    company: 'SaaS Alerts',
    role: 'Software Engineer, Integrations and Security',
    period: 'October 2020 - December 2021',
    body: 'Built integrations and security-event processing for MSP tools.',
    bullets: [
      'Built log ingestion connectors for IT Glue, Datto RMM, ConnectWise, and Kaseya.',
      'Normalized event data into a unified security schema for downstream alerting.',
      'Used Microsoft Graph API and Kibana logs to build detection logic for silent MFA changes and unauthorized file sharing.',
    ],
  },
]

const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Python',
  'Ruby',
  'Cloudflare Workers',
  'D1',
  'R2',
  'Vectorize',
  'Azure',
  'Vercel',
  'Docker',
]

export default function Page() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Work</h1>
        <p className="leading-7 text-neutral-700 dark:text-neutral-300">
          5+ years building data-heavy applications end to end: integrations,
          backend systems, production frontends, ETL pipelines, and applied ML
          workflows.
        </p>
      </div>

      <div className="space-y-9">
        {roles.map((role) => (
          <section key={`${role.company}-${role.period}`} className="space-y-3">
            <div>
              <h2 className="text-lg font-medium">{role.company}</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {role.role} - {role.period}
              </p>
            </div>
            <p className="leading-7 text-neutral-700 dark:text-neutral-300">
              {role.body}
            </p>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-neutral-700 dark:text-neutral-300">
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Skills</h2>
        <p className="leading-7 text-neutral-700 dark:text-neutral-300">
          {skills.join(', ')}.
        </p>
      </section>
    </section>
  )
}

import Link from 'next/link'

const results = [
  {
    value: '13,499',
    label: 'Archival records made searchable',
    context: 'MTL Archives · June 2026 audit',
    href: '/case-studies/mtl-archives',
  },
  {
    value: '2.66M',
    label: 'Facebook + Instagram views',
    context: 'MTL Archives · Jan–Jul 2026',
    href: '/case-studies/mtl-archives#the-reach-was-real-it-did-not-stay-there',
  },
  {
    value: '81,202',
    label: 'Port activity snapshots collected',
    context: 'PortMind · Jan 28–Jul 9, 2026; includes cached observations',
    href: '/case-studies/portmind#build-a-record-of-the-port',
  },
  {
    value: 'Manual → online',
    narrative: true,
    label: 'Quotes, payments and bookings connected',
    context:
      'Diane Party Rentals · $5,032.66 gross processed through Stripe, Apr–Sep 8, 2026',
    href: '/case-studies/diane-party-rentals#from-a-quote-to-a-paid-booking',
  },
]

export function WorkResults() {
  return (
    <section className="work-results" aria-labelledby="work-results-heading">
      <div className="work-results-heading">
        <h2 id="work-results-heading" className="eyebrow">
          From the case studies
        </h2>
        <Link href="/case-studies">The work behind the numbers ↗</Link>
      </div>
      <ul>
        {results.map((result) => (
          <li key={result.label}>
            <Link href={result.href}>
              <span
                className={
                  result.narrative
                    ? 'work-result-value work-result-value--words'
                    : 'work-result-value'
                }
              >
                {result.value}
              </span>
              <span className="work-result-label">{result.label} ↗</span>
              <span className="work-result-context">{result.context}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

type ArticleCiteProps = {
  title: string
  author?: string
  publishedAt: string
  canonicalUrl: string
  pdfHref?: string
}

function chicagoDate(date: string) {
  const value = date.includes('T') ? date : `${date}T00:00:00`
  return new Date(value).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function yearOf(date: string) {
  return date.slice(0, 4)
}

export function ArticleCite({
  title,
  author = 'Wielfried Zouantcha',
  publishedAt,
  canonicalUrl,
  pdfHref,
}: ArticleCiteProps) {
  const citation = `${author}. "${title}." zouantcha.com, ${chicagoDate(publishedAt)}. ${canonicalUrl}.`

  return (
    <div className="mt-4 mb-8 space-y-3 rounded-md border border-line p-4 text-sm" aria-label="Article tools">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        Article tools
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {pdfHref ? (
          <a
            href={pdfHref}
            className="rounded border border-line px-3 py-1.5 font-medium text-ink transition-colors hover:border-ink"
            download
          >
            Download the PDF
          </a>
        ) : null}
        <a
          href={canonicalUrl}
          className="rounded border border-line px-3 py-1.5 font-medium text-ink transition-colors hover:border-ink"
        >
          Open canonical URL
        </a>
      </div>
      <details className="group">
        <summary className="inline-block cursor-pointer list-none underline decoration-line underline-offset-4 transition-colors hover:decoration-ink [&::-webkit-details-marker]:hidden">
          <span className="underline">Show citation</span>
          <span className="sr-only">
            {` this article (${author}, ${yearOf(publishedAt)})`}
          </span>
        </summary>
        <div className="mt-2 space-y-2 rounded-md border border-line p-3">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Suggested citation
          </p>
          <p className="leading-6 text-ink-soft">
            {citation}
          </p>
          <p className="leading-6">
            Link:{' '}
            <a
              href={canonicalUrl}
              className="break-all underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              {canonicalUrl}
            </a>
          </p>
        </div>
      </details>
    </div>
  )
}

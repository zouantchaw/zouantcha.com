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
    <div className="mt-4 mb-8 space-y-3 rounded-md border border-neutral-200 p-4 text-sm dark:border-neutral-800" aria-label="Article tools">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
        Article tools
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {pdfHref ? (
          <a
            href={pdfHref}
            className="rounded border border-neutral-300 px-3 py-1.5 font-medium text-neutral-800 transition-colors hover:border-neutral-950 hover:text-neutral-950 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-50 dark:hover:text-neutral-50"
            download
          >
            Download the PDF
          </a>
        ) : null}
        <a
          href={canonicalUrl}
          className="rounded border border-neutral-300 px-3 py-1.5 font-medium text-neutral-800 transition-colors hover:border-neutral-950 hover:text-neutral-950 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-50 dark:hover:text-neutral-50"
        >
          Open canonical URL
        </a>
      </div>
      <details className="group">
        <summary className="inline-block cursor-pointer list-none underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 dark:decoration-neutral-700 dark:hover:text-neutral-50 [&::-webkit-details-marker]:hidden">
          <span className="underline">Show citation</span>
          <span className="sr-only">
            {` this article (${author}, ${yearOf(publishedAt)})`}
          </span>
        </summary>
        <div className="mt-2 space-y-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
          <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
            Suggested citation
          </p>
          <p className="leading-6 text-neutral-800 dark:text-neutral-200">
            {citation}
          </p>
          <p className="leading-6">
            Link:{' '}
            <a
              href={canonicalUrl}
              className="break-all underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 dark:decoration-neutral-700 dark:hover:text-neutral-50"
            >
              {canonicalUrl}
            </a>
          </p>
        </div>
      </details>
    </div>
  )
}

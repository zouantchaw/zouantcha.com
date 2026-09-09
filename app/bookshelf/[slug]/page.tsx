import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBooks } from 'app/lib/books'
export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return { title: getBooks().find((b) => b.slug === slug)?.title ?? 'Book' }
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const b = getBooks().find((b) => b.slug === slug)
  if (!b) notFound()
  return (
    <div className="site-shell personal-page">
      <Link className="reader-back" href={'/bookshelf?year=' + b.year}>
        ← Bookshelf / {b.year}
      </Link>
      <article className="book-detail">
        <div
          className="book-cover"
          style={{ '--book-paper': b.color } as React.CSSProperties}
        >
          <strong>{b.title}</strong>
          <span>{b.author}</span>
        </div>
        <div>
          <p className="eyebrow">Reading / {b.year}</p>
          <h1>{b.title}</h1>
          {b.author && <p>{b.author}</p>}
          <p>
            This is part of my {b.year} reading list. The original entry keeps
            the notes and passages I chose to save together.
          </p>
          <Link href={'/blog/' + b.source}>Read the {b.year} notes ↗</Link>
          {b.href && (
            <p>
              <a href={b.href} rel="noopener noreferrer" target="_blank">
                Find the book ↗
              </a>
            </p>
          )}
          <details className="reference-details">
            <summary>Where this fits in the index</summary>
            <p>
              The bookshelf collects the books listed in my published reading
              notes. Open the yearly entry for the original context.
            </p>
            <Link href="/blog?topic=reading">More reading notes ↗</Link>
          </details>
        </div>
      </article>
    </div>
  )
}

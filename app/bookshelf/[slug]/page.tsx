import { pageMetadata } from 'app/lib/metadata'
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
  const book = getBooks().find((b) => b.slug === slug)
  if (!book) notFound()
  return pageMetadata({ title: book.title, description: `${book.title}${book.author ? ' by ' + book.author : ''}, from Wiel Zouantcha’s ${book.year} reading list.`, path: `/bookshelf/${slug}`, section: 'Bookshelf' })
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
          {b.note && <p className="text-sm text-muted">{b.note}</p>}
          <Link href={'/blog/' + b.source}>Read the {b.year} notes ↗</Link>
          {b.href && (
            <p>
              <a href={b.href} rel="noopener noreferrer" target="_blank">
                Find the book ↗
              </a>
            </p>
          )}
        </div>
      </article>
    </div>
  )
}

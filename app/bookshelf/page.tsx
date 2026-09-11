import { pageMetadata } from 'app/lib/metadata'
import Link from 'next/link'
import { getBooks } from 'app/lib/books'
export const metadata = pageMetadata({
  title: 'Bookshelf',
  description:
    'A few shelves, a few years of reading. Books and notes from Wiel Zouantcha.',
  path: '/bookshelf',
})
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; view?: string }>
}) {
  const { year, view } = await searchParams
  const books = getBooks()
  const years = Array.from(new Set(books.map((b) => b.year)))
  const selected = years.includes(year ?? '') ? year : undefined
  const filtered = books.filter((b) => !selected || b.year === selected)
  const list = view === 'list'
  return (
    <div className="site-shell personal-page">
      <header className="space-y-5">
        <p className="eyebrow">Reading / 2022 onwards</p>
        <h1>My bookshelf.</h1>
        <p>
          I read across software, history, business, and whatever catches my
          attention. These are books from the reading lists I’ve kept here.
        </p>
      </header>
      <nav className="index-tools" aria-label="Bookshelf filters">
        <Link
          href={'/bookshelf?view=' + (list ? 'list' : 'shelf')}
          aria-current={!selected ? 'page' : undefined}
        >
          All years
        </Link>
        {years.map((y) => (
          <Link
            key={y}
            href={'/bookshelf?year=' + y + '&view=' + (list ? 'list' : 'shelf')}
            aria-current={selected === y ? 'page' : undefined}
          >
            {y}
          </Link>
        ))}
        <Link
          href={
            '/bookshelf?view=' +
            (list ? 'shelf' : 'list') +
            (selected ? '&year=' + selected : '')
          }
        >
          {list ? 'Shelf view' : 'List view'}
        </Link>
      </nav>
      <p className="eyebrow" style={{ marginBottom: 24 }}>
        {filtered.length} books{selected ? ' / ' + selected : ''}
      </p>
      <div className={list ? 'book-list' : 'book-grid'}>
        {filtered.map((b) => (
          <article className="book-item" key={b.slug}>
            <Link
              className={
                b.title.length > 50
                  ? 'book-cover book-cover-long'
                  : 'book-cover'
              }
              style={{ '--book-paper': b.color } as React.CSSProperties}
              href={'/bookshelf/' + b.slug}
              aria-label={'Open ' + b.title}
            >
              <strong>{b.title}</strong>
              <span>{b.author}</span>
            </Link>
            <p>
              <Link href={'/bookshelf/' + b.slug}>{b.title} ↗</Link>
            </p>
            <small>
              {b.year}
              {b.author ? ' · ' + b.author : ''}
            </small>
            {b.note && <small className="block text-muted">{b.note}</small>}
          </article>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted">
        Typographic covers for this shelf.{' '}
        <Link href="/blog?topic=reading">Read the original yearly notes ↗</Link>
      </p>
    </div>
  )
}

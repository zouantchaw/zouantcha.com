import Link from 'next/link'
import { getBlogPosts, formatDate } from './utils'
export const metadata = {
  title: 'Notes',
  description:
    'Notes on software, research, reading, and things I want to understand.',
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; year?: string }>
}) {
  const { topic, year } = await searchParams
  const posts = getBlogPosts().sort((a, b) =>
    b.metadata.publishedAt.localeCompare(a.metadata.publishedAt),
  )
  const selected = topic === 'reading' || topic === 'software' ? topic : 'all'
  const years = Array.from(
    new Set(posts.map((p) => p.metadata.publishedAt.slice(0, 4))),
  )
  const filtered = posts.filter(
    (p) =>
      (selected === 'all' ||
        (selected === 'reading'
          ? p.slug.startsWith('books-read')
          : !p.slug.startsWith('books-read'))) &&
      (!year || p.metadata.publishedAt.startsWith(year)),
  )
  return (
    <div className="site-shell personal-page">
      <header className="space-y-5">
        <p className="eyebrow">Notes / ideas to come back to</p>
        <h1>Things I’m thinking about.</h1>
        <p>
          Some notes come from building. Others come from a book, or a question
          that stayed with me.
        </p>
      </header>
      <nav className="index-tools" aria-label="Filter notes">
        {['all', 'software', 'reading'].map((t) => (
          <Link
            key={t}
            href={'/blog?topic=' + t + (year ? '&year=' + year : '')}
            aria-current={selected === t ? 'page' : undefined}
          >
            {t === 'all'
              ? 'All notes'
              : t === 'reading'
                ? 'Reading'
                : 'Software & research'}
          </Link>
        ))}
        <Link href="/fr/blog">En français ↗</Link>
      </nav>
      <nav className="index-tools" aria-label="Filter by year">
        <Link
          href={'/blog?topic=' + selected}
          aria-current={!year ? 'page' : undefined}
        >
          All years
        </Link>
        {years.map((y) => (
          <Link
            key={y}
            href={'/blog?topic=' + selected + '&year=' + y}
            aria-current={year === y ? 'page' : undefined}
          >
            {y}
          </Link>
        ))}
      </nav>
      {filtered.length ? (
        filtered.map((post) => (
          <Link
            className="result-row"
            key={post.slug}
            href={'/blog/' + post.slug}
          >
            <small>{formatDate(post.metadata.publishedAt)}</small>
            <h2>{post.metadata.title} ↗</h2>
            <p>{post.metadata.summary}</p>
          </Link>
        ))
      ) : (
        <p>
          No notes in this selection. <Link href="/blog">Clear filters</Link>
        </p>
      )}
    </div>
  )
}

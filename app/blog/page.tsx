import Link from 'next/link'
import { getBlogPosts, formatDate } from './utils'
export const metadata = {
  title: 'Notes',
  description:
    'Notes on software, research, reading, and things I want to understand.',
}
const topics = {
  all: 'All notes',
  everyday: 'Everyday',
  cities: 'Cities & places',
  software: 'Software & research',
  reading: 'Reading',
}
const noteDate = (post) => post.metadata.writtenAt || post.metadata.publishedAt
const noteTopic = (post) =>
  post.metadata.topic ||
  (post.slug.startsWith('books-read') ? 'reading' : 'software')

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; year?: string }>
}) {
  const { topic, year } = await searchParams
  const posts = getBlogPosts().sort((a, b) =>
    noteDate(b).localeCompare(noteDate(a)),
  )
  const selected = topic && Object.hasOwn(topics, topic) ? topic : 'all'
  const years = Array.from(new Set(posts.map((p) => noteDate(p).slice(0, 4))))
  const filtered = posts.filter(
    (p) =>
      (selected === 'all' || noteTopic(p) === selected) &&
      (!year || noteDate(p).startsWith(year)),
  )
  return (
    <div className="site-shell personal-page">
      <header className="space-y-5">
        <p className="eyebrow">Notebook / 2020 onwards</p>
        <h1>From my notebooks.</h1>
        <p>
          I started keeping these in Logseq. These days I use Obsidian. There
          are coding journals, reading notes, walks, trips, and questions I
          haven’t answered. I’ve cleaned up older entries a little for this
          site. They’re ordered by when I wrote them.
        </p>
      </header>
      <nav className="index-tools" aria-label="Filter notes">
        {Object.keys(topics).map((t) => (
          <Link
            key={t}
            href={'/blog?topic=' + t + (year ? '&year=' + year : '')}
            aria-current={selected === t ? 'page' : undefined}
          >
            {topics[t]}
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
            <small>{formatDate(noteDate(post))}</small>
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

import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'
import { work } from 'app/lib/work'
import { getBooks } from 'app/lib/books'
import { experience } from 'app/lib/site'
export const metadata = {
  title: 'Find something',
  description: 'Search published case studies, work, notes, and reading lists.',
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>
}) {
  const { q = '', type = 'all' } = await searchParams
  const query = q.trim().slice(0, 200)
  const items = [
    ...work.map((w) => ({
      title: w.title,
      body: w.dek,
      href: '/case-studies/' + w.slug,
      type: 'case studies',
    })),
    ...getBlogPosts().map((p) => ({
      title: p.metadata.title,
      body: p.metadata.summary,
      href: '/blog/' + p.slug,
      type: 'notes',
    })),
    ...getBooks().map((b) => ({
      title: b.title,
      body: b.author + ' · ' + b.year,
      href: '/bookshelf/' + b.slug,
      type: 'books',
    })),
    ...experience.map((r) => ({
      title: r.company,
      body: r.role + ' ' + r.body.join(' '),
      href: '/work',
      type: 'work',
    })),
  ]
  const normalize = (v: string) =>
    v
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  const results = items.filter(
    (i) =>
      (type === 'all' || i.type === type) &&
      (!query || normalize(i.title + ' ' + i.body).includes(normalize(query))),
  )
  return (
    <div className="site-shell personal-page">
      <header className="space-y-5">
        <p className="eyebrow">Find a thread</p>
        <h1>What caught your attention?</h1>
        <p>Search the published notes, work, case studies, and bookshelf.</p>
      </header>
      <form className="search-form" action="/search">
        <label className="sr-only" htmlFor="site-query">
          Search this site
        </label>
        <input
          id="site-query"
          name="q"
          type="search"
          className="search-input"
          defaultValue={query}
          placeholder="Montréal, a book, a project…"
          maxLength={200}
        />
        <input type="hidden" name="type" value={type} />
        <button className="search-submit">Search</button>
      </form>
      <nav className="index-tools" aria-label="Search categories">
        {['all', 'case studies', 'notes', 'books', 'work'].map((t) => (
          <Link
            key={t}
            href={
              '/search?q=' +
              encodeURIComponent(query) +
              '&type=' +
              encodeURIComponent(t)
            }
            aria-current={t === type ? 'page' : undefined}
          >
            {t === 'all' ? 'Everything' : t[0].toUpperCase() + t.slice(1)}
          </Link>
        ))}
      </nav>
      {!query && (
        <p className="mb-8 text-muted">
          Try <Link href="/search?q=Montréal">Montréal</Link>,{' '}
          <Link href="/search?q=reading">reading</Link>, or{' '}
          <Link href="/search?q=PortMind">PortMind</Link>.
        </p>
      )}
      <p className="eyebrow">
        {results.length}{' '}
        {query ? 'results for “' + query + '”' : 'published entries'}
      </p>
      {results.map((i) => (
        <Link className="result-row" key={i.href + i.title} href={i.href}>
          <small>{i.type}</small>
          <h2>{i.title} ↗</h2>
          <p>{i.body.length > 180 ? i.body.slice(0, 177) + '…' : i.body}</p>
        </Link>
      ))}
      {!results.length && (
        <div className="py-10">
          <p>Nothing here matches that search.</p>
          <p className="mt-3 text-muted">
            Try a shorter phrase, a project name, or{' '}
            <Link href="/search">clear the filters</Link>.
          </p>
        </div>
      )}
    </div>
  )
}

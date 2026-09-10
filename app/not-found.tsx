import Link from 'next/link'
export default function NotFound() {
  return (
    <section className="site-shell personal-page">
      <header className="space-y-5">
        <p className="eyebrow">404 / page not found</p>
        <h1>This page isn’t here.</h1>
        <p>
          The link may have changed, or the page may no longer be published.
        </p>
      </header>
      <div className="flex gap-8 flex-wrap">
        <Link href="/">Back to the index ↗</Link>
        <Link href="/search">Find something ↗</Link>
        <Link href="/case-studies">Case studies ↗</Link>
      </div>
    </section>
  )
}

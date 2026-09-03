import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="site-shell max-w-2xl space-y-4">
      <h1 className="font-mono text-[32px] tracking-tight">404. Page not found</h1>
      <p className="leading-7 text-ink-soft">
        The page you are looking for does not exist.{' '}
        <Link
          href="/"
          className="underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Go home
        </Link>
        .
      </p>
    </section>
  )
}

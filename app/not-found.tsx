import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">404 - Page Not Found</h1>
      <p className="leading-7 text-neutral-700 dark:text-neutral-300">
        The page you are looking for does not exist.{" "}
        <Link
          href="/"
          className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 dark:decoration-neutral-700 dark:hover:text-neutral-50"
        >
          Go home
        </Link>
        .
      </p>
    </section>
  )
}

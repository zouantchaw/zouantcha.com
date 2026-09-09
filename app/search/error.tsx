'use client'
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="site-shell personal-page">
      <h1>That search didn’t load.</h1>
      <p className="my-6">
        Your query is still in the address bar. Try loading it again.
      </p>
      <button className="search-submit" onClick={reset}>
        Try again
      </button>
    </div>
  )
}

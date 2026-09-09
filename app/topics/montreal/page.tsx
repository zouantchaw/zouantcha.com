import { ReferencePreview } from 'app/components/reference-preview'
import Link from 'next/link'
export const metadata = {
  title: 'Montréal',
  description:
    'Books, old photographs, and a camera at the port. An interest across the personal index.',
}
export default function Page() {
  return (
    <div className="site-shell personal-page">
      <header className="space-y-5">
        <p className="eyebrow">Follow an interest / the city</p>
        <h1>Montréal, from a few angles.</h1>
        <p>
          A city can hold your attention in more than one way. For me, that has
          meant books, an open dataset of photographs, and eventually a camera
          looking over the port.
        </p>
      </header>
      {[
        {
          label: 'Archive / research',
          title: 'MTL Archives',
          href: '/case-studies/mtl-archives',
          body: 'An open dataset became a way to search, explore, and share the city’s photographic history.',
        },
        {
          label: 'Port / research',
          title: 'PortMind',
          href: '/case-studies/portmind',
          body: 'Port Observatory MTL grew into a research project about what vision models can tell us from port-camera images.',
        },
        {
          label: 'Reading / 2022',
          title: 'A city in the reading notes',
          href: '/blog/books-read-2022',
          body: 'Montréal at War and Remembrance of Grandeur are among the books in my 2022 reading notes. A different way of spending time with the city.',
        },
      ].map((r) => (
        <article className="topic-row" key={r.href}>
          <p className="eyebrow">{r.label}</p>
          <div>
            <h2>
              <Link href={r.href}>{r.title} ↗</Link>
            </h2>
            <p>{r.body}</p>
            {r.href.startsWith('/blog/') && (
              <ReferencePreview
                title="Books read in 2022"
                description="Montréal at War and Remembrance of Grandeur appear alongside books about business, focused work, and history in this reading list."
                href={r.href}
              />
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

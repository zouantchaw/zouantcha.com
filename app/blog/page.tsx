import Link from 'next/link'
import { pageMetadata } from 'app/lib/metadata'
import { getBlogPostsByLocale } from 'app/blog/utils'
import { Separator } from 'app/components/ui/separator'

export const metadata = pageMetadata({ title: 'Writing', description: 'Notes and reading lists.', path: '/blog' })

export default function Page() {
  const posts = getBlogPostsByLocale('en').toSorted((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt))
  return <div className="frame-shell v2-page v2-writing">
    <header className="v2-heading"><p className="v2-label">WRITING</p><h1>Notes and reading lists.</h1><p>Writing</p></header>
    <div className="v2-case-rows">{posts.map(post => <div key={post.slug}>
      <Separator />
      <Link className="v2-case-row" href={'/blog/' + post.slug}><h2>{post.metadata.title}</h2><p>{post.metadata.summary}</p><time className="v2-label" dateTime={post.metadata.publishedAt}>{post.metadata.publishedAt.slice(0, 4)}</time></Link>
    </div>)}<Separator /></div>
  </div>
}

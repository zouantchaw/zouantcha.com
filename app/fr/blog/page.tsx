import { BlogPosts } from 'app/components/posts'
import { getBlogPostsByLocale } from 'app/blog/utils'

export const metadata = {
  title: 'Blog (FR)',
  description: 'Articles en français.',
}

export default function Page() {
  let posts = getBlogPostsByLocale('fr')

  return (
    <section className="site-shell personal-page space-y-6">
      <header>
        <p className="eyebrow">Notes / en français</p>
        <h1>Notes en français</h1>
      </header>
      <BlogPosts
        posts={posts}
        basePath="/fr/blog"
        emptyMessage="Pas d’articles en français pour l’instant."
      />
    </section>
  )
}

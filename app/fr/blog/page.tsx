import { BlogPosts } from 'app/components/posts'
import { getBlogPostsByLocale } from 'app/blog/utils'

export const metadata = {
  title: 'Blog (FR)',
  description: 'Articles en français.',
}

export default function Page() {
  let posts = getBlogPostsByLocale('fr')

  return (
    <section className="site-shell space-y-6">
      <h1 className="font-mono text-[32px] tracking-tight">Writing in French</h1>
      <BlogPosts
        posts={posts}
        basePath="/fr/blog"
        emptyMessage="Pas d’articles en français pour l’instant."
      />
    </section>
  )
}

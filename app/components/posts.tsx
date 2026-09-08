import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

type BlogPost = ReturnType<typeof getBlogPosts>[number]

type BlogPostsProps = {
  posts?: BlogPost[]
  basePath?: string
  emptyMessage?: string
}

export function BlogPosts({
  posts,
  basePath = '/blog',
  emptyMessage = 'No posts yet.',
}: BlogPostsProps) {
  let allBlogs = posts ?? getBlogPosts()

  if (!allBlogs.length) {
    return <p className="text-muted">{emptyMessage}</p>
  }

  return (
    <div>
      {allBlogs
        .slice()
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="reading-row writing-entry"
            href={`${basePath}/${post.slug}`}
          >
            <p className="font-mono text-xs text-muted">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="writing-title">
              {post.metadata.title}
            </p>
          </Link>
        ))}
      <div className="border-t border-line" />
    </div>
  )
}

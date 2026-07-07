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
    return (
      <p className="text-neutral-600 dark:text-neutral-400">{emptyMessage}</p>
    )
  }

  return (
    <div className="space-y-3">
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
            className="group block"
            href={`${basePath}/${post.slug}`}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <p className="min-w-32 text-sm tabular-nums text-neutral-500 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 group-hover:underline group-hover:decoration-neutral-300 group-hover:underline-offset-4 dark:text-neutral-100 dark:group-hover:decoration-neutral-700">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}

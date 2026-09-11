import { pageMetadata } from 'app/lib/metadata'
import type { ComponentProps } from 'react'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

// The whitepaper contains C and literal numerical results. The JavaScript
// highlighter can alter C operators, so preserve these source strings verbatim.
function WhitepaperCode({ children, ...props }: ComponentProps<'code'>) {
  return <code {...props}>{children}</code>
}

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type BlogPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPosts().find(post => post.slug === slug)
  if (!post) notFound()
  return pageMetadata({
    title: post.metadata.title, description: post.metadata.summary,
    path: `/blog/${slug}`, section: 'Notes',
    publishedTime: post.metadata.publishedAt, locale: 'en_US',
  })
}

export default async function Blog({ params }: BlogPageProps) {
  let { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  let canonicalUrl = `${baseUrl}/blog/${post.slug}`

  return (
    <section className="site-shell reader-page">
      <a href="/blog" className="reader-back">← Notes</a>
      <div className="max-w-3xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: canonicalUrl,
            author: {
              '@type': 'Person',
              name: 'Wiel Zouantcha',
            },
          }),
        }}
      />
      <h1 className="title font-mono text-[28px] leading-[1.2] tracking-[-0.03em] text-ink sm:text-[36px]">
        {post.metadata.title}
      </h1>
      <div className="mt-4 mb-10 text-sm">
        <div className="flex justify-between items-center">
          <p className="font-mono text-xs text-muted">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>

      </div>
      <article className="prose">
        <CustomMDX
          source={post.content}
          components={slug === 'bitcoin-whitepaper' ? { code: WhitepaperCode } : undefined}
        />
      </article>
      <nav className="mt-16 border-t border-line pt-8"><a href="/blog">Back to the notes ↗</a></nav>
      </div>
    </section>
  )
}

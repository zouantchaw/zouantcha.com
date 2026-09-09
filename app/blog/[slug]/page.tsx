import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

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

export async function generateMetadata({ params }: BlogPageProps) {
  let { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}${description ? `&summary=${encodeURIComponent(description)}` : ''}`
  let canonicalUrl = `${baseUrl}/blog/${post.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
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
        <CustomMDX source={post.content} />
      </article>
      <nav className="mt-16 border-t border-line pt-8"><a href="/blog">Back to the notes ↗</a></nav>
      </div>
    </section>
  )
}

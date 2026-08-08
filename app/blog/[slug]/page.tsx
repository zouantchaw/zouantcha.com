import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { ArticleCite } from 'app/components/article-cite'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

const SCHOLARLY_SLUG = 'bitcoin-whitepaper-explained'
const SCHOLARLY_SOURCE_URL = 'https://bitcoin.org/bitcoin.pdf'

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
    ...(post.slug === SCHOLARLY_SLUG
      ? {
          alternates: {
            canonical: canonicalUrl,
          },
        }
      : {}),
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
  let isScholarly = post.slug === SCHOLARLY_SLUG

  return (
    <section>
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
              name: 'Wielfried Zouantcha',
            },
          }),
        }}
      />
      {isScholarly ? (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ScholarlyArticle',
              headline: post.metadata.title,
              description: post.metadata.summary,
              author: {
                '@type': 'Person',
                name: 'Wielfried Zouantcha',
              },
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              url: canonicalUrl,
              citation: SCHOLARLY_SOURCE_URL,
            }),
          }}
        />
      ) : null}
      <h1 className="title text-2xl font-semibold">
        {post.metadata.title}
      </h1>
      <div className="mt-2 mb-8 text-sm">
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>
        {isScholarly ? (
          <ArticleCite
            title={post.metadata.title}
            publishedAt={post.metadata.publishedAt}
            canonicalUrl={canonicalUrl}
            pdfHref={post.metadata.pdf}
          />
        ) : null}
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}

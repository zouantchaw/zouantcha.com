import { getBlogPosts } from 'app/blog/utils'
import { work } from 'app/lib/work'

export const baseUrl = 'https://www.zouantcha.com'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let caseStudyPages = work.map((item) => `/case-studies/${item.slug}`)

  let routes = [
    '',
    '/case-studies',
    '/work',
    '/about',
    '/contact',
    '/blog',
    '/slides',
    ...caseStudyPages,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
  }))

  return [...routes, ...blogs]
}

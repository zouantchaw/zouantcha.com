import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://www.zouantcha.com'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let caseStudyPages = [
    '/case-studies/mtl-archives',
    '/case-studies/portmind',
    '/case-studies/diane-party-rentals',
    '/case-studies/ballerz-football-academy',
    '/case-studies/starthome',
  ]

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
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}

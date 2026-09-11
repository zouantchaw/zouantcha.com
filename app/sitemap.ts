import { getBlogPosts, getBlogPostsByLocale } from 'app/blog/utils'
import { getBooks } from 'app/lib/books'
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
    '/bookshelf',
    '/topics/montreal',
    '/work/oloodi',
    '/work/ethos',
    '/work/independent',
    '/work/saas-alerts',
    ...getBooks().map((book) => '/bookshelf/' + book.slug),
    ...caseStudyPages,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
  }))

  const french = getBlogPostsByLocale('fr').map(post => ({ url: `${baseUrl}/fr/blog/${post.slug}`, lastModified: post.metadata.publishedAt }))
  return [...routes, { url: `${baseUrl}/fr/blog` }, ...blogs, ...french]
}

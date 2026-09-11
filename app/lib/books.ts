import { getBlogPosts } from 'app/blog/utils'
export type Book = {
  slug: string
  title: string
  author: string
  year: string
  source: string
  href?: string
  note?: string
  color: string
}
const colors = [
  '#e2e6da',
  '#e3daca',
  '#dbe2ea',
  '#e4d7d1',
  '#d8e1de',
  '#e7e4d4',
]
export function getBooks(): Book[] {
  const books: Book[] = []
  for (const post of getBlogPosts().filter((p) =>
    p.slug.startsWith('books-read-'),
  )) {
    const year = post.slug.slice(-4)
    const entries = Array.from(
      post.content.matchAll(/^\d+\. \[([^\]]+)\]\(([^)]+)\)(?: by (.+))?$/gm),
    )
    const plain = Array.from(post.content.matchAll(/^\d+\. (?!\[)(.+)$/gm))
    for (const e of plain)
      books.push({
        slug: slugify(e[1]) + '-' + year,
        title: e[1],
        author: '',
        year,
        source: post.slug,
        color: colors[books.length % colors.length],
      })
    const headings = Array.from(post.content.matchAll(/^### (.+)$/gm))
    for (const e of entries)
      books.push({
        slug: slugify(e[1]) + '-' + year,
        title: e[1],
        href: e[2],
        author: e[3] ?? '',
        year,
        source: post.slug,
        color: colors[books.length % colors.length],
      })
    for (const e of headings) {
      const parts = e[1].split(/ by /i)
      const title = parts[0].replace(/\*|_+/g, '')
      if (books.some((b) => b.year === year && b.title === title)) continue
      books.push({
        slug: slugify(title) + '-' + year,
        title,
        author: parts.slice(1).join(' by '),
        year,
        source: post.slug,
        color: colors[books.length % colors.length],
      })
    }
  }
  return books.sort((a, b) => b.year.localeCompare(a.year))
}
function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

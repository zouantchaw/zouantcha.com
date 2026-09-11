export const readingKey = 'personal-index:reading-position'
export type ReadingPosition = {
  slug: string
  title: string
  section: string
  heading: string
}
const slugs = ['mtl-archives', 'portmind', 'diane-party-rentals', 'starthome']
export function readPosition(): ReadingPosition | null {
  try {
    const value = JSON.parse(localStorage.getItem(readingKey) ?? 'null')
    return value &&
      slugs.includes(value.slug) &&
      typeof value.title === 'string' &&
      typeof value.heading === 'string' &&
      typeof value.section === 'string' &&
      /^[a-z0-9-]+$/.test(value.section)
      ? value
      : null
  } catch {
    return null
  }
}
export function savePosition(value: ReadingPosition) {
  try {
    localStorage.setItem(readingKey, JSON.stringify(value))
  } catch {}
}

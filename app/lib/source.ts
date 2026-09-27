export const SOURCE_KEY = 'src'

export function readSrcParam(search: string | URLSearchParams): string {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search
  return (params.get(SOURCE_KEY) || '').trim().slice(0, 80)
}

export function withSrc(href: string, src?: string | null): string {
  if (!src) return href
  if (
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#') ||
    href.startsWith('http://') ||
    href.startsWith('https://')
  ) {
    return href
  }
  const [pathAndQuery, hash = ''] = href.split('#')
  const url = new URL(pathAndQuery, 'https://www.zouantcha.com')
  if (!url.searchParams.get(SOURCE_KEY)) url.searchParams.set(SOURCE_KEY, src)
  return `${url.pathname}${url.search}${hash ? `#${hash}` : ''}`
}

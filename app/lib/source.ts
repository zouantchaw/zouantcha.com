// Only bounded campaign labels belong in tab storage; never URLs or personal data.
export const SOURCE_KEY = 'src'
const ATTRIBUTION_KEY = 'wiel.attribution.v1'
export type Attribution = {
  src: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
}

export function normalizeSource(value: unknown): string {
  if (typeof value !== 'string') return ''
  const raw = value.trim()
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,79}$/.test(raw)) return ''
  const label = raw.toLowerCase()
  for (const [source, aliases, hosts] of [
    ['ig', ['ig', 'instagram'], ['instagram.com']],
    ['tiktok', ['tiktok'], ['tiktok.com']],
    ['youtube', ['youtube', 'yt'], ['youtube.com', 'youtu.be']],
    ['linkedin', ['linkedin'], ['linkedin.com']],
  ] as const) {
    if (aliases.some(alias => alias === label) || hosts.some(host => label === host || label.endsWith(`.${host}`))) return source
  }
  return raw
}

function campaign(value: unknown): string {
  if (typeof value !== 'string') return ''
  const label = value.trim()
  return /^[a-zA-Z0-9/_ .:-]{1,100}$/.test(label) ? label : ''
}

function referrerSource(referrer: string): string {
  try {
    const host = new URL(referrer).hostname.toLowerCase()
    const source = normalizeSource(host)
    return ['ig', 'tiktok', 'youtube', 'linkedin'].includes(source) ? source : ''
  } catch { return '' }
}

export function resolveAttribution(
  params: URLSearchParams,
  stored?: Partial<Attribution>,
  referrer = '',
): Attribution {
  const explicitUtm = normalizeSource(params.get('utm_source'))
  const explicit = normalizeSource(params.get('src')) || explicitUtm
  const src = explicit || normalizeSource(stored?.src) || referrerSource(referrer)
  return {
    src,
    utm_source: explicitUtm || (explicit ? src : normalizeSource(stored?.utm_source) || src),
    utm_medium: campaign(params.get('utm_medium')) || (explicit ? '' : campaign(stored?.utm_medium)),
    utm_campaign: campaign(params.get('utm_campaign')) || (explicit ? '' : campaign(stored?.utm_campaign)),
  }
}

// Resolve synchronously at the point of use. Effects are never the source of truth.
export function browserAttribution(): Attribution {
  if (typeof window === 'undefined') return resolveAttribution(new URLSearchParams())
  let stored: Partial<Attribution> | undefined
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY)
    stored = raw ? JSON.parse(raw) : { src: window.sessionStorage.getItem(SOURCE_KEY) || '' }
  } catch {}
  const attribution = resolveAttribution(new URLSearchParams(window.location.search), stored, document.referrer)
  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution))
  } catch {}
  return attribution
}

export function readSrcParam(search: string | URLSearchParams): string {
  return resolveAttribution(typeof search === 'string' ? new URLSearchParams(search) : search).src
}

export function withSrc(href: string, src?: string | null): string {
  const source = normalizeSource(src)
  if (!source || !href.startsWith('/') || href.startsWith('//')) return href
  const url = new URL(href, 'https://www.zouantcha.com')
  if (!readSrcParam(url.searchParams)) url.searchParams.set(SOURCE_KEY, source)
  return `${url.pathname}${url.search}${url.hash}`
}

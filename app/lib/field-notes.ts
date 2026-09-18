export const FIELD_NOTES_SOURCE = 'start_page'

const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i
const ATTR_MAX = 200

export type FieldNotesAttribution = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
}

export function clipAttr(value: unknown, max = ATTR_MAX): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const email = raw.trim().toLowerCase()
  if (email.length < 3 || email.length > 254) return null
  if (email.includes('..') || email.includes(' ')) return null
  if (!EMAIL_RE.test(email)) return null
  return email
}

export function pickAttribution(
  params: Record<string, string | string[] | undefined>,
): FieldNotesAttribution {
  const read = (key: string) => {
    const value = params[key]
    return clipAttr(Array.isArray(value) ? value[0] : value)
  }
  return {
    utm_source: read('utm_source'),
    utm_medium: read('utm_medium'),
    utm_campaign: read('utm_campaign'),
  }
}

export function withAttribution(path: string, attribution: FieldNotesAttribution): string {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(attribution)) {
    if (value) query.set(key, value)
  }
  const serialized = query.toString()
  return serialized ? `${path}?${serialized}` : path
}

export async function hashIp(ip: string, secret: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${secret}:${ip}`),
  )
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32)
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

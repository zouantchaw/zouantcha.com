export interface Env {
  DB: D1Database
  INGEST_SECRET: string
}

const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT = 8
const MAX_BODY_BYTES = 4096
const ATTR_MAX = 200

function json(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

function clip(value: unknown, max = ATTR_MAX): string | null {
  if (typeof value !== 'string') return null
  const text = value.trim().slice(0, max)
  return text || null
}

function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null
  const email = raw.trim().toLowerCase()
  if (email.length < 3 || email.length > 254) return null
  if (email.includes('..') || email.includes(' ')) return null
  if (!EMAIL_RE.test(email)) return null
  return email
}

async function secretsMatch(provided: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const [left, right] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(provided)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected)),
  ])
  const a = new Uint8Array(left)
  const b = new Uint8Array(right)
  if (a.byteLength !== b.byteLength) return false
  let diff = 0
  for (let i = 0; i < a.byteLength; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

function bearerToken(request: Request): string {
  const header = request.headers.get('authorization') || ''
  return header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : ''
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'GET' && url.pathname === '/health') {
      return json(200, { ok: true })
    }

    if (request.method !== 'POST' || url.pathname !== '/subscribe') {
      return json(404, { ok: false, error: 'not_found' })
    }

    if (!env.INGEST_SECRET) {
      return json(503, { ok: false, error: 'unavailable' })
    }

    const authorized = await secretsMatch(bearerToken(request), env.INGEST_SECRET)
    if (!authorized) {
      return json(401, { ok: false, error: 'unauthorized' })
    }

    const length = Number(request.headers.get('content-length') || '0')
    if (length > MAX_BODY_BYTES) {
      return json(413, { ok: false, error: 'invalid' })
    }

    let payload: Record<string, unknown>
    try {
      const raw = await request.text()
      if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: 'invalid' })
      payload = JSON.parse(raw) as Record<string, unknown>
    } catch {
      return json(400, { ok: false, error: 'invalid' })
    }

    const email = normalizeEmail(payload.email)
    if (!email) {
      return json(400, { ok: false, error: 'invalid_email' })
    }

    const source = clip(payload.source, 64) || 'start_page'
    const referrer = clip(payload.referrer, 500)
    const utmSource = clip(payload.utm_source)
    const utmMedium = clip(payload.utm_medium)
    const utmCampaign = clip(payload.utm_campaign)
    const ipHash = clip(payload.ip_hash, 64)

    const now = new Date().toISOString()

    if (ipHash) {
      const windowStart = new Date(Date.now() - RATE_WINDOW_MS).toISOString()
      const counted = await env.DB.prepare(
        'SELECT COUNT(*) AS n FROM signup_attempts WHERE ip_hash = ? AND created_at >= ?',
      )
        .bind(ipHash, windowStart)
        .first<{ n: number }>()

      if ((counted?.n ?? 0) >= RATE_LIMIT) {
        return json(429, { ok: false, error: 'rate_limited' })
      }

      await env.DB.prepare(
        'INSERT INTO signup_attempts (id, ip_hash, created_at) VALUES (?, ?, ?)',
      )
        .bind(crypto.randomUUID(), ipHash, now)
        .run()
    }

    try {
      const inserted = await env.DB.prepare(
        `INSERT INTO subscribers (
          id, email, created_at, source, referrer, utm_source, utm_medium, utm_campaign
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(email) DO NOTHING`,
      )
        .bind(
          crypto.randomUUID(),
          email,
          now,
          source,
          referrer,
          utmSource,
          utmMedium,
          utmCampaign,
        )
        .run()

      return json(200, {
        ok: true,
        duplicate: (inserted.meta.changes ?? 0) === 0,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      if (message.includes('UNIQUE constraint failed')) {
        return json(200, { ok: true, duplicate: true })
      }
      return json(503, { ok: false, error: 'unavailable' })
    }
  },
}

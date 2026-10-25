import { sendTestIssue, unsubscribeIssue, resendWebhook, type IssueEnv } from './issues'
import { act, digest, signup } from './lifecycle'
import { liveReady, previewMode } from './email'
import { normalizeSource, resolveAttribution } from '../../../app/lib/source'
export interface Env extends IssueEnv {
  INGEST_SECRET?: string
  FIELD_NOTES_INGEST_SECRET?: string
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

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (request.method === 'GET' && url.pathname === '/health') return json(200, { ok: true })
    if (url.pathname === '/issues/unsubscribe') return unsubscribeIssue(request, env)
    if (url.pathname === '/webhooks/resend' && request.method === 'POST') return resendWebhook(request, env)
    if (request.method !== 'POST' || !['/subscribe','/confirm','/unsubscribe','/issues/test'].includes(url.pathname)) return json(404, { ok: false, error: 'not_found' })
    const secret = url.pathname === '/issues/test' ? env.ISSUE_ADMIN_SECRET
      : env.SITE_ENV === 'staging' ? env.FIELD_NOTES_INGEST_SECRET : env.INGEST_SECRET
    if (!secret) return json(503, { ok: false, error: 'unavailable' })
    if (!await secretsMatch(bearerToken(request), secret)) return json(401, { ok: false, error: 'unauthorized' })
    if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) return json(413, { ok: false, error: 'invalid' })
    try {
      const raw = await request.text()
      if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return json(413, { ok: false, error: 'invalid' })
      const payload = JSON.parse(raw) as Record<string, unknown>
      if (!payload || Array.isArray(payload) || typeof payload !== 'object') return json(400, { ok: false, error: 'invalid' })
      if (url.pathname === '/issues/test') return sendTestIssue(env, payload)
      const ipHash = clip(payload.ip_hash, 64)
      if (!ipHash || !/^[a-f0-9]{32,64}$/.test(ipHash)) return json(400, { ok: false, error: 'invalid' })
      const now = new Date().toISOString(), windowStart = new Date(Date.now() - RATE_WINDOW_MS).toISOString()
      // Conditional insert is atomic under concurrent requests; separate scopes.
      const scope = `${url.pathname}:${ipHash}`
      const limited = await env.DB.prepare(`INSERT INTO signup_attempts(id,ip_hash,created_at)
        SELECT ?,?,? WHERE (SELECT COUNT(*) FROM signup_attempts WHERE ip_hash=? AND created_at>=?)<?`)
        .bind(crypto.randomUUID(), scope, now, scope, windowStart, url.pathname === '/subscribe' ? RATE_LIMIT : 30).run()
      if (limited.meta.changes !== 1) return json(429, { ok: false, error: 'rate_limited' })
      if (url.pathname !== '/subscribe') {
        const outcome = await act(env.DB, url.pathname === '/confirm' ? 'confirm' : 'unsubscribe', typeof payload.token === 'string' ? payload.token : '')
        return json(200, { ok: true, status: outcome })
      }
      if (!previewMode(env) && !liveReady(env)) return json(503, { ok: false, error: 'unavailable' })
      const email = normalizeEmail(payload.email)
      if (!email) return json(400, { ok: false, error: 'invalid_email' })
      const emailKey = `email:${await digest(`${secret}:${email}`)}`
      const counted = await env.DB.prepare(`INSERT INTO signup_attempts(id,ip_hash,created_at)
        SELECT ?,?,? WHERE (SELECT COUNT(*) FROM signup_attempts WHERE ip_hash=? AND created_at>=?)<3`)
        .bind(crypto.randomUUID(), emailKey, now, emailKey, windowStart).run()
      if (counted.meta.changes !== 1 && !previewMode(env)) return json(503, { ok: false, error: 'unavailable' })
      const attribution = resolveAttribution(new URLSearchParams({src:normalizeSource(payload.src),utm_source:normalizeSource(payload.utm_source),utm_medium:clip(payload.utm_medium,100)||'',utm_campaign:clip(payload.utm_campaign,100)||''}))
      if (counted.meta.changes === 1 && !await signup(env, { ...payload, ...attribution, page:payload.page === '/log' ? '/log' : '/start' }, email)) return json(503, { ok: false, error: 'unavailable' })
      return json(200, { ok: true, status: previewMode(env) ? 'preview' : 'pending_confirmation' })
    } catch {
      // No provider errors, recipients, request bodies or tokens in logs.
      return json(503, { ok: false, error: 'unavailable' })
    }
  },
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (env.SITE_ENV !== 'staging') return worker.fetch(request, env)
    const response = new URL(request.url).pathname === '/robots.txt'
      ? new Response(request.method === 'HEAD' ? null : 'User-agent: *\nDisallow: /\n', {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        })
      : await worker.fetch(request, env)
    const headers = new Headers(response.headers)
    headers.set('X-Robots-Tag', 'noindex, nofollow')
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}

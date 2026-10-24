import { NextRequest, NextResponse } from 'next/server'
import { callBuildLog, readBoundedPayload, sameOrigin } from 'app/lib/build-log-server'
import {
  FIELD_NOTES_SOURCE,
  clipAttr,
  normalizeEmail,
  pickAttribution,
} from 'app/lib/field-notes'

const RETURN_PATHS = new Set(['/start', '/log'])

function wantsJson(request: NextRequest): boolean {
  const accept = request.headers.get('accept') || ''
  const contentType = request.headers.get('content-type') || ''
  return accept.includes('application/json') || contentType.includes('application/json')
}

function reply(
  request: NextRequest,
  status: number,
  body: { ok: boolean; error?: string; status?: 'preview' | 'pending_confirmation' },
  payload: Record<string, string> = {},
): NextResponse {
  if (wantsJson(request)) {
    return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
  }
  const url = new URL(RETURN_PATHS.has(payload.return_to) ? payload.return_to : '/start', request.url)
  for (const [key, value] of Object.entries(pickAttribution(payload))) {
    if (value) url.searchParams.set(key, value)
  }
  if (body.ok) url.searchParams.set('signup', body.status || 'preview')
  else url.searchParams.set('error', body.error || 'unavailable')
  url.hash = 'field-notes'
  return NextResponse.redirect(url, { status: 303 })
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return reply(request, 403, { ok: false, error: 'invalid' })
  let payload: Record<string, string>
  try {
    payload = await readBoundedPayload(request)
  } catch {
    return reply(request, 400, { ok: false, error: 'invalid' })
  }

  if (clipAttr(payload.website, 120)) {
    return reply(request, 200, { ok: true, status: process.env.SITE_ENV === 'staging' ? 'preview' : 'pending_confirmation' }, payload)
  }

  const email = normalizeEmail(payload.email)
  if (!email) {
    return reply(request, 400, { ok: false, error: 'invalid_email' }, payload)
  }

  const referrer = clipAttr(payload.referrer, 500)
  const attribution = pickAttribution(payload)

  try {
    const response = await callBuildLog(request, '/subscribe', {
      email,
      source: FIELD_NOTES_SOURCE,
      page: payload.return_to === '/log' ? '/log' : '/start',
      referrer,
      ...attribution,
    })

    if (response.status === 429) {
      return reply(request, 429, { ok: false, error: 'rate_limited' }, payload)
    }

    const result = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string; status?: string }
      | null

    if (!response.ok || !result?.ok || !['preview','pending_confirmation'].includes(result.status || '')) {
      if (result?.error === 'invalid_email') {
        return reply(request, 400, { ok: false, error: 'invalid_email' }, payload)
      }
      return reply(request, 503, { ok: false, error: 'unavailable' }, payload)
    }

    return reply(request, 200, { ok: true, status: result.status as 'preview' | 'pending_confirmation' }, payload)
  } catch {
    return reply(request, 503, { ok: false, error: 'unavailable' }, payload)
  }
}

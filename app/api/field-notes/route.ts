import { NextRequest, NextResponse } from 'next/server'
import {
  FIELD_NOTES_SOURCE,
  clipAttr,
  clientIp,
  hashIp,
  normalizeEmail,
} from 'app/lib/field-notes'

const START_PATH = '/start'

function wantsJson(request: NextRequest): boolean {
  const accept = request.headers.get('accept') || ''
  const contentType = request.headers.get('content-type') || ''
  return accept.includes('application/json') || contentType.includes('application/json')
}

function reply(
  request: NextRequest,
  status: number,
  body: { ok: boolean; error?: string },
): NextResponse {
  if (wantsJson(request)) {
    return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
  }
  const url = new URL(START_PATH, request.url)
  if (body.ok) url.searchParams.set('subscribed', '1')
  else url.searchParams.set('error', body.error || 'unavailable')
  url.hash = 'field-notes'
  return NextResponse.redirect(url, { status: 303 })
}

async function readPayload(request: NextRequest): Promise<Record<string, string>> {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = (await request.json()) as Record<string, unknown>
    return Object.fromEntries(
      Object.entries(body).map(([key, value]) => [key, typeof value === 'string' ? value : '']),
    )
  }
  const form = await request.formData()
  const payload: Record<string, string> = {}
  form.forEach((value, key) => {
    if (typeof value === 'string') payload[key] = value
  })
  return payload
}

export async function POST(request: NextRequest) {
  const workerUrl = process.env.FIELD_NOTES_WORKER_URL
  const secret = process.env.FIELD_NOTES_INGEST_SECRET
  if (!workerUrl || !secret) {
    return reply(request, 503, { ok: false, error: 'unavailable' })
  }

  let payload: Record<string, string>
  try {
    payload = await readPayload(request)
  } catch {
    return reply(request, 400, { ok: false, error: 'invalid' })
  }

  if (clipAttr(payload.website, 120)) {
    return reply(request, 200, { ok: true })
  }

  const email = normalizeEmail(payload.email)
  if (!email) {
    return reply(request, 400, { ok: false, error: 'invalid_email' })
  }

  const ipHash = await hashIp(clientIp(request), secret)
  const referrer = clipAttr(payload.referrer, 500)

  try {
    const response = await fetch(new URL('/subscribe', workerUrl), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        source: FIELD_NOTES_SOURCE,
        referrer,
        utm_source: clipAttr(payload.utm_source),
        utm_medium: clipAttr(payload.utm_medium),
        utm_campaign: clipAttr(payload.utm_campaign),
        ip_hash: ipHash,
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (response.status === 429) {
      return reply(request, 429, { ok: false, error: 'rate_limited' })
    }

    const result = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null

    if (!response.ok || !result?.ok) {
      if (result?.error === 'invalid_email') {
        return reply(request, 400, { ok: false, error: 'invalid_email' })
      }
      return reply(request, 503, { ok: false, error: 'unavailable' })
    }

    return reply(request, 200, { ok: true })
  } catch {
    return reply(request, 503, { ok: false, error: 'unavailable' })
  }
}

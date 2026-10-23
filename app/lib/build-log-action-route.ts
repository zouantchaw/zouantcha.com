import { NextRequest, NextResponse } from 'next/server'
import { callBuildLog, readBoundedPayload, sameOrigin } from './build-log-server'
const outcomes = new Set(['confirmed','unsubscribed','expired','invalid','already_used'])
export async function actionPost(request: NextRequest, action: 'confirm' | 'unsubscribe') {
  let result = 'unavailable'
  let status = 503
  if (!sameOrigin(request)) { result = 'invalid'; status = 403 }
  else try {
    const payload = await readBoundedPayload(request)
    if (!/^[a-f0-9]{64}$/.test(payload.token || '')) { result = 'invalid'; status = 400 }
    else {
      const response = await callBuildLog(request, action === 'confirm' ? '/confirm' : '/unsubscribe', { token: payload.token })
      const body = await response.json().catch(() => null) as { status?: string } | null
      if (response.ok && outcomes.has(body?.status || '')) { result = body!.status!; status = 200 }
      else if (response.status === 429) { result = 'rate_limited'; status = 429 }
    }
  } catch {}
  const headers = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow' }
  if ((request.headers.get('accept') || '').includes('application/json')) return NextResponse.json({ ok: status === 200, status: result }, { status, headers })
  // Fixed destination, no recipient, token or arbitrary return URL in redirects.
  const url = new URL(`/log/${action}`, request.url)
  url.searchParams.set('result', result)
  return NextResponse.redirect(url, { status: 303, headers })
}

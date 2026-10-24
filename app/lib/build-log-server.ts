import 'server-only'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { clientIp, hashIp } from './field-notes'

export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const fetchSite = request.headers.get('sec-fetch-site')
  // A native form from a no-referrer capability page sends Origin: null.
  // Accept that browser case only with same-origin fetch metadata.
  return (!origin || origin === new URL(request.url).origin || (origin === 'null' && fetchSite === 'same-origin')) && fetchSite !== 'cross-site'
}
export async function readBoundedPayload(request: Request): Promise<Record<string, string>> {
  if (Number(request.headers.get('content-length') || 0) > 4096) throw new Error('invalid')
  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > 4096) throw new Error('invalid')
  const type = request.headers.get('content-type') || ''
  if (type.includes('application/json')) {
    const body: unknown = JSON.parse(raw)
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid')
    return Object.fromEntries(Object.entries(body).map(([key, value]) => [key, typeof value === 'string' ? value : '']))
  }
  if (!type.includes('application/x-www-form-urlencoded')) throw new Error('invalid')
  return Object.fromEntries(new URLSearchParams(raw))
}
export async function callBuildLog(request: Request, path: '/subscribe' | '/confirm' | '/unsubscribe', payload: Record<string, unknown>) {
  const workerUrl = process.env.FIELD_NOTES_WORKER_URL
  const secret = process.env.FIELD_NOTES_INGEST_SECRET
  if (!workerUrl || !secret) throw new Error('unavailable')
  let worker: CloudflareEnv['FIELD_NOTES_API'] | undefined
  try { worker = getCloudflareContext().env.FIELD_NOTES_API } catch {}
  return (worker ? worker.fetch.bind(worker) : fetch)(new URL(path, workerUrl), {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, ip_hash: await hashIp(clientIp(request), secret) }),
    signal: AbortSignal.timeout(8000),
  })
}

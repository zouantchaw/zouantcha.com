import { digest, TOKEN_RE, type LifecycleEnv } from './lifecycle'
import { renderBuildLogIssue } from './email'

export interface IssueEnv extends LifecycleEnv {
  ISSUE_ADMIN_SECRET?: string
  ISSUE_SEND_MODE?: 'disabled' | 'allowlist'
  RESEND_API_KEY?: string
  RESEND_WEBHOOK_SECRET?: string
}
const OWNER = 'zouantchaw74@gmail.com'
const API = 'https://zouantcha-field-notes-staging.wiel.workers.dev'
const json = (status: number, body: object) => Response.json(body, {status, headers:{'Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow'}})
const randomToken = () => Array.from(crypto.getRandomValues(new Uint8Array(32)), b=>b.toString(16).padStart(2,'0')).join('')

// Authenticated operator route. This release has exactly one recipient, selected
// from current D1 eligibility. It cannot accept a caller-supplied recipient list.
export async function sendTestIssue(env: IssueEnv, input: Record<string, unknown>) {
  if (env.SITE_ENV !== 'staging' || env.ISSUE_SEND_MODE !== 'allowlist' || !env.RESEND_API_KEY || !env.RESEND_WEBHOOK_SECRET) return json(503,{error:'issue_sending_disabled'})
  const {id,title,paragraphs} = input
  if (typeof id !== 'string' || !/^[a-z0-9-]{1,80}$/.test(id) || typeof title !== 'string' || title.length < 1 || title.length > 160 || /[\r\n]/.test(title)
    || !Array.isArray(paragraphs) || paragraphs.length < 1 || paragraphs.length > 12 || paragraphs.some(p=>typeof p !== 'string'||p.length>2000)) return json(400,{error:'invalid_issue'})
  const contentHash = await digest(JSON.stringify([title,paragraphs]))
  const row = await env.DB.prepare(`SELECT e.membership_id,m.current_request_id FROM build_log_eligible e
    JOIN build_log_memberships m ON m.id=e.membership_id JOIN subscribers s ON s.id=e.subscriber_id WHERE s.email=?`).bind(OWNER).first<{membership_id:string;current_request_id:string}>()
  if (!row) return json(409,{error:'no_eligible_allowlisted_member'})
  const raw = randomToken(), hash = await digest(raw), now = new Date().toISOString()
  const result = await env.DB.batch([
    env.DB.prepare('INSERT INTO build_log_issues VALUES(?,?,?) ON CONFLICT DO NOTHING').bind(id,contentHash,now),
    env.DB.prepare(`INSERT INTO build_log_issue_recipients(issue_id,membership_id,request_id,token_digest,created_at,outcome)
      SELECT ?,?,?,?,?,'unknown' WHERE EXISTS(SELECT 1 FROM build_log_issues WHERE id=? AND content_digest=?)
      AND EXISTS(SELECT 1 FROM build_log_eligible WHERE membership_id=?) ON CONFLICT DO NOTHING`)
      .bind(id,row.membership_id,row.current_request_id,hash,now,id,contentHash,row.membership_id),
  ])
  if (result[1].meta.changes !== 1) return json(409,{error:'already_claimed_or_content_changed'})
  // Claims are never retried automatically, including timeout/crash ambiguity.
  if (!await env.DB.prepare('SELECT 1 FROM build_log_eligible WHERE membership_id=?').bind(row.membership_id).first()) {
    await env.DB.prepare("UPDATE build_log_issue_recipients SET outcome='suppressed',error_code='ineligible' WHERE token_digest=?").bind(hash).run()
    return json(409,{error:'ineligible'})
  }
  const unsubscribe = `${API}/issues/unsubscribe?token=${raw}`
  const mail = renderBuildLogIssue(title, paragraphs as string[], unsubscribe)
  let outcome = 'unknown', messageId: string | null = null, errorCode: string | null = null
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`build-log/${id}/${row.membership_id}`},
      body:JSON.stringify({from:'Wiel <wiel@news.zouantcha.com>',to:[OWNER],reply_to:OWNER,subject:mail.subject,text:mail.text,html:mail.html,
        headers:{'List-Unsubscribe':`<${unsubscribe}>`,'List-Unsubscribe-Post':'List-Unsubscribe=One-Click'}}),signal:AbortSignal.timeout(10000),
    })
    if (response.ok) {
      const body = await response.json() as {id?:string}
      if (typeof body.id === 'string' && body.id.length>0) {outcome='provider-accepted';messageId=body.id}
    } else if (response.status >= 400 && response.status < 500 && response.status !== 408) {outcome='failed';errorCode=`resend_http_${response.status}`}
  } catch {errorCode='outcome_unknown'}
  await env.DB.prepare('UPDATE build_log_issue_recipients SET outcome=?,message_id=?,error_code=? WHERE token_digest=?').bind(outcome,messageId,errorCode,hash).run()
  return json(outcome==='provider-accepted'?200:503,{outcome,messageId})
}

function unsubscribePage(done: boolean) {
  const content = done
    ? "<h1>You're unsubscribed</h1><p>You won't receive Wiel's build log. You can close this page.</p><p><a href=\"https://zouantcha-site-staging.wiel.workers.dev/log\">Back to the build log</a></p>"
    : '<h1>Leave the build log</h1><p>Use the button to stop receiving Wiel\'s build log.</p><form method="post"><button name="List-Unsubscribe" value="One-Click">Unsubscribe</button></form>'
  return new Response(`<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>Unsubscribe · Wiel</title><body style="font:18px system-ui;max-width:36rem;margin:3rem auto;padding:1rem">${content}</body></html>`,{headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'"}})
}
export async function unsubscribeIssue(request: Request, env: IssueEnv) {
  const raw = new URL(request.url).searchParams.get('token') || ''
  if (!TOKEN_RE.test(raw)) return json(400,{error:'invalid_token'})
  const hash=await digest(raw)
  if (request.method==='GET') return unsubscribePage(false)
  if (request.method !== 'POST') return json(405,{error:'method_not_allowed'})
  if (!request.headers.get('content-type')?.includes('application/x-www-form-urlencoded') || Number(request.headers.get('content-length')||0)>128) return json(400,{error:'invalid_request'})
  const body=await request.text()
  if (body.length>128 || new URLSearchParams(body).get('List-Unsubscribe')!=='One-Click') return json(400,{error:'invalid_request'})
  // No cookies or CSRF challenge: the capability authorizes RFC 8058 POSTs.
  const changed=await env.DB.prepare('UPDATE build_log_issue_recipients SET consumed_at=?,operation_id=? WHERE token_digest=? AND consumed_at IS NULL').bind(new Date().toISOString(),crypto.randomUUID(),hash).run()
  if (!changed.meta.changes && !await env.DB.prepare('SELECT 1 FROM build_log_issue_recipients WHERE token_digest=?').bind(hash).first()) return json(400,{error:'invalid_token'})
  return request.headers.get('accept')?.includes('text/html') ? unsubscribePage(true) : json(200,{status:'unsubscribed'})
}

// Svix signs the exact raw bytes: id.timestamp.body, HMAC SHA-256, base64 secret.
// Compare all v1 signatures in constant time, with a five-minute replay window.
export async function verifyWebhook(request: Request, raw: string, secret: string, now=Date.now()) {
  const id=request.headers.get('svix-id'), ts=request.headers.get('svix-timestamp'), sig=request.headers.get('svix-signature')
  if (!id || id.length>200 || !ts || !/^\d+$/.test(ts) || Math.abs(now/1000-Number(ts))>300 || !sig || !secret.startsWith('whsec_')) return false
  try {
    const key=await crypto.subtle.importKey('raw',Uint8Array.from(atob(secret.slice(6)),c=>c.charCodeAt(0)),{name:'HMAC',hash:'SHA-256'},false,['verify'])
    const data=new TextEncoder().encode(`${id}.${ts}.${raw}`)
    for (const entry of sig.split(' ')) if(entry.startsWith('v1,') && await crypto.subtle.verify('HMAC',key,Uint8Array.from(atob(entry.slice(3)),c=>c.charCodeAt(0)),data)) return true
  } catch {}
  return false
}
export async function resendWebhook(request: Request, env: IssueEnv) {
  if (!env.RESEND_WEBHOOK_SECRET) return json(503,{error:'unavailable'})
  if (Number(request.headers.get('content-length')||0)>65536) return json(413,{error:'too_large'})
  const raw=await request.text()
  if(new TextEncoder().encode(raw).length>65536) return json(413,{error:'too_large'})
  if (!await verifyWebhook(request,raw,env.RESEND_WEBHOOK_SECRET)) return json(401,{error:'invalid_signature'})
  let payload: {type?:string;data?:{email_id?:string;from?:string}}
  try {payload=JSON.parse(raw)} catch {return json(400,{error:'invalid_json'})}
  if (!['email.delivered','email.bounced','email.complained'].includes(payload?.type||'')) return json(200,{ignored:true})
  const messageId=payload.data?.email_id
  if (typeof messageId !== 'string') return json(400,{error:'invalid_event'})
  // Unknown message IDs are retryable: a callback can precede the send response.
  if (!await env.DB.prepare('SELECT 1 FROM build_log_issue_recipients WHERE message_id=?').bind(messageId).first()) {
    if (typeof payload.data?.from === 'string' && !/(?:^|<)wiel@news\.zouantcha\.com>?$/.test(payload.data.from)) return json(200,{ignored:true})
    return json(503,{error:'message_not_reconciled'})
  }
  await env.DB.prepare('INSERT INTO build_log_provider_events VALUES(?,?,?,?) ON CONFLICT DO NOTHING').bind(request.headers.get('svix-id'),messageId,payload.type,new Date().toISOString()).run()
  return json(200,{ok:true})
}

import { BUILD_LOG_CONSENT, BUILD_LOG_CONSENT_VERSION } from '../../../app/lib/build-log-consent'
import { nativeSend, previewMode, renderConfirmation, type Mail, type MailEnv } from './email'

export interface LifecycleEnv extends MailEnv { DB: D1Database }
const DAY = 24 * 60 * 60 * 1000
export const TOKEN_RE = /^[a-f0-9]{64}$/
export async function digest(value: string) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))), b => b.toString(16).padStart(2, '0')).join('')
}
function token() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('')
}
export async function eligible(db: D1Database, membershipId: string): Promise<boolean> {
  return !!await db.prepare('SELECT 1 AS eligible FROM build_log_eligible WHERE membership_id=?').bind(membershipId).first()
}
export function suppressionStatements(db: D1Database, membershipId: string, now: string) {
  return [
    db.prepare("UPDATE build_log_memberships SET status='suppressed', suppressed_at=?, current_request_id=NULL WHERE id=?").bind(now, membershipId),
    db.prepare("UPDATE build_log_tokens SET revoked_at=? WHERE membership_id=? AND action='confirm' AND revoked_at IS NULL").bind(now, membershipId),
    db.prepare("INSERT INTO build_log_events(id,membership_id,event,created_at) VALUES(?,?,'suppressed',?)").bind(crypto.randomUUID(), membershipId, now),
  ]
}
// No automatic retry. The caller owns exactly one freshly inserted logical claim.
// A crash/timeout after this claim remains unknown and must be reconciled privately.
export async function finishConfirmation(env: LifecycleEnv, key: string, membershipId: string, requestId: string, to: string, mail: Mail) {
  const claimed = await env.DB.prepare("UPDATE build_log_outbox SET dispatch_id=? WHERE logical_key=? AND outcome='unknown' AND dispatch_id IS NULL").bind(crypto.randomUUID(), key).run()
  if (claimed.meta.changes !== 1) return 'unknown'
  const active = await env.DB.prepare(`SELECT 1 FROM build_log_memberships m WHERE id=? AND current_request_id=?
    AND status IN ('pending','unsubscribed') AND suppressed_at IS NULL
    AND EXISTS(SELECT 1 FROM build_log_tokens t WHERE t.request_id=? AND action='confirm' AND consumed_at IS NULL AND revoked_at IS NULL AND expires_at>?)`)
    .bind(membershipId, requestId, requestId, new Date().toISOString()).first()
  const result = !active ? { outcome: 'suppressed' as const, code: 'membership_ineligible' }
    : previewMode(env) ? { outcome: 'preview' as const } : await nativeSend(env, to, mail)
  const now = new Date().toISOString()
  await env.DB.batch([
    env.DB.prepare(`UPDATE build_log_outbox SET outcome=?,updated_at=?,preview_json=?,message_id=?,error_code=? WHERE logical_key=? AND outcome='unknown'`)
      .bind(result.outcome, now, result.outcome === 'preview' ? JSON.stringify(mail) : null, 'messageId' in result ? result.messageId : null, 'code' in result ? result.code : null, key),
    // Definite non-delivery releases this request after cooldown; unknown stays confirmable/held.
    ...(result.outcome === 'failed' || (result.outcome === 'suppressed' && 'code' in result && result.code === 'membership_ineligible')
      ? [env.DB.prepare("UPDATE build_log_tokens SET revoked_at=? WHERE request_id=? AND action='confirm' AND revoked_at IS NULL").bind(now, requestId)] : []),
    ...('code' in result && result.code === 'E_RECIPIENT_SUPPRESSED' ? suppressionStatements(env.DB, membershipId, now) : []),
  ])
  return result.outcome
}
export async function signup(env: LifecycleEnv, payload: Record<string, unknown>, email: string) {
  const now = new Date().toISOString()
  const expires = new Date(Date.now() + DAY).toISOString()
  const cooldown = new Date(Date.now() - 15 * 60 * 1000).toISOString()
  const requestId = crypto.randomUUID()
  const confirmToken = token(), unsubscribeToken = token()
  const [confirmHash, unsubscribeHash] = await Promise.all([digest(confirmToken), digest(unsubscribeToken)])
  const page = payload.page === '/log' ? '/log' : '/start'
  const source = page === '/log' ? 'log_page' : 'start_page'
  const attr = (key: string, max = 100) => typeof payload[key] === 'string' ? (payload[key] as string).slice(0, max) || null : null
  const db = env.DB
  // The claim predicate, request, tokens, outbox and audit are one transaction.
  // A working token is never rotated by duplicate requests, even after cooldown.
  const result = await db.batch([
    db.prepare(`INSERT INTO subscribers(id,email,created_at,source,referrer,utm_source,utm_medium,utm_campaign)
      VALUES(?,?,?,'start_page',?,?,?,?) ON CONFLICT(email) DO NOTHING`)
      .bind(crypto.randomUUID(), email, now, attr('referrer', 500), attr('utm_source'), attr('utm_medium'), attr('utm_campaign')),
    db.prepare(`INSERT INTO build_log_memberships(id,subscriber_id,list,status,created_at)
      SELECT ?,id,'build-log','pending',? FROM subscribers WHERE email=? ON CONFLICT(subscriber_id,list) DO NOTHING`)
      .bind(crypto.randomUUID(), now, email),
    db.prepare(`INSERT INTO build_log_requests(id,membership_id,consent_version,consent_copy,requested_at,page,source,referrer,src,utm_source,utm_medium,utm_campaign)
      SELECT ?,m.id,?,?,?,?,?,?,?,?,?,? FROM build_log_memberships m JOIN subscribers s ON s.id=m.subscriber_id
      WHERE s.email=? AND m.status IN ('pending','unsubscribed') AND m.suppressed_at IS NULL
      AND NOT EXISTS(SELECT 1 FROM build_log_requests r WHERE r.membership_id=m.id AND r.requested_at>?)
      AND NOT EXISTS(SELECT 1 FROM build_log_tokens t WHERE t.membership_id=m.id AND t.action='confirm' AND t.consumed_at IS NULL AND t.revoked_at IS NULL AND t.expires_at>?)
      AND NOT EXISTS(SELECT 1 FROM build_log_outbox o WHERE o.membership_id=m.id AND o.outcome='unknown')`)
      .bind(requestId, BUILD_LOG_CONSENT_VERSION, BUILD_LOG_CONSENT, now, page, source, attr('referrer', 500), attr('src'), attr('utm_source'), attr('utm_medium'), attr('utm_campaign'), email, cooldown, now),
    db.prepare(`UPDATE build_log_memberships SET current_request_id=? WHERE id=(SELECT membership_id FROM build_log_requests WHERE id=?)`).bind(requestId, requestId),
    db.prepare(`UPDATE build_log_tokens SET revoked_at=? WHERE action='unsubscribe' AND revoked_at IS NULL AND membership_id=(SELECT membership_id FROM build_log_requests WHERE id=?)`).bind(now, requestId),
    db.prepare(`INSERT INTO build_log_tokens(digest,membership_id,request_id,action,created_at,expires_at)
      SELECT ?,membership_id,id,'confirm',?,? FROM build_log_requests WHERE id=?`).bind(confirmHash, now, expires, requestId),
    db.prepare(`INSERT INTO build_log_tokens(digest,membership_id,request_id,action,created_at)
      SELECT ?,membership_id,id,'unsubscribe',? FROM build_log_requests WHERE id=?`).bind(unsubscribeHash, now, requestId),
    db.prepare(`INSERT INTO build_log_events(id,membership_id,request_id,event,created_at)
      SELECT ?,membership_id,id,'consent_requested',? FROM build_log_requests WHERE id=?`).bind(crypto.randomUUID(), now, requestId),
    db.prepare(`INSERT INTO build_log_outbox(logical_key,membership_id,request_id,kind,outcome,created_at,updated_at)
      SELECT id,membership_id,id,'confirmation','unknown',?,? FROM build_log_requests WHERE id=?`).bind(now, now, requestId),
  ])
  if (result[8].meta.changes === 1) {
    const row = await db.prepare('SELECT membership_id FROM build_log_requests WHERE id=?').bind(requestId).first<{ membership_id: string }>()
    // Public origin is fixed server configuration, never a submitted URL.
    const base = previewMode(env) ? 'https://zouantcha-site-staging.wiel.workers.dev' : env.BUILD_LOG_PUBLIC_URL!
    const mail = renderConfirmation(`${base}/log/confirm?token=${confirmToken}`, `${base}/log/unsubscribe?token=${unsubscribeToken}`,
      previewMode(env) ? 'DRAFT — public postal address pending approval' : env.EMAIL_PUBLIC_POSTAL_ADDRESS!)
    const outcome = await finishConfirmation(env, requestId, row!.membership_id, requestId, email, mail)
    if (outcome !== 'preview' && outcome !== 'provider-accepted' && outcome !== 'suppressed') return false
  }
  if (result[8].meta.changes !== 1) {
    const held = await db.prepare(`SELECT 1 FROM build_log_memberships m JOIN subscribers s ON s.id=m.subscriber_id
      JOIN build_log_outbox o ON o.request_id=m.current_request_id
      WHERE s.email=? AND m.status IN ('pending','unsubscribed') AND o.outcome IN ('unknown','failed')`).bind(email).first()
    if (held) return false
  }
  // Identical public response for unknown, confirmed, opted-out and suppressed.
  return true
}
export async function act(db: D1Database, action: 'confirm' | 'unsubscribe', raw: string): Promise<string> {
  if (!TOKEN_RE.test(raw)) return 'invalid'
  const hash = await digest(raw), now = new Date().toISOString()
  const operation = crypto.randomUUID()
  const changed = await db.prepare(`UPDATE build_log_tokens SET consumed_at=?,operation_id=?
    WHERE digest=? AND action=? AND consumed_at IS NULL AND revoked_at IS NULL
    AND (expires_at IS NULL OR expires_at>?)
    AND EXISTS(SELECT 1 FROM build_log_memberships m WHERE m.id=build_log_tokens.membership_id
      ${action === 'confirm' ? "AND m.current_request_id=build_log_tokens.request_id AND m.status IN ('pending','unsubscribed') AND m.suppressed_at IS NULL" : ''})`)
    .bind(now, operation, hash, action, now).run()
  if (changed.meta.changes > 0) return action === 'confirm' ? 'confirmed' : 'unsubscribed'
  const prior = await db.prepare('SELECT consumed_at,revoked_at,expires_at FROM build_log_tokens WHERE digest=? AND action=?').bind(hash, action).first<{ consumed_at: string | null; revoked_at: string | null; expires_at: string | null }>()
  if (!prior || prior.revoked_at) return 'invalid'
  if (prior.consumed_at) return action === 'unsubscribe' ? 'unsubscribed' : 'already_used'
  return prior.expires_at && prior.expires_at <= now ? 'expired' : 'invalid'
}

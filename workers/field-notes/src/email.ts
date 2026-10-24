import { PUBLIC_POSTAL_ADDRESS } from '../../../app/lib/public-contact'

export type Mail = { kind: 'confirmation' | 'draft'; subject: string; text: string; html: string }
export type NativeMessage = Omit<Mail, 'kind'> & { from: { email: string; name: string }; to: string; replyTo?: string; headers?: Record<string, string> }
export interface MailEnv {
  SITE_ENV: 'production' | 'staging'
  BUILD_LOG_MAIL_MODE?: 'disabled' | 'preview' | 'live'
  BUILD_LOG_PUBLIC_URL?: string
  EMAIL?: { send(message: NativeMessage): Promise<{ messageId: string }> }
  EMAIL_FROM?: string
  EMAIL_EXPECTED_FROM?: string
  EMAIL_REPLY_TO?: string
  EMAIL_PUBLIC_POSTAL_ADDRESS?: string
  EMAIL_SENDER_APPROVED?: string
  EMAIL_RECIPIENT_POLICY?: 'allowlist' | 'confirmed-public'
  EMAIL_ALLOWED_RECIPIENTS?: string
}
export function previewMode(env: MailEnv) {
  return env.SITE_ENV === 'staging' && env.BUILD_LOG_MAIL_MODE === 'preview'
}
export function liveReady(env: MailEnv) {
  const staging = env.SITE_ENV === 'staging'
  const origin = staging ? 'https://zouantcha-site-staging.wiel.workers.dev' : 'https://www.zouantcha.com'
  return ['production', 'staging'].includes(env.SITE_ENV) && env.BUILD_LOG_MAIL_MODE === 'live' && !!env.EMAIL
    && env.EMAIL_SENDER_APPROVED === 'yes' && !!env.EMAIL_FROM
    && env.EMAIL_FROM === env.EMAIL_EXPECTED_FROM
    && env.EMAIL_FROM === 'wiel@notify.zouantcha.com'
    && (!env.EMAIL_PUBLIC_POSTAL_ADDRESS || env.EMAIL_PUBLIC_POSTAL_ADDRESS.trim() === PUBLIC_POSTAL_ADDRESS)
    && ['allowlist','confirmed-public'].includes(env.EMAIL_RECIPIENT_POLICY || '')
    && (env.EMAIL_RECIPIENT_POLICY !== 'allowlist' || !!env.EMAIL_ALLOWED_RECIPIENTS?.trim())
    && (!staging || (env.EMAIL_RECIPIENT_POLICY === 'allowlist' && env.EMAIL_ALLOWED_RECIPIENTS?.trim().toLowerCase() === 'zouantchaw74@gmail.com'))
    && env.BUILD_LOG_PUBLIC_URL === origin
}
const escape = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))
function layout(kind: Mail['kind'], subject: string, paragraphs: string[], action: { label: string; url: string } | null, unsubscribe: string): Mail {
  const footer = PUBLIC_POSTAL_ADDRESS
  return {
    kind,
    subject,
    text: [subject, ...paragraphs, ...(action ? [`${action.label}: ${action.url}`] : []), `Unsubscribe: ${unsubscribe}`, footer].join('\n\n'),
    html: `<html><body style="background:#f7f5f0;color:#24231f;font-family:Arial,sans-serif;line-height:1.6"><main style="max-width:560px;margin:40px auto;padding:24px"><p>Wiel · Build log</p><h1 style="font-family:Georgia,serif;font-weight:400">${escape(subject)}</h1>${paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}${action ? `<p><a href="${escape(action.url)}">${escape(action.label)}</a></p>` : ''}<hr><p><a href="${escape(unsubscribe)}">Unsubscribe</a></p><p>${escape(footer)}</p></main></body></html>`,
  }
}
export function renderConfirmation(confirm: string, unsubscribe: string): Mail {
  return layout('confirmation', 'Confirm your build-log signup', ["You're receiving this email because you requested Wiel's weekly build log on zouantcha.com.", "Confirm that you want Wiel's weekly build log: what I built, what worked, what broke, and the numbers.", 'This confirmation link expires in 24 hours. Opening the link does not confirm your signup; use the button on the page.', 'If you did not request this, you can ignore this message.'], { label: 'Confirm my email', url: confirm }, unsubscribe)
}
// Private renderer only; no campaign route, schedule or bulk-send implementation.
export function renderBuildLogDraft(title: string, paragraphs: string[], unsubscribe: string): Mail {
  return layout('draft', `DRAFT — ${title}`, ["You're receiving this email because you confirmed your signup for Wiel's build log.", ...paragraphs], null, unsubscribe)
}
const rejected = new Set(['E_VALIDATION_ERROR','E_FIELD_MISSING','E_TOO_MANY_RECIPIENTS','E_TOO_MANY_ATTACHMENTS','E_SENDER_NOT_VERIFIED','E_RECIPIENT_NOT_ALLOWED','E_ACCOUNT_SUSPENDED','E_SENDER_DOMAIN_NOT_AVAILABLE','E_CONTENT_TOO_LARGE','E_RATE_LIMIT_EXCEEDED','E_DAILY_LIMIT_EXCEEDED','E_HEADER_NOT_ALLOWED','E_HEADER_USE_API_FIELD','E_HEADER_VALUE_INVALID','E_HEADER_VALUE_TOO_LONG','E_HEADER_NAME_INVALID','E_HEADERS_TOO_LARGE','E_HEADERS_TOO_MANY'])
export type Outcome = { outcome: 'provider-accepted' | 'failed' | 'suppressed' | 'unknown'; messageId?: string; code?: string }
export async function nativeSend(env: MailEnv, to: string, mail: Mail): Promise<Outcome> {
  // Issues and campaigns are hard-disabled, including private draft renderers.
  if (mail.kind !== 'confirmation') return { outcome: 'failed', code: 'message_kind_disabled' }
  if (!liveReady(env)) return { outcome: 'failed', code: 'transport_disabled' }
  if (env.EMAIL_RECIPIENT_POLICY === 'allowlist' && !env.EMAIL_ALLOWED_RECIPIENTS!.split(',').map(s => s.trim().toLowerCase()).includes(to.toLowerCase())) return { outcome: 'failed', code: 'recipient_denied' }
  try {
    const { kind: _, ...content } = mail
    const result = await env.EMAIL!.send({ from: { email: env.EMAIL_FROM!, name: 'Wiel' }, to, ...content, ...(env.EMAIL_REPLY_TO ? { replyTo: env.EMAIL_REPLY_TO } : {}) })
    return typeof result?.messageId === 'string' && result.messageId.length > 0
      ? { outcome: 'provider-accepted', messageId: result.messageId } : { outcome: 'unknown', code: 'acceptance_missing' }
  } catch (error) {
    const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : ''
    if (code === 'E_RECIPIENT_SUPPRESSED') return { outcome: 'suppressed', code }
    return rejected.has(code) ? { outcome: 'failed', code } : { outcome: 'unknown', code: 'outcome_unknown' }
  }
}

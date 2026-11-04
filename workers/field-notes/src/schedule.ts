import { digest } from './lifecycle'
import { sendTestIssue, validPayload, type IssueEnv } from './issues'
export interface ScheduleEnv extends IssueEnv { SCHEDULE_FORCE?: string }
export async function scheduleRoute(env: ScheduleEnv, method: string, cancel: boolean, input: Record<string, unknown>) {
  if (method === 'GET') {
    const rows = await env.DB.prepare('SELECT id,status,approved_at,scheduled_for_utc,sent_started_at,sent_finished_at,accepted,held,skipped FROM build_log_scheduled_issues ORDER BY approved_at,id').all()
    return Response.json({issues: rows.results})
  }
  if (cancel) {
    if (typeof input.id !== 'string') return Response.json({error:'invalid_issue'},{status:400})
    const result = await env.DB.prepare("UPDATE build_log_scheduled_issues SET status='cancelled' WHERE id=? AND status='approved'").bind(input.id).run()
    return Response.json({cancelled:result.meta.changes === 1},{status:result.meta.changes === 1 ? 200 : 409})
  }
  if (!validPayload(input)) return Response.json({error:'invalid_issue'},{status:400})
  const hash = await digest(JSON.stringify(['react-email-v1',input.title,input.paragraphs,input.issue]))
  await env.DB.prepare("INSERT INTO build_log_scheduled_issues(id,payload_json,content_digest,approved_at,status) VALUES(?,?,?,?,'approved') ON CONFLICT DO NOTHING").bind(input.id,JSON.stringify(input),hash,new Date().toISOString()).run()
  const row = await env.DB.prepare('SELECT content_digest,status FROM build_log_scheduled_issues WHERE id=?').bind(input.id).first<{content_digest:string;status:string}>()
  return Response.json({status:row?.status},{status:row?.content_digest === hash ? 200 : 409})
}
export async function runSchedule(env: ScheduleEnv, now: Date) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'2-digit',hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(p=>[p.type,p.value]))
  const forced = env.SITE_ENV === 'staging' && env.SCHEDULE_FORCE === '1'
  if ((!forced && (parts.weekday !== 'Sun' || parts.hour !== '12')) || !(env.SITE_ENV === 'staging' ? env.ISSUE_SEND_MODE === 'allowlist' : env.SITE_ENV === 'production' && env.ISSUE_SEND_MODE === 'confirmed-public')) return {skipped:1}
  const slot = `${parts.year}-${parts.month}-${parts.day}`
  let row = await env.DB.prepare("SELECT id,payload_json FROM build_log_scheduled_issues WHERE status='sending' ORDER BY approved_at,id LIMIT 1").first<{id:string;payload_json:string}>()
  if (!row) {
    const claim = await env.DB.prepare("UPDATE build_log_scheduled_issues SET status='sending',scheduled_for_utc=?,sent_started_at=? WHERE id=(SELECT id FROM build_log_scheduled_issues WHERE status='approved' ORDER BY approved_at,id LIMIT 1) AND NOT EXISTS(SELECT 1 FROM build_log_scheduled_issues WHERE scheduled_for_utc=?) RETURNING id,payload_json").bind(slot,now.toISOString(),slot).first<{id:string;payload_json:string}>()
    row = claim
  }
  if (!row) return {skipped:1}
  do {
    const response = await sendTestIssue(env,JSON.parse(row.payload_json),env.SITE_ENV === 'production',true)
    if (!response.ok) throw new Error('scheduled_send_unavailable')
    const result = await response.json() as {accepted:number;held:number;skipped:number;resume:boolean}
    // Derive totals from durable claims so a crash between transport and bookkeeping is resumable.
    await env.DB.prepare("UPDATE build_log_scheduled_issues SET accepted=(SELECT COUNT(*) FROM build_log_issue_recipients WHERE issue_id=? AND outcome='provider-accepted'),held=(SELECT COUNT(*) FROM build_log_issue_recipients WHERE issue_id=? AND outcome IN ('unknown','failed')),skipped=(SELECT COUNT(*) FROM build_log_issue_recipients WHERE issue_id=? AND outcome='suppressed') WHERE id=?").bind(row.id,row.id,row.id,row.id).run()
    if (!result.resume) break
  } while (true)
  await env.DB.prepare("UPDATE build_log_scheduled_issues SET status='sent',sent_finished_at=? WHERE id=?").bind(new Date().toISOString(),row.id).run()
  return {sent:1}
}

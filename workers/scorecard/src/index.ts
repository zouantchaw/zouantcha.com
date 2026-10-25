import { FIELD_NOTES, RADAR } from './queries'
export interface Env {
  SCORECARD: D1Database
  FIELD_NOTES: D1Database
  RADAR: D1Database
  FEED_TOKEN?: string
  COLLECTOR_SECRET?: string
  BUILD_LOG_COVERAGE_START: string
  RADAR_ENV: 'staging' | 'production'
}
type Values = Record<string,string|number|null>
const OWNER='zouantchaw74@gmail.com'
const TZ='America/Toronto'
function localParts(date: Date) {
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23',weekday:'short'}).formatToParts(date)
  return Object.fromEntries(parts.map(p=>[p.type,p.value]))
}
function noonUTC(date: string) {
  // Toronto noon always exists. Calculate its offset separately for each date.
  const guess=new Date(`${date}T12:00:00Z`)
  const hour=Number(localParts(guess).hour)
  return new Date(guess.getTime()+(12-hour)*3600000).toISOString()
}
export function reportWindow(now: Date) {
  const p=localParts(now), day=`${p.year}-${p.month}-${p.day}`
  let cursor=new Date(`${day}T12:00:00Z`)
  const shift=(cursor.getUTCDay()+2)%7
  cursor.setUTCDate(cursor.getUTCDate()-shift)
  let week=cursor.toISOString().slice(0,10)
  if(noonUTC(week)>now.toISOString()) {cursor.setUTCDate(cursor.getUTCDate()-7);week=cursor.toISOString().slice(0,10)}
  const cutoff=noonUTC(week)
  cursor.setUTCDate(cursor.getUTCDate()-7)
  return {week,cutoff,start:noonUTC(cursor.toISOString().slice(0,10))}
}
export const COLUMNS = ['week','cutoff_utc','window_start_utc','collected_at','build_log_signups','build_log_confirmed','build_log_unsubscribed','build_log_status','radar_status','digest_confirmed','trials_started','trials_converted','paying_accounts','mrr_cad_minor','gross_cash_cad_minor','refunds_cad_minor','net_cash_cad_minor','gst_qst_collected_cad_minor','gst_qst_review','radar_diagnostic_json','source_query_version']
export async function collect(env: Env, now=new Date()) {
  const w=reportWindow(now)
  // Never overwrite an existing weekly snapshot when the cron is duplicated.
  const existing=await env.SCORECARD.prepare('SELECT values_json FROM scorecard_weeks WHERE week=?').bind(w.week).first<{values_json:string}>()
  if(existing) return JSON.parse(existing.values_json) as Values
  const [field,radar]=await Promise.all([
    env.FIELD_NOTES.prepare(FIELD_NOTES).bind(OWNER,w.start,w.cutoff).first<Record<string,number>>(),
    env.RADAR.prepare(RADAR).bind(w.start,w.cutoff).first<Record<string,number>>(),
  ])
  if(!field||!radar) throw new Error('source_unavailable')
  const covered=!!env.BUILD_LOG_COVERAGE_START && w.start>=env.BUILD_LOG_COVERAGE_START
  const values: Values={week:w.week,cutoff_utc:w.cutoff,window_start_utc:w.start,collected_at:now.toISOString(),
    build_log_signups:covered?field.build_log_signups:null,build_log_confirmed:covered?field.build_log_confirmed:null,build_log_unsubscribed:covered?field.build_log_unsubscribed:null,
    build_log_status:covered?'verified':'unavailable: source coverage starts '+env.BUILD_LOG_COVERAGE_START,
    radar_status:env.RADAR_ENV==='staging'?'unavailable: staging fixtures excluded':'unavailable: live coverage and payment joins require launch review',
    digest_confirmed:null,trials_started:null,trials_converted:null,paying_accounts:null,mrr_cad_minor:null,gross_cash_cad_minor:null,refunds_cad_minor:null,net_cash_cad_minor:null,
    gst_qst_collected_cad_minor:null,gst_qst_review:'unavailable: no verified live revenue; review at CAD 20000 collected',
    // Clearly isolated fixture diagnostics; never mapped into Friday actuals.
    radar_diagnostic_json:JSON.stringify(radar),source_query_version:'v1',
  }
  await env.SCORECARD.prepare('INSERT INTO scorecard_weeks VALUES(?,?,?,?,?) ON CONFLICT DO NOTHING').bind(w.week,w.cutoff,w.start,now.toISOString(),JSON.stringify(values)).run()
  return JSON.parse((await env.SCORECARD.prepare('SELECT values_json FROM scorecard_weeks WHERE week=?').bind(w.week).first<{values_json:string}>())!.values_json) as Values
}
const headers={'Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow'}
async function same(a:string,b:string) {
  const hash=(s:string)=>crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))
  const [x,y]=await Promise.all([hash(a),hash(b)]);const l=new Uint8Array(x),r=new Uint8Array(y);let d=0;for(let i=0;i<l.length;i++)d|=l[i]^r[i];return d===0
}
const cell=(v:unknown)=>v===null||v===undefined?'':`"${String(v).replaceAll('"','""')}"`
export default {
  async scheduled(controller: ScheduledController,env: Env,ctx: ExecutionContext) {
    // Two UTC candidates handle DST; only Friday 08:00 Toronto can collect.
    const now=new Date(controller.scheduledTime),p=localParts(now)
    if(p.weekday==='Fri'&&p.hour==='08')ctx.waitUntil(collect(env,now))
  },
  async fetch(request: Request,env: Env) {
    const url=new URL(request.url)
    if(request.method==='GET'&&url.pathname.startsWith('/feed/')) {
      const supplied=url.pathname.slice(6).replace(/\.csv$/,'')
      if(!env.FEED_TOKEN||!await same(supplied,env.FEED_TOKEN))return new Response('Not found',{status:404,headers})
      const {results}=await env.SCORECARD.prepare('SELECT values_json FROM scorecard_weeks ORDER BY week DESC LIMIT 52').all<{values_json:string}>()
      const rows=results.map(r=>JSON.parse(r.values_json) as Values)
      return new Response([COLUMNS.join(','),...rows.map(r=>COLUMNS.map(c=>cell(r[c])).join(','))].join('\r\n')+'\r\n',{headers:{...headers,'Content-Type':'text/csv;charset=utf-8','Content-Disposition':'inline; filename="scorecard.csv"'}})
    }
    if(request.method==='POST'&&url.pathname==='/collect') {
      if(!env.COLLECTOR_SECRET||!await same(request.headers.get('authorization')||'',`Bearer ${env.COLLECTOR_SECRET}`))return new Response('Unauthorized',{status:401,headers})
      try{return Response.json(await collect(env),{headers})}catch{return Response.json({error:'source_unavailable'},{status:503,headers})}
    }
    return new Response('Not found',{status:404,headers})
  },
}

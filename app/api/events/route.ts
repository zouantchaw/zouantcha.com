import { getCloudflareContext } from '@opennextjs/cloudflare'
const events=new Set(['web_vital','page_view','resume_click','email_click','case_study_view','contact_role_click','contact_project_click','project_intro_click','case_study_click','connect_resume_click','linkedin_click','github_click','resume_download','case_study_pdf_download','resume_page_view','connect_visit','start_page_view','field_notes_signup_attempt','field_notes_signup_success'])
const keys=new Set(['metric','intent','placement','from','case_study','source_page','destination','src','format'])
export async function POST(request:Request) {
  const raw=await request.text()
  if(raw.length>2048)return new Response(null,{status:413})
  let value:{event?:unknown;path?:unknown;data?:Record<string,unknown>}
  try{value=JSON.parse(raw)}catch{return new Response(null,{status:400})}
  if(!value||!events.has(String(value.event))||typeof value.path!=='string'||!/^\/[a-zA-Z0-9/_-]*$/.test(value.path)||value.path.length>200)return new Response(null,{status:400})
  const data=Object.fromEntries(Object.entries(value.data||{}).filter(([key,v])=>keys.has(key)&&typeof v==='string'&&v.length<=100&&/^[a-zA-Z0-9/_ .:-]+$/.test(v)))
  const metricValue=value.event==='web_vital'?Number(value.data?.value):0
  if(value.event==='web_vital'&&(!['TTFB','FCP','LCP','FID','CLS','INP'].includes(String(value.data?.metric))||!Number.isFinite(metricValue)||metricValue<0||metricValue>600000))return new Response(null,{status:400})
  getCloudflareContext().env.ANALYTICS.writeDataPoint({blobs:[String(value.event),value.path,JSON.stringify(data)],doubles:[1,metricValue],indexes:['zouantcha-site']})
  return new Response(null,{status:204})
}

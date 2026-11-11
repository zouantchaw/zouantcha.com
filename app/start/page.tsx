import { redirect } from 'next/navigation'
import { pageMetadata } from 'app/lib/metadata'
import { Button } from 'app/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'app/components/ui/card'
import { StartPageView } from 'app/components/start-page-view'
import { pickAttribution, withAttribution } from 'app/lib/field-notes'
import { startCopy } from 'app/lib/start'
import { frameProof, frameSteps } from 'app/lib/frame-site'
export const metadata = pageMetadata({ title: 'Work with me', description: 'Software and AI that take work off your plate.', path:'/start' })
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
 const params=await searchParams; const status=new URLSearchParams(); for(const key of ['signup','error']) { const v=params[key];if(typeof v==='string' && ['preview','pending_confirmation','invalid','invalid_email','rate_limited','unavailable'].includes(v))status.set(key,v) } if(status.size)redirect(withAttribution(`/log?${status.toString()}#field-notes`,pickAttribution(params)))
 return <div className="frame-shell v2-page v2-start"><StartPageView /><header className="v2-start-hero"><div className="v2-start-copy"><p className="v2-label">WORK WITH ME · FOR BUSINESS OWNERS</p><h1>Software and AI that take work off your plate.</h1><p className="v2-lead">I build websites, booking and payment systems, and AI agents for small businesses, starting with my own family’s. You get a fixed price for each phase before any work starts.</p></div><Card className="v2-booking"><CardHeader><img className="v2-booking-avatar" src="/images/wiel-avatar.jpg" width="64" height="64" alt="Wiel Zouantcha" /><div><CardTitle>20 minutes with Wiel</CardTitle><CardDescription>Video call · pick any open time</CardDescription></div></CardHeader><CardContent><p>Tell me where your week goes. If software can take some of it, I’ll say what I’d build first and what it would cost.</p></CardContent><CardFooter><Button asChild><a href={startCopy.projectIntroHref}>Book a 20-minute call</a></Button></CardFooter></Card></header>
 <section className="v2-proof"><h2>What it did for businesses I know well</h2><div className="v2-proof-grid">{frameProof.map(p=><Card className="v2-proof-card" key={p.label}><CardHeader><p className="v2-label">{p.label}</p><CardTitle className={p.blue?'v2-blue':''}>{p.value}</CardTitle><CardDescription>{p.body}</CardDescription></CardHeader><CardFooter><a href={p.href}>{p.cta}</a></CardFooter></Card>)}</div></section>
 <section className="v2-split v2-how"><h2>How it works</h2><div className="v2-steps">{frameSteps.map(s=><div key={s.title}><p className="v2-label">{s.title}</p><p>{s.body}</p></div>)}</div></section><Card className="v2-final-call"><CardContent><h2>The first call costs nothing but 20 minutes.</h2><Button asChild><a href={startCopy.projectIntroHref}>Book a 20-minute call</a></Button></CardContent></Card></div>
}

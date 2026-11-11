import Link from 'next/link'
import { pageMetadata } from 'app/lib/metadata'
import { frameNumbers } from 'app/lib/frame-site'
import { Button } from 'app/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from 'app/components/ui/card'
import { HiringBlock, ExperienceRows, CaseRows } from 'app/components/frame-sections'

export const metadata = pageMetadata({ title: 'Wiel Zouantcha · Senior Full-Stack Engineer', description: 'Software from the data model to the screen. Production work, applied AI, and the evidence behind it.', path: '' })
export default function Page() {
 return <div className="frame-shell v2-page v2-home">
  <header className="v2-hero"><div className="v2-hero-copy"><p className="v2-label">SENIOR FULL-STACK ENGINEER · APPLIED AI &amp; AUTOMATION</p><h1>Hi, I’m Wiel. I build software from the data model to the screen.</h1><p className="v2-lead">More than five years of production work: storefronts and point-of-sale at Ethos, security integrations at SaaS Alerts, workforce software at Oloodi. Lately I build with AI, on products of my own and in my family’s businesses.</p><p className="v2-personal">Outside work I’m a father and a reader, and I spend more time than I should in archives of old Montréal photographs.</p><div className="v2-actions"><Button asChild><Link href="/case-studies">See the case studies</Link></Button><Button asChild variant="outline"><a href="/resume.pdf">Résumé (PDF)</a></Button></div></div><img className="v2-portrait" src="/images/wiel-head-shoulders.webp" alt="Wiel Zouantcha in black glasses and a white shirt" width="340" height="300" fetchPriority="high" /></header>
  <section className="v2-numbers" aria-labelledby="numbers-title"><h2 className="v2-label" id="numbers-title">A FEW NUMBERS I’M PROUD OF</h2><div className="v2-number-grid">{frameNumbers.map(n=><Card key={n.value} className="v2-number"><CardHeader><CardTitle className={n.blue?'v2-blue':''}>{n.value}</CardTitle><CardDescription>{n.body}</CardDescription></CardHeader><CardFooter><a href={n.href} className="v2-label">{n.source}</a></CardFooter></Card>)}</div></section>
  <section className="v2-split"><div className="v2-section-intro"><h2>Case studies</h2><p>The problem, what I changed, and what I can show for it.</p></div><CaseRows /></section>
  <section className="v2-split v2-work-section"><div className="v2-section-intro"><h2>Where I’ve worked</h2><Link href="/work">Full experience ↗</Link></div><ExperienceRows /></section><HiringBlock />
 </div>
}

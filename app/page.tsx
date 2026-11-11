import Link from 'next/link'
import { pageMetadata } from 'app/lib/metadata'
import { frameNumbers } from 'app/lib/frame-site'
import { Button } from 'app/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from 'app/components/ui/card'
import { HiringBlock, ExperienceRows, CaseRows } from 'app/components/frame-sections'

export const metadata = pageMetadata({ title: 'Wiel Zouantcha · Senior Full-Stack Engineer', description: 'Software engineer, building with AI. Sharing what I make and learn.', path: '' })
export default function Page() {
 return <div className="frame-shell v2-page v2-home">
  <header className="v2-hero"><div className="v2-hero-copy"><p className="v2-label">SENIOR FULL-STACK ENGINEER · APPLIED AI &amp; AUTOMATION</p><h1>Hi, I’m Wiel. I’m a software engineer, building with AI.</h1><p className="v2-lead">More than five years of production work, at Ethos, SaaS Alerts and Oloodi. Now I work on my own products and my family’s businesses.</p><p className="v2-personal">I’m a father, I read a lot, and I spend too much time in old photos of Montréal.</p><div className="v2-actions"><Button asChild><Link href="/case-studies">See the case studies</Link></Button><Button asChild variant="outline"><a href="/resume.pdf">Résumé (PDF)</a></Button></div></div><img className="v2-portrait" src="/images/wiel-head-shoulders.webp" alt="Wiel Zouantcha in black glasses and a white shirt" width="340" height="300" fetchPriority="high" /></header>
  <section className="v2-numbers" aria-labelledby="numbers-title"><h2 className="v2-label" id="numbers-title">A FEW NUMBERS</h2><div className="v2-number-grid">{frameNumbers.map(n=><Card key={n.value} className="v2-number"><CardHeader><CardTitle className={n.blue?'v2-blue':''}>{n.value}</CardTitle><CardDescription><span className="v2-number-desktop-copy">{n.body}</span><span className="v2-number-mobile-copy">{n.mobileBody}</span></CardDescription></CardHeader><CardFooter><a href={n.href} className="v2-label">{n.source}</a></CardFooter></Card>)}</div></section>
  <section className="v2-split"><div className="v2-section-intro"><h2>Case studies</h2></div><CaseRows /></section>
  <section className="v2-split v2-work-section"><div className="v2-section-intro"><h2>Where I’ve worked</h2><Link href="/work">Full experience ↗</Link></div><ExperienceRows /></section><HiringBlock />
 </div>
}

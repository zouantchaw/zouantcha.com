import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'
import { frameCases, caseDescriptions, frameExperience } from 'app/lib/frame-site'
import { startCopy } from 'app/lib/start'

export function HiringBlock() {
  return <Card className="v2-hiring"><CardContent><div><h2>Hiring, or building something?</h2><p>A 20-minute call is the fastest way to find out if I can help.</p></div><div className="v2-actions"><Button asChild variant="outline"><a href="/resume.pdf">Résumé (PDF)</a></Button><Button asChild><a href={startCopy.projectIntroHref}>Book a call</a></Button></div></CardContent></Card>
}
export function ExperienceRows() {
  return <div className="v2-experience">{frameExperience.map(role => <div key={role.company}><Separator /><div className="v2-experience-row"><h3>{role.company}</h3><p>{role.title}</p><span>{role.dates}</span></div></div>)}</div>
}
export function CaseRows({ skipFeatures = false }: { skipFeatures?: boolean }) {
  return <div className="v2-case-rows">{(skipFeatures ? frameCases.slice(2) : frameCases).map(item => <div key={item.slug}><Separator /><Link href={'/case-studies/' + item.slug} className="v2-case-row"><h3>{item.slug === 'ballerz' ? 'Ballerz' : item.title}</h3><p>{caseDescriptions[item.slug]}</p><span>Read ↗</span></Link></div>)}<Separator /></div>
}

import Link from 'next/link'
import { pageMetadata } from 'app/lib/metadata'
import { Card,CardHeader,CardTitle,CardDescription,CardContent } from 'app/components/ui/card'
import { CaseRows,HiringBlock } from 'app/components/frame-sections'
export const metadata=pageMetadata({title:'Case studies',description:'Four projects: what the problem was, what I built, what happened.',path:'/case-studies'})
const features=[
  {
    "slug": "mtl-archives",
    "label": "MY OWN PRODUCT · 2025–PRESENT · RESEARCHER, DESIGNER & ENGINEER",
    "title": "MTL Archives",
    "mobileLabel": "MY OWN PRODUCT · 2025–PRESENT",
    "mobileBody": "Montréal’s photo archive, made searchable.",
    "body": "Montréal’s photo archive, made searchable. 2.66 million views on social, far fewer on the website.",
    "value": "2.66M",
    "source": "SOCIAL VIEWS · JAN–JUL 2026"
  },
  {
    "slug": "portmind",
    "label": "MY OWN RESEARCH · 2026–PRESENT · RESEARCHER & ENGINEER",
    "mobileLabel": "MY OWN RESEARCH · 2026–PRESENT",
    "title": "PortMind",
    "body": "How few hand-labelled photos does a small model need to spot trucks at a port?",
    "mobileBody": "How few hand-labelled photos does a small model need to spot trucks at a port?",
    "value": "181,383",
    "source": "PHOTOS FROM SIX CAMERAS · OCT 30, 2026"
  },
  {
    "slug": "ballerz",
    "label": "MY BROTHER’S SOCCER ACADEMY · WEBSITE AND BOOKING",
    "title": "Ballerz",
    "mobileLabel": "MY BROTHER’S SOCCER ACADEMY",
    "mobileBody": "I did my brother’s soccer academy website and the booking behind it.",
    "body": "My brother runs a soccer training business. I did his website and the booking behind it.",
    "value": "#1",
    "source": "GOOGLE · GAITHERSBURG SOCCER TRAINING · NOV 2026"
  }
]
export default function Page(){return <div className="frame-shell v2-page v2-cases"><header className="v2-heading"><p className="v2-label">CASE STUDIES</p><h1>Four projects, with the numbers.</h1><p>The problem, what I built, what happened, and what’s still open.</p></header><section className="v2-feature-list" aria-label="Selected case studies">{features.map(f=><Card className="v2-feature" key={f.slug}><CardHeader><p className="v2-label"><span className="v2-feature-desktop-copy">{f.label}</span><span className="v2-feature-mobile-copy">{f.mobileLabel}</span></p><CardTitle><Link href={'/case-studies/'+f.slug}>{f.title}</Link></CardTitle><CardDescription><span className="v2-feature-desktop-copy">{f.body}</span><span className="v2-feature-mobile-copy">{f.mobileBody}</span></CardDescription></CardHeader><CardContent><strong>{f.value}</strong><p className="v2-label">{f.source}</p><Link href={'/case-studies/'+f.slug}>Read the case study ↗</Link></CardContent></Card>)}<p className="v2-label">ALSO</p><CaseRows skipFeatures /></section><HiringBlock /></div>}

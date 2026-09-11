import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'
const sans = readFile(path.join(process.cwd(), 'app/og/fonts/IBMPlexSans-Regular.ttf'))
const serif = readFile(path.join(process.cwd(), 'app/og/fonts/InstrumentSerif-Regular.ttf'))

// Bound public query parameters so unusually long shared URLs cannot overflow the card.
function excerpt(value: string, limit: number) {
  return value.length > limit ? `${value.slice(0, limit - 1).trimEnd()}…` : value
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const title = excerpt(params.get('title') || 'Wiel Zouantcha', 150)
  const summary = excerpt(params.get('summary') || 'Software Engineer | Product, Data & AI', 205)
  const tag = excerpt(params.get('tag') || 'Personal index', 48)
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '48px 60px', background: '#ffffff', color: '#181818', fontFamily: 'IBM Plex Sans' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 27, borderBottom: '1px solid #d9dbe4' }}>
        <span style={{ fontSize: 25, fontWeight: 700 }}>wiel zouantcha</span>
        <span style={{ fontSize: 23, color: '#2948ff' }}>zouantcha.com</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
        <div style={{ display: 'flex', color: '#2948ff', fontSize: 17, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 22 }}>{tag}</div>
        <div style={{ display: 'flex', fontFamily: 'Instrument Serif', fontSize: title.length > 95 ? 58 : title.length > 55 ? 72 : 88, lineHeight: 1.02, letterSpacing: '-1.5px' }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 25, lineHeight: 1.4, color: '#545454', marginTop: 25, maxWidth: 1000 }}>{summary}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 22, borderTop: '1px solid #d9dbe4', color: '#626262', fontSize: 17 }}>
        <span>Product, data & applied AI</span>
        <span style={{ color: '#2948ff' }}>Work / research / notes</span>
      </div>
    </div>,
    {
      width: 1200, height: 630,
      fonts: [{ name: 'IBM Plex Sans', data: await sans, weight: 400, style: 'normal' }, { name: 'Instrument Serif', data: await serif, weight: 400, style: 'normal' }],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' },
    },
  )
}

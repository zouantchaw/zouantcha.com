import { NextRequest, NextResponse } from 'next/server'

// Fixed read-only upstream. No credentials or arbitrary URLs cross this boundary.
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? ''
  if (query.length < 2 || query.length > 160) {
    return NextResponse.json({ error: 'Enter between 2 and 160 characters.' }, { status: 400 })
  }
  const params = new URLSearchParams({ q: query, mode: 'smart', limit: '6' })
  try {
    const response = await fetch(`https://www.mtlarchives.com/api/search?${params}`, {
      signal: AbortSignal.timeout(15000), next: { revalidate: 300 },
    })
    if (!response.ok) throw new Error('Search unavailable')
    const data = await response.json()
    if (!Array.isArray(data.items)) throw new Error('Invalid search response')
    return NextResponse.json({ items: data.items.slice(0, 6).map((item: Record<string, unknown>) => ({
      id: item.metadataFilename, title: item.name || 'Archive photograph',
      src: item.imageUrl, date: item.dateValue, credits: item.credits,
    })) }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } })
  } catch {
    return NextResponse.json({ error: 'The archive is taking longer than usual. Please try again.' }, { status: 503 })
  }
}

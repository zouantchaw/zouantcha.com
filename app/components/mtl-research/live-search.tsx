'use client'
import { useEffect, useRef, useState } from 'react'
import initial from './live-initial.json'
import { ArchiveImage } from './archive-image'

type Result = { id: string; title: string; src: string; date: string; credits: string; source?: string }
const suggestions = ['tramway', 'red', 'trees', 'water', 'park', 'snowy street', 'Marché Bonsecours', 'pont Jacques-Cartier', 'Biosphère', 'Mont Royal', 'children playing']

export function MtlLiveSearch() {
  const [query, setQuery] = useState('tramway')
  const [committed, setCommitted] = useState('tramway')
  const [items, setItems] = useState<Result[]>(initial)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const controller = useRef<AbortController | null>(null)
  const suggestionRow = useRef<HTMLDivElement>(null)
  const cache = useRef(new Map<string, Result[]>())
  useEffect(() => () => controller.current?.abort(), [])
  async function search(value: string) {
    const q = value.trim()
    if (q.length < 2 || q.length > 160) return
    controller.current?.abort()
    const current = new AbortController()
    controller.current = current
    setQuery(q); setError('')
    const cached = cache.current.get(q.toLowerCase())
    if (cached) { setItems(cached); setCommitted(q); setStatus('success'); return }
    setStatus('loading')
    try {
      const response = await fetch(`/api/mtl-search?${new URLSearchParams({ q })}`, { signal: current.signal })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      if (current.signal.aborted) return
      cache.current.set(q.toLowerCase(), data.items)
      setItems(data.items); setCommitted(q); setStatus('success')
    } catch (e) {
      if (current.signal.aborted) return
      setError(e instanceof Error ? e.message : 'Search is unavailable. Please try again.'); setStatus('error')
    }
  }
  return <figure className="mtl-example mtl-live">
    <div className="mtl-example-title">Search the archive</div>
    <form onSubmit={e => { e.preventDefault(); void search(query) }} className="mtl-search-form">
      <label className="sr-only" htmlFor="mtl-live-query">Search Montréal’s archive</label>
      <input id="mtl-live-query" value={query} onChange={e => setQuery(e.target.value)} minLength={2} maxLength={160} required placeholder="A place, a street, a memory…" />
      <button type="submit" disabled={status === 'loading' || query.trim().length < 2}>{status === 'loading' ? 'Searching…' : 'Search'}</button>
    </form>
    <div className="mtl-suggestion-heading"><span>Try a colour, a scene or a Montréal landmark</span><div><button type="button" aria-label="Previous search suggestions" onClick={() => suggestionRow.current?.scrollBy({ left: -240 })}>←</button><button type="button" aria-label="More search suggestions" onClick={() => suggestionRow.current?.scrollBy({ left: 240 })}>→</button></div></div>
    <div ref={suggestionRow} className="mtl-controls mtl-suggestion-row" aria-label="Suggested searches">{suggestions.map(q => <button key={q} type="button" aria-pressed={committed === q && status !== 'idle'} onClick={e => { e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' }); void search(q) }}>{q}</button>)}</div>
    <p role="status" className="mtl-search-status">{status === 'loading' ? 'Searching the live collection. Previous results remain below.' : status === 'error' ? error : `${items.length} results for “${committed}”${status === 'idle' ? ' · saved starting selection' : ''}`}</p>
    <div className="mtl-live-results" aria-busy={status === 'loading'}>{items.map(item => <a href={`https://www.mtlarchives.com/photo/${encodeURIComponent(item.id)}`} key={item.id} target="_blank" rel="noreferrer">
      <ArchiveImage src={item.src} source={item.source} width={480} height={360} alt={item.title} />
      <span>{item.title}</span><small>{item.date || 'Date not recorded'}</small>
    </a>)}</div>
    {status === 'success' && !items.length && <p>No photographs found. Try a street name, a landmark or a broader description.</p>}
    <figcaption>The same smart search used by MTL Archives, combining text and visual retrieval. Landmark names can match catalogue descriptions; colours and scenes invite broader visual associations. Open a photograph for its full record. Images: Archives de la Ville de Montréal. <a href={`https://www.mtlarchives.com/?q=${encodeURIComponent(committed)}`} target="_blank" rel="noreferrer">Continue on MTL Archives ↗</a></figcaption>
  </figure>
}

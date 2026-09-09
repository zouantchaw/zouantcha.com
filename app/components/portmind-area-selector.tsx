'use client'

import { useRef, useState, type PointerEvent } from 'react'

type Point = { x: number; y: number }
export type ImageArea = Point & { width: number; height: number }
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const rectangle = (a: Point, b: Point): ImageArea => ({ x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), width: Math.abs(a.x - b.x), height: Math.abs(a.y - b.y) })

export function PortmindAreaSelector({ onSelect, onCancel }: { onSelect: (area: ImageArea) => void; onCancel: () => void }) {
  const start = useRef<Point | null>(null)
  const [box, setBox] = useState<ImageArea | null>(null)
  const point = (e: PointerEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    return { x: clamp((e.clientX - bounds.left) / bounds.width), y: clamp((e.clientY - bounds.top) / bounds.height) }
  }
  return <div className="pm-area-selector" role="group" tabIndex={0} aria-label="Draw an inspection area. Drag to select. With keyboard: arrow keys move, Shift and arrows resize, Enter applies, Escape cancels."
    onPointerDown={e => { if (e.button !== 0 || !e.isPrimary) return; e.preventDefault(); e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); start.current = point(e); setBox(null) }}
    onPointerMove={e => { if (start.current) setBox(rectangle(start.current, point(e))) }}
    onPointerUp={e => {
      if (!start.current) return
      const next = rectangle(start.current, point(e)); start.current = null
      const bounds = e.currentTarget.getBoundingClientRect()
      if (next.width * bounds.width >= 8 && next.height * bounds.height >= 8) onSelect(next)
      else setBox(null)
    }}
    onPointerCancel={() => { start.current = null; setBox(null) }}
    onLostPointerCapture={() => { start.current = null }}
    onKeyDown={e => {
      if (e.key === 'Escape') { e.preventDefault(); onCancel(); return }
      if (e.key === 'Enter') { e.preventDefault(); onSelect(box ?? { x: .25, y: .25, width: .5, height: .5 }); return }
      if (!e.key.startsWith('Arrow')) return
      e.preventDefault()
      const next = { ...(box ?? { x: .25, y: .25, width: .5, height: .5 }) }
      const dx = e.key === 'ArrowRight' ? .025 : e.key === 'ArrowLeft' ? -.025 : 0
      const dy = e.key === 'ArrowDown' ? .025 : e.key === 'ArrowUp' ? -.025 : 0
      if (e.shiftKey) { next.width = clamp(next.width + dx, .05, 1 - next.x); next.height = clamp(next.height + dy, .05, 1 - next.y) }
      else { next.x = clamp(next.x + dx, 0, 1 - next.width); next.y = clamp(next.y + dy, 0, 1 - next.height) }
      setBox(next)
    }}>
    {box && <div className="pm-area-outline" style={{ left: `${box.x * 100}%`, top: `${box.y * 100}%`, width: `${box.width * 100}%`, height: `${box.height * 100}%` }} />}
  </div>
}

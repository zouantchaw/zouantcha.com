'use client'
import { useEffect, useRef, useState } from 'react'
import points from './explorer-shape.json'

export function MtlExplorerShape() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null)
  const [depth, setDepth] = useState(true)
  const [yaw, setYaw] = useState(-20)
  const [pitch, setPitch] = useState(32)
  const [zoom, setZoom] = useState(1)
  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const draw = () => {
      const width = el.clientWidth, height = el.clientHeight, ratio = Math.min(devicePixelRatio || 1, 2)
      el.width = width * ratio; el.height = height * ratio
      const ctx = el.getContext('2d')
      if (!ctx) return
      ctx.scale(ratio, ratio); ctx.clearRect(0, 0, width, height)
      const a = (depth ? yaw : 0) * Math.PI / 180, b = (depth ? pitch : 0) * Math.PI / 180
      const scale = Math.min(width * .86, height * .8) * zoom
      for (const [px, py, pz] of points) {
        const x = px - .5, y = py - .5, z = depth ? pz - .075 : 0
        const xx = x * Math.cos(a) + z * Math.sin(a)
        const zz = -x * Math.sin(a) + z * Math.cos(a)
        const yy = y * Math.cos(b) - zz * Math.sin(b)
        ctx.fillStyle = `rgba(112,96,61,${depth ? .32 + (pz / .2) * .3 : .42})`
        ctx.fillRect(width / 2 + xx * scale, height / 2 + yy * scale, 1.3, 1.3)
      }
    }
    const observer = new ResizeObserver(draw); observer.observe(el); draw()
    return () => observer.disconnect()
  }, [depth, yaw, pitch, zoom])
  return <figure className="mtl-example">
    <div className="mtl-example-title">The shape of 14,715 photographs</div>
    <div className="mtl-controls"><button type="button" aria-pressed={!depth} onClick={() => setDepth(false)}>Flat projection</button><button type="button" aria-pressed={depth} onClick={() => setDepth(true)}>Date depth</button><button type="button" onClick={() => { setYaw(-20); setPitch(32); setZoom(1); setDepth(true) }}>Reset view</button></div>
    <canvas className="mtl-shape-canvas" ref={canvas} role="img" aria-label="All 14,715 saved image positions. A broad irregular cloud with separated islands and dense groups. Drag to rotate in date-depth mode, or use the controls below."
      onPointerDown={e => { if (!depth) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, yaw, pitch } }}
      onPointerMove={e => { const d = drag.current; if (!d) return; setYaw(Math.max(-180, Math.min(180, d.yaw + (e.clientX - d.x) * .5))); setPitch(Math.max(-80, Math.min(80, d.pitch + (e.clientY - d.y) * .5))) }}
      onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} onLostPointerCapture={() => { drag.current = null }} />
    <div className="mtl-shape-controls"><label>Turn<input type="range" min="-180" max="180" value={yaw} disabled={!depth} onChange={e => setYaw(Number(e.target.value))} /></label><label>Tilt<input type="range" min="-80" max="80" value={pitch} disabled={!depth} onChange={e => setPitch(Number(e.target.value))} /></label><label>Zoom<input type="range" min="0.7" max="1.8" step="0.05" value={zoom} onChange={e => setZoom(Number(e.target.value))} /></label></div>
    <figcaption>Drag to rotate, or use the controls. The flat view preserves the saved UMAP layout. Date depth uses the explorer’s recorded-date mapping and seeded spacing, not a third UMAP dimension. Islands and dense patches gave me groups to inspect, not automatic historical categories. <a href="https://explorer.mtlarchives.com/" target="_blank" rel="noreferrer">Open the full explorer to inspect individual photographs ↗</a></figcaption>
  </figure>
}

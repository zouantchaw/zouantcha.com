'use client'
import { useEffect, useRef, useState } from 'react'
import points from './explorer-shape.json'

// Same eight reference centres and nearest-centre assignment as the research explorer.
const regions = [
  { x: .6764, y: .8544, name: 'Aerial NW', color: '#c34c53', note: 'One of the aerial groups annotated in the explorer. Compare its separation from the document regions.' },
  { x: .3579, y: .1077, name: 'Street photos', color: '#be681e', note: 'The explorer annotates this island as street photography. The label is a guide for inspecting its images.' },
  { x: .5067, y: .7283, name: 'Aerial central', color: '#9c791a', note: 'Another aerial region. Several aerial groups occupy the projection rather than forming one uniform cluster.' },
  { x: .2901, y: .4721, name: 'Oblique views', color: '#16869b', note: 'The region annotated for angled aerial views. Viewpoint and document presentation can both influence visual grouping.' },
  { x: .8663, y: .0635, name: 'Index cards', color: '#228469', note: 'This compact island is annotated as index cards. Record format can be a strong visual signal even when the underlying subject varies.' },
  { x: .6728, y: .5422, name: 'Aerial south', color: '#8053b6', note: 'An aerial group closer to the centre of the projection. The directional name belongs to the explorer’s annotation, not a verified city boundary.' },
  { x: .7862, y: .2036, name: 'Survey documents', color: '#647080', note: 'Annotated survey documents sit apart from other aerial groups. Headers, borders and index numbers were a reason to investigate this separation.' },
  { x: .8995, y: .4931, name: 'Aerial east', color: '#427fc1', note: 'A further aerial region. Its distance on this reduced map is an inspection cue, not a calibrated measure of difference.' },
]
const assigned = points.map(([x, y, z]) => {
  let region = 0, distance = Infinity
  regions.forEach((r, i) => { const d = (x-r.x)**2 + (y-r.y)**2; if (d < distance) { distance = d; region = i } })
  return { x, y, z, region }
})
const counts = regions.map((_, i) => assigned.filter(p => p.region === i).length)

export function MtlExplorerShape() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null)
  const [activeRegion, setActiveRegion] = useState<number | null>(null)
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
      for (const { x: px, y: py, z: pz, region } of assigned) {
        const x = px - .5, y = py - .5, z = depth ? pz - .075 : 0
        const xx = x * Math.cos(a) + z * Math.sin(a)
        const zz = -x * Math.sin(a) + z * Math.cos(a)
        const yy = y * Math.cos(b) - zz * Math.sin(b)
        ctx.globalAlpha = activeRegion !== null && activeRegion !== region ? .07 : .72
        ctx.fillStyle = regions[region].color
        ctx.fillRect(width / 2 + xx * scale, height / 2 + yy * scale, 1.3, 1.3)
      }
    }
    const observer = new ResizeObserver(draw); observer.observe(el); draw()
    return () => observer.disconnect()
  }, [depth, yaw, pitch, zoom, activeRegion])
  return <figure className="mtl-example">
    <div className="mtl-example-title">The shape of 14,715 photographs</div>
    <div className="mtl-controls"><button type="button" aria-pressed={!depth} onClick={() => setDepth(false)}>Flat projection</button><button type="button" aria-pressed={depth} onClick={() => setDepth(true)}>Date depth</button><button type="button" onClick={() => { setYaw(-20); setPitch(32); setZoom(1); setDepth(true); setActiveRegion(null) }}>Reset view</button></div>
    <canvas className="mtl-shape-canvas" ref={canvas} role="img" aria-label="All 14,715 saved image positions. Eight colour-coded annotated regions form separated islands and dense groups. Select a named region using the legend below. Drag to rotate in date-depth mode, or use the controls below."
      onPointerDown={e => { if (!depth) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, yaw, pitch } }}
      onPointerMove={e => { const d = drag.current; if (!d) return; setYaw(Math.max(-180, Math.min(180, d.yaw + (e.clientX - d.x) * .5))); setPitch(Math.max(-80, Math.min(80, d.pitch + (e.clientY - d.y) * .5))) }}
      onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} onLostPointerCapture={() => { drag.current = null }} />
    <div className="mtl-region-legend" aria-label="Highlighted map region"><button type="button" aria-pressed={activeRegion === null} onClick={() => setActiveRegion(null)}>All regions</button>{regions.map((region, i) => <button type="button" key={region.name} aria-pressed={activeRegion === i} onClick={() => setActiveRegion(activeRegion === i ? null : i)}><span aria-hidden="true" style={{ background: region.color }} />{region.name}</button>)}</div>
    <p className="mtl-region-note" aria-live="polite">{activeRegion === null ? 'Select a region to highlight it. These colours follow the explorer’s eight annotated regions; they stay attached to the same photographs as you rotate the view.' : `${regions[activeRegion].note} ${counts[activeRegion].toLocaleString('en-US')} points are assigned to this region in this view.`}</p>
    <div className="mtl-shape-controls"><label>Turn<input type="range" min="-180" max="180" value={yaw} disabled={!depth} onChange={e => setYaw(Number(e.target.value))} /></label><label>Tilt<input type="range" min="-80" max="80" value={pitch} disabled={!depth} onChange={e => setPitch(Number(e.target.value))} /></label><label>Zoom<input type="range" min="0.7" max="1.8" step="0.05" value={zoom} onChange={e => setZoom(Number(e.target.value))} /></label></div>
    <figcaption>Drag to rotate, or use the controls. The flat view preserves the saved UMAP layout. Date depth uses the explorer’s recorded-date mapping and seeded spacing, not a third UMAP dimension. Colour assignment follows the nearest of eight saved reference centres in the flat projection. The names are research annotations, not labels produced by UMAP or verified categories for every photograph. Directional names do not mark areas of Montréal. <a href="https://explorer.mtlarchives.com/" target="_blank" rel="noreferrer">Open the full explorer to inspect individual photographs ↗</a></figcaption>
  </figure>
}

'use client'

import { useRef, useState } from 'react'

// Published July 28 guided-inspection snapshot; task repeats are retained.
const models = [
  { name: 'Grok 4.5', logo: 'grok', agreement: 17, found: 2, alarms: 0 },
  { name: 'Mistral Small 3.1', logo: 'mistral-color', agreement: 15, found: 0, alarms: 0 },
  { name: 'Llama 4 Scout', logo: 'meta-color', agreement: 15, found: 0, alarms: 0 },
  { name: 'Llama 3.2 Vision', logo: 'meta-color', agreement: 8, found: 8, alarms: 14 },
  { name: 'LLaVA 1.5', logo: 'llava', agreement: 7, found: 7, alarms: 15 },
]
const metrics = {
  agreement: { name: 'Agreement', total: 23, note: 'Answers matching the reference across 23 scored tasks. A high score can still hide missed trucks.' },
  found: { name: 'Positives found', total: 8, note: 'Of eight positive tasks, how many were found? Higher is better, but check the false alarms too.' },
  alarms: { name: 'False alarms', total: 15, note: 'Of fifteen negative tasks, how many were marked positive? Lower is better.' },
}

export function PortmindResults() {
  const [metric, setMetric] = useState<keyof typeof metrics>('agreement')
  return <figure className="pm-example" aria-label="Explore guided inspection results">
    <div className="pm-example-title">One study, three ways to read it</div>
    <div className="pm-example-controls" aria-label="Result metric">
      {Object.entries(metrics).map(([key, value]) => <button key={key} type="button" aria-pressed={metric === key} onClick={() => setMetric(key as keyof typeof metrics)}>{value.name}</button>)}
    </div>
    <p className="pm-example-note" aria-live="polite">{metrics[metric].note}</p>
    <div className="pm-result-list">
      {models.map(model => <div key={model.name} className="pm-result-row">
        <span className="pm-model-name"><img src={`/images/case-studies/portmind-paper/brand/${model.logo}.svg`} alt="" width="20" height="20" />{model.name}</span><strong>{model[metric]} / {metrics[metric].total}</strong>
        <div className="pm-result-track" aria-hidden="true"><div style={{ width: `${model[metric] / metrics[metric].total * 100}%` }} /></div>
      </div>)}
    </div>
    <figcaption>July 28 guided inspection · 23 tasks, 19 unique decidable images, one human reference. Repeats remain in the counts. These are the published task outcomes, not a general model ranking.</figcaption>
  </figure>
}

const areas = Array.from({ length: 9 }, (_, index) => ({
  id: `${'ABC'[Math.floor(index / 3)]}${index % 3 + 1}`,
  x: (index % 3 + 0.5) / 3,
  y: (Math.floor(index / 3) + 0.5) / 3,
}))

export function PortmindInspection() {
  const areaControl = useRef<HTMLButtonElement>(null)
  const [zoom, setZoom] = useState(1)
  const [area, setArea] = useState<number | null>(null)
  const [choosing, setChoosing] = useState(true)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [original, setOriginal] = useState(false)
  const fullImage = () => { setArea(null); setZoom(1); setChoosing(false) }
  const reset = () => { fullImage(); setBrightness(100); setContrast(100); setOriginal(false) }
  const scale = choosing ? 1 : zoom
  const center = area === null ? { x: .5, y: .5 } : areas[area]
  const offset = (position: number) => Math.min(0, Math.max(1 - scale, .5 - position * scale)) * 100
  const select = (index: number) => { setArea(index); setZoom(3); setChoosing(false); areaControl.current?.focus({ preventScroll: true }) }
  return <figure className="pm-example pm-inspection" aria-label="Try the image inspection controls">
    <div className="pm-example-title">Look closer before deciding</div>
    <div className="pm-inspection-context">
      <span aria-live="polite">{choosing ? 'Select an area to inspect' : area === null ? 'Full image' : `Area ${areas[area].id}`}</span>
      <button ref={areaControl} type="button" onClick={() => setChoosing(!choosing)}>{choosing ? 'Hide grid' : 'Choose area'}</button>
      <button type="button" onClick={fullImage}>Full image</button>
    </div>
    <div className="pm-inspection-canvas">
      <img src="/images/case-studies/portmind-paper/montreal-viterra.jpg" alt="Viterra port camera: the small truck left of center is towing an empty chassis" style={{ transformOrigin: '0 0', transform: `translate(${offset(center.x)}%, ${offset(center.y)}%) scale(${scale})`, filter: original ? 'none' : `brightness(${brightness}%) contrast(${contrast}%)` }} />
      {choosing && <div className="pm-inspection-grid" aria-label="Image areas, rows A to C from top to bottom">
        {areas.map((item, index) => <button key={item.id} type="button" aria-label={`Inspect area ${item.id}, row ${Math.floor(index / 3) + 1}, column ${index % 3 + 1}`} onClick={() => select(index)}><span>{item.id}</span></button>)}
      </div>}
    </div>
    <div className="pm-example-controls">
      <button type="button" disabled={zoom === 1 || choosing} onClick={() => setZoom(Math.max(1, zoom - 1))} aria-label="Zoom out">−</button>
      <output aria-label="Inspection zoom">{scale * 100}%</output>
      <button type="button" disabled={zoom === 6 || choosing} onClick={() => setZoom(Math.min(6, zoom + 1))} aria-label="Zoom in">+</button>
      <button type="button" aria-pressed={original} onClick={() => setOriginal(!original)}>Show original</button>
      <button type="button" onClick={reset}>Reset view</button>
    </div>
    <div className="pm-inspection-sliders">
      <label>Brightness <output>{brightness}%</output><input type="range" aria-label="Brightness" min="50" max="180" value={brightness} disabled={original} onChange={e => setBrightness(Number(e.target.value))} /></label>
      <label>Contrast <output>{contrast}%</output><input type="range" aria-label="Contrast" min="50" max="180" value={contrast} disabled={original} onChange={e => setContrast(Number(e.target.value))} /></label>
    </div>
    <figcaption>Select one of nine areas, then adjust the view. Show original removes brightness and contrast adjustments while keeping your position. The labeling question still applies to the whole image.</figcaption>
  </figure>
}

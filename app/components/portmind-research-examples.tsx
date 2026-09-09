'use client'

import { useState } from 'react'

// Published July 28 guided-inspection snapshot; task repeats are retained.
const models = [
  { name: 'Grok 4.5', agreement: 17, found: 2, alarms: 0 },
  { name: 'Mistral Small 3.1', agreement: 15, found: 0, alarms: 0 },
  { name: 'Llama 4 Scout', agreement: 15, found: 0, alarms: 0 },
  { name: 'Llama 3.2 Vision', agreement: 8, found: 8, alarms: 14 },
  { name: 'LLaVA 1.5', agreement: 7, found: 7, alarms: 15 },
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
        <span>{model.name}</span><strong>{model[metric]} / {metrics[metric].total}</strong>
        <div className="pm-result-track" aria-hidden="true"><div style={{ width: `${model[metric] / metrics[metric].total * 100}%` }} /></div>
      </div>)}
    </div>
    <figcaption>July 28 guided inspection · 23 tasks, 19 unique decidable images, one human reference. Repeats remain in the counts. These are the published task outcomes, not a general model ranking.</figcaption>
  </figure>
}

export function PortmindInspection() {
  const [zoom, setZoom] = useState(1)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [original, setOriginal] = useState(false)
  const reset = () => { setZoom(1); setBrightness(100); setContrast(100); setOriginal(false) }
  return <figure className="pm-example pm-inspection" aria-label="Try the image inspection controls">
    <div className="pm-example-title">Look closer before deciding</div>
    <div className="pm-inspection-canvas">
      <img src="/images/case-studies/portmind-paper/montreal-viterra.jpg" alt="Viterra port camera: the small truck left of center is towing an empty chassis" style={{ transform: `scale(${original ? 1 : zoom})`, filter: original ? 'none' : `brightness(${brightness}%) contrast(${contrast}%)` }} />
    </div>
    <div className="pm-example-controls">
      <button type="button" disabled={zoom === 1 || original} onClick={() => setZoom(Math.max(1, zoom - 1))} aria-label="Zoom out">−</button>
      <output aria-label="Inspection zoom">{original ? 100 : zoom * 100}%</output>
      <button type="button" disabled={zoom === 4 || original} onClick={() => setZoom(Math.min(4, zoom + 1))} aria-label="Zoom toward the truck">+</button>
      <button type="button" aria-pressed={original} onClick={() => setOriginal(!original)}>Show original</button>
      <button type="button" onClick={reset}>Reset view</button>
    </div>
    <div className="pm-inspection-sliders">
      <label>Brightness <output>{brightness}%</output><input type="range" aria-label="Brightness" min="50" max="180" value={brightness} disabled={original} onChange={e => setBrightness(Number(e.target.value))} /></label>
      <label>Contrast <output>{contrast}%</output><input type="range" aria-label="Contrast" min="50" max="180" value={contrast} disabled={original} onChange={e => setContrast(Number(e.target.value))} /></label>
    </div>
    <figcaption>Try the controls on the example image. Zoom is centered on the truck; the full reviewer app also supports panning. Adjustments change the view, not the source image.</figcaption>
  </figure>
}

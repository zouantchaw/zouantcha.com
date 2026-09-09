'use client'
import { useState } from 'react'
import data from './embedding-sample.json'
import { thumbnail } from './media'

export function MtlTechnology() {
  const [selected, setSelected] = useState(0)
  const [stage, setStage] = useState<'clip' | 'umap'>('clip')
  const [motion, setMotion] = useState(false)
  const item = data.selected[selected]
  return <figure className={`mtl-example mtl-tech ${motion ? 'mtl-tech-motion' : ''}`} onPointerDown={() => setMotion(true)} onKeyDown={() => setMotion(false)}>
    <div className="mtl-example-title">One image, two different jobs</div>
    <div className="mtl-controls" aria-label="Image to examine">{data.selected.map((s, i) => <button type="button" key={s.id} aria-pressed={selected === i} onClick={() => setSelected(i)}>{s.label}</button>)}</div>
    <div className="mtl-tech-layout">
      <div className="mtl-tech-source"><img src={thumbnail(item.src, 480, 360)} alt={item.label} loading="lazy" /><small>Original archive image</small></div>
      <div className="mtl-tech-output">
        <div className="mtl-controls" aria-label="Technology output"><button type="button" aria-pressed={stage === 'clip'} onClick={() => setStage('clip')}>1. CLIP vector</button><button type="button" aria-pressed={stage === 'umap'} onClick={() => setStage('umap')}>2. UMAP position</button></div>
        {stage === 'clip' ? <svg viewBox="0 0 340 200" role="img" aria-label="First 64 signed values of this image’s saved 512-dimensional CLIP vector"><line x1="10" x2="330" y1="100" y2="100" stroke="#d3d0c5" />{item.values.map((v, i) => <rect key={i} x={10 + i * 5} y={v >= 0 ? 100 - Math.min(v * 900, 85) : 100} width="3" height={Math.min(Math.abs(v) * 900, 85)} fill={v >= 0 ? '#716548' : '#aaa18e'} />)}<text x="10" y="190" fontSize="10" fill="#777">Dimensions 1–64 of 512 · signed values</text></svg> : <svg viewBox="0 0 340 200" role="img" aria-label="Saved UMAP projection, with this image’s location highlighted">{data.points.map(([x,y],i) => <circle key={i} cx={15+x*310} cy={10+y*175} r="1.1" fill="#afa797" opacity=".55" />)}<circle className="mtl-map-point" cx={15+item.x*310} cy={10+item.y*175} r="7" fill="none" stroke="#42391f" strokeWidth="2" /><circle className="mtl-map-point" cx={15+item.x*310} cy={10+item.y*175} r="2" fill="#42391f" /></svg>}
      </div>
    </div>
    <div className="mtl-tech-explanation" aria-live="polite">{stage === 'clip' ? <p><strong>CLIP turns the image into 512 numbers.</strong> These values describe learned visual features. Search compares vectors for similarity; it does not treat any single bar as a named concept like “street” or “building”. The chart shows the first 64 actual values, using a fixed scale across images.</p> : <p><strong>UMAP gives those vectors a place on a map.</strong> The ring marks this image’s saved two-dimensional position. The background samples {data.total.toLocaleString('en-US')} projected records. Nearby points are clues to inspect, not proof that photographs share a subject, date or location. This is not a geographic map.</p>}</div>
    <figcaption>Actual saved outputs from the research explorer. Changing the image reveals its recorded vector or position; no model runs in your browser. UMAP summarizes a collection of vectors, rather than transforming one photograph in isolation.</figcaption>
  </figure>
}

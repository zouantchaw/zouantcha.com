'use client'

import { useState } from 'react'
import analytics from './analytics.json'
import { MtlArchivesLogo } from './logo'

import { thumbnail } from './media'
export { MtlLiveSearch } from './live-search'

const formats = [
  { label: 'Aerial photograph', file: '1667', text: 'An aerial photograph without the municipal document border. The January analysis placed many of these images together.', alt: 'Black-and-white aerial photograph from the Montréal collection' },
  { label: 'Survey document', file: '12901', text: 'Another aerial view, presented as a municipal document. Headers, borders and index numbers become part of what the image model sees.', alt: 'Aerial survey document with municipal header and border' },
  { label: 'Index card', file: '8227', text: 'An index card is useful archival evidence, but it may be a poor answer to someone looking for a photograph of a street.', alt: 'Archival index card from the Montréal collection' },
]
export function MtlArchiveExample() {
  const [active, setActive] = useState(0)
  const item = formats[active]
  return <figure className="mtl-example">
    <div className="mtl-controls" aria-label="Archive document type">{formats.map((f, i) => <button type="button" key={f.file} aria-pressed={active === i} onClick={() => setActive(i)}>{f.label}</button>)}</div>
    <img className="mtl-archive-image" src={thumbnail(`https://pub-6a29793ea7664738880d1cc5afb21b87.r2.dev/mtl_archives_image_${item.file}.jpg`, 1000, 700)} alt={item.alt} loading="lazy" />
    <figcaption aria-live="polite">{item.text} <a href={`https://www.mtlarchives.com/photo/mtl_archives_metadata_${item.file}.json`} target="_blank" rel="noreferrer">Open archive record ↗</a></figcaption>
  </figure>
}

const pipeline = [
  { name: 'Collect', title: 'Start with the city’s records.', text: 'Download the photographic archive and aerial survey catalogues in batches. Keep source identifiers and file references so each image can be traced back to its record.', output: 'Source records → downloaded files' },
  { name: 'Reconcile', title: 'Make one usable inventory.', text: 'Normalize text, match records to image files and identify duplicates. The manifest is the inventory connecting those parts. Missing titles and uncertain locations remain visible.', output: 'Records + files → linked manifest' },
  { name: 'Enrich', title: 'Add evidence without replacing the source.', text: 'Optical character recognition reads text printed on images. Vision models generate descriptions and structured categories. These belong in separate fields: a generated caption is not the city’s description.', output: 'Original metadata + extracted text + model suggestions' },
  { name: 'Index', title: 'Prepare the expensive work offline.', text: 'Create numerical representations of text and images for similarity search. Load the records into D1, image files into R2 and searchable vectors into Vectorize. Checkpoints let interrupted batches resume.', output: 'Database + image storage + search indexes' },
  { name: 'Serve', title: 'One collection, several ways in.', text: 'The Worker answers search requests and serves photo records. The website adds browsing, a location game and prints. The editorial pipeline makes social packages from the same archive identifiers.', output: 'Search · game · prints · editorial packages' },
]
export function MtlPipeline() {
  const [active, setActive] = useState(0)
  return <figure className="mtl-example">
    <div className="mtl-example-title">From an archive export to a public product</div>
    <div className="mtl-controls">{pipeline.map((p, i) => <button type="button" key={p.name} aria-pressed={i === active} onClick={() => setActive(i)}>{i + 1}. {p.name}</button>)}</div>
    <div className="mtl-pipeline-detail" aria-live="polite"><h3>{pipeline[active].title}</h3><p>{pipeline[active].text}</p><div className="mtl-output">{pipeline[active].output}</div></div>
    <figcaption>The preparation jobs run separately from the public website. A visitor’s search does not recaption the collection.</figcaption>
  </figure>
}

const measures = { facebook: 'Facebook views', instagram: 'Instagram views', visitors: 'Website visitors', pages: 'Website page views' }
export function MtlAudience() {
  const [metric, setMetric] = useState<keyof typeof measures>('facebook')
  const [month, setMonth] = useState(1)
  const max = Math.max(...analytics.map(r => r[metric]))
  const selected = analytics[month]
  return <figure className="mtl-example">
    <div className="mtl-example-title">The spike, and what came after</div>
    <div className="mtl-controls">{Object.entries(measures).map(([key, label]) => <button type="button" key={key} aria-pressed={metric === key} onClick={() => setMetric(key as keyof typeof measures)}>{label}</button>)}</div>
    <div className="mtl-months">{analytics.map((r, i) => <button type="button" key={r.month} aria-pressed={i === month} aria-label={`${['January','February','March','April','May','June','July'][i]}: ${r[metric].toLocaleString('en-US')} ${measures[metric]}`} onClick={() => setMonth(i)}><span>{['Jan','Feb','Mar','Apr','May','Jun','Jul'][i]}</span><span className="mtl-month-track"><span style={{width:`${r[metric] / max * 100}%`}} /></span><strong>{r[metric].toLocaleString('en-US')}</strong></button>)}</div>
    <p className="mtl-audience-detail" aria-live="polite">{['January','February','March','April','May','June','July'][month]}: {selected.facebook.toLocaleString('en-US')} Facebook views, {selected.instagram.toLocaleString('en-US')} Instagram views and {selected.pages.toLocaleString('en-US')} website page views from {selected.visitors.toLocaleString('en-US')} reported visitors.</p>
    <figcaption>January–July 2026 saved reports. Each measure has its own scale. March/April use saved monthly summaries; May has partial social coverage. Website January covers January 1–30; later months include dashboard captures. These are separate measures, not an attributed conversion funnel.</figcaption>
  </figure>
}

export function MtlBrand() {
  const [size, setSize] = useState(48)
  return <figure className="mtl-example mtl-brand">
    <div className="mtl-brand-preview"><MtlArchivesLogo size={size} /><span>mtl archives</span></div>
    <div className="mtl-controls" aria-label="Logo preview size">{[24,48,80].map(s => <button key={s} type="button" aria-pressed={s === size} onClick={() => setSize(s)}>{s}px</button>)}</div>
    <figcaption>The product’s dotted rosette, rendered as a vector. The Paper exploration tested dense, medium, minimal and monochrome versions; this is the compact mark used by the site.</figcaption>
  </figure>
}

export { MtlTechnology } from './technology'

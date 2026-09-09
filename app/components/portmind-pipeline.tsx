'use client'

import { useState } from 'react'

const stages = [
  { label: 'Capture', system: 'Port Observatory · Cloudflare Worker', title: 'Collect a frame, then check whether it changed.', detail: 'A three-minute cron rotates through pairs of Montréal cameras. The Worker hashes the fetched image, skips repeat inference for unchanged frames, and records each camera’s outcome. Timeouts and cached fallbacks have their own status.', output: 'Camera identity · capture time · image hash · collection status' },
  { label: 'Store', system: 'Cloudflare R2 + D1', title: 'Keep the image and its history connected.', detail: 'R2 holds image objects. D1 holds activity snapshots, image references and collection logs. DETR detections and LLaVA classifications are machine observations. Vessel events and schedules provide a parallel operational record; they are not the answer key for the visual benchmark.', output: 'Image bytes in R2 ↔ metadata and observations in D1' },
  { label: 'Sample', system: 'Python factory + versioned selections', title: 'An archive is larger than an evaluation set.', detail: 'The research tooling builds manifests and split artifacts with recorded identities and hashes. The September draft selects 96 images across six cameras from June–August, allowing one uncached capture per camera and UTC date before seeded balancing. This is a specific sampling design, not a traffic-weighted sample.', output: 'Selected images · provenance · sampling rules · version' },
  { label: 'Review', system: 'Reviewer app + frozen reference', title: 'Establish the answers before testing a model.', detail: 'Independent reviewers label truck presence and container attachment without seeing model answers. An organizer resolves disagreements. Freezing records the resolved labels, rubric and image digests. The current draft still needs independent review before this gate can close.', output: 'Reviewed answers + matching images → immutable reference' },
  { label: 'Evaluate', system: 'Eve + Cloudflare Workflows', title: 'Approve a plan, then preserve what happened.', detail: 'Eve can prepare a plan and monitor its outcome. An owner approves the reference, models, prompt and limits. A Cloudflare Workflow verifies images, executes bounded attempts and scores responses. Failed calls and unsure answers remain visible. Publishing the aggregate report is a separate owner action.', output: 'Approved plan → attempts → deterministic scores → published snapshot' },
]

export function PortmindPipeline() {
  const [active, setActive] = useState(0)
  const stage = stages[active]
  return (
    <figure className="pm-pipeline" aria-label="PortMind collection and evaluation pipeline">
      <div className="pm-pipeline-heading">From a camera image to a result</div>
      <p className="pm-pipeline-hint">Select a step to see the work behind it.</p>
      <ol className="pm-pipeline-steps">
        {stages.map((item, index) => (
          <li key={item.label}>
            <button type="button" aria-pressed={active === index} aria-controls="pm-pipeline-detail" onClick={() => setActive(index)}>
              <span className="pm-pipeline-number">0{index + 1}</span>
              <span>{item.label}</span>
            </button>
            {index < stages.length - 1 && <span className="pm-pipeline-arrow" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
      <div id="pm-pipeline-detail" className="pm-pipeline-detail" aria-live="polite" aria-atomic="true">
        <div className="pm-pipeline-system">{stage.system}</div>
        <h3>{stage.title}</h3>
        <p>{stage.detail}</p>
        <div className="pm-pipeline-output">{stage.output}</div>
      </div>
      <figcaption>Collection continues independently. A benchmark uses a selected, reviewed version of the record.</figcaption>
    </figure>
  )
}

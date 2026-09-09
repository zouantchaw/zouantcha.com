# PortMind case-study evidence notes

Prepared 9 September 2026. These notes accompany the portfolio case study and
summarize repository evidence; they are not a new experiment or benchmark run.

## Origin

The founding inspiration is the Montreal Port Authority article
[Data visibility: a new technological tool for information sharing](https://www.port-montreal.com/en/the-port-of-montreal/news/news/visibility-data).
It describes a port community system for secure, real-time operational data
sharing and logistics coordination. This is a Montreal Port Authority initiative,
not a City of Montréal program. The author identifies it as the inspiration for
independent Port Observatory MTL collection work, from which PortMind grew.

The article was saved in the personal PKM clippings and is also referenced by
the PKM Lab Port Community System Reference note. Its live source was checked
on 9 September 2026. The clipping creation date is not a project start date.

## Collection

Source: Port Observatory MTL `cloudflare/src/worker.ts`, revision `f8c4402`,
and `cloudflare/wrangler.toml`.

The three-minute camera schedule rotates pairs from six Montréal cameras.
Image hashing avoids repeat inference; cached/fallback snapshots have status
metadata. R2 stores image objects, D1 stores snapshots and collection records.
DETR detection and optional LLaVA classification are machine observations,
not independent reference labels. The collector also has separate schedules
for other work; the diagram focuses on the Montréal visual pipeline.

Inventory: PortMind `docs/overview/project-audit-2026-07-09.md`.
Coverage: 28 January–9 July 2026. Activity snapshots: 81,202. D1 image rows:
76,353. R2 objects: 199,214. R2 storage: 36.7 GB. Counts represent different
asset types; neither snapshot count nor object count is a unique-image count.
These are historical inventory values, not live counters.

## Historical locked-v1 diagnostic

Source: `outputs/model-comparison-report-v1/issue-101-container-truck-locked-v1-final/model-comparison-report.md`, generated 9 July 2026 at 21:15 UTC.

| Model | Validation macro F1 | Test macro F1 |
| --- | ---: | ---: |
| Frozen SigLIP nearest centroid | 0.8493 | 0.6468 |
| Linear softmax head | 0.8584 | 0.6434 |
| Threshold-calibrated head | 0.8584 | 0.6434 |

Target: container_truck_present. 1,744 labeled rows: 1,175 train, 219 validation,
350 test. This split used row-level distribution matching, not chronological
blocks. The audit records agent-derived labels, 84 same-camera near-time warnings
and repeated held-out readouts. These are historical diagnostics, not a trusted
final test or a demonstrated production model. The gap does not isolate causality.

The same audit records 120 deliberately difficult train/validation human reviews,
72 disagreements with Codex, and a blind repeat review of those disagreements
that reproduced 31 clear human-positive/Codex-negative container-truck decisions.
This selected sample cannot estimate archive-wide error prevalence.

## Guided inspection, 28 July 2026

Sources: issue-164 checkout,
`outputs/tool-labeler/issue-159-scorecard-20260728/scorecard-report.md`, and the
current public publication snapshot `apps/web/src/data/studies.json`.

20 unique images plus four repeat tasks. One undecidable task excluded from
binary scoring: 23 task rows, 19 unique decidable images, eight positive and
15 negative task rows, one human reference. Repeats are not independent evidence.

| Model | Container agreement | Positive tasks found | False alarms |
| --- | ---: | ---: | ---: |
| Grok 4.5 | 17/23 (73.9%) | 2/8 | 0/15 |
| Mistral Small 3.1 | 15/23 (65.2%) | 0/8 | 0/15 |
| Llama 4 Scout | 15/23 (65.2%) | 0/8 | 0/15 |
| Llama 3.2 Vision | 8/23 (34.8%) | 8/8 | 14/15 |
| LLaVA 1.5 | 7/23 (30.4%) | 7/8 | 15/15 |

Moondream returned no usable answers. Agreement counts follow the published
snapshot and should not be treated as a complete coverage or abstention metric.
The wrapper selected fixed_grid_3x3 then inspect_full_frame; every model had
zero autonomous tool calls in this guided run. It does not establish that
model-controlled tool use improves image classification.

The separate tool-use publication records GPT-5.5 strict autonomous inspection
completing 14/24 tasks. Other models used guided workflows. These are not matched
arms for a causal claim about tools. The older image-labeling pilot lacks verified
original response traces and stays separate from both studies.

## Current product and reference preparation

Sources: PortMind revision `2daccbf`, `docs/platform-operations.md`,
`docs/platform-v1-rebuild.md`, `docs/benchmarks/native-tool-calling-harness-v1.md`.

The September draft contains 96 verified JPEGs across six cameras, sampled from
1 June inclusive through 1 September exclusive. It permits one uncached capture
per camera/UTC date before seeded camera balancing. Seed:
`portmind-montreal-v1.0.0`. This is an initial packet, not a statistical-power
claim or a traffic-weighted sample. Independent review and reference freezing
remain required before new research results.

Vercel hosts the Next.js interfaces and Eve orchestration. Cloudflare owns
operational authorization, D1/R2 records and durable benchmark execution.
Coordinator tools prepare and inspect work; owners approve spending, freeze
references and publish. Private evidence stays separate from public aggregates.
Operational fixture runs validate execution, not research performance.

## Design sources

Earlier identity exploration:
https://app.paper.design/file/01KZ21MQVTCM4HDNMGT59WXDF2/1-0

Current product designs:
https://app.paper.design/file/01M21HJTEBTKBM045N97B3RP9B/1-0

Public site and methodology:
https://www.portmind.dev/
https://www.portmind.dev/method

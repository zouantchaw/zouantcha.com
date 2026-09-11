# MTL Archives case-study evidence

Prepared 9 September 2026. This is a synthesis of saved reports and source code,
not a new model experiment, live analytics pull or production deployment.

## Origin and chronology

The city photographic archive and aerial photothèque are the source collections:
- https://donnees.montreal.ca/ville-de-montreal/phototheque-archives
- https://donnees.montreal.ca/dataset/phototheque

The repository begins 19 October 2025 (`451b8d1`). Text search followed
(`b7206c5`); CLIP image embeddings were added 8 December (`b09cfc7`).
May reports record structured captioning, cleanup and embedding comparisons.
Commit dates establish recorded implementation dates, not a precise date of
personal inspiration. The case study does not invent an earlier founding event.

Repository: https://github.com/zouantchaw/mtl-archives-search

## Collection and pipeline

Read: `AGENTS.md`, `README.md`, `FORWIEL.md`, `docs/architecture.md`,
`docs/data-quality-audit.md`, `packages/scripts/src/etl/fetch-open-data.ts`,
`apps/api/src/worker.ts`, `apps/next-app/components/LandingHero.tsx`.

The early audit describes synthetic descriptions produced by the cleaning
pipeline, not rich descriptions written by the city. Its categories do not sum
exactly to its stated total, so the article uses the approximate 97% finding
rather than presenting the category table as reconciled census data.

June 27 saved production audit: 13,499 serving records; 14,822 development
records. R2 objects and vector indexes cover a larger research/pre-deduplication
corpus and should not be treated as a count of distinct serving photographs.
The public headline uses 13,000+.

The runtime serves metadata and images and supports different search modes.
Preparation is separate: ingestion, linkage, optical character recognition,
captioning and embedding. Source text and generated evidence remain separate.
Batch ingest includes retry, checkpoint and failure artifacts.

## Caption runs

December 17–18, 2025:
`docs/metrics/vlm-captioning/README.md`: LLaVA 1.5 7B, NVIDIA A100 40GB,
12,304 captioned images, 23 errors, 10.86 hours and $14. This is a partial run.

May 25, 2026:
`data/mtl_archives/reports/autoresearch_vlm_full/completion_report.md`:
14,822 output rows; 14,706 captioned; 14,627 structured-valid;
79 structured-invalid; 116 image/model errors. The first 12,100 records were
recovered from chunks and the last 2,722 resumed. The 24.47 GPU-hour figure is
an estimate based partly on recovered timestamps. Structural validity is not
independent verification of historical correctness.

## Visual research and model comparison

January projection: 14,715 valid image embeddings. UMAP projection distances
are not distances in the original embedding space and do not isolate the causal
features of the model. The article uses the qualitative formatting observation,
not the older projection ratios as a general retrieval guarantee.

May 26 comparison:
`data/mtl_archives/reports/autoresearch_embedding_eval_gpu_500/embedding_eval_report.json`
and `gpu_500_completion_report.md`; implementation:
`pipelines/vectorize/evaluate_embeddings.py`.

500 fetched images, 13 queries, NVIDIA A10.
Models: `openai/clip-vit-base-patch32`, `google/siglip-base-patch16-224`.
CLIP mean reciprocal rank: 0.8269; SigLIP: 0.4484.
CLIP top-five query hit rate: 13/13; SigLIP: 8/13.

Important naming correction: the function `precision_at` takes first-hit ranks
and computes the fraction of queries with a hit within k. The stored
`query_p_at_5` is therefore hit rate, not conventional precision at five.
Expected hits are category/theme rules over generated taxonomy. They are not
independent human relevance judgments. The selected sample is imbalanced,
including 174 general aerials and one ground-transit image.

The inline search replay contains three queries and their first three recorded
results from each model. Image addresses come from the matching sample manifest.
It does not execute new inference or claim to reproduce the current production
ranking. Original record titles are retained; filename-only titles display as
"Untitled archive record". Category-rule matches are explicitly labeled.

Cleanup: `data/mtl_archives/reports/autoresearch_cleanup_embedding/completion_report.md`.
12 selected flagged images, 12 completed, two predicted category changes.
The completed run used deterministic border/tone cleanup, not the unavailable
segmentation-model path. Decision: targeted review, no blanket cleanup.

Ranking policy: `docs/autoresearch.md`, issue #27 section. The broad generated
category/quality policy underperformed the recorded baseline; the documented
recommendation keeps these signals score-neutral until stronger labels exist.
This article does not assert the whole archive has a measured human search score.

## Design

Paper file: https://app.paper.design/file/01KJT1EB3Z2N2FYHB3VDDBF496/01KJT1EB3ZN11EN8P6G678B9DZ

Inspected board inventory, Logo System (3M-0), Logo Exploration (M0-0),
Typography (2K-0), Color Palette (3-0), and their descriptive text. Boards cover
mobile/desktop search, records, game states, commerce, errors, social templates
and newsletter states. The interactive logo is the actual compact vector from
`apps/next-app/components/LandingHero.tsx`.

Archive image examples 1667, 12901 and 8227 are the public collection images
used in the January research article. They are not generated illustrations.
Record links preserve the metadata identifiers. Source images are served from
the project's public R2 image host through its thumbnail endpoint; the portfolio
does not modify those files.

## Distribution and website results

Saved PKM Lab analysis:
`analytics/MTL Archives - January-July 2026 Cross-Platform Content Performance.md`;
`analytics/supporting/2026-01-to-07/monthly_scorecard.csv`;
`data-quality-and-validation.md`;
`analytics/MTL Archives - Analytics May-August 2026.md`.

| Period | Facebook views | Instagram views | Website visitors | Website page views |
| --- | ---: | ---: | ---: | ---: |
| January | 451,473 | 73,244 | 188 | 1,346 |
| February | 1,363,500 | 48,996 | 875 | 4,747 |
| March | 412,258 | 68,263 | 714 | 5,296 |
| April | 95,559 | 23,623 | 236 | 895 |
| May | 30,028 | 17,612 | 181 | 747 |
| June | 7,606 | 32,800 | 132 | 310 |
| July | 6,560 | 25,787 | 130 | 442 |

Social views total 2,657,309 (approximately 2.66M); website page views total
13,783. Visitors are not deduplicated across months and are not summed into
an audience size. Social views are not unique people. Website January covers
January 1–30; the social January series covers the full month.

March and April rely on preserved monthly notes rather than raw daily series.
May social coverage is uneven, including Instagram views ending May 30.
May–July website values are saved dashboard captures, not daily raw exports.
August 1–10 website: 33 visitors, 122 page views; excluded from full-month chart.

Facebook published-post history has 196 reel rows representing 98 unique reels.
Lifetime post views are kept separate from monthly account-level views.
The top-five January reel concentration (82.4%) describes the cumulative
January publication cohort in the saved August snapshot, not January accrual.
Notes contain differing August snapshot dates; the article does not pin the
post-level concentration to a more precise capture date than the evidence supports.

Post features and posting windows are observational. They are not causal
creative tests. The available reports do not establish post-to-visit or
post-to-purchase conversion. The case study does not claim print sales or
revenue that these reports cannot substantiate.

## Operational boundaries

Read product/architecture docs and current frontend entry points. Prints retain
manual fulfillment. Stripe webhook confirmation is distinct from a browser
redirect. Newsletter enrollment is explicit opt-in. Social generation and
publication have different logs; a generated package is not a published post.
The case-study work did not alter those live systems or publish social content.

## Interactive additions, September 9, 2026

The search example submits to the same public `/api/search` endpoint as the
product, using `mode=smart` and six results. A fixed-origin, read-only portfolio
route applies input bounds, a 15-second timeout and five-minute response caching.
The initial tramway selection was retrieved on September 9 and is explicitly
labelled as saved until a visitor submits a live search. This example is separate
from the May CLIP/SigLIP comparison and must not be interpreted as that benchmark.

The technology explainer uses the research explorer's published
`embeddings/embeddings_2d.json`, `embeddings_ids.json` and `embeddings_512d.bin`
on the project R2 host. The binary header declares 14,715 vectors of 512 float32
values. Image IDs 1667, 12901 and 8227 are joined by ID, not assumed row position.
Only the first 64 values per selected image are shipped. The UMAP background
samples every twelfth stored coordinate; the highlighted coordinates are exact
selected records. Coordinates are recorded outputs, not newly computed results.

Instagram: `data/social/2026-03-19-refresh/instagram_profile.json` records 3,340
followers and 425 media entries. This is a March 19, 2026 snapshot, not a current
follower count. No authenticated account screenshot is reconstructed from it.

## Explorer and query suggestions

September 9: checked twelve live smart-search queries through the portfolio
proxy. Marché Bonsecours, pont Jacques-Cartier and Biosphère returned named
matching records. Broad visual terms returned results with sparse catalogue
titles; they are exploratory suggestions, not a relevance benchmark. Farine
Five Roses was omitted because the inspected top titles did not establish a
clear match. The row is user-scrolled rather than an automatic marquee.

Inspected the deployed explorer and `apps/web/src/components/EmbeddingExplorer.tsx`:
`yearToZ` supplies date-derived depth and seeded jitter; initial data loading
uses saved 2D positions and IDs; `loadEmbeddings` defers the 512D binary;
`findSimilar` uses cosine similarity on original vectors. Colour modes and
cluster/anomaly annotations are inspection aids. The 3D form must not be
presented as a 3D UMAP embedding or a geographic reconstruction.

## Caption experiments and full shape

Social comparison: `MTL Archives - Q1 Content Correlation (Meta x Analytics).md`,
March 31, 2026, 135 posts (66 Instagram, 69 Facebook). All creative/format averages
are post-level values at that snapshot, not February-only accrual. Classification
was observational. The article preserves the platform split and does not claim
that identical hooks guarantee identical future distribution or that caption
changes alone explain the later decline.

Caption code history inspected: `7f2ac1b` (January 26) and `bf0cc88` (March 22),
`pipelines/daily-reel/caption.py`. Initial formatter used location, era, research
context, fun fact, follow prompt and hashtags. Later code separates static/reel
copy, checks brand fit, supports optional model generation and template fallback.
The user also supplied their recollection of the deliberate editorial shift.

The embedded shape includes all 14,715 saved coordinates, rounded to four decimal
places, plus depth reproduced from the explorer's `yearToZ` implementation using
original row order as the jitter seed and SCALE=1000. A lightweight canvas provides
rotation, tilt and zoom; it does not rerun UMAP. Keyboard-accessible controls offer
an alternative to dragging. The full explorer remains the record-inspection tool.

Region colours reuse the eight `SUB_CLUSTERS` reference centres and the nearest
centre rule in the explorer. Colours are adjusted for the portfolio's light
background. Counts describe point assignments in this view, not verified counts
of photograph subjects. Region labels, including directional aerial names, are
preserved as research annotations and are not geographic bounds or UMAP outputs.

## Meta Business Suite captures, September 9, 2026

Captured directly from the authenticated account UI with the user's authorization.
Screenshots retain the reporting UI and aggregate results. Inbox contents and
settings were not captured for the case study. The header follower totals were
recorded as text; screenshots use native browser captures.
- Header: approximately 8.7K Facebook followers and 3.7K Instagram followers.
- Facebook Results, February 1–28: rounded 1.4M views, 447.1K viewers.
- Instagram Results, same dates: 197.6K headline views includes 148,600 Facebook
  views and 48,996 Instagram views; reach is 10.5K. Do not add the combined headline
  to Facebook's total. Screenshots preserve the split and date selector.

The current content list also exposed generic fallback captions in July, including
unresolved date/source wording. That is a pipeline-quality issue to investigate,
not evidence that a deliberate change in editorial voice alone caused the decline.
No published content or account settings were changed during this review.

Miron quarry reel detail, published January 26, captured September 9: 203,973
combined views (display rounds to 204.0K), 200,234 Facebook, 3,739 Instagram;
overview also shows 1.3K interactions, 0 link clicks and 10 follows. These are
cumulative post-level results, not monthly accrual. Captured the original reel
preview and platform split without comments or private account controls.

# MTL Archives case-study evidence

Prepared 9 September 2026. This is a synthesis of saved reports and source code,
not a new model experiment, live analytics pull or production deployment.

## Origin and chronology

The city photographic archive and aerial photothèque are the source collections:
- https://donnees.montreal.ca/ville-de-montreal/phototheque-archives
- https://donnees.montreal.ca/dataset/phototheque

The repository begins 19 October 2025 (`451b8d1`). Text search followed
(`b7206c5`); CLIP image embeddings were added 8 December (`b09cfc7`).
The January article *CLIP Sees Bureaucracy* records exploratory analysis.
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

January projection: 14,715 valid image embeddings, documented in
https://zouantcha.com/blog/clip-sees-bureaucracy . UMAP projection distances
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

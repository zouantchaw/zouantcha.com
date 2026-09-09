export type WorkLink = {
  href: string
  label: string
  external?: boolean
}

export type DesignArtifactId =
  | 'mtl-system'
  | 'mtl-search'
  | 'portmind-marks'
  | 'dpr-system'
  | 'dpr-social'
  | 'starthome-system'

export type WorkImage = {
  src: string
  alt: string
  caption?: string
  layout?: 'phone' | 'wide'
}

export const workImageDimensions: Record<string, { width: number; height: number }> = {
  '/images/case-studies/portmind-paper/logo-explorations.png': { width: 1440, height: 1040 },
  '/images/case-studies/portmind-paper/scene.png': { width: 65536, height: 4293001688 },
  '/images/case-studies/portmind-paper/site.png': { width: 65536, height: 4293001688 },
  '/images/case-studies/portmind-paper/review.png': { width: 65536, height: 4293001688 },
  '/images/case-studies/portmind-paper/workspace.png': { width: 65536, height: 4293001688 },
  '/images/case-studies/starthome-paper/home.png': { width: 780, height: 1688 },
  '/images/case-studies/starthome-paper/room.png': { width: 780, height: 1688 },
  '/images/case-studies/starthome-paper/observation.png': { width: 780, height: 1688 },
  '/images/case-studies/starthome-paper/review.png': { width: 780, height: 1688 },
  '/images/case-studies/starthome-paper/participation.png': { width: 780, height: 1688 },
  '/images/case-studies/starthome-paper/report.png': { width: 780, height: 1688 },

  '/images/case-studies/dpr-story/brand-marks.png': { width: 2000, height: 1966 },
  '/images/case-studies/dpr-story/social.png': { width: 2000, height: 2000 },
  '/images/case-studies/dpr-story/delivery-signoff.png': { width: 780, height: 1506 },

  '/images/case-studies/dpr-stripe/payments.png': { width: 786, height: 800 },
  '/images/case-studies/dpr-stripe/customers.png': { width: 786, height: 816 },
  '/images/case-studies/dpr-stripe/net.png': { width: 790, height: 804 },
  '/images/case-studies/dpr-stripe/gross.png': { width: 782, height: 802 },
  '/images/case-studies/dpr-landing.png': { width: 1440, height: 900 },
  '/images/case-studies/dpr-v2/work.png': { width: 2880, height: 1800 },
  '/images/case-studies/dpr-v2/readiness.png': { width: 2880, height: 1800 },
  '/images/case-studies/dpr-v2/sourcing.png': { width: 2880, height: 1800 },

  '/images/case-studies/ballerz-craft/operations.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/ballerz-craft/proposal.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/ballerz-craft/credits.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/ballerz-craft/location.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/diane-craft/operations.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/diane-craft/proposal.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/diane-craft/calls.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/diane-craft/location.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/ballerz-craft/home.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/ballerz-craft/schedule.jpg': { width: 390, height: 844 },
  '/images/case-studies/ballerz-craft/session.jpg': { width: 390, height: 844 },
  '/images/case-studies/diane-craft/home.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/diane-craft/catalog.jpg': { width: 1440, height: 1000 },
  '/images/case-studies/diane-craft/review.jpg': { width: 390, height: 844 },
  "/images/case-studies/starthome-craft/home.jpg": {width:368,height:800},
  "/images/case-studies/starthome-craft/welcome.jpg": {width:368,height:800},
  '/images/case-studies/starthome-craft/review.jpg': { width: 368, height: 800 },
  '/images/case-studies/starthome-craft/suggestion.jpg': { width: 368, height: 800 },
  '/images/case-studies/starthome-redesign/final-page-2.png': { width: 850, height: 1100 },
  '/images/case-studies/starthome-redesign/final-page-1.png': { width: 850, height: 1100 },
  '/images/case-studies/starthome-redesign/comparison.jpg': { width: 368, height: 800 },
  '/images/case-studies/starthome-redesign/finding.jpg': { width: 368, height: 800 },
  '/images/case-studies/starthome-redesign/home.jpg': { width: 368, height: 800 },
  '/images/case-studies/starthome-redesign/welcome.jpg': { width: 368, height: 800 },
  '/images/case-studies/bfa-admin-command-center.png': { width: 1440, height: 1180 },
  '/images/case-studies/bfa-admin-payroll-exceptions.png': { width: 1280, height: 577 },
  '/images/case-studies/bfa-admin-payroll.png': { width: 1280, height: 577 },
  '/images/case-studies/bfa-admin-programs.png': { width: 1512, height: 982 },
  '/images/case-studies/bfa-admin-sessions.png': { width: 1512, height: 982 },
  '/images/case-studies/dpr-admin-bookings.png': { width: 1600, height: 900 },
  '/images/case-studies/dpr-admin-call-detail.png': { width: 1600, height: 1050 },
  '/images/case-studies/dpr-admin-calls.png': { width: 1600, height: 820 },
  '/images/case-studies/dpr-admin-inventory.png': { width: 1280, height: 577 },
  '/images/case-studies/mtl-archives-record.png': { width: 1280, height: 577 },
  '/images/case-studies/mtl-archives-search.png': { width: 1280, height: 577 },
  '/images/case-studies/mtl-social-facebook-reels.svg': { width: 980, height: 460 },
  '/images/case-studies/mtl-social-facebook-views.svg': { width: 980, height: 460 },
  '/images/case-studies/mtl-social-instagram-views.svg': { width: 980, height: 460 },
  '/images/case-studies/portmind-reviewer-grid.png': { width: 1280, height: 720 },
  '/images/case-studies/portmind-reviewer-task.png': { width: 1280, height: 720 },
  '/images/case-studies/starthome-comparison-hashes.png': { width: 1360, height: 1760 },
  '/images/case-studies/starthome-comparison-kitchen.png': { width: 1360, height: 1760 },
  '/images/case-studies/starthome-comparison-photos.png': { width: 1360, height: 1760 },
  '/images/case-studies/starthome-comparison.png': { width: 1360, height: 1760 },
  '/images/case-studies/starthome-mobile-detail.png': { width: 893, height: 1778 },
  '/images/case-studies/starthome-mobile-home.png': { width: 893, height: 1778 },
  '/images/case-studies/starthome-mobile-inspections.png': { width: 893, height: 1778 },
  '/images/case-studies/starthome-mobile-language.png': { width: 893, height: 1778 },
  '/images/case-studies/starthome-mobile-splash.png': { width: 893, height: 1778 },
  '/images/case-studies/starthome-report-photos.png': { width: 1360, height: 1760 },
  '/images/case-studies/starthome-report.png': { width: 1360, height: 1760 },
}

export type WorkFigure =
  | ({ kind: 'image' } & WorkImage)
  | { kind: 'artifact'; id: DesignArtifactId; caption?: string }

export type WorkTable = {
  columns: string[]
  rows: string[][]
  footnote?: string
}

export type WorkBlock =
  | { kind: 'mtl-archive' }
  | { kind: 'mtl-pipeline' }
  | { kind: 'mtl-search' }
  | { kind: 'mtl-audience' }
  | { kind: 'mtl-brand' }
  | { kind: 'mtl-technology' }
  | { kind: 'mtl-shape' }
  | { kind: 'portmind-pipeline' }
  | { kind: 'portmind-explorer' }
  | { kind: 'portmind-results' }
  | { kind: 'portmind-inspection' }
  | { kind: 'rich-p'; parts: (string | WorkLink)[] }
  | { kind: 'gallery'; images: WorkImage[]; caption: string }
  | { kind: 'video'; src: string; poster: string; caption: string; description: string }
  | { kind: 'p'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'table'; table: WorkTable }
  | { kind: 'figure'; figure: WorkFigure }
  | { kind: 'phones'; images: WorkImage[] }

export type WorkSection = {
  heading: string
  blocks: WorkBlock[]
}

export type WorkMetric = {
  value: string
  label: string
}

export type WorkItem = {
  slug: string
  number: string
  title: string
  dek: string
  summary: string
  evidence: string
  role: string
  period: string
  scope: string
  tools?: string
  featured?: boolean
  research?: boolean
  links?: WorkLink[]
  glance?: string[]
  metrics?: WorkMetric[]
  banner?: WorkImage
  images?: WorkImage[]
  sections: WorkSection[]
}

export const work: WorkItem[] = [
{
  "slug": "mtl-archives",
  "number": "01",
  "title": "MTL Archives",
  "dek": "Making Montréal’s photographic archive easier to explore, and studying what makes people come back.",
  "summary": "An independent research and product project spanning archival data, visual search, a daily game and measured social distribution.",
  "evidence": "Archive research · Search experiments · Audience studies",
  "role": "Product design & engineering",
  "period": "2025–present",
  "scope": "Data pipelines · Search research · Brand · Product · Distribution",
  "featured": true,
  "research": true,
  "links": [
    {
      "label": "Explore the archive",
      "href": "https://www.mtlarchives.com/",
      "external": true
    },
    {
      "label": "Code",
      "href": "https://github.com/zouantchaw/mtl-archives-search",
      "external": true
    },
    {
      "label": "Research notes",
      "href": "/research/mtl-archives-evidence.md",
      "external": true
    }
  ],
  "sections": [
    {
      "heading": "Following an interest in the city",
      "blocks": [
        {
          "kind": "p",
          "text": "I don't remember exactly what led me to Montréal’s open data portal. I was interested in the city and followed that curiosity. I started browsing the datasets without a particular project in mind."
        },
        {
          "kind": "rich-p",
          "parts": [
            "Among them, I came across the ",
            {
              "label": "open photographic archive",
              "href": "https://donnees.montreal.ca/ville-de-montreal/phototheque-archives",
              "external": true
            },
            " and ",
            {
              "label": "aerial photothèque",
              "href": "https://donnees.montreal.ca/dataset/phototheque",
              "external": true
            },
            ". There were photographs of streets, aerial views and records of the city at different points in its history. That was the collection I wanted to spend more time with. As I explored it, I started wondering how someone could find a photograph without already knowing its title or catalogue reference."
          ]
        },
        {
          "kind": "p",
          "text": "I started building MTL Archives in October 2025 as a way to explore that collection. It became a search engine, then a daily location game and a print-order flow. Along the way, it became a research project about the data itself: what a model notices in an old photograph, what makes a search useful, and whether attention on social media leads people back to the archive."
        },
        {
          "kind": "p",
          "text": "My work spans the ingestion scripts, model experiments, website, visual identity and daily editorial pipeline. The public product now presents 13,000+ records. The larger research datasets include earlier versions and duplicates, so I keep their counts separate."
        },
        {
          "kind": "mtl-archive"
        }
      ]
    },
    {
      "heading": "The first problem was the description",
      "blocks": [
        {
          "kind": "p",
          "text": "An early audit found that about 97% of the working records had synthetic descriptions. That needs a distinction: my cleaning pipeline had filled missing text with a title, date and archive reference. Those fallback sentences made the rows look complete without adding much meaning. They were not rich descriptions supplied by the city."
        },
        {
          "kind": "p",
          "text": "That matters for semantic search, which looks for meaning rather than an exact word match. If thousands of records say little more than “photograph, reference, date,” a better search model still has very little to work with. I needed to improve the evidence behind each result before improving its presentation."
        }
      ]
    },
    {
      "heading": "Building the collection in layers",
      "blocks": [
        {
          "kind": "p",
          "text": "The extract, transform and load (ETL) pipeline downloads the city catalogues in batches, normalizes their fields, links records to image files and produces a manifest: a structured inventory of the collection. The source archive reference, or cote, stays attached to the record. Missing files, duplicate records and uncertain locations are data problems to track, not details to hide in the interface."
        },
        {
          "kind": "rich-p",
          "parts": [
            "Some useful words are printed inside the image. I used ",
            {
              "label": "Tesseract",
              "href": "https://tesseract-ocr.github.io/",
              "external": true
            },
            ", an optical character recognition (OCR) engine, with French and English support to extract them. A vision-language model, which can interpret an image and produce text, supplies a separate description. Original metadata, extracted text and generated descriptions remain distinct."
          ]
        },
        {
          "kind": "mtl-pipeline"
        },
        {
          "kind": "rich-p",
          "parts": [
            "The preparation jobs use Python and TypeScript. ",
            {
              "label": "Cloudflare R2",
              "href": "https://developers.cloudflare.com/r2/",
              "external": true
            },
            " stores images; ",
            {
              "label": "D1",
              "href": "https://developers.cloudflare.com/d1/",
              "external": true
            },
            " stores records; ",
            {
              "label": "Vectorize",
              "href": "https://developers.cloudflare.com/vectorize/",
              "external": true
            },
            " stores the numerical representations used for similarity search. The public ",
            {
              "label": "Worker",
              "href": "https://developers.cloudflare.com/workers/",
              "external": true
            },
            " answers requests, while the ",
            {
              "label": "Next.js",
              "href": "https://nextjs.org/docs",
              "external": true
            },
            " website presents the results."
          ]
        },
        {
          "kind": "p",
          "text": "The ingestion code streams records in batches and writes checkpoints so an interruption does not require starting over. Failures have their own logs. The serving database is also distinct from the research corpus: a June audit recorded 13,499 deduplicated production records and 14,822 development records. A larger file or vector count does not mean the website has that many distinct photographs."
        }
      ]
    },
    {
      "heading": "Captioning was a job to measure",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "The first recorded large captioning run used ",
            {
              "label": "LLaVA, the Large Language and Vision Assistant",
              "href": "https://llava-vl.github.io/",
              "external": true
            },
            " 1.5 7B on a rented graphics processing unit (GPU). In December, the run report recorded 12,304 captioned images, 23 errors, 10.86 hours and $14 in compute. It was a partial run, with roughly 2,500 images still remaining."
          ]
        },
        {
          "kind": "p",
          "text": "By May, I had moved to structured outputs: descriptions, visual categories and fields that later tools could use. The full-run report contains 14,822 output rows, including 14,706 captions, 79 captions that failed the required structure and 116 image or model errors. A valid structure tells me the program can read an answer; it does not prove the description is historically correct."
        },
        {
          "kind": "p",
          "text": "That run also had to recover from interrupted work. The first 12,100 rows were reconstructed from saved chunks, then the remaining 2,722 were resumed. The report estimates 24.47 GPU hours, but the recovered portion does not have the same complete timing record as the tail. I keep it as an estimate rather than presenting it as a measured invoice."
        }
      ]
    },
    {
      "heading": "What the image model was noticing",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "For visual search I used ",
            {
              "label": "CLIP, Contrastive Language–Image Pre-training",
              "href": "https://openai.com/research/clip",
              "external": true
            },
            ", which represents images and text as numerical vectors. Similar vectors can help match a phrase to a picture. I also built an explorer to inspect the collection rather than judge the system only through a few search queries."
          ]
        },
        {
          "kind": "p",
          "text": "In January, the projection of 14,715 image embeddings showed a striking split: many plain aerial photographs grouped separately from survey documents with municipal headers and borders. Index cards formed their own tight group. The formatting was part of the signal, even when the underlying subject was similar."
        },
        {
          "kind": "rich-p",
          "parts": [
            "The projection used ",
            {
              "label": "UMAP, Uniform Manifold Approximation and Projection",
              "href": "https://umap-learn.readthedocs.io/en/latest/",
              "external": true
            },
            ", to turn high-dimensional vectors into a view I could inspect. It suggested what to investigate; distances on that map were not proof of semantic similarity or a controlled explanation of the model. I wrote about the observation in ",
            {
              "label": "CLIP Sees Bureaucracy",
              "href": "/blog/clip-sees-bureaucracy",
              "external": true
            },
            "."
          ]
        },
        { "kind": "mtl-technology" },
        {
          "kind": "p",
          "text": "That led to a practical question: should borders and document framing be removed before indexing? A later experiment tried deterministic cropping and tone adjustment on 12 flagged images. Two changed their predicted category. That was enough to justify reviewing individual cases, not enough to justify automatically cropping the archive. Borders can contain evidence worth preserving."
        }
      ]
    },
    {
      "heading": "Stepping back to see the whole collection",
      "blocks": [
        { "kind": "rich-p", "parts": ["A search result shows what the system found. I built the ", { "label": "MTL Archives Explorer", "href": "https://explorer.mtlarchives.com/", "external": true }, " to ask a different question: how had it organized the collection? Each of its 14,715 points represents one photograph. I could move through the projection, open a record and compare a group of images instead of guessing from a handful of thumbnails."] },
        { "kind": "mtl-shape" },
        { "kind": "p", "text": "The flat view uses the saved UMAP coordinates. The 3D view keeps that layout and adds depth from the recorded date, with a little spacing to avoid stacked points. Its shape is a way to navigate the evidence, not the geography of Montréal or a third dimension discovered by UMAP. Colour views offer other ways to inspect it, including dates, photographer labels and annotated visual groups." },
        { "kind": "p", "text": "That made the split between aerial photographs, framed survey documents and index cards easier to investigate. I could move from an unusual group back to the images that formed it. Labels and anomaly highlights were prompts for review, not new archival facts. The useful outcome was a more specific question about the influence of document formatting, which led to the small cropping experiment." },
        { "kind": "rich-p", "parts": ["The explorer is built with ", { "label": "Three.js", "href": "https://threejs.org/", "external": true }, ", a browser graphics library. It loads the saved positions and record identifiers first, then fetches the larger vector file when needed. Similar-image lookup compares the original CLIP vectors, not distances on the flattened map. Selected records can be collected and exported for follow-up. I kept this research workspace separate from the main site's simpler search, game and print flows."] }
      ]
    },
    {
      "heading": "Trying a replacement before changing the index",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "In May I compared the existing CLIP model with ",
            {
              "label": "SigLIP, Sigmoid Loss for Language Image Pre-Training",
              "href": "https://arxiv.org/abs/2303.15343",
              "external": true
            },
            ", on a selected 500-image sample and 13 queries. The sample included aerials, documents and ground photographs, but it was uneven: 174 general aerials and only one ground-transit image. This was a local diagnostic, not a representative search benchmark."
          ]
        },
        {
          "kind": "table",
          "table": {
            "columns": [
              "Recorded measure",
              "CLIP ViT-B/32",
              "SigLIP base"
            ],
            "rows": [
              [
                "Mean reciprocal rank",
                "0.8269",
                "0.4484"
              ],
              [
                "Queries with a rule match in top 5",
                "13 / 13",
                "8 / 13"
              ]
            ],
            "footnote": "May 26, 2026 · 500 images, 13 queries. Expected matches came from generated category/theme rules, not independent human relevance judgments."
          }
        },
        {
          "kind": "p",
          "text": "Mean reciprocal rank asks how early the first expected match appears: first place scores one, second place one-half, and so on. The report called its other measure “P@5,” but the code actually checks whether any expected match appears in the first five results. I describe it as a hit rate here. It does not mean all five results were relevant."
        },
        {
          "kind": "mtl-search"
        },
        {
          "kind": "p",
          "text": "The recorded comparison supported keeping CLIP rather than rebuilding the production index around this SigLIP model. They did not show that CLIP was best for every archive question. The expected answers were broad category rules, and some queries were poorly represented in the sample. A stronger comparison needs independent judgments about whether each result answers the actual query."
        },
        {
          "kind": "p",
          "text": "The ranking experiments brought another useful negative result. Broad boosts from generated categories and quality labels underperformed the existing ranking on the recorded query set. A visually plausible park or waterfront image could move above a more directly relevant result. The documented decision was to keep those signals available for inspection without letting them change scores until better relevance labels support the change."
        }
      ]
    },
    {
      "heading": "Designing a way into the archive",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "I worked through the identity and product states in ",
            {
              "label": "Paper",
              "href": "https://app.paper.design/file/01KJT1EB3Z2N2FYHB3VDDBF496/01KJT1EB3ZN11EN8P6G678B9DZ",
              "external": true
            },
            ". The board covers the logo, typography, search, photo detail, game, print ordering, empty states and emails. That let me consider the same photograph as a search result, an archival record and a daily invitation to explore."
          ]
        },
        {
          "kind": "mtl-brand"
        },
        {
          "kind": "p",
          "text": "The rosette draws on Montréal’s civic emblem and turns it into a small arrangement of points. I explored different densities so the idea could survive at icon size. The rest of the system gives the photographs room: paper-toned surfaces, dark text and restrained colour. Spectral carries editorial headings, Figtree handles interface copy, and IBM Plex Mono distinguishes archival details."
        },
        {
          "kind": "p",
          "text": "The interface is bilingual, with familiar places and subjects as entry points. A person arriving from a phone should be able to browse before learning how the catalogue works. On the record, the source reference and location confidence remain available. The design needs to make discovery easier without making uncertain metadata look authoritative."
        }
      ]
    },
    {
      "heading": "A reason to return, and a way to collect",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "The ",
            {
              "label": "daily location game",
              "href": "https://www.mtlarchives.com/game",
              "external": true
            },
            " asks people to place a photograph on a map. It reuses the archive rather than requiring a separate content library. The code keeps challenges and guesses in the backend, while the map and photo controls belong to the interface. A daily game makes a different invitation from search: you can start with curiosity instead of a query."
          ]
        },
        {
          "kind": "rich-p",
          "parts": [
            "Print ordering uses ",
            {
              "label": "Stripe Checkout",
              "href": "https://docs.stripe.com/payments/checkout",
              "external": true
            },
            ". The app validates the shipping details and quote, then a signed payment notification triggers confirmation and fulfilment emails. The print work itself remains manual. A successful browser redirect is not treated as proof of payment."
          ]
        },
        {
          "kind": "p",
          "text": "The newsletter is another return path. Signing up is explicit; playing the game does not subscribe someone automatically. Subscription state and delivery history live in the database. The daily scheduler checks Montréal’s local time, including daylight saving changes, rather than assuming the same server hour means morning all year."
        },
        {
          "kind": "p",
          "text": "These are working product surfaces, but their existence is not evidence of strong conversion. The saved business notes describe revenue as weak relative to attention. That is the next product problem, not a result I can claim to have solved."
        }
      ]
    },
    {
      "heading": "Taking the archive to the feed",
      "blocks": [
        {
          "kind": "p",
          "text": "A searchable website still needs people to find it. I began using Instagram and Facebook as editorial experiments: exact places and dates, street transformations, lost landmarks and questions about what used to be there. Each post had to be worth looking at even if the viewer never ordered a print."
        },
        {
          "kind": "p",
          "text": "The daily pipeline selects an archive record, assembles its source material, drafts bilingual copy and produces a carousel or reel package. An image interpretation or a web search can suggest context, but unsupported exact locations should not quietly become facts. The code tracks location confidence and can reject copy that reintroduces a place name the evidence does not support."
        },
        {
          "kind": "p",
          "text": "Generating a package and publishing it are separate events. The pipeline records attempts, successful post identifiers and permalinks, which helps prevent duplicate delivery and makes later analysis possible. The home server holds operational state; an optional Obsidian mirror holds the editorial notes. A local fallback can prepare a package when the server is unavailable."
        }
      ]
    },
    {
      "heading": "One archive, two editorial experiments",
      "blocks": [
        { "kind": "p", "text": "I was also experimenting with the writing around each photograph. The January caption formatter assembled a location and era, researched context, a surprising detail, a follow prompt and hashtags. The published reels tested a more dramatic opening: something lost, hidden or changed beyond recognition. The photograph supplied the evidence; the first line gave someone a reason to stop scrolling." },
        { "kind": "p", "text": "Facebook responded strongly to that approach. In the March 31 analysis of 135 first-quarter posts across both platforms, Facebook reels using loss or erasure language averaged 100,260 views, compared with 35,974 for reels without it. Openings such as “Une rue fantôme” made urban change the story. These were observed post-level averages at the time of the export, not views earned only in February or a controlled test of the recommendation algorithm." },
        { "kind": "p", "text": "February concentrated that experiment: 18 Facebook reels averaged 62,519 views in the saved cohort. But the same format did not travel equally well to Instagram. There, February had 17 reels and only five carousels. The carousels averaged 9,468 views; the reels averaged 1,533. Optimizing both accounts around the largest Facebook number would have missed the difference." },
        { "kind": "p", "text": "Instagram's stronger pattern was more documentary: lead with a place and date, point out a detail, explain what changed or survived, and provide context in French and English. Across the first-quarter snapshot, place-and-date openings averaged 4,866 views versus 2,315 without them. Bilingual contextual captions also performed better in that comparison. Format, subject and posting date varied together, so I treated those findings as directions to test rather than isolated effects of the caption." },
        { "kind": "p", "text": "I shifted the writing toward that local-archivist voice. The later pipeline separates carousel and reel captions, checks whether generated text fits the story, and falls back to a structured template when it does not. Its reel instructions ask for a location and date, something visible to look at, concrete historical context and what survived. The March revision also filters generic mystery language. The engineering work was making that editorial choice repeatable, not just asking a model to write something engaging." },
        { "kind": "p", "text": "The change in mix is visible in March: Instagram moved to 12 carousels and eight reels, while its monthly account views recovered from 48,996 to 68,263. Facebook still published 17 reels, but their average in the saved cohort fell to 17,800. That helps explain why the February peak should not be read as a steady growth rate. It does not establish that a caption change alone caused the later decline." },
        { "kind": "p", "text": "I could have kept testing the dramatic Facebook pattern. Instead, I chose to put more weight on context, specificity and the kind of archive I wanted people to return to. Repeating the same framing would not have guaranteed the same distribution. The result I can stand behind is narrower and more useful: I found two different editorial patterns, measured their tradeoffs, and changed the pipeline to reflect that choice." }
      ]
    },
    {
      "heading": "The reach was real. It did not stay there.",
      "blocks": [
        {
          "kind": "p",
          "text": "The saved January–July reports total about 2.66 million Facebook and Instagram account-level views. February was the peak: 1,363,500 Facebook views and 48,996 Instagram views. By July, Facebook was down to 6,560 while Instagram recorded 25,787. Showing only the peak would miss most of what the experiment taught me."
        },
        {
          "kind": "mtl-audience"
        },
        { "kind": "rich-p", "parts": ["The saved March 19 account export recorded 3,340 followers and 425 posts on ", { "label": "Instagram (@mtlarchives)", "href": "https://www.instagram.com/mtlarchives/", "external": true }, ". That is a dated account snapshot, separate from the view totals above. You can also explore the published work on ", { "label": "Facebook", "href": "https://www.facebook.com/100799958627875", "external": true }, "."] },
        {
          "kind": "p",
          "text": "A small number of reels accounted for much of the observed Facebook attention. In the saved August post snapshot, the top five unique January reels represented 82.4% of that month’s reel cohort’s cumulative views. These are lifetime post counts, not views accrued during January, so I do not add them to the monthly account totals."
        },
        {
          "kind": "rich-p",
          "parts": [
            "Concrete places and a reason to be curious appeared repeatedly among the stronger posts. On Instagram, examples included ",
            {
              "label": "Parc Marquette, 1969",
              "href": "https://www.instagram.com/p/DWKRqfNjcBT/",
              "external": true
            },
            " and ",
            {
              "label": "Avenue du Mont-Royal at Saint-Denis, 1928",
              "href": "https://www.instagram.com/p/DXfqpzSG88k/",
              "external": true
            },
            ". The saved analysis found different patterns for documentary carousels and curiosity-led reels. These were observational comparisons; timing, format and platform distribution changed together, so they do not establish a causal recipe."
          ]
        },
        {
          "kind": "p",
          "text": "The data needed its own cleanup. Facebook’s published-post export contained 196 reel rows for 98 unique reels. Counting the rows as separate pieces of content would double the denominator. Some monthly reports also lacked preserved daily exports. Those limitations remain in the supporting notes instead of being smoothed into an uninterrupted growth story."
        }
      ]
    },
    {
      "heading": "What happened on the website",
      "blocks": [
        {
          "kind": "p",
          "text": "February brought 875 reported website visitors and 4,747 page views. March had fewer visitors, 714, but more page views, 5,296. The seven-month reports contain 13,783 page views in total. I do not sum monthly visitor counts and call that a unique audience: the same person can return in several months."
        },
        {
          "kind": "p",
          "text": "The gap between feed attention and website activity is the important result. The available exports do not reliably connect an individual post to a visit, game session or order. I can describe when activity rose and fell, but I cannot turn the social totals into an attributed conversion rate."
        },
        {
          "kind": "p",
          "text": "The later website captures show the smaller scale clearly: July recorded 130 visitors and 442 page views; August 1–10 recorded 33 and 122. The partial August period is kept out of the full-month chart. Better campaign links, preserved month-end exports and product events are needed to tell which forms of discovery lead to repeat archive use."
        }
      ]
    },
    {
      "heading": "What I would carry forward",
      "blocks": [
        {
          "kind": "p",
          "text": "MTL Archives taught me to treat search quality, interface design and distribution as connected research questions. Better captions help only if they improve retrieval. A model comparison helps only if the evaluation measures the task. A large audience matters only if the product offers a useful next step."
        },
        {
          "kind": "p",
          "text": "The result is a working archive product and a record of experiments that changed its direction. I kept source evidence separate from generated text, retained the simpler model when the replacement did not earn its place, and built publishing records so attention could be studied rather than guessed at."
        },
        {
          "kind": "rich-p",
          "parts": [
            "The ",
            {
              "label": "code",
              "href": "https://github.com/zouantchaw/mtl-archives-search",
              "external": true
            },
            " and ",
            {
              "label": "source notes for this case study",
              "href": "/research/mtl-archives-evidence.md",
              "external": true
            },
            " show the implementation and limits behind the story. If you are opening up a difficult collection, evaluating search, or building a product around specialist data, ",
            {
              "label": "I’d be happy to talk",
              "href": "/contact",
              "external": true
            },
            "."
          ]
        }
      ]
    }
  ]
},
  {
  "slug": "portmind",
  "number": "02",
  "title": "PortMind",
  "dek": "Collecting port imagery, testing vision models, and building a product around what the evidence can support.",
  "summary": "An independent research and engineering project: port camera collection, reproducible experiments, human review and the product that connects them.",
  "evidence": "Public studies · Human review · Model evaluation",
  "role": "Product design & engineering",
  "period": "2026–present",
  "scope": "Data collection · Research · Evaluation · Product · Brand",
  "featured": true,
  "research": true,
  "links": [
    {
      "label": "Visit PortMind",
      "href": "https://www.portmind.dev/",
      "external": true
    },
    {
      "label": "Read the method",
      "href": "https://www.portmind.dev/method",
      "external": true
    }
  ],
  "images": [
    {
      "src": "/images/case-studies/portmind-paper/scene.png",
      "alt": "A Montréal port camera image showing a truck with an empty chassis beside container stacks"
    }
  ],
  "sections": [
    {
      "heading": "Looking closer at the port",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "The starting point was an article from the Montreal Port Authority: ",
            {
              "label": "Data visibility: a new technological tool for information sharing",
              "href": "https://www.port-montreal.com/en/the-port-of-montreal/news/news/visibility-data",
              "external": true
            },
            ". It described a port community system that would let shipping lines, railways and operators share operational data in real time. Better visibility would help them coordinate arrivals, plan resources and reduce manual handoffs."
          ]
        },
        {
          "kind": "p",
          "text": "That initiative made me curious about what I could learn from the data already available to the public. I started Port Observatory MTL as an independent project, collecting port camera images alongside vessel activity and schedules. The collection system came first: a way to keep a record of what was happening at the port."
        },
        {
          "kind": "p",
          "text": "Once I had a record to work with, I wanted to understand how much a vision model could actually tell from it. There are trucks, stacks of containers, shadows and things partly hidden behind other things. Recognizing a truck is one task. Seeing whether it is attached to a shipping container is another. And before I could measure either, I needed to establish what counted as a correct answer."
        },
        {
          "kind": "p",
          "text": "PortMind became the research project around those questions. My work spans the collection and research tooling, the visual identity, and the interfaces for reviewing images and comparing models."
        },
        {
          "kind": "portmind-explorer"
        }
      ]
    },
    {
      "heading": "First, a record to work with",
      "blocks": [
        {
          "kind": "p",
          "text": "The collector and the research system have different jobs. Port Observatory keeps watching the port. PortMind turns selected observations into datasets and experiments. Keeping that boundary meant I could change a labeling rule or repeat an evaluation without changing the collection process."
        },
        {
          "kind": "rich-p",
          "parts": [
            "A ",
            {
              "label": "Cloudflare Worker",
              "href": "https://developers.cloudflare.com/workers/",
              "external": true
            },
            ", a small program that runs on Cloudflare’s servers, checks the cameras every three minutes. It rotates through pairs of the six Montréal cameras. An image hash, a fingerprint of the file’s contents, tells it whether a frame has changed. Unchanged frames can reuse the previous observation, marked as cached."
          ]
        },
        {
          "kind": "rich-p",
          "parts": [
            "For new frames, ",
            {
              "label": "DETR, the Detection Transformer",
              "href": "https://arxiv.org/abs/2005.12872",
              "external": true
            },
            ", locates vehicles. When enabled, ",
            {
              "label": "LLaVA, the Large Language and Vision Assistant",
              "href": "https://llava-vl.github.io/",
              "external": true
            },
            ", then classifies the truck type. These are model predictions. Collecting them does not make them correct labels."
          ]
        },
        {
          "kind": "rich-p",
          "parts": [
            "The images live in ",
            {
              "label": "R2, Cloudflare’s file storage",
              "href": "https://developers.cloudflare.com/r2/",
              "external": true
            },
            ". ",
            {
              "label": "D1, its managed database",
              "href": "https://developers.cloudflare.com/d1/",
              "external": true
            },
            ", keeps the observation records and collection logs. Each camera records its own outcome, including failures and timeouts. Vessel events and schedules provide context, but do not supply the correct answers for an image evaluation."
          ]
        },
        {
          "kind": "portmind-pipeline"
        },
        {
          "kind": "p",
          "text": "A July 9 inventory recorded 81,202 activity snapshots across the six cameras, with coverage beginning January 28. It also counted 76,353 D1 image rows and 199,214 R2 objects using 36.7 GB. These are different assets, not interchangeable counts of unique photographs. In particular, a cached snapshot is not another independent view of the scene."
        },
        {
          "kind": "p",
          "text": "The Python tooling builds a manifest, an inventory connecting each observation to its source, camera, time and image file. It also records file fingerprints and produces the lists used for training and evaluation. That lets me trace a result back to the exact inputs instead of relying on a folder name."
        }
      ]
    },
    {
      "heading": "From a live map to a research tool",
      "blocks": [
        {
          "kind": "p",
          "text": "The Observatory’s first commits are from January 19, 2026. It began as a live map. Vessel positions from the Automatic Identification System, the broadcast system used by ships, joined traffic information and terminal schedules. Camera detection and the background collector followed on January 21; truck classification followed the next day."
        },
        {
          "kind": "p",
          "text": "The early engineering work was about keeping that view useful. On January 24, the database report recorded 72.96 million rows read in a day. Repeated queries were examining far more data than they returned. I added response caching, changed the expensive queries, and reduced polling that was faster than the source updates. Camera collection was split into smaller batches on January 27. These changes addressed specific failures; the report does not establish a measured before-and-after cost saving."
        },
        {
          "kind": "p",
          "text": "PortMind became a separate repository on June 25. The next steps were a source registry, a read-only connection to the collector, manifests and date-based sampling tools. Then came review packets, simple model comparisons and an experiment registry. The question had shifted from “can I show the activity?” to “can I measure whether the interpretation is right?”"
        },
        {
          "kind": "p",
          "text": "The iteration loop used model mistakes to select the next images for review. This is active learning: spend labeling effort where another answer may be useful. The repository records several rounds of harder examples, image-quality checks, expanded training sets and new comparisons. It also records a later change from the original chronological split tools to the July distribution-matched split, which balanced rows rather than holding out a later period. Those are different evaluation choices."
        },
        {
          "kind": "p",
          "text": "The experiment registry connected inputs, outputs, file fingerprints, code revisions and summary scores. It was not a complete laboratory notebook from day one. Some early entries have no recorded execution command, refer to uncommitted code, or lack a fingerprint for an output. Later checks began rejecting changed files, overlapping evaluation images and unsupported claims that an agent’s labels came from a human. Keeping that history matters as much as keeping the best score."
        },
        {
          "kind": "p",
          "text": "The tests cover those contracts: normalizing a source record, respecting date boundaries, detecting an image used in both training and evaluation, rejecting a modified input, and refusing to treat an agent as an independent human reviewer. They check the machinery. A separate human review still has to establish whether the answer itself is right."
        }
      ]
    },
    {
      "heading": "Trying the smaller model first",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "Before paying for a larger training run, I tried ",
            {
              "label": "SigLIP, Sigmoid Loss for Language Image Pre-Training",
              "href": "https://arxiv.org/abs/2303.15343",
              "external": true
            },
            ". It turns an image into a list of numbers describing its visual features, called an embedding. I kept that image model fixed. One baseline chose the nearest class average; another learned a small classifier, or head, on the same features. Would learning that decision boundary help?"
          ]
        },
        {
          "kind": "p",
          "text": "The July experiment used 1,744 labeled rows: 1,175 to train on, 219 to choose settings, and 350 reserved for evaluation. The score was macro F1: calculate F1 for each class, then average them. F1 balances finding the positive cases with avoiding false alarms, on a scale from zero to one. The learned head reached 0.8584 on validation, then 0.6434 on the test split. The simpler baseline reached 0.6468 on that same test. Adjusting the cutoff for a positive prediction did not help."
        },
        {
          "kind": "table",
          "table": {
            "columns": [
              "Container-truck classifier",
              "Validation F1",
              "Test F1"
            ],
            "rows": [
              [
                "Frozen SigLIP · nearest centroid",
                "0.8493",
                "0.6468"
              ],
              [
                "Linear softmax head",
                "0.8584",
                "0.6434"
              ],
              [
                "Threshold-calibrated head",
                "0.8584",
                "0.6434"
              ]
            ],
            "footnote": "July 9, 2026 · Historical locked-v1 diagnostic. Macro F1 averages the per-class F1 scores. Test support: 350 rows. Agent-derived labels and repeated holdout use limit interpretation."
          }
        },
        {
          "kind": "p",
          "text": "The learned classifier did not beat the simple baseline on this test. That gave me no evidence to justify a larger training run. The gap between validation and test also needed investigation. Camera and time differences, near-duplicate frames, repeated tuning and label errors were all plausible contributors. This comparison did not tell me which was responsible."
        },
        {
          "kind": "p",
          "text": "Image size was another question. The model’s full-frame input was reduced to 224 pixels, while people often needed to zoom in to see a distant truck. That suggested testing smaller crops or several image scales. It was a next experiment, not a result I could claim yet."
        }
      ]
    },
    {
      "heading": "Checking the answers I was scoring against",
      "blocks": [
        {
          "kind": "p",
          "text": "The most important finding came from the labels. The audit found that every row in the historical locked set had been labeled through Codex, OpenAI’s agent environment, even though the files used human-review field names. Here, Codex identifies the workflow that ran the labeling workers, not a particular model. The reviewer IDs and run report do not establish an exact underlying model version for all 1,744 rows. The files passed their format checks. Their names still overstated the evidence."
        },
        {
          "kind": "p",
          "text": "I reviewed 120 deliberately difficult training and validation rows and disagreed with Codex on 72. A blind repeat review of those disagreement rows reproduced all 31 clear container-truck positives that Codex had missed. This was a selected hard sample, so it could not estimate an error rate for all port images. It did reveal a recurring kind of miss."
        },
        {
          "kind": "p",
          "text": "The split also had 84 warnings about images from the same camera taken close together. Similar frames can make a test less independent than it looks. I had also consulted the test results repeatedly during development. I kept those runs as historical diagnostics and stopped treating that split as a final exam. A fixed file and a passing format check were not enough."
        },
        {
          "kind": "p",
          "text": "The new flow records who supplied an answer, separates model suggestions from independent human review, and checks for overlapping images and camera dates. The September draft starts with 96 verified images across six cameras from June through August. It allows one uncached capture per camera and day, measured in Coordinated Universal Time (UTC), before balancing cameras with a repeatable random seed. It is an initial review packet, not a claim to represent every operating condition."
        }
      ]
    },
    {
      "heading": "Does giving a model tools help?",
      "blocks": [
        {
          "kind": "p",
          "text": "I also explored whether closer inspection helps a model make a better decision. The test harness, the program that runs the experiment, can supply the full image, a three-by-three grid, a crop, and brightness or contrast adjustments. I separated runs where that program chooses the steps from runs where the model calls the tools itself."
        },
        {
          "kind": "p",
          "text": "The guided July 28 run used a grid followed by the full frame. Those inspection steps were chosen by the wrapper, so every model had zero autonomous tool calls. Calling the run “tool-using” without that detail would make it sound like a different experiment."
        },
        {
          "kind": "table",
          "table": {
            "columns": [
              "Guided inspection",
              "Agreement",
              "Found / 8",
              "False alarms / 15"
            ],
            "rows": [
              [
                "Grok 4.5",
                "73.9%",
                "2",
                "0"
              ],
              [
                "Mistral Small 3.1",
                "65.2%",
                "0",
                "0"
              ],
              [
                "Llama 4 Scout",
                "65.2%",
                "0",
                "0"
              ],
              [
                "Llama 3.2 Vision",
                "34.8%",
                "8",
                "14"
              ],
              [
                "LLaVA 1.5",
                "30.4%",
                "7",
                "15"
              ]
            ],
            "footnote": "Container attachment · July 28, 2026. 23 binary task rows from 19 unique decidable images, including repeats; one human reference. Moondream returned no usable answers and is omitted from the agreement table."
          }
        },
        {
          "kind": "p",
          "text": "The packet began with 20 unique images and four repeat tasks. One undecidable reference task was excluded from binary scoring. Grok had the highest agreement here, but missed six of the eight positive tasks. Mistral and Scout matched the always-No baseline. These results describe this small study; they do not establish a general model ranking."
        },
        {
          "kind": "p",
          "text": "A separate run required GPT-5.5 to choose and call its own inspection tools. It completed 14 of 24 tasks. That introduced another question: can the model finish the procedure at all? The harness records the actions it requests, requests that fail the expected format, repair attempts, tools actually executed and how the run ends. Those records sit beside the label score."
        },
        {
          "kind": "p",
          "text": "To establish a benefit from tools, the next comparison needs the same model, images, labeling rules and instructions with and without tool access. Comparing one model with guided crops to another model acting autonomously mixes too many changes. The earlier image-labeling pilot also used a different setup and lacks verified original response traces, so I keep its published scores separate."
        }
      ]
    },
    {
      "heading": "Four ways to mark a port",
      "blocks": [
        {
          "kind": "p",
          "text": "Alongside the experiments, I explored four identity directions in Paper. Harbor Loop used an open square and a center point. Rhumbline drew on compass bearings. Hull Wake used a vessel and its trail. Cargo Stack arranged container-like units into a modular mark."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/portmind-paper/logo-explorations.png",
            "alt": "The original four directions in Paper: Harbor Loop, Rhumbline, Hull Wake and Cargo Stack.",
            "caption": "The original four directions in Paper: Harbor Loop, Rhumbline, Hull Wake and Cargo Stack."
          }
        },
        {
          "kind": "p",
          "text": "I tested each as a wordmark and a small icon, with the constraint that it should work in one color before adding blue. The Harbor Loop direction carried forward: its open boundary and central point leave room for the idea of observation without tying the product to a ship silhouette. It also stays recognizable beside a dense review screen."
        },
        {
          "kind": "p",
          "text": "I left the earlier website direction behind, but kept that identity. The current site uses the mark sparingly and lets the port images do most of the explaining. The blue appears again in selected controls and image highlights, connecting the brand to how the product behaves."
        }
      ]
    },
    {
      "heading": "Making the question visible",
      "blocks": [
        {
          "kind": "p",
          "text": "I wanted someone arriving on the site to understand the task before seeing a score. The opening image lets them hover or tap an object to see its label. A truck with an empty chassis counts as a container attachment. A stack of containers beside the road does not."
        },
        {
          "kind": "p",
          "text": "That small interaction does some of the work a long explanation would otherwise have to do. It gives the results a concrete meaning. The rest of the visual identity stays quiet: a compact mark, black type, white space and blue for actions and selection. The camera imagery carries the character of the project."
        },
        {
          "kind": "p",
          "text": "The scope is deliberately narrow. A still image can show that a truck is present; it cannot establish how long that truck has been waiting. I kept those boundaries in the product language, so a recognition result does not turn into a claim about port traffic."
        }
      ]
    },
    {
      "heading": "A score needs a little context",
      "blocks": [
        {
          "kind": "p",
          "text": "The results page lets a reader choose a study and a task before comparing models. Each row opens the model’s results within that same context. The study setup sits beside the scores: how many answers were scored, who supplied the reference labels and which images were repeated."
        },
        {
          "kind": "portmind-results"
        },
        {
          "kind": "p",
          "text": "The chart separates finding positive cases from raising false alarms, and it has a table alternative. The denominator and reference source stay close to the ranking. Those details are part of the interface because they change the decision a reader might make from it."
        }
      ]
    },
    {
      "heading": "Helping people give better answers",
      "blocks": [
        {
          "kind": "p",
          "text": "The reference labels need as much care as the model run. I designed the reviewer flow around two questions: is there a truck, and is a truck carrying a container or towing an empty chassis? Each has Yes, No and Unsure. A reviewer should be able to say that the image does not contain enough evidence."
        },
        {
          "kind": "portmind-inspection"
        },
        {
          "kind": "p",
          "text": "Zoom, brightness and contrast controls help with distant or poorly lit details. Show original and Reset view give the reviewer a way back. The questions still apply to the whole image, even when someone is inspecting a small part of it."
        },
        {
          "kind": "p",
          "text": "Before the session, examples and practice introduce the rules. During it, answers remain private and model predictions stay hidden. The organizer can then resolve disagreements before releasing the reference set. That sequence matters: showing a model’s answer too early can influence the label it will later be measured against."
        }
      ]
    },
    {
      "heading": "Giving the work a place to live",
      "blocks": [
        {
          "kind": "p",
          "text": "The workspace brings sources, reference sets, benchmark versions and runs into one place. Its first screen shows what needs to happen next: register the source, review the images and freeze a version. Each step opens the record it belongs to."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/portmind-paper/workspace.png",
            "alt": "The workspace follows the preparation of a benchmark, with the next decision attached to its version.",
            "caption": "The workspace follows the preparation of a benchmark, with the next decision attached to its version."
          }
        },
        {
          "kind": "rich-p",
          "parts": [
            "The coordinator uses ",
            {
              "label": "Eve",
              "href": "https://eve.dev/docs",
              "external": true
            },
            ", a framework for agents that can prepare work and follow it through. The web interfaces use ",
            {
              "label": "Next.js",
              "href": "https://nextjs.org/docs",
              "external": true
            },
            " on Vercel. ",
            {
              "label": "Cloudflare Workflows",
              "href": "https://developers.cloudflare.com/workflows/",
              "external": true
            },
            " runs the longer jobs: checking image files, calling models within the approved limits and calculating scores. The database keeps the plan and attempt history; file storage holds the private images and original model responses."
          ]
        },
        {
          "kind": "p",
          "text": "Approval applies to a specific plan: the reference answers, models, instructions, attempt limits and budget. If a request might already have reached a model, retrying must not quietly send it twice. It must not swap models or reuse an old answer either. Failed calls and unsure answers remain visible. Publishing the summary is a separate owner decision."
        },
        {
          "kind": "rich-p",
          "parts": [
            "The same records are available through authenticated ",
            {
              "label": "Model Context Protocol (MCP)",
              "href": "https://modelcontextprotocol.io/docs/getting-started/intro",
              "external": true
            },
            ", which lets an external agent use the platform’s tools. The coordinator cannot approve spending, finalize human reference answers or publish results. It can help run the work without controlling the answers it will be measured against."
          ]
        }
      ]
    },
    {
      "heading": "What the research changed",
      "blocks": [
        {
          "kind": "p",
          "text": "The early runs gave me useful negative results: a learned head did not beat a simple baseline, apparently reviewed labels were not independent human evidence, and tool access did not automatically mean reliable autonomous inspection. Each changed what I built next."
        },
        {
          "kind": "p",
          "text": "In September, those command-line steps became a public site, a reviewer app and an agent-assisted workspace. The new Montréal benchmark still needs independent reviews and a finalized reference before its first research results. Small operational checks show that jobs can run through the system; they do not establish model performance."
        },
        {
          "kind": "p",
          "text": "For a team considering vision models, the value is being able to ask a precise question and inspect the answer: which images, which labels, which mistakes, and under which conditions? My work connects the collection system and experiments to the interface another person uses to make that judgment."
        },
        {
          "kind": "rich-p",
          "parts": [
            "The ",
            {
              "label": "method and current studies",
              "href": "https://www.portmind.dev/method",
              "external": true
            },
            " are public. I have also included ",
            {
              "label": "source notes for this case study",
              "href": "/research/portmind-evidence.md",
              "external": true
            },
            " with the dates, denominators and historical limitations behind the numbers."
          ]
        },
        {
          "kind": "rich-p",
          "parts": [
            "If you are building an evaluation system, applying models to a specific domain, or hiring a design engineer who works across research and implementation, ",
            {
              "label": "I’d be happy to talk",
              "href": "/contact"
            },
            "."
          ]
        }
      ]
    }
  ]
},
  {
  "slug": "diane-party-rentals",
  "number": "03",
  "title": "Diane Party Rentals",
  "dek": "A website and operating platform for a party rental company. Equipment, quotes, payments, and the work of getting everything there.",
  "summary": "Online bookings and payments, with agents handling the coordination behind each rental.",
  "evidence": "$5,032.66 gross payment volume · April–September 2026",
  "role": "Design engineer",
  "period": "March 2026–present",
  "scope": "Brand · Website · Booking · Operations",
  "featured": true,
  "links": [
    {
      "href": "https://www.dianepartyrentals.com/",
      "label": "Visit Diane Party Rentals",
      "external": true
    }
  ],
  "images": [
    {
      "src": "/images/case-studies/dpr-v2/work.png",
      "alt": "Diane Party Rentals work queue with delivery, supplier and purchase-order decisions"
    }
  ],
  "sections": [
    {
      "heading": "Where it started",
      "blocks": [
        {
          "kind": "p",
          "text": "Diane Party Rentals is a family-operated rental company in Frederick, Maryland. They reached out to me in March 2026 with a site on Wix’s free plan. Bookings and quotes were handled manually. Payments came in as cash, Cash App, Venmo or Zelle."
        },
        {
          "kind": "p",
          "text": "I started with the brand and assets, then designed and built the website, quote and payment flow, and the admin behind each booking. The work runs from how someone first encounters Diane to what the crew sees when it arrives at their event."
        }
      ]
    },
    {
      "heading": "Giving Diane an identity",
      "blocks": [
        {
          "kind": "p",
          "text": "Before the website, I worked on the identity in Paper: the diane wordmark, a D monogram, the type, colors and reusable assets. I wanted it to feel welcoming enough for a celebration and clear enough for an invoice."
        },
        {
          "kind": "p",
          "text": "Fraunces gives the name and headings their character. Cream and warm neutrals leave room for equipment photography; terracotta picks out the mark and actions. The smaller D works where the full name would be too much."
        },
        {
          "kind": "gallery",
          "images": [
            {
              "src": "/images/case-studies/dpr-story/brand-marks.png",
              "alt": "Diane brand system with light and dark wordmarks, D monograms and compact logo lockups"
            },
            {
              "src": "/images/case-studies/dpr-story/social.png",
              "alt": "Gold Chiavari chair social asset using the Diane wordmark, equipment image and price"
            }
          ],
          "caption": "The identity and one of its product assets, from Paper. The same pieces carry into the website, customer emails and documents."
        },
        {
          "kind": "p",
          "text": "I made product templates for Instagram and Facebook, alongside quotes, contracts, receipts and customer emails. These are often the things a customer keeps or forwards. They needed to feel like they came from the same company as the website."
        }
      ]
    },
    {
      "heading": "Choosing what to rent",
      "blocks": [
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/dpr-landing.png",
            "alt": "The website, with the catalog and quote flow a click away.",
            "caption": "The website, with the catalog and quote flow a click away."
          }
        },
        {
          "kind": "p",
          "text": "Most customers arrive with an occasion in mind. A birthday, a wedding, a school event. I wanted the site to help them work out what they needed: which chairs, how many tables, whether delivery and setup were available. Equipment photographs do much of that work."
        },
        {
          "kind": "p",
          "text": "The location pages carry the same catalog into the areas DPR serves, with local delivery information. Schools and other institutions have their own path too. A purchase order comes with different questions from a birthday booking."
        }
      ]
    },
    {
      "heading": "From a quote to a paid booking",
      "blocks": [
        {
          "kind": "p",
          "text": "The old payment methods worked, but the booking lived elsewhere. Someone still had to connect the money to the event and keep track of what remained to be paid. Adding a checkout meant bringing those pieces together."
        },
        {
          "kind": "p",
          "text": "The customer reviews the equipment and dates, accepts the quote and follows the payment link. The payment then belongs to that booking, alongside its balance and receipt. The team has a record to return to when the customer calls."
        },
        {
          "kind": "rich-p",
          "parts": [
            {
              "label": "Stripe",
              "href": "https://stripe.com/payments",
              "external": true
            },
            " handles the online payment. By September 8, the dashboard records $5,032.66 in gross volume, $4,881.62 in net volume and 15 new customers across April–September 2026."
          ]
        },
        {
          "kind": "gallery",
          "images": [
            {
              "src": "/images/case-studies/dpr-stripe/gross.png",
              "alt": "Stripe gross volume: $5,032.66, April to September 2026"
            },
            {
              "src": "/images/case-studies/dpr-stripe/net.png",
              "alt": "Stripe net volume: $4,881.62, April to September 2026"
            },
            {
              "src": "/images/case-studies/dpr-stripe/customers.png",
              "alt": "Stripe new customers: 15, April to September 2026"
            },
            {
              "src": "/images/case-studies/dpr-stripe/payments.png",
              "alt": "Stripe payments overview: $5,116.93 succeeded; other displayed categories $0"
            }
          ],
          "caption": "Stripe, September 8, 2026. The volume and customer charts cover April–September; September is partial. The payments overview has its own total, with no date range shown."
        }
      ]
    },
    {
      "heading": "Getting everything there",
      "blocks": [
        {
          "kind": "p",
          "text": "With the customer’s booking and payment in one place, I followed the work into fulfillment. There is still a truck to load, a crew to assign and a customer waiting at the other end. A late pickup can affect the next delivery. A damaged table can leave tomorrow’s booking short."
        },
        {
          "kind": "p",
          "text": "That is where I spent most of the time on the admin. It opens on the work that needs a decision: a delivery conflict, a supplier reservation, a purchase order with the wrong quantity. Open an item and you are in the booking or request it belongs to. Work already under way and completed actions sit below it."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/dpr-v2/work.png",
            "alt": "The work view. Three decisions, with the ongoing work and receipts underneath.",
            "caption": "The work view. Three decisions, with the ongoing work and receipts underneath."
          }
        },
        {
          "kind": "p",
          "text": "Agents handle the checking and follow-through. A booking change starts a readiness check. A shortage starts sourcing. An unanswered request gets a follow-up. The team can ask a question about a record, but it does not need to ask for these checks to happen."
        }
      ]
    },
    {
      "heading": "Moving a delivery",
      "blocks": [
        {
          "kind": "p",
          "text": "Two customers need equipment at the same time. One has a fixed loading window; the other may be able to take delivery the evening before. That is a common sort of problem here, and solving it involves more than dragging a calendar entry."
        },
        {
          "kind": "p",
          "text": "The platform checks stock, crew and the vehicle, then prepares another window. The operator sees what changes, what stays put and the message the customer will receive. Approving sends the request. The appointment moves after the customer agrees and capacity is checked again."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/dpr-v2/readiness.png",
            "alt": "A Friday delivery frees the truck for Saturday’s fixed appointment. The Sunday pickup stays the same.",
            "caption": "A Friday delivery frees the truck for Saturday’s fixed appointment. The Sunday pickup stays the same."
          }
        },
        {
          "kind": "p",
          "text": "I kept those steps visible. A sent message is not an agreement. If someone changes the booking while a reply is coming back, the old approval needs another look. The record holds the conversation and the decision together, so the next person can pick it up."
        }
      ]
    },
    {
      "heading": "Finding thirty more chairs",
      "blocks": [
        {
          "kind": "p",
          "text": "DPR also brings in equipment from other suppliers. For larger setups, it hires temporary help. Both involve finding someone, checking availability, agreeing on terms and making sure they actually confirm."
        },
        {
          "kind": "p",
          "text": "For equipment, the agent starts with approved suppliers and researches alternatives when needed. It collects quantities, prices and collection terms in one request. A chair listed on a website stays unverified until the supplier confirms it is available for the date."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/dpr-v2/sourcing.png",
            "alt": "Thirty chairs to source. Confirmed quantities and prices sit beside the options that still need checking.",
            "caption": "Thirty chairs to source. Confirmed quantities and prices sit beside the options that still need checking."
          }
        },
        {
          "kind": "p",
          "text": "Availability requests and reminders can go out under the team’s policy. Committing money needs approval. If a supplier does not answer, the request stays open and the follow-up has a deadline. It does not disappear into an email thread."
        }
      ]
    },
    {
      "heading": "At the venue",
      "blocks": [
        {
          "kind": "p",
          "text": "The office view is only half of the handoff. The person unloading needs the venue, item count and setup instructions on a phone. I designed the mobile flow around that moment: check what arrived, take a photograph, record the condition and capture who accepted it."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/dpr-story/delivery-signoff.png",
            "layout": "phone",
            "alt": "Mobile delivery signoff with delivered item count, setup photo, condition notes, recipient and signature",
            "caption": "The delivery signoff keeps the physical handoff with the booking."
          }
        },
        {
          "kind": "p",
          "text": "Pickup and inspection continue the record. A missing chair or a damaged table needs evidence before it becomes a stock adjustment or a customer charge. The agent can gather the relevant records and flag the discrepancy; the crew still has to count and inspect the equipment."
        }
      ]
    },
    {
      "heading": "Keeping the context",
      "blocks": [
        {
          "kind": "p",
          "text": "A booking accumulates things: a quote, a payment, a purchase order, delivery photographs, a note about which gate to use. Those details need to travel with the work. The agent can find them, and the person checking its answer can open the source."
        },
        {
          "kind": "rich-p",
          "parts": [
            "I use ",
            {
              "label": "Eve",
              "href": "https://eve.dev/docs",
              "external": true
            },
            " to coordinate the agents and work that waits for a reply or approval. ",
            {
              "label": "Cloudflare Workers",
              "href": "https://developers.cloudflare.com/workers/",
              "external": true
            },
            " runs the application logic around the operational records. I keep prices, stock and permissions in that layer so every action passes the same checks, whether it starts with a person or an agent."
          ]
        },
        {
          "kind": "rich-p",
          "parts": [
            "I used ",
            {
              "label": "shadcn/ui",
              "href": "https://ui.shadcn.com/docs",
              "external": true
            },
            " for the interface, giving me established components to build on and more time for the behavior around them. Details open in sheets beside the current record, and a question stays with the work it concerns. Closing a sheet does not cancel the task. Coming back to it does not start the same action again."
          ]
        },
        {
          "kind": "p",
          "text": "The point is to give the team less to chase. A customer knows when to expect the delivery. A supplier has confirmed the extra chairs. The crew can see what needs loading. The useful work is in those details."
        },
        {
          "kind": "p",
          "text": "The design and engineering decisions are closely tied here. A delivery approval needs to show the customer’s message, but it also needs to notice if the booking changed while that message was being reviewed. I work through both sides of that interaction: what a person needs to understand, and what the system has to guarantee."
        },
        {
          "kind": "rich-p",
          "parts": [
            "If you’re hiring a design engineer or have an operational problem like this, ",
            {
              "label": "I’d be happy to talk",
              "href": "/contact",
              "external": false
            },
            "."
          ]
        }
      ]
    }
  ]
},
{
  "slug": "starthome",
  "number": "05",
  "title": "Starthome",
  "dek": "A rental inspection you can follow, and a record you can return to.",
  "summary": "Designing and building a Québec rental inspection app, from room-by-room photographs to reviewed observations and a shared report.",
  "evidence": "Product and engineering · Native mobile · 2026",
  "role": "Product design & engineering",
  "period": "February 2026–present",
  "scope": "Mobile app · Web admin · Inspection records",
  "featured": true,
  "links": [],
  "glance": [],
  "images": [
    {
      "src": "/images/case-studies/starthome-paper/home.png",
      "alt": "Starthome mobile home with an inspection ready to resume",
      "layout": "phone"
    }
  ],
  "sections": [
    {
      "heading": "A record of the apartment",
      "blocks": [
        {
          "kind": "p",
          "text": "Starthome helps property owners and managers in Québec document a rental’s condition. You walk through the apartment, take photographs and record what you see. When it is time to inspect it again, the earlier visit gives you a reference."
        },
        {
          "kind": "p",
          "text": "I started working on Starthome in February 2026. The founder came with the logo and an initial design already in place. My work spans product design and engineering: shaping the mobile inspection, building the application around it, and connecting the photographs, observations and signatures to the final report."
        }
      ]
    },
    {
      "heading": "Starting with Québec",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "The local rental context matters. ",
            {
              "label": "Article 1890 of Québec’s Civil Code",
              "href": "https://www.legisquebec.gouv.qc.ca/fr/version/lc/ccq-1991?code=se%3A1890",
              "external": true
            },
            " recognizes descriptions and photographs as ways to record a property’s condition. It also distinguishes ordinary wear from changes a tenant may need to answer for. That makes the detail of the record important: what was there at the beginning, what is visible now, and what someone actually checked."
          ]
        },
        {
          "kind": "p",
          "text": "I built the flow around entry and exit inspections, with the earlier inspection available as a reference. The French interface uses the language of the visit—logement, pièces, état des lieux. A photograph belongs to a room and an observation, so it can be understood later without the person who took it having to explain it."
        }
      ]
    },
    {
      "heading": "Keeping the visit moving",
      "blocks": [
        {
          "kind": "p",
          "text": "Someone inspecting an apartment is looking around, opening doors and talking to another person. The phone has to fit into that. I kept the founder’s identity and used its gold for the main action, with photographs and short lists doing most of the work."
        },
        {
          "kind": "p",
          "text": "The home screen brings the unfinished visit back into view: the address, rooms checked and observations still needing attention. Inside a room, adding photographs is the primary action. Analysis can run while the person continues the visit, and entering an observation manually stays within reach."
        },
        {
          "kind": "phones",
          "images": [
            {
              "src": "/images/case-studies/starthome-paper/home.png",
              "alt": "The unfinished visit stays in view, including what still needs checking.",
              "caption": "The unfinished visit stays in view, including what still needs checking.",
              "layout": "phone"
            },
            {
              "src": "/images/case-studies/starthome-paper/room.png",
              "alt": "Capture comes first. Photo analysis can continue in the background.",
              "caption": "Capture comes first. Photo analysis can continue in the background.",
              "layout": "phone"
            }
          ]
        },
        {
          "kind": "p",
          "text": "I also worked through the less convenient moments: a camera permission that has not been granted, a room that needs another photograph, a connection that drops. The offline flow separates photos saved on the device from work waiting for a connection. It gives someone a way to continue taking notes without implying that a report is already ready."
        }
      ]
    },
    {
      "heading": "Look, then confirm",
      "blocks": [
        {
          "kind": "p",
          "text": "Photo assistance is useful when it gives someone less to write and something specific to check. A proposed observation opens beside the entry and exit photographs. The person can enlarge them, change the condition, edit the wording or discard the suggestion."
        },
        {
          "kind": "p",
          "text": "I kept confirmation explicit. Marks on a floor may be ordinary wear; a photograph alone does not settle responsibility. The app asks the person on site to make the observation their own before it enters the reviewed record. If the evidence is insufficient, taking another photograph or writing a note remains part of the same flow."
        },
        {
          "kind": "phones",
          "images": [
            {
              "src": "/images/case-studies/starthome-paper/observation.png",
              "alt": "The photographs, condition and editable observation stay together.",
              "caption": "The photographs, condition and editable observation stay together.",
              "layout": "phone"
            },
            {
              "src": "/images/case-studies/starthome-paper/review.png",
              "alt": "A final review brings the observations back into one readable list.",
              "caption": "A final review brings the observations back into one readable list.",
              "layout": "phone"
            }
          ]
        },
        {
          "kind": "p",
          "text": "Before signatures, the review shows the rooms checked, photographs and confirmed observations. Each item leads back to its source. A change after signing requires another signature, so the review is a meaningful point in the visit."
        }
      ]
    },
    {
      "heading": "Finishing the handoff",
      "blocks": [
        {
          "kind": "p",
          "text": "The tenant will not always be standing beside the property manager. I designed separate paths for signing on the device, receiving an email invitation, being absent and declining to sign. Each leaves a clear status in the record."
        },
        {
          "kind": "phones",
          "images": [
            {
              "src": "/images/case-studies/starthome-paper/participation.png",
              "alt": "Tenant participation has its own paths, including absence and refusal.",
              "caption": "Tenant participation has its own paths, including absence and refusal.",
              "layout": "phone"
            },
            {
              "src": "/images/case-studies/starthome-paper/report.png",
              "alt": "The report shows what is ready and which participation is still pending.",
              "caption": "The report shows what is ready and which participation is still pending.",
              "layout": "phone"
            }
          ]
        },
        {
          "kind": "p",
          "text": "Those distinctions continue through the report. An invitation sent is different from a signature received. Generating the PDF is different from sharing it. The interface keeps those states visible, with the report available to open before sending a copy through the phone’s share sheet."
        }
      ]
    },
    {
      "heading": "Connecting the product",
      "blocks": [
        {
          "kind": "rich-p",
          "parts": [
            "I build the mobile app with ",
            {
              "label": "Expo",
              "href": "https://docs.expo.dev/",
              "external": true
            },
            ", alongside a web admin for organizations, teams and inspection oversight. ",
            {
              "label": "Cloudflare Workers",
              "href": "https://developers.cloudflare.com/workers/",
              "external": true
            },
            " runs the API, with D1 for records and R2 for photographs and documents. The report brings the room observations, photos and signatures together."
          ]
        },
        {
          "kind": "p",
          "text": "The interaction and the underlying record have to agree. A proposed observation needs a different state from a confirmed one. A tenant invitation needs a different state from a signature. Those are design decisions that carry through the API and into the PDF, not just labels on a screen."
        },
        {
          "kind": "rich-p",
          "parts": [
            "This is the kind of product work I enjoy: following a real task through the interface and the system behind it. If you are building something similar or hiring a design engineer, ",
            {
              "label": "I’d be happy to talk",
              "href": "/contact",
              "external": false
            },
            "."
          ]
        }
      ]
    }
  ]
},

]

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug)
}

export function featuredWork() {
  return work.filter((item) => item.featured)
}

export function caseStudies() {
  return work.filter((item) => !item.research)
}

export function researchWork() {
  return work.filter((item) => item.research)
}

export function adjacentWork(slug: string) {
  const index = work.findIndex((item) => item.slug === slug)
  return {
    prev: index > 0 ? work[index - 1] : null,
    next: index >= 0 && index < work.length - 1 ? work[index + 1] : null,
    index,
    total: work.length,
  }
}

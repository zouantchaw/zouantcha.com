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
    slug: 'mtl-archives',
    number: '01',
    title: 'MTL Archives',
    dek: 'I took 14,822 Montreal archive photos and made them searchable. Then I had to go find the people.',
    summary:
      'Ingested Montreal open data, cleaned and linked it, ran OCR and CLIP, then built search, a daily game, and an automated Instagram and Facebook pipeline on top.',
    evidence: '14,822 records · 2.66M social views · daily game',
    role: 'Full Stack Design Engineer',
    period: '2025–present',
    scope: 'Design · ETL · Search · Distribution',
    tools: 'Paper · Cloudflare Workers · D1 · R2 · Vectorize · CLIP · BGE-M3 · Tesseract · LLaVA · Meta Graph',
    featured: true,
    links: [
      { href: 'https://www.mtlarchives.com/', label: 'mtlarchives.com', external: true },
      {
        href: 'https://donnees.montreal.ca/dataset/phototheque',
        label: 'Montreal open data (aerial)',
        external: true,
      },
      {
        href: 'https://donnees.montreal.ca/ville-de-montreal/phototheque-archives',
        label: 'Montreal open data (photo archives)',
        external: true,
      },
      { href: 'https://github.com/zouantchaw/mtl-archives-search', label: 'Code', external: true },
      { href: 'https://instagram.com/mtlarchives', label: 'Instagram', external: true },
      { href: '/blog/clip-sees-bureaucracy', label: 'Related writing' },
    ],
    metrics: [
      { value: '14,822', label: 'Records after ingest and linkage' },
      { value: '97%', label: 'Source records with no real description' },
      { value: '2.66M', label: 'Instagram and Facebook page views, Jan-Jul 2026' },
      { value: '2,500+', label: 'Daily game players' },
    ],
    banner: {
      src: '/images/case-studies/mtl-archives-search.png',
      alt: 'MTL Archives explorer showing search results for tramway',
    },
    images: [
      {
        src: '/images/case-studies/mtl-archives-search.png',
        alt: 'MTL Archives explorer showing 47 search results for tramway',
      },
    ],
    sections: [
      {
        heading: 'How this started',
        blocks: [
          {
            kind: 'p',
            text: 'Montreal put a bunch of old photos on its open data portal. Street photos, aerial surveys, planning documents, index cards. I pulled them down and linked them up and ended up with 14,822 records.',
          },
          {
            kind: 'p',
            text: 'You still couldn\'t find anything unless you already knew the cote code, or you got lucky with a filename. About 97% of the records had no real description. Just a placeholder the city generated from the cote and a date. If you typed "church" or "street scene," you got nothing.',
          },
          {
            kind: 'p',
            text: 'I wanted people to be able to search it, play the daily game, maybe order a print. So I treated the whole mess like a product, even the parts of the data that were ugly.',
          },
        ],
      },
      {
        heading: 'Getting the photos to actually search',
        blocks: [
          {
            kind: 'p',
            text: 'The files are public, which is the nice part. I pulled them off donnees.montreal.ca through the CKAN API, 500 records at a time. Photographic archives first, then the aerial photothèque year by year from 1925 through 1975.',
          },
          {
            kind: 'p',
            text: 'Then I spent a long time matching a metadata row to a file that actually existed. Dead URLs. Titles that were just cote codes, like VM97,S3,D08,P298. The city portal only matched 109 of the 14,822 records. The rest I had to figure out myself.',
          },
          {
            kind: 'p',
            text: 'A lot of the useful text is printed on the photo. Index cards, survey stamps. I ran Tesseract in French and English and kept that as its own field. Then I captioned the images with LLaVA on a Lambda A100: 12,304 photos, 10.86 hours, $14. Those captions live in the manifest as a separate field. I didn\'t want a model sentence quietly replacing the original archive text.',
          },
          {
            kind: 'p',
            text: 'Search itself is a Cloudflare Worker. Metadata in D1, images in R2, about 153 GB. Two Vectorize indexes: BGE-M3 if you\'re searching with words, CLIP if you\'re searching with what the photo looks like. The Next.js site is just the front door. It calls the Worker. It doesn\'t own the search.',
          },
        ],
      },
      {
        heading: 'The site',
        blocks: [
          {
            kind: 'p',
            text: 'Nobody is going to type a cote. They\'ll type a street, or a neighborhood, or they\'ll show up from Instagram. So the explorer had to feel like something you\'d actually open. Bilingual. Quiet. Still looks like a record, not a stock photo site.',
          },
          {
            kind: 'figure',
            figure: { kind: 'artifact', id: 'mtl-system' },
          },
          {
            kind: 'p',
            text: 'You pick semantic or visual on purpose. There are neighborhood chips. On the record page I leave the cote and the geocode confidence sitting there, because pretending we\'re sure is worse. Search "tramway" right now and you get 47 photos.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/mtl-archives-search.png',
              alt: 'MTL Archives explorer showing 47 search results for tramway',
              caption: 'Searching tramway. 47 photos.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/mtl-archives-record.png',
              alt: 'MTL Archives record page for Avenue du Mont-Royal, 1928, with cote and geocode confidence',
              caption: 'A record page. I leave the cote and the confidence on it.',
            },
          },
          {
            kind: 'p',
            text: 'There\'s a daily location game on the same records. Prints go through Stripe, I still fulfill them by hand. I also built a 3D explorer over the CLIP space, which is how I noticed the model cared more about municipal borders than churches. I wrote that up separately.',
          },
        ],
      },
      {
        heading: 'Instagram and Facebook',
        blocks: [
          {
            kind: 'p',
            text: 'If nobody can find the site, I just have a database with a URL. So I made @mtlarchives and automated the daily post. The pipeline picks a photo, does a research pass, builds an Instagram carousel and a Facebook reel, writes a ledger so I don\'t post the same image twice, and publishes through the Meta Graph API.',
          },
          {
            kind: 'p',
            text: 'The two platforms want different posts, which I learned the hard way. On Instagram, carousels beat reels in Q1, about 5,131 average views versus 1,935. Leading with the place and the date worked. Parc Marquette, 1969, is still sitting at 20,727. Facebook only really moved when it was a reel with a French hook.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/mtl-social-facebook-views.svg',
              alt: 'Monthly Facebook page views for MTL Archives, January through July 2026, peaking in February',
              caption: 'Facebook, January through July 2026. February did 1.36 million views.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/mtl-social-instagram-views.svg',
              alt: 'Monthly Instagram page views for MTL Archives, January through July 2026',
              caption: 'Instagram over the same months. Smaller, and it held up better after Facebook dropped.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/mtl-social-facebook-reels.svg',
              alt: 'Top ten Facebook reels for MTL Archives by lifetime views',
              caption: 'Top Facebook reels. First bar is the one about the park with 70,000 graves under it.',
              layout: 'wide',
            },
          },
        ],
      },
      {
        heading: 'What actually happened',
        blocks: [
          {
            kind: 'p',
            text: 'I kept the Meta and Vercel exports so I wouldn\'t be guessing. January through July 2026: 2.37 million Facebook page views, 290 thousand Instagram, 2.66 million combined. February was the crazy month, 1.36 million Facebook views. January 26 and January 31 were more than half of January by themselves.',
          },
          {
            kind: 'p',
            text: 'Views didn\'t turn into visits the way you\'d hope. Seven months: 2,456 people on the site, 13,783 page views. Link clicks from Meta were tiny next to the view counts. The people who did show up used /search, which was a relief. The game is at 2,500+ players.',
          },
        ],
      },
      {
        heading: 'What I took from it',
        blocks: [
          {
            kind: 'p',
            text: 'Publishing a dataset doesn\'t make it searchable. This only started working after I cleaned it, ran OCR, captioned it, and put two embedding indexes on it.',
          },
          {
            kind: 'p',
            text: 'And posting can\'t be a blank page every morning, and it can\'t be the same caption on both apps. Facebook will do a million views in a month and still send almost nobody to the archive. What stuck is search, the game, and the record page.',
          },
        ],
      },
    ],
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
          "text": "The most important finding came from the labels. The audit found that every row in the historical locked set had been reviewed by Codex, OpenAI’s coding agent, even though the files used human-review field names. The files passed their format checks. Their names still overstated the evidence."
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

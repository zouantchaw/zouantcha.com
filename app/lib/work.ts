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
    slug: 'portmind',
    number: '02',
    title: 'PortMind',
    dek: 'This one is still in progress. I\'m building a benchmark for port AI off public Montreal cameras.',
    summary:
      'Ongoing research. Port Observatory MTL is the live capture. PortMind is the factory on that record: labels, held-out splits, and model comparison.',
    evidence: '81k snapshots · locked 350-row test · SigLIP 0.65 · ongoing research',
    role: 'Full Stack Design Engineer',
    period: '2026–present',
    scope: 'Capture · Dataset · Labels · Benchmark · Brand',
    tools: 'Cloudflare Workers · D1 · R2 · DETR · LLaVA · SigLIP · Grok 4.5 · Mistral Small · Python · Reviewer portal',
    featured: true,
    research: true,
    links: [
      {
        href: 'https://www.port-montreal.com/en/the-port-of-montreal/news/news/visibility-data',
        label: 'Where the idea started',
        external: true,
      },
      { href: '/slides', label: 'Research notes and slides' },
    ],
    metrics: [
      { value: 'Ongoing', label: 'Still research. I haven\'t shipped this.' },
      { value: '81,200', label: 'Webcam snapshots, six Montreal cameras' },
      { value: '0.65', label: 'Best held-out macro F1 on container-truck, frozen SigLIP' },
      { value: '0', label: 'Independent-human gold rows in locked v1' },
    ],
    banner: {
      src: '/images/case-studies/portmind-reviewer-task.png',
      alt: 'PortMind reviewer labeling a port webcam frame',
    },
    images: [
      {
        src: '/images/case-studies/portmind-reviewer-task.png',
        alt: 'PortMind reviewer labeling a port webcam frame with scene-decision options',
      },
    ],
    sections: [
      {
        heading: 'How this started',
        blocks: [
          {
            kind: 'p',
            text: 'The Port of Montreal announced a $6.6 million data visibility project for 2027. Terminals, rail, shipping lines, all supposed to share what\'s happening in real time. I got curious what you could already get from stuff that\'s public.',
          },
          {
            kind: 'p',
            text: 'That\'s Port Observatory MTL. Live map, AIS, schedules, the public webcams. PortMind is the thing I\'m still building on top of that capture: labels, splits, scores. It\'s research. I haven\'t shipped a product here, and I haven\'t locked the brand either.',
          },
          {
            kind: 'p',
            text: 'I don\'t care if a detector looks good in a screenshot. I care if it\'s any good on a Montreal gate in January, and whether I can trust the labels I scored it on.',
          },
        ],
      },
      {
        heading: 'First I had to record the port',
        blocks: [
          {
            kind: 'p',
            text: 'Six cameras. A Cloudflare Worker grabs a JPEG every three minutes, dumps it in R2, writes a row in D1. AIS on the same timeline. Public site is Next.js, English and French, MapLibre on the map.',
          },
          {
            kind: 'p',
            text: 'July 9, 2026 I took inventory: 81,200 snapshots since January 28, 199,214 objects in R2, 36.7 GB. DETR ran on 66,132 frames. I backfilled LLaVA on 15,068 of those for truck type. That\'s the collector guessing. It\'s not the eval.',
          },
        ],
      },
      {
        heading: 'The brand is still open',
        blocks: [
          {
            kind: 'p',
            text: 'I\'m also still deciding what PortMind even looks like. I\'m in Paper, drawing four marks, seeing what still reads at favicon size in one color on that labeling screen. That\'s just a constraint I gave myself. I haven\'t picked.',
          },
          {
            kind: 'p',
            text: 'Harbor loop, rhumbline, hull wake, cargo stack. One of them might be it. I don\'t know yet. Building the brand is part of the project, same as the labels. I\'m not going to pretend I already picked.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'artifact',
              id: 'portmind-marks',
              caption: 'Brand study. Four directions. I haven\'t locked one.',
            },
          },
        ],
      },
      {
        heading: 'The labeling screen',
        blocks: [
          {
            kind: 'p',
            text: 'If you\'re a reviewer, this is the screen you actually sit with. The original frame, a 3-by-3 grid, a confidence. No detector sitting next to the answer, because that just makes you agree with it. Camera, time, prior model output, all hidden.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/portmind-reviewer-task.png',
              alt: 'PortMind reviewer labeling a port webcam frame with scene-decision options',
              caption: 'The labeling task. You don\'t see what the model said.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/portmind-reviewer-grid.png',
              alt: 'PortMind reviewer inspection grid for a port operations scene',
              caption: 'The grid, for frames you can\'t read at full size.',
            },
          },
        ],
      },
      {
        heading: 'The numbers I\'ll actually stand behind',
        blocks: [
          {
            kind: 'p',
            text: 'The labels are picky on purpose. Is there a truck. Is it a container truck, or just a pickup. Is there a queue. Can you even use the frame. Quiet, normal, or busy. Parked container stacks don\'t count as a container truck. I wrote that down so people would stop arguing with the UI.',
          },
          {
            kind: 'p',
            text: 'Locked benchmark v1 is 1,744 labels: 1,175 train, 219 validation, 350 test. I fit on train and val. Test is report-only. I don\'t go fishing in the test errors for the next batch, because then it stops being a test.',
          },
          {
            kind: 'p',
            text: 'I should also tell you this: a later audit found every locked-v1 row had been stored as an agent review. Independent-human gold rows: zero. So the table below is a diagnostic on a locked split. It\'s not two humans agreeing.',
          },
          {
            kind: 'p',
            text: 'July 9, 2026. Frozen SigLIP nearest-centroid against a linear head on frozen embeddings. My promotion floor is 0.70 macro F1. Nothing cleared it. The linear head looked great on validation, 0.86, and then did 0.64 on test. SigLIP held at 0.65. I\'m publishing the 0.65.',
          },
          {
            kind: 'table',
            table: {
              columns: ['Task', 'Val F1', 'Test F1', 'Test acc.'],
              rows: [
                ['Container truck', '0.86 / 0.85', '0.64 / 0.65', '0.65 / 0.65'],
                ['Truck present', '0.61', '0.62', '0.70'],
                ['Queue present', '0.54', '0.54', '0.60'],
                ['Scene activity', '0.48', '0.40', '0.41'],
                ['Image quality', '0.34', '0.29', '0.68'],
              ],
              footnote:
                'Locked benchmark v1, 350-row test, macro F1. Where two numbers appear, linear head is first and frozen SigLIP is second. Test is report-only.',
            },
          },
        ],
      },
      {
        heading: 'I also tried models as labelers',
        blocks: [
          {
            kind: 'p',
            text: 'I ran models as labelers too, but I don\'t let them become the answer. Grok 4.5, on a 72-row hard packet, caught 12 of 29 container-truck misses Codex had made, and it didn\'t invent container trucks on the decidable negatives. Still report-only. A person has to adjudicate.',
          },
          {
            kind: 'p',
            text: 'I also ran a 24-row open-model pass on the same packet I used to qualify a second human: Llama 3.2 Vision, LLaVA 1.5, Moondream 3.1, Llama 4 Scout, Mistral Small 3.1. Calibration, not the locked score. Mistral Small looked good on 23 rows. I\'m not promoting a model off 23 rows.',
          },
          {
            kind: 'p',
            text: 'The second human finished all 24 calibration tasks and didn\'t qualify. 9 of 16 known-answer scene controls. They were consistent when they saw the same image twice, they just hadn\'t learned the rule. Gold is two people who passed the gate. Not a model that sounds sure.',
          },
          {
            kind: 'table',
            table: {
              columns: ['Labeler', 'n', 'Truck', 'Container truck'],
              rows: [
                ['Human reference', '72', 'Reference', 'Reference'],
                ['Codex, first pass', '72', '58.8%', '43.1%'],
                ['Grok 4.5 + grid', '72', '77.6%', '67.2%'],
                ['Llama 3.2 Vision', '24', '95.7%', '82.6%'],
                ['LLaVA 1.5', '24', '100%', '82.6%'],
                ['Moondream 3.1', '24', '100%', '78.3%'],
                ['Llama 4 Scout', '24', '26.1%', '91.3%'],
                ['Mistral Small 3.1', '24', '100%', '87.0%'],
              ],
              footnote:
                '72-row numbers are agreement against a human relabel, excluding abstentions. 24-row numbers are open-model calibration, not locked benchmark v1.',
            },
          },
        ],
      },
      {
        heading: 'What I took from it',
        blocks: [
          {
            kind: 'p',
            text: 'If you look at the model before you lock the labels and the scoring rules, you will talk yourself into whatever the UI is showing. Agent labels are useful as a first pass. They\'re not gold.',
          },
          {
            kind: 'p',
            text: 'I\'d rather put 0.65 on a page, name the camera it fails on, and say the reviewer didn\'t qualify. That\'s why this is still research. Next step is better labels, not a bigger number.',
          },
        ],
      },
    ],
  },
  {
    slug: 'diane-party-rentals',
    number: '03',
    title: 'Diane Party Rentals',
    dek: 'A rental shop in Frederick that used to quote by hand on a free Wix site. Bookings take about 20 minutes now, and someone picks up at 9pm.',
    summary:
      'Chairs, tables, tents, bounce houses. Leads, quotes, bookings, inventory, payments, and an AI call center for nights and weekends.',
    evidence: '24h → 20 min · After-hours Vapi · Inventory on-hand counts',
    role: 'Full Stack Design Engineer',
    period: '2025–present',
    scope: 'Design · Ops · Inventory · Voice',
    tools: 'Paper · Next.js · Cloudflare · D1 · Stripe · Vapi',
    featured: true,
    metrics: [
      { value: '24h → 20 min', label: 'Quote and booking turnaround' },
      { value: 'Nights + weekends', label: 'Vapi answers the business line after hours' },
      { value: 'On-hand', label: 'Inventory counts and date locks before a date is promised' },
    ],
    links: [{ href: 'https://www.dianepartyrentals.com/', label: 'dianepartyrentals.com', external: true }],
    banner: {
      src: '/images/case-studies/dpr-admin-inventory.png',
      alt: 'Diane Party Rentals inventory with on-hand counts',
    },
    images: [
      {
        src: '/images/case-studies/dpr-admin-inventory.png',
        alt: 'Diane Party Rentals inventory with on-hand counts for tables, chairs, and bounce houses',
      },
    ],
    sections: [
      {
        heading: 'How this started',
        blocks: [
          {
            kind: 'p',
            text: 'Diane Party Rentals is a rental shop in Frederick, Maryland. Chairs, tables, tents, bounce houses. They deliver around the DMV.',
          },
          {
            kind: 'p',
            text: 'When I showed up, the public site was a free Wix account. Everything behind it was manual. Check the floor, write the quote, call back. Something that came in at 9pm sat until morning. Weekends went to voicemail.',
          },
        ],
      },
      {
        heading: 'It wasn\'t the website',
        blocks: [
          {
            kind: 'p',
            text: 'I looked at other rental shops in the area. Same story almost everywhere. Wix or Squarespace, Facebook DMs, a quote that took a day, a phone that died after hours. The busy-looking shops had the same delay.',
          },
          {
            kind: 'p',
            text: 'The landing page wasn\'t the bottleneck. Quoting and booking were.',
          },
          {
            kind: 'figure',
            figure: { kind: 'artifact', id: 'dpr-system' },
          },
          {
            kind: 'figure',
            figure: { kind: 'artifact', id: 'dpr-social' },
          },
        ],
      },
      {
        heading: 'Inventory first',
        blocks: [
          {
            kind: 'p',
            text: 'You can\'t promise a bounce house that\'s already out, or 80 chairs you don\'t have. It\'s not a t-shirt. So the admin checks inventory first: what\'s on hand, what\'s free that date, the rate, whether you\'re about to run out.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/dpr-admin-inventory.png',
              alt: 'Diane Party Rentals inventory with on-hand counts for tables, chairs, and bounce houses',
              caption: 'Inventory. You look here before you promise a date.',
            },
          },
          {
            kind: 'p',
            text: 'People can still request a quote on the public site. It just lands in the same queue instead of a spreadsheet. Staff lock the inventory, confirm the booking, take the deposit, all from one screen. Schools and churches can do a purchase order if they don\'t want to put a card down.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/dpr-admin-bookings.png',
              alt: 'Diane Party Rentals admin bookings workspace with confirmed and pending events',
              caption: 'Bookings. Confirmed and pending on the same list.',
            },
          },
        ],
      },
      {
        heading: 'Nights and weekends',
        blocks: [
          {
            kind: 'p',
            text: 'After hours and on weekends, a Vapi assistant picks up the business line. It can take intake, look up a booking, log a change, then drop a transcript into the same queue the office uses.',
          },
          {
            kind: 'p',
            text: 'The Worker creates the lead. Voice isn\'t allowed to quietly finalize a priced quote. A Saturday night call used to sit on voicemail until Monday. Now it\'s already in the queue when they open.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/dpr-admin-calls.png',
              alt: 'Diane Party Rentals admin call center listing after-hours Vapi inbound calls',
              caption: 'The call log. After-hours stuff lands here instead of voicemail.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/dpr-admin-call-detail.png',
              alt: 'After-hours Vapi call that captured a Saturday bounce-house quote request',
              caption: 'Saturday night. Already in the queue.',
            },
          },
        ],
      },
      {
        heading: 'What changed',
        blocks: [
          {
            kind: 'p',
            text: 'Public site, quote builder, and admin all hit one Cloudflare Workers API. Inventory, quotes, bookings, payments, call records: D1. Stripe for deposits. Before anyone promises a date, the quote flow checks on-hand stock and date locks, same check the desk sees.',
          },
          {
            kind: 'p',
            text: 'Turnaround went from about 24 hours to about 20 minutes. That\'s the number I actually care about. Not page views. How long a family or a school waits before the date is held.',
          },
        ],
      },
      {
        heading: 'What I took from it',
        blocks: [
          {
            kind: 'p',
            text: 'A prettier landing page on a process that still takes a day doesn\'t do much. What helped was inventory, covering nights and weekends, and getting a quote back in 20 minutes so the shop isn\'t depending on whoever happens to remember.',
          },
        ],
      },
    ],
  },
  {
    slug: 'ballerz-football-academy',
    number: '04',
    title: 'Ballerz Football Academy',
    dek: 'Soccer training in the DC area. There was no website and no admin when I started. I\'m rebuilding the admin around an agent now.',
    summary:
      'Youth soccer training across Maryland, DC, and Virginia. No website and no admin when I started. The work in development is Eve, an owner command center.',
    evidence: 'Built from zero · 7 DMV locations · $125 private / $75 group · Eve command center',
    role: 'Full Stack Design Engineer',
    period: '2024–present',
    scope: 'Scheduling · Payments · Ops · Agents',
    tools: 'Next.js · Cloudflare · Stripe · Eve',
    featured: true,
    metrics: [
      { value: '$125 / $75', label: 'Private session vs small-group, per 60 minutes' },
      { value: '7', label: 'Training locations across MD, DC, and VA' },
      { value: '50+', label: 'Athletes on the public site' },
      { value: 'From zero', label: 'No website and no admin when I started' },
    ],
    links: [
      {
        href: 'https://www.ballerzfootballacademy.com/',
        label: 'ballerzfootballacademy.com',
        external: true,
      },
    ],
    banner: {
      src: '/images/case-studies/bfa-admin-command-center.png',
      alt: 'Ballerz owner command center with Eve prompt',
    },
    images: [
      {
        src: '/images/case-studies/bfa-admin-command-center.png',
        alt: 'Ballerz owner command center with Eve prompt, four sessions today, and an operations queue',
      },
    ],
    sections: [
      {
        heading: 'How this started',
        blocks: [
          {
            kind: 'p',
            text: 'Ballerz is a soccer training business around Washington, DC. Private sessions, small groups, camps, clinics. Coaches with D1 backgrounds. Seven locations in Maryland, DC, and Virginia. Main field is Gaithersburg.',
          },
          {
            kind: 'p',
            text: 'There was no website and no admin when I started. Programs, bookings, payments, all living in chats and whatever tool was open that week. I needed somewhere to actually run sessions, families, coaches, and money. Not just a page listing the programs.',
          },
        ],
      },
      {
        heading: 'Getting it running',
        blocks: [
          {
            kind: 'p',
            text: 'I built the public site and the back office together. Registration, scheduling, parent and staff access, Stripe, package credits, bookings, sessions. Private is $125 an hour. Small group is $75. That\'s still what the live site sits on.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/bfa-admin-sessions.png',
              alt: 'Ballerz week schedule with private, group, goalkeeper, and assessment sessions',
              caption: 'The week. Private, group, goalkeeper, assessment.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/bfa-admin-programs.png',
              alt: 'Ballerz programs catalog with private, group, clinic, and assessment offerings',
              caption: 'Programs. This is what the public site still sells.',
            },
          },
        ],
      },
      {
        heading: 'What the owner still had to decide',
        blocks: [
          {
            kind: 'p',
            text: 'That got the business running. It didn\'t really shrink the owner\'s morning. What was left was judgment. What needs a decision today. Which session has no coach. Which payment failed. Which family needs a follow-up.',
          },
        ],
      },
      {
        heading: 'Eve, in development',
        blocks: [
          {
            kind: 'p',
            text: 'I\'m rebuilding the admin on Cloudflare. Workers API, D1 as the system of record, R2 for files. Public booking still goes through Stripe Checkout. The calendar is evidence. It\'s not the only place a session is true.',
          },
          {
            kind: 'p',
            text: 'Eve sits in the command center. It can read sessions, payments, exceptions, payroll over MCP. Writes still go through approval. So it can brief the day and hand you the exact record that needs a decision, without quietly changing payroll or a booking.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/bfa-admin-command-center.png',
              alt: 'Ballerz owner command center with Eve prompt, four sessions today, and an operations queue',
              caption: 'Command center. Eve briefs. A person still has to approve.',
            },
          },
          {
            kind: 'p',
            text: 'Payroll is on the same surface. Semi-monthly periods, a timesheet per coach, an exceptions queue, then you approve and export.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/bfa-admin-payroll.png',
              alt: 'Ballerz coach payroll with three semi-monthly pay periods and timesheets for two coaches',
              caption: 'Payroll. Periods, timesheets, then export.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/bfa-admin-payroll-exceptions.png',
              alt: 'Ballerz payroll exceptions queue with missing candidate, calendar conflict, duration, and attendance issues',
              caption: 'Exceptions. Missing coach, conflict, duration, attendance.',
            },
          },
        ],
      },
      {
        heading: 'What I took from it',
        blocks: [
          {
            kind: 'p',
            text: 'Without an admin, the business is a calendar and a Venmo thread. The public site sells the hour. Somebody still has to know who\'s on the field, who got paid, and which coach is owed.',
          },
        ],
      },
    ],
  },
  {
    slug: 'starthome',
    number: '05',
    title: 'Starthome',
    dek: 'Quebec banned the damage deposit. The inspection is how you prove anything at all.',
    summary:
      'Expo field app, Cloudflare Worker API, D1 and R2, bilingual PDFs, assistive AI that cannot become the record on its own.',
    evidence: 'Expo · Workers · pdf-lib · EN/FR · AI suggestions stay suggestions',
    role: 'Full Stack Design Engineer',
    period: '2026',
    scope: 'Mobile · API · Documents · i18n',
    tools: 'Paper · Expo · Cloudflare Workers · Hono · D1 · R2 · Better Auth · Stripe · pdf-lib · AI Gateway',
    featured: true,
    metrics: [
      { value: '1890', label: 'Civil Code: incoming condition by description or photographs, or the tenant is presumed to have received it in good condition' },
      { value: '1904', label: 'No security deposit. If you want money for damage, you claim it and you prove it' },
      { value: 'EN / FR', label: 'A French PDF cannot leak English legal copy' },
    ],
    links: [
      { href: 'https://starthome.ca/', label: 'starthome.ca', external: true },
      {
        href: 'https://www.legisquebec.gouv.qc.ca/en/version/lc/ccq-1991?code=se:1890&history=20251027&langCont=en',
        label: 'Civil Code art. 1890',
        external: true,
      },
      {
        href: 'https://www.legisquebec.gouv.qc.ca/en/version/lc/ccq-1991?code=se:1904&history=20251027&langCont=en',
        label: 'Civil Code art. 1904',
        external: true,
      },
      {
        href: 'https://www.tal.gouv.qc.ca/en/hearing/preparing-for-a-hearing',
        label: 'TAL: preparing for a hearing',
        external: true,
      },
    ],
    images: [
      {
        src: '/images/case-studies/starthome-mobile-home.png',
        alt: 'Starthome home screen on iPhone with inspections in progress, awaiting signature, and signed',
        layout: 'phone',
      },
    ],
    sections: [
      {
        heading: 'How this started',
        blocks: [
          {
            kind: 'p',
            text: 'A Quebec property manager came to me because the inspection apps they were looking at were built for somewhere else. Ontario checklists. US deposit walkthroughs. English-only PDFs. Five-star condition sliders. None of that maps to an état des lieux.',
          },
          {
            kind: 'p',
            text: 'They weren\'t trying to return a security deposit. Quebec makes that deposit illegal. They needed to walk a unit on a phone, in French, room by room, take photos, get signatures, and leave with a file they could keep. Later they needed the comparison: what changed between move-in and move-out. That file is the product. The app is how you get there.',
          },
        ],
      },
      {
        heading: 'Why Quebec is a different problem',
        blocks: [
          {
            kind: 'p',
            text: 'Most of North America treats a move-in inspection as a nice-to-have around a deposit. Quebec puts the incoming condition in the Civil Code, and it bans the deposit.',
          },
          {
            kind: 'p',
            text: 'Article 1890 is the one that matters for the photos. When the lease ends, the tenant has to return the dwelling in the condition they received it, minus aging, fair wear, and superior force. The condition can be established by a description the parties made, or by photographs they took. If you never established it, the tenant is presumed to have received the place in good condition.',
          },
          {
            kind: 'p',
            text: 'That presumption is why both sides want the file. If the unit wasn\'t actually good on day one and nobody photographed it, the tenant is on the hook for what was already there. If something actually got worse, the landlord still has to show the change. Photos aren\'t extra here. They\'re how 1890 says you prove the incoming state.',
          },
          {
            kind: 'p',
            text: 'Article 1904 is why the US apps don\'t transfer. The lessor may not exact any amount of money other than the rent, in the form of a deposit or otherwise. No security deposit. No key deposit. No last month sitting in an account. In New York or Florida the walkthrough exists so you can keep or return a deposit. In Ontario you at least have last month\'s rent. In Quebec, if you want money for damage, you claim it at the Tribunal administratif du logement. You prove it.',
          },
          {
            kind: 'p',
            text: 'TAL tells you what to bring. The applicant has to prove each allegation with documents and/or testimony. Photographs are on the official list, next to the lease and the invoices. Documents have to be clearly labeled and put in order so you can find them at the hearing. For a videoconference, a legible copy of all photos has to be in the file ten days before. That\'s the comparison PDF\'s actual job. Not a star rating. An exhibit index, paired photos, hashes, signatures.',
          },
          {
            kind: 'p',
            text: 'Electronic documents have their own rule. C-1.1 says the legal value of a technology-based document depends on preserving integrity through its life. That\'s why a locked inspection, a SHA-256 on every photo, and a signature bound to a source hash. If the file changes, they sign again.',
          },
          {
            kind: 'p',
            text: 'The rest of the Code sits around that. 1855: the tenant uses the place with prudence and diligence. 1856: nobody changes the form or destination of the dwelling during the lease. 1864: the landlord does the necessary repairs, the tenant does minor maintenance unless it\'s age or superior force. French is the working language. The lease form is mandatory. Default locale is French.',
          },
          {
            kind: 'table',
            table: {
              columns: ['', 'Quebec', 'Ontario / most of Canada', 'United States'],
              rows: [
                ['Tribunal', 'TAL', 'LTB or equivalent', 'Housing court / small claims'],
                ['Deposit', 'Illegal (1904). First month only.', 'Last month\'s rent is typical. Damage deposits usually not.', 'Security deposit. The walkthrough exists to keep or return it.'],
                ['Incoming condition', '1890: description or photographs. Otherwise presumed good.', 'Best practice. BC requires a condition report to claim the deposit.', 'State-by-state walkthrough. Photos are extra, not in a civil code.'],
                ['What you bring', 'Lease, labeled photos, invoices, a file in order.', 'Inspection report plus the deposit ledger.', 'Itemized damage list against the deposit.'],
              ],
              footnote: 'Not legal advice. 1890 and 1904 from Légis Québec. TAL evidence list from Preparing for a hearing.',
            },
          },
          {
            kind: 'p',
            text: 'So the software has a specific job. Produce a bilingual evidence record: rooms, conditions, photos next to the finding, who signed, when, and a hash so you can tell if the file got regenerated. It does not decide liability. It does not say it\'s an official document. It does not invent a seven-day window that counsel hasn\'t approved. It organizes what 1890 actually asks for: a description, photographs, and a comparison against what was received.',
          },
        ],
      },
      {
        heading: 'In the unit',
        blocks: [
          {
            kind: 'p',
            text: 'You\'re in a unit, on a phone, often in French. If nobody picked a language, it defaults to French. A wall is new, good, okay, or poor. Type, location, template, rooms, photos, signature. That\'s the walkthrough.',
          },
          {
            kind: 'figure',
            figure: { kind: 'artifact', id: 'starthome-system' },
          },
          {
            kind: 'phones',
            images: [
              {
                src: '/images/case-studies/starthome-mobile-splash.png',
                alt: 'Starthome splash screen on iPhone, gold roof mark on black',
                caption: 'Splash',
                layout: 'phone',
              },
              {
                src: '/images/case-studies/starthome-mobile-language.png',
                alt: 'Starthome language screen with English and French',
                caption: 'Language',
                layout: 'phone',
              },
              {
                src: '/images/case-studies/starthome-mobile-home.png',
                alt: 'Starthome home screen with this month, pending, and reports',
                caption: 'Home',
                layout: 'phone',
              },
              {
                src: '/images/case-studies/starthome-mobile-inspections.png',
                alt: 'Starthome inspections list with in progress, awaiting signature, and signed jobs',
                caption: 'Inspections',
                layout: 'phone',
              },
              {
                src: '/images/case-studies/starthome-mobile-detail.png',
                alt: 'Signed move-out inspection with room conditions and Share PDF',
                caption: 'Signed inspection',
                layout: 'phone',
              },
            ],
          },
          {
            kind: 'p',
            text: 'The phone has to keep working while the network, billing, and AI jobs do their own thing. Photos and draft edits queue on the device. If those queues are still pending or failed, the report doesn\'t generate. I don\'t want a PDF that\'s missing half the photos.',
          },
        ],
      },
      {
        heading: 'The PDF is the actual product',
        blocks: [
          {
            kind: 'p',
            text: 'An inspection isn\'t a photo dump. Quebec templates 1.5 through 6.5 expand into rooms and findings so you\'re not inventing the checklist in the hallway. A 3.5 is living room, kitchen, bedroom, bathroom. A kitchen already has walls, floor, cabinets, counters, sink, appliances.',
          },
          {
            kind: 'p',
            text: 'Still photos are the real evidence, which is what 1890 is talking about. You can do a short video sweep to help, six seconds, four frames max, but those frames don\'t count until someone picks them. Anything that looks like an ID gets rejected. The Worker builds the PDF with pdf-lib. Owner or property manager has to sign or there is no report. Tenant signature is optional. A French PDF is not allowed to leak the English notice. If the photos aren\'t in R2, it just doesn\'t generate.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/starthome-report.png',
              alt: 'French move-out état des lieux: parties, dates, and a room-by-room constats table with exhibit numbers',
              caption: 'Page 1. Identification and constats, like a TAL exhibit list. Not a dashboard.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/starthome-report-photos.png',
              alt: 'Move-out photograph exhibits P-1 to P-5 with SHA-256 hashes and in-person signature blocks',
              caption: 'Page 2. Numbered pièces, hashes, then signature lines. A person can tab this.',
            },
          },
          {
            kind: 'p',
            text: 'Move-out has to sit next to a locked move-in. That\'s the 1890 comparison: what they received versus what they handed back. The comparison PDF is a second artifact, the one you\'d actually tab and bring. Identification first. Then a list of pièces, like TAL-137A. Then paired photos for anything that needs a look, with a SHA-256 on every file, a capture time, and a GPS. Then signatures bound to a source hash so you can tell if the file got regenerated. It doesn\'t declare the tenant caused the damage. It doesn\'t call itself an official document. It flags what a person still has to review.',
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/starthome-comparison.png',
              alt: 'Comparison dossier cover with party identification, source hash, and numbered exhibit list',
              caption: 'Comparison, page 1. Two locked inspections, a source hash, and an exhibit index. The register is the list of pièces.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/starthome-comparison-photos.png',
              alt: 'Paired move-in and move-out photographs of the living room, plus close-ups of a nail hole and a ceiling humidity stain, each with a SHA-256',
              caption: 'Pièce 1, salon murs. Overview plus close-ups. Each shot has a time, GPS, and hash. The stain vs an 1864 leak is left for a person.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/starthome-comparison-kitchen.png',
              alt: 'Paired kitchen floor and bathroom silicone photographs, move-in versus move-out, marked for review',
              caption: 'Pièces 2 and 3. Kitchen scratches and bathroom mildew, both marked à vérifier. Wear versus tenant upkeep is not auto-decided.',
            },
          },
          {
            kind: 'figure',
            figure: {
              kind: 'image',
              src: '/images/case-studies/starthome-comparison-hashes.png',
              alt: 'Evidence appendix with SHA-256 for every photograph, plus signature lines bound to the source hash and the counsel notice',
              caption: 'Empreintes and signatures. Nine photos, nine hashes, two signature lines, counsel notice. If the file changes, they sign again.',
            },
          },
        ],
      },
      {
        heading: 'What the software is allowed to do',
        blocks: [
          {
            kind: 'p',
            text: 'One Cloudflare Worker, Hono, behind the Expo app and a Next.js admin. Same Better Auth login. Orgs have owner, admin, inspector. The inspection lives in D1 as JSON. Photos and PDFs in R2. Stripe for plans and checkout. Starter is the phone. The admin web isn\'t the field product.',
          },
          {
            kind: 'p',
            text: 'AI runs after you\'ve taken the photos, through Cloudflare Queues and AI Gateway. It can suggest a condition, a note, some evidence text. That goes into suggestion fields. The saved condition is still whatever the inspector typed or accepted.',
          },
          {
            kind: 'p',
            text: 'I kept the live path boring on purpose. One photo per Worker invocation, so a 15-photo room is 15 attempts, not one giant request that dies. On staging, a contact-sheet triage bench went from about 27 seconds to about 2. That\'s me testing the shape of the pipeline. It\'s not me claiming the PDF is court-ready because Gemini was fast.',
          },
        ],
      },
      {
        heading: 'What I took from it',
        blocks: [
          {
            kind: 'p',
            text: 'If the photos don\'t make it into the PDF, the field app is a toy. In Quebec you need the incoming description or photographs, or the tenant is presumed to have received the place in good condition. And because there\'s no deposit to hold, the file is the claim. Landlords need that file. Later they need the comparison.',
          },
          {
            kind: 'p',
            text: 'AI is only useful if the saved condition is still a person\'s call, and if a French file can\'t accidentally print the English notice.',
          },
        ],
      },
    ],
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

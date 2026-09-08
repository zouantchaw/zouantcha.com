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
  "slug": "ballerz-football-academy",
  "number": "04",
  "title": "Ballerz Football Academy",
  "dek": "The operations behind youth soccer training in the DMV: coach coverage, family requests, attendance and package credits.",
  "summary": "An operations workspace for sessions, family requests and reviewable agent actions.",
  "evidence": "Youth coaching · Maryland, DC & Virginia",
  "role": "Design & engineering",
  "period": "2023–present",
  "scope": "Operations · Scheduling · Credits · Public website",
  "tools": "Next.js · Cloudflare · D1 · Eve direction",
  "featured": true,
  "metrics": [],
  "links": [
    {
      "href": "https://www.ballerzfootballacademy.com/",
      "label": "Current live website",
      "external": true
    }
  ],
  "images": [
    {
      "src": "/images/case-studies/ballerz-craft/operations.jpg",
      "alt": "Ballerz operations workspace with sessions and prepared review items"
    }
  ],
  "sections": [
    {
      "heading": "Keep the coach on the field",
      "blocks": [
        {
          "kind": "p",
          "text": "Ballerz Football Academy provides private training, small groups, camps and clinics across Maryland, DC and Virginia. Jerry Zouantcha founded the academy. Behind the training are families changing plans, coaches moving between venues, attendance records and packages that need to add up."
        },
        {
          "kind": "p",
          "text": "I started this revision with those operations. A useful admin should make the day legible and bring the exceptions forward. It should not require the owner to ask a chat window whether something needs attention."
        }
      ]
    },
    {
      "heading": "The day is made of sessions",
      "blocks": [
        {
          "kind": "p",
          "text": "The schedule opens on one day, with separate columns for Jerry, Marcus and unassigned sessions. That last column makes the afternoon coverage gap visible. Coach filters and a week view provide a wider look; selecting a session opens its details without leaving the schedule."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/ballerz-craft/operations.jpg",
            "alt": "Ballerz day calendar organized by coach with an unassigned afternoon session",
            "caption": "The daily view keeps the training schedule and its exceptions together."
          }
        },
        {
          "kind": "p",
          "text": "Families, coaches, programs and credits have their own workspaces, but they share the same records and review pattern. A parent request can be followed back to the player and the affected session."
        }
      ]
    },
    {
      "heading": "Coverage is more than an empty calendar slot",
      "blocks": [
        {
          "kind": "p",
          "text": "For the coverage flow, I used an afternoon group whose coach is unavailable. A replacement needs the right availability and enough time to get to the next venue. The proposal includes those checks and the group it affects."
        },
        {
          "kind": "p",
          "text": "The owner can approve the next step, but that does not mean the replacement has accepted. The interface keeps that distinction visible. A family update is prepared alongside the coverage request and waits for the assignment to be confirmed."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/ballerz-craft/proposal.jpg",
            "alt": "Coach coverage proposal showing the existing gap, replacement and evidence",
            "caption": "Availability supports a proposal. Coach acceptance completes the assignment."
          }
        }
      ]
    },
    {
      "heading": "A calendar entry should not spend a credit",
      "blocks": [
        {
          "kind": "p",
          "text": "Attendance and package use need a more careful relationship. A calendar event marked complete does not prove that a player attended. In this flow, the calendar and the coach’s record disagree: one says finished, the other has no confirmation."
        },
        {
          "kind": "p",
          "text": "The interface holds the adjustment and asks for the missing evidence. It shows the confirmed balance and what remains unresolved. Decisions and corrections have a history, so the owner can see why a balance changed instead of finding only the final number."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/ballerz-craft/credits.jpg",
            "alt": "Attendance and credit review with a missing coach confirmation",
            "caption": "The missing record is visible before any credit adjustment."
          }
        },
        {
          "kind": "p",
          "text": "This follows the direction already established in the Eve branch: the operator works through business capabilities, while Cloudflare remains the source of truth for families, sessions, payments and credits. The interface makes those responsibilities understandable without exposing infrastructure details."
        }
      ]
    },
    {
      "heading": "One public system, including the local pages",
      "blocks": [
        {
          "kind": "p",
          "text": "The public redesign now extends through the location and regional pages, coaches, programs and registration surfaces. I kept the existing Ballerz logo after reviewing a replacement. The location content, canonical metadata and structured data stay intact."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/ballerz-craft/location.jpg",
            "alt": "Rockville training page with the original Ballerz logo",
            "caption": "The Rockville page uses the same public design system."
          }
        },
        {
          "kind": "p",
          "text": "These screens are implemented locally with controlled records. The proposed agent actions can be reviewed, recorded and revisited in the interface; connecting them to the Eve and Cloudflare execution paths is a separate integration step. No production booking, message, payment or credit was changed."
        }
      ]
    }
  ]
},
{
  "slug": "starthome",
  "number": "05",
  "title": "Starthome",
  "dek": "Designing the walkthrough, from the first photograph to the signed report.",
  "summary": "A closer look at the mobile interactions in Starthome: moving through a rental inspection, reviewing the evidence, and signing a record you can come back to.",
  "evidence": "Product and engineering · Native mobile · 2026",
  "role": "Product & Engineering Lead",
  "period": "2026 · Mobile redesign, September",
  "scope": "Product design · Native mobile · Inspection records",
  "featured": true,
  "links": [
    {
      "href": "#mobile-preview",
      "label": "An interaction from the app"
    },
    {
      "href": "/images/case-studies/starthome-redesign/sample-report.pdf",
      "label": "Example report · PDF",
      "external": true
    }
  ],
  "glance": [],
  "images": [
    {
      "src": "/images/case-studies/starthome-craft/home.jpg",
      "alt": "Starthome inspection workspace on iOS",
      "layout": "phone"
    }
  ],
  "sections": [
    {
      "heading": "Walking through Starthome",
      "blocks": [
        {
          "kind": "p",
          "text": "Starthome is an inspection app for property owners and managers in Québec. You walk through a rental unit, photograph what you see, and record its condition. At the next visit, you have something to compare it with. I work on both the product and the engineering."
        },
        {
          "kind": "p",
          "text": "The first mobile redesign connected the whole journey, but moving through it still felt like filling out a series of separate forms. Almost every action opened another page. The screens worked individually; there was less care in how one led to the next."
        },
        {
          "kind": "p",
          "text": "That became the focus of this pass. I wanted the app to be easier to follow while someone is occupied with the room around them. A small choice should feel small. An unfinished observation should be easy to return to. Signing should give you a reason to pause."
        }
      ]
    },
    {
      "heading": "Arriving in the room",
      "blocks": [
        {"kind":"p","text":"The welcome starts with a Montréal apartment. The first version used an illustration, which felt oddly distant from the work of looking at a real place. This version uses a generated image with points attached to the window, wall and floor. You can move the scene and open each point before starting the visit."},
        {"kind":"video","src":"/images/case-studies/starthome-craft/welcome.mp4","poster":"/images/case-studies/starthome-craft/welcome.jpg","caption":"Opening an inspection point, closing it and beginning onboarding. The apartment image is generated.","description":"A sunlit apartment fills the welcome. Tapping the wall marker reveals a short note inside the photograph. The note closes back into the room, then the start button opens account setup."},
        {"kind":"p","text":"Creating an account, signing in and exploring the demo stay together at the bottom. During testing, the sign-in link was slipping under the fixed action area. Moving it into that area made all three choices visible without scrolling."}
      ]
    },
    {
      "heading": "A little help, when you need it",
      "blocks": [
        {
          "kind": "p",
          "text": "Writing help used to occupy a large card beneath every observation, including when you had nothing to ask it. I moved it behind a single row. Tapping it brings up a short sheet while the photograph and condition remain visible underneath."
        },
        {
          "kind": "video",
          "src": "/images/case-studies/starthome-craft/finding-review.mp4",
          "poster": "/images/case-studies/starthome-craft/suggestion.jpg",
          "caption": "Opening writing help, returning to the finding, and confirming it. Recorded in the iOS app.",
          "description": "A sheet opens over the finding. It contains an example observation and an action to use it. Closing the sheet returns to the same photograph and condition. Confirming the finding returns to the room, where the completed count increases."
        },
        {
          "kind": "p",
          "text": "The wording comes back into the observation field, where it can still be changed. It does not confirm the finding for you. There is a useful distinction between accepting some help with a sentence and agreeing that the sentence accurately describes the photograph."
        },
        {
          "kind": "p",
          "text": "The sheet can be closed with its button, the space around it, or a downward drag on the handle. That last detail is small, but it is the sort of thing I expect when a surface appears from the bottom of my phone."
        }
      ]
    },
    {
      "heading": "The next thing to look at",
      "blocks": [
        {
          "kind": "p",
          "text": "An incomplete room originally ended with a disabled validation button. It told you that you could not continue, but left you to work out where to go. The action now opens the next unchecked element. When the room is complete, it becomes the action that validates the room."
        },
        {
          "kind": "p",
          "text": "Inside a finding, the first photograph gets enough space to actually look at. The condition labels stay in place as the selection moves between them. Extra photos and writing help remain available without taking over the screen."
        },
        {
          "kind": "p",
          "text": "I kept the existing roof mark, gold and typefaces. Most of the working surfaces are quieter now: a light background, a white surface for the current task, and gold reserved for the action or selected state. The welcome can spend a little more time on the apartment; checking the fourth door in a visit should be quick."
        }
      ]
    },
    {
      "heading": "Before you put your name on it",
      "blocks": [
        {
          "kind": "p",
          "text": "The review screen was the clearest example of something that worked without being useful enough. It listed room names and counts, then asked you to proceed to signatures. To read an observation, you had to leave the review and find it again."
        },
        {
          "kind": "figure",
          "figure": {
            "kind": "image",
            "src": "/images/case-studies/starthome-craft/review.jpg",
            "alt": "Starthome review screen with an expanded room showing photographs and the condition of each element.",
            "layout": "phone",
            "caption": "The room opens into its observations. Tap a finding to correct it."
          }
        },
        {
          "kind": "p",
          "text": "Now a room opens in place. Its photographs, conditions and notes sit together, with a direct path to edit anything that needs attention. The initial open room is one with a condition to examine, when there is one."
        },
        {
          "kind": "p",
          "text": "The signature screen offers drawing and a typed name in the same area. Changing methods clears the consent check, so it takes an explicit action to confirm the new choice. For the tenant, the next sheet records what actually happened: a signature on the device, a remote invitation, an absence or a refusal."
        }
      ]
    },
    {
      "heading": "After the visit",
      "blocks": [
        {
          "kind": "p",
          "text": "Finishing changes what you can do with the record. The report stays as it was signed. If you notice a mistake later, creating a corrected version keeps the original and opens a new, unsigned draft."
        },
        {
          "kind": "p",
          "text": "The same care needs to extend to the unremarkable parts: returning from a photo, finding a saved draft, running out of credits, closing a sheet without choosing anything. I have been walking those paths on the simulator as I build. They reveal problems that a collection of finished screenshots tends to hide."
        },
        {
          "kind": "p",
          "text": "This is still a local, French-first demo. The people and properties are examples; account creation, analysis, purchases and invitations are simulated. The app does generate and share a real PDF on the device. Field testing with property managers, real-device camera evaluation and production integration are the next pieces of work."
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

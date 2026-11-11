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

export type WorkImage = {
  src: string
  alt: string
  caption?: string
  layout?: 'phone' | 'wide'
}

export const workImageDimensions: Record<string, { width: number; height: number }> = {
  '/images/case-studies/meta/miron-reel-september-9.png': { width: 1040, height: 863 },
  '/images/case-studies/meta/facebook-february-2026.png': { width: 1040, height: 863 },
  '/images/case-studies/meta/instagram-february-2026.png': { width: 1040, height: 863 },
  '/images/case-studies/portmind-paper/logo-explorations.png': { width: 1440, height: 1040 },
  '/images/case-studies/portmind-paper/scene.png': { width: 1344, height: 525 },
  '/images/case-studies/portmind-paper/site.png': { width: 996, height: 2000 },
  '/images/case-studies/portmind-paper/review.png': { width: 1440, height: 1000 },
  '/images/case-studies/portmind-paper/workspace.png': { width: 1440, height: 900 },

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
  | { kind: 'mtl-shape' }
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
  ownership?: string
  tools?: string
  pdfDownload?: boolean
  featured?: boolean
  research?: boolean
  links?: WorkLink[]
  glance?: string[]
  metrics?: WorkMetric[]
  banner?: WorkImage
  images?: WorkImage[]
  contents?: { heading: string; title: string }[]
  sections: WorkSection[]
}

export const work: WorkItem[] = [
  {
    "slug": "mtl-archives",
    "number": "01",
    "title": "MTL Archives",
    "dek": "Montréal’s public photo archive, made searchable. The social accounts reached 2.66 million views in seven months. The website and the money did not follow.",
    "summary": "Montréal’s photo archive, made searchable. 2.66 million views on social.",
    "evidence": "13,499 photos in the archive · 2.66M social views, January–July 2026",
    "role": "Independent researcher, designer & engineer",
    "period": "2025–present",
    "scope": "Data pipelines · Search · Website · Social",
    "featured": true,
    "research": true,
    "links": [
      {
        "label": "Explore the archive",
        "href": "https://www.mtlarchives.com/",
        "external": true
      },
      {
        "label": "Source notes",
        "href": "/research/mtl-archives-evidence.md",
        "external": false
      }
    ],
    "sections": [
      {
        "heading": "The problem",
        "blocks": [
          {
            "kind": "p",
            "text": "I was browsing Montréal’s open data portal with no project in mind, and I found the city’s photo archive. Streets, aerial views, the city at different points in its history."
          },
          {
            "kind": "rich-p",
            "parts": [
              "The photos were public in the ",
              {
                "label": "open photographic archive",
                "href": "https://donnees.montreal.ca/ville-de-montreal/phototheque-archives",
                "external": true
              },
              " and the ",
              {
                "label": "aerial photothèque",
                "href": "https://donnees.montreal.ca/dataset/phototheque",
                "external": true
              },
              ". But to find one, you had to already know its title or its reference number. I wanted to search by what’s in the picture, so in October 2025 I started building."
            ]
          },
          {
            "kind": "p",
            "text": "The first thing I found was my own mistake. About 97% of my working records had descriptions that said almost nothing. My cleanup script had filled every blank with a title, a date and a reference. So the rows looked complete and the search had nothing to work with."
          },
          {
            "kind": "mtl-archive"
          }
        ]
      },
      {
        "heading": "What I built",
        "blocks": [
          {
            "kind": "p",
            "text": "A pipeline that downloads the city’s catalogues, matches each record to its image file, and keeps the archive reference attached. It reads the text printed on the photos, and a vision model writes a description. The city’s record, the text read off the photo and the generated description stay in separate fields, so you can always tell which is which."
          },
          {
            "kind": "mtl-pipeline"
          },
          {
            "kind": "p",
            "text": "The descriptions were written on a rented GPU. The first big run did 12,304 images in 10.86 hours and cost $14."
          },
          {
            "kind": "p",
            "text": "Search runs on CLIP, a model that turns pictures and text into numbers you can compare. Before switching to a newer model, SigLIP, I tested both on 500 images and 13 queries. CLIP scored 0.8269 and SigLIP scored 0.4484, so I kept CLIP."
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
              "footnote": "May 26, 2026 · 500 images, 13 queries. The expected matches came from category rules I generated, not from people judging the results."
            }
          },
          {
            "kind": "mtl-search"
          },
          {
            "kind": "rich-p",
            "parts": [
              "To see how the model had sorted the collection, I built an ",
              {
                "label": "explorer",
                "href": "https://explorer.mtlarchives.com/",
                "external": true
              },
              " with 14,715 points, one per photo. It showed the model was sorting by the look of the document as much as by the subject: plain aerial photos in one group, survey sheets with borders in another, index cards in a third."
            ]
          },
          {
            "kind": "mtl-shape"
          },
          {
            "kind": "rich-p",
            "parts": [
              "On top of that I built the website, in French and English, with a ",
              {
                "label": "daily game",
                "href": "https://www.mtlarchives.com/game",
                "external": true
              },
              " where you place a photo on the map, and print orders paid through Stripe that I fulfil by hand. I drew the identity in ",
              {
                "label": "Paper",
                "href": "https://app.paper.design/file/01KJT1EB3Z2N2FYHB3VDDBF496/01KJT1EB3ZN11EN8P6G678B9DZ",
                "external": true
              },
              "."
            ]
          },
          {
            "kind": "mtl-brand"
          }
        ]
      },
      {
        "heading": "What happened",
        "blocks": [
          {
            "kind": "p",
            "text": "To get people to the site, I posted the photos on Instagram and Facebook. A pipeline picked a photo each day, wrote the caption in both languages and built the reel or the carousel."
          },
          {
            "kind": "p",
            "text": "From January to July 2026 the two accounts got about 2.66 million views. February alone was 1,363,500 views on Facebook. By July, Facebook was down to 6,560 for the month."
          },
          {
            "kind": "mtl-audience"
          },
          {
            "kind": "figure",
            "figure": {
              "kind": "image",
              "src": "/images/case-studies/meta/facebook-february-2026.png",
              "alt": "Facebook February 1–28 results: 1.4M views and 447.1K viewers.",
              "caption": "Facebook, February 1–28, 2026, captured September 9. Meta rounds the total to 1.4M; the saved report has 1,363,500."
            }
          },
          {
            "kind": "p",
            "text": "The website got 13,783 page views in those same seven months. In February, with 1.36 million views on Facebook, Facebook counted 57 link clicks."
          },
          {
            "kind": "p",
            "text": "Facebook’s estimate of what all those views earned me was about $150. None of it was paid out, because I never finished the payout setup."
          },
          {
            "kind": "p",
            "text": "The site also had its own bill. Every time a photo was shown at a new size, Cloudflare resized it and I paid for that. In October, Meta’s AI crawler was hitting those photos about 5,000 times an hour, and my site tells bots not to go there. I blocked AI crawlers from the photos and it dropped to about 47 an hour. Now every size is made ahead of time."
          }
        ]
      },
      {
        "heading": "Where it is now",
        "blocks": [
          {
            "kind": "p",
            "text": "I rebuilt the site, and the new version went live on October 28, 2026. You can browse by neighbourhood, on a map, or through stories about one place."
          },
          {
            "kind": "p",
            "text": "I turned the social posting off and archived the old feed on November 4. A sample week in a new format, three reels and two carousels with their sources, is in review. Nothing goes out until I approve it."
          },
          {
            "kind": "rich-p",
            "parts": [
              "There is now something a local business can buy: a story about its own address, told with the city’s photos, for $750. It’s on the ",
              {
                "label": "partners page",
                "href": "https://www.mtlarchives.com/en/partners",
                "external": true
              },
              "."
            ]
          }
        ]
      },
      {
        "heading": "What’s still open",
        "blocks": [
          {
            "kind": "p",
            "text": "Views didn’t turn into visits, and visits didn’t turn into money. My exports can’t connect a post to a visit, a game or an order, so I can’t say which posts brought anyone back."
          },
          {
            "kind": "p",
            "text": "Whether a local business will pay for its own story is the next thing I’ll find out."
          },
          {
            "kind": "rich-p",
            "parts": [
              "The dates and limits behind these numbers are in the ",
              {
                "label": "source notes",
                "href": "/research/mtl-archives-evidence.md",
                "external": false
              },
              ". If you have a collection like this one, ",
              {
                "label": "I’d be happy to talk",
                "href": "/start",
                "external": false
              },
              "."
            ]
          }
        ]
      }
    ],
    "metrics": [
      {
        "value": "13,499",
        "label": "Photos in the archive · June 2026 audit"
      },
      {
        "value": "2.66M",
        "label": "Facebook + Instagram views · January–July 2026"
      }
    ],
    "contents": [
      {
        "heading": "The problem",
        "title": "The problem"
      },
      {
        "heading": "What I built",
        "title": "What I built"
      },
      {
        "heading": "What happened",
        "title": "What happened"
      },
      {
        "heading": "Where it is now",
        "title": "Now"
      },
      {
        "heading": "What’s still open",
        "title": "Still open"
      }
    ]
  },
  {
    "slug": "portmind",
    "number": "02",
    "title": "PortMind",
    "dek": "A study with one question: how few human labels does a small model need to spot trucks on a port camera? Thirteen experiments so far, with the pass mark written down before each one.",
    "summary": "How few hand-labelled photos does a small model need to spot trucks?",
    "evidence": "181,383 photos from six cameras · 13 experiments · $15.01 of compute",
    "role": "Independent researcher, designer & engineer",
    "period": "2026–present",
    "scope": "Data collection · Labelling · Experiments",
    "featured": true,
    "research": true,
    "links": [
      {
        "label": "Visit PortMind",
        "href": "https://www.portmind.dev/",
        "external": true
      },
      {
        "label": "Read the study",
        "href": "https://www.portmind.dev/study",
        "external": true
      }
    ],
    "sections": [
      {
        "heading": "The problem",
        "blocks": [
          {
            "kind": "p",
            "text": "I’ve been collecting photos from six cameras at the Port of Montréal since January 2026. By October 30 there were 181,383 of them."
          },
          {
            "kind": "p",
            "text": "I wanted a small model that could find the trucks in them. To train one you need labels, and a person drawing boxes around trucks is the slow, expensive part. So the question became: how few human labels are enough?"
          },
          {
            "kind": "p",
            "text": "“Enough” has a number. The model has to find at least 7 of 10 trucks, and at least 8 of 10 of its boxes have to be real trucks."
          }
        ]
      },
      {
        "heading": "The first version, and why I retired it",
        "blocks": [
          {
            "kind": "p",
            "text": "My first attempt was a benchmark for vision models, with 1,744 labelled images. Then I audited the labels. Every one of them had gone through an AI agent, even though the files used human-review field names. I checked 120 hard cases myself and disagreed with 72."
          },
          {
            "kind": "rich-p",
            "parts": [
              "So the scores built on those labels didn’t mean much. I took the old results down and started again with one question and stricter rules. The ",
              {
                "label": "notes on the first version",
                "href": "/research/portmind-evidence.md",
                "external": false
              },
              " are still here."
            ]
          }
        ]
      },
      {
        "heading": "What I built",
        "blocks": [
          {
            "kind": "p",
            "text": "A collector on Cloudflare that checks the cameras every three minutes and keeps each photo with its time and its source."
          },
          {
            "kind": "p",
            "text": "A private page where I draw the boxes myself, without seeing what any model said. Test photos are always boxed blind."
          },
          {
            "kind": "p",
            "text": "A bench of 100 practice photos, all labelled blind, that scores every model the same way, and a ledger that keeps every run."
          },
          {
            "kind": "p",
            "text": "And rules. Before each experiment I write down the question, the pass mark and the budget. I don’t move the pass mark after I see the result, and a failed run stays on the record. Each GPU session has a spending cap and a time limit, and the machine is shut down when it ends."
          }
        ]
      },
      {
        "heading": "What happened",
        "blocks": [
          {
            "kind": "p",
            "text": "Thirteen experiments so far. Two are on hold and eleven have been scored. Together they cost $15.01 in compute."
          },
          {
            "kind": "p",
            "text": "The first ones failed. Big models used as teachers missed the small, distant trucks. A small model trained on one camera did badly on another."
          },
          {
            "kind": "p",
            "text": "Twenty photos that I boxed by hand, from the camera I cared about, got the small model to about 55% of trucks found, with 70% of its boxes right."
          },
          {
            "kind": "p",
            "text": "Then I found a bug in my own setup. The strip I used to hide the camera’s timestamp was also hiding real trucks: 31 of 213 labelled trucks in the training photos and 83 of 596 in the bench. With a smaller mask the model found about two-thirds of the trucks, and about seven in ten boxes were right. That still missed the pass mark."
          },
          {
            "kind": "p",
            "text": "What worked was a big model as a teacher. I trained it on my 20 photos, let it box more photos from the same camera, and trained the small model on those too."
          },
          {
            "kind": "table",
            "table": {
              "columns": [
                "Training photos",
                "Score (F1)"
              ],
              "rows": [
                [
                  "20 boxed by hand",
                  "64.40%"
                ],
                [
                  "20 boxed by hand, trained just as long",
                  "67.47%"
                ],
                [
                  "20 by hand + 180 boxed by the teacher",
                  "75.45%"
                ],
                [
                  "20 by hand + 540 boxed by the teacher",
                  "78.47%"
                ],
                [
                  "20 by hand + 1,080 boxed by the teacher",
                  "78.78%"
                ]
              ],
              "footnote": "Experiments 11–13, November 11, 2026. F1 is one score that combines trucks found and boxes that are right. Each row is the median of three runs on the same 25 practice photos (313 trucks)."
            }
          },
          {
            "kind": "p",
            "text": "With 1,080 photos from the teacher, the small model found 77.96% of the trucks and 81.06% of its boxes were right. That clears the mark, but only just, and only on practice photos I had already used three times."
          },
          {
            "kind": "p",
            "text": "Ten hand-labelled photos plus the teacher’s boxes beat twenty hand-labelled photos alone."
          }
        ]
      },
      {
        "heading": "What’s still open",
        "blocks": [
          {
            "kind": "p",
            "text": "Everything above is one camera. The real exam is a camera the model has never seen, and I haven’t run it."
          },
          {
            "kind": "p",
            "text": "Nobody else has checked my labels yet. A second reviewer comes before the exam."
          },
          {
            "kind": "p",
            "text": "And the teacher is not good enough to check labels in my place. Against my boxes it scores 0.800, and the bar I set was 0.900."
          },
          {
            "kind": "rich-p",
            "parts": [
              "If you’re training a model on your own cameras or documents and want to know how many labels you really need, ",
              {
                "label": "I’d be happy to talk",
                "href": "/start",
                "external": false
              },
              "."
            ]
          }
        ]
      }
    ],
    "metrics": [
      {
        "value": "181,383",
        "label": "Photos from six cameras · as of October 30, 2026"
      },
      {
        "value": "$15.01",
        "label": "Compute for experiments 1–13 · estimated from machine time"
      }
    ]
  },
  {
    "slug": "ballerz",
    "number": "03",
    "title": "Ballerz Football Academy",
    "dek": "My brother runs a soccer training business. I did his website, the booking and the payments.",
    "summary": "My brother’s soccer academy: his website and the booking behind it.",
    "evidence": "Google rankings recorded November 8–9, 2026 · Cal.com scheduling · Stripe payments",
    "role": "Engineer & designer",
    "period": "2026",
    "scope": "Website · Booking & payments · Admin",
    "pdfDownload": false,
    "featured": true,
    "links": [
      {
        "label": "Academy website",
        "href": "https://www.ballerzfootballacademy.com",
        "external": true
      }
    ],
    "sections": [
      {
        "heading": "The problem",
        "blocks": [
          {
            "kind": "p",
            "text": "My brother runs a soccer training business in Maryland. Parents find a place like his by googling the service plus their town. Most businesses like his either pay for ads or just hope they show up."
          },
          {
            "kind": "p",
            "text": "Booking was the other half. A parent picks a session for a player, a coach has to be free, and the academy needs to know the spot is reserved and paid for. Group sessions, private training and prepaid credits each work differently."
          }
        ]
      },
      {
        "heading": "What I built",
        "blocks": [
          {
            "kind": "p",
            "text": "The website first. I started by using AI to really understand the business. Then I went through the competitors’ websites to see how they talk to parents and players, and how they write each page. After that I made a page for each town."
          },
          {
            "kind": "phones",
            "images": [
              {
                "src": "/images/case-studies/ballerz-craft/schedule.jpg",
                "alt": "Public Ballerz training schedule on a phone",
                "caption": "The public training schedule."
              },
              {
                "src": "/images/case-studies/ballerz-craft/session.jpg",
                "alt": "Public Ballerz session details on a phone",
                "caption": "Session details before booking."
              }
            ]
          },
          {
            "kind": "p",
            "text": "Then booking and payment. Cal.com does the scheduling and Stripe takes the card. A held seat, a payment and a calendar booking are three separate records. So if a payment arrives after a seat has expired, the booking goes to review. It doesn’t get lost, and a retry doesn’t create a second booking."
          },
          {
            "kind": "p",
            "text": "Parents get an account with their players and sessions, a clear status, and a way to cancel or reschedule. The academy gets an admin with the booking, the payment and the credits in one place."
          },
          {
            "kind": "p",
            "text": "There is also an assistant for the academy’s admin, built on Cloudflare’s Agents SDK. It can read the records and link to them. Anything that changes a booking or moves money waits for a person’s approval."
          }
        ]
      },
      {
        "heading": "What happened",
        "blocks": [
          {
            "kind": "p",
            "text": "On November 8, 2026 I searched Google for soccer training in five towns, with personalisation off, counting only the regular results. Ballerz was first for Gaithersburg, second for Rockville, second for Bethesda, third for D.C. and eighth for Germantown. I checked again on November 9 and the positions were the same."
          },
          {
            "kind": "rich-p",
            "parts": [
              "None of those are ads and nobody paid for those spots. Rankings move, so this is a record of two days. ",
              {
                "label": "The video shows the searches",
                "href": "https://www.instagram.com/reel/Dfh7roYhkpM/",
                "external": true
              },
              "."
            ]
          },
          {
            "kind": "p",
            "text": "A ranking is not a booking. I’m not publishing the academy’s booking numbers here."
          }
        ]
      },
      {
        "heading": "What’s still open",
        "blocks": [
          {
            "kind": "p",
            "text": "The newer Cal.com integration is going out in stages: one-to-one sessions first, then group sessions once the seat handling has been checked live."
          },
          {
            "kind": "p",
            "text": "Germantown was eighth."
          },
          {
            "kind": "rich-p",
            "parts": [
              "If you searched your service plus your town, how high would you rank? ",
              {
                "label": "Book a call",
                "href": "/start",
                "external": false
              },
              " and we’ll look."
            ]
          }
        ]
      }
    ],
    "metrics": [
      {
        "value": "#1",
        "label": "Google, “Gaithersburg soccer training” · November 8–9, 2026"
      },
      {
        "value": "4 of 5",
        "label": "Town searches where it was in the top three · November 8–9, 2026"
      }
    ]
  },
  {
    "slug": "diane-party-rentals",
    "number": "04",
    "title": "Diane Party Rentals",
    "dek": "My parents’ party rental company. I replaced manual quotes and scattered payments with online booking, then followed the work into delivery.",
    "summary": "Replacing a Wix site and manual payment tracking, then connecting rental bookings to inventory, suppliers and delivery.",
    "evidence": "Connected quotes, payments, bookings and operations.",
    "role": "Product design & engineering",
    "period": "March 2026–present",
    "scope": "Brand · Website · Booking · Operations",
    "featured": false,
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
            "text": "I started with the brand and assets, then designed and built the website, quote and payment flow, and the admin behind each booking."
          },
          {
            "kind": "p",
            "text": "The first change was a booking with its payment, balance and receipt in one place. The delivery and sourcing work below builds on that. I haven’t measured time saved for it yet."
          }
        ]
      },
      {
        "heading": "From a quote to a paid booking",
        "blocks": [
          {
            "kind": "p",
            "text": "The old payment methods worked, but the booking lived elsewhere. Someone still had to connect the money to the event and keep track of what remained to be paid."
          },
          {
            "kind": "p",
            "text": "The customer reviews the equipment and dates, accepts the quote and follows the payment link. The payment then belongs to that booking, alongside its balance and receipt. The team has a record to return to when the customer calls."
          },
          {
            "kind": "p",
            "text": "Stripe handles the online payment."
          }
        ]
      },
      {
        "heading": "Giving Diane an identity",
        "blocks": [
          {
            "kind": "p",
            "text": "I began with the wordmark, monogram and reusable assets in Paper. The same identity carries through the catalog, quotes, customer emails and delivery documents."
          },
          {
            "kind": "figure",
            "figure": {
              "kind": "image",
              "src": "/images/case-studies/dpr-story/brand-marks.png",
              "alt": "Diane wordmark and monogram variations",
              "caption": "One identity across the website and the documents a customer keeps."
            }
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
            "text": "Most customers arrive with an occasion in mind. A birthday, a wedding, a school event. I wanted the site to help them work out what they needed: which chairs, how many tables, whether delivery and setup were available."
          },
          {
            "kind": "p",
            "text": "The location pages carry the same catalog into the areas DPR serves, with local delivery information. Schools and other institutions have their own path too. A purchase order comes with different questions from a birthday booking."
          }
        ]
      },
      {
        "heading": "Getting everything there",
        "blocks": [
          {
            "kind": "p",
            "text": "Payments run in production. The delivery and sourcing work shown here is what I’m building and testing now, and I haven’t measured results for it yet. An agent prepares each decision and follows the approved work through. A request that was sent is not treated as confirmed."
          },
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
            "text": "Checks start from what happens in the business. A changed booking triggers a readiness check. A shortage opens sourcing. A request nobody answered stays due for follow-up. You can chat about a record, but routine work doesn’t wait for a chat."
          }
        ]
      },
      {
        "heading": "Moving a delivery",
        "blocks": [
          {
            "kind": "p",
            "text": "Two customers need equipment at the same time. One has a fixed loading window; the other may be able to take delivery the evening before."
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
              " for the interface. Details open in sheets beside the current record, and a question stays with the work it concerns. Closing a sheet does not cancel the task. Coming back to it does not start the same action again."
            ]
          },
          {
            "kind": "p",
            "text": "The point is to give the team less to chase. A customer knows when to expect the delivery. A supplier has confirmed the extra chairs. The crew can see what needs loading."
          },
          {
            "kind": "rich-p",
            "parts": [
              "If you have an operational problem like this, ",
              {
                "label": "I’d be happy to talk",
                "href": "/start",
                "external": false
              },
              "."
            ]
          }
        ]
      },
      {
        "heading": "What I would measure next",
        "blocks": [
          {
            "kind": "p",
            "text": "Next I’d measure quote turnaround, last-minute delivery changes, missing items at handoff, and how often the team has to chase a supplier or a customer. I’d compare those to the old way of working before claiming any time saved."
          }
        ]
      }
    ]
  }
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

import { BUILD_LOG_CONSENT, BUILD_LOG_PREVIEW } from './build-log-consent'

export const startCopy = {
  eyebrow: 'Software & AI Engineer',
  headline: 'Bring one workflow that costs you time.',
  body: 'Quotes, follow-ups, scheduling or posting. We look at how it runs today and where software or agents can help.',
  primaryCta: 'Book a 20-minute review',
  secondaryCta: 'See real builds',
  note: 'Start with one practical problem from your business.',
  workHeading: 'A real business workflow',
  moreWorkHeading: 'More work across software and AI',
  fieldNotesHeading: 'Weekly build log',
  fieldNotesBody: [
    "What I built, what worked, what broke, and the numbers. Public-data products and AI in my family's businesses, once a week.",
  ],
  fieldNotesCta: 'Join the build log',
  fieldNotesSuccess: BUILD_LOG_PREVIEW,
  consent: BUILD_LOG_CONSENT,
  preparationNote: 'Confirm your email to join.',
  workWithMeHeading: 'How working together starts',
  workWithMeBody:
    'We start with a 20-minute review of one workflow. If there is a useful project, I send a fixed-price setup proposal with the scope, the work you will review, and the price. Ongoing operation and support can follow when they are useful.',
  pricing: 'Typical setup: $3,000–$5,000. Ongoing operation and support: $1,500–$2,500 a month.',
  pricingNote: 'Your proposal confirms the scope, price and currency before work starts.',
  workWithMeCta: 'Book a 20-minute review →',
  projectIntroHref: 'https://cal.com/wielfried/intro',
}

export const startProof = [
  {
    slug: 'diane-party-rentals',
    title: 'Diane Party Rentals',
    problem: 'Connecting quotes, bookings, payments and team handoffs for a real rental business.',
    proof: 'Connected quotes, payments, bookings and operational handoffs.',
  },
  {
    slug: 'mtl-archives',
    title: 'MTL Archives',
    problem: 'Making thousands of historical Montréal records searchable and explorable.',
    proof: '2.66M combined Facebook/Instagram views · Jan–Jul 2026',
  },
  {
    slug: 'portmind',
    title: 'PortMind',
    problem: 'Building reproducible evaluation workflows for AI applied to real port operations.',
    proof: '81,202 activity snapshots across six cameras',
  },
] as const

import { BUILD_LOG_CONSENT, BUILD_LOG_PREVIEW } from './build-log-consent'

export const startCopy = {
  eyebrow: 'Software engineer, building with AI.',
  headline: 'Sharing what I make and learn.',
  body: 'I share the software I build and the things I figure out along the way, from my family’s businesses to my own projects.',
  primaryCta: 'Watch the work',
  secondaryCta: 'Join the build log',
  workCta: 'Work with me',
  currentBuildHeading: 'Now building: Avantvu.',
  currentBuildCta: 'Follow the build →',
  workHeading: 'Watch the work',
  fieldNotesHeading: 'Weekly build log',
  fieldNotesBody: [
    "A short email every Sunday at noon New York time: what I built with AI agents, what broke, and the numbers. From my family's businesses to the products I'm building.",
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

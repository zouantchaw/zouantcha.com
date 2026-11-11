import resume from '../../scripts/public-resume.json'
import { work } from './work'

export const frameExperience = resume.experience
export const frameCaseOrder = ['mtl-archives', 'portmind', 'ballerz', 'diane-party-rentals']
export const frameCases = frameCaseOrder.map(slug => work.find(item => item.slug === slug)).filter((item): item is typeof work[number] => !!item)
export const caseDescriptions: Record<string, string> = {
  'mtl-archives': 'Montréal’s photo archive, made searchable. 2.66 million views on social.',
  'ballerz': 'My brother’s soccer academy: his website and the booking behind it.',
  'diane-party-rentals': 'My parents’ rental business, followed from booking to the delivery truck.',
  portmind: 'How few hand-labelled photos does a small model need to spot trucks?',
}
export const frameNumbers = [
  { value: '3.5 years', mobileBody: 'Senior Full-Stack Engineer at Ethos', body: 'as Senior Full-Stack Engineer at Ethos.', source: 'MAY 2022 – NOV 2025 · RÉSUMÉ', href: '/resume.pdf', blue: false },
  { value: '2.66M', mobileBody: 'social views, MTL Archives, Jan–Jul 2026', body: 'Instagram and Facebook views for MTL Archives.', source: 'JAN – JUL 2026 · CASE STUDY', href: '/case-studies/mtl-archives', blue: true },
  { value: '13,499', mobileBody: 'archive photos made searchable', body: 'archive photos of Montréal made searchable by what’s in them.', source: 'MTL ARCHIVES · CASE STUDY', href: '/case-studies/mtl-archives', blue: false },
  { value: '#1', mobileBody: 'on Google for “Gaithersburg soccer training” · Nov 2026', body: 'on Google for “Gaithersburg soccer training”, for my brother’s academy. No ads.', source: 'NOV 2026 · SEARCH SCREENSHOT', href: 'https://www.instagram.com/reel/Dfh7roYhkpM/', blue: false },
]
export const frameProof = [
  { label: 'BALLERZ · MY BROTHER’S SOCCER ACADEMY', mobileLabel: 'BALLERZ · MY BROTHER’S ACADEMY', mobileBody: 'for “Gaithersburg soccer training” in November 2026. No ads.', value: '#1 on Google', body: 'for “Gaithersburg soccer training” in November 2026. No ads.', href: 'https://www.instagram.com/reel/Dfh7roYhkpM/', cta: 'Watch the video ↗', blue: true },
  { label: 'DIANE PARTY RENTALS · MY PARENTS', mobileLabel: 'DIANE PARTY RENTALS · MY PARENTS', mobileBody: 'Quotes, booking, inventory and Stripe payments in one place.', value: 'Quote to payment', body: 'Quotes, booking, inventory and Stripe payments in one place.', href: '/case-studies/diane-party-rentals', cta: 'Read the case study ↗', blue: false },
  { label: 'MTL ARCHIVES · MY OWN PRODUCT', mobileLabel: 'MTL ARCHIVES · MY OWN PRODUCT', mobileBody: 'on Instagram and Facebook in seven months.', value: '2.66M views', body: 'on Instagram and Facebook in seven months.', href: '/case-studies/mtl-archives', cta: 'Read the case study ↗', blue: false },
]
export const frameSteps = [
  { title: '1 · A 20-MINUTE CALL', body: 'You tell me where the time goes. I tell you if software would help.' },
  { title: '2 · A FIXED PRICE', body: 'One phase, one price, agreed before I start.' },
  { title: '3 · YOU USE IT', body: 'Then you decide if a next phase is worth it.' },
]
export const frameVideos = [
  { title: 'My brother’s soccer business on Google', href: 'https://www.instagram.com/reel/Dfh7roYhkpM/', image: '/media/videos/p1.webp', alt: 'Wiel showing the Ballerz result in a Google search', date: '1:19 · NOV 9' },
  { title: '2M views, about $150', href: 'https://www.instagram.com/reel/DfawBocuVN1/', image: '/media/videos/g1.webp', alt: 'Wiel explaining the revenue behind two million social views', date: '0:46 · NOV 6' },
]

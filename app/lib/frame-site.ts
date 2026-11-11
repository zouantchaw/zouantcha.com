import resume from '../../scripts/public-resume.json'
import { work } from './work'

export const frameExperience = resume.experience
export const frameCaseOrder = ['mtl-archives', 'portmind', 'ballerz', 'diane-party-rentals']
export const frameCases = frameCaseOrder.map(slug => work.find(item => item.slug === slug)).filter((item): item is typeof work[number] => !!item)
export const caseDescriptions: Record<string, string> = {
  'mtl-archives': 'Public photo records turned into visual search, a daily game and an editorial pipeline.',
  'ballerz': 'A website parents find on Google, and agents behind it.',
  'diane-party-rentals': 'My parents’ rental business, followed from booking to the delivery truck.',
  portmind: 'Checking whether vision models can be trusted on a real port camera.',
}
export const frameNumbers = [
  { value: '3.5 years', mobileBody: 'Senior Full-Stack Engineer at Ethos', body: 'as Senior Full-Stack Engineer at Ethos, owning storefront, point-of-sale and billing features.', source: 'MAY 2022 – NOV 2025 · RÉSUMÉ', href: '/resume.pdf', blue: false },
  { value: '2.66M', mobileBody: 'social views, MTL Archives, Jan–Jul 2026', body: 'Instagram and Facebook views for MTL Archives, a product of my own.', source: 'JAN – JUL 2026 · CASE STUDY', href: '/case-studies/mtl-archives', blue: true },
  { value: '13,499', mobileBody: 'archive photos made searchable', body: 'archive photos of Montréal made searchable by what’s in them.', source: 'MTL ARCHIVES · CASE STUDY', href: '/case-studies/mtl-archives', blue: false },
  { value: '#1', mobileBody: 'on Google for “Gaithersburg soccer training” · Nov 2026', body: 'on Google for “Gaithersburg soccer training”, for my brother’s academy. No ads.', source: 'NOV 2026 · SEARCH SCREENSHOT', href: 'https://www.instagram.com/reel/Dfh7roYhkpM/', blue: false },
]
export const frameProof = [
  { label: 'BALLERZ · MY BROTHER’S SOCCER ACADEMY', mobileLabel: 'BALLERZ · MY BROTHER’S ACADEMY', mobileBody: 'for “Gaithersburg soccer training”, with the website I built. No ads.', value: '#1 on Google', body: 'for “Gaithersburg soccer training”, with the website I built. No ads.', href: 'https://www.instagram.com/reel/Dfh7roYhkpM/', cta: 'Watch the 1-minute proof ↗', blue: true },
  { label: 'DIANE PARTY RENTALS · MY PARENTS', mobileLabel: 'DIANE PARTY RENTALS · MY PARENTS', mobileBody: 'Quotes, booking, inventory and Stripe payments in one flow.', value: 'Quote to payment', body: 'Quotes, booking, inventory and Stripe payments in one flow, then on to delivery.', href: '/case-studies/diane-party-rentals', cta: 'Read the case study ↗', blue: false },
  { label: 'MTL ARCHIVES · MY OWN PRODUCT', mobileLabel: 'MTL ARCHIVES · MY OWN PRODUCT', mobileBody: 'on Instagram and Facebook in seven months.', value: '2.66M views', body: 'on Instagram and Facebook in seven months, from a pipeline that posts on its own.', href: '/case-studies/mtl-archives', cta: 'Read the case study ↗', blue: false },
]
export const frameSteps = [
  { title: '1 · A 20-MINUTE CALL', body: 'You tell me where the time goes. I tell you honestly whether software helps.' },
  { title: '2 · A FIXED PRICE', body: 'One phase, one price, agreed before I start.' },
  { title: '3 · YOU USE IT', body: 'Then we decide together whether a next phase is worth it.' },
]
export const frameVideos = [
  { title: 'My brother’s soccer business on Google', href: 'https://www.instagram.com/reel/Dfh7roYhkpM/', image: '/media/videos/p1.webp', alt: 'Wiel showing the Ballerz result in a Google search', date: '1:19 · NOV 9' },
  { title: '2M views, about $150', href: 'https://www.instagram.com/reel/DfawBocuVN1/', image: '/media/videos/g1.webp', alt: 'Wiel explaining the revenue behind two million social views', date: '0:46 · NOV 6' },
]

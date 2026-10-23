export const watchCopy = {
  heading: 'Watch the work',
  intro: 'A few builds and case studies to show how I approach the work.',
}
export const watchItems = [
  { id: 'rental-text', category: 'Build', type: 'Short video', title: 'Giving rental customers a text option with AI', href: 'https://www.youtube.com/shorts/XTmeDJvt6fk', description: 'A rental enquiry becomes a quote the customer can review.' },
  { id: 'mtl-archives', category: 'Grow', type: 'Case study', title: 'MTL Archives: public data, search and distribution', href: '/case-studies/mtl-archives', description: 'The archive search product and the social experiments behind 2.66M views.' },
  { id: 'portmind', category: 'Research', type: 'Case study', title: 'PortMind: checking the benchmark', href: '/case-studies/portmind', description: 'Testing vision models against real port observations and checking the evidence behind the scores.' },
  { id: 'diane-party-rentals', category: 'Build', type: 'Case study', title: 'Diane Party Rentals: from quote to operations', href: '/case-studies/diane-party-rentals', description: 'Connecting quotes, payments, bookings and the work after checkout.' },
] as const

export const labCopy = {
  heading: 'Products and experiments',
  intro: "Public data turned into something a business can use. These are the products I'm working on.",
}
export const products = [
  { id: 'radar-evenements', name: 'Radar Événements', status: 'In progress', description: "Alerts from Québec's public event alcohol permits for rental companies, caterers, DJs and security firms. French first, with English alongside it." },
  { id: 'opening-soon', name: 'Opening Soon', status: 'Planned', description: 'New bar and restaurant licence records, organised for the vendors who supply them. Starting with Austin.' },
  { id: 'permitpost', name: 'PermitPost', status: 'Test', description: 'Residential permit signals for one local trade in Montgomery County, Maryland, with a postcard workflow to test.' },
] as const

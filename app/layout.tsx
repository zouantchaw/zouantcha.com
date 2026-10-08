import { shareImage } from './lib/metadata'
import './global.css'
import type { Metadata } from 'next'
import {
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Instrument_Serif,
} from 'next/font/google'
import './personal-index.css'
const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-index-sans',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-index-mono',
  display: 'swap',
})
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-index-serif',
  display: 'swap',
})

import { SiteAnalytics } from './components/site-analytics'
import { Nav } from './components/nav'
import Footer from './components/footer'
import { LocaleAttribute } from './components/locale-attribute'
import { SourceCapture } from './components/source-capture'
import { site } from './lib/site'
import { baseUrl } from './sitemap'

const defaultTitle = `${site.name} · ${site.title}`

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: baseUrl }],
  creator: site.name,
  alternates: { types: { 'application/rss+xml': `${baseUrl}/rss` } },
  openGraph: {
    title: site.name,
    description: site.socialDescription,
    url: baseUrl,
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
    images: [{ url: shareImage(site.name, site.title, 'Full-Stack Software Engineer'), width: 1200, height: 630, alt: `${site.name} | Full-Stack Software Engineer` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [shareImage(site.name, site.title, 'Full-Stack Software Engineer')],
    title: defaultTitle,
    description: site.socialDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(sans.variable, mono.variable, serif.variable)}
    >
      <body
        className={`${sans.className} min-h-screen bg-paper font-sans text-ink antialiased`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Person', '@id': `${baseUrl}/#person`, name: site.name, alternateName: site.formalName, url: baseUrl, jobTitle: 'Full-Stack Software Engineer', description: site.description, image: `${baseUrl}/images/wiel-avatar.jpg`, sameAs: [site.github, site.linkedin, site.x], email: `mailto:${site.email}` },
            { '@type': 'WebSite', '@id': `${baseUrl}/#website`, url: baseUrl, name: site.name, description: site.description, publisher: { '@id': `${baseUrl}/#person` } },
          ],
        }).replace(/</g, '\\u003c') }} />
        <LocaleAttribute />
        <SourceCapture />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" tabIndex={-1} className="site-main">
          {children}
        </main>
        <Footer />
        <SiteAnalytics />
      </body>
    </html>
  )
}

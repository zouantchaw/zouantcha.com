import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Nav } from './components/nav'
import Footer from './components/footer'
import { site } from './lib/site'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name}, ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name}, ${site.title}`,
    description: site.socialDescription,
    url: baseUrl,
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name}, ${site.title}`,
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
      className={cx(GeistSans.variable, GeistMono.variable)}
    >
      <head>
        <script
          async
          src="https://cdn.seline.so/seline.js"
          data-token="dfbe2e89cb93290"
        ></script>
      </head>
      <body className={`${GeistSans.className} min-h-screen bg-paper font-sans text-ink antialiased`}>
        <Nav />
        <main className="pt-8 pb-16 sm:pt-10">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

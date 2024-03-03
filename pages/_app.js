import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import Script from 'next/script'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Script
        defer
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.us-east.tinybird.co"
        data-token="p.eyJ1IjogImI0MDAxMWMyLWQ4NWYtNDFjZS1iYzYyLWI1ZjlkOWM5YWM1NSIsICJpZCI6ICIwYmUxNTNlZi05MDg1LTQ4YTgtYjdhYS0xMDg2NjE1MDEzM2MifQ.tgNtqmSu2_wWEJy0DR3s5yY5NZ6-MgQzZCAf_JfDfYw"
      />
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}

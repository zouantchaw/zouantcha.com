import type { Metadata } from 'next'
import { site } from './site'

export const siteUrl = 'https://www.zouantcha.com'

export function shareImage(title: string, description: string, section = 'Personal index') {
  const query = new URLSearchParams({ title, summary: description, tag: section, v: '2' })
  return `${siteUrl}/og?${query}`
}

export function pageMetadata({ title, description, path, section, publishedTime, locale = 'en_US', noIndex = false }: {
  title: string; description: string; path: string; section?: string;
  publishedTime?: string; locale?: string; noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`
  const image = { url: shareImage(title, description, section), width: 1200, height: 630, alt: `${title} | ${site.name}`, type: 'image/png' }
  return {
    title, description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } } : {}),
    openGraph: {
      title, description, url, siteName: site.name, locale,
      ...(publishedTime ? { type: 'article' as const, publishedTime } : { type: 'website' as const }),
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

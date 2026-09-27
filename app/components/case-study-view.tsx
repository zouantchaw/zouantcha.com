'use client'

import { storedSrc } from './source-capture'
import { track } from '@vercel/analytics'
import { useEffect } from 'react'

export function CaseStudyView({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const src = storedSrc()
      track('case_study_view', src ? { case_study: slug, src } : { case_study: slug })
    } catch {}
  }, [slug])
  return null
}

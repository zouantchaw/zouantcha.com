'use client'

import { storedSrc } from './source-capture'
import { track } from '@vercel/analytics'
import { useEffect } from 'react'

export function ResumePageView() {
  useEffect(() => {
    try {
      const src = storedSrc()
      track('resume_page_view', src ? { src } : {})
    } catch {}
  }, [])
  return null
}

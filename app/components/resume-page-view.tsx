'use client'

import { storedSrc } from './source-capture'
import { track } from 'app/lib/analytics'
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

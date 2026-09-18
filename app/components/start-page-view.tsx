'use client'

import { track } from '@vercel/analytics'
import { useEffect } from 'react'

export function StartPageView() {
  useEffect(() => {
    try {
      track('start_page_view')
    } catch {}
  }, [])
  return null
}

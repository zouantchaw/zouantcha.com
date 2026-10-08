'use client'

import { track } from 'app/lib/analytics'
import { useEffect } from 'react'

export function StartPageView() {
  useEffect(() => {
    try {
      track('start_page_view')
    } catch {}
  }, [])
  return null
}

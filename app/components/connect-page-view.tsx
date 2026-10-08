'use client'

import { storedSrc } from './source-capture'
import { track } from 'app/lib/analytics'
import { useEffect } from 'react'

export function ConnectPageView() {
  useEffect(() => {
    try {
      const src = storedSrc() || 'exploit'
      track('connect_visit', { src })
    } catch {}
  }, [])
  return null
}

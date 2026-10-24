'use client'

import { browserAttribution } from 'app/lib/source'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function Capture() {
  const pathname = usePathname()
  const params = useSearchParams()
  useEffect(() => { browserAttribution() }, [pathname, params])
  return null
}

export function SourceCapture() {
  return <Suspense fallback={null}><Capture /></Suspense>
}

export function storedSrc(): string | undefined {
  return browserAttribution().src || undefined
}

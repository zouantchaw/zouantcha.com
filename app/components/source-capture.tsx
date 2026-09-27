'use client'

import { SOURCE_KEY } from 'app/lib/source'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function Capture() {
  const pathname = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    const src = params.get(SOURCE_KEY)?.trim().slice(0, 80)
    if (!src) return
    try {
      sessionStorage.setItem(SOURCE_KEY, src)
    } catch {}
  }, [pathname, params])

  return null
}

export function SourceCapture() {
  return (
    <Suspense fallback={null}>
      <Capture />
    </Suspense>
  )
}

export function storedSrc(): string | undefined {
  try {
    return sessionStorage.getItem(SOURCE_KEY) || undefined
  } catch {
    return undefined
  }
}

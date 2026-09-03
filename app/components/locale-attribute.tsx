'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function LocaleAttribute() {
  const pathname = usePathname()
  const isFrench = pathname === '/fr' || pathname?.startsWith('/fr/')

  useEffect(() => {
    document.documentElement.lang = isFrench ? 'fr' : 'en'
  }, [isFrench])

  return null
}

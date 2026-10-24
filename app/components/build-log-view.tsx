'use client'
import { useEffect } from 'react'
import { track } from 'app/lib/analytics'
export function BuildLogView() {
  useEffect(() => { track('build_log_view') }, [])
  return null
}

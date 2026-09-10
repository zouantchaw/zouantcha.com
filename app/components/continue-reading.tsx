'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { ReadingPosition } from 'app/lib/reading-position'
import { readPosition, readingKey } from 'app/lib/reading-position'
export function ContinueReading() {
  const [saved, setSaved] = useState<ReadingPosition | null>(null)
  useEffect(() => setSaved(readPosition()), [])
  if (!saved) return null
  return (
    <aside className="continue-reading">
      <div>
        <span className="eyebrow">Continue reading</span>
        <Link href={'/case-studies/' + saved.slug + '#' + saved.section}>
          {saved.title} / {saved.heading} ↗
        </Link>
        <small>Saved on this browser.</small>
      </div>
      <button
        aria-label="Clear reading position"
        onClick={() => {
          try {
            localStorage.removeItem(readingKey)
          } catch {}
          setSaved(null)
        }}
      >
        ×
      </button>
    </aside>
  )
}

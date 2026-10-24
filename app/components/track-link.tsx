'use client'

import { track } from 'app/lib/analytics'
import Link from 'next/link'
import type { ComponentProps } from 'react'

export function TrackLink({
  event,
  data,
  onClick,
  ...props
}: ComponentProps<typeof Link> & {
  event: string
  data?: Record<string, string>
}) {
  return (
    <Link
      {...props}
      onClick={(click) => {
        try {
          track(event, data)
          if (event === 'project_intro_click') track('review_booking_click', data)
        } catch {}
        onClick?.(click)
      }}
    />
  )
}

export function TrackAnchor({
  event,
  data,
  onClick,
  ...props
}: ComponentProps<'a'> & {
  event: string
  data?: Record<string, string>
}) {
  return (
    <a
      {...props}
      onClick={(click) => {
        try {
          track(event, data)
          if (event === 'project_intro_click') track('review_booking_click', data)
        } catch {}
        onClick?.(click)
      }}
    />
  )
}

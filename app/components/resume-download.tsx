'use client'

import { site } from 'app/lib/site'
import { TrackAnchor } from './track-link'

export function ResumeDownload({
  from,
  className,
  children = 'Download PDF',
}: {
  from: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <TrackAnchor
      href={site.resumeDownload}
      download={site.resumeFilename}
      event="resume_download"
      data={{ from, file: site.resumeFilename }}
      className={className}
    >
      {children}
    </TrackAnchor>
  )
}

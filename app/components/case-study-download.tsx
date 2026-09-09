'use client'

import { track } from '@vercel/analytics'

export function CaseStudyDownload({ slug, title }: { slug: string; title: string }) {
  return (
    <a
      href={`/downloads/${slug}.pdf`}
      download={`${slug}-wiel-zouantcha.pdf`}
      className="case-study-download inline-flex items-center gap-2 text-sm underline decoration-line underline-offset-4 hover:decoration-ink"
      aria-label={`Download ${title} case study as PDF`}
      onClick={() => {
        // Tracking must never prevent the native download.
        try { track('case_study_pdf_download', { case_study: slug }) } catch {}
      }}
    >
      Download PDF <span aria-hidden="true">↓</span>
    </a>
  )
}

import Link from 'next/link'
import type { WorkItem } from 'app/lib/work'

export function WorkRow({ item, index }: { item: WorkItem; index?: number }) {
  return (
    <Link href={`/case-studies/${item.slug}`} className="project-row">
      {index !== undefined && (
        <span className="project-number">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <span className="project-copy">
        <span className="project-kind">
          {item.research ? 'Research' : 'Client work'} / {item.period}
        </span>
        <span className="project-title">{item.title}</span>
      </span>
      <span className="project-description">{item.dek}</span>
      <span className="row-arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  )
}

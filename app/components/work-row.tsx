import Link from 'next/link'
import type { WorkItem } from 'app/lib/work'

export function WorkRow({ item }: { item: WorkItem }) {
  return (
    <Link href={`/case-studies/${item.slug}`} className="project-row">
      <span className="project-copy"><span className="project-title">{item.title}{item.research && <span className="project-kind">Research</span>}</span><span className="project-description">{item.dek}</span></span>
      <span className="row-arrow" aria-hidden="true">↗</span>
    </Link>
  )
}

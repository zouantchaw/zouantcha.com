import Image from 'next/image'
import Link from 'next/link'
import type { WorkItem } from 'app/lib/work'

export function WorkRow({ item }: { item: WorkItem }) {
  const image = item.images?.[0]

  return (
    <Link
      href={`/case-studies/${item.slug}`}
      className="group grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-line py-6 lg:grid-cols-[56px_minmax(0,1fr)_minmax(220px,280px)] lg:items-start"
    >
      <span className="font-mono text-[12px] text-muted">{item.number}</span>
      <span className="space-y-1">
        <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-[15px] font-medium text-ink sm:text-base">
            {item.title}
          </span>
          {item.research ? (
            <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted">
              Research
            </span>
          ) : null}
        </span>
        <span className="block text-[13px] leading-5 text-muted sm:text-[14px] sm:leading-6">
          {item.dek}
        </span>
      </span>
      {image ? (
        <span className="relative hidden overflow-hidden rounded-[6px] border border-line bg-paper-2 lg:block">
          <Image
            src={image.src}
            alt={image.alt}
            width={640}
            height={400}
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </span>
      ) : (
        <span className="hidden text-muted lg:block">→</span>
      )}
    </Link>
  )
}

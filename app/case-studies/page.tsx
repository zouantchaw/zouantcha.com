import { SectionLabel } from 'app/components/section-label'
import { WorkRow } from 'app/components/work-row'
import { work } from 'app/lib/work'

export const metadata = {
  title: 'Case studies',
  description:
    'Selected products and systems: MTL Archives, PortMind, Diane Party Rentals, Ballerz Football Academy, and Starthome.',
}

export default function Page() {
  return (
    <div className="site-shell space-y-16">
      <header className="max-w-3xl space-y-5">
        <SectionLabel>Case studies</SectionLabel>
        <h1 className="font-mono text-[32px] leading-[1.15] tracking-[-0.03em] text-ink sm:text-[40px]">
          Selected work
        </h1>
        <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
          Case studies. The desks, datasets, and admin surfaces.
        </p>
      </header>

      <section>
        {work.map((item) => (
          <WorkRow key={item.slug} item={item} />
        ))}
        <div className="border-t border-line" />
      </section>
    </div>
  )
}

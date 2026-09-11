import { pageMetadata } from 'app/lib/metadata'
import { SectionLabel } from 'app/components/section-label'
import { WorkRow } from 'app/components/work-row'
import { work } from 'app/lib/work'

export const metadata = pageMetadata({
  title: 'Case studies',
  description:
    'Selected products and systems: MTL Archives, PortMind, Diane Party Rentals, and Starthome.',
  path: '/case-studies',
})

export default function Page() {
  return (
    <div className="site-shell personal-page space-y-12">
      <header className="max-w-3xl space-y-5">
        <SectionLabel>Case studies</SectionLabel>
        <h1 className="font-mono text-[32px] leading-[1.15] tracking-[-0.03em] text-ink sm:text-[40px]">
          Case studies
        </h1>
        <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
          Research into images and evidence, followed by the systems I build for
          businesses. Each case study follows a different problem through to the
          result and what still needs work.
        </p>
      </header>

      <section aria-labelledby="research-heading">
        <h2 id="research-heading" className="eyebrow mb-6">
          Research / data, experiments & evaluation
        </h2>
        {work
          .filter((item) => item.research)
          .map((item) => (
            <WorkRow key={item.slug} item={item} index={work.indexOf(item)} />
          ))}
      </section>
      <section aria-labelledby="client-heading">
        <h2 id="client-heading" className="eyebrow mb-6">
          Client work / operations & mobile workflows
        </h2>
        {work
          .filter((item) => !item.research)
          .map((item) => (
            <WorkRow key={item.slug} item={item} index={work.indexOf(item)} />
          ))}
        <div className="border-t border-line" />
      </section>
    </div>
  )
}

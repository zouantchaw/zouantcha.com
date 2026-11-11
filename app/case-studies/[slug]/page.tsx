import { pageMetadata } from 'app/lib/metadata'
import { CaseStudyView } from 'app/components/case-study-view'
import { ImageViewer } from 'app/components/image-viewer'
import { ReaderContents } from 'app/components/reader-contents'
import { sectionId } from 'app/lib/section-id'
import { MtlExplorerShape } from 'app/components/mtl-research/explorer-shape'
import {
  MtlArchiveExample,
  MtlPipeline,
  MtlLiveSearch,
  MtlTechnology,
  MtlAudience,
  MtlBrand,
} from 'app/components/mtl-research'
import { PortImageExplorer } from 'app/components/portmind-explorer'
import {
  PortmindResults,
  PortmindInspection,
} from 'app/components/portmind-research-examples'
import Link from 'next/link'
import { PortmindPipeline } from 'app/components/portmind-pipeline'
import { InteractionFilm } from 'app/components/interaction-film'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { DesignArtifact } from 'app/components/design-artifact'
import {
  getWork,
  work,
  workImageDimensions,
  type WorkBlock,
  type WorkFigure,
  type WorkImage,
  type WorkTable,
} from 'app/lib/work'
import { HiringBlock } from 'app/components/frame-sections'
import { Card, CardContent } from 'app/components/ui/card'
import { frameCases } from 'app/lib/frame-site'

type PageProps = {
  params: Promise<{ slug: string }>
}

function dimensionsFor(src: string) {
  const dimensions = workImageDimensions[src]
  if (!dimensions) {
    throw new Error(`Missing dimensions for case study image: ${src}`)
  }
  return dimensions
}

export async function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const item = getWork(slug)
  if (!item) return

  return pageMetadata({ title: item.title, description: item.dek, path: `/case-studies/${item.slug}`, section: item.research ? 'Research case study' : 'Product case study' })
}

function FigureImage({
  image,
}: {
  image: Extract<WorkFigure, { kind: 'image' }>
}) {
  const phone = image.layout === 'phone'
  const dimensions = dimensionsFor(image.src)

  return (
    <figure className="space-y-3">
      <ImageViewer src={image.src} alt={image.alt}>
        <Image
          src={image.src}
          alt={image.alt}
          {...dimensions}
          loading="lazy"
          sizes="(max-width: 1080px) 100vw, 1080px"
          unoptimized={image.src.endsWith('.svg')}
          className={
            phone
              ? 'mx-auto h-auto w-full max-w-[280px] bg-black'
              : image.src.includes('/portmind-paper/')
                ? 'h-auto w-full bg-white'
                : 'h-auto w-full bg-paper-2'
          }
        />
      </ImageViewer>
      {image.src.includes('/dpr-v2/') ||
      image.src.includes('/portmind-paper/') ? (
        <a
          href={image.src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[13px] underline decoration-line underline-offset-4 hover:text-ink"
          aria-label={`Open full-size design: ${image.alt}`}
        >
          View full-size design ↗
        </a>
      ) : null}
      {image.caption ? (
        <figcaption
          className={
            phone
              ? 'text-center text-[13px] italic leading-6 text-muted'
              : 'max-w-2xl text-[15px] italic leading-6 text-muted'
          }
        >
          {image.caption}
        </figcaption>
      ) : <figcaption>Source: case-study asset · {image.src.split('/').pop()}</figcaption>}
    </figure>
  )
}

function Phones({ images }: { images: WorkImage[] }) {
  return (
    <div
      className={`grid gap-6 bg-paper-2 px-4 py-8 sm:px-8 ${images.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}
    >
      {images.map((image) => (
        <FigureImage
          key={image.src}
          image={{ kind: 'image', ...image, layout: 'phone' }}
        />
      ))}
    </div>
  )
}

function ScoreTable({ table }: { table: WorkTable }) {
  return (
    <figure className="space-y-3 overflow-x-auto">
      <table className="w-full min-w-[28rem] text-left text-[14px] leading-6">
        <thead>
          <tr className="border-b border-line">
            {table.columns.map((column) => (
              <th
                key={column}
                className="py-2 pr-4 font-mono text-[12px] font-normal text-muted"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join('|')} className="border-b border-line">
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${index}`}
                  className={
                    index === 0
                      ? 'py-2.5 pr-4 text-ink'
                      : 'py-2.5 pr-4 font-mono text-[13px] text-ink-soft'
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.footnote ? (
        <figcaption className="max-w-2xl text-[13px] italic leading-6 text-muted">
          {table.footnote}
        </figcaption>
      ) : null}
    </figure>
  )
}

function Block({ block }: { block: WorkBlock }) {
  if (block.kind === 'mtl-archive') return <MtlArchiveExample />
  if (block.kind === 'mtl-pipeline') return <MtlPipeline />
  if (block.kind === 'mtl-shape') return <MtlExplorerShape />
  if (block.kind === 'mtl-technology') return <MtlTechnology />
  if (block.kind === 'mtl-search') return <MtlLiveSearch />
  if (block.kind === 'mtl-audience') return <MtlAudience />
  if (block.kind === 'mtl-brand') return <MtlBrand />
  if (block.kind === 'portmind-explorer') return <PortImageExplorer />
  if (block.kind === 'portmind-results') return <PortmindResults />
  if (block.kind === 'portmind-inspection') return <PortmindInspection />
  if (block.kind === 'portmind-pipeline') return <PortmindPipeline />

  if (block.kind === 'rich-p') {
    return (
      <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
        {block.parts.map((part, index) => {
          if (typeof part === 'string') return part
          const className =
            'underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink'
          return part.external ? (
            <a
              key={`${part.href}-${index}`}
              href={part.href}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part.label}
            </a>
          ) : (
            <a
              key={`${part.href}-${index}`}
              href={part.href}
              className={className}
            >
              {part.label}
            </a>
          )
        })}
      </p>
    )
  }

  if (block.kind === 'gallery') {
    return (
      <figure className="space-y-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {block.images.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              {...dimensionsFor(image.src)}
              sizes="(max-width: 640px) 100vw, 330px"
              className="h-auto w-full rounded-xl border border-line"
            />
          ))}
        </div>
        <figcaption className="text-[13px] leading-6 text-muted">
          {block.caption}
        </figcaption>
      </figure>
    )
  }

  if (block.kind === 'video') {
    return <InteractionFilm {...block} />
  }

  if (block.kind === 'p') {
    return (
      <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
        {block.text}
      </p>
    )
  }

  if (block.kind === 'h3') {
    return (
      <h3 id={sectionId(block.text)} className="max-w-2xl scroll-mt-24 pt-2 text-lg font-medium text-ink">
        {block.text}
      </h3>
    )
  }

  if (block.kind === 'ul') {
    return (
      <ul className="max-w-2xl list-disc space-y-2 pl-5 text-[17px] leading-7 text-ink-soft">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.kind === 'table') {
    return <ScoreTable table={block.table} />
  }

  if (block.kind === 'phones') {
    return <Phones images={block.images} />
  }

  if (block.figure.kind === 'artifact') {
    return (
      <DesignArtifact id={block.figure.id} caption={block.figure.caption} />
    )
  }

  return <FigureImage image={block.figure} />
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const item = getWork(slug)

  if (!item) notFound()

  const index = frameCases.findIndex(candidate => candidate.slug === item.slug)
  const next = frameCases[(index + 1) % frameCases.length]
  const metrics = item.slug === 'mtl-archives' ? (item.metrics || []).filter(m => ['13,499','2.66M'].includes(m.value)) : (item.metrics || []).slice(0,2)
  const contents = (item.contents ?? item.sections.map(s => ({ heading:s.heading,title:s.heading }))).map(s => ({id:sectionId(s.heading),title:s.title}))
  return <article className="frame-shell v2-page v2-case">
    <CaseStudyView slug={item.slug} />
    <header className="v2-case-heading"><Link href="/case-studies" className="v2-label">← CASE STUDIES · {item.slug === 'mtl-archives' ? 'MY OWN PRODUCT · 2025–PRESENT' : item.period}</Link><h1>{item.title}</h1><p>{item.slug === 'mtl-archives' ? '13,000+ historical photographs turned into a searchable archive and a daily game, with an automated editorial system that reached 2.66M social views.' : item.dek}</p></header>
    <Card className="v2-facts"><CardContent><div><p className="v2-label">ROLE</p><p>{item.role}</p></div>{metrics.map(metric=><div key={metric.label}><p className="v2-label">{metric.value === '13,499' ? 'SERVING RECORDS' : metric.value === '2.66M' ? 'SOCIAL VIEWS · JAN–JUL 2026' : metric.label}</p><strong className={metric.value === '2.66M' ? 'v2-blue' : undefined}>{metric.value}</strong></div>)}</CardContent></Card>
    <div className="v2-case-grid"><ReaderContents title={item.title} slug={item.slug} sections={contents} /><div className="case-essay-body">
      {item.sections.map(section=><section key={section.heading} id={sectionId(section.heading)} className="case-essay-section"><h2>{section.heading}</h2><div className="v2-case-blocks">{section.blocks.map((block,i)=><Block key={section.heading+'-'+i} block={block} />)}</div></section>)}
    </div></div>
    <nav className="v2-next"><span className="v2-label">NEXT CASE STUDY</span><Link href={'/case-studies/'+next.slug}>{next.title} →</Link></nav><HiringBlock />
  </article>
}

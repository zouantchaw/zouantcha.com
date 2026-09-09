import { MtlArchiveExample, MtlPipeline, MtlLiveSearch, MtlTechnology, MtlAudience, MtlBrand } from 'app/components/mtl-research'
import { PortImageExplorer } from 'app/components/portmind-explorer'
import { PortmindResults, PortmindInspection } from 'app/components/portmind-research-examples'
import Link from 'next/link'
import { PortmindPipeline } from 'app/components/portmind-pipeline'
import { InteractionFilm } from 'app/components/interaction-film'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { DesignArtifact } from 'app/components/design-artifact'
import { SectionLabel } from 'app/components/section-label'
import {
  adjacentWork,
  getWork,
  work,
  workImageDimensions,
  type WorkBlock,
  type WorkFigure,
  type WorkImage,
  type WorkTable,
} from 'app/lib/work'
import { baseUrl } from 'app/sitemap'

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

  return {
    title: item.title,
    description: item.dek,
    openGraph: {
      title: item.title,
      description: item.dek,
      url: `${baseUrl}/case-studies/${item.slug}`,
    },
  }
}

function FigureImage({ image }: { image: Extract<WorkFigure, { kind: 'image' }> }) {
  const phone = image.layout === 'phone'
  const dimensions = dimensionsFor(image.src)

  return (
    <figure className="space-y-3">
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
            : image.src.includes('/portmind-paper/') ? 'h-auto w-full bg-white' : 'h-auto w-full bg-paper-2'
        }
      />
      {(image.src.includes('/dpr-v2/') || image.src.includes('/portmind-paper/')) ? (
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
      ) : null}
    </figure>
  )
}

function Phones({ images }: { images: WorkImage[] }) {
  return (
    <div className={`grid gap-6 bg-paper-2 px-4 py-8 sm:px-8 ${images.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
      {images.map((image) => (
        <FigureImage key={image.src} image={{ kind: 'image', ...image, layout: 'phone' }} />
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
          const className = 'underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink'
          return part.external ? (
            <a key={`${part.href}-${index}`} href={part.href} className={className}
              target="_blank" rel="noopener noreferrer">{part.label}</a>
          ) : (
            <a key={`${part.href}-${index}`} href={part.href} className={className}>{part.label}</a>
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
            <Image key={image.src} src={image.src} alt={image.alt}
              {...dimensionsFor(image.src)} sizes="(max-width: 640px) 100vw, 330px"
              className="h-auto w-full rounded-xl border border-line" />
          ))}
        </div>
        <figcaption className="text-[13px] leading-6 text-muted">{block.caption}</figcaption>
      </figure>
    )
  }

  if (block.kind === 'video') {
    return <InteractionFilm {...block} />
  }

  if (block.kind === 'p') {
    return (
      <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">{block.text}</p>
    )
  }

  if (block.kind === 'h3') {
    return <h3 className="max-w-2xl pt-2 text-lg font-medium text-ink">{block.text}</h3>
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
    return <DesignArtifact id={block.figure.id} caption={block.figure.caption} />
  }

  return <FigureImage image={block.figure} />
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const item = getWork(slug)

  if (!item) notFound()

  const { prev, next } = adjacentWork(item.slug)

  return (
    <article className="case-essay">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <Link
          href="/case-studies"
          className="underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
        >
          ← Index
        </Link>

        {next ? (
          <Link
            href={`/case-studies/${next.slug}`}
            className="underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
          >
            Next →
          </Link>
        ) : (
          <span />
        )}
      </div>

      {item.banner ? (
        <figure>
          <Image
            src={item.banner.src}
            alt={item.banner.alt}
            {...dimensionsFor(item.banner.src)}
            priority
            sizes="(max-width: 1080px) 100vw, 1080px"
            className="h-auto w-full bg-paper-2"
          />
        </figure>
      ) : null}

      <header className="case-essay-header">
        <h1 className="text-[40px] font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-[56px]">
          {item.title}
        </h1>
        <p className="text-xl leading-8 text-ink-soft">{item.dek}</p>
        <dl className="case-essay-meta">
          <div>
            <dt className="font-mono text-[12px] text-muted">Role</dt>
            <dd className="mt-1 text-ink-soft">{item.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[12px] text-muted">Scope</dt>
            <dd className="mt-1 text-ink-soft">{item.scope}</dd>
          </div>
          <div>
            <dt className="font-mono text-[12px] text-muted">
              {item.tools ? 'Tools' : 'Period'}
            </dt>
            <dd className="mt-1 text-ink-soft">{item.tools ?? item.period}</dd>
          </div>
        </dl>
        {item.links?.length ? (
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {item.links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="underline decoration-line underline-offset-4 hover:decoration-ink"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label} ↗
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  {link.label} →
                </Link>
              )
            )}
          </div>
        ) : null}
      </header>

      {item.slug === "starthome" ? null : item.metrics?.length ? (
        <section className="border-y border-line py-10">
          <SectionLabel>At a glance</SectionLabel>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {item.metrics.map((metric) => (
              <li key={metric.label} className="space-y-2">
                <p className="font-mono text-[28px] leading-none tracking-tight text-ink sm:text-[32px]">
                  {metric.value}
                </p>
                <p className="max-w-xs text-[14px] leading-6 text-muted">{metric.label}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : item.glance?.length ? (
        <section className="border-y border-line py-8">
          <SectionLabel>At a glance</SectionLabel>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {item.glance.map((point) => (
              <li key={point} className="text-[15px] leading-6 text-ink-soft">
                {point}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="case-essay-body">
        {item.sections.map((section) => (
          <section key={section.heading} id={section.heading === "A little help, when you need it" ? "mobile-preview" : undefined} className="case-essay-section">
            <div className="max-w-2xl space-y-2">

              <h2 className="text-[28px] font-medium tracking-tight text-ink sm:text-[32px]">
                {section.heading}
              </h2>
            </div>
            <div className="space-y-6">
              {section.blocks.map((block, blockIndex) => (
                <Block key={`${section.heading}-${blockIndex}`} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-8 text-sm">
        {prev ? (
          <Link
            href={`/case-studies/${prev.slug}`}
            className="underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            ← {prev.title}
          </Link>
        ) : (
          <Link
            href="/case-studies"
            className="underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            ← All case studies
          </Link>
        )}
        {next ? (
          <Link
            href={`/case-studies/${next.slug}`}
            className="underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}

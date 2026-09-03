import { notFound, redirect } from 'next/navigation'
import { getWork, work } from 'app/lib/work'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }))
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const item = getWork(slug)

  if (!item) notFound()

  redirect(`/case-studies/${item.slug}`)
}

import { actionMetadata, BuildLogAction } from 'app/components/build-log-action'
export const metadata = actionMetadata
export const dynamic = 'force-dynamic'
export default function Page(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <BuildLogAction action="unsubscribe" {...props} />
}

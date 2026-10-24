import { pageMetadata } from 'app/lib/metadata'
import { startCopy } from 'app/lib/start'
import { pickAttribution } from 'app/lib/field-notes'
import { FieldNotesForm } from 'app/components/field-notes-form'
import { BuildLogView } from 'app/components/build-log-view'
import { BUILD_LOG_UNAVAILABLE } from 'app/lib/build-log-consent'

export const metadata = pageMetadata({ title: 'Weekly build log', description: startCopy.fieldNotesBody[0], path: '/log', section: 'Build log' })

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const saved = params.signup === 'preview' || params.signup === 'pending_confirmation'
  const error = ['invalid', 'invalid_email'].includes(String(params.error)) ? 'Enter a valid email address.' : params.error === 'rate_limited' ? 'Please try again in a few minutes.' : params.error === 'unavailable' ? BUILD_LOG_UNAVAILABLE : params.error ? 'Something went wrong. Please try again.' : undefined
  return (
    <div className="site-shell start-page">
      <BuildLogView />
      <header className="start-hero">
        <p className="eyebrow">Build log</p>
        <h1>{startCopy.fieldNotesHeading}</h1>
        <p className="hero-intro">{startCopy.fieldNotesBody[0]}</p>
      </header>
      <section id="field-notes" className="start-section start-field-notes" aria-label="Join the build log">
        <FieldNotesForm preview={process.env.SITE_ENV === 'staging'} attribution={pickAttribution(params)} returnTo="/log" initialStatus={saved ? 'success' : error ? 'error' : 'idle'} initialDelivery={params.signup === 'pending_confirmation' ? 'pending_confirmation' : 'preview'} initialMessage={error} />
      </section>
    </div>
  )
}

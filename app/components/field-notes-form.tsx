'use client'

import { track } from 'app/lib/analytics'
import { FIELD_NOTES_SOURCE, type FieldNotesAttribution } from 'app/lib/field-notes'
import { BUILD_LOG_CONSENT_VERSION, BUILD_LOG_PENDING, BUILD_LOG_PREVIEW } from 'app/lib/build-log-consent'
import { startCopy } from 'app/lib/start'
import { browserAttribution } from 'app/lib/source'
import { normalizeEmail } from 'app/lib/field-notes'
import { useId, useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function FieldNotesForm({
  attribution,
  initialStatus = 'idle',
  initialMessage,
  initialDelivery,
  preview = false,
  returnTo = '/start',
}: {
  attribution: FieldNotesAttribution
  initialStatus?: Status
  returnTo?: '/start' | '/log'
  initialMessage?: string
  initialDelivery?: 'preview' | 'pending_confirmation'
  preview?: boolean
}) {
  const id = useId()
  const [delivery, setDelivery] = useState(initialDelivery)
  const [status, setStatus] = useState<Status>(initialStatus)
  const [message, setMessage] = useState(initialMessage || '')

  if (status === 'success') {
    return (
      <p className="start-success" role="status">{delivery === 'pending_confirmation' ? BUILD_LOG_PENDING : BUILD_LOG_PREVIEW}</p>
    )
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (status === 'submitting') return
    const data = new FormData(form)
    const resolved = browserAttribution()
    try {
      track('field_notes_signup_attempt')
      track('build_log_signup_attempt', { placement: returnTo.slice(1) })
    } catch {}
    if (!normalizeEmail(data.get('email'))) {
      setStatus('error')
      setMessage('Enter a valid email address.')
      form.querySelector<HTMLInputElement>('input[type=email]')?.focus()
      return
    }
    setStatus('submitting')
    setMessage('')
    try {
      const response = await fetch('/api/field-notes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email'),
          website: data.get('website'),
          source: FIELD_NOTES_SOURCE,
          referrer: document.referrer || '',
          ...resolved,
          return_to: returnTo,
          consent_version: BUILD_LOG_CONSENT_VERSION,
          page: returnTo,
        }),
      })
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; status?: 'preview' | 'pending_confirmation' }
        | null
      if (response.ok && result?.ok && ['preview','pending_confirmation'].includes(result.status || '')) {
        try {
          track('build_log_signup_saved', { placement: returnTo.slice(1) })
        } catch {}
        setDelivery(result.status)
        setStatus('success')
        return
      }
      setStatus('error')
      setMessage(
        result?.error === 'invalid_email' || response.status === 400
          ? 'Enter a valid email address.'
          : result?.error === 'rate_limited' || response.status === 429
            ? 'Please try again in a few minutes.'
            : 'Something went wrong. Please try again.',
      )
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form
      className="start-form"
      action="/api/field-notes"
      method="post"
      onSubmit={onSubmit}
      aria-busy={status === 'submitting'}
      noValidate
    >
      <input type="hidden" name="consent_version" value={BUILD_LOG_CONSENT_VERSION} />
      <input type="hidden" name="page" value={returnTo} />
      <input type="hidden" name="return_to" value={returnTo} />
      <input type="hidden" name="src" value={attribution.src} />
      <input type="hidden" name="source" value={FIELD_NOTES_SOURCE} />
      <input type="hidden" name="utm_source" value={attribution.utm_source} />
      <input type="hidden" name="utm_medium" value={attribution.utm_medium} />
      <input type="hidden" name="utm_campaign" value={attribution.utm_campaign} />
      <div className="start-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="sr-only" htmlFor={`${id}-email`}>
        Email address
      </label>
      <input
        id={`${id}-email`}
        aria-invalid={status === 'error' || undefined}
        aria-describedby={`${id}-consent${status === 'error' ? ` ${id}-error` : ''}`}
        className="search-input"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        maxLength={254}
        placeholder="you@company.com"
        disabled={status === 'submitting'}
      />
      <button className="search-submit" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Joining…' : startCopy.fieldNotesCta}
      </button>
      {status === 'error' && message ? (
        <p id={`${id}-error`} className="start-error" role="alert">
          {message}
        </p>
      ) : null}
      <p id={`${id}-consent`} className="start-consent">{startCopy.consent} {startCopy.preparationNote}{preview ? ' This staging preview does not send email.' : ''}</p>
    </form>
  )
}

'use client'

import { track } from '@vercel/analytics'
import { FIELD_NOTES_SOURCE, type FieldNotesAttribution } from 'app/lib/field-notes'
import { startCopy } from 'app/lib/start'
import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function FieldNotesForm({
  attribution,
  initialStatus = 'idle',
  initialMessage,
}: {
  attribution: FieldNotesAttribution
  initialStatus?: Status
  initialMessage?: string
}) {
  const [status, setStatus] = useState<Status>(initialStatus)
  const [message, setMessage] = useState(initialMessage || '')

  if (status === 'success') {
    return (
      <p className="start-success" role="status">
        {startCopy.fieldNotesSuccess}
      </p>
    )
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    try {
      track('field_notes_signup_attempt')
    } catch {}
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
          ...attribution,
        }),
      })
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null
      if (response.ok && result?.ok) {
        try {
          track('field_notes_signup_success')
        } catch {}
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
      noValidate
    >
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
      <label className="sr-only" htmlFor="field-notes-email">
        Email address
      </label>
      <input
        id="field-notes-email"
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
        <p className="start-error" role="alert">
          {message}
        </p>
      ) : null}
      <p className="start-consent">{startCopy.consent}</p>
    </form>
  )
}

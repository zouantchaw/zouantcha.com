import { browserAttribution } from './source'

export function track(event: string, data?: Record<string, string>) {
  if (typeof window === 'undefined' || /^\/log\/(confirm|unsubscribe)(?:\/|$)/.test(window.location.pathname)) return
  const { src } = browserAttribution()
  // The current visit wins over a caller's stale source.
  const payload = { ...data, src }
  void fetch('/api/events', {
    method: 'POST', headers: {'content-type':'application/json'}, keepalive: true,
    body: JSON.stringify({event, path:window.location.pathname, data:payload}),
  }).catch(() => {})
}

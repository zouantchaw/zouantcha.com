export function track(event: string, data?: Record<string, string>) {
  if (typeof window === 'undefined') return
  void fetch('/api/events', {
    method: 'POST', headers: {'content-type':'application/json'}, keepalive: true,
    body: JSON.stringify({event, path:window.location.pathname, data}),
  }).catch(() => {})
}

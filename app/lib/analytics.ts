// Bio links arrive as ?src=… or ?utm_source=… (ig, youtube, tiktok, linkedin); keep that on every event from the visit.
function visitSource() {
  const params = new URLSearchParams(window.location.search)
  return (params.get('src') || params.get('utm_source') || '').trim().slice(0, 80)
}

export function track(event: string, data?: Record<string, string>) {
  if (typeof window === 'undefined') return
  const src = visitSource()
  const payload = src && !data?.src ? {...data, src} : data
  void fetch('/api/events', {
    method: 'POST', headers: {'content-type':'application/json'}, keepalive: true,
    body: JSON.stringify({event, path:window.location.pathname, data:payload}),
  }).catch(() => {})
}

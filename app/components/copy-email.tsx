'use client'

import { useEffect, useRef, useState } from 'react'

export function CopyEmail({email}: {email:string}) {
  const [status,setStatus] = useState<'idle'|'copied'|'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {if(timer.current) clearTimeout(timer.current)}, [])
  async function copy() {
    if(timer.current) clearTimeout(timer.current)
    try {await navigator.clipboard.writeText(email);setStatus('copied')} catch {setStatus('failed')}
    timer.current=setTimeout(()=>setStatus('idle'),2500)
  }
  return <span className="copy-email"><button type="button" onClick={copy} aria-label="Copy email address">{status === 'copied' ? 'Copied ✓' : 'Copy email'}</button><span role="status" className="sr-only">{status === 'copied' ? 'Email address copied.' : status === 'failed' ? `Could not copy. Email ${email}.` : ''}</span>{status === 'failed' && <span className="copy-error">Select the address to copy it.</span>}</span>
}

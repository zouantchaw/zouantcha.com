'use client'
import { useEffect, useRef, useState } from 'react'
import { thumbnail } from './media'

type Props = { src: string; alt: string; width: number; height: number; source?: string; className?: string }
export function ArchiveImage(props: Props) {
  return <ImageAttempt key={`${props.src}|${props.source ?? ''}`} {...props} />
}
function ImageAttempt({ src, source, alt, width, height, className = '' }: Props) {
  const host = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const candidates = Array.from(new Set([thumbnail(src, width, height), src, source].filter((s): s is string => Boolean(s))))
  const failed = attempt >= candidates.length
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setVisible(true); observer.disconnect() }
    }, { rootMargin: '400px' })
    if (host.current) observer.observe(host.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!visible || loaded || failed) return
    const timer = setTimeout(() => setAttempt(n => n === attempt ? n + 1 : n), 10000)
    return () => clearTimeout(timer)
  }, [visible, loaded, failed, attempt])
  const fail = () => { setLoaded(false); setAttempt(n => n === attempt ? n + 1 : n) }
  return <span ref={host} className={`mtl-image-frame ${className}`} aria-busy={visible && !loaded && !failed}>
    {visible && !failed && <img key={candidates[attempt]} src={candidates[attempt]} alt={alt} decoding="async" onLoad={() => setLoaded(true)} onError={fail} style={{ opacity: loaded ? 1 : 0 }} />}
    {!loaded && <span className="mtl-image-status">{failed ? 'Preview unavailable' : 'Loading photograph…'}</span>}
  </span>
}

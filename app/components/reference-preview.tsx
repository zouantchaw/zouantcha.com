'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { Dialog } from './dialog'

export function ReferencePreview({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  const popover = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const content = (
    <>
      <p className="eyebrow">Related reading</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link
        href={href}
        onClick={() => {
          setMobileOpen(false)
          popover.current?.hidePopover()
        }}
      >
        Open the full note ↗
      </Link>
    </>
  )
  function show() {
    if (window.matchMedia('(max-width: 700px)').matches) {
      setMobileOpen(true)
      return
    }
    const element = popover.current
    const button = trigger.current
    if (!element || !button) return
    if (element.matches(':popover-open')) {
      element.hidePopover()
      return
    }
    const rect = button.getBoundingClientRect()
    element.style.left =
      Math.max(16, Math.min(rect.left, innerWidth - 396)) + 'px'
    element.showPopover()
    element.style.top =
      Math.max(
        16,
        Math.min(rect.bottom + 10, innerHeight - element.offsetHeight - 16),
      ) + 'px'
  }
  return (
    <span className="reference-control">
      <button
        ref={trigger}
        onClick={show}
        aria-expanded={mobileOpen || expanded}
        aria-label={'Preview reference: ' + title}
        className="reference-trigger"
      >
        Read a little here <span aria-hidden="true">＋</span>
      </button>
      <div
        ref={popover}
        popover="auto"
        className="reference-popover"
        onToggle={(event) => setExpanded(event.newState === 'open')}
      >
        {content}
        <button
          className="reference-close"
          onClick={() => {
            popover.current?.hidePopover()
            trigger.current?.focus()
          }}
          aria-label="Close reference"
        >
          ×
        </button>
      </div>
      <Dialog
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Related reading"
        className="reference-dialog"
      >
        {content}
      </Dialog>
    </span>
  )
}

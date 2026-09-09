'use client'
import { useEffect, useRef, type ReactNode } from 'react'

export function Dialog({
  open,
  onClose,
  title,
  children,
  className = '',
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!open || !dialog) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      previous?.focus({ preventScroll: true })
    }
  }, [open])
  return (
    <dialog
      ref={ref}
      className={`index-dialog ${className}`}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const box = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            onClose()
        }
      }}
    >
      <div className="dialog-heading">
        <span>{title}</span>
        <button onClick={onClose} aria-label={`Close ${title}`}>
          Close <span aria-hidden="true">×</span>
        </button>
      </div>
      {open ? children : null}
    </dialog>
  )
}

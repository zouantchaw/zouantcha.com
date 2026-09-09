'use client'
import { useState, type ReactNode } from 'react'
import { Dialog } from './dialog'
export function ImageViewer({
  src,
  alt,
  children,
}: {
  src: string
  alt: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [failed, setFailed] = useState(false)
  return (
    <div className="image-viewer">
      <button
        className="image-expand"
        onClick={() => {
          setZoom(1)
          setFailed(false)
          setOpen(true)
        }}
        aria-label={'Expand image: ' + alt}
      >
        {children}
        <span className="image-expand-label">Expand ↗</span>
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Image viewer"
        className="image-dialog"
      >
        <div className="index-tools">
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
            disabled={zoom === 1}
            aria-label="Zoom out"
          >
            −
          </button>
          <span aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
            disabled={zoom === 3}
            aria-label="Zoom in"
          >
            ＋
          </button>
          <button onClick={() => setZoom(1)}>Fit image</button>
          <a href={src} target="_blank" rel="noopener noreferrer">
            Original ↗
          </a>
        </div>
        <div className="image-viewport">
          {failed ? (
            <p>
              The image couldn’t load. <a href={src}>Open the original</a>.
            </p>
          ) : (
            <img
              src={src}
              alt={alt}
              onError={() => setFailed(true)}
              style={{ width: zoom * 100 + '%', maxWidth: 'none' }}
            />
          )}
        </div>
        <p className="image-caption">{alt}</p>
      </Dialog>
    </div>
  )
}

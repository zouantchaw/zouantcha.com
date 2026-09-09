'use client'
import { useEffect, useState } from 'react'
import { Dialog } from './dialog'
export function ReaderContents({
  sections,
}: {
  sections: { id: string; title: string }[]
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(sections[0]?.id)
  useEffect(() => {
    const update = () => {
      const passed = sections.filter((s) => {
        const node = document.getElementById(s.id)
        return node && node.getBoundingClientRect().top < 180
      })
      setActive(passed.at(-1)?.id ?? sections[0]?.id)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [sections])
  const list = (
    <ol>
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={'#' + s.id}
            aria-current={s.id === active ? 'location' : undefined}
            onClick={() => setOpen(false)}
          >
            <span>{String(i + 1).padStart(2, '0')}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  )
  return (
    <>
      <aside className="reader-contents">
        <p className="eyebrow">In this case study</p>
        <nav aria-label="Chapters">{list}</nav>
      </aside>
      <button
        className="contents-toggle"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        Contents <span aria-hidden="true">＋</span>
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="In this case study"
        className="contents-dialog"
      >
        <nav aria-label="Chapters">{list}</nav>
      </Dialog>
    </>
  )
}

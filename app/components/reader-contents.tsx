'use client'
import { useEffect, useState, useRef } from 'react'
import { savePosition } from 'app/lib/reading-position'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './ui/collapsible'
import { Button } from './ui/button'
export function ReaderContents({
  sections,
  title,
  slug,
}: {
  title: string
  slug: string
  sections: { id: string; title: string }[]
}) {
  const lastSaved = useRef('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(sections[0]?.id)
  useEffect(() => {
    const update = (event?: Event) => {
      const passed = sections.filter((s) => {
        const node = document.getElementById(s.id)
        return node && node.getBoundingClientRect().top < 180
      })
      const current = passed.at(-1)
      setActive(current?.id ?? sections[0]?.id)
      if (event && current && lastSaved.current !== slug + current.id) {
        savePosition({
          slug,
          title,
          section: current.id,
          heading: current.title,
        })
        lastSaved.current = slug + current.id
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [sections, slug, title])
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
  return <div className="v2-contents">
    <aside className="v2-contents-desktop"><p className="v2-label">On this page</p><nav aria-label="On this page">{list}</nav></aside>
    <Collapsible className="v2-contents-mobile" open={open} onOpenChange={setOpen}><CollapsibleTrigger asChild><Button variant="outline">On this page <span aria-hidden="true">▾</span></Button></CollapsibleTrigger><CollapsibleContent><nav aria-label="On this page">{list}</nav></CollapsibleContent></Collapsible>
  </div>
}

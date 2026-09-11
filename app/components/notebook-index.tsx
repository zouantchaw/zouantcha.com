'use client'
import Link from 'next/link'
import { useState } from 'react'
const entries = [
  {
    label: 'Montréal',
    title: 'The map already existed',
    date: '2020-10-14',
    href: '/blog/the-map-already-existed',
    text: 'There’s always construction in Montréal. I wanted a map to find out what was happening. It turned out the map already existed. That search led me to the city’s open data portal.',
  },
  {
    label: 'Everyday',
    title: 'If I want to run, why can’t I just go and run?',
    date: '2020-10-19',
    href: '/blog/just-go-and-run',
    text: 'I ran in the Old Port while listening to a podcast. Then I started wondering why I needed the podcast at all.',
  },
  {
    label: 'Reading',
    title: 'Reading needs a second pass',
    date: '2026-03-12',
    href: '/blog/reading-needs-a-second-pass',
    text: 'I was 52% through a book and wondering how much I could explain. I stopped reading and tried writing down the main ideas, why I cared, and what they contradicted.',
  },
  {
    label: 'Notes',
    title: 'Moving four years of notes',
    date: '2026-03-11',
    href: '/blog/moving-from-logseq-to-obsidian',
    text: 'Obsidian felt lighter than Logseq. Then I remembered I was comparing a fresh vault with four or five years of accumulated notes.',
  },
  {
    label: 'Work',
    title: 'More parallel doesn’t mean more organized',
    date: '2026-05-05',
    href: '/blog/more-parallel-less-organized',
    text: 'I could work on several things at the same time. But how well was I working on each one? What was the opportunity cost?',
  },
  {
    label: 'Books',
    title: 'Deep Work, the second time',
    date: '2022',
    href: '/blog/books-read-2022#deep-work-by-cal-newport',
    text: '“This is my second time reading this book and it will definitely not be my last.” From my 2022 reading notes.',
  },
]
export function NotebookIndex() {
  const [selected, setSelected] = useState(0)
  const [animate, setAnimate] = useState(false)
  const entry = entries[selected]
  return (
    <section className="notebook-index" aria-labelledby="notebook-heading">
      <div>
        <h2 id="notebook-heading" className="eyebrow">
          From my notes
        </h2>
        <p>
          I used Logseq for years. <br />
          Now I keep my notes in Obsidian.
        </p>
        <Link href="/blog">All published notes ↗</Link>
      </div>
      <div className="notebook-leaf">
        <div className="notebook-tabs" aria-label="Choose a note">
          {entries.map((e, i) => (
            <button
              key={e.href}
              aria-pressed={selected === i}
              onClick={(event) => {
                setAnimate(event.detail > 0)
                setSelected(i)
              }}
            >
              {e.label}
            </button>
          ))}
        </div>
        <div
          key={selected}
          className={
            animate ? 'notebook-entry notebook-entry-motion' : 'notebook-entry'
          }
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="notebook-date">
            <span>Notebook / {entry.date}</span>
            <span>
              {String(selected + 1).padStart(2, '0')} /{' '}
              {String(entries.length).padStart(2, '0')}
            </span>
          </div>
          <h3>
            <Link href={entry.href}>{entry.title}</Link>
          </h3>
          <p>{entry.text}</p>
          <Link className="notebook-open" href={entry.href}>
            Read the entry ↗
          </Link>
        </div>
      </div>
    </section>
  )
}

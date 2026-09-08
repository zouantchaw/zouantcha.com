import { BlogPosts } from 'app/components/posts'
import { SectionLabel } from 'app/components/section-label'

export const metadata = {
  title: 'Writing',
  description:
    'Notes on software, projects, reading, and the systems behind the work.',
}

export default function Page() {
  return (
    <div className="site-shell personal-page space-y-10">
      <header className="max-w-3xl space-y-5">
        <SectionLabel tone="gold">Writing & notes</SectionLabel>
        <h1 className="font-mono text-[32px] leading-[1.15] tracking-[-0.03em] text-ink sm:text-[40px]">
          Writing
        </h1>
        <p className="max-w-2xl text-[17px] leading-7 text-ink-soft">
          Notes on software engineering, products, archives, books, and things
          I want to understand more clearly.
        </p>
      </header>
      <BlogPosts />
    </div>
  )
}

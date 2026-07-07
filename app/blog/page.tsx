import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Writing</h1>
        <p className="leading-7 text-neutral-700 dark:text-neutral-300">
          Notes on software, projects, reading, and things I want to understand
          better.
        </p>
      </div>
      <BlogPosts />
    </section>
  )
}

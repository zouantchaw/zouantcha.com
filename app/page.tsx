import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Wiel
      </h1>
      <p className="mb-4">
        {`I'm a software developer with 5+ years of experience building scalable systems. I currently `}
        <a
          href="/work"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          work
        </a>
        {` as a senior full stack engineer at `}
        <a
          href="https://www.heyethos.com/"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          ethos
        </a>
        {`, where I lead frontend development and have been an early adopter of AI coding tools since 2024.`}
      </p>
      <p className="mb-4">
        {`I also do independent consulting, helping businesses replace manual workflows with custom software. When I'm not coding, I'm most likely `}
        <a
          href="/blog/books-read-2025"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          reading
        </a>
        {`, training, spending time with family and friends, or hacking on a side `}
        <a
          href="/projects"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          project
        </a>
        {`.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}

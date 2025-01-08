import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Wiel 👋🏾
      </h1>
      <p className="mb-4">
        {`I'm a software developer, optimist, and family man. I currently `}
        <a
          href="/work"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          work
        </a>
        {` as a full stack developer at `}
        <a
          href="https://www.heyethos.com/"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          ethos
        </a>
        {` where I help build the future of customer loyalty.`}
      </p>
      <p className="mb-4">
        {`When I'm not working, I'm most likely `}
        <a
          href="/blog/books-read-2024"
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

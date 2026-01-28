import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Wiel
      </h1>
      <p className="mb-4">
        {`I'm a software engineer with 5+ years building data-heavy applications end-to-end. Recently I shipped a `}
        <a
          href="https://port-observatory-mtl.vercel.app/"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          real-time maritime data platform
        </a>
        {` for the Port of Montreal and a `}
        <a
          href="https://www.mtlarchives.com/"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          search engine
        </a>
        {` over 14,822 historical photos from the Montreal city archives.`}
      </p>
      <p className="mb-4">
        {`I spent 3.5 years at `}
        <a
          href="https://www.heyethos.com/"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Ethos
        </a>
        {` taking their product from a single-tenant MVP to a multi-tenant SaaS serving 50+ merchants. Now I do customer engineering at Oloodi and independent `}
        <a
          href="/work"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          consulting
        </a>
        {`, helping businesses replace manual workflows with custom software.`}
      </p>
      <p className="mb-4">
        {`When I'm not coding, I'm most likely `}
        <a
          href="/blog/books-read-2025"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          reading
        </a>
        {`, training, or spending time with family and friends.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}

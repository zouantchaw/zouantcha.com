import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Wiel
      </h1>
      <p className="mb-4">
        {`I'm a software engineer with 5+ years of experience. I started at `}
        <a
          href="https://saasalerts.com/"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          SaaS Alerts
        </a>
        {` building security integrations that pulled data from IT tools and flagged threats. Then I spent 3.5 years at `}
        <a
          href="https://www.heyethos.com/"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Ethos
        </a>
        {`, where I helped take the product from a single-tenant MVP to a multi-tenant SaaS serving 50+ merchants. Now I'm at `}
        <a
          href="https://oloodi.com/"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Oloodi
        </a>
        {` doing customer engineering for KROW Workforce, a hospitality staffing platform.`}
      </p>
      <p className="mb-4">
        {`On the side, I `}
        <a
          href="/work"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          consult
        </a>
        {` for small businesses and build `}
        <a
          href="/projects"
          className="text-neutral-900 dark:text-neutral-100 underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          projects
        </a>
        {` that interest me.`}
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

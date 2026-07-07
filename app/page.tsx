import Link from "next/link";
import { getBlogPosts } from "app/blog/utils";

type BlogPost = ReturnType<typeof getBlogPosts>[number];

const linkClass =
  "underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 dark:decoration-neutral-700 dark:hover:text-neutral-50";

const featuredPostSlugs = [
  "clip-sees-bureaucracy",
  "books-read-2025",
  "bitcoin-whitepaper",
];

export default function Page() {
  const postsBySlug = new Map(getBlogPosts().map((post) => [post.slug, post]));
  const featuredPosts = featuredPostSlugs
    .map((slug) => postsBySlug.get(slug))
    .filter((post): post is BlogPost => Boolean(post));

  return (
    <section className="space-y-10">
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold">Wielfried Zouantcha</h1>
        <p className="leading-7 text-neutral-800 dark:text-neutral-200">
          I'm an engineer based in Washington DC 🇺🇸. I work at{" "}
          <a href="https://oloodi.com/" className={linkClass}>
            Oloodi
          </a>{" "}
          on customer engineering and full-stack development for KROW Workforce,
          a hospitality staffing platform.
        </p>
        <p className="leading-7 text-neutral-800 dark:text-neutral-200">
          Before that, I helped take{" "}
          <a href="https://www.heyethos.com/" className={linkClass}>
            ethos
          </a>{" "}
          from a single-tenant MVP to a multi-tenant SaaS product, and built
          security integrations at{" "}
          <a href="https://saasalerts.com/" className={linkClass}>
            SaaS Alerts
          </a>
          .
        </p>
        <p className="leading-7 text-neutral-800 dark:text-neutral-200">
          I build{" "}
          <Link href="/projects" className={linkClass}>
            projects
          </Link>{" "}
          that interest me, and spend a lot of time{" "}
          <Link href="/blog/books-read-2025" className={linkClass}>
            reading
          </Link>
          .
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Writing
        </h2>
        <ul className="space-y-2">
          {featuredPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={linkClass}>
                {post.metadata.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/blog" className={linkClass}>
              All writing
            </Link>
          </li>
        </ul>
      </div>

      <p className="leading-7 text-neutral-800 dark:text-neutral-200">
        You can read more about my{" "}
        <Link href="/work" className={linkClass}>
          work
        </Link>
        , look through{" "}
        <Link href="/projects" className={linkClass}>
          recent projects
        </Link>
        , or find me on{" "}
        <a href="https://github.com/zouantchaw" className={linkClass}>
          GitHub
        </a>{" "}
        and{" "}
        <a href="https://twitter.com/love_thegame_" className={linkClass}>
          X
        </a>
        .
      </p>
    </section>
  );
}

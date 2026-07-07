export const metadata = {
  title: "Projects",
  description: "Things I've built recently.",
};

const linkClass =
  "underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 dark:decoration-neutral-700 dark:hover:text-neutral-50";

const projects = [
  {
    title: "Montreal Archives Search",
    summary:
      "Search engine for 14,822 historical photos from the Montreal city archives.",
    body: "Started as an Instagram account sharing old Montreal photos and became a search platform with keyword, semantic, and visual search over archival images.",
    stack:
      "TypeScript, Python, Cloudflare Workers, D1, Vectorize, R2, Workers AI, CLIP, Next.js",
    links: [
      {
        href: "https://www.mtlarchives.com/",
        label: "visit site",
      },
      {
        href: "https://github.com/zouantchaw/mtl-archives-search",
        label: "code repo",
      },
    ],
  },
];

export default function Page() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="leading-7 text-neutral-700 dark:text-neutral-300">
          A recent personal project.
        </p>
      </div>

      <div className="space-y-9">
        {projects.map((project) => (
          <section key={project.title} className="space-y-3">
            <div>
              <h2 className="text-lg font-medium">{project.title}</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {project.summary}
              </p>
            </div>
            <p className="leading-7 text-neutral-700 dark:text-neutral-300">
              {project.body}
            </p>
            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              {project.stack}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={linkClass}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

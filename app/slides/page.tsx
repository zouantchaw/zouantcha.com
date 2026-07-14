import Link from "next/link";

export const metadata = {
  title: "Slides",
  description: "Shared slide decks and project briefs by Wielfried Zouantcha.",
};

const linkClass =
  "underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950 dark:decoration-neutral-700 dark:hover:text-neutral-50";

const slides = [
  {
    title: "PortMind: Past Seven Days",
    description: "A metrics-led update on PortMind's latest data, review, and evaluation work.",
    href: "/slides/portmind-past-seven-days.html",
  },
  {
    title: "PortMind ML Project Brief",
    description: "A project brief for the PortMind machine-learning work.",
    href: "/slides/portmind-ml-project-brief.html",
  },
];

export default function Page() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Slides</h1>
        <p className="leading-7 text-neutral-700 dark:text-neutral-300">
          Shared slide decks and project briefs.
        </p>
      </div>

      <div className="space-y-4">
        {slides.map((slide) => (
          <article key={slide.href} className="space-y-1">
            <h2 className="text-lg font-medium">
              <Link href={slide.href} className={linkClass}>
                {slide.title}
              </Link>
            </h2>
            <p className="leading-7 text-neutral-700 dark:text-neutral-300">
              {slide.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

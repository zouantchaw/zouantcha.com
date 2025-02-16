import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "Cool stuff I'm building on the side.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">projects</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        projects I'm currently hacking on.
      </p>

      <div className="space-y-10">
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
          <h2 className="font-semibold text-xl mb-2">Ballerz Football Academy</h2>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            Soccer training and player management
          </span>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            A multi-tenant platform featuring a landing page with dedicated admin and player portals. 
            Staff can manage players, sessions, bookings, availability, and process payments through 
            an admin interface. Players access their bookings, check trainer availability, 
            and track training progress in their personalized portal. Built with Next.js, TypeScript, 
            and Tailwind CSS using Shadcn UI components. Deployed on Vercel with Supabase as the database.
          </p>
          <Link
            href="https://ballerzfootballacademy.com"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block mr-4"
          >
            visit site
          </Link>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
          <h2 className="font-semibold text-xl mb-2">mtlarchives</h2>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            Bringing Montreal's history to the digital age.
          </span>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            I stumbled on this goldmine of old Montreal pics on the city's Open
            Data portal. I thought it'd be cool to share, so I whipped up an{" "}
            <a
              href="https://www.instagram.com/mtlarchives/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Instagram
            </a>{" "}
            account. It's blowing up - almost 3k followers now! Got inspired and
            built a{" "}
            <a
              href="https://mtlarchives.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              photo blog
            </a>{" "}
            with Next.js. It's not breaking the internet yet, but we're getting
            about 90 curious history buffs checking it out each month.
          </p>
          <Link
            href="https://github.com/zouantchaw/mtlarchives"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
          >
            peek at the code
          </Link>
        </div>
      </div>
    </section>
  );
}

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
        Projects I'm currently hacking on and client work I've shipped.
      </p>

      <div className="space-y-10">
        {/* mtlarchives */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
          <h2 className="font-semibold text-xl mb-2">mtlarchives</h2>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            Semantic search for Montreal's historical photo archives
          </span>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Started as an{" "}
            <a
              href="https://www.instagram.com/mtlarchives/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Instagram account
            </a>{" "}
            sharing old Montreal photos from the city's Open Data portal. Now grown to ~3k followers
            and evolved into a full semantic search platform for ~15,000 historical images (1870s-1990s).
          </p>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Built a complete data pipeline and search API with sub-50ms response times globally:
          </p>
          <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1 text-sm">
            <li>Semantic search using BGE text embeddings on Cloudflare Vectorize</li>
            <li>Visual similarity search with CLIP embeddings (in development)</li>
            <li>ETL pipeline: metadata cleaning, date normalization, deduplication, geocoding</li>
            <li>VLM auto-captioning and OCR for data enrichment</li>
            <li>Next.js frontend with Mapbox integration for geospatial browsing</li>
          </ul>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm">
            Stack: Cloudflare Workers, D1, Vectorize, R2, Workers AI, Next.js, TypeScript, Python
          </p>
          <div className="mt-3 flex gap-4">
            <a
              href="https://mtlarchives.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              visit site
            </a>
            <a
              href="https://github.com/zouantchaw/mtl-archives-search"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              code repo
            </a>
          </div>
        </div>

        {/* Diane Party Rentals */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
          <h2 className="font-semibold text-xl mb-2">Diane Party Rentals</h2>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            Custom ERP for event rental business
          </span>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Replaced manual paper-based workflows with a custom ERP system featuring automated
            quoting, real-time inventory locking (optimistic concurrency), and Stripe payment
            processing. The system handles the full rental lifecycle from quote to return.
            Built with Next.js, TypeScript, and PostgreSQL.
          </p>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            Impact: Reduced quote turnaround from 24h to &lt;2h
          </p>
          <a
            href="https://www.dianepartyrentals.com/"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
          >
            visit site
          </a>
        </div>

        {/* Ballerz Football Academy */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
          <h2 className="font-semibold text-xl mb-2">Ballerz Football Academy</h2>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            Scheduling and payout platform for youth sports
          </span>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            A multi-tenant platform featuring a landing page with dedicated admin and player portals.
            Staff can manage players, sessions, bookings, availability, and process payments through
            an admin interface. Players access their bookings, check trainer availability,
            and track training progress in their personalized portal. Built with Next.js, TypeScript,
            Tailwind CSS, and Cal.com for scheduling. Deployed on Vercel with Supabase.
          </p>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            Impact: Handling 100+ monthly sessions, eliminated manual scheduling overhead
          </p>
          <Link
            href="https://ballerzfootballacademy.com"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block mr-4"
          >
            visit site
          </Link>
        </div>
      </div>
    </section>
  );
}

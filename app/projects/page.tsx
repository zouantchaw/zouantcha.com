import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "Things I've built recently.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">projects</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        Things I've built recently, from personal projects to client work.
      </p>

      <div className="space-y-10">
        {/* Port Observatory MTL */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
          <h2 className="font-semibold text-xl mb-2">Port Observatory MTL</h2>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            Real-time maritime data platform for the Port of Montreal
          </span>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Built a real-time vessel tracking platform that ingests live AIS data via WebSocket,
            runs DETR object detection and LLaVA vision-language inference on 480+ daily webcam
            snapshots, and correlates vessel schedules with truck activity.
          </p>
          <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1 text-sm">
            <li>Sharded cron system on Cloudflare Workers to spread model inference across time windows</li>
            <li>175K+ activity snapshots accumulated in D1 with R2 for image and video storage</li>
            <li>5+ external data sources (AIS stream, port webcams, Quebec 511 traffic, terminal schedules, weather) in one dashboard</li>
            <li>Staleness tracking and graceful fallbacks when data sources go stale</li>
          </ul>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm">
            Stack: TypeScript, Next.js, Python, Cloudflare Workers, D1, R2, Workers AI, MapLibre, WebSocket
          </p>
          <div className="mt-3 flex gap-4">
            <a
              href="https://port-observatory-mtl.vercel.app/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              visit site
            </a>
          </div>
        </div>

        {/* mtlarchives */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
          <h2 className="font-semibold text-xl mb-2">Montreal Archives Search</h2>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            Search engine for 14,822 historical photos from the Montreal city archives
          </span>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Started as an{" "}
            <a
              href="https://www.instagram.com/mtlarchives/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Instagram account
            </a>{" "}
            sharing old Montreal photos from the city's Open Data portal. Grew to ~3k followers
            and evolved into a full search platform for ~15,000 historical images (1870s-1990s).
          </p>
          <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1 text-sm">
            <li>Three search modes: keyword, semantic (BGE embeddings), visual (CLIP)</li>
            <li>8-stage streaming ETL pipeline (Python + TypeScript) that cleans French-language archival metadata, generates VLM captions, runs OCR, and scores trust per field</li>
            <li>Production vector search on Cloudflare Vectorize (1024-dim BGE + 512-dim CLIP indices)</li>
            <li>Sub-50ms response times globally on Cloudflare's edge</li>
          </ul>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm">
            Stack: TypeScript, Python, Cloudflare Workers, D1, Vectorize, R2, Workers AI, CLIP, Next.js
          </p>
          <div className="mt-3 flex gap-4">
            <a
              href="https://www.mtlarchives.com/"
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
            Replaced paper-based workflows with a custom ERP: automated quoting,
            real-time inventory locking (optimistic concurrency), and Stripe payment
            processing. Handles the full rental lifecycle from quote to return.
          </p>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            Cut quote turnaround from 24h to under 2h
          </p>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm">
            Stack: Next.js, TypeScript, PostgreSQL, Stripe
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
            Admin and player portals for managing sessions, bookings, availability, and payments.
            Players check trainer availability and track progress. Staff handle scheduling and payouts.
          </p>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            Handling 100+ monthly sessions
          </p>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm">
            Stack: Next.js, TypeScript, Tailwind CSS, Cal.com, Supabase
          </p>
          <Link
            href="https://www.ballerzfootballacademy.com/"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
          >
            visit site
          </Link>
        </div>
      </div>
    </section>
  );
}

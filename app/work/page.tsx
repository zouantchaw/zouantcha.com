export const metadata = {
  title: 'Work',
  description: 'My work history.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">work</h1>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        5+ years building data-heavy applications end-to-end: ETL pipelines, model inference, production frontends.
      </p>

      {/* Oloodi */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          Oloodi Technologies
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
          Customer Engineer (Contract) · November 2025 - Present
        </span>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Run product demos for clients during sprint updates, presenting what the engineering team shipped and how it works. Act as the bridge between engineering and clients, turning technical details into walkthroughs that make sense to non-technical stakeholders.
        </p>
      </div>

      {/* Ethos */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          Ethos
        </h2>
        <div className="space-y-6">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              Senior Full Stack Engineer · May 2022 - November 2025
            </span>
            <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1">
              <li>Took the product from a single-tenant MVP to a multi-tenant SaaS on Next.js, Node.js, and Azure. Built the identity management and access control layer serving 50+ merchant accounts.</li>
              <li>Built internal API layers (Jade and Ruby SDKs) that give the frontend a clean interface over complex backend operations. &lt;1% transaction failure rate in production.</li>
              <li>Wrote deep Shopify POS integrations with &lt;100ms latency for real-time sync between physical retail locations and cloud infrastructure.</li>
              <li>Set frontend coding standards and drove architectural decisions across the Luna codebase in a 5-person team.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Independent Consulting */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          Independent Consulting
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
          Engineering Consultant · January 2023 - Present
        </span>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Partner directly with business owners to gather requirements, architect solutions, and ship production systems.
        </p>
        <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><strong>Diane Party Rentals:</strong> Replaced paper-based workflows with a custom ERP: automated quoting, real-time inventory locking, Stripe payments. Cut quote turnaround from 24h to under 2h.</li>
          <li><strong>Ballerz Football Academy:</strong> Built a scheduling and payout platform (Next.js, Cal.com) for session booking and trainer payouts across 100+ monthly sessions.</li>
        </ul>
      </div>

      {/* SaaS Alerts */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          SaaS Alerts
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
          Software Engineer (Integrations & Security) · October 2020 - December 2021
        </span>
        <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li>Built log ingestion connectors for major MSP platforms (IT Glue, Datto RMM, ConnectWise, Kaseya), normalizing event data into a unified security schema.</li>
          <li>Wrote RESTful endpoints for security event processing that cut manual analyst review time and improved mean-time-to-detection for critical alerts.</li>
          <li>Dug into Microsoft Graph API and Kibana logs to build detection logic for silent MFA modifications and unauthorized file sharing.</li>
        </ul>
      </div>

      {/* StackLabs */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          StackLabs
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
          Frontend Engineer (Contract) · January 2020 - October 2020
        </span>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Shipped frontend work for agency clients in React and JavaScript (ES6+), working with backend teams to wire up REST APIs.
        </p>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h2 className="font-semibold text-xl mb-4 tracking-tighter">skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
          <div>
            <span className="font-medium">Languages:</span> TypeScript, JavaScript, Python, SQL
          </div>
          <div>
            <span className="font-medium">Frontend:</span> React, Next.js, Vue.js, Tailwind CSS, MapLibre GL
          </div>
          <div>
            <span className="font-medium">Backend:</span> Node.js, Express, PostgreSQL, Prisma, Cloudflare Workers, D1
          </div>
          <div>
            <span className="font-medium">Data & Models:</span> Vector Search (CLIP, BGE), DETR, LLaVA, ETL Pipelines, OCR
          </div>
          <div>
            <span className="font-medium">Cloud:</span> Cloudflare (Workers, D1, R2, Vectorize), Azure, Vercel, Docker, GitHub Actions
          </div>
          <div>
            <span className="font-medium">Practices:</span> Agile, System Architecture, API Integration, Data Pipeline Design
          </div>
        </div>
      </div>
    </section>
  )
}

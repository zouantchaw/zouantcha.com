export const metadata = {
  title: 'Work',
  description: 'My work history.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">work</h1>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        5+ years building scalable systems, leading cross-functional projects, and shipping products that matter.
      </p>

      {/* Ethos */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          ethos
        </h2>
        <div className="space-y-4">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              Senior Full Stack Engineer (Frontend Lead) · May 2022 - Present
            </span>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Leading frontend development of the Luna self-serve platform within a 5-person engineering team. Drove architectural decisions for the Shopify App (v2) and established frontend coding standards.
            </p>
            <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1">
              <li>Led the transformation from single-tenant MVP to scalable multi-tenant SaaS using Next.js, Node.js, and Azure</li>
              <li>Architected the Jade and Ruby API layers, internal SDKs that abstract complex backend operations</li>
              <li>Engineered Shopify POS integrations with &lt;100ms latency for real-time data sync</li>
              <li>Early adopter of AI coding tools (ChatGPT, Cursor, Claude Code), becoming the team's technical reference</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oloodi */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          Oloodi Technologies
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
          Solutions Engineer (Contract) · October 2025 - Present
        </span>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Lead product demonstrations for engineering team deliverables, presenting new features to clients during sprint updates. Bridge engineering and client teams by translating technical implementations into clear, actionable walkthroughs.
        </p>
      </div>

      {/* SaaS Alerts */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-6 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          SaaS Alerts
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
          Software Engineer (Integrations & Security) · October 2020 - December 2021
        </span>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Security monitoring platform for Managed Service Providers (MSPs). Led research and implementation of log ingestion connectors for major MSP platforms.
        </p>
        <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li>Built connectors for IT Glue, Datto RMM, ConnectWise, and Kaseya</li>
          <li>Conducted deep analysis on Microsoft Graph API and Kibana logs for threat detection</li>
          <li>Enriched alerting engine with geolocation data and improved critical alert routing</li>
          <li>Championed GitLab workflow best practices and Conventional Commits</li>
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
          Delivered frontend solutions for agency clients using React and JavaScript (ES6+). Built reusable UI components and implemented responsive designs across multiple client projects.
        </p>
      </div>

      {/* Independent Consulting */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 text-blue-600 dark:text-blue-400">
          Independent Consulting
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
          Engineering Consultant · January 2023 - Present
        </span>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Partner directly with business owners to gather requirements, architect solutions, and deliver production systems.
        </p>
        <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300 space-y-1">
          <li><strong>Diane Party Rentals:</strong> Built custom ERP with automated quoting, inventory locking, and Stripe payments. Reduced quote turnaround from 24h to &lt;2h.</li>
          <li><strong>Ballerz Football Academy:</strong> Scheduling and payout platform handling 100+ monthly sessions.</li>
        </ul>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h2 className="font-semibold text-xl mb-4 tracking-tighter">skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
          <div>
            <span className="font-medium">Languages:</span> TypeScript, JavaScript, SQL, Ruby
          </div>
          <div>
            <span className="font-medium">Frontend:</span> React, Next.js, Vue.js, Tailwind CSS
          </div>
          <div>
            <span className="font-medium">Backend:</span> Node.js, Express, PostgreSQL, Prisma
          </div>
          <div>
            <span className="font-medium">Cloud:</span> Azure, Vercel, Docker, GitHub Actions
          </div>
          <div>
            <span className="font-medium">AI Tools:</span> Claude Code, Cursor, GitHub Copilot
          </div>
          <div>
            <span className="font-medium">Practices:</span> Agile, Code Review, System Architecture
          </div>
        </div>
      </div>
    </section>
  )
}

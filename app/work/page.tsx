import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Work',
  description: 'My work history.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">work</h1>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        a summary of my work so far.
      </p>

      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm mb-8 border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 mt-8 text-blue-600 dark:text-blue-400">
          ethos
        </h2>
        <div className="space-y-4">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              Full-stack developer 2024 - Present
            </span>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              After establishing our blockchain infrastructure, I transitioned to a full-stack role where I've been focusing on:
            </p>
            <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300">
              <li>Leading the frontend development of our client dashboard, incorporating next.js to enhance our frontend development, alongside shadcn, a bespoke UI library for crafting our UI components.</li>
              <li>Developing our Shopify app and extension, enabling our users to integrate their Shopify stores with our platform.</li>
            </ul>
          </div>
          
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              Blockchain developer 2022 - 2024
            </span>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              I joined ethos at an early stage as a blockchain developer, where I:
            </p>
            <ul className="list-disc list-inside mt-2 text-neutral-700 dark:text-neutral-300">
              <li>Developed our onchain infrastructure to enable interaction with Ethereum and its Layer 2 ecosystem.</li>
              <li>Built and maintained smart contracts for our core protocol functionality.</li>
              <li>Implemented secure wallet integration and transaction handling systems.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800">
        <h2 className="font-semibold text-xl mb-4 mt-8 text-blue-600 dark:text-blue-400">
          saasalerts
        </h2>
        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
          Frontend developer 2020 - 2021
        </span>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          SaaSAlerts is a security monitoring platform for Managed Service Providers (MSPs). During my time there I gained my first production experience with React and Typescript. I worked on the frontend to help our users better understand data inflows from services like AWS, Azure, GCP, ITGlue, Kibana.
        </p>
      </div>
    </section>
  )
}

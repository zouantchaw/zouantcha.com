import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Work',
  description: 'My work history.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">work</h1>
      <p className="mb-4 text-gray-700 leading-relaxed">a summary of my work so far.</p>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="font-semibold text-xl mb-4 mt-8 text-blue-600">ethos</h2>
        <span className="text-gray-500 text-sm">Full-stack developer 2022 - Present</span>
        <p className="mt-2 text-gray-700 leading-relaxed">
          I joined ethos at an early stage, initially contributing as a blockchain developer before transitioning into a full-stack developer role. Throughout my tenure, I've worked on several projects, such as:
        </p>
        <ul className="list-disc list-inside mt-2 mb-4 text-gray-700">
          <li>Developing our onchain infrastructure to enable interaction with Ethereum and its Layer 2 ecosystem.</li>
          <li>Developing our Shopify app and extension, enabling our users to integrate their Shopify stores with our platform.</li>
          <li>Leading the frontend development of our admin dashboard, incorporating next.js to enhance our frontend development, alongside shadcn, a bespoke UI library for crafting our UI components.</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="font-semibold text-xl mb-4 mt-8 text-blue-600">saasalerts</h2>
        <span className="text-gray-500 text-sm">Frontend developer 2020 - 2021</span>
        <p className="mt-2 text-gray-7000 leading-relaxed">
          SaaSAlerts is security monitoring platform for MSPs. During my time at SaaSAlerts, I gained my first production experience with React and Typescript. I worked on the frontend to help our users better understand data inflows from services like AWS, Azure, GCP, ITGlue, Kibana.
        </p>
      </div>
    </section>
  )
}

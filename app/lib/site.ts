export const site = {
  name: 'Wiel Zouantcha',
  formalName: 'Wielfried Zouantcha',
  title: 'Software Engineer — Product, Data & AI',
  headline: 'Software, research, and reading notes.',
  location: 'Washington, DC',
  email: 'zouantchaw74@gmail.com',
  github: 'https://github.com/zouantchaw',
  x: 'https://twitter.com/love_thegame_',
  linkedin: 'https://www.linkedin.com/in/wielfried-zouantcha-6b4722136/',
  description:
    'Wiel Zouantcha is a software engineer working across product, data and applied AI. Software, research, writings and notes.',
  socialDescription:
    'Wiel Zouantcha: Software Engineer — Product, Data & AI. Products, research, writings and notes.',
}

export const nav = [
  { href: '/case-studies', label: 'Case studies' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/bookshelf', label: 'Bookshelf' },
]

export const intro = {
  eyebrow: 'Software Engineer — Product, Data & AI',
  title: 'What I do',
  body: [
    'I work at the intersection of design, engineering, and operations. Developing the product, shaping brand and interface, and taking ambitious projects from the first sketch to the finished thing.',
    "I've worked across SaaS security, commerce, blockchain, and workforce software with companies like SaaS Alerts, Ethos, and Oloodi.",
    'I also built MTL Archives, an independent search engine over 14,822 Montreal archive photos, with a daily game that has 2,500+ players and a social pipeline that did 2.66 million Instagram and Facebook views in seven months.',
  ],
}

export const aboutWork = {
  eyebrow: 'About my work',
  title: 'What I do',
  body: [
    'I work at the intersection of design, engineering, and operations. Developing the product, shaping brand and interface, and taking ambitious projects from the first sketch to the finished thing.',
    "I've worked across SaaS security, commerce, blockchain, and workforce software with companies like SaaS Alerts, Ethos, and Oloodi.",
    'I also built MTL Archives, an independent search engine over 14,822 Montreal archive photos, with a daily game that has 2,500+ players and a social pipeline that did 2.66 million Instagram and Facebook views in seven months.',
  ],
}

export const record = [
  {
    value: '5+ yrs',
    label: 'Production software',
    href: '/work',
  },
  {
    value: '5 products',
    label: 'Independent systems',
    href: '/case-studies',
  },
  {
    value: '14,822',
    label: 'MTL Archives',
    href: '/case-studies/mtl-archives',
  },
]

export const about = {
  eyebrow: 'Get to know me',
  title:
    'I build software for problems that don’t fit neatly into the interface.',
  body: [
    'I’m Wiel Zouantcha, a software engineer working across product, data and applied AI, based in Washington, DC.',
    'I’m interested in what happens when software has to represent something that isn’t clear-cut: an incomplete archive record, a truck partly hidden in a photograph, or a delivery that competes with another booking. The interface has to make sense, but so do the records and decisions behind it.',
    'I came into software without a conventional computer-science path and learned by building. At SaaS Alerts, production integrations taught me to work with inconsistent data and incomplete documentation. I later spent three and a half years at Ethos working across commerce and merchant software. Today, I combine full-stack development and customer engineering at Oloodi.',
    'I don’t always start with a product in mind. Browsing Montréal’s public datasets led to MTL Archives. Collecting observations of the port led to PortMind and questions about how to evaluate vision models. Working with Diane Party Rentals meant following a booking beyond checkout to the equipment, crew and customer waiting for it.',
    'Building gives me a way to stay with a question. I can follow it into the data, make something someone can use, and find out where my understanding was incomplete.',
  ],
  principles: [
    {
      title: 'Start with the operation',
      body: 'I want to understand how the work happens before deciding what the interface should be.',
      evidence: {
        label: 'DPR: from booking to delivery',
        href: '/case-studies/diane-party-rentals#getting-everything-there',
      },
    },
    {
      title: 'Make uncertainty visible',
      body: 'Missing data, model disagreement and ambiguous rules should stay visible to the person making the decision.',
      evidence: {
        label: 'PortMind: checking the benchmark',
        href: '/case-studies/portmind#check-the-benchmark-before-trusting-the-score',
      },
    },

    {
      title: 'Treat reliability as product work',
      body: 'Health checks, permissions, audit trails and failure behavior affect whether someone can rely on the product.',
      evidence: {
        label: 'Starthome: keeping the record consistent',
        href: '/case-studies/starthome#the-record-changes-state',
      },
    },
    {
      title: 'Use AI as leverage, not evidence',
      body: 'A model can help me build or explore faster. Its output still needs to be checked against the task, the source material and the people using it.',
      evidence: {
        label: 'MTL Archives: testing a replacement model',
        href: '/case-studies/mtl-archives#trying-a-replacement-before-changing-the-index',
      },
    },
    {
      title: 'Build across boundaries',
      body: 'I move between product conversations, interfaces, APIs, data models, tests and deployment. A workflow often needs changes in more than one of those places.',
      evidence: {
        label: 'Oloodi: engineering and customer work',
        href: '/work/oloodi',
      },
    },
  ],
  outside:
    'I’m a father, an avid reader, and someone who spends a lot of time thinking about cities, history, business, and how technology changes what small teams can build. When I’m not working, I’m usually training, reading, traveling, or somewhere inside an archive of old Montreal photographs.',
}

export type Experience = {
  slug: string
  company: string
  href?: string
  role: string
  period: string
  body: string[]
  sections: { title: string; body: string[] }[]
}

export const experience: Experience[] = [
  {
    slug: 'oloodi',
    company: 'Oloodi Technologies',
    href: 'https://oloodi.com/',
    role: 'Customer Engineer / Full-Stack Engineer · Contract',
    period: 'November 2025–present',
    body: [
      'At Oloodi, I work on KROW Workforce, which connects staffing companies, their clients and the people working each shift. My role combines building the product with helping people understand how it fits their operation.',
      'I work across staffing workflows and give product demos to teams including Snapchat, Google, EA Sports and Nvidia. That puts me close to both the implementation and the questions people ask when they first use it.',
    ],
    sections: [
      {
        title: 'Following the staffing order',
        body: [
          'A staffing request moves between the client, the staffing company and the worker. I work on the steps between them: onboarding, shift assignments, certifications, time tracking and invoicing. A change in one part of that process often has consequences somewhere else.',
          'My engineering work spans the React and TypeScript portal and its backend services. I work with the team on the interface and the underlying records, so the workflow someone sees agrees with what the system has stored.',
        ],
      },
      {
        title: 'Showing the product in someone else’s context',
        body: [
          'For a demo, I prepare the walkthrough around how that team would use the product: requesting staff, checking attendance and reviewing invoices. I have presented to teams at Snapchat, Google, EA Sports and Nvidia.',
          'Customer engineering gives me another way to examine the product. If a step is hard to explain, or someone expects it to work differently, I can take that question back into the implementation with the team.',
        ],
      },
    ],
  },
  {
    slug: 'ethos',
    company: 'Ethos / HeyEthos',
    href: 'https://www.heyethos.com/',
    role: 'Senior Full-Stack Engineer',
    period: 'May 2022–November 2025',
    body: [
      'I joined Ethos through blockchain work and stayed for three and a half years as the product grew into membership and loyalty software for merchants.',
      'My work moved from contracts and supporting APIs into Shopify storefronts, checkout and point-of-sale integrations, and Luna, the merchant platform. I worked across the customer experience and the tools a brand used to manage it.',
    ],
    sections: [
      {
        title: 'Starting below the interface',
        body: [
          'My early work included contracts on Flow and Ethereum and the services connecting them to the application. I worked on issuing digital assets, managing collection metadata and making those operations available to the frontend. That also meant testing deployments and working through external contract audits.',
          'As the product evolved, more of my work moved into the application around those capabilities. A merchant needed to configure a membership and its benefits; a customer needed to join, see their status and use the benefit in the store. The contract was one part of that experience.',
        ],
      },
      {
        title: 'Making loyalty work inside a store',
        body: [
          'The Shopify work covered member-only products, early access, discounts and rewards. Those features had to fit into stores with different themes and purchasing flows. I worked on the app and its extensions, alongside the request verification and webhook handling that connected store activity to Ethos.',
          'One concrete problem was the invitation to join a loyalty program from the cart. Some merchants had a cart page; others used a cart drawer. A component that worked on one did not automatically have a place on the other. My notes from that work track theme targeting, extension placement and manual integration where the theme required it.',
          'I also worked through the distinction between storefront, checkout, order-status and point-of-sale surfaces. They offered different integration paths. Making installation easier meant understanding those limits, not treating every store as the same page.',
        ],
      },
      {
        title: 'Giving merchants a place to manage the program',
        body: [
          'In Luna, I worked on the self-serve interface for configuring and managing the program. That included onboarding, membership settings, member lists and individual member views. Later work included integrations, reports and billing screens.',
          'Product reviews helped identify where the navigation made routine work harder than it needed to be. Memberships and benefits were a recurring example: the team wanted those tasks closer to the brand context. I worked through the interface changes alongside the state and save behavior behind them.',
          'That range is what stands out to me about Ethos. I could follow a feature from its underlying operation through the store experience and into the merchant’s admin, working with the product and engineering team as the requirements changed.',
        ],
      },
    ],
  },
  {
    slug: 'independent',
    company: 'Independent work',
    role: 'Software Engineer — Product, Data & AI',
    period: 'January 2023–present',
    body: [
      'I work directly with founders and operating businesses, from figuring out what the product needs to do through designing and building it.',
      'For Diane Party Rentals, that meant connecting quotes, payments and rental operations. For Starthome, it meant working with the founder on a mobile inspection workflow. My independent research projects, MTL Archives and PortMind, have their own detailed case studies.',
    ],
    sections: [
      {
        title: 'Working directly with the person using the system',
        body: [
          'The starting point is usually a process someone can explain better than they can specify. I ask them to walk through a booking, a delivery or an inspection, including what happens when something changes. Those conversations become the screens and records I build.',
          'The case studies follow that work in detail, including the evidence available so far and the parts still being validated.',
        ],
      },
    ],
  },
  {
    slug: 'saas-alerts',
    company: 'SaaS Alerts',
    href: 'https://saasalerts.com/',
    role: 'Software Engineer · Integrations & Security',
    period: 'October 2020–December 2021',
    body: [
      'SaaS Alerts was my first production software role. I worked on integrations that helped managed service providers monitor security events across IT Glue, Datto, ConnectWise, Kaseya and Microsoft Graph.',
      'Much of the work was investigative: recreating an event, inspecting the vendor’s response and finding out whether the signal we wanted was actually available.',
    ],
    sections: [
      {
        title: 'Working with what an API actually exposes',
        body: [
          'Different vendors represented similar activity in different ways. I worked on connecting those sources and normalizing their events into a shared security schema, so they could be understood within the same monitoring product.',
          'When a desired signal was missing, I had to distinguish an integration problem from a limitation of the source. Reproducing events, comparing the raw data and documenting unsupported behavior were part of the engineering work. That experience still shapes how I approach external integrations.',
        ],
      },
    ],
  },
]

export const contact = {
  title: 'Email is the fastest way.',
  hiring: {
    title: 'Hiring?',
    body: 'I’m interested in software engineering roles where I can work across product, backend systems, data and applied AI. Tell me about the team, the product, and what you need help building.',
  },
  project: {
    title: 'Got an operations problem?',
    body: 'Tell me what you’re working on, who will use it, and where you’re getting stuck. A few sentences are enough to start.',
    subject: 'Project inquiry',
  },
}

export const featuredWriting = [
  {
    slug: 'clip-sees-bureaucracy',
    title: 'CLIP sees bureaucracy',
    summary:
      'What happens when you embed 14,715 historical Montreal photographs and look at the archive through a vision model.',
    source: 'Original',
  },
  {
    slug: 'books-read-2025',
    title: 'Books read in 2025',
    summary: 'Notes on the books I read this year.',
    source: 'Notes',
  },
]

export function mailto(subject?: string) {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${site.email}${params}`
}

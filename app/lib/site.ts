export const site = {
  name: 'Wiel Zouantcha',
  formalName: 'Wielfried Zouantcha',
  title: 'Full Stack Design Engineer',
  headline: 'Software, research, and reading notes.',
  location: 'Washington, DC',
  email: 'zouantchaw74@gmail.com',
  github: 'https://github.com/zouantchaw',
  x: 'https://twitter.com/love_thegame_',
  linkedin: 'https://www.linkedin.com/in/wielfried-zouantcha-6b4722136/',
  description:
    'Wiel Zouantcha is a full stack design engineer. A personal index of software, research, reading, and the work behind it.',
  socialDescription:
    'Wiel Zouantcha: design engineering, Montréal archives, port research, and reading notes.',
}

export const nav = [
  { href: '/case-studies', label: 'Case studies' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/bookshelf', label: 'Bookshelf' },
]

export const intro = {
  eyebrow: 'Full Stack Design Engineer',
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
  title: 'I didn’t start in software.',
  body: [
    'I’m Wiel Zouantcha, a full stack design engineer based in Washington, DC.',
    'I did not follow a conventional computer-science path. I studied pre-nursing, stepped away, and eventually completed a full-stack software engineering program at Flatiron School. My first production role was at SaaS Alerts, where I learned that integration work is rarely about connecting two clean APIs. It is about inconsistent data, incomplete documentation, operational constraints, and making careful claims about what the system actually knows.',
    'I later spent three and a half years at Ethos. I joined through blockchain work and grew into a senior full-stack role spanning commerce, product interfaces, internal APIs, multi-tenant systems, and production reliability.',
    'Alongside that work, I kept building products of my own. MTL Archives began with a public dataset and became a cultural archive. Port Observatory MTL started as a live view of the Port of Montreal. That work became PortMind, an ongoing research project: a benchmark for port-operations AI on this dataset. Diane Party Rentals put me inside the operational reality of a physical business rather than outside it writing software requirements.',
    'I don’t always start with a product in mind. Sometimes I’m just curious about a city, a photograph, or how someone runs their business. Building gives me a way to stay with that curiosity. I can follow it from a question into the data, the interface, and eventually a conversation with someone using what I made.',
  ],
  principles: [
    {
      title: 'Start with the operation',
      body: 'I want to understand how the work happens before deciding what the interface should be.',
    },
    {
      title: 'Make uncertainty visible',
      body: 'Missing data, model disagreement, and ambiguous rules should show up in the product. Do not hide them behind confident UI.',
    },
    {
      title: 'Build across boundaries',
      body: 'I am comfortable moving between product conversations, frontend interfaces, APIs, data models, tests, and deployment.',
    },
    {
      title: 'Treat reliability as product work',
      body: 'Health checks, permissions, audit trails, and failure behavior affect whether users trust the system.',
    },
    {
      title: 'Use AI as leverage, not evidence',
      body: 'Faster implementation is useful; evaluation and judgment still determine whether the result is good.',
    },
  ],
  outside:
    'I’m a father, an avid reader, and someone who spends a lot of time thinking about cities, history, business, and how technology changes what small teams can build. When I’m not working, I’m usually training, reading, traveling, or somewhere inside an archive of old Montreal photographs.',
}

export const experience = [
  {
    company: 'Oloodi Technologies',
    href: 'https://oloodi.com/',
    role: 'Customer Engineer / Full-Stack Engineer',
    period: '2026–present',
    body: [
      'At Oloodi, I build KROW Workforce, which connects staffing companies, their clients, and the people working each shift. I work on both the product and the conversations around it.',
      'A staffing order runs through a lot of hands. I work on the steps between them: onboarding, assigning shifts, checking certifications, recording time, and turning timesheets into invoices. The code spans a React and TypeScript portal, Node.js services, Firebase, PostgreSQL, and Cloud Run.',
      'I’ve given product demos to teams at Snapchat, Google, EA Sports, and Nvidia. I prepare the walkthrough around how that team would use the product, from requesting staff to checking attendance and reviewing invoices. Those conversations are also a way to find out where a workflow is confusing or incomplete.',
      'The engineering and customer work feed into each other. I can hear where someone gets stuck, trace it through the interface and backend, and work on the change with the team.',
    ],
  },
  {
    company: 'Ethos / HeyEthos',
    href: 'https://www.heyethos.com/',
    role: 'Senior Full-Stack Developer',
    period: '2022–2025',
    body: [
      'I joined Ethos through blockchain work and stayed for three and a half years. My role grew into building the product around it: Shopify apps, checkout and point-of-sale flows, loyalty features, merchant dashboards, and the Luna self-serve platform.',
      'I worked across React and Next.js interfaces, Node.js APIs, and deployment on Azure and Vercel. Much of the later work was about making the product reliable for different merchants: keeping their data separate, verifying incoming webhook requests, and making cart and checkout behavior consistent across Shopify themes.',
    ],
  },
  {
    company: 'Independent work',
    role: 'Full Stack Design Engineer',
    period: '2023–present',
    body: [
      'I build software for independent products and operating businesses, including MTL Archives, PortMind, Diane Party Rentals, Ballerz Football Academy, and Starthome. This work spans data pipelines, search, AI evaluation, scheduling, quoting, inventory, payments, admin systems, and product strategy.',
    ],
  },
  {
    company: 'SaaS Alerts',
    href: 'https://saasalerts.com/',
    role: 'Software Engineer, Integrations and Security',
    period: '2020–2021',
    body: [
      'SaaS Alerts was my first production software role. I worked on integrations that helped managed service providers monitor security events across IT Glue, Datto, ConnectWise, Kaseya, and Microsoft Graph.',
      'The work taught me to recreate events, inspect raw vendor data, normalize inconsistent schemas, document unsupported security signals, and distinguish between what a product wants to detect and what an external platform can truthfully expose.',
    ],
  },
]

export const contact = {
  title: 'Email is the fastest way.',
  hiring: {
    title: 'Hiring?',
    body: 'I’m interested in roles where I can work on the interface and the engineering behind it. Tell me about the team, the product, and what you need help building.',
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

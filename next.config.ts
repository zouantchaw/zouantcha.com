import type { NextConfig } from 'next'

const resumeFilename = 'wielfried-zouantcha-resume.pdf'

const config: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/watch', destination: '/case-studies', permanent: true },
      { source: '/search', destination: '/case-studies', permanent: true },
      { source: '/topics/montreal', destination: '/case-studies/mtl-archives', permanent: true },
      { source: '/blog', destination: '/bookshelf', permanent: true },
      { source: '/lab', destination: '/case-studies', permanent: true },
      { source: '/contact', destination: '/start', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/resume.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: `inline; filename="${resumeFilename}"`,
          },
        ],
      },
      {
        source: '/wielfried-zouantcha-resume.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: `attachment; filename="${resumeFilename}"`,
          },
        ],
      },
    ]
  },
}

export default config

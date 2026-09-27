import type { NextConfig } from 'next'

const resumeFilename = 'wielfried-zouantcha-resume.pdf'

const config: NextConfig = {
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

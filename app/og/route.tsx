import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'Wielfried Zouantcha'
  let summary = url.searchParams.get('summary') || ''
  let tag = url.searchParams.get('tag') || ''

  return new ImageResponse(
    (
      <div
        tw="flex w-full h-full"
        style={{
          background: '#0a0a0a',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Left content area */}
        <div tw="flex flex-col justify-between w-full h-full p-16">
          {/* Top: tag */}
          <div tw="flex">
            {tag && (
              <span
                tw="text-sm tracking-widest"
                style={{ color: '#737373', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {tag}
              </span>
            )}
          </div>

          {/* Middle: title + summary */}
          <div tw="flex flex-col">
            <h1
              tw="text-6xl font-bold leading-tight"
              style={{ color: '#fafafa', lineHeight: 1.1 }}
            >
              {title}
            </h1>
            {summary && (
              <p
                tw="text-xl mt-6"
                style={{ color: '#a3a3a3', lineHeight: 1.5, maxWidth: '800px' }}
              >
                {summary}
              </p>
            )}
          </div>

          {/* Bottom: author */}
          <div tw="flex items-center">
            <span tw="text-sm" style={{ color: '#525252' }}>
              zouantcha.com
            </span>
          </div>
        </div>

        {/* Right accent bar */}
        <div
          tw="flex"
          style={{
            width: '6px',
            height: '100%',
            background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)',
            position: 'absolute',
            right: '0',
            top: '0',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

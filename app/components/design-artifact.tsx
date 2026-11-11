import localFont from 'next/font/local'
import type { DesignArtifactId } from 'app/lib/work'
const spectral = localFont({ src: [{ path: '../fonts/design-artifacts/spectral-600.woff2', weight: '600', style: 'normal' }, { path: '../fonts/design-artifacts/spectral-700.woff2', weight: '700', style: 'normal' }], variable: '--font-mtl-display', display: 'swap' })
const figtree = localFont({ src: [{ path: '../fonts/design-artifacts/figtree-400.woff2', weight: '400', style: 'normal' }, { path: '../fonts/design-artifacts/figtree-500.woff2', weight: '500', style: 'normal' }, { path: '../fonts/design-artifacts/figtree-600.woff2', weight: '600', style: 'normal' }], variable: '--font-mtl-sans', display: 'swap' })
const plex = localFont({ src: [{ path: '../fonts/design-artifacts/plex-400.woff2', weight: '400', style: 'normal' }, { path: '../fonts/design-artifacts/plex-500.woff2', weight: '500', style: 'normal' }], variable: '--font-mtl-mono', display: 'swap' })
const fraunces = localFont({ src: [{ path: '../fonts/design-artifacts/fraunces-700.woff2', weight: '700', style: 'normal' }, { path: '../fonts/design-artifacts/fraunces-900.woff2', weight: '900', style: 'normal' }], variable: '--font-dpr-display', display: 'swap' })
const dmSans = localFont({ src: [{ path: '../fonts/design-artifacts/dmSans-400.woff2', weight: '400', style: 'normal' }, { path: '../fonts/design-artifacts/dmSans-500.woff2', weight: '500', style: 'normal' }], variable: '--font-dpr-sans', display: 'swap' })
const montserrat = localFont({ src: [{ path: '../fonts/design-artifacts/montserrat-600.woff2', weight: '600', style: 'normal' }, { path: '../fonts/design-artifacts/montserrat-700.woff2', weight: '700', style: 'normal' }], variable: '--font-sh-display', display: 'swap' })
const manrope = localFont({ src: [{ path: '../fonts/design-artifacts/manrope-400.woff2', weight: '400', style: 'normal' }, { path: '../fonts/design-artifacts/manrope-500.woff2', weight: '500', style: 'normal' }, { path: '../fonts/design-artifacts/manrope-600.woff2', weight: '600', style: 'normal' }, { path: '../fonts/design-artifacts/manrope-700.woff2', weight: '700', style: 'normal' }], variable: '--font-sh-sans', display: 'swap' })

const fontVars = [
  spectral.variable,
  figtree.variable,
  plex.variable,
  fraunces.variable,
  dmSans.variable,
  montserrat.variable,
  manrope.variable,
].join(' ')

export function DesignArtifact({
  id,
  caption,
}: {
  id: DesignArtifactId
  caption?: string
}) {
  return (
    <figure className={`${fontVars} space-y-2`}>
      {id === 'mtl-system' ? <MtlSystem /> : null}
      {id === 'mtl-search' ? <MtlSearch /> : null}
      {id === 'portmind-marks' ? <PortmindMarks /> : null}
      {id === 'dpr-system' ? <DprSystem /> : null}
      {id === 'dpr-social' ? <DprSocial /> : null}
      {caption ? (
        <figcaption className="max-w-2xl text-[15px] italic leading-6 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function MtlRosette({
  size,
  center,
}: {
  size: number
  center: '#FAFAFA' | '#111318'
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="40" r="3.2" fill="#FF9500" />
      <circle cx="41" cy="30" r="3.5" fill="#FF9500" />
      <circle cx="59" cy="30" r="3.5" fill="#FF9500" />
      <circle cx="45" cy="20" r="3" fill="#FF9500" />
      <circle cx="55" cy="20" r="3" fill="#FF9500" />
      <circle cx="50" cy="14" r="2.2" fill="#FF9500" opacity="0.6" />
      <circle cx="60" cy="50" r="3.2" fill="#FFD60A" />
      <circle cx="70" cy="41" r="3.5" fill="#FFD60A" />
      <circle cx="70" cy="59" r="3.5" fill="#FFD60A" />
      <circle cx="80" cy="45" r="3" fill="#FFD60A" />
      <circle cx="80" cy="55" r="3" fill="#FFD60A" />
      <circle cx="86" cy="50" r="2.2" fill="#FFD60A" opacity="0.6" />
      <circle cx="50" cy="60" r="3.2" fill="#34C759" />
      <circle cx="41" cy="70" r="3.5" fill="#34C759" />
      <circle cx="59" cy="70" r="3.5" fill="#34C759" />
      <circle cx="45" cy="80" r="3" fill="#34C759" />
      <circle cx="55" cy="80" r="3" fill="#34C759" />
      <circle cx="50" cy="86" r="2.2" fill="#34C759" opacity="0.6" />
      <circle cx="40" cy="50" r="3.2" fill="#0A84FF" />
      <circle cx="30" cy="41" r="3.5" fill="#0A84FF" />
      <circle cx="30" cy="59" r="3.5" fill="#0A84FF" />
      <circle cx="20" cy="45" r="3" fill="#0A84FF" />
      <circle cx="20" cy="55" r="3" fill="#0A84FF" />
      <circle cx="14" cy="50" r="2.2" fill="#0A84FF" opacity="0.6" />
      <circle cx="50" cy="50" r="4" fill={center} />
    </svg>
  )
}

const mtlDisplay = { fontFamily: 'var(--font-mtl-display), Georgia, serif' }
const mtlSans = { fontFamily: 'var(--font-mtl-sans), system-ui, sans-serif' }
const mtlMono = { fontFamily: 'var(--font-mtl-mono), ui-monospace, monospace' }

function MtlSystem() {
  const swatches = [
    { name: 'Charcoal', hex: '#111318' },
    { name: 'Paper', hex: '#F5F2EA', border: true },
    { name: 'Steel', hex: '#C8CDD4' },
    { name: 'River Blue', hex: '#0F5EA8' },
    { name: 'Copper', hex: '#B56A3A' },
  ]

  return (
    <div className="overflow-hidden border border-line bg-[#FAFAF8]">
      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col justify-between gap-8 bg-[#111318] p-8 sm:p-10">
          <div className="flex items-center gap-3.5">
            <MtlRosette size={36} center="#FAFAFA" />
            <p
              className="text-[20px] font-semibold tracking-[-0.01em] text-[#F5F2EA]"
              style={mtlSans}
            >
              mtl archives
            </p>
          </div>
          <div>
            <p
              className="text-[36px] font-bold leading-[1.15] tracking-[-0.02em] text-[#F5F2EA] sm:text-[42px]"
              style={mtlDisplay}
            >
              Montréal,
              <br />
              layer by layer.
            </p>
            <p className="mt-3 text-[15px] text-[#C8CDD4]" style={mtlSans}>
              Montréal, couche par couche.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className="rounded-[6px] bg-[#0F5EA8] px-4 py-2 text-[13px] font-medium text-white"
              style={mtlSans}
            >
              Explore
            </span>
            <span
              className="rounded-[6px] border border-[#C8CDD4] px-4 py-2 text-[13px] font-medium text-[#C8CDD4]"
              style={mtlSans}
            >
              Play the game
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
          <div>
            <p
              className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#0F5EA8]"
              style={mtlMono}
            >
              Mark
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[80, 48, 32].map((size) => (
                <div
                  key={size}
                  className="flex items-center justify-center bg-[#111318]"
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size > 48 ? 16 : size > 32 ? 10 : 7,
                  }}
                >
                  <MtlRosette
                    size={Math.round(size * 0.65)}
                    center="#FAFAFA"
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#8E9099]" style={mtlMono}>
              80 / 48 / 32px · social, favicon, tab
            </p>
          </div>

          <div
            className="flex items-center gap-3.5 rounded-[12px] border border-[#E0DDD6] bg-[#F5F2EA] px-7 py-6"
          >
            <MtlRosette size={36} center="#111318" />
            <div>
              <p
                className="text-[20px] font-semibold tracking-[-0.01em] text-[#111318]"
                style={mtlSans}
              >
                mtl archives
              </p>
              <p
                className="text-[9px] uppercase tracking-[0.06em] text-[#555860]"
                style={mtlMono}
              >
                Montréal&apos;s visual memory
              </p>
            </div>
          </div>

          <div>
            <p
              className="text-[40px] font-bold leading-none tracking-[-0.02em] text-[#111318]"
              style={mtlDisplay}
            >
              Montréal, couche par couche.
            </p>
            <p className="mt-3 text-[13px] font-medium text-[#111318]" style={mtlMono}>
              VM-098-Y-D04-P032 · Circa 1945
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-[#E0DDD6] sm:grid-cols-5">
        {swatches.map((swatch) => (
          <div key={swatch.hex} className="border-r border-[#E0DDD6] last:border-r-0">
            <div
              className="h-16 sm:h-20"
              style={{
                background: swatch.hex,
                boxShadow: swatch.border ? 'inset 0 0 0 1px #E0DDD6' : undefined,
              }}
            />
            <div className="px-3 py-3">
              <p className="text-[13px] font-semibold text-[#111318]" style={mtlSans}>
                {swatch.name}
              </p>
              <p className="text-[11px] text-[#8E9099]" style={mtlMono}>
                {swatch.hex}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MtlSearch() {
  const chips = ['Neige', 'Tramway', 'Plateau', 'Escaliers', 'Aérien', 'Église']
  const results = [
    { title: 'Tramway sur Sainte-Catherine', year: 'c. 1930', h: 124, tone: '#D4CFC6' },
    { title: 'Rue Saint-Denis, tramway 53', year: '1942', h: 140, tone: '#C8C3BA' },
    { title: 'Coin Mont-Royal et Saint-Laurent', year: '1925', h: 110, tone: '#BDB8AF' },
    { title: 'Tramway, boulevard Saint-Laurent', year: 'c. 1935', h: 130, tone: '#D0CBC2' },
  ]

  return (
    <div className="overflow-x-auto">
      <div
        className="mx-auto w-[390px] overflow-hidden border border-line bg-[#F5F2EA]"
        style={mtlSans}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M12.5 15L7.5 10L12.5 5"
              fill="none"
              stroke="#111318"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[15px] font-semibold tracking-[0.02em] text-[#111318]">
            mtl archives
          </p>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M6 6H17L15.5 13H7.5L6 6Z"
              fill="none"
              stroke="#111318"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="8.5" cy="16" r="1" fill="#111318" />
            <circle cx="14.5" cy="16" r="1" fill="#111318" />
          </svg>
        </div>

        <div className="space-y-3 px-5">
          <div className="flex items-center gap-2.5 rounded-[10px] border-[1.5px] border-[#C8CDD4] bg-white px-3.5 py-3">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <circle cx="8" cy="8" r="5.5" fill="none" stroke="#111318" strokeWidth="1.5" />
              <path
                d="M12.5 12.5L16 16"
                fill="none"
                stroke="#111318"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-[15px] text-[#9CA3AF]">Chercher dans les archives...</p>
          </div>
          <div className="flex gap-1.5">
            <span
              className="rounded-full bg-[#0F5EA8] px-3 py-1.5 text-[11px] font-medium tracking-[0.04em] text-white"
              style={mtlMono}
            >
              SÉMANTIQUE
            </span>
            <span
              className="rounded-full border border-[#C8CDD4] px-3 py-1.5 text-[11px] tracking-[0.04em] text-[#6B7280]"
              style={mtlMono}
            >
              VISUELLE
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-5 pt-4">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-[#EDE8E0] px-3.5 py-2 text-[13px] font-medium text-[#111318]"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <p className="text-[13px] text-[#6B7280]">47 résultats pour « Tramway »</p>
          <p className="text-[11px] tracking-[0.04em] text-[#9CA3AF]" style={mtlMono}>
            PERTINENCE ↓
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-5 pb-6">
          {results.map((item) => (
            <div key={item.title}>
              <div
                className="rounded-[6px]"
                style={{ background: item.tone, height: item.h }}
              />
              <p className="mt-1.5 text-[12px] font-medium leading-4 text-[#111318]">
                {item.title}
              </p>
              <p className="text-[10px] text-[#9CA3AF]" style={mtlMono}>
                {item.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HarborLoop({ size = 62 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 62 62" aria-hidden>
      <path
        d="M23 10H12C10.895 10 10 10.895 10 12V50C10 51.105 10.895 52 12 52H50C51.105 52 52 51.105 52 50V39"
        fill="none"
        stroke="#111111"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 10H52V23"
        fill="none"
        stroke="#2563EB"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 22V40M22 31H40"
        fill="none"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="31" cy="31" r="4" fill="#111111" />
    </svg>
  )
}

function Rhumbline({ size = 62 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 62 62" aria-hidden>
      <path
        d="M31 8V54M8 31H54M14.7 14.7L47.3 47.3M47.3 14.7L14.7 47.3"
        fill="none"
        stroke="#111111"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M31 13L35 26L49 31L35 36L31 49L27 36L13 31L27 26L31 13Z"
        fill="none"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="31" r="4" fill="#111111" />
    </svg>
  )
}

function HullWake({ size = 62 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 62 62" aria-hidden>
      <path d="M10 35H49L42 46H20L10 35Z" fill="#111111" />
      <path
        d="M20 35V24H36L43 35"
        fill="none"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="24" y="17" width="8" height="7" rx="1" fill="#2563EB" />
      <path
        d="M9 51H27M36 51H53"
        fill="none"
        stroke="#2563EB"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="46" cy="27" r="3.5" fill="#111111" />
    </svg>
  )
}

function CargoStack({ size = 62 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 62 62" aria-hidden>
      <rect x="11" y="12" width="17" height="17" rx="2" fill="none" stroke="#111111" strokeWidth="4" />
      <rect x="34" y="12" width="17" height="17" rx="2" fill="#2563EB" />
      <rect x="11" y="35" width="17" height="17" rx="2" fill="#2563EB" />
      <path d="M34 43H51M42.5 35V52" fill="none" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
      <circle cx="34" cy="35" r="4" fill="#111111" />
    </svg>
  )
}

function PortmindMarks() {
  const marks = [
    {
      id: '01',
      name: 'Harbor Loop',
      tag: 'Option',
      line: 'An open system with a clear center.',
      Icon: HarborLoop,
    },
    {
      id: '02',
      name: 'Rhumbline',
      tag: 'Chart',
      line: 'A port as a plotted intelligence.',
      Icon: Rhumbline,
    },
    {
      id: '03',
      name: 'Hull Wake',
      tag: 'Vessel',
      line: 'A port as movement made visible.',
      Icon: HullWake,
    },
    {
      id: '04',
      name: 'Cargo Stack',
      tag: 'Freight',
      line: 'A port as a system of exchange.',
      Icon: CargoStack,
    },
  ]

  return (
    <div
      className="border border-line bg-white p-5 sm:p-8"
      style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
    >
      <p className="text-[12px] font-semibold tracking-[0.14em] text-[#2563EB]">
        PORTMIND / BRAND STUDY 01
      </p>
      <p className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#111111] sm:text-[36px]">
        Four ways to mark a living port.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {marks.map((mark) => (
          <div
            key={mark.id}
            className="flex flex-col justify-between gap-8 rounded-[18px] border border-[#E5E7EB] p-5"
          >
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB]">
                  {mark.id} / {mark.name.toUpperCase()}
                </p>
                <p className="text-[11px] text-[#9CA3AF]">{mark.tag.toUpperCase()}</p>
              </div>
              <p className="mt-3 text-[14px] font-medium text-[#111111]">{mark.line}</p>
            </div>
            <div className="flex items-center gap-3">
              <mark.Icon />
              <p className="text-[22px] font-semibold tracking-[-0.045em] text-[#111111]">
                PortMind
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#E5E7EB] pt-4 text-[12px] text-[#6B7280]">
        <span>All marks work in one color before the blue accent.</span>
        <span className="ml-auto flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#111111]" />
            ink
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#2563EB]" />
            navigation blue
          </span>
        </span>
      </div>
    </div>
  )
}

const dprDisplay = { fontFamily: 'var(--font-dpr-display), Georgia, serif' }
const dprSans = { fontFamily: 'var(--font-dpr-sans), system-ui, sans-serif' }

function DprSystem() {
  const swatches = [
    { name: 'Cream', hex: '#FAFAF7', use: 'Background', border: true },
    { name: 'Almost Black', hex: '#1E1E1C', use: 'Primary text' },
    { name: 'Warm Stone', hex: '#6B665E', use: 'Secondary text' },
    { name: 'Sandstone', hex: '#D4CFC7', use: 'Borders' },
    { name: 'Burnt Terracotta', hex: '#B45630', use: 'Primary accent' },
    { name: 'Deep Sage', hex: '#2C3E2E', use: 'Secondary accent' },
  ]

  return (
    <div className="overflow-hidden border border-line bg-[#FAFAF7]">
      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col items-center justify-center rounded-[16px] bg-[#F4F2EE] px-8 py-12">
          <p
            className="text-[42px] font-black leading-none tracking-[-0.02em] text-[#1E1E1C]"
            style={dprDisplay}
          >
            diane
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#B45630]" />
            <p
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#B45630]"
              style={dprSans}
            >
              Party Rentals
            </p>
            <span className="h-px w-8 bg-[#B45630]" />
          </div>
          <p
            className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#9B968E]"
            style={dprSans}
          >
            Frederick, Maryland
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <p
            className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#6B665E]"
            style={dprSans}
          >
            Display / Fraunces
          </p>
          <p
            className="mt-4 text-[40px] font-black leading-[1.05] tracking-[-0.03em] text-[#1E1E1C] sm:text-[56px]"
            style={dprDisplay}
          >
            Every detail, elevated.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span
              className="rounded-[8px] bg-[#B45630] px-6 py-3 text-[15px] font-medium text-[#FAFAF7]"
              style={dprSans}
            >
              Get a Quote
            </span>
            <span
              className="rounded-[8px] bg-[#2C3E2E] px-6 py-3 text-[15px] font-medium text-[#FAFAF7]"
              style={dprSans}
            >
              Browse Equipment
            </span>
            <span
              className="rounded-[8px] border-[1.5px] border-[#B45630] px-6 py-3 text-[15px] font-medium text-[#B45630]"
              style={dprSans}
            >
              View Details
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-[#D4CFC7] sm:grid-cols-3 lg:grid-cols-6">
        {swatches.map((swatch) => (
          <div key={swatch.hex} className="border-r border-[#D4CFC7] last:border-r-0">
            <div
              className="h-16 sm:h-[88px]"
              style={{
                background: swatch.hex,
                boxShadow: swatch.border ? 'inset 0 0 0 1px #D4CFC7' : undefined,
              }}
            />
            <div className="px-3 py-3">
              <p className="text-[13px] font-medium text-[#1E1E1C]" style={dprSans}>
                {swatch.name}
              </p>
              <p className="text-[12px] text-[#6B665E]" style={dprSans}>
                {swatch.hex}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DprSocial() {
  return (
    <div
      className="flex min-h-[420px] flex-col items-center justify-center gap-8 overflow-hidden border border-line bg-[#2C3E2E] px-8 py-16 text-center"
      style={dprSans}
    >
      <div className="flex items-center gap-2 rounded-3xl bg-[#FAFAF71A] px-5 py-2.5">
        <span className="size-2 rounded-full bg-[#B45630]" />
        <p className="text-[14px] font-medium uppercase tracking-[0.1em] text-[#FAFAF7B3]">
          Now Booking 2026
        </p>
      </div>
      <div>
        <p
          className="text-[40px] font-black leading-[1.05] tracking-[-0.03em] text-[#FAFAF7] sm:text-[56px]"
          style={dprDisplay}
        >
          Make your event unforgettable.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[18px] leading-7 text-[#FAFAF799]">
          Premium chairs, tables & event equipment, delivered and set up in Frederick, MD
        </p>
      </div>
      <span className="rounded-[10px] bg-[#B45630] px-9 py-4 text-[18px] font-medium text-[#FAFAF7]">
        dianepartyrentals.com
      </span>
      <div className="flex items-center gap-2.5">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#B45630]">
          <span
            className="text-[20px] font-black leading-none text-[#FAFAF7]"
            style={dprDisplay}
          >
            D
          </span>
        </span>
        <div className="text-left">
          <p
            className="text-[18px] font-black leading-5 text-[#FAFAF7]"
            style={dprDisplay}
          >
            diane
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#FAFAF780]">
            Party Rentals
          </p>
        </div>
      </div>
    </div>
  )
}

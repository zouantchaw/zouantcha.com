"use client"
import { useState, useEffect, useCallback, TouchEvent } from "react"
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Target,
  Wrench,
  Zap,
  Lock,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  Repeat2,
  Heart,
  Bookmark,
  Send,
} from "lucide-react"

// Password protection
const DECK_PASSWORD = "lipari2026"

function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem("deck_auth_ml")
    if (auth === "true") setIsAuthenticated(true)
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === DECK_PASSWORD) {
      sessionStorage.setItem("deck_auth_ml", "true")
      setIsAuthenticated(true)
    } else {
      setError(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-[#1B1B1B] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C6A85A] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] bg-[#1B1B1B] flex items-center justify-center p-6">
        <div className="bg-[#F7F4EF] rounded-2xl p-8 sm:p-12 max-w-sm w-full shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C6A85A] to-[#8A7A4A] flex items-center justify-center shadow-lg">
              <Lock className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-cormorant text-2xl text-[#1B1B1B] text-center mb-2">
            Protected Presentation
          </h1>
          <p className="font-sora text-sm text-[#6B6460] text-center mb-8">
            Enter password to continue
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              placeholder="Password"
              className={`w-full px-4 py-4 rounded-xl border-2 ${
                error ? "border-[#B3483A] bg-[#B3483A]/5" : "border-[#E8E4DD] bg-white"
              } font-sora text-base focus:outline-none focus:border-[#C6A85A] transition-all`}
              autoFocus
            />
            {error && (
              <p className="text-[#B3483A] font-sora text-sm mt-3 text-center">
                Incorrect password
              </p>
            )}
            <button
              type="submit"
              className="w-full mt-6 px-4 py-4 bg-[#1B1B1B] text-white font-sora text-base font-medium rounded-xl hover:bg-[#C6A85A] active:scale-[0.98] transition-all"
            >
              View Presentation
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Slide definitions
const slides = [
  { id: 1, component: TitleSlide },
  { id: 2, component: ExecutiveSummarySlide },
  { id: 3, component: AuditScopeSlide },
  { id: 4, component: CriticalFindingsSlide },
  { id: 5, component: WhatGoogleSeesSlide },
  { id: 6, component: WhatSocialSeesSlide },
  { id: 7, component: SSENSEBenchmarkSlide },
  { id: 8, component: TheFixSlide },
  { id: 9, component: AdditionalFixesSlide },
  { id: 10, component: RevenueImpactSlide },
  { id: 11, component: EngagementOptionsSlide },
  { id: 12, component: NextStepsSlide },
]

export default function SlideDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const minSwipeDistance = 50

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(Math.max(0, Math.min(index, slides.length - 1)))
    setTimeout(() => setIsAnimating(false), 300)
  }, [isAnimating])

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide])
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Touch handlers for swipe
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) nextSlide()
      else prevSlide()
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <PasswordGate>
      <div
        className="min-h-[100dvh] bg-[#1B1B1B] flex flex-col select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide Container */}
        <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-8">
          <div className="w-full max-w-[1400px] bg-[#F7F4EF] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <div
              className="min-h-[65dvh] sm:min-h-[70vh] md:min-h-0 md:aspect-video overflow-y-auto overflow-x-hidden transition-opacity duration-300"
              style={{ opacity: isAnimating ? 0.7 : 1 }}
            >
              <CurrentSlideComponent />
            </div>
          </div>
        </div>

        {/* Navigation Bar - Apple-style */}
        <div className="flex-shrink-0 pb-[env(safe-area-inset-bottom)] bg-[#1B1B1B]">
          <div className="flex items-center justify-between px-4 py-4 sm:py-5 max-w-[1400px] mx-auto">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center disabled:opacity-20 active:scale-95 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {/* Mobile: Counter */}
              <span className="sm:hidden text-white/80 font-space text-sm font-medium">
                {currentSlide + 1} <span className="text-white/40">/ {slides.length}</span>
              </span>

              {/* Desktop: Dots */}
              <div className="hidden sm:flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "bg-[#C6A85A] w-8"
                        : "bg-white/30 w-2 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center disabled:opacity-20 active:scale-95 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/10">
            <div
              className="h-full bg-[#C6A85A] transition-all duration-300 ease-out"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </PasswordGate>
  )
}

// ============ SLIDE 1: Title ============
function TitleSlide() {
  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 flex flex-col justify-center items-center p-6 sm:p-8 md:p-16 text-center">
      <p className="text-[#C6A85A] font-sora text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 md:mb-6">
        Independent Audit
      </p>
      <h1 className="font-cormorant text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#1B1B1B] mb-4 md:mb-6 leading-tight">
        Maison Lipari
      </h1>
      <h2 className="font-cormorant text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#6B6460] italic mb-6 md:mb-10">
        SEO & Social Sharing Audit
      </h2>
      <p className="font-sora text-sm sm:text-base md:text-lg text-[#1B1B1B] max-w-2xl leading-relaxed">
        100% of your pages are invisible to Google and broken on social.
        <br className="hidden sm:block" />
        <span className="text-[#C6A85A] font-medium">Here's the fix.</span>
      </p>
    </div>
  )
}

// ============ SLIDE 2: Executive Summary ============
function ExecutiveSummarySlide() {
  const findings = [
    { label: "Pages Audited", value: "100", desc: "Products, collections, pages, blogs" },
    { label: "Canonical Errors", value: "100%", desc: "All pages point to homepage" },
    { label: "OG Tag Errors", value: "100%", desc: "Social shares show wrong content" },
    { label: "Twitter Cards", value: "0%", desc: "Missing on every page" },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-2">Overview</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-6 md:mb-10">
        Executive Summary
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-10">
        {findings.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-[#E8E4DD]">
            <p className="font-space text-2xl sm:text-3xl md:text-4xl text-[#1B1B1B] mb-1">{item.value}</p>
            <p className="font-sora text-xs sm:text-sm font-semibold text-[#1B1B1B] mb-1">{item.label}</p>
            <p className="font-sora text-[10px] sm:text-xs text-[#6B6460] leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#B3483A]/10 border-l-4 border-[#B3483A] p-4 sm:p-5 md:p-6 rounded-r-xl mt-auto">
        <p className="font-sora text-xs sm:text-sm text-[#1B1B1B] leading-relaxed">
          <span className="font-semibold">The verdict:</span> Every product, collection, and blog page tells Google and
          social platforms it's the homepage. Your $4,500 Christofle tray shares as "Canada's Home for Luxury Designer
          Homeware."
        </p>
      </div>
    </div>
  )
}

// ============ SLIDE 3: Audit Scope ============
function AuditScopeSlide() {
  const crawlStats = [
    { label: "Pages Audited", value: "100" },
    { label: "Products", value: "38" },
    { label: "Collections", value: "20" },
    { label: "Pages", value: "20" },
    { label: "Blogs", value: "20" },
    { label: "Locales", value: "EN + FR" },
  ]

  const categories = [
    { name: "SEO Fundamentals", items: ["Canonical tags", "Meta titles", "Meta descriptions"] },
    { name: "Social Sharing", items: ["OpenGraph tags", "Twitter cards", "OG images"] },
    { name: "Site Hygiene", items: ["Booking flow", "Sitemap coverage", "Test pages"] },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-2">Methodology</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-6 md:mb-10">
        Audit Scope
      </h2>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10 flex-1">
        <div>
          <h3 className="font-sora text-xs font-semibold text-[#6B6460] uppercase tracking-wider mb-4">
            Crawl Statistics
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {crawlStats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 sm:p-4 text-center border border-[#E8E4DD]">
                <p className="font-space text-lg sm:text-xl md:text-2xl text-[#1B1B1B]">{stat.value}</p>
                <p className="font-sora text-[9px] sm:text-[10px] text-[#6B6460]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-sora text-xs font-semibold text-[#6B6460] uppercase tracking-wider mb-4">
            Audit Categories
          </h3>
          <div className="space-y-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-[#E8E4DD]">
                <p className="font-sora text-sm font-semibold text-[#1B1B1B] mb-2">{cat.name}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <span key={i} className="px-2 py-1 bg-[#C6A85A]/10 text-[#6B6460] rounded-lg text-xs font-sora">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ SLIDE 4: Critical Findings ============
function CriticalFindingsSlide() {
  const findings = [
    {
      category: "Canonical Tag Meltdown",
      severity: "Critical",
      items: ["100% of pages set canonical to homepage", "Products, collections, blogs all affected", "Both EN and FR locales broken"],
    },
    {
      category: "OpenGraph Uniformity",
      severity: "Critical",
      items: ["Every page shares as homepage", "OG:image is static logo for all pages", "No product-specific social previews"],
    },
    {
      category: "Twitter Cards Missing",
      severity: "High",
      items: ["0% Twitter card coverage", "Missing twitter:card meta tag", "No product images on X shares"],
    },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#B3483A] font-sora text-xs tracking-[0.2em] uppercase mb-2">Issues Found</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-6 md:mb-10">
        Critical Findings
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 flex-1">
        {findings.map((finding, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 md:p-6 border border-[#E8E4DD] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#B3483A]" />
              <span className={`px-2 py-0.5 rounded-full text-xs font-sora ${
                finding.severity === "Critical" ? "bg-[#B3483A]/15 text-[#B3483A]" : "bg-[#C6A85A]/15 text-[#C6A85A]"
              }`}>
                {finding.severity}
              </span>
            </div>
            <h3 className="font-sora text-sm sm:text-base font-semibold text-[#1B1B1B] mb-4">{finding.category}</h3>
            <div className="space-y-2">
              {finding.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#B3483A] flex-shrink-0 mt-0.5" />
                  <p className="font-sora text-xs sm:text-sm text-[#6B6460]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ SLIDE 5: What Google Sees ============
function WhatGoogleSeesSlide() {
  const comparison = [
    {
      label: "What You Expect",
      type: "expected",
      items: ["Christofle Mood Party Tray", "maisonlipari.ca/products/christofle-party-mood...", "Product indexed as unique page"],
    },
    {
      label: "What Google Sees",
      type: "actual",
      items: ["Canada's Home for Luxury Designer Homeware", "maisonlipari.ca (homepage)", "Duplicate of homepage (ignored)"],
    },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-2">SEO Impact</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-6 md:mb-10">
        What Google Sees
      </h2>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 flex-1">
        {comparison.map((col, idx) => (
          <div key={idx} className={`rounded-xl p-5 sm:p-6 ${
            col.type === "expected" ? "bg-[#4A7C59]/10 border border-[#4A7C59]/20" : "bg-[#B3483A]/10 border border-[#B3483A]/20"
          }`}>
            <h3 className={`font-sora text-xs font-semibold uppercase tracking-wider mb-4 ${
              col.type === "expected" ? "text-[#4A7C59]" : "text-[#B3483A]"
            }`}>
              {col.label}
            </h3>
            <div className="space-y-3">
              {col.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  {col.type === "expected" ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4A7C59] flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#B3483A] flex-shrink-0" />
                  )}
                  <p className="font-sora text-sm text-[#1B1B1B]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1B1B1B] text-white rounded-xl p-5 sm:p-6">
        <p className="font-sora text-sm">
          <span className="text-[#C6A85A] font-semibold">Consequence:</span> Your 4,300+ products are effectively hidden from organic search.
        </p>
      </div>
    </div>
  )
}

// ============ SLIDE 6: What Social Platforms See - Multi-Platform ============
function WhatSocialSeesSlide() {
  const [activePlatform, setActivePlatform] = useState("facebook")
  const [showFixed, setShowFixed] = useState(false)

  const platforms = [
    { id: "facebook", label: "Facebook", icon: "f" },
    { id: "x", label: "X", icon: "𝕏" },
    { id: "linkedin", label: "LinkedIn", icon: "in" },
    { id: "imessage", label: "iMessage", icon: "💬" },
  ]

  const currentIssues = [
    "Title: 42 chars (should be 50-60)",
    "Description: 42 chars (should be 110-160)",
    "No product-specific content",
    "Same preview for all products",
  ]

  const fixedBenefits = [
    "Product name + price in title",
    "Compelling description (110-160 chars)",
    "Actual product image",
    "Direct link to product page",
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-10 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-1">Social Impact</p>
          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#1B1B1B]">What Social Platforms See</h2>
        </div>
        <div className="flex rounded-full bg-[#E8E4DD] p-1 self-start">
          <button
            onClick={() => setShowFixed(false)}
            className={`px-4 py-2 rounded-full font-sora text-xs font-medium transition-all ${
              !showFixed ? "bg-[#B3483A] text-white shadow-sm" : "text-[#6B6460]"
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setShowFixed(true)}
            className={`px-4 py-2 rounded-full font-sora text-xs font-medium transition-all ${
              showFixed ? "bg-[#4A7C59] text-white shadow-sm" : "text-[#6B6460]"
            }`}
          >
            Fixed
          </button>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setActivePlatform(platform.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-sora text-sm whitespace-nowrap transition-all ${
              activePlatform === platform.id
                ? "bg-[#1B1B1B] text-white"
                : "bg-white border border-[#E8E4DD] text-[#6B6460] hover:border-[#1B1B1B]"
            }`}
          >
            <span className={`${platform.id === "imessage" ? "" : "font-bold"}`}>{platform.icon}</span>
            {platform.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-0">
        {/* Preview Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          {activePlatform === "facebook" && <FacebookPreview showFixed={showFixed} />}
          {activePlatform === "x" && <XPreview showFixed={showFixed} />}
          {activePlatform === "linkedin" && <LinkedInPreview showFixed={showFixed} />}
          {activePlatform === "imessage" && <IMessagePreview showFixed={showFixed} />}
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className={`rounded-xl p-5 flex-1 ${
            showFixed ? "bg-[#4A7C59]/10 border border-[#4A7C59]/20" : "bg-[#B3483A]/10 border border-[#B3483A]/20"
          }`}>
            <h3 className={`font-sora text-xs font-semibold uppercase tracking-wider mb-4 ${
              showFixed ? "text-[#4A7C59]" : "text-[#B3483A]"
            }`}>
              {showFixed ? "After Fix" : "Current Issues"}
            </h3>
            <ul className="space-y-3">
              {(showFixed ? fixedBenefits : currentIssues).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  {showFixed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4A7C59] flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#B3483A] flex-shrink-0" />
                  )}
                  <span className="font-sora text-sm text-[#1B1B1B]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#E8E4DD]">
            <p className="font-space text-4xl text-[#C6A85A] font-bold">+40%</p>
            <p className="font-sora text-sm text-[#6B6460] mt-1">Average CTR increase with optimized OG tags</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Platform Preview Components
function FacebookPreview({ showFixed }: { showFixed: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-[#1B3A5C] flex items-center justify-center">
          <span className="font-serif text-white text-sm font-bold">ML</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Maison Lipari</p>
          <p className="text-xs text-gray-500">2h · 🌐</p>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-400" />
      </div>
      <p className="px-4 py-2 text-sm text-gray-900">
        {showFixed ? "The Christofle Mood Party Tray. Iconic design meets masterful craftsmanship. ✨" : "Discover our curated collection of luxury homeware."}
      </p>
      <div className="flex-1 bg-gray-100 flex items-center justify-center min-h-[140px]">
        {showFixed ? (
          <div className="w-full h-full bg-gradient-to-br from-[#E8E4DD] to-[#D4CFC6] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-[#C6A85A]/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              <p className="text-xs text-[#6B6460]">Product Image</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
            <span className="font-serif text-white text-4xl font-bold">ML</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] text-gray-500 uppercase">maisonlipari.ca</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5 line-clamp-1">
          {showFixed ? "Christofle Mood Party Tray | $4,500 CAD" : "Canada's Home for Luxury Designer Homeware"}
        </p>
        <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
          {showFixed ? "Iconic 24-piece stainless steel serving set in egg-shaped case." : "Canada's Home for Luxury Designer Homeware"}
        </p>
      </div>
      <div className="flex items-center justify-around py-2 border-t border-gray-100 text-gray-500">
        <button className="flex items-center gap-1.5 text-xs"><ThumbsUp className="w-4 h-4" /> Like</button>
        <button className="flex items-center gap-1.5 text-xs"><MessageCircle className="w-4 h-4" /> Comment</button>
        <button className="flex items-center gap-1.5 text-xs"><Share2 className="w-4 h-4" /> Share</button>
      </div>
    </div>
  )
}

function XPreview({ showFixed }: { showFixed: boolean }) {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-[#1B3A5C] flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-white text-sm font-bold">ML</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm text-gray-900">Maison Lipari</span>
            <span className="text-gray-500 text-sm">@maisonlipari · 2h</span>
          </div>
          <p className="text-sm text-gray-900 mt-1">
            {showFixed ? "The Christofle Mood Party Tray. Iconic design meets masterful craftsmanship. ✨" : "Discover our curated collection of luxury homeware."}
          </p>
          <div className="mt-3 rounded-xl border border-gray-200 overflow-hidden">
            <div className="h-32 bg-gray-100 flex items-center justify-center">
              {showFixed ? (
                <div className="w-full h-full bg-gradient-to-br from-[#E8E4DD] to-[#D4CFC6] flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
              ) : (
                <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
                  <span className="font-serif text-white text-3xl font-bold">ML</span>
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <p className="text-xs text-gray-500">maisonlipari.ca</p>
              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                {showFixed ? "Christofle Mood Party Tray | $4,500 CAD" : "Canada's Home for Luxury Designer Homeware"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 text-gray-500 max-w-[280px]">
            <button className="flex items-center gap-1 text-xs"><MessageCircle className="w-4 h-4" /> 12</button>
            <button className="flex items-center gap-1 text-xs"><Repeat2 className="w-4 h-4" /> 8</button>
            <button className="flex items-center gap-1 text-xs"><Heart className="w-4 h-4" /> 47</button>
            <button className="flex items-center gap-1 text-xs"><Bookmark className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkedInPreview({ showFixed }: { showFixed: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4">
        <div className="w-12 h-12 rounded-full bg-[#1B3A5C] flex items-center justify-center">
          <span className="font-serif text-white text-base font-bold">ML</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Maison Lipari</p>
          <p className="text-xs text-gray-500">1,234 followers</p>
          <p className="text-xs text-gray-500">2h · 🌐</p>
        </div>
      </div>
      <p className="px-4 pb-3 text-sm text-gray-900">
        {showFixed ? "The Christofle Mood Party Tray represents the pinnacle of French craftsmanship. ✨" : "Discover our curated collection of luxury homeware."}
      </p>
      <div className="flex-1 bg-gray-100 flex items-center justify-center min-h-[120px]">
        {showFixed ? (
          <div className="w-full h-full bg-gradient-to-br from-[#E8E4DD] to-[#D4CFC6] flex items-center justify-center">
            <span className="text-2xl">🍽️</span>
          </div>
        ) : (
          <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
            <span className="font-serif text-white text-4xl font-bold">ML</span>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-gray-100">
        <p className="text-sm font-semibold text-gray-900 line-clamp-1">
          {showFixed ? "Christofle Mood Party Tray | $4,500 CAD" : "Canada's Home for Luxury Designer Homeware"}
        </p>
        <p className="text-xs text-gray-500">maisonlipari.ca</p>
      </div>
      <div className="flex items-center justify-around py-3 border-t border-gray-100 text-gray-600 text-xs">
        <button className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> Like</button>
        <button className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> Comment</button>
        <button className="flex items-center gap-1"><Repeat2 className="w-4 h-4" /> Repost</button>
        <button className="flex items-center gap-1"><Send className="w-4 h-4" /> Send</button>
      </div>
    </div>
  )
}

function IMessagePreview({ showFixed }: { showFixed: boolean }) {
  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] p-4">
      <div className="flex-1 flex flex-col justify-end gap-2">
        <div className="self-start max-w-[85%]">
          <div className="bg-[#E9E9EB] rounded-2xl rounded-bl-md px-4 py-2">
            <p className="text-sm text-black">Have you seen this tray from Maison Lipari?</p>
          </div>
        </div>
        <div className="self-start max-w-[85%]">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="h-24 bg-gray-100 flex items-center justify-center">
              {showFixed ? (
                <div className="w-full h-full bg-gradient-to-br from-[#E8E4DD] to-[#D4CFC6] flex items-center justify-center">
                  <span className="text-xl">🍽️</span>
                </div>
              ) : (
                <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
                  <span className="font-serif text-white text-2xl font-bold">ML</span>
                </div>
              )}
            </div>
            <div className="p-2.5">
              <p className="text-[10px] text-gray-500 uppercase">maisonlipari.ca</p>
              <p className="text-sm font-medium text-black line-clamp-2">
                {showFixed ? "Christofle Mood Party Tray | $4,500 CAD" : "Canada's Home for Luxury Designer Homeware"}
              </p>
            </div>
          </div>
        </div>
        <div className="self-end max-w-[85%]">
          <div className="bg-[#007AFF] rounded-2xl rounded-br-md px-4 py-2">
            <p className="text-sm text-white">{showFixed ? "Wow, that's stunning! 😍" : "What is this? Just shows their logo..."}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ SLIDE 7: SSENSE Benchmark ============
function SSENSEBenchmarkSlide() {
  const metrics = [
    { metric: "Canonical Tags", ml: "All → homepage", ssense: "Page-specific", status: "broken" },
    { metric: "OG Tags", ml: "Generic", ssense: "Product-specific", status: "broken" },
    { metric: "Twitter Cards", ml: "Missing", ssense: "Full coverage", status: "broken" },
    { metric: "Hreflang (EN/FR)", ml: "Not audited", ssense: "Full coverage", status: "unknown" },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-2">Competitive Analysis</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-1">SSENSE Benchmark</h2>
      <p className="font-sora text-sm text-[#6B6460] mb-6 md:mb-10">
        Montreal-based luxury e-commerce with strong technical execution
      </p>

      <div className="bg-white rounded-xl border border-[#E8E4DD] overflow-hidden flex-1 overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="bg-[#1B1B1B] text-white">
              <th className="p-4 text-left font-sora text-xs font-semibold">Metric</th>
              <th className="p-4 text-left font-sora text-xs font-semibold">Maison Lipari</th>
              <th className="p-4 text-left font-sora text-xs font-semibold">SSENSE</th>
              <th className="p-4 text-left font-sora text-xs font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-4 font-sora text-sm font-medium text-[#1B1B1B]">{row.metric}</td>
                <td className="p-4 font-sora text-sm text-[#B3483A]">{row.ml}</td>
                <td className="p-4 font-sora text-sm text-[#4A7C59]">{row.ssense}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-sora ${
                    row.status === "broken" ? "bg-[#B3483A]/15 text-[#B3483A]" : "bg-[#6B6460]/15 text-[#6B6460]"
                  }`}>
                    {row.status === "broken" ? "Fix needed" : "TBD"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#C6A85A]/10 border-l-4 border-[#C6A85A] p-5 rounded-r-xl mt-6">
        <p className="font-sora text-sm text-[#1B1B1B]">
          <span className="font-semibold">Insight:</span> SSENSE has flawless meta tag implementation. The fix for Maison Lipari is a single theme patch.
        </p>
      </div>
    </div>
  )
}

// ============ SLIDE 8: The Fix ============
function TheFixSlide() {
  const changes = [
    { tag: "Canonical", current: "Hardcoded to homepage", fix: "{{ canonical_url }}" },
    { tag: "OG:URL", current: "Hardcoded to homepage", fix: "{{ canonical_url }}" },
    { tag: "OG:Title", current: "Static site tagline", fix: "{{ page_title }}" },
    { tag: "OG:Image", current: "Static logo", fix: "Product/collection image" },
    { tag: "Twitter Cards", current: "Missing", fix: "Add twitter:card meta tags" },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#4A7C59] font-sora text-xs tracking-[0.2em] uppercase mb-2">Solution</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-1">The Fix</h2>
      <p className="font-sora text-sm text-[#6B6460] mb-6">
        Theme-level Liquid patch in <code className="bg-[#E8E4DD] px-1.5 py-0.5 rounded text-xs font-mono">theme.liquid</code>
      </p>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {changes.map((change, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-[#E8E4DD]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <span className="px-3 py-1 bg-[#1B1B1B] text-white rounded-lg font-mono text-xs self-start">{change.tag}</span>
              <div className="flex-1 grid sm:grid-cols-2 gap-2">
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#B3483A] flex-shrink-0 mt-0.5" />
                  <p className="font-sora text-sm text-[#6B6460]">{change.current}</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A7C59] flex-shrink-0 mt-0.5" />
                  <p className="font-mono text-sm text-[#4A7C59]">{change.fix}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#4A7C59]/10 border border-[#4A7C59]/20 rounded-xl p-5 mt-4">
        <p className="font-sora text-sm text-[#1B1B1B]">
          <span className="font-semibold text-[#4A7C59]">Coverage:</span> Applies to all 4,300+ products, 469 collections, 90 pages, 76 blogs — EN and FR
        </p>
      </div>
    </div>
  )
}

// ============ SLIDE 9: Additional Fixes ============
function AdditionalFixesSlide() {
  const fixes = [
    { title: "Repair Booking Flow", effort: "Low", impact: "High", description: "/products/appointments returns 404. Redirect to valid booking endpoint.", icon: Wrench },
    { title: "Remove Test Page", effort: "Low", impact: "Medium", description: "/pages/test is live and indexed. Unpublish or noindex.", icon: Target },
    { title: "Sitemap Cleanup", effort: "Low", impact: "Medium", description: "Remove stale/test pages from sitemap.xml", icon: Zap },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-2">Quick Wins</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-6 md:mb-10">
        Additional Fixes
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 flex-1">
        {fixes.map((fix, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 md:p-6 border border-[#E8E4DD] flex flex-col">
            <div className="w-12 h-12 rounded-full bg-[#C6A85A]/15 flex items-center justify-center mb-4">
              <fix.icon className="w-6 h-6 text-[#C6A85A]" />
            </div>
            <h3 className="font-sora text-base font-semibold text-[#1B1B1B] mb-2">{fix.title}</h3>
            <p className="font-sora text-sm text-[#6B6460] flex-1">{fix.description}</p>
            <div className="flex gap-2 mt-4">
              <span className="px-2.5 py-1 bg-[#4A7C59]/15 text-[#4A7C59] rounded-full text-xs font-sora">{fix.effort} effort</span>
              <span className="px-2.5 py-1 bg-[#C6A85A]/15 text-[#C6A85A] rounded-full text-xs font-sora">{fix.impact} impact</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ SLIDE 10: Revenue Impact ============
function RevenueImpactSlide() {
  const projections = [
    { scenario: "Conservative", details: "50K sessions, +0.1% CVR, $150 AOV", monthly: "$7,500" },
    { scenario: "Moderate", details: "100K sessions, +0.2% CVR, $250 AOV", monthly: "$50,000" },
    { scenario: "Optimistic", details: "200K sessions, +0.4% CVR, $400 AOV", monthly: "$320,000" },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-2">Financial Model</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-1">Revenue Impact</h2>
      <p className="font-sora text-sm text-[#6B6460] mb-6">
        Estimates use placeholder ranges — replace with actual GA4/Shopify data
      </p>

      <div className="bg-[#1B1B1B] text-white rounded-xl p-5 mb-6">
        <p className="font-mono text-sm">
          <span className="text-[#C6A85A]">Incremental Revenue</span> = Sessions × Delta CVR × AOV
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {projections.map((proj, idx) => (
          <div key={idx} className={`rounded-xl p-5 border ${
            idx === 1 ? "bg-[#C6A85A]/15 border-[#C6A85A]" : "bg-white border-[#E8E4DD]"
          }`}>
            <p className="font-sora text-xs font-semibold text-[#6B6460] uppercase mb-2">{proj.scenario}</p>
            <p className="font-space text-2xl sm:text-3xl text-[#1B1B1B] mb-2">{proj.monthly}</p>
            <p className="font-sora text-xs text-[#6B6460]">{proj.details}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#8A8F6A]/10 border-l-4 border-[#8A8F6A] p-5 rounded-r-xl mt-auto">
        <p className="font-sora text-sm text-[#1B1B1B]">
          <span className="font-semibold">VIP Appointments:</span> Fixing booking flow captures lost VIP leads — estimated{" "}
          <span className="font-space text-[#4A7C59]">$3,600 - $143,000 CAD/month</span>
        </p>
      </div>
    </div>
  )
}

// ============ SLIDE 11: Engagement Options ============
function EngagementOptionsSlide() {
  const options = [
    {
      name: "Week 1 Fix",
      price: "$2,500 - $4,000",
      timeline: "5-7 business days",
      scope: ["Deploy canonical/OG/Twitter tag patch", "Repair booking flow redirect", "Sitemap cleanup", "QA across all page types"],
    },
    {
      name: "90-Day Growth Retainer",
      price: "$3,000 - $5,000/mo",
      timeline: "Ongoing",
      scope: ["Week 1 fixes included", "CRO experiments (3-5 tests/month)", "GA4/GTM tracking setup", "Weekly KPI reviews"],
      featured: true,
    },
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-2">Proposal</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-6 md:mb-10">
        Engagement Options
      </h2>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 flex-1">
        {options.map((option, idx) => (
          <div key={idx} className={`rounded-xl p-6 sm:p-8 flex flex-col ${
            option.featured ? "bg-[#1B1B1B] text-white" : "bg-white border border-[#E8E4DD]"
          }`}>
            {option.featured && (
              <span className="px-3 py-1 bg-[#C6A85A] text-[#1B1B1B] rounded-full text-xs font-sora font-semibold self-start mb-4">
                Recommended
              </span>
            )}
            <h3 className={`font-cormorant text-xl sm:text-2xl mb-2 ${option.featured ? "text-white" : "text-[#1B1B1B]"}`}>
              {option.name}
            </h3>
            <p className="font-space text-2xl sm:text-3xl mb-1 text-[#C6A85A]">{option.price}</p>
            <p className={`font-sora text-xs mb-6 ${option.featured ? "text-white/60" : "text-[#6B6460]"}`}>
              {option.timeline}
            </p>
            <div className="space-y-3 flex-1">
              {option.scope.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${option.featured ? "text-[#C6A85A]" : "text-[#4A7C59]"}`} />
                  <p className={`font-sora text-sm ${option.featured ? "text-white/80" : "text-[#1B1B1B]"}`}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ SLIDE 12: Next Steps ============
function NextStepsSlide() {
  const steps = [
    "Review this audit together (15-30 min call)",
    "Confirm scope and timeline",
    "I deploy the fix; you see results in 2-3 weeks",
  ]

  return (
    <div className="h-full min-h-[65dvh] md:min-h-0 flex flex-col justify-center items-center p-6 sm:p-8 md:p-16 text-center">
      <p className="text-[#C6A85A] font-sora text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 md:mb-6">Let's Begin</p>
      <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1B1B1B] mb-8 md:mb-12">Next Steps</h2>

      <div className="flex flex-col gap-4 md:gap-6 max-w-xl w-full mb-8 md:mb-12">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4 md:gap-6 text-left">
            <div className="w-12 h-12 rounded-full bg-[#C6A85A] flex items-center justify-center flex-shrink-0">
              <span className="font-space text-xl text-white">{idx + 1}</span>
            </div>
            <p className="font-sora text-sm sm:text-base text-[#1B1B1B]">{step}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="font-cormorant text-xl sm:text-2xl text-[#1B1B1B] mb-2">Ready when you are.</p>
        <p className="font-sora text-sm text-[#6B6460]">wiel@zouantcha.com</p>
      </div>
    </div>
  )
}

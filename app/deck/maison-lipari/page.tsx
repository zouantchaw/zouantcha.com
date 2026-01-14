"use client"
import { useState, useEffect, useCallback, TouchEvent } from "react"
import Image from "next/image"
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

// Product data for social previews
const PRODUCT = {
  name: "Breville | The Handy Mix Scraper",
  shortName: "Handy Mix Scraper",
  price: "$179.99 CAD",
  description: "9-speed hand mixer with Beater IQ technology. Effortless mixing, perfect results.",
  image: "/breville-handy-mix-scraper.jpeg",
}

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
      <div className="fixed inset-0 bg-[#1B1B1B] flex flex-col select-none overflow-hidden">
        {/* Slide Container - takes remaining space above fixed nav */}
        <div 
          className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-8 overflow-hidden"
          style={{ paddingBottom: 0 }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="w-full h-full max-w-[1400px] max-h-[calc(100%-0.5rem)] bg-[#F7F4EF] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain transition-opacity duration-300"
              style={{ 
                opacity: isAnimating ? 0.7 : 1,
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <CurrentSlideComponent />
            </div>
          </div>
        </div>

        {/* Navigation Bar - Fixed at bottom with glass effect */}
        <div 
          className="flex-shrink-0 bg-[#1B1B1B]/95 backdrop-blur-xl border-t border-white/5"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {/* Progress bar - top of nav */}
          <div className="h-[2px] bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#C6A85A] to-[#D4B86A] transition-all duration-500 ease-out"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between px-4 py-3 sm:py-4 max-w-[1400px] mx-auto">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none active:scale-90 active:bg-white/20 transition-all duration-150"
              aria-label="Previous slide"
              tabIndex={0}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="flex items-center gap-3">
              {/* Mobile: Pill counter */}
              <div className="sm:hidden flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span className="text-white font-space text-sm font-semibold tabular-nums">
                  {currentSlide + 1}
                </span>
                <span className="text-white/40 font-space text-xs">/</span>
                <span className="text-white/50 font-space text-sm tabular-nums">
                  {slides.length}
                </span>
              </div>

              {/* Desktop: Dots */}
              <div className="hidden sm:flex gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ease-out ${
                      idx === currentSlide
                        ? "bg-[#C6A85A] w-6"
                        : "bg-white/20 w-2 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                    tabIndex={0}
                  />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none active:scale-90 active:bg-white/20 transition-all duration-150"
              aria-label="Next slide"
              tabIndex={0}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </PasswordGate>
  )
}

// ============ SLIDE 1: Title ============
function TitleSlide() {
  return (
    <div className="min-h-full flex flex-col justify-center items-center p-5 sm:p-8 md:p-16 text-center">
      <p className="text-[#C6A85A] font-sora text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 md:mb-6">
        Independent Audit
      </p>
      <h1 className="font-cormorant text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#1B1B1B] mb-3 md:mb-6 leading-tight">
        Maison Lipari
      </h1>
      <h2 className="font-cormorant text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#6B6460] italic mb-5 md:mb-10">
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
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-1.5">Overview</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-4 md:mb-8">
        Executive Summary
      </h2>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 mb-4 md:mb-8">
        {findings.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-3.5 sm:p-5 md:p-6 border border-[#E8E4DD]">
            <p className="font-space text-xl sm:text-3xl md:text-4xl text-[#1B1B1B] mb-0.5">{item.value}</p>
            <p className="font-sora text-[11px] sm:text-sm font-semibold text-[#1B1B1B] mb-0.5">{item.label}</p>
            <p className="font-sora text-[10px] sm:text-xs text-[#6B6460] leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#B3483A]/10 border-l-4 border-[#B3483A] p-3.5 sm:p-5 md:p-6 rounded-r-xl mt-auto">
        <p className="font-sora text-[11px] sm:text-sm text-[#1B1B1B] leading-relaxed">
          <span className="font-semibold">The verdict:</span> Every product, collection, and blog page tells Google and
          social platforms it's the homepage. Your $179 Breville mixer shares as "Canada's Home for Luxury Designer
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
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-1.5">Methodology</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-4 md:mb-8">
        Audit Scope
      </h2>

      <div className="grid md:grid-cols-2 gap-4 md:gap-10 flex-1">
        <div>
          <h3 className="font-sora text-[10px] sm:text-xs font-semibold text-[#6B6460] uppercase tracking-wider mb-3">
            Crawl Statistics
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {crawlStats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-2.5 sm:p-4 text-center border border-[#E8E4DD]">
                <p className="font-space text-base sm:text-xl md:text-2xl text-[#1B1B1B]">{stat.value}</p>
                <p className="font-sora text-[8px] sm:text-[10px] text-[#6B6460]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-sora text-[10px] sm:text-xs font-semibold text-[#6B6460] uppercase tracking-wider mb-3 mt-2 md:mt-0">
            Audit Categories
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 sm:p-4 border border-[#E8E4DD]">
                <p className="font-sora text-xs sm:text-sm font-semibold text-[#1B1B1B] mb-1.5">{cat.name}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#C6A85A]/10 text-[#6B6460] rounded-lg text-[10px] sm:text-xs font-sora">
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
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#B3483A] font-sora text-xs tracking-[0.2em] uppercase mb-1.5">Issues Found</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-4 md:mb-8">
        Critical Findings
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 flex-1">
        {findings.map((finding, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 md:p-6 border border-[#E8E4DD] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#B3483A]" />
              <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-sora ${
                finding.severity === "Critical" ? "bg-[#B3483A]/15 text-[#B3483A]" : "bg-[#C6A85A]/15 text-[#C6A85A]"
              }`}>
                {finding.severity}
              </span>
            </div>
            <h3 className="font-sora text-xs sm:text-base font-semibold text-[#1B1B1B] mb-2.5">{finding.category}</h3>
            <div className="space-y-1.5">
              {finding.items.map((item, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-[#B3483A] flex-shrink-0 mt-0.5" />
                  <p className="font-sora text-[10px] sm:text-sm text-[#6B6460]">{item}</p>
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
      items: ["Breville | The Handy Mix Scraper", "maisonlipari.ca/products/breville-handy-mix...", "Product indexed as unique page"],
    },
    {
      label: "What Google Sees",
      type: "actual",
      items: ["Canada's Home for Luxury Designer Homeware", "maisonlipari.ca (homepage)", "Duplicate of homepage (ignored)"],
    },
  ]

  return (
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-1.5">SEO Impact</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-4 md:mb-8">
        What Google Sees
      </h2>

      <div className="grid md:grid-cols-2 gap-3 sm:gap-6 mb-4 flex-1">
        {comparison.map((col, idx) => (
          <div key={idx} className={`rounded-xl p-4 sm:p-6 ${
            col.type === "expected" ? "bg-[#4A7C59]/10 border border-[#4A7C59]/20" : "bg-[#B3483A]/10 border border-[#B3483A]/20"
          }`}>
            <h3 className={`font-sora text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 ${
              col.type === "expected" ? "text-[#4A7C59]" : "text-[#B3483A]"
            }`}>
              {col.label}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {col.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2 sm:gap-3">
                  {col.type === "expected" ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A7C59] flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#B3483A] flex-shrink-0" />
                  )}
                  <p className="font-sora text-[11px] sm:text-sm text-[#1B1B1B]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1B1B1B] text-white rounded-xl p-4 sm:p-6">
        <p className="font-sora text-[11px] sm:text-sm">
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
    { id: "facebook", label: "FB", fullLabel: "Facebook", icon: "f" },
    { id: "x", label: "X", fullLabel: "X", icon: "𝕏" },
    { id: "linkedin", label: "LI", fullLabel: "LinkedIn", icon: "in" },
    { id: "imessage", label: "iMsg", fullLabel: "iMessage", icon: "💬" },
  ]

  const currentIssues = [
    "Generic title, no product info",
    "Static logo instead of product image",
    "Same preview for all 4,300+ products",
  ]

  const fixedBenefits = [
    "Product name + price in title",
    "Actual product image shown",
    "Direct link to product page",
  ]

  return (
    <div className="min-h-full p-4 sm:p-6 md:p-10 flex flex-col">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-[#C6A85A] font-sora text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-0.5">Social Impact</p>
          <h2 className="font-cormorant text-xl sm:text-3xl md:text-4xl text-[#1B1B1B] leading-tight">What Social Sees</h2>
        </div>
        {/* Toggle */}
        <div className="flex rounded-full bg-[#E8E4DD] p-0.5 sm:p-1 flex-shrink-0">
          <button
            onClick={() => setShowFixed(false)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-sora text-[11px] sm:text-xs font-medium transition-all ${
              !showFixed ? "bg-[#B3483A] text-white shadow-sm" : "text-[#6B6460]"
            }`}
            aria-label="Show current state"
            tabIndex={0}
          >
            Current
          </button>
          <button
            onClick={() => setShowFixed(true)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-sora text-[11px] sm:text-xs font-medium transition-all ${
              showFixed ? "bg-[#4A7C59] text-white shadow-sm" : "text-[#6B6460]"
            }`}
            aria-label="Show fixed state"
            tabIndex={0}
          >
            Fixed
          </button>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex gap-1.5 sm:gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setActivePlatform(platform.id)}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-sora text-xs sm:text-sm whitespace-nowrap transition-all flex-shrink-0 ${
              activePlatform === platform.id
                ? "bg-[#1B1B1B] text-white"
                : "bg-white border border-[#E8E4DD] text-[#6B6460] active:bg-gray-50"
            }`}
            aria-label={`View ${platform.fullLabel} preview`}
            tabIndex={0}
          >
            <span className={`${platform.id === "imessage" ? "" : "font-bold"}`}>{platform.icon}</span>
            <span className="hidden sm:inline">{platform.fullLabel}</span>
            <span className="sm:hidden">{platform.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4 min-h-0">
        {/* Preview Card - HERO on mobile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1 md:flex-none">
          {activePlatform === "facebook" && <FacebookPreview showFixed={showFixed} />}
          {activePlatform === "x" && <XPreview showFixed={showFixed} />}
          {activePlatform === "linkedin" && <LinkedInPreview showFixed={showFixed} />}
          {activePlatform === "imessage" && <IMessagePreview showFixed={showFixed} />}
        </div>

        {/* Info Panel - Below preview on mobile */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Issues/Benefits */}
          <div className={`rounded-xl p-3 sm:p-4 md:p-5 flex-1 ${
            showFixed ? "bg-[#4A7C59]/10 border border-[#4A7C59]/20" : "bg-[#B3483A]/10 border border-[#B3483A]/20"
          }`}>
            <h3 className={`font-sora text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3 ${
              showFixed ? "text-[#4A7C59]" : "text-[#B3483A]"
            }`}>
              {showFixed ? "After Fix" : "Current Issues"}
            </h3>
            <ul className="space-y-2 sm:space-y-2.5">
              {(showFixed ? fixedBenefits : currentIssues).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  {showFixed ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A7C59] flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#B3483A] flex-shrink-0" />
                  )}
                  <span className="font-sora text-xs sm:text-sm text-[#1B1B1B]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stat Card */}
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#E8E4DD] flex items-center gap-3 sm:block">
            <p className="font-space text-3xl sm:text-4xl text-[#C6A85A] font-bold leading-none">+40%</p>
            <p className="font-sora text-xs sm:text-sm text-[#6B6460] sm:mt-1">Average CTR increase with optimized OG tags</p>
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
        {showFixed ? "Mix like a pro. The Breville Handy Mix Scraper is here. ✨" : "Discover our curated collection of luxury homeware."}
      </p>
      <div className="flex-1 bg-[#f8f8f8] flex items-center justify-center min-h-[140px] relative overflow-hidden">
        {showFixed ? (
          <div className="w-full h-full flex items-center justify-center p-6">
            <Image
              src={PRODUCT.image}
              alt={PRODUCT.name}
              width={200}
              height={200}
              className="object-contain max-h-full w-auto"
            />
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
          {showFixed ? PRODUCT.name : "Canada's Home for Luxury Designer Homeware"}
        </p>
        <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
          {showFixed ? PRODUCT.description : "Canada's Home for Luxury Designer Homeware"}
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
            {showFixed ? "Mix like a pro. The Breville Handy Mix Scraper is here. ✨" : "Discover our curated collection of luxury homeware."}
          </p>
          <div className="mt-3 rounded-xl border border-gray-200 overflow-hidden">
            <div className="h-32 bg-[#f8f8f8] flex items-center justify-center relative overflow-hidden">
              {showFixed ? (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={PRODUCT.image}
                    alt={PRODUCT.name}
                    width={120}
                    height={120}
                    className="object-contain max-h-full w-auto"
                  />
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
                {showFixed ? PRODUCT.name : "Canada's Home for Luxury Designer Homeware"}
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
        {showFixed ? "Mix like a pro. The Breville Handy Mix Scraper is here. ✨" : "Discover our curated collection of luxury homeware."}
      </p>
      <div className="flex-1 bg-[#f8f8f8] flex items-center justify-center min-h-[120px] relative overflow-hidden">
        {showFixed ? (
          <div className="w-full h-full flex items-center justify-center p-5">
            <Image
              src={PRODUCT.image}
              alt={PRODUCT.name}
              width={180}
              height={180}
              className="object-contain max-h-full w-auto"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
            <span className="font-serif text-white text-4xl font-bold">ML</span>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-gray-100">
        <p className="text-sm font-semibold text-gray-900 line-clamp-1">
          {showFixed ? PRODUCT.name : "Canada's Home for Luxury Designer Homeware"}
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
            <p className="text-sm text-black">Have you seen this mixer from Maison Lipari?</p>
          </div>
        </div>
        <div className="self-start max-w-[85%]">
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="h-24 bg-[#f8f8f8] flex items-center justify-center relative overflow-hidden">
              {showFixed ? (
                <div className="w-full h-full flex items-center justify-center p-3">
                  <Image
                    src={PRODUCT.image}
                    alt={PRODUCT.name}
                    width={100}
                    height={100}
                    className="object-contain max-h-full w-auto"
                  />
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
                {showFixed ? PRODUCT.name : "Canada's Home for Luxury Designer Homeware"}
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

// Compact Preview Components for Mobile (keeping for potential future use)
function FacebookPreviewCompact({ showFixed }: { showFixed: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-2.5 sm:p-3 border-b border-gray-100">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1B3A5C] flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-white text-[10px] sm:text-xs font-bold">ML</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">Maison Lipari</p>
          <p className="text-[10px] text-gray-500">2h · 🌐</p>
        </div>
      </div>
      <div className="flex-1 bg-[#f8f8f8] flex items-center justify-center min-h-[80px] sm:min-h-[100px] overflow-hidden">
        {showFixed ? (
          <div className="w-full h-full flex items-center justify-center p-3">
            <Image src={PRODUCT.image} alt={PRODUCT.name} width={80} height={80} className="object-contain max-h-full w-auto" />
          </div>
        ) : (
          <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
            <span className="font-serif text-white text-2xl sm:text-3xl font-bold">ML</span>
          </div>
        )}
      </div>
      <div className="p-2 sm:p-3 bg-gray-50 border-t border-gray-100">
        <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase">maisonlipari.ca</p>
        <p className="text-[11px] sm:text-sm font-semibold text-gray-900 line-clamp-1">
          {showFixed ? PRODUCT.shortName : "Canada's Home for Luxury..."}
        </p>
      </div>
    </div>
  )
}

function XPreviewCompact({ showFixed }: { showFixed: boolean }) {
  return (
    <div className="flex flex-col h-full p-2.5 sm:p-3">
      <div className="flex gap-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1B3A5C] flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-white text-[10px] sm:text-xs font-bold">ML</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xs text-gray-900 truncate">Maison Lipari</span>
            <span className="text-gray-500 text-[10px] sm:text-xs flex-shrink-0">· 2h</span>
          </div>
          <div className="mt-1.5 rounded-lg border border-gray-200 overflow-hidden">
            <div className="h-16 sm:h-20 bg-[#f8f8f8] flex items-center justify-center overflow-hidden">
              {showFixed ? (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <Image src={PRODUCT.image} alt={PRODUCT.name} width={60} height={60} className="object-contain max-h-full w-auto" />
                </div>
              ) : (
                <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
                  <span className="font-serif text-white text-xl font-bold">ML</span>
                </div>
              )}
            </div>
            <div className="p-2 bg-white">
              <p className="text-[10px] sm:text-xs font-medium text-gray-900 line-clamp-1">
                {showFixed ? PRODUCT.shortName : "Canada's Home for Luxury..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkedInPreviewCompact({ showFixed }: { showFixed: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-2.5 sm:p-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1B3A5C] flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-white text-xs sm:text-sm font-bold">ML</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">Maison Lipari</p>
          <p className="text-[10px] text-gray-500">1,234 followers · 2h</p>
        </div>
      </div>
      <div className="flex-1 bg-[#f8f8f8] flex items-center justify-center min-h-[70px] sm:min-h-[90px] overflow-hidden">
        {showFixed ? (
          <div className="w-full h-full flex items-center justify-center p-3">
            <Image src={PRODUCT.image} alt={PRODUCT.name} width={70} height={70} className="object-contain max-h-full w-auto" />
          </div>
        ) : (
          <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
            <span className="font-serif text-white text-2xl sm:text-3xl font-bold">ML</span>
          </div>
        )}
      </div>
      <div className="p-2 sm:p-3 border-t border-gray-100">
        <p className="text-[11px] sm:text-sm font-semibold text-gray-900 line-clamp-1">
          {showFixed ? PRODUCT.shortName : "Canada's Home for Luxury..."}
        </p>
        <p className="text-[9px] sm:text-xs text-gray-500">maisonlipari.ca</p>
      </div>
    </div>
  )
}

function IMessagePreviewCompact({ showFixed }: { showFixed: boolean }) {
  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] p-2.5 sm:p-3">
      <div className="flex-1 flex flex-col justify-end gap-1.5">
        <div className="self-start max-w-[85%]">
          <div className="bg-[#E9E9EB] rounded-2xl rounded-bl-md px-2.5 sm:px-3 py-1.5">
            <p className="text-[11px] sm:text-xs text-black">Seen this from Maison Lipari?</p>
          </div>
        </div>
        <div className="self-start max-w-[85%]">
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div className="h-14 sm:h-16 bg-[#f8f8f8] flex items-center justify-center overflow-hidden">
              {showFixed ? (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <Image src={PRODUCT.image} alt={PRODUCT.name} width={50} height={50} className="object-contain max-h-full w-auto" />
                </div>
              ) : (
                <div className="w-full h-full bg-[#1B3A5C] flex items-center justify-center">
                  <span className="font-serif text-white text-lg font-bold">ML</span>
                </div>
              )}
            </div>
            <div className="p-1.5 sm:p-2">
              <p className="text-[10px] sm:text-xs font-medium text-black line-clamp-1">
                {showFixed ? PRODUCT.shortName : "Canada's Home for..."}
              </p>
            </div>
          </div>
        </div>
        <div className="self-end max-w-[85%]">
          <div className="bg-[#007AFF] rounded-2xl rounded-br-md px-2.5 sm:px-3 py-1.5">
            <p className="text-[11px] sm:text-xs text-white">{showFixed ? "Stunning! 😍" : "Just shows logo..."}</p>
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
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-1">Competitive Analysis</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-0.5">SSENSE Benchmark</h2>
      <p className="font-sora text-xs sm:text-sm text-[#6B6460] mb-4 md:mb-6">
        Montreal-based luxury e-commerce with strong technical execution
      </p>

      {/* Mobile: Cards Layout */}
      <div className="sm:hidden flex-1 space-y-3.5 overflow-y-auto">
        {metrics.map((row, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-[#E8E4DD]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-sora text-sm font-semibold text-[#1B1B1B]">{row.metric}</h4>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-sora font-medium ${
                row.status === "broken" ? "bg-[#B3483A]/15 text-[#B3483A]" : "bg-[#6B6460]/15 text-[#6B6460]"
              }`}>
                {row.status === "broken" ? "Fix needed" : "TBD"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-sora text-[10px] text-[#6B6460] uppercase tracking-wide mb-1">Maison Lipari</p>
                <div className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-[#B3483A]" />
                  <p className="font-sora text-xs text-[#B3483A]">{row.ml}</p>
                </div>
              </div>
              <div>
                <p className="font-sora text-[10px] text-[#6B6460] uppercase tracking-wide mb-1">SSENSE</p>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4A7C59]" />
                  <p className="font-sora text-xs text-[#4A7C59]">{row.ssense}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table Layout */}
      <div className="hidden sm:block bg-white rounded-xl border border-[#E8E4DD] overflow-hidden flex-1">
        <table className="w-full">
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

      <div className="bg-[#C6A85A]/10 border-l-4 border-[#C6A85A] p-4 sm:p-5 rounded-r-xl mt-4">
        <p className="font-sora text-xs sm:text-sm text-[#1B1B1B]">
          <span className="font-semibold">Insight:</span> SSENSE has flawless meta tag implementation. The fix is a single theme patch.
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
    { tag: "Twitter Cards", current: "Missing", fix: "Add twitter:card meta" },
  ]

  return (
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#4A7C59] font-sora text-xs tracking-[0.2em] uppercase mb-1">Solution</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-0.5">The Fix</h2>
      <p className="font-sora text-[11px] sm:text-sm text-[#6B6460] mb-4">
        Theme-level Liquid patch in <code className="bg-[#E8E4DD] px-1 py-0.5 rounded text-[10px] sm:text-xs font-mono">theme.liquid</code>
      </p>

      <div className="space-y-2 sm:space-y-3 flex-1">
        {changes.map((change, idx) => (
          <div key={idx} className="bg-white rounded-xl p-3 sm:p-4 border border-[#E8E4DD]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#1B1B1B] text-white rounded-lg font-mono text-[10px] sm:text-xs self-start">{change.tag}</span>
              <div className="flex-1 grid sm:grid-cols-2 gap-1.5 sm:gap-2">
                <div className="flex items-start gap-1.5">
                  <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B3483A] flex-shrink-0 mt-0.5" />
                  <p className="font-sora text-[11px] sm:text-sm text-[#6B6460]">{change.current}</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4A7C59] flex-shrink-0 mt-0.5" />
                  <p className="font-mono text-[11px] sm:text-sm text-[#4A7C59]">{change.fix}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#4A7C59]/10 border border-[#4A7C59]/20 rounded-xl p-3.5 sm:p-5 mt-3">
        <p className="font-sora text-[11px] sm:text-sm text-[#1B1B1B]">
          <span className="font-semibold text-[#4A7C59]">Coverage:</span> All 4,300+ products, 469 collections, 90 pages — EN and FR
        </p>
      </div>
    </div>
  )
}

// ============ SLIDE 9: Additional Fixes ============
function AdditionalFixesSlide() {
  const fixes = [
    { title: "Repair Booking Flow", effort: "Low", impact: "High", description: "/products/appointments returns 404. Redirect to valid booking endpoint.", icon: Wrench },
    { title: "Remove Test Page", effort: "Low", impact: "Med", description: "/pages/test is live and indexed. Unpublish or noindex.", icon: Target },
    { title: "Sitemap Cleanup", effort: "Low", impact: "Med", description: "Remove stale/test pages from sitemap.xml", icon: Zap },
  ]

  return (
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-1.5">Quick Wins</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-4 md:mb-8">
        Additional Fixes
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 flex-1">
        {fixes.map((fix, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 md:p-6 border border-[#E8E4DD] flex flex-col">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C6A85A]/15 flex items-center justify-center mb-3">
              <fix.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A85A]" />
            </div>
            <h3 className="font-sora text-sm sm:text-base font-semibold text-[#1B1B1B] mb-1.5">{fix.title}</h3>
            <p className="font-sora text-[11px] sm:text-sm text-[#6B6460] flex-1 leading-snug">{fix.description}</p>
            <div className="flex gap-1.5 mt-3">
              <span className="px-2 py-0.5 bg-[#4A7C59]/15 text-[#4A7C59] rounded-full text-[10px] sm:text-xs font-sora">{fix.effort}</span>
              <span className="px-2 py-0.5 bg-[#C6A85A]/15 text-[#C6A85A] rounded-full text-[10px] sm:text-xs font-sora">{fix.impact}</span>
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
    { scenario: "Conservative", details: "50K sessions, +0.1% CVR", monthly: "$7.5K" },
    { scenario: "Moderate", details: "100K sessions, +0.2% CVR", monthly: "$50K" },
    { scenario: "Optimistic", details: "200K sessions, +0.4% CVR", monthly: "$320K" },
  ]

  return (
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-1">Financial Model</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-0.5">Revenue Impact</h2>
      <p className="font-sora text-[11px] sm:text-sm text-[#6B6460] mb-4">
        Replace estimates with actual GA4/Shopify data
      </p>

      <div className="bg-[#1B1B1B] text-white rounded-xl p-3.5 sm:p-5 mb-4">
        <p className="font-mono text-[11px] sm:text-sm">
          <span className="text-[#C6A85A]">Revenue</span> = Sessions × Delta CVR × AOV
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
        {projections.map((proj, idx) => (
          <div key={idx} className={`rounded-xl p-3 sm:p-5 border ${
            idx === 1 ? "bg-[#C6A85A]/15 border-[#C6A85A]" : "bg-white border-[#E8E4DD]"
          }`}>
            <p className="font-sora text-[9px] sm:text-xs font-semibold text-[#6B6460] uppercase mb-1">{proj.scenario}</p>
            <p className="font-space text-lg sm:text-2xl md:text-3xl text-[#1B1B1B] mb-1">{proj.monthly}</p>
            <p className="font-sora text-[9px] sm:text-xs text-[#6B6460] leading-tight">{proj.details}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#8A8F6A]/10 border-l-4 border-[#8A8F6A] p-3.5 sm:p-5 rounded-r-xl mt-auto">
        <p className="font-sora text-[11px] sm:text-sm text-[#1B1B1B]">
          <span className="font-semibold">VIP Appointments:</span> Fixing booking captures lost leads —{" "}
          <span className="font-space text-[#4A7C59]">$3.6K - $143K/month</span>
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
      price: "$2.5K - $4K",
      timeline: "5-7 business days",
      scope: ["Deploy canonical/OG/Twitter patch", "Repair booking redirect", "Sitemap cleanup"],
    },
    {
      name: "90-Day Retainer",
      price: "$3K - $5K/mo",
      timeline: "Ongoing",
      scope: ["Week 1 fixes included", "CRO experiments (3-5/mo)", "GA4/GTM tracking setup"],
      featured: true,
    },
  ]

  return (
    <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-1.5">Proposal</p>
      <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] mb-4 md:mb-8">
        Engagement Options
      </h2>

      <div className="grid md:grid-cols-2 gap-3 md:gap-6 flex-1">
        {options.map((option, idx) => (
          <div key={idx} className={`rounded-xl p-4 sm:p-6 md:p-8 flex flex-col ${
            option.featured ? "bg-[#1B1B1B] text-white" : "bg-white border border-[#E8E4DD]"
          }`}>
            {option.featured && (
              <span className="px-2.5 py-0.5 bg-[#C6A85A] text-[#1B1B1B] rounded-full text-[10px] sm:text-xs font-sora font-semibold self-start mb-3">
                Recommended
              </span>
            )}
            <h3 className={`font-cormorant text-lg sm:text-xl md:text-2xl mb-1 ${option.featured ? "text-white" : "text-[#1B1B1B]"}`}>
              {option.name}
            </h3>
            <p className="font-space text-xl sm:text-2xl md:text-3xl mb-0.5 text-[#C6A85A]">{option.price}</p>
            <p className={`font-sora text-[10px] sm:text-xs mb-4 ${option.featured ? "text-white/60" : "text-[#6B6460]"}`}>
              {option.timeline}
            </p>
            <div className="space-y-2 sm:space-y-3 flex-1">
              {option.scope.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${option.featured ? "text-[#C6A85A]" : "text-[#4A7C59]"}`} />
                  <p className={`font-sora text-[11px] sm:text-sm ${option.featured ? "text-white/80" : "text-[#1B1B1B]"}`}>{item}</p>
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
    "Review this audit (15-30 min call)",
    "Confirm scope and timeline",
    "Deploy fix; see results in 2-3 weeks",
  ]

  return (
    <div className="min-h-full flex flex-col justify-center items-center p-5 sm:p-8 md:p-16 text-center">
      <p className="text-[#C6A85A] font-sora text-xs tracking-[0.2em] uppercase mb-3 md:mb-6">Let's Begin</p>
      <h2 className="font-cormorant text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1B1B1B] mb-6 md:mb-10">Next Steps</h2>

      <div className="flex flex-col gap-3 md:gap-5 max-w-xl w-full mb-6 md:mb-10">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3 md:gap-5 text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C6A85A] flex items-center justify-center flex-shrink-0">
              <span className="font-space text-lg sm:text-xl text-white">{idx + 1}</span>
            </div>
            <p className="font-sora text-[13px] sm:text-base text-[#1B1B1B]">{step}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="font-cormorant text-lg sm:text-2xl text-[#1B1B1B] mb-1">Ready when you are.</p>
        <p className="font-sora text-xs sm:text-sm text-[#6B6460]">wiel@zouantcha.com</p>
      </div>
    </div>
  )
}

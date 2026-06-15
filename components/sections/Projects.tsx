'use client'

import DecryptedText from '@/components/DecryptedText'
import PixelatedImage from '@/components/ui/PixelatedImage'
import { useInView } from '@/hooks/useInView'
import useInAppBrowser from '@/hooks/useInAppBrowser'
import { projects } from '@/lib/projects'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Annotation labels for images
const imageAnnotations: Record<string, string[][]> = {
  'programming-defi-uniswap': [
    ['UNISWAP SERIES', 'PROGRAMMING DEFI', 'V1 V2 V3'],
    ['TUTORIALS', 'FROM SCRATCH', 'SOLIDITY'],
  ],
  'blockchain-in-go': [
    ['GO BLOCKCHAIN', 'FROM SCRATCH', '7 PARTS'],
  ],
  'defi-security': [
    ['SECURITY', 'CTF + AUDITS', 'WRITEUPS'],
  ],
  'shillz': [
    ['LANDING', 'GET PAID TO SHILL', 'CREATOR PLATFORM'],
    ['DASHBOARD', 'ACTIVE SHILLZ', 'LIVE METRICS'],
    ['PROJECT PAGE', 'CAMPAIGN DETAILS', 'REWARD POOLS'],
    ['ANALYTICS', 'PERFORMANCE TRENDS', 'BUDGET BREAKDOWN'],
    ['PROFILE', 'CREATOR STATS', 'EARNINGS'],
  ],
  'y2k-dotcom': [
    ['HOMEPAGE', 'NOSTALGIA OS', 'CULTURE COIN'],
    ['MEME MACHINE', 'AI GENERATION', 'INSTANT MEMES'],
    ['PORTFOLIO', 'HOLDER DASHBOARD', 'ON-CHAIN DATA'],
    ['MEME DATABASE', 'SEARCHABLE ARCHIVE', 'COMMUNITY UPLOADS'],
  ],
  'y2k-coded': [
    ['DROP PAGE', 'COUNTDOWN TIMER', 'NOSTALGIA VIBES'],
    ['POSTER DETAILS', 'FULL PRINT', 'ARTWORK VIEW'],
    ['DROP SCHEDULE', 'CALENDAR', 'UPCOMING DROPS'],
    ['BUNDLE', 'COLLECTOR SET', 'LIMITED EDITION'],
    ['CHECKOUT', 'ORDER FLOW', 'SECURE PAY'],
    ['ARCHIVE', 'PAST DROPS', 'SOLD OUT'],
  ],
}

// Animated scroll line component - tracks scroll through projects section
function ScrollLine() {
  const lineRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!lineRef.current || !glowRef.current) return

    const line = lineRef.current
    const glow = glowRef.current
    const container = line.parentElement
    if (!container) return

    // Calculate progress based on scroll position through the container
    const updateProgress = () => {
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const containerHeight = rect.height

      // Simple linear calculation:
      // Start: when container top is 300px below viewport top (early start)
      // End: when container bottom hits viewport bottom

      const earlyStartOffset = 600 // Start 600px before container reaches top

      // How far we've scrolled into the container
      // At start: rect.top = earlyStartOffset, scrolled = 0
      // At end: rect.bottom = viewportHeight, scrolled = containerHeight - viewportHeight + earlyStartOffset
      const scrolled = earlyStartOffset - rect.top
      const totalDistance = containerHeight - viewportHeight + earlyStartOffset

      // Calculate progress (0 to 1) - pure linear
      let progress = scrolled / totalDistance
      progress = Math.max(0, Math.min(1, progress))

      // Apply to glow element
      glow.style.height = `${progress * 100}%`

      // Calculate glow bottom position for cross activation
      const glowHeight = progress * containerHeight
      const glowBottomInViewport = rect.top + glowHeight

      // Find all project dividers (cross + h-line) and update their active state
      const dividers = container.querySelectorAll('.project-divider')
      dividers.forEach((divider) => {
        const dividerElement = divider as HTMLElement
        const cross = dividerElement.querySelector('.project-cross') as HTMLElement
        const hLine = dividerElement.querySelector('.project-h-line') as HTMLElement

        if (!cross) return

        const crossRect = cross.getBoundingClientRect()
        const crossTopInViewport = crossRect.top

        // Activate when the glow line reaches the cross
        if (glowBottomInViewport >= crossTopInViewport - 10 && progress > 0) {
          cross.classList.add('active')
          if (hLine) hLine.classList.add('active')
        } else {
          cross.classList.remove('active')
          if (hLine) hLine.classList.remove('active')
        }
      })
    }

    // Throttled scroll handler using RAF
    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        updateProgress()
        rafRef.current = null
      })
    }

    // Initial calculation
    updateProgress()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div ref={lineRef} className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px">
      {/* Base dashed line */}
      <div className="absolute inset-0 border-l border-dashed border-[#333333]" />

      {/* Solid yellow line trail - matches scroll position */}
      <div
        ref={glowRef}
        className="absolute left-0 w-px -ml-[0.5px]"
        style={{
          top: '0%',
          height: '0%',
          background: '#BEFE00',
        }}
      />
    </div>
  )
}

// Desktop project section with 1/3 - 2/3 layout
function DesktopProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const annotations = imageAnnotations[project.id] || []
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <div className="hidden md:block relative" ref={sectionRef}>
      {/* Cross marker at top */}
      <div className="relative project-divider">
        <span className="cross cross-top project-cross" style={{ left: '33.333%', transform: 'translateX(-50%) translateY(-50%)' }}>+</span>
        <div className="h-line project-h-line" />
      </div>

      {/* Main grid: 1/3 info, 2/3 images */}
      <div className="grid grid-cols-3 min-h-screen">
        {/* Left: Project info (sticky, top-aligned) */}
        <div className="col-span-1 relative">
          <div className="sticky top-0 h-screen flex flex-col justify-start pt-16 lg:pt-24 p-8 lg:p-12 border-r border-dashed border-[#333333]">
            <p className={`text-[#333333] text-xs mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              _{String(index + 1).padStart(2, '0')}
            </p>
            <h3 className={`text-2xl lg:text-3xl xl:text-4xl uppercase tracking-wide mb-3 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {isInView ? (
                <DecryptedText
                  text={project.title}
                  speed={70}
                  maxIterations={25}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789."
                  className="text-white"
                  encryptedClassName="text-[#333333]"
                />
              ) : (
                project.title
              )}
            </h3>
            <p className={`text-[#666666] uppercase text-xs mb-6 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {project.subtitle}
            </p>
            <div className={`space-y-1 text-[#888888] uppercase text-xs mb-8 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {project.description.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* Sub-projects */}
            {project.subProjects && (
              <div className={`space-y-2 mb-8 transition-all duration-700 delay-[400ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {project.subProjects.map((sub, subIndex) => (
                  sub.link ? (
                    <a
                      key={sub.name}
                      href={sub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-dashed border-[#333333] p-2 hover:border-[#BEFE00] hover:bg-[#BEFE00]/5 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#333333] text-xs group-hover:text-[#BEFE00] transition-colors">
                          _{String(subIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs uppercase">{sub.name}</span>
                      </div>
                      <span className="text-[#444444] group-hover:text-[#BEFE00] transition-colors text-sm">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <div
                      key={sub.name}
                      className="flex items-center justify-between border border-dashed border-[#333333] p-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#333333] text-xs">
                          _{String(subIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xs uppercase">{sub.name}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Links */}
            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-[500ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bracket-link uppercase text-xs"
                >
                  [{link.label}]
                </a>
              ))}
            </div>

            {/* Active indicator for Schills */}
            {project.id === 'shillz' && (
              <div className={`mt-8 flex items-center gap-2 transition-all duration-700 delay-[600ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
                <span className="text-[#BEFE00] text-xs uppercase tracking-wider">
                  ACTIVE
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Images with annotations (2/3) */}
        <div className="col-span-2 pt-16 lg:pt-24">
          {images.map((img, imgIndex) => (
            <div key={img.src} className="relative border-b border-dashed border-[#333333] last:border-b-0">
              <div className="p-8 lg:p-12">
                {/* Image number */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#333333] text-xs uppercase">
                    _{String(imgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                  </p>
                </div>

                {/* Image with annotation lines */}
                <div className="relative">
                  <div className="border border-dashed border-[#333333] overflow-hidden">
                    <PixelatedImage
                      src={img.src}
                      alt={`${project.title} screenshot ${imgIndex + 1}`}
                      width={img.width}
                      height={img.height}
                      className="w-full"
                    />
                  </div>

                  {/* Decorative line on right side - hidden on smaller screens to prevent overflow */}
                  <div className="hidden lg:flex absolute top-1/2 right-0 translate-x-full -translate-y-1/2 pl-4 items-center gap-2">
                    <div className="w-8 border-t border-dashed border-[#444444]" />
                    <div className="w-2 h-2 border border-[#444444] rotate-45" />
                  </div>
                </div>

                {/* Annotation label below image */}
                {annotations[imgIndex] && annotations[imgIndex][0] && (
                  <div className="flex justify-end mt-4">
                    <span className="text-[#555555] text-xs uppercase">
                      {annotations[imgIndex][0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mobile nav height fallback for sticky positioning
const DEFAULT_MOBILE_NAV_HEIGHT = 55

// Mobile project section - each header sticks to same position, next project covers previous
function MobileProjectSection({ project, index }: { project: typeof projects[0], index: number }) {
  const images = project.images || []
  const annotations = imageAnnotations[project.id] || []
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLButtonElement>(null)
  const nextHeaderRef = useRef<HTMLButtonElement | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isSticky, setIsSticky] = useState(false)
  const [canToggle, setCanToggle] = useState(false)
  const [handoffActive, setHandoffActive] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [manualOverride, setManualOverride] = useState(false)
  const [navHeight, setNavHeight] = useState(DEFAULT_MOBILE_NAV_HEIGHT)
  const isInApp = useInAppBrowser()
  const disableStacking = isInApp
  const isExpanded = disableStacking ? true : !isCollapsed

  // All projects sticky at the same position - right below mobile nav
  const stickyTop = navHeight
  const zIndex = 40 + index

  // Measure content height for smooth animation
  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const measureHeight = () => {
      const height = content.scrollHeight
      if (height > 0) setContentHeight(height)
    }

    measureHeight()
    const timer = setTimeout(measureHeight, 100)
    const resizeObserver = new ResizeObserver(measureHeight)
    resizeObserver.observe(content)

    return () => {
      resizeObserver.disconnect()
      clearTimeout(timer)
    }
  }, [isSticky])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const measureHeight = () => {
      const height = header.getBoundingClientRect().height
      if (height > 0) setHeaderHeight(height)
    }

    measureHeight()
    const resizeObserver = new ResizeObserver(measureHeight)
    resizeObserver.observe(header)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const setNextHeader = () => {
      nextHeaderRef.current = document.querySelector<HTMLButtonElement>(`[data-project-header="${index + 1}"]`)
    }
    setNextHeader()
    const timer = window.setTimeout(setNextHeader, 0)
    return () => window.clearTimeout(timer)
  }, [index])

  useEffect(() => {
    const readNavHeight = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--mobile-nav-height')
        .trim()
      const parsed = Number.parseFloat(raw)
      if (!Number.isNaN(parsed) && parsed > 0 && parsed !== navHeight) {
        setNavHeight(parsed)
      }
    }

    readNavHeight()
    const timer = window.setTimeout(readNavHeight, 0)
    window.addEventListener('resize', readNavHeight, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', readNavHeight)
    }
  }, [navHeight])

  useEffect(() => {
    if (disableStacking && isCollapsed) {
      setIsCollapsed(false)
    }
  }, [disableStacking, isCollapsed])

  useEffect(() => {
    if (disableStacking) {
      if (isSticky) setIsSticky(false)
      if (canToggle) setCanToggle(false)
      if (handoffActive) setHandoffActive(false)
      if (manualOverride) setManualOverride(false)
      return
    }
    const section = sectionRef.current
    const header = headerRef.current
    const content = contentRef.current
    if (!section || !header) return
    if (!content && !isSticky) return

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const navScrolling = document.documentElement.dataset.navScrolling === '1'
        if (navScrolling) {
          rafId = null
          return
        }

        const sectionRect = section.getBoundingClientRect()
        const sectionBeforeSticky = sectionRect.top > stickyTop + 1
        const sectionBottomPassed = sectionRect.bottom <= stickyTop + (headerHeight || 0) + 1
        const headerRect = header.getBoundingClientRect()
        const headerTop = headerRect.top
        const enterThreshold = stickyTop + 1
        const exitThreshold = stickyTop + 6
        const nextHeader = nextHeaderRef.current
        const nextHeaderTop = nextHeader ? nextHeader.getBoundingClientRect().top : Infinity
        const nextHeaderHits = nextHeaderTop <= stickyTop + 1
        const nextHeaderVisible = nextHeaderTop <= window.innerHeight - 4
        const boundaryBottom = Math.min(sectionRect.bottom, nextHeaderTop - 1)

        let nowSticky = isSticky
        if (!isSticky) {
          nowSticky = headerTop <= enterThreshold && !sectionBeforeSticky && !nextHeaderHits && !sectionBottomPassed
        } else if (sectionBeforeSticky || headerTop > exitThreshold || nextHeaderHits || sectionBottomPassed) {
          nowSticky = false
        }

        let contentOutOfView = false
        let canFitOverlay = false
        if (content) {
          const contentRect = content.getBoundingClientRect()
          const headerH = headerHeight || headerRect.height
          const threshold = stickyTop + headerH
          contentOutOfView = contentRect.bottom <= threshold
        }
        const headerH = headerHeight || headerRect.height
        const availableSpace = boundaryBottom - (stickyTop + headerH - 1)
        if (contentHeight > 0) {
          canFitOverlay = availableSpace >= contentHeight + 1
        }
        const nextCanToggle = nowSticky && contentOutOfView && canFitOverlay

        if (isSticky !== nowSticky) {
          setIsSticky(nowSticky)
        }
        if (canToggle !== nextCanToggle) {
          setCanToggle(nextCanToggle)
        }
        if (handoffActive !== nextHeaderVisible) {
          setHandoffActive(nextHeaderVisible)
        }

        // Only allow overlay toggle once content is fully out of view
        if (!manualOverride) {
          if (!nextCanToggle && !isCollapsed) setIsCollapsed(true)
        }

        // Reset manual override when section leaves sticky state or content is visible
        if (
          sectionBeforeSticky ||
          sectionBottomPassed ||
          !canFitOverlay ||
          !nowSticky ||
          !nextCanToggle ||
          nextHeaderHits
        ) {
          setManualOverride(false)
          if (!isCollapsed) setIsCollapsed(true)
        }

        rafId = null
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [stickyTop, manualOverride, isCollapsed, isSticky, canToggle, handoffActive, headerHeight, disableStacking])

  // Handle manual toggle
  const handleToggle = () => {
    if (disableStacking) return
    if (!isSticky || !canToggle) return
    const headerRect = headerRef.current?.getBoundingClientRect()
    const contentRect = contentRef.current?.getBoundingClientRect()
    const sectionRect = sectionRef.current?.getBoundingClientRect()
    const nextHeaderTop = nextHeaderRef.current?.getBoundingClientRect().top ?? Infinity
    const headerH = headerRect?.height ?? headerHeight
    const contentOutOfView = contentRect ? contentRect.bottom <= stickyTop + headerH : false
    const availableSpace = sectionRect
      ? Math.min(sectionRect.bottom, nextHeaderTop - 1) - (stickyTop + headerH - 1)
      : 0
    const canFitOverlay = contentHeight > 0 ? availableSpace >= contentHeight + 1 : false
    if (!contentOutOfView || !canFitOverlay) return

    setManualOverride(true)
    setIsCollapsed(!isCollapsed)
  }

  const renderContent = (
    stickyContent: boolean,
    forceCollapsed?: boolean,
    withId = true,
    attachRef = true,
    zIndex?: number
  ) => {
    const collapsed = disableStacking ? false : (forceCollapsed ?? isCollapsed)
    const transitionClass = disableStacking
      ? 'transition-none'
      : 'transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]'

    return (
      <div
        id={withId ? `project-content-${project.id}` : undefined}
        className={`${stickyContent ? 'absolute left-0 right-0 top-full z-20' : 'relative'} bg-black overflow-hidden ${transitionClass} ${
          collapsed ? 'max-h-0 opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          ...(zIndex !== undefined ? { zIndex } : {}),
          ...(!disableStacking && !collapsed && contentHeight ? { maxHeight: `${contentHeight}px` } : {}),
        }}
      >
        <div
          ref={attachRef ? contentRef : undefined}
          className={`px-3 pb-3 pt-4 border-t border-dashed border-[#333333] transition-opacity duration-200 ${
            collapsed ? 'opacity-0' : 'opacity-100'
          }`}
        >
        <p className="text-[#666666] uppercase text-xs mb-2">
          {project.subtitle}
        </p>
        <div className="space-y-2 text-[#888888] uppercase text-xs mb-4">
          {project.description.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bracket-link uppercase text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              [{link.label}]
            </a>
          ))}
        </div>

        {project.subProjects && (
          <div className="space-y-2">
            {project.subProjects.map((sub, subIndex) => (
              sub.link ? (
                <a
                  key={sub.name}
                  href={sub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-dashed border-[#333333] p-2 active:bg-[#BEFE00]/10 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#333333] text-xs">
                      _{String(subIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs uppercase">{sub.name}</span>
                  </div>
                  <span className="text-[#444444] text-sm">
                    ↗
                  </span>
                </a>
              ) : (
                <div
                  key={sub.name}
                  className="flex items-center justify-between border border-dashed border-[#333333] p-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#333333] text-xs">
                      _{String(subIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs uppercase">{sub.name}</span>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="md:hidden relative" data-project-section>
      {/* Top border - desktop: line with cross */}
      <div className="hidden md:block relative">
        {index > 0 && <span className="cross cross-center cross-top">+</span>}
        <div className="h-line" />
      </div>

      {/* Header + content wrapper */}
      <div className="relative">
        {/* Header (sticky when it reaches the nav) */}
        <button
          ref={headerRef}
          data-project-header={index}
          className={`w-full flex items-center justify-between px-3 py-3 border-b border-t border-dashed border-[#333333] bg-black ${disableStacking ? '' : 'sticky'}`}
          style={disableStacking ? { zIndex } : { top: `${stickyTop}px`, zIndex }}
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-controls={`project-content-${project.id}`}
          aria-disabled={disableStacking ? true : !canToggle}
        >
          <div className="flex items-center gap-3">
            <span className={`text-xs transition-colors duration-200 ${
              isExpanded ? 'text-[#333333]' : 'text-[#BEFE00]'
            }`}>
              _{String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-base sm:text-lg uppercase tracking-wide text-left">
              {project.title}
            </h3>
            {project.id === 'shillz' && (
              <span className="w-2 h-2 bg-[#BEFE00] rounded-full animate-pulse" />
            )}
          </div>
          <ChevronDown
            size={18}
            className={`transition-all duration-200 shrink-0 ${disableStacking ? 'opacity-0' : (!canToggle ? 'opacity-40' : '')} ${
              isExpanded ? 'rotate-180 text-[#BEFE00]' : 'text-[#666666]'
            }`}
          />
        </button>

        {/* In-flow content (scrolls under the sticky header) */}
        {renderContent(false, false, true, true, handoffActive ? zIndex - 1 : undefined)}

        {/* Overlay content (only when sticky + content fully out of view + expanded) */}
        {!disableStacking && isSticky && canToggle && manualOverride && !isCollapsed && (
          <div
            className="fixed left-0 right-0"
            style={{
              top: `${stickyTop + (headerHeight || 0) - 1}px`,
              zIndex: zIndex - 1,
            }}
          >
            {renderContent(false, false, false, false)}
          </div>
        )}

        {/* Images */}
        {images.length > 0 && (
          <div className="relative mt-4 space-y-4 px-4">
            {images.map((img, imgIndex) => (
              <div key={img.src}>
                <p className="text-[#333333] text-xs uppercase mb-2">
                  _{String(imgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </p>
                <div className="border border-dashed border-[#333333] overflow-hidden relative">
                  <PixelatedImage
                    src={img.src}
                    alt={`${project.title} screenshot ${imgIndex + 1}`}
                    width={img.width}
                    height={img.height}
                    className="w-full"
                  />
                  {annotations[imgIndex] && annotations[imgIndex][0] && (
                    <div className="absolute bottom-2 right-2 bg-black/90 border border-dashed border-[#333333] px-2 py-1 backdrop-blur-sm shadow-[0_0_8px_rgba(0,0,0,0.6)]">
                      <span className="text-white text-[10px] uppercase">
                        {annotations[imgIndex][0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  )
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef)

  return (
    <section id="projects" className="relative scroll-mt-[55px] md:scroll-mt-0">
      {/* Section header */}
      <div className="section-padding pb-0 md:py-[120px] lg:py-[160px]" ref={headerRef}>
        <div className="mx-auto md:mx-0 w-full">
          <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 text-left transition-all duration-700 ${isHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            [SELECTED WORK]
          </p>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-0 text-left">
            <h2 className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl uppercase tracking-wide leading-none transition-all duration-700 delay-100 ${isHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {isHeaderInView ? (
                <DecryptedText
                  text="PROJECTS"
                  speed={50}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                  className="text-white"
                  encryptedClassName="text-[#333333]"
                />
              ) : (
                'PROJECTS'
              )}
            </h2>
            <span className={`text-[#333333] text-base md:text-sm uppercase tracking-wider leading-none mt-2 md:mt-6 transition-all duration-700 delay-200 ${isHeaderInView ? 'opacity-100' : 'opacity-0'}`}>
              _{projects.length.toString().padStart(2, '0')}_FEATURED
            </span>
          </div>
        </div>
      </div>

      {/* Projects container - includes bottom border so ScrollLine spans full height */}
      <div className="relative mt-2 md:mt-2">
        {/* Animated scroll line for desktop (at 1/4 position) */}
        <ScrollLine />

        {/* Project sections */}
        {projects.map((project, index) => (
          <div key={project.id}>
            <DesktopProjectSection project={project} index={index} />
            <MobileProjectSection project={project} index={index} />
          </div>
        ))}

        {/* Bottom border with cross at 1/3 - inside container so ScrollLine reaches it */}
        <div className="hidden md:block relative project-divider">
          <span className="cross cross-top project-cross" style={{ left: '33.333%', transform: 'translateX(-50%) translateY(-50%)' }}>+</span>
          <div className="h-line project-h-line" />
        </div>
        {/* Mobile bottom border - no cross */}
        <div className="md:hidden border-t border-dashed border-[#333333]" />
      </div>
    </section>
  )
}

'use client'

import { useCallback, useRef } from 'react'
import { experiments } from '@/lib/projects'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'

export default function Experiments() {
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.glow-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const rawX = e.clientX - rect.left
      const rawY = e.clientY - rect.top
      const x = Math.min(Math.max(rawX, 0), rect.width)
      const y = Math.min(Math.max(rawY, 0), rect.height)
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right)
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom)
      const distance = Math.hypot(dx, dy)
      const maxDistance = 160
      const opacity = Math.max(0, 1 - distance / maxDistance)
      const cardElement = card as HTMLElement
      cardElement.style.setProperty('--glow-x', `${x}px`)
      cardElement.style.setProperty('--glow-y', `${y}px`)
      cardElement.style.setProperty('--glow-opacity', opacity.toFixed(2))
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.glow-card')
    cards.forEach((card) => {
      const cardElement = card as HTMLElement
      cardElement.style.setProperty('--glow-opacity', '0')
    })
  }, [])

  return (
    <section id="experiments" className="relative scroll-mt-[55px] md:scroll-mt-0" ref={sectionRef}>
      {/* Top border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      <div className="section-padding">
        <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          [LAB]
        </p>
        <h2 className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4 hover-glow transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {isInView ? (
            <DecryptedText
              text="EXPERIMENTS"
              speed={60}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              animateOn="view"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              className="text-white"
              encryptedClassName="text-[#333333]"
            />
          ) : (
            'EXPERIMENTS'
          )}
        </h2>
        <p className={`text-[#666666] text-base uppercase mb-16 max-w-xl transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          _SMART CONTRACTS, WEB3 PROTOTYPES, AI-POWERED BUILDS
        </p>

        {/* Experiments grid */}
        <div
          ref={gridRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {experiments.map((exp, index) => (
            <div
              key={exp.id}
              className="glow-card group relative bg-black border border-dashed border-[#333333] overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'linear-gradient(transparent 0, transparent 18px, rgba(190,254,0,0.04) 19px)' }} />
              <div className="absolute inset-y-0 left-0 w-[6px] bg-gradient-to-b from-[#BEFE00]/60 via-[#BEFE00]/10 to-transparent opacity-70" />
              <div className="absolute right-0 top-0 h-16 w-16 border-l border-b border-dashed border-[#222222]" />
              <div className="absolute left-0 bottom-0 h-16 w-16 border-r border-t border-dashed border-[#222222]" />

              {/* Content wrapper - sits above the glow */}
              <div className="relative z-10 p-7 md:p-9 bg-black">
                {/* Status row */}
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#444444] mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#333333]">_{String(index + 1).padStart(2, '0')}</span>
                    <span>LAB ENTRY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#BEFE00] animate-pulse" />
                    <span className="h-2 w-2 rounded-full bg-[#BEFE00]/60 animate-pulse" style={{ animationDelay: '120ms' }} />
                    <span className="h-2 w-2 rounded-full bg-[#BEFE00]/40 animate-pulse" style={{ animationDelay: '240ms' }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl uppercase mb-3 group-hover:text-[#BEFE00] group-hover:drop-shadow-[0_0_10px_rgba(190,254,0,0.4)] transition-all">
                  {exp.title}
                </h3>

                {/* Description */}
                <p className="text-[#666666] text-sm uppercase mb-6 max-w-md">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#444444] border border-[#333333] px-2 py-1 bg-black/60 group-hover:border-[#BEFE00]/30 group-hover:text-[#BEFE00]/70 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer strip */}
                <div className="mt-6 pt-4 border-t border-dashed border-[#222222] flex items-center justify-between text-xs uppercase tracking-widest text-[#444444]">
                  <span>RUN //</span>
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#BEFE00] hover:drop-shadow-[0_0_8px_rgba(190,254,0,0.5)] transition-all"
                    >
                      [VIEW] ↗
                    </a>
                  ) : (
                    <span>STANDBY</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>
    </section>
  )
}

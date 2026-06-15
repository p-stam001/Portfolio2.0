'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import RabbitHole from '@/components/ui/RabbitHole'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'

// Current rabbit holes - things I'm exploring/learning
const rabbitHoles = [
  {
    topic: 'SMART CONTRACTS',
    description: 'UPGRADEABLE PROXIES + ACCOUNT ABSTRACTION',
  },
  {
    topic: 'AI DEV WORKFLOWS',
    description: 'CURSOR + CLAUDE/CODEX AGENT SKILLS',
  },
  {
    topic: 'DEFI + TOKEN DESIGN',
    description: 'ON-CHAIN LOGIC + TOKENOMICS',
  },
]

function createRng(seed: number) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

type FallingLetter = {
  char: string
  delay: number
  duration: number
  drift: number
  rotate: number
  key: string
}

type FallingWord = {
  letters: FallingLetter[]
  key: string
}

function useFallingWords(text: string, seed: number) {
  return useMemo(() => {
    const rng = createRng(seed || 1)
    const words = text.split(' ')
    return words.map((word, wordIndex) => {
      const letters = Array.from(word).map((char, letterIndex) => {
        const delay = Math.floor(rng() * 140)
        const duration = 700 + Math.floor(rng() * 300)
        const drift = (rng() - 0.5) * 28
        const rotate = (rng() - 0.5) * 18
        return {
          char,
          delay,
          duration,
          drift,
          rotate,
          key: `${wordIndex}-${letterIndex}`,
        }
      })

      return { letters, key: `${wordIndex}` }
    })
  }, [text, seed])
}

function FallingText({ text, seed, letterClassName = '' }: { text: string; seed: number; letterClassName?: string }) {
  const words = useFallingWords(text, seed)

  return (
    <span className="magic-fall" aria-hidden="true">
      {words.map((word, wordIndex) => (
        <span key={word.key} className="magic-word-group">
          {word.letters.map((letter) => (
            <span
              key={letter.key}
              className={`magic-letter ${letterClassName}`.trim()}
              style={
                {
                  '--fall-delay': `${letter.delay}ms`,
                  '--fall-duration': `${letter.duration}ms`,
                  '--fall-x': `${letter.drift.toFixed(2)}px`,
                  '--fall-rotate': `${letter.rotate.toFixed(2)}deg`,
                } as CSSProperties
              }
            >
              {letter.char}
            </span>
          ))}
          {wordIndex < words.length - 1 ? <span className="magic-word-space"> </span> : null}
        </span>
      ))}
    </span>
  )
}

function MagicBox({ textClassName = '', fill = false }: { textClassName?: string; fill?: boolean }) {
  const [isActive, setIsActive] = useState(false)
  const [showInLayer, setShowInLayer] = useState(false)
  const [isCoarsePointer, setIsCoarsePointer] = useState(false)
  const clickTimeoutRef = useRef<number | null>(null)
  const hideInLayerRef = useRef<number | null>(null)
  const showInLayerRef = useRef<number | null>(null)
  const [triggerId, setTriggerId] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const updatePointer = () => setIsCoarsePointer(mediaQuery.matches)
    updatePointer()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePointer)
    } else {
      mediaQuery.addListener(updatePointer)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updatePointer)
      } else {
        mediaQuery.removeListener(updatePointer)
      }
    }
  }, [])

  useEffect(() => {
    const box = boxRef.current
    const content = contentRef.current
    if (!box || !content) return

    const updateFallDistance = () => {
      const boxStyles = window.getComputedStyle(box)
      const paddingTop = parseFloat(boxStyles.paddingTop) || 0
      const paddingBottom = parseFloat(boxStyles.paddingBottom) || 0
      const boxRect = box.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const viewportFall = window.innerHeight - contentRect.top + boxRect.height + 240
      const viewportRise = -(contentRect.top + window.innerHeight + 240)
      const bottomGap = Math.max(0, boxRect.bottom - contentRect.bottom - paddingBottom)
      const topGap = Math.max(0, contentRect.top - boxRect.top - paddingTop)
      const fallDistance = Math.max(viewportFall, bottomGap + window.innerHeight)
      const riseDistance = Math.min(viewportRise, -(topGap + window.innerHeight))
      box.style.setProperty('--fall-distance', `${fallDistance}px`)
      box.style.setProperty('--rise-distance', `${riseDistance}px`)
    }

    updateFallDistance()

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateFallDistance)
      resizeObserver.observe(box)
      resizeObserver.observe(content)
    }

    window.addEventListener('resize', updateFallDistance)

    return () => {
      window.removeEventListener('resize', updateFallDistance)
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current)
      }
      if (hideInLayerRef.current) {
        window.clearTimeout(hideInLayerRef.current)
      }
      if (showInLayerRef.current) {
        window.clearTimeout(showInLayerRef.current)
      }
    }
  }, [])

  const triggerMagic = () => {
    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current)
    }
    if (hideInLayerRef.current) {
      window.clearTimeout(hideInLayerRef.current)
    }
    if (showInLayerRef.current) {
      window.clearTimeout(showInLayerRef.current)
    }
    setIsActive(true)
    setShowInLayer(false)
    setTriggerId((prev) => prev + 1)
    const maxFallDelay = 140
    const maxFallDuration = 1000
    const inDelayMs = 1200
    const totalInMs = inDelayMs + maxFallDelay + maxFallDuration
    showInLayerRef.current = window.setTimeout(() => {
      setShowInLayer(true)
    }, inDelayMs)
    clickTimeoutRef.current = window.setTimeout(() => {
      setIsActive(false)
      hideInLayerRef.current = window.setTimeout(() => {
        setShowInLayer(false)
      }, 80)
    }, totalInMs + 80)
  }

  const handlePointerEnter = () => {
    if (!isCoarsePointer) triggerMagic()
  }

  const sentencePrefix =
    'I BUILD AT THE INTERSECTION OF SMART CONTRACTS, WEB3, AND AI — SHIPPING ON-CHAIN PRODUCTS THAT FEEL LIKE'
  const sentenceSuffix = '.'
  const quoteText =
    'THE KIND OF MAGIC THAT ONLY HAPPENS WHEN SOMEONE OBSESSES OVER THE DETAILS. BECAUSE "IF WE LOSE THE DETAILS, WE LOSE IT ALL." — WALT DISNEY'

  const magicMotion = useMemo(() => {
    const rng = createRng(triggerId + 999)
    return {
      delay: Math.floor(rng() * 800),
      duration: 700 + Math.floor(rng() * 500),
      drift: (rng() - 0.5) * 26,
      rotate: (rng() - 0.5) * 18,
    }
  }, [triggerId])

  return (
    <div
      ref={boxRef}
      className={`magic-box ${fill ? 'magic-box--fill' : ''} ${isActive ? 'is-active' : ''} ${showInLayer ? 'magic-box--show-in' : ''}`.trim()}
    >
      <div ref={contentRef} className="magic-box__content">
        <div className="magic-layer magic-layer--out">
          <div className={textClassName}>
            <p>
              <span className="sr-only">
                I BUILD AT THE INTERSECTION OF SMART CONTRACTS, WEB3, AND AI — SHIPPING ON-CHAIN PRODUCTS THAT FEEL LIKE MAGIC.
              </span>
              <FallingText text={sentencePrefix} seed={triggerId} letterClassName="magic-letter--out" />{' '}
              <button
                type="button"
                className="magic-word magic-letter magic-letter--out"
                aria-label="Trigger magic reveal"
                onPointerEnter={handlePointerEnter}
                onClick={triggerMagic}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    triggerMagic()
                  }
                }}
                style={
                  {
                    '--fall-delay': `${magicMotion.delay}ms`,
                    '--fall-duration': `${magicMotion.duration}ms`,
                    '--fall-x': `${magicMotion.drift.toFixed(2)}px`,
                    '--fall-rotate': `${magicMotion.rotate.toFixed(2)}deg`,
                  } as CSSProperties
                }
              >
                MAGIC
              </button>
              <FallingText text={sentenceSuffix} seed={triggerId + 1} letterClassName="magic-letter--out" />
            </p>
            <p>
              <span className="sr-only">
                THE KIND OF MAGIC THAT ONLY HAPPENS WHEN SOMEONE OBSESSES OVER THE DETAILS. BECAUSE &quot;IF WE
                LOSE THE DETAILS, WE LOSE IT ALL.&quot; — WALT DISNEY
              </span>
              <FallingText text={quoteText} seed={triggerId + 2} letterClassName="magic-letter--out" />
            </p>
          </div>
        </div>
        <div className="magic-layer magic-layer--in" aria-hidden="true">
          <div className={textClassName}>
            <p>
              <FallingText text={sentencePrefix} seed={triggerId + 101} letterClassName="magic-letter--in" />{' '}
              <span className="magic-word magic-letter magic-letter--in">MAGIC</span>
              <FallingText text={sentenceSuffix} seed={triggerId + 102} letterClassName="magic-letter--in" />
            </p>
            <p>
              <FallingText text={quoteText} seed={triggerId + 103} letterClassName="magic-letter--in" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section id="about" className="relative scroll-mt-[55px] md:scroll-mt-0" ref={sectionRef}>
      {/* Top border provided by Skills connector */}

      {/* Mobile layout */}
      <div className="md:hidden section-padding">
        <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          [ABOUT]
        </p>
        <h2 className={`text-4xl sm:text-5xl uppercase tracking-wide mb-6 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {isInView ? (
            <DecryptedText
              text="WHO AM I"
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
            'WHO AM I'
          )}
        </h2>

        {/* Stats */}
        <div className="space-y-2 text-[#666666] uppercase text-sm py-6 border-b border-dashed border-[#222222]">
          <p>_7 YEARS SHIPPING CODE</p>
          <p>_SMART CONTRACTS + DAPPS</p>
          <p>_AI-ACCELERATED BUILDER</p>
          <p>
            _BASED IN <span className="dashed-underline">HANOI</span>
          </p>
        </div>

        {/* Bio */}
        <div className="magic-box-bleed border-b border-dashed border-[#222222] mb-8">
          <MagicBox textClassName="space-y-6 text-[#888888] text-sm leading-[1.8]" />
        </div>

        {/* Rabbit Holes - centered for mobile */}
        <div className="mt-3">
          <RabbitHole items={rabbitHoles} />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-2">
        {/* Left side - Title & Stats */}
        <div className="relative section-padding flex flex-col gap-12">
          {/* Vertical divider */}
          <div className="absolute top-0 bottom-0 right-0 v-line" />

          <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            [ABOUT]
          </p>
          <h2 className={`text-5xl lg:text-6xl uppercase tracking-wide mb-8 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isInView ? (
              <DecryptedText
                text="WHO AM I"
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
              'WHO AM I'
            )}
          </h2>

          <div className="space-y-2 text-[#666666] uppercase text-base mb-12">
            <p>_7 YEARS SHIPPING CODE</p>
            <p>_SMART CONTRACTS + DAPPS</p>
            <p>_AI-ACCELERATED BUILDER</p>
            <p>
              _BASED IN <span className="dashed-underline">HANOI</span>
            </p>
          </div>

          {/* Current Rabbit Holes */}
          <RabbitHole items={rabbitHoles} />
        </div>

        {/* Right side - Bio */}
        <div className="section-padding relative flex items-stretch">
          <MagicBox textClassName="space-y-6 text-[#888888] text-lg leading-relaxed" fill />
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

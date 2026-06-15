'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useIsLoaded } from '@/components/PageWrapper'
import DecryptedText from '@/components/DecryptedText'

function HeroAvatar({ isLoaded }: { isLoaded: boolean }) {
  return (
    <div
      className={`relative shrink-0 transition-all duration-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] border border-dashed border-[#333333] bg-black p-2 hover:border-[#BEFE00]/60 transition-colors duration-300 group">
        <div className="absolute -top-px -left-px w-3 h-3 border-l border-t border-[#444444] group-hover:border-[#BEFE00]/50 transition-colors" />
        <div className="absolute -top-px -right-px w-3 h-3 border-r border-t border-[#444444] group-hover:border-[#BEFE00]/50 transition-colors" />
        <div className="absolute -bottom-px -left-px w-3 h-3 border-l border-b border-[#444444] group-hover:border-[#BEFE00]/50 transition-colors" />
        <div className="absolute -bottom-px -right-px w-3 h-3 border-r border-b border-[#444444] group-hover:border-[#BEFE00]/50 transition-colors" />
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/images/avatar.png"
            alt="Profile avatar"
            fill
            priority
            sizes="(max-width: 768px) 140px, 260px"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  )
}

// Custom component for the name that toggles between MR.CXDEV and Tran Minh
function ToggleName({ isLoaded }: { isLoaded: boolean }) {
  const [displayText, setDisplayText] = useState('MR.CXDEV')
  const [isToggled, setIsToggled] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [hasInitialAnimated, setHasInitialAnimated] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'
  const speed = 40

  const targetText = isToggled ? 'Tran Minh' : 'MR.CXDEV'

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const shuffleText = useCallback((target: string, revealed: Set<number>): string => {
    return target
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (revealed.has(i)) return target[i]
        return characters[Math.floor(Math.random() * characters.length)]
      })
      .join('')
  }, [characters])

  // Initial animation on load - decrypt to MR.CXDEV
  useEffect(() => {
    if (!isLoaded || hasInitialAnimated) return

    const target = 'MR.CXDEV'
    setIsScrambling(true)
    setRevealedIndices(new Set())

    let currentIndex = 0
    intervalRef.current = setInterval(() => {
      if (currentIndex < target.length) {
        setRevealedIndices(prev => {
          const newSet = new Set(prev)
          newSet.add(currentIndex)
          setDisplayText(shuffleText(target, newSet))
          return newSet
        })
        currentIndex++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsScrambling(false)
        setDisplayText(target)
        setHasInitialAnimated(true)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isLoaded, hasInitialAnimated, shuffleText])

  // Toggle animation (hover on desktop, click on mobile)
  useEffect(() => {
    if (!hasInitialAnimated) return

    if (intervalRef.current) clearInterval(intervalRef.current)

    setIsScrambling(true)
    setRevealedIndices(new Set())

    let currentIndex = 0
    intervalRef.current = setInterval(() => {
      if (currentIndex < targetText.length) {
        setRevealedIndices(prev => {
          const newSet = new Set(prev)
          newSet.add(currentIndex)
          setDisplayText(shuffleText(targetText, newSet))
          return newSet
        })
        currentIndex++
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsScrambling(false)
        setDisplayText(targetText)
      }
    }, speed)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isToggled, hasInitialAnimated, targetText, shuffleText])

  const handleClick = () => {
    if (isMobile) {
      setIsToggled(prev => !prev)
    }
  }

  return (
    <span
      className="cursor-pointer select-none"
      onMouseEnter={() => !isMobile && setIsToggled(true)}
      onMouseLeave={() => !isMobile && setIsToggled(false)}
      onClick={handleClick}
    >
      {displayText.split('').map((char, index) => {
        const isRevealed = revealedIndices.has(index) || !isScrambling
        return (
          <span
            key={index}
            className={isRevealed ? 'text-white' : 'text-[#444444]'}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

export default function Hero() {
  const isLoaded = useIsLoaded()
  const [showStrikethrough, setShowStrikethrough] = useState(false)
  const [showWeb3Dev, setShowWeb3Dev] = useState(false)

  // Sequence: Web2 decrypts -> strikethrough -> Web3 Dev decrypts
  useEffect(() => {
    if (!isLoaded) return

    const strikeTimer = setTimeout(() => {
      setShowStrikethrough(true)
    }, 800)

    const web3Timer = setTimeout(() => {
      setShowWeb3Dev(true)
    }, 1100)

    return () => {
      clearTimeout(strikeTimer)
      clearTimeout(web3Timer)
    }
  }, [isLoaded])

  return (
    <section className="min-h-screen flex flex-col justify-start md:justify-center section-padding relative">
      <div className="w-full max-w-6xl md:mb-24 lg:mb-32">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12 lg:gap-16">
          <div className="max-w-4xl flex-1">
            <div className="mb-8 md:hidden">
              <HeroAvatar isLoaded={isLoaded} />
            </div>

        {/* Name - toggles between MR.CXDEV and Tran Minh on hover */}
        <h1
          className={`text-6xl sm:text-7xl md:text-7xl lg:text-8xl uppercase tracking-wider mb-6 md:mb-12 hover-glow transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ToggleName isLoaded={isLoaded} />
        </h1>

        {/* Titles */}
        <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-[#888888] uppercase tracking-wide space-y-2 md:space-y-2">
          <p
            className={`transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {isLoaded ? (
              <DecryptedText
                text="SMART CONTRACT DEV"
                speed={50}
                maxIterations={15}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
                className="text-[#888888]"
                encryptedClassName="text-[#333333]"
              />
            ) : (
              'SMART CONTRACT DEV'
            )}
          </p>
          <p
            className={`transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* WEB2 DEV with animated strikethrough */}
            <span className="relative inline-block">
              {isLoaded ? (
                <DecryptedText
                  text="WEB2 DEV"
                  speed={50}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
                  className={showStrikethrough ? 'text-[#555555]' : 'text-[#888888]'}
                  encryptedClassName="text-[#333333]"
                />
              ) : (
                'WEB2 DEV'
              )}
              {/* Animated strikethrough line */}
              <span
                className="absolute left-0 top-1/2 h-[2px] bg-[#BEFE00] transition-all duration-500 ease-out"
                style={{
                  width: showStrikethrough ? '100%' : '0%',
                  transform: 'translateY(-50%)',
                }}
              />
            </span>{' '}
            {/* WEB3 DEV - appears after strikethrough */}
            <span className="text-white">
              {showWeb3Dev ? (
                <DecryptedText
                  text="WEB3 DEV"
                  speed={50}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
                  className="text-white"
                  encryptedClassName="text-[#444444]"
                />
              ) : (
                <span className="opacity-0">WEB3 DEV</span>
              )}
            </span>
          </p>
          <p
            className={`transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="cursor">
              {isLoaded ? (
                <DecryptedText
                  text="AI TOOLS BUILDER"
                  speed={60}
                  maxIterations={25}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
                  className="text-[#888888]"
                  encryptedClassName="text-[#333333]"
                />
              ) : (
                'AI TOOLS BUILDER'
              )}
            </span>
          </p>
        </div>

        {/* Scroll indicator - directly under titles on mobile */}
        <p
          className={`text-[#444444] text-xs md:text-sm uppercase tracking-widest mt-[100px] md:hidden transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          [SCROLL TO EXPLORE]
        </p>
          </div>

          <div className="hidden md:block md:pt-4 lg:pt-8">
            <HeroAvatar isLoaded={isLoaded} />
          </div>
        </div>
      </div>

      {/* Scroll indicator - absolute on desktop only */}
      <div
        className={`hidden md:block absolute bottom-8 left-0 right-0 section-padding transition-all duration-700 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-[#444444] text-sm uppercase tracking-widest">
          [SCROLL TO EXPLORE]
        </p>
      </div>
    </section>
  )
}

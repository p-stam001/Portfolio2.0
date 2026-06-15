'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen({ onLoadComplete }: { onLoadComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // Enable scrolling when loading is complete
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (!isComplete) {
      root.classList.add('scroll-locked')
      body.classList.add('scroll-locked')
    } else {
      root.classList.remove('scroll-locked')
      body.classList.remove('scroll-locked')
    }

    return () => {
      root.classList.remove('scroll-locked')
      body.classList.remove('scroll-locked')
    }
  }, [isComplete])

  useEffect(() => {
    const duration = 2500 // 2.5 second loading
    const interval = 50
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setIsComplete(true)
          onLoadComplete?.()
          setTimeout(() => setIsHidden(true), 600)
        }, 400)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadComplete])

  if (isHidden) return null

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black z-[10000] flex flex-col items-center justify-center gap-8 transition-opacity duration-500 overflow-hidden px-4 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* MW ASCII Logo - W is M flipped upside-down with matched height */}
      <div className="flex items-start gap-3 md:gap-6 text-[#ffffff] text-[8px] sm:text-[10px] md:text-xs lg:text-sm leading-tight tracking-tighter font-mono select-none">
        {/* M */}
        <pre className="m-0">{`███╗   ███╗
████╗ ████║
██╔████╔██║
██║╚██╔╝██║
██║ ╚═╝ ██║
╚═╝     ╚═╝`}</pre>
        {/* W - raised up to align visually */}
        <pre className="m-0" style={{ transform: 'translateY(-5px)' }}>{`╔═╗     ╔═╗
██║ ╔═╗ ██║
██║╔██╚╗██║
██╚████╚██║
████╝ ████║
███╝   ███╝`}</pre>
      </div>

      {/* Loading text */}
      <div className="text-[#666666] text-base md:text-sm tracking-[0.3em] uppercase">
        <span>INITIALIZING</span>
        <span className="inline-flex ml-1">
          <span className="animate-pulse" style={{ animationDelay: '0s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-56 md:w-64">
        <div className="h-px bg-[#222222] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-white transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 text-xs text-[#444444] tracking-wider">
          <span>[{Math.floor(progress)}%]</span>
          <span>{progress >= 100 ? 'READY' : 'LOADING'}</span>
        </div>
      </div>

      {/* Terminal-style status messages */}
      <div className="text-sm md:text-xs text-[#333333] space-y-2 mt-4 tracking-wide">
        <p className={`transition-colors duration-300 ${progress > 30 ? 'text-[#555555]' : ''}`}>
          {progress > 30 ? '>' : '_'} LOADING_WEB3_STACK
        </p>
        <p className={`transition-colors duration-300 ${progress > 60 ? 'text-[#555555]' : ''}`}>
          {progress > 60 ? '>' : '_'} INIT_SMART_CONTRACTS
        </p>
        <p className={`transition-colors duration-300 ${progress > 90 ? 'text-[#555555]' : ''}`}>
          {progress > 90 ? '>' : '_'} RENDER_READY
        </p>
      </div>
    </div>
  )
}

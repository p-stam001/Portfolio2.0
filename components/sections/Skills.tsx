'use client'

import { useEffect, useRef } from 'react'
import LogoLoop from '@/components/LogoLoop'
import { useInView } from '@/hooks/useInView'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiSolidity,
  SiEthereum,
  SiSolana,
  SiRust,
  SiWeb3Dotjs,
  SiClaude,
  SiOpenai,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import { renderToStaticMarkup } from 'react-dom/server'

const TARGET_SIZE = 36
const SOURCE_SIZE = 72
const PIXEL_SIZE = 2

const PixelatedIcon = ({
  icon: Icon,
  src,
  label,
}: {
  icon?: IconType
  src?: string
  label: string
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = TARGET_SIZE * dpr
    canvas.height = TARGET_SIZE * dpr
    canvas.style.width = `${TARGET_SIZE}px`
    canvas.style.height = `${TARGET_SIZE}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = false

    const img = new Image()
    img.onload = () => {
      const lowRes = Math.max(1, Math.round(SOURCE_SIZE / PIXEL_SIZE))
      const offscreen = document.createElement('canvas')
      offscreen.width = lowRes
      offscreen.height = lowRes
      const offCtx = offscreen.getContext('2d')
      if (!offCtx) return
      offCtx.imageSmoothingEnabled = false
      offCtx.clearRect(0, 0, lowRes, lowRes)
      offCtx.drawImage(img, 0, 0, lowRes, lowRes)

      const imageData = offCtx.getImageData(0, 0, lowRes, lowRes)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const alpha = data[i + 3]
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
        if (alpha > 16 && luminance > 12) {
          data[i] = 102
          data[i + 1] = 102
          data[i + 2] = 102
          data[i + 3] = 255
        } else {
          data[i + 3] = 0
        }
      }
      offCtx.putImageData(imageData, 0, 0)

      ctx.clearRect(0, 0, TARGET_SIZE, TARGET_SIZE)
      ctx.drawImage(offscreen, 0, 0, TARGET_SIZE, TARGET_SIZE)
    }
    if (Icon) {
      const svgMarkup = renderToStaticMarkup(
        <Icon size={SOURCE_SIZE} color="#666666" />
      )
      img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`
    } else if (src) {
      img.src = src
    }
  }, [Icon, src])

  return (
    <canvas
      ref={canvasRef}
      width={TARGET_SIZE}
      height={TARGET_SIZE}
      className="pixelated-skill-icon h-[var(--logoloop-logoHeight)] w-[var(--logoloop-logoHeight)]"
      aria-hidden="true"
      data-label={label}
    />
  )
}

const skills = [
  { node: <PixelatedIcon icon={SiSolidity} label="Solidity" />, title: 'Solidity' },
  { node: <PixelatedIcon icon={SiEthereum} label="Ethereum" />, title: 'Ethereum' },
  { node: <PixelatedIcon icon={SiSolana} label="Solana" />, title: 'Solana' },
  { node: <PixelatedIcon icon={SiRust} label="Rust" />, title: 'Rust' },
  { node: <PixelatedIcon icon={SiWeb3Dotjs} label="Web3.js" />, title: 'Web3.js' },
  { node: <PixelatedIcon icon={SiReact} label="React" />, title: 'React' },
  { node: <PixelatedIcon icon={SiNextdotjs} label="Next.js" />, title: 'Next.js' },
  { node: <PixelatedIcon icon={SiTypescript} label="TypeScript" />, title: 'TypeScript' },
  { node: <PixelatedIcon icon={SiClaude} label="Claude Code" />, title: 'Claude Code' },
  { node: <PixelatedIcon icon={SiOpenai} label="OpenAI" />, title: 'OpenAI' },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section id="skills" className="relative" ref={sectionRef}>
      {/* Top border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      <div className={`py-8 transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <LogoLoop
          logos={skills}
          speed={60}
          direction="left"
          logoHeight={36}
          gap={80}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Technical skills"
        />
      </div>

      {/* Bottom border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      {/* Connector section to About - vertical line with crosses at both ends */}
      <div className="relative flex flex-col items-center">
        {/* Vertical connector line */}
        <div className="w-px h-32 md:h-48 border-l border-dashed border-[#333333]" />
        {/* Bottom cross of connector */}
        <div className="relative w-full">
          <span className="cross cross-center cross-top">+</span>
          <div className="h-line" />
        </div>
      </div>
    </section>
  )
}

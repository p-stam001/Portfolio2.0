'use client'

import { useRef } from 'react'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'

const contactLinks = [
  { label: 'EMAIL', value: 'PATCH.DEMON115@GMAIL.COM', href: 'mailto:patch.demon115@gmail.com' },
  { label: 'GITHUB', value: 'GITHUB.COM/P-STAM001', href: 'https://github.com/p-stam001' },
  { label: 'X', value: '@CXDEV115', href: 'https://x.com/cxdev115' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <footer id="contact" className="relative scroll-mt-[55px] md:scroll-mt-0" ref={sectionRef}>
      {/* Top border with cross */}
      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      <div className="section-padding">
        <div className="max-w-4xl">
          <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            [CONTACT]
          </p>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isInView ? (
              <DecryptedText
                text="LET'S CONNECT"
                speed={60}
                maxIterations={20}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ'"
                className="text-white"
                encryptedClassName="text-[#333333]"
              />
            ) : (
              "LET'S CONNECT"
            )}
          </h2>
          <p className={`text-[#666666] text-lg uppercase mb-16 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            _BUILDING ON-CHAIN? LET&apos;S TALK.
          </p>

          {/* Contact links */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="block group"
              >
                <span className="text-[#444444] text-sm uppercase tracking-widest">
                  _{link.label}
                </span>
                <p className="text-lg md:text-xl lg:text-2xl uppercase mt-1 group-hover:text-[#888888] transition-colors break-all md:break-normal">
                  {link.value}
                </p>
              </a>
            ))}
          </div>

        </div>

        {/* Footer credit */}
        <div className="mt-32 pt-8 border-t border-dashed border-[#222222]">
          <p className="text-[#333333] text-sm uppercase tracking-widest">
            &copy; 2026 MR.CXDEV INC
          </p>
          <p className="text-[#222222] text-sm uppercase tracking-widest mt-2">
            _DESIGNED & BUILT BY YOURS TRULY
          </p>
        </div>
      </div>
    </footer>
  )
}

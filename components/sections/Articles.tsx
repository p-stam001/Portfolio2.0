'use client'

import Link from 'next/link'
import { useRef } from 'react'
import DecryptedText from '@/components/DecryptedText'
import { useInView } from '@/hooks/useInView'
import { blogs } from '@/lib/blogs'

const blogIcon = (
  <svg viewBox="0 0 16 16" className="h-10 w-10 text-[#BEFE00]" aria-hidden="true">
    <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="4" y="5" width="8" height="1.5" fill="currentColor" />
    <rect x="4" y="8" width="6" height="1.5" fill="currentColor" />
    <rect x="4" y="11" width="5" height="1.5" fill="currentColor" />
  </svg>
)

const featuredBlogs = blogs.slice(0, 3)

export default function Articles() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section id="articles" className="relative scroll-mt-[55px] md:scroll-mt-0" ref={sectionRef}>
      <div className="section-padding">
        <p className={`text-[#444444] text-sm uppercase tracking-widest mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          [WRITING]
        </p>
        <h2 className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-4 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {isInView ? (
            <DecryptedText
              text="ARTICLES"
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
            'ARTICLES'
          )}
        </h2>
        <p className={`text-[#666666] text-base uppercase mb-16 max-w-xl transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          _DEEP DIVES ON SMART CONTRACTS, DEFI, AND BLOCKCHAIN
        </p>

        <div className={`space-y-4 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {featuredBlogs.map((blog, index) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="relative block bg-black border border-dashed border-[#333333] p-6 md:p-8 hover:border-[#555555] transition-colors group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex gap-5">
                  <div className="shrink-0 h-14 w-14 border border-dashed border-[#333333] bg-black/60 flex items-center justify-center">
                    {blogIcon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[#333333] text-xs">
                        _{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[#444444] text-xs border border-[#333333] px-2 py-0.5">
                        BLOG
                      </span>
                      <span className="text-[#333333] text-xs">{blog.year}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl uppercase mb-3 group-hover:text-[#BEFE00] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-[#666666] text-xs uppercase">{blog.excerpt}</p>
                  </div>
                </div>
              </div>
              <div className="absolute right-6 top-6 text-[#444444] group-hover:text-[#BEFE00] transition-colors text-lg md:text-xl">
                →
              </div>
            </Link>
          ))}
        </div>

        <div className={`mt-8 text-center transition-all duration-700 delay-[400ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link href="/blogs" className="bracket-link text-base uppercase">
            [VIEW ALL BLOGS]
          </Link>
        </div>
      </div>
    </section>
  )
}

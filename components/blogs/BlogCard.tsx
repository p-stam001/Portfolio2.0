import Link from 'next/link'
import type { BlogPost } from '@/lib/blogs'

const blogIcon = (
  <svg viewBox="0 0 16 16" className="h-10 w-10 text-[#BEFE00]" aria-hidden="true">
    <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="4" y="5" width="8" height="1.5" fill="currentColor" />
    <rect x="4" y="8" width="6" height="1.5" fill="currentColor" />
    <rect x="4" y="11" width="5" height="1.5" fill="currentColor" />
  </svg>
)

export default function BlogCard({ blog, index }: { blog: BlogPost; index: number }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="relative block bg-black border border-dashed border-[#333333] p-6 md:p-8 hover:border-[#555555] transition-colors group"
    >
      <div className="flex gap-5">
        <div className="shrink-0 h-14 w-14 border border-dashed border-[#333333] bg-black/60 flex items-center justify-center">
          {blogIcon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-[#333333] text-xs">_{String(index + 1).padStart(2, '0')}</span>
            <span className="text-[#444444] text-xs border border-[#333333] px-2 py-0.5">BLOG</span>
            <span className="text-[#333333] text-xs">{blog.year}</span>
          </div>
          <h2 className="text-xl md:text-2xl uppercase mb-3 group-hover:text-[#BEFE00] transition-colors">
            {blog.title}
          </h2>
          <p className="text-[#666666] text-sm uppercase leading-relaxed">{blog.excerpt}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-[#444444] border border-[#333333] px-2 py-0.5 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-6 top-6 text-[#444444] group-hover:text-[#BEFE00] transition-colors text-lg md:text-xl">
        →
      </div>
    </Link>
  )
}

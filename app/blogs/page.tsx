import type { Metadata } from 'next'
import BlogCard from '@/components/blogs/BlogCard'
import BlogHeader from '@/components/blogs/BlogHeader'
import { blogs } from '@/lib/blogs'

export const metadata: Metadata = {
  title: 'Blogs | Tran Duc Minh',
  description: 'Deep dives on smart contracts, DeFi, and blockchain development.',
}

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <BlogHeader />

      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      <div className="section-padding py-12 md:py-20">
        <p className="text-[#444444] text-sm uppercase tracking-widest mb-4">[BLOGS]</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl uppercase tracking-wide mb-4 text-white">
          ALL POSTS
        </h1>
        <p className="text-[#666666] text-base uppercase mb-12 max-w-xl">
          _{blogs.length.toString().padStart(2, '0')}_ WRITINGS ON WEB3 + SMART CONTRACTS
        </p>

        <div className="space-y-4 max-w-4xl">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.slug} blog={blog} index={index} />
          ))}
        </div>
      </div>

      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>
    </div>
  )
}

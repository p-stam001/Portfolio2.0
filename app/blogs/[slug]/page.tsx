import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogContent from '@/components/blogs/BlogContent'
import BlogHeader from '@/components/blogs/BlogHeader'
import { blogs, getAllBlogSlugs, getBlogBySlug } from '@/lib/blogs'

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const blog = getBlogBySlug(params.slug)

  if (!blog) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${blog.title} | Blogs`,
    description: blog.excerpt,
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const blog = getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  const currentIndex = blogs.findIndex((entry) => entry.slug === blog.slug)
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-black text-white">
      <BlogHeader />

      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>

      <article className="section-padding py-12 md:py-20">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[#444444] text-xs border border-[#333333] px-2 py-0.5 uppercase">BLOG</span>
            <span className="text-[#333333] text-xs uppercase">{blog.date}</span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-[#444444] border border-[#333333] px-2 py-0.5 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide mb-6 text-white leading-tight">
            {blog.title}
          </h1>

          <p className="text-[#666666] text-sm md:text-base uppercase leading-relaxed mb-10 pb-10 border-b border-dashed border-[#333333]">
            {blog.excerpt}
          </p>

          <BlogContent blocks={blog.blocks} />

          {blog.externalUrl && (
            <div className="mt-12 pt-8 border-t border-dashed border-[#333333]">
              <a
                href={blog.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bracket-link text-sm uppercase"
              >
                [READ ORIGINAL SOURCE ↗]
              </a>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-dashed border-[#333333] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevBlog ? (
              <Link
                href={`/blogs/${prevBlog.slug}`}
                className="border border-dashed border-[#333333] p-4 hover:border-[#555555] transition-colors group"
              >
                <span className="text-[#333333] text-xs uppercase">← PREV</span>
                <p className="text-sm uppercase mt-2 group-hover:text-[#BEFE00] transition-colors">
                  {prevBlog.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextBlog && (
              <Link
                href={`/blogs/${nextBlog.slug}`}
                className="border border-dashed border-[#333333] p-4 hover:border-[#555555] transition-colors group sm:text-right"
              >
                <span className="text-[#333333] text-xs uppercase">NEXT →</span>
                <p className="text-sm uppercase mt-2 group-hover:text-[#BEFE00] transition-colors">
                  {nextBlog.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </article>

      <div className="relative">
        <span className="cross cross-center cross-top">+</span>
        <div className="h-line" />
      </div>
    </div>
  )
}

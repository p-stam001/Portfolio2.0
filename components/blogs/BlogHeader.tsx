import Link from 'next/link'

export default function BlogHeader() {
  return (
    <header className="section-padding py-6 md:py-8 border-b border-dashed border-[#333333]">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="bracket-link text-xs md:text-sm uppercase">
          [← HOME]
        </Link>
        <Link href="/blogs" className="bracket-link text-xs md:text-sm uppercase">
          [ALL BLOGS]
        </Link>
      </div>
    </header>
  )
}

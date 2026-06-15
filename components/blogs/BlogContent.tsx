import type { BlogBlock } from '@/lib/blogs'

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={index}
                className="text-xl md:text-2xl uppercase tracking-wide text-white border-b border-dashed border-[#333333] pb-4"
              >
                {block.text}
              </h2>
            )
          case 'paragraph':
            return (
              <p key={index} className="text-[#888888] text-sm md:text-base leading-relaxed uppercase">
                {block.text}
              </p>
            )
          case 'list':
            return (
              <ul key={index} className="space-y-2 border border-dashed border-[#333333] p-5 md:p-6">
                {block.items.map((item) => (
                  <li key={item} className="text-[#666666] text-sm uppercase leading-relaxed pl-4 relative before:content-['_'] before:absolute before:left-0 before:text-[#BEFE00]">
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'code':
            return (
              <pre
                key={index}
                className="overflow-x-auto border border-dashed border-[#333333] bg-[#0a0a0a] p-4 md:p-6 text-xs md:text-sm text-[#888888] leading-relaxed"
              >
                <code>{block.code}</code>
              </pre>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

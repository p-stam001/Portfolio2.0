import { blogs } from './blogs'

export interface Article {
  id: string
  title: string
  url: string
  source: 'BLOG' | 'X'
  year: string
}

export const articles: Article[] = blogs.map((blog) => ({
  id: blog.slug,
  title: blog.title,
  url: `/blogs/${blog.slug}`,
  source: 'BLOG' as const,
  year: blog.year,
}))

export const articlesArchiveUrl = '/blogs'

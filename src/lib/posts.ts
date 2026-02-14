import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

type FrontMatter = {
  title: string
  date: string
  excerpt: string
}

export type PostSummary = FrontMatter & {
  slug: string
}

export type Post = PostSummary & {
  source: MDXRemoteSerializeResult
}

export function getAllPosts(): PostSummary[] {
  const filenames = fs.readdirSync(postsDirectory)

  return filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function loadPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')

  const { data, content } = matter(fileContents)
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    source,
  }
}

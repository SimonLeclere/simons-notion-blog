import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://simonleclere.com'

  const markdown = [
    '# Sitemap',
    '',
    '## Blog Posts',
    '',
    ...posts.map(post => {
      return [
        `### ${post.title}`,
        `- Published: ${post.formattedDate}`,
        `- HTML: ${baseUrl}/blog/${post.slug}`,
        `- Markdown: ${baseUrl}/blog/${post.slug}.md`,
        ''
      ].join('\n')
    })
  ].join('\n')

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}

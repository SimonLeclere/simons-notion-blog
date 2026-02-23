import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const post = getPostBySlug(slug)
    
    const author = post.authorName || post.author
    
    const markdown = [
      `# ${post.title}`,
      '',
      `Published: ${post.formattedDate}`,
      author ? `Author: ${author}` : '',
      '',
      post.content
    ].filter(Boolean).join('\n')

    // Return the raw markdown content
    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    })
  } catch {
    notFound()
  }
}

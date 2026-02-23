import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for a blog post
  if (pathname.startsWith('/blog/')) {
    // If the URL ends with .md, rewrite to the /md route
    if (pathname.endsWith('.md')) {
      const slug = pathname.replace('/blog/', '').replace('.md', '')
      return NextResponse.rewrite(new URL(`/blog/${slug}/md`, request.url))
    }

    // If the Accept header prefers markdown, rewrite to the /md route
    const acceptHeader = request.headers.get('accept') || ''
    if (acceptHeader.includes('text/markdown')) {
      // Check if text/markdown is preferred over text/html
      const markdownIndex = acceptHeader.indexOf('text/markdown')
      const htmlIndex = acceptHeader.indexOf('text/html')
      
      if (htmlIndex === -1 || markdownIndex < htmlIndex) {
        const slug = pathname.replace('/blog/', '')
        // Don't rewrite if it's already the /md route or other sub-routes
        if (!slug.includes('/')) {
          return NextResponse.rewrite(new URL(`/blog/${slug}/md`, request.url))
        }
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/blog/:path*',
}

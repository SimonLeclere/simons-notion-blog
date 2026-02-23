import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const acceptHeader = request.headers.get('accept') || ''

  // Log "Accept" header for every request
  console.log(`[Middleware] ${request.method} ${pathname} - Accept: ${acceptHeader}`)

  // Logic previously in proxy.ts for blog routing
  if (pathname.startsWith('/blog/')) {
    // If the URL ends with .md, rewrite to the /md route
    if (pathname.endsWith('.md')) {
      const slug = pathname.replace('/blog/', '').replace('.md', '')
      return NextResponse.rewrite(new URL(`/blog/${slug}/md`, request.url))
    }

    // If the Accept header prefers markdown, rewrite to the /md route
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

// Apply this middleware to most requests, but excluding specific static assets for clarity
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}


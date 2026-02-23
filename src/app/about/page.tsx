import Nav from '@/components/nav'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div>
      <Nav />
      <div className="mt-16 prose prose-zinc dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight">Hi, I'm Simon 👋</h1>
        <p className="lead text-xl text-gray-600 dark:text-gray-400">
          Engineering student at INSA Centre Val de Loire, passionate about building things on the web.
        </p>

        <div className="mt-8 space-y-6">
          <p>
            I'm drawn to the intersection of clean code, good design, and tools that actually solve problems.
            I like understanding how things work under the hood — whether that's a framework, a security mechanism, or a language feature.
          </p>

          <p>
            This blog is where I write about things I build, learn, or find interesting.
            The source is on{' '}
            <Link href="https://github.com/SimonLeclere" className="font-medium text-blue-600 dark:text-blue-400 no-underline hover:underline">GitHub</Link>
            {' '}— articles live as MDX files, versioned alongside their images and components.
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
]

export default function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="mb-8 border-b border-gray-100 dark:border-zinc-800 pb-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
          Simon&apos;s Blog
        </Link>

        {/* Hamburger button – visible on mobile only */}
        <button
          className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>

        {/* Desktop links – always visible on md+ */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
            return (
              <li key={item.path} className="flex items-center">
                <Link
                  href={item.path}
                  className={clsx(
                    "text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100",
                    isActive ? "text-gray-900 dark:text-gray-100 font-semibold" : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
          <li className="flex items-center">
            <Link
              href="https://github.com/SimonLeclere/simons-notion-blog"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="flex items-center text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-gray-100 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              href="/feed.xml"
              title="Flux RSS"
              className="flex items-center text-gray-400 hover:text-orange-500 dark:text-zinc-500 dark:hover:text-orange-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
              </svg>
              <span className="sr-only">Flux RSS</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu – slides open below the header */}
      <ul
        id="nav-menu"
        className={clsx(
          "md:hidden flex flex-col gap-1 overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "mt-4 max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100",
                  isActive ? "text-gray-900 dark:text-gray-100 font-semibold" : "text-gray-500 dark:text-gray-400"
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
        <li>
          <Link
            href="https://github.com/SimonLeclere/simons-notion-blog"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </Link>
        </li>
        <li>
          <Link
            href="/feed.xml"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
            </svg>
            Flux RSS
          </Link>
        </li>
      </ul>
    </nav>
  )
}

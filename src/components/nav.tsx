'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'GitHub', path: 'https://github.com/SimonLeclere/simons-notion-blog', external: true },
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
              <li key={item.path}>
                <Link
                  href={item.path}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
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
          <li>
            <Link
              href="/feed.xml"
              title="Flux RSS"
              className="text-gray-400 hover:text-orange-500 dark:text-zinc-500 dark:hover:text-orange-400 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
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
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
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
            href="/feed.xml"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
            </svg>
            Flux RSS
          </Link>
        </li>
      </ul>
    </nav>
  )
}

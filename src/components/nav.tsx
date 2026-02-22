'use client'

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

  return (
    <nav className="mb-8 flex flex-col md:flex-row items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-8">
      <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity mb-4 md:mb-0">
        Simon&apos;s Blog
      </Link>

      <ul className="flex items-center gap-6">
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
      </ul>
    </nav>
  )
}

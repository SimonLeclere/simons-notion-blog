import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { clsx } from 'clsx'

const navItems = [
  { label: 'Blog', path: '/blog' },
  { label: 'About Me', path: '/about-me' },
  { label: 'GitHub', path: 'https://github.com/SimonLeclere/simons-notion-blog', external: true },
]

export default function Header({ title, icon }: { title?: string; icon?: string }) {
  const { pathname } = useRouter()
  const char = icon || '🍺'
  const favicon = char.startsWith('http') || char.startsWith('/') ? char : `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${char}</text></svg>`

  return (
    <>
      <Head>
        <title>{title ? `${title} - Simon's Blog` : "Simon's Blog"}</title>
        <meta name="description" content="Technical blog about web development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} key="favicon" />
      </Head>

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
    </>
  )
}

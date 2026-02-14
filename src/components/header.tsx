import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Blog', page: '/blog' },
  { label: 'About', page: '/about' },
  { label: 'Source Code', link: 'https://github.com/SimonLeclere/simons-notion-blog' },
]

const Header = ({ title }: { title?: string }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>{title || "Simon's Blog"}</title>
        <meta name="description" content="Blog statique en MDX avec Next.js" />
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <div className={pathname === page ? 'active' : undefined}>{label}</div>
              </Link>
            ) : (
              <Link href={link || ''}>
                <div>{label}</div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header

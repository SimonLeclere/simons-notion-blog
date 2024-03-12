import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Blog', page: '/blog' },
  { label: 'About', page: '/about' },
  { label: 'Source Code', link: 'https://github.com/SimonLeclere/simons-notion-blog' },
]

const Header = ({ title, favicon }: { title?: string, favicon?: string }) => {
  const { pathname } = useRouter()

  console.log(title, favicon)

  return (
    <header className={styles.header}>
      <Head>
        <title>{title || "Simon's Blog"}</title>
        <meta
          name="description"
          content="Simon's blog - powered by Notion and Next.js"
        />
        {
          favicon ?
            favicon.startsWith('http') ?
              <link rel="icon" href={favicon} />
            :
              <link
                rel="icon"
                href={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${favicon}</text></svg>`}
              />
          : null
        }
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (

          <li key={label}>
            {page ? (
              <Link href={page}>
                <div className={pathname === page ? 'active' : undefined}>
                  {label}
                </div>
              </Link>
            ) : (
              <Link href={link || ''}>
                <div>
                  {label}
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header

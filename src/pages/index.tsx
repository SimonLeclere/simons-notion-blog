import Header from '../components/header'
import Link from 'next/link'

import sharedStyles from '../styles/shared.module.css'

export default function Index() {

    return (
    <>
      <Header/>
      <div className={sharedStyles.layout}>
        <h1>My Blog</h1>
        <h2>
            So this is my blog, powered by Notion and Next.js. Pretty neat, huh?
        </h2>

        <div className="explanation">
          <p>
            This is a statically generated{' '}
            <Link href="https://nextjs.org">Next.js</Link> site with a{' '}
            <Link href="https://notion.so">Notion</Link> powered blog that
            is deployed with <Link href="https://vercel.com">Vercel</Link>
            . It leverages some upcoming features in Next.js like{' '}
            <Link href="https://github.com/vercel/next.js/issues/9524">
              SSG support
            </Link>{' '}
            and{' '}
            <Link href="https://github.com/vercel/next.js/issues/8626">
              built-in CSS support
            </Link>{' '}
            which allow us to achieve all of the benefits listed above including
            blazing fast speeds, great local editing experience, and always
            being available!
          </p>

          <p>
            Get started by creating a new page in Notion and clicking the deploy
            button below. After you supply your token and the blog index id (the
            page&apos;s id in Notion) we will automatically create the table for you!
            See{' '}
            <Link href="https://github.com/ijjk/notion-blog#getting-blog-index-and-token">
              here in the readme
            </Link>{' '}
            for finding the new page&apos;s id. To get your token from Notion, login
            and look for a cookie under www.notion.so with the name `token_v2`.
            After finding your token and your blog&apos;s page id you should be good
            to go!
          </p>
        </div>
      </div>
    </>
  )
}

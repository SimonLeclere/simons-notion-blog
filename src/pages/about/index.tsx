import Header from '@/components/header'
import Link from 'next/link'

import styles from '@/styles/index.module.css';

export default function Index() {

    return (
    <>
      <Header title={"❓ About this blog"}/>
        <div className={styles.container}>
            <h1>Simon&apos; Notion-powered blog</h1>
            <h2>
                So this is my blog, powered by Notion and Next.js. Pretty neat, huh?
            </h2>

            <br/>

            <div className="explanation">

                <h2>How it works</h2>

                <p>
                    This is a statically generated <Link href="https://nextjs.org">Next.js</Link> site that
                    uses the <Link href="https://notion.so">Notion</Link> API to retrieve blog posts from a Notion
                    database. The whole project is open source and hosted on <Link href="https://vercel.com">Vercel</Link>.
                </p>

                <p>
                    The backend is heavily inspired by{' '}
                    <Link href="https://github.com/samuelkraft/notion-blog-nextjs">Samuel Kraft&apos;s Notion blog</Link> project.
                    And for the frontend, I used almost the same design as{' '}
                    <Link href="https://github.com/ijjk/notion-blog">ijjk&apos;s repo</Link>.

                    I wanted to create my own blog and I thought theses two projects were a great starting point !
                </p>

                <p>
                    If you want to create your own Notion blog, you can just fork the{' '}
                    <Link href="https://github.com/SimonLeclere/simons-notion-blog">repository</Link>{' '}
                    and follow the instructions in the readme. It&apos;s pretty easy to
                    get started!

                    Once you have your own blog, you can write blog posts in Notion and they will
                    automatically be published on your site. Most of Notion&apos;s features are
                    supported, including images, math equations with <Link href="https://katex.org/">KaTeX</Link>,
                    code blocks with syntax highlighting, tables, columns, emojis, and more!
                </p>

                {/* Pros and cons of this implementation */}
                <h2>Pros and cons</h2>

                <p>
                    <strong>Pros:</strong>
                </p>

                <ul>
                    <li>
                        <strong>Notion features:</strong> Most of Notion&apos;s features are supported, including images, math equations, code blocks, tables, columns, emojis, and more.
                    </li>
                    <li>
                        <strong>Instantaneous updates:</strong> Compose blog posts effortlessly within Notion, with changes instantly reflected on your website upon publication.                    </li>
                    <li>
                        <strong>Customizable:</strong> You can customize the design of your blog by editing the Next.js components.
                    </li>
                </ul>

                <p>
                    <strong>Cons:</strong>
                </p>

                <ul>
                    <li>
                        <strong>Performance limitations:</strong> Heavy reliance on the Notion API for content retrieval may lead to performance issues, especially during high traffic periods, potentially exceeding rate limits and causing slower load times.
                    </li>

                    <li>
                        <strong>Dependency risks:</strong> Relying on third-party services like Notion for core functionality introduces the risk of disruptions due to downtime or changes in API compatibility, necessitating quick adjustments or migrations.
                    </li>
                </ul>
                    

                <h2>Questions or feedback?</h2>

                <p>
                    If you have any questions or feedback, feel free to{' '}
                    <Link href="mailto:Simon%20Leclere<simon-leclere@orange.fr>?subject=Question%20%C3%A0%20propos%20de%20votre%20blog%20notion">send me an email</Link> or{' '}
                    <Link href="https://github.com/SimonLeclere/simons-notion-blog/issues">open an issue on GitHub</Link>.
                </p>
            </div>
        </div>
    </>
  )
}

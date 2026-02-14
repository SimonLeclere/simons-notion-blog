import Link from 'next/link'

import Header from '@/components/header'
import { getAllPosts } from '@/lib/posts'

import styles from '@/styles/index.module.css'
import sharedStyles from '@/styles/shared.module.css'

type BlogPageProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
  }[]
}

export function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  }
}

export default function BlogIndex({ posts }: BlogPageProps) {
  return (
    <main className={styles.container}>
      <Header title="Blog" />
      <div className={sharedStyles.layout}>
        {posts.length === 0 ? <p>There are no posts yet.</p> : null}
        <ol className={styles.posts}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.post}>
              <h3 className={styles.postTitle}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className={styles.postDescription}>
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`}>Lire l&apos;article →</Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}

import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote'

import Header from '@/components/header'
import Callout from '@/components/mdx/callout'
import { getAllPosts, loadPostBySlug, type Post } from '@/lib/posts'

import styles from '@/styles/post.module.css'

type BlogPostPageProps = {
  post: Post
}

const mdxComponents = {
  Callout,
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return {
    props: {
      post: await loadPostBySlug(params.slug),
    },
  }
}

export function getStaticPaths() {
  return {
    paths: getAllPosts().map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <div>
      <Header title={post.title} />
      <article className={styles.container}>
        <h1 className={styles.name}>{post.title}</h1>
        <p className={styles.meta}>{new Date(post.date).toLocaleDateString('fr-FR')}</p>
        <section>
          <MDXRemote {...post.source} components={mdxComponents} />
          <Link href="/blog" className={styles.back}>
            ← Retour aux articles
          </Link>
        </section>
      </article>
    </div>
  )
}

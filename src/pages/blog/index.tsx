import Link from 'next/link'
import Image from 'next/image';

import Header from '@/components/header'
import Text from "@/components/text";

import styles from '@/styles/index.module.css';
import sharedStyles from '@/styles/shared.module.css';
import blogStyles from '@/styles/blog.module.css';

import type { BlogPosts } from '../../../types'

import { getDatabase, revalidate } from '@/lib/notion'
import ViewCounter from '@/components/viewCounter';

async function getBlogPosts() {
  const database = await getDatabase();

  return database;
}


export async function getStaticProps() {
  return {
    props: {
      posts: await getBlogPosts(),
    },
    revalidate: revalidate,
  }
}

export default function Index({ posts = [] }: { posts: BlogPosts }) {

  return (
    <main className={styles.container}>
      <Header/>
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        {/* <h1>My Notion Blog</h1> */}
        {
          posts.length === 0 && (
            <p className={blogStyles.noPosts}>There are no posts yet</p>
          )
        }

        <ol className={styles.posts}>
          {posts.map((post: any) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              },
            );
            const slug = post.properties?.Slug?.rich_text[0].text.content;
            return (
              <li key={post.id} className={styles.post}>
              <h3 className={styles.postTitle}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  {
                    post.icon?.type === "emoji" && 
                      (<span>{post.icon?.emoji}</span>)
                  }
                  {
                    post.icon?.type === "external" && (
                    <Image
                      style={{ display: "inline", marginRight: 8 }}
                      src={post.icon?.external?.url}
                      alt={post.icon?.external?.url}
                      width={30}
                      height={30}
                    />)
                  }
                  {
                    post.icon?.type === "file" && (
                    <Image
                      style={{ display: "inline", marginRight: 8 }}
                      src={post.icon?.file?.url}
                      alt={post.icon?.file?.url}
                      width={30}
                      height={30}
                    />)
                  }
                </span>
                <Link href={`/blog/${slug}`}>
                <Text title={post.properties?.Page?.title} />
                </Link>
              </h3>
              <p className={styles.postDescription}>{date}</p>
              <p>{post.properties?.PreviewText?.rich_text[0].text.content}</p>
              <Link href={`/blog/${slug}`}>Read post →</Link>
              </li>
            );
          })}
        </ol>

      </div>
    </main>
  )
}

export function getDateStr(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
}
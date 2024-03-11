import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { getDatabase, getBlocks, getPageFromSlug } from '@/lib/notion';
import Text from '@/components/text';
import { renderBlock } from '@/components/notion/renderer';
import styles from '@/styles/post.module.css';
import Header from '@/components/header';

// Get the data for each blog post
export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  
  const page = await getPageFromSlug(slug);
  const blocks = await getBlocks(page?.id);

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 10,
  }
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getDatabase()
  // we fallback for any unpublished posts to save build time
  // for actually published ones  

  return {
    paths: postsTable.map((post) => `/blog/${post.properties?.Slug?.rich_text[0].text.content}`),
    fallback: true,
  }
}

export default function Page({ page, blocks }) {

  if (!page || !blocks) {
    return <div />;
  }

  return (
    <div>
      <Head>
        <title>{page.properties.Page?.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <article className={styles.container}>
        <h1 className={styles.name}>
          <span>
            {page.icon?.type === "emoji" && <span>{page.icon?.emoji}</span>}
            {
              page.icon?.type === "external" && (
                <Image
                  style={{ display: "inline", width: 40, height: 40, marginRight: 8 }}
                  src={page.icon?.external?.url}
                  alt={page.icon?.external?.url}
                  width={40}
                  height={40}
                />)
            }
            {
              page.icon?.type === "file" && (
                <Image
                  style={{ display: "inline", width: 40, height: 40, marginRight: 8 }}
                  src={page.icon?.file?.url}
                  alt={page.icon?.file?.url}
                  width={40}
                  height={40}
                />)
            }
          </span>
          <Text title={page.properties.Page?.title} />
        </h1>
        <section>
          {
            blocks.map((block) => (
              <div key={block.id}>{renderBlock(block)}</div>
            ))
          }
          <Link href="/" className={styles.back}>
            ← Go home
          </Link>
        </section>
      </article>
    </div>
  );
}
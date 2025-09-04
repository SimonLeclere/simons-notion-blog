import Link from 'next/link';
import Image from 'next/image';

import { getDatabase, getBlocks, getPageFromSlug } from '@/lib/notion';
import { cacheBlockImages, cachePageIcon } from '@/lib/imageCache';
import Text from '@/components/text';
import { renderBlock } from '@/components/notion/renderer';
import Header from '@/components/header';

import styles from '@/styles/post.module.css';

import { revalidate } from '@/lib/notion';
import ViewCounter from '@/components/viewCounter';

// Get the data for each blog post
export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  
  const page: any = await getPageFromSlug(slug);
  const blocks: any = await getBlocks(page?.id);

  // Cache images during build time
  let imageMap = new Map<string, string>();
  
  if (page && blocks) {
    try {
      // Cache page icon
      const pageIconMap = await cachePageIcon(page);
      
      // Cache images in blocks
      const blockImageMap = await cacheBlockImages(blocks);
      
      // Combine the maps
      imageMap = new Map([...pageIconMap, ...blockImageMap]);
      
      console.log(`Cached ${imageMap.size} images for post: ${slug}`);
    } catch (error) {
      console.warn('Error caching images:', error);
    }
  }

  return {
    props: {
      page,
      blocks,
      imageMap: Object.fromEntries(imageMap), // Convert Map to object for serialization
    },
    revalidate: revalidate,
  }
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getDatabase()
  // we fallback for any unpublished posts to save build time
  // for actually published ones  

  return {
    paths: postsTable.map((post: any) => `/blog/${post.properties?.Slug?.rich_text[0].text.content}`),
    fallback: true,
  }
}

export default function Page({ page, blocks, imageMap }: { page: any, blocks: any, imageMap: { [key: string]: string } }) {

  if (!page || !blocks) {
    return <div />;
  }

  // Helper function to get local image path
  const getImageSrc = (originalUrl: string) => {
    return imageMap[originalUrl] || originalUrl;
  };

  return (
    <div>
      <Header title={page.properties.Page?.title[0]?.text.content} favicon={page.icon?.emoji || page.icon?.external?.url || page.icon?.file?.url}/>

      <article className={styles.container}>
        <h1 className={styles.name}>
          <span>
            {page.icon?.type === "emoji" && <span>{page.icon?.emoji}</span>}
            {
              page.icon?.type === "external" && (
                <Image
                  style={{ display: "inline", width: 40, height: 40, marginRight: 8 }}
                  src={getImageSrc(page.icon?.external?.url)}
                  alt={page.icon?.external?.url}
                  width={40}
                  height={40}
                />)
            }
            {
              page.icon?.type === "file" && (
                <Image
                  style={{ display: "inline", width: 40, height: 40, marginRight: 8 }}
                  src={getImageSrc(page.icon?.file?.url)}
                  alt={page.icon?.file?.url}
                  width={40}
                  height={40}
                />)
            }
          </span>
          <Text title={page.properties.Page?.title} />
        </h1>
        <ViewCounter slug={page.properties.Slug?.rich_text[0].text.content} />
        <section>
          {
            blocks.map((block: any) => (
              <div key={block.id}>{renderBlock(block, 0, imageMap)}</div>
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
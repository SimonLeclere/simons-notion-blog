import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  try {
    const posts = getAllPosts();
    
    const siteURL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const feed = new Feed({
      title: "Simon's Blog",
      description: "Technical blog about web development",
      id: siteURL,
      link: siteURL,
      language: "fr",
      favicon: `${siteURL}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Simon`,
      updated: new Date(),
      feedLinks: {
        rss2: `${siteURL}/feed.xml`,
      },
      author: {
        name: "Simon",
      },
    });

    posts.forEach((post) => {
      const postUrl = `${siteURL}/blog/${post.slug}`;
      
      // Determine image URL: only use if it's a valid absolute or relative URL path, NOT an emoji
      let imageUrl: string | undefined = undefined;
      if (post.icon && post.icon.length > 4) { // Heuristic: emojis are short, paths/URLs are longer
        if (post.icon.startsWith("http")) {
          imageUrl = post.icon;
        } else if (post.icon.startsWith("/")) {
          imageUrl = `${siteURL}${post.icon}`;
        }
      }

      feed.addItem({
        title: post.title,
        id: postUrl,
        link: postUrl,
        description: post.excerpt,
        content: post.excerpt,
        author: [
          {
            name: post.authorName || "Simon",
          },
        ],
        date: new Date(post.date),
        image: imageUrl,
      });
    });

    return new Response(feed.rss2(), {
      headers: {
        "Content-Type": "application/xml",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=1200",
      },
    });
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

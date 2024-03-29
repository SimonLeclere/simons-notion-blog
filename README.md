# My Notion-Powered Blog

Welcome to my own Notion-powered blog! This project leverages Notion and Next.js to create a dynamically updated blog with ease.

## Overview

This is a statically generated Next.js site that fetches blog posts from a Notion database using the Notion API. The backend architecture is inspired by [Samuel Kraft's Notion blog project](https://github.com/samuelkraft/notion-blog-nextjs), while the frontend design closely resembles that of [ijjk's repository](https://github.com/ijjk/notion-blog).

## Features

- **Notion Integration:** Utilizes Notion's powerful features including images, math equations, code blocks, tables, columns, emojis, and more.
- **Instant Updates:** Changes made in Notion are instantly reflected on the website upon publication of blog posts (content is fetched every 2 minutes, you can set the revalidate time in the /src/lib/notion.ts file).
- **Customizable Design:** Easily customize the design of your blog by editing Next.js components.

## Getting Started

The easiest way to deploy your Notion-powered blog is by using the following "Deploy to vercel" button. This will clone the repository and deploy it to Vercel, where you can easily manage your blog. You will need to provide your Notion token and database ID during the deployment process. To get these, follow the steps in the ["How to find my Notion token and database ID ?"](#how-to-find-my-notion-token-and-database-id-) section below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSimonLeclere%2Fsimons-notion-blog&env=NOTION_DATABASE_ID,NOTION_TOKEN&envDescription=To%20find%20your%20DATABASE_ID%20and%20TOKEN%2C%20refer%20to%20the%20project%20readme%20-%3E%20https%3A%2F%2Fgithub.com%2FSimonLeclere%2Fsimons-notion-blog%20&project-name=notion-blog&repository-name=notion-blog&demo-title=Simon's%20Notion%20Blog&demo-description=A%20statically%20generated%20Next.js%20site%20that%20fetches%20blog%20posts%20from%20a%20Notion%20database%20using%20the%20Notion%20API.&demo-url=https%3A%2F%2Fsimons-blog.vercel.app%2Fblog)

If you want to deploy the blog locally or on a different platform, you can follow the steps in the ["Local Development"](#local-development) section below.

## How to find my Notion token and database ID ?

1. **Notion Token**: To get your own Notion API token, you will need to follow these steps:

    Go to <https://www.notion.so/my-integrations> as a logged-in Notion user
    Tap "New Integration", name it and choose a workspace for the integration
    This project only needs the “Read content” capability !
        It never updates/deletes your Notion content anyway.
        It cannot yet read any of your content (even with "Read content" access). It can only read pages/databases you explicitly share with it later.
    Choose “No user information” as the blog doesn’t require an account anyway 😇
    Tap Create/Submit
    Choose “Internal Integration” (should be already selected)
    Copy the Token 👌

2. **Database ID**: To find your Notion database ID, open the Notion database you want to use and look at the URL. The database ID is the string of characters that appears after <https://www.notion.so/> and before the ?v (if present). Do not include the hyphens in your ID. Copy this ID, and you're all set!

You database should have this structure:

![Database structure](/public/notion-database-structure.png)

## Local development

To get started with development, follow these steps:

1. Clone the repository.
2. Install dependencies using npm, yarn, pnpm, or bun.
3. Fill a .env file with NOTION_TOKEN and NOTION_DATABASE_ID.
4. Run the development server with `npm run dev`, `yarn dev`, `pnpm dev`, or `bun dev`.
5. Open <http://localhost:3000> in your browser to view the result.
6. Start editing files in the  `app/` folder to customize your blog.

## Pros and Cons of this approach

### Pros:

- **Feature-Rich:** Supports most of Notion's features, making it easy to create rich content.
- **Instant Updates:** Changes made in Notion are reflected on the website instantly (actually within 2 minutes but can be set to a lower value).
- **Customizable:** Easily customize the design to fit your preferences.

### Cons:

- **Performance Limitations:** Heavy reliance on the Notion API may lead to performance issues during high traffic periods.
- **Dependency Risks:** Relying on third-party services introduces the risk of disruptions due to downtime or changes in API compatibility.

## Questions or Feedback?

If you have any questions or feedback, feel free to reach out via [email](mailto:simon-leclere@orange.fr) or open an issue on GitHub.

Happy blogging!

---

**Simon**

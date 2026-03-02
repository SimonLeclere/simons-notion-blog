# Simon's Static MDX Blog

A minimal blog using Next.js and MDX. Posts live as .mdx files in the repo—no CMS required.

---

## Features

- Markdown/MDX posts with frontmatter
- Custom MDX components (e.g. callouts)
- Static generation and Vercel‑friendly
- Built‑in sitemap and RSS feed
- Content negotiation (HTML or Markdown based on Accept header, useful for agents)

---

## Quick start

```bash
npm ci      # or pnpm install
npm run dev  # open http://localhost:3000
```

---

## Writing posts

Create `.mdx` files in `src/content/posts` with frontmatter:

```md
---
title: "My Post"
date: "2026-02-14"
excerpt: "Short summary."
---
```

Use any MDX components from `src/components/mdx`:

```mdx
<Callout>Example</Callout>
```

---

## Images

Put assets in `public/images` and reference them:

```md
![Alt](/images/pic.png)
```

---

Happy writing!

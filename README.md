# Simon's static MDX blog

Blog Next.js statique avec contenu versionné dans ce dépôt.

## Stack

- Next.js (pages router)
- MDX via `next-mdx-remote`
- Génération statique à chaque build Vercel

## Où écrire les articles ?

Créez des fichiers `.mdx` dans `src/content/posts`.

Exemple de frontmatter requis :

```md
---
title: "Mon article"
date: "2026-02-14"
excerpt: "Résumé court pour la liste des posts"
---
```

## Composants MDX

Un composant d'exemple est fourni : `Callout` (`src/components/mdx/callout.tsx`).
Il est disponible directement dans les posts MDX :

```mdx
<Callout>Un encart personnalisé dans l'article.</Callout>
```

## Images

Placez vos assets dans `public/images` puis référencez-les dans le MDX :

```md
![Description](/images/mon-image.png)
```

## Développement local

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

Vercel reconstruira automatiquement le site à chaque commit.

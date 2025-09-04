# Image Caching System

This blog now includes an automatic image caching system that downloads and stores Notion images locally during the build process.

## How it works

1. **During build time** (`getStaticProps`):
   - All images in Notion blocks are identified
   - Page icons and callout icons are also identified
   - Images are downloaded and saved to `/public/notion-images/`
   - A mapping is created between original URLs and local paths

2. **During rendering**:
   - The renderer uses local image paths when available
   - Falls back to original URLs if caching failed
   - Works for all image types: block images, page icons, callout icons

## Benefits

- **Prevents broken images**: Notion image URLs expire, but local copies remain available
- **Better performance**: Images are served from the same domain
- **Reliability**: No dependency on external Notion URLs after build

## Implementation details

- Images are hashed using MD5 to generate unique filenames
- Original file extensions are preserved
- The `/public/notion-images/` directory is gitignored
- Error handling ensures the build doesn't fail if some images can't be downloaded

## Files involved

- `src/lib/imageCache.ts` - Core image caching functionality
- `src/pages/blog/[slug].tsx` - Blog post page with image caching
- `src/pages/blog/index.tsx` - Blog index with icon caching
- `src/components/notion/renderer.tsx` - Updated to use cached images
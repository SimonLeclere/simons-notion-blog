import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Directory to store cached images
const CACHE_DIR = path.join(process.cwd(), 'public', 'notion-images');

// Ensure cache directory exists
export function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

// Generate a safe filename from URL
export function getImageFilename(url: string): string {
  const hash = crypto.createHash('md5').update(url).digest('hex');
  const urlObj = new URL(url);
  const extension = path.extname(urlObj.pathname) || '.png';
  return `${hash}${extension}`;
}

// Get the local path for an image
export function getLocalImagePath(filename: string): string {
  return `/notion-images/${filename}`;
}

// Download and cache an image
export async function downloadAndCacheImage(url: string): Promise<string | null> {
  try {
    // Skip if not a valid URL or not an image URL
    if (!url || !url.startsWith('http')) {
      return null;
    }

    ensureCacheDir();
    
    const filename = getImageFilename(url);
    const filePath = path.join(CACHE_DIR, filename);
    const localPath = getLocalImagePath(filename);

    // Return local path if file already exists
    if (fs.existsSync(filePath)) {
      return localPath;
    }

    // Download the image
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to download image: ${url} (${response.status})`);
      return null;
    }

    // Check if it's actually an image
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      console.warn(`URL is not an image: ${url} (${contentType})`);
      return null;
    }

    // Save the image
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    
    console.log(`Cached image: ${url} -> ${localPath}`);
    return localPath;
    
  } catch (error) {
    console.warn(`Error caching image ${url}:`, error);
    return null;
  }
}

// Process blocks recursively to find and cache all images
export async function cacheBlockImages(blocks: any[]): Promise<Map<string, string>> {
  const imageMap = new Map<string, string>();
  
  async function processBlock(block: any): Promise<void> {
    if (!block) return;

    switch (block.type) {
      case 'image': {
        const imageData = block[block.type];
        const originalUrl = imageData.type === "external" ? imageData.external.url : imageData.file.url;
        
        if (originalUrl) {
          const localPath = await downloadAndCacheImage(originalUrl);
          if (localPath) {
            imageMap.set(originalUrl, localPath);
          }
        }
        break;
      }
      
      case 'callout': {
        const calloutData = block[block.type];
        if (calloutData.icon) {
          let iconUrl = null;
          if (calloutData.icon.type === 'external') {
            iconUrl = calloutData.icon.external?.url;
          } else if (calloutData.icon.type === 'file') {
            iconUrl = calloutData.icon.file?.url;
          }
          
          if (iconUrl) {
            const localPath = await downloadAndCacheImage(iconUrl);
            if (localPath) {
              imageMap.set(iconUrl, localPath);
            }
          }
        }
        break;
      }
    }

    // Process children recursively
    if (block.children && Array.isArray(block.children)) {
      for (const child of block.children) {
        await processBlock(child);
      }
    }
  }

  // Process all blocks
  for (const block of blocks) {
    await processBlock(block);
  }

  return imageMap;
}

// Cache page icon if it exists
export async function cachePageIcon(page: any): Promise<Map<string, string>> {
  const imageMap = new Map<string, string>();
  
  if (page.icon) {
    let iconUrl = null;
    if (page.icon.type === 'external') {
      iconUrl = page.icon.external?.url;
    } else if (page.icon.type === 'file') {
      iconUrl = page.icon.file?.url;
    }
    
    if (iconUrl) {
      const localPath = await downloadAndCacheImage(iconUrl);
      if (localPath) {
        imageMap.set(iconUrl, localPath);
      }
    }
  }
  
  return imageMap;
}
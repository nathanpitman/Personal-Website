import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const IMAGES_DIR = 'public/images';
const MAX_WIDTH = 800;
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.gif']);

const files = await readdir(IMAGES_DIR);
let resized = 0;
let skipped = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!SUPPORTED.has(ext)) continue;

  const filePath = join(IMAGES_DIR, file);

  if (ext === '.gif') {
    skipped++;
    continue;
  }

  try {
    const image = sharp(filePath);
    const { width } = await image.metadata();

    if (width && width > MAX_WIDTH) {
      const buffer = await image
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .toBuffer();
      const { writeFile } = await import('fs/promises');
      await writeFile(filePath, buffer);
      console.log(`Resized: ${file} (${width}px → ${MAX_WIDTH}px)`);
      resized++;
    } else {
      skipped++;
    }
  } catch (err) {
    console.warn(`Skipped ${file}: ${err.message}`);
    skipped++;
  }
}

console.log(`Done — ${resized} resized, ${skipped} skipped.`);

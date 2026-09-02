import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('public/assets');

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const outPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        const isPng = ext === '.png';

        console.log(`Converting: ${entry.name} -> ${path.basename(outPath)}`);

        if (isPng) {
          await sharp(fullPath)
            .webp({ quality: 90, effort: 6 })
            .toFile(outPath);
        } else {
          // Work Photos
          await sharp(fullPath)
            .resize({ width: 1920, withoutEnlargement: true })
            .webp({ quality: 85, effort: 6 })
            .toFile(outPath);
        }

        const originalSize = fs.statSync(fullPath).size;
        const newSize = fs.statSync(outPath).size;
        const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
        console.log(`  Original: ${(originalSize / 1024).toFixed(1)} KB -> WebP: ${(newSize / 1024).toFixed(1)} KB (-${reduction}%)`);
      }
    }
  }
}

async function run() {
  console.log('Starting WebP conversion...');
  await processDirectory(baseDir);
  console.log('WebP conversion completed successfully!');
}

run();

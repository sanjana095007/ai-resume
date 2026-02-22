import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const IMAGE_DIR = 'src/assets/images';
const SIZES = [320, 640, 960, 1280];

async function optimizeImages() {
  const processImage = async (imagePath, baseName, outputDir) => {
    const ext = parse(imagePath).ext.toLowerCase();
    
    // Skip SVG files
    if (ext === '.svg') {
      console.log(`Skipping SVG: ${imagePath}`);
      return;
    }

    try {
      const image = sharp(imagePath);
      const metadata = await image.metadata();
      
      // Generate WebP versions at different sizes
      for (const size of SIZES) {
        if (size <= metadata.width) {
          const outputPath = join(outputDir, `${baseName}-${size}w.webp`);
          await image
            .clone()
            .resize(size, null, { 
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: 85 })
            .toFile(outputPath);
          console.log(`Generated: ${outputPath}`);
        }
      }
      
      // Generate a full-size WebP
      const fullSizePath = join(outputDir, `${baseName}.webp`);
      await image
        .clone()
        .webp({ quality: 85 })
        .toFile(fullSizePath);
      console.log(`Generated: ${fullSizePath}`);
      
    } catch (error) {
      console.error(`Error processing ${imagePath}:`, error.message);
    }
  };

  const processDirectory = async (dirPath) => {
    try {
      const entries = await readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
          await processDirectory(fullPath);
        } else if (entry.isFile()) {
          const ext = parse(entry.name).ext.toLowerCase();
          if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            const baseName = parse(entry.name).name;
            await processImage(fullPath, baseName, dirPath);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dirPath}:`, error.message);
    }
  };

  console.log('Starting image optimization...');
  await processDirectory(IMAGE_DIR);
  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);

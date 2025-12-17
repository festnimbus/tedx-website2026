import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, '..', 'public', 'gallery');

async function convertToWebp() {
    const files = fs.readdirSync(galleryDir);
    const jpgFiles = files.filter(f => f.toLowerCase().endsWith('.jpg'));

    for (const file of jpgFiles) {
        const inputPath = path.join(galleryDir, file);
        const outputName = file.replace(/\.jpg$/i, '.webp');
        const outputPath = path.join(galleryDir, outputName);

        try {
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);
            console.log(`Converted: ${file} -> ${outputName}`);
        } catch (err) {
            console.error(`Error converting ${file}:`, err.message);
        }
    }

    console.log('Conversion complete!');
}

convertToWebp();

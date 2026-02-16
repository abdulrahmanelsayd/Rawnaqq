const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public';
const outputDir = './public/optimized';

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [
  { width: 400, suffix: 'sm' },
  { width: 800, suffix: 'md' },
  { width: 1200, suffix: 'lg' }
];

async function optimizeImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
  
  console.log(`Found ${files.length} images to optimize`);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const name = path.parse(file).name;
    
    console.log(`Processing: ${file}`);
    
    try {
      // Create WebP versions at different sizes
      for (const size of sizes) {
        const outputFileName = `${name}-${size.suffix}.webp`;
        const outputPath = path.join(outputDir, outputFileName);
        
        await sharp(inputPath)
          .resize(size.width, null, { withoutEnlargement: true })
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);
        
        console.log(`  Created: ${outputFileName}`);
      }
      
      // Create a small JPEG fallback for older browsers
      const fallbackPath = path.join(outputDir, `${name}-sm.jpg`);
      await sharp(inputPath)
        .resize(400, null, { withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true })
        .toFile(fallbackPath);
      
      console.log(`  Created: ${name}-sm.jpg (fallback)`);
      
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  
  console.log('\nOptimization complete!');
  console.log(`Optimized images are in: ${outputDir}`);
}

optimizeImages();

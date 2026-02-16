const fs = require('fs');
const path = require('path');

const sourceDir = './public/optimized';
const buildDir = './build/optimized';

// Create build/optimized directory
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy all optimized images
const files = fs.readdirSync(sourceDir);
let copied = 0;

for (const file of files) {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(buildDir, file);
  
  fs.copyFileSync(sourcePath, destPath);
  copied++;
}

console.log(`✓ Copied ${copied} optimized images to build/optimized/`);

// Copy service worker and config files
const filesToCopy = ['sw.js', 'web.config', '.htaccess', '_headers'];

for (const file of filesToCopy) {
  const sourcePath = path.join('./public', file);
  const destPath = path.join('./build', file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✓ Copied ${file} to build/`);
  }
}

console.log('\n✓ Build assets ready for deployment!');

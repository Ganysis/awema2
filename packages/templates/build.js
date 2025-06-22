#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

function build() {
  console.log('Building @awema/templates...');
  
  const srcDir = path.join(__dirname, 'src');
  const distDir = path.join(__dirname, 'dist');
  
  // Clean dist directory
  console.log('Cleaning dist directory...');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  
  // Copy all files from src to dist
  console.log('Copying files from src to dist...');
  copyFolderSync(srcDir, distDir);
  
  // Create index.d.ts
  console.log('Creating TypeScript declarations...');
  const indexDts = `export * from './index';`;
  fs.writeFileSync(path.join(distDir, 'index.d.ts'), indexDts);
  
  console.log('Build complete!');
}

try {
  build();
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
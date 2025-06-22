#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Use esbuild to transpile TypeScript to JavaScript
try {
  console.log('Transpiling TypeScript files...');
  
  // Try to use esbuild if available
  let esbuild;
  try {
    esbuild = require('esbuild');
  } catch (e) {
    try {
      // Try to use esbuild from root node_modules
      esbuild = require('/home/Ganyc/Desktop/awema/awema2/node_modules/.pnpm/esbuild@0.25.5/node_modules/esbuild');
    } catch (e2) {
      console.error('esbuild is not installed. Please install it with: npm install esbuild');
      process.exit(1);
    }
  }
  
  // Clean dist directory
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });
  
  // Find all TypeScript files
  function findTsFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        findTsFiles(fullPath, files);
      } else if (item.endsWith('.ts') || item.endsWith('.js')) {
        files.push(fullPath);
      }
    }
    return files;
  }
  
  const srcDir = path.join(__dirname, 'src');
  const tsFiles = findTsFiles(srcDir);
  
  // Transpile each file
  for (const file of tsFiles) {
    const relativePath = path.relative(srcDir, file);
    const outFile = path.join(distDir, relativePath.replace(/\.ts$/, '.js'));
    
    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    
    try {
      const result = esbuild.buildSync({
        entryPoints: [file],
        outfile: outFile,
        format: 'esm',
        target: 'es2020',
        loader: { '.ts': 'ts', '.js': 'js' },
        sourcemap: false,
        minify: false,
      });
      
      console.log(`✓ ${relativePath}`);
    } catch (err) {
      console.error(`✗ ${relativePath}: ${err.message}`);
    }
  }
  
  // Create index.d.ts
  fs.writeFileSync(path.join(distDir, 'index.d.ts'), 'export * from "./index";');
  
  console.log('Transpilation complete!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
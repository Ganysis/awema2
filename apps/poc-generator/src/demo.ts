import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs/promises';

const execAsync = promisify(exec);

interface DemoSite {
  trade: string;
  variant: string;
  name: string;
}

const DEMO_SITES: DemoSite[] = [
  { trade: 'electricien', variant: 'ultra-pro', name: 'Élec Pro Services' },
  { trade: 'electricien', variant: 'premium', name: 'Prestige Électricité' },
  { trade: 'electricien', variant: 'minimal', name: 'Simple Élec' },
  { trade: 'plombier', variant: 'ultra-pro', name: 'Plomberie Moderne' },
  { trade: 'plombier', variant: 'premium', name: 'Premium Plomberie' },
  { trade: 'menuisier', variant: 'ultra-pro', name: 'Menuiserie Design' },
  { trade: 'menuisier', variant: 'premium', name: 'Artisan Menuisier' },
  { trade: 'peintre', variant: 'ultra-pro', name: 'Peinture Pro Plus' },
  { trade: 'peintre', variant: 'minimal', name: 'Peintre Express' },
  { trade: 'carreleur', variant: 'premium', name: 'Carrelage Premium' }
];

async function generateDemoSites() {
  console.log('🚀 AWEMA Demo Site Generator\n');
  console.log(`Generating ${DEMO_SITES.length} demo sites...\n`);
  
  const startTime = Date.now();
  const results: { site: DemoSite; success: boolean; error?: string }[] = [];
  
  // Path to the CLI
  const cliPath = path.join(__dirname, '..', '..', '..', 'packages', 'core', 'src', 'cli.ts');
  const outputBase = path.join(__dirname, '..', '..', 'preview-server', 'output');
  
  // Ensure output directory exists
  await fs.mkdir(outputBase, { recursive: true });
  
  for (let i = 0; i < DEMO_SITES.length; i++) {
    const site = DEMO_SITES[i];
    console.log(`[${i + 1}/${DEMO_SITES.length}] Generating ${site.name} (${site.trade} - ${site.variant})...`);
    
    try {
      // Generate the site using the CLI
      const command = `tsx "${cliPath}" generate --trade ${site.trade} --variant ${site.variant} --name "${site.name}" --output "${outputBase}"`;
      
      const { stdout, stderr } = await execAsync(command, {
        cwd: path.join(__dirname, '..', '..', '..')
      });
      
      if (stderr && !stderr.includes('ExperimentalWarning')) {
        throw new Error(stderr);
      }
      
      results.push({ site, success: true });
      console.log(`✅ ${site.name} generated successfully\n`);
      
    } catch (error) {
      results.push({ site, success: false, error: error.message });
      console.error(`❌ Failed to generate ${site.name}: ${error.message}\n`);
    }
  }
  
  const endTime = Date.now();
  const totalTime = (endTime - startTime) / 1000;
  
  // Summary
  console.log('\n📊 Generation Summary:');
  console.log('====================\n');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}/${DEMO_SITES.length}`);
  console.log(`❌ Failed: ${failed}/${DEMO_SITES.length}`);
  console.log(`⏱️  Total time: ${totalTime.toFixed(2)}s`);
  console.log(`⚡ Average time per site: ${(totalTime / DEMO_SITES.length).toFixed(2)}s`);
  
  if (failed > 0) {
    console.log('\n❌ Failed sites:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.site.name}: ${r.error}`);
    });
  }
  
  if (successful > 0) {
    console.log('\n✅ Successfully generated sites:');
    results.filter(r => r.success).forEach(r => {
      console.log(`  - ${r.site.name} (${r.site.trade} - ${r.site.variant})`);
    });
    
    console.log('\n🌐 Preview your sites:');
    console.log('   1. Start the preview server: pnpm preview');
    console.log('   2. Open http://localhost:3001 in your browser');
    console.log('   3. Click on any site to preview it');
    console.log('\n💡 Tip: The preview server supports hot reload!');
  }
}

// Alternative: Generate sites in parallel for faster execution
async function generateDemoSitesParallel() {
  console.log('🚀 AWEMA Demo Site Generator (Parallel Mode)\n');
  console.log(`Generating ${DEMO_SITES.length} demo sites in parallel...\n`);
  
  const startTime = Date.now();
  const cliPath = path.join(__dirname, '..', '..', '..', 'packages', 'core', 'src', 'cli.ts');
  const outputBase = path.join(__dirname, '..', '..', 'preview-server', 'output');
  
  // Ensure output directory exists
  await fs.mkdir(outputBase, { recursive: true });
  
  // Generate all sites in parallel
  const promises = DEMO_SITES.map(async (site, index) => {
    console.log(`[${index + 1}/${DEMO_SITES.length}] Starting generation of ${site.name}...`);
    
    try {
      const command = `tsx "${cliPath}" generate --trade ${site.trade} --variant ${site.variant} --name "${site.name}" --output "${outputBase}"`;
      
      const { stdout, stderr } = await execAsync(command, {
        cwd: path.join(__dirname, '..', '..', '..')
      });
      
      if (stderr && !stderr.includes('ExperimentalWarning')) {
        throw new Error(stderr);
      }
      
      console.log(`✅ ${site.name} completed`);
      return { site, success: true };
      
    } catch (error) {
      console.error(`❌ ${site.name} failed: ${error.message}`);
      return { site, success: false, error: error.message };
    }
  });
  
  const results = await Promise.all(promises);
  
  const endTime = Date.now();
  const totalTime = (endTime - startTime) / 1000;
  
  // Summary
  console.log('\n📊 Generation Summary:');
  console.log('====================\n');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}/${DEMO_SITES.length}`);
  console.log(`❌ Failed: ${failed}/${DEMO_SITES.length}`);
  console.log(`⏱️  Total time: ${totalTime.toFixed(2)}s (parallel execution)`);
  console.log(`⚡ ${DEMO_SITES.length} sites generated in ${totalTime.toFixed(2)}s!`);
  
  if (successful > 0) {
    console.log('\n🌐 Preview your sites:');
    console.log('   1. Start the preview server: pnpm preview');
    console.log('   2. Open http://localhost:3001 in your browser');
  }
}

// Check if parallel mode is requested
const isParallel = process.argv.includes('--parallel');

// Run the demo
if (isParallel) {
  generateDemoSitesParallel().catch(console.error);
} else {
  generateDemoSites().catch(console.error);
}
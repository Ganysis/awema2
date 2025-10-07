#!/usr/bin/env node

/**
 * Script pour générer les screenshots des pages portfolio
 * Utilise Puppeteer pour capturer les pages en 1200x750px
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sites = [
  {
    name: 'plomberie-sos-marseille',
    output: 'plomberie-marseille.jpg'
  },
  {
    name: 'electricite-provence-aix',
    output: 'electricite-aix.jpg'
  },
  {
    name: 'atelier-bois-mediterranee',
    output: 'menuiserie-marseille.jpg'
  },
  {
    name: 'bati-provence-maconnerie',
    output: 'maconnerie-aix.jpg'
  },
  {
    name: 'jardins-du-sud-paysagiste',
    output: 'paysagiste-marseille.jpg'
  },
  {
    name: 'carrelage-art-marseille',
    output: 'carrelage-marseille.jpg'
  }
];

async function generateScreenshots() {
  console.log('🚀 Lancement de Puppeteer...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const outputDir = path.join(__dirname, '../public/images/portfolio');

  // Créer le dossier si nécessaire
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('✅ Dossier créé:', outputDir, '\n');
  }

  for (const site of sites) {
    try {
      console.log(`📸 Capture de ${site.name}...`);

      const page = await browser.newPage();

      // Définir viewport 1200x750
      await page.setViewport({
        width: 1200,
        height: 750,
        deviceScaleFactor: 1
      });

      // Charger la page locale
      const filePath = `file://${path.join(__dirname, '../public/portfolio', site.name + '.html')}`;
      await page.goto(filePath, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Attendre un peu pour l'animation
      await new Promise(resolve => setTimeout(resolve, 500));

      // Screenshot
      const outputPath = path.join(outputDir, site.output);
      await page.screenshot({
        path: outputPath,
        type: 'jpeg',
        quality: 90,
        fullPage: false
      });

      console.log(`✅ Sauvegardé: ${site.output}\n`);

      await page.close();
    } catch (error) {
      console.error(`❌ Erreur pour ${site.name}:`, error.message, '\n');
    }
  }

  await browser.close();
  console.log('🎉 Tous les screenshots ont été générés!\n');
  console.log('📂 Emplacement:', outputDir);
}

generateScreenshots().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});

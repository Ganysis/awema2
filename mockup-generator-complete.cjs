#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * GÉNÉRATEUR DE MOCKUP COMPLET
 *
 * Génère automatiquement un site complet pour un métier
 * avec images professionnelles et contenu adapté
 */

// Importer les modules nécessaires
const { UniversalTemplateMapper, TEMPLATES, METIERS_CONFIG } = require('./universal-template-mapper.cjs');
const { ContentCleaner, CONTENU_METIERS } = require('./content-cleaner.cjs');

// ===================================================
// GÉNÉRATEUR DE MOCKUP
// ===================================================

class MockupGenerator {
  constructor(options) {
    this.options = {
      template: options.template || 'nextspace',
      metier: options.metier || 'plombier',
      nomEntreprise: options.nomEntreprise || 'Dupont',
      ville: options.ville || 'Paris',
      telephone: options.telephone || '01 23 45 67 89',
      email: options.email || null,
      outputPath: options.outputPath || null
    };

    // Vérifier les paramètres
    if (!TEMPLATES[this.options.template]) {
      throw new Error(`Template inconnu: ${this.options.template}`);
    }
    if (!METIERS_CONFIG[this.options.metier]) {
      throw new Error(`Métier inconnu: ${this.options.metier}`);
    }
  }

  /**
   * Génère le mockup complet
   */
  async generate() {
    console.log(`
╔══════════════════════════════════════════════════╗
║   🚀 GÉNÉRATION DE MOCKUP PROFESSIONNEL          ║
╚══════════════════════════════════════════════════╝
`);

    console.log(`📋 Configuration :
  • Template : ${this.options.template}
  • Métier : ${this.options.metier}
  • Entreprise : ${this.options.nomEntreprise}
  • Ville : ${this.options.ville}
  • Téléphone : ${this.options.telephone}
`);

    // 1. Transformer le template avec le mapper universel
    console.log('📦 Étape 1/3 : Transformation du template...');
    const mapper = new UniversalTemplateMapper(
      this.options.template,
      this.options.metier,
      this.options
    );
    await mapper.transform();

    // 2. Nettoyer le contenu avec le content cleaner
    console.log('\n📝 Étape 2/3 : Nettoyage du contenu...');
    const templatePath = TEMPLATES[this.options.template].path;
    const cleaner = new ContentCleaner(
      this.options.metier,
      templatePath,
      this.options
    );
    await cleaner.cleanAll();

    // 3. Générer les images professionnelles
    console.log('\n🖼️ Étape 3/3 : Génération des images...');
    await this.generateProfessionalImages();

    // 4. Si outputPath spécifié, copier le résultat
    if (this.options.outputPath) {
      await this.copyToOutput();
    }

    console.log(`
╔══════════════════════════════════════════════════╗
║   ✅ MOCKUP GÉNÉRÉ AVEC SUCCÈS !                ║
╚══════════════════════════════════════════════════╝

🌐 Accessible sur : http://localhost:4330
📁 Chemin : ${templatePath}

Contenu généré :
  ✓ Logo personnalisé avec couleur ${METIERS_CONFIG[this.options.metier].couleur}
  ✓ 6 services professionnels
  ✓ Contenu adapté au métier
  ✓ Témoignages et FAQ
  ✓ Images placeholders thématiques

Pour démarrer le serveur :
  cd ${templatePath}
  npm run dev
`);
  }

  /**
   * Génère des images professionnelles
   */
  async generateProfessionalImages() {
    const templatePath = TEMPLATES[this.options.template].path;
    const imagesPath = path.join(templatePath, 'public/images');
    const metierConfig = METIERS_CONFIG[this.options.metier];

    // Créer des images SVG de haute qualité
    const images = [
      'banner', 'service-1', 'service-2', 'service-3',
      'service-4', 'service-5', 'service-6',
      'gallery-1', 'gallery-2', 'gallery-3',
      'gallery-4', 'gallery-5', 'gallery-6',
      'project-1', 'project-2', 'project-3',
      'project-4', 'project-5', 'project-6', 'project-7'
    ];

    images.forEach((imageName, index) => {
      const isService = imageName.startsWith('service');
      const isGallery = imageName.startsWith('gallery');
      const isProject = imageName.startsWith('project');
      const isBanner = imageName === 'banner';

      let title = '';
      let subtitle = '';
      let width = 600;
      let height = 400;

      if (isBanner) {
        width = 1920;
        height = 600;
        title = `${metierConfig.nom} ${this.options.nomEntreprise}`;
        subtitle = `${metierConfig.slogan} • ${this.options.ville}`;
      } else if (isService) {
        const serviceIndex = parseInt(imageName.split('-')[1]) - 1;
        const service = metierConfig.services[serviceIndex];
        if (service) {
          title = service.title;
          subtitle = service.desc;
        }
      } else if (isGallery) {
        const galleryIndex = parseInt(imageName.split('-')[1]);
        title = `Réalisation ${galleryIndex}`;
        subtitle = `${this.options.ville}`;
      } else if (isProject) {
        const projectIndex = parseInt(imageName.split('-')[1]);
        title = `Projet ${projectIndex}`;
        subtitle = `Client satisfait • ${this.options.ville}`;
      }

      const svg = this.generateHighQualitySVG(
        width,
        height,
        title,
        subtitle,
        metierConfig.couleur,
        metierConfig.icone
      );

      const imagePath = path.join(imagesPath, `${imageName}.svg`);
      fs.writeFileSync(imagePath, svg);
    });

    console.log(`  ✓ ${images.length} images générées`);
  }

  /**
   * Génère un SVG de haute qualité
   */
  generateHighQualitySVG(width, height, title, subtitle, color, icon) {
    const secondaryColor = this.adjustColor(color, 0.8);
    const tertiaryColor = this.adjustColor(color, 0.6);

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradient principal -->
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.95" />
      <stop offset="50%" style="stop-color:${secondaryColor};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:${tertiaryColor};stop-opacity:0.85" />
    </linearGradient>

    <!-- Pattern décoratif -->
    <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle cx="50" cy="50" r="40" fill="white" opacity="0.03"/>
      <circle cx="0" cy="0" r="40" fill="white" opacity="0.03"/>
      <circle cx="100" cy="0" r="40" fill="white" opacity="0.03"/>
      <circle cx="0" cy="100" r="40" fill="white" opacity="0.03"/>
      <circle cx="100" cy="100" r="40" fill="white" opacity="0.03"/>
    </pattern>

    <!-- Ombre portée -->
    <filter id="shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="2" dy="2" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Fond avec gradient -->
  <rect width="${width}" height="${height}" fill="url(#bg-gradient)"/>

  <!-- Pattern overlay -->
  <rect width="${width}" height="${height}" fill="url(#pattern)"/>

  <!-- Cercle décoratif central -->
  <circle cx="${width/2}" cy="${height/2}" r="${Math.min(width, height) * 0.35}"
          fill="white" opacity="0.05"/>

  <!-- Icône -->
  <text x="${width/2}" y="${height/2 - 40}"
        font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.15}"
        fill="white" text-anchor="middle" opacity="0.3">
    ${icon}
  </text>

  <!-- Titre principal -->
  <text x="${width/2}" y="${height/2 + 10}"
        font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.08}"
        font-weight="bold" fill="white" text-anchor="middle" filter="url(#shadow)">
    ${title}
  </text>

  <!-- Sous-titre -->
  ${subtitle ? `<text x="${width/2}" y="${height/2 + 50}"
        font-family="Arial, sans-serif" font-size="${Math.min(width, height) * 0.04}"
        fill="white" text-anchor="middle" opacity="0.9">
    ${subtitle}
  </text>` : ''}

  <!-- Bordure élégante -->
  <rect x="10" y="10" width="${width-20}" height="${height-20}"
        stroke="white" stroke-width="1" fill="none" opacity="0.1" rx="5"/>
</svg>`;
  }

  /**
   * Ajuste la luminosité d'une couleur
   */
  adjustColor(color, factor) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const newR = Math.round(Math.min(255, r + (255 - r) * (1 - factor)));
    const newG = Math.round(Math.min(255, g + (255 - g) * (1 - factor)));
    const newB = Math.round(Math.min(255, b + (255 - b) * (1 - factor)));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }

  /**
   * Copie le résultat vers le dossier de sortie
   */
  async copyToOutput() {
    if (!this.options.outputPath) return;

    const source = TEMPLATES[this.options.template].path;
    const dest = this.options.outputPath;

    console.log(`\n📂 Copie vers ${dest}...`);

    // Créer le dossier de destination
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    // Copier les fichiers
    execSync(`cp -r ${source}/* ${dest}/`, { stdio: 'ignore' });

    console.log('  ✓ Fichiers copiés');
  }
}

// ===================================================
// CLI
// ===================================================

if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};

  args.forEach(arg => {
    const [key, value] = arg.split('=');
    options[key.replace('--', '')] = value;
  });

  if (!options.metier) {
    console.log(`
╔══════════════════════════════════════════════════╗
║   🎨 GÉNÉRATEUR DE MOCKUP PROFESSIONNEL         ║
╚══════════════════════════════════════════════════╝

Usage : node mockup-generator-complete.cjs --metier=plombier --nom=Martin --ville=Lyon

Options :
  --template   : nextspace, bexer, cleaner (défaut: nextspace)
  --metier     : plombier, electricien, menuisier, paysagiste (REQUIS)
  --nom        : Nom de l'entreprise (défaut: Dupont)
  --ville      : Ville (défaut: Paris)
  --telephone  : Téléphone (défaut: 01 23 45 67 89)
  --email      : Email (optionnel)
  --output     : Dossier de sortie (optionnel)

Exemples :
  node mockup-generator-complete.cjs --metier=plombier --nom=AquaPro --ville=Lyon
  node mockup-generator-complete.cjs --template=bexer --metier=electricien --nom=Volt+
  node mockup-generator-complete.cjs --metier=menuisier --output=/tmp/mockup

Ce générateur crée :
  ✅ Logo personnalisé avec couleur du métier
  ✅ Images professionnelles (SVG haute qualité)
  ✅ Contenu 100% adapté (zéro Lorem Ipsum)
  ✅ Services, témoignages, FAQ réels
  ✅ Configuration complète

Templates disponibles :
  • nextspace : Portfolio moderne (port 4330)
  • bexer : Business multilingue
  • cleaner : Services professionnels

Métiers disponibles :
  • plombier : Plomberie (bleu)
  • electricien : Électricité (orange)
  • menuisier : Menuiserie (marron)
  • paysagiste : Paysagiste (vert)
`);
    process.exit(0);
  }

  const generator = new MockupGenerator({
    template: options.template,
    metier: options.metier,
    nomEntreprise: options.nom,
    ville: options.ville,
    telephone: options.telephone,
    email: options.email,
    outputPath: options.output
  });

  generator.generate().catch(console.error);
}

module.exports = { MockupGenerator };
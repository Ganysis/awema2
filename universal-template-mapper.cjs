#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * SYSTÈME UNIVERSEL DE MAPPING POUR TEMPLATES THEMEFISHER
 *
 * Ce système permet de transformer n'importe quel template ThemeFisher
 * en un site personnalisé pour un métier du BTP
 */

// ===================================================
// CONFIGURATION DES TEMPLATES
// ===================================================

const TEMPLATES = {
  nextspace: {
    name: "NextSpace",
    path: "/home/Ganyc/Desktop/awema/awema2",
    structure: {
      config: "src/config/config.json",
      theme: "src/config/theme.json",
      menu: "src/config/menu.json",
      social: "src/config/social.json",
      content: {
        homepage: "src/content/homepage/-index.md",
        services: "src/content/services",
        projects: "src/content/projects",
        about: "src/content/about/-index.md",
        faqs: "src/content/faqs/-index.md",
        reviews: "src/content/reviews/-index.md",
        sections: "src/content/sections"
      }
    },
    images: {
      logo: "public/images/logo.svg",
      logoFooter: "public/images/logo-footer.svg",
      banner: "public/images/banner.png",
      services: "public/images/service-{n}.jpg",
      gallery: "public/images/gallery-{n}.jpg",
      projects: "public/images/project-{n}.jpg"
    }
  },

  bexer: {
    name: "Bexer",
    path: "/home/Ganyc/Desktop/awema/bexer-theme/bexer-astro/themes/bexer-astro",
    structure: {
      config: "src/config/config.json",
      theme: "src/config/theme.json",
      menu: "src/config/menu.en.json",
      menuFr: "src/config/menu.fr.json",
      language: "src/config/language.json",
      social: "src/config/social.json",
      content: {
        homepage: {
          en: "src/content/homepage/english/-index.md",
          fr: "src/content/homepage/french/-index.md"
        },
        services: {
          en: "src/content/services/english",
          fr: "src/content/services/french"
        },
        projects: {
          en: "src/content/projects/english",
          fr: "src/content/projects/french"
        },
        about: {
          en: "src/content/about/english/-index.md",
          fr: "src/content/about/french/-index.md"
        }
      }
    },
    images: {
      logo: "public/images/logo.png",
      banner: "public/images/banner.jpg",
      services: "public/images/service-{n}.jpg",
      gallery: "public/images/gallery/gallery-{n}.jpg",
      projects: "public/images/project-{n}.jpg"
    }
  },

  cleaner: {
    name: "Cleaner",
    path: "/home/Ganyc/Desktop/awema/cleaner-astro/themes/cleaner-astro",
    structure: {
      config: "src/config/config.json",
      theme: "src/config/theme.json",
      menu: "src/config/menu.json",
      social: "src/config/social.json",
      content: {
        homepage: "src/content/homepage/-index.md",
        services: "src/content/services",
        about: "src/content/about/-index.md",
        gallery: "src/content/gallery",
        sections: "src/content/sections",
        appointment: "src/content/appointment"
      }
    },
    images: {
      logo: "public/images/logo.svg",
      logoDark: "public/images/logo-dark.svg",
      banner: "public/images/banner.jpg",
      services: "public/images/service-{n}.jpg",
      gallery: "public/images/gallery-{n}.jpg"
    }
  }
};

// ===================================================
// CONFIGURATION DES MÉTIERS
// ===================================================

const METIERS_CONFIG = {
  plombier: {
    nom: "Plomberie",
    couleur: "#1e40af",
    couleurSecondaire: "#3b82f6",
    icone: "🔧",
    services: [
      { title: "Dépannage Urgent", desc: "Intervention 24/7 pour fuites et urgences", icon: "FaWrench" },
      { title: "Rénovation Salle de Bain", desc: "Transformation complète de votre salle d'eau", icon: "FaBath" },
      { title: "Débouchage Canalisations", desc: "Débouchage professionnel haute pression", icon: "FaWater" },
      { title: "Installation Sanitaires", desc: "Pose de WC, lavabos, douches", icon: "FaToilet" },
      { title: "Détection de Fuites", desc: "Localisation précise par caméra thermique", icon: "FaSearch" },
      { title: "Chauffe-eau", desc: "Installation et dépannage chaudières", icon: "FaFire" }
    ],
    keywords: ["plombier", "fuite", "débouchage", "sanitaire", "robinet", "chauffe-eau"],
    slogan: "Votre expert en plomberie"
  },

  electricien: {
    nom: "Électricité",
    couleur: "#f59e0b",
    couleurSecondaire: "#fbbf24",
    icone: "⚡",
    services: [
      { title: "Dépannage Électrique", desc: "Intervention urgente pannes électriques", icon: "FaBolt" },
      { title: "Installation Tableau", desc: "Mise aux normes tableau électrique", icon: "FaPlug" },
      { title: "Rénovation Électrique", desc: "Refonte complète installation électrique", icon: "FaLightbulb" },
      { title: "Domotique", desc: "Installation maison connectée", icon: "FaWifi" },
      { title: "Éclairage LED", desc: "Installation éclairage économique", icon: "FaSun" },
      { title: "Borne de Recharge", desc: "Installation borne véhicule électrique", icon: "FaCar" }
    ],
    keywords: ["électricien", "tableau électrique", "panne", "installation", "domotique", "LED"],
    slogan: "L'électricité en toute sécurité"
  },

  menuisier: {
    nom: "Menuiserie",
    couleur: "#92400e",
    couleurSecondaire: "#b45309",
    icone: "🪵",
    services: [
      { title: "Menuiserie sur Mesure", desc: "Création de meubles personnalisés", icon: "FaHammer" },
      { title: "Pose de Parquet", desc: "Installation tous types de parquets", icon: "FaHome" },
      { title: "Aménagement Intérieur", desc: "Dressing, placards, bibliothèques", icon: "FaDoorOpen" },
      { title: "Restauration Mobilier", desc: "Rénovation meubles anciens", icon: "FaCouch" },
      { title: "Escaliers en Bois", desc: "Fabrication et pose d'escaliers", icon: "FaStairs" },
      { title: "Terrasse Bois", desc: "Construction terrasses extérieures", icon: "FaTree" }
    ],
    keywords: ["menuisier", "bois", "parquet", "meuble", "escalier", "terrasse"],
    slogan: "L'art du bois sur mesure"
  },

  paysagiste: {
    nom: "Paysagiste",
    couleur: "#059669",
    couleurSecondaire: "#10b981",
    icone: "🌿",
    services: [
      { title: "Création de Jardins", desc: "Conception et aménagement espaces verts", icon: "FaLeaf" },
      { title: "Entretien Espaces Verts", desc: "Tonte, taille, entretien régulier", icon: "FaSeedling" },
      { title: "Élagage", desc: "Taille et abattage d'arbres", icon: "FaTree" },
      { title: "Arrosage Automatique", desc: "Installation systèmes d'irrigation", icon: "FaTint" },
      { title: "Terrasse et Allées", desc: "Création chemins et terrasses", icon: "FaRoute" },
      { title: "Clôtures et Portails", desc: "Installation clôtures végétales ou bois", icon: "FaBorderAll" }
    ],
    keywords: ["paysagiste", "jardin", "espaces verts", "élagage", "pelouse", "arrosage"],
    slogan: "Créateur d'espaces verts"
  }
};

// ===================================================
// CLASSE PRINCIPALE
// ===================================================

class UniversalTemplateMapper {
  constructor(template, metier, options) {
    this.template = TEMPLATES[template];
    this.metier = METIERS_CONFIG[metier];
    this.options = {
      nomEntreprise: options.nomEntreprise || 'Dupont',
      ville: options.ville || 'Paris',
      telephone: options.telephone || '01 23 45 67 89',
      email: options.email || null,
      ...options
    };

    if (!this.template) {
      throw new Error(`Template inconnu: ${template}. Templates disponibles: ${Object.keys(TEMPLATES).join(', ')}`);
    }

    if (!this.metier) {
      throw new Error(`Métier inconnu: ${metier}. Métiers disponibles: ${Object.keys(METIERS_CONFIG).join(', ')}`);
    }
  }

  // ===================================================
  // MÉTHODE PRINCIPALE DE TRANSFORMATION
  // ===================================================

  async transform() {
    console.log(`\n🔧 Transformation du template ${this.template.name} pour ${this.metier.nom} ${this.options.nomEntreprise}`);

    // 1. Mise à jour de la configuration
    await this.updateConfig();

    // 2. Mise à jour des images
    await this.updateImages();

    // 3. Mise à jour du contenu
    await this.updateContent();

    // 4. Mise à jour des menus
    await this.updateMenus();

    console.log(`\n✅ Template transformé avec succès !`);
    console.log(`📁 Chemin: ${this.template.path}`);
  }

  // ===================================================
  // MISE À JOUR DE LA CONFIGURATION
  // ===================================================

  async updateConfig() {
    console.log('📋 Mise à jour de la configuration...');

    const configPath = path.join(this.template.path, this.template.structure.config);
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Mise à jour commune à tous les templates
    config.site.title = `${this.metier.nom} ${this.options.nomEntreprise} - ${this.options.ville}`;
    config.site.logo_text = `${this.metier.nom} ${this.options.nomEntreprise}`;

    // Params spécifiques selon le template
    if (config.params) {
      config.params.address = this.options.ville;
      config.params.phone = this.options.telephone.replace(/\s/g, '');
      config.params.email = this.options.email || `contact@${this.options.nomEntreprise.toLowerCase()}.fr`;
    }

    // Navigation button
    if (config.navigation_button) {
      config.navigation_button.label = "Devis Gratuit";
    }

    // Metadata
    if (config.metadata) {
      config.metadata.meta_author = `${this.metier.nom} ${this.options.nomEntreprise}`;
      config.metadata.meta_description = `${this.metier.nom} ${this.options.nomEntreprise} à ${this.options.ville}. ${this.metier.slogan}`;
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    // Mise à jour du theme.json si présent
    const themePath = path.join(this.template.path, this.template.structure.theme);
    if (fs.existsSync(themePath)) {
      const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

      // Mise à jour des couleurs
      if (theme.colors) {
        if (theme.colors.theme_color) {
          theme.colors.theme_color.primary = this.metier.couleur;
          theme.colors.theme_color.secondary = this.metier.couleurSecondaire || this.metier.couleur;
        }
      }

      fs.writeFileSync(themePath, JSON.stringify(theme, null, 2));
    }
  }

  // ===================================================
  // MISE À JOUR DES IMAGES
  // ===================================================

  async updateImages() {
    console.log('🖼️ Génération des images...');

    // Générer le logo SVG
    this.generateLogo();

    // Générer les placeholders pour les services
    this.generateServiceImages();

    // Générer les images de galerie
    this.generateGalleryImages();

    // Générer la bannière
    this.generateBanner();
  }

  generateLogo() {
    const logoSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
  <!-- Icône -->
  <rect x="5" y="10" width="20" height="20" fill="${this.metier.couleur}" rx="2"/>
  <text x="15" y="23" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">
    ${this.metier.icone}
  </text>

  <!-- Texte -->
  <text x="35" y="18" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${this.metier.couleur}">
    ${this.metier.nom}
  </text>
  <text x="35" y="32" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${this.metier.couleur}">
    ${this.options.nomEntreprise.toUpperCase()}
  </text>
</svg>`;

    // Sauvegarder le logo selon le template
    const logoPath = path.join(this.template.path, this.template.images.logo);
    fs.writeFileSync(logoPath, logoSVG);

    // Logo footer si applicable
    if (this.template.images.logoFooter) {
      const logoFooterPath = path.join(this.template.path, this.template.images.logoFooter);
      fs.writeFileSync(logoFooterPath, logoSVG);
    }

    // Logo dark pour Cleaner
    if (this.template.images.logoDark) {
      const logoDarkPath = path.join(this.template.path, this.template.images.logoDark);
      fs.writeFileSync(logoDarkPath, logoSVG);
    }
  }

  generateServiceImages() {
    for (let i = 1; i <= 6; i++) {
      const service = this.metier.services[i - 1];
      if (!service) continue;

      const serviceSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="${this.metier.couleur}" opacity="0.1"/>
  <rect x="10" y="10" width="580" height="380" stroke="${this.metier.couleur}" stroke-width="2" fill="none"/>
  <text x="300" y="180" font-family="Arial, sans-serif" font-size="24" font-weight="bold"
        fill="${this.metier.couleur}" text-anchor="middle">
    ${service.title}
  </text>
  <text x="300" y="210" font-family="Arial, sans-serif" font-size="14"
        fill="${this.metier.couleur}" text-anchor="middle" opacity="0.8">
    ${service.desc}
  </text>
</svg>`;

      const imagePath = this.template.images.services.replace('{n}', i);
      const fullPath = path.join(this.template.path, imagePath);

      // Créer le dossier si nécessaire
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Changer l'extension en .svg
      const svgPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.svg');
      fs.writeFileSync(svgPath, serviceSVG);
    }
  }

  generateGalleryImages() {
    for (let i = 1; i <= 6; i++) {
      const gallerySVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="${this.metier.couleur}" opacity="0.05"/>
  <rect x="10" y="10" width="580" height="380" stroke="${this.metier.couleur}" stroke-width="1" fill="none" opacity="0.3"/>
  <text x="300" y="200" font-family="Arial, sans-serif" font-size="18"
        fill="${this.metier.couleur}" text-anchor="middle">
    Réalisation ${i}
  </text>
</svg>`;

      const imagePath = this.template.images.gallery.replace('{n}', i);
      const fullPath = path.join(this.template.path, imagePath);

      // Créer le dossier si nécessaire
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Changer l'extension en .svg
      const svgPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.svg');
      fs.writeFileSync(svgPath, gallerySVG);
    }
  }

  generateBanner() {
    const bannerSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="600" viewBox="0 0 1920 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${this.metier.couleur};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${this.metier.couleurSecondaire || this.metier.couleur};stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <rect width="1920" height="600" fill="url(#gradient)"/>
  <text x="960" y="280" font-family="Arial, sans-serif" font-size="48" font-weight="bold"
        fill="white" text-anchor="middle">
    ${this.metier.nom} ${this.options.nomEntreprise}
  </text>
  <text x="960" y="330" font-family="Arial, sans-serif" font-size="24"
        fill="white" text-anchor="middle" opacity="0.9">
    ${this.metier.slogan}
  </text>
  <text x="960" y="380" font-family="Arial, sans-serif" font-size="18"
        fill="white" text-anchor="middle" opacity="0.8">
    ${this.options.ville} - ${this.options.telephone}
  </text>
</svg>`;

    const bannerPath = path.join(this.template.path, this.template.images.banner);
    const svgPath = bannerPath.replace(/\.(jpg|jpeg|png)$/i, '.svg');
    fs.writeFileSync(svgPath, bannerSVG);
  }

  // ===================================================
  // MISE À JOUR DU CONTENU
  // ===================================================

  async updateContent() {
    console.log('📝 Mise à jour du contenu...');

    // Mise à jour selon la structure du template
    if (this.template.name === 'Bexer') {
      // Bexer a une structure multilingue
      await this.updateBexerContent();
    } else {
      // NextSpace et Cleaner ont une structure similaire
      await this.updateStandardContent();
    }
  }

  async updateStandardContent() {
    // Mise à jour des services
    const servicesPath = path.join(this.template.path, this.template.structure.content.services);
    if (fs.existsSync(servicesPath)) {
      this.metier.services.forEach((service, index) => {
        const serviceFile = path.join(servicesPath, `service-${index + 1}.md`);
        const serviceContent = `---
title: "${service.title}"
description: "${service.desc}"
image: "/images/service-${index + 1}.svg"
date: 2025-01-24T05:00:00Z
draft: false
---

${service.desc}

Notre équipe de professionnels qualifiés intervient rapidement pour tous vos besoins en ${this.metier.nom.toLowerCase()}.

## Pourquoi nous choisir ?

- ✅ Intervention rapide
- ✅ Devis gratuit
- ✅ Garantie sur nos travaux
- ✅ Équipe certifiée
`;
        fs.writeFileSync(serviceFile, serviceContent);
      });
    }

    // Mise à jour de la homepage
    const homepagePath = path.join(this.template.path, this.template.structure.content.homepage);
    if (fs.existsSync(homepagePath)) {
      let homepageContent = fs.readFileSync(homepagePath, 'utf8');

      // Remplacer les textes génériques
      homepageContent = homepageContent
        .replace(/Interior Design/gi, this.metier.nom)
        .replace(/Design/gi, this.metier.nom)
        .replace(/Lorem ipsum/gi, this.metier.slogan);

      fs.writeFileSync(homepagePath, homepageContent);
    }
  }

  async updateBexerContent() {
    // Mise à jour pour les versions anglaise et française
    ['en', 'fr'].forEach(lang => {
      const servicesPath = path.join(this.template.path, this.template.structure.content.services[lang]);
      if (fs.existsSync(servicesPath)) {
        this.metier.services.forEach((service, index) => {
          const serviceFile = path.join(servicesPath, `service-${index + 1}.md`);
          const serviceContent = `---
title: "${service.title}"
description: "${service.desc}"
image: "/images/service-${index + 1}.svg"
date: 2025-01-24T05:00:00Z
draft: false
---

${service.desc}

${lang === 'fr' ? 'Notre équipe' : 'Our team'} ${this.metier.nom} ${this.options.nomEntreprise}.
`;
          fs.writeFileSync(serviceFile, serviceContent);
        });
      }
    });
  }

  // ===================================================
  // MISE À JOUR DES MENUS
  // ===================================================

  async updateMenus() {
    console.log('📋 Mise à jour des menus...');

    const menuPath = path.join(this.template.path, this.template.structure.menu);
    if (fs.existsSync(menuPath)) {
      const menu = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

      // Adapter les menus selon le métier
      if (menu.main) {
        menu.main.forEach(item => {
          if (item.name === 'Home' || item.name === 'Accueil') {
            item.name = 'Accueil';
          }
          if (item.name === 'Services') {
            item.name = 'Nos Services';
          }
          if (item.name === 'Projects' || item.name === 'Portfolio') {
            item.name = 'Réalisations';
          }
        });
      }

      fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2));
    }
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

  if (!options.template || !options.metier) {
    console.log(`
🎨 TRANSFORMATEUR UNIVERSEL DE TEMPLATES
========================================

Usage: node universal-template-mapper.cjs --template=nextspace --metier=plombier --nom=Martin --ville=Lyon

Options:
  --template   : ${Object.keys(TEMPLATES).join(', ')} (REQUIS)
  --metier     : ${Object.keys(METIERS_CONFIG).join(', ')} (REQUIS)
  --nom        : Nom de l'entreprise (défaut: Dupont)
  --ville      : Ville (défaut: Paris)
  --telephone  : Téléphone (défaut: 01 23 45 67 89)
  --email      : Email (optionnel)

Exemples:
  node universal-template-mapper.cjs --template=nextspace --metier=electricien --nom=Volt+ --ville=Lyon
  node universal-template-mapper.cjs --template=bexer --metier=menuisier --nom=BoisArt --ville=Bordeaux
  node universal-template-mapper.cjs --template=cleaner --metier=paysagiste --nom=GreenPro --ville=Toulouse
`);
    process.exit(0);
  }

  const mapper = new UniversalTemplateMapper(
    options.template,
    options.metier,
    {
      nomEntreprise: options.nom,
      ville: options.ville,
      telephone: options.telephone,
      email: options.email
    }
  );

  mapper.transform().catch(console.error);
}

module.exports = { UniversalTemplateMapper, TEMPLATES, METIERS_CONFIG };
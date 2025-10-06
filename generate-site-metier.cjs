#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ========================================
// CONFIGURATION DES MÉTIERS
// ========================================
const METIERS_CONFIG = {
  plombier: {
    nom: "Plomberie",
    couleur: "#1e40af", // Bleu
    services: [
      { title: "Dépannage Urgent", desc: "Intervention 24/7 pour fuites et urgences" },
      { title: "Rénovation Salle de Bain", desc: "Transformation complète de votre salle d'eau" },
      { title: "Débouchage Canalisations", desc: "Débouchage professionnel haute pression" },
      { title: "Installation Sanitaires", desc: "Pose de WC, lavabos, douches" },
      { title: "Détection de Fuites", desc: "Localisation précise par caméra thermique" },
      { title: "Chauffe-eau", desc: "Installation et dépannage chaudières" }
    ],
    images: {
      banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
      services: [
        "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39",
        "https://images.unsplash.com/photo-1585128903994-9788298932a8"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14",
        "https://images.unsplash.com/photo-1620626011761-996317b8d101",
        "https://images.unsplash.com/photo-1564540583246-934409427776",
        "https://images.unsplash.com/photo-1584622781867-7e4bdd828b66",
        "https://images.unsplash.com/photo-1600566752229-250ed79470f8"
      ]
    },
    keywords: ["plombier", "fuite", "débouchage", "sanitaire", "robinet", "chauffe-eau"]
  },

  electricien: {
    nom: "Électricité",
    couleur: "#f59e0b", // Orange
    services: [
      { title: "Dépannage Électrique", desc: "Intervention urgente pannes électriques" },
      { title: "Installation Tableau", desc: "Mise aux normes tableau électrique" },
      { title: "Rénovation Électrique", desc: "Refonte complète installation électrique" },
      { title: "Domotique", desc: "Installation maison connectée" },
      { title: "Éclairage LED", desc: "Installation éclairage économique" },
      { title: "Borne de Recharge", desc: "Installation borne véhicule électrique" }
    ],
    images: {
      banner: "https://images.unsplash.com/photo-1621905251189-48416bd8575a",
      services: [
        "https://images.unsplash.com/photo-1565608087341-404b25492fee",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        "https://images.unsplash.com/photo-1555664424-778a1e5e1b48",
        "https://images.unsplash.com/photo-1493770348161-369560ae357d"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1565608087341-404b25492fee",
        "https://images.unsplash.com/photo-1558002038-bb4237f50b11",
        "https://images.unsplash.com/photo-1530587191325-3db32d826c18",
        "https://images.unsplash.com/photo-1416163347969-b7897631e431",
        "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3",
        "https://images.unsplash.com/photo-1497366216548-37526070297c"
      ]
    },
    keywords: ["électricien", "tableau électrique", "panne", "installation", "domotique", "LED"]
  },

  menuisier: {
    nom: "Menuiserie",
    couleur: "#92400e", // Marron
    services: [
      { title: "Menuiserie sur Mesure", desc: "Création de meubles personnalisés" },
      { title: "Pose de Parquet", desc: "Installation tous types de parquets" },
      { title: "Aménagement Intérieur", desc: "Dressing, placards, bibliothèques" },
      { title: "Restauration Mobilier", desc: "Rénovation meubles anciens" },
      { title: "Escaliers en Bois", desc: "Fabrication et pose d'escaliers" },
      { title: "Terrasse Bois", desc: "Construction terrasses extérieures" }
    ],
    images: {
      banner: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
      services: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600585152915-d208bec867a1",
        "https://images.unsplash.com/photo-1600210492493-0946911123ea"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
        "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
        "https://images.unsplash.com/photo-1506898667547-42e22a46e125"
      ]
    },
    keywords: ["menuisier", "bois", "parquet", "meuble", "escalier", "terrasse"]
  },

  paysagiste: {
    nom: "Paysagiste",
    couleur: "#059669", // Vert
    services: [
      { title: "Création de Jardins", desc: "Conception et aménagement espaces verts" },
      { title: "Entretien Espaces Verts", desc: "Tonte, taille, entretien régulier" },
      { title: "Élagage", desc: "Taille et abattage d'arbres" },
      { title: "Arrosage Automatique", desc: "Installation systèmes d'irrigation" },
      { title: "Terrasse et Allées", desc: "Création chemins et terrasses" },
      { title: "Clôtures et Portails", desc: "Installation clôtures végétales ou bois" }
    ],
    images: {
      banner: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
      services: [
        "https://images.unsplash.com/photo-1558904541-efa843a96f01",
        "https://images.unsplash.com/photo-1598902108854-10e335adac99",
        "https://images.unsplash.com/photo-1572085313466-6710de8d7ba3",
        "https://images.unsplash.com/photo-1459156212016-c812468e2115"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
        "https://images.unsplash.com/photo-1558904541-efa843a96f01",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
        "https://images.unsplash.com/photo-1427477321886-abc24e8ce923",
        "https://images.unsplash.com/photo-1464207687429-7505649dae38",
        "https://images.unsplash.com/photo-1593005510509-d05b264f1c9c"
      ]
    },
    keywords: ["paysagiste", "jardin", "espaces verts", "élagage", "pelouse", "arrosage"]
  },

  peintre: {
    nom: "Peinture",
    couleur: "#dc2626", // Rouge
    services: [
      { title: "Peinture Intérieure", desc: "Murs, plafonds, boiseries" },
      { title: "Peinture Extérieure", desc: "Façades, volets, portails" },
      { title: "Décoration Murale", desc: "Enduits décoratifs, papier peint" },
      { title: "Ravalement de Façade", desc: "Rénovation complète façades" },
      { title: "Traitement Humidité", desc: "Anti-moisissures et étanchéité" },
      { title: "Sols Résine", desc: "Application résine époxy" }
    ],
    images: {
      banner: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
      services: [
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
        "https://images.unsplash.com/photo-1563720360172-67b8f3dce741",
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
        "https://images.unsplash.com/photo-1563720360172-67b8f3dce741",
        "https://images.unsplash.com/photo-1525909002-1b05e0c869d8",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
      ]
    },
    keywords: ["peintre", "peinture", "décoration", "ravalement", "façade", "enduit"]
  },

  carreleur: {
    nom: "Carrelage",
    couleur: "#7c3aed", // Violet
    services: [
      { title: "Pose Carrelage", desc: "Sol et mur, intérieur et extérieur" },
      { title: "Faïence Salle de Bain", desc: "Pose faïence et mosaïque" },
      { title: "Terrasse Carrelée", desc: "Carrelage terrasses extérieures" },
      { title: "Rénovation Joints", desc: "Remplacement joints usés" },
      { title: "Chape et Ragréage", desc: "Préparation sols avant pose" },
      { title: "Carrelage Grand Format", desc: "Pose dalles XXL" }
    ],
    images: {
      banner: "https://images.unsplash.com/photo-1564540574859-0dfb63985953",
      services: [
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1564540574859-0dfb63985953",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
      ]
    },
    keywords: ["carreleur", "carrelage", "faïence", "mosaïque", "joints", "chape"]
  },

  maçon: {
    nom: "Maçonnerie",
    couleur: "#6b7280", // Gris
    services: [
      { title: "Construction Murs", desc: "Murs porteurs et cloisons" },
      { title: "Extension Maison", desc: "Agrandissement habitation" },
      { title: "Terrasse Béton", desc: "Dalle béton pour terrasse" },
      { title: "Rénovation Façade", desc: "Ravalement et réparation" },
      { title: "Ouverture Mur", desc: "Création portes et fenêtres" },
      { title: "Fondations", desc: "Création et reprise fondations" }
    ],
    images: {
      banner: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
      services: [
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
        "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15",
        "https://images.unsplash.com/photo-1587582423116-ec07293f0395"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
        "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15",
        "https://images.unsplash.com/photo-1587582423116-ec07293f0395",
        "https://images.unsplash.com/photo-1574359411659-15573a27fd0c"
      ]
    },
    keywords: ["maçon", "construction", "béton", "mur", "fondation", "dalle"]
  }
};

// ========================================
// FONCTION PRINCIPALE
// ========================================
async function generateSiteForMetier(options) {
  const {
    metier = 'plombier',
    nomEntreprise = 'Dupont',
    ville = 'Paris',
    telephone = '01 23 45 67 89',
    email = null
  } = options;

  const config = METIERS_CONFIG[metier];
  if (!config) {
    console.error(`❌ Métier non reconnu: ${metier}`);
    console.log('Métiers disponibles:', Object.keys(METIERS_CONFIG).join(', '));
    return;
  }

  console.log(`\n🔧 Génération du site pour: ${config.nom} ${nomEntreprise} à ${ville}`);

  // 1. Mettre à jour la configuration
  updateConfig(config, nomEntreprise, ville, telephone, email);

  // 2. Télécharger et installer les images
  await downloadImages(config, metier);

  // 3. Mettre à jour le contenu
  updateContent(config, nomEntreprise, ville);

  // 4. Générer le logo
  generateLogo(config, nomEntreprise);

  console.log(`\n✅ Site généré avec succès pour ${config.nom} ${nomEntreprise}!`);
  console.log(`🌐 Accessible sur: http://localhost:4330`);
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

function updateConfig(config, nomEntreprise, ville, telephone, email) {
  const configPath = path.join(__dirname, 'src/config/config.json');
  const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  configData.site.title = `${config.nom} ${nomEntreprise} - ${ville}`;
  configData.site.logo_text = `${config.nom} ${nomEntreprise}`;
  configData.params.address = `${ville}`;
  configData.params.phone = telephone.replace(/\s/g, '');
  configData.params.email = email || `contact@${nomEntreprise.toLowerCase()}.fr`;
  configData.metadata.meta_author = `${config.nom} ${nomEntreprise}`;
  configData.metadata.meta_description = `${config.nom} ${nomEntreprise} à ${ville}. ${config.services[0].title}, ${config.services[1].title}. Intervention rapide.`;

  fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
  console.log('✅ Configuration mise à jour');
}

async function downloadImages(config, metier) {
  const imagesDir = path.join(__dirname, 'public/images');

  console.log('📥 Configuration des images pour le métier...');

  // Pour l'instant, on va utiliser les images existantes et créer des placeholders colorés
  // Dans une vraie production, on aurait une banque d'images par métier

  // Créer un placeholder SVG avec la couleur du métier
  const placeholderSVG = (text, width = 600, height = 400) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${config.couleur}" opacity="0.1"/>
  <rect x="10" y="10" width="${width-20}" height="${height-20}" stroke="${config.couleur}" stroke-width="2" fill="none"/>
  <text x="${width/2}" y="${height/2}" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${config.couleur}" text-anchor="middle" dominant-baseline="middle">
    ${text}
  </text>
</svg>`;

  // Créer les placeholders pour chaque catégorie d'images
  // Banner
  fs.writeFileSync(`${imagesDir}/banner.svg`, placeholderSVG(`${config.nom} - ${metier}`, 1920, 600));

  // Services
  for (let i = 1; i <= 6; i++) {
    const serviceName = config.services[i-1] ? config.services[i-1].title : `Service ${i}`;
    fs.writeFileSync(`${imagesDir}/service-${i}.svg`, placeholderSVG(serviceName));
  }

  // Gallery
  for (let i = 1; i <= 6; i++) {
    fs.writeFileSync(`${imagesDir}/gallery-${i}.svg`, placeholderSVG(`Réalisation ${i}`));
  }

  // Projects
  for (let i = 1; i <= 7; i++) {
    fs.writeFileSync(`${imagesDir}/project-${i}.svg`, placeholderSVG(`Projet ${i}`, 800, 533));
  }

  console.log('✅ Images configurées avec succès');
}

function updateContent(config, nomEntreprise, ville) {
  // Mettre à jour les services
  config.services.forEach((service, index) => {
    const servicePath = path.join(__dirname, `src/content/services/service-${index + 1}.md`);

    // Générer les features par défaut si non fournies
    const features = service.features || [
      { name: "Expertise reconnue", description: `Professionnels certifiés en ${config.nom.toLowerCase()}.` },
      { name: "Garantie complète", description: "Tous nos travaux sont garantis et assurés." },
      { name: "Prix transparents", description: "Devis détaillé gratuit sans surprise." }
    ];

    const serviceContent = `---
title: "${service.title}"
meta_title: ""
description: "${service.desc}"
date: 2025-05-06T05:00:00Z
image: "/images/service-${index + 1}.svg"
featured_in_homepage: ${index < 3}
features:
${features.map(f => `  - name: "${f.name}"
    description: "${f.description}"`).join('\n')}
draft: false
---

${service.desc}

## Nos garanties

${features.map(f => `- ✅ **${f.name}**: ${f.description}`).join('\n')}

## Pourquoi nous choisir ?

Notre équipe de professionnels qualifiés intervient rapidement pour tous vos besoins en ${config.nom.toLowerCase()}. Nous vous garantissons :
- Un devis gratuit et transparent
- Une intervention rapide
- Des tarifs compétitifs
- Un service client disponible 7j/7

**Contactez-nous dès maintenant !**
`;
    fs.writeFileSync(servicePath, serviceContent);
  });

  // Mettre à jour homepage
  const homepagePath = path.join(__dirname, 'src/content/homepage/-index.md');
  const homepageData = fs.readFileSync(homepagePath, 'utf8');
  const updatedHomepage = homepageData
    .replace(/Plomberie Dupont/g, `${config.nom} ${nomEntreprise}`)
    .replace(/plombier/g, config.nom.toLowerCase())
    .replace(/Paris/g, ville);
  fs.writeFileSync(homepagePath, updatedHomepage);

  console.log('✅ Contenu mis à jour');
}

function generateLogo(config, nomEntreprise) {
  const logoPath = path.join(__dirname, 'public/images/logo.svg');
  const logoContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="10" width="20" height="20" fill="${config.couleur}" rx="2"/>
  <text x="35" y="18" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${config.couleur}">
    ${config.nom}
  </text>
  <text x="35" y="32" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${config.couleur}">
    ${nomEntreprise.toUpperCase()}
  </text>
</svg>`;

  fs.writeFileSync(logoPath, logoContent);
  fs.copyFileSync(logoPath, path.join(__dirname, 'public/images/logo-footer.svg'));
  console.log('✅ Logo généré');
}

// Importer le module d'intégration des SVG
const { integrateSVGForMetier } = require('./integrate-svg-by-metier.cjs');

// ========================================
// CLI
// ========================================
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};

  args.forEach(arg => {
    const [key, value] = arg.split('=');
    options[key.replace('--', '')] = value;
  });

  if (!options.metier) {
    console.log(`
🏗️  GÉNÉRATEUR DE SITE BTP
========================

Usage: node generate-site-metier.js --metier=plombier --nom=Martin --ville=Lyon

Options:
  --metier     : ${Object.keys(METIERS_CONFIG).join(', ')}
  --nom        : Nom de l'entreprise (défaut: Dupont)
  --ville      : Ville (défaut: Paris)
  --telephone  : Téléphone (défaut: 01 23 45 67 89)
  --email      : Email (optionnel)

Exemples:
  node generate-site-metier.js --metier=electricien --nom=Durand --ville=Marseille
  node generate-site-metier.js --metier=menuisier --nom=Lebois --ville=Bordeaux --telephone="05 56 78 90 12"
  node generate-site-metier.js --metier=paysagiste --nom=Jardin+ --ville=Toulouse
    `);
    process.exit(0);
  }

  // Intégrer les SVG du métier AVANT de générer le site
  console.log('\n🎨 Étape 1 : Intégration des images SVG...');
  integrateSVGForMetier(options.metier);

  console.log('\n📝 Étape 2 : Génération du contenu du site...');
  generateSiteForMetier({
    metier: options.metier,
    nomEntreprise: options.nom || 'Dupont',
    ville: options.ville || 'Paris',
    telephone: options.telephone || '01 23 45 67 89',
    email: options.email
  });
}

module.exports = { generateSiteForMetier, METIERS_CONFIG };
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ========================================
// CONFIGURATION COMPLETE PAR MÉTIER
// ========================================
const METIERS_CONFIG = {
  plombier: {
    nom: 'Plomberie',
    couleur: '#0066CC',
    couleurSecondaire: '#0052A3',
    couleurTexte: '#FFFFFF', // Pour bon contraste
    hero: {
      title: "Expert en Plomberie et Chauffage",
      subtitle: "Dépannage 24/7 - Installation - Rénovation"
    },
    services: [
      { titre: "Dépannage Urgent", description: "Intervention rapide 24/7 pour fuites et urgences" },
      { titre: "Chauffe-eau", description: "Installation et réparation de chauffe-eau" },
      { titre: "Salle de Bains", description: "Rénovation complète de salle de bains" },
      { titre: "Canalisation", description: "Débouchage et réparation de canalisations" },
      { titre: "Robinetterie", description: "Installation et réparation de robinets" },
      { titre: "Chaudière", description: "Installation et entretien de chaudières" }
    ],
    projets: [
      { titre: "Rénovation Salle de Bain Complète", categorie: "Rénovation" },
      { titre: "Installation Chaudière Gaz", categorie: "Installation" },
      { titre: "Création Salle d'Eau", categorie: "Création" },
      { titre: "Réparation Fuite Urgente", categorie: "Dépannage" },
      { titre: "Installation Pompe à Chaleur", categorie: "Chauffage" },
      { titre: "Mise aux Normes Plomberie", categorie: "Conformité" }
    ],
    temoignages: [
      { nom: "Marie Dupont", localite: "Résidence privée", texte: "Dépannage très rapide pour une fuite urgente. Plombier professionnel et efficace." },
      { nom: "Jean Martin", localite: "Appartement", texte: "Installation de ma nouvelle salle de bain parfaite. Travail soigné et propre." },
      { nom: "Sophie Bernard", localite: "Maison individuelle", texte: "Remplacement chaudière impeccable. Explications claires et prix correct." }
    ],
    faq: [
      { question: "Intervenez-vous en urgence le week-end ?", reponse: "Oui, nous assurons un service de dépannage 24h/24 et 7j/7 pour les urgences." },
      { question: "Proposez-vous un contrat d'entretien chaudière ?", reponse: "Oui, nous proposons des contrats annuels d'entretien pour votre chaudière." },
      { question: "Êtes-vous certifié RGE ?", reponse: "Oui, nous sommes certifiés RGE Qualibat, vous permettant de bénéficier d'aides." },
      { question: "Quel est le délai d'intervention ?", reponse: "En urgence sous 2h, pour les travaux programmés sous 48h maximum." }
    ]
  },

  electricien: {
    nom: 'Électricité',
    couleur: '#FF6600',
    couleurSecondaire: '#E55A00',
    couleurTexte: '#FFFFFF',
    hero: {
      title: "Électricien Professionnel Certifié",
      subtitle: "Installation - Dépannage - Mise aux normes"
    },
    services: [
      { titre: "Tableau Électrique", description: "Installation et mise aux normes de tableaux électriques" },
      { titre: "Dépannage Urgent", description: "Intervention rapide pour pannes électriques" },
      { titre: "Installation Complète", description: "Installation électrique neuf et rénovation" },
      { titre: "Mise aux Normes", description: "Mise en conformité NF C 15-100" },
      { titre: "Domotique", description: "Installation de systèmes domotiques connectés" },
      { titre: "Éclairage LED", description: "Installation d'éclairage LED économique" }
    ],
    projets: [
      { titre: "Installation Villa Neuve", categorie: "Résidentiel" },
      { titre: "Tableau Électrique Industriel", categorie: "Industrie" },
      { titre: "Domotique Maison Connectée", categorie: "Smart Home" },
      { titre: "Rénovation Électrique Complète", categorie: "Rénovation" },
      { titre: "Éclairage LED Magasin", categorie: "Commercial" },
      { titre: "Mise aux Normes Bureau", categorie: "Tertiaire" }
    ],
    temoignages: [
      { nom: "Pierre Durand", localite: "Villa moderne", texte: "Installation électrique complète parfaite. Électricien très professionnel." },
      { nom: "Claire Moreau", localite: "Commerce", texte: "Dépannage rapide et efficace. Je recommande vivement cette entreprise." },
      { nom: "Michel Petit", localite: "Bureau", texte: "Mise aux normes réalisée rapidement. Travail propre et soigné." }
    ],
    faq: [
      { question: "Êtes-vous certifié Qualifelec ?", reponse: "Oui, nous sommes certifiés Qualifelec pour garantir la qualité de nos interventions." },
      { question: "Faites-vous les diagnostics électriques ?", reponse: "Oui, nous réalisons les diagnostics électriques obligatoires pour vente ou location." },
      { question: "Installez-vous des bornes de recharge ?", reponse: "Oui, nous installons des bornes de recharge pour véhicules électriques." },
      { question: "Quel est votre délai d'intervention ?", reponse: "Intervention sous 2h en urgence, sous 48h pour travaux programmés." }
    ]
  },

  menuisier: {
    nom: 'Menuiserie',
    couleur: '#8B4513',
    couleurSecondaire: '#6B3410',
    couleurTexte: '#FFFFFF',
    hero: {
      title: "Menuisier Artisan Qualifié",
      subtitle: "Création sur mesure - Rénovation - Pose"
    },
    services: [
      { titre: "Portes sur Mesure", description: "Fabrication et pose de portes intérieures et extérieures" },
      { titre: "Fenêtres", description: "Installation de fenêtres bois, PVC et aluminium" },
      { titre: "Escaliers", description: "Création d'escaliers sur mesure" },
      { titre: "Cuisine", description: "Aménagement de cuisines sur mesure" },
      { titre: "Parquet", description: "Pose et rénovation de parquets" },
      { titre: "Dressing", description: "Création de dressings et placards" }
    ],
    projets: [
      { titre: "Cuisine Sur Mesure Chêne", categorie: "Aménagement" },
      { titre: "Escalier Moderne Design", categorie: "Création" },
      { titre: "Rénovation Parquet Ancien", categorie: "Rénovation" },
      { titre: "Dressing Complet", categorie: "Rangement" },
      { titre: "Portes Intérieures Villa", categorie: "Installation" },
      { titre: "Terrasse Bois Extérieure", categorie: "Extérieur" }
    ],
    temoignages: [
      { nom: "Lucie Blanc", localite: "Maison rénovée", texte: "Magnifique cuisine sur mesure. Le menuisier a parfaitement compris nos besoins." },
      { nom: "Thomas Roy", localite: "Appartement ancien", texte: "Rénovation du parquet exceptionnelle. Le résultat dépasse nos attentes." },
      { nom: "Anne Mercier", localite: "Villa neuve", texte: "Escalier sur mesure sublime. Un vrai travail d'artisan." }
    ],
    faq: [
      { question: "Travaillez-vous tous types de bois ?", reponse: "Oui, nous travaillons le chêne, hêtre, pin et bois exotiques selon vos besoins." },
      { question: "Faites-vous du sur mesure uniquement ?", reponse: "Nous faisons du sur mesure et posons aussi des menuiseries standard." },
      { question: "Proposez-vous des finitions écologiques ?", reponse: "Oui, nous utilisons des vernis et lasures écologiques certifiés." },
      { question: "Quel est le délai de fabrication ?", reponse: "Comptez 3-4 semaines pour du sur mesure, 1 semaine pour du standard." }
    ]
  },

  macon: {
    nom: 'Maçonnerie',
    couleur: '#6B7280',
    couleurSecondaire: '#4B5563',
    couleurTexte: '#FFFFFF',
    hero: {
      title: "Maçon Professionnel",
      subtitle: "Construction - Rénovation - Gros œuvre"
    },
    services: [
      { titre: "Construction Neuve", description: "Construction de maisons et bâtiments" },
      { titre: "Extension", description: "Agrandissement de votre habitation" },
      { titre: "Dalle Béton", description: "Réalisation de dalles et chapes" },
      { titre: "Façade", description: "Ravalement et réparation de façades" },
      { titre: "Mur et Cloison", description: "Construction de murs et cloisons" },
      { titre: "Terrasse", description: "Création de terrasses en béton" }
    ],
    projets: [
      { titre: "Construction Maison 150m²", categorie: "Construction" },
      { titre: "Extension Salon 40m²", categorie: "Extension" },
      { titre: "Ravalement Façade Immeuble", categorie: "Rénovation" },
      { titre: "Dalle Béton Garage", categorie: "Dalle" },
      { titre: "Mur de Clôture", categorie: "Extérieur" },
      { titre: "Piscine Béton", categorie: "Piscine" }
    ],
    temoignages: [
      { nom: "François Girard", localite: "Construction neuve", texte: "Construction de notre maison parfaite. Maçon sérieux et respectueux des délais." },
      { nom: "Sylvie Mercier", localite: "Extension", texte: "Extension réalisée avec soin. Finitions impeccables et équipe professionnelle." },
      { nom: "Patrick Simon", localite: "Rénovation", texte: "Ravalement de façade excellent. Le résultat a transformé notre maison." }
    ],
    faq: [
      { question: "Faites-vous les fondations ?", reponse: "Oui, nous réalisons tous types de fondations selon étude de sol." },
      { question: "Gérez-vous les permis de construire ?", reponse: "Nous vous accompagnons dans toutes les démarches administratives." },
      { question: "Travaillez-vous avec des architectes ?", reponse: "Oui, nous collaborons régulièrement avec des architectes locaux." },
      { question: "Quelle est votre garantie ?", reponse: "Nous offrons la garantie décennale obligatoire sur tous nos travaux." }
    ]
  },

  paysagiste: {
    nom: 'Paysagisme',
    couleur: '#059669',
    couleurSecondaire: '#047857',
    couleurTexte: '#FFFFFF',
    hero: {
      title: "Paysagiste Créateur de Jardins",
      subtitle: "Création - Entretien - Aménagement extérieur"
    },
    services: [
      { titre: "Création de Jardins", description: "Conception et réalisation de jardins sur mesure" },
      { titre: "Entretien Espaces Verts", description: "Entretien régulier de vos espaces verts" },
      { titre: "Gazon", description: "Création et entretien de pelouses" },
      { titre: "Élagage", description: "Taille et élagage d'arbres" },
      { titre: "Terrasse", description: "Création de terrasses bois et dallage" },
      { titre: "Arrosage Automatique", description: "Installation de systèmes d'arrosage" }
    ],
    projets: [
      { titre: "Jardin Zen Japonais", categorie: "Création" },
      { titre: "Terrasse Bois 80m²", categorie: "Aménagement" },
      { titre: "Jardin Méditerranéen", categorie: "Thématique" },
      { titre: "Gazon Synthétique", categorie: "Pelouse" },
      { titre: "Potager Permaculture", categorie: "Écologique" },
      { titre: "Élagage Grands Arbres", categorie: "Entretien" }
    ],
    temoignages: [
      { nom: "Julie Lambert", localite: "Villa avec jardin", texte: "Création d'un jardin magnifique. Le paysagiste a su créer notre paradis." },
      { nom: "Marc Dubois", localite: "Propriété", texte: "Entretien impeccable de notre parc. Équipe ponctuelle et soigneuse." },
      { nom: "Céline Robert", localite: "Maison neuve", texte: "Aménagement extérieur sublime. Nous adorons notre nouveau jardin." }
    ],
    faq: [
      { question: "Proposez-vous des contrats d'entretien ?", reponse: "Oui, nous proposons des contrats annuels adaptés à vos besoins." },
      { question: "Utilisez-vous des produits bio ?", reponse: "Oui, nous privilégions les techniques écologiques et produits bio." },
      { question: "Créez-vous des jardins sur petites surfaces ?", reponse: "Oui, nous optimisons même les plus petits espaces." },
      { question: "Quelle est la meilleure saison pour créer un jardin ?", reponse: "Le printemps et l'automne sont idéaux, mais nous intervenons toute l'année." }
    ]
  }
};

// ========================================
// FONCTION PRINCIPALE
// ========================================
function generateCompleteSite(metier, nomEntreprise, ville, telephone = '01 23 45 67 89') {
  const config = METIERS_CONFIG[metier];

  if (!config) {
    console.error(`❌ Métier non reconnu : ${metier}`);
    console.log('Métiers disponibles :', Object.keys(METIERS_CONFIG).join(', '));
    return;
  }

  console.log(`\n🔧 Génération COMPLÈTE du site ${config.nom} ${nomEntreprise} à ${ville}`);
  console.log('===================================================\n');

  // 1. Mettre à jour les couleurs du thème avec bon contraste
  updateThemeColors(config);

  // 2. Mettre à jour la configuration du site
  updateSiteConfig(nomEntreprise, ville, telephone, config);

  // 3. Mettre à jour la page d'accueil
  updateHomepage(config, nomEntreprise, ville);

  // 4. Mettre à jour les services
  updateServices(config);

  // 5. Mettre à jour les projets
  updateProjects(config);

  // 6. Mettre à jour les témoignages
  updateTestimonials(config, ville);

  // 7. Mettre à jour les FAQ
  updateFAQ(config);

  // 8. Mettre à jour le CTA
  updateCTA(config, telephone);

  // 9. Mettre à jour About
  updateAbout(config, nomEntreprise, ville);

  console.log('\n✅ Site généré avec succès !');
  console.log(`🌐 Accessible sur: http://localhost:4321`);
  console.log('📌 Contenu 100% adapté au métier: ' + config.nom);
}

// ========================================
// FONCTIONS DE MISE À JOUR
// ========================================

function updateThemeColors(config) {
  const themePath = path.join(__dirname, 'src/config/theme.json');
  const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

  theme.colors.default.theme_color.primary = config.couleur;
  theme.colors.default.theme_color.secondary = config.couleurSecondaire;
  // Assurer un bon contraste pour les boutons
  theme.colors.default.text_color["text-light"] = config.couleurTexte;
  theme.colors["theme_color"] = config.couleur;
  theme.colors["primary"] = config.couleur;

  fs.writeFileSync(themePath, JSON.stringify(theme, null, 2));
  console.log(`✅ Couleurs mises à jour: ${config.couleur} avec contraste optimal`);
}

function updateSiteConfig(nomEntreprise, ville, telephone, config) {
  const configPath = path.join(__dirname, 'src/config/config.json');
  const siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  siteConfig.site.title = `${config.nom} ${nomEntreprise} - ${ville}`;
  siteConfig.site.base_url = `https://${nomEntreprise.toLowerCase().replace(/\s+/g, '-')}-${ville.toLowerCase()}.fr`;
  siteConfig.site.logo_text = nomEntreprise;

  siteConfig.params.phone = telephone.replace(/\s/g, '');
  siteConfig.params.email = `contact@${nomEntreprise.toLowerCase().replace(/\s+/g, '-')}.fr`;
  siteConfig.params.address = `${ville}, France`;

  fs.writeFileSync(configPath, JSON.stringify(siteConfig, null, 2));
  console.log('✅ Configuration mise à jour');
}

function updateHomepage(config, nomEntreprise, ville) {
  const homepagePath = path.join(__dirname, 'src/content/homepage/-index.md');

  // Garder la structure existante mais mettre à jour le contenu
  const homepage = fs.readFileSync(homepagePath, 'utf8');

  // Mise à jour du banner
  let updatedHomepage = homepage.replace(
    /title: ".*?"/,
    `title: "${config.hero.title}"`
  );

  updatedHomepage = updatedHomepage.replace(
    /content: ".*?"/,
    `content: "${config.hero.subtitle}"`
  );

  fs.writeFileSync(homepagePath, updatedHomepage);
  console.log('✅ Page d\'accueil mise à jour');
}

function updateServices(config) {
  config.services.forEach((service, index) => {
    const num = index + 1;
    const servicePath = path.join(__dirname, `src/content/services/service-${num}.md`);

    const content = `---
title: "${service.titre}"
meta_title: "${service.titre}"
image: "/images/${config.nom.toLowerCase()}/services/service-${num}.svg"
draft: false
features:
  - Intervention rapide
  - Devis gratuit
  - Garantie décennale
---

## ${service.titre}

${service.description}

### Nos Engagements
- Travail soigné et professionnel
- Respect des délais
- Prix transparents
- Service après-vente`;

    fs.writeFileSync(servicePath, content);
  });
  console.log('✅ Services mis à jour:', config.services.length);
}

function updateProjects(config) {
  const projectsPath = path.join(__dirname, 'src/content/projects');

  // Lister les fichiers de projets existants
  const projectFiles = fs.readdirSync(projectsPath)
    .filter(file => file.startsWith('project-') && file.endsWith('.md'));

  config.projets.forEach((projet, index) => {
    if (index < projectFiles.length) {
      const projectPath = path.join(projectsPath, projectFiles[index]);

      const content = `---
title: "${projet.titre}"
meta_title: "${projet.titre}"
description: "${projet.categorie}"
image: "/images/projects/project-${index + 1}.svg"
categories: ["${projet.categorie}"]
date: 2024-01-0${index + 1}
draft: false
---

## ${projet.titre}

Réalisation complète d'un projet de ${projet.categorie.toLowerCase()} avec des résultats exceptionnels.

### Détails du projet
- Type: ${projet.categorie}
- Durée: Selon complexité
- Garantie: Décennale
- Satisfaction: 100%`;

      fs.writeFileSync(projectPath, content);
    }
  });
  console.log('✅ Projets mis à jour:', config.projets.length);
}

function updateTestimonials(config, ville) {
  const reviewsPath = path.join(__dirname, 'src/content/reviews/-index.md');

  const testimonials = config.temoignages.map(t => `  - name: "${t.nom}"
    designation: "${t.localite}"
    rating: 5
    content: "${t.texte}"`).join('\n');

  const content = `---
title: "Témoignages Clients"
subtitle: "Avis de nos clients satisfaits"
description: "Ce que nos clients disent de nos services de ${config.nom.toLowerCase()}"
draft: false
badge:
  label: "Témoignages"
  bg_color: "${config.couleur}"
  enable: true
button:
  enable: true
  label: "Plus de témoignages"
  link: "/contact"
testimonials:
${testimonials}
---`;

  fs.writeFileSync(reviewsPath, content);
  console.log('✅ Témoignages mis à jour');
}

function updateFAQ(config) {
  const faqPath = path.join(__dirname, 'src/content/faqs/-index.md');

  const faqs = config.faq.map(f => `  - question: "${f.question}"
    answer: "${f.reponse}"`).join('\n');

  const content = `---
title: "Questions Fréquentes"
description: "Réponses aux questions sur nos services de ${config.nom.toLowerCase()}"
draft: false
badge:
  label: "FAQ"
  bg_color: "${config.couleur}"
  enable: true
button:
  enable: true
  label: "Plus de questions ?"
  link: "/contact"
list:
${faqs}
---`;

  fs.writeFileSync(faqPath, content);
  console.log('✅ FAQ mises à jour');
}

function updateCTA(config, telephone) {
  const ctaPath = path.join(__dirname, 'src/content/sections/call-to-action.md');

  const content = `---
enable: true
title: "Besoin d'un ${config.nom === 'Électricité' ? 'Électricien' : config.nom === 'Menuiserie' ? 'Menuisier' : config.nom === 'Maçonnerie' ? 'Maçon' : config.nom === 'Plomberie' ? 'Plombier' : 'Paysagiste'} ?"
subtitle: "Devis Gratuit - Intervention Rapide"
description: "Contactez votre expert ${config.nom.toLowerCase()} pour tous vos travaux. Garantie décennale et devis gratuit."
image: "/images/cta-banner.svg"
button:
  enable: true
  label: "Demandez un Devis"
  link: "tel:${telephone.replace(/\s/g, '')}"
button_solid:
  enable: true
  label: "Appeler Maintenant"
  link: "tel:${telephone.replace(/\s/g, '')}"
button_outline:
  enable: true
  label: "Devis en Ligne"
  link: "/contact"
---`;

  fs.writeFileSync(ctaPath, content);
  console.log('✅ Call-to-action mis à jour');
}

function updateAbout(config, nomEntreprise, ville) {
  const aboutPath = path.join(__dirname, 'src/content/about/-index.md');

  const aboutContent = fs.readFileSync(aboutPath, 'utf8');

  // Mettre à jour le titre et la description
  let updated = aboutContent.replace(
    /title: ".*?"/,
    `title: "Expert ${config.nom} Certifié"`
  );

  updated = updated.replace(
    /meta_title: ".*?"/,
    `meta_title: "À propos de ${nomEntreprise}"`
  );

  updated = updated.replace(
    /description: ".*?"/,
    `description: "Spécialiste en ${config.nom.toLowerCase()} depuis plus de 10 ans à ${ville}"`
  );

  fs.writeFileSync(aboutPath, updated);
  console.log('✅ Page À propos mise à jour');
}

// ========================================
// EXÉCUTION
// ========================================
const args = process.argv.slice(2);
let metier, nom, ville, telephone;

// Parser les arguments
args.forEach(arg => {
  if (arg.startsWith('--metier=')) {
    metier = arg.split('=')[1];
  } else if (arg.startsWith('--nom=')) {
    nom = arg.split('=')[1];
  } else if (arg.startsWith('--ville=')) {
    ville = arg.split('=')[1];
  } else if (arg.startsWith('--telephone=')) {
    telephone = arg.split('=')[1];
  } else if (!metier && !arg.startsWith('--')) {
    metier = arg;
  }
});

// Valeurs par défaut
nom = nom || 'ProExpert';
ville = ville || 'Paris';
telephone = telephone || '01 23 45 67 89';

if (!metier) {
  console.log(`
🏗️  GÉNÉRATEUR DE SITE COMPLET - 100% COHÉRENT
==============================================

Usage: node generate-site-metier-complet.cjs --metier=plombier --nom=Martin --ville=Lyon

Options:
  --metier     : plombier, electricien, menuisier, macon, paysagiste
  --nom        : Nom de l'entreprise
  --ville      : Ville
  --telephone  : Téléphone (optionnel)

Exemples:
  node generate-site-metier-complet.cjs --metier=electricien --nom=ElecPro --ville=Marseille
  node generate-site-metier-complet.cjs --metier=menuisier --nom=Lebois --ville=Bordeaux

✅ CE SCRIPT GÉNÈRE:
  - Services spécifiques au métier
  - Projets cohérents
  - Témoignages adaptés
  - FAQ pertinentes
  - Couleurs avec bon contraste
`);
} else {
  generateCompleteSite(metier, nom, ville, telephone);
}
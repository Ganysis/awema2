const fs = require('fs');
const path = require('path');

// ========================================
// CONFIGURATION DES MÉTIERS
// ========================================
const METIERS_CONFIG = {
  plombier: {
    nom: 'Plomberie',
    couleur: '#0066CC',
    couleurSecondaire: '#0052A3',
    hero: {
      title: "Expert en Plomberie et Chauffage",
      subtitle: "Dépannage 24/7 - Installation - Rénovation",
      description: "Votre plombier de confiance pour tous vos travaux de plomberie, chauffage et sanitaire. Intervention rapide et devis gratuit."
    },
    about: {
      title: "Votre Plombier de Confiance",
      content: "Fort de plus de 15 ans d'expérience dans la plomberie et le chauffage, notre équipe intervient rapidement pour tous vos besoins : dépannage urgent, installation de chauffe-eau, rénovation de salle de bain, détection de fuites. Nous garantissons un travail soigné et des tarifs transparents.",
      expertise: [
        "Dépannage plomberie 24/7",
        "Installation sanitaires",
        "Chauffage et chaudières",
        "Détection de fuites",
        "Rénovation salle de bain",
        "Entretien et maintenance"
      ]
    },
    services: [
      {
        titre: "Dépannage Urgent",
        description: "Intervention rapide 24/7 pour tous vos urgences plomberie : fuites, débouchage, réparations.",
        details: "Notre équipe est disponible jour et nuit pour résoudre vos problèmes de plomberie en urgence."
      },
      {
        titre: "Installation Chauffe-eau",
        description: "Installation et remplacement de chauffe-eau électrique, gaz ou thermodynamique.",
        details: "Nous installons tous types de chauffe-eau avec garantie décennale et mise en service incluse."
      },
      {
        titre: "Rénovation Salle de Bain",
        description: "Rénovation complète de salle de bain clé en main : plomberie, carrelage, sanitaires.",
        details: "Transformez votre salle de bain avec notre expertise en rénovation complète."
      },
      {
        titre: "Détection de Fuites",
        description: "Détection de fuites non destructive par caméra thermique et inspection vidéo.",
        details: "Technologie de pointe pour localiser précisément les fuites sans casser."
      },
      {
        titre: "Pompe à Chaleur",
        description: "Installation et entretien de pompes à chaleur pour un chauffage économique.",
        details: "Solutions écologiques et économiques pour votre chauffage."
      },
      {
        titre: "Installation Compteurs",
        description: "Pose et remplacement de compteurs d'eau avec certification.",
        details: "Installation conforme aux normes avec certificat de conformité."
      }
    ],
    cta: {
      title: "Besoin d'un Plombier ?",
      subtitle: "Intervention Rapide - Devis Gratuit",
      description: "Contactez-nous maintenant pour une intervention rapide ou un devis gratuit. Disponible 24/7 pour les urgences.",
      button: "Appelez-nous Maintenant"
    }
  },

  electricien: {
    nom: 'Électricité',
    couleur: '#FF6600',
    couleurSecondaire: '#E55A00',
    hero: {
      title: "Électricien Professionnel Certifié",
      subtitle: "Installation - Dépannage - Mise aux normes",
      description: "Votre électricien qualifié pour tous vos travaux électriques. Intervention rapide, devis gratuit et garantie décennale."
    },
    about: {
      title: "Électricien Certifié Qualifelec",
      content: "Spécialiste en électricité générale depuis plus de 10 ans, nous intervenons pour tous vos besoins électriques : installation, dépannage, mise aux normes, domotique. Certification Qualifelec et garantie décennale pour votre sécurité.",
      expertise: [
        "Installation électrique complète",
        "Mise aux normes NF C 15-100",
        "Tableau électrique",
        "Domotique et maison connectée",
        "Éclairage LED",
        "Borne de recharge véhicule"
      ]
    },
    services: [
      {
        titre: "Installation Tableau Électrique",
        description: "Installation et mise aux normes de tableaux électriques avec disjoncteurs différentiels.",
        details: "Sécurisez votre installation avec un tableau électrique aux normes actuelles."
      },
      {
        titre: "Installation Prises et Interrupteurs",
        description: "Pose de prises électriques, interrupteurs et variateurs dans toutes les pièces.",
        details: "Installation professionnelle avec finitions soignées et respect des normes."
      },
      {
        titre: "Éclairage LED",
        description: "Installation d'éclairage LED économique : spots, rubans, appliques.",
        details: "Réduisez votre consommation électrique avec l'éclairage LED moderne."
      },
      {
        titre: "Photovoltaïque",
        description: "Installation de panneaux solaires photovoltaïques et onduleurs.",
        details: "Produisez votre propre électricité avec l'énergie solaire."
      },
      {
        titre: "Borne de Recharge",
        description: "Installation de bornes de recharge pour véhicules électriques.",
        details: "Rechargez votre véhicule électrique à domicile en toute sécurité."
      },
      {
        titre: "Domotique",
        description: "Installation de systèmes domotiques : éclairage, volets, chauffage connectés.",
        details: "Transformez votre maison en habitat intelligent et économe."
      }
    ],
    cta: {
      title: "Besoin d'un Électricien ?",
      subtitle: "Devis Gratuit - Intervention Rapide",
      description: "Contactez votre électricien certifié pour tous vos travaux électriques. Garantie décennale et devis gratuit.",
      button: "Demandez un Devis"
    }
  },

  menuisier: {
    nom: 'Menuiserie',
    couleur: '#8B4513',
    couleurSecondaire: '#6B3410',
    hero: {
      title: "Menuiserie sur Mesure",
      subtitle: "Création - Rénovation - Agencement",
      description: "Artisan menuisier pour tous vos projets bois : portes, fenêtres, escaliers, cuisines, parquets. Travail artisanal de qualité."
    },
    about: {
      title: "Artisan Menuisier Qualifié",
      content: "Menuisier depuis 20 ans, nous créons et installons tous vos aménagements en bois sur mesure. Du mobilier à l'agencement complet, nous travaillons avec passion pour donner vie à vos projets.",
      expertise: [
        "Menuiserie sur mesure",
        "Portes et fenêtres bois",
        "Escaliers bois",
        "Cuisine équipée",
        "Dressing et placards",
        "Parquet et terrasse bois"
      ]
    },
    services: [
      {
        titre: "Portes sur Mesure",
        description: "Fabrication et pose de portes intérieures et extérieures en bois massif.",
        details: "Portes personnalisées selon vos goûts et dimensions exactes."
      },
      {
        titre: "Fenêtres Bois",
        description: "Fenêtres en bois sur mesure : double vitrage, isolation optimale.",
        details: "Fenêtres traditionnelles ou modernes avec excellente isolation."
      },
      {
        titre: "Dressing sur Mesure",
        description: "Création de dressings et placards optimisés pour votre espace.",
        details: "Maximisez votre espace de rangement avec un dressing personnalisé."
      },
      {
        titre: "Escaliers Bois",
        description: "Fabrication d'escaliers en bois : droit, tournant, hélicoïdal.",
        details: "Escaliers sur mesure alliant esthétique et sécurité."
      },
      {
        titre: "Cuisine sur Mesure",
        description: "Conception et installation de cuisines équipées en bois.",
        details: "Cuisine fonctionnelle et élégante adaptée à votre espace."
      },
      {
        titre: "Pose de Parquet",
        description: "Pose de parquet massif, contrecollé ou stratifié.",
        details: "Parquet de qualité posé dans les règles de l'art."
      }
    ],
    cta: {
      title: "Un Projet de Menuiserie ?",
      subtitle: "Création sur Mesure - Devis Gratuit",
      description: "Confiez vos projets bois à un artisan passionné. Étude personnalisée et devis gratuit.",
      button: "Contactez l'Artisan"
    }
  },

  macon: {
    nom: 'Maçonnerie',
    couleur: '#6B7280',
    couleurSecondaire: '#4B5563',
    hero: {
      title: "Entreprise de Maçonnerie Générale",
      subtitle: "Construction - Rénovation - Extension",
      description: "Maçon professionnel pour tous vos travaux de construction et rénovation. Gros œuvre, façade, dalle, carrelage."
    },
    about: {
      title: "Maçon Expérimenté",
      content: "Entreprise de maçonnerie depuis 25 ans, nous réalisons tous vos projets de construction et rénovation : maison, extension, piscine, terrasse. Travail soigné et respect des délais garantis.",
      expertise: [
        "Construction neuve",
        "Extension maison",
        "Rénovation façade",
        "Dalle béton",
        "Carrelage intérieur/extérieur",
        "Construction piscine"
      ]
    },
    services: [
      {
        titre: "Construction Neuve",
        description: "Construction de maisons individuelles clé en main.",
        details: "De la fondation à la toiture, nous réalisons votre projet de construction."
      },
      {
        titre: "Extension Maison",
        description: "Agrandissement de maison : extension, surélévation, véranda.",
        details: "Gagnez de l'espace avec une extension parfaitement intégrée."
      },
      {
        titre: "Dalle Béton",
        description: "Coulage de dalle béton pour terrasse, garage, abri de jardin.",
        details: "Dalle béton armé avec joints de dilatation, finition lissée ou brossée."
      },
      {
        titre: "Réparation Façade",
        description: "Ravalement de façade, réparation fissures, enduit, crépi.",
        details: "Redonnez vie à votre façade avec un ravalement professionnel."
      },
      {
        titre: "Pose Carrelage",
        description: "Pose de carrelage intérieur et extérieur, faïence, mosaïque.",
        details: "Carrelage posé avec précision pour un résultat durable et esthétique."
      },
      {
        titre: "Construction Piscine",
        description: "Construction de piscines enterrées en béton armé.",
        details: "Piscine sur mesure avec garantie décennale et finitions soignées."
      }
    ],
    cta: {
      title: "Projet de Construction ?",
      subtitle: "Étude Gratuite - Garantie Décennale",
      description: "Confiez vos travaux de maçonnerie à des professionnels expérimentés. Devis détaillé gratuit.",
      button: "Demandez une Étude"
    }
  },

  paysagiste: {
    nom: 'Paysagisme',
    couleur: '#059669',
    couleurSecondaire: '#047857',
    hero: {
      title: "Paysagiste Créateur de Jardins",
      subtitle: "Conception - Aménagement - Entretien",
      description: "Paysagiste professionnel pour la création et l'entretien de vos espaces verts. Jardins, terrasses, clôtures, arrosage automatique."
    },
    about: {
      title: "Paysagiste Passionné",
      content: "Paysagiste depuis plus de 15 ans, nous créons des jardins uniques qui reflètent votre personnalité. De la conception à la réalisation, nous transformons vos espaces extérieurs en véritables havres de paix.",
      expertise: [
        "Création de jardins",
        "Entretien espaces verts",
        "Terrasse bois et dallage",
        "Arrosage automatique",
        "Élagage et taille",
        "Gazon et plantations"
      ]
    },
    services: [
      {
        titre: "Création de Jardins",
        description: "Conception et réalisation de jardins paysagers personnalisés.",
        details: "Créons ensemble le jardin de vos rêves, adapté à votre terrain et vos envies."
      },
      {
        titre: "Entretien Espaces Verts",
        description: "Entretien régulier de jardins : tonte, taille, désherbage, traitement.",
        details: "Gardez votre jardin impeccable toute l'année avec notre service d'entretien."
      },
      {
        titre: "Terrasses en Bois",
        description: "Construction de terrasses en bois exotique ou composite.",
        details: "Terrasse durable et esthétique pour profiter de votre extérieur."
      },
      {
        titre: "Arrosage Automatique",
        description: "Installation de systèmes d'arrosage automatique programmable.",
        details: "Économisez l'eau et gardez un jardin verdoyant avec l'arrosage automatique."
      },
      {
        titre: "Élagage et Taille",
        description: "Élagage d'arbres, taille de haies et arbustes ornementaux.",
        details: "Entretenez vos végétaux pour leur santé et votre sécurité."
      },
      {
        titre: "Aménagement Paysager",
        description: "Aménagement complet : allées, murets, bassins, éclairage.",
        details: "Transformez votre extérieur avec un aménagement paysager complet."
      }
    ],
    cta: {
      title: "Envie d'un Beau Jardin ?",
      subtitle: "Création sur Mesure - Devis Gratuit",
      description: "Faites appel à un paysagiste professionnel pour transformer votre extérieur. Étude personnalisée offerte.",
      button: "Contactez le Paysagiste"
    }
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

  console.log(`\n🔧 Génération du site pour: ${config.nom} ${nomEntreprise} à ${ville}`);
  console.log('===================================================\n');

  // 1. Mettre à jour les couleurs du thème
  updateThemeColors(config.couleur, config.couleurSecondaire);

  // 2. Intégrer les SVG du métier
  integrateSVG(metier);

  // 3. Mettre à jour la configuration du site
  updateSiteConfig(nomEntreprise, ville, telephone, config);

  // 4. Mettre à jour la page d'accueil
  updateHomepage(config, nomEntreprise, ville);

  // 5. Mettre à jour les services
  updateServices(config.services);

  // 6. Mettre à jour la section À propos
  updateAbout(config.about, nomEntreprise, ville);

  // 7. Mettre à jour le CTA
  updateCTA(config.cta, telephone);

  console.log('\n✅ Site généré avec succès !');
  console.log(`🌐 Accessible sur: http://localhost:4330`);
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

function updateThemeColors(primary, secondary) {
  const themePath = path.join(__dirname, 'src/config/theme.json');
  const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

  theme.colors.default.theme_color.primary = primary;
  theme.colors.default.theme_color.secondary = secondary;

  fs.writeFileSync(themePath, JSON.stringify(theme, null, 2));
  console.log(`✅ Couleurs mises à jour: ${primary} / ${secondary}`);
}

function integrateSVG(metier) {
  const { integrateSVGForMetier } = require('./integrate-svg-by-metier.cjs');
  integrateSVGForMetier(metier);
}

function updateSiteConfig(nomEntreprise, ville, telephone, config) {
  const configPath = path.join(__dirname, 'src/config/config.json');
  const siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  siteConfig.site.title = `${config.nom} ${nomEntreprise} - ${ville}`;
  siteConfig.site.base_url = `https://${nomEntreprise.toLowerCase().replace(/\s+/g, '-')}-${ville.toLowerCase()}.fr`;
  siteConfig.site.logo_text = nomEntreprise;

  // Mettre à jour les paramètres de contact
  siteConfig.params.phone = telephone.replace(/\s/g, '');
  siteConfig.params.email = `contact@${nomEntreprise.toLowerCase().replace(/\s+/g, '-')}.fr`;
  siteConfig.params.address = `${ville}, France`;
  siteConfig.params.footer_title = config.cta.title;
  siteConfig.params.footer_content = config.cta.description;

  fs.writeFileSync(configPath, JSON.stringify(siteConfig, null, 2));
  console.log('✅ Configuration mise à jour');
}

function updateHomepage(config, nomEntreprise, ville) {
  const homepagePath = path.join(__dirname, 'src/content/homepage/-index.md');

  const content = `---
banner:
  title: "${config.hero.title}"
  content: "${config.hero.description}"
  image: /images/banner-art.svg
  button:
    label: "Devis Gratuit"
    link: "/contact"
    enable: true

key_features:
  title: "Pourquoi Nous Choisir ?"
  description: "Les avantages de ${config.nom} ${nomEntreprise}"
  feature_list:
    - icon: "shield"
      title: "Garantie Décennale"
      content: "Tous nos travaux sont couverts par une garantie décennale pour votre tranquillité."
    - icon: "clock"
      title: "Intervention Rapide"
      content: "Nous intervenons rapidement à ${ville} et ses environs, même en urgence."
    - icon: "check-circle"
      title: "Travail de Qualité"
      content: "Un savoir-faire reconnu et des finitions soignées pour tous vos projets."
    - icon: "users"
      title: "Équipe Qualifiée"
      content: "Des professionnels certifiés et expérimentés à votre service."
    - icon: "star"
      title: "Satisfaction Client"
      content: "Plus de 500 clients satisfaits nous font confiance chaque année."
    - icon: "calculator"
      title: "Devis Gratuit"
      content: "Étude gratuite de votre projet et devis détaillé sans engagement."

service:
  homepage_tab:
    title: Nos Services
    description: Découvrez notre gamme complète de services
    tab_list:
      - title: Services Principaux
        icon: "tools"
        image: "/images/tab-1.png"
      - title: Nos Réalisations
        icon: "briefcase"
        image: "/images/tab-3.png"
      - title: Notre Expertise
        icon: "award"
        image: "/images/tab-2.png"

testimonial:
  title: "Nos Clients Témoignent"
  description: "Découvrez ce que nos clients disent de nos services"
  testimonial_list:
    - author: Marie Dubois
      avatar: "/images/users/01.jpg"
      organization: ${ville}
      rating: 5
      content: "Excellent travail, équipe professionnelle et ponctuelle. Je recommande vivement !"
    - author: Jean Martin
      avatar: "/images/users/02.jpg"
      organization: ${ville}
      rating: 5
      content: "Intervention rapide et efficace. Très satisfait du résultat et du service."
    - author: Sophie Laurent
      avatar: "/images/users/03.jpg"
      organization: ${ville}
      rating: 5
      content: "Travail de qualité et prix raisonnable. Une entreprise sérieuse et fiable."

brands:
  enable: false
  title: "Nos Partenaires"
  images:
    - /images/brands/01.png
    - /images/brands/02.png
---`;

  fs.writeFileSync(homepagePath, content);
  console.log('✅ Page d\'accueil mise à jour');
}

function updateServices(services) {
  services.forEach((service, index) => {
    const servicePath = path.join(__dirname, `src/content/services/service-${index + 1}.md`);

    const content = `---
title: "${service.titre}"
meta_title: "${service.titre}"
description: "${service.description}"
date: 2025-01-24T05:00:00Z
image: "/images/service-${index + 1}.svg"
featured_in_homepage: true
features:
  - name: "Service Professionnel"
    description: "Intervention par des professionnels qualifiés et expérimentés."
  - name: "Garantie Qualité"
    description: "Travaux garantis et assurés pour votre sécurité."
  - name: "Devis Transparent"
    description: "Devis détaillé et sans surprise, engagement de prix ferme."
draft: false
---

## ${service.titre}

${service.description}

${service.details}

### Nos Engagements

- ✓ Intervention rapide
- ✓ Travail soigné et garanti
- ✓ Prix transparents
- ✓ Professionnels certifiés
- ✓ Respect des délais`;

    fs.writeFileSync(servicePath, content);
  });
  console.log('✅ Services mis à jour');
}

function updateAbout(about, nomEntreprise, ville) {
  const aboutPath = path.join(__dirname, 'src/content/about/-index.md');

  const expertiseList = about.expertise.map(e => `    - "${e}"`).join('\n');

  const content = `---
title: "À Propos"
meta_title: "À propos de ${nomEntreprise}"
image: "/images/about.jpg"
draft: false

experience:
  title: "${about.title}"
  description: "${about.content}"
  list:
${expertiseList}

funfacts:
  title: "Nos Chiffres Clés"
  description: "Des résultats qui parlent d'eux-mêmes"
  funfact_list:
    - icon: "users"
      title: "Clients Satisfaits"
      count: 500
    - icon: "briefcase"
      title: "Projets Réalisés"
      count: 750
    - icon: "calendar"
      title: "Années d'Expérience"
      count: 15
    - icon: "map-pin"
      title: "Zones d'Intervention"
      count: 25

team:
  title: "Notre Équipe"
  description: "Des professionnels qualifiés à votre service"
  team_list:
    - title: "${nomEntreprise}"
      image: "/images/team/a.svg"
      designation: "Directeur"
    - title: "Chef d'Équipe"
      image: "/images/team/c.svg"
      designation: "Responsable Technique"
    - title: "Expert Technique"
      image: "/images/team/d.svg"
      designation: "Spécialiste"
---

## ${about.title}

${about.content}

Basés à **${ville}**, nous intervenons dans toute la région pour tous vos projets. Notre équipe de professionnels qualifiés met son expertise à votre service pour des réalisations de qualité.`;

  fs.writeFileSync(aboutPath, content);
  console.log('✅ Page À propos mise à jour');
}

function updateCTA(cta, telephone) {
  const ctaPath = path.join(__dirname, 'src/content/sections/call-to-action.md');

  const content = `---
enable: true
title: "${cta.title}"
subtitle: "${cta.subtitle}"
description: "${cta.description}"
button:
  enable: true
  label: "${cta.button}"
  link: "tel:${telephone.replace(/\s/g, '')}"
---`;

  fs.writeFileSync(ctaPath, content);
  console.log('✅ Call-to-action mis à jour');
}

// ========================================
// CLI
// ========================================
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};

  args.forEach(arg => {
    const [key, value] = arg.split('=');
    const cleanKey = key.replace('--', '');
    options[cleanKey] = value;
  });

  // Nettoyer la valeur du métier si elle contient encore le préfixe
  if (options.metier && options.metier.includes('--metier=')) {
    options.metier = options.metier.replace('--metier=', '');
  }

  if (!options.metier) {
    console.log(`
🏗️  GÉNÉRATEUR DE SITE COMPLET
==============================

Usage: node generate-complete-site-metier.cjs --metier=plombier --nom=Martin --ville=Lyon

Options:
  --metier     : ${Object.keys(METIERS_CONFIG).join(', ')}
  --nom        : Nom de l'entreprise
  --ville      : Ville
  --telephone  : Téléphone (optionnel)

Exemples:
  node generate-complete-site-metier.cjs --metier=electricien --nom=ElecPro --ville=Marseille
  node generate-complete-site-metier.cjs --metier=menuisier --nom=Lebois --ville=Bordeaux
  node generate-complete-site-metier.cjs --metier=paysagiste --nom=JardinExpert --ville=Toulouse
`);
    process.exit(0);
  }

  generateCompleteSite(
    options.metier,
    options.nom || 'Expert',
    options.ville || 'Paris',
    options.telephone || '01 23 45 67 89'
  );
}

module.exports = { generateCompleteSite, METIERS_CONFIG };
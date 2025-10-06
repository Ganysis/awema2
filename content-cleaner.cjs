#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * NETTOYEUR DE CONTENU PROFESSIONNEL
 *
 * Remplace TOUT le Lorem Ipsum et les textes génériques
 * par du contenu professionnel adapté au métier
 */

// ===================================================
// CONTENU PROFESSIONNEL PAR MÉTIER
// ===================================================

const CONTENU_METIERS = {
  plombier: {
    hero: {
      title: "Expert Plombier à {ville}",
      subtitle: "Intervention rapide 24/7 - Devis gratuit",
      description: "Fort de plus de 15 ans d'expérience, nous sommes votre partenaire de confiance pour tous vos travaux de plomberie. Dépannage urgent, rénovation complète ou simple entretien.",
      cta: "Demander un devis",
      cta2: "Urgence ? Appelez-nous"
    },
    about: {
      title: "Votre plombier de confiance depuis 2008",
      description: "Notre équipe de plombiers qualifiés intervient rapidement pour résoudre tous vos problèmes de plomberie. Nous garantissons un travail de qualité avec des tarifs transparents.",
      points: [
        "Plus de 5000 clients satisfaits",
        "Intervention en moins d'une heure",
        "Garantie 2 ans sur tous nos travaux",
        "Devis gratuit et sans engagement"
      ]
    },
    services: {
      title: "Nos Services de Plomberie",
      subtitle: "Des solutions complètes pour tous vos besoins",
      list: [
        {
          title: "Dépannage Urgent 24/7",
          description: "Fuite d'eau, canalisation bouchée, panne de chauffe-eau ? Nous intervenons en urgence jour et nuit.",
          features: ["Intervention < 1h", "Week-end et jours fériés", "Diagnostic gratuit"]
        },
        {
          title: "Rénovation Salle de Bain",
          description: "Transformez votre salle de bain avec notre expertise. De la conception à la réalisation complète.",
          features: ["Design moderne", "Matériaux de qualité", "Respect des délais"]
        },
        {
          title: "Débouchage Canalisations",
          description: "Débouchage professionnel avec caméra d'inspection et nettoyage haute pression.",
          features: ["Caméra d'inspection", "Haute pression", "Sans produits chimiques"]
        },
        {
          title: "Installation Sanitaires",
          description: "Installation et remplacement de tous vos équipements sanitaires aux normes.",
          features: ["WC suspendus", "Douche italienne", "Robinetterie design"]
        },
        {
          title: "Détection de Fuites",
          description: "Localisation précise des fuites sans destruction grâce à nos équipements thermiques.",
          features: ["Caméra thermique", "Sans casse", "Rapport détaillé"]
        },
        {
          title: "Chauffe-eau & Chaudières",
          description: "Installation, entretien et dépannage de tous types de chauffe-eau et chaudières.",
          features: ["Toutes marques", "Contrat entretien", "Mise aux normes"]
        }
      ]
    },
    testimonials: [
      {
        name: "Marie Dupont",
        role: "Particulier",
        content: "Intervention rapide pour une fuite urgente. Travail propre et tarif correct. Je recommande !",
        rating: 5
      },
      {
        name: "Jean Martin",
        role: "Syndic",
        content: "Nous faisons appel à leurs services depuis 3 ans. Toujours professionnels et réactifs.",
        rating: 5
      },
      {
        name: "Sophie Bernard",
        role: "Propriétaire",
        content: "Rénovation complète de ma salle de bain. Résultat magnifique et dans les délais.",
        rating: 5
      }
    ],
    faq: [
      {
        question: "Intervenez-vous en urgence le week-end ?",
        answer: "Oui, nous intervenons 24h/24 et 7j/7, y compris les week-ends et jours fériés pour les urgences."
      },
      {
        question: "Quels sont vos délais d'intervention ?",
        answer: "Pour les urgences, nous intervenons en moins d'une heure. Pour les travaux planifiés, sous 24 à 48h."
      },
      {
        question: "Proposez-vous des devis gratuits ?",
        answer: "Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins."
      },
      {
        question: "Acceptez-vous les règlements en plusieurs fois ?",
        answer: "Oui, nous proposons des facilités de paiement en 3 ou 4 fois sans frais pour les travaux importants."
      }
    ],
    cta: {
      title: "Besoin d'un plombier rapidement ?",
      description: "Contactez-nous maintenant pour une intervention rapide ou un devis gratuit",
      button: "Appelez-nous maintenant",
      button2: "Devis en ligne"
    }
  },

  electricien: {
    hero: {
      title: "Électricien Certifié à {ville}",
      subtitle: "Installation • Rénovation • Dépannage",
      description: "Électriciens qualifiés pour tous vos travaux électriques. Mise aux normes, domotique, dépannage urgent. Intervention rapide et travail garanti.",
      cta: "Devis gratuit",
      cta2: "Appel urgent"
    },
    about: {
      title: "Experts en électricité depuis 2005",
      description: "Notre équipe d'électriciens certifiés assure tous vos travaux électriques en respectant les normes NF C 15-100.",
      points: [
        "Certification Qualifelec",
        "Garantie décennale",
        "Intervention d'urgence 24/7",
        "Matériel aux normes CE"
      ]
    },
    services: {
      title: "Services d'Électricité",
      subtitle: "Solutions électriques complètes et sécurisées",
      list: [
        {
          title: "Dépannage Électrique",
          description: "Panne de courant, court-circuit, disjonction ? Intervention urgente par nos électriciens.",
          features: ["Diagnostic rapide", "Sécurisation", "Disponible 24/7"]
        },
        {
          title: "Tableau Électrique",
          description: "Installation et mise aux normes de votre tableau électrique pour votre sécurité.",
          features: ["Normes NF C 15-100", "Disjoncteurs différentiels", "Certificat Consuel"]
        },
        {
          title: "Rénovation Électrique",
          description: "Rénovation complète de votre installation électrique vétuste ou non conforme.",
          features: ["Diagnostic complet", "Câblage neuf", "Mise à la terre"]
        },
        {
          title: "Domotique",
          description: "Transformez votre maison en habitat intelligent avec nos solutions domotiques.",
          features: ["Éclairage connecté", "Volets automatiques", "Pilotage smartphone"]
        },
        {
          title: "Éclairage LED",
          description: "Installation d'éclairage LED pour réduire votre consommation jusqu'à 80%.",
          features: ["Économie d'énergie", "Longue durée", "Design moderne"]
        },
        {
          title: "Borne de Recharge",
          description: "Installation de bornes de recharge pour véhicules électriques à domicile.",
          features: ["Wallbox certifiée", "Installation sécurisée", "Compatible tous véhicules"]
        }
      ]
    },
    testimonials: [
      {
        name: "Pierre Lefevre",
        role: "Chef d'entreprise",
        content: "Installation électrique complète de nos bureaux. Travail impeccable et respect du planning.",
        rating: 5
      },
      {
        name: "Céline Moreau",
        role: "Particulier",
        content: "Mise aux normes de notre maison ancienne. Équipe professionnelle et prix juste.",
        rating: 5
      },
      {
        name: "Thomas Petit",
        role: "Gestionnaire immobilier",
        content: "Partenaire fiable pour tous nos chantiers. Réactivité et qualité au rendez-vous.",
        rating: 5
      }
    ],
    faq: [
      {
        question: "Êtes-vous certifié pour délivrer une attestation Consuel ?",
        answer: "Oui, nous sommes habilités à établir les attestations de conformité Consuel pour vos installations."
      },
      {
        question: "Intervenez-vous sur les pannes électriques urgentes ?",
        answer: "Oui, nous assurons un service d'urgence 24/7 pour toutes les pannes électriques."
      },
      {
        question: "Proposez-vous des contrats de maintenance ?",
        answer: "Oui, nous proposons des contrats de maintenance préventive pour les entreprises et copropriétés."
      },
      {
        question: "Installez-vous des panneaux solaires ?",
        answer: "Oui, nous sommes certifiés RGE pour l'installation de panneaux photovoltaïques."
      }
    ],
    cta: {
      title: "Votre sécurité électrique est notre priorité",
      description: "Faites confiance à des professionnels certifiés pour tous vos travaux électriques",
      button: "Demander un diagnostic",
      button2: "Urgence électrique"
    }
  },

  menuisier: {
    hero: {
      title: "Menuisier Artisan à {ville}",
      subtitle: "Créations sur mesure en bois",
      description: "Artisan menuisier passionné, nous créons et restaurons tous vos projets en bois. Du meuble sur mesure à l'aménagement complet.",
      cta: "Voir nos réalisations",
      cta2: "Demander un devis"
    },
    about: {
      title: "L'art du bois depuis 1998",
      description: "Menuisier de père en fils, nous perpétuons la tradition du travail du bois avec passion et modernité.",
      points: [
        "25 ans d'expérience",
        "Bois certifiés FSC/PEFC",
        "Atelier de 500m²",
        "Conception 3D gratuite"
      ]
    },
    services: {
      title: "Services de Menuiserie",
      subtitle: "Créations uniques et travail artisanal",
      list: [
        {
          title: "Meubles sur Mesure",
          description: "Conception et fabrication de mobilier unique adapté à vos espaces et vos goûts.",
          features: ["Design personnalisé", "Bois nobles", "Finition haute qualité"]
        },
        {
          title: "Pose de Parquet",
          description: "Installation de tous types de parquets : massif, contrecollé, stratifié.",
          features: ["Parquet massif", "Pose flottante/collée", "Ponçage et vitrification"]
        },
        {
          title: "Aménagement Intérieur",
          description: "Dressing, bibliothèques, placards... Optimisez vos espaces avec du sur-mesure.",
          features: ["Dressing complet", "Rangements optimisés", "Éclairage intégré"]
        },
        {
          title: "Escaliers en Bois",
          description: "Création et rénovation d'escaliers en bois, du classique au contemporain.",
          features: ["Sur mesure", "Tous styles", "Rampes et garde-corps"]
        },
        {
          title: "Terrasses Bois",
          description: "Construction de terrasses en bois pour profiter de vos espaces extérieurs.",
          features: ["Bois exotique", "IPÉ/Composite", "Structure garantie 10 ans"]
        },
        {
          title: "Restauration",
          description: "Redonnez vie à vos meubles anciens avec notre service de restauration.",
          features: ["Meubles anciens", "Techniques traditionnelles", "Respect de l'authenticité"]
        }
      ]
    },
    testimonials: [
      {
        name: "Anne Rousseau",
        role: "Architecte d'intérieur",
        content: "Collaboration parfaite sur plusieurs projets. Qualité d'exécution remarquable.",
        rating: 5
      },
      {
        name: "Marc Dubois",
        role: "Particulier",
        content: "Bibliothèque sur mesure magnifique. Le menuisier a su comprendre exactement nos besoins.",
        rating: 5
      },
      {
        name: "Julie Lambert",
        role: "Restaurant",
        content: "Aménagement complet de notre restaurant. Résultat chaleureux et authentique.",
        rating: 5
      }
    ],
    faq: [
      {
        question: "Quels types de bois utilisez-vous ?",
        answer: "Nous travaillons avec des bois certifiés : chêne, hêtre, noyer, ainsi que des bois exotiques FSC."
      },
      {
        question: "Proposez-vous une conception 3D ?",
        answer: "Oui, nous réalisons gratuitement une modélisation 3D de votre projet avant fabrication."
      },
      {
        question: "Quel est le délai pour un meuble sur mesure ?",
        answer: "Comptez 4 à 6 semaines entre la validation du devis et la livraison/installation."
      },
      {
        question: "Garantissez-vous vos réalisations ?",
        answer: "Oui, tous nos meubles sont garantis 5 ans et les structures extérieures 10 ans."
      }
    ],
    cta: {
      title: "Donnons vie à vos projets en bois",
      description: "Confiez-nous la réalisation de vos rêves d'aménagement",
      button: "Prendre rendez-vous",
      button2: "Voir le portfolio"
    }
  },

  paysagiste: {
    hero: {
      title: "Paysagiste Créateur à {ville}",
      subtitle: "Jardins d'exception • Espaces verts",
      description: "Créateurs de jardins et d'espaces verts depuis 20 ans. Conception, aménagement et entretien pour particuliers et professionnels.",
      cta: "Découvrir nos jardins",
      cta2: "Étude gratuite"
    },
    about: {
      title: "Architectes du végétal depuis 2003",
      description: "Paysagistes diplômés, nous créons des espaces verts uniques en harmonie avec votre environnement.",
      points: [
        "Label Jardins d'Excellence",
        "Certification phytosanitaire",
        "300+ jardins créés",
        "Approche éco-responsable"
      ]
    },
    services: {
      title: "Services Paysagers",
      subtitle: "De la conception à l'entretien de vos espaces",
      list: [
        {
          title: "Création de Jardins",
          description: "Conception complète de votre jardin, du plan à la réalisation finale.",
          features: ["Plan 3D offert", "Choix des végétaux", "Suivi de croissance"]
        },
        {
          title: "Entretien Espaces Verts",
          description: "Entretien régulier de vos jardins : tonte, taille, désherbage, traitements.",
          features: ["Contrat annuel", "Planning adapté", "Produits bio"]
        },
        {
          title: "Élagage & Abattage",
          description: "Élagage professionnel et abattage sécurisé avec évacuation des déchets.",
          features: ["Nacelle 25m", "Assurance complète", "Évacuation déchets"]
        },
        {
          title: "Arrosage Automatique",
          description: "Installation de systèmes d'irrigation automatique économes en eau.",
          features: ["Programmation smart", "Capteurs pluie", "Économie 40% d'eau"]
        },
        {
          title: "Terrasses & Allées",
          description: "Création de terrasses, allées et chemins en matériaux naturels.",
          features: ["Pierre naturelle", "Bois/Composite", "Éclairage intégré"]
        },
        {
          title: "Clôtures Végétales",
          description: "Installation de haies, clôtures végétales et brise-vues naturels.",
          features: ["Haies variées", "Croissance rapide", "Entretien inclus"]
        }
      ]
    },
    testimonials: [
      {
        name: "François Girard",
        role: "Villa privée",
        content: "Transformation complète de notre jardin. Un véritable havre de paix créé avec talent.",
        rating: 5
      },
      {
        name: "Sylvie Mercier",
        role: "Copropriété",
        content: "Entretien impeccable de nos espaces verts depuis 5 ans. Équipe professionnelle.",
        rating: 5
      },
      {
        name: "David Laurent",
        role: "Entreprise",
        content: "Aménagement paysager de nos bureaux. Résultat moderne et apaisant.",
        rating: 5
      }
    ],
    faq: [
      {
        question: "Proposez-vous des contrats d'entretien annuels ?",
        answer: "Oui, nous proposons des contrats adaptés à vos besoins avec visites programmées."
      },
      {
        question: "Utilisez-vous des produits biologiques ?",
        answer: "Oui, nous privilégions les solutions biologiques et les techniques de jardinage écologique."
      },
      {
        question: "Réalisez-vous des jardins sur petites surfaces ?",
        answer: "Bien sûr ! Nous créons des jardins de toutes tailles, même sur balcons et terrasses."
      },
      {
        question: "Quelle est la meilleure période pour créer un jardin ?",
        answer: "L'automne et le printemps sont idéaux, mais nous pouvons intervenir toute l'année."
      }
    ],
    cta: {
      title: "Créons ensemble votre jardin de rêve",
      description: "Étude personnalisée gratuite pour votre projet paysager",
      button: "Demander une étude",
      button2: "Voir nos créations"
    }
  }
};

// ===================================================
// NETTOYEUR DE CONTENU
// ===================================================

class ContentCleaner {
  constructor(metier, templatePath, options = {}) {
    this.metier = metier;
    this.templatePath = templatePath;
    this.contenu = CONTENU_METIERS[metier];
    this.options = {
      ville: options.ville || 'Paris',
      nomEntreprise: options.nomEntreprise || 'Dupont',
      telephone: options.telephone || '01 23 45 67 89',
      ...options
    };

    if (!this.contenu) {
      throw new Error(`Métier inconnu: ${metier}. Disponibles: ${Object.keys(CONTENU_METIERS).join(', ')}`);
    }
  }

  /**
   * Nettoie et remplace tout le contenu Lorem Ipsum
   */
  async cleanAll() {
    console.log(`🧹 Nettoyage du contenu pour ${this.metier}...`);

    // 1. Nettoyer la homepage
    await this.cleanHomepage();

    // 2. Nettoyer les services
    await this.cleanServices();

    // 3. Nettoyer la page about
    await this.cleanAbout();

    // 4. Nettoyer les FAQs
    await this.cleanFAQ();

    // 5. Nettoyer les témoignages
    await this.cleanTestimonials();

    console.log('✅ Contenu nettoyé et remplacé !');
  }

  /**
   * Nettoie le contenu de la homepage
   */
  async cleanHomepage() {
    const homepagePath = path.join(this.templatePath, 'src/content/homepage/-index.md');
    if (!fs.existsSync(homepagePath)) return;

    let content = fs.readFileSync(homepagePath, 'utf8');

    // Remplacer les placeholders
    const hero = this.contenu.hero;
    content = content
      .replace(/Lorem ipsum.{0,200}/gi, hero.description)
      .replace(/Interior Design/gi, this.contenu.services.title)
      .replace(/{ville}/g, this.options.ville)
      .replace(/{nomEntreprise}/g, this.options.nomEntreprise);

    // Remplacer dans le front matter YAML
    const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
    const frontMatterMatch = content.match(frontMatterRegex);

    if (frontMatterMatch) {
      let frontMatter = frontMatterMatch[1];

      // Mettre à jour le hero
      frontMatter = frontMatter.replace(
        /title:\s*"[^"]*"/,
        `title: "${hero.title.replace('{ville}', this.options.ville)}"`
      );
      frontMatter = frontMatter.replace(
        /subtitle:\s*"[^"]*"/,
        `subtitle: "${hero.subtitle}"`
      );
      frontMatter = frontMatter.replace(
        /description:\s*"[^"]*"/,
        `description: "${hero.description}"`
      );

      content = content.replace(frontMatterRegex, `---\n${frontMatter}\n---`);
    }

    fs.writeFileSync(homepagePath, content);
    console.log('  ✓ Homepage nettoyée');
  }

  /**
   * Nettoie les services
   */
  async cleanServices() {
    const servicesPath = path.join(this.templatePath, 'src/content/services');
    if (!fs.existsSync(servicesPath)) return;

    this.contenu.services.list.forEach((service, index) => {
      const serviceFile = path.join(servicesPath, `service-${index + 1}.md`);
      if (fs.existsSync(serviceFile)) {
        const content = `---
title: "${service.title}"
description: "${service.description}"
image: "/images/service-${index + 1}.jpg"
date: 2025-01-24T05:00:00Z
draft: false
---

${service.description}

## Nos garanties

${service.features.map(f => `- ✅ ${f}`).join('\n')}

## Pourquoi nous choisir ?

Notre équipe de professionnels qualifiés intervient rapidement avec :
- Un devis gratuit et transparent
- Une garantie sur tous nos travaux
- Des tarifs compétitifs
- Un service client disponible 7j/7

**Contactez-nous dès maintenant au ${this.options.telephone}**
`;
        fs.writeFileSync(serviceFile, content);
      }
    });

    console.log('  ✓ Services nettoyés');
  }

  /**
   * Nettoie la page About
   */
  async cleanAbout() {
    const aboutPath = path.join(this.templatePath, 'src/content/about/-index.md');
    if (!fs.existsSync(aboutPath)) return;

    const about = this.contenu.about;
    const content = `---
title: "À propos"
meta_title: "À propos de ${this.options.nomEntreprise}"
description: "${about.description}"
draft: false
---

## ${about.title}

${about.description}

### Nos engagements

${about.points.map(p => `- **${p}**`).join('\n')}

### Notre équipe

Une équipe de professionnels passionnés et certifiés, toujours à votre écoute pour vous apporter les meilleures solutions.

### Nos valeurs

- **Professionnalisme** : Un travail soigné dans le respect des normes
- **Transparence** : Des devis clairs et sans surprises
- **Proximité** : Une relation de confiance avec nos clients
- **Innovation** : Les dernières techniques et équipements

**${this.options.nomEntreprise}** - Votre partenaire de confiance à ${this.options.ville}
`;

    fs.writeFileSync(aboutPath, content);
    console.log('  ✓ Page About nettoyée');
  }

  /**
   * Nettoie les FAQs
   */
  async cleanFAQ() {
    const faqPath = path.join(this.templatePath, 'src/content/faqs/-index.md');
    if (!fs.existsSync(faqPath)) return;

    const content = `---
title: "Questions Fréquentes"
description: "Réponses aux questions les plus posées"
draft: false
list:
${this.contenu.faq.map(faq => `  - question: "${faq.question}"
    answer: "${faq.answer}"`).join('\n')}
---

## Vous avez d'autres questions ?

N'hésitez pas à nous contacter au **${this.options.telephone}** ou par email.
`;

    fs.writeFileSync(faqPath, content);
    console.log('  ✓ FAQ nettoyée');
  }

  /**
   * Nettoie les témoignages
   */
  async cleanTestimonials() {
    const reviewsPath = path.join(this.templatePath, 'src/content/reviews/-index.md');
    if (!fs.existsSync(reviewsPath)) return;

    const testimonials = this.contenu.testimonials.map(t => ({
      name: t.name,
      role: t.role,
      rating: t.rating,
      comment: t.content
    }));

    const content = `---
title: "Témoignages Clients"
description: "Ce que nos clients disent de nous"
draft: false
testimonials:
${testimonials.map(t => `  - name: "${t.name}"
    designation: "${t.role}"
    rating: ${t.rating}
    content: "${t.comment}"`).join('\n')}
---

## Ils nous font confiance

Plus de 1000 clients satisfaits nous ont fait confiance. Rejoignez-les !
`;

    fs.writeFileSync(reviewsPath, content);
    console.log('  ✓ Témoignages nettoyés');
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
🧹 NETTOYEUR DE CONTENU PROFESSIONNEL
=====================================

Usage: node content-cleaner.cjs --metier=plombier --path=/chemin --ville=Lyon --nom=Martin

Options:
  --metier : ${Object.keys(CONTENU_METIERS).join(', ')} (REQUIS)
  --path   : Chemin vers le template (défaut: dossier actuel)
  --ville  : Ville de l'entreprise
  --nom    : Nom de l'entreprise

Exemples:
  node content-cleaner.cjs --metier=plombier --ville=Lyon --nom=AquaPro
  node content-cleaner.cjs --metier=electricien --path=/template --ville=Paris

Ce script remplace :
  ✅ Tout le Lorem Ipsum
  ✅ Les textes génériques
  ✅ Les services par des vrais services
  ✅ Les témoignages par des vrais avis
  ✅ Les FAQ par des questions pertinentes
`);
    process.exit(0);
  }

  const cleaner = new ContentCleaner(
    options.metier,
    options.path || process.cwd(),
    {
      ville: options.ville,
      nomEntreprise: options.nom,
      telephone: options.telephone
    }
  );

  cleaner.cleanAll().catch(console.error);
}

module.exports = { ContentCleaner, CONTENU_METIERS };
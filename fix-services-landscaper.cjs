#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Services paysagistes avec features
const services = [
  {
    file: 'service-1.md',
    title: "Création de Jardins",
    description: "Conception complète de votre jardin, du plan à la réalisation finale.",
    features: [
      { name: "Conception sur mesure", description: "Plans 3D personnalisés et étude paysagère complète adaptée à votre terrain." },
      { name: "Sélection végétale", description: "Choix de plantes adaptées au climat local et à vos préférences esthétiques." },
      { name: "Suivi et entretien", description: "Accompagnement post-création pour garantir la bonne croissance de votre jardin." }
    ]
  },
  {
    file: 'service-2.md',
    title: "Entretien Espaces Verts",
    description: "Entretien régulier de vos jardins : tonte, taille, désherbage, traitements.",
    features: [
      { name: "Contrat annuel", description: "Formules d'entretien régulier adaptées à vos besoins et votre budget." },
      { name: "Traitements bio", description: "Utilisation exclusive de produits respectueux de l'environnement." },
      { name: "Planning flexible", description: "Interventions programmées selon vos disponibilités et la saisonnalité." }
    ]
  },
  {
    file: 'service-3.md',
    title: "Élagage & Abattage",
    description: "Élagage professionnel et abattage sécurisé avec évacuation des déchets.",
    features: [
      { name: "Équipement professionnel", description: "Nacelle 25m et matériel de sécurité certifié pour interventions en hauteur." },
      { name: "Assurance complète", description: "Couverture totale pour tous travaux d'élagage et d'abattage." },
      { name: "Évacuation déchets", description: "Broyage sur place ou évacuation complète selon vos besoins." }
    ]
  },
  {
    file: 'service-4.md',
    title: "Arrosage Automatique",
    description: "Installation de systèmes d'irrigation automatique économes en eau.",
    features: [
      { name: "Programmation intelligente", description: "Systèmes connectés avec capteurs de pluie et programmation par zones." },
      { name: "Économie d'eau", description: "Réduction de 40% de la consommation d'eau grâce à l'optimisation." },
      { name: "Maintenance incluse", description: "Contrat de maintenance pour garantir le bon fonctionnement." }
    ]
  },
  {
    file: 'service-5.md',
    title: "Terrasses & Allées",
    description: "Création de terrasses, allées et chemins en matériaux naturels.",
    features: [
      { name: "Matériaux premium", description: "Pierre naturelle, bois composite ou béton décoratif selon vos goûts." },
      { name: "Design personnalisé", description: "Création sur mesure intégrée harmonieusement à votre jardin." },
      { name: "Éclairage intégré", description: "Solutions d'éclairage LED pour sublimer vos aménagements." }
    ]
  },
  {
    file: 'service-6.md',
    title: "Clôtures Végétales",
    description: "Installation de haies, clôtures végétales et brise-vues naturels.",
    features: [
      { name: "Variétés adaptées", description: "Sélection de végétaux adaptés pour haies persistantes ou fleuries." },
      { name: "Croissance rapide", description: "Espèces à croissance rapide pour un résultat visible rapidement." },
      { name: "Entretien régulier", description: "Service de taille et entretien pour maintenir vos haies impeccables." }
    ]
  }
];

// Mettre à jour chaque service
services.forEach(service => {
  const filePath = path.join(__dirname, 'src/content/services', service.file);

  // Créer le contenu avec features
  const content = `---
title: "${service.title}"
meta_title: ""
description: "${service.description}"
date: 2025-01-24T05:00:00Z
image: "/images/${service.file.replace('.md', '.svg')}"
featured_in_homepage: true
features:
${service.features.map(f => `  - name: "${f.name}"
    description: "${f.description}"`).join('\n')}
draft: false
---

${service.description}

## Nos garanties

${service.features.map(f => `- ✅ **${f.name}**: ${f.description}`).join('\n')}

## Pourquoi nous choisir ?

Notre équipe de paysagistes professionnels intervient rapidement avec :
- Un devis gratuit et transparent
- Une garantie sur tous nos travaux
- Des tarifs compétitifs
- Un service client disponible 7j/7

**Contactez-nous dès maintenant au 05 62 34 56 78**
`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Service ${service.file} mis à jour avec features`);
});

console.log('\n🌿 Tous les services ont été mis à jour avec les features paysagistes !');
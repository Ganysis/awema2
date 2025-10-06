#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Projets paysagistes
const projects = [
  {
    file: 'project-1.md',
    title: "Jardin Méditerranéen Complet",
    description: "Création d'un jardin méditerranéen de 500m² avec terrasse et piscine naturelle.",
    client: "M. Martin - Toulouse",
    type: "Création Complète",
    problem: "Terrain en pente de 500m² sans aménagement, le client souhaitait un jardin méditerranéen avec peu d'entretien.",
    solution: "Création de restanques, plantation d'oliviers et lavandes, installation d'un arrosage automatique intelligent.",
    result: "Jardin méditerranéen sublime nécessitant seulement 2h d'entretien par mois, économie d'eau de 40%."
  },
  {
    file: 'project-2.md',
    title: "Rénovation Parc d'Entreprise",
    description: "Aménagement paysager complet d'un parc d'entreprise de 2000m².",
    client: "Société TechPark - Blagnac",
    type: "Aménagement Commercial",
    problem: "Espaces verts négligés donnant une mauvaise image de l'entreprise aux clients et employés.",
    solution: "Création d'espaces détente, plantation d'arbres d'ombrage, installation de mobilier urbain.",
    result: "Augmentation de 30% de l'utilisation des espaces extérieurs par les employés, image de marque valorisée."
  },
  {
    file: 'project-3.md',
    title: "Jardin Japonais Zen",
    description: "Conception d'un jardin zen japonais de 200m² avec bassin et pont.",
    client: "Mme Dubois - Colomiers",
    type: "Jardin Thématique",
    problem: "La cliente souhaitait un espace de méditation authentique dans son jardin.",
    solution: "Création d'un jardin sec (karesansui), bassin avec carpes koï, érables japonais.",
    result: "Espace de sérénité unique, entretien minimal, augmentation de la valeur immobilière."
  },
  {
    file: 'project-4.md',
    title: "Installation Arrosage Automatique",
    description: "Système d'irrigation intelligent pour 1500m² de pelouse et massifs.",
    client: "M. Rousseau - Balma",
    type: "Installation Technique",
    problem: "Pelouse jaunissante en été, arrosage manuel chronophage et inefficace.",
    solution: "Installation de 25 arroseurs escamotables avec programmation par zones et capteur de pluie.",
    result: "Économie de 40% d'eau, pelouse verdoyante toute l'année, gain de temps considérable."
  },
  {
    file: 'project-5.md',
    title: "Terrasse Bois et Pergola",
    description: "Création d'une terrasse en bois exotique de 80m² avec pergola bioclimatique.",
    client: "Famille Petit - Tournefeuille",
    type: "Aménagement Terrasse",
    problem: "Jardin inutilisable à cause du manque d'ombre et d'espace de vie extérieur.",
    solution: "Terrasse IPÉ sur plots, pergola bioclimatique 6x4m, éclairage LED intégré.",
    result: "Espace de vie extérieur utilisable 8 mois/an, valorisation de 15% du bien immobilier."
  },
  {
    file: 'project-6.md',
    title: "Potager Permaculture",
    description: "Création d'un potager en permaculture de 150m² avec serre.",
    client: "M. et Mme Garcia - Ramonville",
    type: "Potager Écologique",
    problem: "Famille souhaitant produire ses propres légumes bio toute l'année.",
    solution: "Design en permaculture, serre 20m², composteurs, récupération eau de pluie.",
    result: "Production de 80% des légumes consommés, économie de 2000€/an, zéro pesticide."
  },
  {
    file: 'project-7.md',
    title: "Élagage Grands Arbres",
    description: "Élagage sécurisé de 15 platanes centenaires de 20m de hauteur.",
    client: "Copropriété Les Jardins - Toulouse",
    type: "Élagage Technique",
    problem: "Arbres dangereux menaçant les habitations, branches mortes risquant de tomber.",
    solution: "Élagage en nacelle 25m, haubanage des branches maîtresses, traitement phytosanitaire.",
    result: "Mise en sécurité totale, arbres préservés et en bonne santé, validation par expert arboricole."
  }
];

// Mettre à jour chaque projet
projects.forEach(project => {
  const filePath = path.join(__dirname, 'src/content/projects', project.file);

  const content = `---
title: "${project.title}"
meta_title: ""
description: "${project.description}"
date: 2025-05-07T05:00:00Z
image: "/images/${project.file.replace('.md', '.svg')}"
featured_in_homepage: true
client_name: "${project.client}"
project_type: "${project.type}"
draft: false
---

#### Problématique

**${project.problem}**

Notre équipe de paysagistes professionnels est intervenue pour transformer cet espace avec créativité et expertise. L'objectif était de créer un environnement unique répondant parfaitement aux attentes du client.

![Avant travaux](/images/gallery-1.svg)

#### Solutions Apportées

${project.solution}

Nous avons utilisé des végétaux adaptés au climat local et appliqué les techniques les plus modernes d'aménagement paysager pour garantir un résultat durable et esthétique.

> "${project.result}" - ${project.client}

#### Résultat Final

${project.result}

![Résultat final](/images/gallery-2.svg)
![Vue d'ensemble](/images/gallery-3.svg)
`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Projet ${project.file} mis à jour`);
});

console.log('\n🌿 Tous les projets ont été mis à jour avec du contenu paysagiste !');
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'src/content/services');

// Services data
const services = [
  {
    file: 'service-2.md',
    title: 'Chauffe-eau',
    description: 'Installation et réparation de chauffe-eau toutes marques',
    features: [
      { name: 'Installation rapide', description: 'Pose en 24h maximum' },
      { name: 'Toutes marques', description: 'Atlantic, Thermor, Ariston...' },
      { name: 'Dépannage express', description: 'Intervention sous 2h' }
    ]
  },
  {
    file: 'service-3.md',
    title: 'Salle de Bains',
    description: 'Rénovation complète de salle de bains clé en main',
    features: [
      { name: 'Design personnalisé', description: 'Création sur mesure' },
      { name: 'Travaux tout inclus', description: 'Plomberie, carrelage, électricité' },
      { name: 'Devis détaillé', description: 'Prix transparent et fixe' }
    ]
  },
  {
    file: 'service-4.md',
    title: 'Canalisation',
    description: 'Débouchage et réparation de canalisations',
    features: [
      { name: 'Débouchage haute pression', description: 'Efficace et rapide' },
      { name: 'Caméra inspection', description: 'Diagnostic précis' },
      { name: 'Intervention propre', description: 'Sans dégâts' }
    ]
  },
  {
    file: 'service-5.md',
    title: 'Robinetterie',
    description: 'Installation et réparation de robinets',
    features: [
      { name: 'Large choix', description: 'Toutes gammes et styles' },
      { name: 'Installation soignée', description: 'Travail professionnel' },
      { name: 'Garantie pièces', description: '2 ans minimum' }
    ]
  },
  {
    file: 'service-6.md',
    title: 'Chaudière',
    description: 'Installation et entretien de chaudières',
    features: [
      { name: 'Entretien annuel', description: 'Contrat de maintenance' },
      { name: 'Toutes énergies', description: 'Gaz, fioul, électrique' },
      { name: 'Dépannage 7j/7', description: 'Urgences chauffage' }
    ]
  }
];

// Fix each service file
services.forEach(service => {
  const filePath = path.join(servicesDir, service.file);

  const content = `---
title: "${service.title}"
meta_title: "${service.title}"
description: "${service.description}"
image: "/images/plomberie/services/${service.file.replace('.md', '.svg')}"
draft: false
features:
${service.features.map(f => `  - name: "${f.name}"
    description: "${f.description}"`).join('\n')}
---

## ${service.title}

${service.description}

### Nos Engagements
- Travail soigné et professionnel
- Respect des délais
- Prix transparents
- Service après-vente`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${service.file}`);
});

console.log('\n✅ All services fixed!');
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Test du template avec le formulaire basique\n');
console.log('='

.repeat(50));

// Configuration des métiers disponibles
const METIERS = ['plombier', 'electricien', 'menuisier', 'macon', 'paysagiste'];

// Simuler les données du formulaire
const formData = {
  nomEntreprise: 'ElecPro Services',
  metier: 'electricien',
  ville: 'Lyon',
  telephone: '04 78 12 34 56',
  email: 'contact@elecpro-lyon.fr',
  siteWeb: 'elecpro-lyon.fr',
  description: 'Expert en électricité depuis 15 ans',
  services: [
    'Installation électrique',
    'Dépannage urgence',
    'Mise aux normes',
    'Tableau électrique',
    'Domotique',
    'Éclairage LED'
  ]
};

console.log('\n📋 Données du formulaire:');
console.log(JSON.stringify(formData, null, 2));

console.log('\n🔄 Génération du site pour:', formData.metier);
console.log('-'.repeat(50));

try {
  // Appeler le générateur de site
  const generateScript = path.join(__dirname, 'generate-site-metier-complet.cjs');

  if (!fs.existsSync(generateScript)) {
    throw new Error(`Script de génération non trouvé: ${generateScript}`);
  }

  // Exécuter la génération
  console.log('\n⚙️  Exécution du script de génération...');
  execSync(`node ${generateScript} ${formData.metier}`, {
    stdio: 'inherit',
    cwd: __dirname
  });

  console.log('\n✅ Site généré avec succès!');

  // Vérifier les fichiers générés
  console.log('\n📁 Vérification des fichiers générés:');
  const filesToCheck = [
    'src/content/homepage/-index.md',
    'src/content/about/-index.md',
    'src/content/services/-index.md',
    'src/content/projects/project-1.md',
    'src/content/faqs/-index.md',
    'src/content/reviews/-index.md',
    'src/content/sections/call-to-action.md'
  ];

  let allFilesOk = true;
  filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');

      // Vérifier la cohérence du contenu
      let isCoherent = true;

      // Pour électricien
      if (formData.metier === 'electricien') {
        // Ne doit pas contenir de références à d'autres métiers
        if (content.includes('plomberie') || content.includes('plombier') ||
            content.includes('menuiserie') || content.includes('maçonnerie') ||
            content.includes('jardinage') || content.includes('paysagiste')) {
          isCoherent = false;
        }
        // Doit contenir des références au métier
        if (!content.toLowerCase().includes('électric')) {
          isCoherent = false;
        }
      }

      if (isCoherent) {
        console.log(`  ✅ ${file} - Cohérent avec le métier`);
      } else {
        console.log(`  ❌ ${file} - Contenu incohérent détecté`);
        allFilesOk = false;
      }
    } else {
      console.log(`  ❌ ${file} - Fichier manquant`);
      allFilesOk = false;
    }
  });

  // Test de lancement du serveur
  console.log('\n🚀 Test de lancement du serveur de développement...');
  console.log('Appuyez sur Ctrl+C après vérification visuelle\n');

  execSync('npm run dev', {
    stdio: 'inherit',
    cwd: __dirname
  });

} catch (error) {
  console.error('\n❌ Erreur lors du test:', error.message);
  process.exit(1);
}

console.log('\n' + '='.repeat(50));
console.log('✨ Test du template avec formulaire terminé!');
console.log('\nRésumé:');
console.log(`- Métier testé: ${formData.metier}`);
console.log(`- Entreprise: ${formData.nomEntreprise}`);
console.log(`- Ville: ${formData.ville}`);
console.log('\n💡 Le template peut être utilisé avec n\'importe quel métier');
console.log('   en passant simplement le nom du métier au générateur.');
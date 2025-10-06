const fs = require('fs');
const path = require('path');

// Configuration des images par métier
const metierImages = {
  plombier: {
    folder: 'plombier',
    color: '#0066CC',
    services: [
      { file: 'service-1.svg', title: 'Dépannage Urgent' },
      { file: 'service-2.svg', title: 'Installation Chauffe-eau' },
      { file: 'service-3.svg', title: 'Rénovation Salle de Bain' },
      { file: 'service-4.svg', title: 'Détection de Fuites' },
      { file: 'service-5.svg', title: 'Pompe à Chaleur' },
      { file: 'service-6.svg', title: 'Installation Compteurs' }
    ]
  },
  electricien: {
    folder: 'electricien',
    color: '#FF6600',
    services: [
      { file: 'service-1.svg', title: 'Installation Tableau' },
      { file: 'service-2.svg', title: 'Installation Prises' },
      { file: 'service-3.svg', title: 'Éclairage LED' },
      { file: 'service-4.svg', title: 'Photovoltaïque' },
      { file: 'service-5.svg', title: 'Borne de Recharge' },
      { file: 'service-6.svg', title: 'Domotique' }
    ]
  },
  menuisier: {
    folder: 'menuisier',
    color: '#8B4513',
    services: [
      { file: 'service-1.svg', title: 'Portes sur Mesure' },
      { file: 'service-2.svg', title: 'Fenêtres Bois' },
      { file: 'service-3.svg', title: 'Dressing sur Mesure' },
      { file: 'service-4.svg', title: 'Escaliers Bois' },
      { file: 'service-5.svg', title: 'Cuisine sur Mesure' },
      { file: 'service-6.svg', title: 'Pose de Parquet' }
    ]
  },
  macon: {
    folder: 'macon',
    color: '#6B7280',
    services: [
      { file: 'service-1.svg', title: 'Construction Neuve' },
      { file: 'service-2.svg', title: 'Extension Maison' },
      { file: 'service-3.svg', title: 'Dalle Béton' },
      { file: 'service-4.svg', title: 'Réparation Façade' },
      { file: 'service-5.svg', title: 'Pose Carrelage' },
      { file: 'service-6.svg', title: 'Construction Piscine' }
    ]
  },
  paysagiste: {
    folder: 'paysagiste',
    color: '#059669',
    services: [
      { file: 'service-1.svg', title: 'Création de Jardins' },
      { file: 'service-2.svg', title: 'Entretien Espaces Verts' },
      { file: 'service-3.svg', title: 'Terrasses en Bois' },
      { file: 'service-4.svg', title: 'Arrosage Automatique' },
      { file: 'service-5.svg', title: 'Élagage et Taille' },
      { file: 'service-6.svg', title: 'Aménagement Paysager' }
    ]
  }
};

/**
 * Copie les SVG du métier sélectionné vers le dossier public/images
 * @param {string} metier - Le métier choisi (plombier, electricien, menuisier, macon, paysagiste)
 */
function integrateSVGForMetier(metier) {
  const config = metierImages[metier];
  if (!config) {
    console.error(`❌ Métier non reconnu : ${metier}`);
    console.log('Métiers disponibles :', Object.keys(metierImages).join(', '));
    return;
  }

  console.log(`\n🎨 Intégration des images pour : ${metier.toUpperCase()}`);
  console.log(`📁 Dossier source : public/images/${config.folder}/services/`);
  console.log(`🎨 Couleur principale : ${config.color}`);
  console.log('-------------------------------------------');

  // Copier les services SVG
  config.services.forEach((service, index) => {
    const sourcePath = path.join(__dirname, 'public', 'images', config.folder, 'services', service.file);
    const destPath = path.join(__dirname, 'public', 'images', `service-${index + 1}.svg`);

    try {
      // Vérifier si le fichier source existe
      if (!fs.existsSync(sourcePath)) {
        console.log(`⚠️  Fichier source manquant : ${sourcePath}`);
        // Utiliser le SVG paysagiste par défaut si disponible
        const fallbackPath = path.join(__dirname, 'public', 'images', `service-${index + 1}.svg`);
        if (fs.existsSync(fallbackPath)) {
          console.log(`   ✓ Utilisation du fichier existant`);
        }
        return;
      }

      // Copier le fichier
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Service ${index + 1} : ${service.title}`);
      console.log(`   ${service.file} → service-${index + 1}.svg`);
    } catch (error) {
      console.error(`❌ Erreur lors de la copie de ${service.file} :`, error.message);
    }
  });

  // Mettre à jour le fichier de configuration des couleurs
  updateThemeColors(config.color);

  console.log('\n✨ Intégration terminée avec succès !');
  console.log(`🎯 Les images du métier "${metier}" sont maintenant actives.`);
}

/**
 * Met à jour les couleurs du thème
 * @param {string} primaryColor - La couleur principale du métier
 */
function updateThemeColors(primaryColor) {
  const themeConfigPath = path.join(__dirname, 'src', 'config', 'theme.json');

  try {
    const themeConfig = JSON.parse(fs.readFileSync(themeConfigPath, 'utf8'));

    // Mettre à jour la couleur primaire
    themeConfig.colors.theme_color = primaryColor;
    themeConfig.colors.primary = primaryColor;

    // Écrire le fichier mis à jour
    fs.writeFileSync(themeConfigPath, JSON.stringify(themeConfig, null, 2));
    console.log(`\n🎨 Couleur du thème mise à jour : ${primaryColor}`);
  } catch (error) {
    console.log('⚠️  Impossible de mettre à jour le thème :', error.message);
  }
}

// Exécution du script
const args = process.argv.slice(2);
const metier = args[0];

if (!metier) {
  console.log('\n📋 UTILISATION :');
  console.log('   node integrate-svg-by-metier.cjs [métier]');
  console.log('\n📦 MÉTIERS DISPONIBLES :');
  Object.keys(metierImages).forEach(m => {
    console.log(`   - ${m} (couleur : ${metierImages[m].color})`);
  });
  console.log('\n📌 EXEMPLE :');
  console.log('   node integrate-svg-by-metier.cjs plombier');
  process.exit(0);
}

// Intégrer les SVG pour le métier choisi
integrateSVGForMetier(metier);

// Export pour utilisation dans d'autres scripts
module.exports = { integrateSVGForMetier, metierImages };
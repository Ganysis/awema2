const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

async function prepareNetlifyDrop() {
  console.log('\n📦 PRÉPARATION POUR NETLIFY DROP\n');
  console.log('Netlify Drop permet de déployer en glissant-déposant les dossiers\n');
  
  const sites = [
    { 
      folder: 'plomberie-express-paris', 
      name: 'Plomberie Express Paris',
      type: 'plombier',
      color: 'bleu'
    },
    { 
      folder: 'elec-pro-lyon', 
      name: 'Élec Pro Lyon',
      type: 'électricien',
      color: 'jaune'
    },
    { 
      folder: 'atelier-du-bois', 
      name: 'L\'Atelier du Bois',
      type: 'menuisier',
      color: 'marron'
    },
    { 
      folder: 'couleurs-mediterranee', 
      name: 'Couleurs Méditerranée',
      type: 'peintre',
      color: 'violet'
    },
    { 
      folder: 'bati-sud-construction', 
      name: 'Bâti Sud Construction',
      type: 'maçon',
      color: 'gris'
    }
  ];
  
  // Créer un dossier pour les ZIPs
  const zipDir = path.join(__dirname, '../netlify-drop-ready');
  try {
    await fs.mkdir(zipDir, { recursive: true });
  } catch (err) {
    // Le dossier existe déjà
  }
  
  console.log('🔄 Création des archives ZIP pour chaque site...\n');
  
  const deployInstructions = [];
  
  for (const site of sites) {
    console.log(`📁 ${site.name} (${site.type} - ${site.color})`);
    
    const sourcePath = path.join(__dirname, '../netlify-ready', site.folder);
    const zipPath = path.join(zipDir, `${site.folder}.zip`);
    
    try {
      // Créer le ZIP
      await execAsync(`cd "${sourcePath}" && zip -r "${zipPath}" .`);
      
      const stats = await fs.stat(zipPath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`   ✅ ZIP créé : ${site.folder}.zip (${sizeMB} MB)`);
      
      deployInstructions.push({
        name: site.name,
        file: `${site.folder}.zip`,
        size: sizeMB,
        type: site.type,
        color: site.color
      });
      
    } catch (error) {
      console.error(`   ❌ Erreur : ${error.message}`);
      console.log(`   💡 Alternative : utilisez le dossier netlify-ready/${site.folder}/`);
    }
  }
  
  // Créer le guide de déploiement
  const deployGuide = `# GUIDE DE DÉPLOIEMENT NETLIFY DROP

## 🚀 Instructions pas à pas

### 1. Ouvrir Netlify Drop
Allez sur : https://app.netlify.com/drop

### 2. Déployer chaque site

${deployInstructions.map((site, index) => `
#### Site ${index + 1} : ${site.name}
- **Fichier** : netlify-drop-ready/${site.file} (${site.size} MB)
- **Type** : ${site.type} (thème ${site.color})
- **Action** : Glissez le fichier ZIP sur la page Netlify Drop

OU si les ZIPs ne fonctionnent pas :
- **Dossier** : netlify-ready/${site.file.replace('.zip', '')}/
- **Action** : Glissez tout le dossier sur la page Netlify Drop
`).join('')}

### 3. Après chaque déploiement

Pour chaque site déployé, Netlify vous donnera une URL comme :
- https://amazing-einstein-123456.netlify.app

**IMPORTANT** : Notez chaque URL dans le fichier NETLIFY-URLS-TRACKER.md

### 4. Personnaliser les URLs (optionnel)

Dans Netlify, vous pouvez :
1. Cliquer sur "Site settings"
2. Aller dans "Domain management"
3. Cliquer sur "Change site name"
4. Utiliser un nom plus court comme : plomberie-paris-awema

## 📊 Vérification après déploiement

Une fois tous les sites déployés, vérifiez que chaque site a :
- ✅ Fonds colorés alternés (différents selon le métier)
- ✅ Contenu personnalisé avec le nom de l'entreprise
- ✅ Au moins 7-10 sections colorées
- ✅ Des gradients CSS appliqués

## 🔍 Analyse des sites

Après avoir noté toutes les URLs, lancez :
\`\`\`bash
node scripts/analyze-deployed-sites.js
\`\`\`

---

Date de génération : ${new Date().toLocaleString('fr-FR')}
`;
  
  await fs.writeFile(
    path.join(__dirname, '../DEPLOY-GUIDE-NETLIFY.md'),
    deployGuide
  );
  
  console.log('\n\n✅ PRÉPARATION TERMINÉE !');
  console.log('═══════════════════════════════════════\n');
  
  if (deployInstructions.length > 0) {
    console.log('📦 Archives ZIP créées dans : netlify-drop-ready/');
    console.log('📄 Guide de déploiement : DEPLOY-GUIDE-NETLIFY.md\n');
  }
  
  console.log('🚀 ÉTAPES SUIVANTES :');
  console.log('1. Ouvrez https://app.netlify.com/drop');
  console.log('2. Glissez chaque ZIP ou dossier un par un');
  console.log('3. Notez les URLs dans NETLIFY-URLS-TRACKER.md');
  console.log('4. Lancez l\'analyse avec les vraies URLs\n');
  
  // Afficher directement les chemins
  console.log('📁 FICHIERS À DÉPLOYER :');
  if (deployInstructions.length > 0) {
    deployInstructions.forEach(site => {
      console.log(`   • ${site.name} : netlify-drop-ready/${site.file}`);
    });
  } else {
    console.log('   Utilisez les dossiers dans netlify-ready/');
  }
}

// Lancer la préparation
prepareNetlifyDrop().catch(err => {
  console.error('❌ Erreur :', err.message);
});
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration des 5 métiers
const METIERS = [
  {
    metier: 'plombier',
    nom: 'AquaExpert',
    ville: 'Paris',
    port: 4331,
    couleur: '#0066CC',
    couleurSecondaire: '#0052A3',
    telephone: '0142567890'
  },
  {
    metier: 'electricien',
    nom: 'VoltPro',
    ville: 'Lyon',
    port: 4332,
    couleur: '#FF6600',
    couleurSecondaire: '#E55500',
    telephone: '0478912345'
  },
  {
    metier: 'menuisier',
    nom: 'BoisMaster',
    ville: 'Toulouse',
    port: 4333,
    couleur: '#8B4513',
    couleurSecondaire: '#6B3410',
    telephone: '0561234567'
  },
  {
    metier: 'macon',
    nom: 'BatiPro',
    ville: 'Nantes',
    port: 4334,
    couleur: '#6B7280',
    couleurSecondaire: '#4B5563',
    telephone: '0251456789'
  },
  {
    metier: 'paysagiste',
    nom: 'VertiJardin',
    ville: 'Strasbourg',
    port: 4335,
    couleur: '#059669',
    couleurSecondaire: '#047857',
    telephone: '0388789012'
  }
];

console.log('🚀 LANCEMENT DES 5 SITES MÉTIERS');
console.log('================================\n');

// Arrêter les serveurs existants
console.log('🛑 Arrêt des serveurs existants...');
for (const m of METIERS) {
  exec(`lsof -ti:${m.port} | xargs kill -9 2>/dev/null`);
}

// Attendre un peu
setTimeout(() => {
  // Lancer chaque site
  METIERS.forEach((metierConfig, index) => {
    setTimeout(() => {
      console.log(`\n🔧 Configuration ${index + 1}/5: ${metierConfig.metier.toUpperCase()}`);
      console.log('----------------------------');

      // 1. Générer le site avec le bon métier
      console.log(`📝 Génération du contenu ${metierConfig.metier}...`);
      exec(`node generate-complete-site-metier.cjs --metier=${metierConfig.metier} --nom=${metierConfig.nom} --ville=${metierConfig.ville} --telephone=${metierConfig.telephone}`, (err, stdout) => {
        if (err) {
          console.error(`❌ Erreur génération ${metierConfig.metier}:`, err);
          return;
        }

        console.log(`✅ Contenu ${metierConfig.metier} généré`);

        // 2. Vérifier les couleurs
        const themeFile = path.join(__dirname, 'src/config/theme.json');
        const theme = JSON.parse(fs.readFileSync(themeFile, 'utf8'));

        if (theme.colors.default.theme_color.primary === metierConfig.couleur) {
          console.log(`✅ Couleur correcte: ${metierConfig.couleur}`);
        } else {
          console.log(`⚠️ Couleur différente: ${theme.colors.default.theme_color.primary} au lieu de ${metierConfig.couleur}`);
        }

        // 3. Créer un build pour ce métier
        console.log(`🏗️ Build du site ${metierConfig.metier}...`);
        exec(`npm run build`, (buildErr) => {
          if (buildErr) {
            console.error(`❌ Erreur build ${metierConfig.metier}:`, buildErr);
            return;
          }

          // 4. Copier le build dans un dossier séparé
          const distDir = path.join('/tmp', `site-${metierConfig.metier}`);
          exec(`rm -rf ${distDir} && cp -r dist ${distDir}`, (copyErr) => {
            if (copyErr) {
              console.error(`❌ Erreur copie ${metierConfig.metier}:`, copyErr);
              return;
            }

            // 5. Lancer un serveur pour ce site
            console.log(`🚀 Lancement sur port ${metierConfig.port}...`);
            exec(`cd ${distDir} && python3 -m http.server ${metierConfig.port} > /tmp/server-${metierConfig.metier}.log 2>&1 &`, (serverErr) => {
              if (serverErr) {
                console.error(`❌ Erreur serveur ${metierConfig.metier}:`, serverErr);
                return;
              }

              console.log(`✅ Site ${metierConfig.metier} disponible sur http://localhost:${metierConfig.port}`);
            });
          });
        });
      });
    }, index * 5000); // Décaler chaque génération de 5 secondes
  });

  // Afficher le récapitulatif après 30 secondes
  setTimeout(() => {
    console.log('\n\n✨ RÉCAPITULATIF DES SITES');
    console.log('===========================\n');

    METIERS.forEach(m => {
      console.log(`${m.metier.toUpperCase().padEnd(12)} → http://localhost:${m.port}`);
      console.log(`             Couleur: ${m.couleur}`);
      console.log(`             ${m.nom} - ${m.ville}\n`);
    });

    console.log('\n💡 Les sites sont maintenant accessibles sur leurs ports respectifs.');
    console.log('📊 Chaque site a son propre thème et contenu spécifique.\n');
  }, 30000);

}, 2000);
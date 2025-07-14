#!/usr/bin/env node

/**
 * Script de test pour la solution CMS Supabase Direct
 * Teste l'export, le déploiement et le fonctionnement du CMS
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

// Configuration de test
const TEST_CONFIG = {
  projectName: 'Test CMS Direct',
  exportPath: path.join(__dirname, '..', 'test-cms-direct'),
  exportOptions: {
    includeCms: true,
    cmsLevel: 'full',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test',
    projectData: {
      settings: {
        siteName: 'Test Site CMS Direct',
        logo: { text: 'TEST CMS' }
      },
      theme: {
        primaryColor: '#3b82f6',
        secondaryColor: '#10b981'
      },
      pages: [{
        id: 'home',
        title: 'Accueil',
        slug: '/',
        blocks: [
          {
            id: 'hero-1',
            type: 'hero-ultra-modern',
            props: {
              title: 'Bienvenue sur notre site test',
              subtitle: 'Test de la solution CMS Supabase Direct',
              description: 'Cette page teste le nouvel éditeur avec rendu amélioré des blocs',
              buttonText: 'Commencer',
              buttonLink: '#contact',
              variant: 'gradient-wave'
            }
          },
          {
            id: 'features-1',
            type: 'features-ultra-modern',
            props: {
              title: 'Nos fonctionnalités',
              subtitle: 'Découvrez ce que nous offrons',
              layout: 'grid',
              features: [
                {
                  icon: 'star',
                  title: 'Performance',
                  description: 'Site ultra-rapide avec CDN mondial'
                },
                {
                  icon: 'shield',
                  title: 'Sécurité',
                  description: 'Protection SSL et sauvegarde automatique'
                },
                {
                  icon: 'brush',
                  title: 'Design',
                  description: 'Interface moderne et responsive'
                }
              ]
            }
          },
          {
            id: 'testimonials-1',
            type: 'testimonials-ultra-modern',
            props: {
              title: 'Ce que disent nos clients',
              layout: 'carousel-3d',
              testimonials: [
                {
                  text: 'Un service exceptionnel, je recommande vivement !',
                  name: 'Marie Dupont',
                  role: 'CEO, TechCorp',
                  rating: 5
                },
                {
                  text: 'Très satisfait du résultat, équipe professionnelle.',
                  name: 'Jean Martin',
                  role: 'Directeur, StartupXYZ',
                  rating: 5
                }
              ]
            }
          },
          {
            id: 'contact-1',
            type: 'contact-ultra-modern',
            props: {
              title: 'Contactez-nous',
              description: 'Nous sommes là pour répondre à vos questions',
              variant: 'glassmorphism',
              mapPosition: 'right',
              phone: '01 23 45 67 89',
              email: 'contact@test.fr',
              address: '123 Rue de la Paix, 75001 Paris',
              mapAddress: '123 Rue de la Paix, 75001 Paris, France'
            }
          }
        ]
      }]
    }
  }
};

async function main() {
  console.log('🧪 Test CMS Supabase Direct\n');
  
  try {
    // 1. Nettoyer le dossier de test précédent
    console.log('1️⃣ Nettoyage du dossier de test...');
    if (fs.existsSync(TEST_CONFIG.exportPath)) {
      fs.rmSync(TEST_CONFIG.exportPath, { recursive: true, force: true });
    }
    fs.mkdirSync(TEST_CONFIG.exportPath, { recursive: true });
    
    // 2. Importer les services nécessaires
    console.log('2️⃣ Import des services...');
    const { StaticExportService } = require('../lib/services/static-export-simplified');
    const { CMSExportIntegration } = require('../lib/services/cms-export-integration');
    
    // 3. Créer l'instance d'export
    console.log('3️⃣ Création du service d\'export...');
    const exportService = new StaticExportService();
    
    // 4. Exporter le site avec CMS
    console.log('4️⃣ Export du site avec CMS Supabase Direct...');
    const files = await exportService.exportToStatic(
      TEST_CONFIG.exportOptions.projectData,
      TEST_CONFIG.exportOptions
    );
    
    console.log(`   ✅ ${files.length} fichiers générés`);
    
    // 5. Écrire les fichiers
    console.log('5️⃣ Écriture des fichiers...');
    for (const file of files) {
      const filePath = path.join(TEST_CONFIG.exportPath, file.path);
      const dir = path.dirname(filePath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, file.content);
    }
    
    // 6. Vérifier les fichiers CMS
    console.log('6️⃣ Vérification des fichiers CMS...');
    const cmsFiles = [
      'admin/index.html',
      'admin/cms.js',
      'admin/cms.css',
      'admin/config.js',
      'admin/page-editor.js',
      'netlify.toml'
    ];
    
    let allFilesPresent = true;
    for (const file of cmsFiles) {
      const exists = fs.existsSync(path.join(TEST_CONFIG.exportPath, file));
      console.log(`   ${exists ? '✅' : '❌'} ${file}`);
      if (!exists) allFilesPresent = false;
    }
    
    if (!allFilesPresent) {
      throw new Error('Certains fichiers CMS sont manquants');
    }
    
    // 7. Vérifier la configuration
    console.log('7️⃣ Vérification de la configuration...');
    const configContent = fs.readFileSync(path.join(TEST_CONFIG.exportPath, 'admin/config.js'), 'utf8');
    console.log('   Configuration CMS:');
    console.log('   - Mode: supabase-direct');
    console.log(`   - Supabase URL: ${configContent.includes(TEST_CONFIG.exportOptions.supabaseUrl) ? '✅' : '❌'}`);
    console.log(`   - Supabase Key: ${configContent.includes('anonKey') ? '✅' : '❌'}`);
    console.log(`   - Site ID: ${configContent.includes('siteId') ? '✅' : '❌'}`);
    
    // 8. Créer un ZIP pour le déploiement
    console.log('8️⃣ Création du ZIP de déploiement...');
    const zipPath = path.join(__dirname, '..', 'test-cms-direct.zip');
    
    await new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      output.on('close', resolve);
      archive.on('error', reject);
      
      archive.pipe(output);
      archive.directory(TEST_CONFIG.exportPath, false);
      archive.finalize();
    });
    
    console.log(`   ✅ ZIP créé: ${zipPath}`);
    
    // 9. Instructions de test
    console.log('\n✨ Export réussi!\n');
    console.log('📋 Pour tester le CMS:');
    console.log('1. Servez le site localement:');
    console.log(`   cd ${TEST_CONFIG.exportPath} && npx serve -s . -p 3002`);
    console.log('\n2. Accédez au CMS:');
    console.log('   http://localhost:3002/admin');
    console.log('\n3. Connectez-vous avec:');
    console.log('   Email: admin@admin.fr');
    console.log('   Mot de passe: admin');
    console.log('\n4. Testez l\'éditeur de pages:');
    console.log('   - Les blocs doivent afficher un aperçu visuel');
    console.log('   - Les propriétés doivent être éditables');
    console.log('   - La sauvegarde doit fonctionner (localStorage ou Supabase)');
    console.log('\n5. Pour déployer sur Netlify:');
    console.log('   - Utilisez le fichier ZIP créé');
    console.log('   - Ou déployez directement le dossier');
    console.log('\n⚠️  Configuration Supabase requise:');
    console.log('   - Allez dans Supabase > Settings > API > CORS');
    console.log('   - Ajoutez votre domaine ou utilisez *');
    console.log('   - Les tables cms_* doivent exister');
    
    // 10. Ouvrir automatiquement dans le navigateur (optionnel)
    if (process.platform === 'darwin') {
      console.log('\n🌐 Ouverture du navigateur...');
      execSync(`cd ${TEST_CONFIG.exportPath} && npx serve -s . -p 3002 & sleep 2 && open http://localhost:3002/admin`);
    }
    
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Lancer le test
main();
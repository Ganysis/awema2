/**
 * Script de déploiement avec CMS simplifié (sans Supabase)
 */

const { NetlifyEdgeFunctionsSimple } = require('../lib/services/netlify-edge-functions-simple');
const fs = require('fs').promises;
const path = require('path');

async function deployWithSimpleCMS() {
  console.log('🚀 Déploiement avec CMS simplifié\n');

  const generator = new NetlifyEdgeFunctionsSimple();
  const siteId = 'test-simple-' + Date.now();
  
  // Blocs de test
  const testBlocks = [
    {
      id: 'header-1',
      type: 'header-ultra-modern',
      variant: 'transparent-blur',
      props: {
        logo: { text: 'Test CMS Simple', type: 'text' },
        menuItems: [
          { label: 'Accueil', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' }
        ]
      }
    },
    {
      id: 'hero-1',
      type: 'hero-ultra-modern',
      variant: 'gradient-animation',
      props: {
        title: 'CMS Simple et Fonctionnel',
        subtitle: 'Testez l\'édition de contenu sans base de données',
        primaryButton: { text: 'Commencer', href: '#' }
      }
    },
    {
      id: 'content-1',
      type: 'content-ultra-modern',
      variant: 'split-screen',
      props: {
        title: 'À propos',
        content: 'Un CMS léger qui fonctionne avec localStorage et Edge Functions.',
        features: [
          { text: 'Pas de base de données' },
          { text: 'Édition en temps réel' },
          { text: 'Sauvegarde automatique' }
        ]
      }
    }
  ];

  try {
    // Créer les fichiers
    const files = {
      'netlify.toml': generator.generateNetlifyToml(),
      'netlify/edge-functions/cms-handler.ts': generator.generateEdgeFunction(siteId, testBlocks)
    };

    console.log('📝 Fichiers générés:');
    for (const [filename, content] of Object.entries(files)) {
      console.log(`   - ${filename} (${content.length} caractères)`);
      
      // Créer le dossier si nécessaire
      const dir = path.dirname(filename);
      if (dir !== '.') {
        await fs.mkdir(path.join(__dirname, '..', 'test-output', dir), { recursive: true });
      }
      
      // Écrire le fichier
      await fs.writeFile(
        path.join(__dirname, '..', 'test-output', filename),
        content,
        'utf8'
      );
    }

    console.log('\n✅ Fichiers créés dans test-output/');
    console.log('\n📋 Configuration du CMS simplifié:');
    console.log('   - Authentification: admin@admin.fr / admin');
    console.log('   - Stockage: En mémoire (Edge Function)');
    console.log('   - API: /api/cms/*');
    console.log('   - Pas de dépendance Supabase');
    
    console.log('\n🚀 Pour déployer:');
    console.log('   1. Copier les fichiers dans votre export');
    console.log('   2. Déployer sur Netlify');
    console.log('   3. Accéder à /admin');

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

deployWithSimpleCMS();
#!/usr/bin/env node

/**
 * Test de déploiement avec Netlify Functions intégrées
 */

// Charger les variables d'environnement
try {
  require('dotenv').config({ path: '../.env.local' });
} catch (e) {
  // Si dotenv n'est pas installé, continuer sans
}

async function testDeployWithFunctions() {
  try {
    console.log('🚀 Test de déploiement avec Netlify Functions');
    console.log('================================================\n');

    // Configuration du test
    const timestamp = Date.now();
    const testSite = {
      siteId: `test-functions-${timestamp}`,
      siteName: `test-functions-${timestamp}`,
      projectData: {
        settings: {
          businessName: 'Plomberie Excellence',
          phone: '01 23 45 67 89',
          email: 'contact@plomberie-excellence.fr',
          address: '123 Avenue des Artisans, 75001 Paris'
        },
        pages: {
          home: {
            title: 'Plomberie Excellence - Votre expert plombier',
            blocks: [
              {
                id: 'hero-1',
                type: 'hero-ultra-modern',
                props: {
                  variant: 'gradient-waves',
                  title: 'Plomberie Excellence',
                  subtitle: 'Intervention rapide 24/7 - Devis gratuit',
                  ctaText: 'Appeler maintenant',
                  ctaLink: 'tel:0123456789'
                }
              },
              {
                id: 'features-1',
                type: 'features',
                props: {
                  title: 'Nos Services',
                  features: [
                    { title: 'Dépannage urgent', description: 'Intervention en 30 minutes' },
                    { title: 'Installation', description: 'Sanitaires et chauffage' },
                    { title: 'Rénovation', description: 'Salle de bain clé en main' }
                  ]
                }
              }
            ]
          }
        },
        theme: {
          primaryColor: '#2563eb',
          secondaryColor: '#0ea5e9'
        }
      },
      plan: 'pro',
      adminEmail: 'admin@plomberie-excellence.fr'
    };

    console.log('📋 Configuration :');
    console.log(`   Site ID : ${testSite.siteId}`);
    console.log(`   Plan : ${testSite.plan} (avec CMS Supabase)`);
    console.log(`   Functions : Activées`);
    console.log(`   CORS : Géré localement\n`);

    // Vérifier les variables d'environnement
    if (!process.env.NETLIFY_AUTH_TOKEN) {
      throw new Error('NETLIFY_AUTH_TOKEN manquant dans .env.local');
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL manquant dans .env.local');
    }
    if (!process.env.SUPABASE_SERVICE_KEY) {
      throw new Error('SUPABASE_SERVICE_KEY manquant dans .env.local');
    }

    console.log('✅ Variables d\'environnement OK\n');

    // Appeler l'API de déploiement
    console.log('📤 Envoi de la requête de déploiement...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testSite)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    
    console.log('✅ Déploiement réussi !\n');
    console.log('🌐 URLs :');
    console.log(`   Site : https://${result.site_name}.netlify.app`);
    console.log(`   Admin : https://${result.site_name}.netlify.app/admin`);
    console.log(`   Functions : https://${result.site_name}.netlify.app/.netlify/functions/cms-api\n`);
    
    console.log('🔐 Identifiants CMS :');
    console.log('   Email : admin@admin.fr');
    console.log('   Mot de passe : admin\n');
    
    console.log('🧪 Tests à effectuer :');
    console.log('1. Ouvrir le site et vérifier l\'affichage');
    console.log('2. Aller sur /admin et se connecter');
    console.log('3. Vérifier qu\'il n\'y a PAS d\'erreur CORS');
    console.log('4. Tester la modification du contenu\n');

    console.log('📊 Détails techniques :');
    console.log(`   Deploy ID : ${result.deploy_id}`);
    console.log(`   Site ID Netlify : ${result.netlify_site_id || 'N/A'}`);
    console.log(`   Site ID Supabase : ${result.site_id}`);
    console.log(`   Functions déployées : cms-api.js`);
    console.log(`   CORS : Géré par Netlify Functions (même origine)\n`);

    // Vérifier que le site existe dans Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔍 Vérification dans Supabase...');
      const supabaseCheck = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cms_sites?id=eq.${result.site_id}`,
        {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
          }
        }
      );
      
      if (supabaseCheck.ok) {
        const sites = await supabaseCheck.json();
        if (sites.length > 0) {
          console.log('✅ Site trouvé dans Supabase\n');
        } else {
          console.log('⚠️  Site non trouvé dans Supabase (sera créé à la première connexion)\n');
        }
      }
    }

    console.log('✨ Déploiement terminé avec succès !');
    console.log('Les Netlify Functions évitent tous les problèmes CORS.');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

// Lancer le test
testDeployWithFunctions();
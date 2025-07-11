const fs = require('fs').promises;
const path = require('path');

async function deployTestSite() {
  try {
    // Configuration du site de test
    const siteData = {
      siteName: `test-plomberie-${Date.now()}`,
      businessName: 'Plomberie Martin Pro',
      pages: {
        home: {
          title: 'Plomberie Martin Pro - Dépannage 24/7 Paris',
          blocks: [
            {
              id: 'hero-1',
              type: 'hero-ultra-modern',
              props: {
                variant: 'gradient-waves',
                title: 'Plomberie Martin Pro',
                subtitle: 'Votre expert plombier à Paris - Intervention rapide 24/7',
                ctaText: 'Devis Gratuit',
                ctaLink: '/contact'
              }
            },
            {
              id: 'features-1', 
              type: 'features-ultra-modern',
              props: {
                title: 'Nos Services',
                displayMode: 'grid',
                features: [
                  { title: 'Dépannage urgence', description: 'Intervention en 30 min', icon: 'emergency' },
                  { title: 'Installation sanitaire', description: 'Pose complète', icon: 'tools' },
                  { title: 'Rénovation', description: 'Salle de bain moderne', icon: 'refresh' }
                ]
              }
            }
          ]
        },
        contact: {
          title: 'Contact',
          blocks: [
            {
              id: 'contact-1',
              type: 'contact-ultra-modern',
              props: {
                variant: 'split-screen',
                title: 'Contactez-nous',
                showMap: true
              }
            }
          ]
        }
      }
    };

    // Préparer les données de déploiement
    const deployData = {
      siteName: siteData.siteName,
      token: process.env.NETLIFY_TOKEN,
      siteData: siteData,
      exportData: {
        business: {
          name: siteData.businessName,
          phone: '01 23 45 67 89',
          email: 'contact@plomberie-martin.fr',
          address: '123 Rue de la Paix, 75001 Paris'
        },
        pages: siteData.pages,
        theme: {
          primaryColor: '#2563eb',
          secondaryColor: '#0ea5e9'
        }
      },
      cmsConfig: {
        provider: 'supabase',
        level: 'full',
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    };

    console.log('🚀 Déploiement en cours...');
    
    // Appeler l'API de déploiement
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deployData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erreur déploiement: ${error}`);
    }

    const result = await response.json();
    
    console.log('\n✅ SITE DÉPLOYÉ AVEC SUCCÈS !\n');
    console.log('🌐 URL du site : https://' + result.site_name + '.netlify.app');
    console.log('🔐 URL du CMS : https://' + result.site_name + '.netlify.app/admin');
    console.log('\n📧 Identifiants CMS :');
    console.log('   Email : admin@admin.fr');
    console.log('   Mot de passe : admin');
    console.log('\n🆔 Site ID Supabase : ' + (result.site_id || 'Sera créé à la première connexion'));
    console.log('📦 Deploy ID : ' + result.deploy_id);

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

deployTestSite();
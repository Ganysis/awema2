/**
 * Script pour créer automatiquement un client de test dans AWEMA Studio
 * et déclencher le déploiement sur Netlify avec CMS Supabase
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTestClient() {
  try {
    console.log('🚀 Création d\'un client de test pour déploiement...\n');

    // Données du client de test
    const clientData = {
      // Informations entreprise
      businessName: 'Plomberie Durand & Fils',
      ownerName: 'Jean Durand',
      email: 'jean.durand@plomberie-durand.fr',
      phone: '01 23 45 67 89',
      address: '45 Avenue des Champs, 75008 Paris',
      city: 'Paris',
      postalCode: '75008',
      
      // Configuration technique
      domain: 'plomberie-durand-paris.netlify.app',
      template: 'modern',
      primaryColor: '#2563eb',
      secondaryColor: '#0ea5e9',
      
      // Services
      services: [
        'Dépannage urgence 24/7',
        'Installation sanitaires',
        'Rénovation salle de bain',
        'Détection de fuites',
        'Débouchage canalisations',
        'Entretien chaudière'
      ],
      
      // Zones d\'intervention
      serviceAreas: [
        'Paris 1er', 'Paris 2e', 'Paris 3e', 'Paris 4e',
        'Paris 5e', 'Paris 6e', 'Paris 7e', 'Paris 8e',
        'Paris 9e', 'Paris 10e', 'Paris 11e', 'Paris 12e'
      ],
      
      // Configuration site
      siteConfig: {
        businessType: 'plombier',
        openingHours: {
          monday: '8h00 - 18h00',
          tuesday: '8h00 - 18h00',
          wednesday: '8h00 - 18h00',
          thursday: '8h00 - 18h00',
          friday: '8h00 - 18h00',
          saturday: '9h00 - 12h00',
          sunday: 'Urgences uniquement'
        },
        features: {
          cms: 'full',
          analytics: true,
          seo: true,
          forms: true,
          maps: true
        }
      }
    };

    // Créer le client dans la base de données
    console.log('📝 Création du client dans la base de données...');
    const client = await prisma.client.create({
      data: {
        businessName: clientData.businessName,
        ownerName: clientData.ownerName,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        city: clientData.city,
        postalCode: clientData.postalCode,
        domain: clientData.domain,
        template: clientData.template,
        primaryColor: clientData.primaryColor,
        secondaryColor: clientData.secondaryColor,
        services: clientData.services,
        serviceAreas: clientData.serviceAreas,
        status: 'active',
        siteData: {
          pages: {
            home: {
              title: `${clientData.businessName} - Plombier à ${clientData.city}`,
              blocks: [
                {
                  id: 'hero-1',
                  type: 'hero-ultra-modern',
                  props: {
                    variant: 'gradient-waves',
                    title: clientData.businessName,
                    subtitle: 'Votre expert plombier à Paris - Intervention rapide 24/7',
                    ctaText: 'Devis Gratuit',
                    ctaLink: '/contact',
                    backgroundImage: '/images/hero-plomberie.jpg'
                  }
                },
                {
                  id: 'features-1',
                  type: 'features-ultra-modern',
                  props: {
                    displayMode: 'grid',
                    title: 'Nos Services',
                    features: clientData.services.map((service, index) => ({
                      id: `feature-${index}`,
                      title: service,
                      description: `Service professionnel de ${service.toLowerCase()}`,
                      icon: 'check-circle'
                    }))
                  }
                },
                {
                  id: 'cta-1',
                  type: 'cta-ultra-modern',
                  props: {
                    variant: 'glassmorphism',
                    title: 'Besoin d\'un plombier en urgence ?',
                    description: 'Contactez-nous maintenant pour une intervention rapide',
                    primaryButtonText: 'Appeler maintenant',
                    primaryButtonLink: `tel:${clientData.phone}`,
                    secondaryButtonText: 'Devis en ligne',
                    secondaryButtonLink: '/contact'
                  }
                }
              ]
            },
            services: {
              title: 'Nos Services de Plomberie',
              blocks: [
                {
                  id: 'content-services',
                  type: 'content-ultra-modern',
                  props: {
                    contentType: 'accordion',
                    title: 'Services Détaillés',
                    items: clientData.services.map((service, index) => ({
                      id: `service-${index}`,
                      title: service,
                      content: `Description complète du service ${service}...`
                    }))
                  }
                }
              ]
            },
            contact: {
              title: 'Contactez-nous',
              blocks: [
                {
                  id: 'contact-1',
                  type: 'contact-ultra-modern',
                  props: {
                    variant: 'split-screen',
                    title: 'Demandez votre devis gratuit',
                    showMap: true,
                    mapPosition: 'right',
                    businessInfo: {
                      name: clientData.businessName,
                      phone: clientData.phone,
                      email: clientData.email,
                      address: clientData.address,
                      hours: clientData.siteConfig.openingHours
                    }
                  }
                }
              ]
            }
          },
          seo: {
            title: `${clientData.businessName} - Plombier ${clientData.city}`,
            description: `${clientData.businessName}, votre plombier de confiance à ${clientData.city}. Dépannage 24/7, installation, rénovation. Devis gratuit.`,
            keywords: [
              `plombier ${clientData.city}`,
              'dépannage plomberie',
              'urgence plombier',
              'installation sanitaire',
              'rénovation salle de bain'
            ]
          },
          config: clientData.siteConfig
        }
      }
    });

    console.log('✅ Client créé avec succès !');
    console.log(`   ID: ${client.id}`);
    console.log(`   Nom: ${client.businessName}`);
    console.log(`   Email: ${client.email}`);
    console.log(`   Domaine: ${client.domain}\n`);

    // Préparer les données pour le déploiement
    console.log('🚀 Préparation du déploiement...');
    const deploymentData = {
      clientId: client.id,
      domain: client.domain,
      netlifyToken: process.env.NETLIFY_TOKEN || '',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      cmsLevel: 'full' // CMS complet avec Supabase
    };

    console.log('\n========================================');
    console.log('✅ CLIENT DE TEST CRÉÉ AVEC SUCCÈS !');
    console.log('========================================\n');
    console.log('📋 Prochaines étapes :');
    console.log('1. Ouvrez http://localhost:3000');
    console.log('2. Allez dans le dashboard');
    console.log(`3. Trouvez le client "${client.businessName}"`);
    console.log('4. Cliquez sur "Éditer" pour personnaliser');
    console.log('5. Cliquez sur "Déployer" pour lancer le déploiement\n');
    console.log('🔑 Identifiants CMS après déploiement :');
    console.log('   Email : admin@admin.fr');
    console.log('   Mot de passe : admin\n');

    // Optionnel : Déclencher automatiquement le déploiement
    if (process.argv.includes('--auto-deploy')) {
      console.log('🚀 Déclenchement automatique du déploiement...');
      // Appeler l'API de déploiement
      const response = await fetch('http://localhost:3000/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deploymentData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Déploiement lancé !');
        console.log(`   URL Netlify : https://${result.site_name}.netlify.app`);
      } else {
        console.log('❌ Erreur lors du déploiement automatique');
      }
    }

  } catch (error) {
    console.error('❌ Erreur :', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Lancer la création
createTestClient();
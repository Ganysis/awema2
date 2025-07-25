#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const fetch = require('node-fetch');
const crypto = require('crypto');
const prisma = new PrismaClient();

async function createAndDeployRealProject() {
  try {
    console.log('🔄 Création d\'un VRAI projet avec de VRAIS blocs...\n');

    // Utiliser un client existant ou en créer un nouveau
    let client = await prisma.client.findFirst({
      where: { email: 'jean.dupont@example.com' }
    });
    
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          phone: '06 12 34 56 78',
          address: '123 Rue de la République',
          city: 'Paris',
          postalCode: '75001',
          companyName: 'Plomberie Dupont',
          siret: '12345678900001',
          status: 'ACTIVE'
        }
      });
    }

    console.log('✅ Client créé:', client.name);

    // Créer un VRAI projet complet avec tous les blocs
    const projectData = {
      businessInfo: {
        name: 'Plomberie Dupont',
        phone: '06 12 34 56 78',
        email: 'contact@plomberie-dupont.fr',
        address: '123 Rue de la République',
        city: 'Paris',
        zipCode: '75001',
        country: 'France',
        siret: '12345678900001',
        description: 'Plomberie Dupont, votre expert en plomberie depuis 20 ans à Paris',
        services: ['Dépannage urgence', 'Installation sanitaire', 'Chauffage', 'Rénovation salle de bain'],
        hours: {
          weekdays: '8h-19h',
          saturday: '9h-17h',
          sunday: 'Urgences uniquement'
        }
      },
      projectName: 'Site Plomberie Dupont',
      globalHeader: {
        id: 'header-main',
        type: 'header-ultra-modern',
        props: {
          variant: 'floating-blur',
          logo: {
            text: 'Plomberie Dupont',
            imageUrl: '/assets/logo.png'
          },
          navigation: [
            { label: 'Accueil', href: '/' },
            { label: 'Services', href: '#services' },
            { label: 'Réalisations', href: '#gallery' },
            { label: 'Avis clients', href: '#testimonials' },
            { label: 'Contact', href: '#contact' }
          ],
          ctaButton: {
            text: 'Devis Gratuit',
            href: '#contact'
          },
          sticky: true,
          mobileMenuStyle: 'slide',
          searchEnabled: false
        }
      },
      globalFooter: {
        id: 'footer-main',
        type: 'footer-ultra-modern',
        props: {
          variant: 'gradient-wave',
          logo: {
            text: 'Plomberie Dupont',
            tagline: 'Votre expert plomberie à Paris'
          },
          about: 'Depuis 20 ans, nous intervenons pour tous vos besoins en plomberie : dépannage, installation, rénovation. Disponible 24/7 pour les urgences.',
          columns: [
            {
              title: 'Services',
              links: [
                { label: 'Dépannage urgence', href: '#services' },
                { label: 'Installation sanitaire', href: '#services' },
                { label: 'Chauffage', href: '#services' },
                { label: 'Rénovation', href: '#services' }
              ]
            },
            {
              title: 'Informations',
              links: [
                { label: 'À propos', href: '#about' },
                { label: 'Nos garanties', href: '#' },
                { label: 'Zones d\'intervention', href: '#' },
                { label: 'Mentions légales', href: '/mentions-legales' }
              ]
            }
          ],
          contact: {
            phone: '06 12 34 56 78',
            email: 'contact@plomberie-dupont.fr',
            address: '123 Rue de la République, 75001 Paris'
          },
          social: [
            { platform: 'facebook', url: 'https://facebook.com/plomberiedupont' },
            { platform: 'instagram', url: 'https://instagram.com/plomberiedupont' }
          ],
          newsletter: {
            enabled: true,
            title: 'Newsletter',
            description: 'Recevez nos conseils plomberie',
            placeholder: 'votre@email.com',
            buttonText: 'S\'inscrire'
          },
          copyright: '© 2024 Plomberie Dupont. Tous droits réservés.',
          paymentMethods: ['visa', 'mastercard', 'cash', 'check'],
          certifications: ['RGE', 'Qualibat', 'Artisan de confiance']
        }
      },
      pages: [{
        id: 'home',
        name: 'Accueil',
        slug: '/',
        blocks: [
          // Hero principal
          {
            id: 'hero-1',
            type: 'hero-ultra-modern',
            props: {
              variant: 'gradient-wave',
              layout: 'two-columns',
              title: 'Votre Plombier de Confiance à Paris',
              subtitle: 'Intervention rapide 24h/24 et 7j/7',
              description: 'Dépannage, installation, rénovation : 20 ans d\'expérience à votre service. Devis gratuit et tarifs transparents.',
              primaryButton: {
                text: 'Appeler Maintenant',
                link: 'tel:0612345678',
                style: 'gradient'
              },
              secondaryButton: {
                text: 'Devis en Ligne',
                link: '#contact',
                style: 'glass'
              },
              backgroundType: 'gradient',
              gradientStart: '#1e40af',
              gradientEnd: '#3b82f6',
              overlay: false,
              heroImage: '/assets/plumber-hero.jpg',
              heroImagePosition: 'right',
              showScrollIndicator: true
            }
          },
          // Services
          {
            id: 'services-1',
            type: 'services-ultra-modern',
            props: {
              variant: 'cards-hover',
              title: 'Nos Services de Plomberie',
              subtitle: 'Des solutions adaptées à tous vos besoins',
              layout: 'grid',
              columns: 4,
              services: [
                {
                  icon: 'wrench',
                  title: 'Dépannage Urgence',
                  description: 'Intervention rapide 24/7 pour fuites, débouchage, pannes...',
                  features: ['Disponible 24h/24', 'Intervention < 1h', 'Devis immédiat'],
                  price: 'À partir de 80€',
                  image: '/assets/depannage.jpg'
                },
                {
                  icon: 'droplet',
                  title: 'Installation Sanitaire',
                  description: 'Installation complète : robinetterie, WC, douche, baignoire...',
                  features: ['Matériel de qualité', 'Garantie 2 ans', 'Finitions soignées'],
                  price: 'Sur devis',
                  image: '/assets/sanitaire.jpg'
                },
                {
                  icon: 'thermometer',
                  title: 'Chauffage',
                  description: 'Installation et entretien chaudière, radiateurs, plancher chauffant',
                  features: ['Toutes marques', 'Contrat entretien', 'Économies d\'énergie'],
                  price: 'Sur devis',
                  image: '/assets/chauffage.jpg'
                },
                {
                  icon: 'home',
                  title: 'Rénovation Salle de Bain',
                  description: 'Rénovation complète ou partielle de votre salle de bain',
                  features: ['Design moderne', 'Clé en main', 'Respect des délais'],
                  price: 'À partir de 3000€',
                  image: '/assets/renovation.jpg'
                }
              ],
              showPrices: true,
              ctaButton: {
                text: 'Voir tous nos services',
                link: '/services'
              }
            }
          },
          // Features
          {
            id: 'features-1',
            type: 'features-ultra-modern',
            props: {
              title: 'Pourquoi Nous Choisir ?',
              subtitle: 'Les avantages Plomberie Dupont',
              layout: 'timeline',
              features: [
                {
                  icon: 'clock',
                  title: '20 ans d\'expérience',
                  description: 'Une expertise reconnue dans tout Paris et sa région',
                  image: '/assets/experience.jpg'
                },
                {
                  icon: 'shield',
                  title: 'Garantie 2 ans',
                  description: 'Toutes nos interventions sont garanties pièces et main d\'œuvre',
                  image: '/assets/garantie.jpg'
                },
                {
                  icon: 'euro',
                  title: 'Tarifs transparents',
                  description: 'Devis gratuit et détaillé avant toute intervention',
                  image: '/assets/tarifs.jpg'
                },
                {
                  icon: 'star',
                  title: 'Artisan certifié RGE',
                  description: 'Qualifications reconnues et formations continues',
                  image: '/assets/certification.jpg'
                },
                {
                  icon: 'users',
                  title: 'Équipe qualifiée',
                  description: '5 plombiers expérimentés à votre service',
                  image: '/assets/equipe.jpg'
                },
                {
                  icon: 'thumbs-up',
                  title: '98% de satisfaction',
                  description: 'Plus de 2000 clients satisfaits nous font confiance',
                  image: '/assets/satisfaction.jpg'
                }
              ],
              animated: true,
              showImages: true
            }
          },
          // Gallery
          {
            id: 'gallery-1',
            type: 'gallery-ultra-modern',
            props: {
              variant: 'masonry-flow',
              title: 'Nos Réalisations',
              subtitle: 'Découvrez nos derniers chantiers',
              images: [
                { src: '/assets/real-1.jpg', alt: 'Salle de bain moderne', title: 'Rénovation complète', category: 'renovation' },
                { src: '/assets/real-2.jpg', alt: 'Installation chaudière', title: 'Chaudière neuve', category: 'chauffage' },
                { src: '/assets/real-3.jpg', alt: 'Cuisine équipée', title: 'Plomberie cuisine', category: 'installation' },
                { src: '/assets/real-4.jpg', alt: 'Douche italienne', title: 'Douche sur mesure', category: 'renovation' },
                { src: '/assets/real-5.jpg', alt: 'Radiateurs design', title: 'Chauffage design', category: 'chauffage' },
                { src: '/assets/real-6.jpg', alt: 'WC suspendus', title: 'WC modernes', category: 'installation' },
                { src: '/assets/real-7.jpg', alt: 'Robinetterie luxe', title: 'Robinets haut de gamme', category: 'installation' },
                { src: '/assets/real-8.jpg', alt: 'Plancher chauffant', title: 'Sol chauffant', category: 'chauffage' }
              ],
              columns: 4,
              gap: 'medium',
              lightbox: true,
              lightboxStyle: 'modern-dark',
              filterEnabled: true,
              categories: [
                { id: 'all', label: 'Toutes' },
                { id: 'renovation', label: 'Rénovation' },
                { id: 'chauffage', label: 'Chauffage' },
                { id: 'installation', label: 'Installation' }
              ],
              hoverEffect: 'zoom-tilt',
              lazy: true
            }
          },
          // Testimonials
          {
            id: 'testimonials-1',
            type: 'testimonials-ultra-modern',
            props: {
              title: 'Ils Nous Font Confiance',
              subtitle: 'Avis de nos clients',
              layout: 'carousel-3d',
              testimonials: [
                {
                  text: 'Intervention rapide pour une fuite d\'eau en pleine nuit. Plombier très professionnel et tarif correct. Je recommande !',
                  name: 'Marie Durand',
                  role: 'Particulier',
                  location: 'Paris 11e',
                  image: '/assets/client-1.jpg',
                  rating: 5,
                  date: 'Il y a 2 semaines'
                },
                {
                  text: 'Rénovation complète de notre salle de bain. Travail soigné, délais respectés et résultat magnifique. Merci !',
                  name: 'Pierre Martin',
                  role: 'Particulier',
                  location: 'Paris 15e',
                  image: '/assets/client-2.jpg',
                  rating: 5,
                  date: 'Il y a 1 mois'
                },
                {
                  text: 'Installation d\'une nouvelle chaudière. Conseils pertinents, travail propre et équipe sympathique.',
                  name: 'Sophie Bernard',
                  role: 'Particulier',
                  location: 'Paris 8e',
                  image: '/assets/client-3.jpg',
                  rating: 5,
                  date: 'Il y a 2 mois'
                },
                {
                  text: 'Plusieurs interventions dans notre copropriété. Toujours ponctuel et efficace. Un vrai professionnel.',
                  name: 'Jacques Lefèvre',
                  role: 'Syndic',
                  company: 'Immobilière du Centre',
                  image: '/assets/client-4.jpg',
                  rating: 5,
                  date: 'Il y a 3 mois'
                }
              ],
              showRating: true,
              showSocialProof: true,
              socialProofText: 'Plus de 2000 clients satisfaits',
              autoplay: true,
              showArrows: true,
              showDots: true
            }
          },
          // FAQ
          {
            id: 'faq-1',
            type: 'faq-ultra-modern',
            props: {
              variant: 'gradient-cards',
              title: 'Questions Fréquentes',
              subtitle: 'Tout ce que vous devez savoir',
              faqs: [
                {
                  question: 'Intervenez-vous en urgence le week-end ?',
                  answer: 'Oui, nous sommes disponibles 24h/24 et 7j/7 pour les urgences. Les tarifs week-end et jours fériés sont majorés de 50%.',
                  category: 'urgence'
                },
                {
                  question: 'Quels sont vos tarifs ?',
                  answer: 'Déplacement : 50€ (offert si travaux). Main d\'œuvre : 60€/heure en semaine, 90€/heure le week-end. Devis gratuit pour travaux > 150€.',
                  category: 'tarifs'
                },
                {
                  question: 'Acceptez-vous les paiements en plusieurs fois ?',
                  answer: 'Oui, nous proposons le paiement en 3 ou 4 fois sans frais pour les travaux supérieurs à 1000€.',
                  category: 'paiement'
                },
                {
                  question: 'Quelle garantie sur vos interventions ?',
                  answer: 'Toutes nos interventions sont garanties 2 ans pièces et main d\'œuvre. Extension possible à 5 ans sur demande.',
                  category: 'garantie'
                },
                {
                  question: 'Dans quels arrondissements intervenez-vous ?',
                  answer: 'Nous intervenons dans tout Paris et la petite couronne (92, 93, 94). Délai d\'intervention : 30min à 2h selon la zone.',
                  category: 'zone'
                },
                {
                  question: 'Travaillez-vous avec les assurances ?',
                  answer: 'Oui, nous sommes agréés par toutes les assurances. Nous pouvons établir les devis et factures nécessaires à votre remboursement.',
                  category: 'assurance'
                }
              ],
              categories: [
                { id: 'all', label: 'Toutes' },
                { id: 'urgence', label: 'Urgences' },
                { id: 'tarifs', label: 'Tarifs' },
                { id: 'paiement', label: 'Paiement' },
                { id: 'garantie', label: 'Garantie' },
                { id: 'zone', label: 'Zones' },
                { id: 'assurance', label: 'Assurances' }
              ],
              expandIcon: 'plus-circle',
              searchEnabled: true,
              animateCards: true
            }
          },
          // CTA
          {
            id: 'cta-1',
            type: 'cta-ultra-modern',
            props: {
              variant: 'gradient-animated',
              title: 'Besoin d\'un Plombier ?',
              subtitle: 'Intervention rapide garantie',
              description: 'N\'attendez pas que le problème s\'aggrave. Nos experts sont disponibles maintenant.',
              primaryButton: {
                text: '📞 Appeler : 06 12 34 56 78',
                link: 'tel:0612345678',
                size: 'large',
                animation: 'pulse'
              },
              secondaryButton: {
                text: 'Devis en ligne',
                link: '#contact',
                variant: 'outline'
              },
              backgroundGradient: true,
              urgencyBadge: 'Disponible 24/7',
              features: [
                'Intervention < 1h',
                'Devis gratuit',
                'Garantie 2 ans'
              ]
            }
          },
          // Contact AVEC VRAIS CHAMPS
          {
            id: 'contact-1',
            type: 'contact-ultra-modern',
            props: {
              variant: 'split-modern',
              title: 'Contactez-Nous',
              subtitle: 'Devis gratuit sous 24h',
              contactInfo: JSON.stringify({
                phone: '06 12 34 56 78',
                email: 'contact@plomberie-dupont.fr',
                address: '123 Rue de la République, 75001 Paris',
                hours: {
                  weekdays: 'Lun-Ven : 8h-19h',
                  saturday: 'Sam : 9h-17h',
                  sunday: 'Dim : Urgences uniquement'
                },
                emergency: {
                  phone: '06 12 34 56 78',
                  available: '24h/24, 7j/7'
                }
              }),
              formFields: JSON.stringify([
                { name: 'name', label: 'Nom et Prénom', type: 'text', required: true, placeholder: 'Jean Dupont' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'jean@example.com' },
                { name: 'phone', label: 'Téléphone', type: 'tel', required: true, placeholder: '06 12 34 56 78' },
                { name: 'address', label: 'Adresse', type: 'text', required: false, placeholder: '123 rue de la Paix, 75001 Paris' },
                { 
                  name: 'service', 
                  label: 'Type d\'intervention', 
                  type: 'select', 
                  required: true,
                  options: ['Urgence fuite', 'Débouchage', 'Installation', 'Rénovation', 'Chauffage', 'Autre']
                },
                {
                  name: 'urgency',
                  label: 'Urgence',
                  type: 'radio',
                  required: true,
                  options: ['Très urgent (< 2h)', 'Urgent (< 24h)', 'Pas urgent']
                },
                { 
                  name: 'message', 
                  label: 'Description du problème', 
                  type: 'textarea', 
                  rows: 5, 
                  required: true,
                  placeholder: 'Décrivez votre problème en détail...'
                },
                {
                  name: 'availability',
                  label: 'Disponibilités',
                  type: 'checkbox',
                  options: ['Matin (8h-12h)', 'Après-midi (14h-18h)', 'Soir (18h-20h)', 'Week-end']
                }
              ]),
              showMap: true,
              mapPosition: 'right',
              mapCoordinates: JSON.stringify({
                lat: 48.8566,
                lng: 2.3522
              }),
              mapZoom: 15,
              mapMarkers: JSON.stringify([
                { lat: 48.8566, lng: 2.3522, title: 'Plomberie Dupont' }
              ]),
              submitButtonText: 'Envoyer ma demande',
              successMessage: 'Merci ! Nous vous recontactons dans l\'heure.',
              features: [
                { icon: 'check', text: 'Réponse garantie sous 1h' },
                { icon: 'check', text: 'Devis gratuit et détaillé' },
                { icon: 'check', text: 'Sans engagement' }
              ]
            }
          }
        ],
        meta: {
          title: 'Plomberie Dupont - Plombier Paris 24/7 | Dépannage Urgence',
          description: 'Plombier à Paris disponible 24h/24. Dépannage urgence, installation, rénovation. Intervention rapide, devis gratuit. ☎️ 06 12 34 56 78',
          keywords: 'plombier paris, dépannage plomberie, urgence plomberie, fuite eau, débouchage, installation sanitaire'
        }
      }],
      theme: {
        colors: {
          primary: '#2563eb',
          secondary: '#3b82f6',
          accent: '#10b981',
          background: '#ffffff',
          surface: '#f8fafc',
          text: '#1e293b',
          textSecondary: '#64748b',
          border: '#e2e8f0',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
        },
        typography: {
          fontFamily: {
            heading: 'Inter',
            body: 'Inter'
          }
        }
      }
    };

    // Créer le projet dans la base de données
    const project = await prisma.project.create({
      data: {
        name: 'Site Plomberie Dupont COMPLET',
        slug: 'plomberie-dupont-complet',
        clientId: client.id,
        template: 'plumber',
        data: JSON.stringify(projectData)
      }
    });

    console.log('✅ Projet créé:', project.name);
    console.log('   ID:', project.id);
    console.log('   Blocs:', projectData.pages[0].blocks.length);

    // Maintenant déployer ce VRAI projet
    console.log('\n📦 Déploiement du projet réel...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: project.id, // Utiliser l'ID du vrai projet
        siteId: crypto.randomUUID(),
        siteName: `plomberie-dupont-${Date.now()}`,
        projectData: projectData,
        plan: 'pro',
        adminEmail: 'admin@plomberie-dupont.fr'
      })
    });

    const responseText = await response.text();
    console.log('Réponse brute:', responseText.substring(0, 200));
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Erreur de parsing JSON');
      console.error('Réponse complète:', responseText);
      return;
    }
    
    if (result.success) {
      console.log('✅ DÉPLOIEMENT RÉUSSI !\n');
      console.log('🌐 Site : ' + result.siteUrl);
      console.log('🔧 Admin : ' + result.adminUrl);
      console.log('\n🔑 Connexion :');
      console.log('Email : ' + result.credentials.email);
      console.log('Mot de passe : ' + result.credentials.password);
      
      console.log('\n📋 Vérifications à faire :');
      console.log('1. Header avec navigation complète');
      console.log('2. Hero avec image et 2 boutons');
      console.log('3. Services avec 4 cartes et prix');
      console.log('4. Features en timeline');
      console.log('5. Gallery avec filtres par catégorie');
      console.log('6. Testimonials en carousel 3D');
      console.log('7. FAQ avec recherche et catégories');
      console.log('8. FORMULAIRE DE CONTACT AVEC 8 CHAMPS RÉELS');
      console.log('9. Footer avec toutes les infos');
      
    } else {
      console.error('❌ Erreur:', result.error);
      if (result.details) {
        console.error('Détails:', result.details);
      }
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Vérifier que le serveur est lancé
fetch('http://localhost:3000/api/health')
  .then(() => createAndDeployRealProject())
  .catch(() => {
    console.log('⚠️  Serveur non détecté');
    console.log('   Lancez le serveur avec: npm run dev');
    process.exit(1);
  });
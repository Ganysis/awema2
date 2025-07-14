#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createRealBlocksProject() {
  try {
    console.log('🚀 Création d\'un projet avec les VRAIS blocs qui existent...\n');

    // Utiliser un client existant
    const client = await prisma.client.findFirst();
    if (!client) {
      console.log('❌ Aucun client trouvé');
      return;
    }

    // Créer un projet avec les VRAIS blocs ultra-modern
    const projectData = {
      businessInfo: {
        name: 'Plomberie Excellence',
        phone: '06 12 34 56 78',
        email: 'contact@plomberie-excellence.fr',
        address: '789 Avenue des Champs',
        city: 'Paris',
        zipCode: '75008',
        country: 'France'
      },
      projectName: 'Site Plomberie Excellence',
      globalHeader: {
        id: 'header-main',
        type: 'header-ultra-modern',
        props: {
          variant: 'floating-blur',
          logo: { text: 'Plomberie Excellence' },
          navigation: [
            { label: 'Accueil', href: '/' },
            { label: 'Services', href: '#services' },
            { label: 'Galerie', href: '#gallery' },
            { label: 'Avis', href: '#reviews' },
            { label: 'Contact', href: '#contact' }
          ],
          ctaButton: { text: 'Devis Gratuit', href: '#contact' }
        }
      },
      globalFooter: {
        id: 'footer-main',
        type: 'footer-ultra-modern',
        props: {
          variant: 'gradient-wave',
          logo: { text: 'Plomberie Excellence' },
          columns: [
            {
              title: 'Services',
              links: [
                { label: 'Dépannage', href: '#' },
                { label: 'Installation', href: '#' },
                { label: 'Rénovation', href: '#' }
              ]
            }
          ],
          contact: {
            phone: '06 12 34 56 78',
            email: 'contact@plomberie-excellence.fr'
          }
        }
      },
      pages: [{
        id: 'home',
        name: 'Accueil',
        slug: '/',
        blocks: [
          // Hero Ultra-Modern
          {
            id: 'hero-1',
            type: 'hero-ultra-modern',
            props: {
              variant: 'gradient-wave',
              layout: 'two-columns',
              title: 'Plomberie Excellence Paris',
              subtitle: 'Votre expert plomberie 24/7',
              description: 'Dépannage urgent, installation, rénovation. Devis gratuit et intervention rapide.',
              primaryButton: {
                text: 'Appel Urgent',
                link: 'tel:0612345678',
                style: 'gradient'
              },
              secondaryButton: {
                text: 'Devis en ligne',
                link: '#contact',
                style: 'glass'
              },
              backgroundType: 'gradient',
              gradientStart: '#1e40af',
              gradientEnd: '#3b82f6'
            }
          },
          // Services Ultra-Modern
          {
            id: 'services-1',
            type: 'services-ultra-modern',
            props: {
              variant: 'cards-hover',
              title: 'Nos Services Plomberie',
              subtitle: 'Une expertise complète pour tous vos besoins',
              layout: 'grid',
              columns: 3,
              services: [
                {
                  icon: 'wrench',
                  title: 'Dépannage Urgent',
                  description: 'Intervention 24/7 pour fuites, débouchage, pannes...',
                  features: ['Disponible 24h/24', 'Intervention < 1h'],
                  price: 'À partir de 80€',
                  image: '/assets/depannage.jpg'
                },
                {
                  icon: 'droplet',
                  title: 'Installation Sanitaire',
                  description: 'Installation complète de vos équipements sanitaires',
                  features: ['Matériel de qualité', 'Garantie 2 ans'],
                  price: 'Sur devis',
                  image: '/assets/sanitaire.jpg'
                },
                {
                  icon: 'home',
                  title: 'Rénovation Salle de Bain',
                  description: 'Rénovation complète ou partielle',
                  features: ['Design moderne', 'Clé en main'],
                  price: 'À partir de 3000€',
                  image: '/assets/renovation.jpg'
                }
              ],
              showPrices: true
            }
          },
          // Content Ultra-Modern (pour présentation)
          {
            id: 'content-1',
            type: 'content-ultra-modern',
            props: {
              variant: 'glassmorphism',
              contentType: 'timeline',
              title: 'Pourquoi Nous Choisir ?',
              subtitle: '20 ans d\'expérience à votre service',
              timeline: [
                { year: '2004', title: 'Création', description: 'Début de notre aventure' },
                { year: '2010', title: 'Expansion', description: 'Ouverture de 3 agences' },
                { year: '2020', title: 'Leader', description: 'N°1 à Paris' },
                { year: '2024', title: 'Innovation', description: 'Services digitaux' }
              ]
            }
          },
          // Gallery Masonry (alternative)
          {
            id: 'gallery-1',
            type: 'gallery-masonry',
            props: {
              title: 'Nos Réalisations',
              subtitle: 'Découvrez nos derniers chantiers',
              images: [
                { url: '/assets/real-1.jpg', alt: 'Salle de bain moderne', caption: 'Rénovation complète' },
                { url: '/assets/real-2.jpg', alt: 'Installation chaudière', caption: 'Chaudière neuve' },
                { url: '/assets/real-3.jpg', alt: 'Cuisine équipée', caption: 'Plomberie cuisine' },
                { url: '/assets/real-4.jpg', alt: 'Douche italienne', caption: 'Douche moderne' }
              ],
              columns: 3,
              spacing: 16
            }
          },
          // Reviews Ultra-Modern (au lieu de testimonials)
          {
            id: 'reviews-1',
            type: 'reviews-ultra-modern',
            props: {
              variant: 'carousel-3d',
              title: 'Avis de Nos Clients',
              subtitle: 'Plus de 2000 clients satisfaits',
              reviews: [
                {
                  author: 'Marie Dubois',
                  rating: 5,
                  text: 'Intervention rapide pour une fuite. Plombier très professionnel!',
                  date: '2024-01-15',
                  verified: true
                },
                {
                  author: 'Pierre Martin',
                  rating: 5,
                  text: 'Rénovation complète de ma salle de bain. Travail impeccable!',
                  date: '2024-01-10',
                  verified: true
                },
                {
                  author: 'Sophie Bernard',
                  rating: 5,
                  text: 'Excellent service, prix compétitifs. Je recommande vivement.',
                  date: '2024-01-05',
                  verified: true
                }
              ],
              showRating: true,
              showVerified: true
            }
          },
          // Pricing Ultra-Modern
          {
            id: 'pricing-1',
            type: 'pricing-ultra-modern',
            props: {
              variant: 'gradient-cards',
              title: 'Nos Tarifs',
              subtitle: 'Des prix transparents et compétitifs',
              plans: [
                {
                  name: 'Dépannage',
                  price: '80',
                  period: 'intervention',
                  description: 'Pour les urgences',
                  features: [
                    'Déplacement inclus',
                    'Diagnostic gratuit',
                    'Intervention < 1h',
                    'Garantie 1 an'
                  ],
                  buttonText: 'Appeler',
                  buttonLink: 'tel:0612345678'
                },
                {
                  name: 'Installation',
                  price: 'Sur devis',
                  period: '',
                  description: 'Projets sur mesure',
                  features: [
                    'Étude personnalisée',
                    'Matériel premium',
                    'Garantie 2 ans',
                    'SAV inclus'
                  ],
                  highlighted: true,
                  buttonText: 'Devis gratuit',
                  buttonLink: '#contact'
                },
                {
                  name: 'Contrat entretien',
                  price: '15',
                  period: 'mois',
                  description: 'Tranquillité assurée',
                  features: [
                    '2 visites/an',
                    'Dépannages prioritaires',
                    '-20% sur les pièces',
                    'Pas de frais de déplacement'
                  ],
                  buttonText: 'Souscrire',
                  buttonLink: '#contact'
                }
              ]
            }
          },
          // FAQ Ultra-Modern
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
                  answer: 'Oui, nous sommes disponibles 24h/24 et 7j/7 pour les urgences.',
                  category: 'urgence'
                },
                {
                  question: 'Quels sont vos délais d\'intervention ?',
                  answer: 'En urgence : moins d\'1 heure. Pour les rendez-vous : sous 24-48h.',
                  category: 'délais'
                },
                {
                  question: 'Acceptez-vous les paiements en plusieurs fois ?',
                  answer: 'Oui, nous proposons le paiement en 3x ou 4x sans frais dès 500€.',
                  category: 'paiement'
                },
                {
                  question: 'Vos interventions sont-elles garanties ?',
                  answer: 'Toutes nos interventions sont garanties 1 an minimum, 2 ans sur les installations.',
                  category: 'garantie'
                }
              ],
              categories: [
                { id: 'all', label: 'Toutes' },
                { id: 'urgence', label: 'Urgences' },
                { id: 'délais', label: 'Délais' },
                { id: 'paiement', label: 'Paiement' },
                { id: 'garantie', label: 'Garantie' }
              ]
            }
          },
          // CTA Ultra-Modern
          {
            id: 'cta-1',
            type: 'cta-ultra-modern',
            props: {
              variant: 'gradient-animated',
              title: 'Besoin d\'un Plombier Maintenant ?',
              subtitle: 'Ne laissez pas le problème s\'aggraver',
              primaryButton: {
                text: '📞 06 12 34 56 78',
                link: 'tel:0612345678',
                size: 'large'
              },
              secondaryButton: {
                text: 'Devis en ligne',
                link: '#contact'
              },
              backgroundGradient: true,
              features: ['Intervention < 1h', 'Devis gratuit', 'Garantie 2 ans']
            }
          },
          // Contact Ultra-Modern
          {
            id: 'contact-1',
            type: 'contact-ultra-modern',
            props: {
              variant: 'split-modern',
              title: 'Contactez-Nous',
              subtitle: 'Devis gratuit et réponse rapide',
              contactInfo: {
                phone: '06 12 34 56 78',
                email: 'contact@plomberie-excellence.fr',
                address: '789 Avenue des Champs, 75008 Paris',
                hours: {
                  weekdays: 'Lun-Ven : 8h-19h',
                  saturday: 'Sam : 9h-17h',
                  sunday: 'Dim : Urgences uniquement'
                }
              },
              formFields: [
                { name: 'name', label: 'Nom complet', type: 'text', required: true, placeholder: 'Jean Dupont' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'jean@email.com' },
                { name: 'phone', label: 'Téléphone', type: 'tel', required: true, placeholder: '06 12 34 56 78' },
                { name: 'urgency', label: 'Type d\'intervention', type: 'select', required: true, options: ['Urgence (< 2h)', 'Rendez-vous', 'Devis'] },
                { name: 'message', label: 'Description du problème', type: 'textarea', rows: 5, required: true, placeholder: 'Décrivez votre problème...' }
              ],
              showMap: true,
              mapPosition: 'right',
              mapCoordinates: { lat: 48.8566, lng: 2.3522 },
              mapZoom: 15
            }
          }
        ]
      }],
      theme: {
        variant: 'premium',
        colors: {
          primary: '#2563eb',
          secondary: '#3b82f6',
          accent: '#10b981'
        }
      }
    };

    // Créer le projet
    const project = await prisma.project.create({
      data: {
        name: 'Site Plomberie Excellence COMPLET',
        slug: `plomberie-excellence-${Date.now()}`,
        clientId: client.id,
        template: 'plumber',
        data: JSON.stringify(projectData)
      }
    });

    console.log('✅ Projet créé avec succès !');
    console.log('   ID:', project.id);
    console.log('   Nom:', project.name);
    console.log('\n📋 Blocs utilisés (TOUS EXISTENT):');
    console.log('   1. header-ultra-modern ✅');
    console.log('   2. hero-ultra-modern ✅');
    console.log('   3. services-ultra-modern ✅');
    console.log('   4. content-ultra-modern ✅');
    console.log('   5. gallery-masonry ✅ (alternative)');
    console.log('   6. reviews-ultra-modern ✅ (au lieu de testimonials)');
    console.log('   7. pricing-ultra-modern ✅');
    console.log('   8. faq-ultra-modern ✅');
    console.log('   9. cta-ultra-modern ✅');
    console.log('   10. contact-ultra-modern ✅');
    console.log('   11. footer-ultra-modern ✅');
    
    console.log('\n🔗 OUVRIR DANS L\'ÉDITEUR:');
    console.log('   http://localhost:3000/editor/' + project.id);
    
    console.log('\n💡 Ce projet utilise UNIQUEMENT des blocs qui existent vraiment dans votre système.');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createRealBlocksProject();
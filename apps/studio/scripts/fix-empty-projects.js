/**
 * Script pour corriger les projets vides en leur ajoutant des données de base
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixEmptyProjects() {
  try {
    console.log('🔧 Recherche des projets sans données...\n');

    // Trouver tous les projets sans données
    const emptyProjects = await prisma.project.findMany({
      where: {
        OR: [
          { data: null },
          { data: '' },
          { data: '{}' }
        ]
      },
      include: {
        client: true
      }
    });

    console.log(`📊 ${emptyProjects.length} projets vides trouvés\n`);

    for (const project of emptyProjects) {
      console.log(`📝 Correction du projet: ${project.name} (${project.id})`);

      // Générer des données de base pour le projet
      const projectData = {
        businessInfo: {
          companyName: project.client?.companyName || project.client?.name || 'Mon Entreprise',
          industry: {
            category: 'artisan',
            subCategory: project.template || 'general',
            keywords: []
          },
          description: project.description || '',
          targetAudience: {
            demographics: {
              ageRange: [25, 65],
              gender: ['all'],
              income: 'medium',
              education: ['high_school'],
              location: [project.client?.city || 'France']
            },
            psychographics: {
              interests: [],
              values: [],
              lifestyle: [],
              challenges: []
            },
            behaviors: []
          },
          services: [],
          contact: {
            email: project.client?.email || 'contact@entreprise.fr',
            phone: project.client?.phone || '01 23 45 67 89',
            address: {
              street: project.client?.address || '123 rue Exemple',
              city: project.client?.city || 'Paris',
              postalCode: project.client?.postalCode || '75001',
              country: project.client?.country || 'France'
            }
          }
        },
        projectName: project.name,
        globalHeader: {
          id: 'header-global',
          type: 'header-ultra-modern',
          props: {
            variant: 'gradient-underline',
            logo: {
              text: project.client?.companyName || project.name,
              image: null
            },
            navigation: [
              { label: 'Accueil', href: '/', isActive: true },
              { label: 'Services', href: '/services' },
              { label: 'À propos', href: '/about' },
              { label: 'Contact', href: '/contact' }
            ],
            ctaButton: {
              text: 'Devis gratuit',
              href: '/contact'
            }
          }
        },
        globalFooter: {
          id: 'footer-global',
          type: 'footer-ultra-modern',
          props: {
            variant: 'gradient-wave',
            companyInfo: {
              name: project.client?.companyName || project.name,
              description: 'Votre partenaire de confiance',
              logo: null
            },
            sections: [
              {
                title: 'Services',
                links: [
                  { label: 'Service 1', href: '#' },
                  { label: 'Service 2', href: '#' },
                  { label: 'Service 3', href: '#' }
                ]
              },
              {
                title: 'Informations',
                links: [
                  { label: 'À propos', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Mentions légales', href: '/legal' }
                ]
              }
            ],
            contactInfo: {
              email: project.client?.email || 'contact@entreprise.fr',
              phone: project.client?.phone || '01 23 45 67 89',
              address: project.client?.address || '123 rue Exemple'
            },
            socialLinks: [],
            bottomBar: {
              copyrightText: `© ${new Date().getFullYear()} ${project.client?.companyName || project.name}. Tous droits réservés.`,
              links: []
            }
          }
        },
        pages: [
          {
            id: 'home',
            name: 'Accueil',
            path: '/',
            blocks: [
              {
                id: 'hero-1',
                type: 'hero-ultra-modern',
                props: {
                  variant: 'gradient-waves',
                  title: project.client?.companyName || project.name,
                  subtitle: 'Votre partenaire de confiance pour tous vos projets',
                  ctaText: 'Découvrir nos services',
                  ctaLink: '/services',
                  secondaryCtaText: 'Contact',
                  secondaryCtaLink: '/contact',
                  backgroundImage: null,
                  showStats: false
                }
              },
              {
                id: 'features-1',
                type: 'features-ultra-modern',
                props: {
                  displayMode: 'grid',
                  title: 'Nos Services',
                  subtitle: 'Découvrez notre gamme complète de services',
                  features: [
                    {
                      id: 'feature-1',
                      title: 'Service 1',
                      description: 'Description du service 1',
                      icon: 'check-circle'
                    },
                    {
                      id: 'feature-2',
                      title: 'Service 2',
                      description: 'Description du service 2',
                      icon: 'star'
                    },
                    {
                      id: 'feature-3',
                      title: 'Service 3',
                      description: 'Description du service 3',
                      icon: 'shield-check'
                    }
                  ]
                }
              },
              {
                id: 'cta-1',
                type: 'cta-ultra-modern',
                props: {
                  variant: 'glassmorphism',
                  title: 'Prêt à démarrer votre projet ?',
                  description: 'Contactez-nous dès maintenant pour obtenir un devis gratuit',
                  primaryButtonText: 'Demander un devis',
                  primaryButtonLink: '/contact',
                  secondaryButtonText: 'En savoir plus',
                  secondaryButtonLink: '/about'
                }
              }
            ],
            seo: {
              title: `${project.client?.companyName || project.name} - Accueil`,
              description: project.seoDescription || 'Bienvenue sur notre site',
              keywords: []
            }
          },
          {
            id: 'services',
            name: 'Services',
            path: '/services',
            blocks: [
              {
                id: 'content-services',
                type: 'content-ultra-modern',
                props: {
                  contentType: 'richText',
                  title: 'Nos Services',
                  content: '<p>Découvrez notre gamme complète de services professionnels.</p>'
                }
              }
            ],
            seo: {
              title: 'Nos Services',
              description: 'Découvrez notre gamme complète de services',
              keywords: []
            }
          },
          {
            id: 'contact',
            name: 'Contact',
            path: '/contact',
            blocks: [
              {
                id: 'contact-1',
                type: 'contact-ultra-modern',
                props: {
                  variant: 'split-screen',
                  title: 'Contactez-nous',
                  subtitle: 'Nous sommes là pour répondre à toutes vos questions',
                  showMap: true,
                  mapPosition: 'right',
                  businessInfo: {
                    name: project.client?.companyName || project.name,
                    phone: project.client?.phone || '01 23 45 67 89',
                    email: project.client?.email || 'contact@entreprise.fr',
                    address: project.client?.address || '123 rue Exemple',
                    hours: {
                      monday: '9h00 - 18h00',
                      tuesday: '9h00 - 18h00',
                      wednesday: '9h00 - 18h00',
                      thursday: '9h00 - 18h00',
                      friday: '9h00 - 18h00',
                      saturday: 'Fermé',
                      sunday: 'Fermé'
                    }
                  }
                }
              }
            ],
            seo: {
              title: 'Contact',
              description: 'Contactez-nous pour plus d\'informations',
              keywords: []
            }
          }
        ],
        theme: {
          variant: project.features?.theme || 'premium',
          colors: {
            primary: '#2563eb',
            secondary: '#7c3aed',
            accent: '#f59e0b',
            background: '#ffffff',
            surface: '#f9fafb',
            text: '#111827',
            textSecondary: '#6b7280',
            textMuted: '#9ca3af',
            border: '#e5e7eb',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
          }
        }
      };

      // Mettre à jour le projet avec les données
      await prisma.project.update({
        where: { id: project.id },
        data: {
          data: JSON.stringify(projectData)
        }
      });

      console.log(`✅ Projet ${project.name} corrigé avec succès\n`);
    }

    console.log('✨ Tous les projets vides ont été corrigés !');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Options du script
const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log(`
Usage: node fix-empty-projects.js [options]

Options:
  --help     Affiche cette aide
  
Ce script trouve tous les projets sans données et leur ajoute des données de base
pour qu'ils puissent être édités dans l'éditeur.
  `);
  process.exit(0);
}

// Lancer la correction
fixEmptyProjects();
const fs = require('fs');
const path = require('path');

// Lire le fichier HTML enhanced
const htmlPath = path.join(__dirname, 'test-cms-export', 'admin', 'cms-admin-enhanced.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Données enrichies pour le CMS
const enhancedData = {
  pages: [
    {
      id: 'home',
      name: 'Accueil',
      slug: '/',
      meta: {
        title: 'Plomberie Dupont - Expert plombier à Paris',
        description: 'Plomberie Dupont, votre expert en plomberie depuis 1990. Dépannage, installation, rénovation.'
      },
      blocks: [
        {
          id: 'hero-1',
          type: 'hero-centered',
          isVisible: true,
          props: {
            title: 'Expert Plombier à Paris depuis 1990',
            subtitle: 'Dépannage rapide, installation et rénovation. Intervention 24/7 sur Paris et région parisienne.',
            buttonText: 'Demander un devis gratuit',
            buttonLink: '/contact',
            backgroundImage: '/images/hero-plumber.jpg'
          }
        },
        {
          id: 'services-1',
          type: 'services-grid-cards',
          isVisible: true,
          props: {
            title: 'Nos Services de Plomberie',
            subtitle: 'Une expertise complète pour tous vos besoins',
            services: [
              {
                title: 'Dépannage Urgent',
                description: 'Intervention rapide 24/7 pour fuites, débouchage et urgences.',
                icon: '🚨',
                link: '/services/depannage'
              },
              {
                title: 'Installation Sanitaire',
                description: 'Installation de salles de bain, WC, chauffe-eau et robinetterie.',
                icon: '🔧',
                link: '/services/installation'
              },
              {
                title: 'Rénovation',
                description: 'Rénovation complète de salle de bain et mise aux normes.',
                icon: '🏗️',
                link: '/services/renovation'
              },
              {
                title: 'Entretien',
                description: 'Contrats d\'entretien pour chaudières et installations.',
                icon: '🔍',
                link: '/services/entretien'
              }
            ]
          }
        },
        {
          id: 'features-1',
          type: 'features-clean',
          isVisible: true,
          props: {
            title: 'Pourquoi nous choisir ?',
            features: [
              {
                title: '30 ans d\'expérience',
                description: 'Une expertise reconnue depuis 1990',
                icon: '⭐'
              },
              {
                title: 'Devis gratuit',
                description: 'Estimation transparente sans engagement',
                icon: '📋'
              },
              {
                title: 'Garantie 2 ans',
                description: 'Toutes nos interventions sont garanties',
                icon: '✅'
              },
              {
                title: 'Disponible 24/7',
                description: 'Urgences plomberie jour et nuit',
                icon: '🕐'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'services',
      name: 'Services',
      slug: '/services',
      meta: {
        title: 'Nos Services de Plomberie - Plomberie Dupont',
        description: 'Découvrez tous nos services : dépannage, installation, rénovation et entretien.'
      },
      blocks: [
        {
          id: 'services-hero',
          type: 'hero-centered',
          isVisible: true,
          props: {
            title: 'Nos Services',
            subtitle: 'Une gamme complète de prestations pour tous vos besoins en plomberie'
          }
        }
      ]
    },
    {
      id: 'contact',
      name: 'Contact',
      slug: '/contact',
      meta: {
        title: 'Contactez-nous - Plomberie Dupont',
        description: 'Contactez Plomberie Dupont pour un devis gratuit ou une urgence.'
      },
      blocks: [
        {
          id: 'contact-1',
          type: 'contact-form-map',
          isVisible: true,
          props: {
            title: 'Contactez-nous',
            subtitle: 'Nous sommes à votre écoute pour tous vos projets',
            description: 'Remplissez le formulaire ci-dessous ou appelez-nous directement.',
            showMap: true,
            mapAddress: '123 Rue de la Paix, 75001 Paris',
            formFields: [
              {
                name: 'name',
                label: 'Nom',
                type: 'text',
                required: true
              },
              {
                name: 'email',
                label: 'Email',
                type: 'email',
                required: true
              },
              {
                name: 'phone',
                label: 'Téléphone',
                type: 'tel',
                required: true
              },
              {
                name: 'message',
                label: 'Message',
                type: 'textarea',
                required: true
              }
            ]
          }
        }
      ]
    }
  ],
  businessInfo: {
    companyName: 'Plomberie Dupont & Fils',
    phone: '01 23 45 67 89',
    email: 'contact@plomberie-dupont.fr',
    address: '123 Rue de la Paix',
    city: 'Paris',
    postalCode: '75001',
    description: 'Votre expert en plomberie depuis 1990. Intervention rapide, travail soigné, prix transparents.',
    openingHours: {
      monday: '8h00 - 19h00',
      tuesday: '8h00 - 19h00',
      wednesday: '8h00 - 19h00',
      thursday: '8h00 - 19h00',
      friday: '8h00 - 19h00',
      saturday: '9h00 - 18h00',
      sunday: 'Urgences uniquement'
    },
    socialLinks: {
      facebook: 'https://facebook.com/plomberiedupont',
      instagram: 'https://instagram.com/plomberiedupont'
    }
  },
  globalHeader: {
    id: 'header-global',
    type: 'header-pro',
    props: {
      logo: 'Plomberie Dupont',
      menuItems: [
        {
          label: 'Accueil',
          href: '/'
        },
        {
          label: 'Services',
          href: '/services'
        },
        {
          label: 'Tarifs',
          href: '/tarifs'
        },
        {
          label: 'Contact',
          href: '/contact'
        }
      ],
      ctaText: 'Urgence 24/7',
      ctaHref: 'tel:0123456789'
    }
  },
  globalFooter: {
    id: 'footer-global',
    type: 'footer-pro',
    props: {
      companyName: 'Plomberie Dupont & Fils',
      description: 'Votre expert plombier à Paris depuis 1990',
      quickLinks: [
        {
          label: 'Services',
          href: '/services'
        },
        {
          label: 'Tarifs',
          href: '/tarifs'
        },
        {
          label: 'Contact',
          href: '/contact'
        },
        {
          label: 'Mentions légales',
          href: '/mentions-legales'
        }
      ]
    }
  },
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F3F4F6',
      text: '#1F2937',
      textSecondary: '#6B7280'
    },
    typography: {
      fontFamily: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
      }
    }
  }
};

// Remplacer les données dans le fichier
const dataRegex = /window\.CMS_INITIAL_DATA = {[\s\S]*?};/;
const newDataScript = `window.CMS_INITIAL_DATA = ${JSON.stringify(enhancedData, null, 8)};`;

htmlContent = htmlContent.replace(dataRegex, newDataScript);

// Sauvegarder le fichier
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ Données CMS enhanced mises à jour !');
console.log('📄 Pages:', enhancedData.pages.length);
console.log('🎨 Thème configuré avec couleurs personnalisables');
console.log('🚀 Redémarrez le serveur pour voir les changements');
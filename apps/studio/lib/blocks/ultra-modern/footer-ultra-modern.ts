import { Block } from '@awema/templates';

export const footerUltraModern: Block = {
  id: 'footer-ultra-modern',
  type: 'footer-ultra-modern',
  category: 'footer',
  name: 'Footer Ultra-Moderne',
  description: 'Pied de page ultra-moderne avec 8 variantes, widgets dynamiques et intégrations avancées',
  props: {
    variant: {
      type: 'select',
      label: 'Variante visuelle',
      default: 'gradient-wave',
      options: [
        { value: 'gradient-wave', label: 'Vague dégradée' },
        { value: 'minimal-clean', label: 'Minimaliste épuré' },
        { value: 'corporate-pro', label: 'Corporate professionnel' },
        { value: 'creative-shapes', label: 'Formes créatives' },
        { value: 'dark-elegant', label: 'Sombre élégant' },
        { value: 'colorful-blocks', label: 'Blocs colorés' },
        { value: 'tech-grid', label: 'Grille tech' },
        { value: 'organic-flow', label: 'Flux organique' }
      ]
    },
    companyName: {
      type: 'text',
      label: 'Nom de l\'entreprise',
      default: 'Votre Entreprise'
    },
    logo: {
      type: 'object',
      label: 'Logo footer',
      fields: {
        type: {
          type: 'select',
          label: 'Type',
          default: 'text',
          options: [
            { value: 'text', label: 'Texte' },
            { value: 'image', label: 'Image' },
            { value: 'both', label: 'Image + Texte' }
          ]
        },
        image: {
          type: 'image',
          label: 'Image du logo'
        },
        height: {
          type: 'number',
          label: 'Hauteur logo (px)',
          default: 40,
          min: 20,
          max: 80
        }
      }
    },
    description: {
      type: 'textarea',
      label: 'Description entreprise',
      default: 'Votre partenaire de confiance pour tous vos projets.'
    },
    columns: {
      type: 'array',
      label: 'Colonnes de liens',
      itemType: 'object',
      fields: {
        title: {
          type: 'text',
          label: 'Titre',
          default: 'Services'
        },
        links: {
          type: 'array',
          label: 'Liens',
          itemType: 'object',
          fields: {
            text: {
              type: 'text',
              label: 'Texte',
              default: 'Lien'
            },
            url: {
              type: 'text',
              label: 'URL',
              default: '#'
            },
            icon: {
              type: 'icon',
              label: 'Icône'
            },
            badge: {
              type: 'text',
              label: 'Badge',
              placeholder: 'Nouveau'
            }
          }
        }
      },
      default: [
        {
          title: 'Services',
          links: [
            { text: 'Service 1', url: '/service1' },
            { text: 'Service 2', url: '/service2' },
            { text: 'Service 3', url: '/service3' }
          ]
        },
        {
          title: 'Informations',
          links: [
            { text: 'À propos', url: '/about' },
            { text: 'Contact', url: '/contact' },
            { text: 'Blog', url: '/blog' }
          ]
        }
      ]
    },
    contactInfo: {
      type: 'object',
      label: 'Informations de contact',
      fields: {
        phone: {
          type: 'text',
          label: 'Téléphone',
          default: '01 23 45 67 89'
        },
        email: {
          type: 'text',
          label: 'Email',
          default: 'contact@example.com'
        },
        address: {
          type: 'textarea',
          label: 'Adresse',
          default: '123 Rue Example, 75001 Paris'
        },
        hours: {
          type: 'array',
          label: 'Horaires',
          itemType: 'object',
          fields: {
            days: {
              type: 'text',
              label: 'Jours',
              default: 'Lun - Ven'
            },
            hours: {
              type: 'text',
              label: 'Heures',
              default: '9h - 18h'
            }
          }
        }
      }
    },
    socialLinks: {
      type: 'array',
      label: 'Réseaux sociaux',
      itemType: 'object',
      fields: {
        platform: {
          type: 'select',
          label: 'Plateforme',
          default: 'facebook',
          options: [
            { value: 'facebook', label: 'Facebook' },
            { value: 'instagram', label: 'Instagram' },
            { value: 'twitter', label: 'Twitter' },
            { value: 'linkedin', label: 'LinkedIn' },
            { value: 'youtube', label: 'YouTube' },
            { value: 'tiktok', label: 'TikTok' },
            { value: 'whatsapp', label: 'WhatsApp' }
          ]
        },
        url: {
          type: 'text',
          label: 'URL',
          default: 'https://facebook.com'
        }
      },
      default: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    newsletter: {
      type: 'object',
      label: 'Newsletter',
      fields: {
        enabled: {
          type: 'boolean',
          label: 'Activer',
          default: true
        },
        title: {
          type: 'text',
          label: 'Titre',
          default: 'Newsletter'
        },
        description: {
          type: 'text',
          label: 'Description',
          default: 'Restez informé de nos actualités'
        },
        placeholder: {
          type: 'text',
          label: 'Placeholder',
          default: 'Votre email'
        },
        buttonText: {
          type: 'text',
          label: 'Texte bouton',
          default: 'S\'inscrire'
        },
        style: {
          type: 'select',
          label: 'Style',
          default: 'inline',
          options: [
            { value: 'inline', label: 'En ligne' },
            { value: 'stacked', label: 'Empilé' },
            { value: 'card', label: 'Carte' },
            { value: 'minimal', label: 'Minimal' },
            { value: 'floating', label: 'Flottant' }
          ]
        }
      }
    },
    widgets: {
      type: 'object',
      label: 'Widgets dynamiques',
      fields: {
        recentPosts: {
          type: 'boolean',
          label: 'Articles récents',
          default: false
        },
        socialWall: {
          type: 'boolean',
          label: 'Mur social (Instagram/Facebook)',
          default: false
        },
        testimonial: {
          type: 'boolean',
          label: 'Témoignage du mois',
          default: false
        },
        trustBadges: {
          type: 'boolean',
          label: 'Badges de confiance',
          default: true
        }
      }
    },
    paymentMethods: {
      type: 'array',
      label: 'Moyens de paiement',
      itemType: 'select',
      options: [
        { value: 'visa', label: 'Visa' },
        { value: 'mastercard', label: 'Mastercard' },
        { value: 'paypal', label: 'PayPal' },
        { value: 'stripe', label: 'Stripe' },
        { value: 'applepay', label: 'Apple Pay' },
        { value: 'googlepay', label: 'Google Pay' }
      ],
      default: ['visa', 'mastercard', 'paypal']
    },
    certifications: {
      type: 'array',
      label: 'Certifications',
      itemType: 'object',
      fields: {
        name: {
          type: 'text',
          label: 'Nom',
          default: 'Certification'
        },
        image: {
          type: 'image',
          label: 'Logo'
        },
        url: {
          type: 'text',
          label: 'Lien'
        }
      }
    },
    bottomLinks: {
      type: 'array',
      label: 'Liens bas de page',
      itemType: 'object',
      fields: {
        text: {
          type: 'text',
          label: 'Texte',
          default: 'Mentions légales'
        },
        url: {
          type: 'text',
          label: 'URL',
          default: '/legal'
        }
      },
      default: [
        { text: 'Mentions légales', url: '/legal' },
        { text: 'Politique de confidentialité', url: '/privacy' },
        { text: 'CGV', url: '/terms' },
        { text: 'Cookies', url: '/cookies' }
      ]
    },
    copyright: {
      type: 'text',
      label: 'Copyright',
      default: '© {year} {company}. Tous droits réservés.'
    },
    backToTop: {
      type: 'object',
      label: 'Bouton retour en haut',
      fields: {
        enabled: {
          type: 'boolean',
          label: 'Activer',
          default: true
        },
        style: {
          type: 'select',
          label: 'Style',
          default: 'circle',
          options: [
            { value: 'circle', label: 'Cercle' },
            { value: 'square', label: 'Carré' },
            { value: 'rocket', label: 'Fusée' },
            { value: 'arrow', label: 'Flèche' }
          ]
        }
      }
    },
    cookieNotice: {
      type: 'object',
      label: 'Bandeau cookies',
      fields: {
        enabled: {
          type: 'boolean',
          label: 'Activer',
          default: true
        },
        text: {
          type: 'text',
          label: 'Texte',
          default: 'Nous utilisons des cookies pour améliorer votre expérience.'
        },
        acceptText: {
          type: 'text',
          label: 'Texte accepter',
          default: 'Accepter'
        },
        declineText: {
          type: 'text',
          label: 'Texte refuser',
          default: 'Refuser'
        },
        position: {
          type: 'select',
          label: 'Position',
          default: 'bottom',
          options: [
            { value: 'bottom', label: 'Bas' },
            { value: 'top', label: 'Haut' },
            { value: 'center', label: 'Centre (modal)' }
          ]
        }
      }
    }
  }
};
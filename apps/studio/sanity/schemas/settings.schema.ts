import { defineField, defineType } from 'sanity';

/**
 * Schéma pour les paramètres globaux du site
 */
export const settingsSchema = defineType({
  name: 'settings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'businessInfo',
      title: 'Informations entreprise',
      type: 'object',
      fields: [
        {
          name: 'businessName',
          title: 'Nom de l\'entreprise',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'legalName',
          title: 'Dénomination légale',
          type: 'string'
        },
        {
          name: 'businessType',
          title: 'Type d\'activité',
          type: 'string',
          options: {
            list: [
              { title: 'Plombier', value: 'plombier' },
              { title: 'Électricien', value: 'electricien' },
              { title: 'Menuisier', value: 'menuisier' },
              { title: 'Paysagiste', value: 'paysagiste' },
              { title: 'Maçon', value: 'macon' },
              { title: 'Peintre', value: 'peintre' },
              { title: 'Couvreur', value: 'couvreur' },
              { title: 'Chauffagiste', value: 'chauffagiste' }
            ]
          }
        },
        {
          name: 'tagline',
          title: 'Slogan/Accroche',
          type: 'string',
          validation: Rule => Rule.max(100)
        },
        {
          name: 'description',
          title: 'Description de l\'entreprise',
          type: 'text',
          validation: Rule => Rule.max(300)
        }
      ]
    }),

    defineField({
      name: 'contact',
      title: 'Coordonnées',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Téléphone principal',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'mobile',
          title: 'Mobile',
          type: 'string'
        },
        {
          name: 'emergencyPhone',
          title: 'Urgence 24h/7j',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email principal',
          type: 'string',
          validation: Rule => Rule.required().email()
        },
        {
          name: 'contactEmail',
          title: 'Email de contact',
          type: 'string',
          validation: Rule => Rule.email()
        },
        {
          name: 'website',
          title: 'Site web',
          type: 'url'
        }
      ]
    }),

    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Rue',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'city',
          title: 'Ville',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'postalCode',
          title: 'Code postal',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'region',
          title: 'Région',
          type: 'string'
        },
        {
          name: 'country',
          title: 'Pays',
          type: 'string',
          initialValue: 'France'
        },
        {
          name: 'coordinates',
          title: 'Coordonnées GPS',
          type: 'object',
          fields: [
            {
              name: 'lat',
              title: 'Latitude',
              type: 'number'
            },
            {
              name: 'lng',
              title: 'Longitude',
              type: 'number'
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'hours',
      title: 'Horaires d\'ouverture',
      type: 'object',
      fields: [
        {
          name: 'monday',
          title: 'Lundi',
          type: 'string',
          initialValue: '8h00-18h00'
        },
        {
          name: 'tuesday',
          title: 'Mardi',
          type: 'string',
          initialValue: '8h00-18h00'
        },
        {
          name: 'wednesday',
          title: 'Mercredi',
          type: 'string',
          initialValue: '8h00-18h00'
        },
        {
          name: 'thursday',
          title: 'Jeudi',
          type: 'string',
          initialValue: '8h00-18h00'
        },
        {
          name: 'friday',
          title: 'Vendredi',
          type: 'string',
          initialValue: '8h00-18h00'
        },
        {
          name: 'saturday',
          title: 'Samedi',
          type: 'string',
          initialValue: '8h00-12h00'
        },
        {
          name: 'sunday',
          title: 'Dimanche',
          type: 'string',
          initialValue: 'Fermé'
        },
        {
          name: 'emergency',
          title: 'Urgences',
          type: 'string',
          initialValue: '24h/7j sur appel'
        }
      ]
    }),

    defineField({
      name: 'legal',
      title: 'Informations légales',
      type: 'object',
      fields: [
        {
          name: 'siret',
          title: 'SIRET',
          type: 'string'
        },
        {
          name: 'rcs',
          title: 'RCS',
          type: 'string'
        },
        {
          name: 'vatNumber',
          title: 'Numéro TVA',
          type: 'string'
        },
        {
          name: 'insurance',
          title: 'Assurance professionnelle',
          type: 'object',
          fields: [
            {
              name: 'company',
              title: 'Compagnie',
              type: 'string'
            },
            {
              name: 'policyNumber',
              title: 'Numéro de police',
              type: 'string'
            },
            {
              name: 'validUntil',
              title: 'Valide jusqu\'au',
              type: 'date'
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'branding',
      title: 'Image de marque',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Logo principal',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ]
        },
        {
          name: 'logoWhite',
          title: 'Logo blanc (fond sombre)',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          options: {
            accept: '.ico,.png'
          }
        },
        {
          name: 'colors',
          title: 'Couleurs',
          type: 'object',
          fields: [
            {
              name: 'primary',
              title: 'Couleur primaire',
              type: 'color',
              options: {
                disableAlpha: true
              }
            },
            {
              name: 'secondary',
              title: 'Couleur secondaire',
              type: 'color',
              options: {
                disableAlpha: true
              }
            },
            {
              name: 'accent',
              title: 'Couleur d\'accent',
              type: 'color',
              options: {
                disableAlpha: true
              }
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'socialMedia',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url'
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url'
        }
      ]
    }),

    defineField({
      name: 'seo',
      title: 'Configuration SEO globale',
      type: 'object',
      fields: [
        {
          name: 'siteTitle',
          title: 'Titre du site',
          type: 'string',
          validation: Rule => Rule.required().max(60)
        },
        {
          name: 'siteDescription',
          title: 'Description du site',
          type: 'text',
          validation: Rule => Rule.required().max(160)
        },
        {
          name: 'keywords',
          title: 'Mots-clés principaux',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'ogImage',
          title: 'Image Open Graph',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string'
        },
        {
          name: 'googleSearchConsole',
          title: 'Google Search Console',
          type: 'string'
        },
        {
          name: 'facebookPixel',
          title: 'Facebook Pixel ID',
          type: 'string'
        }
      ]
    }),

    defineField({
      name: 'features',
      title: 'Fonctionnalités activées',
      type: 'object',
      fields: [
        {
          name: 'onlineBooking',
          title: 'Réservation en ligne',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'quoteCalculator',
          title: 'Calculateur de devis',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'testimonials',
          title: 'Témoignages clients',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'projectGallery',
          title: 'Galerie de projets',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'blog',
          title: 'Blog/Actualités',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'emergencyMode',
          title: 'Mode urgence 24h/7j',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'multiLanguage',
          title: 'Multi-langues',
          type: 'boolean',
          initialValue: false
        }
      ]
    }),

    defineField({
      name: 'notifications',
      title: 'Notifications',
      type: 'object',
      fields: [
        {
          name: 'newLeadEmail',
          title: 'Email nouveau prospect',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'appointmentEmail',
          title: 'Email nouveau RDV',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'reviewAlert',
          title: 'Alerte nouveaux avis',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'weeklyReport',
          title: 'Rapport hebdomadaire',
          type: 'boolean',
          initialValue: false
        }
      ]
    }),

    defineField({
      name: 'integrations',
      title: 'Intégrations',
      type: 'object',
      fields: [
        {
          name: 'calendly',
          title: 'Calendly URL',
          type: 'url'
        },
        {
          name: 'mailchimp',
          title: 'Mailchimp API Key',
          type: 'string'
        },
        {
          name: 'stripe',
          title: 'Stripe Public Key',
          type: 'string'
        },
        {
          name: 'zapier',
          title: 'Zapier Webhook',
          type: 'url'
        }
      ]
    }),

    defineField({
      name: 'maintenance',
      title: 'Mode maintenance',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Activer le mode maintenance',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'message',
          title: 'Message de maintenance',
          type: 'text',
          initialValue: 'Site en maintenance. Nous revenons bientôt !'
        },
        {
          name: 'allowedIPs',
          title: 'IPs autorisées',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'IPs qui peuvent accéder au site en maintenance'
        }
      ]
    }),

    defineField({
      name: 'createdAt',
      title: 'Créé le',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString()
    }),

    defineField({
      name: 'updatedAt',
      title: 'Mis à jour le',
      type: 'datetime',
      readOnly: true
    })
  ],

  preview: {
    select: {
      title: 'businessInfo.businessName',
      subtitle: 'businessInfo.businessType',
      media: 'branding.logo'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Paramètres du site',
        subtitle: subtitle || 'Configuration générale',
        media
      };
    }
  }
});

export default settingsSchema;
import { defineField, defineType } from 'sanity';

/**
 * Schéma principal pour un site client
 * Contient toutes les informations de base du site
 */
export const clientSiteSchema = defineType({
  name: 'clientSite',
  title: 'Site Client',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Nom de l\'entreprise',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100)
    }),

    defineField({
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
          { title: 'Chauffagiste', value: 'chauffagiste' },
          { title: 'Autre', value: 'autre' }
        ]
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'domain',
      title: 'Nom de domaine',
      type: 'string',
      validation: Rule => Rule.required().regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
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
    }),

    defineField({
      name: 'colors',
      title: 'Couleurs du site',
      type: 'object',
      fields: [
        {
          name: 'primary',
          title: 'Couleur primaire',
          type: 'color',
          validation: Rule => Rule.required()
        },
        {
          name: 'secondary',
          title: 'Couleur secondaire',
          type: 'color'
        },
        {
          name: 'accent',
          title: 'Couleur d\'accent',
          type: 'color'
        },
        {
          name: 'text',
          title: 'Couleur du texte',
          type: 'color'
        },
        {
          name: 'background',
          title: 'Couleur de fond',
          type: 'color'
        }
      ]
    }),

    defineField({
      name: 'contact',
      title: 'Informations de contact',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Téléphone',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: Rule => Rule.required().email()
        },
        {
          name: 'address',
          title: 'Adresse',
          type: 'text',
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
          validation: Rule => Rule.required().regex(/^[0-9]{5}$/)
        },
        {
          name: 'emergencyPhone',
          title: 'Téléphone urgence (24h/7j)',
          type: 'string'
        },
        {
          name: 'hours',
          title: 'Horaires d\'ouverture',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'siret',
          title: 'SIRET',
          type: 'string'
        },
        {
          name: 'rcs',
          title: 'RCS',
          type: 'string'
        }
      ]
    }),

    defineField({
      name: 'seo',
      title: 'Configuration SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre SEO',
          type: 'string',
          validation: Rule => Rule.required().min(10).max(60)
        },
        {
          name: 'description',
          title: 'Description SEO',
          type: 'text',
          validation: Rule => Rule.required().min(50).max(160)
        },
        {
          name: 'keywords',
          title: 'Mots-clés',
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
        }
      ]
    }),

    defineField({
      name: 'zones',
      title: 'Zones d\'intervention',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom de la zone',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Ville', value: 'city' },
                  { title: 'Département', value: 'department' },
                  { title: 'Région', value: 'region' },
                  { title: 'Zone personnalisée', value: 'custom' }
                ]
              }
            },
            {
              name: 'radius',
              title: 'Rayon (km)',
              type: 'number'
            },
            {
              name: 'priority',
              title: 'Priorité',
              type: 'number',
              validation: Rule => Rule.min(1).max(10)
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'certifications',
      title: 'Certifications et labels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'logo',
              title: 'Logo de certification',
              type: 'image'
            },
            {
              name: 'validUntil',
              title: 'Valide jusqu\'au',
              type: 'date'
            },
            {
              name: 'certificateNumber',
              title: 'Numéro de certificat',
              type: 'string'
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
        }
      ]
    }),

    defineField({
      name: 'template',
      title: 'Template sélectionné',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'En cours de création', value: 'creating' },
          { title: 'En développement', value: 'development' },
          { title: 'En test', value: 'testing' },
          { title: 'Actif', value: 'active' },
          { title: 'Suspendu', value: 'suspended' },
          { title: 'Archivé', value: 'archived' }
        ]
      },
      initialValue: 'creating'
    }),

    defineField({
      name: 'createdAt',
      title: 'Créé le',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),

    defineField({
      name: 'lastModified',
      title: 'Dernière modification',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),

    defineField({
      name: 'clientId',
      title: 'ID Client AWEMA',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'metadata',
      title: 'Métadonnées',
      type: 'object',
      fields: [
        {
          name: 'formVersion',
          title: 'Version du formulaire',
          type: 'string'
        },
        {
          name: 'generatedBy',
          title: 'Généré par',
          type: 'string',
          initialValue: 'awema-auto-setup'
        },
        {
          name: 'deploymentId',
          title: 'ID de déploiement',
          type: 'string'
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'businessName',
      subtitle: 'businessType',
      media: 'logo'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: `${subtitle} - ${new Date().toLocaleDateString()}`,
        media
      };
    }
  },

  orderings: [
    {
      title: 'Nom d\'entreprise',
      name: 'businessName',
      by: [{ field: 'businessName', direction: 'asc' }]
    },
    {
      title: 'Date de création',
      name: 'createdAt',
      by: [{ field: 'createdAt', direction: 'desc' }]
    }
  ]
});

export default clientSiteSchema;
import { defineField, defineType } from 'sanity';

/**
 * Schéma pour les services selon le métier
 * Adaptable automatiquement selon le type d'activité
 */
export const servicesSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du service',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(100)
    }),

    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'shortDescription',
      title: 'Description courte',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(200),
      description: 'Description affichée dans les listes de services'
    }),

    defineField({
      name: 'fullDescription',
      title: 'Description complète',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'businessType',
      title: 'Type de métier',
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
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'category',
      title: 'Catégorie de service',
      type: 'string',
      options: {
        list: [
          // Plomberie
          { title: 'Dépannage urgence', value: 'urgence-plomberie' },
          { title: 'Installation', value: 'installation-plomberie' },
          { title: 'Rénovation', value: 'renovation-plomberie' },
          { title: 'Entretien', value: 'entretien-plomberie' },

          // Électricité
          { title: 'Installation électrique', value: 'installation-electricite' },
          { title: 'Domotique', value: 'domotique' },
          { title: 'Mise aux normes', value: 'normes-electricite' },
          { title: 'Dépannage électrique', value: 'depannage-electricite' },

          // Menuiserie
          { title: 'Aménagement intérieur', value: 'amenagement-interieur' },
          { title: 'Menuiserie extérieure', value: 'menuiserie-exterieure' },
          { title: 'Sur-mesure', value: 'sur-mesure' },
          { title: 'Rénovation menuiserie', value: 'renovation-menuiserie' },

          // Paysagisme
          { title: 'Création jardins', value: 'creation-jardins' },
          { title: 'Entretien espaces verts', value: 'entretien-jardins' },
          { title: 'Élagage', value: 'elagage' },
          { title: 'Arrosage automatique', value: 'arrosage' },

          // Général
          { title: 'Conseil', value: 'conseil' },
          { title: 'Devis', value: 'devis' }
        ]
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'pricing',
      title: 'Tarification',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type de prix',
          type: 'string',
          options: {
            list: [
              { title: 'Prix fixe', value: 'fixed' },
              { title: 'À partir de', value: 'starting' },
              { title: 'Forfait', value: 'package' },
              { title: 'Devis sur mesure', value: 'quote' },
              { title: 'Gratuit', value: 'free' }
            ]
          }
        },
        {
          name: 'amount',
          title: 'Montant',
          type: 'number'
        },
        {
          name: 'unit',
          title: 'Unité',
          type: 'string',
          options: {
            list: [
              { title: '€', value: 'euro' },
              { title: '€/h', value: 'hour' },
              { title: '€/m²', value: 'm2' },
              { title: '€/ml', value: 'ml' },
              { title: '€/jour', value: 'day' }
            ]
          }
        },
        {
          name: 'displayText',
          title: 'Texte d\'affichage',
          type: 'string',
          description: 'Ex: "À partir de 80€" ou "Sur devis"'
        }
      ]
    }),

    defineField({
      name: 'features',
      title: 'Caractéristiques incluses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Caractéristique',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'included',
              title: 'Inclus',
              type: 'boolean',
              initialValue: true
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'urgency',
      title: 'Service d\'urgence',
      type: 'object',
      fields: [
        {
          name: 'available',
          title: 'Disponible 24h/7j',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'emergencyPhone',
          title: 'Numéro d\'urgence',
          type: 'string'
        },
        {
          name: 'additionalCost',
          title: 'Supplément urgence',
          type: 'number'
        },
        {
          name: 'responseTime',
          title: 'Délai d\'intervention',
          type: 'string',
          options: {
            list: [
              { title: 'Immédiat', value: 'immediate' },
              { title: '30 minutes', value: '30min' },
              { title: '1 heure', value: '1h' },
              { title: '2 heures', value: '2h' },
              { title: 'Jour même', value: 'same-day' }
            ]
          }
        }
      ]
    }),

    defineField({
      name: 'areas',
      title: 'Zones d\'intervention',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),

    defineField({
      name: 'requirements',
      title: 'Prérequis et informations',
      type: 'object',
      fields: [
        {
          name: 'materials',
          title: 'Matériaux fournis',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'tools',
          title: 'Outillage fourni',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'warranty',
          title: 'Garantie (mois)',
          type: 'number',
          validation: Rule => Rule.min(0).max(120)
        },
        {
          name: 'insurance',
          title: 'Assurance décennale',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'certifications',
          title: 'Certifications requises',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),

    defineField({
      name: 'seo',
      title: 'SEO spécifique',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre SEO',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'description',
          title: 'Meta description',
          type: 'text',
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Mots-clés spécifiques',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ]
    }),

    defineField({
      name: 'images',
      title: 'Images du service',
      type: 'array',
      of: [
        {
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
            },
            {
              name: 'caption',
              title: 'Légende',
              type: 'string'
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'featured',
      title: 'Service mis en avant',
      type: 'boolean',
      initialValue: false,
      description: 'Affiché en priorité sur la page d\'accueil'
    }),

    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: Rule => Rule.min(0).max(100)
    }),

    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Actif', value: 'active' },
          { title: 'Brouillon', value: 'draft' },
          { title: 'Désactivé', value: 'disabled' },
          { title: 'Archivé', value: 'archived' }
        ]
      },
      initialValue: 'active'
    }),

    defineField({
      name: 'createdAt',
      title: 'Créé le',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),

    defineField({
      name: 'updatedAt',
      title: 'Mis à jour le',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      description: 'shortDescription',
      media: 'images.0'
    },
    prepare(selection) {
      const { title, subtitle, description, media } = selection;
      return {
        title,
        subtitle,
        description,
        media
      };
    }
  },

  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Nom du service',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Services mis en avant',
      name: 'featured',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
});

/**
 * Schéma pour le contenu riche (Block Content)
 */
export const blockContentSchema = defineType({
  name: 'blockContent',
  title: 'Contenu riche',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Titre H2', value: 'h2' },
        { title: 'Titre H3', value: 'h3' },
        { title: 'Titre H4', value: 'h4' },
        { title: 'Citation', value: 'blockquote' }
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
          { title: 'Souligné', value: 'underline' }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: Rule => Rule.required()
              },
              {
                name: 'target',
                type: 'string',
                title: 'Cible',
                options: {
                  list: [
                    { title: 'Même onglet', value: '_self' },
                    { title: 'Nouvel onglet', value: '_blank' }
                  ]
                }
              }
            ]
          }
        ]
      }
    },
    {
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
        },
        {
          name: 'caption',
          title: 'Légende',
          type: 'string'
        }
      ]
    }
  ]
});

export default servicesSchema;
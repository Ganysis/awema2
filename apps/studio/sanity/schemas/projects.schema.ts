import { defineField, defineType } from 'sanity';

/**
 * Schéma pour les projets/réalisations
 */
export const projectsSchema = defineType({
  name: 'project',
  title: 'Projet / Réalisation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(100)
    }),

    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'shortDescription',
      title: 'Description courte',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(200),
      description: 'Description affichée dans la galerie de projets'
    }),

    defineField({
      name: 'fullDescription',
      title: 'Description complète',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'location',
      title: 'Lieu du projet',
      type: 'object',
      fields: [
        {
          name: 'city',
          title: 'Ville',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'district',
          title: 'Quartier/Zone',
          type: 'string'
        },
        {
          name: 'postalCode',
          title: 'Code postal',
          type: 'string'
        }
      ]
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
      title: 'Catégorie de projet',
      type: 'string',
      options: {
        list: [
          // Plomberie
          { title: 'Rénovation salle de bain', value: 'renovation-sdb' },
          { title: 'Installation chauffe-eau', value: 'chauffe-eau' },
          { title: 'Création cuisine', value: 'cuisine' },
          { title: 'Dépannage urgence', value: 'depannage' },

          // Électricité
          { title: 'Rénovation électrique', value: 'renovation-elec' },
          { title: 'Installation domotique', value: 'domotique' },
          { title: 'Éclairage extérieur', value: 'eclairage-ext' },
          { title: 'Tableau électrique', value: 'tableau' },

          // Menuiserie
          { title: 'Aménagement sur-mesure', value: 'sur-mesure' },
          { title: 'Rénovation parquet', value: 'parquet' },
          { title: 'Menuiserie extérieure', value: 'ext-menuiserie' },
          { title: 'Placards intégrés', value: 'placards' },

          // Paysagisme
          { title: 'Création jardin', value: 'creation-jardin' },
          { title: 'Terrasse', value: 'terrasse' },
          { title: 'Piscine et abords', value: 'piscine' },
          { title: 'Entretien espaces verts', value: 'entretien' },

          // Maçonnerie
          { title: 'Extension maison', value: 'extension' },
          { title: 'Rénovation façade', value: 'facade' },
          { title: 'Création ouverture', value: 'ouverture' },
          { title: 'Terrassement', value: 'terrassement' }
        ]
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'timeline',
      title: 'Chronologie du projet',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Date de début',
          type: 'date',
          validation: Rule => Rule.required()
        },
        {
          name: 'endDate',
          title: 'Date de fin',
          type: 'date',
          validation: Rule => Rule.required()
        },
        {
          name: 'duration',
          title: 'Durée des travaux',
          type: 'string',
          description: 'Ex: 3 jours, 2 semaines, 1 mois'
        }
      ]
    }),

    defineField({
      name: 'budget',
      title: 'Information budget',
      type: 'object',
      fields: [
        {
          name: 'range',
          title: 'Fourchette de prix',
          type: 'string',
          options: {
            list: [
              { title: 'Moins de 500€', value: 'under-500' },
              { title: '500€ - 1000€', value: '500-1000' },
              { title: '1000€ - 2500€', value: '1000-2500' },
              { title: '2500€ - 5000€', value: '2500-5000' },
              { title: '5000€ - 10000€', value: '5000-10000' },
              { title: 'Plus de 10000€', value: 'over-10000' }
            ]
          }
        },
        {
          name: 'showBudget',
          title: 'Afficher le budget',
          type: 'boolean',
          initialValue: false
        }
      ]
    }),

    defineField({
      name: 'images',
      title: 'Images du projet',
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
              title: 'Description',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'stage',
              title: 'Étape',
              type: 'string',
              options: {
                list: [
                  { title: 'Avant travaux', value: 'before' },
                  { title: 'En cours - Étape 1', value: 'progress-1' },
                  { title: 'En cours - Étape 2', value: 'progress-2' },
                  { title: 'En cours - Étape 3', value: 'progress-3' },
                  { title: 'Après travaux', value: 'after' },
                  { title: 'Détail technique', value: 'detail' },
                  { title: 'Vue d\'ensemble', value: 'overview' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'featured',
              title: 'Image principale',
              type: 'boolean',
              initialValue: false
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(3).max(20)
    }),

    defineField({
      name: 'technicalDetails',
      title: 'Détails techniques',
      type: 'object',
      fields: [
        {
          name: 'materials',
          title: 'Matériaux utilisés',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'techniques',
          title: 'Techniques employées',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'challenges',
          title: 'Défis techniques',
          type: 'text'
        },
        {
          name: 'innovations',
          title: 'Solutions innovantes',
          type: 'text'
        }
      ]
    }),

    defineField({
      name: 'clientFeedback',
      title: 'Retour client',
      type: 'object',
      fields: [
        {
          name: 'testimonial',
          title: 'Témoignage',
          type: 'text'
        },
        {
          name: 'rating',
          title: 'Note',
          type: 'number',
          validation: Rule => Rule.min(1).max(5),
          options: {
            list: [
              { title: '⭐ 1/5', value: 1 },
              { title: '⭐⭐ 2/5', value: 2 },
              { title: '⭐⭐⭐ 3/5', value: 3 },
              { title: '⭐⭐⭐⭐ 4/5', value: 4 },
              { title: '⭐⭐⭐⭐⭐ 5/5', value: 5 }
            ]
          }
        },
        {
          name: 'clientName',
          title: 'Nom du client',
          type: 'string'
        },
        {
          name: 'anonymous',
          title: 'Anonymiser',
          type: 'boolean',
          initialValue: true
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
      name: 'featured',
      title: 'Projet mis en avant',
      type: 'boolean',
      initialValue: false,
      description: 'Affiché en priorité sur la page d\'accueil'
    }),

    defineField({
      name: 'awards',
      title: 'Récompenses/Reconnaissances',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titre',
              type: 'string'
            },
            {
              name: 'organization',
              title: 'Organisation',
              type: 'string'
            },
            {
              name: 'date',
              title: 'Date',
              type: 'date'
            },
            {
              name: 'certificate',
              title: 'Certificat',
              type: 'image'
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'relatedServices',
      title: 'Services liés',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }]
        }
      ]
    }),

    defineField({
      name: 'tags',
      title: 'Étiquettes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),

    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Brouillon', value: 'draft' },
          { title: 'En révision', value: 'review' },
          { title: 'Publié', value: 'published' },
          { title: 'Archivé', value: 'archived' }
        ]
      },
      initialValue: 'draft'
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publié le',
      type: 'datetime'
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
      title: 'title',
      subtitle: 'category',
      location: 'location.city',
      media: 'images.0'
    },
    prepare(selection) {
      const { title, subtitle, location, media } = selection;
      return {
        title,
        subtitle: `${subtitle} - ${location}`,
        media
      };
    }
  },

  orderings: [
    {
      title: 'Date de publication',
      name: 'publishedAt',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Projets mis en avant',
      name: 'featured',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Date des travaux',
      name: 'workDate',
      by: [{ field: 'timeline.endDate', direction: 'desc' }]
    }
  ]
});

export default projectsSchema;
import { defineField, defineType } from 'sanity';

/**
 * Schéma pour les témoignages clients
 */
export const testimonialsSchema = defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Nom du client',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50)
    }),

    defineField({
      name: 'clientInitials',
      title: 'Initiales',
      type: 'string',
      validation: Rule => Rule.max(3),
      description: 'Ex: M.D. (pour confidentialité)'
    }),

    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Ville ou quartier'
    }),

    defineField({
      name: 'rating',
      title: 'Note',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1/5', value: 1 },
          { title: '⭐⭐ 2/5', value: 2 },
          { title: '⭐⭐⭐ 3/5', value: 3 },
          { title: '⭐⭐⭐⭐ 4/5', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5/5', value: 5 }
        ]
      }
    }),

    defineField({
      name: 'testimonialText',
      title: 'Témoignage',
      type: 'text',
      validation: Rule => Rule.required().min(50).max(500),
      description: 'Le témoignage du client (50-500 caractères)'
    }),

    defineField({
      name: 'serviceType',
      title: 'Type de service',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'Dépannage urgence', value: 'urgence' },
          { title: 'Installation', value: 'installation' },
          { title: 'Rénovation', value: 'renovation' },
          { title: 'Entretien', value: 'entretien' },
          { title: 'Conseil', value: 'conseil' },
          { title: 'Devis', value: 'devis' },
          { title: 'Autre', value: 'autre' }
        ]
      }
    }),

    defineField({
      name: 'workDate',
      title: 'Date des travaux',
      type: 'date',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'verified',
      title: 'Témoignage vérifié',
      type: 'boolean',
      initialValue: true,
      description: 'Client réel avec preuve de travaux'
    }),

    defineField({
      name: 'source',
      title: 'Source du témoignage',
      type: 'string',
      options: {
        list: [
          { title: 'Google Reviews', value: 'google' },
          { title: 'Site web', value: 'website' },
          { title: 'Email client', value: 'email' },
          { title: 'Téléphone', value: 'phone' },
          { title: 'Réseaux sociaux', value: 'social' },
          { title: 'Autre', value: 'other' }
        ]
      }
    }),

    defineField({
      name: 'clientPhoto',
      title: 'Photo du client',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string'
        }
      ],
      description: 'Optionnel - avec accord du client'
    }),

    defineField({
      name: 'workPhotos',
      title: 'Photos des travaux',
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
                  { title: 'En cours', value: 'during' },
                  { title: 'Après travaux', value: 'after' }
                ]
              }
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'projectDetails',
      title: 'Détails du projet',
      type: 'object',
      fields: [
        {
          name: 'duration',
          title: 'Durée des travaux',
          type: 'string',
          description: 'Ex: 2 heures, 1 jour, 1 semaine'
        },
        {
          name: 'budget',
          title: 'Budget approximatif',
          type: 'string',
          options: {
            list: [
              { title: 'Moins de 200€', value: 'under-200' },
              { title: '200€ - 500€', value: '200-500' },
              { title: '500€ - 1000€', value: '500-1000' },
              { title: '1000€ - 2000€', value: '1000-2000' },
              { title: 'Plus de 2000€', value: 'over-2000' }
            ]
          }
        },
        {
          name: 'complexity',
          title: 'Complexité',
          type: 'string',
          options: {
            list: [
              { title: 'Simple', value: 'simple' },
              { title: 'Moyen', value: 'medium' },
              { title: 'Complexe', value: 'complex' }
            ]
          }
        }
      ]
    }),

    defineField({
      name: 'highlights',
      title: 'Points forts mentionnés',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Ex: Ponctualité, Propreté, Prix, Qualité, etc.'
    }),

    defineField({
      name: 'featured',
      title: 'Témoignage vedette',
      type: 'boolean',
      initialValue: false,
      description: 'Affiché en priorité sur la page d\'accueil'
    }),

    defineField({
      name: 'displaySettings',
      title: 'Paramètres d\'affichage',
      type: 'object',
      fields: [
        {
          name: 'showFullName',
          title: 'Afficher le nom complet',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'showPhoto',
          title: 'Afficher la photo',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'showWorkPhotos',
          title: 'Afficher les photos de travaux',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'allowSharing',
          title: 'Autoriser le partage',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),

    defineField({
      name: 'businessType',
      title: 'Type de métier concerné',
      type: 'array',
      of: [{ type: 'string' }],
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
      validation: Rule => Rule.required().min(1)
    }),

    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'En attente de validation', value: 'pending' },
          { title: 'Validé', value: 'approved' },
          { title: 'Publié', value: 'published' },
          { title: 'Masqué', value: 'hidden' },
          { title: 'Archivé', value: 'archived' }
        ]
      },
      initialValue: 'pending'
    }),

    defineField({
      name: 'moderationNotes',
      title: 'Notes de modération',
      type: 'text',
      description: 'Notes internes pour la validation'
    }),

    defineField({
      name: 'googleReviewId',
      title: 'ID Google Review',
      type: 'string',
      description: 'Si importé depuis Google Reviews'
    }),

    defineField({
      name: 'createdAt',
      title: 'Créé le',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publié le',
      type: 'datetime'
    })
  ],

  preview: {
    select: {
      title: 'clientName',
      subtitle: 'rating',
      description: 'testimonialText',
      media: 'clientPhoto'
    },
    prepare(selection) {
      const { title, subtitle, description, media } = selection;
      const stars = '⭐'.repeat(subtitle);
      return {
        title: title || 'Témoignage anonyme',
        subtitle: `${stars} (${subtitle}/5)`,
        description: description?.substring(0, 100) + '...',
        media
      };
    }
  },

  orderings: [
    {
      title: 'Note (meilleure d\'abord)',
      name: 'ratingDesc',
      by: [
        { field: 'rating', direction: 'desc' },
        { field: 'createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Date (plus récent d\'abord)',
      name: 'dateDesc',
      by: [{ field: 'createdAt', direction: 'desc' }]
    },
    {
      title: 'Témoignages vedettes',
      name: 'featured',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'rating', direction: 'desc' }
      ]
    }
  ]
});

export default testimonialsSchema;
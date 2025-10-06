import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingPageMetier',
  title: 'Landing Page Métier',
  type: 'document',
  fields: [
    defineField({
      name: 'metier',
      title: 'Métier',
      type: 'string',
      options: {
        list: [
          {title: 'Plombier', value: 'plombier'},
          {title: 'Électricien', value: 'electricien'},
          {title: 'Menuisier', value: 'menuisier'},
          {title: 'Maçon', value: 'macon'},
          {title: 'Paysagiste', value: 'paysagiste'},
          {title: 'Carreleur', value: 'carreleur'},
          {title: 'Peintre', value: 'peintre'},
          {title: 'Chauffagiste', value: 'chauffagiste'},
          {title: 'Couvreur', value: 'couvreur'},
          {title: 'Serrurier', value: 'serrurier'},
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ville',
      title: 'Ville',
      type: 'string',
      options: {
        list: [
          {title: 'Paris', value: 'paris'},
          {title: 'Lyon', value: 'lyon'},
          {title: 'Marseille', value: 'marseille'},
          {title: 'Toulouse', value: 'toulouse'},
          {title: 'Nice', value: 'nice'},
          {title: 'Nantes', value: 'nantes'},
          {title: 'Strasbourg', value: 'strasbourg'},
          {title: 'Montpellier', value: 'montpellier'},
          {title: 'Bordeaux', value: 'bordeaux'},
          {title: 'Lille', value: 'lille'},
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: (doc: any) => `site-internet-${doc.metier}-${doc.ville}`,
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Titre principal',
          type: 'string',
        }),
        defineField({
          name: 'subheadline',
          title: 'Sous-titre',
          type: 'text',
        }),
        defineField({
          name: 'ctaText',
          title: 'Texte du CTA',
          type: 'string',
          initialValue: 'Obtenir ma maquette gratuite'
        }),
        defineField({
          name: 'trustBadges',
          title: 'Badges de confiance',
          type: 'array',
          of: [{type: 'string'}]
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Image de fond',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ]
    }),
    defineField({
      name: 'problems',
      title: 'Problèmes du métier',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Liste des problèmes',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'icon', title: 'Icône', type: 'string'},
                {name: 'problem', title: 'Problème', type: 'string'},
                {name: 'description', title: 'Description', type: 'text'},
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions AWEMA',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Liste des solutions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'icon', title: 'Icône', type: 'string'},
                {name: 'solution', title: 'Solution', type: 'string'},
                {name: 'description', title: 'Description', type: 'text'},
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'specialOffer',
      title: 'Offre spéciale',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre de l\'offre',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'discount',
          title: 'Réduction',
          type: 'string',
        }),
        defineField({
          name: 'urgency',
          title: 'Message d\'urgence',
          type: 'string',
          initialValue: 'Offre limitée - Plus que 3 places ce mois-ci'
        }),
        defineField({
          name: 'ctaText',
          title: 'Texte du CTA',
          type: 'string',
          initialValue: 'Je profite de l\'offre'
        }),
      ]
    }),
    defineField({
      name: 'localTestimonials',
      title: 'Témoignages locaux',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimonial'}]}]
    }),
    defineField({
      name: 'faq',
      title: 'FAQ métier',
      type: 'faq',
    }),
    defineField({
      name: 'finalCta',
      title: 'CTA final',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      metier: 'metier',
      ville: 'ville',
    },
    prepare({metier, ville}) {
      return {
        title: `${metier} - ${ville}`,
        subtitle: `Landing page métier`
      }
    }
  }
})
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pricingPlan',
  title: 'Formule tarifaire',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la formule',
      type: 'string',
      options: {
        list: [
          {title: 'STARTER', value: 'STARTER'},
          {title: 'BUSINESS', value: 'BUSINESS'},
          {title: 'PREMIUM', value: 'PREMIUM'},
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'popular',
      title: 'Formule populaire',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'setupPrice',
      title: 'Frais de création',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'monthlyPrice',
      title: 'Prix mensuel',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités incluses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'text', title: 'Texte', type: 'string'},
            {name: 'included', title: 'Inclus', type: 'boolean', initialValue: true},
          ]
        }
      ]
    }),
    defineField({
      name: 'highlights',
      title: 'Points forts',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'ctaText',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Commencer maintenant'
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      setupPrice: 'setupPrice',
      monthlyPrice: 'monthlyPrice',
    },
    prepare({title, setupPrice, monthlyPrice}) {
      return {
        title,
        subtitle: `Création: ${setupPrice}€ | Mensuel: ${monthlyPrice}€`
      }
    }
  }
})
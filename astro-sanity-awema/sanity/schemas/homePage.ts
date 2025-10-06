import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
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
      type: 'hero',
    }),
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'stats',
    }),
    defineField({
      name: 'process',
      title: 'Processus en 3 étapes',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Votre site en 3 étapes simples'
        }),
        defineField({
          name: 'steps',
          title: 'Étapes',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'number', title: 'Numéro', type: 'string'},
                {name: 'title', title: 'Titre', type: 'string'},
                {name: 'description', title: 'Description', type: 'text'},
                {name: 'icon', title: 'Icône', type: 'string'},
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités',
      type: 'features',
    }),
    defineField({
      name: 'pricing',
      title: 'Tarifs',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Des tarifs transparents pour tous les budgets'
        }),
        defineField({
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'text',
          initialValue: 'Choisissez la formule qui correspond à vos besoins. Sans engagement, sans frais cachés.'
        }),
        defineField({
          name: 'plans',
          title: 'Formules',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'pricingPlan'}]}]
        })
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Témoignages',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Ils nous font confiance'
        }),
        defineField({
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'text',
          initialValue: 'Découvrez ce que nos clients disent de nous'
        }),
        defineField({
          name: 'items',
          title: 'Témoignages',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'testimonial'}]}]
        })
      ]
    }),
    defineField({
      name: 'guarantees',
      title: 'Garanties',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
          initialValue: 'Nos garanties'
        }),
        defineField({
          name: 'items',
          title: 'Garanties',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'icon', title: 'Icône', type: 'string'},
                {name: 'title', title: 'Titre', type: 'string'},
                {name: 'description', title: 'Description', type: 'text'},
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Appel à l\'action final',
      type: 'cta',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'faq',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Page d\'accueil'
      }
    }
  }
})
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du client',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Entreprise',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
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
    }),
    defineField({
      name: 'location',
      title: 'Ville',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Témoignage',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Note',
      type: 'number',
      options: {
        list: [
          {title: '5 étoiles', value: 5},
          {title: '4 étoiles', value: 4},
          {title: '3 étoiles', value: 3},
        ]
      },
      initialValue: 5,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo du client',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'highlighted',
      title: 'Mettre en avant',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'results',
      title: 'Résultats obtenus',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'date',
      title: 'Date du témoignage',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      company: 'company',
      rating: 'rating',
      media: 'image',
    },
    prepare({title, company, rating}) {
      return {
        title,
        subtitle: `${company} - ${rating}⭐`
      }
    }
  }
})
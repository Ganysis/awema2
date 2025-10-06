import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Prêt à booster votre activité ?',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      initialValue: 'Obtenez votre maquette gratuite en 24h et découvrez ce que nous pouvons faire pour vous',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Bouton principal',
      type: 'object',
      fields: [
        {name: 'text', title: 'Texte', type: 'string', initialValue: 'Je veux ma maquette gratuite'},
        {name: 'link', title: 'Lien', type: 'string', initialValue: '#contact'},
      ]
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Bouton secondaire (optionnel)',
      type: 'object',
      fields: [
        {name: 'text', title: 'Texte', type: 'string'},
        {name: 'link', title: 'Lien', type: 'string'},
      ]
    }),
    defineField({
      name: 'urgencyMessage',
      title: 'Message d\'urgence',
      type: 'string',
      initialValue: 'Offre limitée - Plus que 3 places disponibles ce mois-ci',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Image de fond (optionnel)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
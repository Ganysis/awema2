import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'stats',
  title: 'Statistiques',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Les chiffres parlent d\'eux-mêmes',
    }),
    defineField({
      name: 'items',
      title: 'Statistiques',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'number', title: 'Chiffre', type: 'string'},
            {name: 'suffix', title: 'Suffixe', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'icon', title: 'Icône', type: 'string'},
          ]
        }
      ],
      initialValue: [
        {number: '300', suffix: '+', label: 'Sites livrés', icon: 'rocket'},
        {number: '48', suffix: 'h', label: 'Délai de livraison', icon: 'clock'},
        {number: '4.9', suffix: '/5', label: 'Note moyenne', icon: 'star'},
        {number: '0', suffix: '€', label: 'Frais techniques', icon: 'euro'},
      ]
    }),
  ],
})
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'Votre Site Web Professionnel en 48h',
    }),
    defineField({
      name: 'subheadline',
      title: 'Sous-titre',
      type: 'text',
      initialValue: 'À partir de 97€/mois - Sans Frais Cachés',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texte du bouton principal',
      type: 'string',
      initialValue: 'Obtenir ma maquette gratuite',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Texte du bouton secondaire',
      type: 'string',
      initialValue: 'Voir nos réalisations',
    }),
    defineField({
      name: 'trustBadges',
      title: 'Badges de confiance',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: [
        '+300 sites livrés',
        '4.9/5 ⭐⭐⭐⭐⭐',
        'Garantie satisfait ou remboursé'
      ]
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Image de fond',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL vidéo de présentation (optionnel)',
      type: 'url',
    }),
    defineField({
      name: 'showStats',
      title: 'Afficher les statistiques',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
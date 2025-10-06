import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'features',
  title: 'Fonctionnalités',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Tout ce dont vous avez besoin pour réussir en ligne',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      initialValue: 'Un site web professionnel avec toutes les fonctionnalités essentielles',
    }),
    defineField({
      name: 'items',
      title: 'Fonctionnalités',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon', title: 'Icône', type: 'string'},
            {name: 'title', title: 'Titre', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
            {name: 'highlighted', title: 'Mettre en avant', type: 'boolean', initialValue: false},
          ]
        }
      ],
      initialValue: [
        {
          icon: 'mobile',
          title: 'Responsive Mobile',
          description: 'Site parfaitement adapté à tous les écrans (mobile, tablette, ordinateur)',
          highlighted: true
        },
        {
          icon: 'search',
          title: 'SEO Optimisé',
          description: 'Référencement local optimisé pour être visible sur Google dans votre ville',
          highlighted: true
        },
        {
          icon: 'calendar',
          title: 'Prise de RDV en ligne',
          description: 'Système de réservation intégré pour que vos clients prennent rendez-vous 24/7',
        },
        {
          icon: 'shield',
          title: 'Sécurisé SSL',
          description: 'Certificat SSL inclus pour un site sécurisé et rassurant',
        },
        {
          icon: 'edit',
          title: 'Facilement modifiable',
          description: 'Interface simple pour modifier vos textes et images sans compétences techniques',
        },
        {
          icon: 'speed',
          title: 'Ultra rapide',
          description: 'Temps de chargement optimisé pour une expérience utilisateur parfaite',
        },
      ]
    }),
  ],
})
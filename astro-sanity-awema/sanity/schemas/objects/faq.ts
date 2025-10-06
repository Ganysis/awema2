import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Questions fréquentes',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      initialValue: 'Tout ce que vous devez savoir avant de vous lancer',
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Question', type: 'string'},
            {name: 'answer', title: 'Réponse', type: 'text'},
          ]
        }
      ],
      initialValue: [
        {
          question: 'Combien de temps faut-il pour créer mon site ?',
          answer: 'Nous livrons votre site professionnel en 48h après validation de la maquette. La maquette elle-même est créée en 24h après notre premier échange.'
        },
        {
          question: 'Puis-je modifier mon site moi-même ?',
          answer: 'Absolument ! Nous vous fournissons une interface simple et intuitive pour modifier vos textes, images et ajouter du contenu sans aucune compétence technique.'
        },
        {
          question: 'Y a-t-il des frais cachés ?',
          answer: 'Non, aucun frais caché. Le prix affiché inclut tout : hébergement, nom de domaine, certificat SSL, maintenance et support. Vous payez uniquement les frais de création puis l\'abonnement mensuel.'
        },
        {
          question: 'Que se passe-t-il si je ne suis pas satisfait ?',
          answer: 'Nous offrons une garantie satisfait ou remboursé de 30 jours. Si vous n\'êtes pas entièrement satisfait, nous vous remboursons intégralement.'
        },
        {
          question: 'Mon site sera-t-il bien référencé sur Google ?',
          answer: 'Oui ! Tous nos sites sont optimisés pour le référencement local. Nous mettons en place les meilleures pratiques SEO pour que vous soyez visible dans votre ville.'
        },
      ]
    }),
  ],
})
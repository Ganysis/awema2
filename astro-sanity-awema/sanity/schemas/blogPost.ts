import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Article de blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Conseils Marketing', value: 'marketing'},
          {title: 'SEO Local', value: 'seo'},
          {title: 'Guides Métiers', value: 'metiers'},
          {title: 'Actualités Web', value: 'actualites'},
          {title: 'Études de cas', value: 'etudes-cas'},
        ]
      },
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      initialValue: 'Équipe AWEMA'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true}
        },
        {
          type: 'code',
          options: {
            language: 'javascript',
            languageAlternatives: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'}
            ]
          }
        }
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      date: 'publishedAt'
    },
    prepare({title, author, date}) {
      return {
        title,
        subtitle: `${author} - ${date ? new Date(date).toLocaleDateString('fr-FR') : 'Brouillon'}`
      }
    }
  }
})
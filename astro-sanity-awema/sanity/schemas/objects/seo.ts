import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: Rule => Rule.max(60).warning('Le titre ne doit pas dépasser 60 caractères'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(160).warning('La description ne doit pas dépasser 160 caractères'),
    }),
    defineField({
      name: 'keywords',
      title: 'Mots-clés',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL canonique',
      type: 'url',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
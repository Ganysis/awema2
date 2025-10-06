import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      initialValue: 'AWEMA',
    }),
    defineField({
      name: 'siteUrl',
      title: 'URL du site',
      type: 'url',
      initialValue: 'https://awema.fr',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Numéro de téléphone',
      type: 'string',
      initialValue: '07 56 91 02 18',
    }),
    defineField({
      name: 'email',
      title: 'Email de contact',
      type: 'string',
      initialValue: 'contact@awema.fr',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      initialValue: 'Lyon, France',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook', type: 'url'},
        {name: 'twitter', title: 'Twitter', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'instagram', title: 'Instagram', type: 'url'},
      ]
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {name: 'googleAnalytics', title: 'Google Analytics ID', type: 'string'},
        {name: 'googleTagManager', title: 'Google Tag Manager ID', type: 'string'},
      ]
    }),
    defineField({
      name: 'integrations',
      title: 'Intégrations',
      type: 'object',
      fields: [
        {name: 'crispId', title: 'Crisp Chat ID', type: 'string'},
        {name: 'calendlyUrl', title: 'Calendly URL', type: 'url'},
      ]
    }),
    defineField({
      name: 'defaultSeo',
      title: 'SEO par défaut',
      type: 'seo',
    }),
    defineField({
      name: 'colors',
      title: 'Couleurs',
      type: 'object',
      fields: [
        {name: 'primary', title: 'Couleur principale', type: 'string', initialValue: '#2563eb'},
        {name: 'secondary', title: 'Couleur secondaire', type: 'string', initialValue: '#10b981'},
        {name: 'accent', title: 'Couleur d\'accent', type: 'string', initialValue: '#f59e0b'},
      ]
    }),
    defineField({
      name: 'footerText',
      title: 'Texte du footer',
      type: 'text',
      initialValue: 'AWEMA - Agence Web Spécialisée pour les Artisans du BTP',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Paramètres du site'
      }
    }
  }
})
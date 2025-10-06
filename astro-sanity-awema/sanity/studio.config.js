import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'AWEMA Studio',
  projectId: 'awema2024',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Page d\'accueil')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            S.listItem()
              .title('Landing Pages Métiers')
              .child(S.documentTypeList('landingPageMetier')),
            S.listItem()
              .title('Formules')
              .child(S.documentTypeList('pricingPlan')),
            S.listItem()
              .title('Témoignages')
              .child(S.documentTypeList('testimonial')),
            S.listItem()
              .title('Articles de Blog')
              .child(S.documentTypeList('blogPost')),
            S.divider(),
            S.listItem()
              .title('Paramètres du site')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: [],
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'homePage' && templateItem.templateId !== 'siteSettings')
      }
      return prev
    },
  },
})
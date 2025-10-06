import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'awema-studio',
  title: 'AWEMA Studio',
  projectId: 'awema2024',
  dataset: 'production',
  plugins: [
    deskTool({
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
    types: schemaTypes,
  },
})
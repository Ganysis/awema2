import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

// Configuration du client Sanity
export const sanityClient = createClient({
  projectId: 'awema2024',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: 'skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf',
})

// Builder pour les URLs d'images
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Requêtes GROQ communes
export const queries = {
  // Page d'accueil
  homePage: `*[_type == "homePage"][0]{
    title,
    seo,
    hero,
    stats,
    process,
    features,
    "pricing": pricing{
      title,
      subtitle,
      "plans": plans[]->
    },
    "testimonials": testimonials{
      title,
      subtitle,
      "items": items[]->
    },
    guarantees,
    cta,
    faq
  }`,

  // Landing page métier
  landingPage: (slug: string) => `*[_type == "landingPageMetier" && slug.current == "${slug}"][0]{
    metier,
    ville,
    slug,
    seo,
    hero,
    problems,
    solutions,
    specialOffer,
    "localTestimonials": localTestimonials[]->,
    faq,
    finalCta
  }`,

  // Tous les landing pages
  allLandingPages: `*[_type == "landingPageMetier"]{
    metier,
    ville,
    "slug": slug.current
  }`,

  // Formules tarifaires
  pricingPlans: `*[_type == "pricingPlan"] | order(order asc)`,

  // Témoignages
  testimonials: `*[_type == "testimonial" && highlighted == true] | order(_createdAt desc)[0...6]`,

  // Articles de blog
  blogPosts: `*[_type == "blogPost"] | order(publishedAt desc){
    title,
    "slug": slug.current,
    category,
    author,
    publishedAt,
    mainImage,
    excerpt
  }`,

  // Article de blog unique
  blogPost: (slug: string) => `*[_type == "blogPost" && slug.current == "${slug}"][0]{
    title,
    "slug": slug.current,
    category,
    author,
    publishedAt,
    mainImage,
    excerpt,
    body,
    seo
  }`,

  // Paramètres du site
  siteSettings: `*[_type == "siteSettings"][0]`
}

// Helpers pour récupérer les données
export async function getHomePage() {
  return await sanityClient.fetch(queries.homePage)
}

export async function getLandingPage(slug: string) {
  return await sanityClient.fetch(queries.landingPage(slug))
}

export async function getAllLandingPages() {
  return await sanityClient.fetch(queries.allLandingPages)
}

export async function getPricingPlans() {
  return await sanityClient.fetch(queries.pricingPlans)
}

export async function getTestimonials() {
  return await sanityClient.fetch(queries.testimonials)
}

export async function getBlogPosts() {
  return await sanityClient.fetch(queries.blogPosts)
}

export async function getBlogPost(slug: string) {
  return await sanityClient.fetch(queries.blogPost(slug))
}

export async function getSiteSettings() {
  return await sanityClient.fetch(queries.siteSettings)
}
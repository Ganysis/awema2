// Génération dynamique du sitemap pour un SEO optimal
import { getCollection } from 'astro:content';

export async function GET() {
  const blogPosts = await getCollection('blog');
  const pages = await getCollection('pages');

  const siteUrl = 'https://awema.fr';

  // Pages statiques prioritaires
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/pricing', changefreq: 'weekly', priority: 0.9 },
    { url: '/google-my-business', changefreq: 'weekly', priority: 0.9 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
    { url: '/fondateur', changefreq: 'monthly', priority: 0.7 },
    { url: '/ressources', changefreq: 'weekly', priority: 0.8 },
    { url: '/services', changefreq: 'weekly', priority: 0.8 },
    { url: '/about', changefreq: 'monthly', priority: 0.6 },
    { url: '/testimonial', changefreq: 'weekly', priority: 0.7 },

    // Pages métiers - haute priorité SEO
    { url: '/site-plombier', changefreq: 'weekly', priority: 0.9 },
    { url: '/site-electricien', changefreq: 'weekly', priority: 0.9 },
    { url: '/site-menuisier', changefreq: 'weekly', priority: 0.9 },
    { url: '/site-macon', changefreq: 'weekly', priority: 0.9 },
    { url: '/site-peintre', changefreq: 'weekly', priority: 0.9 },

    // Pages villes - SEO local
    { url: '/creation-site-paris', changefreq: 'weekly', priority: 0.85 },
    { url: '/creation-site-lyon', changefreq: 'weekly', priority: 0.85 },
    { url: '/creation-site-marseille', changefreq: 'weekly', priority: 0.85 },
    { url: '/creation-site-toulouse', changefreq: 'weekly', priority: 0.85 },
    { url: '/creation-site-nice', changefreq: 'weekly', priority: 0.85 },

    // Pages légales
    { url: '/mentions-legales', changefreq: 'yearly', priority: 0.3 },
    { url: '/cgv', changefreq: 'yearly', priority: 0.3 },
    { url: '/politique-confidentialite', changefreq: 'yearly', priority: 0.3 },
  ];

  // Générer les URLs pour les articles de blog
  const blogUrls = blogPosts
    .filter(post => !post.data.draft)
    .map(post => ({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: post.data.date || new Date().toISOString()
    }));

  // Combiner toutes les URLs
  const allUrls = [...staticPages, ...blogUrls];

  // Générer le XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
import {
  Page,
  Project,
  SEOConfig,
  StructuredData,
  SchemaType,
  ChangeFrequency
} from '@awema/shared';

export class SEOEngine {
  async optimize(html: string, page: Page, project: Project): Promise<string> {
    const { seo, businessInfo } = project;
    
    // Generate meta tags
    const metaTags = this.generateMetaTags(page, project);
    
    // Generate structured data
    const structuredData = this.generateStructuredData(page, project);
    
    // Insert SEO elements into HTML
    const optimizedHtml = this.insertSEOElements(html, metaTags, structuredData);
    
    return optimizedHtml;
  }

  private generateMetaTags(page: Page, project: Project): string[] {
    const { seo, businessInfo } = project;
    const { meta } = page;
    const tags: string[] = [];
    
    // Basic meta tags
    tags.push(`<meta name="description" content="${meta.description || businessInfo.description}">`);
    if (meta.keywords && meta.keywords.length > 0) {
      tags.push(`<meta name="keywords" content="${meta.keywords.join(', ')}">`);
    }
    tags.push(`<meta name="author" content="${seo.author || businessInfo.companyName}">`);
    
    // Robots meta
    const robotsDirectives: string[] = [];
    if (!seo.robots.index) robotsDirectives.push('noindex');
    if (!seo.robots.follow) robotsDirectives.push('nofollow');
    if (seo.robots.noarchive) robotsDirectives.push('noarchive');
    if (seo.robots.nosnippet) robotsDirectives.push('nosnippet');
    if (seo.robots.noimageindex) robotsDirectives.push('noimageindex');
    if (seo.robots.maxSnippet) robotsDirectives.push(`max-snippet:${seo.robots.maxSnippet}`);
    if (seo.robots.maxImagePreview) robotsDirectives.push(`max-image-preview:${seo.robots.maxImagePreview}`);
    if (seo.robots.maxVideoPreview) robotsDirectives.push(`max-video-preview:${seo.robots.maxVideoPreview}`);
    
    if (robotsDirectives.length > 0) {
      tags.push(`<meta name="robots" content="${robotsDirectives.join(', ')}">`);
    }
    
    // Open Graph tags
    tags.push(`<meta property="og:type" content="${seo.openGraph.type}">`);
    tags.push(`<meta property="og:title" content="${seo.openGraph.title || meta.title}">`);
    tags.push(`<meta property="og:description" content="${seo.openGraph.description || meta.description}">`);
    tags.push(`<meta property="og:url" content="${seo.openGraph.url}${page.path}">`);
    tags.push(`<meta property="og:site_name" content="${seo.openGraph.siteName}">`);
    tags.push(`<meta property="og:locale" content="${seo.openGraph.locale}">`);
    
    if (seo.openGraph.image) {
      tags.push(`<meta property="og:image" content="${seo.openGraph.image.url}">`);
      if (seo.openGraph.image.width) {
        tags.push(`<meta property="og:image:width" content="${seo.openGraph.image.width}">`);
      }
      if (seo.openGraph.image.height) {
        tags.push(`<meta property="og:image:height" content="${seo.openGraph.image.height}">`);
      }
      if (seo.openGraph.image.alt) {
        tags.push(`<meta property="og:image:alt" content="${seo.openGraph.image.alt}">`);
      }
    }
    
    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${seo.twitter.card}">`);
    tags.push(`<meta name="twitter:title" content="${seo.twitter.title || meta.title}">`);
    tags.push(`<meta name="twitter:description" content="${seo.twitter.description || meta.description}">`);
    if (seo.twitter.site) {
      tags.push(`<meta name="twitter:site" content="${seo.twitter.site}">`);
    }
    if (seo.twitter.creator) {
      tags.push(`<meta name="twitter:creator" content="${seo.twitter.creator}">`);
    }
    if (seo.twitter.image) {
      tags.push(`<meta name="twitter:image" content="${seo.twitter.image}">`);
      if (seo.twitter.imageAlt) {
        tags.push(`<meta name="twitter:image:alt" content="${seo.twitter.imageAlt}">`);
      }
    }
    
    // Canonical URL
    if (meta.canonical) {
      tags.push(`<link rel="canonical" href="${meta.canonical}">`);
    }
    
    // Favicon links
    if (seo.favicon) {
      tags.push(`<link rel="icon" type="image/x-icon" href="${seo.favicon.ico}">`);
      tags.push(`<link rel="icon" type="image/png" sizes="16x16" href="${seo.favicon.png16}">`);
      tags.push(`<link rel="icon" type="image/png" sizes="32x32" href="${seo.favicon.png32}">`);
      if (seo.favicon.png192) {
        tags.push(`<link rel="icon" type="image/png" sizes="192x192" href="${seo.favicon.png192}">`);
      }
      if (seo.favicon.appleTouchIcon) {
        tags.push(`<link rel="apple-touch-icon" href="${seo.favicon.appleTouchIcon}">`);
      }
      if (seo.favicon.manifest) {
        tags.push(`<link rel="manifest" href="${seo.favicon.manifest}">`);
      }
    }
    
    return tags;
  }

  private generateStructuredData(page: Page, project: Project): string[] {
    const { businessInfo } = project;
    const scripts: string[] = [];
    
    // Organization/LocalBusiness schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': businessInfo.location.coordinates ? 'LocalBusiness' : 'Organization',
      name: businessInfo.companyName,
      description: businessInfo.description,
      url: project.seo.openGraph.url,
      logo: businessInfo.branding.logo,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: businessInfo.contact.phone,
        email: businessInfo.contact.email,
        contactType: 'customer service',
        areaServed: businessInfo.location.serviceArea || 'Global',
        availableLanguage: project.seo.locale
      },
      sameAs: Object.values(businessInfo.socialMedia).filter(url => url)
    };
    
    if (businessInfo.location.coordinates) {
      Object.assign(orgSchema, {
        address: {
          '@type': 'PostalAddress',
          streetAddress: businessInfo.contact.address.street,
          addressLocality: businessInfo.contact.address.city,
          addressRegion: businessInfo.contact.address.state,
          postalCode: businessInfo.contact.address.postalCode,
          addressCountry: businessInfo.contact.address.country
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: businessInfo.location.coordinates.lat,
          longitude: businessInfo.location.coordinates.lng
        },
        openingHours: this.formatOpeningHours(businessInfo.contact.hours)
      });
    }
    
    scripts.push(`<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>`);
    
    // BreadcrumbList schema for non-home pages
    if (!page.isHomePage) {
      const breadcrumbs = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: project.seo.openGraph.url
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.title,
            item: `${project.seo.openGraph.url}${page.path}`
          }
        ]
      };
      scripts.push(`<script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>`);
    }
    
    // Service schema for services
    if (businessInfo.services.length > 0) {
      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: businessInfo.industry.category,
        provider: {
          '@type': businessInfo.location.coordinates ? 'LocalBusiness' : 'Organization',
          name: businessInfo.companyName
        },
        areaServed: businessInfo.location.serviceArea || 'Global',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: businessInfo.services.map(service => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description
            },
            price: service.price ? service.price.amount : undefined,
            priceCurrency: service.price ? service.price.currency : undefined
          }))
        }
      };
      scripts.push(`<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>`);
    }
    
    return scripts;
  }

  private insertSEOElements(html: string, metaTags: string[], structuredData: string[]): string {
    // Find the closing </head> tag
    const headEndIndex = html.indexOf('</head>');
    
    if (headEndIndex === -1) {
      console.warn('No </head> tag found in HTML');
      return html;
    }
    
    // Insert meta tags and structured data before </head>
    const seoElements = [...metaTags, ...structuredData].join('\n    ');
    
    const optimizedHtml = 
      html.slice(0, headEndIndex) + 
      '\n    ' + seoElements + '\n    ' +
      html.slice(headEndIndex);
    
    return optimizedHtml;
  }

  private formatOpeningHours(hours: Record<string, any>): string[] {
    const dayMap: Record<string, string> = {
      monday: 'Mo',
      tuesday: 'Tu',
      wednesday: 'We',
      thursday: 'Th',
      friday: 'Fr',
      saturday: 'Sa',
      sunday: 'Su'
    };
    
    const formatted: string[] = [];
    
    for (const [day, times] of Object.entries(hours)) {
      if (times.closed) continue;
      
      const dayCode = dayMap[day.toLowerCase()];
      if (dayCode && times.open && times.close) {
        formatted.push(`${dayCode} ${times.open}-${times.close}`);
      }
    }
    
    return formatted;
  }

  async generateRobotsTxt(project: Project): Promise<string> {
    const { seo } = project;
    const lines: string[] = [];
    
    lines.push('User-agent: *');
    
    if (!seo.robots.index) {
      lines.push('Disallow: /');
    } else {
      lines.push('Allow: /');
      
      // Add any specific disallow rules
      if (seo.sitemap.excludePaths) {
        seo.sitemap.excludePaths.forEach(path => {
          lines.push(`Disallow: ${path}`);
        });
      }
    }
    
    // Add sitemap reference
    lines.push('');
    lines.push(`Sitemap: ${seo.openGraph.url}/sitemap.xml`);
    
    // Add crawl delay if needed
    lines.push('');
    lines.push('Crawl-delay: 1');
    
    return lines.join('\n');
  }

  async generateSitemap(project: Project, baseUrl: string): Promise<string> {
    const { pages, seo } = project;
    
    const urlset: string[] = [];
    urlset.push('<?xml version="1.0" encoding="UTF-8"?>');
    urlset.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    
    for (const page of pages) {
      // Skip excluded paths
      if (seo.sitemap.excludePaths?.includes(page.path)) {
        continue;
      }
      
      urlset.push('  <url>');
      urlset.push(`    <loc>${baseUrl}${page.path === '/' ? '' : page.path}</loc>`);
      urlset.push(`    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`);
      urlset.push(`    <changefreq>${seo.sitemap.changeFrequency}</changefreq>`);
      urlset.push(`    <priority>${page.isHomePage ? '1.0' : seo.sitemap.priority}</priority>`);
      urlset.push('  </url>');
    }
    
    urlset.push('</urlset>');
    
    return urlset.join('\n');
  }

  calculateSEOScore(project: Project): number {
    let score = 100;
    const { seo, pages } = project;
    
    // Check for essential meta tags
    if (!seo.title) score -= 10;
    if (!seo.description) score -= 10;
    if (!seo.openGraph.image) score -= 5;
    
    // Check for structured data
    if (!seo.structuredData || seo.structuredData.length === 0) score -= 10;
    
    // Check for sitemap
    if (!seo.sitemap.enabled) score -= 5;
    
    // Check for proper headings in pages
    pages.forEach(page => {
      if (!page.meta.title) score -= 2;
      if (!page.meta.description) score -= 2;
    });
    
    // Check for favicon
    if (!seo.favicon) score -= 5;
    
    return Math.max(0, score);
  }
}
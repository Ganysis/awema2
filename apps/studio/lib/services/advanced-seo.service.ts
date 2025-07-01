import type { EditorBlock } from '../store/editor-store';

interface SiteData {
  business?: {
    name?: string;
    type?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  pages?: Array<{
    slug: string;
    meta?: {
      title?: string;
      description?: string;
    };
  }>;
  services?: Array<{
    name: string;
    description?: string;
  }>;
}

export interface SEOConfig {
  // Meta tags
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  canonical?: string;
  
  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  
  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
  
  // Site Info
  siteUrl?: string;
  logo?: string;
  themeColor?: string;
  favicon?: string;
  appleIcon?: string;
  manifest?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export class AdvancedSEOService {
  private siteData: SiteData;
  private currentPage: string;
  private blocks: EditorBlock[];
  private config: SEOConfig;

  constructor(siteData: SiteData, currentPage: string = 'index', blocks: EditorBlock[] = [], config?: SEOConfig) {
    this.siteData = siteData;
    this.currentPage = currentPage;
    this.blocks = blocks;
    this.config = config || {
      title: '',
      description: '',
      siteUrl: 'https://example.com',
      logo: ''
    };
  }

  generateMetaTags(config: Partial<SEOConfig> = {}): string {
    const tags: string[] = [];
    const mergedConfig = { ...this.config, ...config };
    
    // Basic meta tags
    tags.push(`<title>${mergedConfig.title}</title>`);
    tags.push(`<meta name="description" content="${mergedConfig.description}">`);
    
    if (mergedConfig.keywords?.length) {
      tags.push(`<meta name="keywords" content="${mergedConfig.keywords.join(', ')}">`);
    }
    
    if (mergedConfig.author) {
      tags.push(`<meta name="author" content="${mergedConfig.author}">`);
    }
    
    tags.push(`<meta name="robots" content="${mergedConfig.robots || 'index, follow'}">`);
    
    // Canonical
    if (mergedConfig.canonical) {
      tags.push(`<link rel="canonical" href="${mergedConfig.canonical}">`);
    }
    
    // Open Graph
    tags.push(`<meta property="og:title" content="${mergedConfig.ogTitle || mergedConfig.title}">`);
    tags.push(`<meta property="og:description" content="${mergedConfig.ogDescription || mergedConfig.description}">`);
    tags.push(`<meta property="og:type" content="${mergedConfig.ogType || 'website'}">`);
    
    if (mergedConfig.ogUrl) {
      tags.push(`<meta property="og:url" content="${mergedConfig.ogUrl}">`);
    }
    
    if (mergedConfig.ogSiteName) {
      tags.push(`<meta property="og:site_name" content="${mergedConfig.ogSiteName}">`);
    }
    
    if (mergedConfig.ogImage) {
      tags.push(`<meta property="og:image" content="${mergedConfig.ogImage}">`);
    }
    
    // Twitter Card
    tags.push(`<meta name="twitter:card" content="${mergedConfig.twitterCard || 'summary_large_image'}">`);
    tags.push(`<meta name="twitter:title" content="${mergedConfig.ogTitle || mergedConfig.title}">`);
    tags.push(`<meta name="twitter:description" content="${mergedConfig.ogDescription || mergedConfig.description}">`);
    
    if (mergedConfig.ogImage) {
      tags.push(`<meta name="twitter:image" content="${mergedConfig.ogImage}">`);
    }
    
    // Theme and icons
    if (mergedConfig.themeColor) {
      tags.push(`<meta name="theme-color" content="${mergedConfig.themeColor}">`);
    }
    
    if (mergedConfig.favicon) {
      tags.push(`<link rel="icon" type="image/x-icon" href="${mergedConfig.favicon}">`);
    }
    
    if (mergedConfig.appleIcon) {
      tags.push(`<link rel="apple-touch-icon" sizes="180x180" href="${mergedConfig.appleIcon}">`);
    }
    
    return tags.join('\n    ');
  }

  generateStructuredData(): StructuredData[] {
    const structuredData: StructuredData[] = [];
    
    // LocalBusiness schema
    structuredData.push(this.generateLocalBusinessSchema());
    
    // Website schema
    structuredData.push(this.generateWebsiteSchema());
    
    // Breadcrumb schema
    if (this.currentPage !== 'index') {
      structuredData.push(this.generateBreadcrumbSchema());
    }
    
    return structuredData;
  }

  private generateLocalBusinessSchema(): StructuredData {
    const business = this.siteData.business || {};
    
    return {
      '@context': 'https://schema.org',
      '@type': business.type || 'LocalBusiness',
      '@id': `${this.config.siteUrl}/#organization`,
      'name': business.name || '',
      'url': this.config.siteUrl,
      'telephone': business.phone || '',
      'email': business.email || '',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': business.address || '',
        'addressCountry': 'FR'
      }
    };
  }

  private generateWebsiteSchema(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.config.siteUrl}/#website`,
      'url': this.config.siteUrl,
      'name': this.siteData.business?.name || '',
      'publisher': {
        '@id': `${this.config.siteUrl}/#organization`
      }
    };
  }

  private generateBreadcrumbSchema(): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Accueil',
          'item': this.config.siteUrl
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': this.currentPage,
          'item': `${this.config.siteUrl}/${this.currentPage}`
        }
      ]
    };
  }

  generateSEOContent(config: Partial<SEOConfig> = {}): string {
    const mergedConfig = { ...this.config, ...config };
    const metaTags = this.generateMetaTags(mergedConfig);
    const structuredData = this.generateStructuredData();
    
    return `
    ${metaTags}
    
    ${structuredData.map(data => 
      `<script type="application/ld+json">
${JSON.stringify(data, null, 2)}
    </script>`
    ).join('\n    ')}
    `;
  }
}
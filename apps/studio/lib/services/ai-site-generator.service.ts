// AI Site Generator Service avec DeepSeek uniquement
import { ClientFormData } from '@/types/client-form';
import { generateId } from '@/lib/utils';
import { InternalLinkBuilderService } from './internal-link-builder.service';
import { ContentCacheService } from './content-cache.service';
import { MediaOptimizationService } from './media-optimization.service';
import { DeepSeekService } from './deepseek.service';
import { ContentPersonalizationService } from './content-personalization.service';
import { TemplateGeneratorEngine } from './template-generator-engine';

export interface GeneratedPage {
  title: string;
  slug: string;
  metaDescription: string;
  blocks: any[];
  schema?: any;
}

export interface GeneratedSite {
  pages: GeneratedPage[];
  stats: {
    totalPages: number;
    totalBlocks: number;
    totalWords: number;
    generationTime: number;
    cost: number;
  };
  analytics?: any;
  sitemapXml?: string;
  robotsTxt?: string;
}

export interface GenerationConfig {
  quality: 'standard' | 'premium' | 'ultra';
  enableAI: boolean;
  aiProvider: string;
  targetWordsPerPage: number;
  internalLinksPerPage: number;
  batchSize: number;
  cacheEnabled: boolean;
  mediaOptimization: boolean;
}

export class AISiteGeneratorService {
  private deepseekService: DeepSeekService;
  private contentPersonalizationService: ContentPersonalizationService;
  private templateEngine: TemplateGeneratorEngine;
  private linkBuilder: InternalLinkBuilderService;
  private contentCache: ContentCacheService;
  private mediaOptimizer: MediaOptimizationService;

  constructor(
    private aiGenerator?: any, // For compatibility
    linkBuilder?: InternalLinkBuilderService,
    contentCache?: ContentCacheService,
    mediaOptimizer?: MediaOptimizationService
  ) {
    // Initialize DeepSeek services
    this.deepseekService = new DeepSeekService({
      apiKey: process.env.DEEPSEEK_API_KEY || ''
    });
    this.contentPersonalizationService = new ContentPersonalizationService();
    this.templateEngine = new TemplateGeneratorEngine();
    
    // Use provided services or create new ones
    this.linkBuilder = linkBuilder || new InternalLinkBuilderService();
    this.contentCache = contentCache || new ContentCacheService();
    this.mediaOptimizer = mediaOptimizer || new MediaOptimizationService();
  }

  async generateSite(clientData: ClientFormData, config: GenerationConfig): Promise<GeneratedSite> {
    const startTime = Date.now();
    console.log('🚀 Starting site generation with DeepSeek...');

    try {
      // 1. Analyze client profile with DeepSeek
      console.log('🤖 Analyzing client profile...');
      const aiAnalysis = await this.deepseekService.analyzeBusinessProfile(clientData);
      
      // 2. Generate personalized content
      console.log('📝 Generating personalized content...');
      const personalizedContent = await this.contentPersonalizationService.generatePersonalizedContent(
        clientData,
        aiAnalysis
      );
      
      // 3. Generate template structure
      console.log('🏗️ Creating template structure...');
      const templates = await this.templateEngine.generateTemplates(clientData, 1);
      const mainTemplate = templates[0];
      
      // 4. Create pages based on template
      console.log('📄 Creating pages...');
      const pages: GeneratedPage[] = [];
      
      // Homepage
      const homepage = await this.createHomepage(
        clientData,
        mainTemplate,
        personalizedContent,
        config
      );
      pages.push(homepage);
      
      // Service pages
      if (clientData.services && clientData.services.length > 0) {
        for (const service of clientData.services.slice(0, 5)) {
          const servicePage = await this.createServicePage(
            clientData,
            service,
            mainTemplate,
            personalizedContent,
            config
          );
          pages.push(servicePage);
        }
      }
      
      // Local SEO pages (limited to avoid excessive generation)
      if (clientData.serviceAreas && clientData.serviceAreas.length > 0) {
        const mainService = clientData.services?.[0] || 'services';
        for (const area of clientData.serviceAreas.slice(0, 3)) {
          const localPage = await this.createLocalPage(
            clientData,
            mainService,
            area,
            mainTemplate,
            personalizedContent,
            config
          );
          pages.push(localPage);
        }
      }
      
      // 5. Build internal links
      console.log('🔗 Building internal links...');
      const linkedPages = await this.linkBuilder.buildInternalLinks(pages);
      
      // 6. Generate site assets
      const sitemapXml = this.generateSitemap(pages, clientData);
      const robotsTxt = this.generateRobotsTxt(clientData);
      
      // Calculate stats
      const endTime = Date.now();
      const stats = {
        totalPages: pages.length,
        totalBlocks: pages.reduce((acc, page) => acc + page.blocks.length, 0),
        totalWords: this.countWords(pages),
        generationTime: (endTime - startTime) / 1000,
        cost: 0.02 * pages.length // Approximate DeepSeek cost
      };
      
      console.log('✅ Site generation complete!', stats);
      
      return {
        pages: linkedPages,
        stats,
        sitemapXml,
        robotsTxt,
        analytics: {
          gtmId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
          ga4Id: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
        }
      };
      
    } catch (error) {
      console.error('Error generating site:', error);
      throw error;
    }
  }

  private async createHomepage(
    clientData: ClientFormData,
    template: any,
    personalizedContent: any,
    config: GenerationConfig
  ): Promise<GeneratedPage> {
    // Personnaliser les blocs du template avec le contenu
    const blocks = template.blocks.map((block: any) => {
      const customBlock = { ...block };
      
      switch (block.type) {
        case 'hero-v3-perfect':
          customBlock.props = {
            ...block.props,
            title: personalizedContent.hero?.title || `${clientData.businessName} - ${clientData.businessType}`,
            subtitle: personalizedContent.hero?.subtitle || `Votre expert ${clientData.businessType} de confiance`,
            businessName: clientData.businessName,
            phone: clientData.phone
          };
          break;
          
        case 'services-v3-perfect':
          if (personalizedContent.services) {
            customBlock.props = {
              ...block.props,
              title: 'Nos Services',
              services: personalizedContent.services
            };
          }
          break;
          
        case 'features-v3-perfect':
          if (personalizedContent.features) {
            customBlock.props = {
              ...block.props,
              title: 'Pourquoi nous choisir',
              features: personalizedContent.features
            };
          }
          break;
          
        case 'testimonials-v3-perfect':
          if (personalizedContent.testimonials) {
            customBlock.props = {
              ...block.props,
              title: 'Ils nous font confiance',
              testimonials: personalizedContent.testimonials
            };
          }
          break;
          
        case 'contact-v3-perfect':
          customBlock.props = {
            ...block.props,
            businessName: clientData.businessName,
            phone: clientData.phone,
            email: clientData.email,
            address: clientData.address
          };
          break;
      }
      
      return customBlock;
    });
    
    return {
      title: personalizedContent.seo?.title || `${clientData.businessName} - ${clientData.businessType}`,
      slug: '/',
      metaDescription: personalizedContent.seo?.description || `${clientData.businessName}, expert ${clientData.businessType}. ${clientData.services?.slice(0, 3).join(', ')}.`,
      blocks,
      schema: personalizedContent.schema || this.generateLocalBusinessSchema(clientData)
    };
  }

  private async createServicePage(
    clientData: ClientFormData,
    service: string,
    template: any,
    personalizedContent: any,
    config: GenerationConfig
  ): Promise<GeneratedPage> {
    const slug = this.slugify(service);
    
    // Utiliser DeepSeek pour générer du contenu spécifique au service
    const serviceContent = config.enableAI 
      ? await this.generateServiceContent(clientData, service)
      : this.getTemplateServiceContent(service);
    
    // Filtrer et adapter les blocs pour une page service
    const blocks = template.blocks
      .filter((block: any) => !['testimonials-v3-perfect', 'gallery-v3-perfect'].includes(block.type))
      .map((block: any) => {
        const customBlock = { ...block };
        
        switch (block.type) {
          case 'hero-v3-perfect':
            customBlock.props = {
              ...block.props,
              title: serviceContent.title,
              subtitle: serviceContent.subtitle,
              variant: 'service'
            };
            break;
            
          case 'content-v3-perfect':
            customBlock.props = {
              ...block.props,
              title: `Notre expertise en ${service}`,
              content: serviceContent.description
            };
            break;
        }
        
        return customBlock;
      });
    
    return {
      title: serviceContent.metaTitle,
      slug: `/services/${slug}`,
      metaDescription: serviceContent.metaDescription,
      blocks,
      schema: this.generateServiceSchema(clientData, service)
    };
  }

  private async createLocalPage(
    clientData: ClientFormData,
    service: string,
    city: string,
    template: any,
    personalizedContent: any,
    config: GenerationConfig
  ): Promise<GeneratedPage> {
    const serviceSlug = this.slugify(service);
    const citySlug = this.slugify(city);
    
    // Générer du contenu local SEO
    const localContent = config.enableAI
      ? await this.generateLocalContent(clientData, service, city)
      : this.getTemplateLocalContent(service, city);
    
    // Adapter les blocs pour le SEO local
    const blocks = template.blocks
      .filter((block: any) => !['gallery-v3-perfect', 'pricing-v3-perfect'].includes(block.type))
      .map((block: any) => {
        const customBlock = { ...block };
        
        switch (block.type) {
          case 'hero-v3-perfect':
            customBlock.props = {
              ...block.props,
              title: localContent.title,
              subtitle: localContent.subtitle,
              variant: 'local'
            };
            break;
            
          case 'content-v3-perfect':
            customBlock.props = {
              ...block.props,
              title: `${service} à ${city}`,
              content: localContent.description,
              showMap: true,
              mapLocation: city
            };
            break;
            
          case 'contact-v3-perfect':
            customBlock.props = {
              ...block.props,
              title: `Contactez votre ${clientData.businessType} à ${city}`,
              showLocalInfo: true,
              city
            };
            break;
        }
        
        return customBlock;
      });
    
    return {
      title: localContent.metaTitle,
      slug: `/${serviceSlug}-${citySlug}`,
      metaDescription: localContent.metaDescription,
      blocks,
      schema: this.generateLocalServiceSchema(clientData, service, city)
    };
  }

  private async generateServiceContent(clientData: ClientFormData, service: string) {
    try {
      const prompt = `Génère du contenu SEO pour la page service "${service}" de ${clientData.businessName}.
      
Business: ${clientData.businessType} à ${clientData.address || clientData.serviceAreas?.[0]}
Ton: Professionnel mais accessible

Génère un JSON avec:
{
  "title": "Titre H1 optimisé",
  "subtitle": "Sous-titre engageant",
  "metaTitle": "Title SEO (60 car max)",
  "metaDescription": "Meta description (155 car max)",
  "description": "Description détaillée du service (150-200 mots)"
}`;

      const response = await this.deepseekService.chat([
        { role: 'user', content: prompt }
      ], 0.7);
      
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error generating service content:', error);
    }
    
    return this.getTemplateServiceContent(service);
  }

  private async generateLocalContent(clientData: ClientFormData, service: string, city: string) {
    try {
      const prompt = `Génère du contenu SEO local pour "${service} à ${city}" - ${clientData.businessName}.
      
Focus: Référencement local et proximité
Inclure: Quartiers, zones d'intervention, rapidité

JSON requis:
{
  "title": "H1 avec ville",
  "subtitle": "Accroche locale",
  "metaTitle": "Title SEO local",
  "metaDescription": "Meta avec ville et service",
  "description": "Texte optimisé local (150 mots)"
}`;

      const response = await this.deepseekService.chat([
        { role: 'user', content: prompt }
      ], 0.7);
      
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error generating local content:', error);
    }
    
    return this.getTemplateLocalContent(service, city);
  }

  private getTemplateServiceContent(service: string) {
    return {
      title: service,
      subtitle: `Service professionnel de ${service}`,
      metaTitle: `${service} - Expert qualifié`,
      metaDescription: `Découvrez notre service de ${service}. Intervention rapide, devis gratuit, travail garanti.`,
      description: `Notre équipe d'experts propose un service complet de ${service}. Nous intervenons rapidement avec du matériel professionnel et garantissons un travail de qualité.`
    };
  }

  private getTemplateLocalContent(service: string, city: string) {
    return {
      title: `${service} à ${city}`,
      subtitle: `Votre expert local en ${service}`,
      metaTitle: `${service} ${city} - Intervention rapide`,
      metaDescription: `${service} à ${city} et environs. Intervention rapide, devis gratuit. Entreprise locale de confiance.`,
      description: `Besoin d'un ${service} à ${city} ? Notre équipe locale intervient rapidement dans tout le secteur. Connaissance parfaite du terrain et disponibilité garantie.`
    };
  }

  private generateLocalBusinessSchema(clientData: ClientFormData) {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": clientData.businessName,
      "@id": "#business",
      "description": `${clientData.businessType} professionnel`,
      "telephone": clientData.phone,
      "email": clientData.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": clientData.serviceAreas?.[0] || "France"
      },
      "areaServed": clientData.serviceAreas
    };
  }

  private generateServiceSchema(clientData: ClientFormData, service: string) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service,
      "provider": {
        "@type": "LocalBusiness",
        "name": clientData.businessName
      },
      "areaServed": clientData.serviceAreas,
      "description": `Service professionnel de ${service}`
    };
  }

  private generateLocalServiceSchema(clientData: ClientFormData, service: string, city: string) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${service} à ${city}`,
      "provider": {
        "@type": "LocalBusiness",
        "name": clientData.businessName
      },
      "areaServed": {
        "@type": "City",
        "name": city
      },
      "description": `${service} professionnel à ${city} et environs`
    };
  }

  private generateSitemap(pages: GeneratedPage[], clientData: ClientFormData): string {
    const domain = clientData.website || 'https://example.com';
    const urls = pages.map(page => `
    <url>
      <loc>${domain}${page.slug}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page.slug === '/' ? '1.0' : '0.8'}</priority>
    </url>`).join('');
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  private generateRobotsTxt(clientData: ClientFormData): string {
    const domain = clientData.website || 'https://example.com';
    return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${domain}/sitemap.xml`;
  }

  private countWords(pages: GeneratedPage[]): number {
    let totalWords = 0;
    pages.forEach(page => {
      // Count words in title and description
      totalWords += (page.title + ' ' + page.metaDescription).split(' ').length;
      
      // Count words in blocks
      page.blocks.forEach(block => {
        const props = block.props || {};
        Object.values(props).forEach(value => {
          if (typeof value === 'string') {
            totalWords += value.split(' ').length;
          }
        });
      });
    });
    return totalWords;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}
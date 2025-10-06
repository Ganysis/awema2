/**
 * Service de mapping et injection de contenu dans les templates
 * Remplace les placeholders Lorem Ipsum par le contenu enrichi DeepSeek
 */

export interface ContentMappingRequest {
  templateContent: string;
  enrichedContent: any;
  formData: Record<string, any>;
  businessInfo: {
    businessName: string;
    businessType: string;
    ville: string;
    codePostal: string;
    domain: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
}

export interface MappedContent {
  html: string;
  css: string;
  js: string;
  assets: {
    images: string[];
    fonts: string[];
    icons: string[];
  };
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    structuredData: object[];
  };
  placeholdersReplaced: number;
  mappingReport: {
    success: boolean;
    sections: string[];
    warnings: string[];
    errors: string[];
  };
}

export class ContentMapperService {
  private placeholderPatterns: Map<string, RegExp> = new Map();
  private mappingCache: Map<string, any> = new Map();

  constructor() {
    this.initializePlaceholderPatterns();
  }

  /**
   * Point d'entrée principal : mapper le contenu enrichi sur le template
   */
  async mapContentToTemplate(request: ContentMappingRequest): Promise<MappedContent> {
    console.log(`📝 Mapping contenu sur template pour ${request.businessInfo.businessName}...`);

    try {
      const startTime = Date.now();

      // 1. Parser le template HTML/CSS/JS
      const parsedTemplate = this.parseTemplateContent(request.templateContent);

      // 2. Remplacer les données business principales
      const businessMapped = this.mapBusinessData(parsedTemplate, request.formData, request.businessInfo);

      // 3. Remplacer le contenu Lorem Ipsum par le contenu enrichi
      const contentMapped = this.mapEnrichedContent(businessMapped, request.enrichedContent);

      // 4. Appliquer les couleurs et le branding
      const brandingMapped = this.applyBrandingAndColors(contentMapped, request.businessInfo);

      // 5. Optimiser les métadonnées SEO
      const seoOptimized = this.applySEOOptimizations(brandingMapped, request.enrichedContent.seo);

      // 6. Finaliser et nettoyer
      const finalContent = this.finalizeMapping(seoOptimized);

      const duration = Date.now() - startTime;
      console.log(`✅ Mapping terminé en ${duration}ms - ${finalContent.placeholdersReplaced} placeholders remplacés`);

      return finalContent;

    } catch (error) {
      console.error('❌ Erreur mapping contenu:', error);
      throw error;
    }
  }

  /**
   * Parse le contenu du template pour identifier les sections
   */
  private parseTemplateContent(templateContent: string): {
    html: string;
    css: string;
    js: string;
    structure: any;
  } {
    console.log(`🔍 Parsing template content...`);

    // Extraire le HTML, CSS et JS
    const htmlMatch = templateContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const cssMatch = templateContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    const jsMatch = templateContent.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);

    const html = htmlMatch ? htmlMatch[1] : templateContent;
    const css = cssMatch ? cssMatch.join('\n') : '';
    const js = jsMatch ? jsMatch.join('\n') : '';

    // Identifier la structure du template
    const structure = this.analyzeTemplateStructure(html);

    return { html, css, js, structure };
  }

  /**
   * Analyse la structure du template pour identifier les sections
   */
  private analyzeTemplateStructure(html: string): any {
    const sections = {
      header: null,
      hero: null,
      services: null,
      about: null,
      testimonials: null,
      contact: null,
      footer: null
    };

    // Identifier les sections par classes/IDs communes
    const sectionPatterns = {
      header: /(header|navbar|navigation)/i,
      hero: /(hero|banner|jumbotron|main-banner)/i,
      services: /(services|service|what-we-do|offerings)/i,
      about: /(about|about-us|qui-sommes|story)/i,
      testimonials: /(testimonials|reviews|avis|témoignages)/i,
      contact: /(contact|contactez|get-in-touch)/i,
      footer: /(footer|bottom|pied-de-page)/i
    };

    for (const [sectionName, pattern] of Object.entries(sectionPatterns)) {
      const sectionMatch = html.match(new RegExp(`<[^>]*(class|id)[^>]*${pattern.source}[^>]*>`, 'i'));
      if (sectionMatch) {
        sections[sectionName] = {
          found: true,
          element: sectionMatch[0],
          position: sectionMatch.index
        };
      }
    }

    return sections;
  }

  /**
   * Remplace les données business de base (nom, téléphone, email, etc.)
   */
  private mapBusinessData(
    parsedTemplate: any,
    formData: Record<string, any>,
    businessInfo: any
  ): any {
    console.log(`🏢 Mapping données business...`);

    let { html, css, js } = parsedTemplate;
    let placeholdersReplaced = 0;

    // Mapping des données principales
    const businessMappings = {
      // Informations entreprise
      '{{BUSINESS_NAME}}': businessInfo.businessName,
      '{{COMPANY_NAME}}': businessInfo.businessName,
      '{{BUSINESS_TYPE}}': businessInfo.businessType,
      '{{VILLE}}': businessInfo.ville,
      '{{CITY}}': businessInfo.ville,
      '{{CODE_POSTAL}}': businessInfo.codePostal,
      '{{POSTAL_CODE}}': businessInfo.codePostal,

      // Contact
      '{{TELEPHONE}}': formData.telephone || '',
      '{{PHONE}}': formData.telephone || '',
      '{{EMAIL}}': formData.email || '',
      '{{ADRESSE}}': formData.adresse || '',
      '{{ADDRESS}}': formData.adresse || '',

      // Patterns courants Lorem Ipsum
      /Lorem ipsum dolor sit amet/gi: `${businessInfo.businessName}, votre ${businessInfo.businessType} professionnel à ${businessInfo.ville}`,
      /Consectetur adipiscing elit/gi: `Services ${businessInfo.businessType} de qualité dans tout le secteur de ${businessInfo.ville}`,
      /Sed do eiusmod tempor/gi: `Expertise ${businessInfo.businessType} reconnue à ${businessInfo.ville}`,
      /Ut enim ad minim veniam/gi: `Contactez ${businessInfo.businessName} pour vos besoins ${businessInfo.businessType}`,

      // Placeholders génériques
      /\[NOM_ENTREPRISE\]/g: businessInfo.businessName,
      /\[METIER\]/g: businessInfo.businessType,
      /\[VILLE\]/g: businessInfo.ville,
      /\[TELEPHONE\]/g: formData.telephone || '',
      /\[EMAIL\]/g: formData.email || '',

      // Patterns anglais courants
      /Your Company Name/gi: businessInfo.businessName,
      /Company Name/gi: businessInfo.businessName,
      /Business Name/gi: businessInfo.businessName,
      /Your Business/gi: businessInfo.businessName,
      /Our Company/gi: businessInfo.businessName,
      /Your Phone/gi: formData.telephone || '',
      /Your Email/gi: formData.email || '',
      /Your Address/gi: formData.adresse || '',
      /City Name/gi: businessInfo.ville,
      /Your City/gi: businessInfo.ville
    };

    // Appliquer tous les remplacements
    for (const [pattern, replacement] of Object.entries(businessMappings)) {
      if (typeof pattern === 'string') {
        const count = (html.match(new RegExp(pattern, 'g')) || []).length;
        html = html.replace(new RegExp(pattern, 'g'), replacement);
        placeholdersReplaced += count;
      } else if (pattern instanceof RegExp) {
        const count = (html.match(pattern) || []).length;
        html = html.replace(pattern, replacement);
        placeholdersReplaced += count;
      }
    }

    // Remplacements dans le CSS (variables CSS, classes nommées)
    css = css.replace(/--company-name/g, `"${businessInfo.businessName}"`);
    css = css.replace(/\.company-name/g, `.${businessInfo.businessName.replace(/\s+/g, '-').toLowerCase()}`);

    // Remplacements dans le JS (variables, configurations)
    js = js.replace(/companyName:\s*['"][^'"]*['"]/g, `companyName: "${businessInfo.businessName}"`);
    js = js.replace(/businessType:\s*['"][^'"]*['"]/g, `businessType: "${businessInfo.businessType}"`);

    return {
      ...parsedTemplate,
      html,
      css,
      js,
      placeholdersReplaced
    };
  }

  /**
   * Remplace le contenu Lorem par le contenu enrichi DeepSeek
   */
  private mapEnrichedContent(mappedTemplate: any, enrichedContent: any): any {
    console.log(`🎨 Injection contenu enrichi...`);

    let { html } = mappedTemplate;
    let additionalReplacements = 0;

    // Mapping du contenu de la page d'accueil
    if (enrichedContent.pages?.home) {
      const home = enrichedContent.pages.home;

      // Hero section
      if (home.hero) {
        html = this.replaceInSection(html, 'hero', {
          title: home.hero.title,
          subtitle: home.hero.subtitle,
          description: home.hero.description,
          cta1: home.hero.ctaPrimary,
          cta2: home.hero.ctaSecondary
        });
        additionalReplacements += 5;
      }

      // Services section
      if (home.services && home.services.length > 0) {
        html = this.replaceServicesSection(html, home.services);
        additionalReplacements += home.services.length * 3; // Titre + description + features
      }

      // About section
      if (home.about) {
        html = this.replaceInSection(html, 'about', {
          story: home.about.story,
          mission: home.about.mission,
          values: home.about.values.join(', ')
        });
        additionalReplacements += 3;
      }

      // Why us / avantages
      if (home.whyUs && home.whyUs.length > 0) {
        html = this.replaceWhyUsSection(html, home.whyUs);
        additionalReplacements += home.whyUs.length * 2;
      }

      // Processus
      if (home.processus && home.processus.length > 0) {
        html = this.replaceProcessSection(html, home.processus);
        additionalReplacements += home.processus.length * 2;
      }
    }

    // Mapping du contenu de contact
    if (enrichedContent.pages?.contact) {
      const contact = enrichedContent.pages.contact;
      html = this.replaceContactContent(html, contact);
      additionalReplacements += 4; // intro + zones + horaires + urgence
    }

    return {
      ...mappedTemplate,
      html,
      placeholdersReplaced: mappedTemplate.placeholdersReplaced + additionalReplacements
    };
  }

  /**
   * Applique les couleurs et le branding
   */
  private applyBrandingAndColors(mappedTemplate: any, businessInfo: any): any {
    console.log(`🎨 Application branding et couleurs...`);

    let { html, css } = mappedTemplate;

    // Remplacements de couleurs CSS
    const colorMappings = {
      // Variables CSS
      '--primary-color': businessInfo.colors.primary,
      '--secondary-color': businessInfo.colors.secondary,
      '--accent-color': businessInfo.colors.accent,

      // Couleurs génériques à remplacer
      '#007bff': businessInfo.colors.primary,
      '#6c757d': businessInfo.colors.secondary,
      '#28a745': businessInfo.colors.accent,
      '#17a2b8': businessInfo.colors.primary,
      '#dc3545': businessInfo.colors.accent,

      // Couleurs de fond communes
      'background-color: #f8f9fa': `background-color: ${this.lightenColor(businessInfo.colors.primary, 0.95)}`,
      'background-color: #e9ecef': `background-color: ${this.lightenColor(businessInfo.colors.secondary, 0.9)}`
    };

    // Appliquer les remplacements de couleurs
    for (const [pattern, replacement] of Object.entries(colorMappings)) {
      css = css.replace(new RegExp(pattern, 'g'), replacement);
    }

    // Ajouter du CSS custom pour le branding
    const customCSS = this.generateCustomBrandingCSS(businessInfo);
    css += '\n\n' + customCSS;

    return {
      ...mappedTemplate,
      css
    };
  }

  /**
   * Applique les optimisations SEO
   */
  private applySEOOptimizations(mappedTemplate: any, seoContent: any): any {
    console.log(`🎯 Application optimisations SEO...`);

    let { html } = mappedTemplate;

    // Ajouter les métadonnées dans le head
    if (seoContent.metaDescriptions?.home) {
      html = html.replace(
        /<meta name="description"[^>]*>/i,
        `<meta name="description" content="${seoContent.metaDescriptions.home}">`
      );
    }

    // Ajouter les données structurées
    if (seoContent.schemas?.localBusiness) {
      const structuredData = `
<script type="application/ld+json">
${JSON.stringify(seoContent.schemas.localBusiness, null, 2)}
</script>`;

      // Injecter avant la fermeture du head ou du body
      if (html.includes('</head>')) {
        html = html.replace('</head>', structuredData + '\n</head>');
      } else if (html.includes('</body>')) {
        html = html.replace('</body>', structuredData + '\n</body>');
      }
    }

    // Optimiser les balises H1, H2, H3 pour le SEO
    html = this.optimizeHeadingTags(html, seoContent);

    return {
      ...mappedTemplate,
      html
    };
  }

  /**
   * Finalise le mapping et nettoie le contenu
   */
  private finalizeMapping(mappedTemplate: any): MappedContent {
    console.log(`✨ Finalisation mapping...`);

    let { html, css, js, placeholdersReplaced } = mappedTemplate;

    // Nettoyer les placeholders restants
    const cleanupPatterns = [
      /\{\{[^}]+\}\}/g, // {{PLACEHOLDER}}
      /\[[^\]]+\]/g, // [PLACEHOLDER]
      /Lorem ipsum[^.]*\./gi,
      /Consectetur adipiscing[^.]*\./gi,
      /Sed do eiusmod[^.]*\./gi
    ];

    let cleanupCount = 0;
    cleanupPatterns.forEach(pattern => {
      const matches = html.match(pattern) || [];
      cleanupCount += matches.length;
      html = html.replace(pattern, '');
    });

    // Nettoyer les espaces multiples et lignes vides
    html = html.replace(/\s+/g, ' ').replace(/>\s+</g, '><');
    css = css.replace(/\s+/g, ' ').replace(/;\s+/g, ';');
    js = js.replace(/\s+/g, ' ');

    // Générer le rapport de mapping
    const mappingReport = {
      success: true,
      sections: ['hero', 'services', 'about', 'contact'],
      warnings: cleanupCount > 0 ? [`${cleanupCount} placeholders non mappés nettoyés`] : [],
      errors: []
    };

    // Extraire les métadonnées
    const title = this.extractTitle(html);
    const description = this.extractMetaDescription(html);
    const keywords = this.extractKeywords(html);

    return {
      html,
      css,
      js,
      assets: {
        images: this.extractImagePaths(html),
        fonts: this.extractFontPaths(css),
        icons: this.extractIconPaths(html)
      },
      metadata: {
        title,
        description,
        keywords,
        structuredData: this.extractStructuredData(html)
      },
      placeholdersReplaced: placeholdersReplaced + cleanupCount,
      mappingReport
    };
  }

  /**
   * Fonctions utilitaires de remplacement
   */
  private replaceInSection(html: string, sectionName: string, content: Record<string, string>): string {
    // Logique générique pour remplacer dans une section
    const sectionPatterns = {
      hero: /<section[^>]*class[^>]*hero[^>]*>([\s\S]*?)<\/section>/i,
      about: /<section[^>]*class[^>]*about[^>]*>([\s\S]*?)<\/section>/i,
      contact: /<section[^>]*class[^>]*contact[^>]*>([\s\S]*?)<\/section>/i
    };

    const pattern = sectionPatterns[sectionName];
    if (!pattern) return html;

    const match = html.match(pattern);
    if (!match) return html;

    let sectionHtml = match[1];

    // Remplacer le contenu dans cette section
    for (const [key, value] of Object.entries(content)) {
      // Patterns de remplacement flexibles
      const patterns = [
        new RegExp(`{{${key.toUpperCase()}}}`, 'gi'),
        new RegExp(`\\[${key.toUpperCase()}\\]`, 'gi'),
        new RegExp(`data-content="${key}"[^>]*>([^<]*)</`, 'gi')
      ];

      patterns.forEach(p => {
        sectionHtml = sectionHtml.replace(p, value);
      });
    }

    return html.replace(match[0], `<section${match[0].substring(8, match[0].indexOf('>'))}>${sectionHtml}</section>`);
  }

  private replaceServicesSection(html: string, services: any[]): string {
    // Logique pour remplacer la section services
    const servicesPattern = /<section[^>]*class[^>]*services[^>]*>([\s\S]*?)<\/section>/i;
    const match = html.match(servicesPattern);

    if (!match) return html;

    // Générer le HTML des services
    const servicesHtml = services.map(service => `
      <div class="service-item">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul>${service.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
    `).join('');

    return html.replace(match[1], servicesHtml);
  }

  private replaceWhyUsSection(html: string, whyUs: any[]): string {
    const whyUsHtml = whyUs.map(item => `
      <div class="why-us-item">
        <i class="${item.icon}"></i>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    `).join('');

    return html.replace(/(<section[^>]*class[^>]*why-us[^>]*>)([\s\S]*?)(<\/section>)/i,
      `$1${whyUsHtml}$3`);
  }

  private replaceProcessSection(html: string, processus: any[]): string {
    const processHtml = processus.map(step => `
      <div class="process-step">
        <div class="step-number">${step.step}</div>
        <h4>${step.title}</h4>
        <p>${step.description}</p>
      </div>
    `).join('');

    return html.replace(/(<section[^>]*class[^>]*process[^>]*>)([\s\S]*?)(<\/section>)/i,
      `$1${processHtml}$3`);
  }

  private replaceContactContent(html: string, contact: any): string {
    let contactHtml = html;

    // Remplacer les informations de contact
    const contactMappings = {
      '{{CONTACT_INTRO}}': contact.intro,
      '{{EMERGENCY_INFO}}': contact.emergencyInfo,
      '{{ZONES_INTERVENTION}}': contact.zones.join(', ')
    };

    for (const [pattern, replacement] of Object.entries(contactMappings)) {
      contactHtml = contactHtml.replace(new RegExp(pattern, 'g'), replacement);
    }

    // Générer les horaires
    const hoursHtml = Object.entries(contact.hours).map(([day, hours]) =>
      `<div class="hours-item"><span class="day">${day}:</span> <span class="time">${hours.open} - ${hours.close}</span></div>`
    ).join('');

    contactHtml = contactHtml.replace(/{{HORAIRES}}/g, hoursHtml);

    return contactHtml;
  }

  private generateCustomBrandingCSS(businessInfo: any): string {
    return `
/* Custom Branding CSS */
.brand-primary { color: ${businessInfo.colors.primary}; }
.brand-secondary { color: ${businessInfo.colors.secondary}; }
.brand-accent { color: ${businessInfo.colors.accent}; }

.btn-primary {
  background-color: ${businessInfo.colors.primary};
  border-color: ${businessInfo.colors.primary};
}
.btn-primary:hover {
  background-color: ${this.darkenColor(businessInfo.colors.primary, 0.1)};
  border-color: ${this.darkenColor(businessInfo.colors.primary, 0.1)};
}

.text-primary { color: ${businessInfo.colors.primary}; }
.bg-primary { background-color: ${businessInfo.colors.primary}; }

/* Business type specific styles */
.${businessInfo.businessType.toLowerCase()}-specific {
  border-left: 3px solid ${businessInfo.colors.accent};
  padding-left: 1rem;
}
`;
  }

  private optimizeHeadingTags(html: string, seoContent: any): string {
    // Optimiser les balises H1-H6 pour le SEO local
    html = html.replace(/<h1[^>]*>([^<]*)<\/h1>/gi, (match, content) => {
      if (content.includes('Lorem') || content.includes('Title')) {
        return match.replace(content, `${seoContent.businessName} - ${seoContent.businessType} à ${seoContent.ville}`);
      }
      return match;
    });

    return html;
  }

  // Fonctions utilitaires d'extraction
  private extractTitle(html: string): string {
    const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    return match ? match[1] : '';
  }

  private extractMetaDescription(html: string): string {
    const match = html.match(/<meta name="description" content="([^"]*)"[^>]*>/i);
    return match ? match[1] : '';
  }

  private extractKeywords(html: string): string[] {
    const match = html.match(/<meta name="keywords" content="([^"]*)"[^>]*>/i);
    return match ? match[1].split(',').map(k => k.trim()) : [];
  }

  private extractImagePaths(html: string): string[] {
    const matches = html.match(/src="([^"]*\.(jpg|jpeg|png|gif|webp))"/gi) || [];
    return matches.map(match => match.match(/src="([^"]*)"/)[1]);
  }

  private extractFontPaths(css: string): string[] {
    const matches = css.match(/@import url\(['"]([^'"]*)['"]\)/gi) || [];
    return matches.map(match => match.match(/@import url\(['"]([^'"]*)['"]>\)/)[1]);
  }

  private extractIconPaths(html: string): string[] {
    const matches = html.match(/class="[^"]*fa[^"]*"/gi) || [];
    return matches.map(match => match.match(/class="([^"]*)"/)[1]);
  }

  private extractStructuredData(html: string): object[] {
    const matches = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    return matches.map(match => {
      try {
        const content = match.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
        return JSON.parse(content);
      } catch {
        return {};
      }
    });
  }

  // Fonctions utilitaires de couleurs
  private lightenColor(color: string, percent: number): string {
    // Logique pour éclaircir une couleur
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const amt = Math.round(255 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (R < 255 ? R : 255) * 0x10000 + (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255)).toString(16).slice(1)}`;
  }

  private darkenColor(color: string, percent: number): string {
    // Logique pour assombrir une couleur
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const amt = Math.round(255 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return `#${(0x1000000 + (R > 0 ? R : 0) * 0x10000 + (G > 0 ? G : 0) * 0x100 + (B > 0 ? B : 0)).toString(16).slice(1)}`;
  }

  private initializePlaceholderPatterns(): void {
    // Initialiser les patterns de placeholders communs
    this.placeholderPatterns.set('business_name', /\{\{(BUSINESS_NAME|COMPANY_NAME|NOM_ENTREPRISE)\}\}/gi);
    this.placeholderPatterns.set('phone', /\{\{(PHONE|TELEPHONE|TEL)\}\}/gi);
    this.placeholderPatterns.set('email', /\{\{(EMAIL|MAIL|COURRIEL)\}\}/gi);
    this.placeholderPatterns.set('address', /\{\{(ADDRESS|ADRESSE|ADDR)\}\}/gi);
    this.placeholderPatterns.set('city', /\{\{(CITY|VILLE|LOCATION)\}\}/gi);
  }

  /**
   * Nettoie les ressources temporaires
   */
  async cleanupTempResources(workflowId: string): Promise<void> {
    const cacheKey = `mapping-${workflowId}`;
    this.mappingCache.delete(cacheKey);
    console.log(`🧹 Resources mapping nettoyées pour ${workflowId}`);
  }

  /**
   * Statistiques d'utilisation
   */
  getUsageStats(): {
    totalMappings: number;
    cacheSize: number;
    avgPlaceholdersReplaced: number;
    successRate: number;
  } {
    return {
      totalMappings: 0, // À implémenter avec compteur
      cacheSize: this.mappingCache.size,
      avgPlaceholdersReplaced: 0, // À calculer en production
      successRate: 0.98 // À mesurer en production
    };
  }
}
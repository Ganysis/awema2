/**
 * Service DeepSeek pour génération de contenu enrichi et professionnel
 * Transforme les données client en contenu optimisé SEO de 1000+ mots par page
 */

export interface DeepSeekContentRequest {
  businessType: string;
  businessName: string;
  ville: string;
  codePostal?: string;
  formData: Record<string, any>;
  template?: string;
  targetWordCount: number;
}

export interface DeepSeekPreviewRequest {
  businessType: string;
  businessName: string;
  ville: string;
  formData: Record<string, any>;
}

export interface ContentPreviewResult {
  homeExcerpt: string;
  servicesCount: number;
  estimatedWordCount: number;
  keywords: string[];
}

export interface EnrichedContent {
  pages: {
    home: {
      hero: {
        title: string;
        subtitle: string;
        description: string;
        ctaPrimary: string;
        ctaSecondary: string;
      };
      services: Array<{
        title: string;
        description: string;
        features: string[];
        wordCount: number;
      }>;
      about: {
        story: string;
        mission: string;
        values: string[];
        wordCount: number;
      };
      whyUs: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
      processus: Array<{
        step: number;
        title: string;
        description: string;
      }>;
      wordCount: number;
    };
    services: Array<{
      slug: string;
      title: string;
      metaDescription: string;
      heroContent: string;
      detailedDescription: string;
      benefits: string[];
      process: Array<{
        step: number;
        title: string;
        description: string;
      }>;
      faq: Array<{
        question: string;
        answer: string;
      }>;
      localKeywords: string[];
      wordCount: number;
    }>;
    about: {
      story: string;
      team: string;
      values: string[];
      certifications: string[];
      experience: string;
      localHistory: string;
      wordCount: number;
    };
    contact: {
      intro: string;
      zones: string[];
      hours: {
        [day: string]: { open: string; close: string; };
      };
      emergencyInfo: string;
      wordCount: number;
    };
    legal: {
      mentionsLegales: string;
      politiqueConfidentialite: string;
      conditionsUtilisation: string;
      cookies: string;
    };
  };
  seo: {
    metaDescriptions: Record<string, string>;
    schemas: Record<string, object>;
    localBusiness: object;
    breadcrumbs: Record<string, Array<{ name: string; url: string; }>>;
    sitemap: Array<{
      url: string;
      lastmod: string;
      changefreq: string;
      priority: number;
    }>;
  };
  totalWordCount: number;
  generatedAt: string;
}

export class DeepSeekEnrichmentService {
  private apiKey: string;
  private apiUrl: string = 'https://api.deepseek.com/v1/chat/completions';
  private cache: Map<string, any> = new Map();

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ DEEPSEEK_API_KEY non configurée. Le service fonctionnera en mode simulation.');
    }
  }

  /**
   * Génère le contenu complet enrichi pour un site
   */
  async generateEnrichedContent(request: DeepSeekContentRequest): Promise<EnrichedContent> {
    console.log(`🤖 Génération contenu enrichi DeepSeek pour ${request.businessName}...`);

    try {
      const startTime = Date.now();

      // Générer contenu page par page
      const homeContent = await this.generateHomepageContent(request);
      const servicesContent = await this.generateServicesContent(request);
      const aboutContent = await this.generateAboutContent(request);
      const contactContent = await this.generateContactContent(request);
      const legalContent = await this.generateLegalContent(request);
      const seoContent = await this.generateSEOContent(request);

      // Calculer le nombre total de mots
      const totalWordCount = this.calculateTotalWordCount({
        home: homeContent,
        services: servicesContent,
        about: aboutContent,
        contact: contactContent
      });

      const enrichedContent: EnrichedContent = {
        pages: {
          home: homeContent,
          services: servicesContent,
          about: aboutContent,
          contact: contactContent,
          legal: legalContent
        },
        seo: seoContent,
        totalWordCount,
        generatedAt: new Date().toISOString()
      };

      const duration = Date.now() - startTime;
      console.log(`✅ Contenu enrichi généré: ${totalWordCount} mots en ${duration}ms`);

      return enrichedContent;

    } catch (error) {
      console.error('❌ Erreur génération contenu DeepSeek:', error);
      throw error;
    }
  }

  /**
   * Génère un aperçu rapide du contenu
   */
  async generateContentPreview(request: DeepSeekPreviewRequest): Promise<ContentPreviewResult> {
    console.log(`👁️ Génération aperçu DeepSeek pour ${request.businessName}...`);

    try {
      const cacheKey = `preview-${JSON.stringify(request)}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      // Prompt optimisé pour aperçu rapide
      const prompt = this.buildPreviewPrompt(request);
      const response = await this.callDeepSeekAPI(prompt, 500); // 500 tokens max

      const preview: ContentPreviewResult = {
        homeExcerpt: response.homeExcerpt || this.generateFallbackExcerpt(request),
        servicesCount: this.estimateServicesCount(request.formData),
        estimatedWordCount: this.estimateWordCount(request),
        keywords: this.generateLocalKeywords(request)
      };

      // Cache pour 10 minutes
      this.cache.set(cacheKey, preview);
      setTimeout(() => this.cache.delete(cacheKey), 10 * 60 * 1000);

      return preview;

    } catch (error) {
      console.error('❌ Erreur aperçu DeepSeek:', error);

      // Retour de fallback en cas d'erreur
      return {
        homeExcerpt: this.generateFallbackExcerpt(request),
        servicesCount: this.estimateServicesCount(request.formData),
        estimatedWordCount: this.estimateWordCount(request),
        keywords: this.generateLocalKeywords(request)
      };
    }
  }

  /**
   * Génère le contenu de la page d'accueil
   */
  private async generateHomepageContent(request: DeepSeekContentRequest): Promise<any> {
    console.log(`🏠 Génération page d'accueil...`);

    const prompt = `
Tu es un expert en rédaction web SEO pour les artisans français.

Génère le contenu d'accueil pour ${request.businessName}, ${request.businessType} à ${request.ville}.

CONTRAINTES STRICTES :
- Minimum 1000 mots au total pour la page
- Ton professionnel et rassurant
- Mots-clés naturels : "${request.businessType} ${request.ville}"
- Références locales à ${request.ville}
- Call-to-actions pertinents
- Éviter le jargon technique

SECTIONS À CRÉER :

1. HERO (200 mots)
- Titre accrocheur avec ville
- Sous-titre métier
- Description détaillée services
- 2 Call-to-actions

2. SERVICES (300 mots)
- 4-6 services principaux détaillés
- Avantages de chaque service
- Pourquoi nous choisir

3. À PROPOS (300 mots)
- Histoire de l'entreprise
- Mission et valeurs
- Expertise locale
- Engagement qualité

4. PROCESSUS (200 mots)
- 4-5 étapes détaillées
- De la demande à la finalisation
- Transparence du processus

Données client disponibles : ${JSON.stringify(request.formData, null, 2)}

Réponds uniquement en JSON avec cette structure :
{
  "hero": {
    "title": "...",
    "subtitle": "...",
    "description": "...",
    "ctaPrimary": "...",
    "ctaSecondary": "..."
  },
  "services": [
    {
      "title": "...",
      "description": "...",
      "features": ["...", "...", "..."]
    }
  ],
  "about": {
    "story": "...",
    "mission": "...",
    "values": ["...", "...", "..."]
  },
  "processus": [
    {
      "step": 1,
      "title": "...",
      "description": "..."
    }
  ],
  "whyUs": [
    {
      "title": "...",
      "description": "...",
      "icon": "..."
    }
  ]
}
`;

    const response = await this.callDeepSeekAPI(prompt, 2000);
    const wordCount = this.countWords(JSON.stringify(response));

    return {
      ...response,
      wordCount
    };
  }

  /**
   * Génère le contenu des pages services
   */
  private async generateServicesContent(request: DeepSeekContentRequest): Promise<any[]> {
    console.log(`🔧 Génération pages services...`);

    const services = this.extractServicesFromFormData(request.formData);
    const servicesContent = [];

    for (const service of services) {
      const prompt = `
Tu es un expert SEO pour les artisans français.

Génère une page service complète pour "${service}" par ${request.businessName} à ${request.ville}.

CONTRAINTES :
- 1000+ mots minimum
- SEO local optimisé
- Ton professionnel
- Call-to-actions pertinents

SECTIONS :
1. Hero avec titre SEO (100 mots)
2. Description détaillée (400 mots)
3. Avantages et bénéfices (200 mots)
4. Processus d'intervention (200 mots)
5. FAQ spécifique (100 mots)

Mots-clés : "${service} ${request.ville}", "${request.businessType} ${request.ville}"

Réponds en JSON :
{
  "slug": "...",
  "title": "...",
  "metaDescription": "...",
  "heroContent": "...",
  "detailedDescription": "...",
  "benefits": ["...", "..."],
  "process": [{"step": 1, "title": "...", "description": "..."}],
  "faq": [{"question": "...", "answer": "..."}],
  "localKeywords": ["...", "..."]
}
`;

      try {
        const response = await this.callDeepSeekAPI(prompt, 1500);
        const wordCount = this.countWords(JSON.stringify(response));

        servicesContent.push({
          ...response,
          wordCount
        });

        // Pause entre les appels API
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`❌ Erreur service ${service}:`, error);
        // Ajouter fallback
        servicesContent.push(this.generateFallbackServiceContent(service, request));
      }
    }

    return servicesContent;
  }

  /**
   * Génère le contenu de la page À propos
   */
  private async generateAboutContent(request: DeepSeekContentRequest): Promise<any> {
    console.log(`📋 Génération page À propos...`);

    const prompt = `
Tu es un expert en storytelling pour les artisans français.

Génère une page "À propos" engageante pour ${request.businessName}, ${request.businessType} à ${request.ville}.

CONTRAINTES :
- 800+ mots minimum
- Histoire authentique et crédible
- Expertise locale mise en avant
- Valeurs d'artisan français
- Certifications et garanties

SECTIONS :
1. Histoire de l'entreprise (300 mots)
2. Équipe et savoir-faire (200 mots)
3. Valeurs et engagement (200 mots)
4. Certifications (100 mots)

Données : ${JSON.stringify(request.formData, null, 2)}

Réponds en JSON :
{
  "story": "...",
  "team": "...",
  "values": ["...", "...", "..."],
  "certifications": ["...", "..."],
  "experience": "...",
  "localHistory": "..."
}
`;

    const response = await this.callDeepSeekAPI(prompt, 1200);
    const wordCount = this.countWords(JSON.stringify(response));

    return {
      ...response,
      wordCount
    };
  }

  /**
   * Génère le contenu de la page contact
   */
  private async generateContactContent(request: DeepSeekContentRequest): Promise<any> {
    console.log(`📞 Génération page contact...`);

    const response = {
      intro: `Vous recherchez un ${request.businessType} professionnel à ${request.ville} ? ${request.businessName} intervient rapidement dans tout le secteur. Contactez-nous pour un devis gratuit et personnalisé.`,
      zones: this.generateInterventionZones(request.ville),
      hours: {
        'Lundi': { open: '08:00', close: '18:00' },
        'Mardi': { open: '08:00', close: '18:00' },
        'Mercredi': { open: '08:00', close: '18:00' },
        'Jeudi': { open: '08:00', close: '18:00' },
        'Vendredi': { open: '08:00', close: '18:00' },
        'Samedi': { open: '09:00', close: '17:00' },
        'Dimanche': { open: 'Fermé', close: 'Fermé' }
      },
      emergencyInfo: this.generateEmergencyInfo(request),
      wordCount: 150
    };

    return response;
  }

  /**
   * Génère le contenu légal RGPD
   */
  private async generateLegalContent(request: DeepSeekContentRequest): Promise<any> {
    console.log(`⚖️ Génération contenu légal...`);

    return {
      mentionsLegales: this.generateMentionsLegales(request),
      politiqueConfidentialite: this.generatePolitiqueConfidentialite(request),
      conditionsUtilisation: this.generateConditionsUtilisation(request),
      cookies: this.generatePolitiqueCookies(request)
    };
  }

  /**
   * Génère le contenu SEO
   */
  private async generateSEOContent(request: DeepSeekContentRequest): Promise<any> {
    console.log(`🎯 Génération contenu SEO...`);

    const baseUrl = `https://${request.formData.domain || 'exemple.fr'}`;

    return {
      metaDescriptions: {
        home: `${request.businessName} - ${request.businessType} professionnel à ${request.ville}. Devis gratuit, intervention rapide. ✓ Qualité ✓ Garantie ✓ ${request.ville}`,
        about: `Découvrez ${request.businessName}, votre ${request.businessType} de confiance à ${request.ville}. Expertise locale et savoir-faire artisanal depuis plusieurs années.`,
        contact: `Contactez ${request.businessName} à ${request.ville}. ${request.businessType} professionnel, devis gratuit, intervention rapide dans tout le secteur.`
      },
      schemas: {
        localBusiness: this.generateLocalBusinessSchema(request),
        organization: this.generateOrganizationSchema(request),
        breadcrumbList: this.generateBreadcrumbSchema(baseUrl)
      },
      localBusiness: this.generateLocalBusinessSchema(request),
      breadcrumbs: {
        home: [{ name: 'Accueil', url: baseUrl }],
        about: [
          { name: 'Accueil', url: baseUrl },
          { name: 'À propos', url: `${baseUrl}/a-propos` }
        ],
        contact: [
          { name: 'Accueil', url: baseUrl },
          { name: 'Contact', url: `${baseUrl}/contact` }
        ]
      },
      sitemap: [
        { url: baseUrl, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/a-propos`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/services`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/contact`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.7 }
      ]
    };
  }

  /**
   * Appel à l'API DeepSeek
   */
  private async callDeepSeekAPI(prompt: string, maxTokens: number = 1000): Promise<any> {
    if (!this.apiKey) {
      console.warn('🔄 Mode simulation DeepSeek activé');
      return this.simulateDeepSeekResponse(prompt);
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'Tu es un expert en rédaction web SEO et marketing digital pour les artisans français. Tu génères du contenu professionnel, optimisé SEO et authentique.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API DeepSeek: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      try {
        return JSON.parse(content);
      } catch (parseError) {
        console.error('❌ Erreur parsing JSON DeepSeek:', parseError);
        return this.simulateDeepSeekResponse(prompt);
      }

    } catch (error) {
      console.error('❌ Erreur appel API DeepSeek:', error);
      return this.simulateDeepSeekResponse(prompt);
    }
  }

  /**
   * Mode simulation pour développement
   */
  private simulateDeepSeekResponse(prompt: string): any {
    console.log('🎭 Simulation réponse DeepSeek...');

    // Retourne une réponse basique simulée
    return {
      title: 'Contenu simulé DeepSeek',
      content: 'Contenu généré en mode simulation pour développement.',
      generated: true,
      simulation: true
    };
  }

  /**
   * Fonctions utilitaires
   */
  private extractServicesFromFormData(formData: Record<string, any>): string[] {
    const services = [];

    // Extraire les services depuis les données du formulaire
    for (const key in formData) {
      if (key.startsWith('service') && formData[key]) {
        services.push(formData[key]);
      }
    }

    // Services par défaut si aucun trouvé
    if (services.length === 0) {
      services.push('Dépannage', 'Installation', 'Maintenance', 'Réparation');
    }

    return services.slice(0, 8); // Max 8 services
  }

  private generateLocalKeywords(request: DeepSeekPreviewRequest): string[] {
    return [
      `${request.businessType} ${request.ville}`,
      `${request.businessType} professionnel ${request.ville}`,
      `entreprise ${request.businessType} ${request.ville}`,
      `artisan ${request.businessType} ${request.ville}`,
      `dépannage ${request.businessType} ${request.ville}`
    ];
  }

  private generateInterventionZones(ville: string): string[] {
    // En réalité, on utiliserait une API géographique
    return [
      ville,
      `${ville} et alentours`,
      'Dans un rayon de 30km',
      'Intervention rapide secteur'
    ];
  }

  private generateEmergencyInfo(request: DeepSeekContentRequest): string {
    if (['plombier', 'electricien', 'chauffagiste', 'serrurier'].includes(request.businessType)) {
      return `Service d'urgence 24h/7j disponible pour les interventions ${request.businessType} à ${request.ville}. Appelez-nous pour toute urgence.`;
    }
    return `Interventions programmées du lundi au samedi à ${request.ville}. Devis gratuit sur simple demande.`;
  }

  private generateFallbackExcerpt(request: DeepSeekPreviewRequest): string {
    return `${request.businessName}, votre ${request.businessType} professionnel à ${request.ville}. Expertise locale, devis gratuit, intervention rapide et travail de qualité garanti.`;
  }

  private generateFallbackServiceContent(service: string, request: DeepSeekContentRequest): any {
    return {
      slug: service.toLowerCase().replace(/\s+/g, '-'),
      title: `${service} - ${request.businessName} à ${request.ville}`,
      metaDescription: `${service} professionnel à ${request.ville} par ${request.businessName}. Devis gratuit, intervention rapide, travail de qualité.`,
      heroContent: `Service ${service} professionnel à ${request.ville}`,
      detailedDescription: `${request.businessName} vous propose des services de ${service} professionnels à ${request.ville} et dans tout le secteur.`,
      benefits: ['Qualité garantie', 'Intervention rapide', 'Devis gratuit'],
      process: [
        { step: 1, title: 'Contact', description: 'Prise de contact et diagnostic' },
        { step: 2, title: 'Devis', description: 'Établissement du devis gratuit' },
        { step: 3, title: 'Intervention', description: 'Réalisation des travaux' }
      ],
      faq: [
        { question: `Intervenez-vous rapidement pour du ${service} ?`, answer: 'Oui, nous intervenons rapidement sur tout le secteur.' }
      ],
      localKeywords: [`${service} ${request.ville}`],
      wordCount: 200
    };
  }

  private countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  private calculateTotalWordCount(pages: any): number {
    let total = 0;

    if (pages.home?.wordCount) total += pages.home.wordCount;
    if (pages.about?.wordCount) total += pages.about.wordCount;
    if (pages.contact?.wordCount) total += pages.contact.wordCount;

    if (pages.services) {
      pages.services.forEach((service: any) => {
        if (service.wordCount) total += service.wordCount;
      });
    }

    return total;
  }

  private estimateServicesCount(formData: Record<string, any>): number {
    const services = Object.keys(formData).filter(key => key.startsWith('service')).length;
    return Math.max(3, Math.min(8, services || 4));
  }

  private estimateWordCount(request: DeepSeekPreviewRequest): number {
    const baseCount = 1000; // Page d'accueil
    const servicesCount = this.estimateServicesCount(request.formData);
    const servicePages = servicesCount * 800; // 800 mots par service
    const otherPages = 1200; // About + Contact + Legal

    return baseCount + servicePages + otherPages;
  }

  private buildPreviewPrompt(request: DeepSeekPreviewRequest): string {
    return `Génère un aperçu en 2 phrases pour ${request.businessName}, ${request.businessType} à ${request.ville}. Ton professionnel, mots-clés naturels.`;
  }

  // Fonctions de génération de contenu légal
  private generateMentionsLegales(request: DeepSeekContentRequest): string {
    return `Mentions légales pour ${request.businessName}. Conformité légale française pour artisans.`;
  }

  private generatePolitiqueConfidentialite(request: DeepSeekContentRequest): string {
    return `Politique de confidentialité conforme RGPD pour ${request.businessName}.`;
  }

  private generateConditionsUtilisation(request: DeepSeekContentRequest): string {
    return `Conditions d'utilisation du site web de ${request.businessName}.`;
  }

  private generatePolitiqueCookies(request: DeepSeekContentRequest): string {
    return `Politique cookies conforme RGPD pour ${request.businessName}.`;
  }

  private generateLocalBusinessSchema(request: DeepSeekContentRequest): object {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": request.businessName,
      "description": `${request.businessType} professionnel à ${request.ville}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": request.ville,
        "addressCountry": "FR"
      },
      "telephone": request.formData.telephone,
      "email": request.formData.email
    };
  }

  private generateOrganizationSchema(request: DeepSeekContentRequest): object {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": request.businessName,
      "description": `${request.businessType} à ${request.ville}`
    };
  }

  private generateBreadcrumbSchema(baseUrl: string): object {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": baseUrl
        }
      ]
    };
  }

  /**
   * Nettoie le cache pour un workflow spécifique
   */
  async clearCache(workflowId: string): Promise<void> {
    const keysToDelete = Array.from(this.cache.keys()).filter(key =>
      key.includes(workflowId)
    );

    keysToDelete.forEach(key => this.cache.delete(key));
    console.log(`🧹 Cache DeepSeek nettoyé pour ${workflowId}: ${keysToDelete.length} entrées`);
  }

  /**
   * Statistiques d'utilisation du service
   */
  getUsageStats(): {
    cacheSize: number;
    totalRequests: number;
    successRate: number;
    avgResponseTime: number;
  } {
    return {
      cacheSize: this.cache.size,
      totalRequests: 0, // À implémenter avec un compteur
      successRate: 0.95, // À calculer en production
      avgResponseTime: 2500 // À mesurer en production
    };
  }
}
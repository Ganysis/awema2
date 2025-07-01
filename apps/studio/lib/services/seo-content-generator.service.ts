interface SiteData {
  business?: {
    name?: string;
    type?: string;
  };
  services?: Array<{
    name: string;
    description?: string;
  }>;
}

export interface SEOContentConfig {
  targetKeywords: string[];
  keywordDensity: number; // Pourcentage recommandé : 1-3%
  minWordCount: number;
  tone: 'professional' | 'friendly' | 'technical' | 'casual';
  includeLocalSEO: boolean;
  includeFAQ: boolean;
  includeSchema: boolean;
}

export interface GeneratedContent {
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  sections: Array<{
    title: string;
    content: string;
    keywords: string[];
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  schema?: any;
}

export class SEOContentGeneratorService {
  private siteData: SiteData;
  private contentTemplates: Map<string, string[]>;

  constructor(siteData: SiteData) {
    this.siteData = siteData;
    this.contentTemplates = this.initializeTemplates();
  }

  private initializeTemplates(): Map<string, string[]> {
    const templates = new Map<string, string[]>();
    
    // Templates d'introduction
    templates.set('intro_professional', [
      'Avec plus de {years} ans d\'expérience dans le domaine de {service}, {company} est votre partenaire de confiance à {city}.',
      'Spécialiste reconnu en {service} à {city}, {company} met son expertise à votre service pour tous vos projets.',
      '{company} vous accompagne dans tous vos besoins en {service} sur {city} et ses environs avec professionnalisme et efficacité.'
    ]);
    
    templates.set('intro_friendly', [
      'Vous cherchez un expert en {service} à {city} ? {company} est là pour vous aider !',
      'Besoin d\'un {service} de qualité ? {company} intervient rapidement à {city} et dans les communes voisines.',
      'Chez {company}, nous sommes passionnés par notre métier de {service} et nous le prouvons chaque jour à {city}.'
    ]);
    
    // Templates de contenu
    templates.set('benefits', [
      'intervention rapide en moins de {time}',
      'devis gratuit et sans engagement',
      'garantie décennale incluse',
      'équipe qualifiée et certifiée',
      'matériel professionnel de dernière génération',
      'respect des délais et du budget',
      'service client disponible 7j/7',
      'plus de {satisfied} clients satisfaits'
    ]);
    
    templates.set('local_seo', [
      'Nous intervenons dans tout le département, notamment à {cities}.',
      'Notre zone d\'intervention couvre {city} et un rayon de {radius} km alentour.',
      'Présents à {city} depuis {years} ans, nous connaissons parfaitement les spécificités locales.',
      'De {city1} à {city2}, en passant par {city3}, nous sommes votre {service} de proximité.'
    ]);
    
    return templates;
  }

  async generateContent(
    service: string,
    config: Partial<SEOContentConfig> = {}
  ): Promise<GeneratedContent> {
    const defaultConfig: SEOContentConfig = {
      targetKeywords: [service, 'ville', `${service} ville`],
      keywordDensity: 2,
      minWordCount: 800,
      tone: 'professional',
      includeLocalSEO: true,
      includeFAQ: true,
      includeSchema: true
    };
    
    const finalConfig = { ...defaultConfig, ...config };
    
    // Générer le contenu principal
    const content = this.generateMainContent(service, finalConfig);
    
    // Optimiser la densité des mots-clés
    const optimizedContent = this.optimizeKeywordDensity(content, finalConfig);
    
    // Générer FAQ si demandé
    const faq = finalConfig.includeFAQ ? this.generateFAQ(service) : undefined;
    
    // Générer schema si demandé
    const schema = finalConfig.includeSchema ? this.generateContentSchema(service, optimizedContent) : undefined;
    
    return {
      ...optimizedContent,
      faq,
      schema
    };
  }

  private generateMainContent(service: string, config: SEOContentConfig): GeneratedContent {
    const company = this.siteData.business?.name || 'Entreprise';
    const city = 'ville';
    
    // Titre SEO optimisé
    const title = this.generateTitle(service, city, company);
    
    // Meta description
    const metaDescription = this.generateMetaDescription(service, city, company);
    
    // H1
    const h1 = `${service} à ${city} - ${company}`;
    
    // Introduction
    const introTemplate = this.getRandomTemplate(`intro_${config.tone}`);
    const introduction = this.fillTemplate(introTemplate, {
      service,
      company,
      city,
      years: '10'
    });
    
    // Sections de contenu
    const sections = this.generateSections(service, city, company, config);
    
    return {
      title,
      metaDescription,
      h1,
      introduction,
      sections
    };
  }

  private generateTitle(service: string, city: string, company: string): string {
    const templates = [
      `${service} ${city} - ${company} | Devis Gratuit`,
      `${company} : ${service} à ${city} et environs | Pro certifié`,
      `${service} ${city} - ${company}`,
      `Entreprise ${service} ${city} - ${company} | ⭐ Avis clients`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateMetaDescription(service: string, city: string, company: string): string {
    const templates = [
      `${company}, votre expert ${service} à ${city}. ✓ Devis gratuit ✓ Intervention rapide ✓ Garantie décennale.`,
      `Besoin d'un ${service} à ${city} ? ${company} intervient en 24h. Plus de 500 clients satisfaits. Demandez votre devis gratuit !`,
      `${service} ${city} et environs par ${company}. Entreprise locale certifiée, tarifs compétitifs.`
    ];
    
    const description = templates[Math.floor(Math.random() * templates.length)];
    return description.substring(0, 160); // Limite Google
  }

  private generateSections(
    service: string,
    city: string,
    company: string,
    config: SEOContentConfig
  ): GeneratedContent['sections'] {
    const sections: GeneratedContent['sections'] = [];
    
    // Section 1 : Pourquoi nous choisir
    sections.push({
      title: `Pourquoi choisir ${company} pour votre ${service} à ${city} ?`,
      content: this.generateWhyChooseUs(service, city, company),
      keywords: [service, city, company]
    });
    
    // Section 2 : Nos services
    sections.push({
      title: `Nos prestations de ${service} à ${city}`,
      content: this.generateServicesSection(service, city),
      keywords: [service, 'prestations', city]
    });
    
    // Section 3 : Zone d'intervention (SEO local)
    if (config.includeLocalSEO) {
      sections.push({
        title: `${service} dans votre secteur`,
        content: this.generateLocalSection(service, city),
        keywords: [service, city]
      });
    }
    
    // Section 4 : Processus
    sections.push({
      title: `Comment se déroule notre intervention ${service} ?`,
      content: this.generateProcessSection(service),
      keywords: [service, 'intervention', 'devis']
    });
    
    // Section 5 : Tarifs
    sections.push({
      title: `Tarifs ${service} ${city} - Devis gratuit`,
      content: this.generatePricingSection(service, city),
      keywords: ['tarifs', service, city, 'devis gratuit']
    });
    
    return sections;
  }

  private generateWhyChooseUs(service: string, city: string, company: string): string {
    const benefits = this.getRandomItems(this.contentTemplates.get('benefits') || [], 5);
    
    let content = `En choisissant ${company} pour votre ${service} à ${city}, vous bénéficiez de nombreux avantages :\n\n`;
    
    benefits.forEach(benefit => {
      const filledBenefit = this.fillTemplate(benefit, {
        time: '2 heures',
        satisfied: '500'
      });
      content += `• ${filledBenefit.charAt(0).toUpperCase() + filledBenefit.slice(1)}\n`;
    });
    
    content += `\nNotre équipe de professionnels qualifiés met tout en œuvre pour vous garantir un ${service} de qualité supérieure. `;
    content += `Avec une présence forte à ${city} depuis de nombreuses années, nous avons su gagner la confiance de nos clients `;
    content += `grâce à notre sérieux, notre réactivité et la qualité de nos prestations.`;
    
    return content;
  }

  private generateServicesSection(service: string, city: string): string {
    const serviceData = this.siteData.services?.find(s => s.name.toLowerCase().includes(service.toLowerCase()));
    
    let content = `${this.siteData.business?.name || 'Nous'} propose une gamme complète de services de ${service} à ${city} :\n\n`;
    
    if (serviceData?.description) {
      content += serviceData.description + '\n\n';
    } else {
      // Contenu générique si pas de features
      content += `• ${service} d'urgence 24/7\n`;
      content += `• ${service} préventif et curatif\n`;
      content += `• Diagnostic et conseil personnalisé\n`;
      content += `• Maintenance et entretien régulier\n`;
      content += `• ${service} pour particuliers et professionnels\n`;
    }
    
    content += `\nQuel que soit votre projet de ${service} à ${city}, nous avons la solution adaptée à vos besoins et à votre budget.`;
    
    return content;
  }

  private generateLocalSection(service: string, mainCity: string): string {
    const cities = [mainCity];
    const nearByCities = cities;
    
    let content = `Notre entreprise de ${service} rayonne sur l'ensemble du secteur de ${mainCity}. `;
    content += `Nous intervenons régulièrement dans les communes suivantes :\n\n`;
    
    nearByCities.forEach(city => {
      content += `• **${city}** : ${service} rapide et efficace\n`;
    });
    
    content += `\nNotre connaissance approfondie de la région nous permet d'intervenir rapidement, `;
    content += `que vous soyez situé en centre-ville de ${mainCity} ou dans les communes périphériques. `;
    content += `Cette proximité géographique est un atout majeur pour garantir des interventions dans les meilleurs délais.\n\n`;
    
    content += `Grâce à notre implantation locale, nous pouvons vous proposer :\n`;
    content += `• Des délais d'intervention réduits\n`;
    content += `• Une parfaite connaissance des spécificités locales\n`;
    content += `• Un service de proximité personnalisé\n`;
    content += `• Des tarifs compétitifs sans frais de déplacement excessifs`;
    
    return content;
  }

  private generateProcessSection(service: string): string {
    let content = `Voici comment se déroule une intervention type de ${service} avec notre équipe :\n\n`;
    
    const steps = [
      {
        title: 'Premier contact',
        desc: `Vous nous contactez par téléphone ou via notre formulaire en ligne.`
      },
      {
        title: 'Diagnostic gratuit',
        desc: `Un expert se déplace gratuitement pour évaluer vos besoins en ${service}.`
      },
      {
        title: 'Devis détaillé',
        desc: 'Nous vous remettons un devis clair et transparent, sans surprise.'
      },
      {
        title: 'Planification',
        desc: 'Nous convenons ensemble d\'une date d\'intervention qui vous convient.'
      },
      {
        title: 'Réalisation',
        desc: `Notre équipe réalise votre ${service} dans le respect des normes et délais.`
      },
      {
        title: 'Garantie',
        desc: 'Vous bénéficiez de notre garantie et d\'un suivi après intervention.'
      }
    ];
    
    steps.forEach((step, index) => {
      content += `**${index + 1}. ${step.title}**\n${step.desc}\n\n`;
    });
    
    content += `Ce processus éprouvé nous permet de garantir votre satisfaction à chaque étape de votre projet de ${service}.`;
    
    return content;
  }

  private generatePricingSection(service: string, city: string): string {
    let content = `Le coût d'un ${service} à ${city} peut varier en fonction de plusieurs facteurs. `;
    content += `Chez ${this.siteData.business?.name || 'nous'}, nous nous engageons à vous proposer des tarifs justes et transparents.\n\n`;
    
    content += `**Facteurs influençant le prix :**\n`;
    content += `• L'ampleur et la complexité de l'intervention\n`;
    content += `• Les matériaux nécessaires\n`;
    content += `• Le temps de main d'œuvre requis\n`;
    content += `• L'urgence de l'intervention\n`;
    content += `• L'accessibilité du chantier\n\n`;
    
    content += `**Notre engagement tarifaire :**\n`;
    content += `• Devis gratuit et sans engagement\n`;
    content += `• Prix fermes et définitifs\n`;
    content += `• Aucun frais caché\n`;
    content += `• Facilités de paiement possibles\n`;
    content += `• Tarifs compétitifs sur ${city}\n\n`;
    
    content += `Pour obtenir une estimation précise pour votre projet de ${service}, `;
    content += `n'hésitez pas à nous contacter. Nos devis sont établis gratuitement après visite sur place.`;
    
    return content;
  }

  private generateFAQ(service: string): Array<{ question: string; answer: string }> {
    const city = 'votre ville';
    const company = this.siteData.business?.name || 'notre entreprise';
    
    return [
      {
        question: `Combien coûte un ${service} à ${city} ?`,
        answer: `Le prix d'un ${service} à ${city} varie selon la nature et l'ampleur des travaux. ${company} propose des devis gratuits et personnalisés après évaluation de vos besoins. Nos tarifs sont compétitifs et transparents, sans frais cachés.`
      },
      {
        question: `Quels sont vos délais d'intervention pour un ${service} ?`,
        answer: `Nous intervenons généralement sous 24 à 48h pour un ${service} à ${city}. En cas d'urgence, notre équipe peut se déplacer dans les 2 heures. La planification dépend de votre disponibilité et de l'urgence de la situation.`
      },
      {
        question: `Proposez-vous une garantie sur vos travaux de ${service} ?`,
        answer: `Oui, tous nos travaux de ${service} sont couverts par notre garantie décennale et une garantie de parfait achèvement. Nous assurons également un service après-vente réactif pour toute question ou intervention complémentaire.`
      },
      {
        question: `Intervenez-vous le week-end et les jours fériés ?`,
        answer: `${company} propose un service d'urgence 7j/7 pour les interventions de ${service} urgentes à ${city}. Les interventions planifiées sont généralement programmées en semaine, mais nous pouvons nous adapter à vos contraintes.`
      },
      {
        question: `Quelles sont vos zones d'intervention autour de ${city} ?`,
        answer: `Nous intervenons à ${city} et dans un rayon de 30 km alentour, couvrant notamment les communes voisines. Notre connaissance du secteur nous permet d'intervenir rapidement partout dans la région.`
      },
      {
        question: `Comment obtenir un devis pour un ${service} ?`,
        answer: `Pour obtenir votre devis gratuit, vous pouvez nous appeler, remplir notre formulaire en ligne, ou nous envoyer un email. Un expert se déplacera gratuitement pour évaluer vos besoins et établir un devis détaillé.`
      }
    ];
  }

  private generateContentSchema(service: string, content: GeneratedContent): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': content.title,
      'description': content.metaDescription,
      'author': {
        '@type': 'Organization',
        'name': this.siteData.business?.name || 'Entreprise'
      },
      'publisher': {
        '@type': 'Organization',
        'name': this.siteData.business?.name || 'Entreprise'
      },
      'datePublished': new Date().toISOString(),
      'dateModified': new Date().toISOString(),
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `/services/${service.toLowerCase().replace(/\s+/g, '-')}`
      },
      'articleSection': 'Services',
      'keywords': content.sections.flatMap(s => s.keywords).join(', '),
      'wordCount': this.countWords(content),
      'articleBody': content.introduction + '\n\n' + content.sections.map(s => `${s.title}\n${s.content}`).join('\n\n')
    };
  }

  private optimizeKeywordDensity(
    content: GeneratedContent,
    config: SEOContentConfig
  ): GeneratedContent {
    // Calculer la densité actuelle
    const fullText = this.getFullText(content);
    const wordCount = this.countWords(content);
    
    config.targetKeywords.forEach(keyword => {
      const currentDensity = this.calculateKeywordDensity(fullText, keyword);
      const targetDensity = config.keywordDensity;
      
      if (currentDensity < targetDensity) {
        // Ajouter des occurrences naturelles du mot-clé
        content.sections = content.sections.map(section => {
          if (!section.content.toLowerCase().includes(keyword.toLowerCase())) {
            // Ajouter le mot-clé de manière naturelle
            section.content = this.insertKeyword(section.content, keyword);
          }
          return section;
        });
      }
    });
    
    return content;
  }

  // Méthodes utilitaires
  private fillTemplate(template: string, data: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => data[key] || match);
  }

  private getRandomTemplate(key: string): string {
    const templates = this.contentTemplates.get(key) || [];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private countWords(content: GeneratedContent): number {
    const fullText = this.getFullText(content);
    return fullText.split(/\s+/).filter(word => word.length > 0).length;
  }

  private getFullText(content: GeneratedContent): string {
    return content.introduction + ' ' + content.sections.map(s => s.content).join(' ');
  }

  private calculateKeywordDensity(text: string, keyword: string): number {
    const words = text.toLowerCase().split(/\s+/);
    const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
    return (keywordCount / words.length) * 100;
  }

  private insertKeyword(text: string, keyword: string): string {
    // Insérer le mot-clé de manière naturelle dans le texte
    const sentences = text.split('. ');
    const randomIndex = Math.floor(Math.random() * sentences.length);
    
    if (randomIndex === sentences.length - 1) {
      sentences[randomIndex] = `${sentences[randomIndex]} Notre expertise en ${keyword} fait la différence.`;
    } else {
      sentences[randomIndex] = `${sentences[randomIndex]}, notamment en ${keyword}.`;
    }
    
    return sentences.join('. ');
  }

  // Méthode pour générer du contenu pour toutes les pages
  async generateAllPagesContent(): Promise<Map<string, GeneratedContent>> {
    const contentMap = new Map<string, GeneratedContent>();
    
    // Page d'accueil
    const businessName = this.siteData.business?.name || 'Entreprise';
    contentMap.set('index', await this.generateContent(
      businessName,
      {
        targetKeywords: [
          businessName,
          ...this.siteData.services?.map(s => s.name) || []
        ],
        tone: 'friendly'
      }
    ));
    
    // Pages de services
    for (const service of this.siteData.services || []) {
      contentMap.set(
        `service-${service.name.toLowerCase().replace(/\s+/g, '-')}`,
        await this.generateContent(service.name, {
          targetKeywords: [
            service.name
          ]
        })
      );
    }
    
    // Pages ville × service - Removed as cities not defined in interface
    
    return contentMap;
  }
}
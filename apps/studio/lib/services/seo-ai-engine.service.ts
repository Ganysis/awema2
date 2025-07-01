import { PageSEO } from '@/lib/store/editor-store';
import { BusinessInfo } from '@awema/shared';

export interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  suggestions: SEOSuggestion[];
  competitors: CompetitorAnalysis[];
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  field: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
}

export interface SEOSuggestion {
  field: string;
  current: string;
  suggested: string;
  reason: string;
  expectedImprovement: number;
}

export interface CompetitorAnalysis {
  domain: string;
  rankingKeywords: string[];
  estimatedTraffic: number;
  contentGaps: string[];
}

export interface KeywordAnalysis {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  trend: 'rising' | 'stable' | 'declining';
  relatedKeywords: string[];
}

export class SEOAIEngineService {
  private businessInfo: BusinessInfo;
  
  constructor(businessInfo: BusinessInfo) {
    this.businessInfo = businessInfo;
  }

  /**
   * Analyse SEO complète avec IA
   */
  async analyzePage(pageTitle: string, pageContent: string, currentSEO: PageSEO): Promise<SEOAnalysis> {
    const score = this.calculateSEOScore(currentSEO);
    const issues = this.detectSEOIssues(currentSEO, pageContent);
    const suggestions = await this.generateAISuggestions(pageTitle, pageContent, currentSEO);
    const competitors = await this.analyzeCompetitors();

    return {
      score,
      issues,
      suggestions,
      competitors
    };
  }

  /**
   * Génération de contenu SEO optimisé avec IA
   */
  async generateOptimizedContent(
    pageType: string,
    keywords: string[],
    tone: 'professional' | 'friendly' | 'technical' = 'professional'
  ): Promise<{
    title: string;
    description: string;
    content: string;
    headings: string[];
    faq: Array<{ question: string; answer: string }>;
  }> {
    // Simulation de génération IA
    // En production, cela appellerait l'API OpenAI/Claude
    
    const mainKeyword = keywords[0] || this.businessInfo.services?.[0]?.name || 'service';
    const location = this.businessInfo.location?.serviceArea?.[0] || 'votre ville';
    
    return {
      title: `${mainKeyword} ${location} - ${this.businessInfo.companyName} | Devis Gratuit`,
      description: `Besoin d'un ${mainKeyword} à ${location} ? ${this.businessInfo.companyName} intervient rapidement avec garantie décennale. ✓ Devis gratuit ✓ Intervention 24/7`,
      content: this.generatePageContent(pageType, mainKeyword, location),
      headings: [
        `${mainKeyword} à ${location} : Votre Expert Local`,
        `Pourquoi Choisir ${this.businessInfo.companyName} ?`,
        `Nos Services de ${mainKeyword}`,
        `Zone d'Intervention autour de ${location}`,
        `Demandez Votre Devis Gratuit`
      ],
      faq: this.generateFAQ(mainKeyword, location)
    };
  }

  /**
   * Analyse de mots-clés avec données de recherche
   */
  async analyzeKeywords(keywords: string[]): Promise<KeywordAnalysis[]> {
    // Simulation d'analyse de mots-clés
    // En production, utiliserait des APIs comme SEMrush, Ahrefs, etc.
    
    return keywords.map(keyword => ({
      keyword,
      searchVolume: Math.floor(Math.random() * 5000) + 100,
      difficulty: Math.floor(Math.random() * 100),
      cpc: parseFloat((Math.random() * 5).toFixed(2)),
      trend: ['rising', 'stable', 'declining'][Math.floor(Math.random() * 3)] as any,
      relatedKeywords: this.generateRelatedKeywords(keyword)
    }));
  }

  /**
   * Prédiction de ranking avec Machine Learning
   */
  async predictRanking(seo: PageSEO, content: string): Promise<{
    estimatedPosition: number;
    confidence: number;
    factors: Array<{ factor: string; impact: number }>;
  }> {
    const factors = [
      { factor: 'Longueur du titre', impact: seo.title ? seo.title.length >= 30 && seo.title.length <= 60 ? 10 : -5 : -10 },
      { factor: 'Meta description', impact: seo.description ? 15 : -15 },
      { factor: 'Contenu unique', impact: content.length > 1000 ? 20 : 5 },
      { factor: 'Schema.org', impact: seo.structuredData && Object.keys(seo.structuredData).length > 0 ? 25 : 0 },
      { factor: 'Optimisation mobile', impact: 15 },
      { factor: 'Vitesse de chargement', impact: 10 }
    ];

    const totalImpact = factors.reduce((sum, f) => sum + f.impact, 0);
    const estimatedPosition = Math.max(1, Math.min(50, 50 - Math.floor(totalImpact / 2)));
    const confidence = Math.min(95, 50 + totalImpact / 2);

    return {
      estimatedPosition,
      confidence,
      factors: factors.sort((a, b) => b.impact - a.impact)
    };
  }

  /**
   * Optimisation pour la recherche vocale
   */
  generateVoiceSearchOptimization(service: string, location: string): {
    questions: string[];
    answers: string[];
    schema: any;
  } {
    const questions = [
      `Où trouver un ${service} près de chez moi à ${location} ?`,
      `Quel est le meilleur ${service} à ${location} ?`,
      `Combien coûte un ${service} à ${location} ?`,
      `Comment contacter un ${service} en urgence à ${location} ?`,
      `Quels sont les horaires du ${service} à ${location} ?`
    ];

    const answers = questions.map(q => this.generateVoiceAnswer(q, service, location));

    return {
      questions,
      answers,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q, i) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answers[i]
          }
        }))
      }
    };
  }

  // Private methods

  private calculateSEOScore(seo: PageSEO): number {
    let score = 0;
    
    // Title
    if (seo.title) {
      score += 15;
      if (seo.title.length >= 30 && seo.title.length <= 60) score += 10;
    }
    
    // Description
    if (seo.description) {
      score += 15;
      if (seo.description.length >= 120 && seo.description.length <= 160) score += 10;
    }
    
    // Keywords
    if (seo.keywords) score += 10;
    
    // Open Graph
    if (seo.ogTitle) score += 5;
    if (seo.ogDescription) score += 5;
    if (seo.ogImage) score += 10;
    
    // Technical
    if (seo.canonicalUrl) score += 5;
    if (seo.robots && seo.robots === 'index,follow') score += 5;
    
    // Structured Data
    if (seo.structuredData && Object.keys(seo.structuredData).length > 0) score += 15;
    
    return Math.min(100, score);
  }

  private detectSEOIssues(seo: PageSEO, content: string): SEOIssue[] {
    const issues: SEOIssue[] = [];

    if (!seo.title) {
      issues.push({
        type: 'error',
        field: 'title',
        message: 'Le titre SEO est manquant',
        impact: 'high'
      });
    } else if (seo.title.length < 30) {
      issues.push({
        type: 'warning',
        field: 'title',
        message: 'Le titre est trop court (moins de 30 caractères)',
        impact: 'medium'
      });
    } else if (seo.title.length > 60) {
      issues.push({
        type: 'warning',
        field: 'title',
        message: 'Le titre est trop long (plus de 60 caractères)',
        impact: 'medium'
      });
    }

    if (!seo.description) {
      issues.push({
        type: 'error',
        field: 'description',
        message: 'La meta description est manquante',
        impact: 'high'
      });
    }

    if (!seo.ogImage) {
      issues.push({
        type: 'warning',
        field: 'ogImage',
        message: 'Aucune image Open Graph définie',
        impact: 'medium'
      });
    }

    if (content.length < 300) {
      issues.push({
        type: 'warning',
        field: 'content',
        message: 'Le contenu est trop court (moins de 300 mots)',
        impact: 'high'
      });
    }

    return issues;
  }

  private async generateAISuggestions(
    pageTitle: string,
    pageContent: string,
    currentSEO: PageSEO
  ): Promise<SEOSuggestion[]> {
    const suggestions: SEOSuggestion[] = [];
    const mainService = this.businessInfo.services?.[0]?.name || 'service';
    const location = this.businessInfo.location?.serviceArea?.[0] || 'ville';

    // Title suggestions
    if (!currentSEO.title || currentSEO.title.length < 30) {
      suggestions.push({
        field: 'title',
        current: currentSEO.title || '',
        suggested: `${pageTitle} ${location} - ${this.businessInfo.companyName} | Pro Certifié`,
        reason: 'Inclut la localisation et renforce la confiance',
        expectedImprovement: 25
      });
    }

    // Description suggestions
    if (!currentSEO.description) {
      suggestions.push({
        field: 'description',
        current: '',
        suggested: `${this.businessInfo.companyName}, votre ${mainService} à ${location}. ✓ Intervention rapide ✓ Devis gratuit ✓ Garantie décennale.`,
        reason: 'Description optimisée avec appel à l\'action et éléments de confiance',
        expectedImprovement: 30
      });
    }

    // Keywords suggestions
    if (!currentSEO.keywords) {
      const suggestedKeywords = [
        mainService,
        `${mainService} ${location}`,
        `${mainService} pas cher`,
        `urgence ${mainService}`,
        'devis gratuit',
        'artisan certifié'
      ];
      
      suggestions.push({
        field: 'keywords',
        current: '',
        suggested: suggestedKeywords.join(', '),
        reason: 'Mots-clés locaux et transactionnels pour améliorer le ciblage',
        expectedImprovement: 15
      });
    }

    return suggestions;
  }

  private async analyzeCompetitors(): Promise<CompetitorAnalysis[]> {
    // Simulation d'analyse concurrentielle
    const mainService = this.businessInfo.services?.[0]?.name || 'service';
    const location = this.businessInfo.location?.serviceArea?.[0] || 'ville';

    return [
      {
        domain: 'concurrent1.fr',
        rankingKeywords: [
          `${mainService} ${location}`,
          `${mainService} urgent`,
          `meilleur ${mainService}`
        ],
        estimatedTraffic: 2500,
        contentGaps: [
          'Guide complet des tarifs',
          'Témoignages clients vidéo',
          'Calculateur de devis en ligne'
        ]
      },
      {
        domain: 'concurrent2.com',
        rankingKeywords: [
          `${mainService} pro`,
          `entreprise ${mainService}`,
          `${mainService} 24h/24`
        ],
        estimatedTraffic: 1800,
        contentGaps: [
          'Blog avec conseils pratiques',
          'Galerie avant/après',
          'FAQ détaillée'
        ]
      }
    ];
  }

  private generatePageContent(pageType: string, service: string, location: string): string {
    const templates: Record<string, string> = {
      service: `
        <h2>${service} à ${location} : Excellence et Professionnalisme</h2>
        <p>Vous recherchez un ${service} de confiance à ${location} ? ${this.businessInfo.companyName} est votre partenaire idéal pour tous vos besoins. Fort de ${ '10'} ans d'expérience, nous garantissons des prestations de qualité supérieure.</p>
        
        <h3>Pourquoi nous choisir ?</h3>
        <ul>
          <li>✓ Intervention rapide en moins de 2h</li>
          <li>✓ Devis gratuit et transparent</li>
          <li>✓ Garantie décennale incluse</li>
          <li>✓ Équipe certifiée et expérimentée</li>
          <li>✓ Disponible 7j/7 pour les urgences</li>
        </ul>
        
        <h3>Notre zone d'intervention</h3>
        <p>Nous intervenons à ${location} et dans un rayon de 30km, couvrant toutes les communes environnantes. Notre connaissance approfondie de la région nous permet d'être chez vous rapidement.</p>
      `,
      
      home: `
        <h1>Bienvenue chez ${this.businessInfo.companyName}</h1>
        <p>Votre expert ${service} à ${location} et ses environs. Nous mettons notre savoir-faire à votre service pour tous vos projets, qu'ils soient urgents ou planifiés.</p>
        
        <h2>Nos engagements</h2>
        <p>Chez ${this.businessInfo.companyName}, la satisfaction client est notre priorité absolue. C'est pourquoi nous nous engageons sur :</p>
        <ul>
          <li>Des tarifs transparents et compétitifs</li>
          <li>Un travail soigné et durable</li>
          <li>Le respect des délais convenus</li>
          <li>Un service après-vente réactif</li>
        </ul>
      `,
      
      'seo-local': `
        <h1>${service} à ${location} - Votre Artisan Local</h1>
        <p>Habitant de ${location} ? Vous avez besoin d'un ${service} fiable et proche de chez vous ? ${this.businessInfo.companyName} est l'entreprise locale qu'il vous faut.</p>
        
        <h2>Un ${service} qui connaît ${location}</h2>
        <p>Implantés à ${location} depuis ${ '10'} ans, nous connaissons parfaitement les spécificités de notre région. Cette expertise locale nous permet de vous proposer des solutions adaptées à vos besoins spécifiques.</p>
        
        <h3>Intervention rapide à ${location}</h3>
        <p>Grâce à notre localisation stratégique, nous pouvons intervenir en urgence dans tout ${location} en moins de 30 minutes.</p>
      `
    };

    return templates[pageType] || templates.service;
  }

  private generateFAQ(service: string, location: string): Array<{ question: string; answer: string }> {
    return [
      {
        question: `Combien coûte un ${service} à ${location} ?`,
        answer: `Le tarif d'un ${service} à ${location} varie selon la nature et l'ampleur des travaux. Chez ${this.businessInfo.companyName}, nous proposons des devis gratuits et personnalisés. Nos tarifs sont transparents et compétitifs, avec un excellent rapport qualité-prix.`
      },
      {
        question: `Intervenez-vous en urgence pour un ${service} à ${location} ?`,
        answer: `Oui, nous proposons un service d'urgence 24h/24 et 7j/7 à ${location}. En cas d'urgence, nous interviendrons dans les plus brefs délais.`
      },
      {
        question: `Quelle garantie offrez-vous sur vos travaux de ${service} ?`,
        answer: `Tous nos travaux de ${service} sont couverts par une garantie décennale. De plus, nous offrons une garantie de satisfaction client. Si vous n'êtes pas satisfait, nous revenons gratuitement pour corriger le problème.`
      },
      {
        question: `Comment obtenir un devis pour un ${service} à ${location} ?`,
        answer: `C'est très simple ! Utilisez notre formulaire de contact en ligne. Nous nous déplaçons gratuitement à ${location} pour évaluer vos besoins et vous proposer un devis détaillé sans engagement.`
      },
      {
        question: `Quels sont vos délais d'intervention à ${location} ?`,
        answer: `Pour les urgences, nous intervenons en moins de 2 heures à ${location}. Pour les travaux planifiés, nous nous adaptons à votre planning. La plupart de nos interventions sont programmées sous 48 à 72 heures.`
      }
    ];
  }

  private generateRelatedKeywords(keyword: string): string[] {
    const baseKeywords = [
      `${keyword} pas cher`,
      `${keyword} urgent`,
      `${keyword} professionnel`,
      `meilleur ${keyword}`,
      `${keyword} avis`,
      `tarif ${keyword}`,
      `devis ${keyword}`,
      `${keyword} 24h/24`
    ];

    return baseKeywords.slice(0, 5);
  }

  private generateVoiceAnswer(question: string, service: string, location: string): string {
    // Réponses optimisées pour la recherche vocale (courtes et directes)
    const answers: Record<string, string> = {
      'près de chez moi': `${this.businessInfo.companyName} est votre ${service} local à ${location}. Nous intervenons rapidement dans tout ${location}.`,
      'meilleur': `${this.businessInfo.companyName} est reconnu comme l'un des meilleurs ${service}s à ${location}, avec ${ '10'} ans d'expérience et des centaines de clients satisfaits.`,
      'coûte': `Le prix d'un ${service} à ${location} varie selon les travaux. Chez ${this.businessInfo.companyName}, nous offrons des devis gratuits.`,
      'urgence': `Pour une urgence ${service} à ${location}, contactez ${this.businessInfo.companyName}. Nous intervenons 24h/24 et 7j/7 en moins de 2 heures.`,
      'horaires': `${this.businessInfo.companyName} est ouvert du lundi au vendredi de 8h à 19h, et disponible 24h/24 pour les urgences à ${location}.`
    };

    for (const [key, answer] of Object.entries(answers)) {
      if (question.toLowerCase().includes(key)) {
        return answer;
      }
    }

    return `${this.businessInfo.companyName} est votre ${service} de confiance à ${location}. Pour toute question, contactez-nous.`;
  }
}
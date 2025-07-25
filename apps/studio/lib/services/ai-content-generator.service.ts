// DeepSeek only AI content generator service

export interface DeepSeekConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  costPer1kTokens?: number;
}

export interface GenerationContext {
  business: {
    name: string;
    type: string;
    city: string;
    services: string[];
    serviceCities: string[];
    uniqueSellingPoints?: string[];
    targetAudience?: string[];
  };
  page: {
    type: 'home' | 'service' | 'local-seo' | 'about' | 'contact';
    service?: string;
    city?: string;
    targetKeywords: string[];
    competitors?: string[];
  };
  quality: 'standard' | 'premium' | 'ultra';
  language: 'fr' | 'en' | 'es';
}

export interface GeneratedContent {
  title: string;
  metaDescription: string;
  sections: Record<string, string>;
  internalLinks: Array<{
    anchor: string;
    url: string;
    context: string;
  }>;
  schema: any;
  cost: number;
  provider: string;
}

interface AIProviderConfig {
  deepseek?: DeepSeekConfig;
  claude?: any; // Not used but kept for compatibility
  openai?: any; // Not used but kept for compatibility
}

export class AIContentGeneratorService {
  private apiKey: string;
  private baseURL: string;
  private model: string;
  private cache = new Map<string, GeneratedContent>();
  private totalCost = 0;

  constructor(private config?: AIProviderConfig) {
    // Use DeepSeek by default
    this.apiKey = this.config?.deepseek?.apiKey || process.env.DEEPSEEK_API_KEY || '';
    this.baseURL = this.config?.deepseek?.baseURL || 'https://api.deepseek.com/v1';
    this.model = this.config?.deepseek?.model || 'deepseek-chat';
  }

  async generateContent(context: GenerationContext): Promise<GeneratedContent> {
    // Check cache first
    const cacheKey = this.getCacheKey(context);
    if (this.cache.has(cacheKey)) {
      console.log('🎯 Content found in cache');
      return this.cache.get(cacheKey)!;
    }

    try {
      // Use DeepSeek directly
      const content = await this.generateWithDeepSeek(context);
      
      // Cache the result
      this.cache.set(cacheKey, content);
      
      return content;
    } catch (error) {
      console.error('Error generating content:', error);
      // Return template-based fallback
      return this.generateTemplateFallback(context);
    }
  }

  private async generateWithDeepSeek(context: GenerationContext): Promise<GeneratedContent> {
    const prompt = this.buildPrompt(context);
    
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'Tu es un expert en création de contenu SEO pour les artisans. Tu génères du contenu optimisé, naturel et engageant.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the JSON response
      const parsed = this.parseAIResponse(content);
      
      // Calculate cost
      const totalTokens = data.usage?.total_tokens || 0;
      const cost = (totalTokens / 1000) * 0.002; // DeepSeek pricing
      this.totalCost += cost;
      
      return {
        ...parsed,
        cost,
        provider: 'deepseek'
      };
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }

  private buildPrompt(context: GenerationContext): string {
    const { business, page } = context;
    
    if (page.type === 'home') {
      return `Génère le contenu SEO pour la page d'accueil de ${business.name}, un ${business.type} basé à ${business.city}.
      
Services proposés: ${business.services.join(', ')}
Zones d'intervention: ${business.serviceCities.join(', ')}
Mots-clés cibles: ${page.targetKeywords.join(', ')}

Génère un JSON avec cette structure exacte:
{
  "title": "Title SEO optimisé (60 caractères max)",
  "metaDescription": "Meta description engageante (155 caractères max)",
  "sections": {
    "hero": "Texte d'accroche principal (2-3 phrases)",
    "services": "Description des services principaux (100-150 mots)",
    "expertise": "Présentation de l'expertise et expérience (80-120 mots)",
    "zones": "Texte sur les zones d'intervention (60-80 mots)",
    "pourquoi": "Pourquoi nous choisir (80-100 mots)",
    "urgence": "Texte sur la disponibilité/urgence si applicable"
  },
  "internalLinks": [
    {
      "anchor": "texte du lien",
      "url": "/page-cible",
      "context": "phrase contenant le lien"
    }
  ],
  "schema": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "${business.name}",
    "description": "description",
    "@id": "#business"
  }
}`;
    } else if (page.type === 'service') {
      return `Génère le contenu SEO pour la page service "${page.service}" de ${business.name}.
      
Contexte: ${business.type} à ${business.city}
Mots-clés: ${page.targetKeywords.join(', ')}

Génère un JSON avec la même structure que précédemment, mais adapté pour ce service spécifique.`;
    } else if (page.type === 'local-seo') {
      return `Génère le contenu SEO local pour "${page.service} à ${page.city}" pour ${business.name}.
      
Focus sur le référencement local et la proximité.
Mots-clés: ${page.targetKeywords.join(', ')}

Génère un JSON avec la même structure, optimisé pour le SEO local.`;
    }
    
    return '';
  }

  private parseAIResponse(content: string): Omit<GeneratedContent, 'cost' | 'provider'> {
    try {
      // Extraire le JSON de la réponse
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
    }
    
    // Fallback structure
    return this.getDefaultContent();
  }

  private generateTemplateFallback(context: GenerationContext): GeneratedContent {
    const { business, page } = context;
    const content = this.getDefaultContent();
    
    // Personnaliser avec les données du contexte
    content.title = `${business.name} - ${business.type} à ${business.city}`;
    content.metaDescription = `${business.name}, votre ${business.type} de confiance à ${business.city}. ${business.services.slice(0, 3).join(', ')}. Devis gratuit.`;
    
    content.sections.hero = `Bienvenue chez ${business.name}, votre expert ${business.type} à ${business.city} et ses environs. Nous intervenons rapidement pour tous vos besoins.`;
    
    return {
      ...content,
      cost: 0,
      provider: 'template'
    };
  }

  private getDefaultContent(): Omit<GeneratedContent, 'cost' | 'provider'> {
    return {
      title: '',
      metaDescription: '',
      sections: {
        hero: '',
        services: 'Nous proposons une gamme complète de services adaptés à vos besoins.',
        expertise: 'Fort de plusieurs années d\'expérience, nous garantissons un travail de qualité.',
        zones: 'Nous intervenons rapidement dans votre secteur.',
        pourquoi: 'Choisir notre entreprise, c\'est opter pour le professionnalisme et la qualité.'
      },
      internalLinks: [],
      schema: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness"
      }
    };
  }

  private getCacheKey(context: GenerationContext): string {
    return `${context.page.type}-${context.page.service || ''}-${context.page.city || ''}-${context.quality}`;
  }

  resetCost() {
    this.totalCost = 0;
  }

  getTotalCost(): number {
    return this.totalCost;
  }

  clearCache() {
    this.cache.clear();
  }
}
import { BusinessInfo } from '@awema/shared';

export interface ContentGenerationRequest {
  prompt: string;
  context: {
    businessName: string;
    businessType: string;
    service?: string;
    city?: string;
    targetKeywords?: string[];
    tone?: 'professional' | 'friendly' | 'technical' | 'casual';
    contentType: 'page' | 'section' | 'meta' | 'faq';
    maxLength?: number;
  };
}

export interface GeneratedContentResponse {
  content: string;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    wordCount?: number;
  };
  suggestions?: string[];
  error?: string;
}

export class ClaudeContentService {
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    // L'API key peut venir de l'environnement ou être fournie
    this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || null;
  }

  async generateContent(request: ContentGenerationRequest): Promise<GeneratedContentResponse> {
    if (!this.apiKey) {
      return {
        content: this.generateFallbackContent(request),
        metadata: {
          wordCount: 150
        },
        error: 'API Claude non configurée. Utilisation du générateur de secours.'
      };
    }

    try {
      const systemPrompt = this.buildSystemPrompt(request.context);
      const userPrompt = this.buildUserPrompt(request);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307', // Modèle rapide et économique
          max_tokens: request.context.maxLength || 1000,
          temperature: 0.7,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: userPrompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.content[0].text;

      return this.parseGeneratedContent(generatedContent, request.context.contentType);
    } catch (error) {
      console.error('Erreur lors de la génération avec Claude:', error);
      return {
        content: this.generateFallbackContent(request),
        error: 'Erreur de connexion à Claude. Utilisation du générateur de secours.'
      };
    }
  }

  private buildSystemPrompt(context: ContentGenerationRequest['context']): string {
    return `Tu es un expert en création de contenu SEO pour les sites web d'artisans et entreprises locales.
    
Contexte:
- Entreprise: ${context.businessName}
- Type d'activité: ${context.businessType}
- Localisation: ${context.city || 'France'}
- Ton: ${context.tone || 'professional'}

Instructions:
1. Crée du contenu optimisé pour le SEO local
2. Intègre naturellement les mots-clés fournis
3. Utilise un langage clair et convaincant
4. Respecte le ton demandé
5. Structure le contenu avec des titres si nécessaire
6. Pour les FAQ, génère 5-8 questions pertinentes
7. Pour les meta descriptions, limite à 155 caractères
8. Pour les titres, limite à 60 caractères

IMPORTANT: Réponds uniquement avec le contenu demandé, sans commentaires additionnels.`;
  }

  private buildUserPrompt(request: ContentGenerationRequest): string {
    const { prompt, context } = request;
    
    let specificPrompt = prompt;
    
    switch (context.contentType) {
      case 'page':
        specificPrompt = `Génère le contenu complet pour une page web sur le thème: "${prompt}".
        Inclus: une introduction accrocheuse, 3-4 sections avec sous-titres, et une conclusion avec appel à l'action.
        Mots-clés à intégrer: ${context.targetKeywords?.join(', ') || context.service}`;
        break;
        
      case 'section':
        specificPrompt = `Génère un paragraphe de contenu web sur: "${prompt}".
        Le texte doit être engageant et informatif, environ 150-200 mots.`;
        break;
        
      case 'meta':
        specificPrompt = `Génère un titre SEO et une meta description pour une page sur: "${prompt}".
        Format de réponse:
        TITRE: [titre de 50-60 caractères]
        DESCRIPTION: [description de 150-155 caractères]`;
        break;
        
      case 'faq':
        specificPrompt = `Génère une FAQ complète sur: "${prompt}" pour ${context.businessName}.
        Crée 6-8 questions-réponses pertinentes que les clients pourraient se poser.`;
        break;
    }
    
    return specificPrompt;
  }

  private parseGeneratedContent(
    content: string, 
    contentType: string
  ): GeneratedContentResponse {
    const wordCount = content.split(/\s+/).length;
    
    if (contentType === 'meta') {
      const titleMatch = content.match(/TITRE:\s*(.+)/);
      const descMatch = content.match(/DESCRIPTION:\s*(.+)/);
      
      return {
        content: content,
        metadata: {
          title: titleMatch?.[1]?.trim(),
          description: descMatch?.[1]?.trim(),
          wordCount
        }
      };
    }
    
    return {
      content,
      metadata: {
        wordCount
      }
    };
  }

  private generateFallbackContent(request: ContentGenerationRequest): string {
    const { context, prompt } = request;
    
    // Générateur de secours avec templates
    const templates = {
      page: `# ${prompt}

Bienvenue chez ${context.businessName}, votre expert en ${context.businessType} à ${context.city || 'votre service'}.

## Notre expertise à votre service

Avec des années d'expérience dans le domaine, nous mettons notre savoir-faire à votre disposition pour tous vos projets de ${context.service || context.businessType}.

## Pourquoi nous choisir ?

- **Professionnalisme** : Une équipe qualifiée et certifiée
- **Rapidité** : Intervention dans les meilleurs délais
- **Qualité** : Un travail soigné et garanti
- **Prix justes** : Des tarifs transparents et compétitifs

## Nos services

Nous proposons une gamme complète de services adaptés à vos besoins. Chaque intervention est réalisée avec le plus grand soin et dans le respect des normes en vigueur.

## Contactez-nous

N'hésitez pas à nous contacter pour obtenir un devis gratuit et sans engagement. Notre équipe est à votre écoute pour répondre à toutes vos questions.`,

      section: `${context.businessName} est votre partenaire de confiance pour tous vos besoins en ${context.businessType}. Forts de notre expérience et de notre expertise, nous intervenons rapidement et efficacement pour vous garantir un service de qualité. Que ce soit pour une urgence ou un projet planifié, notre équipe est à votre disposition pour vous accompagner et vous conseiller.`,

      meta: `TITRE: ${context.businessType} ${context.city || ''} - ${context.businessName}
DESCRIPTION: ${context.businessName}, expert en ${context.businessType} à ${context.city || 'votre service'}. Devis gratuit, intervention rapide, travail garanti. Contactez-nous !`,

      faq: `**Quels sont vos horaires d'intervention ?**
Nous intervenons du lundi au vendredi de 8h à 19h, et le samedi de 9h à 17h. Pour les urgences, un service d'astreinte est disponible.

**Proposez-vous des devis gratuits ?**
Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins et vous proposer la meilleure solution.

**Quelle est votre zone d'intervention ?**
Nous intervenons à ${context.city || 'dans votre ville'} et dans un rayon de 30 km alentour.

**Quelles sont vos garanties ?**
Tous nos travaux sont garantis. Nous disposons d'une assurance responsabilité civile professionnelle et d'une garantie décennale.

**Comment puis-je vous contacter ?**
Vous pouvez nous joindre par téléphone, email ou via le formulaire de contact de notre site. Nous vous répondons dans les plus brefs délais.

**Acceptez-vous les paiements échelonnés ?**
Oui, nous proposons des facilités de paiement adaptées à votre budget. N'hésitez pas à nous en parler lors de l'établissement du devis.`
    };
    
    return templates[context.contentType] || templates.section;
  }

  async generateSEOSuggestions(
    pageContent: string,
    currentSEO: any,
    businessInfo: BusinessInfo
  ): Promise<string[]> {
    const suggestions: string[] = [];
    
    // Analyse basique du contenu
    const wordCount = pageContent.split(/\s+/).length;
    const hasH1 = pageContent.includes('<h1') || pageContent.includes('# ');
    
    if (wordCount < 300) {
      suggestions.push('Augmentez la longueur du contenu (minimum 300 mots recommandés)');
    }
    
    if (!hasH1) {
      suggestions.push('Ajoutez un titre H1 unique et descriptif');
    }
    
    if (!currentSEO?.description || currentSEO.description.length < 120) {
      suggestions.push('Rédigez une meta description de 120-160 caractères');
    }
    
    if (!currentSEO?.keywords) {
      suggestions.push('Définissez des mots-clés principaux pour cette page');
    }
    
    return suggestions;
  }
}

export default ClaudeContentService;
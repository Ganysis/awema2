interface DeepSeekConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
}

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class DeepSeekService {
  private apiKey: string;
  private baseURL: string;
  private model: string;

  constructor(config: DeepSeekConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || 'https://api.deepseek.com/v1';
    this.model = config.model || 'deepseek-chat';
  }

  async chat(messages: DeepSeekMessage[], temperature: number = 0.7): Promise<string> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
      }

      const data: DeepSeekResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }

  async analyzeBusinessProfile(formData: any): Promise<any> {
    // Extraire les services détaillés si c'est le nouveau format
    const servicesDetailed = formData.services?.map ? formData.services.map((s: any) => 
      typeof s === 'string' ? s : `${s.name} (${s.priceRange?.min}-${s.priceRange?.max}€/${s.priceRange?.unit})`
    ) : [];
    
    // Extraire les zones de service
    const serviceAreas = formData.serviceAreas?.map ? formData.serviceAreas.map((area: any) =>
      typeof area === 'string' ? area : area.city
    ) : [];

    const prompt = `En tant qu'expert en création de sites web pour artisans, analyse ce profil client ULTRA-DÉTAILLÉ et génère des recommandations précises.

DONNÉES COMPLÈTES DE L'ENTREPRISE:
=== IDENTITÉ ===
- Nom: ${formData.businessName}
- Type: ${formData.businessType}
- Statut juridique: ${formData.legalStatus || 'Non spécifié'}
- SIRET: ${formData.siret ? 'Oui' : 'Non'}
- Année création: ${formData.yearEstablished || 'Non spécifiée'}
- Taille équipe: ${formData.teamSize || 'Non spécifiée'}
- Entreprise familiale: ${formData.familyBusiness ? 'Oui' : 'Non'}

=== HISTOIRE & VALEURS ===
- Histoire: ${formData.founderStory || 'Non renseignée'}
- Différenciation: ${formData.uniqueSellingPoint || 'Non spécifiée'}
- Valeurs: ${formData.companyValues?.join(', ') || 'Non spécifiées'}

=== ÉQUIPE ===
- Membres: ${formData.teamMembers?.length || 0} personnes
- Langues: ${formData.languages?.join(', ') || 'Français'}

=== CERTIFICATIONS & GARANTIES ===
- Certifications: ${formData.certifications?.map((c: any) => c.name).join(', ') || 'Aucune'}
- Assurance décennale: ${formData.insurances?.decennale ? 'Oui' : 'Non'}
- RC Pro: ${formData.insurances?.rcPro ? 'Oui' : 'Non'}
- Labels: ${formData.labels?.join(', ') || 'Aucun'}
- Garanties: ${formData.guarantees?.join(', ') || 'Aucune'}

=== SERVICES DÉTAILLÉS ===
${servicesDetailed.length > 0 ? servicesDetailed.join('\n') : 'Non détaillés'}

=== ZONES & DISPONIBILITÉ ===
- Zones: ${serviceAreas.join(', ') || 'Non spécifiées'}
- 24/7: ${formData.availability?.is24x7 || formData.is24x7Available ? 'Oui' : 'Non'}
- Temps réponse urgence: ${formData.availability?.emergencyResponseTime || 'Non spécifié'}

=== TARIFICATION ===
- Positionnement prix: ${formData.pricePositioning || 'standard'}
- Devis gratuit: ${formData.pricing?.freeQuote ? 'Oui' : 'Non'}
- Modes paiement: ${formData.paymentMethods?.join(', ') || 'Non spécifiés'}

=== PORTFOLIO ===
- Projets réalisés: ${formData.totalProjectsCompleted || 'Non spécifié'}
- Projets phares: ${formData.projects?.length || 0}
- Témoignages: ${formData.testimonials?.length || 0}

=== CLIENTS ===
- Types: ${formData.clientTypes?.join(', ') || 'Particuliers'}
- Profil type: ${formData.typicalClientProfile || 'Non spécifié'}

=== OBJECTIFS ===
- Besoins leads: ${formData.leadGenerationNeeds || 'medium'}
- Objectifs: ${formData.businessGoals?.join(', ') || 'Non spécifiés'}
- Défis: ${formData.currentChallenges?.join(', ') || 'Non spécifiés'}

=== PRÉFÉRENCES WEB ===
- Style: ${formData.stylePreference || 'modern'}
- Couleurs: ${formData.colorPreference || 'neutral'}
- Fonctionnalités must-have: ${formData.mustHaveFeatures?.join(', ') || 'Non spécifiées'}

Génère une analyse JSON ULTRA-PERSONNALISÉE avec:
1. businessProfile: description détaillée incluant l'histoire et les spécificités
2. priorities: 5-7 priorités basées sur TOUTES les données
3. keyPoints: 5-8 points clés uniques à mettre en avant
4. recommendedFeatures: fonctionnalités spécifiques basées sur les besoins exprimés
5. customizationTips: 6-8 conseils ultra-personnalisés
6. templateRecommendations: scores précis basés sur le profil complet
7. contentSuggestions: idées de contenu basées sur l'histoire et les valeurs

Réponds uniquement avec le JSON, sans texte supplémentaire.`;

    const messages: DeepSeekMessage[] = [
      {
        role: 'system',
        content: 'Tu es un expert en création de sites web pour artisans. Tu analyses les besoins et recommandes des solutions adaptées.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    try {
      const response = await this.chat(messages, 0.3); // Température basse pour plus de cohérence
      // Parser le JSON de la réponse
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      // Si pas de JSON trouvé, retourner une analyse par défaut
      return this.getDefaultAnalysis(formData);
    } catch (error) {
      console.error('Erreur analyse:', error);
      // En cas d'erreur, retourner une analyse par défaut
      return this.getDefaultAnalysis(formData);
    }
  }

  async selectBestTemplates(templates: any[], formData: any, analysis: any): Promise<any[]> {
    // Utiliser l'analyse pour scorer les templates
    const scoredTemplates = templates.map(template => {
      let score = template.score || 50;
      
      // Scorer selon les recommandations de l'analyse
      if (analysis.templateRecommendations) {
        const rec = analysis.templateRecommendations;
        
        if (rec.urgency > 70 && template.tags.includes('urgency')) {
          score += rec.urgency * 0.3;
        }
        if (rec.trust > 70 && template.tags.includes('trust')) {
          score += rec.trust * 0.3;
        }
        if (rec.visual > 70 && template.tags.includes('showcase')) {
          score += rec.visual * 0.3;
        }
        if (rec.local > 70 && template.tags.includes('local')) {
          score += rec.local * 0.3;
        }
      }
      
      // Bonus pour correspondance avec les priorités
      if (analysis.priorities) {
        analysis.priorities.forEach((priority: string) => {
          if (priority.toLowerCase().includes('urgence') && template.tags.includes('urgency')) {
            score += 15;
          }
          if (priority.toLowerCase().includes('confiance') && template.tags.includes('trust')) {
            score += 15;
          }
          if (priority.toLowerCase().includes('portfolio') && template.tags.includes('showcase')) {
            score += 15;
          }
        });
      }
      
      return { ...template, aiScore: Math.min(100, score) };
    });
    
    // Trier par score et prendre les 3 meilleurs
    return scoredTemplates
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 3);
  }

  async generatePersonalizationSuggestions(template: any, formData: any, analysis: any): Promise<string[]> {
    const prompt = `Pour un ${formData.businessType} nommé "${formData.businessName}" utilisant le template "${template.name}", génère 5 suggestions de personnalisation très spécifiques.

Contexte:
- Services: ${formData.services?.join(', ')}
- Zones: ${formData.serviceAreas?.join(', ')}
- Priorités identifiées: ${analysis.priorities?.join(', ')}

Génère 5 suggestions courtes et actionnables. Réponds uniquement avec un JSON array de strings.`;

    const messages: DeepSeekMessage[] = [
      {
        role: 'user',
        content: prompt
      }
    ];

    try {
      const response = await this.chat(messages, 0.5);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Erreur suggestions:', error);
    }

    // Suggestions par défaut
    return [
      `Ajouter une section dédiée aux ${formData.services?.[0] || 'services principaux'}`,
      `Mettre en avant votre disponibilité ${formData.is24x7Available ? '24/7' : 'sur rendez-vous'}`,
      `Créer des pages locales pour ${formData.serviceAreas?.slice(0, 3).join(', ')}`,
      `Intégrer des photos de vos réalisations récentes`,
      `Personnaliser les couleurs avec votre charte graphique`
    ];
  }

  async generateCustomizedTemplate(
    template: any,
    formData: any,
    personalizedContent: any
  ): Promise<any> {
    // Personnaliser les blocs du template avec le contenu généré
    const customizedBlocks = template.blocks.map((block: any) => {
      const customBlock = { ...block };
      
      // Personnaliser selon le type de bloc
      switch (block.type) {
        case 'hero-v3-perfect':
          customBlock.props = {
            ...block.props,
            title: personalizedContent.hero.title,
            subtitle: personalizedContent.hero.subtitle,
            primaryButtonText: personalizedContent.hero.ctaText,
            urgencyBadge: personalizedContent.hero.urgencyBadge,
            businessName: formData.businessName,
            phone: formData.phone || '01 23 45 67 89'
          };
          break;
          
        case 'services-v3-perfect':
          customBlock.props = {
            ...block.props,
            title: 'Nos Services',
            services: personalizedContent.services.map((service: any, index: number) => ({
              [`service${index + 1}_title`]: service.title,
              [`service${index + 1}_description`]: service.description,
              [`service${index + 1}_icon`]: service.icon,
              [`service${index + 1}_price`]: service.price,
              [`service${index + 1}_duration`]: service.duration,
              [`service${index + 1}_speciality`]: service.speciality
            })).reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {})
          };
          break;
          
        case 'content-v3-perfect':
          if (block.variant === 'about') {
            customBlock.props = {
              ...block.props,
              title: `À propos de ${formData.businessName}`,
              content: personalizedContent.about.story,
              values: personalizedContent.about.values,
              certifications: personalizedContent.about.certifications,
              experience: personalizedContent.about.experience
            };
          }
          break;
          
        case 'features-v3-perfect':
          customBlock.props = {
            ...block.props,
            title: 'Pourquoi nous choisir',
            features: personalizedContent.features.map((feature: any, index: number) => ({
              [`feature${index + 1}_title`]: feature.title,
              [`feature${index + 1}_description`]: feature.description,
              [`feature${index + 1}_icon`]: feature.icon
            })).reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {})
          };
          break;
          
        case 'testimonials-v3-perfect':
          customBlock.props = {
            ...block.props,
            title: 'Ils nous font confiance',
            testimonials: personalizedContent.testimonials.map((testimonial: any, index: number) => ({
              [`testimonial${index + 1}_text`]: testimonial.text,
              [`testimonial${index + 1}_author`]: testimonial.author,
              [`testimonial${index + 1}_service`]: testimonial.service,
              [`testimonial${index + 1}_rating`]: testimonial.rating
            })).reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {})
          };
          break;
          
        case 'faq-v3-perfect':
          customBlock.props = {
            ...block.props,
            title: 'Questions Fréquentes',
            faqs: personalizedContent.faq.map((faq: any, index: number) => ({
              [`faq${index + 1}_question`]: faq.question,
              [`faq${index + 1}_answer`]: faq.answer
            })).reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {})
          };
          break;
          
        case 'contact-v3-perfect':
          customBlock.props = {
            ...block.props,
            title: 'Contactez-nous',
            businessName: formData.businessName,
            phone: formData.phone || '01 23 45 67 89',
            email: formData.email || 'contact@example.com',
            address: formData.address || personalizedContent.localSEO.areas[0],
            serviceAreas: personalizedContent.localSEO.areas.join(', '),
            showUrgency: formData.is24x7Available
          };
          break;
          
        case 'footer-v3-perfect':
          customBlock.props = {
            ...block.props,
            businessName: formData.businessName,
            phone: formData.phone || '01 23 45 67 89',
            email: formData.email || 'contact@example.com',
            address: formData.address || personalizedContent.localSEO.areas[0],
            certifications: personalizedContent.about.certifications,
            serviceAreas: personalizedContent.localSEO.areas
          };
          break;
      }
      
      return customBlock;
    });
    
    return {
      ...template,
      blocks: customizedBlocks
    };
  }

  getDefaultAnalysis(formData: any): any {
    const is24x7 = formData.is24x7Available;
    const hasGallery = formData.hasGallery;
    const isEstablished = formData.yearEstablished && formData.yearEstablished < 2015;
    
    return {
      businessProfile: `${formData.businessType} ${isEstablished ? 'établi' : 'en développement'} basé à ${formData.serviceAreas?.[0] || 'France'}`,
      priorities: [
        is24x7 ? 'Service urgence 24/7' : 'Service sur rendez-vous',
        hasGallery ? 'Portfolio visuel' : 'Présentation des services',
        isEstablished ? 'Expérience et confiance' : 'Innovation et modernité',
        'Couverture géographique',
        'Conversion des visiteurs'
      ].slice(0, 4),
      keyPoints: [
        is24x7 ? 'Mettre en avant la disponibilité 24/7 avec bouton d\'urgence' : 'Faciliter la prise de rendez-vous',
        hasGallery ? 'Utiliser des galeries avant/après' : 'Décrire les services en détail',
        'Afficher les zones d\'intervention sur une carte',
        'Intégrer des témoignages clients'
      ],
      recommendedFeatures: [
        'Formulaire de contact rapide',
        'Numéro de téléphone cliquable',
        hasGallery ? 'Galerie de réalisations' : 'Description détaillée des services',
        'Section FAQ',
        'Badges de confiance'
      ],
      customizationTips: [
        `Utiliser des photos réelles de l'équipe et des réalisations`,
        'Adapter le ton selon la clientèle cible',
        'Intégrer les avis Google My Business',
        'Personnaliser avec la charte graphique existante'
      ],
      templateRecommendations: {
        urgency: is24x7 ? 85 : 30,
        trust: isEstablished ? 90 : 60,
        visual: hasGallery ? 80 : 40,
        local: formData.serviceAreas?.length > 3 ? 75 : 50
      }
    };
  }
}
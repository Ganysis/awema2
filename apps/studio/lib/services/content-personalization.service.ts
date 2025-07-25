import { DeepSeekService } from './deepseek.service';

interface PersonalizedContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    urgencyBadge?: string;
  };
  about: {
    story: string;
    values: string[];
    certifications: string[];
    experience: string;
  };
  services: Array<{
    title: string;
    description: string;
    icon: string;
    price?: string;
    duration?: string;
    speciality: boolean;
  }>;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    text: string;
    author: string;
    service: string;
    rating: number;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  localSEO: {
    areas: string[];
    nearbyTowns: string[];
    department: string;
  };
}

export class ContentPersonalizationService {
  private deepseek: DeepSeekService;

  constructor() {
    this.deepseek = new DeepSeekService({
      apiKey: process.env.DEEPSEEK_API_KEY || ''
    });
  }

  async generatePersonalizedContent(formData: any, businessProfile: any): Promise<PersonalizedContent> {
    // Extraire les données détaillées du formulaire ultra avec IMAGES
    const servicesDetailed = formData.services?.map ? formData.services.map((s: any) => {
      if (typeof s === 'string') return s;
      return {
        name: s.name,
        description: s.description,
        price: s.priceRange ? `${s.priceRange.min}-${s.priceRange.max}€/${s.priceRange.unit}` : '',
        duration: s.duration || 'variable',
        image: s.image || '',
        includes: s.includes || [],
        guarantee: s.guarantee || ''
      };
    }) : [];
    
    const certifications = formData.certifications?.map ? formData.certifications.map((c: any) => {
      if (typeof c === 'string') return c;
      return {
        name: c.name,
        year: c.year || 'récent',
        image: c.image || '',
        description: c.description || ''
      };
    }) : [];
    
    const teamMembers = formData.teamMembers?.map ? formData.teamMembers.map((m: any) => ({
      name: m.name,
      role: m.role,
      experience: m.experience,
      photo: m.photo || '',
      bio: m.bio || '',
      specialties: m.specialties || []
    })) : [];
    
    const testimonials = formData.testimonials?.map ? formData.testimonials.map((t: any) => ({
      text: t.comment,
      author: t.clientName,
      title: t.clientTitle || '',
      service: t.service,
      rating: t.rating,
      date: t.date || '',
      image: t.image || ''
    })) : [];

    const prompt = `Tu es expert en création de contenu pour sites d'artisans. Génère du contenu ULTRA PERSONNALISÉ et UNIQUE basé sur TOUTES ces données.

DONNÉES ULTRA-COMPLÈTES DE L'ENTREPRISE:
=== IDENTITÉ & HISTOIRE ===
- Nom: ${formData.businessName}
- Type: ${formData.businessType}
- Statut: ${formData.legalStatus}
- Année création: ${formData.yearEstablished}
- Taille équipe: ${formData.teamSize}
- Entreprise familiale: ${formData.familyBusiness ? 'OUI' : 'NON'}
- Histoire fondateur: ${formData.founderStory || 'Non renseignée'}
- Expérience avant: ${formData.previousExperience || 'Non renseignée'}
- Ce qui nous différencie: ${formData.uniqueSellingPoint || 'Non spécifié'}
- Valeurs: ${formData.companyValues?.join(', ') || 'Non spécifiées'}
- Slogan: ${formData.slogan || 'Aucun'}

=== ÉQUIPE DÉTAILLÉE (AVEC PHOTOS) ===
${teamMembers.map((m: any) => `- ${m.name} (${m.role}) - ${m.experience} - Photo: ${m.photo ? 'OUI' : 'NON'}`).join('\n') || 'Non détaillée'}
- Langues parlées: ${formData.languages?.join(', ') || 'Français'}

=== CERTIFICATIONS & GARANTIES (AVEC LOGOS) ===
${certifications.map((c: any) => typeof c === 'string' ? c : `- ${c.name} (${c.year}) - Logo: ${c.image ? 'OUI' : 'NON'}`).join('\n') || 'Aucune'}
- Assurance décennale: ${formData.insurances?.decennale ? `OUI (n°${formData.insurances.decennaleNumber || 'xxx'})` : 'NON'}
- RC Pro: ${formData.insurances?.rcPro ? `OUI (n°${formData.insurances.rcProNumber || 'xxx'})` : 'NON'}
- Labels: ${formData.labels?.join(', ') || 'Aucun'}
- Garanties offertes: ${formData.guarantees?.join(', ') || 'Aucune'}

=== SERVICES ULTRA-DÉTAILLÉS (AVEC IMAGES) ===
${servicesDetailed.map((s: any) => typeof s === 'string' ? s : `- ${s.name}: ${s.description} (${s.price}, ${s.duration}) - Image: ${s.image ? 'OUI' : 'NON'}`).join('\n') || 'Non détaillés'}
- Spécialités: ${formData.services?.filter((s: any) => s.isSpecialty).map((s: any) => s.name).join(', ') || 'Aucune'}

=== DISPONIBILITÉ & ZONES ===
- Adresse principale: ${formData.mainAddress?.street}, ${formData.mainAddress?.city} ${formData.mainAddress?.postalCode}
- Zones d'intervention: ${formData.serviceAreas?.map((a: any) => `${a.city} (${a.maxDistance}km)`).join(', ') || 'Non spécifiées'}
- Disponible 24/7: ${formData.availability?.is24x7 ? 'OUI' : 'NON'}
- Horaires: ${formData.availability?.regularHours ? 'Définis' : 'Standards'}
- Temps réponse urgence: ${formData.availability?.emergencyResponseTime || 'Non spécifié'}

=== TARIFICATION ===
- Taux horaire: ${formData.pricing?.hourlyRate ? formData.pricing.hourlyRate + '€/h' : 'Non communiqué'}
- Charge minimum: ${formData.pricing?.minimumCharge ? formData.pricing.minimumCharge + '€' : 'Aucune'}
- Devis gratuit: ${formData.pricing?.freeQuote ? 'OUI' : 'NON'}
- Déplacement gratuit: ${formData.pricing?.freeTravel ? 'OUI' : 'NON'}
- Majoration urgence: ${formData.pricing?.emergencySurcharge ? '+' + formData.pricing.emergencySurcharge + '%' : 'Aucune'}
- Positionnement: ${formData.pricePositioning || 'standard'}
- Moyens paiement: ${formData.paymentMethods?.join(', ') || 'Non spécifiés'}

=== PORTFOLIO & RÉALISATIONS ===
- Total projets: ${formData.totalProjectsCompleted || 'Non spécifié'}
- Valeur moyenne projet: ${formData.averageProjectValue || 'Non spécifiée'}
- Projets phares: ${formData.projects?.length || 0} documentés
- Types projets spécialisés: ${formData.specialtyProjects?.join(', ') || 'Aucun'}

=== TÉMOIGNAGES RÉELS ===
${testimonials.length > 0 ? testimonials.join('\n') : 'Aucun'}

=== CLIENTS & MARCHÉ ===
- Types clients: ${formData.clientTypes?.join(', ') || 'Particuliers'}
- Profil client type: ${formData.typicalClientProfile || 'Non spécifié'}
- Concurrents principaux: ${formData.mainCompetitors?.join(', ') || 'Non spécifiés'}
- Avantages concurrentiels: ${formData.competitiveAdvantages?.join(', ') || 'Non spécifiés'}

=== PARTENAIRES & MATÉRIAUX ===
- Marques préférées: ${formData.preferredBrands?.join(', ') || 'Aucune'}
- Fournisseurs: ${formData.suppliers?.map((s: any) => s.name).join(', ') || 'Non spécifiés'}
- Matériaux éco: ${formData.materials?.some((m: any) => m.ecoFriendly) ? 'OUI' : 'NON'}

=== OBJECTIFS & DÉFIS ===
- Objectifs business: ${formData.businessGoals?.join(', ') || 'Non spécifiés'}
- Défis actuels: ${formData.currentChallenges?.join(', ') || 'Non spécifiés'}
- Besoins leads: ${formData.leadGenerationNeeds || 'medium'}
- Cible leads/mois: ${formData.monthlyLeadsTarget || 'Non spécifiée'}

=== PRÉFÉRENCES SITE ===
- Style: ${formData.stylePreference}
- Couleurs: ${formData.colorPreference}
- Fonctionnalités must-have: ${formData.mustHaveFeatures?.join(', ') || 'Aucune'}
- Sites inspiration: ${formData.inspirationWebsites?.join(', ') || 'Aucun'}

ANALYSE IA:
${JSON.stringify(businessProfile, null, 2)}

GÉNÈRE UN CONTENU UNIQUE ET SPÉCIFIQUE:

1. Hero Section:
   - Titre accrocheur mentionnant LA spécialité principale
   - Sous-titre avec l'avantage concurrentiel unique
   - Texte du CTA adapté au métier
   - Badge urgence si 24/7

2. À Propos (HISTOIRE UNIQUE):
   - Une histoire de l'entreprise en 2-3 phrases (invente des détails crédibles)
   - 3 valeurs de l'entreprise
   - Certifications/labels
   - Phrase sur l'expérience

3. Services (6-8 services ULTRA DÉTAILLÉS):
   - Services spécifiques au métier (pas de générique!)
   - Descriptions techniques précises
   - Icons adaptés (emoji)
   - Prix indicatifs réalistes
   - Durées moyennes
   - Marquer les spécialités

4. Avantages (4-6 features UNIQUES):
   - Spécifiques à CE artisan
   - Pas de banalités génériques

5. Témoignages (3-4 RÉALISTES):
   - Mentionnent des services précis
   - Situations concrètes
   - Noms et services variés

6. FAQ (5-6 questions MÉTIER):
   - Questions techniques du métier
   - Réponses d'expert détaillées

7. SEO Local:
   - Villes/quartiers précis
   - Communes limitrophes
   - Département

IMPORTANT:
- Sois ULTRA SPÉCIFIQUE au métier
- INVENTE des détails crédibles (années, spécialités, etc.)
- ÉVITE le contenu générique
- Utilise le JARGON du métier
- Sois CRÉATIF et UNIQUE

Retourne UNIQUEMENT un JSON valide au format PersonalizedContent.`;

    try {
      const response = await this.deepseek.chat([
        {
          role: 'system',
          content: 'Tu es un expert en création de contenu marketing pour artisans. Tu génères du contenu unique, spécifique et engageant.'
        },
        {
          role: 'user',
          content: prompt
        }
      ], 0.8); // Température plus élevée pour la créativité

      // Parse et valide la réponse
      const content = JSON.parse(response);
      return this.validateAndEnrichContent(content, formData);
    } catch (error) {
      console.error('Erreur génération contenu:', error);
      return this.generateFallbackContent(formData, businessProfile);
    }
  }

  private validateAndEnrichContent(content: any, formData: any): PersonalizedContent {
    // S'assurer que toutes les sections existent
    return {
      hero: content.hero || this.getDefaultHero(formData),
      about: content.about || this.getDefaultAbout(formData),
      services: content.services || this.getDefaultServices(formData),
      features: content.features || this.getDefaultFeatures(formData),
      testimonials: content.testimonials || this.getDefaultTestimonials(formData),
      faq: content.faq || this.getDefaultFAQ(formData),
      localSEO: content.localSEO || this.getDefaultLocalSEO(formData)
    };
  }

  private generateFallbackContent(formData: any, businessProfile: any): PersonalizedContent {
    const businessType = formData.businessType || 'artisan';
    const is24x7 = formData.is24x7Available;

    // Contenu de fallback spécifique par métier
    const contentByType: Record<string, Partial<PersonalizedContent>> = {
      plombier: {
        hero: {
          title: `${formData.businessName} - Votre Plombier Expert ${is24x7 ? '24/7' : ''}`,
          subtitle: 'Dépannage rapide, installations durables, devis gratuit',
          ctaText: is24x7 ? '📞 Urgence 24/7' : 'Devis Gratuit',
          urgencyBadge: is24x7 ? 'Intervention en 30min' : undefined
        },
        services: [
          {
            title: 'Dépannage Urgent',
            description: 'Fuite d\'eau, canalisation bouchée, chauffe-eau en panne',
            icon: '🚨',
            price: 'Dès 80€',
            duration: '30min - 2h',
            speciality: true
          },
          {
            title: 'Installation Sanitaire',
            description: 'Salle de bain complète, WC, douche à l\'italienne',
            icon: '🚿',
            price: 'Sur devis',
            duration: '2-5 jours',
            speciality: false
          },
          {
            title: 'Chauffage & Chaudière',
            description: 'Installation, entretien, remplacement toutes marques',
            icon: '🔥',
            price: 'Dès 150€',
            duration: '3h - 1 jour',
            speciality: true
          }
        ]
      },
      electricien: {
        hero: {
          title: `${formData.businessName} - Électricien Certifié`,
          subtitle: 'Mise aux normes, dépannage, domotique',
          ctaText: 'Diagnostic Gratuit',
          urgencyBadge: is24x7 ? 'Urgence 7j/7' : undefined
        },
        services: [
          {
            title: 'Mise aux Normes',
            description: 'Mise en conformité électrique, tableau, diagnostic',
            icon: '⚡',
            price: 'Dès 500€',
            duration: '1-3 jours',
            speciality: true
          },
          {
            title: 'Dépannage Électrique',
            description: 'Panne de courant, court-circuit, disjoncteur',
            icon: '🔌',
            price: 'Dès 90€',
            duration: '1-3h',
            speciality: false
          },
          {
            title: 'Installation Domotique',
            description: 'Maison connectée, éclairage intelligent, volets',
            icon: '🏠',
            price: 'Sur devis',
            duration: '2-5 jours',
            speciality: true
          }
        ]
      }
    };

    const baseContent = contentByType[businessType] || {};

    return {
      hero: baseContent.hero || this.getDefaultHero(formData),
      about: this.getDefaultAbout(formData),
      services: baseContent.services || this.getDefaultServices(formData),
      features: this.getDefaultFeatures(formData),
      testimonials: this.getDefaultTestimonials(formData),
      faq: this.getDefaultFAQ(formData),
      localSEO: this.getDefaultLocalSEO(formData)
    };
  }

  private getDefaultHero(formData: any) {
    return {
      title: `${formData.businessName} - Expert ${formData.businessType}`,
      subtitle: 'Service professionnel de qualité dans votre région',
      ctaText: 'Demander un devis'
    };
  }

  private getDefaultAbout(formData: any) {
    const yearEstablished = formData.yearEstablished || 2010;
    const experience = new Date().getFullYear() - yearEstablished;
    
    return {
      story: `Fondée en ${yearEstablished}, ${formData.businessName} est devenue une référence dans le domaine. Notre équipe passionnée met son expertise au service de vos projets depuis ${experience} ans.`,
      values: ['Qualité', 'Fiabilité', 'Proximité'],
      certifications: ['Artisan qualifié', 'Garantie décennale', 'RGE'],
      experience: `${experience} ans d'expérience`
    };
  }

  private getDefaultServices(formData: any) {
    const services = formData.services || ['Service 1', 'Service 2', 'Service 3'];
    return services.slice(0, 6).map((service: string, index: number) => ({
      title: service,
      description: `Description détaillée du service ${service.toLowerCase()}`,
      icon: ['🔧', '🏠', '🛠️', '⚡', '🚿', '🔥'][index] || '📋',
      price: index === 0 ? 'Dès 50€' : 'Sur devis',
      duration: index === 0 ? '1-2h' : 'Variable',
      speciality: index === 0
    }));
  }

  private getDefaultFeatures(formData: any) {
    const features = [];
    
    if (formData.is24x7Available) {
      features.push({
        title: 'Disponible 24/7',
        description: 'Intervention d\'urgence jour et nuit, week-ends et jours fériés',
        icon: '🚨'
      });
    }
    
    features.push(
      {
        title: 'Devis Gratuit',
        description: 'Estimation transparente et détaillée sans engagement',
        icon: '📋'
      },
      {
        title: 'Garantie Qualité',
        description: 'Travaux garantis, assurance décennale',
        icon: '✅'
      },
      {
        title: 'Équipe Locale',
        description: `Artisans de ${formData.serviceAreas?.[0] || 'votre région'}`,
        icon: '📍'
      }
    );
    
    return features;
  }

  private getDefaultTestimonials(formData: any) {
    return [
      {
        text: 'Intervention rapide et efficace. Travail soigné et prix correct. Je recommande !',
        author: 'Marie D.',
        service: formData.services?.[0] || 'Dépannage',
        rating: 5
      },
      {
        text: 'Très professionnel, ponctuel et à l\'écoute. Excellent rapport qualité/prix.',
        author: 'Pierre L.',
        service: formData.services?.[1] || 'Installation',
        rating: 5
      },
      {
        text: 'Équipe compétente et sympathique. Travaux réalisés dans les délais.',
        author: 'Sophie M.',
        service: formData.services?.[2] || 'Rénovation',
        rating: 5
      }
    ];
  }

  private getDefaultFAQ(formData: any) {
    const businessType = formData.businessType || 'artisan';
    const faqs: Record<string, any[]> = {
      plombier: [
        {
          question: 'Intervenez-vous en urgence pour une fuite d\'eau ?',
          answer: 'Oui, nous intervenons rapidement pour toute urgence plomberie. Contactez-nous et nous serons là dans les 30 minutes.'
        },
        {
          question: 'Quelles marques de chaudières entretenez-vous ?',
          answer: 'Nous sommes agréés toutes marques : Saunier Duval, Vaillant, De Dietrich, Viessmann, Atlantic, etc.'
        }
      ],
      electricien: [
        {
          question: 'Ma maison est-elle aux normes électriques ?',
          answer: 'Nous réalisons un diagnostic complet gratuit pour vérifier la conformité de votre installation.'
        },
        {
          question: 'Puis-je installer des panneaux solaires ?',
          answer: 'Oui, nous sommes certifiés RGE et pouvons installer des panneaux photovoltaïques avec aides de l\'État.'
        }
      ]
    };

    return faqs[businessType] || [
      {
        question: `Intervenez-vous dans ma commune ?`,
        answer: `Oui, nous intervenons dans tout le secteur de ${formData.serviceAreas?.join(', ') || 'votre région'}.`
      },
      {
        question: 'Proposez-vous des devis gratuits ?',
        answer: 'Absolument, nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins.'
      }
    ];
  }

  private getDefaultLocalSEO(formData: any) {
    const mainArea = formData.serviceAreas?.[0] || 'Paris';
    const areas = formData.serviceAreas || [mainArea];
    
    return {
      areas: areas,
      nearbyTowns: this.getNearbyTowns(mainArea),
      department: this.getDepartment(mainArea)
    };
  }

  private getNearbyTowns(city: string): string[] {
    const nearbyMap: Record<string, string[]> = {
      'Paris': ['Boulogne-Billancourt', 'Neuilly-sur-Seine', 'Levallois-Perret', 'Issy-les-Moulineaux'],
      'Lyon': ['Villeurbanne', 'Vénissieux', 'Saint-Priest', 'Caluire-et-Cuire'],
      'Marseille': ['Aix-en-Provence', 'Aubagne', 'La Ciotat', 'Martigues'],
      // Ajouter d'autres villes
    };
    
    return nearbyMap[city] || ['Commune limitrophe 1', 'Commune limitrophe 2'];
  }

  private getDepartment(city: string): string {
    const deptMap: Record<string, string> = {
      'Paris': '75 - Paris',
      'Lyon': '69 - Rhône',
      'Marseille': '13 - Bouches-du-Rhône',
      // Ajouter d'autres départements
    };
    
    return deptMap[city] || 'Votre département';
  }
}
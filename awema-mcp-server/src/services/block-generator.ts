import { WebPageData } from './web-analyzer';
import { LayoutSection } from './layout-analyzer';

export interface GeneratedBlock {
  id: string;
  type: string;
  category: string;
  isVisible: boolean;
  data: Record<string, any>;
}

export class BlockGenerator {
  async generate(pageData: WebPageData): Promise<GeneratedBlock[]> {
    const blocks: GeneratedBlock[] = [];
    const timestamp = Date.now();

    // Analyser le type de site
    const siteType = this.detectSiteType(pageData);
    
    // Générer les blocs selon les sections détectées
    if (pageData.sections?.includes('hero')) {
      blocks.push(this.generateHeroBlock(pageData, siteType, timestamp));
    }

    if (pageData.sections?.includes('services')) {
      blocks.push(this.generateServicesBlock(pageData, siteType, timestamp));
    }

    if (pageData.features?.includes('service-area')) {
      blocks.push(this.generateZonesBlock(pageData, siteType, timestamp));
    }

    if (pageData.features?.includes('certifications')) {
      blocks.push(this.generateCertificationsBlock(pageData, siteType, timestamp));
    }

    if (pageData.sections?.includes('gallery')) {
      blocks.push(this.generateGalleryBlock(pageData, siteType, timestamp));
    }

    if (pageData.sections?.includes('testimonials') || pageData.features?.includes('reviews')) {
      blocks.push(this.generateReviewsBlock(pageData, siteType, timestamp));
    }

    // Toujours ajouter un CTA final
    blocks.push(this.generateCTABlock(pageData, siteType, timestamp));

    return blocks;
  }

  private detectSiteType(pageData: WebPageData): 'artisan' | 'corporate' | 'modern' {
    if (pageData.features?.includes('urgency') || 
        pageData.features?.includes('service-area') ||
        pageData.url.includes('plomb') ||
        pageData.url.includes('electr') ||
        pageData.url.includes('chauff')) {
      return 'artisan';
    }
    
    return 'modern';
  }

  private generateHeroBlock(pageData: WebPageData, siteType: string, timestamp: number): GeneratedBlock {
    const hasUrgency = pageData.features?.includes('urgency');
    
    return {
      id: `hero-${timestamp}`,
      type: 'hero-artisan',
      category: 'hero',
      isVisible: true,
      data: {
        variant: hasUrgency ? 'construction-urgency' : 'industrial-modern',
        title: pageData.title || 'Artisan Professionnel',
        subtitle: pageData.description || 'Service de qualité • Intervention rapide',
        showUrgency: hasUrgency,
        urgencyText: 'Urgence 24/7',
        phone: this.extractPhone(pageData.html || ''),
        ctaPrimary: hasUrgency ? 'Appeler maintenant' : 'Devis gratuit',
        ctaSecondary: 'En savoir plus',
        showStats: true,
        stat1_value: '15+',
        stat1_label: 'Ans d\'expérience',
        stat2_value: '2500+',
        stat2_label: 'Clients satisfaits',
        stat3_value: '24/7',
        stat3_label: 'Disponibilité',
        backgroundImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920',
        overlayOpacity: 0.85,
        primaryColor: pageData.colors?.primary || '#ff6900'
      }
    };
  }

  private generateServicesBlock(pageData: WebPageData, siteType: string, timestamp: number): GeneratedBlock {
    const industry = this.detectIndustry(pageData.url, pageData.title || '');
    
    return {
      id: `services-${timestamp}`,
      type: 'services-artisan',
      category: 'content',
      isVisible: true,
      data: {
        variant: 'cards-with-price',
        title: 'Nos Services',
        subtitle: 'Des prestations adaptées à vos besoins',
        showPrices: true,
        highlightUrgent: true,
        ...this.getServicesByIndustry(industry),
        primaryColor: pageData.colors?.primary || '#ff6900'
      }
    };
  }

  private generateZonesBlock(pageData: WebPageData, siteType: string, timestamp: number): GeneratedBlock {
    const city = this.extractCity(pageData.html || '', pageData.title || '');
    
    return {
      id: `zones-${timestamp}`,
      type: 'zones-intervention',
      category: 'content',
      isVisible: true,
      data: {
        variant: 'map-with-list',
        title: 'Zones d\'Intervention',
        subtitle: `Nous intervenons dans un rayon de 30km autour de ${city}`,
        mainCity: city,
        department: this.getDepartmentFromCity(city),
        radius: '30km',
        showMap: true,
        showDistances: true,
        showUrgencyBadge: true,
        ...this.getNearbyCity(city),
        showCTA: true,
        ctaText: 'Vérifier ma zone',
        primaryColor: pageData.colors?.primary || '#ff6900'
      }
    };
  }

  private generateCertificationsBlock(pageData: WebPageData, siteType: string, timestamp: number): GeneratedBlock {
    const industry = this.detectIndustry(pageData.url, pageData.title || '');
    
    return {
      id: `certifications-${timestamp}`,
      type: 'certifications-artisan',
      category: 'content',
      isVisible: true,
      data: {
        variant: industry === 'electrician' ? 'electric-focus' : 'badges-trust',
        title: 'Nos Certifications & Garanties',
        subtitle: 'La qualité et la confiance au cœur de notre métier',
        showBadges: true,
        ...this.getCertificationsByIndustry(industry),
        showCommitments: true,
        commitment1: 'Devis gratuit et détaillé sous 24h',
        commitment2: 'Prix transparents sans surprise',
        commitment3: 'Intervention propre et soignée',
        commitment4: 'Garantie satisfaction client',
        primaryColor: pageData.colors?.primary || '#ff6900'
      }
    };
  }

  private generateGalleryBlock(pageData: WebPageData, siteType: string, timestamp: number): GeneratedBlock {
    return {
      id: `gallery-${timestamp}`,
      type: 'gallery-v3-supreme',
      category: 'gallery',
      isVisible: true,
      data: {
        variant: 'masonry-flow',
        title: 'Nos Réalisations',
        subtitle: 'Découvrez nos derniers projets',
        columns_desktop: 3,
        columns_tablet: 2,
        columns_mobile: 1,
        gap: 20,
        showOverlay: true,
        overlayStyle: 'gradient',
        enableLightbox: true,
        lightboxStyle: 'modern',
        enableFilters: false,
        image1_src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
        image1_title: 'Rénovation complète',
        image1_description: 'Appartement Paris 15ème',
        image2_src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        image2_title: 'Installation neuve',
        image2_description: 'Maison individuelle',
        primaryColor: pageData.colors?.primary || '#ff6900'
      }
    };
  }

  private generateReviewsBlock(pageData: WebPageData, siteType: string, timestamp: number): GeneratedBlock {
    return {
      id: `reviews-${timestamp}`,
      type: 'reviews-artisan',
      category: 'testimonials',
      isVisible: true,
      data: {
        variant: 'google-integrated',
        title: 'Avis de Nos Clients',
        subtitle: 'La satisfaction client est notre priorité',
        googleRating: 4.8,
        googleCount: 250,
        showGoogleBadge: true,
        review1_author: 'Marie L.',
        review1_rating: 5,
        review1_text: 'Excellent service, intervention rapide et professionnelle. Je recommande vivement !',
        review1_date: 'Il y a 1 semaine',
        review1_service: 'Dépannage urgent',
        review1_verified: true,
        review2_author: 'Jean-Pierre M.',
        review2_rating: 5,
        review2_text: 'Travail de qualité, équipe sympathique et prix corrects. Très satisfait.',
        review2_date: 'Il y a 2 semaines',
        review2_service: 'Installation',
        showCTA: true,
        primaryColor: pageData.colors?.primary || '#ff6900'
      }
    };
  }

  private generateCTABlock(pageData: WebPageData, siteType: string, timestamp: number): GeneratedBlock {
    const hasUrgency = pageData.features?.includes('urgency');
    const phone = this.extractPhone(pageData.html || '');
    
    return {
      id: `cta-${timestamp}`,
      type: 'cta-v3-perfect',
      category: 'cta',
      isVisible: true,
      data: {
        variant: hasUrgency ? 'gradient-modern' : 'simple-centered',
        title: hasUrgency ? 'Besoin d\'une Intervention ?' : 'Prêt à Démarrer ?',
        subtitle: 'Contactez-nous dès maintenant pour un devis gratuit',
        ctaText: phone ? `📞 ${phone}` : 'Nous contacter',
        ctaUrl: phone ? `tel:${phone.replace(/\s/g, '')}` : '#contact',
        showBadges: true,
        badge1: '✓ Devis gratuit',
        badge2: '✓ Intervention rapide',
        badge3: '✓ Garantie qualité',
        backgroundType: 'gradient',
        gradientStart: pageData.colors?.primary || '#ff6900',
        gradientEnd: pageData.colors?.accent || '#ff8c00'
      }
    };
  }

  // Méthodes utilitaires
  private extractPhone(html: string): string {
    const phoneRegex = /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/;
    const match = html.match(phoneRegex);
    return match ? match[0].trim() : '06 12 34 56 78';
  }

  private extractCity(html: string, title: string): string {
    const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'];
    const text = (title + ' ' + html).toLowerCase();
    
    for (const city of cities) {
      if (text.includes(city.toLowerCase())) {
        return city;
      }
    }
    
    return 'Paris';
  }

  private detectIndustry(url: string, title: string): string {
    const text = (url + ' ' + title).toLowerCase();
    
    if (text.includes('plomb')) return 'plumber';
    if (text.includes('electr')) return 'electrician';
    if (text.includes('chauff')) return 'heating';
    if (text.includes('serru')) return 'locksmith';
    if (text.includes('menuis')) return 'carpenter';
    if (text.includes('peint')) return 'painter';
    
    return 'general';
  }

  private getDepartmentFromCity(city: string): string {
    const cityDepartments: Record<string, string> = {
      'Paris': '75',
      'Lyon': '69',
      'Marseille': '13',
      'Toulouse': '31',
      'Nice': '06',
      'Nantes': '44',
      'Strasbourg': '67',
      'Montpellier': '34',
      'Bordeaux': '33',
      'Lille': '59'
    };
    
    return cityDepartments[city] || '75';
  }

  private getNearbyCity(mainCity: string): Record<string, string> {
    const nearbyCities: Record<string, string[]> = {
      'Paris': ['Boulogne-Billancourt', 'Saint-Denis', 'Versailles', 'Créteil', 'Nanterre', 'Argenteuil', 'Montreuil', 'Neuilly-sur-Seine'],
      'Lyon': ['Villeurbanne', 'Caluire-et-Cuire', 'Écully', 'Tassin-la-Demi-Lune', 'Vaulx-en-Velin', 'Bron', 'Vénissieux', 'Saint-Priest']
    };
    
    const cities = nearbyCities[mainCity] || nearbyCities['Paris'];
    const result: Record<string, string> = {};
    
    cities.forEach((city, index) => {
      const num = index + 1;
      result[`city${num}`] = city;
      result[`city${num}_distance`] = `${5 + index * 2}km`;
    });
    
    return result;
  }

  private getServicesByIndustry(industry: string): Record<string, any> {
    const services: Record<string, any> = {
      plumber: {
        service1_title: 'Dépannage Urgent',
        service1_description: 'Fuite d\'eau, canalisation bouchée, chauffe-eau en panne',
        service1_icon: '🚨',
        service1_price: 'Dès 89€',
        service1_urgent: true,
        service2_title: 'Installation Sanitaire',
        service2_description: 'Salle de bain, cuisine, WC - Installation complète',
        service2_icon: '🚿',
        service2_price: 'Sur devis',
        service3_title: 'Entretien Chaudière',
        service3_description: 'Contrat d\'entretien annuel toutes marques',
        service3_icon: '🔥',
        service3_price: '120€/an'
      },
      electrician: {
        service1_title: 'Panne Électrique',
        service1_description: 'Court-circuit, disjoncteur, panne totale',
        service1_icon: '⚡',
        service1_price: 'Dès 95€',
        service1_urgent: true,
        service2_title: 'Tableau Électrique',
        service2_description: 'Mise aux normes NF C 15-100',
        service2_icon: '🔌',
        service2_price: 'Dès 890€',
        service3_title: 'Installation Complète',
        service3_description: 'Neuf ou rénovation totale',
        service3_icon: '🏠',
        service3_price: 'Sur devis'
      }
    };
    
    return services[industry] || services.plumber;
  }

  private getCertificationsByIndustry(industry: string): Record<string, any> {
    const certifications: Record<string, any> = {
      plumber: {
        badge1_name: 'RGE Qualibat',
        badge1_description: 'Reconnu Garant de l\'Environnement',
        badge1_icon: '🏅',
        badge2_name: 'Garantie Décennale',
        badge2_description: 'Tous travaux couverts 10 ans',
        badge2_icon: '🛡️',
        badge3_name: 'Pro du Gaz',
        badge3_description: 'Certification gaz naturel',
        badge3_icon: '🔥'
      },
      electrician: {
        badge1_name: 'Qualifelec',
        badge1_description: 'Certification professionnelle',
        badge1_icon: '⚡',
        badge2_name: 'CONSUEL',
        badge2_description: 'Habilité attestations',
        badge2_icon: '✅',
        badge3_name: 'RGE',
        badge3_description: 'Éco-rénovation',
        badge3_icon: '🌿'
      }
    };
    
    return certifications[industry] || certifications.plumber;
  }
}
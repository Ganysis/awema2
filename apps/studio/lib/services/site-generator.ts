import type { Client, Schedule } from '@/types/client';
import type { EditorBlock } from '../store/editor-store';

export class SiteGenerator {
  /**
   * Génère un site complet basé sur les données client
   */
  generateSiteFromClient(client: Partial<Client>): {
    blocks: EditorBlock[];
    pages: Map<string, EditorBlock[]>;
    theme: any;
  } {
    // Assurer que les propriétés essentielles existent
    const safeClient = {
      ...client,
      services: client.services || [],
      interventionCities: client.interventionCities || [],
      selectedPages: client.selectedPages || [],
      photos: client.photos || [],
      testimonials: client.testimonials || [],
      certifications: client.certifications || [],
      businessType: client.businessType || 'electricien',
      businessName: client.businessName || 'Mon Entreprise',
      phone: client.phone || '01 23 45 67 89',
      email: client.email || 'contact@entreprise.fr',
      city: client.city || 'Paris',
      address: client.address || '123 rue Exemple',
      postalCode: client.postalCode || '75001'
    };
    
    const theme = this.generateTheme(safeClient);
    const mainBlocks = this.generateMainPageBlocks(safeClient);
    const pages = this.generateAllPages(safeClient);
    
    return {
      blocks: mainBlocks,
      pages,
      theme
    };
  }
  
  /**
   * Génère le thème basé sur les préférences du client
   */
  private generateTheme(client: Partial<Client>) {
    return {
      variant: this.getVariantFromStyle(client.visualStyle || 'modern'),
      colors: {
        primary: client.primaryColor,
        secondary: client.secondaryColor,
        accent: client.accentColor,
        background: '#FFFFFF',
        surface: '#F9FAFB',
        text: '#111827',
        textSecondary: '#6B7280',
        textMuted: '#9CA3AF',
        border: '#E5E7EB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
      },
      typography: {
        fontFamily: {
          heading: client.typography,
          body: client.typography,
          mono: 'JetBrains Mono'
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem',
          '5xl': '3rem',
          '6xl': '3.75rem'
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800
        },
        lineHeight: {
          none: 1,
          tight: 1.25,
          snug: 1.375,
          normal: 1.5,
          relaxed: 1.625,
          loose: 2
        },
        letterSpacing: {
          tighter: '-0.05em',
          tight: '-0.025em',
          normal: '0',
          wide: '0.025em',
          wider: '0.05em',
          widest: '0.1em'
        }
      },
      spacing: {
        spacing: {
          '0': '0px',
          'px': '1px',
          '0.5': '0.125rem',
          '1': '0.25rem',
          '1.5': '0.375rem',
          '2': '0.5rem',
          '2.5': '0.625rem',
          '3': '0.75rem',
          '3.5': '0.875rem',
          '4': '1rem',
          '5': '1.25rem',
          '6': '1.5rem',
          '7': '1.75rem',
          '8': '2rem',
          '9': '2.25rem',
          '10': '2.5rem',
          '11': '2.75rem',
          '12': '3rem',
          '14': '3.5rem',
          '16': '4rem',
          '20': '5rem',
          '24': '6rem',
          '28': '7rem',
          '32': '8rem',
          '36': '9rem',
          '40': '10rem',
          '44': '11rem',
          '48': '12rem',
          '52': '13rem',
          '56': '14rem',
          '60': '15rem',
          '64': '16rem',
          '72': '18rem',
          '80': '20rem',
          '96': '24rem'
        },
        containerSizes: {
          xs: '20rem',
          sm: '24rem',
          md: '28rem',
          lg: '32rem',
          xl: '36rem',
          '2xl': '42rem',
          full: '100%'
        },
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px'
        },
        borderRadius: {
          none: '0',
          sm: '0.125rem',
          base: '0.25rem',
          md: '0.375rem',
          lg: '0.5rem',
          xl: '0.75rem',
          '2xl': '1rem',
          '3xl': '1.5rem',
          full: '9999px'
        },
        gridColumns: {
          '1': 'repeat(1, minmax(0, 1fr))',
          '2': 'repeat(2, minmax(0, 1fr))',
          '3': 'repeat(3, minmax(0, 1fr))',
          '4': 'repeat(4, minmax(0, 1fr))',
          '5': 'repeat(5, minmax(0, 1fr))',
          '6': 'repeat(6, minmax(0, 1fr))',
          '8': 'repeat(8, minmax(0, 1fr))',
          '12': 'repeat(12, minmax(0, 1fr))'
        }
      },
      customCSS: ''
    };
  }
  
  /**
   * Génère les blocs de la page d'accueil
   */
  private generateMainPageBlocks(client: Partial<Client>): EditorBlock[] {
    const blocks: EditorBlock[] = [];
    let blockOrder = 0;
    
    // Hero Section
    blocks.push({
      id: this.generateId(),
      type: 'hero-split-screen',
      props: {
        title: client.businessName,
        subtitle: client.slogan || `${this.getBusinessTypeLabel(client.businessType || 'plumber')} professionnel depuis ${client.yearsExperience} ans`,
        ctaText: client.emergency247 ? 'Urgence 24/7' : 'Devis Gratuit',
        ctaLink: `tel:${client.phone}`,
        secondaryCtaText: 'Nos Services',
        secondaryCtaLink: '#services',
        image: (client.photos && client.photos[0]) || this.getDefaultImage(client.businessType || 'plumber'),
        imageAlt: `${client.businessName} - ${this.getBusinessTypeLabel(client.businessType || 'plumber')}`
      },
      children: []
    });
    
    // Services Section
    if (client.services && client.services.length > 0) {
      blocks.push({
        id: this.generateId(),
        type: 'services-grid-cards',
        props: {
          title: 'Nos Services',
          subtitle: client.sloganSecondary || 'Des solutions adaptées à tous vos besoins',
          services: client.services.slice(0, 6).map(service => ({
            icon: this.getServiceIcon(service.name, client.businessType),
            title: service.name,
            description: service.description,
            link: `/services/${this.slugify(service.name)}`
          })),
          columns: Math.min(3, client.services.length),
          showIcons: true,
          showLinks: true
        },
        children: []
      });
    }
    
    // Features/Why Choose Us - using clean style
    blocks.push({
      id: this.generateId(),
      type: 'features-clean',
      props: {
        title: 'Pourquoi Nous Choisir',
        subtitle: 'Les avantages de faire appel à nos services',
        features: this.generateFeatures(client),
        columns: 3
      },
      children: []
    });
    
    // Testimonials
    if (client.testimonials && client.testimonials.length > 0) {
      blocks.push({
        id: this.generateId(),
        type: 'testimonials-carousel',
        props: {
          title: 'Avis Clients',
          subtitle: 'Ce que nos clients disent de nous',
          testimonials: client.testimonials.map(t => ({
            name: t.name,
            role: t.role,
            content: t.content,
            rating: t.rating,
            image: t.photo
          })),
          showRating: true,
          showImages: true,
          autoplay: true,
          autoplaySpeed: 5000
        },
        children: []
      });
    }
    
    // Gallery (if selected) - using clean style
    if (client.selectedPages.includes('gallery') && client.photos && client.photos.length > 3) {
      blocks.push({
        id: this.generateId(),
        type: 'gallery-clean',
        props: {
          title: 'Nos Réalisations',
          subtitle: 'Découvrez nos projets récents',
          images: client.photos.slice(0, 8).map((photo, index) => ({
            url: photo,
            alt: `Réalisation ${index + 1} - ${client.businessName}`,
            title: `Projet ${index + 1}`
          })),
          columns: 3
        },
        children: []
      });
    }
    
    // Contact Section
    blocks.push({
      id: this.generateId(),
      type: 'contact-form-map',
      props: {
        title: 'Contactez-nous',
        subtitle: 'Devis gratuit sous 24h',
        showMap: true,
        destinationEmail: client.email,
        formFields: [
          { name: 'name', label: 'Votre Nom', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
          { name: 'service', label: 'Service souhaité', type: 'select', options: client.services.map(s => s.name), required: true },
          { name: 'message', label: 'Votre message', type: 'textarea', required: true }
        ],
        contactInfo: {
          phone: client.phone,
          email: client.email,
          address: `${client.address}, ${client.postalCode} ${client.city}`,
          hours: this.formatSchedule(client.schedule)
        },
        mapCoordinates: this.getCoordinatesFromAddress(client),
        submitText: 'Envoyer ma demande'
      },
      children: []
    });
    
    return blocks;
  }
  
  /**
   * Génère toutes les pages du site
   */
  private generateAllPages(client: Partial<Client>): Map<string, EditorBlock[]> {
    const pages = new Map<string, EditorBlock[]>();
    
    // Page Services (une page par service)
    if (client.services && client.services.length > 0) {
      client.services.forEach(service => {
        // Vérifier que le service est valide
        if (!service || typeof service === 'string') {
          // Si c'est juste une string, créer un objet service
          const serviceName = typeof service === 'string' ? service : 'Service';
          service = {
            id: this.generateId(),
            name: serviceName,
            description: `${serviceName} de qualité professionnelle`,
            images: [],
            features: [],
            price: { amount: 0, currency: '€' }
          };
        }
        
        if (!service.name) {
          console.warn('Service sans nom détecté, ignoré');
          return;
        }
        
        const serviceBlocks: EditorBlock[] = [
          {
            id: this.generateId(),
            type: 'hero-centered',
            props: {
              title: service.name,
              subtitle: service.description || '',
              ctaText: 'Demander un devis',
              ctaLink: '#contact',
              image: service.images?.[0] || this.getDefaultServiceImage(service.name, client.businessType),
              imageAlt: service.name
            },
            children: []
          }
        ];
        
        pages.set(`services/${this.slugify(service.name)}`, serviceBlocks);
      });
    }
    
    // Pages SEO Locales (ville + service)
    if (client.interventionCities && client.services && client.interventionCities.length > 0 && client.services.length > 0) {
      client.interventionCities.forEach(city => {
        client.services!.forEach(service => {
          // Même vérification que pour les services
          if (!service || typeof service === 'string') {
            const serviceName = typeof service === 'string' ? service : 'Service';
            service = {
              id: this.generateId(),
              name: serviceName,
              description: `${serviceName} de qualité professionnelle`
            };
          }
          
          if (!service.name || !city) {
            return;
          }
          
          const seoBlocks = this.generateSEOLocalPage(client, city, service);
          pages.set(`${this.slugify(city)}/${this.slugify(service.name)}`, seoBlocks);
        });
      });
    }
    
    // Page À Propos (si sélectionnée)
    if (client.selectedPages && client.selectedPages.includes('about')) {
      pages.set('about', this.generateAboutPage(client));
    }
    
    // Page Galerie (si sélectionnée)  
    if (client.selectedPages && client.selectedPages.includes('gallery')) {
      pages.set('gallery', this.generateGalleryPage(client));
    }
    
    // Page FAQ (si sélectionnée)
    if (client.selectedPages && client.selectedPages.includes('faq')) {
      pages.set('faq', this.generateFAQPage(client));
    }
    
    // Mentions Légales
    pages.set('legal', this.generateLegalPage(client));
    
    return pages;
  }
  
  /**
   * Génère une page SEO locale
   */
  private generateSEOLocalPage(client: Partial<Client>, city: string, service: any): EditorBlock[] {
    return [
      {
        id: this.generateId(),
        type: 'hero-split-screen',
        props: {
          title: `${service.name} à ${city}`,
          subtitle: `${client.businessName} - Votre ${this.getBusinessTypeLabel(client.businessType || 'plumber')} à ${city}`,
          ctaText: 'Devis Gratuit',
          ctaLink: `tel:${client.phone}`,
          secondaryCtaText: 'En savoir plus',
          secondaryCtaLink: '#details',
          image: service.images?.[0] || this.getDefaultServiceImage(service.name, client.businessType),
          imageAlt: `${service.name} ${city}`
        },
        children: []
      },
      // Contenu unique pour éviter la cannibalisation - using clean style
      {
        id: this.generateId(),
        type: 'features-clean',
        props: {
          title: `${service.name} - Intervention rapide à ${city}`,
          subtitle: `Notre équipe intervient rapidement pour vos besoins en ${service.name.toLowerCase()} sur ${city} et ses environs`,
          features: [
            {
              icon: 'location',
              title: `Basé près de ${city}`,
              description: `Intervention rapide dans tout le secteur de ${city}`
            },
            {
              icon: 'clock',
              title: 'Disponibilité',
              description: client.emergency247 ? 'Service d\'urgence 24h/24 et 7j/7' : 'Du lundi au samedi'
            },
            {
              icon: 'star',
              title: `Expert ${service.name}`,
              description: `${client.yearsExperience} ans d'expérience à ${city}`
            },
            {
              icon: 'shield',
              title: 'Garantie',
              description: service.guarantee || 'Travail garanti'
            }
          ],
          columns: 2
        },
        children: []
      }
    ];
  }
  
  /**
   * Génère la page À Propos
   */
  private generateAboutPage(client: Partial<Client>): EditorBlock[] {
    return [
      {
        id: this.generateId(),
        type: 'hero-centered',
        props: {
          title: `À propos de ${client.businessName}`,
          subtitle: `${this.getBusinessTypeLabel(client.businessType || 'plumber')} depuis ${new Date().getFullYear() - parseInt(client.yearsExperience || '10')}`,
          image: client.logo || client.photos[0],
          imageAlt: client.businessName
        },
        children: []
      }
    ];
  }
  
  /**
   * Génère la page Galerie
   */
  private generateGalleryPage(client: Partial<Client>): EditorBlock[] {
    return [
      {
        id: this.generateId(),
        type: 'gallery-clean',
        props: {
          title: 'Nos Réalisations',
          subtitle: 'Découvrez l\'ensemble de nos projets',
          images: client.photos.map((photo, index) => ({
            url: photo,
            alt: `Réalisation ${index + 1} - ${client.businessName}`,
            title: `Projet ${index + 1}`
          })),
          columns: 3
        },
        children: []
      }
    ];
  }
  
  /**
   * Génère la page FAQ
   */
  private generateFAQPage(client: Partial<Client>): EditorBlock[] {
    // TODO: Implémenter le bloc FAQ
    return [];
  }
  
  /**
   * Génère la page Mentions Légales
   */
  private generateLegalPage(client: Partial<Client>): EditorBlock[] {
    // TODO: Générer automatiquement les mentions légales
    return [];
  }
  
  /**
   * Helpers
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  private getVariantFromStyle(style: string): 'ultra-pro' | 'premium' | 'minimal' {
    switch (style) {
      case 'modern':
        return 'ultra-pro';
      case 'classic':
        return 'premium';
      case 'minimal':
      case 'natural':
        return 'minimal';
      default:
        return 'ultra-pro';
    }
  }
  
  private getBusinessTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      electricien: 'Électricien',
      plombier: 'Plombier',
      menuisier: 'Menuisier',
      macon: 'Maçon',
      peintre: 'Peintre',
      carreleur: 'Carreleur',
      couvreur: 'Couvreur',
      jardinier: 'Jardinier',
      serrurier: 'Serrurier'
    };
    return labels[type] || type;
  }
  
  private getDefaultImage(businessType: string): string {
    const images: { [key: string]: string } = {
      electricien: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
      plombier: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800',
      menuisier: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
      macon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      peintre: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800'
    };
    return images[businessType] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800';
  }
  
  private getDefaultServiceImage(serviceName: string, businessType: string): string {
    // TODO: Implémenter une logique pour retourner des images par défaut basées sur le service
    return this.getDefaultImage(businessType);
  }
  
  private getServiceIcon(serviceName: string, businessType: string): string {
    // Logique pour déterminer l'icône basée sur le nom du service
    const serviceKeywords: { [key: string]: string } = {
      installation: 'wrench',
      dépannage: 'tools',
      urgence: 'bolt',
      réparation: 'hammer',
      maintenance: 'gear',
      rénovation: 'home',
      diagnostic: 'shield-check',
      mise: 'shield',
      norme: 'check'
    };
    
    const lowerServiceName = serviceName.toLowerCase();
    for (const [keyword, icon] of Object.entries(serviceKeywords)) {
      if (lowerServiceName.includes(keyword)) {
        return icon;
      }
    }
    
    // Icône par défaut selon le métier
    const defaultIcons: { [key: string]: string } = {
      electricien: 'bolt',
      plombier: 'wrench',
      menuisier: 'hammer',
      macon: 'home',
      peintre: 'brush'
    };
    
    return defaultIcons[businessType] || 'tools';
  }
  
  private generateFeatures(client: Partial<Client>): any[] {
    const features = [];
    
    if (client.yearsExperience) {
      features.push({
        icon: 'star',
        title: `${client.yearsExperience} ans d'expérience`,
        description: 'Expertise reconnue dans le domaine'
      });
    }
    
    if (client.emergency247) {
      features.push({
        icon: 'clock',
        title: 'Urgences 24/7',
        description: 'Disponible jour et nuit pour vos urgences'
      });
    }
    
    if (client.insurance) {
      features.push({
        icon: 'shield',
        title: 'Assuré',
        description: 'Entreprise assurée pour votre tranquillité'
      });
    }
    
    features.push({
      icon: 'check',
      title: 'Devis Gratuit',
      description: 'Sans engagement sous 24h'
    });
    
    if (client.certifications && client.certifications.length > 0) {
      features.push({
        icon: 'shield-check',
        title: 'Certifié',
        description: client.certifications.join(', ')
      });
    }
    
    if (client.interventionCities.length > 5) {
      features.push({
        icon: 'location',
        title: `${client.interventionCities.length} villes`,
        description: 'Large zone d\'intervention'
      });
    }
    
    return features.slice(0, 6); // Maximum 6 features
  }
  
  private formatSchedule(schedule: Schedule | undefined): string {
    if (!schedule) {
      return 'Lun-Ven: 9h-18h, Sam: 9h-12h'; // Horaires par défaut
    }
    
    const days = {
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mer',
      thursday: 'Jeu',
      friday: 'Ven',
      saturday: 'Sam',
      sunday: 'Dim'
    };
    
    const formatted: string[] = [];
    
    try {
      for (const [day, hours] of Object.entries(schedule) as [string, any][]) {
        if (hours && !hours.closed && days[day]) {
          formatted.push(`${days[day]}: ${hours.open}-${hours.close}`);
        }
      }
    } catch (error) {
      console.warn('Erreur lors du formatage des horaires:', error);
      return 'Lun-Ven: 9h-18h, Sam: 9h-12h';
    }
    
    return formatted.length > 0 ? formatted.join(', ') : 'Lun-Ven: 9h-18h, Sam: 9h-12h';
  }
  
  private getCoordinatesFromAddress(client: Partial<Client>): { lat: number; lng: number } {
    // TODO: Implémenter la géolocalisation réelle
    // Pour l'instant, retourner des coordonnées par défaut basées sur la ville
    const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
      paris: { lat: 48.8566, lng: 2.3522 },
      lyon: { lat: 45.764043, lng: 4.835659 },
      marseille: { lat: 43.296482, lng: 5.36978 },
      toulouse: { lat: 43.604652, lng: 1.444209 },
      nice: { lat: 43.710173, lng: 7.261953 }
    };
    
    const cityLower = (client.city || 'paris').toLowerCase();
    return cityCoordinates[cityLower] || { lat: 48.8566, lng: 2.3522 };
  }
}

export const siteGenerator = new SiteGenerator();
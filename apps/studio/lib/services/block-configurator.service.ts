import { ClientFormData } from '@/types/client-form';
import { GeneratedPage } from './ai-site-generator.service';
import { ContentGeneratorService } from './content-generator.service';
import { isUrgencyBusiness, needsPortfolio } from './business-templates';

export class BlockConfiguratorService {
  private contentGenerator: ContentGeneratorService;

  constructor() {
    this.contentGenerator = new ContentGeneratorService();
  }

  async configureBlock(
    blockType: string,
    page: GeneratedPage,
    formData: ClientFormData,
    businessType: string
  ): Promise<any> {
    const context = this.buildContext(formData, businessType);
    
    switch (blockType) {
      case 'HeaderV3':
        return this.configureHeader(formData, context);
      case 'HeroV3':
        return this.configureHero(page, formData, businessType, context);
      case 'ServicesV3':
        return this.configureServices(page, formData, businessType, context);
      case 'FeaturesV3':
        return this.configureFeatures(page, formData, businessType, context);
      case 'TestimonialsV3':
        return this.configureTestimonials(formData, context);
      case 'GalleryV3':
        return this.configureGallery(formData, businessType, context);
      case 'PricingV3':
        return this.configurePricing(page, formData, businessType, context);
      case 'FAQV3':
        return this.configureFAQ(page, formData, businessType, context);
      case 'CTAV3':
        return this.configureCTA(page, formData, businessType, context);
      case 'ContactV3':
        return this.configureContact(formData, context);
      case 'ContentV3':
        return this.configureContent(page, formData, businessType, context);
      case 'FooterV3':
        return this.configureFooter(formData, context);
      default:
        return null;
    }
  }

  private buildContext(formData: ClientFormData, businessType: string): any {
    return {
      companyName: formData.businessInfo?.companyName || 'Notre entreprise',
      city: formData.contact?.address?.city || formData.serviceArea?.cities?.[0] || 'votre ville',
      mainService: formData.services?.mainServices?.[0]?.name || formData.businessInfo?.businessType || 'services',
      phone: formData.contact?.phones?.[0]?.number || '',
      email: formData.contact?.emails?.[0]?.email || '',
      businessType: businessType
    };
  }

  private configureHeader(formData: ClientFormData, context: any): any {
    const menuItems = [
      { label: 'Accueil', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Tarifs', href: '/tarifs' },
      { label: 'Contact', href: '/contact' }
    ];

    // Ajouter des items spécifiques selon le business
    if (needsPortfolio(context.businessType)) {
      menuItems.splice(2, 0, { label: 'Réalisations', href: '/realisations' });
    }
    if (isUrgencyBusiness(context.businessType)) {
      menuItems.splice(1, 0, { label: 'Urgence', href: '/urgence' });
    }

    return {
      variant: 'modern-transparent',
      companyName: context.companyName,
      logo: formData.media?.logo || null,
      menuItems: menuItems,
      ctaButton: {
        text: isUrgencyBusiness(context.businessType) ? '☎️ Urgence' : 'Devis Gratuit',
        href: isUrgencyBusiness(context.businessType) ? `tel:${context.phone}` : '/contact'
      },
      phone: context.phone,
      showPhone: true,
      sticky: true,
      transparentOnTop: true
    };
  }

  private async configureHero(page: GeneratedPage, formData: ClientFormData, businessType: string, context: any): Promise<any> {
    const isUrgency = isUrgencyBusiness(businessType);
    const isHomePage = page.isHomePage;
    
    // Générer le titre principal
    const title = isHomePage 
      ? await this.contentGenerator.generateHeadline('home', businessType, context)
      : page.name;

    // Générer le sous-titre
    const subtitle = isHomePage
      ? `${context.companyName} - Votre expert ${context.businessType} à ${context.city}`
      : `Service professionnel à ${context.city}`;

    // Sélectionner la variante appropriée
    const variant = isUrgency ? 'centered-bold' : 'split-content';

    // Configuration des boutons
    const primaryButton = isUrgency
      ? { text: `☎️ ${context.phone}`, href: `tel:${context.phone}` }
      : { text: 'Demander un devis', href: '/contact' };

    const secondaryButton = isHomePage
      ? { text: 'Nos services', href: '#services' }
      : { text: 'En savoir plus', href: '#content' };

    return {
      variant,
      title,
      subtitle,
      description: isHomePage 
        ? `Intervention rapide • Devis gratuit • Garantie décennale • ${formData.businessInfo?.yearsOfExperience || '10'}+ ans d'expérience`
        : '',
      primaryButton,
      secondaryButton,
      backgroundImage: this.selectHeroImage(businessType),
      overlay: true,
      overlayOpacity: 0.4,
      height: isHomePage ? 'tall' : 'medium',
      alignment: 'center'
    };
  }

  private async configureServices(page: GeneratedPage, formData: ClientFormData, businessType: string, context: any): Promise<any> {
    const services = formData.services?.mainServices || [];
    const maxServices = 6;
    
    // Limiter à 6 services et créer la structure plate
    const configuredServices: any = {
      variant: 'cards-hover',
      title: page.isHomePage ? 'Nos Services' : `Services ${context.businessType} à ${context.city}`,
      subtitle: 'Des prestations professionnelles adaptées à vos besoins',
      columns: services.length <= 3 ? 3 : 4,
      showPrices: true,
      priceStyle: 'badge',
      pricePeriod: 'projet'
    };

    // Ajouter chaque service avec structure plate
    for (let i = 0; i < Math.min(services.length, maxServices); i++) {
      const service = services[i];
      const serviceNum = i + 1;
      
      configuredServices[`service${serviceNum}_name`] = service.name || `Service ${serviceNum}`;
      configuredServices[`service${serviceNum}_description`] = service.description || 
        await this.contentGenerator.generateServiceDescription(service.name?.toLowerCase() || 'default', businessType, context);
      configuredServices[`service${serviceNum}_price`] = service.price ? `${service.price}€` : 'Sur devis';
      configuredServices[`service${serviceNum}_icon`] = this.selectServiceIcon(service.name || '', businessType);
      configuredServices[`service${serviceNum}_features`] = service.included?.slice(0, 3).join(', ') || 'Devis gratuit, Garantie, Qualité';
      configuredServices[`service${serviceNum}_link`] = `/services/${this.slugify(service.name || `service-${serviceNum}`)}`;
    }

    return configuredServices;
  }

  private async configureFeatures(page: GeneratedPage, formData: ClientFormData, businessType: string, context: any): Promise<any> {
    const features = this.getBusinessFeatures(businessType, formData);
    
    const config: any = {
      variant: 'cards-hover',
      title: 'Pourquoi Nous Choisir',
      subtitle: `Les avantages de faire appel à ${context.companyName}`,
      columns: 3,
      iconStyle: 'filled',
      showNumbers: false
    };

    // Ajouter jusqu'à 6 features avec structure plate
    for (let i = 0; i < Math.min(features.length, 6); i++) {
      const feature = features[i];
      const num = i + 1;
      
      config[`feature${num}_title`] = feature.title;
      config[`feature${num}_description`] = feature.description;
      config[`feature${num}_icon`] = feature.icon;
    }

    return config;
  }

  private configureTestimonials(formData: ClientFormData, context: any): any {
    const testimonials = formData.testimonials?.reviews || [];
    
    // Si pas de témoignages, en générer des génériques
    const defaultTestimonials = [
      {
        name: 'Marie D.',
        rating: 5,
        comment: `Excellent travail de ${context.companyName}. Intervention rapide et professionnelle. Je recommande vivement !`,
        date: this.getRecentDate(30),
        location: context.city
      },
      {
        name: 'Pierre L.',
        rating: 5,
        comment: 'Service impeccable, artisan ponctuel et travail soigné. Très satisfait de la prestation.',
        date: this.getRecentDate(45),
        location: context.city
      },
      {
        name: 'Sophie M.',
        rating: 5,
        comment: 'Devis clair, prix respecté, travail de qualité. Un vrai professionnel !',
        date: this.getRecentDate(60),
        location: context.city
      }
    ];

    const testimonialsToUse = testimonials.length > 0 ? testimonials : defaultTestimonials;

    // Convertir en format V3
    const formattedTestimonials = testimonialsToUse.slice(0, 10).map(testimonial => ({
      author: {
        name: testimonial.name,
        location: testimonial.location || context.city,
        verified: true
      },
      content: testimonial.comment || testimonial.content,
      rating: testimonial.rating || 5,
      date: testimonial.date || this.getRecentDate(30),
      source: 'google',
      featured: testimonial.rating === 5
    }));

    return {
      variant: 'carousel-modern',
      title: 'Ils Nous Font Confiance',
      subtitle: 'Découvrez les avis de nos clients satisfaits',
      testimonials: formattedTestimonials,
      showRating: true,
      showDate: true
    };
  }

  private configureGallery(formData: ClientFormData, businessType: string, context: any): any {
    const images = formData.media?.photos || [];
    const needsImages = needsPortfolio(businessType);
    
    const config: any = {
      variant: needsImages ? 'masonry-flow' : 'grid-uniform',
      title: needsImages ? 'Nos Réalisations' : 'Notre Galerie',
      subtitle: needsImages ? 'Découvrez nos derniers projets' : 'Images de notre activité',
      columns_desktop: 4,
      columns_tablet: 3,
      columns_mobile: 2,
      enableLightbox: true,
      showOverlay: true,
      overlayPosition: 'bottom',
      showFilters: needsImages,
      filterPosition: 'center'
    };

    // Si pas d'images, utiliser des placeholders selon le métier
    const imagesToUse = images.length > 0 ? images : this.getDefaultGalleryImages(businessType);

    // Ajouter les images avec structure plate
    for (let i = 0; i < Math.min(imagesToUse.length, 20); i++) {
      const image = imagesToUse[i];
      const num = i + 1;
      
      config[`image${num}_src`] = image.src || image;
      config[`image${num}_title`] = image.title || `Réalisation ${num}`;
      config[`image${num}_description`] = image.description || '';
      config[`image${num}_category`] = image.category || this.getImageCategory(businessType, i);
      config[`image${num}_alt`] = image.alt || `${context.businessType} ${context.city} - Image ${num}`;
    }

    return config;
  }

  private configurePricing(page: GeneratedPage, formData: ClientFormData, businessType: string, context: any): any {
    const services = formData.services?.mainServices || [];
    const isUrgency = isUrgencyBusiness(businessType);
    
    const config: any = {
      variant: 'cards-modern',
      title: 'Nos Tarifs',
      subtitle: 'Des prix transparents et compétitifs',
      columns: 3,
      highlight: 2, // Mettre en avant le plan du milieu
      showFeatures: true,
      currency: '€',
      period: 'projet'
    };

    // Créer des plans tarifaires basés sur les services
    const plans = this.generatePricingPlans(services, businessType, isUrgency);

    // Ajouter les plans avec structure plate
    for (let i = 0; i < Math.min(plans.length, 4); i++) {
      const plan = plans[i];
      const num = i + 1;
      
      config[`plan${num}_name`] = plan.name;
      config[`plan${num}_price`] = plan.price;
      config[`plan${num}_description`] = plan.description;
      config[`plan${num}_features`] = plan.features.join('|'); // Utiliser | comme séparateur
      config[`plan${num}_cta`] = plan.cta;
      config[`plan${num}_popular`] = plan.popular || false;
    }

    return config;
  }

  private async configureFAQ(page: GeneratedPage, formData: ClientFormData, businessType: string, context: any): Promise<any> {
    const faqs = await this.generateFAQs(page, businessType, context);
    
    const config: any = {
      variant: 'accordion',
      title: 'Questions Fréquentes',
      subtitle: `Tout ce que vous devez savoir sur nos services ${context.businessType}`,
      columns: 1,
      expandIcon: 'plus',
      expandFirst: true
    };

    // Ajouter les FAQs avec structure plate
    for (let i = 0; i < Math.min(faqs.length, 10); i++) {
      const faq = faqs[i];
      const num = i + 1;
      
      config[`faq${num}_question`] = faq.question;
      config[`faq${num}_answer`] = faq.answer;
    }

    return config;
  }

  private async configureCTA(page: GeneratedPage, formData: ClientFormData, businessType: string, context: any): Promise<any> {
    const isUrgency = isUrgencyBusiness(businessType);
    const ctaText = await this.contentGenerator.generateCTA(isUrgency, businessType, context);
    
    return {
      variant: isUrgency ? 'gradient-urgency' : 'centered-boxed',
      title: isUrgency ? 'Besoin d\'une Intervention Urgente ?' : 'Prêt à Démarrer Votre Projet ?',
      subtitle: ctaText,
      primaryButton: {
        text: isUrgency ? `☎️ Appeler ${context.phone}` : 'Demander un Devis Gratuit',
        href: isUrgency ? `tel:${context.phone}` : '/contact'
      },
      secondaryButton: isUrgency ? {
        text: 'Envoyer un message',
        href: '/contact'
      } : null,
      backgroundColor: isUrgency ? '#DC2626' : null,
      showPhone: isUrgency,
      phone: context.phone
    };
  }

  private configureContact(formData: ClientFormData, context: any): any {
    const phones = formData.contact?.phones || [];
    const emails = formData.contact?.emails || [];
    const address = formData.contact?.address;
    const hours = formData.contact?.hours;
    
    return {
      variant: 'split-map',
      title: 'Contactez-Nous',
      subtitle: 'Nous sommes à votre écoute pour tous vos projets',
      showMap: true,
      mapPosition: 'right',
      mapZoom: 14,
      address: address ? `${address.street}, ${address.postalCode} ${address.city}` : '',
      phones: phones.map(p => ({
        number: p.number,
        label: p.type === 'mobile' ? 'Mobile' : 'Fixe'
      })),
      emails: emails.map(e => ({
        email: e.email,
        label: e.type === 'contact' ? 'Contact' : 'Devis'
      })),
      hours: this.formatHours(hours),
      formFields: [
        { name: 'name', label: 'Nom complet', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
        { name: 'service', label: 'Service souhaité', type: 'select', options: formData.services?.mainServices?.map(s => s.name) || [] },
        { name: 'message', label: 'Votre message', type: 'textarea', required: true }
      ],
      submitButton: 'Envoyer le message',
      successMessage: 'Merci ! Nous vous recontacterons dans les plus brefs délais.'
    };
  }

  private async configureContent(page: GeneratedPage, formData: ClientFormData, businessType: string, context: any): Promise<any> {
    // Générer du contenu adapté selon le type de page
    const topic = page.slug.includes('service') ? 'expertise' : 'quality';
    const content = await this.contentGenerator.generateParagraph(topic, businessType, context);
    
    return {
      variant: 'two-columns',
      title: page.name,
      subtitle: `Découvrez notre expertise en ${page.name.toLowerCase()}`,
      content: content,
      image: this.selectContentImage(page.name, businessType),
      imagePosition: 'right',
      showButton: true,
      buttonText: 'En savoir plus',
      buttonHref: '/contact',
      features: this.getPageFeatures(page, businessType).slice(0, 4)
    };
  }

  private configureFooter(formData: ClientFormData, context: any): any {
    const currentYear = new Date().getFullYear();
    
    return {
      variant: 'modern-columns',
      companyName: context.companyName,
      description: `${context.companyName} - Votre expert ${context.businessType} à ${context.city} et environs. Devis gratuit et intervention rapide.`,
      columns: [
        {
          title: 'Services',
          links: formData.services?.mainServices?.slice(0, 5).map(s => ({
            label: s.name,
            href: `/services/${this.slugify(s.name || '')}`
          })) || []
        },
        {
          title: 'Informations',
          links: [
            { label: 'À propos', href: '/a-propos' },
            { label: 'Nos garanties', href: '/garanties' },
            { label: 'Zones d\'intervention', href: '/zones' },
            { label: 'Contact', href: '/contact' }
          ]
        },
        {
          title: 'Légal',
          links: [
            { label: 'Mentions légales', href: '/mentions-legales' },
            { label: 'Politique de confidentialité', href: '/confidentialite' },
            { label: 'CGV', href: '/cgv' }
          ]
        }
      ],
      contact: {
        phone: context.phone,
        email: context.email,
        address: formData.contact?.address ? 
          `${formData.contact.address.street}, ${formData.contact.address.postalCode} ${formData.contact.address.city}` : ''
      },
      social: {
        facebook: formData.contact?.socialMedia?.facebook || '',
        instagram: formData.contact?.socialMedia?.instagram || '',
        linkedin: formData.contact?.socialMedia?.linkedin || '',
        twitter: formData.contact?.socialMedia?.twitter || ''
      },
      newsletter: {
        enabled: true,
        title: 'Newsletter',
        subtitle: 'Recevez nos conseils et promotions',
        placeholder: 'Votre email',
        button: 'S\'inscrire'
      },
      copyright: `© ${currentYear} ${context.companyName}. Tous droits réservés.`,
      showPaymentMethods: true,
      paymentMethods: formData.pricing?.paymentMethods || ['cash', 'check', 'card', 'transfer'],
      showCertifications: true,
      certifications: this.getBusinessCertifications(context.businessType, formData)
    };
  }

  // Méthodes helper
  private getBusinessFeatures(businessType: string, formData: ClientFormData): any[] {
    const defaultFeatures = [
      { title: 'Devis Gratuit', description: 'Estimation claire et détaillée sans engagement', icon: '📋' },
      { title: 'Garantie Décennale', description: 'Vos travaux assurés pendant 10 ans', icon: '🛡️' },
      { title: 'Artisan Qualifié', description: `${formData.businessInfo?.yearsOfExperience || '10'}+ ans d'expérience`, icon: '⭐' },
      { title: 'Intervention Rapide', description: 'Disponible selon vos besoins', icon: '⚡' },
      { title: 'Prix Transparents', description: 'Pas de surprise, tarifs clairs', icon: '💰' },
      { title: 'Satisfaction Client', description: '98% de clients satisfaits', icon: '😊' }
    ];

    // Personnaliser selon le métier
    if (isUrgencyBusiness(businessType)) {
      defaultFeatures[3] = { 
        title: 'Urgence 24h/7j', 
        description: 'Intervention en moins de 30 minutes', 
        icon: '🚨' 
      };
    }

    return defaultFeatures;
  }

  private selectServiceIcon(serviceName: string, businessType: string): string {
    const iconMap: Record<string, string> = {
      // Plomberie
      'débouchage': '🚿',
      'fuite': '💧',
      'chauffe-eau': '🔥',
      'canalisation': '🔧',
      'robinet': '🚰',
      'wc': '🚽',
      // Électricité  
      'tableau': '⚡',
      'prise': '🔌',
      'éclairage': '💡',
      'domotique': '🏠',
      'mise aux normes': '📋',
      // Menuiserie
      'porte': '🚪',
      'fenêtre': '🪟',
      'escalier': '🪜',
      'meuble': '🪑',
      'parquet': '🪵',
      // Général
      'installation': '🔨',
      'réparation': '🔧',
      'entretien': '🧹',
      'rénovation': '🏗️',
      'urgence': '🚨'
    };

    const lowerName = serviceName.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }

    // Icônes par défaut selon le métier
    const defaultIcons: Record<string, string> = {
      plumber: '🔧',
      electrician: '⚡',
      carpenter: '🪵',
      painter: '🎨',
      mason: '🧱',
      roofer: '🏠',
      tiler: '🟦',
      locksmith: '🔐',
      heatingEngineer: '🔥',
      landscaper: '🌿',
      default: '🛠️'
    };

    return defaultIcons[businessType] || defaultIcons.default;
  }

  private selectHeroImage(businessType: string): string {
    // Dans un cas réel, on sélectionnerait depuis la galerie média
    // Pour l'instant, on retourne un placeholder selon le métier
    const images: Record<string, string> = {
      plumber: '/images/hero-plumber.jpg',
      electrician: '/images/hero-electrician.jpg',
      carpenter: '/images/hero-carpenter.jpg',
      painter: '/images/hero-painter.jpg',
      default: '/images/hero-artisan.jpg'
    };

    return images[businessType] || images.default;
  }

  private selectContentImage(pageName: string, businessType: string): string {
    // Sélection d'image selon le contexte
    return `/images/${businessType}-${this.slugify(pageName)}.jpg`;
  }

  private getDefaultGalleryImages(businessType: string): string[] {
    // Retourner des placeholders selon le métier
    const count = needsPortfolio(businessType) ? 12 : 6;
    const images = [];
    
    for (let i = 1; i <= count; i++) {
      images.push(`/images/gallery-${businessType}-${i}.jpg`);
    }
    
    return images;
  }

  private getImageCategory(businessType: string, index: number): string {
    const categories: Record<string, string[]> = {
      carpenter: ['Mobilier', 'Escaliers', 'Portes', 'Aménagement'],
      painter: ['Intérieur', 'Extérieur', 'Décoration', 'Rénovation'],
      mason: ['Construction', 'Rénovation', 'Extension', 'Terrasse'],
      landscaper: ['Jardin', 'Terrasse', 'Clôture', 'Entretien'],
      default: ['Avant', 'Après', 'En cours', 'Réalisation']
    };

    const businessCategories = categories[businessType] || categories.default;
    return businessCategories[index % businessCategories.length];
  }

  private generatePricingPlans(services: any[], businessType: string, isUrgency: boolean): any[] {
    if (services.length === 0) {
      // Plans par défaut
      return [
        {
          name: 'Intervention Simple',
          price: 'À partir de 50€',
          description: 'Pour les petits travaux',
          features: ['Déplacement inclus', 'Devis gratuit', 'Garantie 1 an', 'Paiement après travaux'],
          cta: 'Choisir',
          popular: false
        },
        {
          name: 'Projet Standard',
          price: 'Sur devis',
          description: 'Pour vos projets courants',
          features: ['Étude personnalisée', 'Matériaux de qualité', 'Garantie 2 ans', 'Suivi de chantier', 'Facilités de paiement'],
          cta: 'Demander un devis',
          popular: true
        },
        {
          name: 'Rénovation Complète',
          price: 'Étude gratuite',
          description: 'Pour les gros chantiers',
          features: ['Conseil expert', 'Coordination travaux', 'Garantie décennale', 'Accompagnement complet', 'Solutions de financement'],
          cta: 'Nous contacter',
          popular: false
        }
      ];
    }

    // Générer des plans basés sur les services
    return services.slice(0, 3).map((service, index) => ({
      name: service.name,
      price: service.price ? `${service.price}€` : 'Sur devis',
      description: service.description?.substring(0, 100) || 'Service professionnel',
      features: service.included || ['Devis gratuit', 'Travail soigné', 'Garantie incluse'],
      cta: index === 1 ? 'Plus populaire' : 'Choisir',
      popular: index === 1
    }));
  }

  private async generateFAQs(page: GeneratedPage, businessType: string, context: any): Promise<any[]> {
    const baseFAQs = [
      {
        question: `Comment obtenir un devis pour mes travaux de ${context.businessType} ?`,
        answer: `Pour obtenir un devis gratuit, contactez ${context.companyName} par téléphone au ${context.phone} ou via notre formulaire de contact. Nous nous déplaçons à ${context.city} et environs pour évaluer vos besoins et vous proposer un devis détaillé sans engagement.`
      },
      {
        question: 'Quels sont vos délais d\'intervention ?',
        answer: isUrgencyBusiness(businessType) 
          ? `Pour les urgences, nous intervenons dans les 30 minutes à ${context.city}. Pour les travaux planifiés, nous convenons ensemble d'un rendez-vous selon vos disponibilités.`
          : `Nous intervenons généralement sous 48 à 72h pour les demandes courantes. Pour les projets plus importants, nous établissons ensemble un planning adapté à vos contraintes.`
      },
      {
        question: 'Quelles garanties proposez-vous ?',
        answer: `${context.companyName} est assuré en responsabilité civile professionnelle et propose une garantie décennale sur les gros œuvres. Tous nos travaux sont garantis et nous assurons un service après-vente réactif.`
      },
      {
        question: 'Quels moyens de paiement acceptez-vous ?',
        answer: 'Nous acceptons les paiements par chèque, virement bancaire, carte bancaire et espèces. Des facilités de paiement peuvent être accordées pour les projets importants.'
      },
      {
        question: `Dans quelles zones intervenez-vous autour de ${context.city} ?`,
        answer: `${context.companyName} intervient à ${context.city} et dans un rayon de 30 km alentour. Nous couvrons l'ensemble du département pour les projets d'envergure. Contactez-nous pour vérifier si nous intervenons dans votre commune.`
      }
    ];

    // Ajouter des FAQs spécifiques selon le type de page
    if (page.slug.startsWith('/services/')) {
      baseFAQs.unshift({
        question: `Quels sont les tarifs pour ${page.name} ?`,
        answer: `Les tarifs pour ${page.name} dépendent de plusieurs facteurs : l'ampleur des travaux, les matériaux utilisés, l'accessibilité du chantier. Nous proposons toujours un devis gratuit et détaillé avant toute intervention.`
      });
    }

    return baseFAQs;
  }

  private getPageFeatures(page: GeneratedPage, businessType: string): string[] {
    // Features spécifiques selon le type de page
    if (page.slug.includes('urgence')) {
      return ['Intervention 24h/7j', 'Délai 30 minutes', 'Devis immédiat', 'Équipe disponible'];
    }
    if (page.slug.includes('service')) {
      return ['Expertise reconnue', 'Matériel professionnel', 'Respect des normes', 'Garantie qualité'];
    }
    if (page.slug.includes('zone')) {
      return ['Artisan local', 'Connaissance du secteur', 'Intervention rapide', 'Tarifs adaptés'];
    }
    return ['Professionnalisme', 'Qualité garantie', 'Prix transparents', 'Satisfaction client'];
  }

  private formatHours(hours: any): string {
    if (!hours) return 'Lun-Ven: 8h-19h, Sam: 9h-17h';
    
    // Formater les horaires depuis le formulaire
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const formatted = [];
    
    for (const day of days) {
      const dayHours = hours[day.toLowerCase()];
      if (dayHours && dayHours.open) {
        formatted.push(`${day}: ${dayHours.open}-${dayHours.close}`);
      }
    }
    
    return formatted.join(', ') || 'Lun-Ven: 8h-19h';
  }

  private getBusinessCertifications(businessType: string, formData: ClientFormData): string[] {
    const certifications = [];
    
    // Certifications depuis le formulaire
    if (formData.businessInfo?.certifications) {
      certifications.push(...formData.businessInfo.certifications);
    }
    
    // Certifications par défaut selon le métier
    const defaultCerts: Record<string, string[]> = {
      plumber: ['Qualibat', 'RGE'],
      electrician: ['Qualifelec', 'RGE'],
      heatingEngineer: ['RGE', 'Qualibat'],
      default: ['Artisan qualifié', 'Garantie décennale']
    };
    
    const defaults = defaultCerts[businessType] || defaultCerts.default;
    defaults.forEach(cert => {
      if (!certifications.includes(cert)) {
        certifications.push(cert);
      }
    });
    
    return certifications;
  }

  private getRecentDate(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('fr-FR');
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
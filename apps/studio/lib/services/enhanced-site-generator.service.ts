import { ClientFormData } from '@/types/client-form';

interface EnhancedBlock {
  id: string;
  type: string;
  props: Record<string, any>;
  style?: {
    backgroundColor?: string;
    backgroundGradient?: string;
    paddingY?: string;
  };
}

interface VisualTheme {
  hero: string[];
  services: string[];
  features: string[];
  testimonials: string[];
  cta: string[];
  gallery: string[];
  content: string[];
  faq: string[];
  pricing: string[];
  contact: string[];
}

interface BusinessContent {
  longDescriptions: Record<string, string[]>;
  processes: Record<string, string[]>;
  benefits: string[];
  guarantees: string[];
  localContent: Record<string, string>;
}

export class EnhancedSiteGeneratorService {
  private blockCounter = 0;
  
  // Visual themes by business type
  private visualThemes: Record<string, VisualTheme> = {
    plombier: {
      hero: ['split-screen', 'centered-bold', 'side-image'],
      services: ['cards-3d', 'hexagon', 'cards-hover'],
      features: ['bento', 'grid-icons', 'timeline'],
      testimonials: ['carousel-3d', 'masonry', 'carousel-modern'],
      cta: ['gradient-waves', 'glassmorphism', 'centered-simple'],
      gallery: ['masonry-flow', 'grid-hover', 'polaroid'],
      content: ['split-content', 'timeline', 'accordion'],
      faq: ['accordion-modern', 'chat-style', 'grid'],
      pricing: ['cards-toggle', 'table-compare', 'slider'],
      contact: ['split-map', 'centered-form', 'chat-style']
    },
    electricien: {
      hero: ['particles', 'gradient-animated', 'tech-grid'],
      services: ['comparison', 'timeline', 'cards-gradient'],
      features: ['carousel-3d', 'stats-counter', 'grid-icons'],
      testimonials: ['video-gallery', 'stacked', 'timeline'],
      cta: ['neon-glow', 'countdown', 'split-content'],
      gallery: ['instagram-style', 'before-after', 'grid-uniform'],
      content: ['tabs', 'magazine', 'comparison'],
      faq: ['video-faq', 'searchable', 'categories'],
      pricing: ['calculator', 'comparison', 'cards-gradient'],
      contact: ['fullscreen-map', 'modern-split', 'minimal']
    },
    menuisier: {
      hero: ['fullscreen-image', 'split-content', 'parallax'],
      services: ['showcase', 'portfolio-style', 'minimal-grid'],
      features: ['icons-left', 'centered', 'alternating'],
      testimonials: ['quotes-elegant', 'grid-photos', 'slider'],
      cta: ['natural', 'wood-texture', 'minimal'],
      gallery: ['lightbox-pro', 'masonry-creative', 'fullscreen'],
      content: ['story', 'process', 'visual-journey'],
      faq: ['simple', 'expandable', 'sidebar'],
      pricing: ['packages', 'custom-quote', 'table'],
      contact: ['workshop-map', 'appointment', 'classic']
    },
    peintre: {
      hero: ['color-burst', 'artistic', 'gallery-bg'],
      services: ['color-cards', 'visual-grid', 'creative'],
      features: ['paint-splash', 'colorful', 'artistic-grid'],
      testimonials: ['photo-focus', 'colorful-cards', 'wall'],
      cta: ['rainbow', 'paint-drip', 'vibrant'],
      gallery: ['color-filter', 'wall-gallery', 'pinterest'],
      content: ['visual-story', 'before-after', 'showcase'],
      faq: ['colorful', 'bubble-chat', 'accordion-colors'],
      pricing: ['paint-buckets', 'area-calculator', 'tiers'],
      contact: ['color-picker', 'creative-form', 'studio']
    },
    macon: {
      hero: ['construction', 'blueprint', 'strong'],
      services: ['industrial', 'grid-solid', 'construction-cards'],
      features: ['concrete', 'solid-grid', 'building-blocks'],
      testimonials: ['construction-site', 'client-logos', 'case-studies'],
      cta: ['construction-cta', 'solid', 'industrial'],
      gallery: ['project-showcase', 'progress-photos', 'grid-construction'],
      content: ['project-steps', 'technical', 'detailed'],
      faq: ['technical-faq', 'categorized', 'search'],
      pricing: ['project-based', 'square-meter', 'detailed'],
      contact: ['site-visit', 'quote-form', 'industrial']
    }
  };

  // Background patterns and colors
  private sectionBackgrounds = [
    { bg: '#ffffff', pattern: null },
    { bg: '#f8fafc', pattern: null },
    { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pattern: null },
    { bg: '#f3f4f6', pattern: 'dots' },
    { bg: 'var(--primary)', pattern: 'waves', opacity: 0.05 },
    { bg: '#fafafa', pattern: null },
    { bg: 'linear-gradient(to right, #f5f7fa 0%, #c3cfe2 100%)', pattern: null }
  ];

  generateBlockId(type: string): string {
    this.blockCounter++;
    return `${type}-${Date.now()}-${this.blockCounter}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getRandomVariant(businessType: string, blockType: string): string {
    const theme = this.visualThemes[businessType] || this.visualThemes.plombier;
    const variants = theme[blockType as keyof VisualTheme] || ['default'];
    return variants[Math.floor(Math.random() * variants.length)];
  }

  getSectionBackground(index: number): any {
    return this.sectionBackgrounds[index % this.sectionBackgrounds.length];
  }

  generateEnhancedContent(businessType: string, service: string, city: string): BusinessContent {
    const contents: Record<string, BusinessContent> = {
      plombier: {
        longDescriptions: {
          'débouchage-canalisation': [
            `Le débouchage de canalisation est l'une des interventions les plus fréquentes en plomberie. À ${city}, nos experts interviennent rapidement pour résoudre tous vos problèmes d'évacuation. Que ce soit pour un évier bouché, des toilettes qui ne s'écoulent plus, ou une douche qui refoule, nous disposons de l'équipement professionnel nécessaire pour déboucher efficacement vos canalisations.`,
            `Notre équipe utilise des techniques modernes comme l'hydrocurage haute pression, qui permet de nettoyer en profondeur vos canalisations sans les endommager. Cette méthode écologique n'utilise que de l'eau sous pression et garantit un débouchage durable. Pour les obstructions plus complexes, nous effectuons d'abord une inspection vidéo pour localiser précisément le bouchon et choisir la méthode la plus adaptée.`,
            `En tant que professionnels du débouchage à ${city}, nous intervenons sur tous types de canalisations : PVC, fonte, cuivre, ou multicouche. Notre expérience nous permet de traiter aussi bien les bouchons simples (accumulation de cheveux, résidus alimentaires) que les obstructions plus sérieuses (racines d'arbres, objets coincés, dépôts calcaires importants).`
          ],
          'recherche-de-fuite': [
            `La recherche de fuite d'eau est une spécialité qui demande expertise et équipement de pointe. À ${city}, nous intervenons pour détecter toutes les fuites, visibles ou cachées, qui peuvent causer des dégâts importants dans votre habitation. Une fuite non traitée peut entraîner des infiltrations, des moisissures, et une augmentation significative de votre facture d'eau.`,
            `Nous utilisons des technologies avancées comme la thermographie infrarouge, l'électroacoustique, et le gaz traceur pour localiser précisément l'origine de la fuite sans destruction inutile. Ces méthodes non invasives nous permettent de détecter les fuites dans les murs, sous les dalles, ou dans les canalisations enterrées, minimisant ainsi les travaux de réparation nécessaires.`,
            `Notre expertise en recherche de fuite à ${city} s'étend à tous types d'installations : réseaux d'eau potable, chauffage, piscines, et toitures-terrasses. Nous établissons un diagnostic précis avec rapport détaillé et photos thermiques, qui peut être utilisé pour vos démarches d'assurance. Suite à la détection, nous proposons immédiatement les solutions de réparation les plus adaptées.`
          ]
        },
        processes: {
          'débouchage-canalisation': [
            'Diagnostic initial : Nous identifions la nature et la localisation du bouchon',
            'Inspection caméra : Si nécessaire, nous utilisons une caméra endoscopique pour visualiser l\'obstruction',
            'Choix de la méthode : Furet manuel, furet électrique, ou hydrocurage selon le type de bouchon',
            'Intervention : Débouchage professionnel avec le matériel adapté',
            'Nettoyage complet : Nous assurons un nettoyage complet de la canalisation',
            'Test et vérification : Nous vérifions le bon écoulement et l\'absence de fuite',
            'Conseils d\'entretien : Nous vous donnons des recommandations pour éviter les futurs bouchons'
          ]
        },
        benefits: [
          'Intervention rapide 24h/7j pour les urgences',
          'Diagnostic gratuit et transparent',
          'Équipement professionnel haute performance',
          'Garantie de résultat sur nos interventions',
          'Respect des normes sanitaires et environnementales',
          'Équipe formée et certifiée',
          'Assurance décennale et responsabilité civile'
        ],
        guarantees: [
          'Satisfaction garantie ou nous revenons gratuitement',
          'Prix fixe annoncé avant intervention',
          'Garantie 1 an sur les réparations effectuées',
          'Intervention propre et respectueuse de votre intérieur'
        ],
        localContent: {
          paris: 'Dans la capitale, nous connaissons parfaitement les spécificités du réseau parisien, souvent ancien. Nos équipes sont formées pour intervenir dans les immeubles haussmanniens comme dans les constructions modernes.',
          lyon: 'À Lyon, nous maîtrisons les particularités des canalisations de la presqu\'île et des pentes de la Croix-Rousse. Notre connaissance du terrain nous permet d\'intervenir efficacement dans tous les arrondissements.',
          marseille: 'Marseille et ses collines présentent des défis uniques en plomberie. Nous sommes équipés pour gérer les problèmes de pression et les spécificités du réseau marseillais.'
        }
      },
      electricien: {
        longDescriptions: {
          'mise-aux-normes': [
            `La mise aux normes électriques est essentielle pour garantir la sécurité de votre installation à ${city}. Avec l'évolution constante des normes, notamment la NFC 15-100, il est crucial de s'assurer que votre installation électrique respecte les dernières exigences de sécurité. Une installation non conforme peut présenter des risques d'incendie, d'électrocution, et peut également poser problème lors de la vente ou location de votre bien.`,
            `Notre équipe d'électriciens certifiés à ${city} réalise un diagnostic complet de votre installation électrique. Nous vérifions l'état du tableau électrique, la présence et le bon fonctionnement des dispositifs de protection (disjoncteurs différentiels, parafoudre), la qualité de la mise à la terre, et la conformité de l'ensemble du câblage. Ce diagnostic nous permet d'établir un plan d'action précis pour la mise en conformité.`,
            `La mise aux normes à ${city} comprend généralement le remplacement du tableau électrique, l'installation de prises de terre conformes, la mise en place de circuits spécialisés pour les gros appareils électroménagers, et l'ajout de protections différentielles adaptées. Nous veillons également à respecter les volumes de sécurité dans les pièces d'eau et à installer le nombre requis de prises et points lumineux dans chaque pièce.`
          ]
        },
        processes: {
          'mise-aux-normes': [
            'Diagnostic initial complet de l\'installation existante',
            'Établissement d\'un rapport détaillé des non-conformités',
            'Devis détaillé avec plan d\'intervention',
            'Remplacement du tableau électrique et des protections',
            'Mise en conformité des circuits et câblages',
            'Installation des éléments de sécurité manquants',
            'Tests et vérifications avec appareils de mesure certifiés',
            'Remise du certificat de conformité Consuel'
          ]
        },
        benefits: [
          'Électriciens certifiés Qualifelec',
          'Expertise en domotique et maison connectée',
          'Intervention rapide et soignée',
          'Matériel de grandes marques (Legrand, Schneider, Hager)',
          'Accompagnement pour les aides à la rénovation',
          'Service après-vente réactif'
        ],
        guarantees: [
          'Garantie décennale sur toutes nos installations',
          'Conformité certifiée par le Consuel',
          'Devis gratuit et sans engagement',
          'Respect des délais annoncés'
        ],
        localContent: {
          lyon: 'À Lyon, nous intervenons dans tous types de bâtiments, des appartements du Vieux Lyon aux maisons modernes de Gerland. Notre connaissance des spécificités lyonnaises nous permet d\'adapter nos interventions.',
          paris: 'Expert des installations parisiennes, nous maîtrisons les contraintes des immeubles anciens et copropriétés. Nos équipes sont habituées aux interventions en milieu urbain dense.'
        }
      }
    };

    return contents[businessType] || contents.plombier;
  }

  generateServicePage(
    service: { name: string; description: string; price?: string },
    city: string,
    businessType: string,
    company: string,
    formData: any
  ) {
    const content = this.generateEnhancedContent(businessType, service.name, city);
    const slug = `${service.name.toLowerCase().replace(/\s+/g, '-')}-${city.toLowerCase().replace(/\s+/g, '-')}`;
    
    let sectionIndex = 0;
    
    return {
      id: slug,
      name: `${service.name} ${city}`,
      slug: `/${slug}`,
      seo: {
        title: `${service.name} ${city} - ${company} | Intervention rapide et professionnelle`,
        description: `${company}, votre expert en ${service.name.toLowerCase()} à ${city}. ${service.description} Devis gratuit, intervention rapide. ☎️ ${formData.phone}`,
        keywords: [
          `${service.name} ${city}`,
          `${businessType} ${city}`,
          `${service.name} urgent ${city}`,
          `meilleur ${businessType} ${city}`,
          `${service.name} pas cher ${city}`
        ]
      },
      blocks: [
        // Header
        {
          id: this.generateBlockId('header'),
          type: 'header-v3-perfect',
          props: {
            variant: 'transparent-fixed',
            logoText: company,
            navigation: this.generateNavigation(formData.services, formData.cities)
          }
        },
        
        // Hero with varied style
        {
          id: this.generateBlockId('hero'),
          type: 'hero-v3-perfect',
          props: {
            variant: this.getRandomVariant(businessType, 'hero'),
            title: `${service.name} à ${city}`,
            subtitle: `${company} - Votre expert ${businessType} pour ${service.name.toLowerCase()} à ${city} et ses environs`,
            primaryButton: {
              text: formData.emergency247 ? '☎️ Urgence 24h/7j' : '📞 Devis gratuit',
              href: formData.emergency247 ? `tel:${formData.phone}` : '/contact'
            },
            secondaryButton: {
              text: 'En savoir plus',
              href: '#details'
            },
            backgroundImage: `/images/${businessType}-${service.name.toLowerCase().replace(/\s+/g, '-')}.jpg`
          },
          style: this.getSectionBackground(sectionIndex++)
        },
        
        // Detailed content about the service
        {
          id: this.generateBlockId('content'),
          type: 'content-v3-perfect',
          props: {
            variant: this.getRandomVariant(businessType, 'content'),
            title: `${service.name} par des professionnels à ${city}`,
            content: content.longDescriptions[service.name.toLowerCase().replace(/\s+/g, '-')]?.join('\n\n') || '',
            imageUrl: `/images/${businessType}-work-1.jpg`,
            imagePosition: 'right',
            features: content.benefits.slice(0, 4)
          },
          style: this.getSectionBackground(sectionIndex++)
        },
        
        // Process steps
        {
          id: this.generateBlockId('features'),
          type: 'features-v3-perfect',
          props: {
            variant: this.getRandomVariant(businessType, 'features'),
            title: `Notre processus pour ${service.name.toLowerCase()}`,
            subtitle: 'Une intervention structurée et professionnelle',
            ...this.generateProcessFeatures(content.processes[service.name.toLowerCase().replace(/\s+/g, '-')] || [])
          },
          style: this.getSectionBackground(sectionIndex++)
        },
        
        // Why choose us section
        {
          id: this.generateBlockId('services'),
          type: 'services-v3-perfect',
          props: {
            variant: this.getRandomVariant(businessType, 'services'),
            title: `Pourquoi choisir ${company} pour votre ${service.name.toLowerCase()} ?`,
            subtitle: `Les avantages de faire appel à un ${businessType} professionnel à ${city}`,
            ...this.generateBenefitServices(content.benefits, businessType, city)
          },
          style: this.getSectionBackground(sectionIndex++)
        },
        
        // Testimonials
        {
          id: this.generateBlockId('testimonials'),
          type: 'testimonials-v3-perfect',
          props: {
            variant: this.getRandomVariant(businessType, 'testimonials'),
            title: `Nos clients témoignent`,
            subtitle: `Ce qu'ils pensent de nos services de ${service.name.toLowerCase()} à ${city}`,
            ...this.generateLocalTestimonials(service.name, city, businessType)
          },
          style: this.getSectionBackground(sectionIndex++)
        },
        
        // Gallery
        {
          id: this.generateBlockId('gallery'),
          type: 'gallery-v3-perfect',
          props: {
            variant: this.getRandomVariant(businessType, 'gallery'),
            title: `Nos réalisations en ${service.name.toLowerCase()}`,
            subtitle: `Découvrez nos interventions récentes à ${city}`,
            ...this.generateServiceGallery(service.name, businessType)
          },
          style: this.getSectionBackground(sectionIndex++)
        },
        
        // FAQ
        {
          id: this.generateBlockId('faq'),
          type: 'faq-v3-perfect',
          props: {
            variant: this.getRandomVariant(businessType, 'faq'),
            title: `Questions fréquentes sur ${service.name.toLowerCase()} à ${city}`,
            ...this.generateServiceFAQ(service.name, city, businessType)
          },
          style: this.getSectionBackground(sectionIndex++)
        },
        
        // CTA
        {
          id: this.generateBlockId('cta'),
          type: 'cta-v3-perfect',
          props: {
            variant: this.getRandomVariant(businessType, 'cta'),
            title: `Besoin d'un ${service.name.toLowerCase()} à ${city} ?`,
            subtitle: formData.emergency247 
              ? `Intervention d'urgence 24h/7j - Nous sommes là pour vous !`
              : `Contactez-nous pour un devis gratuit et personnalisé`,
            primaryButton: {
              text: `☎️ Appeler maintenant`,
              href: `tel:${formData.phone}`
            },
            features: content.guarantees
          },
          style: {
            ...this.getSectionBackground(sectionIndex++),
            backgroundGradient: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
          }
        },
        
        // Footer
        {
          id: this.generateBlockId('footer'),
          type: 'footer-v3-perfect',
          props: {
            variant: 'modern-columns',
            companyName: company,
            description: formData.description,
            phone: formData.phone,
            email: formData.email,
            address: `${city}, France`,
            services: formData.services,
            cities: formData.cities,
            socialLinks: formData.socialLinks || []
          }
        }
      ]
    };
  }

  private generateNavigation(services: any[], cities: string[]) {
    const navigation = [
      { label: 'Accueil', href: '/' },
      {
        label: 'Services',
        href: '/services',
        children: services.map(s => ({
          label: s.name,
          href: `/${s.name.toLowerCase().replace(/\s+/g, '-')}`
        }))
      },
      {
        label: 'Zones d\'intervention',
        href: '/zones',
        children: cities.map(c => ({
          label: c,
          href: `/zone/${c.toLowerCase().replace(/\s+/g, '-')}`
        }))
      },
      { label: 'À propos', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ];
    
    return navigation;
  }

  private generateProcessFeatures(processes: string[]) {
    const features: any = {};
    processes.slice(0, 6).forEach((process, index) => {
      const [title, description] = process.split(':');
      features[`feature${index + 1}_title`] = title;
      features[`feature${index + 1}_description`] = description || '';
      features[`feature${index + 1}_icon`] = this.getProcessIcon(index);
    });
    return features;
  }

  private generateBenefitServices(benefits: string[], businessType: string, city: string) {
    const services: any = {};
    benefits.slice(0, 3).forEach((benefit, index) => {
      services[`service${index + 1}_name`] = benefit;
      services[`service${index + 1}_description`] = this.expandBenefit(benefit, businessType, city);
      services[`service${index + 1}_icon`] = this.getBenefitIcon(benefit);
      services[`service${index + 1}_features`] = [
        'Qualité garantie',
        'Professionnalisme',
        'Rapidité d\'intervention'
      ];
    });
    return services;
  }

  private generateLocalTestimonials(service: string, city: string, businessType: string) {
    const testimonials = [
      {
        content: `Excellent service de ${service.toLowerCase()} ! L'équipe de ${businessType} est intervenue rapidement à ${city}. Travail propre et efficace. Je recommande vivement !`,
        author: 'Marie L.',
        location: city,
        rating: 5
      },
      {
        content: `Très satisfait de l'intervention pour ${service.toLowerCase()}. Prix correct et travail de qualité. Un vrai professionnel du métier à ${city}.`,
        author: 'Jean-Pierre M.',
        location: city,
        rating: 5
      },
      {
        content: `Service impeccable ! ${service} réalisé dans les délais avec beaucoup de professionnalisme. Je n'hésiterai pas à refaire appel à eux.`,
        author: 'Sophie D.',
        location: city,
        rating: 5
      }
    ];

    const result: any = {};
    testimonials.forEach((testimonial, index) => {
      result[`testimonial${index + 1}_content`] = testimonial.content;
      result[`testimonial${index + 1}_author`] = testimonial.author;
      result[`testimonial${index + 1}_location`] = testimonial.location;
      result[`testimonial${index + 1}_rating`] = testimonial.rating;
    });
    return result;
  }

  private generateServiceGallery(service: string, businessType: string) {
    const gallery: any = {
      columnsDesktop: 3,
      columnsTablet: 2,
      columnsMobile: 1,
      enableLightbox: true,
      enableFilters: true,
      showCaptions: true,
      hoverEffect: 'zoom'
    };

    for (let i = 1; i <= 9; i++) {
      gallery[`image${i}_src`] = `/images/${businessType}-${service.toLowerCase().replace(/\s+/g, '-')}-${i}.jpg`;
      gallery[`image${i}_title`] = `${service} - Réalisation ${i}`;
      gallery[`image${i}_description`] = `Exemple de notre travail de ${service.toLowerCase()}`;
      gallery[`image${i}_category`] = i % 3 === 0 ? 'recent' : i % 3 === 1 ? 'renovation' : 'neuf';
    }

    return gallery;
  }

  private generateServiceFAQ(service: string, city: string, businessType: string) {
    const faqs = [
      {
        question: `Combien coûte un ${service.toLowerCase()} à ${city} ?`,
        answer: `Le prix d'un ${service.toLowerCase()} à ${city} dépend de plusieurs facteurs : la complexité de l'intervention, l'accessibilité, et les matériaux nécessaires. Nous proposons toujours un devis gratuit et détaillé avant toute intervention.`
      },
      {
        question: `Quels sont vos délais d'intervention pour un ${service.toLowerCase()} ?`,
        answer: `Pour les urgences, nous intervenons dans l'heure à ${city}. Pour les travaux planifiés, nous pouvons généralement intervenir sous 24 à 48h selon votre disponibilité.`
      },
      {
        question: `Proposez-vous une garantie sur ${service.toLowerCase()} ?`,
        answer: `Oui, tous nos travaux de ${service.toLowerCase()} sont garantis. La durée de garantie dépend du type d'intervention, mais nous assurons au minimum 1 an sur toutes nos prestations.`
      },
      {
        question: `Intervenez-vous le week-end pour un ${service.toLowerCase()} ?`,
        answer: `Oui, notre service d'urgence est disponible 7j/7 pour les interventions de ${service.toLowerCase()} urgentes à ${city}. Les tarifs week-end sont communiqués à l'avance.`
      },
      {
        question: `Comment se déroule un ${service.toLowerCase()} ?`,
        answer: `Nous commençons par un diagnostic précis, puis nous vous proposons la solution la plus adaptée. L'intervention est réalisée dans le respect de votre intérieur, et nous nettoyons systématiquement après notre passage.`
      }
    ];

    const result: any = {};
    faqs.forEach((faq, index) => {
      result[`faq${index + 1}_question`] = faq.question;
      result[`faq${index + 1}_answer`] = faq.answer;
    });
    return result;
  }

  private getProcessIcon(index: number): string {
    const icons = ['🔍', '📋', '🛠️', '✅', '🧹', '📝'];
    return icons[index] || '✓';
  }

  private getBenefitIcon(benefit: string): string {
    if (benefit.includes('24h') || benefit.includes('urgence')) return '🚨';
    if (benefit.includes('certifi') || benefit.includes('qualif')) return '🏆';
    if (benefit.includes('gratuit')) return '🎁';
    if (benefit.includes('garantie')) return '✅';
    if (benefit.includes('équipe')) return '👥';
    return '⭐';
  }

  private expandBenefit(benefit: string, businessType: string, city: string): string {
    return `${benefit}. En tant que ${businessType} professionnel à ${city}, nous mettons un point d'honneur à respecter cet engagement auprès de tous nos clients.`;
  }
}

export const enhancedSiteGenerator = new EnhancedSiteGeneratorService();
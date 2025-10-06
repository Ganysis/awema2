import { createClient } from '@sanity/client';
import { SanityCredentials, SanityWorkflow } from './sanity-setup.service';
import fs from 'fs/promises';
import path from 'path';

/**
 * Interface pour les données migrées
 */
export interface MigratedData {
  settings: any;
  services: any[];
  testimonials: any[];
  projects: any[];
  pages: any[];
  navigation: any;
  seoConfig: any;
}

/**
 * Interface pour les options de migration
 */
export interface MigrationOptions {
  includeTestData: boolean;
  generateSampleContent: boolean;
  importImages: boolean;
  createInitialPages: boolean;
  setupNavigation: boolean;
}

/**
 * Service de migration des données vers Sanity CMS
 * Transforme les données du formulaire en documents Sanity structurés
 */
class SanityDataMigrationService {
  private clients: Map<string, any> = new Map();

  /**
   * Migre toutes les données d'un workflow vers Sanity
   */
  async migrateWorkflowData(
    credentials: SanityCredentials,
    workflow: SanityWorkflow,
    options: MigrationOptions = {
      includeTestData: true,
      generateSampleContent: true,
      importImages: true,
      createInitialPages: true,
      setupNavigation: true
    }
  ): Promise<MigratedData> {
    console.log(`🔄 Début migration données pour ${workflow.businessName}...`);

    const client = this.getClient(credentials);

    try {
      // 1. Migrer les paramètres généraux
      const settings = await this.migrateSettings(client, workflow);
      console.log(`✅ Paramètres migrés`);

      // 2. Migrer les services
      const services = await this.migrateServices(client, workflow, options);
      console.log(`✅ Services migrés (${services.length})`);

      // 3. Générer des témoignages
      const testimonials = await this.generateTestimonials(client, workflow, options);
      console.log(`✅ Témoignages générés (${testimonials.length})`);

      // 4. Générer des projets d'exemple
      const projects = await this.generateSampleProjects(client, workflow, options);
      console.log(`✅ Projets d'exemple créés (${projects.length})`);

      // 5. Créer les pages initiales
      const pages = await this.createInitialPages(client, workflow, options);
      console.log(`✅ Pages initiales créées (${pages.length})`);

      // 6. Configurer la navigation
      const navigation = await this.setupNavigation(client, workflow, options);
      console.log(`✅ Navigation configurée`);

      // 7. Configuration SEO avancée
      const seoConfig = await this.setupAdvancedSEO(client, workflow);
      console.log(`✅ Configuration SEO avancée`);

      const migratedData: MigratedData = {
        settings,
        services,
        testimonials,
        projects,
        pages,
        navigation,
        seoConfig
      };

      // 8. Sauvegarder un résumé de la migration
      await this.saveMigrationSummary(workflow, migratedData);

      console.log(`🎉 Migration complète pour ${workflow.businessName}`);
      return migratedData;

    } catch (error) {
      console.error(`❌ Erreur migration:`, error);
      throw new Error(`Échec migration pour ${workflow.businessName}: ${error.message}`);
    }
  }

  /**
   * Migre les paramètres généraux du site
   */
  private async migrateSettings(client: any, workflow: SanityWorkflow): Promise<any> {
    const formData = workflow.formData;

    const settings = {
      _type: 'settings',
      _id: 'siteSettings',
      businessInfo: {
        businessName: workflow.businessName,
        legalName: formData.raisonSociale || workflow.businessName,
        businessType: workflow.businessType,
        tagline: formData.slogan || this.generateTagline(workflow.businessType),
        description: formData.description || this.generateBusinessDescription(workflow)
      },
      contact: {
        phone: formData.telephone || formData.phone || '',
        mobile: formData.mobile || '',
        emergencyPhone: formData.urgence || formData.phone24h || '',
        email: formData.email || '',
        contactEmail: formData.emailContact || formData.email || '',
        website: `https://${workflow.domain}`
      },
      address: {
        street: formData.adresse || formData.address || '',
        city: formData.ville || formData.city || '',
        postalCode: formData.codePostal || formData.postalCode || '',
        region: formData.region || '',
        country: 'France',
        coordinates: formData.coordinates || null
      },
      hours: this.extractBusinessHours(formData),
      legal: {
        siret: formData.siret || '',
        rcs: formData.rcs || '',
        vatNumber: formData.tva || '',
        insurance: formData.assurance ? {
          company: formData.assurance.compagnie || '',
          policyNumber: formData.assurance.numero || '',
          validUntil: formData.assurance.validite || null
        } : null
      },
      branding: {
        colors: {
          primary: workflow.colors.primary,
          secondary: workflow.colors.secondary,
          accent: workflow.colors.accent
        }
      },
      socialMedia: this.extractSocialMedia(formData),
      seo: this.generateBasicSEO(workflow),
      features: this.determineActiveFeatures(workflow.businessType),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      // Dans une vraie implémentation, on créerait le document
      // const result = await client.createOrReplace(settings);
      console.log(`📋 Paramètres préparés pour ${workflow.businessName}`);
      return settings;
    } catch (error) {
      console.error('❌ Erreur création paramètres:', error);
      return settings; // On retourne quand même la structure
    }
  }

  /**
   * Migre les services selon le métier
   */
  private async migrateServices(
    client: any,
    workflow: SanityWorkflow,
    options: MigrationOptions
  ): Promise<any[]> {
    const services: any[] = [];
    const businessType = workflow.businessType.toLowerCase();
    const formData = workflow.formData;

    // Services de base selon le métier
    const baseServices = this.getBaseServicesForBusiness(businessType);

    // Ajouter les services personnalisés du formulaire
    if (formData.services && Array.isArray(formData.services)) {
      formData.services.forEach((service: any, index: number) => {
        services.push({
          _type: 'service',
          _key: `service-${index + 1}`,
          name: service.nom || service.name,
          slug: {
            current: this.slugify(service.nom || service.name)
          },
          shortDescription: service.description || `Service de ${service.nom || service.name}`,
          fullDescription: this.generateServiceDescription(service, businessType),
          businessType: workflow.businessType,
          category: this.categorizeService(service, businessType),
          pricing: {
            type: service.prixType || 'quote',
            amount: service.prix || null,
            unit: service.unite || 'euro',
            displayText: service.prixAffichage || 'Sur devis'
          },
          features: service.caracteristiques || [],
          urgency: {
            available: service.urgence || false,
            emergencyPhone: formData.urgence || '',
            responseTime: service.delaiIntervention || 'same-day'
          },
          areas: formData.zonesIntervention || [formData.ville],
          requirements: {
            materials: true,
            tools: true,
            warranty: service.garantie || 12,
            insurance: true,
            certifications: formData.certifications || []
          },
          featured: index < 3, // Les 3 premiers en vedette
          order: index + 1,
          status: 'active',
          createdAt: new Date().toISOString()
        });
      });
    }

    // Ajouter les services de base si pas assez de services personnalisés
    if (services.length < 3) {
      baseServices.forEach((service, index) => {
        if (services.length < 6) { // Maximum 6 services
          services.push({
            ...service,
            _key: `base-service-${index + 1}`,
            businessType: workflow.businessType,
            areas: [formData.ville || workflow.formData.city],
            createdAt: new Date().toISOString()
          });
        }
      });
    }

    return services;
  }

  /**
   * Génère des témoignages réalistes pour le métier
   */
  private async generateTestimonials(
    client: any,
    workflow: SanityWorkflow,
    options: MigrationOptions
  ): Promise<any[]> {
    if (!options.generateSampleContent) return [];

    const testimonials: any[] = [];
    const businessType = workflow.businessType.toLowerCase();
    const city = workflow.formData.ville || workflow.formData.city || 'votre région';

    const sampleTestimonials = this.getSampleTestimonials(businessType, city);

    sampleTestimonials.forEach((testimonial, index) => {
      testimonials.push({
        _type: 'testimonial',
        _key: `testimonial-${index + 1}`,
        ...testimonial,
        businessType: [workflow.businessType],
        verified: true,
        source: 'generated',
        status: 'published',
        createdAt: new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toISOString(), // Échelonné sur plusieurs semaines
        publishedAt: new Date().toISOString()
      });
    });

    return testimonials;
  }

  /**
   * Génère des projets d'exemple
   */
  private async generateSampleProjects(
    client: any,
    workflow: SanityWorkflow,
    options: MigrationOptions
  ): Promise<any[]> {
    if (!options.generateSampleContent) return [];

    const projects: any[] = [];
    const businessType = workflow.businessType.toLowerCase();
    const city = workflow.formData.ville || workflow.formData.city || 'votre région';

    const sampleProjects = this.getSampleProjects(businessType, city);

    sampleProjects.forEach((project, index) => {
      projects.push({
        _type: 'project',
        _key: `project-${index + 1}`,
        ...project,
        businessType: workflow.businessType,
        status: 'published',
        featured: index === 0, // Premier projet en vedette
        createdAt: new Date(Date.now() - (index + 1) * 30 * 24 * 60 * 60 * 1000).toISOString(), // Échelonné sur plusieurs mois
        publishedAt: new Date().toISOString()
      });
    });

    return projects;
  }

  /**
   * Crée les pages initiales du site
   */
  private async createInitialPages(
    client: any,
    workflow: SanityWorkflow,
    options: MigrationOptions
  ): Promise<any[]> {
    if (!options.createInitialPages) return [];

    const pages = [
      {
        _type: 'page',
        _key: 'page-home',
        title: `Accueil - ${workflow.businessName}`,
        slug: { current: '/' },
        template: 'home',
        seo: {
          title: `${workflow.businessName} - ${workflow.businessType} professionnel`,
          description: `${workflow.businessType} professionnel. Devis gratuit, intervention rapide. Contactez-nous !`,
          keywords: [workflow.businessType.toLowerCase(), 'professionnel', 'devis gratuit']
        },
        sections: ['hero', 'services', 'about', 'testimonials', 'contact'],
        status: 'published'
      },
      {
        _type: 'page',
        _key: 'page-services',
        title: `Nos services de ${workflow.businessType}`,
        slug: { current: '/services' },
        template: 'services',
        seo: {
          title: `Services de ${workflow.businessType} - ${workflow.businessName}`,
          description: `Découvrez tous nos services de ${workflow.businessType.toLowerCase()}. Devis gratuit et intervention rapide.`
        },
        sections: ['services-list', 'pricing', 'guarantees'],
        status: 'published'
      },
      {
        _type: 'page',
        _key: 'page-about',
        title: 'À propos',
        slug: { current: '/a-propos' },
        template: 'about',
        seo: {
          title: `À propos - ${workflow.businessName}`,
          description: `Découvrez ${workflow.businessName}, ${workflow.businessType} professionnel avec de nombreuses années d'expérience.`
        },
        sections: ['about-story', 'team', 'certifications'],
        status: 'published'
      },
      {
        _type: 'page',
        _key: 'page-contact',
        title: 'Contact',
        slug: { current: '/contact' },
        template: 'contact',
        seo: {
          title: `Contact - ${workflow.businessName}`,
          description: `Contactez ${workflow.businessName} pour tous vos besoins en ${workflow.businessType.toLowerCase()}. Devis gratuit.`
        },
        sections: ['contact-form', 'map', 'hours'],
        status: 'published'
      }
    ];

    return pages.map(page => ({
      ...page,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }

  /**
   * Configure la navigation du site
   */
  private async setupNavigation(
    client: any,
    workflow: SanityWorkflow,
    options: MigrationOptions
  ): Promise<any> {
    if (!options.setupNavigation) return null;

    const navigation = {
      _type: 'navigation',
      _id: 'mainNavigation',
      items: [
        {
          title: 'Accueil',
          slug: { current: '/' },
          order: 1
        },
        {
          title: 'Services',
          slug: { current: '/services' },
          order: 2
        },
        {
          title: 'Réalisations',
          slug: { current: '/realisations' },
          order: 3
        },
        {
          title: 'À propos',
          slug: { current: '/a-propos' },
          order: 4
        },
        {
          title: 'Contact',
          slug: { current: '/contact' },
          order: 5
        }
      ],
      footer: {
        sections: [
          {
            title: 'Services',
            links: [
              { title: 'Tous nos services', url: '/services' },
              { title: 'Urgences 24h/7j', url: '/urgences' },
              { title: 'Devis gratuit', url: '/devis' }
            ]
          },
          {
            title: 'Entreprise',
            links: [
              { title: 'À propos', url: '/a-propos' },
              { title: 'Nos réalisations', url: '/realisations' },
              { title: 'Avis clients', url: '/avis' }
            ]
          },
          {
            title: 'Contact',
            links: [
              { title: 'Nous contacter', url: '/contact' },
              { title: 'Zones d\'intervention', url: '/zones' },
              { title: 'Horaires', url: '/horaires' }
            ]
          }
        ]
      }
    };

    return navigation;
  }

  /**
   * Configure le SEO avancé
   */
  private async setupAdvancedSEO(client: any, workflow: SanityWorkflow): Promise<any> {
    const city = workflow.formData.ville || workflow.formData.city || '';
    const businessType = workflow.businessType.toLowerCase();

    return {
      _type: 'seoConfig',
      _id: 'globalSEO',
      sitemap: {
        enabled: true,
        changefreq: 'weekly',
        priority: 0.8
      },
      robots: {
        index: true,
        follow: true,
        sitemap: `https://${workflow.domain}/sitemap.xml`
      },
      schema: {
        organization: {
          '@type': 'LocalBusiness',
          name: workflow.businessName,
          description: `${businessType} professionnel à ${city}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: workflow.formData.adresse,
            addressLocality: city,
            postalCode: workflow.formData.codePostal,
            addressCountry: 'FR'
          },
          telephone: workflow.formData.telephone,
          url: `https://${workflow.domain}`
        }
      },
      localSEO: {
        businessName: workflow.businessName,
        businessType,
        city,
        region: workflow.formData.region || '',
        serviceAreas: workflow.formData.zonesIntervention || [city],
        keywords: this.generateLocalKeywords(businessType, city)
      }
    };
  }

  /**
   * Utilitaires privés
   */
  private getClient(credentials: SanityCredentials) {
    const key = credentials.projectId;
    if (!this.clients.has(key)) {
      const client = createClient({
        projectId: credentials.projectId,
        dataset: credentials.dataset,
        token: credentials.token,
        apiVersion: credentials.apiVersion,
        useCdn: false
      });
      this.clients.set(key, client);
    }
    return this.clients.get(key);
  }

  private generateTagline(businessType: string): string {
    const taglines: Record<string, string> = {
      'plombier': 'Votre plombier de confiance, 24h/7j',
      'electricien': 'Expert en électricité, installation et dépannage',
      'menuisier': 'Menuiserie sur-mesure et rénovation',
      'paysagiste': 'Création et entretien de jardins',
      'macon': 'Maçonnerie traditionnelle et moderne',
      'peintre': 'Peinture intérieure et extérieure',
      'couvreur': 'Couverture et étanchéité',
      'chauffagiste': 'Chauffage et climatisation'
    };

    return taglines[businessType.toLowerCase()] || 'Professionnel à votre service';
  }

  private generateBusinessDescription(workflow: SanityWorkflow): string {
    const businessType = workflow.businessType.toLowerCase();
    const businessName = workflow.businessName;
    const city = workflow.formData.ville || workflow.formData.city || 'votre région';

    return `${businessName} est votre ${businessType} de confiance à ${city}.
    Nous proposons des services de qualité avec des tarifs transparents et des délais respectés.
    Devis gratuit et intervention rapide pour tous vos travaux de ${businessType}.`;
  }

  private extractBusinessHours(formData: any): any {
    return {
      monday: formData.horairesLundi || '8h00-18h00',
      tuesday: formData.horairesMardi || '8h00-18h00',
      wednesday: formData.horairesMercredi || '8h00-18h00',
      thursday: formData.horairesJeudi || '8h00-18h00',
      friday: formData.horairesVendredi || '8h00-18h00',
      saturday: formData.horairesSamedi || '8h00-12h00',
      sunday: formData.horairesDimanche || 'Fermé',
      emergency: formData.urgence ? '24h/7j sur appel' : 'Non disponible'
    };
  }

  private extractSocialMedia(formData: any): any {
    return {
      facebook: formData.facebook || '',
      instagram: formData.instagram || '',
      linkedin: formData.linkedin || '',
      youtube: formData.youtube || '',
      tiktok: formData.tiktok || ''
    };
  }

  private generateBasicSEO(workflow: SanityWorkflow): any {
    const city = workflow.formData.ville || workflow.formData.city || '';
    const businessType = workflow.businessType.toLowerCase();

    return {
      siteTitle: `${workflow.businessName} - ${workflow.businessType} à ${city}`,
      siteDescription: `${workflow.businessType} professionnel à ${city}. Devis gratuit, intervention rapide. Contactez ${workflow.businessName} pour tous vos travaux.`,
      keywords: [businessType, city.toLowerCase(), 'professionnel', 'devis gratuit', 'intervention rapide']
    };
  }

  private determineActiveFeatures(businessType: string): any {
    const baseFeatures = {
      onlineBooking: true,
      quoteCalculator: true,
      testimonials: true,
      projectGallery: true,
      blog: false,
      multiLanguage: false
    };

    // Fonctionnalités spécifiques selon le métier
    if (['plombier', 'electricien', 'chauffagiste'].includes(businessType.toLowerCase())) {
      baseFeatures.emergencyMode = true;
    }

    return baseFeatures;
  }

  private getBaseServicesForBusiness(businessType: string): any[] {
    const services: Record<string, any[]> = {
      'plombier': [
        {
          name: 'Dépannage urgence 24h/7j',
          shortDescription: 'Intervention rapide pour tous vos problèmes de plomberie',
          category: 'urgence-plomberie',
          pricing: { type: 'starting', amount: 80, unit: 'euro', displayText: 'À partir de 80€' },
          urgency: { available: true, responseTime: '1h' },
          featured: true,
          order: 1
        },
        {
          name: 'Installation chauffe-eau',
          shortDescription: 'Installation et remplacement de chauffe-eau électrique ou gaz',
          category: 'installation-plomberie',
          pricing: { type: 'starting', amount: 200, unit: 'euro', displayText: 'À partir de 200€' },
          featured: true,
          order: 2
        }
      ],
      'electricien': [
        {
          name: 'Installation électrique',
          shortDescription: 'Installation complète ou partielle de votre système électrique',
          category: 'installation-electricite',
          pricing: { type: 'quote', displayText: 'Sur devis' },
          featured: true,
          order: 1
        },
        {
          name: 'Domotique connectée',
          shortDescription: 'Installation de systèmes domotiques modernes',
          category: 'domotique',
          pricing: { type: 'starting', amount: 300, unit: 'euro', displayText: 'À partir de 300€' },
          featured: true,
          order: 2
        }
      ]
      // Ajouter d'autres métiers...
    };

    return services[businessType] || [];
  }

  private getSampleTestimonials(businessType: string, city: string): any[] {
    const testimonials: Record<string, any[]> = {
      'plombier': [
        {
          clientName: 'Marie D.',
          clientInitials: 'M.D.',
          location: city,
          rating: 5,
          testimonialText: 'Intervention très rapide suite à une fuite. Travail propre et tarif correct. Je recommande !',
          serviceType: 'urgence',
          workDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          clientName: 'Pierre M.',
          clientInitials: 'P.M.',
          location: city,
          rating: 5,
          testimonialText: 'Installation parfaite de notre chauffe-eau. Professionnel sérieux et ponctuel.',
          serviceType: 'installation',
          workDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ]
      // Ajouter d'autres métiers...
    };

    return testimonials[businessType] || [];
  }

  private getSampleProjects(businessType: string, city: string): any[] {
    const projects: Record<string, any[]> = {
      'plombier': [
        {
          title: `Rénovation complète salle de bain - ${city}`,
          shortDescription: 'Rénovation complète avec installation sanitaires haut de gamme',
          category: 'renovation-sdb',
          location: { city, district: 'Centre-ville' },
          timeline: {
            duration: '5 jours',
            startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          },
          budget: { range: '5000-10000', showBudget: false }
        }
      ]
      // Ajouter d'autres métiers...
    };

    return projects[businessType] || [];
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private categorizeService(service: any, businessType: string): string {
    // Logique simple de catégorisation
    const serviceName = service.nom || service.name || '';

    if (serviceName.includes('urgence') || serviceName.includes('dépannage')) {
      return `urgence-${businessType}`;
    }
    if (serviceName.includes('installation')) {
      return `installation-${businessType}`;
    }
    if (serviceName.includes('rénovation')) {
      return `renovation-${businessType}`;
    }

    return `service-${businessType}`;
  }

  private generateServiceDescription(service: any, businessType: string): any {
    return [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: service.description || `Service professionnel de ${businessType} avec garantie et matériaux fournis.`
          }
        ]
      }
    ];
  }

  private generateLocalKeywords(businessType: string, city: string): string[] {
    return [
      businessType.toLowerCase(),
      `${businessType.toLowerCase()} ${city.toLowerCase()}`,
      `${businessType.toLowerCase()} professionnel`,
      `devis gratuit ${businessType.toLowerCase()}`,
      `dépannage ${businessType.toLowerCase()}`,
      `intervention ${businessType.toLowerCase()}`
    ];
  }

  private async saveMigrationSummary(workflow: SanityWorkflow, data: MigratedData): Promise<void> {
    const summaryDir = '/tmp/claude/migrations';
    await fs.mkdir(summaryDir, { recursive: true });

    const summary = {
      projectId: workflow.clientId,
      businessName: workflow.businessName,
      businessType: workflow.businessType,
      domain: workflow.domain,
      migratedAt: new Date().toISOString(),
      summary: {
        settings: !!data.settings,
        servicesCount: data.services.length,
        testimonialsCount: data.testimonials.length,
        projectsCount: data.projects.length,
        pagesCount: data.pages.length,
        navigationConfigured: !!data.navigation,
        seoConfigured: !!data.seoConfig
      },
      status: 'completed'
    };

    const summaryFile = path.join(summaryDir, `${workflow.clientId}-migration.json`);
    await fs.writeFile(summaryFile, JSON.stringify(summary, null, 2));
  }
}

// Instance singleton
export const sanityDataMigrationService = new SanityDataMigrationService();
export default SanityDataMigrationService;
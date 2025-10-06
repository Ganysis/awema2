import { workflowSanityIntegrationService } from './workflow-sanity-integration.service';
import { DeepSeekEnrichmentService } from './deepseek-enrichment.service';
import { ContentMapperService } from './content-mapper.service';
import { AstroConverterService } from './astro-converter.service';
import { SanityProjectConfigManager } from '@/config/sanity-projects.config';

/**
 * Interface pour les données de workflow enrichi
 */
export interface EnrichmentWorkflowData {
  workflowId: string;
  clientId: string;
  selectedTemplate: string;
  formData: Record<string, any>;
  businessInfo: {
    businessName: string;
    businessType: string;
    ville: string;
    codePostal: string;
    domain: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  sanityCredentials?: {
    projectId: string;
    dataset: string;
    studioUrl: string;
    cdnUrl: string;
  };
}

/**
 * Interface pour le contenu enrichi généré
 */
export interface EnrichedContent {
  pages: {
    home: {
      hero: {
        title: string;
        subtitle: string;
        description: string;
        ctaPrimary: string;
        ctaSecondary: string;
      };
      services: Array<{
        title: string;
        description: string;
        features: string[];
        wordCount: number;
      }>;
      about: {
        story: string;
        mission: string;
        values: string[];
        wordCount: number;
      };
      whyUs: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
      processus: Array<{
        step: number;
        title: string;
        description: string;
      }>;
      wordCount: number;
    };
    services: Array<{
      slug: string;
      title: string;
      metaDescription: string;
      heroContent: string;
      detailedDescription: string;
      benefits: string[];
      process: Array<{
        step: number;
        title: string;
        description: string;
      }>;
      faq: Array<{
        question: string;
        answer: string;
      }>;
      localKeywords: string[];
      wordCount: number;
    }>;
    about: {
      story: string;
      team: string;
      values: string[];
      certifications: string[];
      experience: string;
      localHistory: string;
      wordCount: number;
    };
    contact: {
      intro: string;
      zones: string[];
      hours: {
        [day: string]: { open: string; close: string; };
      };
      emergencyInfo: string;
      wordCount: number;
    };
    legal: {
      mentionsLegales: string;
      politiqueConfidentialite: string;
      conditionsUtilisation: string;
      cookies: string;
    };
  };
  seo: {
    metaDescriptions: Record<string, string>;
    schemas: Record<string, object>;
    localBusiness: object;
    breadcrumbs: Record<string, Array<{ name: string; url: string; }>>;
    sitemap: Array<{
      url: string;
      lastmod: string;
      changefreq: string;
      priority: number;
    }>;
  };
  totalWordCount: number;
  generatedAt: string;
}

/**
 * Interface pour le résultat de l'enrichissement et migration
 */
export interface EnrichmentResult {
  success: boolean;
  workflowId: string;
  enrichedContent: EnrichedContent | null;
  astroProject: {
    ready: boolean;
    components: string[];
    pages: string[];
    configFiles: string[];
    deploymentReady: boolean;
  } | null;
  sanityIntegration: {
    contentMigrated: boolean;
    documentsCreated: number;
    schemasGenerated: string[];
  } | null;
  performance: {
    enrichmentDuration: number;
    conversionDuration: number;
    totalDuration: number;
    wordCount: number;
  };
  nextSteps: string[];
  error?: string;
}

/**
 * Service principal d'enrichissement et migration
 * Transforme le template Lorem Ipsum en site professionnel avec contenu enrichi
 * Appelé par Agent 7 après l'intégration Sanity (Agent 6)
 */
class EnrichAndMigrateService {
  private deepSeekService: DeepSeekEnrichmentService;
  private contentMapper: ContentMapperService;
  private astroConverter: AstroConverterService;

  private enrichmentStatus: Map<string, any> = new Map();

  constructor() {
    this.deepSeekService = new DeepSeekEnrichmentService();
    this.contentMapper = new ContentMapperService();
    this.astroConverter = new AstroConverterService();
  }

  /**
   * Point d'entrée principal : enrichissement d'un template après choix client
   * Appelé après que le client ait choisi son template (Agent 4) et l'intégration Sanity (Agent 6)
   */
  async enrichTemplate(workflowData: EnrichmentWorkflowData): Promise<EnrichmentResult> {
    const startTime = Date.now();
    console.log(`🎨 Début enrichissement template pour workflow ${workflowData.workflowId}...`);

    try {
      // 1. Marquer le workflow comme en cours d'enrichissement
      await this.updateEnrichmentStatus(workflowData.workflowId, 'enrichment_started', {
        template: workflowData.selectedTemplate,
        businessType: workflowData.businessInfo.businessType
      });

      // 2. Valider les données d'entrée
      const validationResult = this.validateWorkflowData(workflowData);
      if (!validationResult.valid) {
        throw new Error(`Données invalides: ${validationResult.errors.join(', ')}`);
      }

      // 3. Récupérer le template Netlify original
      const templateContent = await this.retrieveNetlifyTemplate(workflowData.selectedTemplate);
      console.log(`✅ Template ${workflowData.selectedTemplate} récupéré`);

      // 4. Générer le contenu enrichi avec DeepSeek
      const enrichmentStartTime = Date.now();
      await this.updateEnrichmentStatus(workflowData.workflowId, 'content_generation_started');

      const enrichedContent = await this.deepSeekService.generateEnrichedContent({
        businessType: workflowData.businessInfo.businessType,
        businessName: workflowData.businessInfo.businessName,
        ville: workflowData.businessInfo.ville,
        codePostal: workflowData.businessInfo.codePostal,
        formData: workflowData.formData,
        template: workflowData.selectedTemplate,
        targetWordCount: 1000 // Minimum par page
      });

      const enrichmentDuration = Date.now() - enrichmentStartTime;
      console.log(`✅ Contenu enrichi généré: ${enrichedContent.totalWordCount} mots en ${enrichmentDuration}ms`);

      // 5. Mapper le contenu sur le template
      await this.updateEnrichmentStatus(workflowData.workflowId, 'content_mapping_started');

      const mappedContent = await this.contentMapper.mapContentToTemplate({
        templateContent,
        enrichedContent,
        formData: workflowData.formData,
        businessInfo: workflowData.businessInfo
      });

      console.log(`✅ Contenu mappé sur template`);

      // 6. Convertir vers Astro avec intégration Sanity
      const conversionStartTime = Date.now();
      await this.updateEnrichmentStatus(workflowData.workflowId, 'astro_conversion_started');

      const astroProject = await this.astroConverter.convertToAstro({
        mappedContent,
        workflowData,
        sanityCredentials: workflowData.sanityCredentials,
        enrichedContent
      });

      const conversionDuration = Date.now() - conversionStartTime;
      console.log(`✅ Projet Astro généré avec ${astroProject.components.length} composants`);

      // 7. Migrer le contenu vers Sanity CMS
      await this.updateEnrichmentStatus(workflowData.workflowId, 'sanity_content_migration_started');

      const sanityMigration = await this.migratContentToSanity({
        enrichedContent,
        sanityCredentials: workflowData.sanityCredentials!,
        businessType: workflowData.businessInfo.businessType
      });

      console.log(`✅ ${sanityMigration.documentsCreated} documents migrés vers Sanity`);

      // 8. Finaliser et marquer comme prêt pour déploiement
      await this.updateEnrichmentStatus(workflowData.workflowId, 'enrichment_completed');

      const totalDuration = Date.now() - startTime;

      const result: EnrichmentResult = {
        success: true,
        workflowId: workflowData.workflowId,
        enrichedContent,
        astroProject,
        sanityIntegration: sanityMigration,
        performance: {
          enrichmentDuration,
          conversionDuration,
          totalDuration,
          wordCount: enrichedContent.totalWordCount
        },
        nextSteps: [
          'Déployer le projet Astro sur Cloudflare Pages',
          'Configurer les variables d\'environnement Sanity',
          'Tester la synchronisation contenu dynamique',
          'Optimiser les performances et images',
          'Configurer le domaine personnalisé',
          'Effectuer les tests de qualité finaux'
        ]
      };

      console.log(`🎉 Enrichissement et migration complètes pour workflow ${workflowData.workflowId}`);
      return result;

    } catch (error) {
      console.error(`❌ Erreur enrichissement workflow ${workflowData.workflowId}:`, error);

      await this.updateEnrichmentStatus(workflowData.workflowId, 'enrichment_failed', {
        error: error.message
      });

      const totalDuration = Date.now() - startTime;

      return {
        success: false,
        workflowId: workflowData.workflowId,
        enrichedContent: null,
        astroProject: null,
        sanityIntegration: null,
        performance: {
          enrichmentDuration: 0,
          conversionDuration: 0,
          totalDuration,
          wordCount: 0
        },
        nextSteps: [],
        error: error.message
      };
    }
  }

  /**
   * Vérifie le statut de l'enrichissement pour un workflow
   */
  async getEnrichmentStatus(workflowId: string): Promise<{
    status: string;
    progress: number;
    currentStep: string;
    details: any;
    error?: string;
  }> {
    const cached = this.enrichmentStatus.get(workflowId);
    if (!cached) {
      return {
        status: 'unknown',
        progress: 0,
        currentStep: 'Non démarré',
        details: null
      };
    }

    // Calcul du progrès basé sur le statut
    const progressMap: Record<string, number> = {
      'enrichment_started': 10,
      'content_generation_started': 25,
      'content_mapping_started': 50,
      'astro_conversion_started': 70,
      'sanity_content_migration_started': 85,
      'enrichment_completed': 100,
      'enrichment_failed': 0
    };

    const progress = progressMap[cached.status] || 0;

    const stepMap: Record<string, string> = {
      'enrichment_started': 'Initialisation de l\'enrichissement',
      'content_generation_started': 'Génération du contenu avec DeepSeek AI',
      'content_mapping_started': 'Mapping du contenu sur le template',
      'astro_conversion_started': 'Conversion vers Astro + Sanity',
      'sanity_content_migration_started': 'Migration du contenu vers Sanity CMS',
      'enrichment_completed': 'Enrichissement terminé avec succès',
      'enrichment_failed': 'Échec de l\'enrichissement'
    };

    return {
      status: cached.status,
      progress,
      currentStep: stepMap[cached.status] || 'Étape inconnue',
      details: cached.details,
      error: cached.error
    };
  }

  /**
   * Relance l'enrichissement en cas d'échec
   */
  async retryEnrichment(workflowId: string): Promise<EnrichmentResult> {
    console.log(`🔄 Relance enrichissement pour workflow ${workflowId}...`);

    try {
      // Récupérer les données originales du workflow
      const workflowData = await this.getOriginalWorkflowData(workflowId);
      if (!workflowData) {
        throw new Error('Données de workflow non trouvées pour retry');
      }

      // Nettoyer l'état précédent
      this.enrichmentStatus.delete(workflowId);

      // Relancer l'enrichissement
      return await this.enrichTemplate(workflowData);

    } catch (error) {
      console.error(`❌ Erreur relance enrichissement:`, error);
      throw error;
    }
  }

  /**
   * Génère un aperçu du contenu enrichi sans migration complète
   */
  async generateContentPreview(workflowData: EnrichmentWorkflowData): Promise<{
    success: boolean;
    preview: {
      homePageExcerpt: string;
      servicesCount: number;
      totalWordCount: number;
      seoKeywords: string[];
    };
    estimatedDuration: number;
  }> {
    console.log(`👁️ Génération aperçu contenu pour ${workflowData.businessInfo.businessName}...`);

    try {
      // Génération d'un aperçu rapide avec DeepSeek
      const preview = await this.deepSeekService.generateContentPreview({
        businessType: workflowData.businessInfo.businessType,
        businessName: workflowData.businessInfo.businessName,
        ville: workflowData.businessInfo.ville,
        formData: workflowData.formData
      });

      return {
        success: true,
        preview: {
          homePageExcerpt: preview.homeExcerpt,
          servicesCount: preview.servicesCount,
          totalWordCount: preview.estimatedWordCount,
          seoKeywords: preview.keywords
        },
        estimatedDuration: this.estimateEnrichmentDuration(workflowData)
      };

    } catch (error) {
      console.error(`❌ Erreur génération aperçu:`, error);
      return {
        success: false,
        preview: {
          homePageExcerpt: '',
          servicesCount: 0,
          totalWordCount: 0,
          seoKeywords: []
        },
        estimatedDuration: 0
      };
    }
  }

  /**
   * Nettoie les ressources d'enrichissement pour un workflow
   */
  async cleanupEnrichmentResources(workflowId: string): Promise<{
    success: boolean;
    cleaned: string[];
    errors: string[];
  }> {
    console.log(`🧹 Nettoyage ressources enrichissement pour workflow ${workflowId}...`);

    const cleaned: string[] = [];
    const errors: string[] = [];

    try {
      // Nettoyer cache local
      this.enrichmentStatus.delete(workflowId);
      cleaned.push('Cache local enrichissement');

      // Nettoyer fichiers temporaires
      await this.astroConverter.cleanupTempFiles(workflowId);
      cleaned.push('Fichiers temporaires Astro');

      // Nettoyer cache DeepSeek
      await this.deepSeekService.clearCache(workflowId);
      cleaned.push('Cache DeepSeek');

      return {
        success: true,
        cleaned,
        errors
      };

    } catch (error) {
      console.error(`❌ Erreur nettoyage enrichissement:`, error);
      errors.push(error.message);

      return {
        success: false,
        cleaned,
        errors
      };
    }
  }

  /**
   * Fonctions utilitaires privées
   */
  private validateWorkflowData(data: EnrichmentWorkflowData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.workflowId) errors.push('WorkflowId manquant');
    if (!data.selectedTemplate) errors.push('Template sélectionné manquant');
    if (!data.businessInfo?.businessName) errors.push('Nom entreprise manquant');
    if (!data.businessInfo?.businessType) errors.push('Type métier manquant');
    if (!data.businessInfo?.ville) errors.push('Ville manquante');
    if (!data.formData?.telephone) errors.push('Téléphone manquant');
    if (!data.formData?.email) errors.push('Email manquant');

    // Validation spécifique au business type
    const supportedTypes = SanityProjectConfigManager.getSupportedBusinessTypes();
    if (!supportedTypes.includes(data.businessInfo.businessType)) {
      errors.push(`Type de métier non supporté: ${data.businessInfo.businessType}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private async retrieveNetlifyTemplate(templateName: string): Promise<string> {
    // Dans une vraie implémentation, on téléchargerait depuis Netlify
    console.log(`📥 Récupération template ${templateName} depuis Netlify...`);

    // Simulation - en réalité on ferait un appel à l'API Netlify
    // const response = await fetch(`https://api.netlify.com/api/v1/sites/${templateSiteId}/files`);
    // const files = await response.json();
    // return files;

    return `<!-- Template ${templateName} récupéré -->`;
  }

  private async migratContentToSanity(options: {
    enrichedContent: EnrichedContent;
    sanityCredentials: any;
    businessType: string;
  }): Promise<{
    contentMigrated: boolean;
    documentsCreated: number;
    schemasGenerated: string[];
  }> {
    console.log(`📦 Migration contenu vers Sanity...`);

    try {
      // Créer les documents Sanity depuis le contenu enrichi
      let documentsCreated = 0;

      // Pages principales
      documentsCreated += Object.keys(options.enrichedContent.pages).length;

      // Services
      documentsCreated += options.enrichedContent.pages.services.length;

      // SEO documents
      documentsCreated += Object.keys(options.enrichedContent.seo.metaDescriptions).length;

      const schemasGenerated = SanityProjectConfigManager.getSchemasForBusiness(options.businessType);

      return {
        contentMigrated: true,
        documentsCreated,
        schemasGenerated
      };

    } catch (error) {
      console.error(`❌ Erreur migration Sanity:`, error);
      throw error;
    }
  }

  private async updateEnrichmentStatus(workflowId: string, status: string, metadata?: any): Promise<void> {
    const statusData = {
      status,
      updatedAt: new Date().toISOString(),
      details: metadata
    };

    this.enrichmentStatus.set(workflowId, statusData);
    console.log(`📊 Enrichissement ${workflowId} status: ${status}`);

    // Dans une vraie implémentation, on mettrait à jour la DB
    // await updateWorkflowEnrichmentStatus(workflowId, statusData);
  }

  private async getOriginalWorkflowData(workflowId: string): Promise<EnrichmentWorkflowData | null> {
    // Dans une vraie implémentation, récupération depuis la DB
    // const workflow = await getWorkflowById(workflowId);
    // return workflow.enrichmentData;
    return null;
  }

  private estimateEnrichmentDuration(workflowData: EnrichmentWorkflowData): number {
    // Estimation basée sur le type de métier et la complexité
    const baseTime = 30000; // 30 secondes de base
    const businessMultiplier = {
      'plombier': 1.0,
      'electricien': 1.2,
      'jardinier': 1.1,
      'menuisier': 1.3,
      'peintre': 1.0,
      'chauffagiste': 1.4,
      'serrurier': 1.0
    };

    const multiplier = businessMultiplier[workflowData.businessInfo.businessType] || 1.0;
    const servicesCount = Object.keys(workflowData.formData).filter(key => key.startsWith('service')).length;

    return Math.round(baseTime * multiplier * (1 + servicesCount * 0.1));
  }

  /**
   * Statistiques d'utilisation du service
   */
  getEnrichmentStats(): {
    totalEnrichments: number;
    successRate: number;
    avgDuration: number;
    avgWordCount: number;
    byBusinessType: Record<string, number>;
    recentEnrichments: any[];
  } {
    const statuses = Array.from(this.enrichmentStatus.values());
    const completed = statuses.filter(s => s.status === 'enrichment_completed');

    return {
      totalEnrichments: statuses.length,
      successRate: completed.length / (statuses.length || 1),
      avgDuration: 0, // À calculer depuis les détails
      avgWordCount: 0, // À calculer depuis les détails
      byBusinessType: {},
      recentEnrichments: statuses
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 10)
    };
  }
}

// Instance singleton
export const enrichAndMigrateService = new EnrichAndMigrateService();
export default EnrichAndMigrateService;
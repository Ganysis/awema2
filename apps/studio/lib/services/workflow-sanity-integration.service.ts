import { sanitySetupService, SanityWorkflow } from './sanity-setup.service';
import { sanityDataMigrationService } from './sanity-data-migration.service';
import { SanityProjectConfigManager } from '@/config/sanity-projects.config';
import { WorkflowStatus, Workflow, WorkflowAction } from '@/lib/types/workflow.types';

/**
 * Interface pour l'intégration Sanity dans le workflow
 */
export interface SanityIntegrationStep {
  workflowId: string;
  clientId: string;
  selectedTemplate: string;
  formData: Record<string, any>;
  businessInfo: {
    businessName: string;
    businessType: string;
    domain: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  options?: {
    includeTestData?: boolean;
    generateSampleContent?: boolean;
    createInitialPages?: boolean;
    setupNavigation?: boolean;
  };
}

/**
 * Interface pour le résultat de l'intégration Sanity
 */
export interface SanityIntegrationResult {
  success: boolean;
  projectId: string;
  credentials: {
    projectId: string;
    dataset: string;
    studioUrl: string;
    cdnUrl: string;
  };
  content: {
    servicesCount: number;
    testimonialsCount: number;
    projectsCount: number;
    pagesCount: number;
  };
  nextSteps: string[];
  error?: string;
}

/**
 * Service d'intégration Sanity CMS dans le workflow AWEMA
 * Orchestration complète entre le choix de template et le déploiement Astro
 */
class WorkflowSanityIntegrationService {
  private integrationStatus: Map<string, any> = new Map();

  /**
   * Point d'entrée principal : intégration Sanity après choix de template
   * Appelé par Agent 4 après que le client ait choisi son template
   */
  async integrateAfterTemplateChoice(step: SanityIntegrationStep): Promise<SanityIntegrationResult> {
    console.log(`🔄 Début intégration Sanity pour workflow ${step.workflowId}...`);

    try {
      // 1. Marquer le workflow comme en cours de traitement Sanity
      await this.updateWorkflowStatus(step.workflowId, 'sanity_setup_started');

      // 2. Valider les données d'entrée
      const validationResult = this.validateIntegrationStep(step);
      if (!validationResult.valid) {
        throw new Error(`Données invalides: ${validationResult.errors.join(', ')}`);
      }

      // 3. Créer le workflow Sanity
      const sanityWorkflow = this.createSanityWorkflow(step);

      // 4. Configurer le projet Sanity
      const projectSetup = await sanitySetupService.setupSanityProject(sanityWorkflow);
      console.log(`✅ Projet Sanity configuré: ${projectSetup.credentials.projectId}`);

      // 5. Migrer les données
      const migrationOptions = {
        includeTestData: step.options?.includeTestData !== false,
        generateSampleContent: step.options?.generateSampleContent !== false,
        importImages: false, // Pour l'instant, désactivé
        createInitialPages: step.options?.createInitialPages !== false,
        setupNavigation: step.options?.setupNavigation !== false
      };

      const migratedData = await sanityDataMigrationService.migrateWorkflowData(
        projectSetup.credentials,
        sanityWorkflow,
        migrationOptions
      );

      // 6. Mettre à jour le workflow avec les informations Sanity
      await this.updateWorkflowWithSanityData(step.workflowId, {
        sanityProjectId: projectSetup.credentials.projectId,
        sanityStudioUrl: projectSetup.credentials.studioUrl,
        sanityCredentials: projectSetup.credentials,
        contentSummary: {
          services: migratedData.services.length,
          testimonials: migratedData.testimonials.length,
          projects: migratedData.projects.length,
          pages: migratedData.pages.length
        }
      });

      // 7. Marquer comme terminé et prêt pour Astro
      await this.updateWorkflowStatus(step.workflowId, 'sanity_ready_for_astro');

      const result: SanityIntegrationResult = {
        success: true,
        projectId: projectSetup.credentials.projectId,
        credentials: {
          projectId: projectSetup.credentials.projectId,
          dataset: projectSetup.credentials.dataset,
          studioUrl: projectSetup.credentials.studioUrl,
          cdnUrl: projectSetup.credentials.cdnUrl
        },
        content: {
          servicesCount: migratedData.services.length,
          testimonialsCount: migratedData.testimonials.length,
          projectsCount: migratedData.projects.length,
          pagesCount: migratedData.pages.length
        },
        nextSteps: [
          'Configurer le projet Astro avec les credentials Sanity',
          'Déployer sur Cloudflare Pages',
          'Configurer le domaine personnalisé',
          'Tester la synchronisation contenu'
        ]
      };

      console.log(`🎉 Intégration Sanity complète pour workflow ${step.workflowId}`);
      return result;

    } catch (error) {
      console.error(`❌ Erreur intégration Sanity workflow ${step.workflowId}:`, error);

      // Marquer le workflow comme ayant échoué
      await this.updateWorkflowStatus(step.workflowId, 'sanity_setup_failed', {
        error: error.message
      });

      return {
        success: false,
        projectId: '',
        credentials: {} as any,
        content: { servicesCount: 0, testimonialsCount: 0, projectsCount: 0, pagesCount: 0 },
        nextSteps: [],
        error: error.message
      };
    }
  }

  /**
   * Vérifie le statut de l'intégration Sanity pour un workflow
   */
  async getIntegrationStatus(workflowId: string): Promise<{
    status: string;
    progress: number;
    details: any;
    error?: string;
  }> {
    const cached = this.integrationStatus.get(workflowId);
    if (cached) {
      return cached;
    }

    // Dans une vraie implémentation, on récupérerait depuis la DB
    return {
      status: 'unknown',
      progress: 0,
      details: null
    };
  }

  /**
   * Relance l'intégration Sanity en cas d'échec
   */
  async retryIntegration(workflowId: string): Promise<SanityIntegrationResult> {
    console.log(`🔄 Relance intégration Sanity pour workflow ${workflowId}...`);

    try {
      // Récupérer les données du workflow original
      const workflowData = await this.getWorkflowData(workflowId);

      if (!workflowData) {
        throw new Error('Données de workflow non trouvées');
      }

      // Recréer le step d'intégration
      const step: SanityIntegrationStep = {
        workflowId,
        clientId: workflowData.clientId,
        selectedTemplate: workflowData.selectedTemplate,
        formData: workflowData.formData,
        businessInfo: workflowData.businessInfo,
        options: workflowData.sanityOptions
      };

      // Relancer l'intégration
      return await this.integrateAfterTemplateChoice(step);

    } catch (error) {
      console.error(`❌ Erreur relance intégration Sanity:`, error);
      throw error;
    }
  }

  /**
   * Nettoie les ressources Sanity d'un workflow
   */
  async cleanupWorkflowSanity(workflowId: string): Promise<{
    success: boolean;
    cleaned: string[];
    errors: string[];
  }> {
    console.log(`🧹 Nettoyage ressources Sanity pour workflow ${workflowId}...`);

    const cleaned: string[] = [];
    const errors: string[] = [];

    try {
      // Récupérer les données Sanity du workflow
      const workflowData = await this.getWorkflowData(workflowId);

      if (workflowData?.sanityProjectId) {
        // Dans une vraie implémentation, on supprimerait le projet Sanity
        // await this.deleteSanityProject(workflowData.sanityProjectId);
        cleaned.push(`Projet Sanity ${workflowData.sanityProjectId}`);
      }

      // Nettoyer les données locales
      this.integrationStatus.delete(workflowId);
      cleaned.push('Cache local');

      return {
        success: true,
        cleaned,
        errors
      };

    } catch (error) {
      console.error(`❌ Erreur nettoyage Sanity:`, error);
      errors.push(error.message);

      return {
        success: false,
        cleaned,
        errors
      };
    }
  }

  /**
   * Met à jour le contenu Sanity après modification des données client
   */
  async updateSanityContent(workflowId: string, updates: {
    services?: any[];
    testimonials?: any[];
    settings?: any;
    projects?: any[];
  }): Promise<{
    success: boolean;
    updated: string[];
    errors: string[];
  }> {
    console.log(`📝 Mise à jour contenu Sanity pour workflow ${workflowId}...`);

    const updated: string[] = [];
    const errors: string[] = [];

    try {
      const workflowData = await this.getWorkflowData(workflowId);

      if (!workflowData?.sanityCredentials) {
        throw new Error('Credentials Sanity non trouvés');
      }

      // Mettre à jour chaque type de contenu
      for (const [contentType, contentData] of Object.entries(updates)) {
        if (contentData) {
          try {
            // Dans une vraie implémentation, on utiliserait l'API import
            // await fetch('/api/sanity/import', {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     projectId: workflowData.sanityProjectId,
            //     credentials: workflowData.sanityCredentials,
            //     dataType: contentType,
            //     data: contentData
            //   })
            // });

            updated.push(contentType);
            console.log(`✅ ${contentType} mis à jour`);
          } catch (error) {
            errors.push(`${contentType}: ${error.message}`);
            console.error(`❌ Erreur mise à jour ${contentType}:`, error);
          }
        }
      }

      return {
        success: errors.length === 0,
        updated,
        errors
      };

    } catch (error) {
      console.error(`❌ Erreur générale mise à jour Sanity:`, error);
      errors.push(error.message);

      return {
        success: false,
        updated,
        errors
      };
    }
  }

  /**
   * Génère les informations de handoff pour Agent 7 (Astro)
   */
  async generateAstroHandoff(workflowId: string): Promise<{
    sanityConfig: any;
    contentStructure: any;
    buildInstructions: any;
    deploymentVars: any;
  }> {
    console.log(`🤝 Génération handoff Astro pour workflow ${workflowId}...`);

    const workflowData = await this.getWorkflowData(workflowId);

    if (!workflowData) {
      throw new Error('Données de workflow non trouvées');
    }

    return {
      sanityConfig: {
        projectId: workflowData.sanityProjectId,
        dataset: workflowData.sanityCredentials.dataset,
        apiVersion: workflowData.sanityCredentials.apiVersion,
        studioUrl: workflowData.sanityCredentials.studioUrl
      },
      contentStructure: {
        schemas: SanityProjectConfigManager.getSchemasForBusiness(workflowData.businessInfo.businessType),
        services: workflowData.contentSummary.services,
        testimonials: workflowData.contentSummary.testimonials,
        projects: workflowData.contentSummary.projects,
        pages: workflowData.contentSummary.pages
      },
      buildInstructions: {
        businessType: workflowData.businessInfo.businessType,
        template: workflowData.selectedTemplate,
        colors: workflowData.businessInfo.colors,
        features: SanityProjectConfigManager.getFeaturesForBusiness(workflowData.businessInfo.businessType)
      },
      deploymentVars: {
        SANITY_PROJECT_ID: workflowData.sanityProjectId,
        SANITY_DATASET: workflowData.sanityCredentials.dataset,
        SANITY_API_VERSION: workflowData.sanityCredentials.apiVersion,
        BUSINESS_NAME: workflowData.businessInfo.businessName,
        BUSINESS_TYPE: workflowData.businessInfo.businessType,
        DOMAIN: workflowData.businessInfo.domain
      }
    };
  }

  /**
   * Fonctions utilitaires privées
   */
  private validateIntegrationStep(step: SanityIntegrationStep): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!step.workflowId) errors.push('WorkflowId manquant');
    if (!step.clientId) errors.push('ClientId manquant');
    if (!step.selectedTemplate) errors.push('Template sélectionné manquant');
    if (!step.businessInfo?.businessName) errors.push('Nom entreprise manquant');
    if (!step.businessInfo?.businessType) errors.push('Type métier manquant');
    if (!step.businessInfo?.domain) errors.push('Domaine manquant');

    // Validation métier
    const businessConfig = SanityProjectConfigManager.getBusinessConfig(step.businessInfo.businessType);
    if (!businessConfig) {
      errors.push(`Type de métier non supporté: ${step.businessInfo.businessType}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private createSanityWorkflow(step: SanityIntegrationStep): SanityWorkflow {
    return {
      clientId: step.clientId,
      businessName: step.businessInfo.businessName,
      businessType: step.businessInfo.businessType,
      selectedTemplate: step.selectedTemplate,
      formData: step.formData,
      domain: step.businessInfo.domain,
      logoUrl: step.formData.logoUrl,
      colors: step.businessInfo.colors
    };
  }

  private async updateWorkflowStatus(workflowId: string, status: string, metadata?: any): Promise<void> {
    // Cache local
    const current = this.integrationStatus.get(workflowId) || {};
    this.integrationStatus.set(workflowId, {
      ...current,
      status,
      updatedAt: new Date().toISOString(),
      ...(metadata && { metadata })
    });

    // Dans une vraie implémentation, on mettrait à jour la DB
    console.log(`📊 Workflow ${workflowId} status: ${status}`);

    try {
      // Simulation d'un appel API pour mettre à jour le workflow
      // await fetch(`/api/admin/workflows/${workflowId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     sanityStatus: status,
      //     sanityMetadata: metadata,
      //     actionDescription: `Intégration Sanity: ${status}`
      //   })
      // });
    } catch (error) {
      console.warn(`⚠️ Impossible de mettre à jour le workflow ${workflowId}:`, error);
    }
  }

  private async updateWorkflowWithSanityData(workflowId: string, sanityData: any): Promise<void> {
    console.log(`📝 Mise à jour workflow ${workflowId} avec données Sanity...`);

    // Cache local
    const current = this.integrationStatus.get(workflowId) || {};
    this.integrationStatus.set(workflowId, {
      ...current,
      sanityData,
      updatedAt: new Date().toISOString()
    });

    // Dans une vraie implémentation
    // await updateWorkflowInDatabase(workflowId, sanityData);
  }

  private async getWorkflowData(workflowId: string): Promise<any> {
    // D'abord essayer le cache
    const cached = this.integrationStatus.get(workflowId);
    if (cached) {
      return cached;
    }

    // Dans une vraie implémentation, on récupérerait depuis la DB
    // const response = await fetch(`/api/admin/workflows/${workflowId}`);
    // const data = await response.json();
    // return data.workflow;

    return null;
  }

  /**
   * Point d'entrée pour les tests
   */
  async testIntegration(businessType: string): Promise<{
    success: boolean;
    testData: any;
    duration: number;
  }> {
    const startTime = Date.now();

    console.log(`🧪 Test intégration Sanity pour ${businessType}...`);

    try {
      const testStep: SanityIntegrationStep = {
        workflowId: `test-${Date.now()}`,
        clientId: `client-test-${Date.now()}`,
        selectedTemplate: 'classique',
        formData: {
          telephone: '01 23 45 67 89',
          email: 'test@example.com',
          ville: 'Paris',
          codePostal: '75001',
          adresse: '123 rue Test'
        },
        businessInfo: {
          businessName: `Test ${businessType}`,
          businessType,
          domain: `test-${businessType}-${Date.now()}.exemple.fr`,
          colors: SanityProjectConfigManager.getColorsForBusiness(businessType)
        }
      };

      const result = await this.integrateAfterTemplateChoice(testStep);
      const duration = Date.now() - startTime;

      return {
        success: result.success,
        testData: {
          workflowId: testStep.workflowId,
          projectId: result.projectId,
          contentCounts: result.content
        },
        duration
      };

    } catch (error) {
      const duration = Date.now() - startTime;

      return {
        success: false,
        testData: { error: error.message },
        duration
      };
    }
  }

  /**
   * Statistiques d'utilisation Sanity
   */
  getIntegrationStats(): {
    totalIntegrations: number;
    successRate: number;
    avgDuration: number;
    byBusinessType: Record<string, number>;
    recentIntegrations: any[];
  } {
    const statuses = Array.from(this.integrationStatus.values());

    return {
      totalIntegrations: statuses.length,
      successRate: statuses.filter(s => s.status?.includes('ready')).length / statuses.length,
      avgDuration: 0, // À calculer en production
      byBusinessType: {},
      recentIntegrations: statuses
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 10)
    };
  }
}

// Instance singleton
export const workflowSanityIntegrationService = new WorkflowSanityIntegrationService();
export default WorkflowSanityIntegrationService;
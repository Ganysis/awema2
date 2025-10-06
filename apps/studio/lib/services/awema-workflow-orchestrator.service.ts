/**
 * 🎯 AWEMA 3.0 - Orchestrateur de Workflow Principal
 *
 * Ce service coordonne tous les agents pour créer un workflow complet
 * depuis la réception du formulaire jusqu'au déploiement final.
 *
 * WORKFLOW:
 * 1. Formulaire client (275+ champs)
 * 2. Génération 3 mockups Lorem (Netlify)
 * 3. Envoi email avec propositions
 * 4. Client choisit son template
 * 5. Setup Sanity CMS
 * 6. Enrichissement contenu IA
 * 7. Déploiement Cloudflare Pages
 * 8. Site en production avec CMS
 */

import { WorkflowStatus, WorkflowDashboard } from '@/lib/types/workflow.types';
import { NetlifyMockupGeneratorService } from './netlify-mockup-generator.service';
import { EmailMockupsService } from './email-mockups.service';
import { SanitySetupService } from './sanity-setup.service';
import { EnrichAndMigrateService } from './enrich-and-migrate.service';
import { CloudflareDeploymentService } from './cloudflare-deployment.service';
import { WorkflowStore } from '@/lib/stores/workflow.store';
import { ClientFormUltra } from '@/types/client-form-ultra';
import { EventEmitter } from 'events';

export interface WorkflowResult {
  success: boolean;
  workflowId: string;
  status: WorkflowStatus;
  mockups?: Array<{
    templateName: string;
    netlifyUrl: string;
  }>;
  selectedTemplate?: string;
  sanityProjectId?: string;
  productionUrl?: string;
  cmsUrl?: string;
  analytics?: {
    totalTime: number;
    steps: Record<string, number>;
  };
  error?: string;
}

export class AwemaWorkflowOrchestrator extends EventEmitter {
  private mockupGenerator: NetlifyMockupGeneratorService;
  private emailService: EmailMockupsService;
  private sanityService: SanitySetupService;
  private enrichService: EnrichAndMigrateService;
  private deploymentService: CloudflareDeploymentService;
  private workflowStore: WorkflowStore;

  constructor() {
    super();
    this.mockupGenerator = new NetlifyMockupGeneratorService();
    this.emailService = new EmailMockupsService();
    this.sanityService = new SanitySetupService();
    this.enrichService = new EnrichAndMigrateService();
    this.deploymentService = new CloudflareDeploymentService();
    this.workflowStore = new WorkflowStore();
  }

  /**
   * ÉTAPE 1: Réception du formulaire et création du workflow
   */
  async initializeWorkflow(formData: Partial<ClientFormUltra>): Promise<string> {
    console.log('🚀 AWEMA Workflow: Initialisation pour', formData.businessName);

    const workflowId = `workflow-${Date.now()}`;

    // Créer le workflow dans le store
    await this.workflowStore.createWorkflow({
      id: workflowId,
      clientName: formData.businessName || 'Client',
      email: formData.email || '',
      status: 'form_received',
      formData,
      createdAt: new Date(),
    });

    this.emit('workflow.initialized', { workflowId, formData });

    // Lancer automatiquement la génération des mockups
    setTimeout(() => this.generateMockups(workflowId, formData), 1000);

    return workflowId;
  }

  /**
   * ÉTAPE 2: Génération des 3 mockups Lorem sur Netlify
   */
  private async generateMockups(workflowId: string, formData: Partial<ClientFormUltra>) {
    try {
      console.log('📦 Génération des mockups pour', formData.businessName);

      await this.workflowStore.updateStatus(workflowId, 'preparing');
      this.emit('mockups.generation.started', { workflowId });

      // Agent 3: Générer les mockups
      const mockupResult = await this.mockupGenerator.generateMockups({
        businessName: formData.businessName || '',
        businessType: formData.businessType || '',
        location: formData.location || '',
        email: formData.email || '',
        phone: formData.phone || '',
        logoUrl: formData.logoUrl,
        brandColors: formData.brandColors,
      });

      if (!mockupResult.success) {
        throw new Error('Échec génération mockups');
      }

      // Sauvegarder les URLs des mockups
      await this.workflowStore.updateWorkflow(workflowId, {
        mockups: mockupResult.mockups.map(m => ({
          version: m.templateName as any,
          templateName: m.templateName,
          netlifyUrl: m.netlifyUrl,
          previewUrl: m.previewImage || m.netlifyUrl,
          deployed: true
        })),
        status: 'mockups_ready'
      });

      this.emit('mockups.generation.completed', {
        workflowId,
        mockups: mockupResult.mockups
      });

      // Lancer l'envoi de l'email
      await this.sendProposalEmail(workflowId, mockupResult.mockups, formData);

    } catch (error) {
      console.error('❌ Erreur génération mockups:', error);
      await this.workflowStore.updateStatus(workflowId, 'error');
      this.emit('workflow.error', { workflowId, error, step: 'mockups' });
    }
  }

  /**
   * ÉTAPE 3: Envoi email avec les 3 propositions
   */
  private async sendProposalEmail(
    workflowId: string,
    mockups: any[],
    formData: Partial<ClientFormUltra>
  ) {
    try {
      console.log('📧 Envoi email propositions à', formData.email);

      await this.workflowStore.updateStatus(workflowId, 'sending');
      this.emit('email.sending', { workflowId });

      // Agent 5: Envoyer l'email
      const emailResult = await this.emailService.sendMockupsEmail(
        {
          id: workflowId,
          clientName: formData.businessName || '',
          email: formData.email || '',
          formData
        } as any,
        mockups
      );

      if (emailResult.success) {
        await this.workflowStore.updateStatus(workflowId, 'sent');
        this.emit('email.sent', { workflowId, messageId: emailResult.messageId });

        // Créer la page de sélection client
        const selectionUrl = `/client-selection/${workflowId}`;
        console.log('🔗 Page de sélection:', selectionUrl);
      }

    } catch (error) {
      console.error('❌ Erreur envoi email:', error);
      this.emit('workflow.error', { workflowId, error, step: 'email' });
    }
  }

  /**
   * ÉTAPE 4: Le client fait son choix (appelé depuis la page de sélection)
   */
  async handleClientSelection(workflowId: string, selectedTemplate: string) {
    try {
      console.log('✅ Client a choisi:', selectedTemplate);

      await this.workflowStore.updateWorkflow(workflowId, {
        selectedTemplate,
        status: 'chosen'
      });

      this.emit('client.selection.made', { workflowId, selectedTemplate });

      // Récupérer le workflow complet
      const workflow = await this.workflowStore.getWorkflow(workflowId);
      if (!workflow) throw new Error('Workflow non trouvé');

      // Lancer la phase de production
      await this.startProductionPhase(workflow, selectedTemplate);

    } catch (error) {
      console.error('❌ Erreur sélection client:', error);
      this.emit('workflow.error', { workflowId, error, step: 'selection' });
    }
  }

  /**
   * PHASE PRODUCTION: Setup Sanity + Enrichissement + Déploiement
   */
  private async startProductionPhase(workflow: any, selectedTemplate: string) {
    const startTime = Date.now();

    try {
      console.log('🏭 PHASE PRODUCTION: Début pour', workflow.clientName);

      // ÉTAPE 5: Setup Sanity CMS
      console.log('📝 Configuration Sanity CMS...');
      await this.workflowStore.updateStatus(workflow.id, 'enriching');

      const sanityConfig = await this.sanityService.setupSanityProject(
        workflow,
        selectedTemplate
      );

      this.emit('sanity.setup.completed', {
        workflowId: workflow.id,
        projectId: sanityConfig.projectId
      });

      // ÉTAPE 6 & 7: Enrichissement IA et migration Astro
      console.log('🤖 Enrichissement contenu avec IA...');

      const enrichedProject = await this.enrichService.enrichTemplate(
        workflow,
        selectedTemplate,
        sanityConfig
      );

      this.emit('enrichment.completed', {
        workflowId: workflow.id,
        pagesEnriched: enrichedProject.pages.length
      });

      // ÉTAPE 8: Déploiement Cloudflare Pages
      console.log('☁️ Déploiement sur Cloudflare Pages...');
      await this.workflowStore.updateStatus(workflow.id, 'deploying');

      const deployment = await this.deploymentService.deployToCloudflare(
        workflow.formData,
        enrichedProject,
        sanityConfig
      );

      if (!deployment.success) {
        throw new Error('Échec du déploiement');
      }

      // Mise à jour finale
      await this.workflowStore.updateWorkflow(workflow.id, {
        status: 'deployed',
        finalUrl: deployment.url,
        sanityProjectId: sanityConfig.projectId,
        deploymentId: deployment.deploymentId,
        completedAt: new Date()
      });

      const totalTime = Math.round((Date.now() - startTime) / 1000);

      console.log('✅ WORKFLOW TERMINÉ!');
      console.log('🌐 Site en production:', deployment.url);
      console.log('📊 CMS Sanity:', `https://${sanityConfig.projectId}.sanity.studio`);
      console.log('⏱️ Temps total:', totalTime, 'secondes');

      this.emit('workflow.completed', {
        workflowId: workflow.id,
        productionUrl: deployment.url,
        cmsUrl: `https://${sanityConfig.projectId}.sanity.studio`,
        totalTime
      });

      // Envoyer email de confirmation au client
      await this.sendCompletionEmail(workflow, deployment.url);

    } catch (error) {
      console.error('❌ Erreur phase production:', error);
      await this.workflowStore.updateStatus(workflow.id, 'error');
      this.emit('workflow.error', {
        workflowId: workflow.id,
        error,
        step: 'production'
      });
    }
  }

  /**
   * Email final avec site en production
   */
  private async sendCompletionEmail(workflow: any, productionUrl: string) {
    try {
      console.log('📧 Envoi email de livraison...');

      // Utiliser le service email pour envoyer la confirmation
      await this.emailService.sendCompletionEmail(
        workflow.email,
        workflow.clientName,
        productionUrl,
        `https://${workflow.sanityProjectId}.sanity.studio`
      );

      this.emit('completion.email.sent', { workflowId: workflow.id });

    } catch (error) {
      console.error('⚠️ Erreur envoi email final:', error);
      // Non critique, on continue
    }
  }

  /**
   * Obtenir le statut d'un workflow
   */
  async getWorkflowStatus(workflowId: string): Promise<WorkflowResult> {
    const workflow = await this.workflowStore.getWorkflow(workflowId);

    if (!workflow) {
      return {
        success: false,
        workflowId,
        status: 'error' as any,
        error: 'Workflow non trouvé'
      };
    }

    return {
      success: true,
      workflowId,
      status: workflow.status,
      mockups: workflow.mockups?.map(m => ({
        templateName: m.templateName,
        netlifyUrl: m.netlifyUrl
      })),
      selectedTemplate: workflow.selectedTemplate,
      sanityProjectId: workflow.sanityProjectId,
      productionUrl: workflow.finalUrl,
      cmsUrl: workflow.sanityProjectId ?
        `https://${workflow.sanityProjectId}.sanity.studio` : undefined,
      analytics: workflow.analytics
    };
  }

  /**
   * Obtenir tous les workflows pour le dashboard admin
   */
  async getAllWorkflows() {
    return this.workflowStore.getAllWorkflows();
  }

  /**
   * Relancer un workflow en erreur
   */
  async retryWorkflow(workflowId: string) {
    const workflow = await this.workflowStore.getWorkflow(workflowId);
    if (!workflow) return;

    switch (workflow.status) {
      case 'error':
        // Reprendre depuis le début
        await this.generateMockups(workflowId, workflow.formData);
        break;
      case 'mockups_ready':
        // Renvoyer l'email
        await this.sendProposalEmail(workflowId, workflow.mockups, workflow.formData);
        break;
      case 'chosen':
        // Relancer la production
        await this.startProductionPhase(workflow, workflow.selectedTemplate);
        break;
    }
  }
}

// Export singleton
export const awemaOrchestrator = new AwemaWorkflowOrchestrator();

// API Helper pour utilisation dans les routes
export class AwemaWorkflowAPI {
  /**
   * Démarrer un nouveau workflow depuis un formulaire
   */
  static async startWorkflow(formData: Partial<ClientFormUltra>) {
    return awemaOrchestrator.initializeWorkflow(formData);
  }

  /**
   * Gérer la sélection du client
   */
  static async handleSelection(workflowId: string, templateChoice: string) {
    return awemaOrchestrator.handleClientSelection(workflowId, templateChoice);
  }

  /**
   * Obtenir le statut
   */
  static async getStatus(workflowId: string) {
    return awemaOrchestrator.getWorkflowStatus(workflowId);
  }

  /**
   * Dashboard admin
   */
  static async getDashboard() {
    const workflows = await awemaOrchestrator.getAllWorkflows();

    return {
      total: workflows.length,
      byStatus: workflows.reduce((acc, w) => {
        acc[w.status] = (acc[w.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      workflows: workflows.slice(0, 100) // Derniers 100
    };
  }
}

export default AwemaWorkflowOrchestrator;
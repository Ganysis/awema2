import { emailMockupsService } from '@/lib/services/email-mockups.service';
import { emailAnalyticsService } from '@/lib/services/email-analytics.service';
import { screenshotGeneratorService } from '@/lib/services/screenshot-generator.service';

/**
 * Interface pour les données du workflow
 */
export interface WorkflowEmailData {
  clientId: string;
  clientName: string;
  clientEmail: string;
  businessName: string;
  metier: string;
  ville: string;
  phone?: string;
  requestId: string;
}

/**
 * Interface pour les mockups
 */
export interface MockupEmailData {
  id: string;
  name: string;
  url: string;
  description: string;
  style: 'modern' | 'premium' | 'tech' | 'robust';
  features?: string[];
}

/**
 * Classe utilitaire pour l'intégration complète du système d'email
 * Cette classe orchestre tous les services pour l'envoi des mockups
 */
export class EmailIntegration {
  /**
   * Méthode principale pour envoyer les mockups par email
   * Orchestration complète du processus
   */
  static async sendMockupProposals(
    workflow: WorkflowEmailData,
    mockups: MockupEmailData[],
    options: {
      generateScreenshots?: boolean;
      trackAnalytics?: boolean;
      sendReminder?: boolean;
      testMode?: boolean;
    } = {}
  ): Promise<{
    success: boolean;
    trackingId?: string;
    error?: string;
    details?: any;
  }> {
    try {
      console.log(`🚀 Début processus email pour ${workflow.clientEmail}`);

      const {
        generateScreenshots = true,
        trackAnalytics = true,
        sendReminder = true,
        testMode = false
      } = options;

      // Étape 1: Validation des données
      const validationResult = this.validateInputData(workflow, mockups);
      if (!validationResult.valid) {
        return {
          success: false,
          error: validationResult.error
        };
      }

      // Étape 2: Génération des screenshots si demandé
      let mockupsWithScreenshots = mockups;
      if (generateScreenshots) {
        console.log('📸 Génération des screenshots...');
        try {
          const screenshotResults = await screenshotGeneratorService.generateEmailScreenshots(
            mockups.map(m => ({ id: m.id, name: m.name, url: m.url }))
          );

          mockupsWithScreenshots = mockups.map(mockup => {
            const screenshotResult = screenshotResults.find(r => r.id === mockup.id);
            return {
              ...mockup,
              screenshot: screenshotResult?.screenshot
            };
          });

          console.log(`✅ ${screenshotResults.length} screenshots générés`);
        } catch (screenshotError) {
          console.warn('⚠️ Erreur génération screenshots, continuons sans:', screenshotError.message);
        }
      }

      // Étape 3: Envoi de l'email
      console.log('📧 Envoi de l\'email...');
      const emailResult = await emailMockupsService.sendMockupsEmail(
        workflow,
        mockupsWithScreenshots
      );

      if (!emailResult.success) {
        return {
          success: false,
          error: emailResult.error
        };
      }

      // Étape 4: Enregistrement des analytics si demandé
      if (trackAnalytics && emailResult.trackingId) {
        console.log('📊 Enregistrement analytics...');
        try {
          await emailAnalyticsService.logEvent({
            event: 'sent',
            trackingId: emailResult.trackingId,
            clientId: workflow.clientId,
            clientEmail: workflow.clientEmail,
            metadata: {
              businessName: workflow.businessName,
              metier: workflow.metier,
              ville: workflow.ville,
              mockupsCount: mockups.length,
              hasScreenshots: generateScreenshots,
              testMode
            }
          });
        } catch (analyticsError) {
          console.warn('⚠️ Erreur enregistrement analytics:', analyticsError.message);
        }
      }

      // Étape 5: Programmer la relance si demandé
      if (sendReminder && emailResult.trackingId && !testMode) {
        console.log('⏰ Programmation relance automatique...');
        this.scheduleReminderEmail(workflow, mockupsWithScreenshots, emailResult.trackingId);
      }

      console.log(`✅ Processus email terminé avec succès - Tracking: ${emailResult.trackingId}`);

      return {
        success: true,
        trackingId: emailResult.trackingId,
        details: {
          screenshotsGenerated: generateScreenshots,
          analyticsTracked: trackAnalytics,
          reminderScheduled: sendReminder,
          mockupsCount: mockups.length,
          emailSentAt: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('❌ Erreur processus email complet:', error);
      return {
        success: false,
        error: error.message,
        details: {
          stack: error.stack,
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  /**
   * Envoie un email de relance
   */
  static async sendReminderEmail(
    workflow: WorkflowEmailData,
    mockups: MockupEmailData[],
    originalTrackingId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log(`📧 Envoi relance pour ${workflow.clientEmail}`);

      // Vérifier si l'email original a été ouvert
      const originalStats = await emailAnalyticsService.getEmailStats(originalTrackingId);

      if (originalStats?.firstOpenAt) {
        console.log('📧 Email original déjà ouvert, pas de relance');
        return { success: true };
      }

      // TODO: Implémenter l'envoi du template de relance
      // Pour l'instant, on simule

      // Enregistrer l'événement de relance
      await emailAnalyticsService.logEvent({
        event: 'sent',
        trackingId: this.generateReminderTrackingId(originalTrackingId),
        clientId: workflow.clientId,
        clientEmail: workflow.clientEmail,
        metadata: {
          type: 'reminder',
          originalTrackingId,
          businessName: workflow.businessName
        }
      });

      console.log('✅ Email de relance envoyé');
      return { success: true };

    } catch (error) {
      console.error('❌ Erreur envoi relance:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Obtient les statistiques d'une campagne d'emails mockups
   */
  static async getCampaignStats(campaignId?: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      const stats = await emailAnalyticsService.getCampaignStats(campaignId);
      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('❌ Erreur récupération stats:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Obtient le dashboard d'analytics complet
   */
  static async getAnalyticsDashboard(period = '7d'): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      const dashboard = await emailAnalyticsService.getAnalyticsDashboard(period);
      return {
        success: true,
        data: dashboard
      };
    } catch (error) {
      console.error('❌ Erreur dashboard analytics:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Test complet du système d'email
   */
  static async testEmailSystem(testEmail?: string): Promise<{
    success: boolean;
    results: Record<string, boolean>;
    errors: Record<string, string>;
  }> {
    const results: Record<string, boolean> = {};
    const errors: Record<string, string> = {};

    console.log('🧪 Test complet du système d\'email...');

    // Test 1: Configuration email
    try {
      const configTest = await emailMockupsService.testEmailConfig();
      results.emailConfig = configTest.success;
      if (!configTest.success) {
        errors.emailConfig = configTest.error || 'Configuration email invalide';
      }
    } catch (error) {
      results.emailConfig = false;
      errors.emailConfig = error.message;
    }

    // Test 2: Génération de screenshots
    try {
      await screenshotGeneratorService.initialize();
      results.screenshots = true;
    } catch (error) {
      results.screenshots = false;
      errors.screenshots = error.message;
    }

    // Test 3: Analytics
    try {
      await emailAnalyticsService.getAnalyticsDashboard('1d');
      results.analytics = true;
    } catch (error) {
      results.analytics = false;
      errors.analytics = error.message;
    }

    // Test 4: Envoi d'email test si demandé
    if (testEmail) {
      try {
        const testMockups: MockupEmailData[] = [
          {
            id: 'test-1',
            name: 'Template Test',
            url: 'https://example.com',
            description: 'Template de test',
            style: 'modern',
            features: ['Responsive', 'SEO']
          }
        ];

        const testWorkflow: WorkflowEmailData = {
          clientId: 'test-client',
          clientName: 'Test Client',
          clientEmail: testEmail,
          businessName: 'Test Business',
          metier: 'Test',
          ville: 'Test City',
          requestId: 'test-request'
        };

        const testResult = await this.sendMockupProposals(testWorkflow, testMockups, {
          generateScreenshots: false,
          trackAnalytics: false,
          sendReminder: false,
          testMode: true
        });

        results.emailSend = testResult.success;
        if (!testResult.success) {
          errors.emailSend = testResult.error || 'Erreur envoi test';
        }
      } catch (error) {
        results.emailSend = false;
        errors.emailSend = error.message;
      }
    }

    const allSuccess = Object.values(results).every(Boolean);
    const successCount = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;

    console.log(`🧪 Tests terminés: ${successCount}/${totalTests} réussis`);

    return {
      success: allSuccess,
      results,
      errors
    };
  }

  /**
   * Méthodes privées utilitaires
   */
  private static validateInputData(
    workflow: WorkflowEmailData,
    mockups: MockupEmailData[]
  ): { valid: boolean; error?: string } {
    // Validation workflow
    if (!workflow.clientEmail || !workflow.clientName || !workflow.businessName) {
      return {
        valid: false,
        error: 'Données client incomplètes (email, nom, nom entreprise requis)'
      };
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workflow.clientEmail)) {
      return {
        valid: false,
        error: 'Adresse email invalide'
      };
    }

    // Validation mockups
    if (!mockups || mockups.length === 0) {
      return {
        valid: false,
        error: 'Aucun mockup fourni'
      };
    }

    if (mockups.length !== 3) {
      return {
        valid: false,
        error: 'Exactement 3 mockups sont requis'
      };
    }

    for (const mockup of mockups) {
      if (!mockup.id || !mockup.name || !mockup.url || !mockup.description) {
        return {
          valid: false,
          error: 'Données mockup incomplètes (id, name, url, description requis)'
        };
      }

      try {
        new URL(mockup.url);
      } catch {
        return {
          valid: false,
          error: `URL invalide pour le mockup ${mockup.name}`
        };
      }
    }

    return { valid: true };
  }

  private static scheduleReminderEmail(
    workflow: WorkflowEmailData,
    mockups: MockupEmailData[],
    trackingId: string
  ): void {
    // Dans un vrai système, on utiliserait une queue de jobs ou un scheduler
    // Pour l'instant, on simule avec setTimeout
    setTimeout(async () => {
      try {
        await this.sendReminderEmail(workflow, mockups, trackingId);
      } catch (error) {
        console.error('❌ Erreur envoi relance programmée:', error);
      }
    }, 2 * 24 * 60 * 60 * 1000); // 2 jours
  }

  private static generateReminderTrackingId(originalTrackingId: string): string {
    return `${originalTrackingId}-reminder`;
  }
}

export default EmailIntegration;
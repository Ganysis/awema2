#!/usr/bin/env ts-node

/**
 * 🧪 Test d'intégration complète AWEMA 3.0
 *
 * Ce script teste le workflow complet avec tous les agents :
 * 1. Formulaire → 2. Mockups → 3. Email → 4. Sélection →
 * 5. Sanity → 6. Enrichissement → 7. Déploiement → 8. Production
 */

import { AwemaWorkflowOrchestrator } from './lib/services/awema-workflow-orchestrator.service';
import { ClientFormUltra } from './types/client-form-ultra';
import chalk from 'chalk';

const TEST_CLIENT: Partial<ClientFormUltra> = {
  // Informations de base (Agent 1)
  businessName: 'Plomberie Martin & Fils',
  businessType: 'plombier',
  email: 'martin@plomberie-martin.fr',
  phone: '04 78 12 34 56',
  location: 'Lyon 7ème',

  // Informations détaillées
  description: 'Experts en plomberie depuis 1985',
  services: [
    'Dépannage urgence 24/7',
    'Installation sanitaire',
    'Rénovation salle de bain',
    'Entretien chaudière'
  ],

  // Branding
  brandColors: {
    primary: '#0066CC',
    secondary: '#0052A3'
  },

  // Zones d'intervention
  serviceAreas: ['Lyon', 'Villeurbanne', 'Caluire', 'Vaulx-en-Velin'],

  // Certifications
  certifications: ['RGE Qualibat', 'Artisan de confiance', 'QualiPac'],

  // Horaires
  businessHours: {
    monday: '8h-18h',
    tuesday: '8h-18h',
    wednesday: '8h-18h',
    thursday: '8h-18h',
    friday: '8h-18h',
    saturday: '9h-12h',
    sunday: 'Urgences uniquement'
  },

  // SEO
  keywords: [
    'plombier lyon',
    'dépannage plomberie',
    'urgence plomberie lyon',
    'installation chaudière'
  ]
};

class WorkflowIntegrationTest {
  private orchestrator: AwemaWorkflowOrchestrator;
  private workflowId?: string;

  constructor() {
    this.orchestrator = new AwemaWorkflowOrchestrator();
    this.setupEventListeners();
  }

  /**
   * Configuration des listeners pour suivre le workflow
   */
  private setupEventListeners() {
    // Workflow général
    this.orchestrator.on('workflow.initialized', (data) => {
      console.log(chalk.green('✅ Workflow initialisé:'), data.workflowId);
    });

    this.orchestrator.on('workflow.completed', (data) => {
      console.log(chalk.green.bold('\n🎉 WORKFLOW TERMINÉ!'));
      console.log(chalk.cyan('🌐 Site en production:'), data.productionUrl);
      console.log(chalk.cyan('📊 CMS Sanity:'), data.cmsUrl);
      console.log(chalk.yellow('⏱️ Temps total:'), data.totalTime, 'secondes');
    });

    this.orchestrator.on('workflow.error', (data) => {
      console.error(chalk.red('❌ Erreur workflow:'), data.error);
      console.error(chalk.red('Étape:'), data.step);
    });

    // Mockups (Agent 3)
    this.orchestrator.on('mockups.generation.started', () => {
      console.log(chalk.blue('📦 Génération des mockups...'));
    });

    this.orchestrator.on('mockups.generation.completed', (data) => {
      console.log(chalk.green('✅ Mockups générés:'));
      data.mockups.forEach((m: any) => {
        console.log(chalk.gray(`  - ${m.templateName}: ${m.netlifyUrl}`));
      });
    });

    // Email (Agent 5)
    this.orchestrator.on('email.sending', () => {
      console.log(chalk.blue('📧 Envoi de l\'email...'));
    });

    this.orchestrator.on('email.sent', (data) => {
      console.log(chalk.green('✅ Email envoyé:'), data.messageId);
    });

    // Sélection client (Agent 4)
    this.orchestrator.on('client.selection.made', (data) => {
      console.log(chalk.green('✅ Client a choisi:'), data.selectedTemplate);
    });

    // Sanity (Agent 6)
    this.orchestrator.on('sanity.setup.completed', (data) => {
      console.log(chalk.green('✅ Sanity configuré:'), data.projectId);
    });

    // Enrichissement (Agent 7)
    this.orchestrator.on('enrichment.completed', (data) => {
      console.log(chalk.green('✅ Contenu enrichi:'), data.pagesEnriched, 'pages');
    });
  }

  /**
   * Test du workflow complet
   */
  async runCompleteTest() {
    console.log(chalk.bold.cyan('\n🚀 AWEMA 3.0 - Test d\'intégration complète\n'));
    console.log(chalk.gray('Client test:'), TEST_CLIENT.businessName);
    console.log(chalk.gray('Métier:'), TEST_CLIENT.businessType);
    console.log(chalk.gray('Email:'), TEST_CLIENT.email);
    console.log(chalk.gray('-'.repeat(50)));

    try {
      // PHASE 1: Initialisation et mockups
      console.log(chalk.bold('\n📋 PHASE 1: Formulaire & Mockups\n'));

      this.workflowId = await this.orchestrator.initializeWorkflow(TEST_CLIENT);
      console.log(chalk.cyan('Workflow ID:'), this.workflowId);

      // Attendre la génération des mockups
      await this.waitForEvent('mockups.generation.completed', 180000);

      // PHASE 2: Simulation sélection client
      console.log(chalk.bold('\n👆 PHASE 2: Sélection Client\n'));

      // Simuler un délai de réflexion du client
      console.log(chalk.gray('Simulation: Client consulte les mockups...'));
      await this.sleep(5000);

      // Le client choisit le template Sydney
      await this.orchestrator.handleClientSelection(this.workflowId, 'sydney');

      // PHASE 3: Production
      console.log(chalk.bold('\n🏭 PHASE 3: Production (Sanity + IA + Déploiement)\n'));

      // Attendre la fin du workflow
      await this.waitForEvent('workflow.completed', 300000);

      // Récupérer le statut final
      const finalStatus = await this.orchestrator.getWorkflowStatus(this.workflowId);

      console.log(chalk.bold.green('\n✅ TEST RÉUSSI!\n'));
      console.log('Résultats finaux:');
      console.log(JSON.stringify(finalStatus, null, 2));

    } catch (error) {
      console.error(chalk.red.bold('\n❌ TEST ÉCHOUÉ\n'));
      console.error(error);
      process.exit(1);
    }
  }

  /**
   * Test rapide (mockups seulement)
   */
  async runQuickTest() {
    console.log(chalk.bold.cyan('\n⚡ Test rapide - Mockups uniquement\n'));

    try {
      this.workflowId = await this.orchestrator.initializeWorkflow(TEST_CLIENT);

      await this.waitForEvent('mockups.generation.completed', 180000);

      const status = await this.orchestrator.getWorkflowStatus(this.workflowId);

      console.log(chalk.green('\n✅ Mockups prêts!'));
      console.log('URLs:');
      status.mockups?.forEach(m => {
        console.log(`  - ${m.templateName}: ${m.netlifyUrl}`);
      });

    } catch (error) {
      console.error(chalk.red('❌ Erreur:'), error);
    }
  }

  /**
   * Utilitaires
   */
  private waitForEvent(eventName: string, timeout: number = 60000): Promise<any> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Timeout waiting for ${eventName}`));
      }, timeout);

      this.orchestrator.once(eventName, (data) => {
        clearTimeout(timer);
        resolve(data);
      });
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  const test = new WorkflowIntegrationTest();

  if (args.includes('--quick')) {
    await test.runQuickTest();
  } else {
    await test.runCompleteTest();
  }

  console.log(chalk.gray('\nTest terminé.'));
  process.exit(0);
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (error) => {
  console.error(chalk.red('Erreur non gérée:'), error);
  process.exit(1);
});

// Lancer le test
if (require.main === module) {
  main();
}

export { WorkflowIntegrationTest };
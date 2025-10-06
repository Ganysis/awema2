#!/usr/bin/env tsx

/**
 * Script de test pour le dashboard admin
 * Tests des composants, API routes et fonctionnalités
 */

import { PrismaClient } from '@prisma/client';
import { WorkflowStatus, BusinessType } from '../lib/types/workflow.types';

const prisma = new PrismaClient();

// Données de test
const testClients = [
  {
    name: 'Jean Dupont',
    email: 'jean.dupont@plomberie.fr',
    phone: '06 12 34 56 78',
    businessType: 'plombier' as BusinessType,
    city: 'Paris'
  },
  {
    name: 'Marie Martin',
    email: 'marie.martin@elec.fr',
    phone: '06 98 76 54 32',
    businessType: 'electricien' as BusinessType,
    city: 'Lyon'
  },
  {
    name: 'Pierre Paysage',
    email: 'pierre@jardins.fr',
    phone: '06 11 22 33 44',
    businessType: 'paysagiste' as BusinessType,
    city: 'Marseille'
  },
  {
    name: 'Sophie Bois',
    email: 'sophie@menuiserie.fr',
    phone: '06 55 66 77 88',
    businessType: 'menuisier' as BusinessType,
    city: 'Toulouse'
  },
  {
    name: 'Antoine Construct',
    email: 'antoine@maconnerie.fr',
    phone: '06 99 88 77 66',
    businessType: 'maçon' as BusinessType,
    city: 'Nice'
  }
];

const testMockups = [
  {
    title: 'Template Moderne Bleu',
    url: 'https://mockup1.awema.fr/moderne-bleu',
    thumbnailUrl: 'https://mockup1.awema.fr/thumb.jpg'
  },
  {
    title: 'Template Classic Vert',
    url: 'https://mockup2.awema.fr/classic-vert',
    thumbnailUrl: 'https://mockup2.awema.fr/thumb.jpg'
  },
  {
    title: 'Template Premium Rouge',
    url: 'https://mockup3.awema.fr/premium-rouge',
    thumbnailUrl: 'https://mockup3.awema.fr/thumb.jpg'
  }
];

async function createTestData() {
  console.log('🚀 Création des données de test pour le dashboard admin...\n');

  try {
    // Nettoyer les données existantes
    await prisma.workflowAction.deleteMany();
    await prisma.workflowMockup.deleteMany();
    await prisma.workflow.deleteMany();
    await prisma.client.deleteMany();

    console.log('✅ Données existantes nettoyées');

    // Créer les clients et workflows
    for (let i = 0; i < testClients.length; i++) {
      const clientData = testClients[i];

      console.log(`📝 Création du client: ${clientData.name}`);

      // Créer le client
      const client = await prisma.client.create({
        data: clientData
      });

      // Déterminer le statut aléatoire
      const statuses = Object.values(WorkflowStatus);
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      // Créer le workflow
      const workflow = await prisma.workflow.create({
        data: {
          clientId: client.id,
          status: randomStatus,
          metadata: {
            formData: {
              services: ['installation', 'dépannage'],
              zone: clientData.city,
              urgent: Math.random() > 0.5
            },
            source: 'test_script'
          },
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // 0-30 jours
          updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)   // 0-7 jours
        }
      });

      console.log(`✅ Workflow créé avec le statut: ${randomStatus}`);

      // Créer les mockups (seulement si le workflow a dépassé le statut initial)
      if (randomStatus !== WorkflowStatus.FORM_RECEIVED) {
        for (let j = 0; j < 3; j++) {
          const mockupData = testMockups[j];
          const isChosen = randomStatus === WorkflowStatus.CHOSEN && j === 0; // Premier mockup choisi

          await prisma.workflowMockup.create({
            data: {
              workflowId: workflow.id,
              title: `${mockupData.title} - ${clientData.businessType}`,
              url: `${mockupData.url}/${client.id}`,
              thumbnailUrl: mockupData.thumbnailUrl,
              isChosen,
              viewCount: Math.floor(Math.random() * 20)
            }
          });
        }

        console.log(`   📋 3 mockups créés`);
      }

      // Créer les actions historiques
      const actions = [
        {
          type: 'form_received',
          description: 'Formulaire client reçu',
          createdAt: workflow.createdAt
        }
      ];

      if (randomStatus !== WorkflowStatus.FORM_RECEIVED) {
        actions.push({
          type: 'mockups_generated',
          description: 'Mockups générés automatiquement',
          createdAt: new Date(workflow.createdAt.getTime() + 10 * 60 * 1000)
        });
      }

      if ([WorkflowStatus.SENT, WorkflowStatus.VIEWED, WorkflowStatus.CHOSEN, WorkflowStatus.ENRICHED, WorkflowStatus.DEPLOYED].includes(randomStatus)) {
        actions.push({
          type: 'email_sent',
          description: 'Email avec mockups envoyé au client',
          createdAt: new Date(workflow.createdAt.getTime() + 30 * 60 * 1000)
        });
      }

      if ([WorkflowStatus.CHOSEN, WorkflowStatus.ENRICHED, WorkflowStatus.DEPLOYED].includes(randomStatus)) {
        actions.push({
          type: 'choice_made',
          description: 'Client a fait son choix de template',
          createdAt: new Date(workflow.createdAt.getTime() + 2 * 24 * 60 * 60 * 1000)
        });
      }

      if ([WorkflowStatus.ENRICHED, WorkflowStatus.DEPLOYED].includes(randomStatus)) {
        actions.push({
          type: 'enrichment_started',
          description: 'Enrichissement du contenu démarré',
          createdAt: new Date(workflow.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000)
        });
      }

      if (randomStatus === WorkflowStatus.DEPLOYED) {
        actions.push({
          type: 'site_deployed',
          description: 'Site déployé avec succès',
          createdAt: new Date(workflow.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000)
        });
      }

      // Créer toutes les actions
      for (const action of actions) {
        await prisma.workflowAction.create({
          data: {
            workflowId: workflow.id,
            type: action.type,
            description: action.description,
            metadata: { source: 'test_script' },
            createdAt: action.createdAt
          }
        });
      }

      console.log(`   📈 ${actions.length} actions créées`);
      console.log('');
    }

    console.log('🎉 Données de test créées avec succès!\n');

    // Afficher un résumé
    const summary = await generateSummary();
    console.log('📊 RÉSUMÉ DES DONNÉES CRÉÉES:');
    console.log('================================');
    console.log(summary);

  } catch (error) {
    console.error('❌ Erreur lors de la création des données de test:', error);
    throw error;
  }
}

async function generateSummary() {
  const totalWorkflows = await prisma.workflow.count();
  const statusCounts = await prisma.workflow.groupBy({
    by: ['status'],
    _count: {
      id: true
    }
  });

  const mockupsCount = await prisma.workflowMockup.count();
  const actionsCount = await prisma.workflowAction.count();
  const clientsCount = await prisma.client.count();

  let summary = `Total workflows: ${totalWorkflows}\n`;
  summary += `Total clients: ${clientsCount}\n`;
  summary += `Total mockups: ${mockupsCount}\n`;
  summary += `Total actions: ${actionsCount}\n\n`;

  summary += 'Répartition par statut:\n';
  statusCounts.forEach(({ status, _count }) => {
    summary += `  - ${status}: ${_count.id}\n`;
  });

  return summary;
}

async function testAPIRoutes() {
  console.log('🧪 Test des API routes...\n');

  try {
    // Test GET /api/admin/workflows
    console.log('Test: GET /api/admin/workflows');
    const response = await fetch('http://localhost:3000/api/admin/workflows');

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ API fonctionne - ${data.data.workflows.length} workflows récupérés`);
      console.log(`   Stats: ${JSON.stringify(data.data.stats, null, 2)}`);
    } else {
      console.log(`❌ API erreur: ${response.status}`);
    }

  } catch (error) {
    console.log('⚠️  API non disponible (serveur probablement arrêté)');
    console.log('   Pour tester les APIs, démarrez le serveur avec: npm run dev');
  }
}

async function cleanup() {
  console.log('\n🧹 Nettoyage des données de test...');

  try {
    await prisma.workflowAction.deleteMany();
    await prisma.workflowMockup.deleteMany();
    await prisma.workflow.deleteMany();
    await prisma.client.deleteMany();

    console.log('✅ Toutes les données de test ont été supprimées');
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
  }
}

// Script principal
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'create';

  switch (command) {
    case 'create':
      await createTestData();
      await testAPIRoutes();
      break;

    case 'cleanup':
      await cleanup();
      break;

    case 'summary':
      const summary = await generateSummary();
      console.log('📊 ÉTAT ACTUEL DES DONNÉES:');
      console.log('============================');
      console.log(summary);
      break;

    default:
      console.log('Usage: npm run test-admin-dashboard [create|cleanup|summary]');
      console.log('');
      console.log('Commands:');
      console.log('  create  - Crée des données de test (défaut)');
      console.log('  cleanup - Supprime toutes les données de test');
      console.log('  summary - Affiche un résumé des données actuelles');
      break;
  }
}

if (require.main === module) {
  main()
    .catch((error) => {
      console.error('❌ Erreur fatale:', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export { createTestData, cleanup, generateSummary, testAPIRoutes };
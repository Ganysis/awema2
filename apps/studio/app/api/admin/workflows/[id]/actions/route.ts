import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { WorkflowStatus } from '@/lib/types/workflow.types';

const prisma = new PrismaClient();

// POST /api/admin/workflows/[id]/actions - Exécuter une action sur un workflow
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workflowId = params.id;
    const body = await request.json();
    const { action, metadata = {} } = body;

    // Vérifier que le workflow existe
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
      include: {
        client: true,
        mockups: true
      }
    });

    if (!workflow) {
      return NextResponse.json(
        { success: false, error: 'Workflow non trouvé' },
        { status: 404 }
      );
    }

    let result;
    let newStatus = workflow.status;
    let actionDescription = '';

    switch (action) {
      case 'generate_mockups':
        result = await generateMockups(workflow);
        newStatus = WorkflowStatus.MOCKUPS_READY;
        actionDescription = 'Génération des mockups initiée';
        break;

      case 'send_email':
        result = await sendEmailToClient(workflow);
        newStatus = WorkflowStatus.SENT;
        actionDescription = 'Email avec mockups envoyé au client';
        break;

      case 'send_reminder':
        result = await sendReminderEmail(workflow);
        actionDescription = 'Email de rappel envoyé au client';
        break;

      case 'start_enrichment':
        result = await startContentEnrichment(workflow);
        newStatus = WorkflowStatus.ENRICHED;
        actionDescription = 'Enrichissement du contenu initié';
        break;

      case 'deploy_site':
        result = await deploySite(workflow);
        newStatus = WorkflowStatus.DEPLOYED;
        actionDescription = 'Site déployé avec succès';
        break;

      case 'archive':
        result = await archiveWorkflow(workflow);
        actionDescription = 'Workflow archivé';
        break;

      default:
        return NextResponse.json(
          { success: false, error: `Action "${action}" non reconnue` },
          { status: 400 }
        );
    }

    // Mettre à jour le statut si nécessaire
    if (newStatus !== workflow.status) {
      await prisma.workflow.update({
        where: { id: workflowId },
        data: {
          status: newStatus,
          updatedAt: new Date(),
          metadata: {
            ...workflow.metadata,
            ...result.metadata
          }
        }
      });
    }

    // Enregistrer l'action
    await prisma.workflowAction.create({
      data: {
        workflowId,
        type: action,
        description: actionDescription,
        metadata: {
          ...metadata,
          ...result.metadata,
          executedBy: 'admin',
          executedAt: new Date().toISOString()
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: actionDescription
    });

  } catch (error) {
    console.error('Error executing workflow action:', error);
    return NextResponse.json(
      { success: false, error: `Erreur lors de l'exécution de l'action: ${error.message}` },
      { status: 500 }
    );
  }
}

// Actions spécifiques
async function generateMockups(workflow: any) {
  // Simuler l'appel à l'Agent 3 pour générer les mockups
  try {
    const mockupsResponse = await fetch('/api/generate-mockups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientData: workflow.client,
        formData: workflow.metadata.formData
      })
    });

    if (!mockupsResponse.ok) {
      throw new Error('Erreur lors de la génération des mockups');
    }

    const mockupsData = await mockupsResponse.json();

    // Enregistrer les mockups en base
    for (const mockup of mockupsData.mockups) {
      await prisma.workflowMockup.create({
        data: {
          workflowId: workflow.id,
          title: mockup.title,
          url: mockup.url,
          thumbnailUrl: mockup.thumbnailUrl
        }
      });
    }

    return {
      success: true,
      mockupsGenerated: mockupsData.mockups.length,
      metadata: {
        mockupsUrls: mockupsData.mockups.map(m => m.url),
        generationTime: Date.now()
      }
    };

  } catch (error) {
    throw new Error(`Erreur génération mockups: ${error.message}`);
  }
}

async function sendEmailToClient(workflow: any) {
  // Simuler l'appel à l'Agent 5 pour envoyer l'email
  try {
    const emailResponse = await fetch('/api/send-client-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workflowId: workflow.id,
        clientEmail: workflow.client.email,
        clientName: workflow.client.name,
        mockupsUrls: workflow.mockups.map(m => m.url)
      })
    });

    if (!emailResponse.ok) {
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }

    const emailData = await emailResponse.json();

    return {
      success: true,
      emailSent: true,
      metadata: {
        emailId: emailData.emailId,
        sentAt: new Date().toISOString()
      }
    };

  } catch (error) {
    throw new Error(`Erreur envoi email: ${error.message}`);
  }
}

async function sendReminderEmail(workflow: any) {
  // Email de rappel
  try {
    const reminderResponse = await fetch('/api/send-reminder-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workflowId: workflow.id,
        clientEmail: workflow.client.email,
        clientName: workflow.client.name
      })
    });

    if (!reminderResponse.ok) {
      throw new Error('Erreur lors de l\'envoi du rappel');
    }

    return {
      success: true,
      reminderSent: true,
      metadata: {
        reminderSentAt: new Date().toISOString()
      }
    };

  } catch (error) {
    throw new Error(`Erreur envoi rappel: ${error.message}`);
  }
}

async function startContentEnrichment(workflow: any) {
  // Simuler l'appel à l'Agent 7 pour enrichir le contenu
  try {
    const enrichmentResponse = await fetch('/api/enrich-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workflowId: workflow.id,
        chosenMockup: workflow.mockups.find(m => m.isChosen),
        clientData: workflow.client
      })
    });

    if (!enrichmentResponse.ok) {
      throw new Error('Erreur lors de l\'enrichissement');
    }

    const enrichmentData = await enrichmentResponse.json();

    return {
      success: true,
      contentEnriched: true,
      metadata: {
        enrichmentId: enrichmentData.enrichmentId,
        enrichedAt: new Date().toISOString(),
        wordsGenerated: enrichmentData.wordsGenerated
      }
    };

  } catch (error) {
    throw new Error(`Erreur enrichissement: ${error.message}`);
  }
}

async function deploySite(workflow: any) {
  // Simuler l'appel à l'Agent 8 pour déployer le site
  try {
    const deploymentResponse = await fetch('/api/deploy-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workflowId: workflow.id,
        clientData: workflow.client
      })
    });

    if (!deploymentResponse.ok) {
      throw new Error('Erreur lors du déploiement');
    }

    const deploymentData = await deploymentResponse.json();

    return {
      success: true,
      siteDeployed: true,
      metadata: {
        deploymentUrl: deploymentData.url,
        deployedAt: new Date().toISOString()
      }
    };

  } catch (error) {
    throw new Error(`Erreur déploiement: ${error.message}`);
  }
}

async function archiveWorkflow(workflow: any) {
  // Archiver le workflow
  await prisma.workflow.update({
    where: { id: workflow.id },
    data: {
      metadata: {
        ...workflow.metadata,
        archived: true,
        archivedAt: new Date().toISOString()
      }
    }
  });

  return {
    success: true,
    archived: true,
    metadata: {
      archivedAt: new Date().toISOString()
    }
  };
}
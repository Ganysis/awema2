import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { SelectionResponse, TemplateVariant } from '@/types/client-selection.types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      workflowId,
      selectedTemplate,
      mockupId,
      clientInfo
    } = body;

    // Validation des données requises
    if (!workflowId || !selectedTemplate || !mockupId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données manquantes: workflowId, selectedTemplate, et mockupId sont requis'
        } satisfies SelectionResponse,
        { status: 400 }
      );
    }

    // Validation du template
    const validTemplates: TemplateVariant[] = ['sydney', 'locomotive', 'nextspace'];
    if (!validTemplates.includes(selectedTemplate)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template sélectionné invalide'
        } satisfies SelectionResponse,
        { status: 400 }
      );
    }

    // Récupération des informations de la requête
    const clientIP =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Transaction pour assurer la cohérence
    const result = await prisma.$transaction(async (tx) => {
      // Vérifier que le workflow existe et n'a pas déjà une sélection
      const workflow = await tx.workflowInstance.findUnique({
        where: { id: workflowId },
        include: { client: true }
      });

      if (!workflow) {
        throw new Error('Workflow non trouvé');
      }

      if (workflow.status === 'chosen') {
        throw new Error('Une sélection a déjà été effectuée pour ce workflow');
      }

      if (new Date() > workflow.expiresAt) {
        throw new Error('Ce workflow a expiré');
      }

      // Créer l'enregistrement de sélection
      const selection = await tx.clientSelection.create({
        data: {
          workflowId,
          selectedTemplate,
          mockupId,
          clientIP,
          userAgent,
          deviceInfo: clientInfo?.device || 'unknown',
          metadata: {
            timestamp: new Date().toISOString(),
            ...clientInfo
          }
        }
      });

      // Mettre à jour le statut du workflow
      await tx.workflowInstance.update({
        where: { id: workflowId },
        data: {
          status: 'chosen',
          selectedTemplate,
          selectedAt: new Date()
        }
      });

      // Créer une notification pour l'admin
      await tx.adminNotification.create({
        data: {
          type: 'TEMPLATE_SELECTED',
          title: 'Nouveau choix de template',
          message: `${workflow.client.businessName} a choisi le template ${selectedTemplate}`,
          data: {
            workflowId,
            clientId: workflow.clientId,
            selectedTemplate,
            clientName: workflow.client.businessName
          },
          priority: 'HIGH'
        }
      });

      return selection;
    });

    // Notification en temps réel (optionnel - peut être via WebSocket, SSE, etc.)
    try {
      // Ici on pourrait ajouter une notification push, email, etc.
      await sendAdminNotification({
        type: 'template_selected',
        workflowId,
        selectedTemplate,
        clientName: result.workflowId
      });
    } catch (notifError) {
      console.error('Erreur lors de l\'envoi de la notification:', notifError);
      // Ne pas faire échouer la requête pour une erreur de notification
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Sélection enregistrée avec succès',
        data: {
          selectionId: result.id,
          workflowId,
          nextStep: `/client-selection/${workflowId}/thank-you?template=${selectedTemplate}`
        }
      } satisfies SelectionResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la sélection:', error);

    const errorMessage = error instanceof Error
      ? error.message
      : 'Une erreur inattendue est survenue';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage
      } satisfies SelectionResponse,
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour les notifications admin
async function sendAdminNotification(data: {
  type: string;
  workflowId: string;
  selectedTemplate: string;
  clientName: string;
}) {
  // Ici on peut implémenter différents types de notifications :
  // - Email
  // - Webhook
  // - Push notification
  // - Slack/Discord

  console.log('📱 Notification admin:', data);

  // Exemple d'envoi d'email (à implémenter selon le service choisi)
  /*
  await emailService.send({
    to: process.env.ADMIN_EMAIL,
    subject: `Nouveau choix de template - ${data.clientName}`,
    template: 'template-selection',
    data
  });
  */

  // Exemple de webhook (à implémenter si nécessaire)
  /*
  await fetch(process.env.ADMIN_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  */
}

// GET pour récupérer les sélections (pour admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get('workflowId');

    if (!workflowId) {
      return NextResponse.json(
        { success: false, error: 'workflowId requis' },
        { status: 400 }
      );
    }

    const selection = await prisma.clientSelection.findFirst({
      where: { workflowId },
      include: {
        workflow: {
          include: { client: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: selection
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de la sélection:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
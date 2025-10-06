import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { WorkflowStatus } from '@/lib/types/workflow.types';

const prisma = new PrismaClient();

// GET /api/admin/workflows/[id] - Récupérer un workflow spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workflowId = params.id;

    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
      include: {
        client: true,
        mockups: {
          orderBy: { createdAt: 'desc' }
        },
        actions: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!workflow) {
      return NextResponse.json(
        { success: false, error: 'Workflow non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: workflow
    });

  } catch (error) {
    console.error('Error fetching workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du workflow' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/workflows/[id] - Mettre à jour un workflow
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workflowId = params.id;
    const body = await request.json();
    const { status, metadata, actionDescription } = body;

    // Vérifier que le workflow existe
    const existingWorkflow = await prisma.workflow.findUnique({
      where: { id: workflowId }
    });

    if (!existingWorkflow) {
      return NextResponse.json(
        { success: false, error: 'Workflow non trouvé' },
        { status: 404 }
      );
    }

    // Mettre à jour le workflow
    const updatedWorkflow = await prisma.workflow.update({
      where: { id: workflowId },
      data: {
        status: status || existingWorkflow.status,
        metadata: metadata ? { ...existingWorkflow.metadata, ...metadata } : existingWorkflow.metadata,
        updatedAt: new Date()
      },
      include: {
        client: true,
        mockups: true,
        actions: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    // Créer une action si le statut a changé
    if (status && status !== existingWorkflow.status) {
      await prisma.workflowAction.create({
        data: {
          workflowId,
          type: getActionTypeFromStatus(status),
          description: actionDescription || `Statut changé vers ${status}`,
          metadata: { previousStatus: existingWorkflow.status, source: 'admin_dashboard' }
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedWorkflow,
      message: 'Workflow mis à jour avec succès'
    });

  } catch (error) {
    console.error('Error updating workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du workflow' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/workflows/[id] - Supprimer un workflow
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const workflowId = params.id;

    // Vérifier que le workflow existe
    const existingWorkflow = await prisma.workflow.findUnique({
      where: { id: workflowId }
    });

    if (!existingWorkflow) {
      return NextResponse.json(
        { success: false, error: 'Workflow non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer les relations d'abord
    await prisma.workflowAction.deleteMany({
      where: { workflowId }
    });

    await prisma.workflowMockup.deleteMany({
      where: { workflowId }
    });

    // Supprimer le workflow
    await prisma.workflow.delete({
      where: { id: workflowId }
    });

    return NextResponse.json({
      success: true,
      message: 'Workflow supprimé avec succès'
    });

  } catch (error) {
    console.error('Error deleting workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du workflow' },
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour obtenir le type d'action basé sur le statut
function getActionTypeFromStatus(status: WorkflowStatus): string {
  switch (status) {
    case WorkflowStatus.MOCKUPS_READY:
      return 'mockups_generated';
    case WorkflowStatus.SENT:
      return 'email_sent';
    case WorkflowStatus.VIEWED:
      return 'email_viewed';
    case WorkflowStatus.CHOSEN:
      return 'choice_made';
    case WorkflowStatus.ENRICHED:
      return 'enrichment_completed';
    case WorkflowStatus.DEPLOYED:
      return 'site_deployed';
    default:
      return 'status_updated';
  }
}
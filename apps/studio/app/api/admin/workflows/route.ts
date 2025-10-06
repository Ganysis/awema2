import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Workflow, WorkflowStatus, WorkflowStats, WorkflowFilters } from '@/lib/types/workflow.types';

const prisma = new PrismaClient();

// GET /api/admin/workflows - Liste tous les workflows avec filtres
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extraction des filtres
    const filters: WorkflowFilters = {
      status: searchParams.get('status') as WorkflowStatus || undefined,
      businessType: searchParams.get('businessType') || undefined,
      search: searchParams.get('search') || undefined,
      dateRange: searchParams.get('dateFrom') && searchParams.get('dateTo')
        ? [new Date(searchParams.get('dateFrom')!), new Date(searchParams.get('dateTo')!)]
        : undefined
    };

    // Construction de la requête WHERE
    const whereClause: any = {};

    if (filters.status) {
      whereClause.status = filters.status;
    }

    if (filters.businessType) {
      whereClause.client = {
        ...whereClause.client,
        businessType: filters.businessType
      };
    }

    if (filters.search) {
      whereClause.OR = [
        {
          client: {
            name: {
              contains: filters.search,
              mode: 'insensitive'
            }
          }
        },
        {
          client: {
            email: {
              contains: filters.search,
              mode: 'insensitive'
            }
          }
        }
      ];
    }

    if (filters.dateRange) {
      whereClause.createdAt = {
        gte: filters.dateRange[0],
        lte: filters.dateRange[1]
      };
    }

    // Récupération des workflows avec relations
    const workflows = await prisma.workflow.findMany({
      where: whereClause,
      include: {
        client: true,
        mockups: true,
        actions: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Calcul des statistiques
    const stats = await calculateStats();

    return NextResponse.json({
      success: true,
      data: {
        workflows,
        stats,
        total: workflows.length
      }
    });

  } catch (error) {
    console.error('Error fetching workflows:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des workflows' },
      { status: 500 }
    );
  }
}

// POST /api/admin/workflows - Créer un nouveau workflow
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientData, formData } = body;

    // Créer le client
    const client = await prisma.client.create({
      data: {
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        businessType: clientData.businessType,
        city: clientData.city
      }
    });

    // Créer le workflow
    const workflow = await prisma.workflow.create({
      data: {
        clientId: client.id,
        status: WorkflowStatus.FORM_RECEIVED,
        metadata: {
          formData: formData || {}
        }
      },
      include: {
        client: true,
        mockups: true,
        actions: true
      }
    });

    // Créer l'action initiale
    await prisma.workflowAction.create({
      data: {
        workflowId: workflow.id,
        type: 'form_received',
        description: 'Formulaire client reçu',
        metadata: { source: 'admin_dashboard' }
      }
    });

    return NextResponse.json({
      success: true,
      data: workflow,
      message: 'Workflow créé avec succès'
    });

  } catch (error) {
    console.error('Error creating workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du workflow' },
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour calculer les statistiques
async function calculateStats(): Promise<WorkflowStats> {
  try {
    const totalWorkflows = await prisma.workflow.count();

    // Répartition par statut
    const statusCounts = await prisma.workflow.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    });

    const byStatus: Record<WorkflowStatus, number> = {} as Record<WorkflowStatus, number>;
    Object.values(WorkflowStatus).forEach(status => {
      byStatus[status] = 0;
    });

    statusCounts.forEach(({ status, _count }) => {
      byStatus[status as WorkflowStatus] = _count.id;
    });

    // Calcul du taux de conversion
    const deployedCount = byStatus[WorkflowStatus.DEPLOYED] || 0;
    const conversionRate = totalWorkflows > 0 ? (deployedCount / totalWorkflows) * 100 : 0;

    // Temps moyen de choix (workflow envoyé → choix effectué)
    const chosenWorkflows = await prisma.workflow.findMany({
      where: {
        status: {
          in: [WorkflowStatus.CHOSEN, WorkflowStatus.ENRICHED, WorkflowStatus.DEPLOYED]
        }
      },
      include: {
        actions: {
          where: {
            type: {
              in: ['email_sent', 'choice_made']
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    let totalTimeToChoice = 0;
    let validTimeCalculations = 0;

    chosenWorkflows.forEach(workflow => {
      const emailSent = workflow.actions.find(a => a.type === 'email_sent');
      const choiceMade = workflow.actions.find(a => a.type === 'choice_made');

      if (emailSent && choiceMade) {
        const timeDiff = new Date(choiceMade.createdAt).getTime() - new Date(emailSent.createdAt).getTime();
        totalTimeToChoice += timeDiff;
        validTimeCalculations++;
      }
    });

    const avgTimeToChoice = validTimeCalculations > 0
      ? totalTimeToChoice / validTimeCalculations / (1000 * 60 * 60) // en heures
      : 0;

    // Temps moyen de génération (approximation)
    const avgGenerationTime = 15; // minutes

    // Revenus estimés (basé sur le nombre de déploiements)
    const avgPricePerSite = 2500; // euros
    const totalRevenue = deployedCount * avgPricePerSite;

    return {
      total: totalWorkflows,
      byStatus,
      avgTimeToChoice,
      conversionRate,
      avgGenerationTime,
      totalRevenue
    };

  } catch (error) {
    console.error('Error calculating stats:', error);
    throw error;
  }
}
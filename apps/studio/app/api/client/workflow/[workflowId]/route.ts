import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { WorkflowResponse } from '@/types/client-selection.types';

export async function GET(
  request: NextRequest,
  { params }: { params: { workflowId: string } }
) {
  try {
    const { workflowId } = params;

    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: 'WorkflowId requis'
        } satisfies WorkflowResponse,
        { status: 400 }
      );
    }

    // Récupérer le workflow avec toutes les données nécessaires
    const workflow = await prisma.workflowInstance.findUnique({
      where: { id: workflowId },
      include: {
        client: {
          select: {
            id: true,
            businessName: true,
            businessType: true,
            email: true,
            phone: true
          }
        },
        mockups: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!workflow) {
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow non trouvé'
        } satisfies WorkflowResponse,
        { status: 404 }
      );
    }

    // Vérifier si le workflow a expiré
    const now = new Date();
    if (workflow.expiresAt < now) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ce workflow a expiré. Veuillez contacter votre prestataire pour un nouveau lien.'
        } satisfies WorkflowResponse,
        { status: 410 }
      );
    }

    // Vérifier le statut du workflow
    if (workflow.status !== 'awaiting_selection' && workflow.status !== 'mockups_ready') {
      let errorMessage = 'Ce workflow n\'est pas dans un état valide pour la sélection.';

      if (workflow.status === 'chosen') {
        errorMessage = 'Un template a déjà été sélectionné pour ce workflow.';
      } else if (workflow.status === 'pending') {
        errorMessage = 'Les mockups ne sont pas encore prêts. Veuillez réessayer plus tard.';
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage
        } satisfies WorkflowResponse,
        { status: 400 }
      );
    }

    // Vérifier qu'il y a des mockups disponibles
    if (!workflow.mockups || workflow.mockups.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Aucun mockup disponible pour ce workflow. Veuillez contacter le support.'
        } satisfies WorkflowResponse,
        { status: 400 }
      );
    }

    // Transformer les données pour le frontend
    const mockupsData = workflow.mockups.map(mockup => ({
      id: mockup.id,
      name: mockup.name,
      variant: mockup.variant,
      previewUrl: mockup.previewUrl,
      thumbnailUrl: mockup.thumbnailUrl,
      description: mockup.description || `Template ${mockup.variant} personnalisé`,
      features: mockup.features || [
        'Design responsive',
        'Optimisé SEO',
        'Chargement rapide'
      ],
      category: workflow.client.businessType,
      lastUpdated: mockup.updatedAt
    }));

    const workflowData = {
      id: workflow.id,
      clientName: workflow.client.businessName,
      businessType: workflow.client.businessType,
      mockups: mockupsData,
      status: workflow.status,
      createdAt: workflow.createdAt,
      expiresAt: workflow.expiresAt,
      metadata: {
        clientEmail: workflow.client.email,
        formData: workflow.formData || {}
      }
    };

    // Enregistrer la vue du workflow (tracking)
    try {
      await prisma.workflowView.create({
        data: {
          workflowId,
          clientIP: request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip') ||
                   'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown',
          referrer: request.headers.get('referer') || null
        }
      });
    } catch (trackingError) {
      // Ne pas faire échouer la requête si le tracking échoue
      console.warn('Erreur lors du tracking de la vue:', trackingError);
    }

    return NextResponse.json(
      {
        success: true,
        data: workflowData
      } satisfies WorkflowResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la récupération du workflow:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Une erreur inattendue est survenue lors du chargement des données'
      } satisfies WorkflowResponse,
      { status: 500 }
    );
  }
}

// PUT pour mettre à jour le statut du workflow (pour usage admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { workflowId: string } }
) {
  try {
    const { workflowId } = params;
    const body = await request.json();
    const { status, metadata } = body;

    // Vérification des permissions admin (à implémenter selon le système d'auth)
    // const isAdmin = await checkAdminPermission(request);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    // }

    const workflow = await prisma.workflowInstance.update({
      where: { id: workflowId },
      data: {
        status,
        ...(metadata && { metadata }),
        updatedAt: new Date()
      },
      include: {
        client: true,
        mockups: true
      }
    });

    return NextResponse.json({
      success: true,
      data: workflow
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du workflow:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}
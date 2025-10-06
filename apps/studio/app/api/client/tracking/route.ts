import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { SelectionEvent } from '@/types/client-selection.types';

export async function POST(request: NextRequest) {
  try {
    const body: SelectionEvent = await request.json();
    const { type, data } = body;

    // Validation des données de base
    if (!type || !data || !data.workflowId) {
      return NextResponse.json(
        { success: false, error: 'Données de tracking incomplètes' },
        { status: 400 }
      );
    }

    // Récupération des informations de la requête
    const clientIP =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Enregistrement de l'événement de tracking
    const trackingEvent = await prisma.clientTracking.create({
      data: {
        workflowId: data.workflowId,
        eventType: type,
        eventData: {
          ...data,
          clientIP,
          userAgent,
          timestamp: new Date().toISOString()
        },
        createdAt: new Date()
      }
    });

    // Actions spécifiques selon le type d'événement
    switch (type) {
      case 'page_view':
        await handlePageView(data, clientIP, userAgent);
        break;

      case 'mockup_view':
        await handleMockupView(data, clientIP, userAgent);
        break;

      case 'device_change':
        await handleDeviceChange(data, clientIP, userAgent);
        break;

      case 'selection_made':
        await handleSelectionMade(data, clientIP, userAgent);
        break;
    }

    return NextResponse.json({
      success: true,
      eventId: trackingEvent.id
    });

  } catch (error) {
    console.error('Erreur lors du tracking:', error);

    // En cas d'erreur, on retourne un succès pour ne pas perturber l'UX
    return NextResponse.json({
      success: true,
      error: 'Tracking failed silently'
    });
  }
}

async function handlePageView(data: any, clientIP: string, userAgent: string) {
  try {
    // Créer ou mettre à jour la session utilisateur
    const session = await prisma.clientSession.upsert({
      where: {
        workflowId_sessionKey: {
          workflowId: data.workflowId,
          sessionKey: `${clientIP}_${userAgent.slice(0, 50)}`
        }
      },
      update: {
        lastActivity: new Date(),
        pageViews: { increment: 1 }
      },
      create: {
        workflowId: data.workflowId,
        sessionKey: `${clientIP}_${userAgent.slice(0, 50)}`,
        clientIP,
        userAgent,
        device: data.device || 'unknown',
        firstVisit: new Date(),
        lastActivity: new Date(),
        pageViews: 1
      }
    });

    // Mettre à jour les statistiques du workflow
    await prisma.workflowInstance.update({
      where: { id: data.workflowId },
      data: {
        viewCount: { increment: 1 },
        lastViewed: new Date()
      }
    });

  } catch (error) {
    console.error('Erreur lors du traitement de page_view:', error);
  }
}

async function handleMockupView(data: any, clientIP: string, userAgent: string) {
  try {
    if (!data.template) return;

    // Enregistrer la vue du mockup spécifique
    await prisma.mockupView.create({
      data: {
        workflowId: data.workflowId,
        mockupVariant: data.template,
        device: data.device || 'unknown',
        clientIP,
        userAgent,
        viewDuration: data.duration || 0
      }
    });

    // Mettre à jour les statistiques du mockup
    await prisma.mockup.updateMany({
      where: {
        workflowId: data.workflowId,
        variant: data.template
      },
      data: {
        viewCount: { increment: 1 }
      }
    });

  } catch (error) {
    console.error('Erreur lors du traitement de mockup_view:', error);
  }
}

async function handleDeviceChange(data: any, clientIP: string, userAgent: string) {
  try {
    // Enregistrer le changement de device
    await prisma.deviceChange.create({
      data: {
        workflowId: data.workflowId,
        fromDevice: data.fromDevice || 'unknown',
        toDevice: data.device || 'unknown',
        clientIP,
        userAgent
      }
    });

    // Mettre à jour la session avec le dernier device utilisé
    await prisma.clientSession.updateMany({
      where: {
        workflowId: data.workflowId,
        clientIP
      },
      data: {
        device: data.device || 'unknown',
        lastActivity: new Date()
      }
    });

  } catch (error) {
    console.error('Erreur lors du traitement de device_change:', error);
  }
}

async function handleSelectionMade(data: any, clientIP: string, userAgent: string) {
  try {
    // Mettre à jour la session avec la sélection
    await prisma.clientSession.updateMany({
      where: {
        workflowId: data.workflowId,
        clientIP
      },
      data: {
        selectedTemplate: data.template,
        selectionMadeAt: new Date(),
        sessionDuration: data.duration || 0,
        lastActivity: new Date()
      }
    });

    // Créer un événement de conversion
    await prisma.conversionEvent.create({
      data: {
        workflowId: data.workflowId,
        selectedTemplate: data.template,
        device: data.device || 'unknown',
        sessionDuration: data.duration || 0,
        clientIP,
        userAgent
      }
    });

    // Mettre à jour les métriques globales
    await updateConversionMetrics(data.workflowId, data.template);

  } catch (error) {
    console.error('Erreur lors du traitement de selection_made:', error);
  }
}

async function updateConversionMetrics(workflowId: string, selectedTemplate: string) {
  try {
    // Calculer le taux de conversion
    const totalViews = await prisma.workflowView.count({
      where: { workflowId }
    });

    const conversions = await prisma.clientSelection.count({
      where: { workflowId }
    });

    const conversionRate = totalViews > 0 ? (conversions / totalViews) * 100 : 0;

    // Mettre à jour les métriques du workflow
    await prisma.workflowMetrics.upsert({
      where: { workflowId },
      update: {
        totalViews,
        conversions,
        conversionRate,
        selectedTemplate,
        updatedAt: new Date()
      },
      create: {
        workflowId,
        totalViews,
        conversions,
        conversionRate,
        selectedTemplate
      }
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour des métriques:', error);
  }
}

// GET pour récupérer les statistiques de tracking (pour admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get('workflowId');
    const eventType = searchParams.get('eventType');

    if (!workflowId) {
      return NextResponse.json(
        { success: false, error: 'workflowId requis' },
        { status: 400 }
      );
    }

    const whereClause: any = { workflowId };
    if (eventType) {
      whereClause.eventType = eventType;
    }

    const events = await prisma.clientTracking.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: 100
    });

    // Récupérer aussi les métriques générales
    const metrics = await prisma.workflowMetrics.findUnique({
      where: { workflowId }
    });

    const sessions = await prisma.clientSession.findMany({
      where: { workflowId },
      orderBy: { lastActivity: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: {
        events,
        metrics,
        sessions,
        summary: {
          totalEvents: events.length,
          uniqueSessions: sessions.length,
          conversionRate: metrics?.conversionRate || 0
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
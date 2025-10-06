import { NextRequest, NextResponse } from 'next/server';
import { emailAnalyticsService } from '@/lib/services/email-analytics.service';

export const runtime = 'nodejs';

/**
 * API route pour les analytics d'emails
 * GET /api/emails/analytics - Dashboard général
 * GET /api/emails/analytics?trackingId=xxx - Stats d'un email spécifique
 * GET /api/emails/analytics?campaign=xxx - Stats d'une campagne
 * GET /api/emails/analytics?export=json&period=30d - Export des données
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const trackingId = searchParams.get('trackingId');
    const campaign = searchParams.get('campaign');
    const exportFormat = searchParams.get('export') as 'json' | 'csv' | null;
    const period = searchParams.get('period') || '7d';

    // Export des données
    if (exportFormat) {
      console.log(`📊 Export analytics: ${exportFormat} (période: ${period})`);

      const exportData = await emailAnalyticsService.exportAnalytics(exportFormat, period);

      if (exportFormat === 'csv') {
        return new NextResponse(exportData.data, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="${exportData.filename}"`
          }
        });
      }

      return NextResponse.json(exportData.data, {
        headers: {
          'Content-Disposition': `attachment; filename="${exportData.filename}"`
        }
      });
    }

    // Stats d'un email spécifique
    if (trackingId) {
      console.log(`📊 Récupération stats email: ${trackingId}`);

      const stats = await emailAnalyticsService.getEmailStats(trackingId);

      if (!stats) {
        return NextResponse.json(
          { error: 'Aucune statistique trouvée pour ce tracking ID' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: stats,
        metadata: {
          trackingId,
          generatedAt: new Date().toISOString()
        }
      });
    }

    // Stats d'une campagne spécifique
    if (campaign) {
      console.log(`📊 Récupération stats campagne: ${campaign}`);

      const stats = await emailAnalyticsService.getCampaignStats(campaign);

      return NextResponse.json({
        success: true,
        data: stats,
        metadata: {
          campaignId: campaign,
          generatedAt: new Date().toISOString()
        }
      });
    }

    // Dashboard général
    console.log(`📊 Génération dashboard analytics (période: ${period})`);

    const dashboard = await emailAnalyticsService.getAnalyticsDashboard(period);

    return NextResponse.json({
      success: true,
      data: dashboard,
      metadata: {
        period,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Erreur API analytics:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des analytics',
      details: error.message
    }, { status: 500 });
  }
}

/**
 * API route pour enregistrer des événements personnalisés
 * POST /api/emails/analytics
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      event,
      trackingId,
      clientId,
      clientEmail,
      source,
      targetUrl,
      metadata
    } = body;

    // Validation des données requises
    if (!event || !trackingId || !clientEmail) {
      return NextResponse.json(
        { error: 'event, trackingId et clientEmail sont requis' },
        { status: 400 }
      );
    }

    // Validation du type d'événement
    const validEvents = ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'unsubscribed'];
    if (!validEvents.includes(event)) {
      return NextResponse.json(
        { error: `Type d'événement invalide. Doit être: ${validEvents.join(', ')}` },
        { status: 400 }
      );
    }

    console.log(`📊 Enregistrement événement: ${event} - ${trackingId}`);

    // Ajouter les données de la requête
    const eventData = {
      event,
      trackingId,
      clientId,
      clientEmail,
      source,
      targetUrl,
      metadata,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      referer: request.headers.get('referer')
    };

    const eventId = await emailAnalyticsService.logEvent(eventData);

    return NextResponse.json({
      success: true,
      message: 'Événement enregistré',
      data: {
        eventId,
        event,
        trackingId,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Erreur enregistrement événement:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'enregistrement de l\'événement',
      details: error.message
    }, { status: 500 });
  }
}

/**
 * API route pour les statistiques en temps réel
 * PUT /api/emails/analytics - Mise à jour des stats
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, trackingId, data } = body;

    if (!action || !trackingId) {
      return NextResponse.json(
        { error: 'action et trackingId sont requis' },
        { status: 400 }
      );
    }

    console.log(`📊 Action analytics: ${action} - ${trackingId}`);

    switch (action) {
      case 'refresh_stats':
        // Recalculer les stats pour un tracking ID spécifique
        const stats = await emailAnalyticsService.getEmailStats(trackingId);
        return NextResponse.json({
          success: true,
          data: stats
        });

      case 'bulk_update':
        // Mise à jour en lot (pour les webhooks de providers d'email)
        if (Array.isArray(data.events)) {
          const eventIds = [];
          for (const eventData of data.events) {
            const eventId = await emailAnalyticsService.logEvent({
              ...eventData,
              userAgent: request.headers.get('user-agent'),
              ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
            });
            eventIds.push(eventId);
          }

          return NextResponse.json({
            success: true,
            message: `${eventIds.length} événements traités`,
            data: { eventIds }
          });
        }
        break;

      default:
        return NextResponse.json(
          { error: `Action non supportée: ${action}` },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('❌ Erreur action analytics:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'action analytics',
      details: error.message
    }, { status: 500 });
  }
}

/**
 * API route pour supprimer des données (RGPD)
 * DELETE /api/emails/analytics?trackingId=xxx
 * DELETE /api/emails/analytics?clientEmail=xxx
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const trackingId = searchParams.get('trackingId');
    const clientEmail = searchParams.get('clientEmail');

    if (!trackingId && !clientEmail) {
      return NextResponse.json(
        { error: 'trackingId ou clientEmail requis' },
        { status: 400 }
      );
    }

    console.log(`🗑️ Suppression données analytics: ${trackingId || clientEmail}`);

    // Pour l'instant, on simule la suppression
    // Dans une vraie implémentation, on supprimerait les données de la base

    return NextResponse.json({
      success: true,
      message: 'Données supprimées (simulation)',
      deleted: {
        trackingId,
        clientEmail,
        deletedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Erreur suppression analytics:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la suppression',
      details: error.message
    }, { status: 500 });
  }
}
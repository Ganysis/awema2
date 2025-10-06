import { NextRequest, NextResponse } from 'next/server';
import { emailMockupsService } from '@/lib/services/email-mockups.service';

/**
 * API route pour le tracking des clics dans les emails
 * GET /api/emails/track/click/[trackingId]?url=...&source=...
 *
 * Cette route enregistre le clic et redirige vers l'URL de destination
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { trackingId: string } }
) {
  try {
    const { trackingId } = params;
    const searchParams = request.nextUrl.searchParams;
    const targetUrl = searchParams.get('url');
    const source = searchParams.get('source') || 'unknown';

    if (!trackingId) {
      return NextResponse.json(
        { error: 'Tracking ID manquant' },
        { status: 400 }
      );
    }

    if (!targetUrl) {
      return NextResponse.json(
        { error: 'URL de destination manquante' },
        { status: 400 }
      );
    }

    console.log(`🖱️ Clic email tracké: ${trackingId} -> ${source}`);

    // Enregistrer le clic
    emailMockupsService.trackEmailClick(trackingId);

    // Log détaillé pour analytics
    const clickData = {
      timestamp: new Date().toISOString(),
      event: 'email_clicked',
      trackingId,
      source,
      targetUrl: decodeURIComponent(targetUrl),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      referer: request.headers.get('referer')
    };

    console.log('📊 Email cliqué:', clickData);

    // Ici on pourrait envoyer à une base de données ou service d'analytics
    // await logEmailEvent(clickData);

    // Décoder l'URL de destination
    const decodedUrl = decodeURIComponent(targetUrl);

    // Validation basique de l'URL
    let redirectUrl: string;
    try {
      new URL(decodedUrl); // Validation
      redirectUrl = decodedUrl;
    } catch {
      // Si ce n'est pas une URL complète, on assume que c'est un chemin relatif
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://studio.awema.fr';
      redirectUrl = `${baseUrl}${decodedUrl.startsWith('/') ? '' : '/'}${decodedUrl}`;
    }

    console.log(`↗️ Redirection vers: ${redirectUrl}`);

    // Redirection vers l'URL de destination
    return NextResponse.redirect(redirectUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

  } catch (error) {
    console.error('❌ Erreur tracking clic:', error);

    // En cas d'erreur, rediriger vers l'accueil plutôt que de renvoyer une erreur
    const fallbackUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://studio.awema.fr';

    return NextResponse.redirect(fallbackUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}

/**
 * POST endpoint pour tracking de clics via JavaScript (optionnel)
 * POST /api/emails/track/click/[trackingId]
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { trackingId: string } }
) {
  try {
    const { trackingId } = params;
    const body = await request.json();
    const { source, targetUrl, metadata } = body;

    if (!trackingId) {
      return NextResponse.json(
        { error: 'Tracking ID manquant' },
        { status: 400 }
      );
    }

    console.log(`🖱️ Clic JS tracké: ${trackingId} -> ${source}`);

    // Enregistrer le clic
    emailMockupsService.trackEmailClick(trackingId);

    // Log détaillé
    const clickData = {
      timestamp: new Date().toISOString(),
      event: 'email_clicked_js',
      trackingId,
      source: source || 'js',
      targetUrl,
      metadata,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    };

    console.log('📊 Clic JS enregistré:', clickData);

    return NextResponse.json({
      success: true,
      message: 'Clic enregistré',
      trackingId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur tracking clic JS:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'enregistrement du clic'
    }, { status: 500 });
  }
}
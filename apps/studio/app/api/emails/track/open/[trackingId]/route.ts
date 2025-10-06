import { NextRequest, NextResponse } from 'next/server';
import { emailMockupsService } from '@/lib/services/email-mockups.service';

/**
 * API route pour le tracking des ouvertures d'emails
 * GET /api/emails/track/open/[trackingId]
 *
 * Cette route sert un pixel de tracking 1x1 transparent et enregistre l'ouverture
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { trackingId: string } }
) {
  try {
    const { trackingId } = params;

    if (!trackingId) {
      return new NextResponse('Tracking ID manquant', { status: 400 });
    }

    console.log(`📧 Ouverture email trackée: ${trackingId}`);

    // Enregistrer l'ouverture
    emailMockupsService.trackEmailOpen(trackingId);

    // Log pour analytics
    const openData = {
      timestamp: new Date().toISOString(),
      event: 'email_opened',
      trackingId,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      referer: request.headers.get('referer')
    };

    console.log('📊 Email ouvert:', openData);

    // Ici on pourrait envoyer à une base de données ou service d'analytics
    // await logEmailEvent(openData);

    // Pixel transparent 1x1
    const pixelBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'base64'
    );

    return new NextResponse(pixelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': pixelBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('❌ Erreur tracking ouverture:', error);

    // Retourner le pixel même en cas d'erreur pour ne pas casser l'email
    const pixelBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'base64'
    );

    return new NextResponse(pixelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': pixelBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
}
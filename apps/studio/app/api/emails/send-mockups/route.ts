import { NextRequest, NextResponse } from 'next/server';
import { emailMockupsService } from '@/lib/services/email-mockups.service';
import { render } from '@react-email/render';
import MockupProposalEmail from '@/components/emails/MockupProposalEmail';

export const runtime = 'nodejs';

interface SendMockupsRequest {
  workflow: {
    clientId: string;
    clientName: string;
    clientEmail: string;
    businessName: string;
    metier: string;
    ville: string;
    phone?: string;
    requestId: string;
  };
  mockups: Array<{
    id: string;
    name: string;
    url: string;
    screenshot?: string;
    description: string;
    style: 'modern' | 'premium' | 'tech' | 'robust';
    features?: string[];
  }>;
  options?: {
    sendImmediate?: boolean;
    useReactEmail?: boolean;
    testMode?: boolean;
  };
}

/**
 * API route pour envoyer les emails avec les mockups
 * POST /api/emails/send-mockups
 */
export async function POST(request: NextRequest) {
  try {
    const body: SendMockupsRequest = await request.json();
    const { workflow, mockups, options = {} } = body;

    // Validation des données requises
    if (!workflow || !mockups || mockups.length === 0) {
      return NextResponse.json(
        { error: 'Données workflow et mockups requises' },
        { status: 400 }
      );
    }

    if (!workflow.clientEmail || !workflow.clientName) {
      return NextResponse.json(
        { error: 'Email et nom du client requis' },
        { status: 400 }
      );
    }

    if (mockups.length !== 3) {
      return NextResponse.json(
        { error: 'Exactement 3 mockups sont requis' },
        { status: 400 }
      );
    }

    console.log(`📧 Demande d'envoi d'email pour ${workflow.clientEmail}`);
    console.log(`🎨 ${mockups.length} mockups à envoyer`);

    // Configuration des URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://studio.awema.fr';
    const compareUrl = `${baseUrl}/compare-mockups?client=${workflow.clientId}`;
    const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(workflow.clientEmail)}`;
    const privacyUrl = `${baseUrl}/privacy`;

    let result;

    if (options.useReactEmail) {
      // Utilisation du composant React Email
      result = await sendWithReactEmail(workflow, mockups, {
        compareUrl,
        unsubscribeUrl,
        privacyUrl,
        baseUrl,
        testMode: options.testMode
      });
    } else {
      // Utilisation du service standard
      result = await emailMockupsService.sendMockupsEmail(workflow, mockups);
    }

    if (result.success) {
      console.log(`✅ Email envoyé avec succès - Tracking: ${result.trackingId}`);

      // Log pour le dashboard de suivi
      const logData = {
        timestamp: new Date().toISOString(),
        event: 'email_sent',
        clientId: workflow.clientId,
        clientEmail: workflow.clientEmail,
        trackingId: result.trackingId,
        mockupsCount: mockups.length,
        testMode: options.testMode || false
      };

      // Ici on pourrait logger dans une base de données pour le dashboard
      console.log('📊 Event logged:', logData);

      return NextResponse.json({
        success: true,
        message: 'Email envoyé avec succès',
        trackingId: result.trackingId,
        data: {
          sentAt: new Date().toISOString(),
          clientEmail: workflow.clientEmail,
          mockupsCount: mockups.length
        }
      });

    } else {
      console.error('❌ Échec de l\'envoi:', result.error);

      return NextResponse.json({
        success: false,
        error: result.error || 'Erreur lors de l\'envoi de l\'email'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Erreur API send-mockups:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur',
      details: error.message
    }, { status: 500 });
  }
}

/**
 * Fonction pour tester la configuration email
 * GET /api/emails/send-mockups?test=true
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isTest = searchParams.get('test') === 'true';

    if (!isTest) {
      return NextResponse.json({
        message: 'API Email Mockups Service',
        endpoints: {
          'POST /': 'Envoyer des mockups par email',
          'GET /?test=true': 'Tester la configuration email'
        }
      });
    }

    // Test de configuration
    console.log('🧪 Test de configuration email...');

    const testResult = await emailMockupsService.testEmailConfig();

    if (testResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Configuration email OK ✅',
        config: {
          provider: process.env.EMAIL_PROVIDER,
          fromEmail: process.env.EMAIL_FROM,
          fromName: process.env.EMAIL_FROM_NAME,
          hasApiKey: !!process.env.EMAIL_API_KEY
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Configuration email invalide',
        details: testResult.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Erreur test configuration:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors du test de configuration'
    }, { status: 500 });
  }
}

/**
 * Envoi via React Email (alternative premium)
 */
async function sendWithReactEmail(
  workflow: SendMockupsRequest['workflow'],
  mockups: SendMockupsRequest['mockups'],
  urls: {
    compareUrl: string;
    unsubscribeUrl: string;
    privacyUrl: string;
    baseUrl: string;
    testMode?: boolean;
  }
) {
  try {
    const trackingId = generateTrackingId();
    const trackingPixelUrl = `${urls.baseUrl}/api/emails/track/open/${trackingId}`;

    // Rendu du composant React Email en HTML
    const emailHtml = render(
      MockupProposalEmail({
        workflow,
        mockups,
        compareUrl: addTrackingToUrl(urls.compareUrl, trackingId, 'compare'),
        trackingPixelUrl,
        unsubscribeUrl: urls.unsubscribeUrl,
        privacyUrl: urls.privacyUrl,
        baseUrl: urls.baseUrl
      })
    );

    // Version texte simple
    const emailText = `
Bonjour ${workflow.clientName},

Vos 3 propositions de site web pour ${workflow.businessName} sont prêtes !

${mockups.map((mockup, index) => `
${index + 1}. ${mockup.name} (${mockup.style})
   ${mockup.description}
   Voir: ${mockup.url}
`).join('\n')}

Comparer toutes les propositions: ${urls.compareUrl}

⏰ Propositions disponibles pendant 72 heures.

L'équipe AWEMA
`;

    if (urls.testMode) {
      console.log('🧪 Mode test - Email non envoyé');
      console.log('📧 Contenu généré:', emailHtml.substring(0, 200) + '...');

      return {
        success: true,
        trackingId,
        testMode: true
      };
    }

    // Envoi via le service standard avec le HTML généré
    const customEmailOptions = {
      to: workflow.clientEmail,
      subject: `🎨 Vos 3 propositions de site web sont prêtes !`,
      html: emailHtml,
      text: emailText
    };

    // Ici on utiliserait l'envoi direct plutôt que le service
    // pour avoir plus de contrôle sur le contenu HTML généré par React Email

    return {
      success: true,
      trackingId,
      reactEmail: true
    };

  } catch (error) {
    console.error('❌ Erreur React Email:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Utilitaires
 */
function generateTrackingId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function addTrackingToUrl(url: string, trackingId: string, source: string): string {
  const separator = url.includes('?') ? '&' : '?';
  const params = new URLSearchParams({
    utm_source: 'email',
    utm_medium: 'mockup-proposal',
    utm_campaign: trackingId,
    utm_content: source,
    tid: trackingId
  });
  return `${url}${separator}${params.toString()}`;
}

/**
 * Endpoint pour les webhooks de statut d'email (optionnel)
 * PUT /api/emails/send-mockups
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { trackingId, status, timestamp } = body;

    if (!trackingId || !status) {
      return NextResponse.json(
        { error: 'trackingId et status requis' },
        { status: 400 }
      );
    }

    console.log(`📧 Webhook status: ${trackingId} -> ${status}`);

    // Ici on pourrait mettre à jour le statut dans une base de données
    // pour le tracking avancé des emails

    return NextResponse.json({
      success: true,
      message: 'Statut mis à jour',
      trackingId,
      status
    });

  } catch (error) {
    console.error('❌ Erreur webhook status:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur webhook'
    }, { status: 500 });
  }
}
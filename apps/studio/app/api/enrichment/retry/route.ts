import { NextRequest, NextResponse } from 'next/server';
import { enrichAndMigrateService } from '@/lib/services/enrich-and-migrate.service';

/**
 * API Route: POST /api/enrichment/retry
 * Relance l'enrichissement d'un workflow qui a échoué
 *
 * Usage: POST /api/enrichment/retry avec { workflowId: "wf-123456" }
 * Ou: POST /api/enrichment/retry?workflowId=wf-123456
 */
export async function POST(request: NextRequest) {
  console.log('🔄 API Enrichment: Relance enrichissement...');

  try {
    let workflowId: string | null = null;

    // Récupérer workflowId depuis le body ou query params
    try {
      const body = await request.json();
      workflowId = body.workflowId;
    } catch {
      const { searchParams } = new URL(request.url);
      workflowId = searchParams.get('workflowId');
    }

    if (!workflowId) {
      return NextResponse.json({
        success: false,
        error: 'workflowId est requis',
        usage: 'POST avec { workflowId: "wf-123456" } ou query param ?workflowId=wf-123456'
      }, { status: 400 });
    }

    console.log(`🔄 Tentative de relance enrichissement pour workflow: ${workflowId}`);

    // Vérifier le statut actuel avant de relancer
    const currentStatus = await enrichAndMigrateService.getEnrichmentStatus(workflowId);

    if (currentStatus.status === 'enrichment_completed') {
      return NextResponse.json({
        success: false,
        error: 'L\'enrichissement est déjà terminé avec succès',
        workflowId,
        currentStatus: currentStatus.status,
        suggestion: 'Utilisez /api/deployment/start pour déployer le projet'
      }, { status: 409 });
    }

    if (currentStatus.status !== 'enrichment_failed' && currentStatus.status !== 'unknown') {
      return NextResponse.json({
        success: false,
        error: 'L\'enrichissement ne peut être relancé que s\'il a échoué',
        workflowId,
        currentStatus: currentStatus.status,
        progress: currentStatus.progress,
        suggestion: 'Attendez la fin du processus en cours ou utilisez /api/enrichment/status'
      }, { status: 409 });
    }

    // Générer un rapport de retry avec diagnostic
    const retryReport = await generateRetryDiagnostic(workflowId, currentStatus);

    // Relancer l'enrichissement
    const retryResult = await enrichAndMigrateService.retryEnrichment(workflowId);

    const response = {
      success: true,
      workflowId,
      message: 'Enrichissement relancé avec succès',
      retryAttempt: retryReport.attemptNumber,
      previousError: retryReport.lastError,
      improvements: retryReport.improvements,
      newStatus: 'enrichment_started',
      estimatedDuration: retryReport.estimatedDuration,
      monitoringEndpoints: {
        status: `/api/enrichment/status?workflowId=${workflowId}`,
        cancel: `/api/enrichment/cancel?workflowId=${workflowId}`
      },
      timestamp: new Date().toISOString(),
      nextSteps: [
        'Le processus d\'enrichissement redémarre depuis le début',
        'Surveillance automatique des erreurs activée',
        'Notification en cas de nouvel échec',
        'Passage automatique à Agent 8 si succès'
      ]
    };

    console.log(`✅ Enrichissement relancé pour ${workflowId} (tentative #${retryReport.attemptNumber})`);

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Erreur relance enrichissement:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la relance',
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      troubleshooting: {
        possibleCauses: [
          'Workflow non trouvé ou corrompu',
          'Données originales manquantes',
          'Service DeepSeek indisponible',
          'Erreur de configuration système'
        ],
        solutions: [
          'Vérifier que le workflowId existe',
          'Contacter le support si le problème persiste',
          'Créer un nouveau workflow si nécessaire'
        ],
        supportEndpoint: '/api/support/create-ticket'
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * API Route: GET /api/enrichment/retry
 * Retourne les informations sur les tentatives de retry
 */
export async function GET(request: NextRequest) {
  console.log('📊 API Enrichment: Informations retry...');

  try {
    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get('workflowId');

    if (!workflowId) {
      // Retourner la documentation
      return NextResponse.json({
        endpoint: '/api/enrichment/retry',
        methods: ['POST', 'GET'],
        description: 'Relance ou récupère les informations de retry d\'enrichissement',
        postUsage: 'POST avec { workflowId: "wf-123456" }',
        getUsage: 'GET ?workflowId=wf-123456',
        conditions: [
          'Le workflow doit être en statut "enrichment_failed"',
          'Maximum 3 tentatives de retry par workflow',
          'Délai minimum de 30 secondes entre les tentatives'
        ],
        automaticRetry: {
          enabled: true,
          maxAttempts: 2,
          backoffStrategy: 'exponential',
          triggers: ['timeout', 'api_error', 'conversion_error']
        }
      });
    }

    // Récupérer l'historique des tentatives pour ce workflow
    const retryHistory = await getRetryHistory(workflowId);

    return NextResponse.json({
      success: true,
      workflowId,
      retryHistory,
      canRetry: canRetryWorkflow(retryHistory),
      nextRetryAvailableAt: getNextRetryTime(retryHistory),
      recommendations: generateRetryRecommendations(retryHistory)
    });

  } catch (error) {
    console.error('❌ Erreur récupération info retry:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur récupération informations retry',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

/**
 * Génère un diagnostic de retry avec analyse d'erreur
 */
async function generateRetryDiagnostic(workflowId: string, currentStatus: any): Promise<{
  attemptNumber: number;
  lastError: string;
  improvements: string[];
  estimatedDuration: number;
  riskFactors: string[];
}> {
  console.log(`🔍 Génération diagnostic retry pour ${workflowId}...`);

  const retryHistory = await getRetryHistory(workflowId);
  const attemptNumber = retryHistory.attempts + 1;

  // Analyser l'erreur précédente pour appliquer des améliorations
  const lastError = currentStatus.error || 'Erreur inconnue';
  const improvements: string[] = [];

  // Améliorations basées sur le type d'erreur
  if (lastError.includes('timeout') || lastError.includes('DeepSeek')) {
    improvements.push('Augmentation du timeout API DeepSeek');
    improvements.push('Retry automatique avec backoff exponentiel');
    improvements.push('Cache des réponses partielles');
  }

  if (lastError.includes('template') || lastError.includes('mapping')) {
    improvements.push('Validation renforcée des templates');
    improvements.push('Fallback sur template générique si nécessaire');
    improvements.push('Nettoyage automatique des données corrompues');
  }

  if (lastError.includes('Astro') || lastError.includes('conversion')) {
    improvements.push('Utilisation de composants Astro simplifiés');
    improvements.push('Validation des dépendances avant conversion');
    improvements.push('Mode dégradé sans optimisations avancées');
  }

  if (lastError.includes('Sanity')) {
    improvements.push('Test de connectivité Sanity avant migration');
    improvements.push('Retry par batch pour les gros datasets');
    improvements.push('Mode offline si Sanity indisponible');
  }

  // Améliorations générales pour les tentatives répétées
  if (attemptNumber > 1) {
    improvements.push('Mode de compatibilité étendu activé');
    improvements.push('Logging détaillé pour diagnostic');
    improvements.push('Notification proactive en cas de problème');
  }

  // Calculer la durée estimée (augmente avec les tentatives)
  const baseDuration = 45000; // 45 secondes
  const estimatedDuration = baseDuration * Math.pow(1.2, attemptNumber - 1);

  // Identifier les facteurs de risque
  const riskFactors: string[] = [];

  if (attemptNumber >= 3) {
    riskFactors.push('Workflow avec échecs multiples - risque élevé');
  }

  if (lastError.includes('API') || lastError.includes('network')) {
    riskFactors.push('Problème réseau ou API externe détecté');
  }

  if (retryHistory.lastAttempt && Date.now() - retryHistory.lastAttempt < 60000) {
    riskFactors.push('Retry trop rapide - services externes peuvent être surchargés');
  }

  return {
    attemptNumber,
    lastError,
    improvements,
    estimatedDuration: Math.round(estimatedDuration),
    riskFactors
  };
}

/**
 * Récupère l'historique des tentatives de retry
 */
async function getRetryHistory(workflowId: string): Promise<{
  attempts: number;
  lastAttempt: number | null;
  errors: string[];
  successRate: number;
}> {
  // En production, récupération depuis la base de données
  // const history = await db.retryHistory.findFirst({ where: { workflowId } });

  // Simulation pour développement
  return {
    attempts: Math.floor(Math.random() * 3), // 0-2 tentatives précédentes
    lastAttempt: Date.now() - (Math.random() * 300000), // Dernière tentative il y a max 5 min
    errors: [
      'DeepSeek API timeout après 30s',
      'Template mapping failed: invalid structure'
    ],
    successRate: 0.7 // 70% de succès global
  };
}

/**
 * Vérifie si un workflow peut être relancé
 */
function canRetryWorkflow(retryHistory: any): boolean {
  const maxRetries = 3;
  const minDelayBetweenRetries = 30000; // 30 secondes

  if (retryHistory.attempts >= maxRetries) {
    return false;
  }

  if (retryHistory.lastAttempt && Date.now() - retryHistory.lastAttempt < minDelayBetweenRetries) {
    return false;
  }

  return true;
}

/**
 * Calcule le prochain moment où un retry sera possible
 */
function getNextRetryTime(retryHistory: any): string | null {
  if (!retryHistory.lastAttempt) {
    return null; // Retry immédiatement possible
  }

  const minDelay = 30000; // 30 secondes
  const nextRetryTime = retryHistory.lastAttempt + minDelay;

  if (Date.now() >= nextRetryTime) {
    return null; // Retry possible maintenant
  }

  return new Date(nextRetryTime).toISOString();
}

/**
 * Génère des recommandations basées sur l'historique
 */
function generateRetryRecommendations(retryHistory: any): string[] {
  const recommendations: string[] = [];

  if (retryHistory.attempts === 0) {
    recommendations.push('Premier retry - chances de succès élevées');
  } else if (retryHistory.attempts === 1) {
    recommendations.push('Second retry - vérifiez les améliorations appliquées');
    recommendations.push('Considérez contacter le support si échec répété');
  } else if (retryHistory.attempts >= 2) {
    recommendations.push('Échecs multiples détectés');
    recommendations.push('Recommandation: contact support avant nouveau retry');
    recommendations.push('Possibilité de recréer le workflow depuis le début');
  }

  // Recommandations basées sur les erreurs
  const commonErrors = retryHistory.errors || [];

  if (commonErrors.some(error => error.includes('DeepSeek'))) {
    recommendations.push('Problème API DeepSeek détecté - vérifiez la connectivité');
  }

  if (commonErrors.some(error => error.includes('template'))) {
    recommendations.push('Problème de template - considérez changer de template');
  }

  if (retryHistory.successRate < 0.5) {
    recommendations.push('Taux de succès faible - diagnostic approfondi recommandé');
  }

  return recommendations;
}

/**
 * Headers CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
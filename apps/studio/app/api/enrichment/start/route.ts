import { NextRequest, NextResponse } from 'next/server';
import { enrichAndMigrateService, EnrichmentWorkflowData } from '@/lib/services/enrich-and-migrate.service';

/**
 * API Route: POST /api/enrichment/start
 * Lance l'enrichissement d'un template avec du contenu DeepSeek
 *
 * Appelé par Agent 7 après l'intégration Sanity (Agent 6)
 */
export async function POST(request: NextRequest) {
  console.log('🎨 API Enrichment: Démarrage enrichissement template...');

  try {
    const body = await request.json();

    // Validation des données d'entrée
    const validationResult = validateEnrichmentRequest(body);
    if (!validationResult.valid) {
      return NextResponse.json({
        success: false,
        error: 'Données invalides',
        details: validationResult.errors
      }, { status: 400 });
    }

    // Construire les données de workflow enrichi
    const workflowData: EnrichmentWorkflowData = {
      workflowId: body.workflowId,
      clientId: body.clientId,
      selectedTemplate: body.selectedTemplate,
      formData: body.formData,
      businessInfo: {
        businessName: body.businessInfo.businessName,
        businessType: body.businessInfo.businessType,
        ville: body.businessInfo.ville,
        codePostal: body.businessInfo.codePostal,
        domain: body.businessInfo.domain,
        colors: body.businessInfo.colors
      },
      sanityCredentials: body.sanityCredentials
    };

    console.log(`🎯 Enrichissement démarré pour ${workflowData.businessInfo.businessName} (${workflowData.businessInfo.businessType})`);

    // Lancer l'enrichissement en arrière-plan pour éviter les timeouts
    const enrichmentPromise = enrichAndMigrateService.enrichTemplate(workflowData);

    // Retourner immédiatement le statut de démarrage
    return NextResponse.json({
      success: true,
      message: 'Enrichissement démarré avec succès',
      workflowId: workflowData.workflowId,
      status: 'enrichment_started',
      estimatedDuration: estimateEnrichmentDuration(workflowData),
      nextSteps: [
        'Génération du contenu enrichi avec DeepSeek AI',
        'Mapping du contenu sur le template sélectionné',
        'Conversion vers projet Astro + Sanity',
        'Préparation pour déploiement Cloudflare Pages'
      ],
      statusEndpoint: `/api/enrichment/status?workflowId=${workflowData.workflowId}`,
      progressWebSocket: `/ws/enrichment/${workflowData.workflowId}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur API enrichment start:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur',
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * API Route: GET /api/enrichment/start
 * Retourne la documentation de l'endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/enrichment/start',
    method: 'POST',
    description: 'Lance l\'enrichissement d\'un template avec contenu DeepSeek AI',
    parameters: {
      workflowId: 'string (requis) - ID du workflow',
      clientId: 'string (requis) - ID du client',
      selectedTemplate: 'string (requis) - Template choisi',
      formData: 'object (requis) - Données du formulaire client',
      businessInfo: {
        businessName: 'string (requis) - Nom de l\'entreprise',
        businessType: 'string (requis) - Type de métier',
        ville: 'string (requis) - Ville',
        codePostal: 'string (requis) - Code postal',
        domain: 'string (requis) - Domaine du site',
        colors: {
          primary: 'string (requis) - Couleur primaire',
          secondary: 'string (requis) - Couleur secondaire',
          accent: 'string (requis) - Couleur accent'
        }
      },
      sanityCredentials: {
        projectId: 'string (requis) - ID projet Sanity',
        dataset: 'string (requis) - Dataset Sanity',
        studioUrl: 'string (requis) - URL Studio Sanity',
        cdnUrl: 'string (requis) - URL CDN Sanity'
      }
    },
    response: {
      success: 'boolean - Statut de la requête',
      workflowId: 'string - ID du workflow',
      status: 'string - Statut actuel',
      estimatedDuration: 'number - Durée estimée en ms',
      statusEndpoint: 'string - URL pour suivre le progrès',
      nextSteps: 'string[] - Prochaines étapes'
    },
    example: {
      request: {
        workflowId: 'wf-123456',
        clientId: 'client-789',
        selectedTemplate: 'classique-bleu',
        businessInfo: {
          businessName: 'Plomberie Martin',
          businessType: 'plombier',
          ville: 'Lyon',
          codePostal: '69000',
          domain: 'plomberie-martin.fr',
          colors: {
            primary: '#2563eb',
            secondary: '#64748b',
            accent: '#10b981'
          }
        }
      }
    },
    integration: {
      calledBy: 'Agent 7 - Service d\'enrichissement et migration',
      callsAfter: 'Agent 6 - Intégration Sanity CMS',
      callsBefore: 'Agent 8 - Déploiement Astro + Cloudflare'
    }
  });
}

/**
 * Validation des données de requête d'enrichissement
 */
function validateEnrichmentRequest(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validation des champs obligatoires
  if (!data.workflowId) errors.push('workflowId est requis');
  if (!data.clientId) errors.push('clientId est requis');
  if (!data.selectedTemplate) errors.push('selectedTemplate est requis');
  if (!data.formData) errors.push('formData est requis');

  // Validation des informations business
  if (!data.businessInfo) {
    errors.push('businessInfo est requis');
  } else {
    if (!data.businessInfo.businessName) errors.push('businessInfo.businessName est requis');
    if (!data.businessInfo.businessType) errors.push('businessInfo.businessType est requis');
    if (!data.businessInfo.ville) errors.push('businessInfo.ville est requis');
    if (!data.businessInfo.domain) errors.push('businessInfo.domain est requis');

    // Validation des couleurs
    if (!data.businessInfo.colors) {
      errors.push('businessInfo.colors est requis');
    } else {
      if (!data.businessInfo.colors.primary) errors.push('businessInfo.colors.primary est requis');
      if (!data.businessInfo.colors.secondary) errors.push('businessInfo.colors.secondary est requis');
      if (!data.businessInfo.colors.accent) errors.push('businessInfo.colors.accent est requis');
    }
  }

  // Validation des données de formulaire essentielles
  if (data.formData) {
    if (!data.formData.telephone && !data.formData.phone) {
      errors.push('formData.telephone ou formData.phone est requis');
    }
    if (!data.formData.email) {
      errors.push('formData.email est requis');
    }
  }

  // Validation des credentials Sanity (optionnel mais recommandé)
  if (data.sanityCredentials) {
    if (!data.sanityCredentials.projectId) {
      errors.push('sanityCredentials.projectId est requis si sanityCredentials est fourni');
    }
    if (!data.sanityCredentials.dataset) {
      errors.push('sanityCredentials.dataset est requis si sanityCredentials est fourni');
    }
  }

  // Validation des types métiers supportés
  const supportedBusinessTypes = [
    'plombier', 'electricien', 'jardinier', 'menuisier',
    'peintre', 'chauffagiste', 'serrurier', 'couvreur',
    'maçon', 'carreleur', 'paysagiste'
  ];

  if (data.businessInfo?.businessType && !supportedBusinessTypes.includes(data.businessInfo.businessType)) {
    errors.push(`businessType non supporté: ${data.businessInfo.businessType}. Types supportés: ${supportedBusinessTypes.join(', ')}`);
  }

  // Validation du format du domaine
  if (data.businessInfo?.domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(data.businessInfo.domain)) {
      errors.push('Format de domaine invalide');
    }
  }

  // Validation des couleurs HEX
  if (data.businessInfo?.colors) {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if (data.businessInfo.colors.primary && !hexColorRegex.test(data.businessInfo.colors.primary)) {
      errors.push('Format couleur primaire invalide (format HEX requis)');
    }
    if (data.businessInfo.colors.secondary && !hexColorRegex.test(data.businessInfo.colors.secondary)) {
      errors.push('Format couleur secondaire invalide (format HEX requis)');
    }
    if (data.businessInfo.colors.accent && !hexColorRegex.test(data.businessInfo.colors.accent)) {
      errors.push('Format couleur accent invalide (format HEX requis)');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Estime la durée d'enrichissement basée sur la complexité
 */
function estimateEnrichmentDuration(workflowData: EnrichmentWorkflowData): number {
  const baseTime = 30000; // 30 secondes de base

  // Facteurs influençant la durée
  const businessTypeMultiplier = {
    'plombier': 1.0,
    'electricien': 1.2,
    'jardinier': 1.1,
    'menuisier': 1.3,
    'peintre': 1.0,
    'chauffagiste': 1.4,
    'serrurier': 1.0,
    'couvreur': 1.2,
    'maçon': 1.3,
    'carreleur': 1.1,
    'paysagiste': 1.2
  };

  const multiplier = businessTypeMultiplier[workflowData.businessInfo.businessType] || 1.0;

  // Complexité basée sur les données du formulaire
  const formDataComplexity = Object.keys(workflowData.formData).length;
  const complexityFactor = 1 + (formDataComplexity * 0.01); // +1% par champ

  // Facteur Sanity
  const sanityFactor = workflowData.sanityCredentials ? 1.2 : 1.0;

  return Math.round(baseTime * multiplier * complexityFactor * sanityFactor);
}

/**
 * Headers CORS pour les appels cross-origin
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
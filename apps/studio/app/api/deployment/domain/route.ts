/**
 * AGENT 8 : API Route - Configuration de domaine
 *
 * POST /api/deployment/domain
 * Configurer un domaine personnalisé pour un projet
 */

import { NextRequest, NextResponse } from 'next/server';
import { CloudflareDNSService } from '../../../../lib/services/cloudflare-dns.service';

export async function POST(request: NextRequest) {
  try {
    console.log('🌐 [API] Configuration domaine personnalisé...');

    const body = await request.json();
    const {
      projectName,
      domain,
      type = 'custom', // 'custom' ou 'subdomain'
      businessName,
      options = {}
    } = body;

    // Validation des données
    if (!projectName) {
      return NextResponse.json(
        { error: 'Nom du projet requis' },
        { status: 400 }
      );
    }

    if (!domain && type === 'custom') {
      return NextResponse.json(
        { error: 'Domaine requis pour un domaine personnalisé' },
        { status: 400 }
      );
    }

    if (!businessName && type === 'subdomain') {
      return NextResponse.json(
        { error: 'Nom de l\'entreprise requis pour un sous-domaine' },
        { status: 400 }
      );
    }

    // Configuration Cloudflare
    const cloudflareConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      zoneId: process.env.CLOUDFLARE_ZONE_ID
    };

    if (!cloudflareConfig.accountId || !cloudflareConfig.apiToken) {
      return NextResponse.json(
        { error: 'Configuration Cloudflare manquante' },
        { status: 500 }
      );
    }

    const dnsService = new CloudflareDNSService(cloudflareConfig);

    let result;

    if (type === 'subdomain') {
      // Créer un sous-domaine awema.fr
      console.log('🏷️ [API] Création sous-domaine pour:', businessName);

      result = await dnsService.createSubdomain(businessName, projectName, {
        redirectWWW: options.redirectWWW || false,
        useApexDomain: false,
        ...options
      });

    } else {
      // Configurer un domaine personnalisé
      console.log('🔗 [API] Configuration domaine personnalisé:', domain);

      result = await dnsService.setupCustomDomain(projectName, domain, {
        redirectWWW: options.redirectWWW || true,
        useApexDomain: options.useApexDomain || false,
        ...options
      });
    }

    // Instructions pour le client
    const instructions = type === 'subdomain'
      ? [
          'Le sous-domaine a été créé automatiquement',
          'Le site sera accessible dans les 5 minutes suivantes',
          'Un certificat SSL sera automatiquement provisionné',
          'Aucune action supplémentaire n\'est requise'
        ]
      : [
          'Configurer les serveurs DNS de votre domaine vers Cloudflare',
          'Ou ajouter les enregistrements DNS fournis chez votre registrar',
          'La propagation peut prendre jusqu\'à 48h',
          'Le certificat SSL sera automatiquement provisionné'
        ];

    const response = {
      success: true,
      domain: result.domain,
      type,
      configuration: {
        zoneId: result.zoneId,
        records: result.records,
        ssl: result.ssl,
        cacheRules: result.cacheRules
      },
      status: {
        dns: 'configuring',
        ssl: 'pending',
        propagation: `${Math.ceil(result.propagationTime / 60)} minutes estimées`
      },
      urls: {
        primary: result.verificationUrl,
        cloudflarePages: `https://${projectName}.pages.dev`,
        dashboard: `https://dash.cloudflare.com/pages/projects/${projectName}`
      },
      instructions,
      nextSteps: [
        type === 'custom'
          ? 'Vérifier la propagation DNS dans quelques minutes'
          : 'Tester l\'accès au site',
        'Configurer les redirections si nécessaire',
        'Activer les analytics web Cloudflare',
        'Optimiser les règles de cache'
      ],
      verificationUrl: result.verificationUrl,
      createdAt: result.createdAt
    };

    console.log('✅ [API] Configuration domaine terminée:', result.domain);

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ [API] Erreur configuration domaine:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        troubleshooting: [
          'Vérifier que le domaine existe et est accessible',
          'Contrôler les permissions sur la zone DNS',
          'Valider la configuration des serveurs de noms',
          'Consulter les logs Cloudflare pour plus de détails'
        ],
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const domain = url.searchParams.get('domain');

    if (!domain) {
      // Lister tous les domaines configurés
      const cloudflareConfig = {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        apiToken: process.env.CLOUDFLARE_API_TOKEN!,
        zoneId: process.env.CLOUDFLARE_ZONE_ID
      };

      const dnsService = new CloudflareDNSService(cloudflareConfig);
      const domains = await dnsService.listConfiguredDomains();

      return NextResponse.json({
        success: true,
        domains: domains.map(d => ({
          projectName: d.projectName,
          domain: d.domain,
          status: d.status,
          createdAt: d.createdAt
        }))
      });
    }

    // Vérifier le statut d'un domaine spécifique
    console.log('🔍 [API] Vérification statut domaine:', domain);

    const cloudflareConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      zoneId: process.env.CLOUDFLARE_ZONE_ID
    };

    const dnsService = new CloudflareDNSService(cloudflareConfig);
    const dnsStatus = await dnsService.checkDNSPropagation(domain);

    // Test de connectivité
    let healthCheck;
    try {
      const startTime = Date.now();
      const response = await fetch(`https://${domain}`, {
        method: 'HEAD',
        timeout: 10000
      });
      const responseTime = Date.now() - startTime;

      healthCheck = {
        status: response.ok ? 'online' : 'offline',
        statusCode: response.status,
        responseTime,
        ssl: true,
        headers: {
          server: response.headers.get('server'),
          cfRay: response.headers.get('CF-Ray')
        }
      };
    } catch (error) {
      healthCheck = {
        status: 'error',
        error: error.message
      };
    }

    return NextResponse.json({
      success: true,
      domain,
      dns: dnsStatus,
      health: healthCheck,
      checkedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ [API] Erreur vérification domaine:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectName, domain, zoneId } = body;

    if (!projectName || !domain) {
      return NextResponse.json(
        { error: 'Nom du projet et domaine requis' },
        { status: 400 }
      );
    }

    console.log('🗑️ [API] Suppression domaine:', domain);

    const cloudflareConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
      zoneId: process.env.CLOUDFLARE_ZONE_ID
    };

    const dnsService = new CloudflareDNSService(cloudflareConfig);
    await dnsService.removeDomain(projectName, domain, zoneId || cloudflareConfig.zoneId!);

    return NextResponse.json({
      success: true,
      message: `Domaine ${domain} supprimé avec succès`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ [API] Erreur suppression domaine:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
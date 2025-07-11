import { NextRequest, NextResponse } from 'next/server';
import { autoDeployService } from '@/lib/services/auto-deploy.service';

export async function POST(request: NextRequest) {
  try {
    console.log('[API Deploy] Réception d\'une demande de déploiement');
    
    // Vérifier que le service est configuré
    if (!autoDeployService) {
      console.error('[API Deploy] Service non configuré!');
      return NextResponse.json(
        { error: 'Service de déploiement non configuré. Vérifiez les variables d\'environnement NETLIFY_AUTH_TOKEN et NEXT_PUBLIC_SUPABASE_URL' },
        { status: 503 }
      );
    }

    // Récupérer les données de la requête
    const body = await request.json();
    const { siteId, siteName, projectData, plan, customDomain, adminEmail } = body;

    // Valider les données requises
    if (!siteId || !siteName || !projectData || !plan) {
      return NextResponse.json(
        { error: 'Données manquantes: siteId, siteName, projectData et plan sont requis' },
        { status: 400 }
      );
    }

    // Valider le plan
    if (!['starter', 'pro', 'premium'].includes(plan)) {
      return NextResponse.json(
        { error: 'Plan invalide. Utilisez: starter, pro ou premium' },
        { status: 400 }
      );
    }

    // Log des données reçues
    console.log('[API Deploy] Données reçues:', {
      siteId,
      siteName,
      plan,
      customDomain,
      adminEmail,
      hasProjectData: !!projectData,
      projectDataKeys: projectData ? Object.keys(projectData) : []
    });
    
    // Lancer le déploiement
    const result = await autoDeployService.deployOneClick({
      siteId,
      siteName,
      projectData,
      plan,
      customDomain,
      adminEmail
    });

    // Retourner le résultat
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(
        { error: result.error || 'Erreur lors du déploiement' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('[API Deploy] Erreur complète:', error);
    console.error('[API Deploy] Stack trace:', error.stack);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur lors du déploiement' },
      { status: 500 }
    );
  }
}

// Route pour vérifier le statut d'un déploiement
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const deployId = searchParams.get('deployId');

    if (!deployId) {
      return NextResponse.json(
        { error: 'deployId requis' },
        { status: 400 }
      );
    }

    if (!autoDeployService) {
      return NextResponse.json(
        { error: 'Service de déploiement non configuré' },
        { status: 503 }
      );
    }

    const status = await autoDeployService.checkDeploymentStatus(deployId);
    return NextResponse.json(status, { status: 200 });

  } catch (error) {
    console.error('Erreur API statut:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    );
  }
}
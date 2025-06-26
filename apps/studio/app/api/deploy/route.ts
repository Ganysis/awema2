import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/db/services';
import { NetlifyDeployService } from '@/lib/services/netlify-deploy.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      projectId, 
      netlifyToken, 
      siteName, 
      customDomain 
    } = body;

    // Validation des paramètres
    if (!projectId || !netlifyToken || !siteName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Paramètres manquants: projectId, netlifyToken et siteName sont requis' 
        },
        { status: 400 }
      );
    }

    // Récupérer le projet
    const project = await ProjectService.findById(projectId);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    // Récupérer les données du projet
    let projectData;
    if (project.data) {
      projectData = typeof project.data === 'string' ? JSON.parse(project.data) : project.data;
    } else {
      return NextResponse.json(
        { success: false, error: 'Aucune donnée trouvée pour ce projet' },
        { status: 400 }
      );
    }

    // Créer le service Netlify
    const netlifyService = new NetlifyDeployService(netlifyToken);

    // Effectuer le déploiement
    const result = await netlifyService.deployProject(
      projectData,
      {
        projectId,
        siteName,
        customDomain,
        netlifyToken
      }
    );

    return NextResponse.json({
      success: true,
      siteUrl: result.siteUrl,
      deployId: result.deployId
    });

  } catch (error: any) {
    console.error('Erreur de déploiement:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Le déploiement a échoué' 
      },
      { status: 500 }
    );
  }
}

// Endpoint pour obtenir le statut d'un déploiement
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const deployId = searchParams.get('deployId');
    const siteId = searchParams.get('siteId');
    const netlifyToken = searchParams.get('token');

    if (!deployId || !siteId || !netlifyToken) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Paramètres manquants: deployId, siteId et token sont requis' 
        },
        { status: 400 }
      );
    }

    const netlifyService = new NetlifyDeployService(netlifyToken);
    
    // Pour l'instant, on retourne juste un statut de succès
    // Dans une version plus complète, on pourrait vérifier le statut réel du déploiement
    return NextResponse.json({
      success: true,
      status: 'ready',
      message: 'Déploiement terminé'
    });

  } catch (error: any) {
    console.error('Erreur lors de la vérification du statut:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Impossible de vérifier le statut' 
      },
      { status: 500 }
    );
  }
}
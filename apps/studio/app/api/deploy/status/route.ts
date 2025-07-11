import { NextRequest, NextResponse } from 'next/server';
import { autoDeployService } from '@/lib/services/auto-deploy.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const deployId = searchParams.get('deployId');

    if (!deployId) {
      return NextResponse.json(
        { error: 'deployId est requis dans les paramètres' },
        { status: 400 }
      );
    }

    if (!autoDeployService) {
      return NextResponse.json(
        { error: 'Service de déploiement non configuré. Vérifiez vos variables d\'environnement.' },
        { status: 503 }
      );
    }

    const status = await autoDeployService.checkDeploymentStatus(deployId);
    
    return NextResponse.json({
      deployId,
      ...status,
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la vérification du statut',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
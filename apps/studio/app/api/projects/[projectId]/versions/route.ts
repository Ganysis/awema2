import { NextRequest, NextResponse } from 'next/server';

// GET /api/projects/[projectId]/versions - Retourne une liste vide pour l'instant
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    // Next.js 14+ : params est maintenant une Promise
    const params = await context.params;
    const projectId = params.projectId;
    
    console.log(`GET /api/projects/${projectId}/versions called`);
    
    // Pour l'instant, retourner une liste vide
    // TODO: Implémenter la vraie logique de versioning
    return NextResponse.json({
      success: true,
      data: []
    });
  } catch (error) {
    console.error('Error fetching versions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}

// POST /api/projects/[projectId]/versions - Accepte mais ne sauvegarde pas pour l'instant
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    // Next.js 14+ : params est maintenant une Promise
    const params = await context.params;
    const projectId = params.projectId;
    
    const body = await request.json();
    console.log(`POST /api/projects/${projectId}/versions called`, body);
    
    // Pour l'instant, retourner un succès factice
    // TODO: Implémenter la vraie logique de versioning
    return NextResponse.json({
      success: true,
      data: {
        id: crypto.randomUUID(),
        projectId: projectId,
        version: 1,
        createdAt: new Date().toISOString(),
        data: body.data || '{}',
        changes: body.description || 'Version saved'
      }
    });
  } catch (error) {
    console.error('Error saving version:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save version' },
      { status: 500 }
    );
  }
}
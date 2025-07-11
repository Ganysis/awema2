import { NextRequest, NextResponse } from 'next/server';
import { getCMSService } from '@/lib/services/cms/cms-supabase.service';
import { z } from 'zod';

// Validation schema
const contentSchema = z.record(z.any());

interface RouteParams {
  params: {
    siteId: string;
  };
}

// Middleware pour vérifier l'authentification
async function authenticate(request: NextRequest, siteId: string) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return { authenticated: false, error: 'No token provided' };
  }

  const cmsService = getCMSService();
  const isValid = await cmsService.verifySession(token);
  
  if (!isValid) {
    return { authenticated: false, error: 'Invalid or expired token' };
  }

  // Vérifier que le token correspond au bon site
  if (cmsService.getCurrentSiteId() !== siteId) {
    return { authenticated: false, error: 'Token not valid for this site' };
  }

  return { authenticated: true };
}

// GET /api/cms-supabase/[siteId]/content
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Vérifier l'authentification
    const auth = await authenticate(request, params.siteId);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    const cmsService = getCMSService();
    
    // Obtenir une clé spécifique ou tout le contenu
    const key = request.nextUrl.searchParams.get('key');
    
    if (key) {
      const data = await cmsService.getContent(key);
      return NextResponse.json({
        success: true,
        data: { [key]: data },
      });
    } else {
      const data = await cmsService.getAllContent();
      return NextResponse.json({
        success: true,
        data,
      });
    }
  } catch (error: any) {
    console.error('Get content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// POST /api/cms-supabase/[siteId]/content
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // Vérifier l'authentification
    const auth = await authenticate(request, params.siteId);
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = contentSchema.parse(body);
    
    const cmsService = getCMSService();
    
    // Sauvegarder une clé spécifique ou tout le contenu
    const key = request.nextUrl.searchParams.get('key');
    
    if (key) {
      // Sauvegarder une seule clé
      const success = await cmsService.setContent(key, data[key]);
      return NextResponse.json({
        success,
        message: success ? 'Content saved' : 'Failed to save content',
      });
    } else {
      // Sauvegarder tout le contenu
      const success = await cmsService.saveAllContent(data);
      return NextResponse.json({
        success,
        message: success ? 'All content saved' : 'Failed to save content',
      });
    }
  } catch (error: any) {
    console.error('Save content error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to save content' },
      { status: 500 }
    );
  }
}

// PUT /api/cms-supabase/[siteId]/content
export async function PUT(request: NextRequest, { params }: RouteParams) {
  // Alias pour POST (compatibilité)
  return POST(request, { params });
}
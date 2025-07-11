import { NextRequest, NextResponse } from 'next/server';
import { getCMSService } from '@/lib/services/cms/cms-supabase.service';

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

  if (cmsService.getCurrentSiteId() !== siteId) {
    return { authenticated: false, error: 'Token not valid for this site' };
  }

  return { authenticated: true };
}

// GET /api/cms-supabase/[siteId]/media
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
    const type = request.nextUrl.searchParams.get('type');
    
    const media = await cmsService.getMedia(type || undefined);
    
    return NextResponse.json({
      success: true,
      data: media,
    });
  } catch (error: any) {
    console.error('Get media error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

// POST /api/cms-supabase/[siteId]/media/upload
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File too large (max 10MB)' },
        { status: 400 }
      );
    }

    const cmsService = getCMSService();
    const result = await cmsService.uploadMedia(file);
    
    if (result) {
      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to upload media' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Upload media error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload media' },
      { status: 500 }
    );
  }
}
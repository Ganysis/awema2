import { NextRequest, NextResponse } from 'next/server';
import { getCMSService } from '@/lib/services/cms/cms-supabase.service';
import { z } from 'zod';

// Validation schemas
const restoreSchema = z.object({
  versionId: z.string().uuid(),
});

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

// GET /api/cms-supabase/[siteId]/versions
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
    const contentKey = request.nextUrl.searchParams.get('key');
    
    const versions = await cmsService.getVersions(contentKey || undefined);
    
    return NextResponse.json({
      success: true,
      data: versions,
    });
  } catch (error: any) {
    console.error('Get versions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}

// POST /api/cms-supabase/[siteId]/versions/restore
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
    const { versionId } = restoreSchema.parse(body);
    
    const cmsService = getCMSService();
    const success = await cmsService.restoreVersion(versionId);
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Version restored successfully',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to restore version' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Restore version error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to restore version' },
      { status: 500 }
    );
  }
}
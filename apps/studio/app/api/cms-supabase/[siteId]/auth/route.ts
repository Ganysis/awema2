import { NextRequest, NextResponse } from 'next/server';
import { getCMSService } from '@/lib/services/cms/cms-supabase.service';
import { z } from 'zod';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const verifySchema = z.object({
  token: z.string(),
});

interface RouteParams {
  params: {
    siteId: string;
  };
}

// POST /api/cms-supabase/[siteId]/auth/login
export async function POST(request: NextRequest, { params }: RouteParams) {
  const pathname = request.nextUrl.pathname;
  const isLogin = pathname.endsWith('/login');
  const isVerify = pathname.endsWith('/verify');
  const isLogout = pathname.endsWith('/logout');

  try {
    const cmsService = getCMSService();

    if (isLogin) {
      // Login
      const body = await request.json();
      const { email, password } = loginSchema.parse(body);

      const result = await cmsService.authenticate(params.siteId, email, password);

      if (result.success && result.session) {
        return NextResponse.json({
          success: true,
          token: result.session.token,
          expiresAt: result.session.expires_at,
        });
      }

      return NextResponse.json(
        { success: false, error: result.error || 'Authentication failed' },
        { status: 401 }
      );
    } 
    
    else if (isVerify) {
      // Verify token
      const body = await request.json();
      const { token } = verifySchema.parse(body);

      const isValid = await cmsService.verifySession(token);

      if (isValid) {
        return NextResponse.json({ success: true, valid: true });
      }

      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    else if (isLogout) {
      // Logout
      await cmsService.logout();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid endpoint' },
      { status: 404 }
    );

  } catch (error: any) {
    console.error('CMS auth error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Authentication error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/db/services';
import { z } from 'zod';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

// Login endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action;

    if (action === 'login') {
      const data = loginSchema.parse(body);
      const result = await UserService.login(data);

      return NextResponse.json({
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
        },
        token: result.token,
      });
    }

    if (action === 'register') {
      const data = registerSchema.parse(body);
      const user = await UserService.create(data);

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    }

    if (action === 'logout') {
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (token) {
        await UserService.logout(token);
      }

      return NextResponse.json({
        success: true,
        message: 'Logged out successfully',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Auth error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}

// Verify token endpoint
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    const user = await UserService.verifyToken(token);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Token verification failed' },
      { status: 401 }
    );
  }
}
import { NextRequest } from 'next/server';
// import { UserService } from '@/lib/db/services';
// Temporary mock UserService
const UserService = {
  verifyToken: async (token: string) => {
    return null; // Mock implementation
  }
};
import { User } from '@prisma/client';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Authentication middleware
 */
export async function authenticate(request: NextRequest): Promise<AuthResult> {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return {
        success: false,
        error: 'No authentication token provided',
      };
    }

    const user = await UserService.verifyToken(token);
    
    if (!user) {
      return {
        success: false,
        error: 'Invalid or expired token',
      };
    }

    if (!(user as any).isActive) {
      return {
        success: false,
        error: 'Account is disabled',
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: 'Authentication failed',
    };
  }
}

/**
 * Rate limiting middleware
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(request: NextRequest, options: {
  windowMs?: number;
  maxRequests?: number;
} = {}): boolean {
  const {
    windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  } = options;

  const identifier = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'anonymous';

  const now = Date.now();
  const userLimit = requestCounts.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

/**
 * CORS headers
 */
export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
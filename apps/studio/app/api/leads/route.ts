import { NextRequest, NextResponse } from 'next/server';
import { LeadService } from '@/lib/db/services';
import { authenticate, rateLimit } from '@/lib/api/middleware';
import { z } from 'zod';

// Validation schema
const createLeadSchema = z.object({
  projectId: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  medium: z.string().optional(),
  campaign: z.string().optional(),
  page: z.string().optional(),
  formId: z.string().optional(),
});

// GET /api/leads - List leads (authenticated)
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const projectId = searchParams.get('projectId') || undefined;
    const clientId = searchParams.get('clientId') || undefined;

    const result = await LeadService.list({
      skip: (page - 1) * limit,
      take: limit,
      filters: {
        search,
        status: status as any,
        projectId,
        clientId,
      },
    });

    return NextResponse.json({
      success: true,
      data: result.leads,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: result.pages,
      },
    });
  } catch (error: any) {
    console.error('List leads error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST /api/leads - Create lead (public with rate limiting)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting for public endpoint
    if (!rateLimit(request, { maxRequests: 10, windowMs: 60000 })) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = createLeadSchema.parse(body);

    // Get IP and user agent
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const lead = await LeadService.create({
      ...data,
      ip,
      userAgent,
    });

    // Calculate score
    await LeadService.calculateScore(lead.id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest. We will contact you soon.',
      data: {
        id: lead.id,
        createdAt: lead.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Create lead error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
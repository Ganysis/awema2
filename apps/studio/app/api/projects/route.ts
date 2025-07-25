import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/db/services';
// import { authenticate } from '@/lib/api/middleware'; // TODO: Fix bcrypt
import { z } from 'zod';

// Validation schema
const createProjectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  template: z.string().optional(),
  clientId: z.string(),
  status: z.string().optional(),
  domain: z.string().optional(),
  subdomain: z.string().optional(),
  customDomain: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
  features: z.record(z.any()).optional(),
  settings: z.record(z.any()).optional(),
});

// GET /api/projects - List projects
export async function GET(request: NextRequest) {
  try {
    // TODO: Re-enable authentication
    // const authResult = await authenticate(request);
    // if (!authResult.success) {
    //   return NextResponse.json(
    //     { success: false, error: authResult.error },
    //     { status: 401 }
    //   );
    // }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const clientId = searchParams.get('clientId') || undefined;
    const template = searchParams.get('template') || undefined;

    const result = await ProjectService.list({
      skip: (page - 1) * limit,
      take: limit,
      filters: {
        search,
        status: status as any,
        clientId,
        template,
      },
    });

    return NextResponse.json({
      success: true,
      data: result.projects,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: result.pages,
      },
    });
  } catch (error: any) {
    console.error('List projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create project
export async function POST(request: NextRequest) {
  try {
    // TODO: Re-enable authentication
    // const authResult = await authenticate(request);
    // if (!authResult.success) {
    //   return NextResponse.json(
    //     { success: false, error: authResult.error },
    //     { status: 401 }
    //   );
    // }

    const body = await request.json();
    const data = createProjectSchema.parse(body);

    // Generate unique slug if not provided
    const slug = await ProjectService.generateUniqueSlug(data.name);

    // Prepare initial project data with basic structure
    const initialData = {
      businessInfo: null,
      projectName: data.name,
      globalHeader: null,
      globalFooter: null,
      pages: [],
      theme: {
        variant: data.features?.theme || 'premium',
        colors: {
          primary: '#2563eb',
          secondary: '#7c3aed',
          accent: '#f59e0b',
          background: '#ffffff',
          surface: '#f9fafb',
          text: '#111827',
          textSecondary: '#6b7280',
          textMuted: '#9ca3af',
          border: '#e5e7eb',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
        }
      }
    };

    const project = await ProjectService.create({
      ...data,
      slug,
      template: data.template || 'professional', // Add default template
      data: initialData, // Add initial data structure
      // createdBy: authResult.user.id, // TODO: Add back when auth is fixed
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('Create project error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
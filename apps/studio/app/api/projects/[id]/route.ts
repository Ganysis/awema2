import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/db/services';
// import { authenticate } from '@/lib/api/middleware'; // TODO: Fix bcrypt
import { z } from 'zod';

// Validation schema
const updateProjectSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'MAINTENANCE', 'ARCHIVED']).optional(),
  domain: z.string().optional(),
  subdomain: z.string().optional(),
  customDomain: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleTagManagerId: z.string().optional(),
  features: z.record(z.any()).optional(),
  settings: z.record(z.any()).optional(),
});

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/projects/[id] - Get project by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // TODO: Re-enable authentication
    // const authResult = await authenticate(request);
    // if (!authResult.success) {
    //   return NextResponse.json(
    //     { success: false, error: authResult.error },
    //     { status: 401 }
    //   );
    // }

    const project = await ProjectService.findById(params.id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Parse the data field if it's a string (SQLite stores JSON as string)
    const projectData = {
      ...project,
      data: project.data ? 
        (typeof project.data === 'string' ? JSON.parse(project.data) : project.data) : 
        null
    };

    return NextResponse.json({
      success: true,
      data: projectData,
    });
  } catch (error: any) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project
export async function PUT(request: NextRequest, { params }: RouteParams) {
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
    const data = updateProjectSchema.parse(body);

    const project = await ProjectService.update(params.id, data);

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('Update project error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // TODO: Re-enable authentication
    // const authResult = await authenticate(request);
    // if (!authResult.success) {
    //   return NextResponse.json(
    //     { success: false, error: authResult.error },
    //     { status: 401 }
    //   );
    // }

    // TODO: Re-enable admin check
    // if (!['ADMIN', 'SUPER_ADMIN'].includes(authResult.user.role)) {
    //   return NextResponse.json(
    //     { success: false, error: 'Insufficient permissions' },
    //     { status: 403 }
    //   );
    // }

    await ProjectService.delete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
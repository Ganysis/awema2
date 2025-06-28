import { NextRequest, NextResponse } from 'next/server';
import { ContentService } from '@/lib/db/services';
import { authenticate } from '@/lib/api/middleware';
import { z } from 'zod';

// Validation schema
const contentSchema = z.object({
  section: z.string(),
  data: z.record(z.any()),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

interface RouteParams {
  params: {
    projectId: string;
  };
}

// GET /api/cms/[projectId]/content - Get all content for project
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const contents = await ContentService.getByProject(params.projectId);

    return NextResponse.json({
      success: true,
      data: contents,
    });
  } catch (error: any) {
    console.error('Get content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// POST /api/cms/[projectId]/content - Create or update content
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Handle bulk update
    if (Array.isArray(body)) {
      const contents = await ContentService.bulkUpdate(
        params.projectId,
        body,
        authResult.user!.id
      );
      
      return NextResponse.json({
        success: true,
        data: contents,
      });
    }

    // Handle single update
    const data = contentSchema.parse(body);
    const content = await ContentService.upsert(
      {
        projectId: params.projectId,
        ...data,
      },
      authResult.user!.id
    );

    return NextResponse.json({
      success: true,
      data: content,
    });
  } catch (error: any) {
    console.error('Update content error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
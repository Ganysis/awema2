import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/db/services';
import { authenticate } from '@/lib/api/middleware';

interface RouteParams {
  params: {
    id: string;
  };
}

// POST /api/projects/[id]/publish - Publish project
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const project = await ProjectService.publish(params.id, authResult.user!.id);

    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project published successfully',
    });
  } catch (error: any) {
    console.error('Publish project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to publish project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]/publish - Unpublish project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticate(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const project = await ProjectService.unpublish(params.id, authResult.user!.id);

    return NextResponse.json({
      success: true,
      data: project,
      message: 'Project unpublished successfully',
    });
  } catch (error: any) {
    console.error('Unpublish project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unpublish project' },
      { status: 500 }
    );
  }
}
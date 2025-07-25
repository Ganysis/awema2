import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/db/services';

// GET /api/projects/[projectId] - Get project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = params;
    console.log('Getting project:', projectId);

    const project = await ProjectService.findById(projectId);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get project' },
      { status: 500 }
    );
  }
}
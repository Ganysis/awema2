import { NextRequest, NextResponse } from 'next/server';
import { ClientService } from '@/lib/db/services';
// import { authenticate } from '@/lib/api/middleware'; // TODO: Fix bcrypt
import { z } from 'zod';

// Validation schema
const updateClientSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  companyName: z.string().optional(),
  siret: z.string().optional(),
  vatNumber: z.string().optional(),
  website: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']).optional(),
});

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/clients/[id] - Get client by ID
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

    const client = await ClientService.findById(params.id, true);
    
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: client,
    });
  } catch (error: any) {
    console.error('Get client error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

// PUT /api/clients/[id] - Update client
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
    const data = updateClientSchema.parse(body);

    // Check if email is being changed and already exists
    if (data.email) {
      const existing = await ClientService.findByEmail(data.email);
      if (existing && existing.id !== params.id) {
        return NextResponse.json(
          { success: false, error: 'Email already in use' },
          { status: 400 }
        );
      }
    }

    const client = await ClientService.update(params.id, data);

    return NextResponse.json({
      success: true,
      data: client,
    });
  } catch (error: any) {
    console.error('Update client error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

// DELETE /api/clients/[id] - Delete client
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

    // // Only admins can delete clients
    // if (!['ADMIN', 'SUPER_ADMIN'].includes(authResult.user.role)) {
    //   return NextResponse.json(
    //     { success: false, error: 'Insufficient permissions' },
    //     { status: 403 }
    //   );
    // }

    await ClientService.delete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete client error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
// import { ClientService } from '@/lib/db/services';
import { ClientServiceSimple } from '@/lib/db/services/client-simple.service';
// import { authenticate } from '@/lib/api/middleware'; // TODO: Fix bcrypt issue
import { z } from 'zod';

// Validation schema
const createClientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  companyName: z.string().optional(),
  siret: z.string().optional(),
  vatNumber: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// GET /api/clients - List clients
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/clients called');
    
    // TODO: Re-enable authentication in production
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
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);

    console.log('Calling ClientService.list with params:', {
      skip: (page - 1) * limit,
      take: limit,
      filters: { search, status, tags }
    });

    const result = await ClientServiceSimple.list({
      skip: (page - 1) * limit,
      take: limit,
      filters: {
        search,
        status: status as any,
        tags,
      },
    });

    console.log('ClientService.list result:', {
      total: result.total,
      clientsCount: result.clients.length,
      firstClient: result.clients[0]
    });

    const response = {
      success: true,
      data: result.clients,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: result.pages,
      },
    };

    console.log('Sending response');
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('List clients error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST /api/clients - Create client
export async function POST(request: NextRequest) {
  // Temporairement désactivé
  return NextResponse.json(
    { success: false, error: 'Create client endpoint temporarily disabled' },
    { status: 503 }
  );
}
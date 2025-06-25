import { Client, ClientStatus, Prisma } from '@prisma/client';
import { prisma } from '../prisma';

// Helper type to transform Client with parsed tags
type ClientWithParsedTags = Omit<Client, 'tags'> & { tags: string[] };

export interface CreateClientInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  companyName?: string;
  siret?: string;
  vatNumber?: string;
  website?: string;
  notes?: string;
  tags?: string[];
  createdBy?: string;
}

export interface UpdateClientInput extends Partial<CreateClientInput> {
  status?: ClientStatus;
}

export interface ClientFilters {
  search?: string;
  status?: ClientStatus;
  tags?: string[];
  createdBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export class ClientService {
  /**
   * Create a new client
   */
  static async create(data: CreateClientInput): Promise<any> {
    const client = await prisma.client.create({
      data: {
        ...data,
        tags: data.tags ? JSON.stringify(data.tags) : undefined,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return {
      ...client,
      tags: client.tags ? JSON.parse(client.tags) : [],
    };
  }

  /**
   * Find client by ID
   */
  static async findById(id: string, includeRelations = false) {
    return prisma.client.findUnique({
      where: { id },
      include: includeRelations ? {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        leads: {
          select: {
            id: true,
            status: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            projects: true,
            leads: true,
            invoices: true,
          },
        },
      } : undefined,
    });
  }

  /**
   * Find client by email
   */
  static async findByEmail(email: string): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { email },
    });
  }

  /**
   * Update client
   */
  static async update(id: string, data: UpdateClientInput): Promise<any> {
    const client = await prisma.client.update({
      where: { id },
      data: {
        ...data,
        tags: data.tags ? JSON.stringify(data.tags) : undefined,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return {
      ...client,
      tags: client.tags ? JSON.parse(client.tags) : [],
    };
  }

  /**
   * Delete client
   */
  static async delete(id: string): Promise<void> {
    await prisma.client.delete({
      where: { id },
    });
  }

  /**
   * List clients with pagination and filters
   */
  static async list(params: {
    skip?: number;
    take?: number;
    filters?: ClientFilters;
    orderBy?: Prisma.ClientOrderByWithRelationInput;
  }) {
    const { skip = 0, take = 10, filters = {}, orderBy } = params;

    // Build where clause
    const where: Prisma.ClientWhereInput = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { companyName: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.status) {
      where.status = filters.status;
    }

    // For SQLite, we need to use a custom filter for JSON tags
    // This won't be as efficient as PostgreSQL's array operations
    if (filters.tags && filters.tags.length > 0) {
      // We'll filter in memory after fetching
    }

    if (filters.createdBy) {
      where.createdBy = filters.createdBy;
    }

    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    let [clients, total] = await Promise.all([
      prisma.client.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              projects: true,
              leads: true,
            },
          },
        },
      }),
      prisma.client.count({ where }),
    ]);

    // Transform clients to parse JSON tags
    const transformedClients = clients.map(client => {
      try {
        return {
          ...client,
          tags: client.tags ? JSON.parse(client.tags) : [],
        };
      } catch (e) {
        console.error('Error parsing tags for client:', client.id, e);
        return {
          ...client,
          tags: [],
        };
      }
    });

    // Filter by tags in memory if needed (for SQLite)
    let filteredClients = transformedClients;
    if (filters.tags && filters.tags.length > 0) {
      filteredClients = transformedClients.filter(client => 
        filters.tags!.some(tag => (client.tags as string[]).includes(tag))
      );
      total = filteredClients.length;
    }

    return {
      clients: filteredClients,
      total,
      pages: Math.ceil(total / take),
    };
  }

  /**
   * Get client statistics
   */
  static async getStatistics(clientId?: string) {
    const where = clientId ? { clientId } : {};

    const [
      totalClients,
      activeClients,
      totalProjects,
      publishedProjects,
      totalLeads,
      newLeads,
    ] = await Promise.all([
      prisma.client.count(),
      prisma.client.count({ where: { status: ClientStatus.ACTIVE } }),
      prisma.project.count({ where }),
      prisma.project.count({ where: { ...where, status: 'PUBLISHED' } }),
      prisma.lead.count({ where }),
      prisma.lead.count({
        where: {
          ...where,
          status: 'NEW',
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    return {
      clients: {
        total: totalClients,
        active: activeClients,
        inactive: totalClients - activeClients,
      },
      projects: {
        total: totalProjects,
        published: publishedProjects,
        draft: totalProjects - publishedProjects,
      },
      leads: {
        total: totalLeads,
        new: newLeads,
      },
    };
  }

  /**
   * Export clients to CSV
   */
  static async exportToCSV(filters?: ClientFilters): Promise<string> {
    const { clients } = await this.list({
      take: 10000, // Max export limit
      filters,
    });

    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Company',
      'City',
      'Status',
      'Projects',
      'Leads',
      'Created At',
    ];

    const rows = clients.map(client => [
      client.id,
      client.name,
      client.email,
      client.phone || '',
      client.companyName || '',
      client.city || '',
      client.status,
      client._count.projects,
      client._count.leads,
      client.createdAt.toISOString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return csv;
  }

  /**
   * Merge duplicate clients
   */
  static async merge(primaryId: string, secondaryId: string): Promise<Client> {
    // Start transaction
    return prisma.$transaction(async (tx) => {
      // Get both clients
      const [primary, secondary] = await Promise.all([
        tx.client.findUnique({ where: { id: primaryId } }),
        tx.client.findUnique({ where: { id: secondaryId } }),
      ]);

      if (!primary || !secondary) {
        throw new Error('One or both clients not found');
      }

      // Move all relations to primary client
      await Promise.all([
        tx.project.updateMany({
          where: { clientId: secondaryId },
          data: { clientId: primaryId },
        }),
        tx.lead.updateMany({
          where: { clientId: secondaryId },
          data: { clientId: primaryId },
        }),
        tx.invoice.updateMany({
          where: { clientId: secondaryId },
          data: { clientId: primaryId },
        }),
      ]);

      // Merge data (keep primary data, fill with secondary if empty)
      const mergedData: Partial<Client> = {
        phone: primary.phone || secondary.phone,
        address: primary.address || secondary.address,
        city: primary.city || secondary.city,
        postalCode: primary.postalCode || secondary.postalCode,
        companyName: primary.companyName || secondary.companyName,
        siret: primary.siret || secondary.siret,
        vatNumber: primary.vatNumber || secondary.vatNumber,
        website: primary.website || secondary.website,
        notes: [primary.notes, secondary.notes].filter(Boolean).join('\n\n'),
        tags: JSON.stringify([...new Set([
          ...(primary.tags ? JSON.parse(primary.tags) : []),
          ...(secondary.tags ? JSON.parse(secondary.tags) : [])
        ])]),
      };

      // Update primary client
      const updated = await tx.client.update({
        where: { id: primaryId },
        data: mergedData,
      });

      // Delete secondary client
      await tx.client.delete({
        where: { id: secondaryId },
      });

      return updated;
    });
  }
}
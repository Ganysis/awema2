import { Lead, LeadStatus, Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import { ActivityLogService } from './activity-log.service';

export interface CreateLeadInput {
  projectId: string;
  clientId?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  page?: string;
  formId?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export interface UpdateLeadInput {
  status?: LeadStatus;
  score?: number;
  notes?: string;
  clientId?: string;
}

export interface LeadFilters {
  search?: string;
  status?: LeadStatus;
  projectId?: string;
  clientId?: string;
  source?: string;
  dateFrom?: Date;
  dateTo?: Date;
  scoreMin?: number;
  scoreMax?: number;
}

export class LeadService {
  /**
   * Create a new lead
   */
  static async create(data: CreateLeadInput): Promise<Lead> {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            client: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Auto-assign to client if not provided
    if (!lead.clientId && lead.project.client) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: { clientId: lead.project.client.id },
      });
    }

    // Log activity
    await ActivityLogService.log({
      action: 'created',
      entity: 'lead',
      entityId: lead.id,
      projectId: lead.projectId,
      details: { 
        name: lead.name,
        email: lead.email,
        source: lead.source,
      },
    });

    // Send notification (implement email service)
    // await EmailService.sendNewLeadNotification(lead);

    return lead;
  }

  /**
   * Find lead by ID
   */
  static async findById(id: string, includeRelations = false) {
    return prisma.lead.findUnique({
      where: { id },
      include: includeRelations ? {
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      } : undefined,
    });
  }

  /**
   * Update lead
   */
  static async update(id: string, data: UpdateLeadInput, userId?: string): Promise<Lead> {
    const lead = await prisma.lead.update({
      where: { id },
      data,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        client: true,
      },
    });

    // Log activity
    await ActivityLogService.log({
      action: 'updated',
      entity: 'lead',
      entityId: lead.id,
      userId,
      projectId: lead.projectId,
      details: { changes: Object.keys(data) },
    });

    return lead;
  }

  /**
   * Delete lead
   */
  static async delete(id: string, userId?: string): Promise<void> {
    const lead = await this.findById(id);
    
    if (!lead) {
      throw new Error('Lead not found');
    }

    await prisma.lead.delete({
      where: { id },
    });

    // Log activity
    await ActivityLogService.log({
      action: 'deleted',
      entity: 'lead',
      entityId: id,
      userId,
      projectId: lead.projectId,
      details: { name: lead.name, email: lead.email },
    });
  }

  /**
   * List leads with pagination and filters
   */
  static async list(params: {
    skip?: number;
    take?: number;
    filters?: LeadFilters;
    orderBy?: Prisma.LeadOrderByWithRelationInput;
  }) {
    const { skip = 0, take = 10, filters = {}, orderBy } = params;

    // Build where clause
    const where: Prisma.LeadWhereInput = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } as any },
        { email: { contains: filters.search, mode: 'insensitive' } as any },
        { phone: { contains: filters.search, mode: 'insensitive' } as any },
        { message: { contains: filters.search, mode: 'insensitive' } as any },
      ];
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.projectId) {
      where.projectId = filters.projectId;
    }

    if (filters.clientId) {
      where.clientId = filters.clientId;
    }

    if (filters.source) {
      where.source = filters.source;
    }

    if (filters.scoreMin !== undefined || filters.scoreMax !== undefined) {
      where.score = {};
      if (filters.scoreMin !== undefined) where.score.gte = filters.scoreMin;
      if (filters.scoreMax !== undefined) where.score.lte = filters.scoreMax;
    }

    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { createdAt: 'desc' },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return {
      leads,
      total,
      pages: Math.ceil(total / take),
    };
  }

  /**
   * Update lead status
   */
  static async updateStatus(
    id: string,
    status: LeadStatus,
    notes?: string,
    userId?: string
  ): Promise<Lead> {
    const updateData: UpdateLeadInput = { status };
    
    if (notes) {
      const lead = await this.findById(id);
      updateData.notes = lead?.notes 
        ? `${lead.notes}\n\n${new Date().toISOString()}: ${notes}`
        : notes;
    }

    return this.update(id, updateData, userId);
  }

  /**
   * Calculate lead score
   */
  static async calculateScore(id: string): Promise<number> {
    const lead = await this.findById(id, true);
    
    if (!lead) {
      throw new Error('Lead not found');
    }

    let score = 0;

    // Base score for providing information
    if (lead.email) score += 10;
    if (lead.phone) score += 15;
    if (lead.message) score += 20;

    // Score based on source
    const sourceScores: Record<string, number> = {
      organic: 30,
      referral: 25,
      direct: 20,
      social: 15,
      cpc: 10,
    };
    if (lead.source && sourceScores[lead.source]) {
      score += sourceScores[lead.source];
    }

    // Score based on engagement
    if (lead.metadata) {
      const metadata = lead.metadata as any;
      if (metadata.pageViews > 5) score += 10;
      if (metadata.timeOnSite > 300) score += 10; // 5 minutes
      if (metadata.returnVisit) score += 15;
    }

    // Update score
    await prisma.lead.update({
      where: { id },
      data: { score },
    });

    return score;
  }

  /**
   * Get lead statistics
   */
  static async getStatistics(filters?: {
    projectId?: string;
    clientId?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }) {
    const where: Prisma.LeadWhereInput = {};
    
    if (filters?.projectId) where.projectId = filters.projectId;
    if (filters?.clientId) where.clientId = filters.clientId;
    if (filters?.dateFrom || filters?.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    const [
      total,
      byStatus,
      bySource,
      recentLeads,
      conversionRate,
    ] = await Promise.all([
      prisma.lead.count({ where }),
      prisma.lead.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
      prisma.lead.groupBy({
        by: ['source'],
        where,
        _count: true,
      }),
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          project: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.lead.count({
        where: { ...where, status: LeadStatus.CONVERTED },
      }),
    ]);

    return {
      total,
      byStatus: byStatus.reduce((acc, item) => ({
        ...acc,
        [item.status]: item._count,
      }), {}),
      bySource: bySource.reduce((acc, item) => ({
        ...acc,
        [item.source || 'unknown']: item._count,
      }), {}),
      recentLeads,
      conversionRate: total > 0 ? (conversionRate / total) * 100 : 0,
    };
  }

  /**
   * Export leads to CSV
   */
  static async exportToCSV(filters?: LeadFilters): Promise<string> {
    const { leads } = await this.list({
      take: 10000, // Max export limit
      filters,
    });

    const headers = [
      'ID',
      'Date',
      'Name',
      'Email',
      'Phone',
      'Project',
      'Client',
      'Status',
      'Score',
      'Source',
      'Medium',
      'Message',
    ];

    const rows = leads.map(lead => [
      lead.id,
      lead.createdAt.toISOString(),
      lead.name,
      lead.email,
      lead.phone || '',
      lead.project.name,
      lead.client?.name || '',
      lead.status,
      lead.score || 0,
      lead.source || '',
      lead.medium || '',
      lead.message?.replace(/\n/g, ' ') || '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return csv;
  }

  /**
   * Bulk update leads
   */
  static async bulkUpdate(
    ids: string[],
    data: UpdateLeadInput,
    userId?: string
  ): Promise<number> {
    const result = await prisma.lead.updateMany({
      where: { id: { in: ids } },
      data,
    });

    // Log activity
    await ActivityLogService.log({
      action: 'bulk-updated',
      entity: 'lead',
      entityId: ids.join(','),
      userId,
      details: { 
        count: result.count,
        changes: Object.keys(data),
      },
    });

    return result.count;
  }

  /**
   * Find duplicate leads
   */
  static async findDuplicates(projectId?: string): Promise<Array<{
    email: string;
    count: number;
    leads: Lead[];
  }>> {
    const where = projectId ? { projectId } : {};

    const duplicates = await prisma.lead.groupBy({
      by: ['email'],
      where,
      _count: true,
      having: {
        email: {
          _count: {
            gt: 1,
          },
        },
      },
    });

    const duplicateDetails = await Promise.all(
      duplicates.map(async ({ email, _count }) => {
        const leads = await prisma.lead.findMany({
          where: { ...where, email },
          include: {
            project: {
              select: {
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        return {
          email,
          count: _count,
          leads,
        };
      })
    );

    return duplicateDetails;
  }
}
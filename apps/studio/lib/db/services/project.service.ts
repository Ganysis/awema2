import { Project, ProjectStatus, Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import { ActivityLogService } from './activity-log.service';

export interface CreateProjectInput {
  name: string;
  slug: string;
  description?: string;
  template: string;
  clientId: string;
  createdBy?: string;
  domain?: string;
  subdomain?: string;
  customDomain?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[] | string;
  features?: Record<string, any> | string;
  settings?: Record<string, any> | string;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  status?: ProjectStatus;
  publishedAt?: Date;
  ogImage?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  data?: Record<string, any> | string;
}

export interface ProjectFilters {
  search?: string;
  status?: ProjectStatus;
  clientId?: string;
  template?: string;
  createdBy?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export class ProjectService {
  /**
   * Create a new project
   */
  static async create(data: CreateProjectInput): Promise<Project> {
    // Ensure slug is unique
    const existingSlug = await prisma.project.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug) {
      // Append timestamp to make it unique
      data.slug = `${data.slug}-${Date.now()}`;
    }

    // Prepare data for SQLite (stringify JSON fields)
    const projectData = {
      ...data,
      seoKeywords: data.seoKeywords ? 
        (typeof data.seoKeywords === 'string' ? data.seoKeywords : JSON.stringify(data.seoKeywords)) : 
        undefined,
      features: data.features ? 
        (typeof data.features === 'string' ? data.features : JSON.stringify(data.features)) : 
        '{}',
      settings: data.settings ? 
        (typeof data.settings === 'string' ? data.settings : JSON.stringify(data.settings)) : 
        '{}',
    };

    const project = await prisma.project.create({
      data: projectData,
      include: {
        client: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Log activity
    await ActivityLogService.log({
      action: 'created',
      entity: 'project',
      entityId: project.id,
      userId: data.createdBy,
      projectId: project.id,
      details: { name: project.name },
    });

    return project;
  }

  /**
   * Find project by ID
   */
  static async findById(id: string, includeRelations = false) {
    return prisma.project.findUnique({
      where: { id },
      include: includeRelations ? {
        client: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        contents: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        media: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            leads: true,
            media: true,
            contentVersions: true,
          },
        },
      } : undefined,
    });
  }

  /**
   * Find project by slug
   */
  static async findBySlug(slug: string): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { slug },
      include: {
        client: true,
        contents: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  /**
   * Update project
   */
  static async update(id: string, data: UpdateProjectInput, userId?: string): Promise<Project> {
    // Prepare data for SQLite (stringify JSON fields)
    const updateData = {
      ...data,
      seoKeywords: data.seoKeywords ? 
        (typeof data.seoKeywords === 'string' ? data.seoKeywords : JSON.stringify(data.seoKeywords)) : 
        undefined,
      features: data.features !== undefined ? 
        (typeof data.features === 'string' ? data.features : JSON.stringify(data.features)) : 
        undefined,
      settings: data.settings !== undefined ? 
        (typeof data.settings === 'string' ? data.settings : JSON.stringify(data.settings)) : 
        undefined,
      data: data.data !== undefined ? 
        (typeof data.data === 'string' ? data.data : JSON.stringify(data.data)) : 
        undefined,
    };

    let project;
    try {
      project = await prisma.project.update({
        where: { id },
        data: updateData,
        include: {
          client: true,
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (dbError: any) {
      console.error('Database update error:', dbError);
      throw new Error(`Failed to update project: ${dbError.message}`);
    }

    // Log activity
    await ActivityLogService.log({
      action: 'updated',
      entity: 'project',
      entityId: project.id,
      userId,
      projectId: project.id,
      details: { changes: Object.keys(data) },
    });

    return project;
  }

  /**
   * Delete project
   */
  static async delete(id: string, userId?: string): Promise<void> {
    const project = await this.findById(id);
    
    if (!project) {
      throw new Error('Project not found');
    }

    await prisma.project.delete({
      where: { id },
    });

    // Log activity
    await ActivityLogService.log({
      action: 'deleted',
      entity: 'project',
      entityId: id,
      userId,
      details: { name: project.name },
    });
  }

  /**
   * List projects with pagination and filters
   */
  static async list(params: {
    skip?: number;
    take?: number;
    filters?: ProjectFilters;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
  }) {
    const { skip = 0, take = 10, filters = {}, orderBy } = params;

    // Build where clause
    const where: Prisma.ProjectWhereInput = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } as any },
        { description: { contains: filters.search, mode: 'insensitive' } as any },
        { slug: { contains: filters.search, mode: 'insensitive' } as any },
      ];
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.clientId) {
      where.clientId = filters.clientId;
    }

    if (filters.template) {
      where.template = filters.template;
    }

    if (filters.createdBy) {
      where.createdBy = filters.createdBy;
    }

    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip,
        take,
        where,
        orderBy: orderBy || { createdAt: 'desc' },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              leads: true,
              media: true,
            },
          },
        },
      }),
      prisma.project.count({ where }),
    ]);

    return {
      projects,
      total,
      pages: Math.ceil(total / take),
    };
  }

  /**
   * Publish project
   */
  static async publish(id: string, userId?: string): Promise<Project> {
    const project = await this.update(id, {
      status: ProjectStatus.PUBLISHED,
      publishedAt: new Date(),
    }, userId);

    // Log activity
    await ActivityLogService.log({
      action: 'published',
      entity: 'project',
      entityId: id,
      userId,
      projectId: id,
    });

    return project;
  }

  /**
   * Unpublish project
   */
  static async unpublish(id: string, userId?: string): Promise<Project> {
    const project = await this.update(id, {
      status: ProjectStatus.MAINTENANCE,
    }, userId);

    // Log activity
    await ActivityLogService.log({
      action: 'unpublished',
      entity: 'project',
      entityId: id,
      userId,
      projectId: id,
    });

    return project;
  }

  /**
   * Duplicate project
   */
  static async duplicate(id: string, newName: string, userId?: string): Promise<Project> {
    const original = await prisma.project.findUnique({
      where: { id },
      include: {
        contents: true,
      },
    });
    
    if (!original) {
      throw new Error('Project not found');
    }

    // Create new project
    const duplicate = await this.create({
      name: newName,
      slug: `${original.slug}-copy-${Date.now()}`,
      description: original.description || undefined,
      template: original.template,
      clientId: original.clientId,
      createdBy: userId,
      seoTitle: original.seoTitle || undefined,
      seoDescription: original.seoDescription || undefined,
      seoKeywords: original.seoKeywords || undefined,
      features: typeof original.features === 'string' ? JSON.parse(original.features) : original.features,
      settings: typeof original.settings === 'string' ? JSON.parse(original.settings) : original.settings,
    });

    // Copy contents
    if (original.contents) {
      await Promise.all(
        original.contents.map(content =>
          prisma.content.create({
            data: {
              projectId: duplicate.id,
              section: content.section,
              data: content.data,
              order: content.order,
              isActive: content.isActive,
            },
          })
        )
      );
    }

    return duplicate;
  }

  /**
   * Get project statistics
   */
  static async getStatistics(projectId?: string) {
    const where = projectId ? { id: projectId } : {};
    const leadWhere = projectId ? { projectId } : {};

    const [
      totalProjects,
      publishedProjects,
      totalLeads,
      newLeads,
      totalPageViews,
    ] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.count({ where: { ...where, status: ProjectStatus.PUBLISHED } }),
      prisma.lead.count({ where: leadWhere }),
      prisma.lead.count({
        where: {
          ...leadWhere,
          status: 'NEW',
          createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.analytics.aggregate({
        where: projectId ? { projectId } : {},
        _sum: { pageViews: true },
      }),
    ]);

    return {
      projects: {
        total: totalProjects,
        published: publishedProjects,
        draft: totalProjects - publishedProjects,
      },
      leads: {
        total: totalLeads,
        new: newLeads,
      },
      analytics: {
        totalPageViews: totalPageViews._sum.pageViews || 0,
      },
    };
  }

  /**
   * Check domain availability
   */
  static async checkDomainAvailability(domain: string, excludeProjectId?: string): Promise<boolean> {
    const where: Prisma.ProjectWhereInput = {
      OR: [
        { domain },
        { subdomain: domain },
        { customDomain: domain },
      ],
    };

    if (excludeProjectId) {
      where.NOT = { id: excludeProjectId };
    }

    const count = await prisma.project.count({ where });
    return count === 0;
  }

  /**
   * Generate unique slug
   */
  static async generateUniqueSlug(baseName: string): Promise<string> {
    const baseSlug = baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let slug = baseSlug;
    let counter = 1;

    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }
}
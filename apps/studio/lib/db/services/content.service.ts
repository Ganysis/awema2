import { Content, ContentVersion, Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import { ActivityLogService } from './activity-log.service';

export interface CreateContentInput {
  projectId: string;
  section: string;
  data: Record<string, any>;
  order?: number;
  isActive?: boolean;
}

export interface UpdateContentInput {
  data?: Record<string, any>;
  order?: number;
  isActive?: boolean;
}

export class ContentService {
  /**
   * Create or update content for a section
   */
  static async upsert(input: CreateContentInput, userId?: string): Promise<Content> {
    const { projectId, section, ...data } = input;

    const content = await prisma.content.upsert({
      where: {
        projectId_section: {
          projectId,
          section,
        },
      },
      create: {
        projectId,
        section,
        data: JSON.stringify(data.data),
        order: data.order,
        isActive: data.isActive,
      },
      update: {
        data: JSON.stringify(data.data),
        order: data.order,
        isActive: data.isActive,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Create version
    await this.createVersion(content.id, content.projectId, JSON.parse(content.data), userId);

    // Log activity
    await ActivityLogService.log({
      action: 'updated',
      entity: 'content',
      entityId: content.id,
      userId,
      projectId: content.projectId,
      details: { section },
    });

    return content;
  }

  /**
   * Get content by section
   */
  static async getBySection(projectId: string, section: string): Promise<Content | null> {
    return prisma.content.findUnique({
      where: {
        projectId_section: {
          projectId,
          section,
        },
      },
    });
  }

  /**
   * Get all content for a project
   */
  static async getByProject(projectId: string, activeOnly = true): Promise<Content[]> {
    return prisma.content.findMany({
      where: {
        projectId,
        ...(activeOnly ? { isActive: true } : {}),
      },
      orderBy: { order: 'asc' },
    });
  }

  /**
   * Update content
   */
  static async update(
    id: string,
    data: UpdateContentInput,
    userId?: string
  ): Promise<Content> {
    const content = await prisma.content.update({
      where: { id },
      data,
    });

    // Create version if data changed
    if (data.data) {
      await this.createVersion(content.id, content.projectId, JSON.parse(content.data), userId);
    }

    // Log activity
    await ActivityLogService.log({
      action: 'updated',
      entity: 'content',
      entityId: content.id,
      userId,
      projectId: content.projectId,
    });

    return content;
  }

  /**
   * Delete content
   */
  static async delete(id: string, userId?: string): Promise<void> {
    const content = await prisma.content.findUnique({
      where: { id },
    });

    if (!content) {
      throw new Error('Content not found');
    }

    await prisma.content.delete({
      where: { id },
    });

    // Log activity
    await ActivityLogService.log({
      action: 'deleted',
      entity: 'content',
      entityId: id,
      userId,
      projectId: content.projectId,
      details: { section: content.section },
    });
  }

  /**
   * Reorder content sections
   */
  static async reorder(
    projectId: string,
    sections: { id: string; order: number }[]
  ): Promise<void> {
    await prisma.$transaction(
      sections.map(({ id, order }) =>
        prisma.content.update({
          where: { id },
          data: { order },
        })
      )
    );
  }

  /**
   * Create content version
   */
  private static async createVersion(
    contentId: string,
    projectId: string,
    data: object,
    userId?: string,
    changes?: string
  ): Promise<ContentVersion> {
    // Get latest version number
    const latestVersion = await prisma.contentVersion.findFirst({
      where: { contentId },
      orderBy: { version: 'desc' },
    });

    const version = (latestVersion?.version || 0) + 1;

    return prisma.contentVersion.create({
      data: {
        contentId,
        projectId,
        version,
        data: JSON.stringify(data),
        changes,
        createdBy: userId,
      },
    });
  }

  /**
   * Get content versions
   */
  static async getVersions(
    contentId: string,
    limit = 10
  ): Promise<ContentVersion[]> {
    return prisma.contentVersion.findMany({
      where: { contentId },
      orderBy: { version: 'desc' },
      take: limit,
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
  }

  /**
   * Restore content from version
   */
  static async restoreVersion(
    versionId: string,
    userId?: string
  ): Promise<Content> {
    const version = await prisma.contentVersion.findUnique({
      where: { id: versionId },
      include: { content: true },
    });

    if (!version) {
      throw new Error('Version not found');
    }

    const restored = await this.update(
      version.contentId,
      { data: JSON.parse(version.data) },
      userId
    );

    // Log activity
    await ActivityLogService.log({
      action: 'restored',
      entity: 'content',
      entityId: version.contentId,
      userId,
      projectId: version.projectId,
      details: { 
        section: version.content.section,
        fromVersion: version.version 
      },
    });

    return restored;
  }

  /**
   * Bulk update content
   */
  static async bulkUpdate(
    projectId: string,
    sections: { section: string; data: Record<string, any> }[],
    userId?: string
  ): Promise<Content[]> {
    const results = await Promise.all(
      sections.map(({ section, data }) =>
        this.upsert(
          {
            projectId,
            section,
            data,
            isActive: true,
          },
          userId
        )
      )
    );

    return results;
  }

  /**
   * Export content
   */
  static async export(projectId: string): Promise<Record<string, any>> {
    const contents = await this.getByProject(projectId);
    
    const exported: Record<string, any> = {};
    
    contents.forEach(content => {
      exported[content.section] = content.data;
    });

    return exported;
  }

  /**
   * Import content
   */
  static async import(
    projectId: string,
    data: Record<string, any>,
    userId?: string
  ): Promise<void> {
    const sections = Object.entries(data).map(([section, sectionData]) => ({
      section,
      data: sectionData as Record<string, any>,
    }));

    await this.bulkUpdate(projectId, sections, userId);
  }

  /**
   * Search content
   */
  static async search(query: string, projectId?: string): Promise<Content[]> {
    const where: Prisma.ContentWhereInput = {
      data: {
        contains: query,
      } as any,
    };

    if (projectId) {
      where.projectId = projectId;
    }

    return prisma.content.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      take: 20,
    });
  }
}
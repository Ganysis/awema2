import { ActivityLog, Prisma } from '@prisma/client';
import { prisma } from '../prisma';

export interface LogActivityInput {
  action: string;
  entity: string;
  entityId: string;
  userId?: string;
  projectId?: string;
  details?: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

export interface ActivityFilters {
  userId?: string;
  projectId?: string;
  entity?: string;
  action?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export class ActivityLogService {
  /**
   * Log an activity
   */
  static async log(data: LogActivityInput): Promise<ActivityLog> {
    // Prepare data for SQLite (stringify JSON fields)
    const activityData = {
      ...data,
      details: data.details ? JSON.stringify(data.details) : undefined,
    };
    
    return prisma.activityLog.create({
      data: activityData,
    });
  }

  /**
   * Get activity logs with filters
   */
  static async list(params: {
    skip?: number;
    take?: number;
    filters?: ActivityFilters;
  }) {
    const { skip = 0, take = 50, filters = {} } = params;

    // Build where clause
    const where: Prisma.ActivityLogWhereInput = {};

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.projectId) {
      where.projectId = filters.projectId;
    }

    if (filters.entity) {
      where.entity = filters.entity;
    }

    if (filters.action) {
      where.action = filters.action;
    }

    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        skip,
        take,
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          project: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.activityLog.count({ where }),
    ]);

    return {
      logs,
      total,
      pages: Math.ceil(total / take),
    };
  }

  /**
   * Get activity summary
   */
  static async getSummary(filters?: ActivityFilters) {
    const where: Prisma.ActivityLogWhereInput = {};

    if (filters?.userId) where.userId = filters.userId;
    if (filters?.projectId) where.projectId = filters.projectId;
    if (filters?.dateFrom || filters?.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    const [byAction, byEntity, byUser, timeline] = await Promise.all([
      prisma.activityLog.groupBy({
        by: ['action'],
        where,
        _count: true,
      }),
      prisma.activityLog.groupBy({
        by: ['entity'],
        where,
        _count: true,
      }),
      prisma.activityLog.groupBy({
        by: ['userId'],
        where,
        _count: true,
      }),
      prisma.activityLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 100,
        select: {
          id: true,
          action: true,
          entity: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      byAction: byAction.reduce((acc, item) => ({
        ...acc,
        [item.action]: item._count,
      }), {}),
      byEntity: byEntity.reduce((acc, item) => ({
        ...acc,
        [item.entity]: item._count,
      }), {}),
      byUser: byUser.reduce((acc, item) => ({
        ...acc,
        [item.userId || 'anonymous']: item._count,
      }), {}),
      timeline,
    };
  }

  /**
   * Clean old activity logs
   */
  static async cleanOldLogs(daysToKeep = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const result = await prisma.activityLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    return result.count;
  }

  /**
   * Get entity history
   */
  static async getEntityHistory(entity: string, entityId: string) {
    return prisma.activityLog.findMany({
      where: {
        entity,
        entityId,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
import { FormLink, FormLinkStatus, FormSubmission, Prisma } from '@prisma/client'
import { prisma } from '../prisma'

export type FormLinkWithRelations = FormLink & {
  client?: { name: string; email: string } | null
  formSubmissions?: FormSubmission[]
  _count?: {
    formSubmissions: number
  }
}

export type CreateFormLinkData = {
  name: string
  description?: string
  clientId?: string
  expiresAt?: Date
  maxUses?: number
  metadata?: any
  createdBy?: string
}

export type UpdateFormLinkData = Partial<CreateFormLinkData> & {
  status?: FormLinkStatus
  formData?: any
}

class FormLinkService {
  async create(data: CreateFormLinkData): Promise<FormLink> {
    return prisma.formLink.create({
      data: {
        ...data,
        metadata: data.metadata ? JSON.stringify(data.metadata) : undefined,
      },
    })
  }

  async getByUniqueId(uniqueId: string): Promise<FormLinkWithRelations | null> {
    return prisma.formLink.findUnique({
      where: { uniqueId },
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            formSubmissions: true,
          },
        },
      },
    })
  }

  async getById(id: string): Promise<FormLinkWithRelations | null> {
    return prisma.formLink.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
        formSubmissions: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    })
  }

  async update(id: string, data: UpdateFormLinkData): Promise<FormLink> {
    return prisma.formLink.update({
      where: { id },
      data: {
        ...data,
        metadata: data.metadata ? JSON.stringify(data.metadata) : undefined,
        formData: data.formData ? JSON.stringify(data.formData) : undefined,
      },
    })
  }

  async incrementViews(uniqueId: string): Promise<void> {
    await prisma.formLink.update({
      where: { uniqueId },
      data: {
        views: {
          increment: 1,
        },
      },
    })
  }

  async incrementStarted(uniqueId: string): Promise<void> {
    await prisma.formLink.update({
      where: { uniqueId },
      data: {
        started: {
          increment: 1,
        },
      },
    })
  }

  async markAsCompleted(uniqueId: string, formData: any): Promise<FormLink> {
    return prisma.formLink.update({
      where: { uniqueId },
      data: {
        status: 'COMPLETED',
        completed: {
          increment: 1,
        },
        completedAt: new Date(),
        formData: JSON.stringify(formData),
      },
    })
  }

  async list(filters?: {
    status?: FormLinkStatus
    clientId?: string
    createdBy?: string
  }): Promise<FormLinkWithRelations[]> {
    const where: Prisma.FormLinkWhereInput = {}

    if (filters?.status) where.status = filters.status
    if (filters?.clientId) where.clientId = filters.clientId
    if (filters?.createdBy) where.createdBy = filters.createdBy

    return prisma.formLink.findMany({
      where,
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            formSubmissions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.formLink.delete({
      where: { id },
    })
  }

  async checkValidity(uniqueId: string): Promise<{
    isValid: boolean
    reason?: string
  }> {
    const formLink = await this.getByUniqueId(uniqueId)

    if (!formLink) {
      return { isValid: false, reason: 'Form link not found' }
    }

    if (formLink.status !== 'ACTIVE') {
      return { isValid: false, reason: `Form is ${formLink.status.toLowerCase()}` }
    }

    if (formLink.expiresAt && formLink.expiresAt < new Date()) {
      await this.update(formLink.id, { status: 'EXPIRED' })
      return { isValid: false, reason: 'Form link has expired' }
    }

    if (formLink.maxUses && formLink.completed >= formLink.maxUses) {
      await this.update(formLink.id, { status: 'COMPLETED' })
      return { isValid: false, reason: 'Form link usage limit reached' }
    }

    return { isValid: true }
  }

  // Form submission management
  async createSubmission(data: {
    formLinkId: string
    data: any
    step: number
    completed?: boolean
    ip?: string
    userAgent?: string
    sessionId?: string
  }): Promise<FormSubmission> {
    return prisma.formSubmission.create({
      data: {
        ...data,
        data: JSON.stringify(data.data),
      },
    })
  }

  async updateSubmission(
    id: string,
    data: {
      data?: any
      step?: number
      completed?: boolean
    }
  ): Promise<FormSubmission> {
    return prisma.formSubmission.update({
      where: { id },
      data: {
        ...data,
        data: data.data ? JSON.stringify(data.data) : undefined,
      },
    })
  }

  async getLatestSubmission(
    formLinkId: string,
    sessionId: string
  ): Promise<FormSubmission | null> {
    return prisma.formSubmission.findFirst({
      where: {
        formLinkId,
        sessionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  // Analytics
  async getAnalytics(formLinkId: string): Promise<{
    views: number
    started: number
    completed: number
    conversionRate: number
    averageCompletionTime?: number
  }> {
    const formLink = await prisma.formLink.findUnique({
      where: { id: formLinkId },
      include: {
        formSubmissions: {
          where: {
            completed: true,
          },
          select: {
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    })

    if (!formLink) {
      throw new Error('Form link not found')
    }

    const conversionRate = formLink.started > 0 
      ? (formLink.completed / formLink.started) * 100 
      : 0

    let averageCompletionTime
    if (formLink.formSubmissions.length > 0) {
      const totalTime = formLink.formSubmissions.reduce((acc, sub) => {
        const time = sub.updatedAt.getTime() - sub.createdAt.getTime()
        return acc + time
      }, 0)
      averageCompletionTime = Math.round(totalTime / formLink.formSubmissions.length / 1000) // in seconds
    }

    return {
      views: formLink.views,
      started: formLink.started,
      completed: formLink.completed,
      conversionRate: Math.round(conversionRate * 100) / 100,
      averageCompletionTime,
    }
  }
}

export const formLinkService = new FormLinkService()
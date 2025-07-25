// Service client simplifié sans dépendances problématiques
import { Client, ClientStatus, Prisma } from '@prisma/client';
import { prisma } from '../prisma';

export class ClientServiceSimple {
  static async create(data: any) {
    try {
      console.log('ClientServiceSimple.create appelé avec:', data);
      
      // Vérifier que les champs requis sont présents
      if (!data.name || !data.email) {
        throw new Error('Les champs name et email sont requis');
      }
      
      const clientData = {
        ...data,
        tags: data.tags ? JSON.stringify(data.tags) : undefined,
      };
      
      console.log('Données à insérer dans la base:', clientData);
      
      const client = await prisma.client.create({
        data: clientData,
      });
      
      console.log('Client créé avec succès:', client);
      
      return {
        ...client,
        tags: client.tags ? JSON.parse(client.tags) : [],
      };
    } catch (error) {
      console.error('Error in ClientServiceSimple.create:', error);
      console.error('Stack trace:', (error as any).stack);
      throw error;
    }
  }

  static async list(params: {
    skip?: number;
    take?: number;
    filters?: any;
    orderBy?: any;
  }) {
    const { skip = 0, take = 10 } = params;

    try {
      const [clients, total] = await Promise.all([
        prisma.client.findMany({
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          include: {
            _count: {
              select: {
                projects: true,
                leads: true,
              },
            },
          },
        }),
        prisma.client.count(),
      ]);

      // Parse tags pour chaque client
      const clientsWithParsedTags = clients.map(client => ({
        ...client,
        tags: client.tags ? JSON.parse(client.tags) : [],
      }));

      return {
        clients: clientsWithParsedTags,
        total,
        pages: Math.ceil(total / take),
      };
    } catch (error) {
      console.error('Error in ClientServiceSimple.list:', error);
      throw error;
    }
  }
}
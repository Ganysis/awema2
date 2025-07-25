import { prisma } from '@/lib/prisma';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  blocks: any[];
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent?: string;
    };
    fonts?: {
      heading: string;
      body: string;
    };
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export class TemplateLibraryService {
  // Catégories de templates prédéfinies
  private static categories: TemplateCategory[] = [
    { id: 'plombier', name: 'Plombier', description: 'Templates pour plombiers', icon: '🔧', count: 0 },
    { id: 'electricien', name: 'Électricien', description: 'Templates pour électriciens', icon: '⚡', count: 0 },
    { id: 'menuisier', name: 'Menuisier', description: 'Templates pour menuisiers', icon: '🪵', count: 0 },
    { id: 'peintre', name: 'Peintre', description: 'Templates pour peintres', icon: '🎨', count: 0 },
    { id: 'maçon', name: 'Maçon', description: 'Templates pour maçons', icon: '🧱', count: 0 },
    { id: 'chauffagiste', name: 'Chauffagiste', description: 'Templates pour chauffagistes', icon: '🔥', count: 0 },
    { id: 'carreleur', name: 'Carreleur', description: 'Templates pour carreleurs', icon: '◼', count: 0 },
    { id: 'couvreur', name: 'Couvreur', description: 'Templates pour couvreurs', icon: '🏠', count: 0 },
    { id: 'jardinier', name: 'Jardinier', description: 'Templates pour jardiniers', icon: '🌿', count: 0 },
    { id: 'general', name: 'Général', description: 'Templates polyvalents', icon: '🛠️', count: 0 }
  ];

  // Créer un nouveau template
  static async createTemplate(data: {
    name: string;
    description: string;
    category: string;
    blocks: any[];
    theme: any;
    tags?: string[];
    thumbnail?: string;
  }): Promise<Template> {
    const template = await prisma.template.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        blocks: data.blocks,
        theme: data.theme,
        tags: data.tags || [],
        thumbnail: data.thumbnail
      }
    });

    return template as Template;
  }

  // Récupérer tous les templates
  static async getAllTemplates(filters?: {
    category?: string;
    tags?: string[];
    search?: string;
  }): Promise<Template[]> {
    const where: any = {};

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.tags && filters.tags.length > 0) {
      where.tags = {
        hasSome: filters.tags
      };
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const templates = await prisma.template.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return templates as Template[];
  }

  // Récupérer un template par ID
  static async getTemplateById(id: string): Promise<Template | null> {
    const template = await prisma.template.findUnique({
      where: { id }
    });

    return template as Template | null;
  }

  // Récupérer les catégories avec le nombre de templates
  static async getCategories(): Promise<TemplateCategory[]> {
    const counts = await prisma.template.groupBy({
      by: ['category'],
      _count: true
    });

    return this.categories.map(cat => ({
      ...cat,
      count: counts.find(c => c.category === cat.id)?._count || 0
    }));
  }

  // Générer 3 variantes de page d'accueil pour un client
  static async generateHomePageVariants(
    clientData: any,
    templateIds: string[]
  ): Promise<Array<{
    templateId: string;
    templateName: string;
    preview: {
      blocks: any[];
      theme: any;
    };
  }>> {
    const variants = [];

    for (const templateId of templateIds.slice(0, 3)) {
      const template = await this.getTemplateById(templateId);
      if (!template) continue;

      // Personnaliser les blocs avec les données client
      const personalizedBlocks = this.personalizeBlocks(
        template.blocks,
        clientData
      );

      variants.push({
        templateId: template.id,
        templateName: template.name,
        preview: {
          blocks: personalizedBlocks,
          theme: template.theme
        }
      });
    }

    return variants;
  }

  // Personnaliser les blocs avec les données client
  private static personalizeBlocks(blocks: any[], clientData: any): any[] {
    return blocks.map(block => {
      const personalizedBlock = { ...block };

      // Remplacer les placeholders dans les props
      if (personalizedBlock.props) {
        personalizedBlock.props = this.replacePlaceholders(
          personalizedBlock.props,
          clientData
        );
      }

      return personalizedBlock;
    });
  }

  // Remplacer les placeholders dans un objet
  private static replacePlaceholders(obj: any, clientData: any): any {
    if (typeof obj === 'string') {
      return obj
        .replace(/\{\{businessName\}\}/g, clientData.businessName || '')
        .replace(/\{\{businessType\}\}/g, clientData.businessType || '')
        .replace(/\{\{city\}\}/g, clientData.city || '')
        .replace(/\{\{phone\}\}/g, clientData.phone || '')
        .replace(/\{\{email\}\}/g, clientData.email || '')
        .replace(/\{\{address\}\}/g, clientData.address || '')
        .replace(/\{\{tagline\}\}/g, clientData.tagline || `${clientData.businessType} professionnel à ${clientData.city}`);
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.replacePlaceholders(item, clientData));
    }

    if (typeof obj === 'object' && obj !== null) {
      const result: any = {};
      for (const key in obj) {
        result[key] = this.replacePlaceholders(obj[key], clientData);
      }
      return result;
    }

    return obj;
  }

  // Créer des templates de base pour chaque catégorie
  static async seedDefaultTemplates(): Promise<void> {
    const defaultTemplates = [
      {
        name: 'Plombier Moderne',
        description: 'Template moderne pour plombier avec sections urgence',
        category: 'plombier',
        tags: ['moderne', 'urgence', 'services'],
        theme: {
          colors: { primary: '#0066cc', secondary: '#ff6600' }
        },
        blocks: [
          {
            id: 'header-1',
            type: 'header-v3',
            props: {
              variant: 'transparent',
              businessName: '{{businessName}}',
              tagline: 'Plombier d\'urgence 24/7',
              ctaText: 'Urgence',
              ctaLink: 'tel:{{phone}}'
            }
          },
          {
            id: 'hero-1',
            type: 'hero-v3',
            props: {
              variant: 'split-content',
              title: 'Votre plombier de confiance à {{city}}',
              subtitle: 'Intervention rapide 24/7 - Devis gratuit',
              primaryButtonText: 'Appeler maintenant',
              primaryButtonLink: 'tel:{{phone}}',
              secondaryButtonText: 'Demander un devis',
              secondaryButtonLink: '#contact'
            }
          },
          {
            id: 'services-1',
            type: 'services-v3',
            props: {
              variant: 'cards-hover',
              title: 'Nos services de plomberie',
              services: [
                {
                  title: 'Dépannage urgent',
                  description: 'Intervention rapide pour fuites et urgences',
                  icon: '🚨'
                },
                {
                  title: 'Installation sanitaire',
                  description: 'Pose et remplacement de sanitaires',
                  icon: '🚿'
                },
                {
                  title: 'Débouchage',
                  description: 'Débouchage de canalisations',
                  icon: '🔧'
                },
                {
                  title: 'Rénovation',
                  description: 'Rénovation complète salle de bain',
                  icon: '🛁'
                }
              ]
            }
          }
        ]
      },
      {
        name: 'Plombier Classique',
        description: 'Template classique et professionnel pour plombier',
        category: 'plombier',
        tags: ['classique', 'professionnel', 'sobre'],
        theme: {
          colors: { primary: '#1a365d', secondary: '#2b6cb0' }
        },
        blocks: [
          {
            id: 'header-1',
            type: 'header-v3',
            props: {
              variant: 'professional',
              businessName: '{{businessName}}',
              tagline: 'Artisan plombier depuis 1985'
            }
          },
          {
            id: 'hero-1',
            type: 'hero-v3',
            props: {
              variant: 'centered',
              title: 'Plomberie {{businessName}}',
              subtitle: 'Votre artisan plombier à {{city}} et environs',
              primaryButtonText: 'Devis gratuit',
              primaryButtonLink: '#contact'
            }
          }
        ]
      },
      {
        name: 'Électricien High-Tech',
        description: 'Template moderne pour électricien avec focus domotique',
        category: 'electricien',
        tags: ['moderne', 'high-tech', 'domotique'],
        theme: {
          colors: { primary: '#fbbf24', secondary: '#1f2937' }
        },
        blocks: [
          {
            id: 'header-1',
            type: 'header-v3',
            props: {
              variant: 'tech',
              businessName: '{{businessName}}',
              tagline: 'Électricité & Domotique'
            }
          },
          {
            id: 'hero-1',
            type: 'hero-v3',
            props: {
              variant: 'video-bg',
              title: 'Électricien expert en domotique',
              subtitle: 'Installation, dépannage et maison connectée à {{city}}'
            }
          }
        ]
      }
    ];

    // Créer les templates par défaut s'ils n'existent pas
    for (const templateData of defaultTemplates) {
      const exists = await prisma.template.findFirst({
        where: { name: templateData.name }
      });

      if (!exists) {
        await this.createTemplate(templateData);
      }
    }
  }
}
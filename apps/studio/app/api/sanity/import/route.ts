import { NextRequest, NextResponse } from 'next/server';
import { sanityDataMigrationService } from '@/lib/services/sanity-data-migration.service';
import { createClient } from '@sanity/client';

/**
 * API POST /api/sanity/import
 * Importe des données spécifiques dans un projet Sanity existant
 */
export async function POST(request: NextRequest) {
  try {
    console.log('📥 API /api/sanity/import - Début import données...');

    const body = await request.json();
    const { projectId, credentials, dataType, data, options = {} } = body;

    // Validation des paramètres
    if (!projectId || !credentials) {
      return NextResponse.json(
        {
          success: false,
          error: 'ProjectId et credentials requis',
          code: 'MISSING_CREDENTIALS'
        },
        { status: 400 }
      );
    }

    if (!dataType || !data) {
      return NextResponse.json(
        {
          success: false,
          error: 'Type de données et données requis',
          code: 'MISSING_DATA'
        },
        { status: 400 }
      );
    }

    console.log(`📋 Import ${dataType} dans projet ${projectId}`);

    // Créer le client Sanity
    const client = createClient({
      projectId: credentials.projectId,
      dataset: credentials.dataset || 'production',
      token: credentials.token,
      apiVersion: credentials.apiVersion || '2023-01-01',
      useCdn: false
    });

    let importResult;

    switch (dataType) {
      case 'services':
        importResult = await importServices(client, data, options);
        break;

      case 'testimonials':
        importResult = await importTestimonials(client, data, options);
        break;

      case 'projects':
        importResult = await importProjects(client, data, options);
        break;

      case 'settings':
        importResult = await importSettings(client, data, options);
        break;

      case 'bulk':
        importResult = await importBulkData(client, data, options);
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: `Type de données non supporté: ${dataType}`,
            code: 'UNSUPPORTED_DATA_TYPE'
          },
          { status: 400 }
        );
    }

    const result = {
      success: true,
      projectId,
      dataType,
      import: importResult,
      importedAt: new Date().toISOString()
    };

    console.log(`✅ Import ${dataType} réussi dans ${projectId}`);
    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Erreur import données Sanity:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'import des données',
        details: error.message,
        code: 'IMPORT_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * API GET /api/sanity/import/status/{importId}
 * Vérifie le statut d'un import en cours
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const importId = url.searchParams.get('importId');
    const projectId = url.searchParams.get('projectId');

    if (!importId && !projectId) {
      return NextResponse.json(
        {
          success: false,
          error: 'ImportId ou ProjectId requis',
          code: 'MISSING_IDENTIFIER'
        },
        { status: 400 }
      );
    }

    // Dans une implémentation réelle, on vérifierait le statut dans une base de données
    // Pour l'instant, on simule une réponse
    const mockStatus = {
      importId: importId || `import-${Date.now()}`,
      projectId: projectId || 'unknown',
      status: 'completed',
      progress: {
        total: 100,
        completed: 100,
        errors: 0,
        warnings: 0
      },
      details: {
        services: { imported: 5, errors: 0 },
        testimonials: { imported: 8, errors: 0 },
        projects: { imported: 3, errors: 0 },
        settings: { imported: 1, errors: 0 }
      },
      startedAt: new Date(Date.now() - 60000).toISOString(),
      completedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      ...mockStatus
    });

  } catch (error) {
    console.error('❌ Erreur vérification statut import:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la vérification du statut',
        details: error.message,
        code: 'STATUS_CHECK_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * Fonctions d'import spécialisées
 */
async function importServices(client: any, services: any[], options: any = {}) {
  console.log(`📋 Import de ${services.length} services...`);

  const imported: any[] = [];
  const errors: any[] = [];

  for (const service of services) {
    try {
      // Enrichir le service avec des données par défaut
      const serviceDoc = {
        _type: 'service',
        ...service,
        status: service.status || 'active',
        createdAt: service.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Dans une vraie implémentation
      // const result = await client.create(serviceDoc);
      // imported.push(result);

      // Simulation
      imported.push({ ...serviceDoc, _id: `service-${Date.now()}-${Math.random()}` });

    } catch (error) {
      errors.push({
        service: service.name,
        error: error.message
      });
    }
  }

  return {
    type: 'services',
    total: services.length,
    imported: imported.length,
    errors: errors.length,
    errorDetails: errors
  };
}

async function importTestimonials(client: any, testimonials: any[], options: any = {}) {
  console.log(`📋 Import de ${testimonials.length} témoignages...`);

  const imported: any[] = [];
  const errors: any[] = [];

  for (const testimonial of testimonials) {
    try {
      const testimonialDoc = {
        _type: 'testimonial',
        ...testimonial,
        status: testimonial.status || 'published',
        verified: testimonial.verified !== false,
        createdAt: testimonial.createdAt || new Date().toISOString()
      };

      // Simulation
      imported.push({ ...testimonialDoc, _id: `testimonial-${Date.now()}-${Math.random()}` });

    } catch (error) {
      errors.push({
        testimonial: testimonial.clientName,
        error: error.message
      });
    }
  }

  return {
    type: 'testimonials',
    total: testimonials.length,
    imported: imported.length,
    errors: errors.length,
    errorDetails: errors
  };
}

async function importProjects(client: any, projects: any[], options: any = {}) {
  console.log(`📋 Import de ${projects.length} projets...`);

  const imported: any[] = [];
  const errors: any[] = [];

  for (const project of projects) {
    try {
      const projectDoc = {
        _type: 'project',
        ...project,
        status: project.status || 'published',
        publishedAt: project.publishedAt || new Date().toISOString(),
        createdAt: project.createdAt || new Date().toISOString()
      };

      // Simulation
      imported.push({ ...projectDoc, _id: `project-${Date.now()}-${Math.random()}` });

    } catch (error) {
      errors.push({
        project: project.title,
        error: error.message
      });
    }
  }

  return {
    type: 'projects',
    total: projects.length,
    imported: imported.length,
    errors: errors.length,
    errorDetails: errors
  };
}

async function importSettings(client: any, settings: any, options: any = {}) {
  console.log('📋 Import des paramètres...');

  try {
    const settingsDoc = {
      _type: 'settings',
      _id: 'siteSettings',
      ...settings,
      updatedAt: new Date().toISOString()
    };

    // Dans une vraie implémentation
    // const result = await client.createOrReplace(settingsDoc);

    return {
      type: 'settings',
      total: 1,
      imported: 1,
      errors: 0,
      document: settingsDoc
    };

  } catch (error) {
    return {
      type: 'settings',
      total: 1,
      imported: 0,
      errors: 1,
      errorDetails: [{ settings: 'global', error: error.message }]
    };
  }
}

async function importBulkData(client: any, data: any, options: any = {}) {
  console.log('📋 Import en masse...');

  const results: any[] = [];

  if (data.services) {
    const servicesResult = await importServices(client, data.services, options);
    results.push(servicesResult);
  }

  if (data.testimonials) {
    const testimonialsResult = await importTestimonials(client, data.testimonials, options);
    results.push(testimonialsResult);
  }

  if (data.projects) {
    const projectsResult = await importProjects(client, data.projects, options);
    results.push(projectsResult);
  }

  if (data.settings) {
    const settingsResult = await importSettings(client, data.settings, options);
    results.push(settingsResult);
  }

  const totalImported = results.reduce((sum, r) => sum + r.imported, 0);
  const totalErrors = results.reduce((sum, r) => sum + r.errors, 0);

  return {
    type: 'bulk',
    results,
    summary: {
      totalImported,
      totalErrors,
      dataTypes: results.map(r => r.type)
    }
  };
}
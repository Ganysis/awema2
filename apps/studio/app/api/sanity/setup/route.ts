import { NextRequest, NextResponse } from 'next/server';
import { sanitySetupService } from '@/lib/services/sanity-setup.service';
import { sanityDataMigrationService } from '@/lib/services/sanity-data-migration.service';
import { SanityProjectConfigManager } from '@/config/sanity-projects.config';

/**
 * API POST /api/sanity/setup
 * Crée un nouveau projet Sanity pour un client
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 API /api/sanity/setup - Début création projet Sanity...');

    const body = await request.json();
    const { workflow, options = {} } = body;

    // Validation des données requises
    if (!workflow) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données workflow manquantes',
          code: 'MISSING_WORKFLOW'
        },
        { status: 400 }
      );
    }

    // Validation de la configuration du projet
    const configErrors = SanityProjectConfigManager.validateProjectConfig(workflow);
    if (configErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Configuration invalide',
          details: configErrors,
          code: 'INVALID_CONFIG'
        },
        { status: 400 }
      );
    }

    console.log(`📋 Création projet Sanity pour ${workflow.businessName} (${workflow.businessType})`);

    // Étape 1: Configuration du projet Sanity
    const projectSetup = await sanitySetupService.setupSanityProject(workflow);
    console.log(`✅ Projet Sanity créé: ${projectSetup.credentials.projectId}`);

    // Étape 2: Migration des données
    const migrationOptions = {
      includeTestData: options.includeTestData !== false,
      generateSampleContent: options.generateSampleContent !== false,
      importImages: options.importImages !== false,
      createInitialPages: options.createInitialPages !== false,
      setupNavigation: options.setupNavigation !== false
    };

    const migratedData = await sanityDataMigrationService.migrateWorkflowData(
      projectSetup.credentials,
      workflow,
      migrationOptions
    );

    console.log(`✅ Migration données complète pour ${workflow.businessName}`);

    // Étape 3: Génération des URLs et informations finales
    const result = {
      success: true,
      projectId: projectSetup.credentials.projectId,
      credentials: {
        projectId: projectSetup.credentials.projectId,
        dataset: projectSetup.credentials.dataset,
        studioUrl: projectSetup.credentials.studioUrl,
        cdnUrl: projectSetup.credentials.cdnUrl
        // Note: On ne retourne pas le token pour des raisons de sécurité
      },
      setup: {
        businessName: workflow.businessName,
        businessType: workflow.businessType,
        domain: workflow.domain,
        template: workflow.selectedTemplate,
        schemasDeployed: projectSetup.schemas,
        webhooksConfigured: projectSetup.webhooks,
        featuresEnabled: SanityProjectConfigManager.getFeaturesForBusiness(workflow.businessType)
      },
      content: {
        servicesCount: migratedData.services.length,
        testimonialsCount: migratedData.testimonials.length,
        projectsCount: migratedData.projects.length,
        pagesCount: migratedData.pages.length
      },
      urls: {
        studio: projectSetup.credentials.studioUrl,
        api: projectSetup.credentials.cdnUrl,
        preview: `https://${workflow.domain}`,
        admin: `https://${workflow.domain}/admin`
      },
      nextSteps: [
        'Configurer le déploiement Astro',
        'Connecter Cloudflare Pages',
        'Configurer le domaine personnalisé',
        'Tester la synchronisation'
      ],
      createdAt: new Date().toISOString()
    };

    console.log(`🎉 Projet Sanity complet pour ${workflow.businessName}`);

    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('❌ Erreur création projet Sanity:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur interne lors de la création du projet Sanity',
        details: error.message,
        code: 'SANITY_SETUP_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * API GET /api/sanity/setup
 * Récupère la liste des projets Sanity configurés
 */
export async function GET(request: NextRequest) {
  try {
    console.log('📋 API /api/sanity/setup - Liste des projets...');

    const url = new URL(request.url);
    const businessType = url.searchParams.get('businessType');
    const status = url.searchParams.get('status');
    const limit = parseInt(url.searchParams.get('limit') || '50');

    // Récupérer tous les projets
    const allProjects = await sanitySetupService.listProjects();

    // Filtrer selon les paramètres
    let filteredProjects = allProjects;

    if (businessType) {
      filteredProjects = filteredProjects.filter(p =>
        p.businessType.toLowerCase() === businessType.toLowerCase()
      );
    }

    if (status) {
      filteredProjects = filteredProjects.filter(p => p.status === status);
    }

    // Limiter les résultats
    const paginatedProjects = filteredProjects.slice(0, limit);

    // Enrichir avec les informations de configuration
    const enrichedProjects = paginatedProjects.map(project => {
      const businessConfig = SanityProjectConfigManager.getBusinessConfig(project.businessType);

      return {
        ...project,
        config: {
          displayName: businessConfig?.displayName || project.businessType,
          features: businessConfig?.features || [],
          templatesAvailable: businessConfig?.templates?.length || 0
        }
      };
    });

    const result = {
      success: true,
      projects: enrichedProjects,
      pagination: {
        total: allProjects.length,
        filtered: filteredProjects.length,
        returned: enrichedProjects.length,
        hasMore: filteredProjects.length > limit
      },
      filters: {
        businessType,
        status,
        limit
      },
      summary: {
        totalProjects: allProjects.length,
        byBusinessType: this.groupByBusinessType(allProjects),
        byStatus: this.groupByStatus(allProjects)
      }
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Erreur récupération projets Sanity:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des projets',
        details: error.message,
        code: 'PROJECTS_LIST_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * Utilitaires privés
 */
function groupByBusinessType(projects: any[]): Record<string, number> {
  return projects.reduce((acc, project) => {
    acc[project.businessType] = (acc[project.businessType] || 0) + 1;
    return acc;
  }, {});
}

function groupByStatus(projects: any[]): Record<string, number> {
  return projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});
}
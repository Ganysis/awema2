import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/lib/db/services';
import { StaticExportService } from '@/lib/services/static-export-simplified';
import archiver from 'archiver';
import { Readable } from 'stream';
// import { authenticate } from '@/lib/api/middleware'; // TODO: Fix bcrypt

export async function POST(request: NextRequest) {
  try {
    // TODO: Re-enable authentication
    // const authResult = await authenticate(request);
    // if (!authResult.success) {
    //   return NextResponse.json(
    //     { success: false, error: authResult.error },
    //     { status: 401 }
    //   );
    // }

    const body = await request.json();
    const { 
      projectId,
      minifyHtml = true,
      minifyCss = true,
      minifyJs = true,
      generateManifest = true,
      generateServiceWorker = true,
      includeCms = false,
      cmsPassword
    } = body;

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    console.log('Exporting project:', projectId);

    // Récupérer le projet
    const project = await ProjectService.findById(projectId);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Récupérer les données du projet
    let projectData;
    if (project.data) {
      projectData = typeof project.data === 'string' ? JSON.parse(project.data) : project.data;
    } else {
      return NextResponse.json(
        { success: false, error: 'No data found for this project' },
        { status: 400 }
      );
    }

    // Préparer les options d'export
    const exportOptions = {
      minifyHtml,
      minifyCss,
      minifyJs,
      optimizeImages: true,
      generateManifest,
      generateServiceWorker,
      includeSourceMap: false,
      useCompression: true,
      includeCms,
      cmsPassword
    };

    // Créer le contenu statique
    const exportData = await StaticExportService.exportSite(
      projectData,
      exportOptions
    );

    // Créer une archive ZIP
    const archive = archiver('zip', {
      zlib: { level: 9 } // Compression maximale
    });

    // Gérer les erreurs de l'archive
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      throw err;
    });

    // Créer un buffer pour stocker le ZIP
    const chunks: Buffer[] = [];
    
    archive.on('data', (chunk) => {
      chunks.push(Buffer.from(chunk));
    });

    // Attendre que l'archive soit finalisée
    const zipBuffer = await new Promise<Buffer>((resolve, reject) => {
      archive.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      archive.on('error', reject);

      // Ajouter les fichiers à l'archive
      // index.html
      archive.append(exportData.html, { name: 'index.html' });

      // CSS
      if (exportData.css) {
        archive.append(exportData.css, { name: 'assets/css/styles.css' });
      }

      // JavaScript
      if (exportData.js) {
        archive.append(exportData.js, { name: 'assets/js/main.js' });
      }

      // Fichiers additionnels (manifest, sitemap, etc.)
      exportData.additionalFiles.forEach(file => {
        archive.append(file.content, { name: file.path });
      });

      // Assets (images, fonts, etc.)
      exportData.assets.forEach(asset => {
        archive.append(asset.data, { name: asset.path });
      });

      // Finaliser l'archive
      archive.finalize();
    });

    console.log('Export completed, ZIP size:', (zipBuffer.length / 1024).toFixed(2), 'KB');

    // Retourner le fichier ZIP
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${project.slug || 'site'}-export.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });

  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Export failed' },
      { status: 500 }
    );
  }
}
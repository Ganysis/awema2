#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fetch = require('node-fetch');

async function traceExportRender() {
  try {
    console.log('🔍 Traçage du processus d\'export...\n');

    // 1. Récupérer le projet
    const project = await prisma.project.findFirst({
      where: { name: { contains: 'COMPLET' } },
      orderBy: { createdAt: 'desc' }
    });

    if (!project) {
      console.log('❌ Aucun projet trouvé');
      return;
    }

    console.log('📋 Projet:', project.name);
    const projectData = JSON.parse(project.data);

    // 2. Simuler l'export
    console.log('\n🔄 Simulation de l\'export...');
    
    const response = await fetch('http://localhost:3000/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: project.id,
        projectData: projectData,
        options: {
          minifyHtml: false,
          forDeployment: true,
          includeCms: true,
          cmsLevel: 'basic'
        }
      })
    });

    if (!response.ok) {
      console.log('❌ Erreur API:', response.status);
      return;
    }

    const result = await response.json();
    
    // 3. Analyser le HTML généré
    console.log('\n📄 Analyse du HTML généré:');
    console.log('   Taille:', result.html?.length || 0);
    
    // Chercher les problèmes
    const problems = [];
    
    if (result.html?.includes('[object Object]')) {
      const matches = result.html.match(/(.{50})\[object Object\](.{50})/g) || [];
      problems.push({
        type: '[object Object]',
        count: matches.length,
        contexts: matches.slice(0, 3)
      });
    }
    
    if (result.html?.includes('undefined')) {
      const matches = result.html.match(/(.{50})undefined(.{50})/g) || [];
      problems.push({
        type: 'undefined',
        count: matches.length,
        contexts: matches.slice(0, 3)
      });
    }
    
    if (problems.length > 0) {
      console.log('\n❌ Problèmes trouvés:');
      problems.forEach(p => {
        console.log(`\n   ${p.type}: ${p.count} occurrences`);
        p.contexts.forEach((ctx, i) => {
          console.log(`   ${i + 1}. ${ctx.trim()}`);
        });
      });
    } else {
      console.log('   ✅ Aucun [object Object] ou undefined trouvé!');
    }

    // 4. Examiner les blocs problématiques
    console.log('\n🔎 Examen détaillé des blocs:');
    
    const contentBlock = projectData.pages[0].blocks.find(b => b.type === 'content-ultra-modern');
    if (contentBlock) {
      console.log('\n   content-ultra-modern:');
      console.log('     Props présentes:', Object.keys(contentBlock.props).join(', '));
      console.log('     contentType:', contentBlock.props.contentType);
      console.log('     content défini:', contentBlock.props.content !== undefined);
      console.log('     timeline défini:', contentBlock.props.timeline !== undefined);
    }

    // 5. Sauvegarder un échantillon pour analyse
    if (result.html && problems.length > 0) {
      const fs = require('fs').promises;
      await fs.writeFile('export-debug.html', result.html);
      console.log('\n💾 HTML exporté sauvegardé dans: export-debug.html');
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Créer l'endpoint d'export si nécessaire
async function createExportEndpoint() {
  const endpointCode = `import { NextRequest, NextResponse } from 'next/server';
import { StaticExportService } from '@/lib/services/static-export-simplified';

export async function POST(request: NextRequest) {
  try {
    const { projectData, options } = await request.json();
    
    const exportData = await StaticExportService.exportSite(projectData, options);
    
    return NextResponse.json({
      success: true,
      html: exportData.html,
      css: exportData.css,
      js: exportData.js
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}`;

  const fs = require('fs').promises;
  const path = require('path');
  
  const dir = path.join(__dirname, '../app/api/export');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'route.ts'), endpointCode);
  console.log('✅ Endpoint d\'export créé');
}

// Vérifier l'endpoint
fetch('http://localhost:3000/api/export', { method: 'POST' })
  .then(res => {
    if (res.status === 404) {
      return createExportEndpoint().then(() => {
        console.log('⏳ Attendez 2 secondes...\n');
        setTimeout(traceExportRender, 2000);
      });
    } else {
      traceExportRender();
    }
  })
  .catch(() => {
    console.log('⚠️  Serveur non lancé');
  });
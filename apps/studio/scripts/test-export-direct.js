#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs').promises;
const path = require('path');

async function testExportDirect() {
  try {
    console.log('🧪 Test d\'export direct...\n');

    // 1. Créer un projet MINIMAL qui DOIT fonctionner
    const minimalProject = {
      businessInfo: {
        name: 'Test Minimal',
        email: 'test@minimal.fr',
        phone: '01 23 45 67 89'
      },
      projectName: 'Export Test Minimal',
      pages: [{
        id: 'home',
        name: 'Accueil',
        slug: '/',
        blocks: [
          {
            id: 'hero-1',
            type: 'hero-ultra-modern',
            props: {
              variant: 'gradient-wave',
              title: 'Titre Simple',
              subtitle: 'Sous-titre sans problème',
              description: 'Description normale sans caractères spéciaux'
            }
          },
          {
            id: 'content-1', 
            type: 'content-ultra-modern',
            props: {
              variant: 'glassmorphism',
              contentType: 'text-image',
              title: 'À propos',
              content: 'Texte simple sans objets complexes.',
              imagePosition: 'right'
            }
          }
        ]
      }],
      theme: {
        colors: {
          primary: '#3b82f6',
          secondary: '#10b981'
        }
      }
    };

    // 2. Tester l'export via l'API
    console.log('📡 Test via API...');
    
    const response = await fetch('http://localhost:3000/api/projects/test-export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectData: minimalProject })
    });

    if (response.ok) {
      const result = await response.json();
      
      // Analyser le résultat
      console.log('\n📊 Résultats:');
      console.log('   HTML généré:', result.html ? '✅' : '❌');
      console.log('   Taille HTML:', result.html?.length || 0);
      console.log('   Contient [object Object]:', result.html?.includes('[object Object]') ? '❌' : '✅');
      console.log('   Contient undefined:', result.html?.includes('undefined') ? '❌' : '✅');
      
      // Sauvegarder pour inspection
      if (result.html) {
        await fs.writeFile('test-export.html', result.html);
        console.log('\n💾 Export sauvegardé dans: test-export.html');
      }
    }

    // 3. Test direct sans API
    console.log('\n🔧 Test direct du service...');
    
    // Importer et tester directement
    const testCode = `
const { SimpleExportV2 } = require('../lib/services/simple-export-v2');
const html = await SimpleExportV2.exportToHTML(${JSON.stringify(minimalProject)});
console.log('Export réussi:', html.length, 'caractères');
fs.writeFileSync('export-direct.html', html);
`;

    await fs.writeFile('test-export-code.js', testCode);
    console.log('💡 Code de test créé dans: test-export-code.js');

    // 4. Créer un endpoint de test si nécessaire
    const endpointPath = path.join(__dirname, '../app/api/projects/test-export/route.ts');
    const endpointCode = `
import { NextRequest, NextResponse } from 'next/server';
import { SimpleExportV2 } from '@/lib/services/simple-export-v2';

export async function POST(request: NextRequest) {
  try {
    const { projectData } = await request.json();
    const html = await SimpleExportV2.exportToHTML(projectData);
    
    return NextResponse.json({
      success: true,
      html: html
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}`;

    await fs.mkdir(path.dirname(endpointPath), { recursive: true });
    await fs.writeFile(endpointPath, endpointCode);
    console.log('✅ Endpoint de test créé');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testExportDirect();
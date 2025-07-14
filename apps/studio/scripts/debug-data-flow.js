#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugDataFlow() {
  try {
    console.log('🔍 Analyse du flux de données...\n');

    // 1. Récupérer le dernier projet
    const project = await prisma.project.findFirst({
      where: { name: { contains: 'COMPLET' } },
      orderBy: { createdAt: 'desc' }
    });

    if (!project) {
      console.log('❌ Aucun projet trouvé');
      return;
    }

    console.log('📋 Projet trouvé:', project.name);
    console.log('   ID:', project.id);

    // 2. Analyser les données stockées
    const projectData = JSON.parse(project.data);
    console.log('\n📦 Structure des données stockées:');
    console.log('   Type:', typeof projectData);
    console.log('   Clés principales:', Object.keys(projectData));

    // 3. Examiner un bloc spécifique (content-ultra-modern)
    const contentBlock = projectData.pages[0].blocks.find(b => b.type === 'content-ultra-modern');
    if (contentBlock) {
      console.log('\n🔎 Bloc content-ultra-modern trouvé:');
      console.log('   Props keys:', Object.keys(contentBlock.props));
      console.log('   contentType:', contentBlock.props.contentType);
      console.log('   content type:', typeof contentBlock.props.content);
      console.log('   content value:', contentBlock.props.content);
      console.log('   timeline type:', typeof contentBlock.props.timeline);
      console.log('   timeline value:', JSON.stringify(contentBlock.props.timeline, null, 2));
    }

    // 4. Examiner le bloc contact
    const contactBlock = projectData.pages[0].blocks.find(b => b.type === 'contact-ultra-modern');
    if (contactBlock) {
      console.log('\n🔎 Bloc contact-ultra-modern trouvé:');
      console.log('   contactInfo type:', typeof contactBlock.props.contactInfo);
      console.log('   contactInfo value:', JSON.stringify(contactBlock.props.contactInfo, null, 2));
      console.log('   formFields type:', typeof contactBlock.props.formFields);
      console.log('   formFields length:', contactBlock.props.formFields?.length);
      console.log('   formFields[0]:', JSON.stringify(contactBlock.props.formFields?.[0], null, 2));
    }

    // 5. Vérifier la chaîne de rendu
    console.log('\n⚙️  Test de rendu direct:');
    
    // Charger le module de rendu
    const path = require('path');
    const templatePath = path.join(__dirname, '../../../packages/templates/dist/index.js');
    console.log('   Chemin templates:', templatePath);
    
    try {
      const { renderContentUltraModern } = require(templatePath);
      
      if (contentBlock) {
        console.log('\n   Test avec les props actuelles:');
        const result = renderContentUltraModern(contentBlock.props, []);
        console.log('   Type de résultat:', typeof result);
        console.log('   A un HTML:', !!result.html);
        console.log('   HTML contient [object Object]:', result.html?.includes('[object Object]'));
        
        // Chercher où apparaît [object Object]
        if (result.html?.includes('[object Object]')) {
          const match = result.html.match(/(.{50})\[object Object\](.{50})/);
          if (match) {
            console.log('   Contexte du [object Object]:', match[0]);
          }
        }
      }
    } catch (error) {
      console.log('   ❌ Erreur lors du chargement du module:', error.message);
    }

    // 6. Vérifier comment l'API retourne les données
    console.log('\n🌐 Test via l\'API:');
    const fetch = require('node-fetch');
    
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${project.id}`);
      const apiData = await response.json();
      
      if (apiData.success && apiData.data.data) {
        const apiContentBlock = apiData.data.data.pages[0].blocks.find(b => b.type === 'content-ultra-modern');
        if (apiContentBlock) {
          console.log('   content type via API:', typeof apiContentBlock.props.content);
          console.log('   timeline type via API:', typeof apiContentBlock.props.timeline);
        }
      }
    } catch (error) {
      console.log('   ⚠️  API non accessible');
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugDataFlow();
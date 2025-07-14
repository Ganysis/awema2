#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function debugProject() {
  try {
    console.log('🔍 DIAGNOSTIC COMPLET DU PROJET\n');

    // 1. Récupérer le projet
    const project = await prisma.project.findUnique({
      where: { id: 'cmd0oiooj0001j18530sfuhwd' },
      include: { client: true }
    });

    if (!project) {
      console.log('❌ PROJET INTROUVABLE DANS LA BASE DE DONNÉES!');
      return;
    }

    console.log('✅ Projet trouvé dans la base:');
    console.log('   ID:', project.id);
    console.log('   Nom:', project.name);
    console.log('   Client:', project.client?.name);
    console.log('   Créé le:', project.createdAt);
    console.log('   Modifié le:', project.updatedAt);
    console.log('   Taille des données:', project.data.length, 'caractères');

    // 2. Parser et analyser les données
    let projectData;
    try {
      projectData = JSON.parse(project.data);
      console.log('\n✅ Données JSON valides');
    } catch (e) {
      console.log('\n❌ ERREUR: Les données ne sont pas du JSON valide!');
      console.log('Erreur:', e.message);
      return;
    }

    // 3. Vérifier la structure
    console.log('\n📊 Structure des données:');
    console.log('   businessInfo:', projectData.businessInfo ? '✅ Présent' : '❌ MANQUANT');
    console.log('   projectName:', projectData.projectName || '❌ MANQUANT');
    console.log('   globalHeader:', projectData.globalHeader ? '✅ Présent' : '❌ MANQUANT');
    console.log('   globalFooter:', projectData.globalFooter ? '✅ Présent' : '❌ MANQUANT');
    console.log('   pages:', Array.isArray(projectData.pages) ? `✅ ${projectData.pages.length} page(s)` : '❌ MANQUANT');
    console.log('   theme:', projectData.theme ? '✅ Présent' : '❌ MANQUANT');

    // 4. Analyser les pages et blocs
    if (projectData.pages && projectData.pages.length > 0) {
      console.log('\n📄 Analyse des pages:');
      projectData.pages.forEach((page, i) => {
        console.log(`\nPage ${i + 1}: ${page.name || 'Sans nom'}`);
        console.log('   ID:', page.id || '❌ MANQUANT');
        console.log('   Slug:', page.slug || '❌ MANQUANT');
        console.log('   Blocs:', Array.isArray(page.blocks) ? page.blocks.length : '❌ AUCUN');
        
        if (page.blocks && page.blocks.length > 0) {
          console.log('   Liste des blocs:');
          page.blocks.forEach((block, j) => {
            console.log(`     ${j + 1}. ${block.type} (${block.id})`);
            if (block.type === 'contact-ultra-modern') {
              const formFields = typeof block.props.formFields === 'string' 
                ? JSON.parse(block.props.formFields) 
                : block.props.formFields;
              console.log(`        → ${formFields?.length || 0} champs de formulaire`);
            }
          });
        }
      });
    }

    // 5. Sauvegarder les données pour inspection
    fs.writeFileSync('project-debug.json', JSON.stringify(projectData, null, 2));
    console.log('\n💾 Données complètes sauvegardées dans: project-debug.json');

    // 6. Vérifier la connexion à la base
    console.log('\n🔌 Test de connexion à la base:');
    const count = await prisma.project.count();
    console.log(`   ✅ ${count} projets au total dans la base`);

    // 7. Créer un projet de test simple
    console.log('\n🧪 Création d\'un projet de test simple...');
    const testProject = await prisma.project.create({
      data: {
        name: 'TEST SIMPLE - ' + new Date().toISOString(),
        slug: 'test-simple-' + Date.now(),
        template: 'test',
        data: JSON.stringify({
          projectName: 'Test Simple',
          pages: [{
            id: 'home',
            name: 'Accueil',
            slug: '/',
            blocks: [{
              id: 'test-1',
              type: 'hero-centered',
              props: {
                title: 'TEST RÉUSSI',
                subtitle: 'Si vous voyez ceci, ça marche!'
              }
            }]
          }]
        })
      }
    });
    console.log('   ✅ Projet test créé:', testProject.id);
    console.log('   🔗 Lien: http://localhost:3000/editor/' + testProject.id);

  } catch (error) {
    console.error('\n❌ ERREUR CRITIQUE:', error);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

debugProject();
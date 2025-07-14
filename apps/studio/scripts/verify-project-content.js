#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyProjectContent() {
  try {
    const project = await prisma.project.findUnique({
      where: { id: 'cmd0p0hyo0001j1bpd8vuwc3j' }
    });
    
    if (!project) {
      console.log('❌ Projet introuvable');
      return;
    }
    
    const data = JSON.parse(project.data);
    
    console.log('📋 Analyse du projet:', project.name);
    console.log('ID:', project.id);
    console.log('\nStructure des données:');
    console.log('- businessInfo:', !!data.businessInfo);
    console.log('- projectName:', data.projectName);
    console.log('- pages:', Array.isArray(data.pages) ? data.pages.length : 0);
    
    if (data.pages && data.pages[0]) {
      console.log('\nPage d\'accueil:');
      console.log('- blocks:', Array.isArray(data.pages[0].blocks) ? data.pages[0].blocks.length : 0);
      
      if (data.pages[0].blocks) {
        console.log('\nListe des blocs:');
        data.pages[0].blocks.forEach((block, i) => {
          console.log(`${i + 1}. ${block.type} (${block.id})`);
        });
      }
    }
    
    console.log('\n💾 Données complètes:');
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyProjectContent();
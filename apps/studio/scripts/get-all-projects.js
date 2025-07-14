#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    console.log(`\n📊 Total de projets: ${projects.length}\n`);

    projects.forEach((project, index) => {
      const projectData = JSON.parse(project.data);
      const totalBlocks = projectData.pages?.reduce((acc, page) => 
        acc + (page.blocks?.length || 0), 0) || 0;
      
      console.log(`${index + 1}. ${project.name}`);
      console.log(`   ID: ${project.id}`);
      console.log(`   Client: ${project.client?.name || 'Aucun'}`);
      console.log(`   Pages: ${projectData.pages?.length || 0}`);
      console.log(`   Blocs totaux: ${totalBlocks}`);
      console.log(`   Dernière modification: ${project.updatedAt.toLocaleDateString()}`);
      console.log('');
    });

    // Trouver le projet avec le plus de blocs
    let maxBlocks = 0;
    let bestProject = null;

    projects.forEach(project => {
      const projectData = JSON.parse(project.data);
      const totalBlocks = projectData.pages?.reduce((acc, page) => 
        acc + (page.blocks?.length || 0), 0) || 0;
      
      if (totalBlocks > maxBlocks) {
        maxBlocks = totalBlocks;
        bestProject = project;
      }
    });

    if (bestProject) {
      console.log(`\n🏆 Meilleur projet pour test: ${bestProject.name}`);
      console.log(`   Avec ${maxBlocks} blocs`);
      
      // Sauvegarder ce projet
      const fs = require('fs');
      fs.writeFileSync(
        'best-project-data.json', 
        JSON.stringify(JSON.parse(bestProject.data), null, 2)
      );
      console.log('   ✅ Sauvegardé dans best-project-data.json');
    }

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getAllProjects();
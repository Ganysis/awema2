#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listProjects() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        updatedAt: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    console.log('\n📋 Projets disponibles dans votre outil:\n');
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name}`);
      console.log(`   ID: ${project.id}`);
      console.log(`   Lien: http://localhost:3000/editor/${project.id}`);
      console.log(`   Dernière modification: ${project.updatedAt.toLocaleDateString()}`);
      console.log('');
    });

    console.log('💡 Utilisez l\'un de ces liens pour voir le projet dans l\'éditeur');
    
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listProjects();
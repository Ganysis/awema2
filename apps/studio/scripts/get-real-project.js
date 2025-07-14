#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getRealProject() {
  try {
    // Récupérer un vrai projet avec tous ses blocs
    const projects = await prisma.project.findMany({
      include: {
        client: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 1
    });

    if (projects.length === 0) {
      console.log('Aucun projet trouvé dans la base de données');
      return;
    }

    const project = projects[0];
    console.log('\n📁 Projet trouvé:', project.name);
    console.log('ID:', project.id);
    console.log('Client:', project.client?.name || 'Aucun');
    console.log('Template:', project.template);
    console.log('Dernière modification:', project.updatedAt);
    
    // Parser les données du projet
    const projectData = JSON.parse(project.data);
    console.log('\n📄 Pages:', projectData.pages?.length || 0);
    
    if (projectData.pages && projectData.pages.length > 0) {
      projectData.pages.forEach((page, pageIndex) => {
        console.log(`\n📄 Page ${pageIndex + 1}: ${page.name || page.title}`);
        console.log(`   Slug: ${page.slug}`);
        console.log(`   Blocs: ${page.blocks?.length || 0}`);
        
        if (page.blocks) {
          page.blocks.forEach((block, blockIndex) => {
            console.log(`\n   🔲 Bloc ${blockIndex + 1}: ${block.type}`);
            console.log(`      ID: ${block.id}`);
            
            // Afficher les props importantes selon le type
            if (block.type === 'contact-ultra-modern' || block.type === 'contact-form-map') {
              console.log('      Props contact:');
              if (block.props.formFields) {
                const fields = typeof block.props.formFields === 'string' 
                  ? JSON.parse(block.props.formFields) 
                  : block.props.formFields;
                console.log('      Champs:', fields.map(f => f.name).join(', '));
              }
            }
            
            // Afficher quelques props clés
            Object.keys(block.props).slice(0, 5).forEach(key => {
              const value = block.props[key];
              if (typeof value === 'string' && value.length < 50) {
                console.log(`      ${key}: ${value}`);
              }
            });
          });
        }
      });
    }

    // Sauvegarder le projet complet pour analyse
    const fs = require('fs');
    fs.writeFileSync(
      'real-project-data.json', 
      JSON.stringify(projectData, null, 2)
    );
    console.log('\n✅ Données complètes sauvegardées dans real-project-data.json');

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getRealProject();
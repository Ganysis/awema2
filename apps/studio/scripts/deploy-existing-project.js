#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const fetch = require('node-fetch');
const crypto = require('crypto');
const prisma = new PrismaClient();

async function deployExistingProject() {
  try {
    console.log('🔄 Recherche d\'un projet existant avec des blocs...\n');

    // Récupérer le projet le plus récent avec des blocs
    const project = await prisma.project.findFirst({
      where: {
        name: 'Site Plomberie Dupont COMPLET'
      },
      include: {
        client: true
      }
    });

    if (!project) {
      console.log('❌ Aucun projet trouvé');
      return;
    }

    const projectData = JSON.parse(project.data);
    
    console.log('✅ Projet trouvé:', project.name);
    console.log('   ID:', project.id);
    console.log('   Client:', project.client?.name || 'Aucun');
    console.log('   Pages:', projectData.pages?.length || 0);
    console.log('   Blocs:', projectData.pages?.[0]?.blocks?.length || 0);

    // Afficher les types de blocs
    if (projectData.pages?.[0]?.blocks) {
      console.log('\n📋 Blocs présents:');
      projectData.pages[0].blocks.forEach((block, i) => {
        console.log(`   ${i + 1}. ${block.type} (${block.id})`);
      });
    }

    // Déployer ce projet
    console.log('\n📦 Déploiement du projet...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: project.id,
        siteId: crypto.randomUUID(),
        siteName: `plomberie-real-${Date.now()}`,
        projectData: projectData,
        plan: 'pro',
        adminEmail: 'admin@plomberie.fr'
      })
    });

    console.log('Status:', response.status);
    console.log('Headers:', response.headers.raw());
    
    const responseText = await response.text();
    console.log('Réponse (100 premiers caractères):', responseText.substring(0, 100));
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Erreur de parsing JSON');
      console.error('Réponse complète:', responseText);
      return;
    }
    
    if (result.success) {
      console.log('\n✅ DÉPLOIEMENT RÉUSSI !\n');
      console.log('🌐 Site : ' + result.siteUrl);
      console.log('🔧 Admin : ' + result.adminUrl);
      console.log('\n🔑 Connexion :');
      console.log('Email : ' + result.credentials.email);
      console.log('Mot de passe : ' + result.credentials.password);
      
    } else {
      console.error('❌ Erreur:', result.error);
      if (result.details) {
        console.error('Détails:', JSON.stringify(result.details, null, 2));
      }
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Vérifier que le serveur est lancé
fetch('http://localhost:3000/api/health')
  .then(() => deployExistingProject())
  .catch(() => {
    console.log('⚠️  Serveur non détecté');
    console.log('   Lancez le serveur avec: npm run dev');
    process.exit(1);
  });
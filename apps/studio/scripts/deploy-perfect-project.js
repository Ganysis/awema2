#!/usr/bin/env node

const fetch = require('node-fetch');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

async function deployPerfectProject() {
  try {
    console.log('🚀 Déploiement du projet PARFAIT...\n');

    // Récupérer le projet PARFAIT
    const project = await prisma.project.findFirst({
      where: { name: { contains: 'TEST PARFAIT' } },
      orderBy: { createdAt: 'desc' }
    });

    if (!project) {
      console.log('❌ Projet PARFAIT introuvable');
      return;
    }

    const projectData = JSON.parse(project.data);
    
    console.log('📋 Projet à déployer:');
    console.log('   Nom:', project.name);
    console.log('   Blocs:', projectData.pages[0].blocks.length);
    console.log('   - hero-ultra-modern');
    console.log('   - content-ultra-modern (timeline)');
    console.log('   - content-ultra-modern (text-image)');
    console.log('   - contact-ultra-modern');
    
    // Déployer via l'API
    console.log('\n📦 Envoi vers Netlify...\n');
    
    const response = await fetch('http://localhost:3000/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: project.id,
        siteId: crypto.randomUUID(),
        siteName: `test-parfait-${Date.now()}`,
        projectData: projectData,
        plan: 'pro',
        adminEmail: 'admin@test-parfait.fr'
      })
    });

    const responseText = await response.text();
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Erreur de parsing:', responseText);
      return;
    }
    
    if (result.success) {
      console.log('✅ DÉPLOIEMENT RÉUSSI !!\n');
      console.log('🌐 Site en ligne : ' + result.siteUrl);
      console.log('🔧 Admin CMS : ' + result.adminUrl);
      console.log('\n🔑 Connexion CMS:');
      console.log('   Email : ' + result.credentials.email);
      console.log('   Mot de passe : ' + result.credentials.password);
      
      console.log('\n✨ CE QUI DEVRAIT FONCTIONNER PARFAITEMENT:');
      console.log('   ✅ Aucun [object Object] dans le contenu');
      console.log('   ✅ Aucun undefined visible');
      console.log('   ✅ Timeline affichée correctement');
      console.log('   ✅ Texte et features affichés');
      console.log('   ✅ Formulaire de contact complet');
      console.log('   ✅ CSS complet (glassmorphism, gradients)');
      
      console.log('\n🔍 VÉRIFIEZ PARTICULIÈREMENT:');
      console.log('   1. La section timeline (pas de [object Object])');
      console.log('   2. La section À propos (texte visible)');
      console.log('   3. Le formulaire de contact (tous les champs)');
      
      // Sauvegarder les infos
      const fs = require('fs');
      const deployInfo = {
        projectId: project.id,
        projectName: project.name,
        siteUrl: result.siteUrl,
        adminUrl: result.adminUrl,
        deployedAt: new Date().toISOString(),
        credentials: result.credentials
      };
      
      fs.writeFileSync(
        'perfect-deployment.json',
        JSON.stringify(deployInfo, null, 2)
      );
      console.log('\n💾 Infos sauvegardées dans: perfect-deployment.json');
      
    } else {
      console.error('❌ Erreur de déploiement:', result.error);
      if (result.details) {
        console.error('Détails:', result.details);
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
  .then(() => deployPerfectProject())
  .catch(() => {
    console.log('⚠️  Serveur non détecté');
    console.log('   Lancez le serveur avec: npm run dev');
    process.exit(1);
  });
#!/usr/bin/env node

const fetch = require('node-fetch');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

async function deployRealProject() {
  try {
    console.log('🚀 Déploiement du projet Plomberie Excellence...\n');

    // Récupérer le projet
    const project = await prisma.project.findUnique({
      where: { id: 'cmd0pj2xr0001j1g80j5v71vu' },
      include: { client: true }
    });

    if (!project) {
      console.log('❌ Projet introuvable');
      return;
    }

    const projectData = JSON.parse(project.data);
    
    console.log('📋 Projet à déployer:');
    console.log('   Nom:', project.name);
    console.log('   Client:', project.client?.name);
    console.log('   Blocs:', projectData.pages[0].blocks.length);
    
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
        siteName: `plomberie-excellence-${Date.now()}`,
        projectData: projectData,
        plan: 'pro',
        adminEmail: 'admin@plomberie-excellence.fr'
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
      console.log('✅ DÉPLOIEMENT RÉUSSI !\n');
      console.log('🌐 Site en ligne : ' + result.siteUrl);
      console.log('🔧 Admin CMS : ' + result.adminUrl);
      console.log('\n🔑 Connexion CMS:');
      console.log('   Email : ' + result.credentials.email);
      console.log('   Mot de passe : ' + result.credentials.password);
      
      console.log('\n📋 Contenu déployé:');
      console.log('   ✅ Header avec navigation');
      console.log('   ✅ Hero gradient-wave');
      console.log('   ✅ Services (3 services avec prix)');
      console.log('   ✅ Content timeline');
      console.log('   ✅ Gallery masonry (4 réalisations)');
      console.log('   ✅ Reviews carousel (3 avis)');
      console.log('   ✅ Pricing (3 plans)');
      console.log('   ✅ FAQ (4 questions)');
      console.log('   ✅ CTA gradient animé');
      console.log('   ✅ Contact (5 champs + map)');
      console.log('   ✅ Footer complet');
      
      console.log('\n🎯 À vérifier sur le site:');
      console.log('   1. Tous les blocs sont visibles');
      console.log('   2. Le CSS est complet (glassmorphism, gradients, etc.)');
      console.log('   3. Les images placeholder sont générées');
      console.log('   4. Le formulaire de contact fonctionne');
      console.log('   5. La map s\'affiche correctement');
      
      // Sauvegarder les infos de déploiement
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
        'last-deployment.json',
        JSON.stringify(deployInfo, null, 2)
      );
      console.log('\n💾 Infos de déploiement sauvegardées dans: last-deployment.json');
      
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
  .then(() => deployRealProject())
  .catch(() => {
    console.log('⚠️  Serveur non détecté');
    console.log('   Lancez le serveur avec: npm run dev');
    process.exit(1);
  });
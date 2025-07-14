#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function checkEditorSync() {
  try {
    console.log('🔍 DIAGNOSTIC DE SYNCHRONISATION ÉDITEUR\n');

    // 1. Vérifier la connexion à la base
    console.log('1️⃣ Test de la base de données:');
    const dbPath = path.join(__dirname, '../prisma/dev.db');
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath);
      console.log('   ✅ Base SQLite trouvée:', dbPath);
      console.log('   📊 Taille:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
      console.log('   📅 Dernière modification:', stats.mtime);
    } else {
      console.log('   ❌ Base SQLite introuvable!');
    }

    // 2. Vérifier les projets dans la base
    console.log('\n2️⃣ Projets dans la base:');
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        updatedAt: true,
        data: true
      },
      orderBy: { updatedAt: 'desc' },
      take: 5
    });

    projects.forEach(p => {
      const data = JSON.parse(p.data);
      const blockCount = data.pages?.[0]?.blocks?.length || 0;
      console.log(`   - ${p.name}`);
      console.log(`     ID: ${p.id}`);
      console.log(`     Blocs: ${blockCount}`);
      console.log(`     Modifié: ${p.updatedAt.toLocaleString()}`);
    });

    // 3. Vérifier les variables d'environnement
    console.log('\n3️⃣ Variables d\'environnement:');
    console.log('   DATABASE_URL:', process.env.DATABASE_URL || '❌ Non définie');
    console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');

    // 4. Vérifier si l'éditeur utilise la même base
    console.log('\n4️⃣ Configuration Prisma:');
    const prismaSchemaPath = path.join(__dirname, '../prisma/schema.prisma');
    if (fs.existsSync(prismaSchemaPath)) {
      const schema = fs.readFileSync(prismaSchemaPath, 'utf8');
      const dbMatch = schema.match(/url\s*=\s*env\("DATABASE_URL"\)/);
      const providerMatch = schema.match(/provider\s*=\s*"(\w+)"/);
      console.log('   Provider:', providerMatch?.[1] || '❓');
      console.log('   URL:', dbMatch ? 'env("DATABASE_URL")' : '❓');
    }

    // 5. Vérifier les processus Next.js
    console.log('\n5️⃣ État du serveur:');
    try {
      const response = await fetch('http://localhost:3000/api/health');
      console.log('   ✅ Serveur répond sur le port 3000');
    } catch (e) {
      console.log('   ❌ Serveur ne répond pas sur le port 3000');
    }

    // 6. Créer un fichier de test pour vérifier la synchronisation
    console.log('\n6️⃣ Test de synchronisation:');
    const testId = `test-sync-${Date.now()}`;
    const testProject = await prisma.project.create({
      data: {
        name: `TEST SYNC ${new Date().toLocaleTimeString()}`,
        slug: testId,
        template: 'test',
        data: JSON.stringify({
          projectName: 'Test Sync',
          pages: [{
            id: 'home',
            name: 'Test',
            slug: '/',
            blocks: [{
              id: 'test-1',
              type: 'hero-centered',
              props: { title: 'TEST DE SYNCHRONISATION' }
            }]
          }]
        })
      }
    });
    console.log('   ✅ Projet test créé:', testProject.id);

    // 7. Suggestions
    console.log('\n💡 SOLUTIONS POSSIBLES:');
    console.log('1. Redémarrer le serveur Next.js (Ctrl+C puis npm run dev)');
    console.log('2. Vider le cache du navigateur (Ctrl+Shift+R)');
    console.log('3. Vérifier que DATABASE_URL pointe vers la bonne base');
    console.log('4. Exécuter: npx prisma db push');
    console.log('5. Vérifier les logs du serveur Next.js');

    // 8. Afficher le dernier projet avec blocs
    console.log('\n📋 Dernier projet avec blocs:');
    const projectWithBlocks = projects.find(p => {
      const data = JSON.parse(p.data);
      return data.pages?.[0]?.blocks?.length > 0;
    });

    if (projectWithBlocks) {
      console.log('   Nom:', projectWithBlocks.name);
      console.log('   Lien: http://localhost:3000/editor/' + projectWithBlocks.id);
      
      // Sauvegarder pour inspection
      fs.writeFileSync(
        'last-project-with-blocks.json',
        JSON.stringify(JSON.parse(projectWithBlocks.data), null, 2)
      );
      console.log('   ✅ Données sauvegardées dans: last-project-with-blocks.json');
    }

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

checkEditorSync();
#!/usr/bin/env node

const fetch = require('node-fetch');

async function testRenderDirectly() {
  console.log('🔍 Test de rendu direct des blocs...\n');

  // Test 1: Content Timeline
  console.log('1️⃣ Test content-ultra-modern avec timeline:');
  const timelineProps = {
    variant: 'glassmorphism',
    contentType: 'timeline',
    title: 'Notre Histoire',
    subtitle: 'Une progression constante',
    timeline: [
      { year: '2020', title: 'Création', description: 'Lancement' },
      { year: '2021', title: 'Croissance', description: '100 clients' }
    ]
    // Pas de content ici !
  };

  await testBlock('content-ultra-modern', timelineProps);

  // Test 2: Content Text-Image
  console.log('\n2️⃣ Test content-ultra-modern avec text-image:');
  const textImageProps = {
    variant: 'floating-cards',
    contentType: 'text-image',
    title: 'Pourquoi nous choisir ?',
    subtitle: 'Excellence et innovation',
    content: 'Nous offrons des services de qualité supérieure.', // String, pas array!
    features: [
      { text: '10 ans d\'expérience', icon: 'check' },
      { text: 'Équipe certifiée', icon: 'check' }
    ]
  };

  await testBlock('content-ultra-modern', textImageProps);

  // Test 3: Contact
  console.log('\n3️⃣ Test contact-ultra-modern:');
  const contactProps = {
    variant: 'split-modern',
    title: 'Contactez-nous',
    subtitle: 'Nous sommes à votre écoute',
    contactInfo: { // Objet direct
      phone: '01 23 45 67 89',
      email: 'contact@test.fr',
      address: '123 Rue de la Paix, 75001 Paris'
    },
    formFields: [ // Array direct
      { name: 'name', label: 'Nom', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true }
    ]
  };

  await testBlock('contact-ultra-modern', contactProps);
}

async function testBlock(blockType, props) {
  try {
    // Appeler l'API de test de rendu
    const response = await fetch('http://localhost:3000/api/test-render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blockType, props })
    });

    if (!response.ok) {
      console.log('❌ API non disponible, création de l\'endpoint...');
      return;
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Rendu réussi');
      console.log('   HTML length:', result.html?.length || 0);
      console.log('   Contient [object Object]:', result.html?.includes('[object Object]'));
      console.log('   Contient undefined:', result.html?.includes('undefined'));
      
      if (result.html?.includes('[object Object]')) {
        const matches = result.html.match(/(.{30})\[object Object\](.{30})/g);
        if (matches) {
          console.log('   ⚠️  Contextes [object Object]:');
          matches.forEach(m => console.log('     ', m));
        }
      }
      
      if (result.html?.includes('undefined')) {
        const matches = result.html.match(/(.{30})undefined(.{30})/g);
        if (matches) {
          console.log('   ⚠️  Contextes undefined:');
          matches.forEach(m => console.log('     ', m));
        }
      }
    } else {
      console.log('❌ Erreur:', result.error);
    }
  } catch (error) {
    console.log('❌ Erreur:', error.message);
  }
}

// Créer l'endpoint de test si nécessaire
async function createTestEndpoint() {
  const endpointCode = `import { NextRequest, NextResponse } from 'next/server';
import { getBlockRenderFunction } from '@/lib/blocks/block-registry';

export async function POST(request: NextRequest) {
  try {
    const { blockType, props } = await request.json();
    
    const renderFn = getBlockRenderFunction(blockType);
    if (!renderFn) {
      return NextResponse.json({
        success: false,
        error: 'Block type not found'
      });
    }
    
    const result = renderFn(props, []);
    
    return NextResponse.json({
      success: true,
      html: result.html || '',
      css: result.css || '',
      js: result.js || ''
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}`;

  const fs = require('fs').promises;
  const path = require('path');
  
  const dir = path.join(__dirname, '../app/api/test-render');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'route.ts'), endpointCode);
  console.log('✅ Endpoint de test créé');
}

// Vérifier si on doit créer l'endpoint
fetch('http://localhost:3000/api/test-render', { method: 'POST' })
  .then(res => {
    if (res.status === 404) {
      return createTestEndpoint().then(() => {
        console.log('⏳ Attendez 2 secondes pour que Next.js recharge...\n');
        setTimeout(testRenderDirectly, 2000);
      });
    } else {
      testRenderDirectly();
    }
  })
  .catch(() => {
    console.log('⚠️  Serveur non lancé. Lancez d\'abord: npm run dev');
  });
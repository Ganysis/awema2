#!/usr/bin/env node

/**
 * Script de vérification de la configuration
 */

console.log('🔍 Vérification de la configuration AWEMA...\n');

// Vérifier les variables d'environnement
require('dotenv').config({ path: '.env.local' });

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_KEY',
  'NETLIFY_AUTH_TOKEN'
];

let hasError = false;

console.log('📋 Variables d\'environnement :');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value.includes('XXXXXXXXXX') || value.includes('YOUR_')) {
    console.log(`❌ ${varName}: Non configuré`);
    hasError = true;
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  }
});

console.log('\n📦 Dépendances :');
try {
  const supabase = require('@supabase/supabase-js');
  console.log('✅ @supabase/supabase-js installé');
} catch (e) {
  console.log('❌ @supabase/supabase-js manquant');
  hasError = true;
}

try {
  const netlify = require('@netlify/api');
  console.log('✅ @netlify/api installé');
} catch (e) {
  console.log('❌ @netlify/api manquant');
  hasError = true;
}

if (hasError) {
  console.log('\n⚠️  Configuration incomplète. Veuillez :');
  console.log('1. Configurer le token Netlify dans .env.local');
  console.log('2. Installer les dépendances manquantes');
  process.exit(1);
} else {
  console.log('\n✅ Configuration OK ! Prêt pour le test de déploiement.');
  
  // Test de connexion Supabase
  console.log('\n🔄 Test de connexion Supabase...');
  const { createClient } = require('@supabase/supabase-js');
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  supabaseClient
    .from('sites')
    .select('count')
    .then(({ count, error }) => {
      if (error) {
        console.log('❌ Erreur Supabase:', error.message);
      } else {
        console.log('✅ Connexion Supabase OK');
      }
    });
}
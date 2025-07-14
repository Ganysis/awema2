const { createClient } = require('@supabase/supabase-js');

// Configuration directe
const supabaseUrl = 'https://cxtfgwhcmhhqtafuehzz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dGZnd2hjbWhocXRhZnVlaHp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjI3NDEzNCwiZXhwIjoyMDUxODUwMTM0fQ.zTJv3sxP8kCo0xt9bLKNrcnCPQWKCjfPT1lh5EtGNds';

console.log('🔍 Vérification des tables Supabase...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Vérifier table cms_sites
  console.log('Test table cms_sites:');
  try {
    const { data, error } = await supabase.from('cms_sites').select('*').limit(1);
    if (error) {
      console.log('❌ cms_sites:', error.message);
    } else {
      console.log('✅ cms_sites existe');
    }
  } catch (e) {
    console.log('❌ cms_sites:', e.message);
  }

  // Vérifier table sites
  console.log('\nTest table sites:');
  try {
    const { data, error } = await supabase.from('sites').select('*').limit(1);
    if (error) {
      console.log('❌ sites:', error.message);
    } else {
      console.log('✅ sites existe');
    }
  } catch (e) {
    console.log('❌ sites:', e.message);
  }

  // Vérifier cms_content
  console.log('\nTest table cms_content:');
  try {
    const { data, error } = await supabase.from('cms_content').select('*').limit(1);
    if (error) {
      console.log('❌ cms_content:', error.message);
    } else {
      console.log('✅ cms_content existe');
    }
  } catch (e) {
    console.log('❌ cms_content:', e.message);
  }

  // Vérifier content
  console.log('\nTest table content:');
  try {
    const { data, error } = await supabase.from('content').select('*').limit(1);
    if (error) {
      console.log('❌ content:', error.message);
    } else {
      console.log('✅ content existe');
    }
  } catch (e) {
    console.log('❌ content:', e.message);
  }

  // Vérifier cms_users
  console.log('\nTest table cms_users:');
  try {
    const { data, error } = await supabase.from('cms_users').select('*').limit(1);
    if (error) {
      console.log('❌ cms_users:', error.message);
    } else {
      console.log('✅ cms_users existe');
    }
  } catch (e) {
    console.log('❌ cms_users:', e.message);
  }
}

main().catch(console.error);
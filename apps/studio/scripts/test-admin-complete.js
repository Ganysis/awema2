#!/usr/bin/env node

/**
 * Test complet de l'interface admin et du processus de génération
 */

require('dotenv').config({ path: '.env.local' });

async function testAdminComplete() {
  console.log('🎯 Test complet du système admin/proposals\n');
  
  // 1. Récupérer les propositions
  console.log('1️⃣ Récupération des propositions...');
  const proposalsResponse = await fetch('http://localhost:3000/api/admin/template-proposals');
  
  if (!proposalsResponse.ok) {
    console.error('❌ Erreur récupération propositions');
    return;
  }
  
  const proposalsData = await proposalsResponse.json();
  console.log('✅ Propositions:', proposalsData.proposals.length);
  
  // Prendre la première proposition non analysée
  const pendingProposal = proposalsData.proposals.find(p => p.status === 'PENDING');
  
  if (!pendingProposal) {
    console.log('⚠️ Aucune proposition en attente');
    return;
  }
  
  console.log(`\n📋 Proposition sélectionnée: ${pendingProposal.client.companyName}`);
  console.log('- ID:', pendingProposal.id);
  console.log('- Client:', pendingProposal.client.name);
  console.log('- Business:', pendingProposal.formData.businessType);
  console.log('- Services:', pendingProposal.formData.services.length);
  
  // 2. Analyser avec DeepSeek
  console.log('\n2️⃣ Analyse avec DeepSeek...');
  console.time('Analyse');
  
  const analyzeResponse = await fetch(
    `/api/admin/template-proposals/${pendingProposal.id}/analyze`,
    { method: 'POST' }
  );
  
  console.timeEnd('Analyse');
  
  if (analyzeResponse.ok) {
    console.log('✅ Analyse terminée avec succès!');
    
    // 3. Récupérer la proposition mise à jour
    console.log('\n3️⃣ Récupération des résultats...');
    const updatedResponse = await fetch('http://localhost:3000/api/admin/template-proposals');
    const updatedData = await updatedResponse.json();
    
    const analyzed = updatedData.proposals.find(p => p.id === pendingProposal.id);
    
    if (analyzed && analyzed.option1) {
      console.log('\n✅ Templates générés:');
      console.log('\nOption 1:', analyzed.option1.templateName);
      console.log('- Score:', analyzed.option1.score);
      console.log('- Blocs:', analyzed.option1.blocks.length);
      
      if (analyzed.option2) {
        console.log('\nOption 2:', analyzed.option2.templateName);
        console.log('- Score:', analyzed.option2.score);
        console.log('- Blocs:', analyzed.option2.blocks.length);
      }
      
      if (analyzed.option3) {
        console.log('\nOption 3:', analyzed.option3.templateName);
        console.log('- Score:', analyzed.option3.score);
        console.log('- Blocs:', analyzed.option3.blocks.length);
      }
      
      // Afficher l'analyse IA
      if (analyzed.aiAnalysis) {
        console.log('\n🤖 Analyse IA:');
        console.log('- Priorités:', analyzed.aiAnalysis.priorities?.slice(0, 3).join(', '));
        console.log('- Points clés:', analyzed.aiAnalysis.keyPoints?.length || 0);
        console.log('- Recommandations template:');
        Object.entries(analyzed.aiAnalysis.templateRecommendations || {}).forEach(([k, v]) => {
          if (v > 50) console.log(`  ${k}: ${v}%`);
        });
      }
    }
  } else {
    console.error('❌ Erreur analyse:', analyzeResponse.status);
    const error = await analyzeResponse.text();
    console.error(error.substring(0, 200));
  }
  
  console.log('\n📌 Interface admin: http://localhost:3000/admin/proposals');
  console.log('💡 Vous pouvez maintenant personnaliser et envoyer les propositions!');
}

testAdminComplete().then(() => {
  console.log('\n✨ Test terminé!');
}).catch(error => {
  console.error('❌ Erreur:', error);
});
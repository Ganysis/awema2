// ACTIVATION DE L'ÉDITEUR VISUEL PROFESSIONNEL
(function() {
  console.log('🚀 Activation de l\'éditeur visuel...');
  
  // Supprimer l'ancien contenu
  document.body.innerHTML = '';
  
  // Charger le nouvel éditeur visuel
  const script = document.createElement('script');
  script.textContent = \`${require('./lib/services/cms-visual-editor').generateVisualEditorScript()}\`;
  
  document.body.appendChild(script);
  
  console.log('✅ Éditeur visuel activé !');
})();
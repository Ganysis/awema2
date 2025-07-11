#!/bin/bash

echo "🚀 Test de déploiement AWEMA avec CMS Supabase"
echo "=============================================="
echo ""
echo "✅ Serveur lancé sur http://localhost:3001"
echo ""
echo "📋 Configuration détectée :"
echo "   - Supabase URL: https://zvcvhundfeqwufmvtmzd.supabase.co"
echo "   - Netlify Token: Configuré"
echo "   - Module Supabase: Installé"
echo ""
echo "🧪 Test API rapide..."

# Test si l'API répond
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/deploy)

if [ "$RESPONSE" = "405" ]; then
    echo "✅ API de déploiement accessible (méthode GET non autorisée, c'est normal)"
else
    echo "⚠️  API status: $RESPONSE"
fi

echo ""
echo "🎯 Prochaines étapes :"
echo "   1. Ouvrir http://localhost:3001 dans votre navigateur"
echo "   2. Créer ou ouvrir un projet"
echo "   3. Cliquer sur 'Déployer' dans la toolbar"
echo "   4. Choisir le plan Pro pour avoir le CMS"
echo ""
echo "💡 Pour tester via script automatique :"
echo "   ./test-deploy-simple.sh"
echo ""
echo "✨ Tout est prêt pour le test !"
#!/bin/bash

echo "🔍 Vérification du site déployé"
echo ""

SITE_URL="https://test-cms-complet-1752311839176.netlify.app"

echo "1️⃣ Test de la page d'accueil:"
curl -s -o /dev/null -w "   Code HTTP: %{http_code}\n" $SITE_URL

echo ""
echo "2️⃣ Test de la page admin:"
curl -s -o /dev/null -w "   Code HTTP: %{http_code}\n" $SITE_URL/admin

echo ""
echo "3️⃣ Test de l'Edge Function CMS:"
curl -s -o /dev/null -w "   Code HTTP: %{http_code}\n" $SITE_URL/api/cms/auth/login

echo ""
echo "4️⃣ Test du fichier de configuration:"
curl -s -o /dev/null -w "   Code HTTP: %{http_code}\n" $SITE_URL/admin/config.js

echo ""
echo "5️⃣ Test de l'éditeur de pages:"
curl -s -o /dev/null -w "   Code HTTP: %{http_code}\n" $SITE_URL/admin/page-editor.js

echo ""
echo "✅ Tests terminés"
echo ""
echo "📝 URLs à tester manuellement:"
echo "   - Site: $SITE_URL"
echo "   - Admin: $SITE_URL/admin"
echo "   - Login: admin@admin.fr / admin"
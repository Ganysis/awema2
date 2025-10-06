#!/bin/bash

echo "🚀 Déploiement AWEMA sur Cloudflare Pages"
echo "=========================================="

# Build du site
echo "📦 Construction du site..."
npm run build

# Vérification du build
if [ ! -d "dist" ]; then
    echo "❌ Erreur : Le dossier dist n'existe pas"
    exit 1
fi

echo "✅ Build réussi !"
echo ""
echo "📤 Prochaines étapes pour déployer :"
echo "1. Allez sur https://dash.cloudflare.com"
echo "2. Créez un nouveau projet Pages"
echo "3. Connectez votre repo GitHub OU faites un upload direct du dossier 'dist'"
echo "4. Configuration build :"
echo "   - Build command: npm run build"
echo "   - Build output: dist"
echo "   - Root directory: awema-site"
echo ""
echo "5. Variables d'environnement à ajouter dans Cloudflare :"
echo "   - EMAIL_SERVER_HOST: smtp.o2switch.net"
echo "   - EMAIL_SERVER_PORT: 587"
echo "   - EMAIL_SERVER_USER: contact@awema.fr"
echo "   - EMAIL_SERVER_PASSWORD: !Vesper1!"
echo ""
echo "📌 URL finale : https://awema.pages.dev (puis custom domain awema.fr)"
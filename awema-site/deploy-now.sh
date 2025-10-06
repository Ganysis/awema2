#!/bin/bash

echo "🚀 DÉPLOIEMENT AWEMA SUR CLOUDFLARE PAGES"
echo "=========================================="
echo ""
echo "⚠️  PRÉREQUIS :"
echo "1. Avoir un compte Cloudflare"
echo "2. Avoir créé un API Token"
echo ""
echo "📝 Pour créer un API Token :"
echo "1. Allez sur https://dash.cloudflare.com/profile/api-tokens"
echo "2. Créez un token avec permissions 'Cloudflare Pages:Edit'"
echo ""
echo "----------------------------------------"
echo ""

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "❌ Le dossier dist n'existe pas. Build en cours..."
    npm run build
fi

# Login to Cloudflare
echo "📌 Connexion à Cloudflare..."
echo "Entrez votre API Token quand demandé"
echo ""

# Deploy to Cloudflare Pages
echo "📤 Déploiement en cours..."
npx wrangler pages deploy dist \
  --project-name=awema-site \
  --branch=main \
  --commit-message="Déploiement AWEMA Site"

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "📌 URLs de votre site :"
echo "- https://awema-site.pages.dev"
echo "- Custom domain à configurer dans Cloudflare Dashboard"
echo ""
echo "⚙️  Prochaines étapes :"
echo "1. Allez sur https://dash.cloudflare.com"
echo "2. Pages > awema-site > Custom domains"
echo "3. Ajoutez awema.fr"
echo "4. Configurez les variables d'environnement dans Settings"
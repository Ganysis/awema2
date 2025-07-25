#!/bin/bash
# Script de déploiement Netlify

echo "🚀 Déploiement des sites sur Netlify"
echo ""

# Vérifier que Netlify CLI est installé
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI n'est pas installé"
    echo "Installez-le avec : npm install -g netlify-cli"
    exit 1
fi

# Se connecter à Netlify
echo "🔐 Connexion à Netlify..."
netlify login

# Déployer chaque site

echo ""
echo "📦 Déploiement 1/5 : Plomberie Express Paris"
netlify deploy --dir=netlify-ready/plomberie-express-paris --prod
echo "✅ Déployé ! Notez l'URL fournie par Netlify"

echo ""
echo "📦 Déploiement 2/5 : Élec Pro Lyon"
netlify deploy --dir=netlify-ready/elec-pro-lyon --prod
echo "✅ Déployé ! Notez l'URL fournie par Netlify"

echo ""
echo "📦 Déploiement 3/5 : L'Atelier du Bois"
netlify deploy --dir=netlify-ready/atelier-du-bois --prod
echo "✅ Déployé ! Notez l'URL fournie par Netlify"

echo ""
echo "📦 Déploiement 4/5 : Couleurs Méditerranée"
netlify deploy --dir=netlify-ready/couleurs-mediterranee --prod
echo "✅ Déployé ! Notez l'URL fournie par Netlify"

echo ""
echo "📦 Déploiement 5/5 : Bâti Sud Construction"
netlify deploy --dir=netlify-ready/bati-sud-construction --prod
echo "✅ Déployé ! Notez l'URL fournie par Netlify"


echo ""
echo "✅ Tous les sites ont été déployés !"
echo "📝 Notez les URLs fournies par Netlify pour l'analyse"

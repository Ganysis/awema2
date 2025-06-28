#!/bin/bash

echo "🔄 Redémarrage du CMS en mode avancé..."

# Arrêter le serveur existant
echo "⏹️  Arrêt du serveur existant..."
pkill -f "node test-cms-local.js" 2>/dev/null || true

# Attendre un peu
sleep 1

# Nettoyer les fichiers temporaires
echo "🧹 Nettoyage..."
rm -f test-cms-export/cms-data.json 2>/dev/null || true

# Démarrer le serveur
echo "🚀 Démarrage du serveur CMS avancé..."
node test-cms-local.js
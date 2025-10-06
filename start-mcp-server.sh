#!/bin/bash

# Script pour démarrer le serveur MCP AWEMA

echo "🚀 Démarrage du serveur MCP AWEMA..."
echo ""

# Vérifier si le dossier MCP existe
if [ ! -d "awema-mcp-server" ]; then
    echo "❌ Le dossier awema-mcp-server n'existe pas!"
    echo "Veuillez d'abord installer le serveur MCP."
    exit 1
fi

cd awema-mcp-server

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier si le build existe
if [ ! -d "dist" ]; then
    echo "🔨 Compilation du serveur..."
    npm run build
fi

# Charger les variables d'environnement si le fichier existe
if [ -f "../apps/studio/.env.mcp" ]; then
    echo "📋 Chargement de la configuration depuis .env.mcp"
    export $(cat ../apps/studio/.env.mcp | grep -v '^#' | xargs)
fi

# Afficher la configuration
echo ""
echo "Configuration du serveur MCP:"
echo "  - Port: ${MCP_PORT:-3010}"
echo "  - Host: ${MCP_HOST:-localhost}"
echo "  - Screenshots: ${MCP_ENABLE_SCREENSHOT:-true}"
echo "  - Analyse IA: ${MCP_ENABLE_AI_GENERATION:-false}"
echo ""

# Démarrer le serveur
echo "✅ Serveur MCP démarré sur http://${MCP_HOST:-localhost}:${MCP_PORT:-3010}"
echo ""
echo "Pour tester le serveur, visitez:"
echo "http://localhost:3000/test-mcp-scanner"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

npm run dev
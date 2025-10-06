#!/bin/bash

# Script pour démarrer le pont HTTP du serveur MCP

echo "🚀 Démarrage du pont HTTP MCP AWEMA..."
echo ""

cd awema-mcp-server

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install express cors tsx typescript @types/node @types/express @types/cors
fi

# Démarrer le pont HTTP
echo "✅ Pont HTTP MCP démarré sur http://localhost:3010"
echo ""
echo "Pour tester le serveur, visitez:"
echo "http://localhost:3000/test-mcp-scanner"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

npx tsx watch src/http-bridge.ts
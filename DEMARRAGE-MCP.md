# 🚀 Guide de Démarrage Rapide - Serveur MCP AWEMA

## Option 1 : Sans serveur MCP (Mode démo automatique) ✅

Le système fonctionne **automatiquement** même sans serveur MCP ! 

1. **Démarrer Next.js** :
   ```bash
   npm run dev
   ```

2. **Utiliser le scanner** :
   - Aller sur http://localhost:3000/test-mcp-scanner
   - Scanner n'importe quelle URL
   - Les données de démo seront utilisées automatiquement

## Option 2 : Avec le vrai serveur MCP (Analyse avancée) 🔥

Pour une analyse réelle des sites web avec Puppeteer :

### Terminal 1 - Serveur MCP
```bash
cd awema-mcp-server
npm install
npx tsx watch src/http-bridge.ts
```

### Terminal 2 - Next.js
```bash
npm run dev
```

## 📊 Différences entre les modes

### Mode Démo (sans serveur)
- ✅ Fonctionne immédiatement
- ✅ Pas d'installation supplémentaire
- ✅ Génère des blocs adaptés selon l'URL
- ❌ Pas de screenshot réel
- ❌ Pas d'analyse du contenu réel

### Mode MCP (avec serveur)
- ✅ Screenshot réel avec Puppeteer
- ✅ Extraction des couleurs de la page
- ✅ Analyse de la structure DOM
- ✅ Détection des sections réelles
- ✅ Contenu extrait du site
- ❌ Nécessite Node.js 18+ et dépendances

## 🎯 URLs de test recommandées

- https://play.divi.express/construction-17/
- https://play.divi.express/industrial-7/
- https://www.plombier-lyon.fr
- https://www.electricien-paris.com

## 🐛 Dépannage

### "connect ECONNREFUSED 127.0.0.1:3010"
C'est normal ! Le mode démo prend automatiquement le relais.

### Installation du serveur MCP échoue
Vérifiez que vous avez :
- Node.js 18 ou supérieur
- npm ou pnpm installé
- Les droits d'écriture dans le dossier

### Le scanner ne génère pas de blocs
Vérifiez dans la console du navigateur (F12) s'il y a des erreurs.

## 💡 Le saviez-vous ?

Le mode démo est intelligent ! Il détecte le type d'artisan dans l'URL :
- URL avec "electr" → Blocs pour électricien (couleur bleue)
- URL avec "plomb" → Blocs pour plombier (couleur orange)
- URL avec "chauff" → Blocs pour chauffagiste (couleur rouge)
- URL avec "serru" → Blocs pour serrurier (couleur grise)
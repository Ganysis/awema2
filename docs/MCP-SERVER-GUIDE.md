# Guide du Serveur MCP AWEMA

Le serveur MCP (Model Context Protocol) permet d'analyser des sites web existants et de générer automatiquement des blocs V3 pour l'éditeur AWEMA.

## 🚀 Installation

1. **Prérequis**
   - Node.js 18+
   - npm ou pnpm

2. **Installation du serveur**
   ```bash
   cd awema-mcp-server
   npm install
   ```

3. **Configuration**
   ```bash
   # Copier le fichier de configuration
   cp apps/studio/.env.mcp.example apps/studio/.env.mcp
   
   # Éditer le fichier pour ajouter vos clés API (optionnel)
   nano apps/studio/.env.mcp
   ```

## 🔧 Démarrage

### Méthode simple (recommandée)
```bash
./start-mcp-server.sh
```

### Méthode manuelle
```bash
cd awema-mcp-server
npm run dev
```

Le serveur démarre sur `http://localhost:3010`

## 🎯 Utilisation

### 1. Interface de test
Visitez `http://localhost:3000/test-mcp-scanner` pour utiliser l'interface graphique.

### 2. API directe
```bash
curl -X POST http://localhost:3010/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://exemple-artisan.com",
    "options": {
      "screenshot": true,
      "extractColors": true,
      "analyzeLayout": true,
      "generateBlocks": true
    }
  }'
```

## 📊 Fonctionnalités

### Analyse visuelle
- **Extraction des couleurs** : Palette principale, secondaire et accent
- **Détection de la typographie** : Polices utilisées
- **Capture d'écran** : Screenshot de la page

### Analyse structurelle
- **Détection des sections** : Hero, services, témoignages, etc.
- **Identification du contenu** : Textes, images, CTA
- **Analyse de la mise en page** : Grilles, colonnes, espacements

### Génération de blocs
- **Blocs V3 compatibles** : hero-artisan, services-artisan, etc.
- **Variantes automatiques** : Sélection basée sur l'analyse
- **Contenu pré-rempli** : Textes et images extraits

## 🔍 Exemples de sites analysables

### Sites Divi Express
- https://play.divi.express/construction-17/
- https://play.divi.express/industrial-7/
- https://play.divi.express/industrial-5/

### Sites artisans réels
- Sites de plombiers
- Sites d'électriciens
- Sites de chauffagistes
- Sites de menuisiers

## 🛠️ Dépannage

### Le serveur ne démarre pas
```bash
# Vérifier les logs
cd awema-mcp-server
npm run dev
```

### Erreur de connexion
- Vérifier que le port 3010 est libre
- Vérifier le firewall

### Pas de résultats d'analyse
- Vérifier que le site est accessible publiquement
- Certains sites bloquent les robots

## 🤖 IA et génération de contenu

Si vous avez configuré une clé API (Claude ou OpenAI), le serveur peut :
- Générer du contenu optimisé SEO
- Créer des variantes de textes
- Suggérer des améliorations

Sans clé API, le serveur utilise :
- Analyse structurelle basique
- Templates de contenu prédéfinis
- Extraction directe du contenu existant

## 📝 Format de réponse

```json
{
  "success": true,
  "data": {
    "url": "https://site-analysé.com",
    "timestamp": "2025-01-16T10:00:00Z",
    "analysis": {
      "style": {
        "primaryColor": "#ff6900",
        "secondaryColor": "#1a1a1a",
        "font": "Montserrat",
        "theme": "artisan-moderne"
      },
      "blocks": [
        {
          "id": "hero-123",
          "type": "hero-artisan",
          "data": {
            "variant": "construction-urgency",
            "title": "Plombier Lyon 24/7",
            "subtitle": "Intervention rapide",
            "phone": "06 12 34 56 78"
          }
        }
      ]
    },
    "recommendations": [
      {
        "type": "performance",
        "priority": "haute",
        "suggestion": "Optimiser les images"
      }
    ]
  }
}
```

## 🚀 Workflow complet

1. **Scanner un site** : Analyser l'URL cible
2. **Examiner les résultats** : Vérifier les blocs détectés
3. **Générer les blocs** : Créer automatiquement dans l'éditeur
4. **Personnaliser** : Ajuster dans l'éditeur V3
5. **Exporter** : Générer le site final

## 🔐 Sécurité

- Les analyses sont effectuées côté serveur
- Aucune donnée personnelle n'est stockée
- Cache temporaire de 1 heure maximum
- Les clés API restent côté serveur
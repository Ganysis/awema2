# AWEMA MCP Visual Design Server

Un serveur MCP (Model Context Protocol) pour analyser des designs web et générer automatiquement des blocs V3 pour AWEMA Studio.

## 🚀 Installation

```bash
cd awema-mcp-server
npm install
npm run build
```

## 📋 Configuration

1. **Variables d'environnement** (`.env`):
```env
ANTHROPIC_API_KEY=your-api-key-here
PREVIEW_PORT=3005
```

2. **Configuration Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "awema-visual-design": {
      "command": "node",
      "args": ["/path/to/awema-mcp-server/dist/server.js"],
      "env": {
        "ANTHROPIC_API_KEY": "your-api-key"
      }
    }
  }
}
```

## 🛠️ Utilisation

### 1. Analyser un site web

```typescript
// Dans Claude avec MCP
const analysis = await use_mcp_tool("awema-visual-design", "analyze_website", {
  url: "https://stripe.com",
  elements: ["hero", "features", "pricing"],
  extractColors: true,
  extractFonts: true
});
```

### 2. Analyser une image de design

```typescript
const analysis = await use_mcp_tool("awema-visual-design", "analyze_design_image", {
  imagePath: "/path/to/design.png",
  blockType: "hero",
  style: "corporate"
});
```

### 3. Générer un bloc V3

```typescript
const block = await use_mcp_tool("awema-visual-design", "generate_v3_block", {
  reference: analysis,
  blockType: "hero",
  variant: "split-content",
  customizations: {
    colors: {
      primary: "#2563eb",
      secondary: "#64748b"
    }
  }
});
```

### 4. Prévisualiser le bloc

```typescript
const preview = await use_mcp_tool("awema-visual-design", "preview_block", {
  blockCode: block.code,
  data: {
    title: "Excellence & Innovation",
    subtitle: "Solutions professionnelles"
  },
  format: "url"
});
// Retourne: http://localhost:3005/preview/abc123
```

### 5. Itérer sur le design

```typescript
const improved = await use_mcp_tool("awema-visual-design", "iterate_design", {
  currentBlock: block.code,
  feedback: "Rendre plus moderne avec des gradients subtils et plus d'espace",
  aspects: ["colors", "spacing"]
});
```

## 📚 Exemples de Workflows

### Workflow 1: Créer un Hero depuis Stripe

```
User: "Crée un hero similaire à celui de Stripe"

1. MCP analyse stripe.com
2. Extrait: couleurs (#0A2540, #635BFF), layout split, style corporate
3. Génère un bloc hero-corporate avec ces caractéristiques
4. Preview du résultat
5. Itération: "Plus d'espace et gradient plus subtil"
6. Bloc final prêt à l'emploi
```

### Workflow 2: Reproduire un Design depuis Image

```
User: "Voici une maquette, crée les blocs correspondants"

1. MCP analyse l'image uploadée
2. Détecte: hero + services + features
3. Génère chaque bloc avec le bon style
4. Assemble une page complète
5. Export vers AWEMA Studio
```

## 🔧 Architecture Technique

```
awema-mcp-server/
├── src/
│   ├── server.ts              # Serveur MCP principal
│   ├── tools/                 # Outils MCP
│   │   ├── analyze-url.ts     # Analyse de sites
│   │   ├── analyze-image.ts   # Analyse d'images
│   │   ├── generate-block.ts  # Génération V3
│   │   ├── preview-block.ts   # Preview
│   │   └── iterate-design.ts  # Itération
│   ├── services/             
│   │   ├── vision-api.ts      # Claude Vision API
│   │   ├── color-extractor.ts # Extraction couleurs
│   │   ├── screenshot.ts      # Puppeteer
│   │   ├── preview-server.ts  # Serveur preview
│   │   └── block-mapper.ts    # Mapping vers V3
│   └── renderers/            
│       └── corporate/         # Renderers V3
└── dist/                      # Build
```

## 🎯 Fonctionnalités

- ✅ Analyse de sites web avec Puppeteer
- ✅ Analyse d'images avec Claude Vision
- ✅ Extraction automatique de palettes de couleurs
- ✅ Détection de typographie et layouts
- ✅ Génération de blocs V3 adaptés
- ✅ Preview en temps réel
- ✅ Itération basée sur feedback naturel
- ✅ Support des styles: corporate, modern, creative
- ✅ Cache intelligent des analyses

## 🚧 Roadmap

- [ ] Support GPT-4 Vision comme alternative
- [ ] Analyse de fichiers Figma
- [ ] Export direct vers AWEMA Studio
- [ ] Génération de pages complètes
- [ ] Templates de workflows prédéfinis
- [ ] Interface web de configuration

## 📖 Documentation API

Voir [MCP-VISUAL-DESIGN-SERVER.md](../docs/MCP-VISUAL-DESIGN-SERVER.md) pour la documentation complète.
# Plan Serveur MCP pour Visualisation et Design de Sites

## 🎯 Objectifs

Créer un serveur MCP qui permet de :
1. **Analyser des images/liens** de sites web pour extraire les éléments de design
2. **Générer des blocs V3** basés sur ces références visuelles
3. **Itérer rapidement** sur les designs jusqu'à satisfaction
4. **Visualiser en temps réel** les modifications

## 🏗️ Architecture Proposée

### 1. Serveur MCP Core
```
awema-mcp-server/
├── src/
│   ├── server.ts              # Point d'entrée MCP
│   ├── tools/
│   │   ├── analyze-url.ts     # Analyse de sites web
│   │   ├── analyze-image.ts   # Analyse d'images de design
│   │   ├── generate-block.ts  # Génération de blocs V3
│   │   ├── preview-block.ts   # Preview en temps réel
│   │   └── iterate-design.ts  # Itération sur les designs
│   ├── services/
│   │   ├── vision-api.ts      # Intégration API de vision (Claude/GPT-4V)
│   │   ├── screenshot.ts      # Capture d'écran de sites
│   │   ├── design-parser.ts   # Extraction d'éléments de design
│   │   └── block-generator.ts # Génération de code pour blocs V3
│   └── types/
│       └── mcp-types.ts       # Types TypeScript pour MCP
├── package.json
└── mcp.json                   # Configuration MCP
```

### 2. Outils MCP Disponibles

#### Tool: `analyze_website`
```typescript
{
  name: "analyze_website",
  description: "Analyse un site web et extrait les éléments de design",
  parameters: {
    url: string,
    elements?: ["header", "hero", "services", "gallery", ...],
    extractColors?: boolean,
    extractFonts?: boolean,
    extractLayouts?: boolean
  }
}
```

#### Tool: `analyze_design_image`
```typescript
{
  name: "analyze_design_image",
  description: "Analyse une image de design et extrait les patterns",
  parameters: {
    imagePath: string,
    blockType?: string, // "hero", "services", etc.
    style?: "corporate" | "modern" | "creative"
  }
}
```

#### Tool: `generate_v3_block`
```typescript
{
  name: "generate_v3_block",
  description: "Génère un bloc V3 basé sur une référence visuelle",
  parameters: {
    reference: string | AnalysisResult,
    blockType: string,
    variant: string,
    customizations?: {
      colors?: ColorPalette,
      fonts?: FontStack,
      spacing?: SpacingSystem
    }
  }
}
```

#### Tool: `preview_block`
```typescript
{
  name: "preview_block",
  description: "Affiche un preview du bloc généré",
  parameters: {
    blockCode: string,
    data: BlockData,
    format: "html" | "screenshot" | "url"
  }
}
```

#### Tool: `iterate_design`
```typescript
{
  name: "iterate_design",
  description: "Modifie un design existant basé sur feedback",
  parameters: {
    currentBlock: string,
    feedback: string,
    aspects?: ["colors", "layout", "typography", "spacing"]
  }
}
```

## 🔧 Implémentation Technique

### Phase 1 : Setup de Base (2 jours)
1. **Créer la structure MCP**
   - Initialiser le projet avec TypeScript
   - Configurer le protocole MCP
   - Setup des outils de base

2. **Intégration Vision API**
   - Claude Vision API pour analyse d'images
   - Puppeteer pour screenshots de sites
   - Extraction de palettes de couleurs

### Phase 2 : Analyse Visuelle (3 jours)
1. **Parser de Design**
   ```typescript
   class DesignParser {
     async analyzeWebsite(url: string): Promise<DesignAnalysis> {
       // 1. Screenshot avec Puppeteer
       const screenshot = await this.captureScreenshot(url);
       
       // 2. Analyse avec Vision API
       const analysis = await this.visionAPI.analyze(screenshot, {
         extractColors: true,
         extractLayout: true,
         extractComponents: true
       });
       
       // 3. Mapper vers nos blocs V3
       return this.mapToV3Blocks(analysis);
     }
   }
   ```

2. **Extraction d'Éléments**
   - Détection automatique des sections (header, hero, etc.)
   - Extraction des couleurs dominantes
   - Analyse de la typographie
   - Reconnaissance des patterns de layout

### Phase 3 : Génération de Blocs (3 jours)
1. **Générateur Intelligent**
   ```typescript
   class BlockGenerator {
     async generateFromReference(
       reference: DesignAnalysis,
       blockType: string
     ): Promise<V3Block> {
       // 1. Sélectionner la variante la plus proche
       const variant = this.findBestVariant(reference, blockType);
       
       // 2. Adapter les styles
       const styles = this.adaptStyles(reference.styles);
       
       // 3. Générer le code
       return this.generateBlockCode(variant, styles);
     }
   }
   ```

2. **Système de Templates**
   - Templates pour chaque type de bloc
   - Variables CSS dynamiques
   - Adaptation automatique des couleurs/fonts

### Phase 4 : Interface d'Itération (2 jours)
1. **Preview en Temps Réel**
   - Serveur de preview local
   - Hot reload des modifications
   - Comparaison avant/après

2. **Système de Feedback**
   ```typescript
   class DesignIterator {
     async iterate(
       currentDesign: V3Block,
       feedback: string
     ): Promise<V3Block> {
       // 1. Analyser le feedback avec IA
       const changes = await this.analyzeFeedback(feedback);
       
       // 2. Appliquer les modifications
       const newDesign = this.applyChanges(currentDesign, changes);
       
       // 3. Valider le résultat
       return this.validateDesign(newDesign);
     }
   }
   ```

## 📋 Workflow Utilisateur

1. **Input Initial**
   ```bash
   # Depuis Claude avec MCP
   "Analyse ce site et crée un hero similaire : https://example.com"
   # ou
   "Crée un bloc services basé sur cette image : design.png"
   ```

2. **Analyse & Génération**
   - MCP analyse la référence visuelle
   - Extrait les éléments clés (couleurs, layout, style)
   - Génère un bloc V3 correspondant

3. **Preview & Itération**
   ```bash
   "Montre-moi le résultat"
   "Rends-le plus corporate avec des tons bleus"
   "Ajoute plus d'espace entre les éléments"
   ```

4. **Finalisation**
   - Export du code final
   - Intégration dans AWEMA Studio
   - Documentation des propriétés

## 🚀 Avantages du Système

1. **Rapidité** : Création de blocs en quelques secondes depuis une référence
2. **Précision** : Analyse IA des éléments de design
3. **Flexibilité** : Itération rapide basée sur feedback naturel
4. **Intégration** : Direct dans le workflow AWEMA Studio

## 🛠️ Technologies Requises

- **MCP SDK** : Pour créer le serveur
- **Puppeteer** : Screenshots de sites web
- **Sharp/Jimp** : Manipulation d'images
- **Claude/GPT-4 Vision** : Analyse visuelle
- **Express** : Serveur de preview
- **WebSocket** : Updates en temps réel

## 📅 Planning d'Implémentation

### Semaine 1
- [ ] Setup projet MCP
- [ ] Outils d'analyse de base
- [ ] Intégration Vision API

### Semaine 2
- [ ] Générateur de blocs V3
- [ ] Système de preview
- [ ] Interface d'itération

### Semaine 3
- [ ] Tests et optimisations
- [ ] Documentation
- [ ] Intégration AWEMA Studio

## 🔍 Exemple d'Utilisation

```typescript
// Dans Claude avec MCP activé
const result = await mcp.analyze_website({
  url: "https://stripe.com",
  elements: ["hero", "features"],
  extractColors: true
});

const heroBlock = await mcp.generate_v3_block({
  reference: result.hero,
  blockType: "hero",
  variant: "corporate",
  customizations: {
    colors: {
      primary: "#0A2540",
      secondary: "#635BFF"
    }
  }
});

const preview = await mcp.preview_block({
  blockCode: heroBlock.code,
  data: heroBlock.defaultData,
  format: "url"
});

// Itération basée sur feedback
const improved = await mcp.iterate_design({
  currentBlock: heroBlock.code,
  feedback: "Plus moderne avec des gradients subtils",
  aspects: ["colors", "layout"]
});
```

## 🎯 Résultat Attendu

Un système MCP qui permet de :
- Créer des blocs V3 professionnels en quelques secondes
- S'inspirer de n'importe quel site ou design
- Itérer rapidement avec du langage naturel
- Maintenir la cohérence avec le système AWEMA existant
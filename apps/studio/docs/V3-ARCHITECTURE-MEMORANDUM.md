# 📋 MÉMORANDUM ARCHITECTURE V3 - AWEMA STUDIO

## 🎯 CONTEXTE ET PROBLÈME INITIAL

### Problèmes V2 qui ont motivé V3:
1. **[object Object]** apparaissant dans les exports
2. **undefined** partout dans le HTML généré
3. **CSS manquant** dans l'éditeur
4. **Exports incomplets** (footer manquant, boutons invisibles, maps non chargées)
5. **Fragilité générale** - le moindre problème fait crasher tout l'export

### Décision du 12/01/2025:
L'utilisateur a demandé une refonte complète V3 "ultra puissante" pour résoudre définitivement tous ces problèmes.

## 🏗️ ARCHITECTURE V3 - CONCEPTS FONDAMENTAUX

### 1. **Principe Directeur: JAMAIS D'ÉCHEC**
- Rendu déterministe : toujours retourner quelque chose
- Fallbacks à chaque niveau
- Validation stricte avec Zod
- Gestion d'erreur robuste

### 2. **Structure des Données V3**

```typescript
// Chaque bloc a cette structure
interface BlockData<T = any> {
  meta: {
    id: string;
    type: string;
    version: string;
    created: Date;
    modified: Date;
    validationStatus: 'valid' | 'invalid' | 'partial';
  };
  data: T; // Données validées par Zod
  cache?: {
    html?: string;
    css?: string;
    js?: string;
    generatedAt?: Date;
  };
}

// Résultat de rendu TOUJOURS retourné
interface RenderResult {
  html: string;      // Jamais vide
  css: string;       // Jamais undefined
  js: string;        // Peut être vide mais jamais undefined
  assets: Asset[];   // Liste des assets utilisés
  errors: RenderError[];    // Erreurs capturées
  warnings: string[];       // Avertissements
  performance: {
    renderTime: number;
    cssSize: number;
    jsSize: number;
  };
}
```

### 3. **Validation Zod Obligatoire**

Chaque bloc a son schéma Zod:
```typescript
const heroDataSchema = z.object({
  variant: z.enum(['glassmorphism', 'gradient-wave', ...]).default('gradient-wave'),
  title: z.string().min(1, 'Le titre est requis'),
  subtitle: z.string().optional(),
  // ... validation complète
});
```

### 4. **Render Engine V3**

```typescript
class RenderEngineV3 {
  // Toujours valider avant de rendre
  async renderBlock(block: BlockData): Promise<RenderResult> {
    // 1. Vérifier le cache
    // 2. Valider les données
    // 3. Rendre avec le bon renderer
    // 4. Gérer les erreurs avec fallback
    // 5. Toujours retourner un RenderResult valide
  }
}
```

### 5. **Renderers V3**

Chaque renderer implémente:
```typescript
interface BlockRenderer<T> {
  validate(data: unknown): z.SafeParseReturnType<T, T>;
  getDefaultData(): T;
  getDefaultCSS(): string;
  render(data: T, context?: RenderContext): RenderResult;
  renderPreview(data: T): string;
}
```

## 📁 STRUCTURE DES FICHIERS V3

```
/lib/v3/
├── types/              # Types TypeScript
│   └── index.ts       # BlockData, RenderResult, etc.
├── schemas/           # Validation Zod
│   ├── common.ts      # Schémas partagés (button, color, etc.)
│   └── blocks/        # Un schéma par bloc
│       ├── hero.ts
│       ├── contact.ts
│       └── ...
├── core/              # Moteur principal
│   └── render-engine.ts
├── renderers/         # Un renderer par bloc
│   ├── hero.renderer.ts
│   ├── contact.renderer.ts
│   └── ...
├── services/          # Services
│   └── export.service.ts
└── index.ts          # Point d'entrée
```

## ✅ ÉTAT D'AVANCEMENT (12/01/2025)

### Complété:
1. ✅ Types et interfaces (`/lib/v3/types/index.ts`)
2. ✅ Schémas communs (`/lib/v3/schemas/common.ts`)
3. ✅ Schéma Hero (`/lib/v3/schemas/blocks/hero.ts`)
4. ✅ Schéma Contact (`/lib/v3/schemas/blocks/contact.ts`)
5. ✅ Render Engine (`/lib/v3/core/render-engine.ts`)
6. ✅ Hero Renderer (`/lib/v3/renderers/hero.renderer.ts`)
7. ✅ Contact Renderer (`/lib/v3/renderers/contact.renderer.ts`)
8. ✅ Export Service (`/lib/v3/services/export.service.ts`)
9. ✅ Test Contact fonctionnel

### À faire:
1. ⏳ Tous les autres renderers (Header, Footer, Features, etc.)
2. ⏳ Adaptateur V2 → V3
3. ⏳ Intégration dans l'éditeur
4. ⏳ Migration complète de l'export
5. ⏳ Interface de création/édition V3

## 🔧 COMMENT CRÉER UN NOUVEAU RENDERER V3

1. **Créer le schéma** dans `/lib/v3/schemas/blocks/[nom].ts`:
```typescript
export const nomDataSchema = z.object({
  // Définir TOUS les champs avec validation
  variant: z.enum([...]).default('default'),
  title: z.string().min(1),
  // ...
});

export const nomDefaults: NomData = {
  // Valeurs par défaut complètes
};
```

2. **Créer le renderer** dans `/lib/v3/renderers/[nom].renderer.ts`:
```typescript
export class NomRendererV3 implements BlockRenderer<NomData> {
  type = 'nom-block-type';
  version = '3.0.0';
  
  validate(data) { return nomDataSchema.safeParse(data); }
  getDefaultData() { return nomDefaults; }
  getDefaultCSS() { return '/* CSS de base */'; }
  
  render(data, context) {
    try {
      // Générer HTML, CSS, JS
      return {
        html: this.generateHTML(data),
        css: this.getDefaultCSS() + this.generateCSS(data),
        js: this.generateJS(data),
        // ... reste du RenderResult
      };
    } catch (error) {
      // TOUJOURS retourner un fallback
      return this.getFallbackResult(error);
    }
  }
}
```

3. **Enregistrer dans le RenderEngine**:
```typescript
const engine = new RenderEngineV3();
engine.registerRenderer('nom-block-type', new NomRendererV3(), nomDataSchema);
```

## 🚀 PLATEFORME V3 COMPLÈTE - VISION

### 1. **Éditeur V3**
- Interface de création de blocs avec validation en temps réel
- Preview instantané avec le vrai rendu V3
- Détection automatique des erreurs
- Suggestions intelligentes

### 2. **Export V3**
- Support multi-formats (static, Next.js, Gatsby, Nuxt)
- Optimisation automatique (minification, critical CSS, etc.)
- Rapport de performance détaillé
- Zéro erreur garantie

### 3. **CMS V3**
- Interface d'édition basée sur les schémas Zod
- Validation côté client ET serveur
- Historique des versions avec diff
- Preview en temps réel

### 4. **API V3**
```typescript
// API simple et robuste
const v3 = createV3System();

// Rendre un bloc
const result = await v3.renderBlock(blockData);

// Exporter un projet
const export = await v3.exportProject(project, {
  format: 'static',
  optimization: { minifyHTML: true, ... },
  features: { cms: true, analytics: true, ... }
});
```

## 💡 RÈGLES D'OR V3

1. **JAMAIS de undefined** - Toujours des valeurs par défaut
2. **JAMAIS de [object Object]** - Toujours échapper/serializer correctement
3. **JAMAIS de crash** - Toujours un fallback
4. **TOUJOURS valider** - Zod à chaque transformation
5. **TOUJOURS mesurer** - Performance tracking intégré
6. **TOUJOURS documenter** - Types stricts + JSDoc

## 🎯 OBJECTIF FINAL

Une plateforme où:
- Les exports sont **PARFAITS** à chaque fois
- Les erreurs sont **IMPOSSIBLES** (gérées automatiquement)
- La performance est **OPTIMALE** (cache + optimisations)
- L'expérience développeur est **EXCELLENTE** (types, validation, docs)
- L'utilisateur final a un site **ULTRA RAPIDE** et **SANS BUGS**

---

**Ce document est la référence absolue pour V3. En cas de doute, s'y référer.**
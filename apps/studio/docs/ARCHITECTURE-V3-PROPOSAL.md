# Architecture AWEMA Studio V3 - Proposition

## Vision
Un éditeur ultra-puissant qui génère des sites parfaits techniquement, avec un export robuste et un CMS professionnel.

## Principes Fondamentaux

### 1. SÉPARATION CLAIRE DES RESPONSABILITÉS

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│  EDITOR CORE    │────▶│  DATA LAYER      │────▶│  RENDER ENGINE  │
│  (React/Next)   │     │  (JSON Schema)   │     │  (Pure Functions)│
│                 │     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                         │
         │                       │                         │
         ▼                       ▼                         ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  PREVIEW        │     │  VALIDATION      │     │  EXPORT         │
│  (Live/Iframe)  │     │  (Zod/TypeScript)│     │  (HTML/CSS/JS)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### 2. DATA LAYER ROBUSTE

Au lieu de passer des props complexes, utiliser un **schéma de données strict** :

```typescript
// Schéma de bloc universel
interface BlockData {
  id: string;
  type: string;
  version: string;
  data: BlockDataType; // Typé selon le type de bloc
  meta: {
    created: Date;
    modified: Date;
    validation: ValidationResult;
  };
}

// Exemple pour content-ultra-modern
interface ContentBlockData {
  variant: 'glassmorphism' | 'gradient-wave' | etc;
  contentType: 'timeline' | 'text-image' | etc;
  
  // Données communes
  common: {
    title?: string;
    subtitle?: string;
    eyebrow?: string;
  };
  
  // Données spécifiques au contentType
  specific: TimelineData | TextImageData | etc;
}

// Validation automatique
const contentSchema = z.object({
  variant: z.enum(['glassmorphism', 'gradient-wave']),
  contentType: z.enum(['timeline', 'text-image']),
  common: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
  }),
  specific: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('timeline'),
      items: z.array(timelineItemSchema)
    }),
    z.object({
      type: z.literal('text-image'),
      content: z.string(),
      image: z.string().optional()
    })
  ])
});
```

### 3. RENDER ENGINE DÉTERMINISTE

Un moteur de rendu **pur** et **prédictible** :

```typescript
// Render engine V3
export class RenderEngineV3 {
  private renderers: Map<string, BlockRenderer>;
  private validators: Map<string, ZodSchema>;
  
  async renderBlock(block: BlockData): Promise<RenderResult> {
    // 1. Validation
    const validator = this.validators.get(block.type);
    const validation = validator.safeParse(block.data);
    
    if (!validation.success) {
      return this.renderError(block, validation.error);
    }
    
    // 2. Rendu
    const renderer = this.renderers.get(block.type);
    if (!renderer) {
      return this.renderFallback(block);
    }
    
    // 3. Résultat garanti
    return renderer.render(validation.data);
  }
  
  // Chaque renderer retourne TOUJOURS un résultat valide
  registerRenderer(type: string, renderer: BlockRenderer) {
    this.renderers.set(type, renderer);
  }
}

// Interface stricte pour les renderers
interface BlockRenderer {
  render(data: any): RenderResult;
  getDefaultCSS(): string;
  getRequiredAssets(): Asset[];
}

interface RenderResult {
  html: string;
  css: string;
  js: string;
  assets: Asset[];
  errors: RenderError[];
}
```

### 4. EXPORT ROBUSTE

Export en 3 phases avec validation à chaque étape :

```typescript
export class ExportServiceV3 {
  async export(project: Project): Promise<ExportResult> {
    // Phase 1: Collecte et validation
    const blocks = await this.collectBlocks(project);
    const validated = await this.validateAll(blocks);
    
    // Phase 2: Rendu
    const rendered = await this.renderAll(validated);
    
    // Phase 3: Optimisation et packaging
    const optimized = await this.optimize(rendered);
    
    return {
      files: this.package(optimized),
      report: this.generateReport(validated, rendered)
    };
  }
  
  private async validateAll(blocks: BlockData[]): Promise<ValidatedBlock[]> {
    return Promise.all(
      blocks.map(async block => {
        const schema = this.schemas.get(block.type);
        const result = await schema.safeParseAsync(block.data);
        
        return {
          ...block,
          validation: result,
          sanitized: result.success ? result.data : this.getDefaults(block.type)
        };
      })
    );
  }
}
```

### 5. CMS ARCHITECTURE

CMS découplé avec API claire :

```typescript
// CMS API Contract
interface CMSAdapter {
  // Read
  getContent(pageId: string): Promise<PageContent>;
  getBlock(blockId: string): Promise<BlockData>;
  
  // Write
  updateContent(pageId: string, content: PageContent): Promise<void>;
  updateBlock(blockId: string, data: BlockData): Promise<void>;
  
  // Media
  uploadMedia(file: File): Promise<MediaAsset>;
  getMedia(): Promise<MediaAsset[]>;
}

// Implémentations
class SupabaseCMSAdapter implements CMSAdapter { }
class LocalStorageCMSAdapter implements CMSAdapter { }
class NetlifyCMSAdapter implements CMSAdapter { }
```

## PLAN DE MIGRATION

### Phase 1: Foundation (1 semaine)
1. Créer les schémas Zod pour tous les blocs
2. Implémenter le RenderEngineV3
3. Créer des tests unitaires pour chaque bloc

### Phase 2: Migration (2 semaines)
1. Migrer les blocs un par un vers le nouveau système
2. Créer un adaptateur pour l'ancien système
3. Tester en parallèle

### Phase 3: Optimisation (1 semaine)
1. Implémenter le cache de rendu
2. Optimiser les performances
3. Finaliser le CMS

## AVANTAGES

1. **Robustesse** : Validation à chaque étape
2. **Performance** : Rendu déterministe et cacheable
3. **Maintenabilité** : Code modulaire et testable
4. **Scalabilité** : Ajout facile de nouveaux blocs
5. **Fiabilité** : Export garanti fonctionnel

## EXEMPLE D'IMPLÉMENTATION

```typescript
// Nouveau bloc avec l'architecture V3
export const heroBlockV3: BlockDefinition = {
  type: 'hero-ultra-modern',
  version: '3.0.0',
  
  schema: z.object({
    variant: z.enum(['gradient-wave', 'glassmorphism', ...]),
    title: z.string().min(1).max(100),
    subtitle: z.string().optional(),
    buttons: z.array(buttonSchema).max(2),
    background: backgroundSchema
  }),
  
  renderer: {
    render(data: HeroData): RenderResult {
      // Rendu garanti sans erreur
      const html = `
        <section class="hero hero--${data.variant}">
          <div class="hero__content">
            <h1>${escapeHtml(data.title)}</h1>
            ${data.subtitle ? `<p>${escapeHtml(data.subtitle)}</p>` : ''}
            ${this.renderButtons(data.buttons)}
          </div>
          ${this.renderBackground(data.background)}
        </section>
      `;
      
      return {
        html,
        css: this.getCSS(data.variant),
        js: this.getJS(data),
        assets: this.getAssets(data),
        errors: []
      };
    },
    
    getDefaultCSS(): string {
      return heroBaseCSS + heroVariantsCSS;
    },
    
    getRequiredAssets(): Asset[] {
      return []; // Pas d'assets obligatoires
    }
  }
};
```

## CONCLUSION

Cette architecture résout tous les problèmes actuels :
- ✅ Plus de [object Object] (validation stricte)
- ✅ Export toujours fonctionnel (rendu déterministe)
- ✅ CMS robuste (API claire)
- ✅ Performance optimale (cache et optimisations)
- ✅ Facile à maintenir et étendre

Le coût de migration est raisonnable et peut se faire progressivement.
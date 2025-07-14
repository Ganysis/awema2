/**
 * Render Engine V3 - Moteur de rendu déterministe
 */

import { z } from 'zod';
import { 
  BlockRenderer, 
  RenderResult, 
  RenderContext, 
  BlockData,
  RenderError 
} from '../types';

export class RenderEngineV3 {
  private renderers = new Map<string, BlockRenderer>();
  private schemas = new Map<string, z.ZodType>();
  private cache = new Map<string, RenderResult>();
  private config = {
    enableCache: true,
    enableValidation: true,
    enablePerformanceTracking: true,
    maxCacheSize: 100,
  };

  constructor(config?: Partial<typeof RenderEngineV3.prototype.config>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Enregistre un renderer pour un type de bloc
   */
  registerRenderer<T>(
    type: string, 
    renderer: BlockRenderer<T>,
    schema: z.ZodType<T>
  ): void {
    this.renderers.set(type, renderer);
    this.schemas.set(type, schema);
    console.log(`[RenderV3] Renderer enregistré: ${type} v${renderer.version}`);
  }

  /**
   * Rend un bloc avec validation et gestion d'erreurs
   */
  async renderBlock(
    block: BlockData,
    context?: RenderContext
  ): Promise<RenderResult> {
    const startTime = performance.now();
    
    try {
      // 1. Vérifier le cache
      if (this.config.enableCache) {
        const cached = this.getFromCache(block);
        if (cached) {
          console.log(`[RenderV3] Cache hit pour ${block.meta.type}`);
          return cached;
        }
      }

      // 2. Récupérer le renderer
      const renderer = this.renderers.get(block.meta.type);
      if (!renderer) {
        return this.createErrorResult(
          block.meta.id,
          `Aucun renderer trouvé pour le type: ${block.meta.type}`,
          true
        );
      }

      // 3. Valider les données
      if (this.config.enableValidation) {
        const validation = renderer.validate(block.data);
        if (!validation.success) {
          console.error(`[RenderV3] Validation échouée pour ${block.meta.type}:`, validation.error);
          
          // Utiliser les valeurs par défaut
          block.data = renderer.getDefaultData();
        }
      }

      // 4. Rendre le bloc
      const result = await this.safeRender(renderer, block.data, context);
      
      // 5. Ajouter les performances
      if (this.config.enablePerformanceTracking) {
        result.performance.renderTime = performance.now() - startTime;
      }

      // 6. Mettre en cache
      if (this.config.enableCache) {
        this.addToCache(block, result);
      }

      return result;

    } catch (error) {
      console.error(`[RenderV3] Erreur critique pour ${block.meta.type}:`, error);
      return this.createErrorResult(
        block.meta.id,
        error instanceof Error ? error.message : 'Erreur inconnue',
        true
      );
    }
  }

  /**
   * Rend plusieurs blocs en parallèle
   */
  async renderBlocks(
    blocks: BlockData[],
    context?: RenderContext
  ): Promise<RenderResult[]> {
    return Promise.all(
      blocks.map(block => this.renderBlock(block, context))
    );
  }

  /**
   * Rend une page complète
   */
  async renderPage(
    blocks: BlockData[],
    context?: RenderContext
  ): Promise<{
    html: string;
    css: string;
    js: string;
    errors: RenderError[];
  }> {
    const results = await this.renderBlocks(blocks, context);
    
    // Combiner les résultats
    const combined = {
      html: results.map(r => r.html).join('\n'),
      css: this.combineCSS(results.map(r => r.css)),
      js: this.combineJS(results.map(r => r.js)),
      errors: results.flatMap(r => r.errors),
    };

    return combined;
  }

  /**
   * Rendu sécurisé avec fallback
   */
  private async safeRender<T>(
    renderer: BlockRenderer<T>,
    data: T,
    context?: RenderContext
  ): Promise<RenderResult> {
    try {
      return renderer.render(data, context);
    } catch (error) {
      console.error(`[RenderV3] Erreur dans le renderer:`, error);
      
      // Essayer avec les valeurs par défaut
      try {
        const defaultData = renderer.getDefaultData();
        return renderer.render(defaultData, context);
      } catch (fallbackError) {
        // Retourner un résultat d'erreur
        return {
          html: `<div class="render-error">Erreur de rendu</div>`,
          css: '',
          js: '',
          assets: [],
          errors: [{
            blockId: 'unknown',
            message: error instanceof Error ? error.message : 'Erreur inconnue',
            fallbackUsed: true
          }],
          warnings: [],
          performance: {
            renderTime: 0,
            cssSize: 0,
            jsSize: 0
          }
        };
      }
    }
  }

  /**
   * Gestion du cache
   */
  private getCacheKey(block: BlockData): string {
    return `${block.meta.type}-${block.meta.id}-${block.meta.modified.getTime()}`;
  }

  private getFromCache(block: BlockData): RenderResult | null {
    const key = this.getCacheKey(block);
    return this.cache.get(key) || null;
  }

  private addToCache(block: BlockData, result: RenderResult): void {
    // Limiter la taille du cache
    if (this.cache.size >= this.config.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    const key = this.getCacheKey(block);
    this.cache.set(key, result);
  }

  /**
   * Combine CSS en éliminant les doublons
   */
  private combineCSS(cssArray: string[]): string {
    const uniqueRules = new Set<string>();
    
    cssArray.forEach(css => {
      // Extraire les règles CSS
      const rules = css.split('}').filter(r => r.trim());
      rules.forEach(rule => {
        if (rule.trim()) {
          uniqueRules.add(rule.trim() + '}');
        }
      });
    });

    return Array.from(uniqueRules).join('\n');
  }

  /**
   * Combine JS en évitant les conflits
   */
  private combineJS(jsArray: string[]): string {
    return jsArray
      .filter(js => js.trim())
      .map((js, index) => {
        // Wrapper chaque script dans une IIFE
        return `
// Block ${index}
(function() {
${js}
})();`;
      })
      .join('\n\n');
  }

  /**
   * Crée un résultat d'erreur
   */
  private createErrorResult(
    blockId: string,
    message: string,
    fallbackUsed: boolean
  ): RenderResult {
    return {
      html: `
<div class="block-error" data-block-id="${blockId}">
  <div class="error-message">
    <strong>Erreur de rendu:</strong> ${this.escapeHtml(message)}
  </div>
</div>`,
      css: `
.block-error {
  padding: 2rem;
  margin: 1rem 0;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 0.5rem;
}
.error-message {
  color: #c33;
  font-family: monospace;
}`,
      js: '',
      assets: [],
      errors: [{
        blockId,
        message,
        fallbackUsed
      }],
      warnings: [],
      performance: {
        renderTime: 0,
        cssSize: 0,
        jsSize: 0
      }
    };
  }

  /**
   * Échappe le HTML pour éviter les XSS
   */
  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Obtient des statistiques sur le moteur
   */
  getStats() {
    return {
      renderersCount: this.renderers.size,
      cacheSize: this.cache.size,
      registeredTypes: Array.from(this.renderers.keys()),
    };
  }

  /**
   * Vide le cache
   */
  clearCache(): void {
    this.cache.clear();
    console.log('[RenderV3] Cache vidé');
  }
}
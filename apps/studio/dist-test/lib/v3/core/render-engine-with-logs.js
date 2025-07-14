"use strict";
/**
 * Render Engine V3 avec logs détaillés
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderEngineV3 = void 0;
const logger_1 = require("./logger");
class RenderEngineV3 {
    constructor(options = {}) {
        this.renderers = new Map();
        this.schemas = new Map();
        this.cache = new Map();
        logger_1.logger.info('RenderEngineV3', 'constructor', '🚀 Initialisation du moteur de rendu V3', { options });
        this.options = {
            enableCache: options.enableCache ?? true,
            enableValidation: options.enableValidation ?? true,
            enablePerformanceTracking: options.enablePerformanceTracking ?? true,
            cacheMaxAge: options.cacheMaxAge ?? 3600000, // 1h par défaut
            maxRenderTime: options.maxRenderTime ?? 5000, // 5s max
        };
        logger_1.logger.debug('RenderEngineV3', 'constructor', 'Options finales', this.options);
    }
    /**
     * Enregistre un renderer
     */
    registerRenderer(type, renderer, schema) {
        const startTime = performance.now();
        logger_1.logger.info('RenderEngineV3', 'registerRenderer', `📝 Enregistrement du renderer: ${type}`);
        try {
            // Vérifier que le renderer est valide
            if (!renderer || typeof renderer.render !== 'function') {
                throw new Error(`Renderer invalide pour le type: ${type}`);
            }
            this.renderers.set(type, renderer);
            logger_1.logger.debug('RenderEngineV3', 'registerRenderer', `✅ Renderer enregistré: ${type}`, {
                hasValidate: !!renderer.validate,
                hasDefaultData: !!renderer.getDefaultData,
                hasDefaultCSS: !!renderer.getDefaultCSS
            });
            if (schema) {
                this.schemas.set(type, schema);
                logger_1.logger.debug('RenderEngineV3', 'registerRenderer', `✅ Schema enregistré: ${type}`);
            }
            logger_1.logger.performance('RenderEngineV3', 'registerRenderer', startTime);
        }
        catch (error) {
            logger_1.logger.error('RenderEngineV3', 'registerRenderer', `❌ Erreur lors de l'enregistrement: ${type}`, error);
            throw error;
        }
    }
    /**
     * Rend un bloc unique
     */
    async renderBlock(block, context) {
        const startTime = performance.now();
        const blockId = block.meta.id;
        const blockType = block.meta.type;
        logger_1.logger.info('RenderEngineV3', 'renderBlock', `🎨 Début du rendu: ${blockType}#${blockId}`);
        logger_1.logger.debug('RenderEngineV3', 'renderBlock', 'Données du bloc', {
            blockId,
            blockType,
            version: block.meta.version,
            hasCache: !!block.cache,
            dataKeys: Object.keys(block.data || {})
        });
        try {
            // 1. Vérifier le cache
            if (this.options.enableCache && block.cache?.html) {
                const cacheKey = this.getCacheKey(block);
                const cached = this.getFromCache(cacheKey);
                if (cached) {
                    logger_1.logger.info('RenderEngineV3', 'renderBlock', `✨ Cache hit: ${blockType}#${blockId}`);
                    logger_1.logger.performance('RenderEngineV3', 'renderBlock', startTime);
                    return cached;
                }
            }
            // 2. Obtenir le renderer
            const renderer = this.renderers.get(blockType);
            if (!renderer) {
                logger_1.logger.warn('RenderEngineV3', 'renderBlock', `⚠️ Renderer non trouvé: ${blockType}`);
                return this.createFallbackResult(block, `Renderer non trouvé pour le type: ${blockType}`);
            }
            // 3. Valider les données
            let validatedData = block.data;
            if (this.options.enableValidation && renderer.validate) {
                logger_1.logger.debug('RenderEngineV3', 'renderBlock', `🔍 Validation des données: ${blockType}`);
                const validation = renderer.validate(block.data);
                if (!validation.success) {
                    logger_1.logger.warn('RenderEngineV3', 'renderBlock', `⚠️ Validation échouée: ${blockType}`, {
                        errors: validation.error?.errors
                    });
                    // Utiliser les données par défaut
                    validatedData = renderer.getDefaultData();
                    logger_1.logger.info('RenderEngineV3', 'renderBlock', `🔄 Utilisation des données par défaut: ${blockType}`);
                }
                else {
                    validatedData = validation.data;
                    logger_1.logger.debug('RenderEngineV3', 'renderBlock', `✅ Validation réussie: ${blockType}`);
                }
            }
            // 4. Rendre le bloc
            logger_1.logger.debug('RenderEngineV3', 'renderBlock', `🖌️ Rendu en cours: ${blockType}`);
            const renderStartTime = performance.now();
            const result = await this.safeRender(renderer, validatedData, context);
            const renderDuration = performance.now() - renderStartTime;
            logger_1.logger.info('RenderEngineV3', 'renderBlock', `✅ Rendu terminé: ${blockType} (${renderDuration.toFixed(2)}ms)`, {
                htmlLength: result.html.length,
                cssLength: result.css.length,
                jsLength: result.js.length,
                errorsCount: result.errors.length,
                warningsCount: result.warnings.length
            });
            // 5. Mettre en cache
            if (this.options.enableCache) {
                const cacheKey = this.getCacheKey(block);
                this.putInCache(cacheKey, result);
                logger_1.logger.debug('RenderEngineV3', 'renderBlock', `💾 Résultat mis en cache: ${blockType}#${blockId}`);
            }
            // 6. Ajouter les métriques
            if (this.options.enablePerformanceTracking) {
                result.performance = {
                    ...result.performance,
                    totalTime: performance.now() - startTime,
                    cacheHit: false
                };
            }
            logger_1.logger.performance('RenderEngineV3', 'renderBlock', startTime);
            return result;
        }
        catch (error) {
            logger_1.logger.error('RenderEngineV3', 'renderBlock', `❌ Erreur critique lors du rendu: ${blockType}#${blockId}`, error);
            return this.createFallbackResult(block, error instanceof Error ? error.message : 'Erreur inconnue');
        }
    }
    /**
     * Rend plusieurs blocs
     */
    async renderBlocks(blocks, context) {
        const startTime = performance.now();
        logger_1.logger.info('RenderEngineV3', 'renderBlocks', `🎨 Rendu de ${blocks.length} blocs`);
        try {
            const results = await Promise.all(blocks.map((block, index) => {
                logger_1.logger.debug('RenderEngineV3', 'renderBlocks', `Rendu bloc ${index + 1}/${blocks.length}: ${block.meta.type}`);
                return this.renderBlock(block, context);
            }));
            const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
            const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
            logger_1.logger.info('RenderEngineV3', 'renderBlocks', `✅ Rendu terminé: ${blocks.length} blocs`, {
                totalErrors,
                totalWarnings,
                duration: performance.now() - startTime
            });
            logger_1.logger.performance('RenderEngineV3', 'renderBlocks', startTime);
            return results;
        }
        catch (error) {
            logger_1.logger.error('RenderEngineV3', 'renderBlocks', `❌ Erreur lors du rendu multiple`, error);
            throw error;
        }
    }
    /**
     * Rendu sécurisé avec timeout et gestion d'erreur
     */
    async safeRender(renderer, data, context) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                logger_1.logger.error('RenderEngineV3', 'safeRender', `⏱️ Timeout dépassé: ${this.options.maxRenderTime}ms`);
                reject(new Error(`Timeout de rendu dépassé: ${this.options.maxRenderTime}ms`));
            }, this.options.maxRenderTime);
        });
        const renderPromise = new Promise((resolve) => {
            try {
                logger_1.logger.debug('RenderEngineV3', 'safeRender', '🔒 Rendu sécurisé en cours');
                const result = renderer.render(data, context);
                resolve(result);
            }
            catch (error) {
                logger_1.logger.error('RenderEngineV3', 'safeRender', '❌ Erreur dans le renderer', error);
                resolve(this.createErrorResult(error));
            }
        });
        try {
            return await Promise.race([renderPromise, timeoutPromise]);
        }
        catch (error) {
            logger_1.logger.error('RenderEngineV3', 'safeRender', '❌ Erreur ou timeout', error);
            return this.createErrorResult(error);
        }
    }
    /**
     * Gestion du cache
     */
    getCacheKey(block) {
        const key = `${block.meta.type}_${block.meta.id}_${block.meta.modified?.getTime() || 0}`;
        logger_1.logger.debug('RenderEngineV3', 'getCacheKey', `🔑 Clé de cache: ${key}`);
        return key;
    }
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (!cached) {
            logger_1.logger.debug('RenderEngineV3', 'getFromCache', `❌ Cache miss: ${key}`);
            return null;
        }
        const age = Date.now() - cached.timestamp;
        if (age > this.options.cacheMaxAge) {
            logger_1.logger.debug('RenderEngineV3', 'getFromCache', `⏰ Cache expiré: ${key} (âge: ${age}ms)`);
            this.cache.delete(key);
            return null;
        }
        logger_1.logger.debug('RenderEngineV3', 'getFromCache', `✅ Cache valide: ${key} (âge: ${age}ms)`);
        return cached.result;
    }
    putInCache(key, result) {
        logger_1.logger.debug('RenderEngineV3', 'putInCache', `💾 Mise en cache: ${key}`);
        this.cache.set(key, {
            result,
            timestamp: Date.now()
        });
        // Nettoyer le cache si trop gros
        if (this.cache.size > 1000) {
            logger_1.logger.warn('RenderEngineV3', 'putInCache', '🧹 Nettoyage du cache (>1000 entrées)');
            const entriesToDelete = Array.from(this.cache.entries())
                .sort((a, b) => a[1].timestamp - b[1].timestamp)
                .slice(0, 100)
                .map(e => e[0]);
            entriesToDelete.forEach(key => this.cache.delete(key));
            logger_1.logger.info('RenderEngineV3', 'putInCache', `🧹 ${entriesToDelete.length} entrées supprimées du cache`);
        }
    }
    /**
     * Création de résultats de fallback
     */
    createFallbackResult(block, errorMessage) {
        logger_1.logger.warn('RenderEngineV3', 'createFallbackResult', `🔧 Création d'un résultat de fallback: ${block.meta.type}`, {
            errorMessage
        });
        const renderer = this.renderers.get(block.meta.type);
        const defaultCSS = renderer?.getDefaultCSS ? renderer.getDefaultCSS() : '';
        return {
            html: `
<div class="block-error" data-block="${block.meta.type}" data-error="true">
  <div class="block-error__message">
    <h3>Erreur de rendu</h3>
    <p>Type: ${this.escape(block.meta.type)}</p>
    <p>ID: ${this.escape(block.meta.id)}</p>
    <p>Erreur: ${this.escape(errorMessage)}</p>
  </div>
</div>`,
            css: defaultCSS + `
.block-error {
  padding: 2rem;
  margin: 1rem 0;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  color: #991b1b;
}
.block-error__message {
  max-width: 600px;
  margin: 0 auto;
}
.block-error h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
}
.block-error p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
}`,
            js: '',
            assets: [],
            errors: [{
                    blockId: block.meta.id,
                    message: errorMessage,
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
    createErrorResult(error) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        logger_1.logger.error('RenderEngineV3', 'createErrorResult', `🚨 Création d'un résultat d'erreur`, error);
        return {
            html: `<div class="render-error">Erreur: ${this.escape(errorMessage)}</div>`,
            css: '.render-error { color: red; padding: 1rem; background: #fee; }',
            js: '',
            assets: [],
            errors: [{
                    blockId: 'unknown',
                    message: errorMessage,
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
    escape(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    /**
     * Méthodes utilitaires
     */
    clearCache() {
        const size = this.cache.size;
        this.cache.clear();
        logger_1.logger.info('RenderEngineV3', 'clearCache', `🧹 Cache vidé (${size} entrées supprimées)`);
    }
    getStats() {
        const stats = {
            renderersCount: this.renderers.size,
            schemasCount: this.schemas.size,
            cacheSize: this.cache.size,
            renderers: Array.from(this.renderers.keys()),
            schemas: Array.from(this.schemas.keys())
        };
        logger_1.logger.debug('RenderEngineV3', 'getStats', '📊 Statistiques du moteur', stats);
        return stats;
    }
}
exports.RenderEngineV3 = RenderEngineV3;

/**
 * AWEMA V3 - Point d'entrée principal
 */

export * from './types';
export * from './core/render-engine';
export * from './services/export.service';
export * from './schemas/common';
export * from './schemas/blocks/hero';
export * from './schemas/blocks/contact';
export * from './renderers/hero.renderer';

// Initialisation simplifiée
import { RenderEngineV3 } from './core/render-engine';
import { ExportServiceV3 } from './services/export.service';
import { HeroRendererV3 } from './renderers/hero.renderer';
import { heroDataSchema } from './schemas/blocks/hero';

/**
 * Crée une instance configurée du système V3
 */
export function createV3System() {
  // Créer le moteur de rendu
  const renderEngine = new RenderEngineV3({
    enableCache: true,
    enableValidation: true,
    enablePerformanceTracking: true,
  });
  
  // Enregistrer les renderers
  const heroRenderer = new HeroRendererV3();
  renderEngine.registerRenderer('hero-ultra-modern', heroRenderer, heroDataSchema);
  
  // TODO: Ajouter tous les autres renderers
  
  // Créer le service d'export
  const exportService = new ExportServiceV3(renderEngine);
  
  return {
    renderEngine,
    exportService,
    
    // Helpers
    async renderBlock(block: any) {
      return renderEngine.renderBlock(block);
    },
    
    async exportProject(project: any, options: any) {
      return exportService.export(project, options);
    }
  };
}

// Instance globale (optionnel)
let v3Instance: ReturnType<typeof createV3System> | null = null;

export function getV3Instance() {
  if (!v3Instance) {
    v3Instance = createV3System();
  }
  return v3Instance;
}
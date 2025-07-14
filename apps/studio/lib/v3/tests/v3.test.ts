/**
 * Tests unitaires V3 - Suite de tests complète
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { z } from 'zod';

// Core
import { LoggerV3 } from '../core/logger';
import { RenderEngineV3 } from '../core/render-engine-with-logs';
import { V2ToV3Adapter } from '../adapters/v2-to-v3.adapter';

// Schemas
import { heroDataSchema, heroDefaults } from '../schemas/blocks/hero';
import { contactDataSchema, contactDefaults } from '../schemas/blocks/contact';
import { featuresDataSchema, featuresDefaults } from '../schemas/blocks/features';
import { galleryDataSchema, galleryDefaults } from '../schemas/blocks/gallery';
import { faqDataSchema, faqDefaults } from '../schemas/blocks/faq';
import { pricingDataSchema, pricingDefaults } from '../schemas/blocks/pricing';
import { ctaDataSchema, ctaDefaults } from '../schemas/blocks/cta';
import { contentDataSchema, contentDefaults } from '../schemas/blocks/content';
import { servicesDataSchema, servicesDefaults } from '../schemas/blocks/services';
import { testimonialsDataSchema, testimonialsDefaults } from '../schemas/blocks/testimonials';

// Renderers
import { HeroRendererV3 } from '../renderers/hero.renderer';
import { ContactRendererV3 } from '../renderers/contact.renderer';
import { FeaturesRendererV3 } from '../renderers/features.renderer';
import { GalleryRendererV3 } from '../renderers/gallery.renderer';
import { FAQRendererV3 } from '../renderers/faq.renderer';
import { PricingRendererV3 } from '../renderers/pricing.renderer';
import { CTARendererV3 } from '../renderers/cta.renderer';
import { ContentRendererV3 } from '../renderers/content.renderer';
import { ServicesRendererV3 } from '../renderers/services.renderer';
import { TestimonialsRendererV3 } from '../renderers/testimonials.renderer';

// Types
import { BlockData } from '../types';

describe('V3 Core Tests', () => {
  describe('Logger V3', () => {
    let logger: LoggerV3;
    
    beforeEach(() => {
      logger = new LoggerV3();
      logger.clear();
    });
    
    it('should log messages with correct levels', () => {
      logger.debug('Test', 'method', 'Debug message');
      logger.info('Test', 'method', 'Info message');
      logger.warn('Test', 'method', 'Warn message');
      logger.error('Test', 'method', 'Error message');
      
      const logs = logger.getLogs();
      expect(logs).toHaveLength(4);
      expect(logs[0].level).toBe('DEBUG');
      expect(logs[1].level).toBe('INFO');
      expect(logs[2].level).toBe('WARN');
      expect(logs[3].level).toBe('ERROR');
    });
    
    it('should include metadata in logs', () => {
      const testData = { foo: 'bar', count: 42 };
      logger.info('Test', 'method', 'Test message', testData);
      
      const logs = logger.getLogs();
      expect(logs[0].data).toEqual(testData);
    });
    
    it('should filter logs by level', () => {
      logger.setLevel('WARN');
      logger.debug('Test', 'method', 'Debug - should not appear');
      logger.info('Test', 'method', 'Info - should not appear');
      logger.warn('Test', 'method', 'Warn - should appear');
      logger.error('Test', 'method', 'Error - should appear');
      
      const logs = logger.getLogs();
      expect(logs).toHaveLength(2);
      expect(logs[0].level).toBe('WARN');
      expect(logs[1].level).toBe('ERROR');
    });
  });
  
  describe('V2 to V3 Adapter', () => {
    let adapter: V2ToV3Adapter;
    
    beforeEach(() => {
      adapter = new V2ToV3Adapter();
    });
    
    it('should convert hero block from V2 to V3', () => {
      const v2Block = {
        id: 'hero-1',
        type: 'hero-ultra-modern',
        props: {
          variant: 'gradient-animated',
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          cta: {
            primary: { text: 'Primary', link: '#' },
            secondary: { text: 'Secondary', link: '#' }
          }
        }
      };
      
      const v3Block = adapter.convertBlock(v2Block);
      
      expect(v3Block).toBeTruthy();
      expect(v3Block?.type).toBe('hero-ultra-modern');
      expect(v3Block?.data.title).toBe('Test Title');
      expect(v3Block?.data.variant).toBe('gradient-animated');
    });
    
    it('should handle missing props gracefully', () => {
      const v2Block = {
        id: 'test-1',
        type: 'hero-ultra-modern'
      };
      
      const v3Block = adapter.convertBlock(v2Block);
      
      expect(v3Block).toBeTruthy();
      expect(v3Block?.data).toBeDefined();
    });
    
    it('should return null for unsupported block types', () => {
      const v2Block = {
        id: 'unknown-1',
        type: 'unknown-block',
        props: {}
      };
      
      const v3Block = adapter.convertBlock(v2Block);
      
      expect(v3Block).toBeNull();
    });
  });
});

describe('V3 Schema Tests', () => {
  describe('Hero Schema', () => {
    it('should validate correct hero data', () => {
      const validData = {
        variant: 'gradient-animated',
        title: 'My Title',
        subtitle: 'My Subtitle',
        description: 'My Description'
      };
      
      const result = heroDataSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
    
    it('should provide defaults for missing fields', () => {
      const minimalData = {
        title: 'Only Title'
      };
      
      const result = heroDataSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
      expect(result.data?.variant).toBe('gradient-animated');
    });
    
    it('should reject invalid variants', () => {
      const invalidData = {
        variant: 'invalid-variant',
        title: 'Title'
      };
      
      const result = heroDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
  
  describe('Contact Schema', () => {
    it('should validate correct contact data', () => {
      const validData = contactDefaults;
      
      const result = contactDataSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
    
    it('should validate form fields', () => {
      const data = {
        ...contactDefaults,
        form: {
          fields: [
            { name: 'email', label: 'Email', type: 'email', required: true }
          ]
        }
      };
      
      const result = contactDataSchema.safeParse(data);
      expect(result.success).toBe(true);
      expect(result.data?.form.fields).toHaveLength(1);
    });
  });
  
  // Tests pour tous les autres schémas...
  describe('All Schemas Default Values', () => {
    const schemas = [
      { name: 'Features', schema: featuresDataSchema, defaults: featuresDefaults },
      { name: 'Gallery', schema: galleryDataSchema, defaults: galleryDefaults },
      { name: 'FAQ', schema: faqDataSchema, defaults: faqDefaults },
      { name: 'Pricing', schema: pricingDataSchema, defaults: pricingDefaults },
      { name: 'CTA', schema: ctaDataSchema, defaults: ctaDefaults },
      { name: 'Content', schema: contentDataSchema, defaults: contentDefaults },
      { name: 'Services', schema: servicesDataSchema, defaults: servicesDefaults },
      { name: 'Testimonials', schema: testimonialsDataSchema, defaults: testimonialsDefaults }
    ];
    
    schemas.forEach(({ name, schema, defaults }) => {
      it(`should validate ${name} default values`, () => {
        const result = schema.safeParse(defaults);
        expect(result.success).toBe(true);
      });
    });
  });
});

describe('V3 Renderer Tests', () => {
  let engine: RenderEngineV3;
  
  beforeEach(() => {
    engine = new RenderEngineV3();
    
    // Enregistrer tous les renderers
    engine.registerRenderer(new HeroRendererV3());
    engine.registerRenderer(new ContactRendererV3());
    engine.registerRenderer(new FeaturesRendererV3());
    engine.registerRenderer(new GalleryRendererV3());
    engine.registerRenderer(new FAQRendererV3());
    engine.registerRenderer(new PricingRendererV3());
    engine.registerRenderer(new CTARendererV3());
    engine.registerRenderer(new ContentRendererV3());
    engine.registerRenderer(new ServicesRendererV3());
    engine.registerRenderer(new TestimonialsRendererV3());
  });
  
  describe('Hero Renderer', () => {
    it('should render hero block successfully', async () => {
      const block: BlockData = {
        id: 'hero-test',
        type: 'hero-ultra-modern',
        data: heroDefaults,
        meta: {
          version: '3.0.0',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
      
      const result = await engine.renderBlock(block);
      
      expect(result.html).toContain('hero');
      expect(result.html).toContain(heroDefaults.title);
      expect(result.css).toContain('.hero');
      expect(result.errors).toHaveLength(0);
    });
    
    it('should handle invalid data gracefully', async () => {
      const block: BlockData = {
        id: 'hero-invalid',
        type: 'hero-ultra-modern',
        data: { invalid: 'data' } as any,
        meta: {
          version: '3.0.0',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
      
      const result = await engine.renderBlock(block);
      
      expect(result.html).toBeTruthy(); // Should have fallback
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
  
  describe('All Renderers', () => {
    const testCases = [
      { type: 'hero-ultra-modern', defaults: heroDefaults },
      { type: 'contact-ultra-modern', defaults: contactDefaults },
      { type: 'features-ultra-modern', defaults: featuresDefaults },
      { type: 'gallery-ultra-modern', defaults: galleryDefaults },
      { type: 'faq-ultra-modern', defaults: faqDefaults },
      { type: 'pricing-ultra-modern', defaults: pricingDefaults },
      { type: 'cta-ultra-modern', defaults: ctaDefaults },
      { type: 'content-ultra-modern', defaults: contentDefaults },
      { type: 'services-ultra-modern', defaults: servicesDefaults },
      { type: 'testimonials-ultra-modern', defaults: testimonialsDefaults }
    ];
    
    testCases.forEach(({ type, defaults }) => {
      it(`should render ${type} with default data`, async () => {
        const block: BlockData = {
          id: `${type}-test`,
          type,
          data: defaults,
          meta: {
            version: '3.0.0',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
        
        const result = await engine.renderBlock(block);
        
        expect(result.html).toBeTruthy();
        expect(result.css).toBeTruthy();
        expect(result.errors).toHaveLength(0);
        expect(result.performance?.renderTime).toBeGreaterThan(0);
      });
    });
  });
  
  describe('Performance Tests', () => {
    it('should render multiple blocks efficiently', async () => {
      const blocks: BlockData[] = [
        {
          id: 'perf-1',
          type: 'hero-ultra-modern',
          data: heroDefaults,
          meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        },
        {
          id: 'perf-2',
          type: 'features-ultra-modern',
          data: featuresDefaults,
          meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        },
        {
          id: 'perf-3',
          type: 'pricing-ultra-modern',
          data: pricingDefaults,
          meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        }
      ];
      
      const startTime = performance.now();
      const results = await Promise.all(blocks.map(b => engine.renderBlock(b)));
      const totalTime = performance.now() - startTime;
      
      expect(results).toHaveLength(3);
      expect(results.every(r => r.errors.length === 0)).toBe(true);
      expect(totalTime).toBeLessThan(1000); // Should complete in under 1 second
    });
  });
});

describe('V3 Integration Tests', () => {
  it('should export a complete page', async () => {
    const engine = new RenderEngineV3();
    engine.registerRenderer(new HeroRendererV3());
    engine.registerRenderer(new FeaturesRendererV3());
    engine.registerRenderer(new CTARendererV3());
    
    const blocks: BlockData[] = [
      {
        id: 'page-hero',
        type: 'hero-ultra-modern',
        data: { ...heroDefaults, title: 'Welcome to V3' },
        meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      },
      {
        id: 'page-features',
        type: 'features-ultra-modern',
        data: featuresDefaults,
        meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      },
      {
        id: 'page-cta',
        type: 'cta-ultra-modern',
        data: ctaDefaults,
        meta: { version: '3.0.0', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      }
    ];
    
    const results = await Promise.all(blocks.map(b => engine.renderBlock(b)));
    
    const pageHTML = results.map(r => r.html).join('\n');
    const pageCSS = results.map(r => r.css).join('\n');
    const pageJS = results.map(r => r.js).filter(Boolean).join('\n');
    
    expect(pageHTML).toContain('Welcome to V3');
    expect(pageHTML).toContain('features');
    expect(pageHTML).toContain('cta');
    expect(pageCSS.length).toBeGreaterThan(1000);
    expect(results.every(r => r.errors.length === 0)).toBe(true);
  });
});

// Export pour utilisation dans d'autres tests
export const runV3Tests = () => {
  console.log('🧪 Running V3 Tests...');
  // Les tests seront exécutés par Jest
};
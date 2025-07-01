import { describe, it, expect, beforeEach } from '@jest/globals';
import { SEOAIEngineService } from '../lib/services/seo-ai-engine.service';
import { SEOContentGeneratorService } from '../lib/services/seo-content-generator.service';
import { AdvancedSEOService } from '../lib/services/advanced-seo.service';
import { BusinessInfo } from '@awema/shared';

describe('SEO Services Tests', () => {
  let testBusinessInfo: BusinessInfo;

  beforeEach(() => {
    testBusinessInfo = {
      companyName: 'Test Company',
      businessType: 'plumber',
      services: [
        { name: 'Service 1', description: 'Description 1' },
        { name: 'Service 2', description: 'Description 2' }
      ],
      location: {
        serviceArea: ['Paris', 'Lyon']
      }
    };
  });

  describe('SEOAIEngineService', () => {
    it('should analyze page and return score', async () => {
      const engine = new SEOAIEngineService(testBusinessInfo);
      const analysis = await engine.analyzePage(
        'Test Page',
        'Test content',
        { title: 'Test Title' }
      );

      expect(analysis).toHaveProperty('score');
      expect(analysis.score).toBeGreaterThanOrEqual(0);
      expect(analysis.score).toBeLessThanOrEqual(100);
      expect(analysis).toHaveProperty('issues');
      expect(analysis).toHaveProperty('suggestions');
    });

    it('should generate optimized content', async () => {
      const engine = new SEOAIEngineService(testBusinessInfo);
      const content = await engine.generateOptimizedContent(
        'service',
        ['keyword1', 'keyword2']
      );

      expect(content).toHaveProperty('title');
      expect(content).toHaveProperty('description');
      expect(content).toHaveProperty('content');
      expect(content).toHaveProperty('headings');
      expect(content.headings).toBeInstanceOf(Array);
    });

    it('should analyze keywords', async () => {
      const engine = new SEOAIEngineService(testBusinessInfo);
      const keywords = await engine.analyzeKeywords(['test keyword']);

      expect(keywords).toBeInstanceOf(Array);
      expect(keywords[0]).toHaveProperty('keyword');
      expect(keywords[0]).toHaveProperty('searchVolume');
      expect(keywords[0]).toHaveProperty('difficulty');
    });

    it('should generate voice search optimization', () => {
      const engine = new SEOAIEngineService(testBusinessInfo);
      const voiceSearch = engine.generateVoiceSearchOptimization('service', 'city');

      expect(voiceSearch).toHaveProperty('questions');
      expect(voiceSearch).toHaveProperty('answers');
      expect(voiceSearch).toHaveProperty('schema');
      expect(voiceSearch.questions.length).toBeGreaterThan(0);
    });
  });

  describe('SEOContentGeneratorService', () => {
    it('should generate content with default config', async () => {
      const generator = new SEOContentGeneratorService({
        business: { name: 'Test', type: 'plumber' },
        services: testBusinessInfo.services
      });

      const content = await generator.generateContent('plomberie');

      expect(content).toHaveProperty('title');
      expect(content).toHaveProperty('metaDescription');
      expect(content).toHaveProperty('h1');
      expect(content).toHaveProperty('introduction');
      expect(content).toHaveProperty('sections');
      expect(content.sections.length).toBeGreaterThan(0);
    });

    it('should generate FAQ when requested', async () => {
      const generator = new SEOContentGeneratorService({
        business: { name: 'Test', type: 'plumber' }
      });

      const content = await generator.generateContent('plomberie', {
        includeFAQ: true
      });

      expect(content.faq).toBeDefined();
      expect(content.faq).toBeInstanceOf(Array);
      expect(content.faq!.length).toBeGreaterThan(0);
      expect(content.faq![0]).toHaveProperty('question');
      expect(content.faq![0]).toHaveProperty('answer');
    });

    it('should optimize keyword density', async () => {
      const generator = new SEOContentGeneratorService({
        business: { name: 'Test', type: 'plumber' }
      });

      const content = await generator.generateContent('plomberie', {
        targetKeywords: ['plombier', 'urgence'],
        keywordDensity: 2
      });

      // Vérifier que les mots-clés sont présents dans le contenu
      const fullText = content.introduction + content.sections.map(s => s.content).join(' ');
      expect(fullText.toLowerCase()).toContain('plombier');
    });
  });

  describe('AdvancedSEOService', () => {
    it('should generate meta tags', () => {
      const seoService = new AdvancedSEOService({
        business: { name: 'Test Company' }
      });

      const metaTags = seoService.generateMetaTags({
        title: 'Test Title',
        description: 'Test Description'
      });

      expect(metaTags).toContain('<title>Test Title</title>');
      expect(metaTags).toContain('name="description"');
      expect(metaTags).toContain('Test Description');
    });

    it('should generate structured data', () => {
      const seoService = new AdvancedSEOService({
        business: {
          name: 'Test Company',
          type: 'plumber',
          address: '123 Test St',
          phone: '0123456789'
        }
      });

      const structuredData = seoService.generateStructuredData();

      expect(structuredData).toContain('application/ld+json');
      expect(structuredData).toContain('LocalBusiness');
      expect(structuredData).toContain('Test Company');
    });

    it('should generate sitemap', () => {
      const seoService = new AdvancedSEOService({
        pages: [
          { slug: '/', meta: { title: 'Home' } },
          { slug: '/services', meta: { title: 'Services' } }
        ]
      });

      const sitemap = seoService.generateSitemap('https://example.com');

      expect(sitemap).toContain('<?xml version="1.0"');
      expect(sitemap).toContain('<urlset');
      expect(sitemap).toContain('https://example.com/');
      expect(sitemap).toContain('https://example.com/services');
    });

    it('should generate robots.txt', () => {
      const seoService = new AdvancedSEOService({});
      const robots = seoService.generateRobotsTxt('https://example.com');

      expect(robots).toContain('User-agent: *');
      expect(robots).toContain('Allow: /');
      expect(robots).toContain('Sitemap: https://example.com/sitemap.xml');
    });
  });
});
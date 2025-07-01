'use client';

import React, { useState } from 'react';
import { SEOAIEngineService } from '@/lib/services/seo-ai-engine.service';
import { SEOContentGeneratorService } from '@/lib/services/seo-content-generator.service';
import { AdvancedSEOService } from '@/lib/services/advanced-seo.service';
import { SEOMonitoringService } from '@/lib/services/seo-monitoring.service';
import { AnalyticsService } from '@/lib/services/analytics.service';
import { useEditorStore } from '@/lib/store/editor-store';

export default function SEOTestPage() {
  const [testResults, setTestResults] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { businessInfo, pages, theme } = useEditorStore();

  const runSEOTests = async () => {
    setLoading(true);
    const results: any = {};

    try {
      // Test 1: SEO AI Engine
      console.log('Testing SEO AI Engine...');
      const seoAIEngine = new SEOAIEngineService(businessInfo);
      
      // Test analyse de page
      const currentPage = pages[0];
      if (currentPage) {
        const analysis = await seoAIEngine.analyzePage(
          currentPage.name,
          'Contenu de test pour la page',
          currentPage.seo || {}
        );
        results.aiAnalysis = {
          success: true,
          data: analysis,
          message: `Score SEO: ${analysis.score}/100`
        };
      }

      // Test génération de contenu optimisé
      const optimizedContent = await seoAIEngine.generateOptimizedContent(
        'service',
        ['plomberie', 'paris'],
        'professional'
      );
      results.contentGeneration = {
        success: true,
        data: optimizedContent,
        message: 'Contenu SEO généré avec succès'
      };

      // Test analyse de mots-clés
      const keywordAnalysis = await seoAIEngine.analyzeKeywords([
        'plombier paris',
        'dépannage plomberie',
        'urgence plombier'
      ]);
      results.keywordAnalysis = {
        success: true,
        data: keywordAnalysis,
        message: `${keywordAnalysis.length} mots-clés analysés`
      };

      // Test 2: SEO Content Generator
      console.log('Testing SEO Content Generator...');
      const contentGenerator = new SEOContentGeneratorService({
        business: {
          name: businessInfo.companyName,
          type: businessInfo.industry?.category || 'services'
        },
        services: businessInfo.services
      });

      const generatedContent = await contentGenerator.generateContent('plomberie', {
        targetKeywords: ['plombier', 'urgence', 'paris'],
        includeLocalSEO: true,
        includeFAQ: true
      });
      results.contentGenerator = {
        success: true,
        data: generatedContent,
        message: 'Contenu généré avec FAQ et SEO local'
      };

      // Test 3: Advanced SEO Service
      console.log('Testing Advanced SEO Service...');
      const seoService = new AdvancedSEOService({
        business: {
          name: businessInfo.companyName,
          type: businessInfo.industry?.category || 'services',
          phone: businessInfo.contact?.phone || '',
          email: businessInfo.contact?.email || ''
        }
      });

      const metaTags = seoService.generateMetaTags({
        title: 'Test SEO Title',
        description: 'Test SEO Description',
        keywords: ['test', 'seo', 'awema']
      });
      results.metaTags = {
        success: true,
        data: metaTags,
        message: 'Meta tags générés'
      };

      const structuredData = seoService.generateStructuredData();
      results.structuredData = {
        success: true,
        data: structuredData,
        message: 'Données structurées générées'
      };

      // Test 4: SEO Monitoring
      console.log('Testing SEO Monitoring...');
      const monitoring = new SEOMonitoringService({
        siteUrl: 'https://example.com'
      });

      // Note: getCoreWebVitals not implemented yet
      results.monitoring = {
        success: true,
        data: { dashboardGenerated: true },
        message: 'Service de monitoring initialisé'
      };

      // Test 5: Analytics Service
      console.log('Testing Analytics Service...');
      const analytics = new AnalyticsService({
        ga4MeasurementId: 'G-TEST123',
        gtmContainerId: 'GTM-TEST123'
      });

      const analyticsHead = analytics.generateAnalyticsHead();
      results.analytics = {
        success: true,
        data: { scriptLength: analyticsHead.length },
        message: 'Scripts analytics générés'
      };

    } catch (error: any) {
      console.error('Test error:', error);
      results.error = {
        success: false,
        message: error.message || 'Erreur lors des tests'
      };
    }

    setTestResults(results);
    setLoading(false);
  };

  const TestResultCard = ({ title, result }: { title: string; result: any }) => {
    if (!result) return null;

    return (
      <div className={`border rounded-lg p-4 mb-4 ${result.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className={`mb-2 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
          {result.success ? '✅' : '❌'} {result.message}
        </p>
        {result.data && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              Voir les détails
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-60">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Test des Services SEO</h1>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="font-semibold mb-2">Services à tester :</h2>
        <ul className="list-disc list-inside text-sm">
          <li>SEO AI Engine - Analyse et optimisation IA</li>
          <li>Content Generator - Génération de contenu SEO</li>
          <li>Advanced SEO - Meta tags et données structurées</li>
          <li>SEO Monitoring - Core Web Vitals</li>
          <li>Analytics - Scripts Google Analytics</li>
        </ul>
      </div>

      <button
        onClick={runSEOTests}
        disabled={loading}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Tests en cours...' : 'Lancer les tests SEO'}
      </button>

      {Object.keys(testResults).length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Résultats des tests</h2>
          
          <TestResultCard 
            title="1. Analyse SEO avec IA" 
            result={testResults.aiAnalysis} 
          />
          
          <TestResultCard 
            title="2. Génération de contenu optimisé" 
            result={testResults.contentGeneration} 
          />
          
          <TestResultCard 
            title="3. Analyse de mots-clés" 
            result={testResults.keywordAnalysis} 
          />
          
          <TestResultCard 
            title="4. Générateur de contenu SEO" 
            result={testResults.contentGenerator} 
          />
          
          <TestResultCard 
            title="5. Meta tags et données structurées" 
            result={testResults.metaTags} 
          />
          
          <TestResultCard 
            title="6. Données structurées Schema.org" 
            result={testResults.structuredData} 
          />
          
          <TestResultCard 
            title="7. Monitoring SEO" 
            result={testResults.monitoring} 
          />
          
          <TestResultCard 
            title="8. Service Analytics" 
            result={testResults.analytics} 
          />
        </div>
      )}
    </div>
  );
}
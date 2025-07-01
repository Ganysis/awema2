'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { SEOAIEngineService } from '@/lib/services/seo-ai-engine.service';
import { ContentGenerator } from './ContentGenerator';
import { SEOAutomation } from './SEOAutomation';
import { 
  MagnifyingGlassIcon, 
  LightBulbIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  GlobeAltIcon,
  PhotoIcon,
  HashtagIcon,
  LinkIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
  CodeBracketIcon,
  PencilIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface SEOCriteria {
  name: string;
  description: string;
  status: 'pass' | 'warning' | 'fail';
  score: number;
  maxScore: number;
  icon: React.ComponentType<any>;
  details?: string;
}

export const SEOPageEditor: React.FC<{ pageId: string }> = ({ pageId }) => {
  const { pages, updatePageSEO, businessInfo, blocks } = useEditorStore();
  const page = pages.find(p => p.id === pageId);
  const [activeTab, setActiveTab] = useState<'editor' | 'analysis' | 'preview' | 'generator' | 'automation'>('editor');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  // Get current page blocks
  const currentPageBlocks = page?.id === 'home' ? blocks : page?.blocks || [];

  // Calculate SEO criteria and score
  const seoAnalysis = useMemo(() => {
    if (!page) return { criteria: [], totalScore: 0 };

    const criteria: SEOCriteria[] = [];
    
    // 1. Title Tag (15 points)
    const titleLength = page.seo?.title?.length || 0;
    criteria.push({
      name: 'Balise Title',
      description: 'Entre 30-60 caractères, avec mot-clé principal',
      status: titleLength >= 30 && titleLength <= 60 ? 'pass' : titleLength > 0 ? 'warning' : 'fail',
      score: titleLength >= 30 && titleLength <= 60 ? 15 : titleLength > 0 ? 8 : 0,
      maxScore: 15,
      icon: DocumentTextIcon,
      details: `${titleLength}/60 caractères`
    });

    // 2. Meta Description (10 points)
    const descLength = page.seo?.description?.length || 0;
    criteria.push({
      name: 'Meta Description',
      description: 'Entre 120-160 caractères, incitative',
      status: descLength >= 120 && descLength <= 160 ? 'pass' : descLength > 0 ? 'warning' : 'fail',
      score: descLength >= 120 && descLength <= 160 ? 10 : descLength > 0 ? 5 : 0,
      maxScore: 10,
      icon: DocumentTextIcon,
      details: `${descLength}/160 caractères`
    });

    // 3. URL Structure (10 points)
    const hasCleanUrl = page.slug && !page.slug.includes('_') && page.slug.length < 50;
    criteria.push({
      name: 'Structure URL',
      description: 'URL courte, descriptive, sans underscore',
      status: hasCleanUrl ? 'pass' : 'warning',
      score: hasCleanUrl ? 10 : 5,
      maxScore: 10,
      icon: LinkIcon,
      details: page.slug || '/'
    });

    // 4. H1 Tag (10 points)
    const h1Count = currentPageBlocks.filter(b => 
      b.props?.title && (b.type.includes('hero') || b.type.includes('header'))
    ).length;
    criteria.push({
      name: 'Balise H1',
      description: 'Une seule balise H1 par page',
      status: h1Count === 1 ? 'pass' : h1Count > 1 ? 'warning' : 'fail',
      score: h1Count === 1 ? 10 : h1Count > 1 ? 5 : 0,
      maxScore: 10,
      icon: HashtagIcon,
      details: `${h1Count} balise(s) H1`
    });

    // 5. Content Length (10 points)
    const contentLength = currentPageBlocks.reduce((acc, block) => {
      const text = JSON.stringify(block.props || {});
      return acc + text.length;
    }, 0);
    criteria.push({
      name: 'Longueur du contenu',
      description: 'Au moins 300 mots de contenu unique',
      status: contentLength > 1500 ? 'pass' : contentLength > 500 ? 'warning' : 'fail',
      score: contentLength > 1500 ? 10 : contentLength > 500 ? 5 : 0,
      maxScore: 10,
      icon: DocumentTextIcon,
      details: `~${Math.floor(contentLength / 5)} mots`
    });

    // 6. Images Alt Text (10 points)
    const imagesWithAlt = currentPageBlocks.filter(b => 
      b.props?.imageAlt || b.props?.alt || 
      (b.props?.images && Array.isArray(b.props.images) && b.props.images.every((img: any) => img.alt))
    ).length;
    const totalImages = currentPageBlocks.filter(b => 
      b.props?.image || b.props?.backgroundImage || b.props?.images
    ).length;
    criteria.push({
      name: 'Alt des images',
      description: 'Toutes les images ont un texte alternatif',
      status: totalImages > 0 && imagesWithAlt === totalImages ? 'pass' : 
              imagesWithAlt > 0 ? 'warning' : 'fail',
      score: totalImages > 0 ? (imagesWithAlt / totalImages) * 10 : 5,
      maxScore: 10,
      icon: PhotoIcon,
      details: `${imagesWithAlt}/${totalImages} images avec alt`
    });

    // 7. Internal Links (5 points)
    const internalLinks = currentPageBlocks.filter(b => 
      b.props?.ctaLink?.startsWith('/') || b.props?.link?.startsWith('/')
    ).length;
    criteria.push({
      name: 'Liens internes',
      description: 'Liens vers d\'autres pages du site',
      status: internalLinks >= 2 ? 'pass' : internalLinks > 0 ? 'warning' : 'fail',
      score: internalLinks >= 2 ? 5 : internalLinks > 0 ? 3 : 0,
      maxScore: 5,
      icon: LinkIcon,
      details: `${internalLinks} lien(s) interne(s)`
    });

    // 8. Keywords Usage (10 points)
    const hasKeywords = page.seo?.keywords && page.seo.keywords.length > 0;
    const keywordInTitle = hasKeywords && page.seo?.keywords && page.seo?.title?.toLowerCase().includes(
      page.seo.keywords.split(',')[0].trim().toLowerCase()
    );
    criteria.push({
      name: 'Utilisation mots-clés',
      description: 'Mot-clé principal dans title, H1 et contenu',
      status: hasKeywords && keywordInTitle ? 'pass' : hasKeywords ? 'warning' : 'fail',
      score: hasKeywords && keywordInTitle ? 10 : hasKeywords ? 5 : 0,
      maxScore: 10,
      icon: HashtagIcon,
      details: hasKeywords ? 'Mots-clés définis' : 'Aucun mot-clé'
    });

    // 9. Open Graph (5 points)
    const hasOG = page.seo?.ogTitle || page.seo?.ogDescription || page.seo?.ogImage;
    criteria.push({
      name: 'Open Graph',
      description: 'Métadonnées pour les réseaux sociaux',
      status: hasOG ? 'pass' : 'warning',
      score: hasOG ? 5 : 0,
      maxScore: 5,
      icon: GlobeAltIcon,
      details: hasOG ? 'Configuré' : 'Non configuré'
    });

    // 10. Mobile Optimization (5 points)
    criteria.push({
      name: 'Optimisation mobile',
      description: 'Site responsive et mobile-friendly',
      status: 'pass', // Always true with our system
      score: 5,
      maxScore: 5,
      icon: DevicePhoneMobileIcon,
      details: 'Responsive activé'
    });

    // 11. Page Speed (5 points)
    const hasHeavyImages = currentPageBlocks.some(b => 
      b.props?.images?.length > 10 || b.type.includes('gallery')
    );
    criteria.push({
      name: 'Vitesse de page',
      description: 'Optimisation des performances',
      status: !hasHeavyImages ? 'pass' : 'warning',
      score: !hasHeavyImages ? 5 : 3,
      maxScore: 5,
      icon: BoltIcon,
      details: !hasHeavyImages ? 'Optimisé' : 'Images lourdes détectées'
    });

    // Calculate total score
    const totalScore = Math.round(
      criteria.reduce((sum, c) => sum + c.score, 0)
    );

    return { criteria, totalScore };
  }, [page, currentPageBlocks]);

  // AI Analysis
  const runAIAnalysis = async () => {
    if (!page || !businessInfo) return;
    
    setIsAnalyzing(true);
    try {
      const seoEngine = new SEOAIEngineService(businessInfo);
      
      // Analyze current page
      const pageContent = currentPageBlocks.map(b => 
        JSON.stringify(b.props || {})
      ).join(' ');
      
      const analysis = await seoEngine.analyzePage(
        page.name,
        pageContent,
        page.seo || {}
      );
      
      // Generate AI suggestions
      const suggestions = [
        ...analysis.suggestions.map(s => ({
          type: 'improvement',
          title: `Améliorer ${s.field}`,
          description: s.reason,
          action: s.suggested
        })),
        ...analysis.issues.map(i => ({
          type: i.type,
          title: i.field,
          description: i.message,
          impact: i.impact
        }))
      ];
      
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('AI analysis error:', error);
    }
    setIsAnalyzing(false);
  };

  useEffect(() => {
    // Run analysis when page changes
    if (page && businessInfo) {
      runAIAnalysis();
    }
  }, [page?.id]);

  if (!page) return null;

  const handleSEOChange = (field: string, value: string) => {
    updatePageSEO(pageId, { [field]: value });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'warning': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'fail': return <XCircleIcon className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'editor'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Édition SEO
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'analysis'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Analyse SEO
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-6 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${
              activeTab === 'generator'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <SparklesIcon className="w-4 h-4" />
            Générateur IA
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'preview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Aperçu SERP
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`px-6 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${
              activeTab === 'automation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <BoltIcon className="w-4 h-4" />
            Automatisation
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">
              NEW
            </span>
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {/* SEO Score Summary */}
        <div className={`mb-6 p-6 rounded-lg border-2 ${getScoreColor(seoAnalysis.totalScore)}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Score SEO : {seoAnalysis.totalScore}/100</h2>
              <p className="text-sm mt-1">
                {seoAnalysis.totalScore >= 80 ? 'Excellent ! Votre page est bien optimisée.' :
                 seoAnalysis.totalScore >= 60 ? 'Bon score, mais des améliorations sont possibles.' :
                 'Des optimisations importantes sont nécessaires.'}
              </p>
            </div>
            <ChartBarIcon className="w-12 h-12 opacity-20" />
          </div>
          <div className="mt-4 bg-white rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                seoAnalysis.totalScore >= 80 ? 'bg-green-500' :
                seoAnalysis.totalScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${seoAnalysis.totalScore}%` }}
            />
          </div>
        </div>

        {activeTab === 'editor' && (
          <div className="space-y-6">
            {/* Meta Tags Editor */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Métadonnées de la page</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre SEO (Title Tag)
                  </label>
                  <input
                    type="text"
                    value={page.seo?.title || ''}
                    onChange={(e) => handleSEOChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`${page.name} | ${businessInfo?.companyName || 'Mon entreprise'}`}
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      Incluez votre mot-clé principal au début
                    </p>
                    <p className={`text-xs ${
                      (page.seo?.title || '').length > 60 ? 'text-red-500' : 
                      (page.seo?.title || '').length < 30 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {(page.seo?.title || '').length}/60 caractères
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={page.seo?.description || ''}
                    onChange={(e) => handleSEOChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Description incitative avec appel à l'action..."
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      Résumé attractif avec CTA (Call-to-Action)
                    </p>
                    <p className={`text-xs ${
                      (page.seo?.description || '').length > 160 ? 'text-red-500' : 
                      (page.seo?.description || '').length < 120 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {(page.seo?.description || '').length}/160 caractères
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mots-clés principaux
                  </label>
                  <input
                    type="text"
                    value={page.seo?.keywords || ''}
                    onChange={(e) => handleSEOChange('keywords', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="plombier paris, dépannage plomberie, urgence plombier"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Séparez par des virgules, 3-5 mots-clés maximum
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL canonique
                  </label>
                  <input
                    type="text"
                    value={page.seo?.canonicalUrl || ''}
                    onChange={(e) => handleSEOChange('canonicalUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://monsite.fr/ma-page"
                  />
                </div>
              </div>
            </div>

            {/* Open Graph Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Réseaux sociaux (Open Graph)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre Open Graph
                  </label>
                  <input
                    type="text"
                    value={page.seo?.ogTitle || ''}
                    onChange={(e) => handleSEOChange('ogTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={page.seo?.title || page.name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description Open Graph
                  </label>
                  <textarea
                    value={page.seo?.ogDescription || ''}
                    onChange={(e) => handleSEOChange('ogDescription', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder={page.seo?.description || ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Open Graph
                  </label>
                  <input
                    type="text"
                    value={page.seo?.ogImage || ''}
                    onChange={(e) => handleSEOChange('ogImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="/images/og-image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommandé : 1200x630px, format JPG ou PNG
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Paramètres avancés</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Directives robots
                  </label>
                  <select
                    value={page.seo?.robots || 'index,follow'}
                    onChange={(e) => handleSEOChange('robots', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="index,follow">Index, Follow (par défaut)</option>
                    <option value="noindex,follow">No Index, Follow</option>
                    <option value="index,nofollow">Index, No Follow</option>
                    <option value="noindex,nofollow">No Index, No Follow</option>
                  </select>
                </div>

                {/* TODO: Ajouter priority dans PageSEO type
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité sitemap
                  </label>
                  <select
                    value="0.5"
                    onChange={(e) => handleSEOChange('priority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="1.0">1.0 (Très haute)</option>
                    <option value="0.8">0.8 (Haute)</option>
                    <option value="0.5">0.5 (Normale)</option>
                    <option value="0.3">0.3 (Basse)</option>
                    <option value="0.1">0.1 (Très basse)</option>
                  </select>
                </div>
                */}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* SEO Criteria List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Analyse détaillée</h3>
                <button
                  onClick={runAIAnalysis}
                  disabled={isAnalyzing}
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyse...' : 'Relancer l\'analyse'}
                </button>
              </div>
              
              <div className="space-y-3">
                {seoAnalysis.criteria.map((criterion, index) => {
                  const Icon = criterion.icon;
                  return (
                    <div key={index} className="flex items-start p-3 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 mr-3">
                        {getStatusIcon(criterion.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Icon className="w-4 h-4 mr-2 text-gray-400" />
                          <h4 className="font-medium text-gray-900">{criterion.name}</h4>
                          <span className="ml-auto text-sm font-medium text-gray-500">
                            {criterion.score}/{criterion.maxScore} points
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{criterion.description}</p>
                        {criterion.details && (
                          <p className="text-xs text-gray-500 mt-1">{criterion.details}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <LightBulbIcon className="w-5 h-5 mr-2 text-yellow-500" />
                  Suggestions d'amélioration IA
                </h3>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      suggestion.type === 'error' ? 'bg-red-50 border-red-200' :
                      suggestion.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <h4 className="font-medium mb-1">{suggestion.title}</h4>
                      <p className="text-sm text-gray-700">{suggestion.description}</p>
                      {suggestion.action && (
                        <p className="text-sm mt-2 font-medium text-blue-600">
                          💡 {suggestion.action}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'generator' && (
          <div className="space-y-6">
            <ContentGenerator 
              pageId={pageId}
              onContentGenerated={(content, metadata) => {
                // Si c'est du contenu meta, mettre à jour les champs SEO
                if (metadata?.title || metadata?.description) {
                  if (metadata.title) {
                    handleSEOChange('title', metadata.title);
                  }
                  if (metadata.description) {
                    handleSEOChange('description', metadata.description);
                  }
                  // Basculer vers l'onglet éditeur pour voir les changements
                  setActiveTab('editor');
                }
              }}
            />
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="space-y-6">
            <SEOAutomation />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            {/* Google SERP Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                Aperçu dans Google
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-2">
                  <div className="text-sm text-green-700 mb-1">
                    {page.seo?.canonicalUrl || `https://monsite.fr${page.slug}`}
                  </div>
                  <h3 className="text-xl text-blue-800 hover:underline cursor-pointer">
                    {page.seo?.title || page.name || 'Titre de la page'}
                  </h3>
                </div>
                <p className="text-sm text-gray-700">
                  {page.seo?.description || 'Description de la page qui apparaîtra dans les résultats de recherche...'}
                </p>
              </div>
            </div>

            {/* Social Media Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                Aperçu sur les réseaux sociaux
              </h3>
              
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                {page.seo?.ogImage && (
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <PhotoIcon className="w-24 h-24 text-gray-400" />
                  </div>
                )}
                <div className="p-4 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">
                    {page.seo?.ogTitle || page.seo?.title || page.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {page.seo?.ogDescription || page.seo?.description || 'Description...'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new URL(page.seo?.canonicalUrl || 'https://monsite.fr').hostname}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
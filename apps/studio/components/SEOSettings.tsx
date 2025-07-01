import React, { useState } from 'react';
import { 
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  BoltIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { SimplifiedExportOptions } from '@/lib/services/static-export-simplified';

interface SEOSettingsProps {
  exportOptions: SimplifiedExportOptions;
  onUpdate: (options: SimplifiedExportOptions) => void;
}

export const SEOSettings: React.FC<SEOSettingsProps> = ({ exportOptions, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'analytics' | 'content' | 'advanced'>('general');
  const [options, setOptions] = useState<SimplifiedExportOptions>({
    enableAdvancedSEO: true,
    generateSEOContent: true,
    enableAnalytics: false,
    enableSEOMonitoring: true,
    enableImageOptimization: true,
    generateAMP: false,
    ...exportOptions
  });

  const handleOptionChange = (key: keyof SimplifiedExportOptions, value: any) => {
    const newOptions = { ...options, [key]: value };
    setOptions(newOptions);
    onUpdate(newOptions);
  };

  const seoScore = calculateSEOScore(options);

  return (
    <div className="space-y-6">
      {/* SEO Score */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-yellow-500" />
            Score SEO Global
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(seoScore / 100) * 352} 352`}
                className={seoScore >= 80 ? 'text-green-500' : seoScore >= 60 ? 'text-yellow-500' : 'text-red-500'}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{seoScore}</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold mb-2">
              {seoScore >= 80 ? 'Excellent !' : seoScore >= 60 ? 'Bon' : 'À améliorer'}
            </p>
            <p className="text-sm text-gray-600">
              {seoScore >= 80 
                ? 'Votre configuration SEO est optimale pour un référencement maximal.'
                : seoScore >= 60 
                ? 'Activez plus de fonctionnalités pour améliorer votre référencement.'
                : 'Plusieurs optimisations importantes sont désactivées.'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button 
              onClick={() => setActiveTab('general')}
              className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                activeTab === 'general'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Général
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('content')}
              className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                activeTab === 'content'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contenu
            </button>
            <button 
              onClick={() => setActiveTab('advanced')}
              className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                activeTab === 'advanced'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Avancé
            </button>
          </nav>
        </div>

        <div className="p-6 space-y-6">
          {/* General Tab Content */}
          {activeTab === 'general' && (
            <div className="space-y-6">
            {/* SEO Avancé */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h4 className="text-base font-semibold flex items-center gap-2">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  SEO Avancé
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Active les meta tags avancés, schema.org complet et l'optimisation technique
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="advanced-seo" className="text-sm font-medium text-gray-700">
                    SEO Avancé
                  </label>
                  <p className="text-sm text-gray-500">
                    Rich snippets, breadcrumbs, meta tags complets
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="advanced-seo"
                    checked={options.enableAdvancedSEO}
                    onChange={(e) => handleOptionChange('enableAdvancedSEO', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              {options.enableAdvancedSEO && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    <div className="ml-3 text-sm text-green-700">
                      <p>✓ Meta tags avancés</p>
                      <p>✓ Schema.org LocalBusiness</p>
                      <p>✓ Rich Snippets (FAQ, Reviews, Services)</p>
                      <p>✓ Breadcrumbs structurés</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Image Optimization */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h4 className="text-base font-semibold flex items-center gap-2">
                  <PhotoIcon className="w-5 h-5" />
                  Optimisation des Images
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Formats modernes, compression intelligente et lazy loading
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="image-opt" className="text-sm font-medium text-gray-700">
                    Optimisation Avancée
                  </label>
                  <p className="text-sm text-gray-500">
                    WebP, AVIF, srcset responsive
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="image-opt"
                    checked={options.enableImageOptimization}
                    onChange={(e) => handleOptionChange('enableImageOptimization', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            {/* SEO Monitoring */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="mb-4">
                <h4 className="text-base font-semibold flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5" />
                  Monitoring SEO
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Dashboard de suivi et rapports de performance
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label htmlFor="monitoring" className="text-sm font-medium text-gray-700">
                    Monitoring Actif
                  </label>
                  <p className="text-sm text-gray-500">
                    Core Web Vitals, erreurs SEO
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="monitoring"
                    checked={options.enableSEOMonitoring}
                    onChange={(e) => handleOptionChange('enableSEOMonitoring', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="text-base font-semibold flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5" />
                    Google Analytics 4
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Suivi des visiteurs et des conversions
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label htmlFor="analytics" className="text-sm font-medium text-gray-700">
                        Activer Google Analytics
                      </label>
                      <p className="text-sm text-gray-500">
                        Tracking avancé des performances
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="analytics"
                        checked={options.enableAnalytics}
                        onChange={(e) => handleOptionChange('enableAnalytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  {options.enableAnalytics && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GA4 Measurement ID
                      </label>
                      <input
                        type="text"
                        value={options.ga4MeasurementId || ''}
                        onChange={(e) => handleOptionChange('ga4MeasurementId', e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Trouvez cet ID dans votre compte Google Analytics
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="text-base font-semibold flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5" />
                    Génération de Contenu SEO
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Contenu optimisé généré par IA pour chaque page
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label htmlFor="content-gen" className="text-sm font-medium text-gray-700">
                      Génération Automatique
                    </label>
                    <p className="text-sm text-gray-500">
                      Textes optimisés pour le SEO local
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="content-gen"
                      checked={options.generateSEOContent}
                      onChange={(e) => handleOptionChange('generateSEOContent', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                {options.generateSEOContent && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex">
                      <SparklesIcon className="h-5 w-5 text-blue-400" />
                      <div className="ml-3 text-sm text-blue-700">
                        <p>✓ Textes uniques par ville de service</p>
                        <p>✓ Optimisation des mots-clés longue traîne</p>
                        <p>✓ FAQ générées automatiquement</p>
                        <p>✓ Contenu adapté au type de business</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <h4 className="text-base font-semibold flex items-center gap-2">
                    <BoltIcon className="w-5 h-5" />
                    Optimisations Avancées
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Options techniques pour les experts SEO
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label htmlFor="amp" className="text-sm font-medium text-gray-700">
                        Pages AMP
                      </label>
                      <p className="text-sm text-gray-500">
                        Version mobile ultra-rapide
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="amp"
                        checked={options.generateAMP}
                        onChange={(e) => handleOptionChange('generateAMP', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label htmlFor="sitemap" className="text-sm font-medium text-gray-700">
                        Sitemap XML
                      </label>
                      <p className="text-sm text-gray-500">
                        Plan du site pour les moteurs
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="sitemap"
                        checked={options.generateSitemap !== false}
                        onChange={(e) => handleOptionChange('generateSitemap', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label htmlFor="robots" className="text-sm font-medium text-gray-700">
                        Robots.txt
                      </label>
                      <p className="text-sm text-gray-500">
                        Directives pour les crawlers
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="robots"
                        checked={options.generateRobotsTxt !== false}
                        onChange={(e) => handleOptionChange('generateRobotsTxt', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {(options.generateSitemap || options.generateRobotsTxt) && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-600">
                    Les fichiers techniques seront générés automatiquement lors de l'export.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function calculateSEOScore(options: SimplifiedExportOptions): number {
  let score = 40; // Score de base

  if (options.enableAdvancedSEO) score += 20;
  if (options.enableAnalytics && options.ga4MeasurementId) score += 15;
  if (options.generateSEOContent) score += 15;
  if (options.enableImageOptimization) score += 10;
  if (options.enableSEOMonitoring) score += 10;
  if (options.generateAMP) score += 5;

  return Math.min(score, 100);
}
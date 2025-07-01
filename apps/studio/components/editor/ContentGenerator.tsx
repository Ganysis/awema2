'use client';

import React, { useState } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { 
  SparklesIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  CodeBracketIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

interface ContentGeneratorProps {
  pageId: string;
  onContentGenerated?: (content: string, metadata?: any) => void;
}

type ContentType = 'page' | 'section' | 'meta' | 'faq';
type ToneType = 'professional' | 'friendly' | 'technical' | 'casual';

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({ 
  pageId, 
  onContentGenerated 
}) => {
  const { businessInfo, pages } = useEditorStore();
  const page = pages.find(p => p.id === pageId);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState<ContentType>('section');
  const [tone, setTone] = useState<ToneType>('professional');
  const [prompt, setPrompt] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Veuillez décrire le contenu à générer');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedContent('');

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          context: {
            businessName: businessInfo?.companyName || 'Mon Entreprise',
            businessType: businessInfo?.industry?.category || 'services',
            service: page?.name || 'services',
            city: businessInfo?.location?.serviceArea?.[0] || '',
            targetKeywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
            tone,
            contentType,
            maxLength: contentType === 'meta' ? 200 : 1000
          },
          apiKey: apiKey || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la génération');
      }

      setGeneratedContent(data.content);
      
      if (data.error && data.error.includes('API Claude non configurée')) {
        setShowApiKeyInput(true);
      }

      if (onContentGenerated) {
        onContentGenerated(data.content, data.metadata);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de génération');
      console.error('Erreur:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const insertContent = () => {
    if (generatedContent && onContentGenerated) {
      onContentGenerated(generatedContent);
      setGeneratedContent('');
      setPrompt('');
    }
  };

  const contentTypeOptions = [
    { value: 'page', label: 'Page complète', icon: DocumentTextIcon },
    { value: 'section', label: 'Section', icon: ChatBubbleBottomCenterTextIcon },
    { value: 'meta', label: 'Meta SEO', icon: CodeBracketIcon },
    { value: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professionnel' },
    { value: 'friendly', label: 'Amical' },
    { value: 'technical', label: 'Technique' },
    { value: 'casual', label: 'Décontracté' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <SparklesIcon className="w-5 h-5 text-yellow-500" />
        Générateur de Contenu IA
      </h3>

      {showApiKeyInput && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800 mb-2">
            Pour utiliser Claude, entrez votre clé API Anthropic :
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              onClick={() => setShowApiKeyInput(false)}
              className="px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm"
            >
              Valider
            </button>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            Obtenez votre clé sur console.anthropic.com
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Type de contenu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de contenu
          </label>
          <div className="grid grid-cols-2 gap-2">
            {contentTypeOptions.map(option => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setContentType(option.value as ContentType)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md border transition-colors ${
                    contentType === option.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ton */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ton du contenu
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as ToneType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {toneOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Décrivez le contenu souhaité
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              contentType === 'page' ? "Ex: Page de services de plomberie avec focus sur les urgences" :
              contentType === 'section' ? "Ex: Paragraphe sur nos garanties et certifications" :
              contentType === 'meta' ? "Ex: Meta tags pour la page d'accueil" :
              "Ex: FAQ sur les tarifs et délais d'intervention"
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        {/* Mots-clés */}
        {contentType !== 'meta' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mots-clés à intégrer (optionnel)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="plombier, urgence, Paris, devis gratuit"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">Séparez par des virgules</p>
          </div>
        )}

        {/* Bouton générer */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Générer le contenu
            </>
          )}
        </button>

        {/* Erreur */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Contenu généré */}
        {generatedContent && (
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Contenu généré :</h4>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {generatedContent}
                </pre>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={insertContent}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <CheckIcon className="w-5 h-5" />
                Utiliser ce contenu
              </button>
              <button
                onClick={() => setGeneratedContent('')}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-700">
          💡 Le générateur utilise Claude AI si configuré, sinon des templates optimisés SEO
        </p>
      </div>
    </div>
  );
};
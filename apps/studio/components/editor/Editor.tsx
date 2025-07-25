'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEditorStore } from '@/lib/store/editor-store';
import { siteGenerator } from '@/lib/services/site-generator';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Toolbar } from './Toolbar';
import { PreviewModal } from './PreviewModal';
import { AIGenerationPanel } from './AIGenerationPanel';

interface EditorProps {
  projectId?: string;
  template?: string;
  theme?: string;
}

export function Editor({ projectId, template, theme = 'premium' }: EditorProps = {}) {
  const [showPreview, setShowPreview] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [currentClientData, setCurrentClientData] = useState<any>(null);
  const { isPreviewMode, setPreviewMode, clearBlocks, addBlock, setThemeVariant, updateColors, initializePages, setBusinessInfo } = useEditorStore();
  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId');
  const isGenerated = searchParams.get('generated') === 'true';
  const isAIGenerated = searchParams.get('ai') === 'true';
  const autoPreview = searchParams.get('preview') === 'true';
  
  useEffect(() => {
    // Si c'est un nouveau client généré par l'IA, charger les données
    if (clientId === 'new' && isGenerated && isAIGenerated && typeof window !== 'undefined') {
      const generatedSiteStr = sessionStorage.getItem('generatedSite');
      const clientDataStr = sessionStorage.getItem('newClientData');
      
      if (generatedSiteStr && clientDataStr) {
        try {
          const generatedSite = JSON.parse(generatedSiteStr);
          const clientData = JSON.parse(clientDataStr);
          setCurrentClientData(clientData);
          
          // Sauvegarder les infos business
          setBusinessInfo(clientData);
          
          // Appliquer le thème généré
          if (generatedSite.theme) {
            const { colors, typography } = generatedSite.theme;
            setThemeVariant('custom');
            updateColors({
              primary: colors.primary,
              secondary: colors.secondary,
              accent: colors.accent
            });
          }
          
          // Charger toutes les pages générées
          console.log('Structure du site généré:', generatedSite);
          
          const editorPages = [];
          
          // Si le site a des blocs (page d'accueil)
          if (generatedSite.blocks && generatedSite.blocks.length > 0) {
            console.log(`Page d'accueil trouvée avec ${generatedSite.blocks.length} blocs`);
            
            // Ajouter la page d'accueil
            editorPages.push({
              id: 'home',
              name: 'Accueil',
              slug: '/',
              blocks: generatedSite.blocks,
              meta: generatedSite.metadata || {
                title: clientData.businessInfo?.companyName || 'Accueil',
                description: clientData.businessInfo?.description || ''
              }
            });
          } else {
            console.warn('Aucun bloc trouvé pour la page d\'accueil');
          }
          
          // Si le site a d'autres pages
          if (generatedSite.pages && typeof generatedSite.pages === 'object') {
            console.log('Pages supplémentaires trouvées:', Object.keys(generatedSite.pages));
            
            Object.entries(generatedSite.pages).forEach(([slug, pageData]: [string, any]) => {
              if (pageData.blocks && pageData.blocks.length > 0) {
                editorPages.push({
                  id: crypto.randomUUID(),
                  name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
                  slug: `/${slug}`,
                  blocks: pageData.blocks,
                  meta: pageData.metadata || {}
                });
              }
            });
          }
          
          console.log(`Total de pages à initialiser: ${editorPages.length}`);
          
          // Initialiser toutes les pages
          if (editorPages.length > 0) {
            initializePages(editorPages);
            console.log('Pages initialisées avec succès');
          } else {
            console.error('Aucune page à initialiser !');
            // Créer une page d'accueil par défaut
            const defaultPage = {
              id: 'home',
              name: 'Accueil',
              slug: '/',
              blocks: [{
                id: crypto.randomUUID(),
                type: 'Hero V3 Perfect',
                props: {
                  variant: 'split-content',
                  title: clientData.businessInfo?.companyName || 'Bienvenue',
                  subtitle: clientData.businessInfo?.businessType ? 
                    `${clientData.businessInfo.businessType} à ${clientData.contact?.address?.city || ''}` : 
                    'Votre partenaire de confiance',
                  description: 'Site en cours de génération...',
                  primaryButton: { text: 'Contactez-nous', href: '#contact' }
                },
                children: []
              }],
              meta: {
                title: clientData.businessInfo?.companyName || 'Accueil',
                description: clientData.businessInfo?.description || ''
              }
            };
            initializePages([defaultPage]);
            console.log('Page par défaut créée');
          }
          
          // Configurer le header/footer global
          const { setGlobalHeader, setGlobalFooter } = useEditorStore.getState();
          
          // Si header global défini
          if (generatedSite.globalHeader) {
            console.log('Header global trouvé:', generatedSite.globalHeader);
            setGlobalHeader(generatedSite.globalHeader);
          }
          
          // Si footer global défini
          if (generatedSite.globalFooter) {
            console.log('Footer global trouvé:', generatedSite.globalFooter);
            setGlobalFooter(generatedSite.globalFooter);
          }
          
          // Nettoyer le sessionStorage pour libérer de la mémoire
          sessionStorage.removeItem('generatedSite');
          
          // Si preview auto demandé, l'activer
          if (autoPreview) {
            setShowPreview(true);
          }
        } catch (error) {
          console.error('Erreur lors du chargement du site généré:', error);
        }
      }
    }
    // Si c'est un nouveau client généré normalement (sans IA)
    else if (clientId === 'new' && isGenerated && !isAIGenerated && typeof window !== 'undefined') {
      const clientDataStr = sessionStorage.getItem('newClientData');
      if (clientDataStr) {
        try {
          const clientData = JSON.parse(clientDataStr);
          setCurrentClientData(clientData);
          
          // Générer le site à partir des données client
          const { blocks, pages, theme } = siteGenerator.generateSiteFromClient(clientData);
          
          // Sauvegarder les infos business
          setBusinessInfo(clientData);
          
          // Appliquer le thème
          setThemeVariant(theme.variant);
          updateColors(theme.colors);
          
          // Convertir les pages générées en format compatible avec le store
          const editorPages = [];
          
          // Ajouter la page principale
          editorPages.push({
            id: 'home',
            name: 'Accueil',
            slug: '/',
            blocks: blocks,
            meta: {
              title: `${clientData.businessName} - ${clientData.businessType}`,
              description: clientData.description || `${clientData.businessName} - Services professionnels de ${clientData.businessType} à ${clientData.city}`
            }
          });
          
          // Ajouter les autres pages générées
          pages.forEach((pageBlocks, slug) => {
            const pageName = getPageNameFromSlug(slug, clientData);
            editorPages.push({
              id: crypto.randomUUID(),
              name: pageName,
              slug: `/${slug}`,
              blocks: pageBlocks,
              meta: {
                title: pageName,
                description: `${pageName} - ${clientData.businessName}`
              }
            });
          });
          
          // Initialiser toutes les pages
          initializePages(editorPages);
          
          // Configurer Header et Footer globaux
          const { setGlobalHeader, setGlobalFooter } = useEditorStore.getState();
          
          // Créer le header simple
          setGlobalHeader({
            id: crypto.randomUUID(),
            type: 'simple-header',
            props: {
              logo: clientData.businessName,
              menuItems: [
                { label: 'Accueil', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' }
              ]
            },
            children: []
          });
          
          // Créer le footer simple
          setGlobalFooter({
            id: crypto.randomUUID(),
            type: 'simple-footer',
            props: {
              companyName: clientData.businessName,
              address: `${clientData.address}\n${clientData.postalCode} ${clientData.city}`,
              phone: clientData.phone,
              email: clientData.email,
              showAwemaLink: true
            },
            children: []
          });
          
          // Nettoyer sessionStorage
          sessionStorage.removeItem('newClientData');
          
          // Afficher un message de succès
          console.log('Site généré avec succès !');
        } catch (error) {
          console.error('Erreur lors de la génération du site:', error);
        }
      }
    }
    
    // Auto-ouvrir la preview si demandé
    if (autoPreview) {
      setShowPreview(true);
    }
  }, [clientId, isGenerated, autoPreview]);
  
  // Helper function pour générer le nom de la page à partir du slug
  const getPageNameFromSlug = (slug: string, clientData: any) => {
    // Services
    if (slug.startsWith('services/')) {
      const serviceName = slug.replace('services/', '');
      const service = clientData.services?.find((s: any) => 
        s.name.toLowerCase().replace(/\s+/g, '-') === serviceName
      );
      return service?.name || serviceName;
    }
    
    // Pages SEO locales
    if (slug.includes('/') && !slug.startsWith('services/')) {
      const [city, service] = slug.split('/');
      return `${city.charAt(0).toUpperCase() + city.slice(1)} - ${service.replace(/-/g, ' ')}`;
    }
    
    // Autres pages
    const pageNames: Record<string, string> = {
      'about': 'À propos',
      'gallery': 'Galerie',
      'faq': 'FAQ',
      'legal': 'Mentions légales'
    };
    
    return pageNames[slug] || slug;
  };

  // Callback quand la génération IA est terminée
  const handleAIGenerationComplete = (generatedSite: any) => {
    // Appliquer les pages générées
    if (generatedSite.site?.pages) {
      initializePages(generatedSite.site.pages);
    }
    
    // Appliquer le thème
    if (generatedSite.site?.theme) {
      const { colors } = generatedSite.site.theme;
      setThemeVariant('custom');
      updateColors({
        primary: colors.primary,
        secondary: colors.secondary
      });
    }
    
    // Fermer le panneau IA et ouvrir la preview
    setShowAIPanel(false);
    setShowPreview(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Toolbar */}
      <Toolbar onPreview={() => setShowPreview(true)} projectId={projectId} />
      
      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Block Library */}
        <Sidebar onAIGenerate={() => setShowAIPanel(true)} />
        
        {/* Center - Canvas */}
        <Canvas />
        
        {/* Right Panel - Properties or AI Panel */}
        {showAIPanel ? (
          <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => setShowAIPanel(false)}
                className="mb-4 text-sm text-gray-600 hover:text-gray-900"
              >
                ← Retour aux propriétés
              </button>
              {currentClientData && (
                <AIGenerationPanel
                  clientData={currentClientData}
                  onGenerationComplete={handleAIGenerationComplete}
                />
              )}
            </div>
          </div>
        ) : (
          <PropertiesPanel projectId={projectId} />
        )}
      </div>
      
      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal onClose={() => setShowPreview(false)} projectId={projectId} />
      )}
    </div>
  );
}
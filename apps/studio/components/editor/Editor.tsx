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

interface EditorProps {
  projectId?: string;
  template?: string;
  theme?: string;
}

export function Editor({ projectId, template, theme = 'premium' }: EditorProps = {}) {
  const [showPreview, setShowPreview] = useState(false);
  const { isPreviewMode, setPreviewMode, clearBlocks, addBlock, setThemeVariant, updateColors, initializePages, setBusinessInfo } = useEditorStore();
  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId');
  const isGenerated = searchParams.get('generated') === 'true';
  const autoPreview = searchParams.get('preview') === 'true';
  
  useEffect(() => {
    // Si c'est un nouveau client généré, charger les données
    if (clientId === 'new' && isGenerated && typeof window !== 'undefined') {
      const clientDataStr = sessionStorage.getItem('newClientData');
      if (clientDataStr) {
        try {
          const clientData = JSON.parse(clientDataStr);
          
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Toolbar */}
      <Toolbar onPreview={() => setShowPreview(true)} />
      
      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Block Library */}
        <Sidebar />
        
        {/* Center - Canvas */}
        <Canvas />
        
        {/* Right Panel - Properties */}
        <PropertiesPanel />
      </div>
      
      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}
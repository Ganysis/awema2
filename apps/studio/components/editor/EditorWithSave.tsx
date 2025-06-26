'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEditorStore } from '@/lib/store/editor-store';
import { siteGenerator } from '@/lib/services/site-generator';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Toolbar } from './Toolbar';
import { PreviewModal } from './PreviewModal';
import { CheckIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface EditorProps {
  projectId?: string;
  template?: string;
  theme?: string;
}

export function EditorWithSave({ projectId, template, theme = 'premium' }: EditorProps = {}) {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  const { 
    isPreviewMode, 
    setPreviewMode, 
    clearBlocks, 
    addBlock, 
    setThemeVariant, 
    updateColors, 
    initializePages, 
    setBusinessInfo,
    pages,
    theme: currentTheme,
    businessInfo,
    projectName,
    setProjectName,
    globalHeader,
    globalFooter,
    setGlobalHeader,
    setGlobalFooter,
    setSaving,
    isSaving
  } = useEditorStore();
  
  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId');
  const isGenerated = searchParams.get('generated') === 'true';
  const autoPreview = searchParams.get('preview') === 'true';

  // Fonction pour sauvegarder le projet
  const saveProject = useCallback(async () => {
    if (!projectId) return;
    
    setSaveStatus('saving');
    setSaving(true);
    
    try {
      const response = await fetch(`/api/projects/${projectId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            businessInfo,
            projectName,
            globalHeader,
            globalFooter,
            pages,
            theme: currentTheme,
          },
        }),
      });
      
      if (response.ok) {
        setLastSaved(new Date());
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  }, [projectId, businessInfo, projectName, globalHeader, globalFooter, pages, currentTheme, setSaving]);

  // Fonction pour charger le projet
  const loadProject = async () => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const project = data.data;
        
        // Si le projet a des données sauvegardées
        if (project.data) {
          const savedData = typeof project.data === 'string' ? JSON.parse(project.data) : project.data;
          
          // Restaurer les données
          if (savedData.businessInfo) setBusinessInfo(savedData.businessInfo);
          if (savedData.projectName) setProjectName(savedData.projectName);
          if (savedData.globalHeader) setGlobalHeader(savedData.globalHeader);
          if (savedData.globalFooter) setGlobalFooter(savedData.globalFooter);
          if (savedData.pages) initializePages(savedData.pages);
          if (savedData.theme) {
            setThemeVariant(savedData.theme.variant);
            if (savedData.theme.colors) updateColors(savedData.theme.colors);
          }
        } else {
          // Si pas de données sauvegardées, initialiser avec le template
          initializeWithTemplate();
        }
        
        // Définir le nom du projet
        if (project.name) setProjectName(project.name);
      }
    } catch (error) {
      console.error('Error loading project:', error);
      // En cas d'erreur, initialiser avec le template
      initializeWithTemplate();
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour initialiser avec le template
  const initializeWithTemplate = () => {
    if (template && theme) {
      setThemeVariant(theme as any);
      // Initialiser avec des pages par défaut selon le template
      initializePages([{
        id: 'home',
        name: 'Accueil',
        slug: '/',
        blocks: []
      }]);
      
      // Créer un header et footer par défaut
      setGlobalHeader({
        id: crypto.randomUUID(),
        type: 'simple-header',
        props: {
          logo: projectName || 'Mon Site',
          menuItems: [
            { label: 'Accueil', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Contact', href: '/contact' }
          ]
        },
        children: []
      });
      
      setGlobalFooter({
        id: crypto.randomUUID(),
        type: 'simple-footer',
        props: {
          companyName: projectName || 'Mon Entreprise',
          showAwemaLink: true
        },
        children: []
      });
    }
  };

  // Charger le projet au montage
  useEffect(() => {
    if (projectId) {
      loadProject();
    } else if (clientId === 'new' && isGenerated && typeof window !== 'undefined') {
      // Code existant pour la génération depuis les données client
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
          
          setLoading(false);
        } catch (error) {
          console.error('Erreur lors de la génération du site:', error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    
    // Auto-ouvrir la preview si demandé
    if (autoPreview) {
      setShowPreview(true);
    }
  }, [projectId]);

  // Auto-save toutes les 30 secondes
  useEffect(() => {
    if (!projectId || loading) return;
    
    const interval = setInterval(() => {
      saveProject();
    }, 30000); // 30 secondes
    
    return () => clearInterval(interval);
  }, [projectId, loading, saveProject]);

  // Sauvegarder avant de quitter la page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (projectId && !isSaving) {
        saveProject();
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [projectId, isSaving, saveProject]);

  // Raccourci clavier pour sauvegarder (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveProject]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'éditeur...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Toolbar 
          onPreview={() => setShowPreview(true)}
          projectId={projectId}
          saveStatus={
            <div className="flex items-center space-x-2">
              {saveStatus === 'saving' && (
                <>
                  <CloudArrowUpIcon className="w-5 h-5 text-gray-500 animate-pulse" />
                  <span className="text-sm text-gray-500">Sauvegarde...</span>
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500">Sauvegardé</span>
                </>
              )}
              {saveStatus === 'error' && (
                <span className="text-sm text-red-500">Erreur de sauvegarde</span>
              )}
              {lastSaved && saveStatus === 'idle' && (
                <span className="text-sm text-gray-400">
                  Dernière sauvegarde : {lastSaved.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          }
        />
        
        <div className="flex-1 overflow-hidden">
          <Canvas />
        </div>
      </div>
      
      <PropertiesPanel />
      
      {showPreview && (
        <PreviewModal onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEditorStore } from '@/lib/store/editor-store';
import { siteGenerator } from '@/lib/services/site-generator';
import { DBVersionHistoryService } from '@/lib/services/version-history-db.service';
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
  isGenerated?: boolean;
}

export function EditorWithSave({ projectId, template, theme = 'premium', isGenerated = false }: EditorProps = {}) {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const versionServiceRef = useRef<DBVersionHistoryService | null>(null);
  const hasLoadedRef = useRef(false);
  
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
  const autoPreview = searchParams.get('preview') === 'true';

  // Fonction pour sauvegarder le projet
  const saveProject = useCallback(async () => {
    if (!projectId) return;
    
    setSaveStatus('saving');
    setSaving(true);
    
    try {
      const projectData = {
        businessInfo,
        projectName,
        globalHeader,
        globalFooter,
        pages,
        theme: currentTheme,
      };
      
      console.log('Données à sauvegarder:', {
        businessInfo: !!businessInfo,
        projectName,
        globalHeader: !!globalHeader,
        globalFooter: !!globalFooter,
        pagesCount: pages.length,
        pages: pages.map(p => ({ id: p.id, name: p.name, blocksCount: p.blocks?.length || 0 }))
      });

      // Sauvegarder dans la base de données
      const response = await fetch(`/api/projects/${projectId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: projectData }),
      });
      
      if (response.ok) {
        setLastSaved(new Date());
        setSaveStatus('saved');
        
        // Créer une version manuelle
        if (versionServiceRef.current) {
          await versionServiceRef.current.saveVersion(
            projectData,
            'manual',
            'Sauvegarde manuelle'
          );
        }
        
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

  // Initialiser le service de versioning
  useEffect(() => {
    if (projectId) {
      versionServiceRef.current = new DBVersionHistoryService({
        projectId,
        storageKey: `version-history-${projectId}`,
        syncEnabled: false, // TODO: Réactiver quand l'authentification sera implémentée
      });

      // Démarrer l'auto-save avec versioning
      versionServiceRef.current.startAutoSave(() => ({
        businessInfo,
        projectName,
        globalHeader,
        globalFooter,
        pages,
        theme: currentTheme,
      }));

      return () => {
        versionServiceRef.current?.stopAutoSave();
      };
    }
  }, [projectId]);

  // Charger le projet au montage
  useEffect(() => {
    console.log('EditorWithSave montage - isGenerated:', isGenerated, 'projectId:', projectId);
    
    // Éviter le double chargement
    if (hasLoadedRef.current) {
      console.log('Déjà chargé via le ref, on skip');
      return;
    }
    
    // Priorité au site généré depuis le formulaire si isGenerated est true
    if (isGenerated && typeof window !== 'undefined') {
      console.log('Tentative de chargement du site généré depuis sessionStorage...');
      // Charger le site généré depuis sessionStorage
      const generatedSiteStr = sessionStorage.getItem('generatedSite');
      const clientDataStr = sessionStorage.getItem('newClientData');
      
      console.log('Session Storage - generatedSite existe:', !!generatedSiteStr);
      console.log('Session Storage - newClientData existe:', !!clientDataStr);
      
      if (generatedSiteStr && clientDataStr) {
        try {
          const generatedSite = JSON.parse(generatedSiteStr);
          const clientData = JSON.parse(clientDataStr);
          
          console.log('Chargement du site généré:', generatedSite);
          console.log('Blocs page accueil:', generatedSite.blocks?.length);
          console.log('Pages additionnelles:', Object.keys(generatedSite.pages || {}));
          
          // Sauvegarder les infos business
          setBusinessInfo(clientData.businessInfo || clientData);
          
          // Appliquer le thème
          if (generatedSite.theme) {
            setThemeVariant(generatedSite.theme.variant || 'premium');
            if (generatedSite.theme.colors) {
              updateColors(generatedSite.theme.colors);
            }
          }
          
          // Convertir les pages générées en format compatible avec le store
          const editorPages = [];
          
          // Ajouter la page principale
          if (generatedSite.blocks && generatedSite.blocks.length > 0) {
            editorPages.push({
              id: 'home',
              name: 'Accueil',
              slug: '/',
              blocks: generatedSite.blocks,
              meta: generatedSite.metadata || {
                title: `${clientData.businessInfo?.companyName || 'Mon Site'}`,
                description: clientData.businessInfo?.description || 'Site web professionnel'
              }
            });
          }
          
          // Ajouter les autres pages générées
          if (generatedSite.pages) {
            Object.entries(generatedSite.pages).forEach(([slug, pageData]: [string, any]) => {
              const pageName = getPageNameFromSlug(slug, clientData);
              editorPages.push({
                id: crypto.randomUUID(),
                name: pageName,
                slug: `/${slug}`,
                blocks: pageData.blocks || [],
                meta: pageData.metadata || {
                  title: pageName,
                  description: `${pageName} - ${clientData.businessInfo?.companyName || 'Mon Site'}`
                }
              });
            });
          }
          
          // Initialiser toutes les pages
          if (editorPages.length > 0) {
            console.log('Initialisation des pages avec:', editorPages);
            console.log('Nombre de pages:', editorPages.length);
            console.log('Pages:', editorPages.map(p => ({ id: p.id, name: p.name, blocks: p.blocks.length })));
            initializePages(editorPages);
          } else {
            // Fallback : créer une page d'accueil par défaut si aucune page n'a été générée
            console.warn('Aucune page générée, création d\'une page par défaut');
            
            const defaultBlocks = [
              {
                id: crypto.randomUUID(),
                type: 'Hero V3 Perfect',
                props: {
                  variant: 'split-content',
                  title: clientData.businessInfo?.companyName || 'Bienvenue',
                  subtitle: 'Votre partenaire de confiance',
                  description: clientData.businessInfo?.description || 'Nous sommes là pour vous servir',
                  primaryButton: {
                    text: 'Contactez-nous',
                    href: '#contact'
                  }
                },
                children: []
              },
              {
                id: crypto.randomUUID(),
                type: 'Services V3 Perfect',
                props: {
                  variant: 'cards-hover',
                  title: 'Nos Services',
                  subtitle: 'Ce que nous proposons'
                },
                children: []
              },
              {
                id: crypto.randomUUID(),
                type: 'Contact V3 Perfect',
                props: {
                  variant: 'split-map',
                  title: 'Contactez-nous',
                  companyName: clientData.businessInfo?.companyName || 'Mon Entreprise',
                  phone: clientData.contact?.phones?.[0]?.number || '01 02 03 04 05',
                  email: clientData.contact?.email || 'contact@example.com',
                  address: clientData.location?.address || '123 rue Example'
                },
                children: []
              }
            ];
            
            initializePages([{
              id: 'home',
              name: 'Accueil',
              slug: '/',
              blocks: defaultBlocks,
              meta: {
                title: clientData.businessInfo?.companyName || 'Mon Site',
                description: 'Site web professionnel'
              }
            }]);
          }
          
          // Configurer Header et Footer globaux
          if (generatedSite.globalHeader) {
            setGlobalHeader(generatedSite.globalHeader);
          } else {
            // Header par défaut
            setGlobalHeader({
              id: crypto.randomUUID(),
              type: 'Header V3 Perfect',
              props: {
                visualVariant: 'modern',
                companyName: clientData.businessInfo?.companyName || 'Mon Entreprise',
                brandingType: 'text',
                stickyEnabled: true,
                menuItem1_label: 'Accueil',
                menuItem1_href: '/',
                menuItem2_label: 'Services',
                menuItem2_href: '#services',
                menuItem3_label: 'Contact',
                menuItem3_href: '#contact',
                ctaEnabled: true,
                ctaText: 'Devis gratuit',
                ctaHref: '#contact'
              },
              children: []
            });
          }
          
          if (generatedSite.globalFooter) {
            setGlobalFooter(generatedSite.globalFooter);
          } else {
            // Footer par défaut
            setGlobalFooter({
              id: crypto.randomUUID(),
              type: 'Footer V3 Perfect',
              props: {
                variant: 'modern',
                companyName: clientData.businessInfo?.companyName || 'Mon Entreprise',
                description: 'Votre partenaire de confiance',
                addressTitle: 'Adresse',
                addressLine1: clientData.location?.address || '123 rue Example',
                addressLine2: `${clientData.location?.postalCode || '75000'} ${clientData.location?.city || 'Paris'}`,
                phoneTitle: 'Téléphone',
                phoneNumber: clientData.contact?.phones?.[0]?.number || '01 02 03 04 05',
                emailTitle: 'Email',
                emailAddress: clientData.contact?.email || 'contact@example.com',
                showSocialLinks: false,
                showNewsletter: false
              },
              children: []
            });
          }
          
          // Si on a un projectId, sauvegarder automatiquement
          if (projectId) {
            console.log('Sauvegarde automatique programmée dans 3 secondes...');
            console.log('Pages à sauvegarder:', editorPages);
            setTimeout(() => {
              console.log('Exécution de la sauvegarde automatique...');
              const currentPages = useEditorStore.getState().pages;
              console.log('État actuel des pages dans le store:', currentPages);
              console.log('Nombre de pages:', currentPages.length);
              if (currentPages.length === 0) {
                console.error('ATTENTION: Aucune page dans le store lors de la sauvegarde !');
              }
              saveProject();
              
              // Nettoyer sessionStorage APRÈS la sauvegarde
              console.log('Nettoyage de sessionStorage après sauvegarde...');
              sessionStorage.removeItem('generatedSite');
              sessionStorage.removeItem('newClientData');
            }, 3000); // Augmenté à 3 secondes
          }
          
          hasLoadedRef.current = true;
          setLoading(false);
        } catch (error) {
          console.error('Erreur lors du chargement du site généré:', error);
          hasLoadedRef.current = true;
          setLoading(false);
        }
      } else {
        console.log('Pas de site généré trouvé dans sessionStorage');
        // Si pas de site généré mais qu'on a un projectId, charger depuis la DB
        if (projectId) {
          loadProject();
        } else {
          setLoading(false);
        }
      }
    } else if (projectId) {
      // Si ce n'est pas un site généré, charger depuis la DB
      loadProject();
    } else {
      setLoading(false);
    }
    
    // Auto-ouvrir la preview si demandé
    if (autoPreview) {
      setShowPreview(true);
    }
  }, [projectId, isGenerated]);

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
      // Vérifier si services existe et est un array
      if (Array.isArray(clientData.services)) {
        const service = clientData.services.find((s: any) => 
          s.name?.toLowerCase().replace(/\s+/g, '-') === serviceName
        );
        return service?.name || serviceName.replace(/-/g, ' ');
      }
      // Sinon, juste formater le nom
      return serviceName.replace(/-/g, ' ');
    }
    
    // Pages SEO locales
    if (slug.includes('/') && !slug.startsWith('services/')) {
      const [city, service] = slug.split('/');
      return `${city.charAt(0).toUpperCase() + city.slice(1)} - ${service.replace(/-/g, ' ')}`;
    }
    
    // Autres pages avec meilleurs noms
    const pageNames: Record<string, string> = {
      'about': 'À propos',
      'gallery': 'Galerie',
      'faq': 'FAQ',
      'legal': 'Mentions légales',
      'avant-apres': 'Avant/Après',
      'devis': 'Devis gratuit',
      'contact': 'Contact',
      'realisations': 'Réalisations',
      'temoignages': 'Témoignages'
    };
    
    return pageNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
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
      
      <PropertiesPanel projectId={projectId} />
      
      {showPreview && (
        <PreviewModal onClose={() => setShowPreview(false)} projectId={projectId} />
      )}
    </div>
  );
}
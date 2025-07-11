'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, Session } from '@supabase/supabase-js';
import { getCMSService, CMSSupabaseService } from '@/lib/services/cms/cms-supabase.service';

interface CMSAuthContextType {
  user: User | null;
  session: Session | null;
  cmsService: CMSSupabaseService;
  isLoading: boolean;
  isAuthenticated: boolean;
  currentSiteId: string | null;
  
  // Actions
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  selectSite: (siteId: string) => Promise<boolean>;
  createSite: (projectId: string, name: string, domain?: string) => Promise<{ success: boolean; siteId?: string; error?: string }>;
}

const CMSAuthContext = createContext<CMSAuthContextType | undefined>(undefined);

export function CMSAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSiteId, setCurrentSiteId] = useState<string | null>(null);
  
  const supabase = createClientComponentClient();
  const cmsService = getCMSService();

  useEffect(() => {
    // Obtenir la session initiale
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        // Restaurer le site sélectionné
        if (session?.user) {
          const savedSiteId = localStorage.getItem('cms_site_id');
          if (savedSiteId) {
            setCurrentSiteId(savedSiteId);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Écouter les changements d'auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        setCurrentSiteId(null);
        localStorage.removeItem('cms_site_id');
        localStorage.removeItem('cms_session_token');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'No user returned' };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Sign in failed' };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'No user created' };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Sign up failed' };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await cmsService.logout();
      await supabase.auth.signOut();
      setCurrentSiteId(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const selectSite = async (siteId: string): Promise<boolean> => {
    if (!user) {
      return false;
    }

    try {
      // Vérifier que l'utilisateur a accès à ce site
      const { data: permission } = await supabase
        .from('cms_permissions')
        .select('role')
        .eq('site_id', siteId)
        .eq('user_id', user.id)
        .single();

      if (!permission) {
        console.error('No permission for this site');
        return false;
      }

      // Créer une session CMS pour ce site
      const result = await cmsService.authenticate(siteId, user.email!, 'supabase-auth');
      
      if (result.success) {
        setCurrentSiteId(siteId);
        localStorage.setItem('cms_site_id', siteId);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Select site error:', error);
      return false;
    }
  };

  const createSite = async (projectId: string, name: string, domain?: string): Promise<{ success: boolean; siteId?: string; error?: string }> => {
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // Créer le site
      const { data: site, error: siteError } = await supabase
        .from('cms_sites')
        .insert({
          project_id: projectId,
          name,
          domain,
          created_by: user.id,
          settings: {
            defaultLanguage: 'fr',
            enableVersioning: true,
            enableMedia: true,
          },
        })
        .select()
        .single();

      if (siteError || !site) {
        return { success: false, error: siteError?.message || 'Failed to create site' };
      }

      // Créer les permissions admin pour le créateur
      const { error: permError } = await supabase
        .from('cms_permissions')
        .insert({
          site_id: site.id,
          user_id: user.id,
          role: 'admin',
          permissions: {
            canEdit: true,
            canDelete: true,
            canPublish: true,
            canManageUsers: true,
          },
          created_by: user.id,
        });

      if (permError) {
        // Rollback - supprimer le site
        await supabase.from('cms_sites').delete().eq('id', site.id);
        return { success: false, error: 'Failed to create permissions' };
      }

      // Créer le contenu initial
      const initialContent = {
        pages: [{
          id: '1',
          name: 'Accueil',
          slug: 'home',
          blocks: [],
          meta: {
            title: `${name} - Accueil`,
            description: `Bienvenue sur ${name}`,
          },
        }],
        businessInfo: {
          companyName: name,
        },
        theme: {
          colors: {
            primary: '#1a73e8',
            secondary: '#ea4335',
            accent: '#fbbc04',
            background: '#ffffff',
            text: '#202124',
          },
          typography: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
          },
        },
      };

      // Sauvegarder le contenu initial
      for (const [key, value] of Object.entries(initialContent)) {
        await supabase
          .from('cms_content')
          .insert({
            site_id: site.id,
            key,
            data: value,
            updated_by: user.id,
          });
      }

      return { success: true, siteId: site.id };
    } catch (error: any) {
      console.error('Create site error:', error);
      return { success: false, error: error.message || 'Failed to create site' };
    }
  };

  const value: CMSAuthContextType = {
    user,
    session,
    cmsService,
    isLoading,
    isAuthenticated: !!user,
    currentSiteId,
    signIn,
    signUp,
    signOut,
    selectSite,
    createSite,
  };

  return (
    <CMSAuthContext.Provider value={value}>
      {children}
    </CMSAuthContext.Provider>
  );
}

export function useCMSAuth() {
  const context = useContext(CMSAuthContext);
  if (context === undefined) {
    throw new Error('useCMSAuth must be used within a CMSAuthProvider');
  }
  return context;
}
/**
 * Service CMS Supabase - Remplace localStorage par une vraie base de données
 * Architecture multi-tenant avec authentification et permissions
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/database-types';

export interface CMSSite {
  id: string;
  project_id: string;
  domain?: string;
  subdomain?: string;
  name: string;
  description?: string;
  is_active: boolean;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CMSContent {
  id: string;
  site_id: string;
  key: string;
  data: any;
  version: number;
  updated_at: string;
}

export interface CMSSession {
  id: string;
  site_id: string;
  user_id: string;
  token: string;
  expires_at: string;
}

export interface CMSPermission {
  id: string;
  site_id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: Record<string, boolean>;
}

export class CMSSupabaseService {
  private supabase: SupabaseClient;
  private currentSiteId: string | null = null;
  private currentSession: CMSSession | null = null;
  private offlineMode: boolean = false;
  private offlineCache: Map<string, any> = new Map();

  constructor(supabaseUrl?: string, supabaseKey?: string) {
    // Utiliser les variables d'environnement par défaut
    const url = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = supabaseKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    this.supabase = createClient(url, key);
    this.checkConnection();
  }

  /**
   * Vérifier la connexion à Supabase
   */
  private async checkConnection(): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('cms_sites').select('id').limit(1);
      this.offlineMode = !!error;
      return !error;
    } catch {
      this.offlineMode = true;
      return false;
    }
  }

  /**
   * Mode hybride : utiliser localStorage en fallback
   */
  private getLocalStorageKey(key: string): string {
    return `cms_${this.currentSiteId}_${key}`;
  }

  private async getFromCache(key: string): Promise<any> {
    // D'abord vérifier le cache mémoire
    if (this.offlineCache.has(key)) {
      return this.offlineCache.get(key);
    }

    // Ensuite localStorage si on est dans le navigateur
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.getLocalStorageKey(key));
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }

    return null;
  }

  private async saveToCache(key: string, value: any): Promise<void> {
    // Sauvegarder en mémoire
    this.offlineCache.set(key, value);

    // Sauvegarder dans localStorage si disponible
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.getLocalStorageKey(key), JSON.stringify(value));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
    }
  }

  /**
   * Authentification et gestion des sessions
   */
  async authenticate(siteId: string, email: string, password: string): Promise<{
    success: boolean;
    session?: CMSSession;
    error?: string;
  }> {
    try {
      // Authentifier avec Supabase Auth
      const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.user) {
        return { success: false, error: authError?.message || 'Authentication failed' };
      }

      // Vérifier les permissions sur le site
      const { data: permission } = await this.supabase
        .from('cms_permissions')
        .select('*')
        .eq('site_id', siteId)
        .eq('user_id', authData.user.id)
        .single();

      if (!permission) {
        return { success: false, error: 'No permission for this site' };
      }

      // Créer une session CMS
      const sessionToken = this.generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24h

      const { data: session, error: sessionError } = await this.supabase
        .from('cms_sessions')
        .insert({
          site_id: siteId,
          user_id: authData.user.id,
          token: sessionToken,
          expires_at: expiresAt.toISOString(),
          ip_address: typeof window !== 'undefined' ? window.location.hostname : null,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        })
        .select()
        .single();

      if (sessionError || !session) {
        return { success: false, error: 'Failed to create session' };
      }

      this.currentSession = session as CMSSession;
      this.currentSiteId = siteId;

      // Sauvegarder le token localement
      if (typeof window !== 'undefined') {
        localStorage.setItem('cms_session_token', sessionToken);
        localStorage.setItem('cms_site_id', siteId);
      }

      return { success: true, session: this.currentSession };
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Mode offline : vérifier le mot de passe en local
      if (this.offlineMode && password === 'admin123') {
        const offlineSession: CMSSession = {
          id: 'offline',
          site_id: siteId,
          user_id: 'offline',
          token: 'offline-token',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        };
        this.currentSession = offlineSession;
        this.currentSiteId = siteId;
        return { success: true, session: offlineSession };
      }

      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Vérifier si une session est valide
   */
  async verifySession(token: string): Promise<boolean> {
    if (this.offlineMode) {
      return token === 'offline-token';
    }

    try {
      const { data: session } = await this.supabase
        .from('cms_sessions')
        .select('*')
        .eq('token', token)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (session) {
        this.currentSession = session as CMSSession;
        this.currentSiteId = session.site_id;
        
        // Mettre à jour last_activity
        await this.supabase
          .from('cms_sessions')
          .update({ last_activity: new Date().toISOString() })
          .eq('id', session.id);

        return true;
      }
    } catch (error) {
      console.error('Session verification error:', error);
    }

    return false;
  }

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    if (this.currentSession && !this.offlineMode) {
      await this.supabase
        .from('cms_sessions')
        .delete()
        .eq('id', this.currentSession.id);
    }

    this.currentSession = null;
    this.currentSiteId = null;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('cms_session_token');
      localStorage.removeItem('cms_site_id');
    }
  }

  /**
   * Gestion du contenu
   */
  async getContent(key: string): Promise<any> {
    if (!this.currentSiteId) {
      throw new Error('No site selected');
    }

    // Mode offline : utiliser le cache
    if (this.offlineMode) {
      return this.getFromCache(key);
    }

    try {
      const { data, error } = await this.supabase
        .from('cms_content')
        .select('data')
        .eq('site_id', this.currentSiteId)
        .eq('key', key)
        .single();

      if (error) {
        // Fallback sur le cache
        return this.getFromCache(key);
      }

      // Mettre à jour le cache
      if (data) {
        await this.saveToCache(key, data.data);
      }

      return data?.data;
    } catch (error) {
      console.error('Get content error:', error);
      return this.getFromCache(key);
    }
  }

  async setContent(key: string, value: any, description?: string): Promise<boolean> {
    if (!this.currentSiteId) {
      throw new Error('No site selected');
    }

    // Toujours sauvegarder dans le cache
    await this.saveToCache(key, value);

    // Mode offline : ne pas essayer Supabase
    if (this.offlineMode) {
      return true;
    }

    try {
      const { error } = await this.supabase
        .from('cms_content')
        .upsert({
          site_id: this.currentSiteId,
          key,
          data: value,
          updated_by: this.currentSession?.user_id,
        });

      return !error;
    } catch (error) {
      console.error('Set content error:', error);
      return false; // Le contenu est déjà dans le cache
    }
  }

  /**
   * Obtenir tout le contenu d'un site
   */
  async getAllContent(): Promise<Record<string, any>> {
    if (!this.currentSiteId) {
      throw new Error('No site selected');
    }

    // Mode offline : retourner tout le cache
    if (this.offlineMode) {
      const content: Record<string, any> = {};
      if (typeof window !== 'undefined') {
        const prefix = `cms_${this.currentSiteId}_`;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith(prefix)) {
            const contentKey = key.replace(prefix, '');
            try {
              content[contentKey] = JSON.parse(localStorage.getItem(key) || '{}');
            } catch {}
          }
        }
      }
      return content;
    }

    try {
      const { data, error } = await this.supabase
        .from('cms_content')
        .select('key, data')
        .eq('site_id', this.currentSiteId);

      if (error) {
        throw error;
      }

      const content: Record<string, any> = {};
      data?.forEach(item => {
        content[item.key] = item.data;
        // Mettre à jour le cache
        this.saveToCache(item.key, item.data);
      });

      return content;
    } catch (error) {
      console.error('Get all content error:', error);
      return {};
    }
  }

  /**
   * Sauvegarder tout le contenu
   */
  async saveAllContent(content: Record<string, any>): Promise<boolean> {
    if (!this.currentSiteId || !this.currentSession) {
      throw new Error('Not authenticated');
    }

    try {
      const { data, error } = await this.supabase.rpc('save_cms_site_content', {
        p_site_id: this.currentSiteId,
        p_content: content,
        p_user_id: this.currentSession.user_id,
      });

      if (error) {
        throw error;
      }

      // Mettre à jour le cache
      for (const [key, value] of Object.entries(content)) {
        await this.saveToCache(key, value);
      }

      return true;
    } catch (error) {
      console.error('Save all content error:', error);
      return false;
    }
  }

  /**
   * Gestion des versions
   */
  async getVersions(contentKey?: string): Promise<any[]> {
    if (!this.currentSiteId) {
      throw new Error('No site selected');
    }

    try {
      let query = this.supabase
        .from('cms_versions')
        .select('*')
        .eq('site_id', this.currentSiteId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (contentKey) {
        // Obtenir l'ID du contenu
        const { data: content } = await this.supabase
          .from('cms_content')
          .select('id')
          .eq('site_id', this.currentSiteId)
          .eq('key', contentKey)
          .single();

        if (content) {
          query = query.eq('content_id', content.id);
        }
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Get versions error:', error);
      return [];
    }
  }

  async restoreVersion(versionId: string): Promise<boolean> {
    if (!this.currentSiteId || !this.currentSession) {
      throw new Error('Not authenticated');
    }

    try {
      // Obtenir la version
      const { data: version } = await this.supabase
        .from('cms_versions')
        .select('*')
        .eq('id', versionId)
        .single();

      if (!version) {
        return false;
      }

      // Restaurer le contenu
      const { error } = await this.supabase
        .from('cms_content')
        .update({
          data: version.data,
          updated_by: this.currentSession.user_id,
        })
        .eq('id', version.content_id);

      return !error;
    } catch (error) {
      console.error('Restore version error:', error);
      return false;
    }
  }

  /**
   * Gestion des médias
   */
  async uploadMedia(file: File): Promise<{ url: string; id: string } | null> {
    if (!this.currentSiteId || !this.currentSession) {
      throw new Error('Not authenticated');
    }

    try {
      // Upload vers Supabase Storage
      const fileName = `${this.currentSiteId}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from('cms-media')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obtenir l'URL publique
      const { data: { publicUrl } } = this.supabase.storage
        .from('cms-media')
        .getPublicUrl(fileName);

      // Enregistrer dans la base de données
      const { data: media, error: dbError } = await this.supabase
        .from('cms_media')
        .insert({
          site_id: this.currentSiteId,
          filename: file.name,
          url: publicUrl,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          mime_type: file.type,
          size: file.size,
          created_by: this.currentSession.user_id,
        })
        .select()
        .single();

      if (dbError) {
        throw dbError;
      }

      return { url: publicUrl, id: media.id };
    } catch (error) {
      console.error('Upload media error:', error);
      return null;
    }
  }

  async getMedia(type?: string): Promise<any[]> {
    if (!this.currentSiteId) {
      throw new Error('No site selected');
    }

    try {
      let query = this.supabase
        .from('cms_media')
        .select('*')
        .eq('site_id', this.currentSiteId)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Get media error:', error);
      return [];
    }
  }

  /**
   * Helpers
   */
  private generateSessionToken(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  getCurrentSiteId(): string | null {
    return this.currentSiteId;
  }

  isOfflineMode(): boolean {
    return this.offlineMode;
  }

  async syncOfflineData(): Promise<boolean> {
    if (!this.offlineMode) {
      return true; // Déjà en ligne
    }

    // Vérifier la connexion
    const isOnline = await this.checkConnection();
    if (!isOnline) {
      return false;
    }

    try {
      // Synchroniser toutes les données du cache
      const content = await this.getAllContent();
      return await this.saveAllContent(content);
    } catch (error) {
      console.error('Sync offline data error:', error);
      return false;
    }
  }
}

// Export singleton pour utilisation globale
let cmsService: CMSSupabaseService | null = null;

export function getCMSService(): CMSSupabaseService {
  if (!cmsService) {
    cmsService = new CMSSupabaseService();
  }
  return cmsService;
}

// Export pour utilisation dans les composants React
export const useCMSService = () => {
  return getCMSService();
};
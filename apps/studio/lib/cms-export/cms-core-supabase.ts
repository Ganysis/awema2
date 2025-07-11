/**
 * CMS Core Supabase - Version modernisée du CMS avec backend Supabase
 * Compatible avec l'interface existante mais utilise Supabase au lieu de localStorage
 */

import { CMSSupabaseService } from '@/lib/services/cms/cms-supabase.service';

export interface CMSPage {
  id: string;
  name: string;
  slug: string;
  blocks: CMSBlock[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface CMSBlock {
  id: string;
  type: string;
  props: Record<string, any>;
  isVisible?: boolean;
}

export interface CMSBusinessInfo {
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  description?: string;
  openingHours?: Record<string, string>;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface CMSSiteData {
  pages: CMSPage[];
  businessInfo: CMSBusinessInfo;
  globalHeader?: CMSBlock;
  globalFooter?: CMSBlock;
  theme: {
    colors: Record<string, string>;
    typography: Record<string, any>;
  };
}

export interface CMSConfig {
  siteId: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  apiEndpoint?: string;
}

export class CMSCoreSupabase {
  private cmsService: CMSSupabaseService;
  private siteId: string;
  private data: CMSSiteData;
  private isAuthenticated: boolean = false;
  private autoSaveTimer: NodeJS.Timeout | null = null;
  private pendingChanges: Set<string> = new Set();

  constructor(initialData: CMSSiteData, config: CMSConfig) {
    this.siteId = config.siteId;
    this.data = initialData;
    
    // Initialiser le service Supabase
    this.cmsService = new CMSSupabaseService(config.supabaseUrl, config.supabaseKey);
    
    // Charger les données depuis Supabase si possible
    this.loadFromSupabase();
    
    // Démarrer l'auto-save
    this.startAutoSave();
  }

  /**
   * Charger les données depuis Supabase
   */
  private async loadFromSupabase(): Promise<void> {
    try {
      // Vérifier si on a un token de session
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('cms_session_token');
        const siteId = localStorage.getItem('cms_site_id');
        
        if (token && siteId === this.siteId) {
          const isValid = await this.cmsService.verifySession(token);
          if (isValid) {
            this.isAuthenticated = true;
            await this.refreshData();
          }
        }
      }
    } catch (error) {
      console.error('Failed to load from Supabase:', error);
    }
  }

  /**
   * Rafraîchir les données depuis Supabase
   */
  private async refreshData(): Promise<void> {
    try {
      const content = await this.cmsService.getAllContent();
      
      if (content.pages) {
        this.data.pages = content.pages;
      }
      if (content.businessInfo) {
        this.data.businessInfo = content.businessInfo;
      }
      if (content.globalHeader) {
        this.data.globalHeader = content.globalHeader;
      }
      if (content.globalFooter) {
        this.data.globalFooter = content.globalFooter;
      }
      if (content.theme) {
        this.data.theme = content.theme;
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  }

  /**
   * Authentification
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.cmsService.authenticate(this.siteId, email, password);
      
      if (result.success) {
        this.isAuthenticated = true;
        await this.refreshData();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback mode démo
      if (password === 'admin123') {
        this.isAuthenticated = true;
        return true;
      }
      
      return false;
    }
  }

  logout(): void {
    this.cmsService.logout();
    this.isAuthenticated = false;
    this.stopAutoSave();
  }

  isAuthenticatedStatus(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Getters - Interface identique à l'original
   */
  getPages(): CMSPage[] {
    return this.data.pages;
  }

  getPage(slug: string): CMSPage | undefined {
    return this.data.pages.find(p => p.slug === slug);
  }

  getBusinessInfo(): CMSBusinessInfo {
    return this.data.businessInfo;
  }

  getGlobalHeader(): CMSBlock | undefined {
    return this.data.globalHeader;
  }

  getGlobalFooter(): CMSBlock | undefined {
    return this.data.globalFooter;
  }

  getTheme(): CMSSiteData['theme'] {
    return this.data.theme;
  }

  /**
   * Setters avec sauvegarde automatique
   */
  async updateBlockProps(pageSlug: string, blockId: string, props: Record<string, any>): Promise<boolean> {
    const page = this.getPage(pageSlug);
    if (!page) return false;

    const block = page.blocks.find(b => b.id === blockId);
    if (!block) return false;

    block.props = { ...block.props, ...props };
    this.markAsChanged('pages');
    
    return this.save();
  }

  async updateBusinessInfo(info: Partial<CMSBusinessInfo>): Promise<boolean> {
    this.data.businessInfo = { ...this.data.businessInfo, ...info };
    this.markAsChanged('businessInfo');
    
    return this.save();
  }

  async updatePageMeta(slug: string, meta: Partial<CMSPage['meta']>): Promise<boolean> {
    const page = this.getPage(slug);
    if (!page) return false;

    page.meta = { ...page.meta, ...meta };
    this.markAsChanged('pages');
    
    return this.save();
  }

  async toggleBlockVisibility(pageSlug: string, blockId: string): Promise<boolean> {
    const page = this.getPage(pageSlug);
    if (!page) return false;

    const block = page.blocks.find(b => b.id === blockId);
    if (!block) return false;

    block.isVisible = !block.isVisible;
    this.markAsChanged('pages');
    
    return this.save();
  }

  async updateTheme(theme: Partial<CMSSiteData['theme']>): Promise<boolean> {
    this.data.theme = { ...this.data.theme, ...theme };
    this.markAsChanged('theme');
    
    return this.save();
  }

  /**
   * Gestion des blocs
   */
  async addBlock(pageSlug: string, block: CMSBlock, position?: number): Promise<boolean> {
    const page = this.getPage(pageSlug);
    if (!page) return false;

    if (position !== undefined) {
      page.blocks.splice(position, 0, block);
    } else {
      page.blocks.push(block);
    }

    this.markAsChanged('pages');
    return this.save();
  }

  async removeBlock(pageSlug: string, blockId: string): Promise<boolean> {
    const page = this.getPage(pageSlug);
    if (!page) return false;

    const index = page.blocks.findIndex(b => b.id === blockId);
    if (index === -1) return false;

    page.blocks.splice(index, 1);
    this.markAsChanged('pages');
    
    return this.save();
  }

  async moveBlock(pageSlug: string, blockId: string, newPosition: number): Promise<boolean> {
    const page = this.getPage(pageSlug);
    if (!page) return false;

    const currentIndex = page.blocks.findIndex(b => b.id === blockId);
    if (currentIndex === -1) return false;

    const [block] = page.blocks.splice(currentIndex, 1);
    page.blocks.splice(newPosition, 0, block);
    
    this.markAsChanged('pages');
    return this.save();
  }

  /**
   * Sauvegarde
   */
  private async save(): Promise<boolean> {
    if (!this.isAuthenticated) {
      console.warn('Not authenticated, saving locally only');
      this.saveToLocalStorage();
      return true;
    }

    try {
      // Sauvegarder uniquement les sections modifiées
      const updates: Record<string, any> = {};
      
      for (const key of this.pendingChanges) {
        updates[key] = this.data[key as keyof CMSSiteData];
      }

      if (Object.keys(updates).length === 0) {
        return true; // Rien à sauvegarder
      }

      // Sauvegarder dans Supabase
      const success = await this.cmsService.saveAllContent(updates);
      
      if (success) {
        this.pendingChanges.clear();
      }

      // Toujours sauvegarder localement comme backup
      this.saveToLocalStorage();

      return success;
    } catch (error) {
      console.error('Save error:', error);
      this.saveToLocalStorage();
      return false;
    }
  }

  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`cms_${this.siteId}_backup`, JSON.stringify(this.data));
    }
  }

  private markAsChanged(section: string): void {
    this.pendingChanges.add(section);
  }

  /**
   * Auto-save
   */
  private startAutoSave(): void {
    // Auto-save toutes les 30 secondes
    this.autoSaveTimer = setInterval(() => {
      if (this.pendingChanges.size > 0) {
        this.save();
      }
    }, 30000);
  }

  private stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  /**
   * Export des données
   */
  exportData(): CMSSiteData {
    return JSON.parse(JSON.stringify(this.data));
  }

  /**
   * Gestion des versions
   */
  async getVersionHistory(): Promise<any[]> {
    if (!this.isAuthenticated) {
      return [];
    }

    try {
      return await this.cmsService.getVersions();
    } catch (error) {
      console.error('Get version history error:', error);
      return [];
    }
  }

  async restoreVersion(versionId: string): Promise<boolean> {
    if (!this.isAuthenticated) {
      return false;
    }

    try {
      const success = await this.cmsService.restoreVersion(versionId);
      if (success) {
        await this.refreshData();
      }
      return success;
    } catch (error) {
      console.error('Restore version error:', error);
      return false;
    }
  }

  /**
   * Gestion des médias
   */
  async uploadMedia(file: File): Promise<{ url: string; id: string } | null> {
    if (!this.isAuthenticated) {
      return null;
    }

    try {
      return await this.cmsService.uploadMedia(file);
    } catch (error) {
      console.error('Upload media error:', error);
      return null;
    }
  }

  async getMediaLibrary(type?: string): Promise<any[]> {
    if (!this.isAuthenticated) {
      return [];
    }

    try {
      return await this.cmsService.getMedia(type);
    } catch (error) {
      console.error('Get media library error:', error);
      return [];
    }
  }

  /**
   * Status et helpers
   */
  isOfflineMode(): boolean {
    return this.cmsService.isOfflineMode();
  }

  async syncOfflineData(): Promise<boolean> {
    return await this.cmsService.syncOfflineData();
  }

  getSiteId(): string {
    return this.siteId;
  }

  /**
   * Cleanup
   */
  destroy(): void {
    this.stopAutoSave();
    this.save(); // Sauvegarder une dernière fois
  }
}

/**
 * Factory function pour créer une instance CMS
 */
export function createCMSCore(initialData: CMSSiteData, config: CMSConfig): CMSCoreSupabase {
  return new CMSCoreSupabase(initialData, config);
}

/**
 * Wrapper pour compatibilité avec l'ancien CMS
 */
export function createLegacyCompatibleCMS(initialData: CMSSiteData, apiEndpoint: string = '/api/cms'): CMSCoreSupabase {
  // Extraire l'ID du site depuis l'URL ou utiliser un défaut
  const siteId = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('site_id') || 'default'
    : 'default';

  return new CMSCoreSupabase(initialData, {
    siteId,
    apiEndpoint,
  });
}
/**
 * CMS Core - Version autonome et légère du CMS pour les sites exportés
 * Réutilise les concepts de l'éditeur principal mais en version simplifiée
 */

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

export class CMSCore {
  private data: CMSSiteData;
  private apiEndpoint: string;
  private authToken: string | null = null;

  constructor(initialData: CMSSiteData, apiEndpoint: string = '/api/cms') {
    this.data = initialData;
    this.apiEndpoint = apiEndpoint;
    this.loadAuthToken();
  }

  // Authentification
  private loadAuthToken() {
    if (typeof window !== 'undefined') {
      this.authToken = localStorage.getItem('cms_auth_token');
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiEndpoint}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        this.authToken = token;
        localStorage.setItem('cms_auth_token', token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('cms_auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  // Getters
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

  // Setters avec sauvegarde automatique
  async updateBlockProps(pageSlug: string, blockId: string, props: Record<string, any>): Promise<boolean> {
    const page = this.getPage(pageSlug);
    if (!page) return false;

    const block = page.blocks.find(b => b.id === blockId);
    if (!block) return false;

    block.props = { ...block.props, ...props };
    return this.save();
  }

  async updateBusinessInfo(info: Partial<CMSBusinessInfo>): Promise<boolean> {
    this.data.businessInfo = { ...this.data.businessInfo, ...info };
    return this.save();
  }

  async updatePageMeta(slug: string, meta: Partial<CMSPage['meta']>): Promise<boolean> {
    const page = this.getPage(slug);
    if (!page) return false;

    page.meta = { ...page.meta, ...meta };
    return this.save();
  }

  async toggleBlockVisibility(pageSlug: string, blockId: string): Promise<boolean> {
    const page = this.getPage(pageSlug);
    if (!page) return false;

    const block = page.blocks.find(b => b.id === blockId);
    if (!block) return false;

    block.isVisible = !block.isVisible;
    return this.save();
  }

  // Sauvegarde
  private async save(): Promise<boolean> {
    if (!this.authToken) {
      console.error('Not authenticated');
      return false;
    }

    try {
      const response = await fetch(`${this.apiEndpoint}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        },
        body: JSON.stringify(this.data)
      });

      return response.ok;
    } catch (error) {
      console.error('Save error:', error);
      return false;
    }
  }

  // Export des données pour régénération du site
  exportData(): CMSSiteData {
    return JSON.parse(JSON.stringify(this.data));
  }
}
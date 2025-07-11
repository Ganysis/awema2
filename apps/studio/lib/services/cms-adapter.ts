// Adaptateur pour migrer le CMS existant vers Supabase

export class CMSAdapter {
  /**
   * Transforme le CMS localStorage existant en version Supabase
   */
  static adaptExistingCMS(existingCMSCode: string): string {
    return existingCMSCode
      // Remplacer localStorage par Supabase
      .replace(
        /localStorage\.setItem\(['"]([^'"]+)['"]\s*,\s*JSON\.stringify\(([^)]+)\)\)/g,
        `await supabase.from('content').upsert({ site_id: config.siteId, key: '$1', data: $2 })`
      )
      .replace(
        /JSON\.parse\(localStorage\.getItem\(['"]([^'"]+)['"]\)\s*\|\|\s*['"]['"]\)/g,
        `(await supabase.from('content').select('data').eq('site_id', config.siteId).eq('key', '$1').single())?.data?.data || {}`
      )
      
      // Ajouter l'import Supabase
      .replace(
        '// CMS Core',
        `// CMS Core
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabase = createClient(
  window.AWEMA_CONFIG.supabaseUrl,
  window.AWEMA_CONFIG.supabaseAnonKey
);`
      )
      
      // Remplacer l'auth simple par Supabase Auth
      .replace(
        /if\s*\(password\s*===\s*window\.CMS_CONFIG\.password\)/g,
        `const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });
        if (data.user`
      );
  }

  /**
   * Garde les fonctionnalités existantes mais avec backend Supabase
   */
  static generateHybridCMS(siteId: string, apiKey: string): string {
    return `
<!-- AWEMA CMS Hybrid (localStorage + Supabase) -->
<script>
window.AWEMA_CONFIG = {
  siteId: '${siteId}',
  apiKey: '${apiKey}',
  supabaseUrl: '${process.env.NEXT_PUBLIC_SUPABASE_URL}',
  supabaseAnonKey: '${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}',
  mode: 'hybrid' // Utilise localStorage en fallback si Supabase down
};

// Wrapper pour compatibilité
class CMSStorage {
  constructor(config) {
    this.config = config;
    this.supabase = null;
    this.isOnline = true;
    
    try {
      // Essayer de se connecter à Supabase
      this.supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
      this.checkConnection();
    } catch (e) {
      console.warn('Supabase non disponible, mode offline activé');
      this.isOnline = false;
    }
  }
  
  async get(key) {
    if (this.isOnline && this.supabase) {
      try {
        const { data } = await this.supabase
          .from('content')
          .select('data')
          .eq('site_id', this.config.siteId)
          .eq('key', key)
          .single();
        return data?.data;
      } catch (e) {
        // Fallback localStorage
      }
    }
    return JSON.parse(localStorage.getItem(key) || '{}');
  }
  
  async set(key, value) {
    // Toujours sauvegarder en local
    localStorage.setItem(key, JSON.stringify(value));
    
    // Essayer de sync avec Supabase
    if (this.isOnline && this.supabase) {
      try {
        await this.supabase
          .from('content')
          .upsert({
            site_id: this.config.siteId,
            key: key,
            data: value,
            updated_at: new Date()
          });
      } catch (e) {
        console.warn('Sync Supabase échouée, données en local seulement');
      }
    }
  }
  
  async checkConnection() {
    try {
      const { error } = await this.supabase.from('sites').select('id').limit(1);
      this.isOnline = !error;
    } catch {
      this.isOnline = false;
    }
  }
}

// Initialiser le stockage hybride
window.cmsStorage = new CMSStorage(window.AWEMA_CONFIG);
</script>

<!-- Charger le CMS existant (il utilisera cmsStorage au lieu de localStorage) -->
<script src="/admin/cms-core.js" defer></script>
<script src="/admin/cms-admin.js" defer></script>
<script src="/admin/cms-enhanced.js" defer></script>
    `;
  }
}
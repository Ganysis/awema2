/**
 * Service de gestion de l'historique des versions
 * Utilisé à la fois dans l'éditeur et le CMS exporté
 */

export interface Version {
  id: string;
  timestamp: number;
  date: string;
  label: string;
  data: any;
  type: 'auto' | 'manual';
  description?: string;
}

export interface VersionHistoryOptions {
  maxVersions?: number; // Nombre max de versions à conserver (défaut: 50)
  autoSaveInterval?: number; // Intervalle de sauvegarde auto en ms (défaut: 30000)
  storageKey?: string; // Clé de stockage localStorage
}

export class VersionHistoryService {
  private versions: Version[] = [];
  private currentData: any = null;
  private autoSaveTimer: NodeJS.Timeout | null = null;
  private lastSaveHash: string = '';
  private options: Required<VersionHistoryOptions>;

  constructor(options: VersionHistoryOptions = {}) {
    this.options = {
      maxVersions: options.maxVersions || 50,
      autoSaveInterval: options.autoSaveInterval || 30000, // 30 secondes
      storageKey: options.storageKey || 'version-history'
    };
    
    this.loadVersions();
  }

  /**
   * Démarre la sauvegarde automatique
   */
  startAutoSave(getCurrentData: () => any): void {
    this.stopAutoSave();
    
    this.autoSaveTimer = setInterval(() => {
      const currentData = getCurrentData();
      const currentHash = this.generateHash(currentData);
      
      // Ne sauvegarder que si les données ont changé
      if (currentHash !== this.lastSaveHash) {
        this.saveVersion(currentData, 'auto', 'Sauvegarde automatique');
        this.lastSaveHash = currentHash;
      }
    }, this.options.autoSaveInterval);
  }

  /**
   * Arrête la sauvegarde automatique
   */
  stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  /**
   * Sauvegarde une nouvelle version
   */
  saveVersion(data: any, type: 'auto' | 'manual' = 'manual', description?: string): Version {
    const version: Version = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      label: this.generateLabel(type),
      data: JSON.parse(JSON.stringify(data)), // Deep clone
      type,
      description
    };

    // Ajouter la version au début de la liste
    this.versions.unshift(version);

    // Limiter le nombre de versions
    if (this.versions.length > this.options.maxVersions) {
      // Garder au moins 5 versions manuelles
      const manualVersions = this.versions.filter(v => v.type === 'manual');
      const autoVersions = this.versions.filter(v => v.type === 'auto');
      
      if (manualVersions.length >= 5) {
        // Supprimer les versions auto les plus anciennes
        this.versions = [
          ...manualVersions.slice(0, Math.floor(this.options.maxVersions * 0.7)),
          ...autoVersions.slice(0, Math.floor(this.options.maxVersions * 0.3))
        ].sort((a, b) => b.timestamp - a.timestamp);
      } else {
        this.versions = this.versions.slice(0, this.options.maxVersions);
      }
    }

    this.saveToStorage();
    this.lastSaveHash = this.generateHash(data);
    
    return version;
  }

  /**
   * Restaure une version
   */
  restoreVersion(versionId: string): any | null {
    const version = this.versions.find(v => v.id === versionId);
    if (!version) return null;

    // Créer une sauvegarde de l'état actuel avant restauration
    if (this.currentData) {
      this.saveVersion(
        this.currentData, 
        'manual', 
        `Sauvegarde avant restauration de "${version.label}"`
      );
    }

    return JSON.parse(JSON.stringify(version.data));
  }

  /**
   * Obtient toutes les versions
   */
  getVersions(): Version[] {
    return this.versions;
  }

  /**
   * Obtient une version spécifique
   */
  getVersion(versionId: string): Version | null {
    return this.versions.find(v => v.id === versionId) || null;
  }

  /**
   * Compare deux versions
   */
  compareVersions(versionId1: string, versionId2: string): {
    version1: Version | null;
    version2: Version | null;
    differences: string[];
  } {
    const version1 = this.getVersion(versionId1);
    const version2 = this.getVersion(versionId2);
    
    const differences: string[] = [];
    
    if (version1 && version2) {
      // Comparaison simplifiée - peut être améliorée
      const keys1 = Object.keys(version1.data);
      const keys2 = Object.keys(version2.data);
      
      const allKeys = new Set([...keys1, ...keys2]);
      
      allKeys.forEach(key => {
        const val1 = JSON.stringify(version1.data[key]);
        const val2 = JSON.stringify(version2.data[key]);
        
        if (val1 !== val2) {
          differences.push(`${key}: modifié`);
        }
      });
    }
    
    return { version1, version2, differences };
  }

  /**
   * Supprime une version
   */
  deleteVersion(versionId: string): boolean {
    const index = this.versions.findIndex(v => v.id === versionId);
    if (index === -1) return false;

    this.versions.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  /**
   * Supprime toutes les versions
   */
  clearHistory(): void {
    this.versions = [];
    this.saveToStorage();
  }

  /**
   * Met à jour les données courantes (pour la comparaison)
   */
  updateCurrentData(data: any): void {
    this.currentData = data;
  }

  /**
   * Génère un hash simple pour comparer les données
   */
  private generateHash(data: any): string {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  /**
   * Génère un label pour la version
   */
  private generateLabel(type: 'auto' | 'manual'): string {
    const now = new Date();
    const time = now.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    if (type === 'auto') {
      return `Sauvegarde auto - ${time}`;
    }
    
    return `Sauvegarde manuelle - ${time}`;
  }

  /**
   * Charge les versions depuis le localStorage
   */
  private loadVersions(): void {
    try {
      const stored = localStorage.getItem(this.options.storageKey);
      if (stored) {
        this.versions = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des versions:', error);
      this.versions = [];
    }
  }

  /**
   * Sauvegarde les versions dans le localStorage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.options.storageKey, JSON.stringify(this.versions));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des versions:', error);
      
      // Si le localStorage est plein, supprimer les plus anciennes versions auto
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        const autoVersions = this.versions.filter(v => v.type === 'auto');
        if (autoVersions.length > 5) {
          this.versions = [
            ...this.versions.filter(v => v.type === 'manual'),
            ...autoVersions.slice(0, 5)
          ].sort((a, b) => b.timestamp - a.timestamp);
          
          // Réessayer
          try {
            localStorage.setItem(this.options.storageKey, JSON.stringify(this.versions));
          } catch (e) {
            console.error('Impossible de sauvegarder les versions:', e);
          }
        }
      }
    }
  }
}

// Export d'une fonction utilitaire pour le CMS exporté
export function createVersionHistoryScript(): string {
  return `
// Version History Service for CMS
class VersionHistory {
  constructor(storageKey = 'cms-version-history') {
    this.storageKey = storageKey;
    this.versions = this.loadVersions();
    this.autoSaveTimer = null;
    this.lastSaveHash = '';
    this.maxVersions = 30;
  }

  startAutoSave(getDataFunc, interval = 30000) {
    this.stopAutoSave();
    this.autoSaveTimer = setInterval(() => {
      const data = getDataFunc();
      const hash = this.generateHash(data);
      if (hash !== this.lastSaveHash) {
        this.saveVersion(data, 'auto', 'Sauvegarde automatique');
        this.lastSaveHash = hash;
      }
    }, interval);
  }

  stopAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  saveVersion(data, type = 'manual', description = '') {
    const version = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      label: type === 'auto' ? 'Sauvegarde auto' : 'Sauvegarde manuelle',
      data: JSON.parse(JSON.stringify(data)),
      type,
      description
    };

    this.versions.unshift(version);
    
    if (this.versions.length > this.maxVersions) {
      const manual = this.versions.filter(v => v.type === 'manual');
      const auto = this.versions.filter(v => v.type === 'auto');
      this.versions = [...manual.slice(0, 20), ...auto.slice(0, 10)]
        .sort((a, b) => b.timestamp - a.timestamp);
    }

    this.saveToStorage();
    return version;
  }

  restoreVersion(versionId) {
    const version = this.versions.find(v => v.id === versionId);
    return version ? JSON.parse(JSON.stringify(version.data)) : null;
  }

  getVersions() {
    return this.versions;
  }

  deleteVersion(versionId) {
    const index = this.versions.findIndex(v => v.id === versionId);
    if (index !== -1) {
      this.versions.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  clearHistory() {
    this.versions = [];
    this.saveToStorage();
  }

  generateHash(data) {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  loadVersions() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.versions));
    } catch (e) {
      console.error('Erreur sauvegarde versions:', e);
    }
  }
}
`;
}
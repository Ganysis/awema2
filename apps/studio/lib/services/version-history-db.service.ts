/**
 * Service de gestion de l'historique des versions avec persistance DB
 * Extension du service localStorage pour ajouter la synchronisation avec la base de données
 */

import { VersionHistoryService, Version, VersionHistoryOptions } from './version-history.service';

export interface DBVersionHistoryOptions extends VersionHistoryOptions {
  projectId: string;
  apiEndpoint?: string;
  authToken?: string;
  syncEnabled?: boolean;
}

export class DBVersionHistoryService extends VersionHistoryService {
  private projectId: string;
  private apiEndpoint: string;
  private authToken: string | null;
  private syncEnabled: boolean;
  private syncInProgress: boolean = false;

  constructor(options: DBVersionHistoryOptions) {
    super(options);
    this.projectId = options.projectId;
    this.apiEndpoint = options.apiEndpoint || '/api/projects';
    this.authToken = options.authToken || localStorage.getItem('token');
    this.syncEnabled = options.syncEnabled !== false;

    // Synchroniser au démarrage
    if (this.syncEnabled) {
      this.syncFromDatabase();
    }
  }

  /**
   * Sauvegarde une version (override pour ajouter la sync DB)
   */
  async saveVersion(data: any, type: 'auto' | 'manual' = 'manual', description?: string): Promise<Version> {
    // D'abord sauvegarder en local via la méthode parent
    const version = super.saveVersion(data, type, description);

    // Puis synchroniser avec la DB si activé
    if (this.syncEnabled && !this.syncInProgress) {
      this.syncToDatabase(version, data).catch(error => {
        console.error('Failed to sync version to database:', error);
      });
    }

    return version;
  }

  /**
   * Récupère les versions depuis la base de données
   */
  async fetchVersionsFromDB(): Promise<Version[]> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${this.projectId}/versions`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch versions: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Convertir le format DB vers le format Version local
      return result.data.map((dbVersion: any) => ({
        id: dbVersion.id,
        timestamp: new Date(dbVersion.createdAt).getTime(),
        date: new Date(dbVersion.createdAt).toLocaleString(),
        label: `Version ${dbVersion.version}`,
        data: JSON.parse(dbVersion.data || '{}'),
        type: dbVersion.changes?.includes('Auto-save') ? 'auto' : 'manual',
        description: dbVersion.changes,
      }));
    } catch (error) {
      console.error('Error fetching versions from DB:', error);
      return [];
    }
  }

  /**
   * Synchronise une version locale vers la base de données
   */
  private async syncToDatabase(version: Version, data: any): Promise<void> {
    try {
      const response = await fetch(`${this.apiEndpoint}/${this.projectId}/versions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authToken}`,
        },
        body: JSON.stringify({
          data: JSON.stringify(data),
          description: version.description || version.label,
          isAutoSave: version.type === 'auto',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save version: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Version synced to database:', result.data);
    } catch (error) {
      console.error('Error syncing version to database:', error);
      throw error;
    }
  }

  /**
   * Synchronise depuis la base de données vers le localStorage
   */
  async syncFromDatabase(): Promise<void> {
    if (this.syncInProgress) return;

    try {
      this.syncInProgress = true;
      const dbVersions = await this.fetchVersionsFromDB();

      if (dbVersions.length > 0) {
        // Fusionner avec les versions locales
        const localVersions = this.getVersions();
        const mergedVersions = this.mergeVersions(localVersions, dbVersions);
        
        // Sauvegarder les versions fusionnées
        localStorage.setItem(this.options.storageKey, JSON.stringify(mergedVersions));
        
        // Recharger les versions
        this.loadVersions();
        
        console.log(`Synced ${dbVersions.length} versions from database`);
      }
    } catch (error) {
      console.error('Error syncing from database:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * Restaure une version depuis la DB
   */
  async restoreVersion(versionId: string): Promise<any> {
    // D'abord essayer de restaurer depuis le localStorage
    const localVersion = super.restoreVersion(versionId);
    
    if (localVersion) {
      return localVersion;
    }

    // Si pas trouvé localement, essayer depuis la DB
    try {
      const response = await fetch(
        `${this.apiEndpoint}/${this.projectId}/versions/${versionId}/restore`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to restore version: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Recharger les versions après restauration
      await this.syncFromDatabase();
      
      return result.data;
    } catch (error) {
      console.error('Error restoring version from DB:', error);
      throw error;
    }
  }

  /**
   * Fusionne les versions locales et distantes
   */
  private mergeVersions(local: Version[], remote: Version[]): Version[] {
    const versionMap = new Map<string, Version>();

    // Ajouter d'abord les versions distantes
    remote.forEach(v => versionMap.set(v.id, v));

    // Puis les versions locales (écrasent si même ID)
    local.forEach(v => {
      if (!versionMap.has(v.id)) {
        versionMap.set(v.id, v);
      }
    });

    // Trier par timestamp et limiter
    return Array.from(versionMap.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, this.options.maxVersions);
  }

  /**
   * Active/désactive la synchronisation
   */
  setSyncEnabled(enabled: boolean): void {
    this.syncEnabled = enabled;
    if (enabled) {
      this.syncFromDatabase();
    }
  }

  /**
   * Met à jour le token d'authentification
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }
}
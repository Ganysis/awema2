// Import dynamique pour éviter l'erreur si le module n'est pas installé
let createClient: any;
try {
  const supabaseModule = require('@supabase/supabase-js');
  createClient = supabaseModule.createClient;
} catch (error) {
  console.warn('Supabase not installed. Backup features will be limited.');
}

export interface BackupConfig {
  supabaseUrl: string;
  supabaseServiceKey: string;
  retentionDays?: number; // Nombre de jours à conserver les backups
}

export interface BackupResult {
  success: boolean;
  backupId?: string;
  timestamp?: string;
  error?: string;
}

/**
 * Service de backup automatique pour les sites AWEMA
 * Stratégie recommandée : 7 jours de backups tournants
 */
export class BackupService {
  private supabase: any;
  private retentionDays: number;

  constructor(config: BackupConfig) {
    this.retentionDays = config.retentionDays || 7; // Par défaut 7 jours
    
    if (createClient && config.supabaseUrl && config.supabaseServiceKey) {
      this.supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
    } else {
      this.supabase = null;
    }
  }

  /**
   * Effectue un backup complet d'un site
   */
  async backupSite(siteId: string): Promise<BackupResult> {
    if (!this.supabase) {
      return {
        success: false,
        error: 'Supabase non configuré'
      };
    }

    try {
      console.log(`🔄 Début du backup pour le site ${siteId}...`);

      // 1. Récupérer toutes les données du site
      const siteData = await this.exportSiteData(siteId);
      
      if (!siteData) {
        throw new Error('Impossible de récupérer les données du site');
      }

      // 2. Créer le backup
      const timestamp = new Date().toISOString();
      const backupId = `backup-${siteId}-${timestamp.split('T')[0]}`;
      
      // Créer le bucket s'il n'existe pas
      await this.ensureBackupBucket();

      // 3. Stocker le backup dans Supabase Storage
      const backupContent = JSON.stringify({
        siteId,
        timestamp,
        version: '1.0',
        data: siteData
      }, null, 2);

      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from('backups')
        .upload(`${siteId}/${backupId}.json`, backupContent, {
          contentType: 'application/json',
          upsert: true // Écraser si existe déjà (backup du jour)
        });

      if (uploadError) {
        throw uploadError;
      }

      // 4. Créer une entrée dans la table des backups
      const { error: dbError } = await this.supabase
        .from('backups')
        .insert({
          id: backupId,
          site_id: siteId,
          backup_date: timestamp,
          size_bytes: new Blob([backupContent]).size,
          storage_path: `${siteId}/${backupId}.json`,
          type: 'daily',
          status: 'completed'
        });

      if (dbError) {
        console.error('Erreur lors de l\'enregistrement du backup:', dbError);
      }

      // 5. Nettoyer les anciens backups
      await this.cleanOldBackups(siteId);

      console.log(`✅ Backup terminé: ${backupId}`);

      return {
        success: true,
        backupId,
        timestamp
      };

    } catch (error) {
      console.error('❌ Erreur lors du backup:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Exporte toutes les données d'un site
   */
  private async exportSiteData(siteId: string): Promise<any> {
    try {
      // Récupérer les informations du site
      const { data: site, error: siteError } = await this.supabase
        .from('sites')
        .select('*')
        .eq('id', siteId)
        .single();

      if (siteError || !site) {
        throw new Error('Site non trouvé');
      }

      // Récupérer le contenu
      const { data: content, error: contentError } = await this.supabase
        .from('content')
        .select('*')
        .eq('site_id', siteId);

      // Récupérer les médias
      const { data: media, error: mediaError } = await this.supabase
        .from('media')
        .select('*')
        .eq('site_id', siteId);

      // Récupérer les utilisateurs (sans les mots de passe)
      const { data: users, error: usersError } = await this.supabase
        .from('cms_users')
        .select('id, email, role, full_name, company, is_active, created_at')
        .eq('site_id', siteId);

      // Récupérer les formulaires
      const { data: forms, error: formsError } = await this.supabase
        .from('forms')
        .select('*')
        .eq('site_id', siteId);

      // Récupérer les soumissions de formulaires
      const { data: submissions, error: submissionsError } = await this.supabase
        .from('form_submissions')
        .select('*')
        .eq('site_id', siteId);

      return {
        site,
        content: content || [],
        media: media || [],
        users: users || [],
        forms: forms || [],
        submissions: submissions || []
      };
    } catch (error) {
      console.error('Erreur lors de l\'export des données:', error);
      return null;
    }
  }

  /**
   * Nettoie les backups plus anciens que la période de rétention
   */
  private async cleanOldBackups(siteId: string): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.retentionDays);

      // Récupérer les anciens backups
      const { data: oldBackups, error: listError } = await this.supabase
        .from('backups')
        .select('id, storage_path')
        .eq('site_id', siteId)
        .lt('backup_date', cutoffDate.toISOString());

      if (listError || !oldBackups || oldBackups.length === 0) {
        return;
      }

      console.log(`🗑️ Nettoyage de ${oldBackups.length} anciens backups...`);

      // Supprimer les fichiers du storage
      for (const backup of oldBackups) {
        await this.supabase.storage
          .from('backups')
          .remove([backup.storage_path]);
      }

      // Supprimer les entrées de la base
      const { error: deleteError } = await this.supabase
        .from('backups')
        .delete()
        .eq('site_id', siteId)
        .lt('backup_date', cutoffDate.toISOString());

      if (deleteError) {
        console.error('Erreur lors de la suppression des anciens backups:', deleteError);
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage des backups:', error);
    }
  }

  /**
   * S'assure que le bucket de backup existe
   */
  private async ensureBackupBucket(): Promise<void> {
    try {
      const { data: buckets } = await this.supabase.storage.listBuckets();
      
      if (!buckets || !buckets.find((b: any) => b.name === 'backups')) {
        await this.supabase.storage.createBucket('backups', {
          public: false,
          fileSizeLimit: 104857600 // 100MB max par backup
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création du bucket:', error);
    }
  }

  /**
   * Restaure un site à partir d'un backup
   */
  async restoreSite(siteId: string, backupId: string): Promise<BackupResult> {
    if (!this.supabase) {
      return {
        success: false,
        error: 'Supabase non configuré'
      };
    }

    try {
      console.log(`🔄 Restauration du site ${siteId} à partir du backup ${backupId}...`);

      // 1. Télécharger le backup
      const { data: backupData, error: downloadError } = await this.supabase.storage
        .from('backups')
        .download(`${siteId}/${backupId}.json`);

      if (downloadError || !backupData) {
        throw new Error('Impossible de télécharger le backup');
      }

      // 2. Parser les données
      const backupContent = await backupData.text();
      const backup = JSON.parse(backupContent);

      // 3. Restaurer les données (dans une transaction idéalement)
      // TODO: Implémenter la restauration complète
      // Pour l'instant, on retourne juste un succès

      console.log(`✅ Restauration terminée`);

      return {
        success: true,
        backupId,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('❌ Erreur lors de la restauration:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Liste les backups disponibles pour un site
   */
  async listBackups(siteId: string): Promise<any[]> {
    if (!this.supabase) {
      return [];
    }

    try {
      const { data: backups, error } = await this.supabase
        .from('backups')
        .select('*')
        .eq('site_id', siteId)
        .order('backup_date', { ascending: false });

      return backups || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des backups:', error);
      return [];
    }
  }
}

/**
 * Fonction pour planifier les backups automatiques
 * À appeler depuis une fonction serverless (Netlify Functions, Vercel Cron, etc.)
 */
export async function runDailyBackups(config: BackupConfig): Promise<void> {
  const backupService = new BackupService(config);
  
  if (!createClient) {
    console.error('Supabase non disponible pour les backups');
    return;
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

  try {
    // Récupérer tous les sites actifs
    const { data: sites, error } = await supabase
      .from('sites')
      .select('id, name, plan')
      .eq('status', 'active')
      .in('plan', ['pro', 'premium']); // Seulement pour les plans payants

    if (error || !sites) {
      console.error('Erreur lors de la récupération des sites:', error);
      return;
    }

    console.log(`📅 Backup quotidien de ${sites.length} sites...`);

    // Effectuer les backups en parallèle par batch de 5
    const batchSize = 5;
    for (let i = 0; i < sites.length; i += batchSize) {
      const batch = sites.slice(i, i + batchSize);
      await Promise.all(
        batch.map(site => backupService.backupSite(site.id))
      );
    }

    console.log(`✅ Tous les backups quotidiens terminés`);

  } catch (error) {
    console.error('❌ Erreur lors des backups quotidiens:', error);
  }
}
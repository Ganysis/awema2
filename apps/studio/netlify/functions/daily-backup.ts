import { runDailyBackups } from '../../lib/services/backup.service';

// Fonction Netlify pour les backups quotidiens
// À configurer avec Netlify Scheduled Functions
export async function handler(event: any, context: any) {
  // Vérifier le token secret pour sécuriser l'endpoint
  const authHeader = event.headers.authorization;
  const expectedToken = process.env.BACKUP_CRON_TOKEN;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    console.log('🕐 Démarrage des backups quotidiens...');
    
    await runDailyBackups({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      retentionDays: 7 // 7 jours de rétention par défaut
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Backups quotidiens terminés',
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Erreur lors des backups:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erreur lors des backups',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      })
    };
  }
}

// Configuration pour Netlify Scheduled Functions
export const config = {
  schedule: "0 3 * * *" // Tous les jours à 3h du matin
};
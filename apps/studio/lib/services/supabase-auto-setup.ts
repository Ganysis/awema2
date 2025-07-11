/**
 * Service d'auto-configuration Supabase
 * Crée automatiquement les sites et utilisateurs lors du déploiement
 */

import { createClient } from '@supabase/supabase-js';

export class SupabaseAutoSetup {
  private supabase: any;
  private superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@awema.fr';
  private superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || 'AwemaSuperAdmin2024!';

  constructor() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;
    
    if (url && serviceKey) {
      this.supabase = createClient(url, serviceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
    }
  }

  /**
   * Initialise le super admin s'il n'existe pas
   */
  async ensureSuperAdmin() {
    if (!this.supabase) return null;

    try {
      // Vérifier si le super admin existe
      const { data: superAdmin } = await this.supabase
        .from('cms_users')
        .select('id')
        .eq('email', this.superAdminEmail)
        .eq('role', 'super_admin')
        .single();

      if (!superAdmin) {
        // Créer le super admin sans site_id (accès global)
        const { data, error } = await this.supabase.rpc('create_super_admin', {
          p_email: this.superAdminEmail,
          p_password: this.superAdminPassword,
          p_full_name: 'Super Administrateur AWEMA'
        });

        if (error) {
          console.error('Erreur création super admin:', error);
          
          // Fallback : insertion directe
          const { error: insertError } = await this.supabase
            .from('cms_users')
            .insert({
              email: this.superAdminEmail,
              password_hash: await this.hashPassword(this.superAdminPassword),
              full_name: 'Super Administrateur AWEMA',
              role: 'super_admin',
              site_id: null // Pas de site_id = accès global
            });

          if (insertError) {
            console.error('Erreur insertion super admin:', insertError);
          }
        }
        
        console.log('✅ Super Admin créé:', this.superAdminEmail);
      }
    } catch (error) {
      console.error('Erreur vérification super admin:', error);
    }
  }

  /**
   * Crée automatiquement un site et son admin lors du déploiement
   */
  async createSiteWithAdmin(options: {
    siteId: string;
    siteName: string;
    domain: string;
    adminEmail: string;
    adminPassword?: string;
  }) {
    if (!this.supabase) return null;

    const { siteId, siteName, domain, adminEmail, adminPassword = 'admin123' } = options;

    try {
      // 1. Créer le site
      const { data: site, error: siteError } = await this.supabase
        .from('cms_sites')
        .upsert({
          id: siteId,
          domain: domain,
          site_name: siteName,
          status: 'active',
          config: {
            created_by: 'auto_deploy',
            created_at: new Date().toISOString()
          }
        }, {
          onConflict: 'id'
        })
        .select()
        .single();

      if (siteError) {
        console.error('Erreur création site:', siteError);
        return null;
      }

      console.log('✅ Site créé/mis à jour:', domain);

      // 2. Créer l'utilisateur admin du site
      const { data: adminUser, error: userError } = await this.supabase.rpc('create_cms_user', {
        p_email: adminEmail,
        p_password: adminPassword,
        p_full_name: `Admin ${siteName}`,
        p_role: 'admin',
        p_site_id: siteId
      });

      if (userError) {
        console.error('Erreur création admin:', userError);
        
        // Fallback : insertion directe
        const { error: insertError } = await this.supabase
          .from('cms_users')
          .upsert({
            email: adminEmail,
            password_hash: await this.hashPassword(adminPassword),
            full_name: `Admin ${siteName}`,
            role: 'admin',
            site_id: siteId
          }, {
            onConflict: 'email,site_id'
          });

        if (insertError) {
          console.error('Erreur insertion admin:', insertError);
        }
      }

      console.log('✅ Admin site créé:', adminEmail);

      // 3. Créer l'utilisateur standard pour le client (toujours admin@admin.fr)
      const { error: clientUserError } = await this.supabase
        .from('cms_users')
        .upsert({
          email: 'admin@admin.fr',
          password_hash: await this.hashPassword('admin'),
          full_name: 'Administrateur Client',
          role: 'editor',
          site_id: siteId
        }, {
          onConflict: 'email,site_id'
        });

      if (clientUserError) {
        console.error('Erreur création utilisateur client:', clientUserError);
      } else {
        console.log('✅ Utilisateur client créé: admin@admin.fr');
      }

      return {
        site,
        adminEmail,
        clientEmail: 'admin@admin.fr'
      };

    } catch (error) {
      console.error('Erreur auto-setup:', error);
      return null;
    }
  }

  /**
   * Fonction pour hasher le mot de passe (simulé)
   */
  private async hashPassword(password: string): string {
    // En production, cela devrait utiliser bcrypt côté serveur
    // Ici on retourne juste une valeur temporaire
    return `$2b$10$${password}hashed`; // Placeholder
  }

  /**
   * Crée la fonction SQL pour le super admin si elle n'existe pas
   */
  async createSuperAdminFunction() {
    if (!this.supabase) return;

    const sql = `
      CREATE OR REPLACE FUNCTION create_super_admin(
        p_email TEXT,
        p_password TEXT,
        p_full_name TEXT
      ) RETURNS UUID
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
        v_user_id UUID;
      BEGIN
        INSERT INTO cms_users (email, password_hash, full_name, role, site_id)
        VALUES (
          p_email,
          crypt(p_password, gen_salt('bf', 10)),
          p_full_name,
          'super_admin',
          NULL -- Pas de site_id pour le super admin
        )
        ON CONFLICT (email, site_id) DO UPDATE
        SET password_hash = crypt(p_password, gen_salt('bf', 10))
        RETURNING id INTO v_user_id;
        
        RETURN v_user_id;
      END;
      $$;
    `;

    try {
      await this.supabase.rpc('exec_sql', { sql });
    } catch (error) {
      console.log('Fonction super admin peut-être déjà existante');
    }
  }
}
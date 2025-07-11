-- Correction de la contrainte site_id pour permettre NULL pour le super admin
ALTER TABLE cms_users ALTER COLUMN site_id DROP NOT NULL;

-- Vérifier que la modification a bien été appliquée
\d cms_users
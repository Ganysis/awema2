-- =====================================================
-- SCRIPT DE CRÉATION D'UN SITE DE TEST COMPLET
-- =====================================================
-- Ce script crée un site de test avec toutes les données nécessaires
-- pour tester le CMS avec admin@admin.fr / admin

-- =====================================================
-- 1. CRÉER LE SITE DE TEST
-- =====================================================
DO $$
DECLARE
  v_site_id UUID;
  v_user_id UUID;
  v_content_id UUID;
BEGIN
  -- Nettoyer les données de test existantes
  DELETE FROM cms_sites WHERE domain IN ('test-plomberie.netlify.app', 'plomberie-martin.fr');
  
  -- Créer le site principal
  INSERT INTO cms_sites (
    domain, 
    site_name, 
    config,
    status
  ) VALUES (
    'test-plomberie.netlify.app',
    'Plomberie Martin & Fils',
    '{
      "theme": "default",
      "colors": {
        "primary": "#2563eb",
        "secondary": "#0ea5e9",
        "accent": "#f59e0b"
      },
      "features": {
        "cms": true,
        "analytics": true,
        "forms": true,
        "seo": true
      },
      "business": {
        "name": "Plomberie Martin & Fils",
        "phone": "01 23 45 67 89",
        "email": "contact@plomberie-martin.fr",
        "address": "123 Rue de la République, 75001 Paris",
        "hours": "Lun-Ven: 8h-18h, Sam: 9h-12h"
      }
    }',
    'active'
  ) RETURNING id INTO v_site_id;
  
  RAISE NOTICE 'Site créé avec ID: %', v_site_id;
  
  -- =====================================================
  -- 2. CRÉER L'UTILISATEUR ADMIN
  -- =====================================================
  
  -- Utiliser la fonction pour créer l'utilisateur avec mot de passe hashé
  v_user_id := create_cms_user(
    'admin@admin.fr',
    'admin',
    'Administrateur Principal',
    'admin',
    v_site_id
  );
  
  RAISE NOTICE 'Utilisateur admin créé avec ID: %', v_user_id;
  
  -- =====================================================
  -- 3. CRÉER LE CONTENU DES PAGES
  -- =====================================================
  
  -- Page d'accueil
  INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    meta,
    published,
    published_at,
    author_id
  ) VALUES (
    v_site_id,
    'home',
    'page',
    '{
      "title": "Plomberie Martin & Fils - Votre expert plombier à Paris",
      "blocks": [
        {
          "id": "hero-1",
          "type": "hero",
          "props": {
            "title": "Plomberie Martin & Fils",
            "subtitle": "Votre expert plombier à Paris depuis 1985",
            "ctaText": "Devis Gratuit",
            "ctaLink": "/contact",
            "backgroundImage": "/images/hero-plomberie.jpg"
          }
        },
        {
          "id": "features-1",
          "type": "features",
          "props": {
            "title": "Nos Services",
            "features": [
              {
                "title": "Dépannage 24/7",
                "description": "Intervention rapide pour toutes urgences",
                "icon": "emergency"
              },
              {
                "title": "Installation",
                "description": "Pose de sanitaires et tuyauterie",
                "icon": "tools"
              },
              {
                "title": "Rénovation",
                "description": "Modernisation de vos installations",
                "icon": "refresh"
              }
            ]
          }
        },
        {
          "id": "cta-1",
          "type": "cta",
          "props": {
            "title": "Besoin d''un plombier ?",
            "description": "Contactez-nous pour un devis gratuit",
            "buttonText": "Appeler maintenant",
            "buttonLink": "tel:0123456789"
          }
        }
      ]
    }',
    '{
      "title": "Plomberie Martin & Fils - Expert plombier Paris",
      "description": "Dépannage plomberie 24/7 à Paris. Intervention rapide, devis gratuit. Plus de 35 ans d''expérience.",
      "keywords": ["plombier paris", "dépannage plomberie", "urgence plombier", "plomberie 24/7"]
    }',
    true,
    NOW(),
    v_user_id
  );
  
  -- Page Services
  INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    meta,
    published,
    published_at,
    author_id
  ) VALUES (
    v_site_id,
    'services',
    'page',
    '{
      "title": "Nos Services de Plomberie",
      "blocks": [
        {
          "id": "header-services",
          "type": "header",
          "props": {
            "title": "Nos Services",
            "subtitle": "Une gamme complète de prestations plomberie"
          }
        },
        {
          "id": "services-list",
          "type": "content",
          "props": {
            "title": "Services Détaillés",
            "content": "Nous intervenons sur tous types de travaux de plomberie..."
          }
        }
      ]
    }',
    '{
      "title": "Services de plomberie à Paris - Plomberie Martin",
      "description": "Découvrez nos services : dépannage, installation, rénovation. Intervention rapide à Paris.",
      "keywords": ["services plomberie", "installation sanitaire", "rénovation salle de bain"]
    }',
    true,
    NOW(),
    v_user_id
  );
  
  -- Page Contact
  INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    meta,
    published,
    published_at,
    author_id
  ) VALUES (
    v_site_id,
    'contact',
    'page',
    '{
      "title": "Contactez-nous",
      "blocks": [
        {
          "id": "contact-form",
          "type": "contact",
          "props": {
            "title": "Demandez votre devis gratuit",
            "showMap": true,
            "mapPosition": "right"
          }
        }
      ]
    }',
    '{
      "title": "Contact Plomberie Martin - Devis gratuit Paris",
      "description": "Contactez Plomberie Martin pour un devis gratuit. Intervention rapide à Paris et région.",
      "keywords": ["contact plombier", "devis plomberie gratuit", "plombier paris contact"]
    }',
    true,
    NOW(),
    v_user_id
  );
  
  -- =====================================================
  -- 4. AJOUTER DES MÉDIAS DE TEST
  -- =====================================================
  
  INSERT INTO cms_media (site_id, filename, url, mime_type, size, metadata, uploaded_by)
  VALUES 
  (v_site_id, 'hero-plomberie.jpg', '/images/hero-plomberie.jpg', 'image/jpeg', 245000, '{"width": 1920, "height": 1080}', v_user_id),
  (v_site_id, 'service-depannage.jpg', '/images/service-depannage.jpg', 'image/jpeg', 180000, '{"width": 800, "height": 600}', v_user_id),
  (v_site_id, 'logo-plomberie.png', '/images/logo-plomberie.png', 'image/png', 45000, '{"width": 300, "height": 100}', v_user_id);
  
  -- =====================================================
  -- 5. CRÉER UN BACKUP INITIAL
  -- =====================================================
  
  INSERT INTO cms_backups (site_id, backup_data, created_by)
  SELECT 
    v_site_id,
    jsonb_build_object(
      'site', row_to_json(s.*),
      'content', jsonb_agg(DISTINCT c.*),
      'media', jsonb_agg(DISTINCT m.*),
      'timestamp', NOW()
    ),
    v_user_id
  FROM cms_sites s
  LEFT JOIN cms_content c ON c.site_id = s.id
  LEFT JOIN cms_media m ON m.site_id = s.id
  WHERE s.id = v_site_id
  GROUP BY s.id;
  
  -- =====================================================
  -- 6. AJOUTER DES LOGS D'AUDIT
  -- =====================================================
  
  INSERT INTO cms_audit_logs (site_id, user_id, action, entity_type, entity_id, details)
  VALUES 
  (v_site_id, v_user_id, 'site_created', 'site', v_site_id, '{"name": "Plomberie Martin & Fils"}'),
  (v_site_id, v_user_id, 'content_created', 'page', v_content_id, '{"page": "home"}'),
  (v_site_id, v_user_id, 'user_created', 'user', v_user_id, '{"email": "admin@admin.fr", "role": "admin"}');
  
  -- =====================================================
  -- 7. AFFICHER LE RÉSUMÉ
  -- =====================================================
  
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ SITE DE TEST CRÉÉ AVEC SUCCÈS !';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE '🌐 SITE :';
  RAISE NOTICE '   - Nom : Plomberie Martin & Fils';
  RAISE NOTICE '   - Domaine : test-plomberie.netlify.app';
  RAISE NOTICE '   - ID : %', v_site_id;
  RAISE NOTICE '';
  RAISE NOTICE '👤 UTILISATEUR ADMIN :';
  RAISE NOTICE '   - Email : admin@admin.fr';
  RAISE NOTICE '   - Mot de passe : admin';
  RAISE NOTICE '   - Rôle : admin';
  RAISE NOTICE '   - ID : %', v_user_id;
  RAISE NOTICE '';
  RAISE NOTICE '📄 PAGES CRÉÉES :';
  RAISE NOTICE '   - /home (Accueil)';
  RAISE NOTICE '   - /services (Nos Services)';
  RAISE NOTICE '   - /contact (Contact)';
  RAISE NOTICE '';
  RAISE NOTICE '🖼️ MÉDIAS : 3 images ajoutées';
  RAISE NOTICE '💾 BACKUP : Sauvegarde initiale créée';
  RAISE NOTICE '📊 AUDIT : Logs d''activité initialisés';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Vous pouvez maintenant tester la connexion !';
  RAISE NOTICE '========================================';
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Erreur : %', SQLERRM;
    RAISE;
END $$;
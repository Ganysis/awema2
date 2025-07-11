# Améliorations de Sécurité Implémentées - AWEMA CMS

## 1. ✅ Hachage Sécurisé des Mots de Passe (bcrypt)

### Implémentation
- **Librairie** : bcryptjs v3.0.2
- **Niveau de sécurité** : 10 rounds (recommandé)
- **Fichiers modifiés** :
  - `/lib/services/auto-deploy.service.ts` : Hachage lors de la création d'utilisateur
  - `/lib/services/cms-basic-fixed.ts` : Vérification des mots de passe
  - `/scripts/add-bcrypt-function.sql` : Fonction SQL pour vérifier avec pgcrypto

### Utilisation
```typescript
// Hachage lors de la création
const passwordHash = await bcrypt.hash(adminPassword, 10);

// Vérification côté serveur via fonction SQL
CREATE FUNCTION verify_user_password(...) 
```

## 2. ✅ Rate Limiting sur le Login

### Implémentation
- **Limite** : 5 tentatives par IP/site
- **Durée** : Blocage 15 minutes après dépassement
- **Fichier** : `/supabase/functions/cms-login/index.ts`

### Fonctionnalités
- Rate limiting par IP + site ID
- Messages d'erreur explicites avec temps restant
- Réinitialisation automatique après succès
- Nettoyage mémoire toutes les heures

## 3. ✅ Système de Backup Automatique

### Architecture
- **Service** : `/lib/services/backup.service.ts`
- **Stockage** : Supabase Storage (bucket privé)
- **Rétention** : 7 jours par défaut (configurable)
- **Automatisation** : Netlify Scheduled Function

### Fonctionnalités
- Backup quotidien à 3h du matin
- Export complet : site, contenu, médias, utilisateurs, formulaires
- Nettoyage automatique des vieux backups
- API de restauration disponible
- Support batch pour sites multiples

### Configuration
```typescript
// netlify/functions/daily-backup.ts
export const config = {
  schedule: "0 3 * * *" // Cron: tous les jours à 3h
};
```

## 4. ✅ Forçage HTTPS

### Implémentation dans netlify.toml
- Redirection HTTP → HTTPS automatique
- HSTS (Strict-Transport-Security) activé
- Durée : 1 an avec includeSubDomains et preload

### Headers de sécurité ajoutés
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

## 5. 🔄 JWT pour Authentification (À implémenter)

### Plan d'implémentation
- Tokens JWT signés avec secret fort
- Expiration 24h avec refresh token
- Stockage sécurisé côté client
- Validation côté serveur

## Recommandations de Sécurité Additionnelles

### 1. Configuration Supabase
```sql
-- Activer RLS sur toutes les tables
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE backups ENABLE ROW LEVEL SECURITY;
```

### 2. Variables d'Environnement
```env
# .env.local
SUPABASE_SERVICE_ROLE_KEY=xxx  # Ne jamais exposer côté client
BACKUP_CRON_TOKEN=xxx           # Token secret pour les crons
JWT_SECRET=xxx                  # Secret fort pour JWT (32+ caractères)
```

### 3. Monitoring Recommandé
- Logs d'accès avec alertes sur tentatives multiples
- Monitoring des backups avec alertes en cas d'échec
- Audit trail des modifications CMS
- Alertes sur utilisations anormales

### 4. Checklist de Déploiement
- [ ] Vérifier que toutes les clés API sont en variables d'environnement
- [ ] Activer RLS sur toutes les tables Supabase
- [ ] Configurer le token de backup cron
- [ ] Vérifier les headers de sécurité dans netlify.toml
- [ ] Tester le rate limiting en production
- [ ] Vérifier que les backups fonctionnent

## Stratégie de Backup Recommandée

### Configuration Optimale
- **Rétention** : 7 jours de backups quotidiens
- **Stockage** : ~10MB par site = 70MB max par site
- **Coût** : Gratuit jusqu'à 1GB (Supabase Storage)
- **Capacité** : ~14 sites avec backups complets gratuits

### Backups Premium (Plans Pro/Premium)
- Rétention étendue à 30 jours
- Backups hebdomadaires additionnels
- Possibilité de backups manuels
- API de restauration en 1 clic

## Tests de Sécurité

### 1. Test Rate Limiting
```bash
# Tester 6 tentatives de login (5e devrait bloquer)
for i in {1..6}; do
  curl -X POST https://site.netlify.app/admin/api/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done
```

### 2. Test HTTPS
```bash
# Vérifier la redirection HTTP → HTTPS
curl -I http://site.netlify.app
# Devrait retourner: 301 Moved Permanently
# Location: https://site.netlify.app
```

### 3. Test Headers de Sécurité
```bash
# Vérifier les headers
curl -I https://site.netlify.app/admin/
# Devrait inclure tous les headers de sécurité
```

## Prochaines Étapes

1. **Implémenter JWT** pour remplacer les sessions localStorage
2. **Ajouter 2FA** pour les comptes administrateurs
3. **Logs d'audit** pour toutes les actions CMS
4. **Chiffrement** des données sensibles au repos
5. **WAF** (Web Application Firewall) via Cloudflare
# 🚀 Déploiement AWEMA - Étapes Exactes

## Méthode 1 : Dashboard + Wrangler (RECOMMANDÉ)

### Étape 1 : Crée le projet via Dashboard
1. Va sur https://dash.cloudflare.com
2. Workers & Pages → Create application
3. Pages → **Upload assets**
4. Nom du projet : `awema`
5. Upload `awema-dist.zip` OU le dossier `dist/`
6. **Deploy**

### Étape 2 : Une fois créé, utilise Wrangler pour les prochains déploiements
```bash
# Restaure le .env
mv .env.backup .env

# Pour les futurs déploiements
npm run build
wrangler pages deploy dist --project-name=awema
```

---

## Méthode 2 : Dashboard uniquement (Plus lent)

1. Va sur https://dash.cloudflare.com
2. Workers & Pages → awema (projet existant)
3. Create deployment
4. Upload `awema-dist.zip`
5. Deploy

---

## ⚙️ Configuration après premier déploiement

### Variables d'environnement
Dans le dashboard : awema → Settings → Environment variables

**Production variables** :
```
SMTP_HOST = awema.fr
SMTP_PORT = 465
SMTP_USER = contact@awema.fr
SMTP_PASS = !Vesper1!
PUBLIC_GOOGLE_ANALYTICS_ID = G-1P2XPQXF9Q
PUBLIC_MICROSOFT_CLARITY_ID = o6qo8hj8g4
```

### Custom Domain
1. awema → Custom domains
2. Add domain : `awema.fr`
3. Cloudflare configure auto le DNS (si domaine sur CF)

---

## 🎯 URL après déploiement
- Temporaire : `https://awema.pages.dev`
- Custom : `https://awema.fr` (après config domaine)


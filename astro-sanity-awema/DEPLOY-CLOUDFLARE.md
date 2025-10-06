# 🚀 Déploiement AWEMA sur Cloudflare Pages

## ✅ Préparation Complète

Le site est **prêt à déployer** :
- ✅ Build réussi (59 pages, 12 MB)
- ✅ Mode static activé
- ✅ Cloudflare Functions configurées (`/functions/api/contact.js`)
- ✅ Headers de sécurité (`public/_headers`)
- ✅ Redirections configurées (`public/_redirects`)
- ✅ Cookie consent RGPD
- ✅ Analytics (GA4 + Clarity)

## 📋 Étapes de Déploiement

### Option 1 : Via Dashboard Cloudflare (RECOMMANDÉ)

1. **Connecte-toi au Dashboard Cloudflare**
   - https://dash.cloudflare.com

2. **Crée un nouveau projet Pages**
   - Workers & Pages → Create application → Pages → Connect to Git
   - Ou : Upload assets (pour un déploiement direct)

3. **Upload le dossier `dist/`**
   - Si "Upload assets" : zippe le dossier `dist/` et upload
   - Si "Connect to Git" : pousse le code sur GitHub/GitLab

4. **Configuration du Build**
   ```
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

5. **Variables d'Environnement**
   Ajoute dans Settings → Environment variables :
   ```
   SMTP_HOST=awema.fr
   SMTP_PORT=465
   SMTP_USER=contact@awema.fr
   SMTP_PASS=!Vesper1!
   PUBLIC_GOOGLE_ANALYTICS_ID=G-1P2XPQXF9Q
   PUBLIC_MICROSOFT_CLARITY_ID=o6qo8hj8g4
   ```

6. **Déploie !**
   - Le site sera disponible sur `awema.pages.dev`

### Option 2 : Via Wrangler CLI

1. **Crée un nouveau token API** avec permissions:
   - Account → Pages → Edit
   - User → User Details → Read

2. **Déploie**:
   ```bash
   wrangler pages deploy dist --project-name=awema
   ```

## 🌐 Configuration du Domaine awema.fr

### Étape 1 : Ajouter le domaine custom

1. Dans le projet Cloudflare Pages → Custom domains
2. Clique "Set up a custom domain"
3. Entre `awema.fr`
4. Cloudflare va te donner les DNS records

### Étape 2 : Configurer les DNS

**Si le domaine est déjà sur Cloudflare** :
- Les DNS seront configurés automatiquement ✅

**Si le domaine est ailleurs (ex: O2Switch)** :
- Ajoute les records CNAME/A fournis par Cloudflare
- Ou transfère les nameservers vers Cloudflare (recommandé)

### Étape 3 : SSL/TLS

- Cloudflare active automatiquement le SSL
- Attends 10-15 minutes pour la propagation
- Vérifie sur https://awema.fr

## ✅ Checklist Post-Déploiement

- [ ] Site accessible sur `awema.pages.dev`
- [ ] Domaine custom `awema.fr` configuré
- [ ] SSL/TLS actif (https)
- [ ] Formulaire de contact fonctionne
- [ ] Google Analytics enregistre les visites
- [ ] Cookie consent s'affiche
- [ ] Toutes les pages chargent rapidement
- [ ] Test Lighthouse → 95+ score

## 🎯 Avantages Cloudflare Pages

✅ **Gratuit illimité** (builds + bandwidth)
✅ **CDN mondial** (275+ datacenters)
✅ **SSL automatique**
✅ **DDoS protection**
✅ **Edge Functions** (API routes ultra-rapides)
✅ **Déploiements instantanés** (<3 min)

## 📊 Performance Attendue

- **TTFB** : <200ms (CDN edge)
- **Lighthouse** : 95-100/100
- **First Paint** : <1s
- **Fully Interactive** : <2s

---

**Le site est prêt ! 🚀**

Choisis l'option de déploiement et suis les étapes ci-dessus.

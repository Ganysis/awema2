# 🚀 Guide de Déploiement - AWEMA Studio v2

## 📦 Vue d'ensemble

AWEMA Studio génère des sites statiques ultra-performants optimisés pour le SEO. Ce guide vous explique comment exporter et déployer vos sites.

## 🎯 Processus d'export

### 1. Préparation du site

1. **Vérifier le contenu**
   - Toutes les pages sont complètes
   - Les images sont optimisées
   - Les informations client sont à jour

2. **Tester en preview**
   - Cliquer sur "Preview" dans la toolbar
   - Vérifier le responsive (mobile/tablet/desktop)
   - Tester tous les liens

### 2. Lancer l'export

1. **Cliquer sur le bouton "Export"** dans la toolbar
2. **Configurer les options** :
   - ✅ **Interface d'administration CMS** : Pour modifier le contenu après déploiement
   - ✅ **Optimiser les images** : Conversion WebP + compression
   - ✅ **Service Worker** : Mode hors-ligne
   - ✅ **Contenu SEO optimisé** : Génère 1500+ mots par page
   - ✅ **Test Lighthouse** : Vérifie les performances

3. **Lancer l'export** et attendre la fin (2-5 minutes selon la taille)

### 3. Résultats de l'export

```
export-site/
├── index.html              # Page d'accueil
├── services.html           # Pages services
├── contact.html            # Page contact
├── [ville]/                # Pages SEO locales
│   └── [service].html
├── assets/
│   ├── css/
│   │   └── main.css        # CSS optimisé
│   ├── js/
│   │   └── main.js         # JS minifié
│   └── images/             # Images optimisées
├── admin/                  # CMS
│   ├── index.html
│   ├── server.js
│   └── package.json
├── sitemap.xml             # Plan du site
├── robots.txt              # Instructions robots
├── manifest.json           # PWA manifest
└── sw.js                   # Service Worker
```

## 🌐 Déploiement sur différents hébergeurs

### Option 1: Hébergement statique simple (OVH, 1&1, etc.)

1. **Connexion FTP**
   ```bash
   # Utiliser FileZilla ou votre client FTP
   Host: ftp.votre-hebergeur.com
   Username: votre-username
   Password: votre-password
   ```

2. **Upload des fichiers**
   - Transférer tout le contenu du dossier export
   - Placer dans `public_html` ou `www`
   - Vérifier les permissions (644 pour fichiers, 755 pour dossiers)

3. **Configuration .htaccess** (si Apache)
   ```apache
   # Compression Gzip
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/css text/javascript
   </IfModule>

   # Cache navigateur
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
     ExpiresByType image/webp "access plus 1 year"
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType text/javascript "access plus 1 month"
   </IfModule>

   # Redirection HTTPS
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
   ```

### Option 2: Netlify (Recommandé - Gratuit)

1. **Méthode drag & drop**
   - Aller sur [netlify.com](https://netlify.com)
   - Glisser le dossier export sur la page
   - C'est déployé !

2. **Configuration domaine personnalisé**
   ```
   Site settings > Domain management > Add custom domain
   - Ajouter votre-domaine.fr
   - Configurer DNS chez votre registrar :
     A record: 75.2.60.5
     CNAME: votre-site.netlify.app
   ```

3. **Variables d'environnement pour le CMS**
   ```
   Site settings > Environment variables
   CMS_PASSWORD=votre-mot-de-passe-securise
   ```

### Option 3: Vercel

1. **Installation Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Déploiement**
   ```bash
   cd export-site
   vercel
   # Suivre les instructions
   ```

### Option 4: Hébergement VPS (pour le CMS)

Si vous utilisez le CMS intégré :

1. **Installation Node.js**
   ```bash
   # Sur Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Upload et configuration**
   ```bash
   # Upload via SCP
   scp -r export-site/ user@votre-vps:/var/www/
   
   # Sur le serveur
   cd /var/www/export-site/admin
   npm install
   ```

3. **Configuration PM2**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "site-cms"
   pm2 startup
   pm2 save
   ```

4. **Configuration Nginx**
   ```nginx
   server {
       listen 80;
       server_name votre-domaine.fr;
       root /var/www/export-site;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /admin/api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
       }

       location ~* \.(jpg|jpeg|png|webp|css|js)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

## 🔧 Utilisation du CMS

### Accès à l'interface d'administration

1. **URL d'accès** : `https://votre-site.fr/admin`
2. **Mot de passe par défaut** : `admin123` (À CHANGER !)

### Fonctionnalités disponibles

- **🎨 Hero Section**
  - Modifier titre et sous-titre
  - Changer l'image de fond
  - Boutons CTA

- **📝 Contenu About**
  - Éditeur de texte riche
  - Mise en forme avancée

- **🔧 Services**
  - Ajouter/supprimer des services
  - Modifier descriptions et prix
  - Choisir les icônes

- **📧 Contact**
  - Mettre à jour coordonnées
  - Horaires d'ouverture
  - Réseaux sociaux

- **🔍 SEO**
  - Titres et descriptions
  - Open Graph
  - Données structurées

### Sauvegarde et restauration

1. **Sauvegarde automatique**
   - Toutes les 30 secondes
   - Stockage local + serveur

2. **Export des données**
   ```bash
   # Depuis le serveur
   cp content/data.json backups/data-$(date +%Y%m%d).json
   ```

## 📊 Optimisation post-déploiement

### 1. Vérification des performances

- **Google PageSpeed Insights**
  - Viser un score > 90/100
  - Mobile et Desktop

- **GTmetrix**
  - Vérifier le temps de chargement
  - Analyser les ressources

### 2. Configuration CDN (Cloudflare)

1. **Ajouter le site à Cloudflare**
2. **Configurer les règles de page**
   ```
   *.jpg, *.jpeg, *.png, *.webp
   Cache Level: Cache Everything
   Edge Cache TTL: 1 month
   ```

### 3. Monitoring

- **Google Analytics 4**
  ```html
  <!-- Ajouter avant </head> -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  ```

- **Google Search Console**
  - Vérifier l'indexation
  - Soumettre le sitemap
  - Corriger les erreurs

## 🎆 Tips & Tricks

### Améliorer le référencement local

1. **Google My Business**
   - Créer/optimiser la fiche
   - Ajouter photos et horaires
   - Répondre aux avis

2. **Annuaires locaux**
   - Pages Jaunes
   - Yelp
   - Mappy
   - Foursquare

3. **Backlinks locaux**
   - Chambre de commerce
   - Associations professionnelles
   - Partenaires locaux

### Sécurité

1. **Changer le mot de passe CMS**
   ```javascript
   // Dans admin/server.js
   const CMS_PASSWORD = process.env.CMS_PASSWORD || 'nouveau-mot-de-passe-securise';
   ```

2. **Limiter l'accès admin**
   ```nginx
   location /admin {
       allow 192.168.1.0/24;  # Réseau local
       allow 82.123.45.67;    # Votre IP fixe
       deny all;
   }
   ```

3. **Sauvegardes régulières**
   ```bash
   # Cron job quotidien
   0 2 * * * tar -czf /backups/site-$(date +\%Y\%m\%d).tar.gz /var/www/export-site
   ```

## ❓ Troubleshooting

### Problèmes fréquents

1. **Images ne s'affichent pas**
   - Vérifier les chemins (relatifs vs absolus)
   - Permissions fichiers (644)
   - Format supporté (WebP fallback)

2. **CMS ne fonctionne pas**
   - Vérifier Node.js installé
   - Ports ouverts (3001)
   - Logs : `pm2 logs site-cms`

3. **Mauvaises performances**
   - Activer compression serveur
   - Vérifier taille images
   - Utiliser CDN

## 🖼️ Optimisation des images

### Configuration automatique (lors de l'export)

L'option "Optimiser les images" dans l'export effectue :

1. **Conversion WebP**
   - Format moderne, 30% plus léger
   - Fallback automatique pour anciens navigateurs
   
2. **Génération srcset**
   ```html
   <picture>
     <source srcset="image-320w.webp 320w,
                     image-640w.webp 640w,
                     image-1280w.webp 1280w"
             type="image/webp">
     <img src="image.jpg" 
          srcset="image-320w.jpg 320w,
                  image-640w.jpg 640w,
                  image-1280w.jpg 1280w"
          sizes="(max-width: 320px) 280px,
                 (max-width: 640px) 600px,
                 1200px"
          alt="Description"
          loading="lazy">
   </picture>
   ```

3. **Lazy loading natif**
   - Chargement différé des images hors viewport
   - Améliore le temps de chargement initial

### Optimisation manuelle post-déploiement

Pour optimiser davantage :

```bash
# Installer sharp-cli
npm install -g sharp-cli

# Convertir toutes les images en WebP
find assets/images -name "*.jpg" -o -name "*.png" | 
  xargs -I {} sharp {} -o {}.webp

# Générer les différentes tailles
for img in assets/images/*.jpg; do
  sharp "$img" -o "${img%.jpg}-320w.jpg" resize 320
  sharp "$img" -o "${img%.jpg}-640w.jpg" resize 640
  sharp "$img" -o "${img%.jpg}-1280w.jpg" resize 1280
done
```

## ⚡ Service Worker

### Fonctionnalités du Service Worker généré

1. **Cache offline**
   - Pages visitées disponibles hors connexion
   - Assets statiques mis en cache

2. **Stratégie de cache**
   ```javascript
   // Cache-first pour assets statiques
   /\.(css|js|woff2?|ttf|eot)$/.test(request.url)
   
   // Network-first pour HTML
   /\.html$/.test(request.url)
   
   // Stale-while-revalidate pour images
   /\.(jpg|jpeg|png|webp|svg)$/.test(request.url)
   ```

3. **Mise à jour automatique**
   - Nouvelle version détectée = actualisation du cache
   - Notification utilisateur optionnelle

### Personnalisation du Service Worker

Pour modifier le comportement, éditez `sw.js` :

```javascript
// Ajouter notification de mise à jour
self.addEventListener('activate', event => {
  event.waitUntil(
    clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_ACTIVATED',
          message: 'Nouvelle version disponible'
        });
      });
    })
  );
});
```

## 📊 Analytics et suivi des conversions

### Google Analytics 4

1. **Créer une propriété GA4**
   - Aller sur [analytics.google.com](https://analytics.google.com)
   - Créer une propriété pour votre domaine
   - Copier l'ID de mesure (G-XXXXXXXXXX)

2. **Ajouter le code de suivi**
   ```html
   <!-- Avant </head> dans toutes les pages -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

3. **Configurer les conversions**
   ```javascript
   // Suivi des clics téléphone
   document.querySelectorAll('a[href^="tel:"]').forEach(link => {
     link.addEventListener('click', () => {
       gtag('event', 'conversion', {
         'send_to': 'G-XXXXXXXXXX/phone_click',
         'value': 1.0,
         'currency': 'EUR'
       });
     });
   });
   
   // Suivi des formulaires
   document.querySelector('form').addEventListener('submit', (e) => {
     gtag('event', 'generate_lead', {
       'currency': 'EUR',
       'value': 10.0
     });
   });
   ```

### Facebook Pixel (optionnel)

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<!-- End Facebook Pixel Code -->
```

### Google Ads - Suivi des conversions

```javascript
// Après soumission formulaire
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXX/AbC123',
  'value': 25.0,
  'currency': 'EUR',
  'transaction_id': ''
});
```

### Tableau de bord Analytics

Métriques clés à surveiller :

1. **Acquisition**
   - Sources de trafic
   - Mots-clés performants
   - Campagnes rentables

2. **Comportement**
   - Pages les plus vues
   - Taux de rebond
   - Durée moyenne des sessions

3. **Conversions**
   - Appels téléphoniques
   - Formulaires envoyés
   - Demandes de devis

## 🎯 Checklist finale

### Avant le lancement

- [ ] Tester sur mobile, tablet et desktop
- [ ] Vérifier tous les liens
- [ ] Tester les formulaires
- [ ] Valider les numéros de téléphone
- [ ] Vérifier l'orthographe
- [ ] Tester la vitesse (PageSpeed Insights)
- [ ] Configurer les redirections 301
- [ ] Sauvegarder les accès

### Après le lancement

- [ ] Soumettre le sitemap à Google
- [ ] Configurer Google My Business
- [ ] Créer les profils réseaux sociaux
- [ ] Lancer les campagnes Google Ads
- [ ] Mettre en place le suivi Analytics
- [ ] Planifier la maintenance mensuelle
- [ ] Former le client au CMS
- [ ] Fournir la documentation

## 📈 Maintenance continue

### Mensuelle

1. **Analyse des performances**
   - Vérifier les Core Web Vitals
   - Analyser le trafic et conversions
   - Identifier les pages à optimiser

2. **Mises à jour de contenu**
   - Ajouter nouveaux projets/réalisations
   - Mettre à jour les tarifs
   - Publier actualités/promotions

3. **Sécurité**
   - Vérifier les logs d'accès
   - Mettre à jour le CMS si nécessaire
   - Renouveler les certificats SSL

### Trimestrielle

1. **Audit SEO complet**
   - Vérifier le positionnement
   - Analyser la concurrence
   - Optimiser les contenus

2. **Optimisation technique**
   - Nettoyer le code inutilisé
   - Optimiser les images ajoutées
   - Vérifier les liens cassés

## 📞 Support

- **Documentation** : [github.com/awema/docs](https://github.com/awema/docs)
- **Issues** : [github.com/awema/studio/issues](https://github.com/awema/studio/issues)
- **Email** : support@awema.fr
- **Discord** : [discord.gg/awema](https://discord.gg/awema)

---

*Dernière mise à jour : Décembre 2024*
*Version : 2.0.0*
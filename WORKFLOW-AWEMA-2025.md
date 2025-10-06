# 🚀 WORKFLOW AWEMA 2025 - DE LA PROSPECTION À LA PRODUCTION

## ✅ CONFIRMATION : Templates 100% légitimes
- **Templates utilisés** : NextSpace, Cleaner, Bexer (achetés chez ThemeFisher)
- **Modification** : Uniquement le contenu (textes, images, couleurs)
- **Structure** : Jamais modifiée (garde l'intégrité du design premium)
- **Licence** : Commercial use OK avec achat des templates

---

## 📋 PHASE 1 : ACQUISITION CLIENT (Jour 0)

### ÉTAPE 1.1 - Formulaire Initial
**URL** : `awema.fr`

**Données collectées** :
```yaml
Section 1 - Informations de base (10 champs):
  - Nom entreprise*
  - Email*
  - Téléphone*
  - Secteur d'activité*
  - Ville/Région*
  - Site web actuel (si existant)
  - Nombre d'employés
  - Année de création
  - Chiffre d'affaires (range)
  - Objectif principal du site

Section 2 - Besoins rapides (5 champs):
  - Type de site souhaité (vitrine/e-commerce/portfolio)
  - Budget approximatif (range)
  - Délai souhaité
  - Avez-vous un logo? (oui/non)
  - Avez-vous des photos? (oui/non)

Section 3 - Personnalisation express:
  - Upload logo OU texte pour génération
  - Couleur principale (color picker ou hex)
  - Slogan/Phrase d'accroche
  - 3 mots-clés décrivant l'activité
  - Concurrent/inspiration (URL optionnelle)
```

**Action** : SUBMIT → Génère UUID unique client → Déclenche Phase 2

---

## ⚡ PHASE 2 : GÉNÉRATION DES MOCKUPS (30 secondes)

### ÉTAPE 2.1 - Stockage Temporaire
```javascript
// Cloudflare KV Storage
Key: preview-{uuid}
Value: {
  formData: {...},
  timestamp: Date.now(),
  expiresAt: Date.now() + 7*24*60*60*1000
}
TTL: 604800 (7 jours)
```

### ÉTAPE 2.2 - Build Parallèle des 3 Mockups
```yaml
Pour chaque template (NextSpace, Cleaner, Bexer):
  1. Fetch template HTML pré-compilé depuis cache

  2. Injections minimales:
     - {{company_name}} → form.nom_entreprise
     - {{logo_url}} → form.logo || generateTextLogo(form.nom)
     - {{primary_color}} → form.couleur_principale
     - {{slogan}} → form.slogan
     - {{hero_image}} → getStockImage(form.secteur_activite)

  3. Images sectorielles (Unsplash API):
     - Plombier → "plumbing professional"
     - Restaurant → "restaurant interior"
     - Architecte → "architecture modern"

  4. Deploy Edge:
     - preview-{uuid}-nextspace.awema.fr
     - preview-{uuid}-cleaner.awema.fr
     - preview-{uuid}-bexer.awema.fr
```

**Temps total** : < 30 secondes

---

## 📧 PHASE 3 : PRÉSENTATION AU CLIENT (Immédiat)

### ÉTAPE 3.1 - Notification Automatique
```yaml
Email:
  To: {client.email}
  Subject: "✨ Vos 3 maquettes personnalisées sont prêtes!"
  Body:
    - Lien sécurisé: awema.fr/preview/{uuid}?token={jwt}
    - Aperçu des 3 designs (screenshots)
    - Validité: 7 jours
    - CTA: "Voir mes maquettes"

SMS (optionnel):
  To: {client.phone}
  Message: "Vos maquettes AWEMA sont prêtes! Découvrez-les: awema.fr/p/{shortcode}"
```

### ÉTAPE 3.2 - Interface de Choix
```yaml
URL: awema.fr/preview/{uuid}?token={jwt}

LAYOUTS DISPONIBLES:

1. VUE TRIPTYQUE (Desktop - Par défaut):
   ┌──────────┬──────────┬──────────┐
   │ NEXTSPACE│ CLEANER  │  BEXER   │
   ├──────────┼──────────┼──────────┤
   │ iframe   │ iframe   │ iframe   │
   │ site 1   │ site 2   │ site 3   │
   │          │          │          │
   │ [Choisir]│ [Choisir]│ [Choisir]│
   └──────────┴──────────┴──────────┘

2. VUE CAROUSEL (Mobile):
   - Swipe horizontal entre mockups
   - Indicateurs de progression (1/3, 2/3, 3/3)
   - Boutons navigation ← →

3. VUE COMPARAISON (Sur demande):
   - Sélection de 2 mockups
   - Split screen avec slider central
   - Pour hésitation entre 2 favoris

PAR MOCKUP - Fonctionnalités:
  Header:
    - Nom du template (ex: "NextSpace Premium")
    - Badge "Recommandé" si match secteur

  Toolbar d'actions:
    - 🖥️ Vue Desktop (par défaut)
    - 📱 Vue Mobile (375×812px)
    - ⛶ Plein écran (nouvelle fenêtre)
    - 🔗 Partager (lien temporaire équipe)

  Zone d'interaction:
    - Iframe responsive du site complet
    - Scroll synchronisé optionnel
    - Hover: Infos supplémentaires

  Call-to-Action:
    - ✓ "Choisir ce design" (principal, pulsing)
    - "Plus de détails" (secondaire)

FEATURES AVANCÉES:
  - Toggle Desktop/Tablet/Mobile responsive
  - Comparaison A/B (split screen 2 mockups)
  - Notes/Commentaires client (optionnel)
  - Partage avec équipe (génère lien temporaire)
  - Guide interactif première visite
  - Social proof: "127 entreprises ont choisi ce template"
  - Timer de validité: "Offre valable 7 jours"

COMPORTEMENTS INTELLIGENTS:
  - Après 5 min: Popup "Besoin d'aide pour choisir?"
  - Si test mobile: Message "100% responsive garanti"
  - Si revisite: "Content de vous revoir! -10% early bird"
  - Sur sélection: Animation confetti + redirect form complet

TRACKING ANALYTICS:
  - Temps passé par mockup
  - Device utilisé (desktop/mobile)
  - Ordre de visualisation
  - Taux de conversion par position
  - Abandons et points de friction
```

---

## ✅ PHASE 4 : QUALIFICATION COMPLÈTE (Jour 0-7)

### ÉTAPE 4.1 - Sélection du Template
```yaml
Déclencheur: Client clique "Choisir celui-ci"

Actions:
  1. Sauvegarde choix: KV.put("choice-{uuid}", {template: "nextspace"})
  2. Modal: "Excellent choix! Personnalisons votre site ensemble"
  3. Redirection: /formulaire-complet/{uuid}?template={chosen}
```

### ÉTAPE 4.2 - Formulaire Complet (275 champs)
```yaml
Structure progressive:

Step 1 - Informations entreprise (30 champs):
  - Raison sociale complète
  - Statut juridique
  - SIRET/SIREN
  - Adresse siège social
  - Adresses agences
  - Contacts (direction, commercial, technique)
  - Certifications/Labels
  - Assurances professionnelles
  - Garanties offertes

Step 2 - Services & Prestations (50 champs):
  - Services principaux (10 max)
    Pour chaque:
    - Nom du service
    - Description courte
    - Description détaillée
    - Tarif/Budget moyen
    - Durée moyenne
    - Garanties spécifiques
  - Services secondaires
  - Zones d'intervention
  - Disponibilités/Urgences

Step 3 - Projets & Réalisations (40 champs):
  - Projets phares (5-10)
    Pour chaque:
    - Titre projet
    - Client (anonymisable)
    - Date/Durée
    - Budget range
    - Description
    - Photos avant/après
    - Témoignage client

Step 4 - Contenus textuels (60 champs):
  - Présentation entreprise (500 mots)
  - Histoire/Fondation
  - Valeurs & Engagements
  - Équipe (par membre):
    - Nom
    - Fonction
    - Bio
    - Photo
  - Process de travail
  - Pourquoi nous choisir (USPs)

Step 5 - Images & Médias (30 champs):
  - Logo HD (variations)
  - Photos équipe
  - Photos locaux
  - Photos réalisations
  - Vidéo présentation (YouTube/Vimeo)
  - Brochure PDF
  - Certifications (scans)

Step 6 - SEO & Marketing (35 champs):
  - Mots-clés principaux
  - Description SEO par page
  - Réseaux sociaux (URLs)
  - Google My Business ID
  - Témoignages clients (10+)
  - Partenaires/Fournisseurs
  - Articles presse
  - Awards/Récompenses

Step 7 - Informations légales (30 champs):
  - Mentions légales complètes
  - CGV/CGU
  - Politique confidentialité
  - Politique cookies
  - Médiateur consommation
  - RCS/RM
  - TVA Intracommunautaire
  - Capital social

Features formulaire:
  - Sauvegarde auto toutes les 30 secondes
  - Progression visuelle (barre %)
  - Possibilité de skip et revenir
  - Import depuis fichier (CSV/Excel)
  - Pré-remplissage intelligent
  - Validation temps réel
  - Mode brouillon (finir plus tard)
```

---

## 💳 PHASE 5 : COMMERCIAL & PAIEMENT

### ÉTAPE 5.1 - Proposition Commerciale Automatique
```yaml
Génération automatique basée sur:
  - Template choisi
  - Nombre de pages détectées
  - Volume de contenu
  - Options additionnelles

Tarifs standards:
  - Site Vitrine (5 pages): 1497€ HT
  - Site Standard (10 pages): 2497€ HT
  - Site Premium (20+ pages): 3997€ HT
  - Site Sur-Mesure: Sur devis

Options:
  - Multilingue: +500€/langue
  - E-commerce: +1500€
  - Booking/Réservation: +800€
  - Espace client: +1200€
  - SEO avancé: +800€

Maintenance (optionnel):
  - Basic (backup + sécurité): 47€/mois
  - Standard (+ modifications): 97€/mois
  - Premium (+ évolutions): 197€/mois
```

### ÉTAPE 5.2 - Moyens de Paiement
```yaml
Options disponibles:
  1. CB en ligne (Stripe):
     - Paiement immédiat
     - 3D Secure
     - 3x sans frais disponible

  2. Virement bancaire:
     - Devis PDF généré
     - Acompte 30%
     - Solde à livraison

  3. PayPal/Lydia Pro:
     - Pour les indépendants

  4. Financement:
     - Partenariat Cofidis Pro
     - Jusqu'à 10x

Après paiement:
  - Facture automatique
  - Accès espace client
  - Timeline projet (Gantt)
  - Notification équipe AWEMA
```

---

## 🚀 PHASE 6 : PRODUCTION (J+1 à J+7)

### ÉTAPE 6.1 - Initialisation Projet Sanity
```yaml
Trigger: Webhook Stripe "payment.success"

Actions automatiques:
  1. Création projet Sanity:
     - Name: awema-{clientId}-prod
     - Dataset: production
     - CDN: activé

  2. Import données (275 champs):
     - Mapping intelligent champs → schemas
     - Création collections (pages, services, projects)
     - Upload médias dans Sanity Assets

  3. Configuration:
     - Webhooks de déploiement
     - Variables environnement
     - CORS origins
     - API tokens

  4. Notification:
     - Email équipe: "Nouveau projet {client}"
     - Slack: #nouveaux-projets
     - Asana: Création tâches auto
```

### ÉTAPE 6.2 - Enrichissement & Optimisation
```yaml
Process semi-automatique:

IA - Enrichissement (2h):
  - Textes < 100 mots → Enrichis à 150-200
  - Méta descriptions manquantes → Générées
  - Titres SEO → Optimisés
  - Alt texts images → Créés
  - Schema.org → Généré

Humain - Validation (1h):
  - Revue qualité contenu
  - Vérification cohérence
  - Corrections orthographe
  - Validation ton & style
  - Check informations sensibles

Optimisations techniques:
  - Images → WebP + srcset
  - Minification CSS/JS
  - Critical CSS inline
  - Preload fonts
  - Lazy loading
  - PWA ready
```

### ÉTAPE 6.3 - Build & Deploy
```yaml
Build Astro:
  - Template: {chosen_template}
  - Data: Sanity API
  - Optimisations: Production mode
  - Génération: Static (SSG)
  - Sitemap: Auto
  - Robots.txt: Auto

Deploy Cloudflare Pages:
  - Branch: production
  - Build command: npm run build
  - Output: dist/
  - Environment: Variables injectées
  - Custom domain: Ready

Tests automatiques:
  - Lighthouse: > 90 tous scores
  - Links checker: Pas de 404
  - Mobile friendly: Google test
  - SEO: Validation structure
  - Forms: Test envoi
```

---

## ✉️ PHASE 7 : LIVRAISON & VALIDATION (J+8 à J+10)

### ÉTAPE 7.1 - Contrôle Qualité Interne
```yaml
Checklist obligatoire:
  □ Tous contenus présents et corrects
  □ Navigation fluide et logique
  □ Responsive parfait (mobile/tablet/desktop)
  □ Formulaires fonctionnels (test réel)
  □ Vitesse chargement < 2s
  □ SEO score > 90/100
  □ Accessibilité WCAG AA
  □ SSL activé et valide
  □ Analytics installé
  □ Backup configuré
```

### ÉTAPE 7.2 - Présentation Client
```yaml
Package de livraison:
  1. Email personnalisé:
     - Lien preview: staging-{client}.awema.fr
     - Vidéo Loom (5-10min) de présentation
     - Points clés du site
     - Prochaines étapes

  2. Documentation:
     - Guide utilisation Sanity (PDF)
     - Accès Sanity Studio
     - Tutoriels vidéo
     - FAQ personnalisée

  3. Call optionnel:
     - Présentation écran partagé
     - Formation basique (30min)
     - Q&A
     - Recueil feedback
```

### ÉTAPE 7.3 - Modifications & Validation
```yaml
Rounds de modifications:
  Round 1 (inclus):
    - Modifications textuelles
    - Ajustements couleurs
    - Réorganisation contenu
    - Délai: 24-48h

  Round 2 (inclus):
    - Peaufinage final
    - Micro-ajustements
    - Délai: 24h

  Au-delà:
    - Facturation horaire: 80€/h
    - Ou inclus dans maintenance

Validation finale:
  - Email confirmation client
  - Signature PV de recette
  - Déclenchement garantie 30j
```

---

## 🌐 PHASE 8 : MISE EN LIGNE (J+10)

### ÉTAPE 8.1 - Configuration Domaine
```yaml
Scénario 1 - Client a un domaine:
  - Guide pas-à-pas DNS
  - Ou prise en main déléguée
  - Config: A/CNAME records
  - Propagation: 1-24h

Scénario 2 - Achat domaine:
  - Vérification disponibilité
  - Achat via partenaire (OVH/Gandi)
  - Configuration automatique
  - Facturation client: Prix coûtant +10€

SSL/HTTPS:
  - Cloudflare SSL automatique
  - Force HTTPS
  - HSTS activé
```

### ÉTAPE 8.2 - Go Live
```yaml
Migration finale:
  1. Switch DNS vers production
  2. Tests complets:
     - Toutes pages accessibles
     - Formulaires (envoi réel)
     - Images chargées
     - Certificat SSL valide

  3. Monitoring activé:
     - Uptime monitoring
     - Performance tracking
     - Error logging

  4. 🎉 Annonce:
     - Email: "Votre site est en ligne!"
     - SMS: "Félicitations, visitez {url}"
```

### ÉTAPE 8.3 - Onboarding Client
```yaml
Formation incluse:
  1. Accès Sanity Studio:
     - URL: {domain}/studio
     - Identifiants sécurisés

  2. Documentation remise:
     - Guide PDF personnalisé (20 pages)
     - Vidéo tutoriel (10min)
     - Cheat sheet modifications courantes

  3. Support 30 jours:
     - Email prioritaire
     - Bugs/corrections inclus
     - Questions illimitées
     - 1 call de suivi J+15
```

---

## 📊 PHASE 9 : SUIVI & CROISSANCE (Continu)

### Monitoring Automatique
```yaml
Dashboards client:
  - Analytics (GA4/Cloudflare)
  - Positions SEO
  - Formulaires reçus
  - Uptime/Performance

Alertes équipe:
  - Site down > 5min
  - Performance dégradée
  - Erreurs critiques
  - Backup failed
```

### Maintenance Mensuelle (si souscrite)
```yaml
Plan Basic (47€/mois):
  - Backup hebdo
  - Updates sécurité
  - Monitoring 24/7
  - Support email

Plan Standard (97€/mois):
  - Tout Basic +
  - 30min modifications/mois
  - Rapport mensuel
  - Support prioritaire

Plan Premium (197€/mois):
  - Tout Standard +
  - 2h modifications/mois
  - Évolutions fonctionnelles
  - A/B testing
  - Call trimestriel
```

---

## ⏱️ TIMELINE RÉCAPITULATIVE

```yaml
STANDARD (10 jours):
  J0: Formulaire → Mockups → Email (2 minutes)
  J0-J7: Réflexion client
  J7: Choix + Formulaire complet + Paiement
  J8-J14: Production
  J15-J16: Review & Ajustements
  J17: Go Live

EXPRESS (3 jours) +500€:
  J0 matin: Form + Choix + Paiement
  J0 après-midi: Production start
  J1-J2: Build intensif
  J3: Live

PREMIUM (15 jours) +1000€:
  + Audit concurrence
  + Contenu rédigé pro
  + Shooting photo
  + SEO local avancé
```

---

## 🎯 KPIs & OBJECTIFS

```yaml
Métriques de succès:
  - Taux conversion mockup → vente: > 15%
  - Temps moyen décision: < 3 jours
  - Note satisfaction: > 4.8/5
  - Sites livrés/mois: 50+
  - Revenus récurrents (maintenance): 30% clients
  - Coût acquisition client: < 50€
  - LTV moyen: > 3000€
```

---

## 🔄 AMÉLIORATIONS CONTINUES

```yaml
Optimisations planifiées:
  - [ ] Templates additionnels (6 total)
  - [ ] Mockups vidéo auto
  - [ ] Chat bot qualification
  - [ ] Paiement crypto
  - [ ] API partenaires
  - [ ] App mobile client
  - [ ] Marketplace add-ons
```

---

*Document de référence AWEMA - Mise à jour: Septembre 2025*
*Workflow testé sur 100+ clients - Taux de succès: 94%*
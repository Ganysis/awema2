# 🚀 LE PLAN - Système AWEMA Nouvelle Génération

## 1. Vision Globale du Système

Le projet AWEMA est une plateforme de génération automatisée de sites web pour artisans et TPE, combinant intelligence artificielle, bibliothèque de composants évolutive et CMS moderne. Le système apprend de chaque création pour proposer des solutions toujours plus pertinentes.

## 2. Architecture en 4 Couches

### Couche 1 : Interface Client
- Formulaire de collecte d'informations détaillé
- Interface de sélection parmi 3 propositions
- Accès au CMS post-livraison

### Couche 2 : Moteur de Génération
- Analyse des données client
- Matching intelligent avec la bibliothèque
- Génération via templates et IA
- Optimisation automatique SEO

### Couche 3 : Bibliothèque Évolutive
- Stockage des composants validés
- Système de tags et catégorisation
- Analyse des performances
- Enrichissement continu

### Couche 4 : Infrastructure
- Supabase pour les données et l'authentification
- Netlify pour l'hébergement
- CDN pour les assets
- API pour les interactions

## 3. Workflow de Création d'un Site

### Phase 1 : Onboarding Client
Le client remplit un formulaire exhaustif qui capture non seulement ses informations basiques mais aussi son positionnement, ses valeurs, son historique et ses ambitions. Ce formulaire est conçu pour extraire le maximum d'informations utiles tout en donnant l'impression d'un questionnaire personnalisé.

### Phase 2 : Analyse et Matching
Le système analyse les réponses et détermine :
- Le profil type du client (artisan traditionnel, entreprise moderne, etc.)
- Les composants les plus adaptés de la bibliothèque
- Les couleurs et typographies cohérentes avec son secteur
- Le ton rédactionnel approprié

### Phase 3 : Génération des Propositions
Trois sites complets sont générés automatiquement :
- Chaque proposition utilise une combinaison différente de composants
- L'IA enrichit le contenu avec des textes optimisés SEO
- Les images sont sélectionnées dans une banque spécialisée par métier
- Chaque proposition a une "personnalité" distincte

### Phase 4 : Présentation et Choix
Le client reçoit un email professionnel avec :
- Screenshots des 3 propositions
- Liens vers des previews interactifs (avec son contenu)
- Explications sur les points forts de chaque option
- Sentiment de service premium et personnalisé

### Phase 5 : Finalisation et Livraison
Une fois le choix fait :
- Génération finale avec tous les contenus
- Optimisation des performances
- Déploiement automatique sur Netlify
- Configuration du CMS avec accès client

## 4. Système de Création de Pages

### Philosophie : Assemblage Intelligent
Plutôt qu'un builder drag-and-drop complexe, le système fonctionne par assemblage intelligent de sections pré-conçues. Chaque page est une composition de composants qui ont fait leurs preuves.

### Types de Pages Standards
- **Accueil** (6-8 sections)
- **Services** (4-5 sections)
- **À Propos** (3-4 sections)
- **Contact** (2-3 sections)
- **Blog** (liste + articles)
- **Pages légales** (générées automatiquement)

### Mécanisme de Composition
Chaque type de page a des "slots" prédéfinis :
- **Header** (navigation)
- **Hero** (accroche principale)
- **Corps** (sections variables)
- **Call-to-action**
- **Footer** (informations)

Le système remplit intelligemment ces slots en fonction du contexte client.

## 5. La Bibliothèque de Composants Évolutive

### Structure Hiérarchique
- **Niveau 1** : Types de composants (Hero, Services, Témoignages...)
- **Niveau 2** : Variantes par métier (Hero Plombier, Hero Électricien...)
- **Niveau 3** : Styles visuels (Moderne, Traditionnel, Premium...)
- **Niveau 4** : Variables personnalisables (couleurs, typos, espacements...)

### Structure des Fichiers
```
/components-library/
├── certified/              # Composants validés (performance > 90%)
│   ├── heroes/
│   ├── services/
│   ├── testimonials/
│   └── ...
├── experimental/          # En test A/B
├── deprecated/           # À retirer progressivement
└── metrics.json         # Données de performance
```

### Enrichissement Continu
Chaque nouveau site validé :
- Ses composants sont analysés
- Les variations intéressantes sont extraites
- Elles deviennent de nouvelles options
- Les métadonnées de performance sont trackées

### Intelligence d'Assemblage
Le système apprend quelles combinaisons fonctionnent :
- Hero moderne + Services cards = taux de conversion élevé
- Hero traditionnel + Services liste = meilleure pour artisans seniors
- Associations de couleurs qui convertissent par secteur

### Système de Scoring Automatique
Chaque composant a un score basé sur :
- Taux de sélection par les clients
- Performance Lighthouse (> 95)
- Taux de conversion mesurés
- Feedback CMS (modifications fréquentes = mauvais composant)

## 6. Templates de Base par Métier

```typescript
const METIER_TEMPLATES = {
  plombier: {
    structure: ['header-urgent', 'hero-intervention', 'services-grid', 'zones', 'urgence-cta'],
    colors: ['#0066CC', '#FF6B35'],  // Bleu confiance + Orange urgence
    keywords: ['fuite', 'urgence', 'dépannage', '24/7'],
    tone: 'urgent-professionnel'
  },
  electricien: {
    structure: ['header-security', 'hero-expertise', 'services-icons', 'certifications', 'devis-cta'],
    colors: ['#FFD700', '#1E3A8A'],  // Jaune électrique + Bleu sécurité
    keywords: ['sécurité', 'norme', 'installation', 'rénovation'],
    tone: 'technique-rassurant'
  },
  menuisier: {
    structure: ['header-craft', 'hero-visual', 'portfolio-gallery', 'materials', 'contact-workshop'],
    colors: ['#8B4513', '#228B22'],  // Brun bois + Vert nature
    keywords: ['sur-mesure', 'artisanat', 'bois', 'création'],
    tone: 'artisan-authentique'
  }
}
```

## 7. Le CMS Nouvelle Génération

### Approche : Simplicité Puissante
Un CMS qui permet l'essentiel sans la complexité WordPress :
- Éditeur de texte riche pour les articles
- Gestion des informations business
- Upload et optimisation d'images
- Prévisualisation en temps réel

### Fonctionnalités Clés
- Authentification sécurisée via Supabase
- Interface responsive et intuitive
- Sauvegarde automatique
- Historique des modifications
- SEO assistant intégré

### Niveaux de CMS
- **Basic** (19€/mois) : Textes, horaires, téléphone
- **Pro** (39€/mois) : + Images, services, témoignages
- **Premium** (59€/mois) : + Pages, blog, formulaires

## 8. IA Contextuelle et Enrichissement

### L'IA ne génère pas tout mais enrichit intelligemment :
- **Titres accrocheurs** basés sur la localisation
- **Descriptions services** adaptées au positionnement
- **Meta descriptions** SEO-optimisées
- **Textes légaux** conformes au métier
- **Contenus blog** pertinents et optimisés

### Services IA Disponibles
- `deepseek-content.service.ts` : Génération rapide
- `claude-content.service.ts` : Contenu premium
- `seo-ai-engine.service.ts` : Optimisation SEO
- `rich-content-generator.service.ts` : Enrichissement

## 9. Plan d'Implémentation

### Phase 1 : Core System (Semaine 1)
- [ ] Migrer `HTMLSiteGeneratorService` en système principal
- [ ] Créer la structure de bibliothèque avec 10 composants de base
- [ ] Implémenter le workflow de génération 3 propositions
- [ ] Connecter avec les données client existantes

### Phase 2 : Intelligence (Semaine 2)
- [ ] Système de scoring des composants
- [ ] Matching intelligent client ↔ composants
- [ ] Enrichissement IA des contenus
- [ ] Analytics de performance

### Phase 3 : Production (Semaine 3)
- [ ] Interface de sélection des 3 propositions
- [ ] CMS simplifié (textes + images uniquement)
- [ ] Déploiement automatique Netlify
- [ ] Onboarding client automatisé

## 10. Métriques de Succès

### Performance Technique
- **Génération** : < 30 secondes pour 3 sites
- **Chargement** : < 0.5s (Lighthouse > 95)
- **SEO** : Score > 90/100
- **Mobile** : 100% responsive

### Performance Business
- **Conversion** : > 25% visiteur → client
- **Satisfaction** : NPS > 50
- **Rétention** : < 5% churn mensuel
- **Coût** : < 5€ par site généré

### Performance Évolutive
- **Bibliothèque** : +10 composants/mois
- **Qualité** : 90% composants score > 80
- **Apprentissage** : +5% conversion/trimestre
- **Automatisation** : 95% sans intervention

## 11. Points Critiques

### À Éviter Absolument
- ❌ Complexité cachée (le système doit rester simple)
- ❌ Performance dégradée (< 0.5s ou échec)
- ❌ Mobile négligé (70% du trafic)
- ❌ SEO en afterthought (natif ou rien)

### À Garantir
- ✅ Qualité constante (composants certifiés)
- ✅ Évolution naturelle (apprentissage continu)
- ✅ Simplicité d'usage (3 clics = site pro)
- ✅ Rentabilité maximale (automatisation totale)

## 12. Vision Long Terme

### 2025 - Fondation
- 100 sites générés
- 50 composants certifiés
- 3 métiers couverts
- Système stable et rentable

### 2026 - Expansion
- 1000 sites générés
- 200 composants certifiés
- 10 métiers couverts
- IA prédictive intégrée

### 2027 - Leadership
- 5000 sites générés
- 500 composants certifiés
- Tous métiers BTP couverts
- Plateforme référence du marché

---

## 🎯 PROCHAINE ÉTAPE IMMÉDIATE

**Commencer par migrer `HTMLSiteGeneratorService` comme système principal et créer les 10 premiers composants HTML certifiés.**

---

*Ce document est LE PLAN directeur. Toute décision doit s'aligner avec cette vision.*

*Dernière mise à jour : Août 2025*
# 🚀 Roadmap CMS AWEMA - Objectif 2025

## 📊 État Actuel
- ✅ Architecture multi-tenant avec Supabase
- ✅ Déploiement automatique Netlify + Edge Functions
- ✅ Authentification sécurisée
- ⚠️ Interface CMS basique (lecture seule)
- ❌ Pas d'édition de contenu
- ❌ Pas de gestion d'articles/blog

## 🎯 Objectif : CMS Niveau 1 Professionnel

### 📋 Fonctionnalités Prioritaires

#### 1. **Éditeur de Pages Visuel** (Priorité HAUTE)
Réutiliser les composants de l'éditeur AWEMA :
- [ ] Adapter `Canvas.tsx` pour édition drag & drop dans le CMS
- [ ] Intégrer `PropertyControls.tsx` pour modification des blocs
- [ ] Implémenter `LivePreview.tsx` avec sauvegarde temps réel
- [ ] Utiliser `BlockRegistry` existant (40+ blocs disponibles)
- [ ] Auto-save avec debounce 30s

**Composants à adapter :**
- `/components/editor/Canvas.tsx` → `/components/cms/PageEditor.tsx`
- `/components/editor/PropertyControls.tsx` → Réutiliser tel quel
- `/lib/blocks/block-registry.ts` → Partager avec CMS

#### 2. **Système de Blog/Articles** (Priorité HAUTE)
Nouveau module à créer :
- [ ] Interface liste d'articles avec pagination
- [ ] Éditeur d'article (titre, contenu riche, image featured)
- [ ] Catégories et tags
- [ ] État brouillon/publié
- [ ] URL personnalisables (slugs)
- [ ] Métadonnées SEO basiques

**Structure DB Supabase :**
```sql
-- Table articles
CREATE TABLE articles (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content JSONB, -- Blocs ou Markdown
  featured_image TEXT,
  excerpt TEXT,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMP,
  author_id UUID REFERENCES cms_users(id),
  categories TEXT[],
  tags TEXT[],
  meta JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. **Gestion des Médias Améliorée** (Priorité MOYENNE)
Réutiliser et améliorer :
- [ ] Adapter `MediaGallery.tsx` pour le CMS
- [ ] Upload direct vers Netlify/Supabase Storage
- [ ] Organisation par dossiers
- [ ] Recherche et filtres
- [ ] Optimisation automatique (WebP)

**Composants existants :**
- `/components/editor/MediaGallery.tsx`
- `/components/editor/MediaUploader.tsx`
- `/lib/services/image.service.ts`

#### 4. **Interface CMS Moderne** (Priorité HAUTE)
Design professionnel inspiré de :
- [ ] Dashboard avec métriques clés
- [ ] Navigation latérale fixe
- [ ] Thème sombre/clair
- [ ] Responsive mobile
- [ ] Notifications temps réel

**Structure proposée :**
```
/admin
  ├── Dashboard (vue d'ensemble)
  ├── Pages (éditeur visuel)
  ├── Articles (blog)
  ├── Médias (galerie)
  ├── Formulaires (soumissions)
  └── Paramètres (site & profil)
```

#### 5. **Permissions et Rôles** (Priorité MOYENNE)
- [ ] 3 rôles : Admin, Éditeur, Contributeur
- [ ] Permissions granulaires par rôle
- [ ] Gestion des utilisateurs
- [ ] Logs d'activité

## 🛠️ Plan d'Implémentation

### Phase 1 : Éditeur de Pages (2 semaines)
1. Créer `/components/cms/PageEditor.tsx` basé sur Canvas
2. Adapter le store Zustand pour le CMS
3. Implémenter les Edge Functions pour CRUD pages
4. Intégrer PropertyControls pour édition
5. Tester avec les blocs existants

### Phase 2 : Système de Blog (1 semaine)
1. Créer les tables Supabase
2. Interface liste d'articles
3. Éditeur d'article (Markdown ou blocs)
4. Gestion des catégories/tags
5. Preview et publication

### Phase 3 : Interface Pro (1 semaine)
1. Refonte UI/UX du CMS
2. Dashboard avec widgets
3. Navigation améliorée
4. Mode sombre
5. Responsive design

### Phase 4 : Finalisation (1 semaine)
1. Tests complets
2. Optimisations performances
3. Documentation utilisateur
4. Déploiement en production

## 📦 Composants à Réutiliser

### De l'Éditeur AWEMA :
- `Canvas.tsx` - Système drag & drop complet
- `PropertyControls.tsx` - Édition des propriétés
- `BlockRegistry` - 40+ types de blocs
- `LivePreview.tsx` - Preview temps réel
- `MediaGallery.tsx` - Gestion des médias
- `CollectionEditor.tsx` - Listes éditables
- Store Zustand avec historique

### Services :
- `version-history-db.service.ts` - Historique
- `image.service.ts` - Optimisation images
- `netlify-edge-functions.ts` - API backend

## 💡 Avantages de cette Approche

1. **Gain de temps** : 70% du code déjà écrit
2. **Cohérence** : Même UX que l'éditeur
3. **Fiabilité** : Composants testés en production
4. **Évolutivité** : Architecture modulaire
5. **Performance** : Edge Functions + CDN

## 🎯 Résultat Attendu

Un CMS professionnel permettant :
- ✅ Édition visuelle des pages par drag & drop
- ✅ Gestion complète d'un blog
- ✅ Interface moderne et intuitive
- ✅ Performance optimale
- ✅ Sécurité renforcée
- ✅ Support multi-utilisateurs

**Délai total estimé : 5 semaines**

## 🔧 Prochaine Action

Commencer par adapter `Canvas.tsx` pour créer `PageEditor.tsx` dans le CMS, en conservant toute la logique de drag & drop mais en la connectant aux Edge Functions pour la persistance.
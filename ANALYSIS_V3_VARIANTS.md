# Analyse des variantes des blocs V3

## Vue d'ensemble

Les blocs V3 utilisent deux niveaux de personnalisation :
1. **Variant** : Le style visuel global (modern, minimal, bold, elegant)
2. **Layout/Type** : La disposition ou le type d'affichage spécifique

## Patterns identifiés

### 1. Variantes communes (Style visuel)

Tous les blocs principaux partagent les mêmes 4 variantes de base :
- **modern** (🎨) : Gradient dynamique
- **minimal** (⚡) : Épuré et rapide
- **bold** (🔥) : Impact visuel fort
- **elegant** (✨) : Glassmorphism subtil

### 2. Layouts/Types spécifiques par bloc

#### Hero V3
- **Layouts** : center, left, split
- **Variantes** : modern, minimal, bold, elegant

#### Services V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** : 
  - grid-cards (📱)
  - list-detailed (📋)
  - carousel-modern (🎠)
  - masonry-creative (🧱)
  - tabs-organized (📑)
  - accordion-compact (📂)
  - timeline-process (📅)
  - hexagon-tech (⬡)

#### Features V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - grid-modern (📱)
  - cards-hover (🃏)
  - timeline-vertical (📅)
  - carousel-modern (🎠)
  - tabs-animated (📑)
  - masonry-creative (🧱)
  - comparison-table (⚖️)
  - flip-cards (🔄)

#### Gallery V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - masonry-flow
  - grid-uniform
  - carousel-fullscreen
  - instagram-style

#### Testimonials V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - grid-modern (📱)
  - carousel-elegant (🎠)
  - masonry-dynamic (🧱)
  - cards-stack (🃏)
  - timeline-story (📅)
  - quotes-wall (💬)

#### Contact V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - split (Formulaire et infos côte à côte)
  - fullwidth (Formulaire en pleine largeur)
  - compact (Version compacte)
  - floating (Carte flottante)

#### CTA V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - centered
  - split
  - banner
  - floating

#### Content V3
- **Variantes** : modern, minimal, bold, elegant
- **Types** :
  - paragraph
  - timeline
  - accordion
  - tabs
  - comparison
  - quote

#### FAQ V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - accordion-classic
  - cards-grid
  - tabs-organized
  - timeline-vertical
  - masonry-dynamic
  - sidebar-navigation
  - collapse-elegant
  - chat-style

#### Pricing V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - cards-classic
  - table-compare
  - toggle-monthly
  - slider-dynamic
  - tabs-features
  - list-detailed
  - cards-highlight
  - matrix-advanced

#### Header V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - classic
  - centered
  - split
  - transparent

#### Footer V3
- **Variantes** : modern, minimal, bold, elegant
- **Layouts** :
  - mega (Multi-colonnes avec widgets)
  - minimal (Simple avec l'essentiel)
  - centered (Tout centré)
  - split (Infos à gauche, liens à droite)

## Options supplémentaires communes

### Styles visuels
- **Icon styles** : filled, outline, gradient, shadow, 3d, animated
- **Card styles** : flat, elevated, outlined, glassmorphism, gradient
- **Animation types** : none, fade, slide, scale/zoom, flip, bounce

### Espacements
- sm (Petit)
- md (Moyen)
- lg (Grand)
- xl (Très grand)

### Alignements
- left (Gauche)
- center (Centré)
- right (Droite)

## Recommandations pour le système WORLD CLASS

### 1. Uniformisation des variantes
Tous les blocs devraient avoir les mêmes 4 variantes de base (modern, minimal, bold, elegant) pour une cohérence visuelle.

### 2. Layouts intelligents
Chaque bloc a ses propres layouts spécifiques qui correspondent à ses besoins :
- Les blocs de contenu (Services, Features) ont des layouts similaires
- Les blocs de témoignages et galerie ont des layouts visuels
- Les blocs de navigation (Header, Footer) ont des layouts structurels

### 3. Système de personnalisation en cascade
1. **Variant** : Définit le style visuel global
2. **Layout** : Définit la structure/disposition
3. **Options** : Personnalisations fines (espacements, animations, styles d'icônes)

### 4. Intelligence contextuelle
Le système devrait :
- Proposer des combinaisons variant/layout qui fonctionnent bien ensemble
- Adapter automatiquement certaines options selon le variant choisi
- Suggérer des layouts selon le contenu (ex: timeline pour un processus)

### 5. Cohérence inter-blocs
Pour un site cohérent :
- Si l'utilisateur choisit "modern" pour le Hero, suggérer "modern" pour les autres blocs
- Maintenir une cohérence des animations et espacements
- Utiliser des palettes de couleurs harmonieuses

## Incohérences identifiées

### 1. Nomenclature des variantes
- **Majorité des blocs** : Utilisent `variant` avec modern/minimal/bold/elegant
- **Footer V3** : Utilise `visualVariant` avec des noms complètement différents (waves, gradient, split, etc.)
- **CTA V3** : Utilise deux systèmes :
  - `variant` : Pour les effets visuels (gradient-wave, glassmorphism, etc.)
  - `themeVariant` : Pour le style (modern, minimal, bold, elegant)

### 2. Types de variantes
- **Pattern standard** : 4 variantes cohérentes (modern, minimal, bold, elegant)
- **Footer** : 16 variantes uniques sans rapport avec le pattern standard
- **CTA** : 8 variantes d'effets + 4 variantes de thème

### 3. Recommandations pour uniformiser

#### Option 1 : Double système (recommandé)
- **variant** : Style visuel global (modern, minimal, bold, elegant)
- **layout/effect** : Disposition ou effet spécifique au bloc

Exemple pour le Footer :
```typescript
variant: 'modern', // Style global
layout: 'waves'    // Effet spécifique
```

#### Option 2 : Nomenclature unique
- Renommer toutes les variantes pour suivre le pattern : variant_layout
- Exemple : modern-waves, minimal-centered, bold-split

#### Option 3 : Système intelligent
- Détecter automatiquement les meilleures combinaisons
- Si variant = modern → suggérer layouts compatibles
- Présets de combinaisons qui fonctionnent bien ensemble
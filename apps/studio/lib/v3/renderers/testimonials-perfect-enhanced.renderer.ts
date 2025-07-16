/**
 * Testimonials Renderer V3 PERFECT ENHANCED - Design magnifique avec variants de style
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { testimonialsDataSchema, testimonialsDefaults, type TestimonialsData } from '../schemas/blocks/testimonials-perfect';
import { logger } from '../core/logger';

export class TestimonialsRendererV3PerfectEnhanced extends BaseRendererV3<TestimonialsData> {
  type = 'testimonials-ultra-modern';
  version = '3.0.0';
  private currentData: any = {};
  private currentOptions: any = {};

  constructor() {
    super();
    logger.info('TestimonialsRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Testimonials V3 PERFECT ENHANCED');
  }

  validate(data: unknown): z.SafeParseReturnType<TestimonialsData, TestimonialsData> {
    return testimonialsDataSchema.safeParse(data);
  }

  getDefaultData(): TestimonialsData {
    return testimonialsDefaults;
  }

  /**
   * Retourne les propriétés éditables du bloc
   * Ajoute la propriété variant pour les styles
   */
  getBlockProps(): BlockProp[] {
    return [
      // Style visuel
      {
        name: 'visualVariant',
        type: PropType.SELECT,
        label: 'Style visuel',
        required: false,
        defaultValue: 'modern',
        description: 'Choisissez le style visuel du bloc',
        options: [
          { value: 'modern', label: '🎨 Moderne - Gradient dynamique' },
          { value: 'minimal', label: '⚡ Minimaliste - Épuré et rapide' },
          { value: 'bold', label: '🔥 Audacieux - Impact visuel fort' },
          { value: 'elegant', label: '✨ Élégant - Glassmorphism subtil' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Style',
          order: 1
        }
      },
      // Disposition
      {
        name: 'variant',
        type: PropType.SELECT,
        label: 'Disposition',
        required: false,
        defaultValue: 'carousel-modern',
        description: 'Choisissez la disposition des témoignages',
        options: [
          { value: 'carousel-modern', label: '🎠 Carrousel moderne' },
          { value: 'grid-masonry', label: '🏛️ Grille masonry' },
          { value: 'timeline-animated', label: '📅 Timeline animée' },
          { value: 'cards-3d', label: '💳 Cartes 3D' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Style',
          order: 2
        }
      },
      // Contenu
      {
        name: 'title',
        type: PropType.STRING,
        label: 'Titre',
        defaultValue: 'Ce que disent nos clients',
        required: true,
        description: 'Titre principal de la section',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Contenu',
          order: 1
        }
      },
      {
        name: 'subtitle',
        type: PropType.STRING,
        label: 'Sous-titre',
        defaultValue: 'La satisfaction de nos clients est notre priorité',
        required: false,
        description: 'Sous-titre descriptif',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 2
        }
      },
      // Statistiques
      {
        name: 'showStats',
        type: PropType.BOOLEAN,
        label: 'Afficher les statistiques',
        defaultValue: true,
        description: 'Afficher les statistiques en haut',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage',
          order: 1
        }
      },
      // Options d'affichage
      {
        name: 'showRating',
        type: PropType.BOOLEAN,
        label: 'Afficher les étoiles',
        defaultValue: true,
        description: 'Afficher la note en étoiles',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage',
          order: 2
        }
      },
      {
        name: 'showAvatar',
        type: PropType.BOOLEAN,
        label: 'Afficher les avatars',
        defaultValue: true,
        description: 'Afficher les photos des auteurs',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage',
          order: 3
        }
      },
      {
        name: 'showSource',
        type: PropType.BOOLEAN,
        label: 'Afficher la source',
        defaultValue: true,
        description: 'Afficher la provenance (Google, Facebook...)',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage',
          order: 4
        }
      },
      // Filtres
      {
        name: 'enableFilters',
        type: PropType.BOOLEAN,
        label: 'Activer les filtres',
        defaultValue: false,
        description: 'Permettre de filtrer par catégorie',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Fonctionnalités',
          order: 1
        }
      },
      // Source des avis
      {
        name: 'reviewSource',
        type: PropType.SELECT,
        label: 'Source des avis',
        defaultValue: 'manual',
        description: 'D\'où proviennent les témoignages',
        options: [
          { value: 'manual', label: 'Saisie manuelle' },
          { value: 'google', label: 'Google My Business' },
          { value: 'mixed', label: 'Mixte (manuel + Google)' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Source des avis',
          order: 1
        }
      },
      // Configuration Google My Business
      {
        name: 'googlePlaceId',
        type: PropType.STRING,
        label: 'Google Place ID',
        required: false,
        description: 'ID de votre établissement sur Google',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Source des avis',
          order: 2,
          showIf: {
            field: 'reviewSource',
            operator: 'in',
            value: ['google', 'mixed']
          },
          helpText: 'Trouvez votre Place ID sur https://developers.google.com/maps/documentation/places/web-service/place-id'
        }
      },
      {
        name: 'googleApiKey',
        type: PropType.STRING,
        label: 'Clé API Google',
        required: false,
        description: 'Votre clé API Google Maps (laissez vide pour utiliser la clé par défaut)',
        placeholder: 'AIza...',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Source des avis',
          order: 3,
          showIf: {
            field: 'reviewSource',
            operator: 'in',
            value: ['google', 'mixed']
          },
          secure: true,
          helpText: 'Si vide, utilise NEXT_PUBLIC_GOOGLE_MAPS_API_KEY depuis .env'
        }
      },
      // CTA amélioré
      {
        name: 'showCta',
        type: PropType.BOOLEAN,
        label: 'Afficher le bouton d\'action',
        defaultValue: true,
        description: 'Afficher un bouton pour laisser un avis',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Bouton d\'action',
          order: 1
        }
      },
      {
        name: 'ctaType',
        type: PropType.SELECT,
        label: 'Type de bouton',
        defaultValue: 'contact',
        description: 'Action du bouton',
        options: [
          { value: 'contact', label: 'Formulaire de contact' },
          { value: 'google', label: 'Google My Business' },
          { value: 'trustpilot', label: 'Trustpilot' },
          { value: 'custom', label: 'Lien personnalisé' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Bouton d\'action',
          order: 2,
          condition: { field: 'showCta', value: true }
        }
      },
      {
        name: 'ctaText',
        type: PropType.STRING,
        label: 'Texte du bouton',
        defaultValue: 'Laisser un avis',
        required: false,
        description: 'Texte personnalisé du bouton',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Bouton d\'action',
          order: 3,
          condition: { field: 'showCta', value: true }
        }
      },
      {
        name: 'ctaGoogleUrl',
        type: PropType.STRING,
        label: 'URL Google My Business',
        required: false,
        description: 'Lien vers votre page Google pour laisser un avis',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Bouton d\'action',
          order: 4,
          showIf: {
            field: 'ctaType',
            operator: 'equals',
            value: 'google'
          },
          helpText: 'Ex: https://g.page/r/YOUR_ID/review'
        }
      },
      {
        name: 'ctaCustomUrl',
        type: PropType.STRING,
        label: 'URL personnalisée',
        defaultValue: '#contact',
        required: false,
        description: 'Lien personnalisé',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Bouton d\'action',
          order: 5,
          showIf: {
            field: 'ctaType',
            operator: 'equals',
            value: 'custom'
          }
        }
      },
      // Options d'affichage en champs plats
      {
        name: 'showFullName',
        label: 'Afficher nom complet',
        type: PropType.BOOLEAN,
        defaultValue: true,
        description: 'Afficher le nom complet des auteurs',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage avancé',
          order: 1
        }
      },
      {
        name: 'showInitials',
        label: 'Initiales seulement',
        type: PropType.BOOLEAN,
        defaultValue: false,
        description: 'Afficher uniquement les initiales',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage avancé',
          order: 2
        }
      },
      {
        name: 'showRole',
        label: 'Afficher le rôle',
        type: PropType.BOOLEAN,
        defaultValue: true,
        description: 'Afficher le rôle/poste de la personne',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage avancé',
          order: 3
        }
      },
      {
        name: 'showCompany',
        label: 'Afficher l\'entreprise',
        type: PropType.BOOLEAN,
        defaultValue: true,
        description: 'Afficher le nom de l\'entreprise',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage avancé',
          order: 4
        }
      },
      {
        name: 'showLocation',
        label: 'Afficher la localisation',
        type: PropType.BOOLEAN,
        defaultValue: false,
        description: 'Afficher la ville/pays',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage avancé',
          order: 5
        }
      },
      {
        name: 'showDate',
        label: 'Afficher la date',
        type: PropType.BOOLEAN,
        defaultValue: true,
        description: 'Afficher la date du témoignage',
        editorConfig: {
          control: EditorControl.SWITCH,
          group: 'Affichage avancé',
          order: 6
        }
      },
      {
        name: 'dateFormat',
        label: 'Format de date',
        type: PropType.SELECT,
        defaultValue: 'relative',
        description: 'Choisissez le format d\'affichage des dates',
        options: [
          { value: 'relative', label: 'Relatif (il y a 2 jours)' },
          { value: 'short', label: 'Court (15 jan)' },
          { value: 'long', label: 'Long (15 janvier 2024)' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Affichage avancé',
          order: 7
        }
      },
      // Éditeur de témoignages manuels
      {
        name: 'testimonials',
        type: PropType.ARRAY,
        label: 'Témoignages',
        required: true,
        defaultValue: testimonialsDefaults.testimonials,
        description: 'Liste des témoignages à afficher',
        editorConfig: {
          control: EditorControl.ARRAY,
          group: 'Témoignages',
          order: 1,
          addButtonText: '+ Ajouter un témoignage',
          itemLabel: (item: any) => item?.author?.name || 'Nouveau témoignage',
          showIf: {
            field: 'reviewSource',
            operator: 'in',
            value: ['manual', 'mixed']
          },
          schema: [
            {
              name: 'author',
              type: PropType.OBJECT,
              label: 'Auteur',
              required: true,
              schema: [
                { 
                  name: 'name', 
                  type: PropType.STRING, 
                  label: 'Nom complet',
                  required: true,
                  placeholder: 'Jean Dupont'
                },
                { 
                  name: 'role', 
                  type: PropType.STRING, 
                  label: 'Fonction',
                  placeholder: 'Directeur Marketing'
                },
                { 
                  name: 'company', 
                  type: PropType.STRING, 
                  label: 'Entreprise',
                  placeholder: 'Entreprise SARL'
                },
                { 
                  name: 'location', 
                  type: PropType.STRING, 
                  label: 'Localisation',
                  placeholder: 'Paris, France'
                },
                { 
                  name: 'avatar', 
                  type: PropType.IMAGE, 
                  label: 'Photo de profil',
                  description: 'Photo ou avatar de la personne'
                },
                { 
                  name: 'verified', 
                  type: PropType.BOOLEAN, 
                  label: 'Avis vérifié',
                  defaultValue: false
                }
              ]
            },
            {
              name: 'content',
              type: PropType.STRING,
              label: 'Témoignage',
              required: true,
              placeholder: 'Écrivez ici le témoignage...',
              editorConfig: {
                control: EditorControl.TEXTAREA,
                rows: 4
              }
            },
            {
              name: 'rating',
              type: PropType.NUMBER,
              label: 'Note (1-5)',
              defaultValue: 5,
              editorConfig: {
                control: EditorControl.SLIDER,
                min: 1,
                max: 5,
                step: 0.5
              }
            },
            {
              name: 'date',
              type: PropType.STRING,
              label: 'Date',
              defaultValue: new Date().toISOString().split('T')[0],
              editorConfig: {
                control: EditorControl.DATE
              }
            },
            {
              name: 'source',
              type: PropType.SELECT,
              label: 'Source',
              defaultValue: 'website',
              options: [
                { value: 'website', label: 'Site web' },
                { value: 'google', label: 'Google' },
                { value: 'facebook', label: 'Facebook' },
                { value: 'trustpilot', label: 'Trustpilot' }
              ]
            },
            {
              name: 'featured',
              type: PropType.BOOLEAN,
              label: 'Mettre en avant',
              defaultValue: false,
              description: 'Afficher ce témoignage en priorité'
            },
            {
              name: 'category',
              type: PropType.STRING,
              label: 'Catégorie',
              placeholder: 'Ex: Service, Qualité, Prix...',
              description: 'Pour le filtrage par catégorie'
            }
          ]
        }
      }
    ];
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   TESTIMONIALS V3 PERFECT ENHANCED
   ======================================== */

.testimonials {
  position: relative;
  padding: var(--testimonials-padding-y, 5rem) 0;
  overflow: hidden;
  background: var(--testimonials-background, var(--background));
}

.testimonials__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Variables CSS personnalisées */
.testimonials {
  --testimonials-primary: var(--primary, #667eea);
  --testimonials-secondary: var(--secondary, #764ba2);
  --testimonials-text: var(--text, #1a202c);
  --testimonials-text-secondary: var(--text-secondary, #718096);
  --testimonials-surface: var(--surface, #ffffff);
  --testimonials-border: var(--border, #e2e8f0);
  --testimonials-font-heading: var(--font-heading, 'Inter', system-ui, sans-serif);
  --testimonials-font-body: var(--font-body, 'Inter', system-ui, sans-serif);
}

/* Header */
.testimonials__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.testimonials__title {
  font-family: var(--testimonials-font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--testimonials-text);
}

.testimonials__subtitle {
  font-family: var(--testimonials-font-body);
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: var(--testimonials-text-secondary);
  line-height: 1.6;
}

/* Stats */
.testimonials__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.2s forwards;
}

.testimonials__stat {
  text-align: center;
}

.testimonials__stat-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.testimonials__stat-value {
  font-family: var(--testimonials-font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--testimonials-text);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.testimonials__stat-label {
  font-family: var(--testimonials-font-body);
  font-size: 0.875rem;
  color: var(--testimonials-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Filtres */
.testimonials__filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.3s forwards;
}

.testimonials__filter {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid var(--testimonials-border);
  border-radius: 9999px;
  color: var(--testimonials-text-secondary);
  font-family: var(--testimonials-font-body);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonials__filter:hover {
  border-color: var(--testimonials-primary);
  color: var(--testimonials-primary);
  transform: translateY(-2px);
}

.testimonials__filter.active {
  background: var(--testimonials-primary);
  border-color: var(--testimonials-primary);
  color: white;
}

/* Grid de base */
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Card de base */
.testimonials__card {
  background: var(--testimonials-surface);
  border-radius: var(--testimonials-border-radius, 1rem);
  padding: 2rem;
  box-shadow: var(--testimonials-shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.testimonials__card:hover {
  transform: translateY(-8px);
  box-shadow: var(--testimonials-hover-shadow);
}

/* Contenu de la carte */
.testimonials__rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.testimonials__star {
  color: #fbbf24;
  font-size: 1.25rem;
}

.testimonials__text {
  font-family: var(--testimonials-font-body);
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--testimonials-text);
  margin-bottom: 2rem;
}

.testimonials__author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonials__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonials__name {
  font-family: var(--testimonials-font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--testimonials-text);
  line-height: 1.2;
}

.testimonials__role {
  font-family: var(--testimonials-font-body);
  font-size: 0.875rem;
  color: var(--testimonials-text-secondary);
}

.testimonials__company {
  font-family: var(--testimonials-font-body);
  font-size: 0.875rem;
  color: var(--testimonials-primary);
  font-weight: 500;
}

.testimonials__location {
  font-family: var(--testimonials-font-body);
  font-size: 0.8125rem;
  color: var(--testimonials-text-secondary);
  opacity: 0.8;
}

.testimonials__verified {
  color: #10b981;
  font-size: 1rem;
  margin-left: 0.25rem;
}

.testimonials__source {
  margin-top: 1rem;
}

.testimonials__source-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: var(--testimonials-surface);
  border: 1px solid var(--testimonials-border);
  border-radius: 9999px;
  font-family: var(--testimonials-font-body);
  font-size: 0.75rem;
  color: var(--testimonials-text-secondary);
}

.testimonials__source-badge--google {
  border-color: #4285f4;
  color: #4285f4;
}

.testimonials__source-badge--facebook {
  border-color: #1877f2;
  color: #1877f2;
}

.testimonials__source-badge--trustpilot {
  border-color: #00b67a;
  color: #00b67a;
}

/* CTA */
.testimonials__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--testimonials-primary);
  color: white;
  border-radius: 0.5rem;
  font-family: var(--testimonials-font-body);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  margin: 2rem auto 0;
  width: fit-content;
}

.testimonials__cta:hover {
  background: var(--testimonials-secondary);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
}

.testimonials__cta-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Avatar avec initiales */
.testimonials__avatar--initials {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--testimonials-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--testimonials-font-heading);
  font-weight: 600;
  font-size: 1.125rem;
}

/* Métadonnées (date et source) */
.testimonials__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--testimonials-border);
}

.testimonials__date {
  font-family: var(--testimonials-font-body);
  font-size: 0.875rem;
  color: var(--testimonials-text-secondary);
  opacity: 0.8;
}

/* ========================================
   VARIANTES VISUELLES
   ======================================== */

/* Variante Modern */
.testimonials--visual-modern .testimonials__title {
  background: var(--testimonials-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.testimonials--visual-modern .testimonials__card {
  position: relative;
  overflow: hidden;
}

.testimonials--visual-modern .testimonials__card::before {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-size: 5rem;
  font-weight: 900;
  color: var(--testimonials-primary);
  opacity: 0.1;
}

.testimonials--visual-modern .testimonials__text {
  font-style: italic;
}

/* Variante Minimal */
.testimonials--visual-minimal {
  background: transparent;
}

.testimonials--visual-minimal .testimonials__card {
  background: transparent;
  border: 1px solid var(--testimonials-border);
  box-shadow: none;
}

.testimonials--visual-minimal .testimonials__card:hover {
  border-color: var(--testimonials-text);
  background: var(--testimonials-surface);
}

.testimonials--visual-minimal .testimonials__text {
  font-style: normal;
  font-weight: 300;
}

.testimonials--visual-minimal .testimonials__avatar {
  filter: grayscale(100%);
  transition: filter 0.3s;
}

.testimonials--visual-minimal .testimonials__card:hover .testimonials__avatar {
  filter: grayscale(0%);
}

/* Variante Bold */
.testimonials--visual-bold {
  background: var(--testimonials-text);
  padding: 6rem 0;
}

.testimonials--visual-bold .testimonials__title,
.testimonials--visual-bold .testimonials__subtitle {
  color: white;
}

.testimonials--visual-bold .testimonials__stat-value,
.testimonials--visual-bold .testimonials__stat-label {
  color: white;
}

.testimonials--visual-bold .testimonials__card {
  background: white;
  transform: rotate(-1deg);
  transition: all 0.3s;
}

.testimonials--visual-bold .testimonials__card:nth-child(even) {
  transform: rotate(1deg);
}

.testimonials--visual-bold .testimonials__card:hover {
  transform: rotate(0deg) scale(1.05);
  z-index: 10;
}

.testimonials--visual-bold .testimonials__text {
  font-size: 1.25rem;
  font-weight: 600;
}

/* Variante Elegant */
.testimonials--visual-elegant {
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.9) 100%);
  position: relative;
}

.testimonials--visual-elegant::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--testimonials-primary) 0%, transparent 70%);
  opacity: 0.05;
  pointer-events: none;
}

.testimonials--visual-elegant .testimonials__card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

.testimonials--visual-elegant .testimonials__card:hover {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
}

.testimonials--visual-elegant .testimonials__avatar {
  border: 3px solid var(--testimonials-primary);
}

/* Layouts spéciaux */

/* Carousel */
.testimonials__carousel {
  position: relative;
  overflow: hidden;
}

.testimonials__track {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
}

.testimonials__nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.testimonials__nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--testimonials-surface);
  border: 2px solid var(--testimonials-border);
  color: var(--testimonials-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.testimonials__nav-btn:hover {
  background: var(--testimonials-primary);
  color: white;
  border-color: var(--testimonials-primary);
}

/* Timeline */
.testimonials__timeline {
  position: relative;
  padding: 2rem 0;
}

.testimonials__timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--testimonials-border);
  transform: translateX(-50%);
}

.testimonials__timeline-item {
  position: relative;
  width: 50%;
  padding: 2rem;
}

.testimonials__timeline-item.left {
  left: 0;
  text-align: right;
  padding-right: 4rem;
}

.testimonials__timeline-item.right {
  left: 50%;
  padding-left: 4rem;
}

.testimonials__timeline-marker {
  position: absolute;
  top: 2rem;
  width: 20px;
  height: 20px;
  background: var(--testimonials-primary);
  border: 4px solid var(--testimonials-surface);
  border-radius: 50%;
  z-index: 1;
}

.testimonials__timeline-item.left .testimonials__timeline-marker {
  right: -10px;
}

.testimonials__timeline-item.right .testimonials__timeline-marker {
  left: -10px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials__timeline::before {
    left: 2rem;
  }
  
  .testimonials__timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 4rem !important;
    padding-right: 1rem !important;
    text-align: left !important;
  }
  
  .testimonials__timeline-marker {
    left: 1.5rem !important;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// Testimonials V3 Perfect Enhanced - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation globale
  function initTestimonials() {
    const testimonialSections = document.querySelectorAll('.testimonials');
    
    testimonialSections.forEach(section => {
      const layout = Array.from(section.classList)
        .find(c => c.startsWith('testimonials--'))
        ?.replace('testimonials--', '');
      
      // Filtres
      initFilters(section);
      
      // Layout spécifique
      switch(layout) {
        case 'carousel-modern':
          initCarousel(section);
          break;
        case 'masonry-wall':
          initMasonry(section);
          break;
        case 'timeline-stories':
          initTimeline(section);
          break;
        case 'stacked-cards':
          initStackedCards(section);
          break;
        case 'carousel-3d':
          initCarousel3D(section);
          break;
        case 'video-testimonials':
          initVideoTestimonials(section);
          break;
        case 'interactive-map':
          initInteractiveMap(section);
          break;
      }
      
      // Animations globales
      observeTestimonials(section);
      
      // Google Reviews import
      initGoogleReviews(section);
    });
  }
  
  // Filtres par catégorie
  function initFilters(section) {
    const filters = section.querySelectorAll('.testimonials__filter');
    const cards = section.querySelectorAll('.testimonials__card');
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Active state
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.dataset.category;
        
        // Filtrer les cartes
        cards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
            card.classList.add('testimonials__card--visible');
          } else {
            card.style.display = 'none';
            card.classList.remove('testimonials__card--visible');
          }
        });
        
        // Réorganiser masonry si besoin
        const masonry = section.querySelector('.testimonials--masonry-wall');
        if (masonry) {
          reorganizeMasonry(masonry);
        }
      });
    });
  }
  
  // Carousel moderne
  function initCarousel(section) {
    const track = section.querySelector('.testimonials__track');
    const cards = section.querySelectorAll('.testimonials__card');
    const prevBtn = section.querySelector('.testimonials__nav-btn--prev');
    const nextBtn = section.querySelector('.testimonials__nav-btn--next');
    const indicators = section.querySelector('.testimonials__indicators');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // gap
    
    // Auto-play
    let autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    }, 5000);
    
    // Navigation
    prevBtn?.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });
    
    nextBtn?.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    });
    
    // Indicateurs
    if (indicators) {
      cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'testimonials__indicator';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          clearInterval(autoplayInterval);
          currentIndex = index;
          updateCarousel();
        });
        
        indicators.appendChild(dot);
      });
    }
    
    function updateCarousel() {
      track.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';
      
      // Update indicators
      const dots = indicators?.querySelectorAll('.testimonials__indicator');
      dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        nextBtn?.click();
      }
      if (touchEndX > touchStartX + 50) {
        prevBtn?.click();
      }
    }
  }
  
  // Masonry layout
  function initMasonry(section) {
    const grid = section.querySelector('.testimonials__grid');
    if (!grid) return;
    
    // Attendre le chargement des images
    const images = grid.querySelectorAll('img');
    let loadedImages = 0;
    
    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            organizeMasonry();
          }
        });
      }
    });
    
    if (loadedImages === images.length) {
      organizeMasonry();
    }
    
    function organizeMasonry() {
      const cards = grid.querySelectorAll('.testimonials__card');
      const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      const columnHeights = new Array(columns).fill(0);
      
      cards.forEach(card => {
        const minColumn = columnHeights.indexOf(Math.min(...columnHeights));
        card.style.gridColumn = minColumn + 1;
        columnHeights[minColumn] += card.offsetHeight + 20; // gap
      });
    }
    
    // Réorganiser sur resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(organizeMasonry, 250);
    });
  }
  
  // Timeline stories
  function initTimeline(section) {
    const items = section.querySelectorAll('.testimonials__timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('testimonials__timeline-item--visible');
        }
      });
    }, { threshold: 0.3 });
    
    items.forEach(item => observer.observe(item));
  }
  
  // Stacked cards
  function initStackedCards(section) {
    const stack = section.querySelector('.testimonials__stack');
    const cards = section.querySelectorAll('.testimonials__card');
    const nextBtn = section.querySelector('.testimonials__stack-next');
    
    if (!stack || cards.length === 0) return;
    
    let currentIndex = 0;
    
    // Position initiale
    updateStack();
    
    nextBtn?.addEventListener('click', () => {
      // Déplacer la carte du dessus à la fin
      const firstCard = cards[currentIndex];
      firstCard.style.transform = 'translateX(150%) rotate(10deg)';
      firstCard.style.opacity = '0';
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateStack();
        
        // Réinitialiser la carte déplacée
        setTimeout(() => {
          firstCard.style.transition = 'none';
          firstCard.style.transform = '';
          firstCard.style.opacity = '';
          
          setTimeout(() => {
            firstCard.style.transition = '';
          }, 50);
        }, 50);
      }, 300);
    });
    
    function updateStack() {
      cards.forEach((card, index) => {
        const offset = (index - currentIndex + cards.length) % cards.length;
        
        card.style.zIndex = cards.length - offset;
        card.style.transform = 'translateY(' + (offset * 10) + 'px) scale(' + (1 - offset * 0.05) + ')';
        card.style.opacity = offset < 3 ? '1' : '0';
        
        // Rendre cliquable seulement la carte du dessus
        card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
      });
    }
  }
  
  // Carousel 3D
  function initCarousel3D(section) {
    const carousel = section.querySelector('.testimonials__carousel-3d');
    const cards = section.querySelectorAll('.testimonials__card');
    const prevBtn = section.querySelector('.testimonials__nav-btn--prev');
    const nextBtn = section.querySelector('.testimonials__nav-btn--next');
    
    if (!carousel || cards.length === 0) return;
    
    let currentRotation = 0;
    const angleStep = 360 / cards.length;
    
    // Positionner les cartes en cercle
    cards.forEach((card, index) => {
      const angle = index * angleStep;
      card.style.transform = 'rotateY(' + angle + 'deg) translateZ(300px)';
    });
    
    prevBtn?.addEventListener('click', () => {
      currentRotation += angleStep;
      updateCarousel3D();
    });
    
    nextBtn?.addEventListener('click', () => {
      currentRotation -= angleStep;
      updateCarousel3D();
    });
    
    function updateCarousel3D() {
      carousel.style.transform = 'rotateY(' + currentRotation + 'deg)';
    }
    
    // Auto-rotation optionnelle
    let autoRotate = setInterval(() => {
      currentRotation -= 0.5;
      carousel.style.transform = 'rotateY(' + currentRotation + 'deg)';
    }, 50);
    
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoRotate);
    });
    
    carousel.addEventListener('mouseleave', () => {
      autoRotate = setInterval(() => {
        currentRotation -= 0.5;
        carousel.style.transform = 'rotateY(' + currentRotation + 'deg)';
      }, 50);
    });
  }
  
  // Video testimonials
  function initVideoTestimonials(section) {
    const videos = section.querySelectorAll('.testimonials__video');
    const playBtns = section.querySelectorAll('.testimonials__play-btn');
    
    playBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const video = videos[index];
        const card = btn.closest('.testimonials__card');
        
        if (video) {
          // Créer modal vidéo
          const modal = document.createElement('div');
          modal.className = 'testimonials__video-modal';
          modal.innerHTML = '' +
            '<div class="testimonials__video-modal-content">' +
              '<button class="testimonials__video-close">&times;</button>' +
              '<iframe src="' + video.dataset.src + '?autoplay=1" frameborder="0" allowfullscreen></iframe>' +
            '</div>';
          
          document.body.appendChild(modal);
          
          // Animation d'entrée
          setTimeout(() => {
            modal.classList.add('active');
          }, 10);
          
          // Fermer modal
          modal.querySelector('.testimonials__video-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
              modal.remove();
            }, 300);
          });
          
          modal.addEventListener('click', (e) => {
            if (e.target === modal) {
              modal.querySelector('.testimonials__video-close').click();
            }
          });
        }
      });
    });
  }
  
  // Google Reviews import
  function initGoogleReviews(section) {
    const placeId = section.dataset.googlePlaceId;
    const apiKey = section.dataset.googleApiKey;
    const importBtn = section.querySelector('.testimonials__import-google');
    
    if (!placeId || !apiKey) return;
    
    // Fonction pour récupérer les avis Google
    async function fetchGoogleReviews() {
      try {
        // URL de l'API Google Places Details
        const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&fields=reviews,rating,user_ratings_total&key=' + apiKey + '&language=fr';
        
        // Note: En production, cet appel doit être fait côté serveur pour sécuriser l'API key
        const response = await fetch('/api/google-reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ placeId, apiKey })
        });
        
        if (!response.ok) throw new Error('Erreur lors de la récupération des avis');
        
        const data = await response.json();
        return data.result.reviews || [];
      } catch (error) {
        console.error('Erreur Google Reviews:', error);
        // Données de démonstration en cas d'erreur
        return [
          {
            author_name: 'Marie Laurent',
            rating: 5,
            text: 'Service exceptionnel ! Je recommande vivement.',
            relative_time_description: 'il y a 2 jours',
            profile_photo_url: ''
          },
          {
            author_name: 'Pierre Durand',
            rating: 5,
            text: 'Très professionnel et à l\\'écoute de nos besoins.',
            relative_time_description: 'il y a 1 semaine',
            profile_photo_url: ''
          }
        ];
      }
    }
    
    // Auto-charger les avis si configuré
    if (section.dataset.reviewSource === 'google' || section.dataset.reviewSource === 'mixed') {
      fetchGoogleReviews().then(reviews => {
        displayGoogleReviews(section, reviews);
      });
    }
    
    // Bouton d'import manuel
    if (importBtn) {
      importBtn.addEventListener('click', async () => {
        try {
          importBtn.textContent = 'Importation...';
          importBtn.disabled = true;
          
          const reviews = await fetchGoogleReviews();
          
          const grid = section.querySelector('.testimonials__grid');
          reviews.forEach(review => {
            const card = createTestimonialCard(review, section);
            grid.appendChild(card);
          });
          
          importBtn.textContent = '✓ Importé';
          setTimeout(() => {
            importBtn.textContent = 'Importer de Google';
            importBtn.disabled = false;
          }, 3000);
          
        } catch (error) {
          console.error('Erreur import Google Reviews:', error);
          importBtn.textContent = 'Erreur';
          importBtn.disabled = false;
        }
      });
    }
  }
  
  // Afficher les avis Google
  function displayGoogleReviews(section, reviews) {
    const container = section.querySelector('.testimonials__grid, .testimonials__carousel, .testimonials__timeline');
    if (!container) return;
    
    // Convertir les avis Google au format interne
    const formattedReviews = reviews.map(review => ({
      author: {
        name: review.author_name || 'Client Google',
        avatar: review.profile_photo_url ? { src: review.profile_photo_url } : null,
        verified: true
      },
      content: review.text,
      rating: review.rating,
      date: review.relative_time_description || review.time,
      source: 'google'
    }));
    
    // Si mode mixte, ajouter aux avis existants
    if (section.dataset.reviewSource === 'mixed') {
      formattedReviews.forEach(review => {
        const card = createTestimonialCard(review, section);
        container.appendChild(card);
      });
    } else {
      // Sinon, remplacer tout le contenu
      container.innerHTML = '';
      formattedReviews.forEach(function(review) {
        container.appendChild(createTestimonialCard(review, section));
      });
    }
  }
  
  // Fonction d'échappement HTML
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
  
  // Créer une carte de témoignage
  function createTestimonialCard(testimonial, section) {
    const showRating = section.dataset.showRating !== 'false';
    const showAvatar = section.dataset.showAvatar !== 'false';
    const showSource = section.dataset.showSource !== 'false';
    
    const card = document.createElement('div');
    card.className = 'testimonials__card';
    if (testimonial.source) {
      card.classList.add('testimonials__card--' + testimonial.source);
    }
    
    let html = '';
    
    // Note
    if (showRating && testimonial.rating) {
      html += '<div class="testimonials__rating">';
      for (let i = 0; i < 5; i++) {
        html += '<span class="testimonials__star">' + (i < testimonial.rating ? '★' : '☆') + '</span>';
      }
      html += '</div>';
    }
    
    // Contenu
    html += '<p class="testimonials__text">' + escapeHtml(testimonial.content) + '</p>';
    
    // Auteur
    const noAvatar = !showAvatar || !testimonial.author?.avatar?.src;
    html += '<div class="testimonials__author ' + (noAvatar ? 'testimonials__author--no-avatar' : '') + '">';
    
    if (showAvatar) {
      if (testimonial.author?.avatar?.src) {
        html += '<img src="' + testimonial.author.avatar.src + '" alt="' + testimonial.author.name + '" class="testimonials__avatar">';
      } else {
        const nameParts = testimonial.author.name.split(' ');
        const initials = nameParts.map(function(n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
        html += '<div class="testimonials__avatar testimonials__avatar--initials">' + initials + '</div>';
      }
    }
    
    html += '<div class="testimonials__author-info">';
    html += '<div class="testimonials__name">' + escapeHtml(testimonial.author.name) + '</div>';
    if (testimonial.author.role) {
      html += '<div class="testimonials__role">' + escapeHtml(testimonial.author.role) + '</div>';
    }
    if (testimonial.author.company) {
      html += '<div class="testimonials__company">' + escapeHtml(testimonial.author.company) + '</div>';
    }
    if (testimonial.author.verified) {
      html += '<span class="testimonials__verified" title="Vérifié">✓</span>';
    }
    html += '</div></div>';
    
    // Métadonnées
    html += '<div class="testimonials__meta">';
    if (testimonial.date) {
      html += '<div class="testimonials__date">' + testimonial.date + '</div>';
    }
    if (showSource && testimonial.source) {
      html += '<span class="testimonials__source-badge testimonials__source-badge--' + testimonial.source + '">';
      html += getSourceIcon(testimonial.source) + ' ' + getSourceLabel(testimonial.source);
      html += '</span>';
    }
    html += '</div>';
    
    card.innerHTML = html;
    
    // Animation d'entrée
    setTimeout(() => {
      card.classList.add('testimonials__card--visible');
    }, 100);
    
    return card;
  }
  
  // Helper pour échapper le HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Helper pour obtenir l'icône de la source
  function getSourceIcon(source) {
    switch(source) {
      case 'google':
        return '<svg viewBox="0 0 24 24" width="16" height="16">' +
          '<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>' +
          '<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>' +
          '<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>' +
          '<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>' +
        '</svg>';
      case 'facebook':
        return '<svg viewBox="0 0 24 24" width="16" height="16">' +
          '<path fill="#1877f2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>' +
        '</svg>';
      case 'trustpilot':
        return '<svg viewBox="0 0 24 24" width="16" height="16">' +
          '<path fill="#00b67a" d="M12 0l3.708 7.51L24 8.731l-6 5.849L19.416 24 12 19.69 4.584 24 6 14.58 0 8.731l8.292-1.221z"/>' +
        '</svg>';
      default:
        return '';
    }
  }
  
  // Helper pour obtenir le label de la source
  function getSourceLabel(source) {
    switch(source) {
      case 'google': return 'Google';
      case 'facebook': return 'Facebook';
      case 'trustpilot': return 'Trustpilot';
      case 'website': return 'Site web';
      default: return source;
    }
  }
  
  // Observer pour animations
  function observeTestimonials(section) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('testimonials--visible');
          
          // Animer les statistiques
          animateStats(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(section);
  }
  
  // Animer les statistiques
  function animateStats(section) {
    const stats = section.querySelectorAll('.testimonials__stat-value');
    
    stats.forEach(stat => {
      const value = parseInt(stat.textContent);
      if (isNaN(value)) return;
      
      const duration = 2000;
      const start = 0;
      const increment = value / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        
        stat.textContent = Math.floor(current);
        
        // Ajouter le signe + ou % si nécessaire
        if (stat.dataset.suffix) {
          stat.textContent += stat.dataset.suffix;
        }
      }, 16);
    });
  }
  
  // Load more functionality
  function initLoadMore(section) {
    const loadMoreBtn = section.querySelector('.testimonials__load-more');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', async () => {
      loadMoreBtn.textContent = 'Chargement...';
      loadMoreBtn.disabled = true;
      
      // Simuler le chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ajouter plus de témoignages (en production, charger depuis l'API)
      const grid = section.querySelector('.testimonials__grid');
      for (let i = 0; i < 3; i++) {
        const card = grid.querySelector('.testimonials__card').cloneNode(true);
        grid.appendChild(card);
      }
      
      loadMoreBtn.textContent = 'Voir plus';
      loadMoreBtn.disabled = false;
    });
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
  } else {
    initTestimonials();
  }
  
  // Interactive Map functionality
  function initInteractiveMap(section) {
    const markers = section.querySelectorAll('.testimonials__map-marker');
    const mapItems = section.querySelectorAll('.testimonials__map-item');
    
    // Hover effect on markers
    markers.forEach((marker, index) => {
      marker.addEventListener('mouseenter', () => {
        // Highlight corresponding item
        mapItems[index]?.classList.add('active');
        marker.style.transform = 'scale(1.5)';
      });
      
      marker.addEventListener('mouseleave', () => {
        mapItems[index]?.classList.remove('active');
        marker.style.transform = 'scale(1)';
      });
      
      marker.addEventListener('click', () => {
        // Scroll to item
        mapItems[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Pulse effect
        mapItems[index]?.classList.add('pulse');
        setTimeout(() => {
          mapItems[index]?.classList.remove('pulse');
        }, 1000);
      });
    });
    
    // Hover effect on items
    mapItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        // Highlight corresponding marker
        markers[index]?.classList.add('active');
        const pulse = markers[index]?.querySelector('.testimonials__map-marker-pulse');
        if (pulse) {
          pulse.style.animationDuration = '0.5s';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        markers[index]?.classList.remove('active');
        const pulse = markers[index]?.querySelector('.testimonials__map-marker-pulse');
        if (pulse) {
          pulse.style.animationDuration = '2s';
        }
      });
      
      item.addEventListener('click', () => {
        // Zoom to marker
        markers[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Animate marker
        markers[index]?.classList.add('bounce');
        setTimeout(() => {
          markers[index]?.classList.remove('bounce');
        }, 1000);
      });
    });
  }

  // Export pour usage externe
  window.TestimonialsPerfect = {
    init: initTestimonials,
    createTestimonialCard: createTestimonialCard
  };
})();
    `;
  }

  render(data: TestimonialsData, context?: RenderContext): RenderResult {
    try {
      // Stocker les données courantes pour utilisation dans les méthodes
      this.currentData = data;
      
      // Extraire les propriétés personnalisées avant la validation
      const visualVariant = (data as any).visualVariant || 'modern';
      const showRating = (data as any).showRating !== false;
      const showAvatar = (data as any).showAvatar !== false;
      const showSource = (data as any).showSource !== false;
      const enableFilters = (data as any).enableFilters || false;
      const showCta = (data as any).showCta !== false;
      const ctaText = (data as any).ctaText || 'Laisser un avis';
      const ctaType = (data as any).ctaType || 'contact';
      const ctaLink = (data as any).ctaLink || '#contact'; // Pour compatibilité
      const ctaGoogleUrl = (data as any).ctaGoogleUrl || '';
      const ctaCustomUrl = (data as any).ctaCustomUrl || '#contact';
      const reviewSource = (data as any).reviewSource || 'manual';
      const googlePlaceId = (data as any).googlePlaceId || '';
      const googleApiKey = (data as any).googleApiKey || '';
      // Extraire les options d'affichage des champs plats
      const showFullName = (data as any).showFullName !== false;
      const showInitials = (data as any).showInitials || false;
      const showRole = (data as any).showRole !== false;
      const showCompany = (data as any).showCompany !== false;
      const showLocation = (data as any).showLocation || false;
      const showDate = (data as any).showDate !== false;
      const dateFormat = (data as any).dateFormat || 'relative';
      
      const displayOptions = {
        showFullName,
        showInitials,
        showRole,
        showCompany,
        showLocation,
        showDate,
        dateFormat
      };
      
      // Créer une copie des données sans les propriétés personnalisées pour la validation
      const dataForValidation = { ...data };
      delete (dataForValidation as any).visualVariant;
      delete (dataForValidation as any).showRating;
      delete (dataForValidation as any).showAvatar;
      delete (dataForValidation as any).showSource;
      delete (dataForValidation as any).enableFilters;
      delete (dataForValidation as any).showCta;
      delete (dataForValidation as any).ctaText;
      delete (dataForValidation as any).ctaLink;
      delete (dataForValidation as any).ctaType;
      delete (dataForValidation as any).ctaGoogleUrl;
      delete (dataForValidation as any).ctaCustomUrl;
      delete (dataForValidation as any).reviewSource;
      delete (dataForValidation as any).googlePlaceId;
      delete (dataForValidation as any).googleApiKey;
      delete (dataForValidation as any).displayOptions;
      delete (dataForValidation as any).showFullName;
      delete (dataForValidation as any).showInitials;
      delete (dataForValidation as any).showRole;
      delete (dataForValidation as any).showCompany;
      delete (dataForValidation as any).showLocation;
      delete (dataForValidation as any).showDate;
      delete (dataForValidation as any).dateFormat;
      
      // Validation des données
      const validation = this.validate(dataForValidation);
      if (!validation.success) {
        logger.error('TestimonialsRendererV3PerfectEnhanced', 'render', 'Validation échouée', validation.error);
        return {
          html: this.renderError('Données invalides'),
          css: this.getDefaultCSS(),
          js: this.getDefaultJS(),
          errors: validation.error.errors.map(e => ({
            message: e.message,
            path: e.path.join('.')
          }))
        };
      }

      const validData = validation.data;
      logger.info('TestimonialsRendererV3PerfectEnhanced', 'render', 'Rendu Testimonials avec variant:', validData.variant);

      // Créer un objet d'options avec les propriétés extraites
      const renderOptions = {
        visualVariant,
        showRating,
        showAvatar,
        showSource,
        enableFilters,
        showCta,
        ctaText,
        ctaLink,
        ctaType,
        ctaGoogleUrl,
        ctaCustomUrl,
        reviewSource,
        googlePlaceId,
        googleApiKey,
        displayOptions
      };
      
      // Stocker les options pour les méthodes de rendu
      this.currentOptions = renderOptions;

      // Générer le HTML selon le layout
      const html = this.renderLayout(validData, visualVariant);
      
      // CSS avec variables personnalisées et styles des variantes
      const customCSS = this.generateCustomCSS(validData, visualVariant, context);
      
      return {
        html,
        css: this.getDefaultCSS() + customCSS,
        js: this.getDefaultJS()
      };
      
    } catch (error) {
      logger.error('TestimonialsRendererV3PerfectEnhanced', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderLayout(data: TestimonialsData, visualVariant: string): string {
    let content = '';
    
    // Mapper les variantes du nouveau schema
    switch(data.variant) {
      case 'carousel-modern':
        content = this.renderCarouselModern(data);
        break;
      case 'grid-masonry':
        content = this.renderMasonryWall(data);
        break;
      case 'wall-infinite':
        content = this.renderMasonryWall(data);
        break;
      case 'cards-3d':
        content = this.renderCarousel3D(data);
        break;
      case 'timeline-animated':
        content = this.renderTimelineStories(data);
        break;
      case 'video-spotlight':
        content = this.renderVideoTestimonials(data);
        break;
      case 'social-proof':
        content = this.renderGridModern(data);
        break;
      case 'interactive-map':
        content = this.renderInteractiveMap(data);
        break;
      default:
        content = this.renderCarouselModern(data);
    }

    return `
      <section class="testimonials testimonials--${data.variant} testimonials--visual-${visualVariant}" 
        id="${data.id || 'testimonials'}"
        data-review-source="${this.currentOptions.reviewSource}"
        data-google-place-id="${this.currentOptions.googlePlaceId}"
        data-google-api-key="${this.currentOptions.googleApiKey}"
        data-show-rating="${this.currentOptions.showRating}"
        data-show-avatar="${this.currentOptions.showAvatar}"
        data-show-source="${this.currentOptions.showSource}">
        <div class="testimonials__container">
          ${this.renderHeader(data)}
          ${this.renderStats(data)}
          ${this.renderFilters(data)}
          ${content}
        </div>
      </section>
    `;
  }

  private renderHeader(data: TestimonialsData): string {
    if (!data.title && !data.subtitle) return '';
    
    return `
      <header class="testimonials__header">
        ${data.title ? `<h2 class="testimonials__title">${this.escapeHtml(data.title)}</h2>` : ''}
        ${data.subtitle ? `<p class="testimonials__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
      </header>
    `;
  }

  private renderStats(data: TestimonialsData): string {
    if (!data.showStats || !data.stats) return '';
    
    return `
      <div class="testimonials__stats">
        <div class="testimonials__stat">
          <div class="testimonials__stat-icon">⭐</div>
          <div class="testimonials__stat-value">${data.stats.averageRating}/5</div>
          <div class="testimonials__stat-label">Note moyenne</div>
        </div>
        <div class="testimonials__stat">
          <div class="testimonials__stat-icon">💬</div>
          <div class="testimonials__stat-value">${data.stats.totalReviews.toLocaleString()}</div>
          <div class="testimonials__stat-label">Avis clients</div>
        </div>
        ${data.stats.verified ? `
          <div class="testimonials__stat">
            <div class="testimonials__stat-icon">✓</div>
            <div class="testimonials__stat-value">${data.stats.verified.toLocaleString()}</div>
            <div class="testimonials__stat-label">Avis vérifiés</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderFilters(data: TestimonialsData): string {
    if (!this.currentOptions?.enableFilters) return '';
    
    // Extraire les catégories uniques des témoignages
    const categories = [...new Set(data.testimonials.map(t => t.category).filter(Boolean))];
    if (categories.length === 0) return '';
    
    return `
      <div class="testimonials__filters">
        <button class="testimonials__filter active" data-category="all">Tous</button>
        ${categories.map(cat => `
          <button class="testimonials__filter" data-category="${this.escapeHtml(cat)}">
            ${this.escapeHtml(cat)}
          </button>
        `).join('')}
      </div>
    `;
  }


  private renderGridModern(data: TestimonialsData): string {
    return `
      <div class="testimonials__grid">
        ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
      </div>
      ${this.renderCTA()}
    `;
  }
  
  private renderCTA(): string {
    if (!this.currentOptions?.showCta) return '';
    
    let ctaUrl = '#contact';
    let ctaTarget = '';
    let ctaIcon = '';
    
    switch (this.currentOptions.ctaType) {
      case 'google':
        ctaUrl = this.currentOptions.ctaGoogleUrl || '#';
        ctaTarget = '_blank';
        ctaIcon = `<svg class="testimonials__cta-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>`;
        break;
      case 'trustpilot':
        ctaUrl = `https://www.trustpilot.com/evaluate/yourdomain.com`;
        ctaTarget = '_blank';
        ctaIcon = `<svg class="testimonials__cta-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="#00b67a" d="M12 0l3.708 7.51L24 8.731l-6 5.849L19.416 24 12 19.69 4.584 24 6 14.58 0 8.731l8.292-1.221z"/>
        </svg>`;
        break;
      case 'contact':
        ctaUrl = '#contact';
        ctaIcon = `<svg class="testimonials__cta-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>`;
        break;
      case 'custom':
        ctaUrl = this.currentOptions.ctaCustomUrl || '#';
        break;
    }
    
    return `
      <a href="${ctaUrl}" class="testimonials__cta testimonials__cta--button" ${ctaTarget ? `target="${ctaTarget}" rel="noopener noreferrer"` : ''}>
        ${ctaIcon}
        ${this.escapeHtml(this.currentOptions.ctaText)}
      </a>
    `;
  }

  private renderCarouselModern(data: TestimonialsData): string {
    return `
      <div class="testimonials__carousel">
        <div class="testimonials__track">
          ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
        </div>
        <div class="testimonials__nav">
          <button class="testimonials__nav-btn testimonials__nav-btn--prev">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </button>
          <button class="testimonials__nav-btn testimonials__nav-btn--next">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>
        <div class="testimonials__indicators"></div>
      </div>
    `;
  }

  private renderMasonryWall(data: TestimonialsData): string {
    return `
      <div class="testimonials__grid testimonials__grid--masonry">
        ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
      </div>
    `;
  }

  private renderSliderElegant(data: TestimonialsData): string {
    return `
      <div class="testimonials__slider">
        <div class="testimonials__slider-track">
          ${data.testimonials.map((testimonial, index) => `
            <div class="testimonials__slide ${index === 0 ? 'active' : ''}">
              ${this.renderTestimonialCard(testimonial, data)}
            </div>
          `).join('')}
        </div>
        <div class="testimonials__dots">
          ${data.testimonials.map((_, index) => `
            <button class="testimonials__dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderStackedCards(data: TestimonialsData): string {
    return `
      <div class="testimonials__stack">
        ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
        <button class="testimonials__stack-next">Suivant →</button>
      </div>
    `;
  }

  private renderTimelineStories(data: TestimonialsData): string {
    return `
      <div class="testimonials__timeline">
        ${data.testimonials.map((testimonial, index) => `
          <div class="testimonials__timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="testimonials__timeline-marker"></div>
            ${this.renderTestimonialCard(testimonial, data)}
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderCarousel3D(data: TestimonialsData): string {
    return `
      <div class="testimonials__carousel-3d-container">
        <div class="testimonials__carousel-3d">
          ${data.testimonials.map(testimonial => this.renderTestimonialCard(testimonial, data)).join('')}
        </div>
        <div class="testimonials__nav">
          <button class="testimonials__nav-btn testimonials__nav-btn--prev">←</button>
          <button class="testimonials__nav-btn testimonials__nav-btn--next">→</button>
        </div>
      </div>
    `;
  }

  private renderVideoTestimonials(data: TestimonialsData): string {
    return `
      <div class="testimonials__videos">
        ${data.testimonials.map(testimonial => `
          <div class="testimonials__card testimonials__card--video" data-category="${testimonial.category || ''}">
            ${testimonial.videoUrl ? `
              <div class="testimonials__video-wrapper">
                <img src="${testimonial.author?.avatar?.src || '/images/video-placeholder.jpg'}" alt="${testimonial.author?.name || ''}" class="testimonials__video-thumb">
                <button class="testimonials__play-btn">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="white" d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div class="testimonials__video" data-src="${testimonial.videoUrl}"></div>
              </div>
            ` : ''}
            <div class="testimonials__content">
              ${this.renderRating(testimonial.rating)}
              <p class="testimonials__text">${this.escapeHtml(testimonial.content)}</p>
              ${this.renderAuthor(testimonial)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderInteractiveMap(data: TestimonialsData): string {
    // Créer une carte interactive avec les témoignages basés sur la localisation
    const testimonialsWithLocation = data.testimonials.filter(t => t.author?.location);
    
    return `
      <div class="testimonials__map-container">
        <div class="testimonials__map" id="testimonials-map">
          <!-- Map sera initialisée par JS -->
          <div class="testimonials__map-placeholder">
            <svg class="testimonials__map-world" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
              <!-- Simple world map SVG placeholder -->
              <rect width="1200" height="600" fill="#e6f3ff"/>
              <path d="M150,200 Q300,150 450,200 T750,250 Q900,200 1050,250" stroke="#ccc" fill="none" stroke-width="2"/>
              <path d="M200,350 Q350,300 500,350 T800,400" stroke="#ccc" fill="none" stroke-width="2"/>
              
              <!-- Marqueurs pour les témoignages -->
              ${testimonialsWithLocation.map((testimonial, index) => {
                // Position simplifiée basée sur l'index pour la démo
                const x = 200 + (index * 200) % 800;
                const y = 150 + (index * 100) % 300;
                return `
                  <g class="testimonials__map-marker" data-index="${index}">
                    <circle cx="${x}" cy="${y}" r="8" fill="${(data as any).visualVariant === 'modern' ? 'var(--testimonials-primary)' : '#667eea'}"/>
                    <circle cx="${x}" cy="${y}" r="12" fill="${(data as any).visualVariant === 'modern' ? 'var(--testimonials-primary)' : '#667eea'}" opacity="0.3" class="testimonials__map-marker-pulse"/>
                  </g>
                `;
              }).join('')}
            </svg>
          </div>
        </div>
        
        <div class="testimonials__map-sidebar">
          <h3 class="testimonials__map-title">Témoignages par région</h3>
          <div class="testimonials__map-list">
            ${testimonialsWithLocation.map((testimonial, index) => `
              <div class="testimonials__map-item" data-index="${index}">
                <div class="testimonials__map-item-header">
                  ${this.renderAuthor(testimonial)}
                </div>
                <div class="testimonials__map-item-content">
                  ${this.renderRating(testimonial.rating)}
                  <p class="testimonials__text testimonials__text--small">${this.escapeHtml(testimonial.content)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  private renderTestimonialCard(testimonial: any, data: TestimonialsData): string {
    return `
      <div class="testimonials__card" data-category="${testimonial.category || ''}">
        ${this.renderRating(testimonial.rating)}
        <p class="testimonials__text">${this.escapeHtml(testimonial.content)}</p>
        ${this.renderAuthor(testimonial)}
        <div class="testimonials__meta">
          ${this.renderDate(testimonial.date)}
          ${testimonial.source ? this.renderSource(testimonial.source) : ''}
        </div>
      </div>
    `;
  }
  
  private renderDate(date: string | undefined): string {
    if (!date || !this.currentOptions?.displayOptions?.showDate) return '';
    
    const displayOpts = this.currentOptions.displayOptions;
    let displayDate = '';
    
    if (displayOpts.dateFormat === 'relative') {
      // Calculer la date relative
      const testimonialDate = new Date(date);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - testimonialDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        displayDate = "Aujourd'hui";
      } else if (diffDays === 1) {
        displayDate = "Hier";
      } else if (diffDays < 7) {
        displayDate = `Il y a ${diffDays} jours`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        displayDate = `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        displayDate = `Il y a ${months} mois`;
      } else {
        const years = Math.floor(diffDays / 365);
        displayDate = `Il y a ${years} an${years > 1 ? 's' : ''}`;
      }
    } else {
      // Format absolu
      const testimonialDate = new Date(date);
      displayDate = testimonialDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    
    return `<div class="testimonials__date">${displayDate}</div>`;
  }

  private renderRating(rating: number | undefined): string {
    if (!rating || !this.currentOptions.showRating) return '';
    
    const stars = Array(5).fill(0).map((_, i) => i < rating ? '★' : '☆');
    
    return `
      <div class="testimonials__rating">
        ${stars.map(star => `<span class="testimonials__star">${star}</span>`).join('')}
      </div>
    `;
  }

  private renderAuthor(testimonial: any): string {
    if (!testimonial.author) return '';
    
    const showAvatar = this.currentOptions?.showAvatar !== false;
    const displayOpts = this.currentOptions?.displayOptions || {};
    
    // Gérer l'affichage du nom
    let displayName = testimonial.author.name;
    if (displayOpts.showInitials && !displayOpts.showFullName) {
      // Afficher seulement les initiales
      displayName = testimonial.author.name
        .split(' ')
        .map((n: string) => n[0])
        .join('.')
        .toUpperCase() + '.';
    }
    
    return `
      <div class="testimonials__author ${!showAvatar || !testimonial.author.avatar?.src ? 'testimonials__author--no-avatar' : ''}">
        ${showAvatar && testimonial.author.avatar?.src ? `
          <img src="${testimonial.author.avatar.src}" alt="${testimonial.author.name}" class="testimonials__avatar">
        ` : showAvatar && displayOpts.showInitials ? `
          <div class="testimonials__avatar testimonials__avatar--initials">
            ${testimonial.author.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
        ` : ''}
        <div class="testimonials__author-info">
          <div class="testimonials__name">${this.escapeHtml(displayName)}</div>
          ${testimonial.author.role && displayOpts.showRole !== false ? `<div class="testimonials__role">${this.escapeHtml(testimonial.author.role)}</div>` : ''}
          ${testimonial.author.company && displayOpts.showCompany !== false ? `<div class="testimonials__company">${this.escapeHtml(testimonial.author.company)}</div>` : ''}
          ${testimonial.author.location && displayOpts.showLocation ? `<div class="testimonials__location">${this.escapeHtml(testimonial.author.location)}</div>` : ''}
          ${testimonial.author.verified ? `<span class="testimonials__verified" title="Vérifié">✓</span>` : ''}
        </div>
      </div>
    `;
  }

  private renderSource(source: any): string {
    if (!source || !this.currentOptions?.showSource) return '';
    
    return `
      <div class="testimonials__source">
        <span class="testimonials__source-badge testimonials__source-badge--${source.type}">
          ${source.name || source.type}
          ${source.verified ? ' ✓' : ''}
        </span>
      </div>
    `;
  }

  private generateCustomCSS(data: TestimonialsData, visualVariant: string, context?: RenderContext): string {
    let css = '\n/* Custom Testimonials Styles */\n';
    
    // Extraire les couleurs du thème
    const theme = context?.theme;
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fonts?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fonts?.body || 'Inter, system-ui, sans-serif';
    
    // Styles des variantes visuelles
    const variantStyles = {
      modern: {
        gradient: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        shadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        hoverShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
        borderRadius: '1.5rem'
      },
      minimal: {
        gradient: 'none',
        shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        hoverShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.5rem'
      },
      bold: {
        gradient: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        hoverShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        borderRadius: '2rem'
      },
      elegant: {
        gradient: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
        shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        hoverShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
        borderRadius: '1rem'
      }
    };
    
    const currentVariant = variantStyles[visualVariant as keyof typeof variantStyles] || variantStyles.modern;
    
    // Variables CSS personnalisées avec thème et contraste amélioré
    css += `
    :root {
      --testimonials-primary: ${primaryColor};
      --testimonials-secondary: ${secondaryColor};
      --testimonials-gradient: ${currentVariant.gradient};
      --testimonials-shadow: ${currentVariant.shadow};
      --testimonials-hover-shadow: ${currentVariant.hoverShadow};
      --testimonials-border-radius: ${currentVariant.borderRadius};
      --testimonials-font-heading: ${fontHeading};
      --testimonials-font-body: ${fontBody};
    }
    
    /* Amélioration des contrastes pour chaque variante */
    .testimonials--visual-${visualVariant} {
      --testimonials-text: ${visualVariant === 'bold' ? '#ffffff' : '#1a202c'};
      --testimonials-text-secondary: ${visualVariant === 'bold' ? 'rgba(255,255,255,0.8)' : '#4a5568'};
      --testimonials-surface: ${visualVariant === 'bold' ? 'rgba(255,255,255,0.95)' : '#ffffff'};
      --testimonials-border: ${visualVariant === 'minimal' ? '#cbd5e0' : 'rgba(0,0,0,0.05)'};
      --testimonials-background: ${
        visualVariant === 'modern' ? '#f7fafc' :
        visualVariant === 'minimal' ? '#ffffff' :
        visualVariant === 'bold' ? '#1a202c' :
        '#f9fafb'
      };
    }
    
    /* Contrastes spécifiques pour la variante bold */
    .testimonials--visual-bold .testimonials__card {
      --testimonials-text: #1a202c;
      --testimonials-text-secondary: #4a5568;
    }
    
    /* Amélioration de la lisibilité des avatars */
    .testimonials__author--no-avatar .testimonials__author-info {
      padding-left: 0;
    }
    `;
    
    // Styles personnalisés depuis les données
    if (data.styles?.colors) {
      const colors = data.styles.colors;
      css += `.testimonials {
        ${colors.primary ? `--testimonials-primary: ${colors.primary};` : ''}
        ${colors.secondary ? `--testimonials-secondary: ${colors.secondary};` : ''}
        ${colors.text ? `--testimonials-text: ${colors.text};` : ''}
        ${colors.background ? `--testimonials-background: ${colors.background};` : ''}
      }\n`;
    }
    
    // Animations avec index
    css += `
    .testimonials__card:nth-child(1) { --index: 0; }
    .testimonials__card:nth-child(2) { --index: 1; }
    .testimonials__card:nth-child(3) { --index: 2; }
    .testimonials__card:nth-child(4) { --index: 3; }
    .testimonials__card:nth-child(5) { --index: 4; }
    .testimonials__card:nth-child(6) { --index: 5; }
    .testimonials__card:nth-child(7) { --index: 6; }
    .testimonials__card:nth-child(8) { --index: 7; }
    `;

    return css;
  }

  private renderError(message: string): string {
    return `
      <div class="testimonials-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; color: #c00;">
        <strong>Erreur Testimonials:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const testimonialsRendererV3PerfectEnhanced = new TestimonialsRendererV3PerfectEnhanced();
/**
 * Content Schema V3 PERFECT - Configuration ergonomique
 */

import { z } from 'zod';
import { imageSchema } from '../common';

// Schema pour les métadonnées
export const contentMetaSchema = z.object({
  author: z.string().optional(),
  date: z.string().optional(),
  readingTime: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional()
});

// Schema pour les chapitres (timeline)
export const contentChapterSchema = z.object({
  title: z.string(),
  content: z.string(),
  year: z.string().optional(),
  icon: z.string().optional()
});

// Schema pour les cartes (cards grid)
export const contentCardSchema = z.object({
  title: z.string(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  image: imageSchema.optional(),
  category: z.string().optional(),
  link: z.string().optional(),
  date: z.string().optional()
});

// Schema pour les sections (split content)
export const contentSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
  image: imageSchema.optional(),
  link: z.object({
    text: z.string(),
    url: z.string()
  }).optional(),
  reverse: z.boolean().optional()
});

// Schema pour les onglets
export const contentTabSchema = z.object({
  title: z.string(),
  content: z.string(),
  icon: z.string().optional(),
  accordion: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional()
});

// Schema pour la comparaison
export const contentComparisonSchema = z.object({
  headers: z.array(z.string()),
  rows: z.array(z.object({
    cells: z.array(z.object({
      value: z.string(),
      badge: z.object({
        type: z.enum(['success', 'warning', 'info', 'error']),
        color: z.string().optional()
      }).optional()
    }))
  }))
});

// Schema pour les scènes (interactive story)
export const contentSceneSchema = z.object({
  title: z.string(),
  text: z.string(),
  background: imageSchema.optional(),
  choices: z.array(z.object({
    text: z.string(),
    nextScene: z.number()
  })).optional()
});

// Schema pour la sidebar
export const contentSidebarSchema = z.object({
  toc: z.boolean().default(true),
  author: z.object({
    name: z.string(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    social: z.array(z.object({
      platform: z.string(),
      url: z.string()
    })).optional()
  }).optional(),
  related: z.array(z.object({
    title: z.string(),
    link: z.string(),
    image: z.string().optional()
  })).optional(),
  newsletter: z.object({
    title: z.string(),
    description: z.string(),
    buttonText: z.string()
  }).optional()
});

// Schema principal Content
export const contentDataSchema = z.object({
  // Variante visuelle
  variant: z.enum([
    'magazine-layout',    // Style magazine élégant
    'blog-modern',       // Blog avec sidebar
    'timeline-story',    // Histoire chronologique
    'cards-grid',        // Grille de cartes
    'split-content',     // Contenu alterné
    'accordion-tabs',    // Onglets et accordéon
    'comparison-table',  // Tableau comparatif
    'interactive-story'  // Histoire interactive
  ]).default('magazine-layout'),

  // Contenu principal
  title: z.string().min(1).max(200).default('Notre Histoire'),
  subtitle: z.string().max(300).optional(),
  content: z.string().optional(), // HTML content
  
  // Métadonnées
  meta: contentMetaSchema.optional(),
  
  // Contenu structuré selon la variante
  chapters: z.array(contentChapterSchema).optional(), // Pour timeline
  cards: z.array(contentCardSchema).optional(), // Pour cards grid
  sections: z.array(contentSectionSchema).optional(), // Pour split content
  tabs: z.array(contentTabSchema).optional(), // Pour accordion tabs
  comparison: contentComparisonSchema.optional(), // Pour comparison table
  scenes: z.array(contentSceneSchema).optional(), // Pour interactive story
  
  // Sidebar (pour blog modern)
  sidebar: contentSidebarSchema.optional(),
  
  // Options d'affichage
  showReadingProgress: z.boolean().default(true),
  showShareButtons: z.boolean().default(false),
  showPrintButton: z.boolean().default(false),
  enableComments: z.boolean().default(false),
  
  // Animation
  animation: z.object({
    enabled: z.boolean().default(true),
    type: z.enum(['fade', 'slide', 'zoom']).default('fade'),
    duration: z.number().min(0.1).max(2).default(0.8),
    stagger: z.boolean().default(true)
  }).optional(),
  
  // Layout
  layout: z.object({
    maxWidth: z.enum(['narrow', 'normal', 'wide', 'full']).default('normal'),
    padding: z.object({
      top: z.string().default('6rem'),
      bottom: z.string().default('6rem')
    }).optional()
  }).optional(),
  
  // Styles personnalisés
  styles: z.object({
    colors: z.object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      text: z.string().optional(),
      heading: z.string().optional(),
      background: z.string().optional(),
      accent: z.string().optional()
    }).optional(),
    typography: z.object({
      fontFamily: z.string().optional(),
      fontSize: z.string().optional(),
      lineHeight: z.string().optional(),
      headingFont: z.string().optional()
    }).optional(),
    spacing: z.object({
      paragraphGap: z.string().optional(),
      sectionGap: z.string().optional()
    }).optional()
  }).optional(),
  
  // SEO
  seo: z.object({
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional()
  }).optional(),
  
  // ID personnalisé
  id: z.string().optional()

}).strict();

export type ContentData = z.infer<typeof contentDataSchema>;

// Valeurs par défaut
export const contentDefaults: ContentData = {
  variant: 'magazine-layout',
  title: 'Notre Histoire',
  subtitle: 'Une aventure entrepreneuriale passionnante',
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    
    <h2>Les débuts</h2>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <blockquote>
      "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte."
    </blockquote>
    
    <h2>Notre mission</h2>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
  `,
  meta: {
    author: 'Jean Dupont',
    date: '15 janvier 2024',
    readingTime: 5,
    category: 'Entreprise'
  },
  showReadingProgress: true,
  showShareButtons: false,
  animation: {
    enabled: true,
    type: 'fade',
    duration: 0.8,
    stagger: true
  }
};

// Presets pour différents cas d'usage
export const contentPresets = {
  companyStory: {
    variant: 'timeline-story' as const,
    title: 'Notre Parcours',
    subtitle: 'De l\'idée à la réussite',
    chapters: [
      {
        title: 'La genèse',
        content: 'Tout a commencé en 2018 avec une simple idée : rendre la création de sites web accessible à tous.',
        year: '2018'
      },
      {
        title: 'Les premiers clients',
        content: 'En 2019, nous avons accueilli nos 100 premiers clients et perfectionné notre plateforme.',
        year: '2019'
      },
      {
        title: 'L\'expansion',
        content: '2020 a marqué notre expansion nationale avec plus de 1000 sites créés.',
        year: '2020'
      },
      {
        title: 'Aujourd\'hui',
        content: 'En 2024, nous sommes fiers d\'accompagner plus de 10 000 professionnels.',
        year: '2024'
      }
    ]
  },
  
  blogPost: {
    variant: 'blog-modern' as const,
    title: '10 tendances web design pour 2024',
    subtitle: 'Découvrez les dernières innovations en matière de design web',
    meta: {
      author: 'Marie Martin',
      date: '20 janvier 2024',
      readingTime: 8,
      category: 'Design',
      tags: ['web design', 'tendances', 'UX/UI']
    },
    sidebar: {
      toc: true,
      author: {
        name: 'Marie Martin',
        bio: 'Designer UI/UX passionnée par l\'innovation',
        avatar: '/images/marie-avatar.jpg'
      },
      related: [
        { title: 'Les bases du design responsive', link: '#' },
        { title: 'Optimiser la performance web', link: '#' },
        { title: 'L\'importance de l\'accessibilité', link: '#' }
      ]
    },
    showShareButtons: true
  },
  
  servicesList: {
    variant: 'cards-grid' as const,
    title: 'Nos Services',
    subtitle: 'Des solutions adaptées à vos besoins',
    cards: [
      {
        title: 'Création de site web',
        excerpt: 'Un site professionnel clé en main adapté à votre activité.',
        category: 'Web',
        link: '#creation-site'
      },
      {
        title: 'Référencement SEO',
        excerpt: 'Améliorez votre visibilité sur Google et attirez plus de clients.',
        category: 'Marketing',
        link: '#seo'
      },
      {
        title: 'Maintenance & Support',
        excerpt: 'Un accompagnement technique pour garder votre site performant.',
        category: 'Support',
        link: '#maintenance'
      }
    ]
  },
  
  processExplanation: {
    variant: 'split-content' as const,
    title: 'Notre Processus',
    subtitle: 'Une méthode éprouvée pour votre succès',
    sections: [
      {
        title: '1. Découverte',
        content: 'Nous commençons par comprendre vos besoins, vos objectifs et votre vision.',
        image: { url: '/images/discovery.jpg', alt: 'Phase de découverte' }
      },
      {
        title: '2. Conception',
        content: 'Notre équipe créative design une solution sur mesure pour votre entreprise.',
        image: { url: '/images/design.jpg', alt: 'Phase de conception' },
        reverse: true
      },
      {
        title: '3. Développement',
        content: 'Nous donnons vie à votre projet avec les dernières technologies.',
        image: { url: '/images/development.jpg', alt: 'Phase de développement' }
      },
      {
        title: '4. Lancement',
        content: 'Votre site est mis en ligne et optimisé pour attirer vos clients.',
        image: { url: '/images/launch.jpg', alt: 'Phase de lancement' },
        reverse: true
      }
    ]
  },
  
  faqContent: {
    variant: 'accordion-tabs' as const,
    title: 'Centre d\'aide',
    subtitle: 'Trouvez rapidement des réponses à vos questions',
    tabs: [
      {
        title: 'Général',
        content: '<p>Questions générales sur nos services.</p>',
        accordion: [
          {
            question: 'Comment fonctionne votre service ?',
            answer: 'Notre service vous permet de créer facilement un site web professionnel.'
          },
          {
            question: 'Quels sont les délais ?',
            answer: 'La création d\'un site prend généralement entre 5 et 10 jours.'
          }
        ]
      },
      {
        title: 'Technique',
        content: '<p>Aspects techniques et hébergement.</p>',
        accordion: [
          {
            question: 'Quel hébergement utilisez-vous ?',
            answer: 'Nous utilisons des serveurs haute performance avec CDN mondial.'
          },
          {
            question: 'Puis-je avoir mon propre domaine ?',
            answer: 'Oui, vous pouvez connecter votre domaine ou en acheter un nouveau.'
          }
        ]
      }
    ]
  },
  
  comparison: {
    variant: 'comparison-table' as const,
    title: 'Comparaison des offres',
    subtitle: 'Choisissez la formule qui vous convient',
    comparison: {
      headers: ['Fonctionnalité', 'Starter', 'Pro', 'Enterprise'],
      rows: [
        {
          cells: [
            { value: 'Sites web' },
            { value: '1', badge: { type: 'info' } },
            { value: '5', badge: { type: 'success' } },
            { value: 'Illimités', badge: { type: 'success' } }
          ]
        },
        {
          cells: [
            { value: 'Support' },
            { value: 'Email' },
            { value: 'Email + Chat' },
            { value: '24/7 Dédié' }
          ]
        },
        {
          cells: [
            { value: 'SSL' },
            { value: '✓', badge: { type: 'success' } },
            { value: '✓', badge: { type: 'success' } },
            { value: '✓', badge: { type: 'success' } }
          ]
        }
      ]
    }
  },
  
  interactiveDemo: {
    variant: 'interactive-story' as const,
    title: 'Découvrez votre potentiel',
    scenes: [
      {
        title: 'Bienvenue',
        text: 'Vous êtes un professionnel ambitieux. Quelle est votre priorité ?',
        choices: [
          { text: 'Attirer plus de clients', nextScene: 1 },
          { text: 'Moderniser mon image', nextScene: 2 }
        ]
      },
      {
        title: 'Attirer des clients',
        text: 'Excellent choix ! Un site web optimisé peut augmenter vos leads de 200%.',
        choices: [
          { text: 'Je veux en savoir plus', nextScene: 3 },
          { text: 'Commencer maintenant', nextScene: 4 }
        ]
      },
      {
        title: 'Image moderne',
        text: 'Une image professionnelle inspire confiance et crédibilité.',
        choices: [
          { text: 'Voir des exemples', nextScene: 3 },
          { text: 'Créer mon site', nextScene: 4 }
        ]
      }
    ]
  }
};
/**
 * Système d'accessibilité V3 - WCAG AAA
 * Navigation clavier, ARIA, contrastes optimaux
 */

// ============================================
// ATTRIBUTS ARIA PAR COMPOSANT
// ============================================

export const ariaAttributes = {
  // Navigation
  navigation: {
    main: {
      role: 'navigation',
      'aria-label': 'Navigation principale',
    },
    mobile: {
      'aria-label': 'Menu mobile',
      'aria-expanded': 'false',
      'aria-controls': 'mobile-menu',
    },
    skipLink: {
      href: '#main-content',
      className: 'sr-only focus:not-sr-only',
      text: 'Aller au contenu principal',
    }
  },

  // Boutons et interactions
  button: {
    base: {
      type: 'button',
      role: 'button',
    },
    toggle: (pressed: boolean) => ({
      'aria-pressed': pressed.toString(),
    }),
    loading: {
      'aria-busy': 'true',
      'aria-live': 'polite',
    },
    disabled: {
      'aria-disabled': 'true',
      disabled: true,
    }
  },

  // Formulaires
  form: {
    field: (id: string, required?: boolean, error?: string) => ({
      'aria-required': required?.toString(),
      'aria-invalid': error ? 'true' : 'false',
      'aria-describedby': error ? `${id}-error` : undefined,
    }),
    error: (id: string) => ({
      id: `${id}-error`,
      role: 'alert',
      'aria-live': 'polite',
    }),
    success: {
      role: 'status',
      'aria-live': 'polite',
    }
  },

  // Modales et overlays
  modal: {
    dialog: {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'modal-title',
      'aria-describedby': 'modal-description',
    },
    backdrop: {
      'aria-hidden': 'true',
    },
    close: {
      'aria-label': 'Fermer la fenêtre',
    }
  },

  // Listes et navigation
  list: {
    accordion: (expanded: boolean, id: string) => ({
      'aria-expanded': expanded.toString(),
      'aria-controls': `panel-${id}`,
      id: `accordion-${id}`,
    }),
    tabs: {
      tablist: { role: 'tablist' },
      tab: (selected: boolean, index: number) => ({
        role: 'tab',
        'aria-selected': selected.toString(),
        'aria-controls': `tabpanel-${index}`,
        id: `tab-${index}`,
        tabIndex: selected ? 0 : -1,
      }),
      tabpanel: (index: number) => ({
        role: 'tabpanel',
        'aria-labelledby': `tab-${index}`,
        id: `tabpanel-${index}`,
      })
    }
  },

  // Images et médias
  media: {
    decorative: {
      role: 'presentation',
      'aria-hidden': 'true',
      alt: '',
    },
    informative: (alt: string) => ({
      alt,
      role: 'img',
    }),
    loading: {
      'aria-busy': 'true',
      'aria-label': 'Chargement de l\'image',
    }
  },

  // États et notifications
  liveRegion: {
    polite: {
      'aria-live': 'polite',
      'aria-atomic': 'true',
    },
    assertive: {
      'aria-live': 'assertive',
      'aria-atomic': 'true',
    },
    status: {
      role: 'status',
      'aria-live': 'polite',
    }
  }
};

// ============================================
// GESTION DU FOCUS
// ============================================

export class FocusManager {
  private focusableElements = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
  private trapElement: HTMLElement | null = null;
  private previousFocus: HTMLElement | null = null;

  /**
   * Piège le focus dans un élément (modal, menu)
   */
  trapFocus(element: HTMLElement) {
    this.trapElement = element;
    this.previousFocus = document.activeElement as HTMLElement;

    const focusable = this.getFocusableElements(element);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    // Focus sur le premier élément
    firstFocusable?.focus();

    // Gestionnaire de touches
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      this.previousFocus?.focus();
    };
  }

  /**
   * Récupère tous les éléments focusables
   */
  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const elements = container.querySelectorAll<HTMLElement>(this.focusableElements);
    return Array.from(elements).filter(el => {
      return !el.hasAttribute('disabled') && 
             !el.getAttribute('aria-hidden') &&
             el.offsetParent !== null;
    });
  }

  /**
   * Gestion des raccourcis clavier
   */
  setupKeyboardShortcuts(shortcuts: Record<string, () => void>) {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = `${e.ctrlKey ? 'ctrl+' : ''}${e.shiftKey ? 'shift+' : ''}${e.key.toLowerCase()}`;
      
      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }
}

// ============================================
// CONTRASTES ET COULEURS
// ============================================

export const colorContrast = {
  /**
   * Calcule le ratio de contraste entre deux couleurs
   */
  getContrastRatio(color1: string, color2: string): number {
    const l1 = this.getLuminance(color1);
    const l2 = this.getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  /**
   * Calcule la luminance relative d'une couleur
   */
  getLuminance(color: string): number {
    const rgb = this.hexToRgb(color);
    const [r, g, b] = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },

  /**
   * Convertit hex en RGB
   */
  hexToRgb(hex: string): number[] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  },

  /**
   * Vérifie si le contraste est suffisant
   */
  isAccessible(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  },

  /**
   * Ajuste automatiquement la couleur pour un meilleur contraste
   */
  adjustForContrast(foreground: string, background: string, targetRatio = 4.5): string {
    let ratio = this.getContrastRatio(foreground, background);
    let rgb = this.hexToRgb(foreground);
    
    while (ratio < targetRatio) {
      // Éclaircir ou assombrir selon le background
      const bgLuminance = this.getLuminance(background);
      const adjust = bgLuminance > 0.5 ? -10 : 10;
      
      rgb = rgb.map(val => Math.max(0, Math.min(255, val + adjust)));
      const newHex = `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;
      ratio = this.getContrastRatio(newHex, background);
      
      if (rgb.every(v => v === 0) || rgb.every(v => v === 255)) break;
    }
    
    return `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;
  }
};

// ============================================
// CSS POUR ACCESSIBILITÉ
// ============================================

export const generateAccessibilityCSS = () => `
  /* Skip links */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  }
  
  .skip-link:focus {
    top: 0;
  }

  /* Screen reader only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  .sr-only-focusable:focus {
    position: absolute;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  /* Focus visible */
  :focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  
  :focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  
  /* Suppression du focus pour la souris */
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* États interactifs haute visibilité */
  button:hover,
  a:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
  
  button:active,
  a:active {
    transform: translateY(0);
  }

  /* Indicateurs d'état */
  [aria-busy="true"] {
    cursor: wait;
  }
  
  [aria-disabled="true"],
  :disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  /* Amélioration de la lisibilité */
  body {
    line-height: 1.6;
    letter-spacing: 0.02em;
  }
  
  p {
    max-width: 70ch;
    margin-bottom: 1rem;
  }

  /* Mode contraste élevé */
  @media (prefers-contrast: high) {
    :root {
      --primary: #0066CC;
      --text: #000000;
      --background: #FFFFFF;
    }
    
    button,
    .card {
      border: 2px solid currentColor;
    }
  }

  /* Mode sombre automatique */
  @media (prefers-color-scheme: dark) {
    :root {
      --primary: #60A5FA;
      --text: #F9FAFB;
      --background: #111827;
    }
  }

  /* Indicateurs de chargement accessibles */
  .loading-spinner {
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-left-color: var(--primary);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }
  
  .loading-text {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  /* Améliorations pour lecteurs d'écran */
  [role="alert"] {
    font-weight: bold;
    color: var(--error);
  }
  
  [role="status"] {
    font-style: italic;
  }

  /* Navigation au clavier visible */
  .keyboard-only:not(:focus) {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

// ============================================
// UTILITAIRES
// ============================================

export const a11yUtils = {
  /**
   * Annonce un message aux lecteurs d'écran
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  },

  /**
   * Génère un ID unique pour ARIA
   */
  generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Vérifie si l'utilisateur préfère le mouvement réduit
   */
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Vérifie si l'utilisateur utilise un lecteur d'écran
   */
  isScreenReaderActive(): boolean {
    return document.body.getAttribute('aria-hidden') !== 'true';
  }
};
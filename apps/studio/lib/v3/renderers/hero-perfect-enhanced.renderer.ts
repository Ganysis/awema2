/**
 * Hero Renderer V3 PERFECT Enhanced - Version ultra-moderne avec design system
 */

import { RenderResult, RenderContext } from '../types';
import { HeroData, heroDefaults } from '../schemas/blocks/hero';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';

export class HeroRendererV3PerfectEnhanced extends BaseRendererV3<HeroData> {
  type = 'hero-v3-perfect';
  version = '3.0.0';
  
  constructor() {
    super();
    console.log('🟡 HeroRendererV3PerfectEnhanced constructor called');
  }
  
  getDefaultData(): HeroData {
    return {
      ...heroDefaults,
      variant: 'modern' as any, // Override default variant
      title: 'Titre Principal',
      subtitle: 'Sous-titre descriptif',
      primaryButton: { text: 'Action principale', link: '#' },
      secondaryButton: { text: 'Action secondaire', link: '#' }
    };
  }
  
  getDefaultCSS(): string {
    // Return empty string as CSS is generated in render method
    return '';
  }
  
  getRequiredAssets(): any[] {
    return [];
  }
  
  validate(data: unknown): z.SafeParseReturnType<HeroData, HeroData> {
    // For now, just return success with the data
    return { success: true, data: data as HeroData } as any;
  }
  
  renderPreview(data: HeroData): string {
    return this.render(data, { isExport: false }).html;
  }

  getBlockProps(): BlockProp[] {
    return [
      {
        name: 'variant',
        label: 'Style visuel',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'modern',
        description: 'Choisissez le style visuel du hero',
        options: [
          { value: 'modern', label: '🎨 Moderne - Gradient dynamique' },
          { value: 'minimal', label: '⚡ Minimaliste - Épuré et rapide' },
          { value: 'bold', label: '🔥 Audacieux - Impact visuel fort' },
          { value: 'elegant', label: '✨ Élégant - Glassmorphism subtil' }
        ],
        editorConfig: {
          control: EditorControl.RADIO,
          group: 'Visuel',
          order: 1
        }
      },
      {
        name: 'layout',
        label: 'Disposition',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'center',
        description: 'Disposition du contenu',
        options: [
          { value: 'center', label: 'Centré' },
          { value: 'left', label: 'Aligné à gauche (avec image optionnelle à droite)' },
          { value: 'split', label: 'Split 50/50 (image requise)' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Visuel',
          order: 2
        }
      },
      {
        name: 'title',
        label: 'Titre principal',
        type: PropType.STRING,
        required: true,
        defaultValue: 'Titre Principal',
        description: 'Le titre principal du hero',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Contenu',
          order: 1
        }
      },
      {
        name: 'subtitle',
        label: 'Sous-titre',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Sous-titre descriptif',
        description: 'Le sous-titre du hero',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 2
        }
      },
      {
        name: 'primaryButton',
        label: 'Bouton principal',
        type: PropType.OBJECT,
        required: false,
        defaultValue: { text: 'Action principale', link: '#' },
        editorConfig: {
          control: EditorControl.OBJECT,
          group: 'Actions',
          order: 1,
          schema: [
            { name: 'text', type: PropType.STRING, label: 'Texte' },
            { name: 'link', type: PropType.STRING, label: 'Lien' }
          ]
        }
      },
      {
        name: 'secondaryButton',
        label: 'Bouton secondaire',
        type: PropType.OBJECT,
        required: false,
        defaultValue: { text: 'Action secondaire', link: '#' },
        editorConfig: {
          control: EditorControl.OBJECT,
          group: 'Actions',
          order: 2,
          schema: [
            { name: 'text', type: PropType.STRING, label: 'Texte' },
            { name: 'link', type: PropType.STRING, label: 'Lien' }
          ]
        }
      },
      {
        name: 'image',
        label: 'Image',
        type: PropType.STRING,
        required: false,
        description: 'Image pour le layout split',
        editorConfig: {
          control: EditorControl.IMAGE,
          group: 'Média',
          order: 1
        }
      },
      {
        name: 'backgroundColor',
        label: 'Couleur de fond',
        type: PropType.STRING,
        required: false,
        description: 'Couleur de fond personnalisée (override le style de la variante)',
        editorConfig: {
          control: EditorControl.COLOR,
          group: 'Visuel',
          order: 3
        }
      },
      {
        name: 'overlayOpacity',
        label: 'Opacité du filtre (%)',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 40,
        description: 'Opacité du filtre sur l\'image de fond (0 à 100)',
        editorConfig: {
          control: EditorControl.INPUT,
          group: 'Effets visuels',
          order: 1,
          placeholder: '40',
          inputType: 'number',
          min: 0,
          max: 100,
          step: 5
        }
      },
      {
        name: 'bgBlurAmount',
        label: 'Flou de l\'image de fond (px)',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 8,
        description: 'Niveau de flou de 0 (net) à 20 (très flou)',
        editorConfig: {
          control: EditorControl.INPUT,
          group: 'Effets visuels',
          order: 2,
          placeholder: '8',
          inputType: 'number',
          min: 0,
          max: 20,
          step: 1
        }
      }
    ];
  }
  render(data: HeroData, context?: RenderContext): RenderResult {
    console.log('🟢 HeroRendererV3PerfectEnhanced.render called with data:', data);
    
    const { 
      title = 'Titre Principal', 
      subtitle = 'Sous-titre descriptif',
      primaryButton,
      secondaryButton,
      variant = 'modern',
      layout = 'center',
      image,
      backgroundColor,
      overlayOpacity = 40,
      bgBlurAmount = 8
    } = data;

    console.log('🟢 Using variant:', variant, 'layout:', layout);
    
    const isExport = context?.isExport ?? false;
    const theme = context?.theme;
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';
    
    console.log('🟢 Theme in renderer:', theme);
    console.log('🟢 Primary color:', primaryColor, 'Secondary:', secondaryColor);
    console.log('🟢 Fonts - Heading:', fontHeading, 'Body:', fontBody);

    // HTML moderne avec structure optimisée
    const html = `
<section class="hero hero--${variant} hero--${layout} ${image ? 'hero--has-image' : ''}" aria-label="Hero" ${backgroundColor ? `style="background-color: ${backgroundColor};"` : ''}>
  <!-- Background avec effets -->
  <div class="hero__background">
    ${variant === 'modern' ? `
      <div class="hero__gradient"></div>
      <div class="hero__pattern"></div>
    ` : ''}
    ${variant === 'bold' ? `
      <div class="hero__waves">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" opacity="0.3"></path>
        </svg>
      </div>
    ` : ''}
    ${image && layout !== 'split' ? `
      <div class="hero__image-bg" style="background-image: url('${image}'); filter: blur(${bgBlurAmount}px) brightness(0.8);"></div>
      <div class="hero__overlay" style="opacity: ${overlayOpacity / 100}; background-color: ${
        variant === 'modern' ? 'rgba(102, 126, 234, 0.9)' :
        variant === 'minimal' ? 'rgba(250, 250, 250, 0.9)' :
        variant === 'bold' ? 'rgba(17, 17, 17, 0.9)' :
        'rgba(248, 249, 250, 0.9)'
      }"></div>
    ` : ''}
  </div>

  <!-- Contenu principal -->
  <div class="hero__container">
    <div class="hero__content">
      <h1 class="hero__title" ${!isExport ? 'contenteditable="true"' : ''}>
        ${this.escapeHtml(title)}
      </h1>
      
      ${subtitle ? `
        <p class="hero__subtitle" ${!isExport ? 'contenteditable="true"' : ''}>
          ${this.escapeHtml(subtitle)}
        </p>
      ` : ''}
      
      ${(primaryButton || secondaryButton) ? `
        <div class="hero__actions">
          ${primaryButton ? `
            <a href="${primaryButton.link || '#'}" class="hero__btn hero__btn--primary">
              <span>${this.escapeHtml(primaryButton.text || 'Action principale')}</span>
              <svg class="hero__btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m0 0l-7-7m7 7l-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          ` : ''}
          
          ${secondaryButton ? `
            <a href="${secondaryButton.link || '#'}" class="hero__btn hero__btn--secondary">
              ${this.escapeHtml(secondaryButton.text || 'Action secondaire')}
            </a>
          ` : ''}
        </div>
      ` : ''}
    </div>

    ${image && (layout === 'split' || layout === 'left') ? `
      <div class="hero__media">
        <div class="hero__media-wrapper">
          <img src="${image}" alt="" class="hero__image" loading="lazy">
          <div class="hero__media-decoration"></div>
        </div>
      </div>
    ` : ''}
  </div>

  <!-- Indicateur de scroll -->
  <div class="hero__scroll-indicator">
    <div class="hero__scroll-line"></div>
  </div>
</section>`;

    // CSS moderne et optimisé avec les couleurs du thème
    const css = `
/* Variables CSS du thème */
:root {
  --hero-primary: ${primaryColor};
  --hero-secondary: ${secondaryColor};
  --hero-font-heading: ${fontHeading};
  --hero-font-body: ${fontBody};
}
/* Hero V3 Perfect Enhanced - Design moderne */
.hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #ffffff;
  font-family: var(--hero-font-body);
  padding: 4rem 0 3rem;
}

.hero__background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero__container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  gap: 4rem;
}

/* Variantes modernes */
.hero--modern:not([style*="background-color"]) {
  background: linear-gradient(135deg, var(--hero-primary) 0%, var(--hero-secondary) 100%);
}

.hero--modern {
  color: white;
}

.hero--modern .hero__gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.hero--modern .hero__pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);
}

.hero--minimal:not([style*="background-color"]) {
  background: #fafafa;
}

.hero--minimal {
  color: #111;
}

.hero--minimal .hero__title {
  background: linear-gradient(135deg, var(--hero-primary) 0%, var(--hero-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero--bold:not([style*="background-color"]) {
  background: #111;
}

.hero--bold {
  color: white;
}

.hero--bold .hero__waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  color: var(--hero-primary);
}

.hero--elegant:not([style*="background-color"]) {
  background: #f8f9fa;
}

.hero--elegant {
  color: #212529;
}

/* Image de fond et overlay pour toutes les variantes */
.hero__image-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  /* Le filter est contrôlé par le style inline */
  transform: scale(1.1);
  z-index: 1;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  /* La couleur et l'opacité sont contrôlées par le style inline */
}

/* Layout variations */
.hero--center .hero__container {
  grid-template-columns: 1fr;
  text-align: center;
}

.hero--center .hero__content {
  max-width: 800px;
  margin: 0 auto;
}

.hero--center .hero__actions {
  justify-content: center;
}

.hero--left .hero__container {
  grid-template-columns: 1fr;
  text-align: left;
}

.hero--left.hero--has-image .hero__container {
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
}

.hero--split .hero__container {
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

/* Contenu */
.hero__content {
  animation: fadeInUp 0.8s ease-out;
}

.hero__title {
  font-family: var(--hero-font-heading);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem;
}

.hero__subtitle {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 2.5rem;
  opacity: 0.9;
}

/* Actions avec micro-interactions */
.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.hero__btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
}

.hero__btn:hover::before {
  transform: scale(2);
}

.hero__btn--primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero--modern .hero__btn--primary {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.hero__btn--primary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.hero--modern .hero__btn--primary:hover {
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.hero__btn--secondary {
  background: transparent;
  color: currentColor;
  border: 2px solid currentColor;
}

.hero__btn--secondary:hover {
  background: currentColor;
  color: white;
  transform: translateY(-2px);
}

/* Specific fixes for each variant */
.hero--modern .hero__btn--secondary:hover {
  background: white;
  color: var(--hero-primary);
  border-color: white;
}

.hero--minimal .hero__btn--primary {
  background: var(--hero-primary);
  color: white;
  border: none;
}

.hero--minimal .hero__btn--secondary {
  background: transparent;
  color: var(--hero-primary);
  border: 2px solid var(--hero-primary);
}

.hero--minimal .hero__btn--secondary:hover {
  background: var(--hero-primary);
  color: white;
}

.hero--bold .hero__btn--primary {
  background: var(--hero-primary);
  color: white;
  border: none;
}

.hero--bold .hero__btn--secondary {
  color: white;
  border-color: white;
}

.hero--bold .hero__btn--secondary:hover {
  background: white;
  color: #111;
}

.hero--elegant .hero__btn--primary {
  background: var(--hero-primary);
  color: white;
  backdrop-filter: none;
  border: none;
}

.hero--elegant .hero__btn--secondary {
  background: transparent;
  color: var(--hero-primary);
  border: 2px solid var(--hero-primary);
}

.hero--elegant .hero__btn--secondary:hover {
  background: var(--hero-primary);
  color: white;
}

.hero__btn-icon {
  transition: transform 0.3s ease;
}

.hero__btn:hover .hero__btn-icon {
  transform: translateX(4px);
}

/* Media */
.hero__media {
  position: relative;
  animation: fadeInRight 0.8s ease-out 0.2s both;
}

.hero__media-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
}

.hero__image {
  width: 100%;
  height: auto;
  display: block;
}

.hero__media-decoration {
  position: absolute;
  inset: -20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;
  border-radius: 20px;
  opacity: 0.3;
  filter: blur(40px);
}

/* Scroll indicator */
.hero__scroll-indicator {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid currentColor;
  border-radius: 15px;
  opacity: 0.3;
}

.hero__scroll-line {
  width: 2px;
  height: 10px;
  background: currentColor;
  margin: 10px auto 0;
  border-radius: 2px;
  animation: scroll 2s ease-in-out infinite;
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

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scroll {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(10px);
    opacity: 0.3;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero__container {
    padding: 0 1.5rem;
  }
  
  .hero--split .hero__container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero__actions {
    flex-direction: column;
    width: 100%;
  }
  
  .hero__btn {
    width: 100%;
    justify-content: center;
  }
  
  .hero__media {
    margin-top: 2rem;
  }
}

/* Dark mode pour minimal */
@media (prefers-color-scheme: dark) {
  .hero--minimal {
    background: #111;
    color: #fafafa;
  }
}

/* Performance */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;

    // JS minimal pour les interactions
    const js = !isExport ? `
// Hero interactions
(function() {
  // Parallax scroll effect
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = 'translateY(' + rate + 'px)';
    });
  }
})();
` : '';

    console.log('🟢 Returning from enhanced renderer - CSS length:', css.length, 'HTML length:', html.length);
    return { html, css, js };
  }

  private escapeHtml(str: string): string {
    // Méthode d'échappement HTML sans dépendance au DOM
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    };
    
    return (str || '').replace(/[&<>"'\/]/g, (char) => escapeMap[char] || char);
  }
}
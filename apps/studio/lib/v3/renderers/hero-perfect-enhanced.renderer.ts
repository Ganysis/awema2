/**
 * Hero Renderer V3 PERFECT Enhanced - Version ultra-moderne avec design system
 */

import { RenderResult, RenderContext } from '../types';
import { HeroData, heroDefaults } from '../schemas/blocks/hero';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';

export class HeroRendererV3PerfectEnhanced extends BaseRendererV3<HeroData> {
  getDefaultData(): HeroData {
    return heroDefaults;
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
        options: ['center', 'left', 'split'],
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
      }
    ];
  }
  render(data: HeroData, context?: RenderContext): RenderResult {
    const { 
      title = 'Titre Principal', 
      subtitle = 'Sous-titre descriptif',
      primaryButton,
      secondaryButton,
      variant = 'modern',
      layout = 'center',
      image
    } = data;

    const isExport = context?.isExport ?? false;

    // HTML moderne avec structure optimisée
    const html = `
<section class="hero hero--${variant} hero--${layout}" aria-label="Hero">
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
    ${image && variant === 'elegant' ? `
      <div class="hero__image-bg" style="background-image: url('${image}')"></div>
      <div class="hero__overlay"></div>
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

    ${image && layout === 'split' ? `
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

    // CSS moderne et optimisé
    const css = `
/* Hero V3 Perfect Enhanced - Design moderne */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #ffffff;
}

.hero__background {
  position: absolute;
  inset: 0;
  z-index: 0;
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
.hero--modern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.hero--minimal {
  background: #fafafa;
  color: #111;
}

.hero--minimal .hero__title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero--bold {
  background: #111;
  color: white;
}

.hero--bold .hero__waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  color: #667eea;
}

.hero--elegant {
  background: #f8f9fa;
  color: #212529;
}

.hero--elegant .hero__image-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(8px) brightness(0.8);
  transform: scale(1.1);
}

.hero--elegant .hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(248, 249, 250, 0.9);
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

.hero__btn--primary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid currentColor;
  border-radius: 15px;
  opacity: 0.5;
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

    return { html, css, js };
  }

  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
}
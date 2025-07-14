"use strict";
/**
 * CTA Renderer V3 - Rendu robuste avec logs détaillés
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTARendererV3 = void 0;
const cta_1 = require("../schemas/blocks/cta");
const logger_1 = require("../core/logger");
class CTARendererV3 {
    constructor() {
        this.type = 'cta-ultra-modern';
        this.version = '3.0.0';
        logger_1.logger.info('CTARendererV3', 'constructor', '🚀 Initialisation du renderer CTA V3');
    }
    validate(data) {
        logger_1.logger.debug('CTARendererV3', 'validate', 'Validation des données', {
            hasData: !!data,
            dataType: typeof data
        });
        const result = cta_1.ctaDataSchema.safeParse(data);
        if (!result.success) {
            logger_1.logger.warn('CTARendererV3', 'validate', 'Validation échouée', {
                errors: result.error.errors
            });
        }
        else {
            logger_1.logger.info('CTARendererV3', 'validate', '✅ Validation réussie', {
                variant: result.data.variant,
                hasStats: result.data.stats.enabled,
                hasUrgency: result.data.urgency.enabled
            });
        }
        return result;
    }
    getDefaultData() {
        logger_1.logger.debug('CTARendererV3', 'getDefaultData', 'Retour des données par défaut');
        return cta_1.ctaDefaults;
    }
    getDefaultCSS() {
        logger_1.logger.debug('CTARendererV3', 'getDefaultCSS', 'Génération CSS par défaut');
        return `
/* CTA Base Styles */
.cta {
  position: relative;
  padding: var(--cta-padding, 4rem) 0;
  overflow: hidden;
  isolation: isolate;
}

.cta__background {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.cta__overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.cta__container {
  max-width: var(--cta-max-width, 1200px);
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

/* Container widths */
.cta--container-full .cta__container { max-width: 100%; }
.cta--container-wide .cta__container { max-width: 1400px; }
.cta--container-normal .cta__container { max-width: 1200px; }
.cta--container-narrow .cta__container { max-width: 800px; }

/* Content */
.cta__content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta--align-left .cta__content { text-align: left; margin: 0; }
.cta--align-right .cta__content { text-align: right; margin: 0 0 0 auto; }

.cta__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--cta-text, white);
  line-height: 1.2;
}

.cta__subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--cta-text-secondary, rgba(255,255,255,0.9));
}

.cta__description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--cta-text-secondary, rgba(255,255,255,0.8));
  line-height: 1.6;
}

/* Text Highlight */
.cta__highlight {
  position: relative;
  display: inline-block;
}

.cta__highlight--underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: currentColor;
  opacity: 0.5;
}

.cta__highlight--background {
  background: rgba(255,255,255,0.2);
  padding: 0 0.5rem;
  border-radius: 0.25rem;
}

.cta__highlight--gradient {
  background: linear-gradient(135deg, var(--primary, #3b82f6), var(--secondary, #8b5cf6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta__highlight--animated {
  animation: highlight-pulse 2s ease-in-out infinite;
}

@keyframes highlight-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Buttons */
.cta__buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.cta--align-left .cta__buttons { justify-content: flex-start; }
.cta--align-right .cta__buttons { justify-content: flex-end; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: var(--cta-button-radius, 0.5rem);
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  border: 2px solid transparent;
}

.btn--primary {
  background: white;
  color: var(--primary, #3b82f6);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.btn--secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.btn--secondary:hover {
  background: white;
  color: var(--primary, #3b82f6);
}

.btn--outline {
  background: transparent;
  color: var(--cta-text, white);
  border-color: currentColor;
}

.btn--lg {
  padding: 1rem 2.5rem;
  font-size: 1.25rem;
}

/* Stats */
.cta__stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.cta__stat {
  text-align: center;
}

.cta__stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--cta-text, white);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.cta__stat-label {
  font-size: 1rem;
  color: var(--cta-text-secondary, rgba(255,255,255,0.8));
}

/* Badges */
.cta__badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.cta__badge {
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 9999px;
  color: var(--cta-text, white);
  font-size: 0.875rem;
}

/* Urgency / Countdown */
.cta__urgency {
  margin: 2rem 0;
}

.cta__countdown {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.cta__countdown-item {
  text-align: center;
  min-width: 80px;
}

.cta__countdown-value {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--cta-text, white);
  background: rgba(0,0,0,0.2);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.cta__countdown-label {
  font-size: 0.875rem;
  color: var(--cta-text-secondary, rgba(255,255,255,0.8));
  text-transform: uppercase;
}

/* Media */
.cta--split-image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
}

.cta__media {
  position: relative;
}

.cta__media img {
  width: 100%;
  height: auto;
  border-radius: 1rem;
}

.cta__media--float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Background Variants */
.cta--gradient-wave {
  background: linear-gradient(135deg, var(--gradient-from, #3b82f6), var(--gradient-to, #8b5cf6));
  position: relative;
}

.cta--gradient-wave::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: white;
  clip-path: polygon(0 50%, 100% 0, 100% 100%, 0 100%);
}

.cta--glassmorphism {
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Particles */
.cta__particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  animation: particle-float 10s linear infinite;
}

@keyframes particle-float {
  from {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translateY(-100px) rotate(720deg);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .cta--split-image {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .cta__stats {
    gap: 2rem;
  }
  
  .cta__stat-value {
    font-size: 2rem;
  }
  
  .cta__countdown-value {
    font-size: 2rem;
    min-width: 60px;
  }
}

/* Spacing variants */
.cta--spacing-compact { padding: 2rem 0; }
.cta--spacing-normal { padding: 4rem 0; }
.cta--spacing-relaxed { padding: 6rem 0; }
.cta--spacing-spacious { padding: 8rem 0; }

/* Shadow variants */
.cta--shadow-sm { box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
.cta--shadow-md { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.cta--shadow-lg { box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
.cta--shadow-xl { box-shadow: 0 20px 25px rgba(0,0,0,0.1); }

/* Text shadow */
.cta--text-shadow .cta__title,
.cta--text-shadow .cta__subtitle,
.cta--text-shadow .cta__description {
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}`;
    }
    getRequiredAssets() {
        logger_1.logger.debug('CTARendererV3', 'getRequiredAssets', 'Aucun asset requis');
        return [];
    }
    renderPreview(data) {
        logger_1.logger.debug('CTARendererV3', 'renderPreview', 'Génération preview', {
            variant: data.variant,
            hasStats: data.stats.enabled
        });
        return `
<div class="cta-preview">
  <h3>${data.title}</h3>
  <p>${data.variant} - ${data.stats.enabled ? 'Avec stats' : 'Sans stats'}</p>
</div>`;
    }
    render(data, context) {
        const startTime = performance.now();
        logger_1.logger.info('CTARendererV3', 'render', '🎨 Début du rendu CTA', {
            variant: data.variant,
            hasStats: data.stats.enabled,
            hasUrgency: data.urgency.enabled,
            hasContext: !!context
        });
        try {
            // Générer le HTML
            logger_1.logger.debug('CTARendererV3', 'render', 'Génération HTML');
            const html = this.generateHTML(data);
            // Générer le CSS spécifique
            logger_1.logger.debug('CTARendererV3', 'render', 'Génération CSS');
            const css = this.generateCSS(data);
            // Générer le JS si nécessaire
            logger_1.logger.debug('CTARendererV3', 'render', 'Génération JS');
            const js = this.generateJS(data);
            // Calculer les performances
            const renderTime = performance.now() - startTime;
            logger_1.logger.info('CTARendererV3', 'render', '✅ Rendu CTA terminé', {
                renderTime: renderTime.toFixed(2),
                htmlLength: html.length,
                cssLength: css.length,
                jsLength: js.length
            });
            return {
                html,
                css: this.getDefaultCSS() + css,
                js,
                assets: [],
                errors: [],
                warnings: [],
                performance: {
                    renderTime,
                    cssSize: css.length,
                    jsSize: js.length,
                }
            };
        }
        catch (error) {
            logger_1.logger.error('CTARendererV3', 'render', '❌ Erreur lors du rendu', error);
            return {
                html: '<div class="cta cta--error">Erreur de rendu</div>',
                css: this.getDefaultCSS(),
                js: '',
                assets: [],
                errors: [{
                        blockId: 'cta',
                        message: error instanceof Error ? error.message : 'Erreur inconnue',
                        fallbackUsed: true
                    }],
                warnings: [],
                performance: {
                    renderTime: performance.now() - startTime,
                    cssSize: 0,
                    jsSize: 0,
                }
            };
        }
    }
    generateHTML(data) {
        logger_1.logger.debug('CTARendererV3', 'generateHTML', 'Génération structure HTML', {
            variant: data.variant,
            layout: data.layout
        });
        const classes = [
            'cta',
            `cta--${data.variant}`,
            `cta--align-${data.layout.alignment}`,
            `cta--container-${data.layout.contentWidth}`,
            `cta--spacing-${data.layout.spacing}`,
            data.styles.shadow !== 'none' ? `cta--shadow-${data.styles.shadow}` : '',
            data.styles.textShadow ? 'cta--text-shadow' : ''
        ].filter(Boolean).join(' ');
        return `
<section class="${classes}" id="cta" data-block="cta">
  ${this.renderBackground(data)}
  <div class="cta__container">
    ${data.media.type !== 'none' && data.variant === 'split-image' ? '<div class="cta__content-wrapper">' : ''}
    
    <div class="cta__content">
      ${data.stats.enabled && data.stats.position === 'top' ? this.renderStats(data.stats) : ''}
      
      ${data.title ? this.renderTitle(data.title, data.highlight) : ''}
      ${data.subtitle ? `<p class="cta__subtitle">${this.escape(data.subtitle)}</p>` : ''}
      ${data.description ? `<p class="cta__description">${this.escape(data.description)}</p>` : ''}
      
      ${data.urgency.enabled ? this.renderUrgency(data.urgency) : ''}
      
      ${this.renderButtons(data.buttons)}
      
      ${data.badges.enabled ? this.renderBadges(data.badges) : ''}
      ${data.stats.enabled && data.stats.position === 'bottom' ? this.renderStats(data.stats) : ''}
    </div>
    
    ${data.media.type !== 'none' && data.variant === 'split-image' ? this.renderMedia(data.media) : ''}
    ${data.media.type !== 'none' && data.variant === 'split-image' ? '</div>' : ''}
  </div>
  
  ${data.background.particles?.enabled ? this.renderParticles(data.background.particles) : ''}
</section>`;
    }
    renderBackground(data) {
        logger_1.logger.debug('CTARendererV3', 'renderBackground', 'Génération background', {
            type: data.background.type
        });
        let bgHtml = '<div class="cta__background">';
        switch (data.background.type) {
            case 'gradient':
                if (data.background.gradient) {
                    const gradient = data.background.gradient;
                    bgHtml = `<div class="cta__background" style="background: ${gradient.type}-gradient(${gradient.type === 'linear' ? gradient.angle + 'deg, ' : ''}${gradient.colors.join(', ')});"></div>`;
                }
                break;
            case 'image':
                if (data.background.image) {
                    bgHtml = `<div class="cta__background" style="background-image: url('${data.background.image.src}'); background-size: cover; background-position: center;"></div>`;
                }
                break;
            case 'pattern':
                if (data.background.pattern) {
                    bgHtml = `<div class="cta__background cta__background--pattern-${data.background.pattern.type}"></div>`;
                }
                break;
        }
        // Overlay
        if (data.background.overlay?.enabled) {
            bgHtml += `<div class="cta__overlay" style="background: ${data.background.overlay.color}; opacity: ${data.background.overlay.opacity};"></div>`;
        }
        return bgHtml;
    }
    renderTitle(title, highlight) {
        if (!highlight.enabled || !highlight.text) {
            return `<h2 class="cta__title">${this.escape(title)}</h2>`;
        }
        // Remplacer le texte highlight
        const highlighted = title.replace(highlight.text, `<span class="cta__highlight cta__highlight--${highlight.style}">${highlight.text}</span>`);
        return `<h2 class="cta__title">${highlighted}</h2>`;
    }
    renderButtons(buttons) {
        const btns = [];
        if (buttons.primary) {
            btns.push(this.renderButton(buttons.primary, 'primary'));
        }
        if (buttons.secondary) {
            btns.push(this.renderButton(buttons.secondary, 'secondary'));
        }
        return btns.length > 0 ? `<div class="cta__buttons">${btns.join('')}</div>` : '';
    }
    renderButton(button, type) {
        const icon = button.icon ? `<span class="btn__icon">${button.icon}</span>` : '';
        return `
<a href="${button.link}" class="btn btn--${button.variant || type} btn--${button.size || 'lg'}">
  ${button.iconPosition === 'left' ? icon : ''}
  ${this.escape(button.text)}
  ${button.iconPosition === 'right' ? icon : ''}
</a>`;
    }
    renderStats(stats) {
        logger_1.logger.debug('CTARendererV3', 'renderStats', 'Génération stats', {
            count: stats.items.length,
            layout: stats.layout
        });
        return `
<div class="cta__stats cta__stats--${stats.layout}">
  ${stats.items.map((stat) => `
    <div class="cta__stat">
      ${stat.icon ? `<div class="cta__stat-icon">${stat.icon}</div>` : ''}
      <div class="cta__stat-value" ${stat.animate ? 'data-count-to="' + stat.value + '"' : ''}>
        ${stat.prefix || ''}${stat.animate ? '0' : stat.value}${stat.suffix || ''}
      </div>
      <div class="cta__stat-label">${this.escape(stat.label)}</div>
    </div>
  `).join('')}
</div>`;
    }
    renderBadges(badges) {
        return `
<div class="cta__badges">
  ${badges.items.map((badge) => {
            if (badge.type === 'image') {
                return `<img src="${badge.content}" alt="${this.escape(badge.alt || '')}" class="cta__badge cta__badge--image">`;
            }
            return `<span class="cta__badge">${this.escape(badge.content)}</span>`;
        }).join('')}
</div>`;
    }
    renderUrgency(urgency) {
        logger_1.logger.debug('CTARendererV3', 'renderUrgency', 'Génération urgency', {
            type: urgency.type
        });
        switch (urgency.type) {
            case 'countdown':
                return this.renderCountdown(urgency.countdown);
            case 'limited-spots':
                return `<p class="cta__urgency cta__urgency--spots">${urgency.limitedSpots.message.replace('{remaining}', urgency.limitedSpots.remaining)}</p>`;
            case 'deadline':
                return `<p class="cta__urgency cta__urgency--deadline">${urgency.deadline.message.replace('{date}', urgency.deadline.date)}</p>`;
            default:
                return '';
        }
    }
    renderCountdown(countdown) {
        if (!countdown)
            return '';
        return `
<div class="cta__urgency cta__urgency--countdown">
  <div class="cta__countdown" data-countdown="${countdown.endDate}">
    <div class="cta__countdown-item">
      <span class="cta__countdown-value" data-days>00</span>
      <span class="cta__countdown-label">${this.escape(countdown.labels.days)}</span>
    </div>
    <div class="cta__countdown-item">
      <span class="cta__countdown-value" data-hours>00</span>
      <span class="cta__countdown-label">${this.escape(countdown.labels.hours)}</span>
    </div>
    <div class="cta__countdown-item">
      <span class="cta__countdown-value" data-minutes>00</span>
      <span class="cta__countdown-label">${this.escape(countdown.labels.minutes)}</span>
    </div>
    <div class="cta__countdown-item">
      <span class="cta__countdown-value" data-seconds>00</span>
      <span class="cta__countdown-label">${this.escape(countdown.labels.seconds)}</span>
    </div>
  </div>
  <p class="cta__countdown-expired" style="display: none;">${this.escape(countdown.expiredMessage)}</p>
</div>`;
    }
    renderMedia(media) {
        if (media.type === 'none')
            return '';
        logger_1.logger.debug('CTARendererV3', 'renderMedia', 'Génération media', {
            type: media.type,
            position: media.position
        });
        const animationClass = media.animation !== 'none' ? `cta__media--${media.animation}` : '';
        switch (media.type) {
            case 'image':
                return `
<div class="cta__media cta__media--${media.position} ${animationClass}">
  <img src="${media.image.src}" alt="${this.escape(media.image.alt || '')}" />
</div>`;
            case 'video':
                return `
<div class="cta__media cta__media--${media.position}">
  <video ${media.video.autoplay ? 'autoplay' : ''} ${media.video.loop ? 'loop' : ''} ${media.video.muted ? 'muted' : ''} poster="${media.video.poster || ''}">
    <source src="${media.video.url}" type="video/mp4">
  </video>
</div>`;
            default:
                return '';
        }
    }
    renderParticles(particles) {
        const particlesHtml = [];
        for (let i = 0; i < particles.count; i++) {
            const style = `
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 10}s;
        animation-duration: ${10 + Math.random() * 10}s;
      `;
            particlesHtml.push(`<div class="particle" style="${style}"></div>`);
        }
        return `<div class="cta__particles">${particlesHtml.join('')}</div>`;
    }
    generateCSS(data) {
        logger_1.logger.debug('CTARendererV3', 'generateCSS', 'Génération CSS spécifique');
        let css = '';
        // CSS des couleurs personnalisées
        if (data.styles.textColor || data.styles.accentColor) {
            css += `
.cta {
  ${data.styles.textColor ? `--cta-text: ${data.styles.textColor};` : ''}
  ${data.styles.accentColor ? `--primary: ${data.styles.accentColor};` : ''}
}`;
        }
        // CSS pour border radius des boutons
        if (data.styles.buttonRadius) {
            const radiusMap = {
                none: '0',
                sm: '0.25rem',
                md: '0.5rem',
                lg: '1rem',
                full: '9999px'
            };
            css += `
.cta .btn {
  --cta-button-radius: ${radiusMap[data.styles.buttonRadius]};
}`;
        }
        // CSS pour glassmorphism
        if (data.styles.glassmorphism.enabled) {
            css += `
.cta--glassmorphism {
  backdrop-filter: blur(${data.styles.glassmorphism.blur}px);
  background: rgba(255,255,255,${data.styles.glassmorphism.opacity});
}`;
        }
        return css;
    }
    generateJS(data) {
        logger_1.logger.debug('CTARendererV3', 'generateJS', 'Génération JS', {
            hasCountdown: data.urgency.enabled && data.urgency.type === 'countdown',
            hasStats: data.stats.enabled && data.stats.items.some((s) => s.animate),
            hasAnimation: data.animation.enabled
        });
        let js = '';
        // JS pour countdown
        if (data.urgency.enabled && data.urgency.type === 'countdown') {
            js += this.generateCountdownJS();
        }
        // JS pour animation des stats
        if (data.stats.enabled && data.stats.items.some((s) => s.animate)) {
            js += this.generateStatsAnimationJS();
        }
        // JS pour animations au scroll
        if (data.animation.enabled && data.animation.onScroll) {
            js += this.generateScrollAnimationJS(data.animation);
        }
        return js;
    }
    generateCountdownJS() {
        return `
// CTA Countdown
(function() {
  const countdown = document.querySelector('[data-countdown]');
  if (!countdown) return;
  
  const endDate = new Date(countdown.dataset.countdown).getTime();
  const daysEl = countdown.querySelector('[data-days]');
  const hoursEl = countdown.querySelector('[data-hours]');
  const minutesEl = countdown.querySelector('[data-minutes]');
  const secondsEl = countdown.querySelector('[data-seconds]');
  const expiredEl = document.querySelector('.cta__countdown-expired');
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate - now;
    
    if (distance < 0) {
      countdown.style.display = 'none';
      if (expiredEl) expiredEl.style.display = 'block';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();`;
    }
    generateStatsAnimationJS() {
        return `
// CTA Stats Animation
(function() {
  const stats = document.querySelectorAll('[data-count-to]');
  if (!stats.length) return;
  
  const animateValue = (elem, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      elem.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        elem.textContent = elem.dataset.countTo;
      }
    };
    window.requestAnimationFrame(step);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const value = parseInt(entry.target.dataset.countTo);
        animateValue(entry.target, 0, value, 2000);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
})();`;
    }
    generateScrollAnimationJS(animation) {
        return `
// CTA Scroll Animation
(function() {
  const cta = document.querySelector('.cta');
  if (!cta) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = '${animation.type} ${animation.duration}ms ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(cta);
})();`;
    }
    escape(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
exports.CTARendererV3 = CTARendererV3;

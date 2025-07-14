/**
 * CTA Renderer V3 PERFECT - Design magnifique et ergonomie parfaite
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { ctaDataSchema, ctaDefaults, type CTAData } from '../schemas/blocks/cta';
import { logger } from '../core/logger';

export class CTARendererV3Perfect extends BaseRendererV3<CTAData> {
  type = 'cta-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('CTARendererV3Perfect', 'constructor', '🚀 Initialisation du renderer CTA V3 PERFECT');
  }

  validate(data: unknown): z.SafeParseReturnType<CTAData, CTAData> {
    return ctaDataSchema.safeParse(data);
  }

  getDefaultData(): CTAData {
    return ctaDefaults;
  }

  /**
   * Retourne les propriétés éditables du bloc
   * Utilise la méthode de base qui génère automatiquement les props
   */
  getBlockProps(): BlockProp[] {
    // Utilise la méthode de la classe de base qui génère automatiquement
    // les props à partir des données par défaut
    return super.getBlockProps();
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   CTA V3 PERFECT - Styles magnifiques
   ======================================== */

.cta {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
}

.cta__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ========================================
   VARIANTES SPECTACULAIRES
   ======================================== */

/* 1. Gradient Wave - Vagues animées */
.cta--gradient-wave {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  position: relative;
}

.cta--gradient-wave::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: ctaWaveMove 20s linear infinite;
  opacity: 0.3;
}

.cta--gradient-wave::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E") no-repeat bottom;
  background-size: cover;
}

@keyframes ctaWaveMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-50px, -50px); }
}

.cta--gradient-wave .cta__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

/* 2. Glassmorphism - Effet verre dépoli */
.cta--glassmorphism {
  background: linear-gradient(135deg, #667eea, #764ba2);
  position: relative;
}

.cta--glassmorphism .cta__box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.cta--glassmorphism .cta__box::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(240, 147, 251, 0.4), transparent);
  filter: blur(50px);
}

/* 3. Split Screen - Écran divisé */
.cta--split-screen {
  background: #ffffff;
}

.cta--split-screen .cta__wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  min-height: 500px;
}

.cta--split-screen .cta__content {
  padding: 3rem;
}

.cta--split-screen .cta__visual {
  position: relative;
  height: 100%;
  min-height: 500px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2rem;
  overflow: hidden;
}

.cta--split-screen .cta__visual::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(255,255,255,0.1)' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: ctaPattern 30s linear infinite;
}

@keyframes ctaPattern {
  0% { transform: translateX(0); }
  100% { transform: translateX(60px); }
}

/* 4. Floating Cards - Cartes flottantes */
.cta--floating-cards {
  background: #f9fafb;
  position: relative;
  padding: 8rem 0;
}

.cta--floating-cards .cta__content {
  text-align: center;
  position: relative;
  z-index: 10;
}

.cta--floating-cards .cta__cards {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta--floating-cards .cta__card {
  position: absolute;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  animation: ctaFloat 6s ease-in-out infinite;
}

.cta--floating-cards .cta__card:nth-child(1) {
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.cta--floating-cards .cta__card:nth-child(2) {
  top: 20%;
  right: 10%;
  animation-delay: 2s;
}

.cta--floating-cards .cta__card:nth-child(3) {
  bottom: 20%;
  left: 15%;
  animation-delay: 4s;
}

.cta--floating-cards .cta__card:nth-child(4) {
  bottom: 15%;
  right: 5%;
  animation-delay: 1s;
}

@keyframes ctaFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(10px) rotate(-5deg); }
}

/* 5. Neon Glow - Lueur néon */
.cta--neon-glow {
  background: #0a0a0a;
  color: white;
  position: relative;
}

.cta--neon-glow .cta__content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta--neon-glow .cta__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: linear-gradient(45deg, #f06, #0ff, #f06);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ctaNeonGlow 3s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 0, 102, 0.5));
}

@keyframes ctaNeonGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.cta--neon-glow .cta__buttons {
  margin-top: 3rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta--neon-glow .cta__button {
  position: relative;
  padding: 1rem 3rem;
  background: transparent;
  color: #0ff;
  border: 2px solid #0ff;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s;
  overflow: hidden;
}

.cta--neon-glow .cta__button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #0ff;
  transition: left 0.3s;
  z-index: -1;
}

.cta--neon-glow .cta__button:hover {
  color: #0a0a0a;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
}

.cta--neon-glow .cta__button:hover::before {
  left: 0;
}

/* 6. Parallax Layers - Couches parallaxe */
.cta--parallax-layers {
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
  color: white;
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
}

.cta--parallax-layers .cta__layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta--parallax-layers .cta__layer-1 {
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='rgba(102,126,234,0.1)' stroke-width='2'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: ctaParallax1 40s linear infinite;
}

.cta--parallax-layers .cta__layer-2 {
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='25' y='25' width='50' height='50' fill='none' stroke='rgba(118,75,162,0.1)' stroke-width='2' transform='rotate(45 50 50)'/%3E%3C/svg%3E");
  background-size: 150px 150px;
  animation: ctaParallax2 30s linear infinite reverse;
}

@keyframes ctaParallax1 {
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(200px) translateY(-200px); }
}

@keyframes ctaParallax2 {
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(-150px) translateY(150px); }
}

.cta--parallax-layers .cta__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

/* 7. Morphing Shapes - Formes changeantes */
.cta--morphing-shapes {
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.cta--morphing-shapes .cta__shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.7;
  animation: ctaMorph 20s ease-in-out infinite;
}

.cta--morphing-shapes .cta__shape-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -200px;
  left: -200px;
}

.cta--morphing-shapes .cta__shape-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: -200px;
  right: -200px;
  animation-delay: -10s;
}

@keyframes ctaMorph {
  0%, 100% {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    transform: rotate(0deg) scale(1);
  }
  33% {
    border-radius: 70% 30% 50% 50% / 30% 70% 70% 30%;
    transform: rotate(120deg) scale(1.1);
  }
  66% {
    border-radius: 30% 70% 40% 60% / 70% 30% 60% 40%;
    transform: rotate(240deg) scale(0.9);
  }
}

.cta--morphing-shapes .cta__content {
  position: relative;
  z-index: 10;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 4rem;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}

/* 8. Video Background - Fond vidéo */
.cta--video-background {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  color: white;
}

.cta--video-background .cta__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.cta--video-background .cta__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  z-index: 2;
}

.cta--video-background .cta__content {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

/* Styles communs */
.cta__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.cta__subtitle {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta__description {
  font-size: 1.125rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.8;
}

.cta__buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta__button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 9999px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.cta__button--primary {
  background: white;
  color: #667eea;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
}

.cta__button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
}

.cta__button--secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.cta__button--secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* Features */
.cta__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.cta__feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.cta__feature-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.cta__feature-text {
  font-weight: 500;
}

/* Countdown Timer */
.cta__countdown {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 2rem 0;
}

.cta__countdown-item {
  text-align: center;
}

.cta__countdown-value {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.cta__countdown-label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
}

/* Form inline */
.cta__form {
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 2rem auto;
}

.cta__input {
  flex: 1;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.cta__input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.cta__input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Animations d'entrée */
.cta__content > * {
  opacity: 0;
  animation: ctaFadeUp 0.8s ease-out forwards;
}

.cta__title { animation-delay: 0.1s; }
.cta__subtitle { animation-delay: 0.2s; }
.cta__description { animation-delay: 0.3s; }
.cta__buttons { animation-delay: 0.4s; }
.cta__features { animation-delay: 0.5s; }

@keyframes ctaFadeUp {
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
  .cta--split-screen .cta__wrapper {
    grid-template-columns: 1fr;
  }
  
  .cta--split-screen .cta__visual {
    min-height: 300px;
  }
  
  .cta__buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .cta__button {
    width: 100%;
    justify-content: center;
  }
  
  .cta__form {
    flex-direction: column;
  }
  
  .cta--floating-cards {
    padding: 4rem 0;
  }
  
  .cta--floating-cards .cta__card {
    display: none;
  }
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .cta--floating-cards {
    background: #0f172a;
  }
  
  .cta--floating-cards .cta__card {
    background: #1e293b;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
  }
  
  .cta--morphing-shapes {
    background: #0f172a;
  }
  
  .cta--morphing-shapes .cta__content {
    background: rgba(30, 41, 59, 0.9);
    color: white;
  }
  
  .cta--split-screen {
    background: #0f172a;
  }
  
  .cta--split-screen .cta__content {
    color: white;
  }
}
    `;
  }

  getDefaultJS(): string {
    return `
// CTA V3 Perfect - JavaScript interactif
(function() {
  'use strict';
  
  // Initialisation CTA
  function initCTA() {
    const ctas = document.querySelectorAll('.cta');
    
    ctas.forEach(cta => {
      const variant = Array.from(cta.classList).find(c => c.startsWith('cta--'))?.replace('cta--', '');
      
      // Countdown timer
      initCountdown(cta);
      
      // Form handling
      initForm(cta);
      
      // Variantes spécifiques
      switch(variant) {
        case 'video-background':
          initVideoBackground(cta);
          break;
        case 'parallax-layers':
          initParallaxLayers(cta);
          break;
        case 'floating-cards':
          initFloatingCards(cta);
          break;
      }
      
      // Animations d'entrée
      observeCTA(cta);
    });
  }
  
  // Countdown timer
  function initCountdown(cta) {
    const countdown = cta.querySelector('.cta__countdown');
    if (!countdown) return;
    
    // Get target date from data attribute or default to 24 hours from now
    const targetDate = countdown.getAttribute('data-target-date') || 
                      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    const target = new Date(targetDate).getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        countdown.innerHTML = '<div class="cta__countdown-expired">Offre expirée</div>';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      updateValue(countdown, '.cta__countdown-days', days);
      updateValue(countdown, '.cta__countdown-hours', hours);
      updateValue(countdown, '.cta__countdown-minutes', minutes);
      updateValue(countdown, '.cta__countdown-seconds', seconds);
    }
    
    function updateValue(parent, selector, value) {
      const element = parent.querySelector(selector);
      if (element) {
        const currentValue = element.textContent;
        if (currentValue !== value.toString()) {
          element.style.transform = 'scale(1.2)';
          element.textContent = value.toString().padStart(2, '0');
          setTimeout(() => {
            element.style.transform = 'scale(1)';
          }, 300);
        }
      }
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
  
  // Form handling
  function initForm(cta) {
    const form = cta.querySelector('.cta__form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const button = form.querySelector('.cta__button');
      const input = form.querySelector('.cta__input');
      const originalText = button.textContent;
      
      // Show loading state
      button.textContent = 'Envoi...';
      button.disabled = true;
      input.disabled = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success
      button.textContent = '✓ Envoyé !';
      button.style.background = '#10b981';
      
      // Analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_submit', {
          cta_variant: Array.from(cta.classList).find(c => c.startsWith('cta--'))?.replace('cta--', ''),
          cta_value: input.value
        });
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = '';
        input.disabled = false;
        input.value = '';
      }, 3000);
    });
  }
  
  // Video background
  function initVideoBackground(cta) {
    const video = cta.querySelector('.cta__video');
    if (!video) return;
    
    // Lazy load video
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!video.src && video.dataset.src) {
            video.src = video.dataset.src;
            video.play();
          }
          observer.unobserve(video);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(video);
    
    // Pause on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        video.pause();
      } else if (video.src) {
        video.play();
      }
    });
  }
  
  // Parallax layers
  function initParallaxLayers(cta) {
    const layers = cta.querySelectorAll('.cta__layer');
    if (!layers.length) return;
    
    let ticking = false;
    
    function updateParallax() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = cta.getBoundingClientRect();
          const speed = 0.5;
          const yPos = rect.top * speed;
          
          layers.forEach((layer, index) => {
            const layerSpeed = (index + 1) * 0.2;
            layer.style.transform = \`translateY(\${yPos * layerSpeed}px)\`;
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    }
    
    // Initial position
    updateParallax();
    
    // Update on scroll
    window.addEventListener('scroll', updateParallax, { passive: true });
  }
  
  // Floating cards
  function initFloatingCards(cta) {
    const cards = cta.querySelectorAll('.cta__card');
    if (!cards.length) return;
    
    // Mouse move effect
    cta.addEventListener('mousemove', (e) => {
      const rect = cta.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      cards.forEach((card, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        
        card.style.transform = \`translate(\${xMove}px, \${yMove}px)\`;
      });
    });
    
    // Reset on mouse leave
    cta.addEventListener('mouseleave', () => {
      cards.forEach(card => {
        card.style.transform = '';
      });
    });
  }
  
  // Observer pour animations
  function observeCTA(cta) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cta--visible');
          
          // Trigger animations
          animateElements(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(cta);
  }
  
  // Animate elements
  function animateElements(cta) {
    // Animate buttons
    const buttons = cta.querySelectorAll('.cta__button');
    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.style.transform = 'scale(0.8)';
        button.style.opacity = '0';
        
        setTimeout(() => {
          button.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          button.style.transform = 'scale(1)';
          button.style.opacity = '1';
        }, 50);
      }, index * 100);
    });
    
    // Animate features
    const features = cta.querySelectorAll('.cta__feature');
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          feature.style.transition = 'all 0.6s ease-out';
          feature.style.opacity = '1';
          feature.style.transform = 'translateX(0)';
        }, 50);
      }, 500 + index * 100);
    });
  }
  
  // Typing effect
  function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      const speed = parseInt(element.dataset.typingSpeed) || 50;
      element.textContent = '';
      
      let i = 0;
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      // Start typing when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            type();
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(element);
    });
  }
  
  // Magnetic buttons
  function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.cta__button--magnetic');
    
    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = \`translate(\${x * 0.2}px, \${y * 0.2}px)\`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }
  
  // Confetti on click
  function initConfetti() {
    const confettiButtons = document.querySelectorAll('[data-confetti]');
    
    confettiButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        createConfetti(x, y);
      });
    });
  }
  
  // Create confetti particles
  function createConfetti(x, y) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.cssText = \`
        position: fixed;
        width: 10px;
        height: 10px;
        background: \${colors[Math.floor(Math.random() * colors.length)]};
        left: \${x}px;
        top: \${y}px;
        pointer-events: none;
        z-index: 9999;
        transform-origin: center;
      \`;
      
      document.body.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 5 + Math.random() * 5;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 10;
      let posX = 0;
      let posY = 0;
      let gravity = 0.5;
      let vyLocal = vy;
      
      function animate() {
        posX += vx;
        vyLocal += gravity;
        posY += vyLocal;
        
        particle.style.transform = \`translate(\${posX}px, \${posY}px) rotate(\${posX * 2}deg)\`;
        particle.style.opacity = 1 - (posY / 300);
        
        if (posY < 300) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      }
      
      animate();
    }
  }
  
  // Sound effects
  function initSoundEffects() {
    const soundButtons = document.querySelectorAll('[data-sound]');
    
    // Create audio context
    let audioContext;
    
    soundButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const soundType = button.dataset.sound || 'click';
        playSound(audioContext, soundType);
      });
    });
  }
  
  // Play sound
  function playSound(context, type) {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    switch(type) {
      case 'success':
        oscillator.frequency.setValueAtTime(523.25, context.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, context.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, context.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
        oscillator.stop(context.currentTime + 0.3);
        break;
        
      case 'hover':
        oscillator.frequency.setValueAtTime(440, context.currentTime); // A4
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        oscillator.stop(context.currentTime + 0.1);
        break;
        
      default: // click
        oscillator.frequency.setValueAtTime(200, context.currentTime);
        gainNode.gain.setValueAtTime(0.2, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.05);
        oscillator.stop(context.currentTime + 0.05);
    }
    
    oscillator.start(context.currentTime);
  }
  
  // Initialisation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCTA();
      initTypingEffect();
      initMagneticButtons();
      initConfetti();
      initSoundEffects();
    });
  } else {
    initCTA();
    initTypingEffect();
    initMagneticButtons();
    initConfetti();
    initSoundEffects();
  }
  
  // Export pour usage externe
  window.CTAPerfect = {
    init: initCTA,
    createConfetti: createConfetti,
    playSound: playSound
  };
})();
    `;
  }

  render(data: CTAData, context?: RenderContext): RenderResult {
    try {
      // Validation des données
      const validation = this.validate(data);
      if (!validation.success) {
        logger.error('CTARendererV3Perfect', 'render', 'Validation échouée', validation.error);
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
      logger.info('CTARendererV3Perfect', 'render', 'Rendu CTA avec variante:', validData.variant);

      // Générer le HTML selon la variante
      const html = this.renderVariant(validData);
      
      // CSS avec variables personnalisées
      const customCSS = this.generateCustomCSS(validData);
      
      return {
        html,
        css: this.getDefaultCSS() + customCSS,
        js: this.getDefaultJS()
      };
      
    } catch (error) {
      logger.error('CTARendererV3Perfect', 'render', 'Erreur lors du rendu', error);
      return {
        html: this.renderError('Erreur lors du rendu'),
        css: this.getDefaultCSS(),
        js: this.getDefaultJS(),
        errors: [{ message: error instanceof Error ? error.message : 'Erreur inconnue' }]
      };
    }
  }

  private renderVariant(data: CTAData): string {
    let content = '';
    
    switch(data.variant) {
      case 'gradient-wave':
        content = this.renderGradientWave(data);
        break;
      case 'glassmorphism':
        content = this.renderGlassmorphism(data);
        break;
      case 'split-screen':
        content = this.renderSplitScreen(data);
        break;
      case 'floating-cards':
        content = this.renderFloatingCards(data);
        break;
      case 'neon-glow':
        content = this.renderNeonGlow(data);
        break;
      case 'parallax-layers':
        content = this.renderParallaxLayers(data);
        break;
      case 'morphing-shapes':
        content = this.renderMorphingShapes(data);
        break;
      case 'video-background':
        content = this.renderVideoBackground(data);
        break;
      default:
        content = this.renderGradientWave(data);
    }

    return `
      <section class="cta cta--${data.variant}" id="${data.id || 'cta'}">
        ${content}
      </section>
    `;
  }

  private renderGradientWave(data: CTAData): string {
    return `
      <div class="cta__container">
        <div class="cta__content">
          ${this.renderContent(data)}
        </div>
      </div>
    `;
  }

  private renderGlassmorphism(data: CTAData): string {
    return `
      <div class="cta__container">
        <div class="cta__box">
          ${this.renderContent(data)}
        </div>
      </div>
    `;
  }

  private renderSplitScreen(data: CTAData): string {
    return `
      <div class="cta__container">
        <div class="cta__wrapper">
          <div class="cta__content">
            ${this.renderContent(data)}
          </div>
          <div class="cta__visual">
            ${data.image ? `<img src="${data.image.url}" alt="${data.image.alt || ''}" class="cta__image">` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderFloatingCards(data: CTAData): string {
    return `
      <div class="cta__container">
        <div class="cta__cards">
          <div class="cta__card">✨ Innovation</div>
          <div class="cta__card">🚀 Performance</div>
          <div class="cta__card">💎 Qualité</div>
          <div class="cta__card">🌟 Excellence</div>
        </div>
        <div class="cta__content">
          ${this.renderContent(data)}
        </div>
      </div>
    `;
  }

  private renderNeonGlow(data: CTAData): string {
    return `
      <div class="cta__container">
        <div class="cta__content">
          ${this.renderContent(data)}
        </div>
      </div>
    `;
  }

  private renderParallaxLayers(data: CTAData): string {
    return `
      <div class="cta__layer cta__layer-1"></div>
      <div class="cta__layer cta__layer-2"></div>
      <div class="cta__container">
        <div class="cta__content">
          ${this.renderContent(data)}
        </div>
      </div>
    `;
  }

  private renderMorphingShapes(data: CTAData): string {
    return `
      <div class="cta__shape cta__shape-1"></div>
      <div class="cta__shape cta__shape-2"></div>
      <div class="cta__container">
        <div class="cta__content">
          ${this.renderContent(data)}
        </div>
      </div>
    `;
  }

  private renderVideoBackground(data: CTAData): string {
    return `
      ${data.videoUrl ? `
        <video class="cta__video" 
               data-src="${data.videoUrl}" 
               autoplay muted loop playsinline>
        </video>
      ` : ''}
      <div class="cta__overlay"></div>
      <div class="cta__container">
        <div class="cta__content">
          ${this.renderContent(data)}
        </div>
      </div>
    `;
  }

  private renderContent(data: CTAData): string {
    return `
      <h2 class="cta__title">${this.escapeHtml(data.title)}</h2>
      ${data.subtitle ? `<p class="cta__subtitle">${this.escapeHtml(data.subtitle)}</p>` : ''}
      ${data.description ? `<p class="cta__description">${this.escapeHtml(data.description)}</p>` : ''}
      
      ${data.countdown ? this.renderCountdown(data.countdown) : ''}
      
      ${data.form ? this.renderForm(data) : this.renderButtons(data)}
      
      ${data.features && data.features.length > 0 ? this.renderFeatures(data.features) : ''}
    `;
  }

  private renderButtons(data: CTAData): string {
    if (!data.buttons || data.buttons.length === 0) return '';
    
    return `
      <div class="cta__buttons">
        ${data.buttons.map(button => `
          <a href="${button.link}" 
             class="cta__button cta__button--${button.style || 'primary'} ${button.animation ? `cta__button--${button.animation}` : ''}"
             ${button.target ? `target="${button.target}"` : ''}
             ${button.sound ? `data-sound="${button.sound}"` : ''}
             ${button.confetti ? 'data-confetti="true"' : ''}>
            ${button.icon ? `<span class="cta__button-icon">${button.icon}</span>` : ''}
            <span>${this.escapeHtml(button.text)}</span>
          </a>
        `).join('')}
      </div>
    `;
  }

  private renderForm(data: CTAData): string {
    if (!data.form) return '';
    
    return `
      <form class="cta__form">
        <input type="${data.form.type || 'email'}" 
               placeholder="${this.escapeHtml(data.form.placeholder || 'Votre email')}" 
               class="cta__input"
               required>
        <button type="submit" class="cta__button cta__button--primary">
          ${this.escapeHtml(data.form.buttonText || 'Envoyer')}
        </button>
      </form>
    `;
  }

  private renderCountdown(countdown: any): string {
    return `
      <div class="cta__countdown" data-target-date="${countdown.targetDate || ''}">
        ${countdown.showDays !== false ? `
          <div class="cta__countdown-item">
            <span class="cta__countdown-value cta__countdown-days">00</span>
            <span class="cta__countdown-label">Jours</span>
          </div>
        ` : ''}
        <div class="cta__countdown-item">
          <span class="cta__countdown-value cta__countdown-hours">00</span>
          <span class="cta__countdown-label">Heures</span>
        </div>
        <div class="cta__countdown-item">
          <span class="cta__countdown-value cta__countdown-minutes">00</span>
          <span class="cta__countdown-label">Minutes</span>
        </div>
        <div class="cta__countdown-item">
          <span class="cta__countdown-value cta__countdown-seconds">00</span>
          <span class="cta__countdown-label">Secondes</span>
        </div>
      </div>
    `;
  }

  private renderFeatures(features: any[]): string {
    return `
      <div class="cta__features">
        ${features.map(feature => `
          <div class="cta__feature">
            <div class="cta__feature-icon">${feature.icon || '✓'}</div>
            <span class="cta__feature-text">${this.escapeHtml(feature.text)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  private generateCustomCSS(data: CTAData): string {
    let css = '\n/* Custom CTA Styles */\n';
    
    // Couleurs personnalisées
    if (data.styles?.colors) {
      const colors = data.styles.colors;
      css += `.cta {
        --cta-primary: ${colors.primary || '#667eea'};
        --cta-secondary: ${colors.secondary || '#764ba2'};
        --cta-accent: ${colors.accent || '#f093fb'};
        --cta-text: ${colors.text || '#ffffff'};
        --cta-bg: ${colors.background || 'transparent'};
      }\n`;
    }

    // Background personnalisé
    if (data.background?.type === 'gradient' && data.background.gradient) {
      const g = data.background.gradient;
      css += `.cta {
        background: linear-gradient(${g.angle || 135}deg, ${g.colors.map(c => `${c.color} ${c.position}%`).join(', ')});
      }\n`;
    }

    return css;
  }

  private renderError(message: string): string {
    return `
      <div class="cta-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; color: #c00;">
        <strong>Erreur CTA:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const ctaRendererV3Perfect = new CTARendererV3Perfect();
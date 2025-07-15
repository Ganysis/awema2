/**
 * Contact Renderer V3 PERFECT ENHANCED - Version avec variantes de thème
 * Inclut les variantes : modern, minimal, bold, elegant
 */

import { z } from 'zod';
import { RenderResult, RenderContext } from '../types';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp } from '@awema/shared';
import { contactDataSchema, contactDefaults, type ContactData } from '../schemas/blocks/contact-perfect';
import { logger } from '../core/logger';

export class ContactRendererV3PerfectEnhanced extends BaseRendererV3<ContactData> {
  type = 'contact-ultra-modern';
  version = '3.0.0';

  constructor() {
    super();
    logger.info('ContactRendererV3PerfectEnhanced', 'constructor', '🚀 Initialisation du renderer Contact V3 PERFECT ENHANCED');
  }

  validate(data: unknown): z.SafeParseReturnType<ContactData, ContactData> {
    return contactDataSchema.safeParse(data);
  }

  getDefaultData(): ContactData {
    return contactDefaults;
  }

  getBlockProps(): BlockProp[] {
    return super.getBlockProps();
  }

  getDefaultCSS(): string {
    return `
/* ========================================
   CONTACT V3 PERFECT ENHANCED - Styles avec variantes
   ======================================== */

.contact {
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
  font-family: var(--font-family-body);
}

.contact__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header commun */
.contact__header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.contact__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: 1rem;
  font-family: var(--font-family-heading);
}

.contact__subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: var(--line-height-relaxed);
  margin-bottom: 1rem;
  font-family: var(--font-family-body);
}

.contact__description {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  font-family: var(--font-family-body);
}

/* ========================================
   VARIANTE MODERN - Design épuré et contemporain
   ======================================== */
.contact--modern {
  background: var(--color-background);
  color: var(--color-text-primary);
}

.contact--modern .contact__wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact--modern .contact__content {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: 3rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border);
}

.contact--modern .contact__info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact--modern .contact__info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact--modern .contact__info-icon {
  width: 48px;
  height: 48px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact--modern .contact__info-content {
  flex: 1;
}

.contact--modern .contact__info-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: var(--font-weight-medium);
}

.contact--modern .contact__info-value {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: color 0.3s;
}

.contact--modern .contact__info-value:hover {
  color: var(--color-primary);
}

/* Formulaire modern */
.contact--modern .contact__form {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: 3rem;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border);
}

.contact--modern .contact__form-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
}

.contact--modern .contact__form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact--modern .contact__form-group--full {
  grid-column: 1 / -1;
}

.contact--modern .contact__form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
}

.contact--modern .contact__form-input,
.contact--modern .contact__form-textarea {
  padding: 0.875rem 1.25rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
  background: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
}

.contact--modern .contact__form-input:focus,
.contact--modern .contact__form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.contact--modern .contact__form-submit {
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-family-body);
}

.contact--modern .contact__form-submit:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px var(--color-primary);
}

/* ========================================
   VARIANTE MINIMAL - Ultra épuré
   ======================================== */
.contact--minimal {
  background: var(--color-background);
  color: var(--color-text-primary);
}

.contact--minimal .contact__wrapper {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.contact--minimal .contact__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-light);
  letter-spacing: -0.03em;
  margin-bottom: 3rem;
}

.contact--minimal .contact__subtitle {
  display: none;
}

.contact--minimal .contact__info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.contact--minimal .contact__info-item {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.contact--minimal .contact__info-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.contact--minimal .contact__info-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contact--minimal .contact__info-link:hover {
  color: var(--color-text-primary);
}

.contact--minimal .contact__info-link:hover::after {
  transform: scaleX(1);
}

.contact--minimal .contact__social {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
}

.contact--minimal .contact__social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
}

.contact--minimal .contact__social-link:hover {
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
  color: var(--color-background);
  transform: translateY(-3px);
}

/* ========================================
   VARIANTE BOLD - Fort impact visuel
   ======================================== */
.contact--bold {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  position: relative;
  padding: 8rem 0;
}

.contact--bold::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(255,255,255,0.1)' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.1;
}

.contact--bold .contact__container {
  position: relative;
  z-index: 1;
}

.contact--bold .contact__title {
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.contact--bold .contact__subtitle {
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: var(--font-weight-light);
  opacity: 0.9;
}

.contact--bold .contact__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
}

.contact--bold .contact__card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contact--bold .contact__card:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.3);
}

.contact--bold .contact__card-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.contact--bold .contact__card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact--bold .contact__card-value {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  color: white;
  text-decoration: none;
}

.contact--bold .contact__card-value:hover {
  text-decoration: underline;
}

/* Formulaire bold */
.contact--bold .contact__form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  margin-top: 4rem;
}

.contact--bold .contact__form-input,
.contact--bold .contact__form-textarea {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem 1.5rem;
  font-size: var(--font-size-lg);
}

.contact--bold .contact__form-input::placeholder,
.contact--bold .contact__form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.contact--bold .contact__form-submit {
  background: white;
  color: var(--color-primary);
  padding: 1.25rem 3rem;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

.contact--bold .contact__form-submit:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.4);
}

/* ========================================
   VARIANTE ELEGANT - Sophistiqué et raffiné
   ======================================== */
.contact--elegant {
  background: var(--color-background);
  color: var(--color-text-primary);
  position: relative;
}

.contact--elegant::before {
  content: '';
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%);
  opacity: 0.1;
  pointer-events: none;
}

.contact--elegant .contact__wrapper {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 4rem;
  align-items: start;
}

.contact--elegant .contact__sidebar {
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  position: sticky;
  top: 2rem;
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-border);
}

.contact--elegant .contact__sidebar-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin-bottom: 2rem;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  font-family: var(--font-family-heading);
}

.contact--elegant .contact__info-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact--elegant .contact__info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact--elegant .contact__info-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.contact--elegant .contact__main {
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  padding: 3rem;
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-border);
}

.contact--elegant .contact__form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.contact--elegant .contact__form-input,
.contact--elegant .contact__form-textarea {
  padding: 1rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: all 0.4s ease;
  background: var(--color-background);
}

.contact--elegant .contact__form-input:focus,
.contact--elegant .contact__form-textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-light);
}

.contact--elegant .contact__form-submit {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.02em;
  box-shadow: 0 10px 30px -10px var(--color-primary);
  position: relative;
  overflow: hidden;
}

.contact--elegant .contact__form-submit::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.contact--elegant .contact__form-submit:hover::before {
  width: 300px;
  height: 300px;
}

.contact--elegant .contact__form-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px -10px var(--color-primary);
}

/* ========================================
   ÉLÉMENTS COMMUNS
   ======================================== */

/* Responsive */
@media (max-width: 1024px) {
  .contact--modern .contact__wrapper,
  .contact--elegant .contact__wrapper {
    grid-template-columns: 1fr;
  }
  
  .contact--elegant .contact__sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 4rem 0;
  }
  
  .contact__container {
    padding: 0 1rem;
  }
  
  .contact__title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
  }
  
  .contact--modern .contact__info-grid,
  .contact--modern .contact__form-grid {
    grid-template-columns: 1fr;
  }
  
  .contact--bold .contact__wrapper {
    grid-template-columns: 1fr;
  }
  
  .contact--bold {
    padding: 6rem 0;
  }
}

/* Mode sombre - adaptations */
@media (prefers-color-scheme: dark) {
  .contact--elegant::before {
    opacity: 0.05;
  }
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

.contact__info-item,
.contact__form-group,
.contact__card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.contact__info-item:nth-child(1) { animation-delay: 0.1s; }
.contact__info-item:nth-child(2) { animation-delay: 0.2s; }
.contact__info-item:nth-child(3) { animation-delay: 0.3s; }
.contact__info-item:nth-child(4) { animation-delay: 0.4s; }

.contact__form-group:nth-child(1) { animation-delay: 0.1s; }
.contact__form-group:nth-child(2) { animation-delay: 0.15s; }
.contact__form-group:nth-child(3) { animation-delay: 0.2s; }
.contact__form-group:nth-child(4) { animation-delay: 0.25s; }
.contact__form-group:nth-child(5) { animation-delay: 0.3s; }`;
  }

  getDefaultJS(): string {
    return `
// ========================================
// CONTACT V3 PERFECT ENHANCED - JavaScript
// ========================================

class ContactV3PerfectEnhanced {
  constructor(element) {
    this.element = element;
    this.variant = this.getVariant();
    this.form = element.querySelector('.contact__form');
    
    this.init();
  }
  
  getVariant() {
    const classes = this.element.classList;
    if (classes.contains('contact--modern')) return 'modern';
    if (classes.contains('contact--minimal')) return 'minimal';
    if (classes.contains('contact--bold')) return 'bold';
    if (classes.contains('contact--elegant')) return 'elegant';
    return 'modern'; // default
  }
  
  init() {
    console.log('📞 Initialisation Contact V3 Perfect Enhanced:', this.variant);
    
    // Initialisation du formulaire
    this.initForm();
    
    // Animations selon la variante
    this.initVariantEffects();
    
    // Observer pour animations
    this.observeElements();
  }
  
  // Gestion du formulaire
  initForm() {
    if (!this.form) return;
    
    const submitBtn = this.form.querySelector('.contact__form-submit');
    const inputs = this.form.querySelectorAll('input, textarea');
    
    // Validation en temps réel
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
    
    // Soumission du formulaire
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validation
      let isValid = true;
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        this.shakeForm();
        return;
      }
      
      // Animation de soumission
      submitBtn.classList.add('contact__form-submit--loading');
      submitBtn.textContent = 'Envoi en cours...';
      submitBtn.disabled = true;
      
      // Simulation d'envoi
      try {
        await this.submitForm();
        
        // Succès
        submitBtn.classList.remove('contact__form-submit--loading');
        submitBtn.classList.add('contact__form-submit--success');
        submitBtn.textContent = '✓ Message envoyé !';
        
        // Effets selon la variante
        if (this.variant === 'bold') {
          this.triggerConfetti();
        } else if (this.variant === 'elegant') {
          this.triggerElegantSuccess();
        }
        
        // Reset après 3 secondes
        setTimeout(() => {
          this.form.reset();
          submitBtn.classList.remove('contact__form-submit--success');
          submitBtn.textContent = 'Envoyer';
          submitBtn.disabled = false;
        }, 3000);
        
      } catch (error) {
        console.error('Erreur:', error);
        submitBtn.classList.remove('contact__form-submit--loading');
        submitBtn.textContent = 'Erreur, réessayer';
        submitBtn.disabled = false;
        
        setTimeout(() => {
          submitBtn.textContent = 'Envoyer';
        }, 3000);
      }
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Remove previous error
    field.classList.remove('error');
    
    // Required check
    if (required && !value) {
      this.showError(field, 'Ce champ est obligatoire');
      return false;
    }
    
    // Type-specific validation
    switch(type) {
      case 'email':
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (value && !emailRegex.test(value)) {
          this.showError(field, 'Email invalide');
          return false;
        }
        break;
        
      case 'tel':
        const phoneRegex = /^[\\+\\-\\(\\)\\s\\d]{10,}$/;
        if (value && !phoneRegex.test(value.replace(/\\s/g, ''))) {
          this.showError(field, 'Numéro de téléphone invalide');
          return false;
        }
        break;
    }
    
    return true;
  }
  
  showError(field, message) {
    field.classList.add('error');
    
    // Animation selon la variante
    if (this.variant === 'bold') {
      field.style.animation = 'pulse 0.5s ease';
    } else {
      field.style.animation = 'shake 0.5s ease';
    }
    
    setTimeout(() => {
      field.style.animation = '';
    }, 500);
  }
  
  shakeForm() {
    this.form.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      this.form.style.animation = '';
    }, 500);
  }
  
  async submitForm() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'contact_form_submit', {
        contact_variant: this.variant
      });
    }
    
    // Simulation pour la démo
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  initVariantEffects() {
    switch(this.variant) {
      case 'modern':
        this.initModernEffects();
        break;
      case 'minimal':
        this.initMinimalEffects();
        break;
      case 'bold':
        this.initBoldEffects();
        break;
      case 'elegant':
        this.initElegantEffects();
        break;
    }
  }
  
  initModernEffects() {
    // Hover effects sur les cartes d'info
    const infoItems = this.element.querySelectorAll('.contact__info-item');
    infoItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.contact__info-icon');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.contact__info-icon');
        if (icon) {
          icon.style.transform = '';
        }
      });
    });
  }
  
  initMinimalEffects() {
    // Typing effect sur le titre
    const title = this.element.querySelector('.contact__title');
    if (title && title.dataset.typing) {
      const text = title.textContent;
      title.textContent = '';
      let i = 0;
      
      const type = () => {
        if (i < text.length) {
          title.textContent += text.charAt(i);
          i++;
          setTimeout(type, 50);
        }
      };
      
      // Start typing when visible
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          type();
          observer.unobserve(title);
        }
      });
      
      observer.observe(title);
    }
  }
  
  initBoldEffects() {
    // Floating animation sur les cartes
    const cards = this.element.querySelectorAll('.contact__card');
    
    cards.forEach((card, index) => {
      // Random float delay
      card.style.animationDelay = \`\${index * 0.5}s\`;
      
      // Parallax on mouse move
      this.element.addEventListener('mousemove', (e) => {
        const rect = this.element.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const offsetX = (x - 0.5) * 20;
        const offsetY = (y - 0.5) * 20;
        
        card.style.transform = \`translateX(\${offsetX}px) translateY(\${offsetY}px)\`;
      });
    });
    
    // Reset on mouse leave
    this.element.addEventListener('mouseleave', () => {
      cards.forEach(card => {
        card.style.transform = '';
      });
    });
  }
  
  initElegantEffects() {
    // Smooth reveal des éléments
    const elements = this.element.querySelectorAll('.contact__info-item, .contact__form-group');
    
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
    
    // Effet de lueur sur le bouton submit
    const submitBtn = this.form?.querySelector('.contact__form-submit');
    if (submitBtn) {
      submitBtn.addEventListener('mouseenter', () => {
        submitBtn.style.animation = 'pulse 2s infinite';
      });
      
      submitBtn.addEventListener('mouseleave', () => {
        submitBtn.style.animation = '';
      });
    }
  }
  
  observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);
    
    // Observer les éléments animables
    const elements = this.element.querySelectorAll('.contact__info-item, .contact__card, .contact__form-group');
    elements.forEach(el => observer.observe(el));
  }
  
  triggerConfetti() {
    // Effet confetti pour variante bold
    const colors = ['#ffffff', '#f0f0f0', '#e0e0e0'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = \`
        position: fixed;
        width: 10px;
        height: 10px;
        background: \${colors[Math.floor(Math.random() * colors.length)]};
        left: \${Math.random() * 100}%;
        top: -10px;
        opacity: \${Math.random() * 0.5 + 0.5};
        transform: rotate(\${Math.random() * 360}deg);
        animation: confettiFall 3s ease-out forwards;
        pointer-events: none;
        z-index: 9999;
      \`;
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }
  }
  
  triggerElegantSuccess() {
    // Animation élégante de succès
    const successOverlay = document.createElement('div');
    successOverlay.className = 'contact__success-overlay';
    successOverlay.innerHTML = \`
      <div class="contact__success-content">
        <div class="contact__success-icon">✓</div>
        <div class="contact__success-text">Message envoyé avec succès</div>
      </div>
    \`;
    
    successOverlay.style.cssText = \`
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    \`;
    
    document.body.appendChild(successOverlay);
    
    setTimeout(() => {
      successOverlay.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => successOverlay.remove(), 300);
    }, 2000);
  }
}

// Styles additionnels
const style = document.createElement('style');
style.textContent = \`
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes confettiFall {
    to {
      top: 100vh;
      transform: rotate(720deg);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  .contact__form-input.error,
  .contact__form-textarea.error {
    border-color: #ef4444 !important;
  }
  
  .contact__success-content {
    text-align: center;
    color: white;
  }
  
  .contact__success-icon {
    width: 80px;
    height: 80px;
    background: #10b981;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    margin: 0 auto 1rem;
    animation: pulse 0.6s ease;
  }
  
  .contact__success-text {
    font-size: 1.5rem;
    font-weight: 300;
  }
\`;
document.head.appendChild(style);

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contact').forEach(element => {
    new ContactV3PerfectEnhanced(element);
  });
});`;
  }

  render(data: ContactData, context: RenderContext): RenderResult {
    logger.info('ContactRendererV3PerfectEnhanced', 'render', '🎨 Rendu du bloc Contact Enhanced', { variant: data.variant });

    const validatedData = this.validate(data);
    if (!validatedData.success) {
      logger.error('ContactRendererV3PerfectEnhanced', 'render', '❌ Données invalides', validatedData.error);
      return {
        html: '<div class="error">Erreur de validation des données Contact</div>',
        css: '',
        js: ''
      };
    }

    const contact = validatedData.data;
    const themeVariant = data.themeVariant || 'modern';

    // Génération du HTML selon la variante de thème
    let contentHTML = '';
    
    switch (themeVariant) {
      case 'modern':
        contentHTML = this.renderModern(contact);
        break;
      case 'minimal':
        contentHTML = this.renderMinimal(contact);
        break;
      case 'bold':
        contentHTML = this.renderBold(contact);
        break;
      case 'elegant':
        contentHTML = this.renderElegant(contact);
        break;
      default:
        contentHTML = this.renderModern(contact);
    }

    const html = `
      <section class="contact contact--${themeVariant}" 
               ${contact.id ? `id="${contact.id}"` : ''}>
        <div class="contact__container">
          ${this.renderHeader(contact)}
          ${contentHTML}
        </div>
      </section>
    `;

    return {
      html,
      css: this.getDefaultCSS(),
      js: this.getDefaultJS()
    };
  }

  private renderHeader(contact: ContactData): string {
    if (!contact.title && !contact.subtitle && !contact.description) return '';
    
    return `
      <div class="contact__header">
        ${contact.title ? `<h2 class="contact__title">${contact.title}</h2>` : ''}
        ${contact.subtitle ? `<p class="contact__subtitle">${contact.subtitle}</p>` : ''}
        ${contact.description ? `<p class="contact__description">${contact.description}</p>` : ''}
      </div>
    `;
  }

  private renderModern(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        <div class="contact__content">
          <div class="contact__info-grid">
            ${contact.contactInfo.slice(0, 4).map((info, index) => `
              <div class="contact__info-item" data-index="${index}">
                ${info.icon ? `<div class="contact__info-icon">${info.icon}</div>` : ''}
                <div class="contact__info-content">
                  ${info.label ? `<div class="contact__info-label">${info.label}</div>` : ''}
                  ${info.link ? `
                    <a href="${info.link}" class="contact__info-value">${info.value}</a>
                  ` : `
                    <div class="contact__info-value">${info.value}</div>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        ${contact.displayOptions?.showForm !== false ? this.renderForm(contact) : ''}
      </div>
    `;
  }

  private renderMinimal(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        <div class="contact__info-list">
          ${contact.contactInfo.map((info) => `
            <div class="contact__info-item">
              ${info.link ? `
                <a href="${info.link}" class="contact__info-link">${info.value}</a>
              ` : `
                <span>${info.value}</span>
              `}
            </div>
          `).join('')}
        </div>
        
        ${this.renderSocialLinks(contact)}
      </div>
    `;
  }

  private renderBold(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        ${contact.contactInfo.map((info, index) => `
          <div class="contact__card" data-index="${index}">
            <div class="contact__card-icon">${info.icon || '📧'}</div>
            <h3 class="contact__card-title">${info.label || 'Contact'}</h3>
            ${info.link ? `
              <a href="${info.link}" class="contact__card-value">${info.value}</a>
            ` : `
              <div class="contact__card-value">${info.value}</div>
            `}
          </div>
        `).join('')}
      </div>
      
      ${contact.displayOptions?.showForm !== false ? this.renderForm(contact) : ''}
    `;
  }

  private renderElegant(contact: ContactData): string {
    return `
      <div class="contact__wrapper">
        <aside class="contact__sidebar">
          <h3 class="contact__sidebar-title">Informations de contact</h3>
          <div class="contact__info-list">
            ${contact.contactInfo.map((info, index) => `
              <div class="contact__info-item" data-index="${index}">
                ${info.icon ? `<div class="contact__info-icon">${info.icon}</div>` : ''}
                <div class="contact__info-content">
                  ${info.label ? `<div class="contact__info-label">${info.label}</div>` : ''}
                  ${info.link ? `
                    <a href="${info.link}" class="contact__info-value">${info.value}</a>
                  ` : `
                    <div class="contact__info-value">${info.value}</div>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
          ${this.renderSocialLinks(contact)}
        </aside>
        
        <main class="contact__main">
          ${contact.displayOptions?.showForm !== false ? this.renderForm(contact) : ''}
        </main>
      </div>
    `;
  }

  private renderForm(contact: ContactData): string {
    if (!contact.form?.enabled || !contact.form.fields) return '';
    
    return `
      <form class="contact__form">
        ${contact.form.title ? `<h3 class="contact__form-title">${contact.form.title}</h3>` : ''}
        
        <div class="contact__form-grid">
          ${contact.form.fields.map(field => this.renderFormField(field)).join('')}
        </div>
        
        <button type="submit" class="contact__form-submit">
          ${contact.form.submitButton?.text || 'Envoyer'}
        </button>
      </form>
    `;
  }

  private renderFormField(field: any): string {
    const labelHTML = `
      <label class="contact__form-label" for="${field.name}">
        ${field.label}${field.required ? ' *' : ''}
      </label>
    `;
    
    let inputHTML = '';
    
    switch (field.type) {
      case 'textarea':
        inputHTML = `
          <textarea class="contact__form-textarea"
                    id="${field.name}"
                    name="${field.name}"
                    placeholder="${field.placeholder || ''}"
                    ${field.required ? 'required' : ''}
                    rows="${field.rows || 4}"></textarea>
        `;
        break;
        
      default:
        inputHTML = `
          <input class="contact__form-input"
                 type="${field.type}"
                 id="${field.name}"
                 name="${field.name}"
                 placeholder="${field.placeholder || ''}"
                 ${field.required ? 'required' : ''}>
        `;
    }
    
    return `
      <div class="contact__form-group contact__form-group--${field.width || 'full'}">
        ${labelHTML}
        ${inputHTML}
      </div>
    `;
  }

  private renderSocialLinks(contact: ContactData): string {
    if (!contact.socialLinks || contact.socialLinks.length === 0) return '';
    
    const icons: Record<string, string> = {
      facebook: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      twitter: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
      instagram: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>',
      linkedin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
    };
    
    return `
      <div class="contact__social">
        ${contact.socialLinks.map(link => `
          <a href="${link.url}" 
             class="contact__social-link" 
             target="_blank"
             rel="noopener noreferrer"
             title="${link.label || link.platform}">
            ${icons[link.platform] || '🔗'}
          </a>
        `).join('')}
      </div>
    `;
  }
}

export const contactRendererV3PerfectEnhanced = new ContactRendererV3PerfectEnhanced();
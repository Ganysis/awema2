/**
 * Contact Renderer V3 PERFECT Enhanced - Version ultra-moderne avec design system
 */

import { RenderResult, RenderContext } from '../types';
import { ContactData, contactDefaults } from '../schemas/blocks/contact-perfect';
import { BaseRendererV3 } from './base.renderer';
import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { z } from 'zod';

export class ContactRendererV3PerfectEnhanced extends BaseRendererV3<ContactData> {
  type = 'contact-v3-perfect';
  version = '3.0.0';
  
  constructor() {
    super();
    console.log('🟡 ContactRendererV3PerfectEnhanced constructor called');
  }
  
  validate(data: unknown): z.SafeParseReturnType<ContactData, ContactData> {
    // For now, just return success with the data
    return { success: true, data: data as ContactData } as any;
  }
  
  getDefaultData(): ContactData {
    return contactDefaults;
  }
  
  getRequiredAssets(): any[] {
    return [];
  }
  
  renderPreview(data: ContactData): string {
    return this.render(data, { isExport: false }).html;
  }

  getBlockProps(): BlockProp[] {
    return [
      {
        name: 'visualVariant',
        label: 'Style visuel',
        type: PropType.SELECT,
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
      {
        name: 'variant',
        label: 'Disposition',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'split-modern',
        description: 'Disposition du contenu',
        options: [
          { value: 'split-modern', label: 'Écran divisé moderne' },
          { value: 'floating-cards', label: 'Cartes flottantes' },
          { value: 'glassmorphism', label: 'Effet verre dépoli' },
          { value: 'gradient-waves', label: 'Vagues gradient' },
          { value: 'sidebar-sticky', label: 'Sidebar collante' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Style',
          order: 2
        }
      },
      {
        name: 'title',
        label: 'Titre',
        type: PropType.STRING,
        required: true,
        defaultValue: 'Contactez-nous',
        description: 'Titre principal du bloc contact',
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
        defaultValue: 'Nous sommes là pour répondre à toutes vos questions',
        description: 'Sous-titre descriptif',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 2
        }
      },
      {
        name: 'description',
        label: 'Description',
        type: PropType.STRING,
        required: false,
        description: 'Description détaillée',
        editorConfig: {
          control: EditorControl.TEXTAREA,
          group: 'Contenu',
          order: 3
        }
      },
      // Contact information with flat structure
      {
        name: 'contact1_type',
        label: 'Contact 1 - Type',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'phone',
        options: [
          { value: 'phone', label: 'Téléphone' },
          { value: 'email', label: 'Email' },
          { value: 'address', label: 'Adresse' },
          { value: 'hours', label: 'Horaires' },
          { value: 'social', label: 'Réseaux sociaux' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Coordonnées',
          order: 1
        }
      },
      {
        name: 'contact1_label',
        label: 'Contact 1 - Label',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Téléphone',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 2
        }
      },
      {
        name: 'contact1_value',
        label: 'Contact 1 - Valeur',
        type: PropType.STRING,
        required: false,
        defaultValue: '+33 1 23 45 67 89',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 3
        }
      },
      {
        name: 'contact1_icon',
        label: 'Contact 1 - Icône',
        type: PropType.STRING,
        required: false,
        defaultValue: '📞',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 4
        }
      },
      // Contact 2
      {
        name: 'contact2_type',
        label: 'Contact 2 - Type',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'email',
        options: [
          { value: 'phone', label: 'Téléphone' },
          { value: 'email', label: 'Email' },
          { value: 'address', label: 'Adresse' },
          { value: 'hours', label: 'Horaires' },
          { value: 'social', label: 'Réseaux sociaux' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Coordonnées',
          order: 5
        }
      },
      {
        name: 'contact2_label',
        label: 'Contact 2 - Label',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Email',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 6
        }
      },
      {
        name: 'contact2_value',
        label: 'Contact 2 - Valeur',
        type: PropType.STRING,
        required: false,
        defaultValue: 'contact@example.com',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 7
        }
      },
      {
        name: 'contact2_icon',
        label: 'Contact 2 - Icône',
        type: PropType.STRING,
        required: false,
        defaultValue: '✉️',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 8
        }
      },
      // Contact 3
      {
        name: 'contact3_type',
        label: 'Contact 3 - Type',
        type: PropType.SELECT,
        required: false,
        defaultValue: 'address',
        options: [
          { value: 'phone', label: 'Téléphone' },
          { value: 'email', label: 'Email' },
          { value: 'address', label: 'Adresse' },
          { value: 'hours', label: 'Horaires' },
          { value: 'social', label: 'Réseaux sociaux' }
        ],
        editorConfig: {
          control: EditorControl.SELECT,
          group: 'Coordonnées',
          order: 9
        }
      },
      {
        name: 'contact3_label',
        label: 'Contact 3 - Label',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Adresse',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 10
        }
      },
      {
        name: 'contact3_value',
        label: 'Contact 3 - Valeur',
        type: PropType.STRING,
        required: false,
        defaultValue: '123 Rue de la Paix, 75001 Paris',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 11
        }
      },
      {
        name: 'contact3_icon',
        label: 'Contact 3 - Icône',
        type: PropType.STRING,
        required: false,
        defaultValue: '📍',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Coordonnées',
          order: 12
        }
      },
      // Form configuration
      {
        name: 'formEnabled',
        label: 'Activer le formulaire',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Formulaire',
          order: 1
        }
      },
      {
        name: 'formTitle',
        label: 'Titre du formulaire',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Envoyez-nous un message',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Formulaire',
          order: 2
        }
      },
      {
        name: 'submitButtonText',
        label: 'Texte du bouton',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Envoyer le message',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Formulaire',
          order: 3
        }
      },
      // Map configuration
      {
        name: 'mapEnabled',
        label: 'Afficher la carte',
        type: PropType.BOOLEAN,
        required: false,
        defaultValue: true,
        editorConfig: {
          control: EditorControl.TOGGLE,
          group: 'Carte',
          order: 1
        }
      },
      {
        name: 'mapAddress',
        label: 'Adresse de la carte',
        type: PropType.STRING,
        required: false,
        defaultValue: 'Paris, France',
        description: 'Adresse complète pour la carte (ex: 123 rue de la Paix, 75001 Paris)',
        editorConfig: {
          control: EditorControl.TEXT,
          group: 'Carte',
          order: 2,
          placeholder: 'Entrez une adresse complète'
        }
      },
      {
        name: 'mapZoom',
        label: 'Niveau de zoom',
        type: PropType.NUMBER,
        required: false,
        defaultValue: 15,
        editorConfig: {
          control: EditorControl.INPUT,
          group: 'Carte',
          order: 4,
          inputType: 'number',
          min: 1,
          max: 20
        }
      },
      // Background options
      {
        name: 'backgroundColor',
        label: 'Couleur de fond',
        type: PropType.STRING,
        required: false,
        description: 'Couleur de fond personnalisée',
        editorConfig: {
          control: EditorControl.COLOR,
          group: 'Apparence',
          order: 1
        }
      }
    ];
  }

  // Extract contact info from flat props
  private extractContactInfo(data: any): any[] {
    const contactInfo = [];
    for (let i = 1; i <= 4; i++) {
      const type = data[`contact${i}_type`];
      const label = data[`contact${i}_label`];
      const value = data[`contact${i}_value`];
      const icon = data[`contact${i}_icon`];
      
      if (type && value) {
        const contact: any = { type, label, value, icon };
        if (type === 'email' && value.includes('@')) {
          contact.link = `mailto:${value}`;
        } else if (type === 'phone') {
          contact.link = `tel:${value.replace(/\s/g, '')}`;
        }
        contactInfo.push(contact);
      }
    }
    return contactInfo.length > 0 ? contactInfo : contactDefaults.contactInfo;
  }

  // Extract form config from flat props
  private extractFormConfig(data: any): any {
    return {
      enabled: data.formEnabled !== false,
      title: data.formTitle || 'Envoyez-nous un message',
      fields: contactDefaults.form?.fields || [],
      submitButton: {
        text: data.submitButtonText || 'Envoyer le message',
        loadingText: 'Envoi en cours...',
        successText: 'Message envoyé avec succès !',
        style: 'primary'
      }
    };
  }

  // Extract map config from flat props
  private extractMapConfig(data: any): any {
    const address = data.mapAddress || 'Paris, France';
    // Encode address for URL
    const encodedAddress = encodeURIComponent(address);
    
    return {
      enabled: data.mapEnabled !== false,
      provider: 'openstreetmap',
      address: address,
      encodedAddress: encodedAddress,
      zoom: data.mapZoom || 15,
      style: 'roadmap'
    };
  }

  render(data: ContactData, context?: RenderContext): RenderResult {
    const { 
      title = 'Contactez-nous',
      subtitle = 'Nous sommes là pour répondre à toutes vos questions',
      description,
      visualVariant = 'modern',
      variant = 'split-modern',
      backgroundColor
    } = data;

    const isExport = context?.isExport ?? false;
    const theme = context?.theme;

    // Extract structured data from flat props
    const contactInfo = this.extractContactInfo(data);
    const form = this.extractFormConfig(data);
    const map = this.extractMapConfig(data);

    const html = `
<section class="contact-v3-perfect contact-v3-perfect--${visualVariant} contact-v3-perfect--${variant}" ${backgroundColor ? `style="background-color: ${backgroundColor};"` : ''}>
  <div class="contact-v3-perfect__container">
    <div class="contact-v3-perfect__header">
      <h2 class="contact-v3-perfect__title" ${!isExport ? 'contenteditable="true"' : ''}>${this.escapeHtml(title)}</h2>
      ${subtitle ? `<p class="contact-v3-perfect__subtitle" ${!isExport ? 'contenteditable="true"' : ''}>${this.escapeHtml(subtitle)}</p>` : ''}
      ${description ? `<p class="contact-v3-perfect__description" ${!isExport ? 'contenteditable="true"' : ''}>${this.escapeHtml(description)}</p>` : ''}
    </div>

    <div class="contact-v3-perfect__content">
      <div class="contact-v3-perfect__main">
        <div class="contact-v3-perfect__info">
          <div class="contact-v3-perfect__info-wrapper">
            ${contactInfo.map(info => `
              <div class="contact-v3-perfect__info-item">
                <div class="contact-v3-perfect__info-icon">${info.icon || '📍'}</div>
                <div class="contact-v3-perfect__info-content">
                  <div class="contact-v3-perfect__info-label">${this.escapeHtml(info.label || '')}</div>
                  ${info.link ? `
                    <a href="${info.link}" class="contact-v3-perfect__info-value">${this.escapeHtml(info.value)}</a>
                  ` : `
                    <div class="contact-v3-perfect__info-value">${this.escapeHtml(info.value)}</div>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
          
          ${map.enabled && (variant === 'split-modern' || variant === 'sidebar-sticky') ? `
            <div class="contact-v3-perfect__map contact-v3-perfect__map--inline" id="contact-map-${Date.now()}">
              <div class="contact-v3-perfect__map-container" data-address="${map.address}" data-zoom="${map.zoom}">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameborder="0" 
                  scrolling="no" 
                  marginheight="0" 
                  marginwidth="0" 
                  src="https://maps.google.com/maps?q=${map.encodedAddress}&output=embed&z=${map.zoom}"
                  style="border: 0;">
                </iframe>
              </div>
            </div>
          ` : ''}
        </div>
  
        ${form.enabled ? `
          <div class="contact-v3-perfect__form">
            <h3 class="contact-v3-perfect__form-title">${this.escapeHtml(form.title)}</h3>
            <form class="contact-v3-perfect__form-content" action="/api/contact" method="POST">
              <div class="contact-v3-perfect__form-grid">
                <div class="contact-v3-perfect__form-group">
                  <label class="contact-v3-perfect__form-label" for="contact-name">Nom complet</label>
                  <input type="text" name="name" id="contact-name" class="contact-v3-perfect__form-input" placeholder="Jean Dupont" required>
                </div>
                <div class="contact-v3-perfect__form-group">
                  <label class="contact-v3-perfect__form-label" for="contact-email">Email</label>
                  <input type="email" name="email" id="contact-email" class="contact-v3-perfect__form-input" placeholder="jean@example.com" required>
                </div>
                <div class="contact-v3-perfect__form-group">
                  <label class="contact-v3-perfect__form-label" for="contact-phone">Téléphone</label>
                  <input type="tel" name="phone" id="contact-phone" class="contact-v3-perfect__form-input" placeholder="+33 6 12 34 56 78">
                </div>
                <div class="contact-v3-perfect__form-group">
                  <label class="contact-v3-perfect__form-label" for="contact-subject">Sujet</label>
                  <select name="subject" id="contact-subject" class="contact-v3-perfect__form-input" required>
                    <option value="">Choisir un sujet</option>
                    <option value="general">Question générale</option>
                    <option value="quote">Demande de devis</option>
                    <option value="support">Support technique</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div class="contact-v3-perfect__form-group contact-v3-perfect__form-group--full">
                  <label class="contact-v3-perfect__form-label" for="contact-message">Message</label>
                  <textarea name="message" id="contact-message" class="contact-v3-perfect__form-textarea" rows="5" placeholder="Votre message..." required></textarea>
                </div>
              </div>
              <button type="submit" class="contact-v3-perfect__form-submit">
                ${this.escapeHtml(form.submitButton.text)}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m0 0l-7-7m7 7l-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        ` : ''}
      </div>
      
      ${map.enabled && variant !== 'split-modern' && variant !== 'sidebar-sticky' ? `
        <div class="contact-v3-perfect__map ${variant === 'map-fullscreen' ? 'contact-v3-perfect__map--fullscreen' : ''}" id="contact-map-${Date.now()}">
          <div class="contact-v3-perfect__map-container" data-address="${map.address}" data-zoom="${map.zoom}">
            <iframe 
              width="100%" 
              height="100%" 
              frameborder="0" 
              scrolling="no" 
              marginheight="0" 
              marginwidth="0" 
              src="https://maps.google.com/maps?q=${map.encodedAddress}&output=embed&z=${map.zoom}"
              style="border: 0;">
            </iframe>
          </div>
        </div>
      ` : ''}
    </div>
  </div>
</section>`;

    const css = this.generateCSS({ ...data, variant, visualVariant }, context);
    const js = this.getDefaultJS();

    return { html, css, js };
  }

  private generateCSS(data: any, context?: RenderContext): string {
    const theme = context?.theme;
    const primaryColor = theme?.colors?.primary || '#667eea';
    const secondaryColor = theme?.colors?.secondary || '#764ba2';
    const fontHeading = theme?.typography?.fontFamily?.heading || 'Inter, system-ui, sans-serif';
    const fontBody = theme?.typography?.fontFamily?.body || 'Inter, system-ui, sans-serif';
    
    const visualVariant = data.visualVariant || 'modern';
    const variant = data.variant || 'split-modern';

    const css = `
/* Contact V3 Perfect Enhanced - Variables CSS */
:root {
  --contact-primary: ${primaryColor};
  --contact-secondary: ${secondaryColor};
  --contact-font-heading: ${fontHeading};
  --contact-font-body: ${fontBody};
  --contact-background: #ffffff;
  --contact-surface: #f8f9fa;
  --contact-text-primary: #1a1a1a;
  --contact-text-secondary: #4a5568;
  --contact-border: #e2e8f0;
  --contact-border-radius: 1rem;
  --contact-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
  --contact-hover-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.15);
  --contact-primary-light: ${primaryColor}20;
  --contact-primary-dark: ${primaryColor}dd;
  --contact-error: #dc3545;
  --contact-success: #28a745;
  
  /* Spacing system */
  --contact-spacing-xs: 0.5rem;
  --contact-spacing-sm: 1rem;
  --contact-spacing-md: 1.5rem;
  --contact-spacing-lg: 2rem;
  --contact-spacing-xl: 3rem;
  --contact-spacing-2xl: 4rem;
  
  /* Grid system */
  --contact-max-width: 1200px;
  --contact-content-max-width: 800px;
}

/* Base styles */
.contact-v3-perfect {
  position: relative;
  padding: var(--contact-spacing-2xl) 0;
  font-family: var(--contact-font-body);
  background: var(--contact-background);
  overflow: hidden;
  color: var(--contact-text-primary);
}

.contact-v3-perfect__container {
  max-width: var(--contact-max-width);
  margin: 0 auto;
  padding: 0 var(--contact-spacing-lg);
}

.contact-v3-perfect__header {
  text-align: center;
  margin-bottom: var(--contact-spacing-2xl);
  max-width: var(--contact-content-max-width);
  margin-left: auto;
  margin-right: auto;
}

.contact-v3-perfect__title {
  font-family: var(--contact-font-heading);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--contact-text-primary);
  margin: 0 0 var(--contact-spacing-sm);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.contact-v3-perfect__subtitle {
  font-size: 1.125rem;
  color: var(--contact-text-secondary);
  margin: 0 0 var(--contact-spacing-xs);
  font-weight: 500;
}

.contact-v3-perfect__description {
  font-size: 1rem;
  color: var(--contact-text-secondary);
  line-height: 1.6;
}

/* Content wrapper for better alignment */
.contact-v3-perfect__content {
  display: block;
}

.contact-v3-perfect__main {
  display: grid;
  gap: var(--contact-spacing-xl);
  align-items: start;
}

/* Default layout (when no specific variant) */
.contact-v3-perfect__content > .contact-v3-perfect__info,
.contact-v3-perfect__content > .contact-v3-perfect__form,
.contact-v3-perfect__content > .contact-v3-perfect__map {
  margin-bottom: var(--contact-spacing-xl);
}

.contact-v3-perfect__content > *:last-child {
  margin-bottom: 0;
}

/* Visual Variants */

/* Modern - Gradient dynamique */
.contact-v3-perfect--modern {
  background: linear-gradient(135deg, var(--contact-primary)08 0%, var(--contact-secondary)08 100%);
}

.contact-v3-perfect--modern .contact-v3-perfect__title {
  background: linear-gradient(135deg, var(--contact-primary) 0%, var(--contact-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-v3-perfect--modern .contact-v3-perfect__info-icon {
  background: linear-gradient(135deg, var(--contact-primary) 0%, var(--contact-secondary) 100%);
  color: white;
}

.contact-v3-perfect--modern .contact-v3-perfect__form-submit {
  background: linear-gradient(135deg, var(--contact-primary) 0%, var(--contact-secondary) 100%);
  color: white;
  font-weight: 600;
}

.contact-v3-perfect--modern .contact-v3-perfect__form-submit:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.contact-v3-perfect--modern .contact-v3-perfect__form,
.contact-v3-perfect--modern .contact-v3-perfect__info {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

/* Minimal - Épuré et rapide */
.contact-v3-perfect--minimal {
  background: #fafafa;
}

.contact-v3-perfect--minimal .contact-v3-perfect__title {
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--contact-text-primary);
}

.contact-v3-perfect--minimal .contact-v3-perfect__subtitle {
  color: var(--contact-text-secondary);
  font-weight: 400;
}

.contact-v3-perfect--minimal .contact-v3-perfect__info-icon {
  background: transparent;
  border: 2px solid var(--contact-primary);
  color: var(--contact-primary);
}

.contact-v3-perfect--minimal .contact-v3-perfect__form {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--contact-border);
}

.contact-v3-perfect--minimal .contact-v3-perfect__form-submit {
  background: var(--contact-text-primary);
  color: white;
}

.contact-v3-perfect--minimal .contact-v3-perfect__form-submit:hover {
  background: var(--contact-primary);
}

/* Bold - Impact visuel fort */
.contact-v3-perfect--bold {
  background: #0a0a0a;
  color: #ffffff;
}

.contact-v3-perfect--bold .contact-v3-perfect__title,
.contact-v3-perfect--bold .contact-v3-perfect__subtitle,
.contact-v3-perfect--bold .contact-v3-perfect__description {
  color: #ffffff;
}

.contact-v3-perfect--bold .contact-v3-perfect__text-secondary {
  color: #a0a0a0;
}

.contact-v3-perfect--bold .contact-v3-perfect__info-icon {
  background: var(--contact-primary);
  color: white;
}

.contact-v3-perfect--bold .contact-v3-perfect__info-label {
  color: #a0a0a0;
}

.contact-v3-perfect--bold .contact-v3-perfect__info-value {
  color: #ffffff;
}

.contact-v3-perfect--bold .contact-v3-perfect__form {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
}

.contact-v3-perfect--bold .contact-v3-perfect__form-label {
  color: #ffffff;
}

.contact-v3-perfect--bold .contact-v3-perfect__form-input,
.contact-v3-perfect--bold .contact-v3-perfect__form-textarea {
  background: #0a0a0a;
  border-color: #2a2a2a;
  color: #ffffff;
}

.contact-v3-perfect--bold .contact-v3-perfect__form-input:focus,
.contact-v3-perfect--bold .contact-v3-perfect__form-textarea:focus {
  border-color: var(--contact-primary);
  box-shadow: 0 0 0 3px var(--contact-primary)20;
}

/* Elegant - Glassmorphism subtil */
.contact-v3-perfect--elegant {
  background: #f8f9fa;
  position: relative;
}

.contact-v3-perfect--elegant::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 60%;
  height: 150%;
  background: linear-gradient(135deg, var(--contact-primary)15 0%, var(--contact-secondary)15 100%);
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
}

.contact-v3-perfect--elegant .contact-v3-perfect__container {
  position: relative;
  z-index: 1;
}

.contact-v3-perfect--elegant .contact-v3-perfect__form,
.contact-v3-perfect--elegant .contact-v3-perfect__info {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.contact-v3-perfect--elegant .contact-v3-perfect__info-icon {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: var(--contact-primary);
}

/* Layout Variants */

/* Split Modern */
.contact-v3-perfect--split-modern .contact-v3-perfect__content {
  display: block;
}

.contact-v3-perfect--split-modern .contact-v3-perfect__main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--contact-spacing-2xl);
  align-items: start;
}

.contact-v3-perfect--split-modern .contact-v3-perfect__info {
  display: flex;
  flex-direction: column;
  gap: var(--contact-spacing-lg);
}

.contact-v3-perfect--split-modern .contact-v3-perfect__map--inline {
  margin-top: var(--contact-spacing-lg);
  height: 250px;
  border-radius: var(--contact-border-radius);
  overflow: hidden;
  border: 1px solid var(--contact-border);
}

/* Floating Cards */
.contact-v3-perfect--floating-cards .contact-v3-perfect__content {
  display: block;
}

.contact-v3-perfect--floating-cards .contact-v3-perfect__main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--contact-spacing-lg);
  align-items: stretch;
}

.contact-v3-perfect--floating-cards .contact-v3-perfect__info,
.contact-v3-perfect--floating-cards .contact-v3-perfect__form {
  background: white;
  border-radius: var(--contact-border-radius);
  padding: var(--contact-spacing-xl);
  box-shadow: var(--contact-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.contact-v3-perfect--floating-cards .contact-v3-perfect__map {
  grid-column: 1 / -1;
  margin-top: var(--contact-spacing-lg);
  height: 350px;
  background: white;
  border-radius: var(--contact-border-radius);
  padding: 0;
  box-shadow: var(--contact-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-v3-perfect--floating-cards .contact-v3-perfect__info:hover,
.contact-v3-perfect--floating-cards .contact-v3-perfect__form:hover,
.contact-v3-perfect--floating-cards .contact-v3-perfect__map:hover {
  transform: translateY(-8px);
  box-shadow: var(--contact-hover-shadow);
}

/* Glassmorphism */
.contact-v3-perfect--glassmorphism {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

.contact-v3-perfect--glassmorphism::before {
  content: '';
  position: absolute;
  top: 20%;
  left: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--contact-primary)40 0%, transparent 70%);
  filter: blur(80px);
  z-index: 0;
}

.contact-v3-perfect--glassmorphism::after {
  content: '';
  position: absolute;
  bottom: 20%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--contact-secondary)40 0%, transparent 70%);
  filter: blur(80px);
  z-index: 0;
}

.contact-v3-perfect--glassmorphism .contact-v3-perfect__container {
  position: relative;
  z-index: 1;
}

.contact-v3-perfect--glassmorphism .contact-v3-perfect__content {
  display: block;
}

.contact-v3-perfect--glassmorphism .contact-v3-perfect__main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--contact-spacing-xl);
  align-items: stretch;
}

.contact-v3-perfect--glassmorphism .contact-v3-perfect__info,
.contact-v3-perfect--glassmorphism .contact-v3-perfect__form {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border-radius: var(--contact-border-radius);
  padding: var(--contact-spacing-xl);
}

.contact-v3-perfect--glassmorphism .contact-v3-perfect__map {
  grid-column: 1 / -1;
  height: 350px;
  margin-top: var(--contact-spacing-lg);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border-radius: var(--contact-border-radius);
  overflow: hidden;
}

/* Gradient Waves */
.contact-v3-perfect--gradient-waves {
  background: linear-gradient(135deg, var(--contact-primary) 0%, var(--contact-secondary) 100%);
  position: relative;
  overflow: hidden;
}

.contact-v3-perfect--gradient-waves::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"%3E%3Cpath fill="%23ffffff" fill-opacity="0.2" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"%3E%3C/path%3E%3C/svg%3E');
  background-size: cover;
}

.contact-v3-perfect--gradient-waves .contact-v3-perfect__title {
  color: white !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-weight: 800;
  -webkit-text-fill-color: white !important;
  background: none !important;
  -webkit-background-clip: unset !important;
}

.contact-v3-perfect--gradient-waves .contact-v3-perfect__subtitle,
.contact-v3-perfect--gradient-waves .contact-v3-perfect__description {
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.contact-v3-perfect--gradient-waves .contact-v3-perfect__content {
  display: block;
}

.contact-v3-perfect--gradient-waves .contact-v3-perfect__main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--contact-spacing-xl);
  align-items: stretch;
  margin-bottom: var(--contact-spacing-xl);
}

.contact-v3-perfect--gradient-waves .contact-v3-perfect__info,
.contact-v3-perfect--gradient-waves .contact-v3-perfect__form {
  background: rgba(255, 255, 255, 0.98);
  border-radius: var(--contact-border-radius);
  padding: var(--contact-spacing-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.contact-v3-perfect--gradient-waves .contact-v3-perfect__map {
  height: 400px;
  border-radius: var(--contact-border-radius);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.contact-v3-perfect--gradient-waves .contact-v3-perfect__form-submit {
  background: linear-gradient(135deg, var(--contact-primary) 0%, var(--contact-secondary) 100%);
  color: white;
  font-weight: 600;
}

/* Sidebar Sticky */
.contact-v3-perfect--sidebar-sticky .contact-v3-perfect__content {
  display: block;
}

.contact-v3-perfect--sidebar-sticky .contact-v3-perfect__main {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: var(--contact-spacing-2xl);
  align-items: start;
}

.contact-v3-perfect--sidebar-sticky .contact-v3-perfect__info {
  position: sticky;
  top: 2rem;
  background: var(--contact-surface);
  border-radius: var(--contact-border-radius);
  padding: var(--contact-spacing-xl);
  border: 1px solid var(--contact-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: var(--contact-spacing-lg);
}

.contact-v3-perfect--sidebar-sticky .contact-v3-perfect__map--inline {
  margin-top: var(--contact-spacing-md);
  height: 200px;
}

/* Info section styles */
.contact-v3-perfect__info {
  display: flex;
  flex-direction: column;
  gap: var(--contact-spacing-md);
}

.contact-v3-perfect__info-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--contact-spacing-sm);
}

/* Common styles for info items */
.contact-v3-perfect__info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--contact-spacing-sm);
  padding: var(--contact-spacing-xs) 0;
}

.contact-v3-perfect__info-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.contact-v3-perfect__info-item:hover .contact-v3-perfect__info-icon {
  transform: scale(1.1) rotate(5deg);
}

.contact-v3-perfect__info-content {
  flex: 1;
  min-width: 0;
}

.contact-v3-perfect__info-label {
  font-size: 0.75rem;
  color: var(--contact-text-secondary);
  margin-bottom: 0.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  line-height: 1.2;
}

.contact-v3-perfect__info-value {
  font-size: 1rem;
  color: var(--contact-text-primary);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
  line-height: 1.4;
  word-wrap: break-word;
}

.contact-v3-perfect__info-value:hover {
  color: var(--contact-primary);
  text-decoration: underline;
}

/* Form styles */
.contact-v3-perfect__form {
  background: var(--contact-surface);
  border-radius: var(--contact-border-radius);
  padding: var(--contact-spacing-xl);
  border: 1px solid var(--contact-border);
}

.contact-v3-perfect__form-title {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 var(--contact-spacing-lg);
  color: var(--contact-text-primary);
  font-family: var(--contact-font-heading);
}

.contact-v3-perfect__form-grid {
  display: grid;
  gap: var(--contact-spacing-md);
  grid-template-columns: repeat(2, 1fr);
}

.contact-v3-perfect__form-group {
  display: flex;
  flex-direction: column;
  gap: var(--contact-spacing-xs);
}

.contact-v3-perfect__form-group--full {
  grid-column: 1 / -1;
}

.contact-v3-perfect__form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--contact-text-primary);
  letter-spacing: 0.025em;
}

.contact-v3-perfect__form-input,
.contact-v3-perfect__form-textarea,
.contact-v3-perfect__form-input[type="select"] {
  padding: 0.875rem 1.125rem;
  border: 2px solid var(--contact-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  color: var(--contact-text-primary);
  font-family: var(--contact-font-body);
  line-height: 1.5;
}

.contact-v3-perfect__form-input::placeholder,
.contact-v3-perfect__form-textarea::placeholder {
  color: #a0aec0;
}

.contact-v3-perfect__form-input:focus,
.contact-v3-perfect__form-textarea:focus {
  outline: none;
  border-color: var(--contact-primary);
  box-shadow: 0 0 0 3px var(--contact-primary-light);
}

.contact-v3-perfect__form-textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-v3-perfect__form-submit {
  margin-top: var(--contact-spacing-lg);
  padding: 1rem 2.5rem;
  background: var(--contact-primary);
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: var(--contact-font-body);
  width: 100%;
  letter-spacing: 0.025em;
}

@media (min-width: 768px) {
  .contact-v3-perfect__form-submit {
    width: auto;
  }
}

.contact-v3-perfect__form-submit:hover:not(:disabled) {
  background: var(--contact-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
}

.contact-v3-perfect__form-submit:active:not(:disabled) {
  transform: translateY(0);
}

.contact-v3-perfect__form-submit svg {
  transition: transform 0.2s ease;
}

.contact-v3-perfect__form-submit:hover:not(:disabled) svg {
  transform: translateX(4px);
}

.contact-v3-perfect__form-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-v3-perfect__form-submit--success {
  background: #28a745;
}

.contact-v3-perfect__form-submit--error {
  background: #dc3545;
}

.contact-v3-perfect__form-input--error {
  border-color: #dc3545;
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Animations */
.is-visible {
  animation: fadeInUp 0.6s ease-out forwards;
}

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

/* Map styles */
.contact-v3-perfect__map {
  border-radius: var(--contact-border-radius);
  overflow: hidden;
  height: 400px;
  position: relative;
  border: 1px solid var(--contact-border);
  background: var(--contact-surface);
}

.contact-v3-perfect__map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.contact-v3-perfect__map iframe {
  width: 100%;
  height: 100%;
  display: block;
  filter: contrast(1.1) brightness(0.95);
}

/* Map height adjustments for different layouts */
.contact-v3-perfect__map--inline {
  height: 280px;
  margin-top: var(--contact-spacing-lg);
}

.contact-v3-perfect--split-modern .contact-v3-perfect__map--inline {
  height: 300px;
}

.contact-v3-perfect--sidebar-sticky .contact-v3-perfect__map--inline {
  height: 240px;
  margin-top: var(--contact-spacing-md);
}

/* Full width map variants */
.contact-v3-perfect__map:not(.contact-v3-perfect__map--inline) {
  height: 400px;
  min-height: 350px;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-v3-perfect {
    padding: var(--contact-spacing-xl) 0;
  }
  
  .contact-v3-perfect__container {
    padding: 0 var(--contact-spacing-md);
  }
  
  .contact-v3-perfect__content {
    display: block;
  }
  
  .contact-v3-perfect__main {
    grid-template-columns: 1fr !important;
    gap: var(--contact-spacing-lg);
  }
  
  .contact-v3-perfect__map--inline {
    height: 250px !important;
    margin-top: var(--contact-spacing-md) !important;
  }
  
  .contact-v3-perfect__form-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-v3-perfect__form-group {
    grid-column: 1 / -1;
  }
  
  .contact-v3-perfect__title {
    font-size: 2rem;
  }
  
  .contact-v3-perfect__subtitle {
    font-size: 1rem;
  }
  
  .contact-v3-perfect--map-fullscreen .contact-v3-perfect__header {
    position: relative;
    top: auto;
    left: auto;
    margin-bottom: var(--contact-spacing-lg);
    background: transparent;
    padding: 0;
  }
  
  .contact-v3-perfect--map-fullscreen .contact-v3-perfect__content {
    flex-direction: column;
    padding: var(--contact-spacing-md);
  }
  
  .contact-v3-perfect--map-fullscreen .contact-v3-perfect__info,
  .contact-v3-perfect--map-fullscreen .contact-v3-perfect__form {
    max-width: 100%;
  }
  
  .contact-v3-perfect--sidebar-sticky .contact-v3-perfect__info {
    position: static;
  }
  
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --contact-background: #0a0a0a;
    --contact-surface: #1a1a1a;
    --contact-text-primary: #f0f0f0;
    --contact-text-secondary: #a0a0a0;
    --contact-border: #2a2a2a;
  }
  
  .contact-v3-perfect__form-input,
  .contact-v3-perfect__form-textarea {
    background: #0a0a0a;
    color: #f0f0f0;
  }
  
  .contact-v3-perfect__map iframe {
    filter: contrast(1.1) brightness(0.8) invert(1) hue-rotate(180deg);
  }
}`;

    return css;
  }

  getDefaultCSS(): string {
    // Cette méthode n'est plus utilisée
    return '';
  }

  getDefaultJS(): string {
    return `
// Contact V3 Perfect Enhanced - JavaScript
(function() {
  // Form submission handler
  const forms = document.querySelectorAll('.contact-v3-perfect__form-content');
  forms.forEach(form => {
    const submitButton = form.querySelector('.contact-v3-perfect__form-submit');
    const originalText = submitButton ? submitButton.textContent : 'Envoyer';
    
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      if (!submitButton) return;
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span>Envoi en cours...</span><svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="10.472"></circle></svg>';
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      try {
        // For demo purposes, we'll simulate an API call
        // In production, replace this with actual API endpoint
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).catch(() => {
          // Fallback for demo - simulate success
          return { ok: true };
        });
        
        if (response.ok) {
          // Success
          submitButton.innerHTML = '<span>Message envoyé !</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          submitButton.classList.add('contact-v3-perfect__form-submit--success');
          
          // Reset form
          setTimeout(() => {
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('contact-v3-perfect__form-submit--success');
          }, 3000);
        } else {
          throw new Error('Erreur lors de l\'envoi');
        }
      } catch (error) {
        // Error
        submitButton.innerHTML = '<span>Erreur, réessayez</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        submitButton.classList.add('contact-v3-perfect__form-submit--error');
        
        setTimeout(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          submitButton.classList.remove('contact-v3-perfect__form-submit--error');
        }, 3000);
      }
    });
    
    // Form validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('invalid', function(e) {
        e.preventDefault();
        this.classList.add('contact-v3-perfect__form-input--error');
      });
      
      input.addEventListener('input', function() {
        this.classList.remove('contact-v3-perfect__form-input--error');
      });
    });
  });

  // Animation on scroll
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.contact-v3-perfect__content, .contact-v3-perfect__info-item, .contact-v3-perfect__form').forEach((el, index) => {
      el.dataset.delay = (index * 0.1) + 's';
      observer.observe(el);
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
})();
`;
  }

  private escapeHtml(str: string): string {
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

export const contactRendererV3PerfectEnhanced = new ContactRendererV3PerfectEnhanced();
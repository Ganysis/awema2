"use strict";
/**
 * Contact Renderer V3 - Rendu parfait avec formulaire et map
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRendererV3 = void 0;
const contact_1 = require("../schemas/blocks/contact");
class ContactRendererV3 {
    constructor() {
        this.type = 'contact-ultra-modern';
        this.version = '3.0.0';
    }
    validate(data) {
        return contact_1.contactDataSchema.safeParse(data);
    }
    getDefaultData() {
        return contact_1.contactDefaults;
    }
    getDefaultCSS() {
        return `
/* Contact Section Base */
.contact {
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

.contact__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.contact__header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text, #1f2937);
}

.contact__subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  max-width: 600px;
  margin: 0 auto;
}

/* Layouts */
.contact__content {
  display: grid;
  gap: 3rem;
}

.contact--split-left .contact__content,
.contact--split-right .contact__content {
  grid-template-columns: 1fr 1fr;
  align-items: start;
}

.contact--split-left .contact__form-section { order: 2; }
.contact--split-left .contact__info-section { order: 1; }

/* Contact Info */
.contact__info {
  background: var(--bg-elevated, #f9fafb);
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.contact__info-item {
  display: flex;
  align-items: start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact__info-item:last-child {
  margin-bottom: 0;
}

.contact__info-icon {
  width: 24px;
  height: 24px;
  color: var(--primary, #3b82f6);
  flex-shrink: 0;
}

.contact__info-content h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text, #1f2937);
}

.contact__info-content p {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  margin: 0;
}

/* Form Styles */
.contact__form {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text, #1f2937);
  margin-bottom: 0.5rem;
}

.form-label .required {
  color: var(--error, #ef4444);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 0.5rem;
  background: white;
  transition: all 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  display: none;
  font-size: 0.75rem;
  color: var(--error, #ef4444);
  margin-top: 0.25rem;
}

.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: var(--error, #ef4444);
}

.form-input.error ~ .form-error {
  display: block;
}

.form-submit {
  width: 100%;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: var(--primary, #3b82f6);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.form-submit:hover {
  background: var(--primary-dark, #2563eb);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.form-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Form Messages */
.form-message {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
}

.form-message--success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.form-message--error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

/* Map Container */
.contact__map {
  width: 100%;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  background: #f3f4f6;
}

.map-container {
  width: 100%;
  height: 100%;
}

/* Variants */
.contact--glassmorphism {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.contact--glassmorphism .contact__form {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.contact--gradient-wave {
  background: linear-gradient(135deg, var(--primary-50, #eff6ff), var(--secondary-50, #f0fdf4));
  position: relative;
}

.contact--gradient-wave::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23fff' fill-opacity='0.4'/%3E%3C/svg%3E");
  background-size: cover;
  opacity: 0.3;
}

/* Responsive */
@media (max-width: 768px) {
  .contact--split-left .contact__content,
  .contact--split-right .contact__content {
    grid-template-columns: 1fr;
  }
  
  .contact__map {
    height: 300px;
  }
}

/* Floating Labels (optional) */
.form-group--floating {
  position: relative;
  padding-top: 1rem;
}

.form-group--floating .form-label {
  position: absolute;
  top: 1.75rem;
  left: 1rem;
  transition: all 0.2s;
  background: white;
  padding: 0 0.25rem;
  pointer-events: none;
}

.form-group--floating .form-input:focus ~ .form-label,
.form-group--floating .form-input:not(:placeholder-shown) ~ .form-label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: var(--primary, #3b82f6);
}`;
    }
    getRequiredAssets() {
        return [];
    }
    renderPreview(data) {
        return `
<div class="contact-preview">
  <h3>${data.title}</h3>
  <p>${data.subtitle || 'Contact Block'}</p>
  <p>${data.form.fields.length} champs</p>
</div>`;
    }
    render(data, context) {
        const startTime = performance.now();
        try {
            // Générer le HTML
            const html = this.generateHTML(data);
            // Générer le CSS spécifique
            const css = this.generateCSS(data);
            // Générer le JS (form validation, map)
            const js = this.generateJS(data);
            // Calculer les performances
            const renderTime = performance.now() - startTime;
            return {
                html,
                css: this.getDefaultCSS() + css,
                js,
                assets: [],
                errors: [],
                warnings: data.map?.apiKey ? [] : ['Clé API Google Maps manquante'],
                performance: {
                    renderTime,
                    cssSize: css.length,
                    jsSize: js.length,
                }
            };
        }
        catch (error) {
            return {
                html: '<div class="contact contact--error">Erreur de rendu</div>',
                css: this.getDefaultCSS(),
                js: '',
                assets: [],
                errors: [{
                        blockId: 'contact',
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
        const { variant, layout, title, subtitle, description, contactInfo, form, map } = data;
        const classes = [
            'contact',
            `contact--${variant}`,
            `contact--${layout}`
        ].join(' ');
        return `
<section class="${classes}" id="contact" data-block="contact">
  <div class="contact__container">
    ${this.renderHeader(title, subtitle, description)}
    
    <div class="contact__content">
      ${this.renderFormSection(form, variant)}
      ${this.renderInfoSection(contactInfo, map)}
    </div>
  </div>
</section>`;
    }
    renderHeader(title, subtitle, description) {
        return `
<div class="contact__header">
  <h2 class="contact__title">${this.escape(title)}</h2>
  ${subtitle ? `<p class="contact__subtitle">${this.escape(subtitle)}</p>` : ''}
  ${description ? `<p class="contact__description">${this.escape(description)}</p>` : ''}
</div>`;
    }
    renderFormSection(form, variant) {
        return `
<div class="contact__form-section">
  <form class="contact__form" id="contact-form">
    ${form.fields.map(field => this.renderFormField(field)).join('')}
    
    <button type="submit" class="form-submit">
      ${this.escape(form.submitButton.text)}
    </button>
    
    <div class="form-message form-message--success" style="display: none;">
      ${this.escape(form.successMessage)}
    </div>
    
    <div class="form-message form-message--error" style="display: none;">
      ${this.escape(form.errorMessage)}
    </div>
  </form>
</div>`;
    }
    renderFormField(field) {
        const inputId = `field-${field.name}`;
        const required = field.required ? '<span class="required">*</span>' : '';
        let inputHtml = '';
        switch (field.type) {
            case 'textarea':
                inputHtml = `
<textarea 
  id="${inputId}"
  name="${field.name}"
  class="form-textarea"
  placeholder="${this.escape(field.placeholder || '')}"
  ${field.required ? 'required' : ''}
  ${field.rows ? `rows="${field.rows}"` : ''}
>${field.defaultValue || ''}</textarea>`;
                break;
            case 'select':
                inputHtml = `
<select 
  id="${inputId}"
  name="${field.name}"
  class="form-select"
  ${field.required ? 'required' : ''}
>
  <option value="">${field.placeholder || 'Choisir...'}</option>
  ${field.options?.map(opt => `
    <option value="${this.escape(opt.value)}">${this.escape(opt.label)}</option>
  `).join('') || ''}
</select>`;
                break;
            default:
                inputHtml = `
<input 
  type="${field.type}"
  id="${inputId}"
  name="${field.name}"
  class="form-input"
  placeholder="${this.escape(field.placeholder || '')}"
  ${field.required ? 'required' : ''}
  ${field.pattern ? `pattern="${field.pattern}"` : ''}
  ${field.defaultValue ? `value="${this.escape(field.defaultValue)}"` : ''}
/>`;
        }
        return `
<div class="form-group">
  <label for="${inputId}" class="form-label">
    ${this.escape(field.label)} ${required}
  </label>
  ${inputHtml}
  <span class="form-error">${field.errorMessage || 'Ce champ est requis'}</span>
</div>`;
    }
    renderInfoSection(info, map) {
        return `
<div class="contact__info-section">
  ${this.renderContactInfo(info)}
  ${map?.enabled ? this.renderMap(map) : ''}
</div>`;
    }
    renderContactInfo(info) {
        return `
<div class="contact__info">
  ${info.phone ? `
    <div class="contact__info-item">
      <svg class="contact__info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <div class="contact__info-content">
        <h3>Téléphone</h3>
        <p><a href="tel:${info.phone.replace(/\s/g, '')}">${this.escape(info.phone)}</a></p>
      </div>
    </div>
  ` : ''}
  
  ${info.email ? `
    <div class="contact__info-item">
      <svg class="contact__info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <div class="contact__info-content">
        <h3>Email</h3>
        <p><a href="mailto:${info.email}">${this.escape(info.email)}</a></p>
      </div>
    </div>
  ` : ''}
  
  ${info.address ? `
    <div class="contact__info-item">
      <svg class="contact__info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div class="contact__info-content">
        <h3>Adresse</h3>
        <p>${this.escape(info.address)}</p>
      </div>
    </div>
  ` : ''}
  
  ${info.hours ? `
    <div class="contact__info-item">
      <svg class="contact__info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div class="contact__info-content">
        <h3>Horaires</h3>
        ${info.hours.weekdays ? `<p>Lun-Ven: ${this.escape(info.hours.weekdays)}</p>` : ''}
        ${info.hours.saturday ? `<p>Sam: ${this.escape(info.hours.saturday)}</p>` : ''}
        ${info.hours.sunday ? `<p>Dim: ${this.escape(info.hours.sunday)}</p>` : ''}
      </div>
    </div>
  ` : ''}
</div>`;
    }
    renderMap(map) {
        const { coordinates, zoom } = map;
        return `
<div class="contact__map">
  <div class="map-container" 
       data-lat="${coordinates.lat}" 
       data-lng="${coordinates.lng}"
       data-zoom="${zoom}"
       id="contact-map">
  </div>
</div>`;
    }
    generateCSS(data) {
        let css = '';
        // CSS spécifique aux variants
        if (data.variant === 'floating-cards') {
            css += `
.contact--floating-cards .contact__form {
  transform: translateY(-10px);
  transition: transform 0.3s ease;
}
.contact--floating-cards .contact__form:hover {
  transform: translateY(-15px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}`;
        }
        return css;
    }
    generateJS(data) {
        const { form, map } = data;
        let js = `
// Form Validation and Submission
(function() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const successMsg = form.querySelector('.form-message--success');
  const errorMsg = form.querySelector('.form-message--error');
  const submitBtn = form.querySelector('.form-submit');
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  function validateField(field) {
    const isValid = field.checkValidity();
    
    if (!isValid) {
      field.classList.add('error');
      const error = field.nextElementSibling;
      if (error && error.classList.contains('form-error')) {
        error.style.display = 'block';
      }
    } else {
      field.classList.remove('error');
      const error = field.nextElementSibling;
      if (error && error.classList.contains('form-error')) {
        error.style.display = 'none';
      }
    }
    
    return isValid;
  }
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) return;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    
    // Hide messages
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    try {
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      ${form.webhookUrl ? `
      // Send to webhook
      const response = await fetch('${form.webhookUrl}', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Erreur serveur');
      ` : `
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      `}
      
      // Show success
      successMsg.style.display = 'block';
      form.reset();
      
      // Scroll to message
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
    } catch (error) {
      // Show error
      errorMsg.style.display = 'block';
      console.error('Form error:', error);
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = '${this.escape(form.submitButton.text)}';
    }
  });
})();`;
        // Google Maps
        if (map?.enabled) {
            js += `
// Google Maps
function initContactMap() {
  const mapEl = document.getElementById('contact-map');
  if (!mapEl) return;
  
  const lat = parseFloat(mapEl.dataset.lat);
  const lng = parseFloat(mapEl.dataset.lng);
  const zoom = parseInt(mapEl.dataset.zoom);
  
  const map = new google.maps.Map(mapEl, {
    center: { lat, lng },
    zoom: zoom,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#c9c9c9" }]
      }
    ]
  });
  
  // Add marker
  new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: '${this.escape(data.contactInfo.address || 'Notre localisation')}'
  });
}

// Load Google Maps
if (typeof google === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=${map.apiKey || 'AIzaSyBGpR8FPL3BzAP3Ev1H64oAZFbXbXPEKmA'}&callback=initContactMap';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
} else {
  initContactMap();
}`;
        }
        return js;
    }
    escape(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
exports.ContactRendererV3 = ContactRendererV3;

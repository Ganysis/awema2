import { BlockCategory, PropType, EditorControl, PerformanceImpact, DependencyType } from '@awema/shared';
import { renderIcon } from '../../utils/icons';
export const contactFormMap = {
    id: 'contact-form-map',
    name: 'Contact Form with Map',
    description: 'Contact section with form and optional map',
    category: BlockCategory.CONTACT,
    tags: ['contact', 'form', 'map', 'location'],
    thumbnail: '/blocks/contact-form-map.jpg',
    performanceImpact: PerformanceImpact.MEDIUM,
    props: [
        {
            name: 'title',
            type: PropType.STRING,
            description: 'Section title',
            required: true,
            defaultValue: 'Get In Touch',
            editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'Enter section title',
                group: 'Content',
                order: 1
            }
        },
        {
            name: 'subtitle',
            type: PropType.STRING,
            description: 'Section subtitle',
            required: false,
            defaultValue: 'We\'re here to help with all your needs',
            editorConfig: {
                control: EditorControl.TEXTAREA,
                placeholder: 'Enter subtitle',
                group: 'Content',
                order: 2
            }
        },
        {
            name: 'contactInfo',
            type: PropType.STRING,
            description: 'Contact information',
            required: true,
            defaultValue: JSON.stringify({
                phone: '(555) 123-4567',
                email: 'info@example.com',
                address: '123 Main St, City, State 12345',
                hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM'
            }),
            editorConfig: {
                control: EditorControl.TEXTAREA,
                helpText: 'Format JSON: {phone, email, address, hours}',
                group: 'Contact Info',
                order: 3
            }
        },
        {
            name: 'formFields',
            type: PropType.STRING,
            description: 'Form fields configuration',
            required: true,
            defaultValue: JSON.stringify([
                { name: 'name', label: 'Your Name', type: 'text', required: true },
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
                { name: 'service', label: 'Service Needed', type: 'select', options: ['Installation', 'Repair', 'Maintenance', 'Other'], required: true },
                { name: 'message', label: 'Message', type: 'textarea', required: true }
            ]),
            editorConfig: {
                control: EditorControl.TEXTAREA,
                helpText: 'Format JSON: [{name, label, type, required}, ...]',
                group: 'Form',
                order: 4
            }
        },
        {
            name: 'submitText',
            type: PropType.STRING,
            description: 'Submit button text',
            required: false,
            defaultValue: 'Send Message',
            editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'Submit button text',
                group: 'Form',
                order: 5
            }
        },
        {
            name: 'showMap',
            type: PropType.STRING,
            description: 'Show location map',
            required: false,
            defaultValue: true,
            editorConfig: {
                control: EditorControl.TOGGLE,
                group: 'Map',
                order: 6
            }
        },
        {
            name: 'mapCoordinates',
            type: PropType.STRING,
            description: 'Map coordinates',
            required: false,
            defaultValue: JSON.stringify({ lat: 40.7128, lng: -74.0060 }),
            editorConfig: {
                control: EditorControl.TEXT,
                group: 'Map',
                order: 7
            }
        }
    ],
    variants: [
        {
            id: 'form-left',
            name: 'Form Left',
            description: 'Form on left, map/info on right',
            modifications: {
                layout: 'form-left'
            }
        },
        {
            id: 'form-right',
            name: 'Form Right',
            description: 'Form on right, map/info on left',
            modifications: {
                layout: 'form-right'
            }
        },
        {
            id: 'stacked',
            name: 'Stacked Layout',
            description: 'Form above map/info',
            modifications: {
                layout: 'stacked'
            }
        },
        {
            id: 'dark-form',
            name: 'Dark Form',
            description: 'Dark background for form',
            modifications: {
                formStyle: 'dark'
            }
        }
    ],
    defaultProps: {
        title: 'Get In Touch',
        subtitle: 'We\'re here to help with all your needs',
        submitText: 'Send Message',
        showMap: true
    }
};
export function renderContactFormMap(props, variants = []) {
    const formRight = variants.includes('form-right');
    const stacked = variants.includes('stacked');
    const darkForm = variants.includes('dark-form');
    const layoutClass = stacked ? 'contact-stacked' : (formRight ? 'contact-reversed' : '');
    const formClass = darkForm ? 'contact-form--dark' : '';
    const html = `
    <section class="contact-section ${layoutClass}" id="contact" aria-labelledby="contact-title">
      <div class="contact-container">
        <div class="contact-header">
          <h2 id="contact-title" class="contact-title">${props.title}</h2>
          ${props.subtitle ? `<p class="contact-subtitle">${props.subtitle}</p>` : ''}
        </div>
        <div class="contact-content">
          <div class="contact-form-wrapper ${formClass}">
            <form class="contact-form" action="/submit-contact" method="POST">
              ${props.formFields.map((field) => {
        if (field.type === 'textarea') {
            return `
                    <div class="form-group">
                      <label for="${field.name}" class="form-label">
                        ${field.label}
                        ${field.required ? '<span class="required">*</span>' : ''}
                      </label>
                      <textarea 
                        id="${field.name}" 
                        name="${field.name}" 
                        class="form-textarea"
                        rows="4"
                        ${field.required ? 'required' : ''}
                        aria-required="${field.required}"
                      ></textarea>
                    </div>
                  `;
        }
        else if (field.type === 'select' && field.options) {
            return `
                    <div class="form-group">
                      <label for="${field.name}" class="form-label">
                        ${field.label}
                        ${field.required ? '<span class="required">*</span>' : ''}
                      </label>
                      <select 
                        id="${field.name}" 
                        name="${field.name}" 
                        class="form-select"
                        ${field.required ? 'required' : ''}
                        aria-required="${field.required}"
                      >
                        <option value="">Select ${field.label}</option>
                        ${field.options.map((option) => `
                          <option value="${option}">${option}</option>
                        `).join('')}
                      </select>
                    </div>
                  `;
        }
        else {
            return `
                    <div class="form-group">
                      <label for="${field.name}" class="form-label">
                        ${field.label}
                        ${field.required ? '<span class="required">*</span>' : ''}
                      </label>
                      <input 
                        type="${field.type}" 
                        id="${field.name}" 
                        name="${field.name}" 
                        class="form-input"
                        ${field.required ? 'required' : ''}
                        aria-required="${field.required}"
                      />
                    </div>
                  `;
        }
    }).join('')}
              <button type="submit" class="btn btn-primary btn-block">
                ${props.submitText}
              </button>
            </form>
          </div>
          <div class="contact-info-wrapper">
            ${props.showMap ? `
              <div class="contact-map" id="contact-map-${Date.now()}" data-lat="${props.mapCoordinates.lat}" data-lng="${props.mapCoordinates.lng}">
                <div class="map-loading">
                  <div class="map-spinner"></div>
                  <p>Loading map...</p>
                </div>
              </div>
            ` : ''}
            <div class="contact-info">
              ${props.contactInfo.phone ? `
                <div class="contact-info-item">
                  ${renderIcon('phone', 'icon', 24)}
                  <div>
                    <h4>Call Us</h4>
                    <a href="tel:${props.contactInfo.phone.replace(/\D/g, '')}">${props.contactInfo.phone}</a>
                  </div>
                </div>
              ` : ''}
              ${props.contactInfo.email ? `
                <div class="contact-info-item">
                  ${renderIcon('email', 'icon', 24)}
                  <div>
                    <h4>Email Us</h4>
                    <a href="mailto:${props.contactInfo.email}">${props.contactInfo.email}</a>
                  </div>
                </div>
              ` : ''}
              ${props.contactInfo.address ? `
                <div class="contact-info-item">
                  ${renderIcon('location', 'icon', 24)}
                  <div>
                    <h4>Visit Us</h4>
                    <p>${props.contactInfo.address}</p>
                  </div>
                </div>
              ` : ''}
              ${props.contactInfo.hours ? `
                <div class="contact-info-item">
                  ${renderIcon('clock', 'icon', 24)}
                  <div>
                    <h4>Business Hours</h4>
                    <p>${props.contactInfo.hours}</p>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
    const css = `
    .contact-section {
      padding: 5rem 0;
      background-color: var(--color-background-alt);
    }

    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .contact-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .contact-subtitle {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .contact-reversed .contact-form-wrapper {
      order: 2;
    }

    .contact-stacked .contact-content {
      grid-template-columns: 1fr;
      max-width: 800px;
      margin: 0 auto;
    }

    .contact-form-wrapper {
      background: var(--color-background);
      padding: 2.5rem;
      border-radius: var(--border-radius-lg);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .contact-form--dark {
      background: var(--color-text);
      color: var(--color-background);
    }

    .contact-form--dark .form-label {
      color: var(--color-background);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--color-text);
    }

    .form-label .required {
      color: var(--color-error);
    }

    .form-input,
    .form-textarea,
    .form-select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      font-size: 1rem;
      transition: border-color 0.3s ease;
      background-color: var(--color-background);
    }

    .contact-form--dark .form-input,
    .contact-form--dark .form-textarea,
    .contact-form--dark .form-select {
      background-color: var(--color-background);
      color: var(--color-text);
    }

    .form-input:focus,
    .form-textarea:focus,
    .form-select:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-light);
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .btn-block {
      width: 100%;
      margin-top: 2rem;
    }

    .contact-info-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .contact-map {
      width: 100%;
      height: 300px;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      position: relative;
      background: var(--color-background-alt);
    }
    
    .map-loading {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--color-background-alt);
      color: var(--color-text-secondary);
    }
    
    .map-spinner {
      width: 48px;
      height: 48px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .map-loading {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--color-background-alt);
    }

    .map-loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-info-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .contact-info-item .icon {
      flex-shrink: 0;
      color: var(--color-primary);
      margin-top: 0.25rem;
    }

    .contact-info-item h4 {
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
      color: var(--color-text-secondary);
    }

    .contact-info-item a {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
    }

    .contact-info-item a:hover {
      text-decoration: underline;
    }

    .contact-info-item p {
      margin: 0;
      color: var(--color-text);
    }

    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .contact-form-wrapper {
        padding: 1.5rem;
      }

      .contact-reversed .contact-form-wrapper {
        order: 1;
      }
    }
  `;
    const criticalCSS = `
    .contact-section {
      padding: 5rem 0;
      background-color: var(--color-background-alt);
    }
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
    .contact-form-wrapper {
      background: var(--color-background);
      padding: 2.5rem;
      border-radius: var(--border-radius-lg);
    }
    .form-input,
    .form-textarea,
    .form-select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
    }
  `;
    const js = props.showMap ? `
    (function() {
      // Load Google Maps API
      function loadGoogleMaps() {
        if (window.google && window.google.maps) {
          initializeMaps();
          return;
        }
        
        // Check if script is already loading
        if (document.querySelector('script[src*="maps.googleapis.com"]')) {
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCESD10stchdA2iIYB2iQqtfB1YNH1G4wc&callback=initContactMap';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      
      // Initialize map
      window.initContactMap = function() {
        const mapElements = document.querySelectorAll('.contact-map[data-lat][data-lng]');
        
        mapElements.forEach(mapEl => {
          // Skip if already initialized
          if (mapEl.dataset.initialized) return;
          
          const lat = parseFloat(mapEl.dataset.lat);
          const lng = parseFloat(mapEl.dataset.lng);
          
          if (isNaN(lat) || isNaN(lng)) return;
          
          // Remove loading state
          const loading = mapEl.querySelector('.map-loading');
          if (loading) {
            loading.style.display = 'none';
          }
          
          const map = new google.maps.Map(mapEl, {
            center: { lat, lng },
            zoom: 15,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#e9e9e9' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#ffffff' }]
              }
            ]
          });
          
          new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: 'Notre Emplacement'
          });
          
          mapEl.dataset.initialized = 'true';
        });
      };
      
      // Load on DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadGoogleMaps);
      } else {
        loadGoogleMaps();
      }
    })();
  ` : '';
    return {
        html,
        css,
        criticalCSS,
        js,
        dependencies: [
            {
                type: DependencyType.ICON,
                resource: 'feather-icons',
                critical: false
            }
        ]
    };
}

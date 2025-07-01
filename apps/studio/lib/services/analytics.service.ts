export interface AnalyticsConfig {
  ga4MeasurementId?: string;
  gtmContainerId?: string;
  enableEcommerce?: boolean;
  enableEnhancedMeasurement?: boolean;
  debugMode?: boolean;
  cookieConsent?: boolean;
  customDimensions?: Record<string, string>;
  customEvents?: Array<{
    name: string;
    parameters: Record<string, any>;
  }>;
}

export interface ConversionEvent {
  name: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
  items?: any[];
  [key: string]: any;
}

export class AnalyticsService {
  private config: AnalyticsConfig;

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  generateGA4Script(): string {
    if (!this.config.ga4MeasurementId) return '';

    return `
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${this.config.ga4MeasurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // Configuration de base
  gtag('config', '${this.config.ga4MeasurementId}', {
    'debug_mode': ${this.config.debugMode || false},
    'send_page_view': true,
    'cookie_flags': 'SameSite=None;Secure',
    ${this.config.customDimensions ? `'custom_map': ${JSON.stringify(this.config.customDimensions)},` : ''}
  });
  
  // Enhanced Measurement
  ${this.config.enableEnhancedMeasurement ? `
  gtag('set', {
    'page_location': window.location.href,
    'page_referrer': document.referrer,
    'user_properties': {
      'user_type': 'visitor'
    }
  });` : ''}
  
  // E-commerce
  ${this.config.enableEcommerce ? `
  gtag('set', {
    'currency': 'EUR',
    'country': 'FR'
  });` : ''}
  
  // Cookie Consent
  ${this.config.cookieConsent ? `
  // Attendre le consentement avant d'envoyer des données
  if (typeof window.cookieConsent !== 'undefined' && !window.cookieConsent.analytics) {
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    });
  }` : ''}
</script>

<!-- Events personnalisés -->
<script>
  // Tracking des clics sur numéro de téléphone
  document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="tel:"]')) {
      gtag('event', 'contact', {
        'contact_method': 'phone',
        'value': e.target.href.replace('tel:', '')
      });
    }
  });
  
  // Tracking des soumissions de formulaire
  document.addEventListener('submit', function(e) {
    if (e.target.matches('form')) {
      const formName = e.target.getAttribute('name') || e.target.getAttribute('id') || 'unknown';
      gtag('event', 'form_submit', {
        'form_name': formName,
        'form_destination': e.target.action
      });
    }
  });
  
  // Tracking du scroll (engagement)
  let scrolled25 = false, scrolled50 = false, scrolled75 = false, scrolled90 = false;
  
  window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
    
    if (!scrolled25 && scrollPercent >= 25) {
      scrolled25 = true;
      gtag('event', 'scroll', { 'percent_scrolled': 25 });
    }
    if (!scrolled50 && scrollPercent >= 50) {
      scrolled50 = true;
      gtag('event', 'scroll', { 'percent_scrolled': 50 });
    }
    if (!scrolled75 && scrollPercent >= 75) {
      scrolled75 = true;
      gtag('event', 'scroll', { 'percent_scrolled': 75 });
    }
    if (!scrolled90 && scrollPercent >= 90) {
      scrolled90 = true;
      gtag('event', 'scroll', { 'percent_scrolled': 90 });
    }
  });
  
  // Tracking du temps passé sur la page
  let startTime = Date.now();
  window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    gtag('event', 'time_on_page', {
      'time_seconds': timeSpent,
      'page_title': document.title
    });
  });
</script>
`;
  }

  generateGTMScript(): string {
    if (!this.config.gtmContainerId) return '';

    return `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${this.config.gtmContainerId}');</script>
<!-- End Google Tag Manager -->
`;
  }

  generateGTMNoScript(): string {
    if (!this.config.gtmContainerId) return '';

    return `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${this.config.gtmContainerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`;
  }

  generateConversionTracking(): string {
    return `
<script>
  // Fonction helper pour tracker les conversions
  window.trackConversion = function(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        ...parameters,
        'send_to': '${this.config.ga4MeasurementId}',
        'value': parameters.value || 0,
        'currency': parameters.currency || 'EUR'
      });
    }
  };
  
  // Tracker automatiquement certaines conversions
  document.addEventListener('DOMContentLoaded', function() {
    // Click sur CTA principal
    document.querySelectorAll('[data-conversion]').forEach(function(element) {
      element.addEventListener('click', function() {
        const conversionName = this.getAttribute('data-conversion');
        const conversionValue = this.getAttribute('data-conversion-value') || 0;
        
        trackConversion(conversionName, {
          'value': parseFloat(conversionValue),
          'item_name': this.textContent
        });
      });
    });
    
    // Formulaire de contact réussi
    if (window.location.search.includes('success=true')) {
      trackConversion('lead_form_submit', {
        'value': 50, // Valeur estimée d'un lead
        'form_type': 'contact'
      });
    }
    
    // Appel téléphonique (mobile)
    if (window.innerWidth <= 768) {
      document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        link.addEventListener('click', function() {
          trackConversion('phone_call_lead', {
            'value': 75, // Valeur plus élevée pour un appel
            'phone_number': this.href.replace('tel:', '')
          });
        });
      });
    }
  });
</script>
`;
  }

  generateEcommerceTracking(): string {
    if (!this.config.enableEcommerce) return '';

    return `
<script>
  // E-commerce tracking helpers
  window.ecommerce = {
    // Vue d'un service
    viewItem: function(service) {
      gtag('event', 'view_item', {
        'currency': 'EUR',
        'value': service.price || 0,
        'items': [{
          'item_id': service.id,
          'item_name': service.name,
          'item_category': service.category || 'Service',
          'price': service.price || 0,
          'quantity': 1
        }]
      });
    },
    
    // Ajout au panier (demande de devis)
    addToCart: function(service) {
      gtag('event', 'add_to_cart', {
        'currency': 'EUR',
        'value': service.price || 0,
        'items': [{
          'item_id': service.id,
          'item_name': service.name,
          'item_category': service.category || 'Service',
          'price': service.price || 0,
          'quantity': 1
        }]
      });
    },
    
    // Début du processus de devis
    beginCheckout: function(services) {
      const items = services.map(s => ({
        'item_id': s.id,
        'item_name': s.name,
        'item_category': s.category || 'Service',
        'price': s.price || 0,
        'quantity': 1
      }));
      
      const value = services.reduce((sum, s) => sum + (s.price || 0), 0);
      
      gtag('event', 'begin_checkout', {
        'currency': 'EUR',
        'value': value,
        'items': items
      });
    },
    
    // Conversion finale
    purchase: function(transactionData) {
      gtag('event', 'purchase', {
        'transaction_id': transactionData.id,
        'value': transactionData.value,
        'currency': 'EUR',
        'tax': transactionData.tax || 0,
        'items': transactionData.items
      });
    }
  };
</script>
`;
  }

  generateCoreWebVitalsTracking(): string {
    return `
<script>
  // Core Web Vitals tracking
  function sendToGoogleAnalytics({name, delta, value, id}) {
    gtag('event', name, {
      'value': delta,
      'metric_id': id,
      'metric_value': value,
      'metric_delta': delta,
    });
  }
  
  // Charger web-vitals library
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
  script.onload = function() {
    webVitals.onCLS(sendToGoogleAnalytics);
    webVitals.onFID(sendToGoogleAnalytics);
    webVitals.onLCP(sendToGoogleAnalytics);
    webVitals.onINP(sendToGoogleAnalytics);
    webVitals.onTTFB(sendToGoogleAnalytics);
  };
  document.head.appendChild(script);
</script>
`;
  }

  generateHeatmapTracking(): string {
    return `
<script>
  // Heatmap tracking basique
  const heatmapData = [];
  let lastClickTime = 0;
  
  document.addEventListener('click', function(e) {
    const now = Date.now();
    if (now - lastClickTime < 100) return; // Debounce
    lastClickTime = now;
    
    const data = {
      x: e.pageX,
      y: e.pageY,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      page_height: document.body.scrollHeight,
      timestamp: now,
      element: e.target.tagName,
      element_class: e.target.className,
      element_id: e.target.id
    };
    
    heatmapData.push(data);
    
    // Envoyer par batch toutes les 10 clicks
    if (heatmapData.length >= 10) {
      gtag('event', 'heatmap_data', {
        'clicks': JSON.stringify(heatmapData)
      });
      heatmapData.length = 0;
    }
  });
  
  // Envoyer les données restantes avant de quitter
  window.addEventListener('beforeunload', function() {
    if (heatmapData.length > 0) {
      gtag('event', 'heatmap_data', {
        'clicks': JSON.stringify(heatmapData)
      });
    }
  });
</script>
`;
  }

  generateAnalyticsHead(): string {
    const scripts = [
      this.config.gtmContainerId ? this.generateGTMScript() : this.generateGA4Script(),
      this.generateConversionTracking(),
      this.generateEcommerceTracking(),
      this.generateCoreWebVitalsTracking()
    ];

    return scripts.filter(Boolean).join('\n');
  }

  generateAnalyticsBody(): string {
    return this.generateGTMNoScript();
  }

  // Génère un dashboard analytics intégré
  generateAnalyticsDashboard(): string {
    return `
<div id="analytics-dashboard" style="display:none;">
  <iframe 
    width="100%" 
    height="600" 
    src="https://lookerstudio.google.com/embed/reporting/${this.config.ga4MeasurementId}"
    frameborder="0" 
    style="border:0" 
    allowfullscreen>
  </iframe>
</div>
`;
  }
}
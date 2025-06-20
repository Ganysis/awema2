import type { Client } from '@/types/client';
import type { EditorBlock } from '../store/editor-store';

export interface SchemaOrgData {
  localBusiness: any;
  website: any;
  breadcrumb?: any;
  service?: any;
  faqPage?: any;
  aggregateRating?: any;
  review?: any[];
  person?: any;
  offer?: any;
}

export class SchemaOrgService {
  /**
   * Génère tous les schemas nécessaires pour une page
   */
  generatePageSchemas(
    pageType: string,
    client: Client,
    blocks: EditorBlock[],
    additionalData?: any
  ): string {
    const schemas: any[] = [];
    
    // Schema LocalBusiness (toujours présent)
    schemas.push(this.generateLocalBusinessSchema(client));
    
    // Schema Website
    schemas.push(this.generateWebsiteSchema(client));
    
    // Schemas spécifiques selon le type de page
    switch (pageType) {
      case 'home':
        schemas.push(this.generateOrganizationSchema(client));
        if (client.testimonials?.length > 0) {
          schemas.push(...this.generateReviewSchemas(client));
        }
        break;
        
      case 'service':
        if (additionalData?.service) {
          schemas.push(this.generateServiceSchema(client, additionalData.service, additionalData.city));
        }
        schemas.push(this.generateBreadcrumbSchema([
          { name: 'Accueil', url: '/' },
          { name: 'Services', url: '/services' },
          { name: additionalData?.service?.name || 'Service', url: '#' }
        ], client));
        break;
        
      case 'local-seo':
        if (additionalData?.service && additionalData?.city) {
          schemas.push(this.generateLocalServiceSchema(client, additionalData.service, additionalData.city));
          schemas.push(this.generateGeoSchema(additionalData.city, additionalData.cityData));
        }
        break;
        
      case 'contact':
        schemas.push(this.generateContactPageSchema(client));
        break;
    }
    
    // Schema FAQ si bloc FAQ présent
    const faqBlock = blocks.find(b => b.type.includes('faq'));
    if (faqBlock && faqBlock.props.questions) {
      schemas.push(this.generateFAQSchema(faqBlock.props.questions));
    }
    
    // Schema AggregateOffer pour les prix
    const pricingBlock = blocks.find(b => b.type.includes('pricing'));
    if (pricingBlock && pricingBlock.props.plans) {
      schemas.push(this.generateAggregateOfferSchema(client, pricingBlock.props.plans));
    }
    
    // Retourner tous les schemas formatés
    return schemas.map(schema => 
      `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
    ).join('\n');
  }
  
  /**
   * Schema LocalBusiness complet avec toutes les propriétés SEO
   */
  private generateLocalBusinessSchema(client: Client): any {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": this.getSchemaBusinessType(client.businessType),
      "@id": `https://${client.domain || 'example.com'}/#business`,
      "name": client.businessName,
      "alternateName": client.businessNameShort,
      "description": client.description || `${client.businessName} - ${this.getBusinessTypeLabel(client.businessType)} professionnel à ${client.city}`,
      "url": `https://${client.domain || 'example.com'}`,
      "logo": {
        "@type": "ImageObject",
        "url": client.logo || `https://${client.domain}/logo.png`,
        "width": "600",
        "height": "60"
      },
      "image": client.photos?.slice(0, 3).map(photo => ({
        "@type": "ImageObject",
        "url": photo
      })) || [],
      "telephone": client.phone,
      "email": client.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": client.address,
        "addressLocality": client.city,
        "postalCode": client.postalCode,
        "addressRegion": this.getRegionFromPostalCode(client.postalCode),
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": client.coordinates?.lat || this.getDefaultCoordinates(client.city).lat,
        "longitude": client.coordinates?.lng || this.getDefaultCoordinates(client.city).lng
      },
      "openingHoursSpecification": this.generateOpeningHoursSpecification(client.schedule),
      "priceRange": "€€",
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Check"],
      "currenciesAccepted": "EUR",
      "areaServed": client.interventionCities.map(city => ({
        "@type": "City",
        "name": city,
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": this.getDepartmentFromCity(city)
        }
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Services ${client.businessType}`,
        "itemListElement": client.services.map((service, index) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.name,
            "description": service.description
          },
          "position": index + 1
        }))
      }
    };
    
    // Ajouter les certifications si présentes
    if (client.certifications?.length > 0) {
      schema.hasCredential = client.certifications.map(cert => ({
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": cert
      }));
    }
    
    // Ajouter les assurances
    if (client.insurance) {
      schema.knowsAbout = [
        "Assurance responsabilité civile professionnelle",
        "Garantie décennale"
      ];
    }
    
    // Ajouter l'aggregateRating si des avis existent
    if (client.testimonials?.length > 0) {
      const ratings = client.testimonials
        .filter(t => t.rating)
        .map(t => t.rating);
      
      if (ratings.length > 0) {
        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        schema.aggregateRating = {
          "@type": "AggregateRating",
          "ratingValue": avgRating.toFixed(1),
          "reviewCount": ratings.length,
          "bestRating": "5",
          "worstRating": "1"
        };
      }
    }
    
    // Ajouter les employés/fondateur si disponibles
    if (client.founder || client.teamSize) {
      schema.employee = [];
      if (client.founder) {
        schema.founder = {
          "@type": "Person",
          "name": client.founder,
          "jobTitle": "Fondateur"
        };
      }
      if (client.teamSize) {
        schema.numberOfEmployees = {
          "@type": "QuantitativeValue",
          "value": client.teamSize
        };
      }
    }
    
    return schema;
  }
  
  /**
   * Schema Website pour améliorer les sitelinks
   */
  private generateWebsiteSchema(client: Client): any {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `https://${client.domain || 'example.com'}/#website`,
      "url": `https://${client.domain || 'example.com'}`,
      "name": client.businessName,
      "description": client.description,
      "publisher": {
        "@id": `https://${client.domain || 'example.com'}/#business`
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `https://${client.domain || 'example.com'}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "fr-FR"
    };
  }
  
  /**
   * Schema Service pour une page service spécifique
   */
  private generateServiceSchema(client: Client, service: any, city?: string): any {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": service.name,
      "provider": {
        "@id": `https://${client.domain || 'example.com'}/#business`
      },
      "name": service.name,
      "description": service.description,
      "areaServed": city ? {
        "@type": "City",
        "name": city
      } : client.interventionCities.map(c => ({
        "@type": "City",
        "name": c
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": service.name,
        "itemListElement": service.features?.map((feature: string, index: number) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": feature
          },
          "position": index + 1
        })) || []
      }
    };
    
    // Ajouter le prix si disponible
    if (service.price) {
      schema.offers = {
        "@type": "Offer",
        "price": service.price.amount,
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.price.amount,
          "priceCurrency": "EUR",
          "valueAddedTaxIncluded": true
        }
      };
    }
    
    // Ajouter les catégories de service
    if (service.category) {
      schema.category = service.category;
    }
    
    // Temps d'exécution typique
    if (service.duration) {
      schema.serviceOutput = {
        "@type": "Product",
        "name": `${service.name} terminé`,
        "description": `Résultat de ${service.name}`
      };
      schema.timeRequired = service.duration;
    }
    
    return schema;
  }
  
  /**
   * Schema pour page locale (ville + service)
   */
  private generateLocalServiceSchema(client: Client, service: any, city: string): any {
    const baseSchema = this.generateServiceSchema(client, service, city);
    
    // Enrichir avec des données locales
    baseSchema.availableChannel = {
      "@type": "ServiceChannel",
      "serviceUrl": `https://${client.domain}/${this.slugify(city)}/${this.slugify(service.name)}`,
      "servicePhone": client.phone,
      "availableLanguage": {
        "@type": "Language",
        "name": "French",
        "alternateName": "fr"
      },
      "serviceLocation": {
        "@type": "Place",
        "name": city,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city
        }
      }
    };
    
    return baseSchema;
  }
  
  /**
   * Schema FAQ optimisé
   */
  private generateFAQSchema(questions: any[]): any {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer,
          "author": {
            "@type": "Organization",
            "name": "Expert technique"
          }
        }
      }))
    };
  }
  
  /**
   * Schema Reviews
   */
  private generateReviewSchemas(client: Client): any[] {
    if (!client.testimonials || client.testimonials.length === 0) return [];
    
    return client.testimonials.slice(0, 5).map(testimonial => ({
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@id": `https://${client.domain || 'example.com'}/#business`
      },
      "author": {
        "@type": "Person",
        "name": testimonial.name || 'Client vérifié'
      },
      "datePublished": testimonial.date || new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "description": testimonial.content,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating || 5,
        "bestRating": "5",
        "worstRating": "1"
      }
    }));
  }
  
  /**
   * Schema Breadcrumb pour la navigation
   */
  private generateBreadcrumbSchema(items: { name: string; url: string }[], client: Client): any {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith('http') ? item.url : `https://${client.domain || 'example.com'}${item.url}`
      }))
    };
  }
  
  /**
   * Schema Organization
   */
  private generateOrganizationSchema(client: Client): any {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `https://${client.domain || 'example.com'}/#organization`,
      "name": client.businessName,
      "url": `https://${client.domain || 'example.com'}`,
      "logo": {
        "@type": "ImageObject",
        "url": client.logo || `https://${client.domain}/logo.png`
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": client.phone,
          "contactType": "customer service",
          "areaServed": "FR",
          "availableLanguage": "French"
        },
        {
          "@type": "ContactPoint",
          "telephone": client.phone,
          "contactType": "emergency",
          "areaServed": "FR",
          "availableLanguage": "French",
          "hoursAvailable": client.emergency247 ? "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59" : "Mo-Fr 08:00-18:00"
        }
      ],
      "sameAs": [
        client.socialMedia?.facebook,
        client.socialMedia?.instagram,
        client.socialMedia?.linkedin,
        client.socialMedia?.youtube
      ].filter(Boolean)
    };
  }
  
  /**
   * Schema ContactPage
   */
  private generateContactPageSchema(client: Client): any {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": `https://${client.domain || 'example.com'}/contact`,
      "mainEntity": {
        "@id": `https://${client.domain || 'example.com'}/#business`
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": `https://${client.domain || 'example.com'}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": `https://${client.domain || 'example.com'}/contact`
          }
        ]
      }
    };
  }
  
  /**
   * Schema AggregateOffer pour les tarifs
   */
  private generateAggregateOfferSchema(client: Client, plans: any[]): any {
    const offers = plans.map(plan => ({
      "@type": "Offer",
      "name": plan.name,
      "description": plan.description,
      "price": plan.price.replace(/[^­\d]/g, ''),
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@id": `https://${client.domain || 'example.com'}/#business`
      }
    }));
    
    return {
      "@context": "https://schema.org",
      "@type": "AggregateOffer",
      "offerCount": plans.length,
      "offers": offers,
      "highPrice": Math.max(...offers.map(o => parseInt(o.price) || 0)),
      "lowPrice": Math.min(...offers.filter(o => parseInt(o.price) > 0).map(o => parseInt(o.price))),
      "priceCurrency": "EUR"
    };
  }
  
  /**
   * Schema Geo pour les pages locales
   */
  private generateGeoSchema(city: string, cityData: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": city,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData?.coordinates?.lat,
        "longitude": cityData?.coordinates?.lng
      },
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": cityData?.department || "France"
      }
    };
  }
  
  /**
   * Génère OpeningHoursSpecification à partir du schedule
   */
  private generateOpeningHoursSpecification(schedule: any): any[] {
    if (!schedule) {
      return [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "12:00"
        }
      ];
    }
    
    const dayMapping: Record<string, string> = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday"
    };
    
    const specifications: any[] = [];
    
    Object.entries(schedule).forEach(([day, hours]: [string, any]) => {
      if (hours && !hours.closed && dayMapping[day]) {
        specifications.push({
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": dayMapping[day],
          "opens": hours.open,
          "closes": hours.close
        });
      }
    });
    
    return specifications;
  }
  
  // Helpers
  private getSchemaBusinessType(businessType: string): string {
    const mapping: Record<string, string> = {
      electricien: "Electrician",
      plombier: "Plumber",
      menuisier: "GeneralContractor",
      macon: "GeneralContractor",
      peintre: "HousePainter",
      carreleur: "GeneralContractor",
      couvreur: "RoofingContractor",
      jardinier: "LandscapingService",
      serrurier: "Locksmith"
    };
    return mapping[businessType] || "LocalBusiness";
  }
  
  private getBusinessTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      electricien: 'électricien',
      plombier: 'plombier',
      menuisier: 'menuisier',
      macon: 'maçon',
      peintre: 'peintre',
      carreleur: 'carreleur',
      couvreur: 'couvreur',
      jardinier: 'jardinier',
      serrurier: 'serrurier'
    };
    return labels[type] || type;
  }
  
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  private getRegionFromPostalCode(postalCode: string): string {
    const dept = postalCode.substring(0, 2);
    const regions: Record<string, string> = {
      '75': 'Ile-de-France',
      '69': 'Auvergne-Rhône-Alpes',
      '13': 'Provence-Alpes-Côte d\'Azur',
      '33': 'Nouvelle-Aquitaine',
      '31': 'Occitanie'
    };
    return regions[dept] || 'France';
  }
  
  private getDepartmentFromCity(city: string): string {
    const departments: Record<string, string> = {
      'Paris': 'Paris',
      'Lyon': 'Rhône',
      'Marseille': 'Bouches-du-Rhône',
      'Toulouse': 'Haute-Garonne',
      'Nice': 'Alpes-Maritimes'
    };
    return departments[city] || 'France';
  }
  
  private getDefaultCoordinates(city: string): { lat: number; lng: number } {
    const coords: Record<string, { lat: number; lng: number }> = {
      'Paris': { lat: 48.8566, lng: 2.3522 },
      'Lyon': { lat: 45.764043, lng: 4.835659 },
      'Marseille': { lat: 43.296482, lng: 5.36978 },
      'Toulouse': { lat: 43.604652, lng: 1.444209 },
      'Nice': { lat: 43.710173, lng: 7.261953 }
    };
    return coords[city] || { lat: 48.8566, lng: 2.3522 };
  }
}

export const schemaOrgService = new SchemaOrgService();
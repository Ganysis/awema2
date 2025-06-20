import type { Client } from '@/types/client';

export interface SEOContent {
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  mainContent: string[];
  features: string[];
  faq: { question: string; answer: string }[];
  localContent: string;
  ctaText: string;
  structuredData: any;
}

export class SEOContentGenerator {
  /**
   * Génère du contenu SEO optimisé pour une page ville + service
   */
  generateLocalServiceContent(
    client: Client,
    city: string,
    service: any
  ): SEOContent {
    const businessType = this.getBusinessTypeLabel(client.businessType);
    const cityData = this.getCityData(city);
    
    // Générer titre SEO optimal (55-60 caractères)
    const title = this.generateOptimalTitle(service.name, city, client.businessName);
    
    // Meta description optimisée (150-160 caractères)
    const metaDescription = this.generateMetaDescription(
      service.name,
      city,
      client,
      cityData
    );
    
    // H1 unique et optimisé
    const h1 = `${service.name} à ${city} - ${client.businessName}`;
    
    // Introduction localisée (300+ mots)
    const introduction = this.generateIntroduction(
      service,
      city,
      client,
      cityData
    );
    
    // Contenu principal structuré (1200+ mots)
    const mainContent = this.generateMainContent(
      service,
      city,
      client,
      cityData
    );
    
    // Points forts localisés
    const features = this.generateLocalFeatures(
      service,
      city,
      client,
      cityData
    );
    
    // FAQ localisée
    const faq = this.generateLocalFAQ(
      service,
      city,
      client
    );
    
    // Contenu spécifique à la ville
    const localContent = this.generateCitySpecificContent(
      city,
      cityData,
      client
    );
    
    // CTA contextualisé
    const ctaText = `Besoin d'un ${businessType} pour ${service.name.toLowerCase()} à ${city} ? Contactez ${client.businessName} au ${client.phone} pour un devis gratuit !`;
    
    // Données structurées locales
    const structuredData = this.generateLocalStructuredData(
      service,
      city,
      client,
      cityData
    );
    
    return {
      title,
      metaDescription,
      h1,
      introduction,
      mainContent,
      features,
      faq,
      localContent,
      ctaText,
      structuredData
    };
  }
  
  private generateOptimalTitle(
    serviceName: string,
    city: string,
    businessName: string
  ): string {
    // Formats de titre testés pour le SEO local
    const templates = [
      `${serviceName} ${city} - ${businessName} ⚡ Devis Gratuit`,
      `${serviceName} à ${city} | ${businessName} - 24/7`,
      `${businessName} : ${serviceName} ${city} (⭐ 4.9/5)`,
      `${serviceName} ${city} pas cher - ${businessName}`
    ];
    
    // Sélectionner le template qui fait moins de 60 caractères
    for (const template of templates) {
      if (template.length <= 60) {
        return template;
      }
    }
    
    // Fallback court
    return `${serviceName} ${city} - ${businessName}`;
  }
  
  private generateMetaDescription(
    serviceName: string,
    city: string,
    client: Client,
    cityData: any
  ): string {
    const businessType = this.getBusinessTypeLabel(client.businessType);
    const urgency = client.emergency247 ? '24h/24 7j/7' : 'intervention rapide';
    
    const templates = [
      `${serviceName} à ${city} ${cityData.postalCodes ? `(${cityData.postalCodes[0]})` : ''} avec ${client.businessName}. ${businessType.charAt(0).toUpperCase() + businessType.slice(1)} certifié, ${urgency}. ✅ Devis gratuit ☎ ${client.phone}`,
      `Besoin d'un ${businessType} pour ${serviceName.toLowerCase()} à ${city} ? ${client.businessName} intervient ${urgency}. ${client.yearsExperience} ans d'expérience, tarifs compétitifs.`,
      `${client.businessName} : votre ${businessType} spécialiste ${serviceName.toLowerCase()} sur ${city} et ${cityData.department || 'environs'}. Garantie ${client.guarantee || '2 ans'}, satisfaction client 98%.`
    ];
    
    // Sélectionner une description de 150-160 caractères
    for (const template of templates) {
      if (template.length >= 150 && template.length <= 160) {
        return template;
      }
    }
    
    return templates[0].substring(0, 160);
  }
  
  private generateIntroduction(
    service: any,
    city: string,
    client: Client,
    cityData: any
  ): string {
    const businessType = this.getBusinessTypeLabel(client.businessType);
    const neighborhoodInfo = cityData.neighborhoods ? 
      `Nous intervenons dans tous les quartiers de ${city}, notamment ${cityData.neighborhoods.slice(0, 3).join(', ')}.` : '';
    
    return `
<p>Vous recherchez un <strong>${businessType} qualifié pour ${service.name.toLowerCase()} à ${city}</strong> ? 
${client.businessName} est votre partenaire de confiance pour tous vos besoins en ${service.category || 'travaux'}. 
Fort de <strong>${client.yearsExperience} ans d'expérience</strong> dans le ${cityData.department || 'secteur'}, 
nous proposons des services de ${service.name.toLowerCase()} de haute qualité, adaptés aux spécificités de ${city}.</p>

<p>${neighborhoodInfo} Notre équipe de ${businessType}s certifiés connaît parfaitement les particularités 
architecturales ${cityData.architecturalStyle ? `${cityData.architecturalStyle} de ${city}` : 'locales'}, 
ce qui nous permet d'intervenir efficacement sur tous types de bâtiments, qu'il s'agisse de ${cityData.buildingTypes || 'maisons individuelles, appartements ou locaux commerciaux'}.</p>

<p>Avec ${client.businessName}, bénéficiez d'un service ${service.name.toLowerCase()} <strong>rapide, fiable et au meilleur prix</strong> à ${city}. 
Nous nous engageons à vous fournir un <strong>devis gratuit et détaillé sous 24h</strong>, 
sans aucune surprise. ${client.emergency247 ? `Notre service d'urgence est disponible <strong>24h/24 et 7j/7</strong> pour répondre à vos besoins immédiats.` : ''}</p>
    `.trim();
  }
  
  private generateMainContent(
    service: any,
    city: string,
    client: Client,
    cityData: any
  ): string[] {
    const sections = [];
    
    // Section 1: Expertise locale
    sections.push(`
<h2>Notre expertise ${service.name.toLowerCase()} à ${city}</h2>
<p>${client.businessName} s'est imposé comme <strong>le spécialiste ${service.name.toLowerCase()} de référence à ${city}</strong>. 
Notre connaissance approfondie du terrain local nous permet d'adapter nos interventions aux spécificités de chaque quartier. 
${cityData.climate ? `Les conditions climatiques ${cityData.climate} de ${city} nécessitent des solutions adaptées que nous maîtrisons parfaitement.` : ''}</p>

<p>Nos ${this.getBusinessTypeLabel(client.businessType)}s sont formés aux dernières normes en vigueur et utilisent des 
<strong>matériaux de qualité premium</strong> pour garantir la durabilité de nos interventions. 
Chaque projet ${service.name.toLowerCase()} est réalisé avec le souci du détail qui fait notre réputation à ${city} depuis ${client.yearsExperience} ans.</p>
    `);
    
    // Section 2: Services détaillés
    sections.push(`
<h2>Nos services ${service.name.toLowerCase()} complets à ${city}</h2>
<p>Chez ${client.businessName}, nous proposons une gamme complète de services ${service.name.toLowerCase()} pour répondre à tous vos besoins à ${city} :</p>
<ul>
${service.features?.map((f: string) => `  <li><strong>${f}</strong> - réalisé par nos experts certifiés</li>`).join('\n') || ''}
  <li><strong>Diagnostic gratuit</strong> - évaluation complète de vos besoins</li>
  <li><strong>Intervention rapide</strong> - dans les ${cityData.avgInterventionTime || '2 heures'} à ${city}</li>
  <li><strong>Garantie ${client.guarantee || '2 ans'}</strong> - sur tous nos travaux</li>
</ul>
    `);
    
    // Section 3: Processus de travail
    sections.push(`
<h2>Notre processus de travail à ${city}</h2>
<p>Pour garantir votre satisfaction, nous avons mis en place un <strong>processus de travail rigoureux</strong> :</p>
<ol>
  <li><strong>Premier contact</strong> : Vous nous appelez au ${client.phone} ou remplissez notre formulaire en ligne</li>
  <li><strong>Diagnostic sur place</strong> : Un expert se déplace gratuitement à votre domicile à ${city}</li>
  <li><strong>Devis détaillé</strong> : Nous vous remettons un devis clair et transparent sous 24h</li>
  <li><strong>Planification</strong> : Nous convenons ensemble d'une date d'intervention qui vous convient</li>
  <li><strong>Réalisation</strong> : Nos équipes réalisent les travaux dans le respect des délais</li>
  <li><strong>Contrôle qualité</strong> : Vérification complète et nettoyage du chantier</li>
  <li><strong>Suivi</strong> : Nous restons disponibles pour tout besoin après intervention</li>
</ol>
    `);
    
    // Section 4: Avantages compétitifs
    sections.push(`
<h2>Pourquoi choisir ${client.businessName} pour ${service.name.toLowerCase()} à ${city} ?</h2>
<p>En choisissant ${client.businessName}, vous bénéficiez de <strong>nombreux avantages exclusifs</strong> :</p>

<h3>✅ Expertise locale reconnue</h3>
<p>Avec ${client.yearsExperience} ans d'expérience à ${city}, nous connaissons parfaitement les spécificités locales. 
Nos équipes sont composées de ${this.getBusinessTypeLabel(client.businessType)}s <strong>certifiés et régulièrement formés</strong> aux dernières techniques.</p>

<h3>💰 Tarifs transparents et compétitifs</h3>
<p>Nous proposons des <strong>prix justes et transparents</strong> pour ${service.name.toLowerCase()} à ${city}. 
Pas de coûts cachés, pas de surprises : le devis que nous vous remettons est <strong>ferme et définitif</strong>.</p>

<h3>⏱ Rapidité d'intervention</h3>
<p>${client.emergency247 ? `Service d'urgence disponible <strong>24h/24 et 7j/7</strong>` : `Intervention rapide sous <strong>48h maximum</strong>`} à ${city} et ses environs. 
Nous comprenons l'importance de résoudre rapidement vos problèmes de ${service.category || 'travaux'}.</p>

<h3>🌟 Satisfaction garantie</h3>
<p>Nous nous engageons sur la <strong>qualité de nos prestations</strong>. Tous nos travaux de ${service.name.toLowerCase()} 
sont garantis ${client.guarantee || '2 ans'}. Votre satisfaction est notre priorité absolue.</p>
    `);
    
    // Section 5: Zone d'intervention
    sections.push(`
<h2>Notre zone d'intervention autour de ${city}</h2>
<p>Basés à ${city}, nous intervenons rapidement dans <strong>tout le ${cityData.department || 'secteur'}</strong>. 
Notre zone de couverture inclut :</p>
<ul>
  <li><strong>${city} centre-ville</strong> et tous ses quartiers</li>
  ${cityData.nearCities?.map((c: string) => `<li><strong>${c}</strong> - intervention sous ${this.getInterventionTime(city, c)}</li>`).join('\n') || ''}
  <li>Et toutes les communes limitrophes dans un rayon de ${client.maxDistance || '30'}km</li>
</ul>
<p>N'hésitez pas à nous contacter au <strong>${client.phone}</strong> pour vérifier notre disponibilité dans votre secteur.</p>
    `);
    
    return sections;
  }
  
  private generateLocalFeatures(
    service: any,
    city: string,
    client: Client,
    cityData: any
  ): string[] {
    return [
      `Intervention rapide à ${city} - ${cityData.avgInterventionTime || 'moins de 2h'}`,
      `Connaissance parfaite du ${cityData.department || 'secteur'} et de ses spécificités`,
      `Équipe locale basée à ${city} depuis ${client.yearsExperience} ans`,
      `Adapté aux ${cityData.buildingTypes || 'tous types de bâtiments'} de ${city}`,
      `Respect des normes locales et ${cityData.localRegulations || 'réglementations en vigueur'}`,
      `Partenariats avec les fournisseurs locaux de ${city}`,
      `Service client en français, disponible ${client.emergency247 ? '24/7' : 'du lundi au samedi'}`,
      `Devis gratuit et sans engagement pour ${city} et environs`
    ];
  }
  
  private generateLocalFAQ(
    service: any,
    city: string,
    client: Client
  ): { question: string; answer: string }[] {
    const businessType = this.getBusinessTypeLabel(client.businessType);
    
    return [
      {
        question: `Combien coûte ${service.name.toLowerCase()} à ${city} ?`,
        answer: `Le coût de ${service.name.toLowerCase()} à ${city} dépend de plusieurs facteurs : l'ampleur des travaux, les matériaux utilisés, et la complexité de l'intervention. Chez ${client.businessName}, nous proposons des tarifs compétitifs à partir de ${service.price?.amount || '50'}€. Nous vous offrons un devis gratuit et personnalisé sous 24h pour connaître le prix exact de votre projet.`
      },
      {
        question: `Quel est le délai d'intervention pour ${service.name.toLowerCase()} à ${city} ?`,
        answer: `${client.businessName} s'engage à intervenir rapidement à ${city}. Pour les urgences, nous pouvons être chez vous ${client.emergency247 ? 'en moins d\'une heure, 24h/24 et 7j/7' : 'dans les 2 heures pendant nos horaires d\'ouverture'}. Pour les travaux planifiés, nous convenons ensemble d'un créneau qui vous convient, généralement sous 48h.`
      },
      {
        question: `Proposez-vous une garantie pour ${service.name.toLowerCase()} à ${city} ?`,
        answer: `Absolument ! Tous nos travaux de ${service.name.toLowerCase()} à ${city} sont garantis ${client.guarantee || '2 ans'}. Cette garantie couvre les défauts de matériaux et de main-d'œuvre. En cas de problème, nous intervenons gratuitement pour résoudre le souci. C'est notre engagement qualité envers nos clients de ${city}.`
      },
      {
        question: `Comment choisir un bon ${businessType} pour ${service.name.toLowerCase()} à ${city} ?`,
        answer: `Pour choisir un ${businessType} fiable à ${city}, vérifiez : 1) Les certifications et assurances (${client.businessName} est certifié et assuré), 2) L'expérience locale (nous avons ${client.yearsExperience} ans d'expérience à ${city}), 3) Les avis clients (consultez nos ${client.testimonials?.length || '50'}+ avis positifs), 4) La transparence des tarifs (devis détaillé gratuit), 5) La garantie offerte (${client.guarantee || '2 ans'} chez nous).`
      },
      {
        question: `Intervenez-vous le week-end et les jours fériés à ${city} ?`,
        answer: client.emergency247 ? 
          `Oui, ${client.businessName} propose un service d'urgence 24h/24, 7j/7 à ${city}, y compris les week-ends et jours fériés. Pour les urgences ${service.name.toLowerCase()}, appelez-nous au ${client.phone} à tout moment. Des frais supplémentaires peuvent s'appliquer pour les interventions hors horaires normaux.` :
          `${client.businessName} intervient du lundi au samedi à ${city}. Pour les urgences ${service.name.toLowerCase()} le week-end, nous avons un service d'astreinte. Contactez-nous au ${client.phone} pour connaître nos disponibilités et les éventuels frais supplémentaires.`
      },
      {
        question: `Quels sont les quartiers de ${city} où vous intervenez ?`,
        answer: `${client.businessName} couvre l'ensemble de ${city} et ses environs pour ${service.name.toLowerCase()}. Nous intervenons dans tous les quartiers, du centre-ville aux zones périphériques. Notre équipe locale connaît parfaitement ${city}, ce qui nous permet d'arriver rapidement chez vous, quel que soit votre quartier.`
      }
    ];
  }
  
  private generateCitySpecificContent(
    city: string,
    cityData: any,
    client: Client
  ): string {
    const content = [];
    
    if (cityData.landmarks) {
      content.push(`
<h3>Nos références à ${city}</h3>
<p>${client.businessName} est fier d'avoir réalisé des interventions à proximité des principaux sites de ${city}, 
notamment près de ${cityData.landmarks.slice(0, 3).join(', ')}. Notre connaissance approfondie de la ville 
nous permet d'optimiser nos déplacements et d'intervenir rapidement.</p>
      `);
    }
    
    if (cityData.demographics) {
      content.push(`
<h3>Un service adapté à la population de ${city}</h3>
<p>Avec ${cityData.demographics.population} habitants, ${city} ${cityData.demographics.growth}. 
${client.businessName} a su adapter ses services pour répondre aux besoins spécifiques de cette population dynamique, 
que ce soit pour les ${cityData.demographics.mainHousingType || 'logements individuels et collectifs'}.</p>
      `);
    }
    
    if (cityData.economicInfo) {
      content.push(`
<h3>Acteur économique local à ${city}</h3>
<p>${client.businessName} participe activement à l'économie locale de ${city}. 
Nous employons ${client.teamSize || '5'} personnes de la région et travaillons avec des fournisseurs locaux, 
contribuant ainsi au dynamisme économique ${cityData.economicInfo}.</p>
      `);
    }
    
    return content.join('\n');
  }
  
  private generateLocalStructuredData(
    service: any,
    city: string,
    client: Client,
    cityData: any
  ): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": `${service.name} à ${city}`,
      "provider": {
        "@type": "LocalBusiness",
        "name": client.businessName,
        "image": client.logo,
        "telephone": client.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": client.address,
          "addressLocality": city,
          "postalCode": cityData.postalCodes?.[0] || client.postalCode,
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": cityData.coordinates?.lat,
          "longitude": cityData.coordinates?.lng
        },
        "priceRange": "€€"
      },
      "areaServed": {
        "@type": "City",
        "name": city,
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": cityData.department
        }
      },
      "offers": {
        "@type": "Offer",
        "price": service.price?.amount || "50",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": service.price?.amount || "50",
          "priceCurrency": "EUR"
        }
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": `https://${client.domain}/${city.toLowerCase()}/${this.slugify(service.name)}`,
        "servicePhone": client.phone,
        "availableLanguage": "fr"
      }
    };
  }
  
  /**
   * Génère du contenu pour la page d'accueil
   */
  generateHomepageContent(client: Client): SEOContent {
    const businessType = this.getBusinessTypeLabel(client.businessType);
    const mainCity = client.city;
    
    const title = `${client.businessName} - ${businessType.charAt(0).toUpperCase() + businessType.slice(1)} ${mainCity} | Devis Gratuit`;
    
    const metaDescription = `${client.businessName}, votre ${businessType} de confiance à ${mainCity}. ✅ ${client.yearsExperience} ans d'expérience ✅ Intervention rapide ✅ Devis gratuit. Appelez le ${client.phone}`;
    
    const h1 = `${client.businessName} - Votre ${businessType} à ${mainCity}`;
    
    const introduction = `
<p>Bienvenue chez <strong>${client.businessName}</strong>, votre ${businessType} de confiance à ${mainCity} et dans tout le ${client.department || 'secteur'}. 
Depuis ${client.yearsExperience} ans, nous mettons notre expertise au service des particuliers et professionnels pour tous leurs besoins en ${client.businessType}.</p>

<p>Notre équipe de ${client.teamSize || '10'} ${businessType}s qualifiés intervient ${client.emergency247 ? '24h/24 et 7j/7' : 'rapidement'} 
pour vous apporter des solutions durables et au meilleur prix. Avec ${client.testimonials?.length || '100'}+ clients satisfaits, 
${client.businessName} s'impose comme la référence du ${client.businessType} à ${mainCity}.</p>
    `;
    
    const mainContent = [
      `
<h2>Nos services de ${client.businessType} à ${mainCity}</h2>
<p>${client.businessName} propose une gamme complète de services pour répondre à tous vos besoins :</p>
<ul>
${client.services.slice(0, 6).map(s => `  <li><strong>${s.name}</strong> - ${s.description}</li>`).join('\n')}
</ul>
<p>Chaque intervention est réalisée dans le respect des normes en vigueur, avec des matériaux de qualité 
et une garantie de ${client.guarantee || '2 ans'} sur tous nos travaux.</p>
      `,
      `
<h2>Pourquoi choisir ${client.businessName} ?</h2>
<p>En nous choisissant comme votre ${businessType} à ${mainCity}, vous bénéficiez de :</p>
<ul>
  <li>✅ <strong>${client.yearsExperience} ans d'expérience</strong> dans le ${client.businessType}</li>
  <li>✅ <strong>Devis gratuit et transparent</strong> sous 24h</li>
  <li>✅ <strong>Intervention rapide</strong> ${client.emergency247 ? '24h/24 et 7j/7' : 'sous 48h'}</li>
  <li>✅ <strong>Garantie ${client.guarantee || '2 ans'}</strong> sur tous nos travaux</li>
  <li>✅ <strong>Équipe certifiée</strong> et régulièrement formée</li>
  <li>✅ <strong>Prix compétitifs</strong> sans surprise</li>
</ul>
      `,
      `
<h2>Notre zone d'intervention autour de ${mainCity}</h2>
<p>Basés à ${mainCity}, nous intervenons dans un rayon de ${client.maxDistance || '30'}km, couvrant notamment :</p>
<ul>
${client.interventionCities.slice(0, 10).map(city => `  <li>${city}</li>`).join('\n')}
</ul>
<p>N'hésitez pas à nous contacter pour vérifier notre disponibilité dans votre commune.</p>
      `
    ];
    
    const features = [
      `${client.yearsExperience} ans d'expérience à ${mainCity}`,
      `Équipe de ${client.teamSize || '10'} ${businessType}s qualifiés`,
      `Plus de ${client.testimonials?.length || '100'} clients satisfaits`,
      client.emergency247 ? 'Service d\'urgence 24/7' : 'Intervention sous 48h',
      `Devis gratuit et sans engagement`,
      `Garantie ${client.guarantee || '2 ans'} sur tous travaux`,
      'Matériaux de qualité premium',
      'Respect des normes en vigueur'
    ];
    
    const faq = [
      {
        question: `Quels sont vos tarifs de ${businessType} à ${mainCity} ?`,
        answer: `Nos tarifs dépendent de la nature et de l'ampleur des travaux. Nous proposons toujours un devis gratuit et détaillé avant toute intervention. Nos prix sont compétitifs et transparents, sans coûts cachés.`
      },
      {
        question: `Intervenez-vous en urgence à ${mainCity} ?`,
        answer: client.emergency247 ? 
          `Oui, nous proposons un service d'urgence 24h/24 et 7j/7 à ${mainCity} et ses environs. Appelez-nous au ${client.phone} pour une intervention rapide.` :
          `Nous intervenons rapidement pour les urgences pendant nos heures d'ouverture. Pour les situations critiques, nous faisons notre maximum pour intervenir dans les plus brefs délais.`
      },
      {
        question: `Êtes-vous assuré et certifié ?`,
        answer: `Oui, ${client.businessName} est pleinement assuré en responsabilité civile professionnelle et décennale. Nos ${businessType}s sont certifiés et régulièrement formés aux dernières normes.`
      }
    ];
    
    return {
      title,
      metaDescription,
      h1,
      introduction,
      mainContent,
      features,
      faq,
      localContent: '',
      ctaText: `Besoin d'un ${businessType} à ${mainCity} ? Contactez ${client.businessName} dès maintenant !`,
      structuredData: this.generateHomepageStructuredData(client)
    };
  }
  
  private generateHomepageStructuredData(client: Client): any {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": client.businessName,
      "image": client.logo,
      "@id": `https://${client.domain}`,
      "url": `https://${client.domain}`,
      "telephone": client.phone,
      "email": client.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": client.address,
        "addressLocality": client.city,
        "postalCode": client.postalCode,
        "addressCountry": "FR"
      },
      "openingHoursSpecification": this.generateOpeningHours(client.schedule),
      "priceRange": "€€",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "currenciesAccepted": "EUR",
      "areaServed": client.interventionCities.map(city => ({
        "@type": "City",
        "name": city
      })),
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Services ${client.businessType}`,
        "itemListElement": client.services.map(service => ({
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }))
      }
    };
  }
  
  // Données des villes (normalement dans une DB)
  private getCityData(city: string): any {
    const cityDatabase: Record<string, any> = {
      'Paris': {
        postalCodes: ['75001', '75002', '75003', '75004', '75005'],
        department: 'Ile-de-France',
        population: '2.2 millions',
        neighborhoods: ['Marais', 'Montmartre', 'Belleville', 'Saint-Germain'],
        landmarks: ['Tour Eiffel', 'Arc de Triomphe', 'Notre-Dame'],
        buildingTypes: 'immeubles haussmanniens, appartements modernes, monuments historiques',
        climate: 'tempérées',
        architecturalStyle: 'haussmannien',
        avgInterventionTime: '1h',
        nearCities: ['Boulogne-Billancourt', 'Neuilly-sur-Seine', 'Levallois-Perret'],
        coordinates: { lat: 48.8566, lng: 2.3522 }
      },
      'Lyon': {
        postalCodes: ['69001', '69002', '69003', '69004', '69005'],
        department: 'Rhône-Alpes',
        population: '516 000',
        neighborhoods: ['Vieux Lyon', 'Presqu\'île', 'Croix-Rousse', 'Part-Dieu'],
        landmarks: ['Basilique de Fourvière', 'Parc de la Tête d\'Or', 'Place Bellecour'],
        buildingTypes: 'immeubles anciens, traboules, constructions modernes',
        climate: 'semi-continentales',
        architecturalStyle: 'renaissance et moderne',
        avgInterventionTime: '1h30',
        nearCities: ['Villeurbanne', 'Vénissieux', 'Caluire-et-Cuire'],
        coordinates: { lat: 45.764043, lng: 4.835659 }
      },
      'Marseille': {
        postalCodes: ['13001', '13002', '13003', '13004', '13005'],
        department: 'Bouches-du-Rhône',
        population: '870 000',
        neighborhoods: ['Vieux-Port', 'Le Panier', 'La Canebière', 'Castellane'],
        landmarks: ['Notre-Dame de la Garde', 'Vieux-Port', 'Château d\'If'],
        buildingTypes: 'maisons provençales, immeubles méditerranéens, villas',
        climate: 'méditerranéennes',
        architecturalStyle: 'méditerranéen',
        avgInterventionTime: '1h30',
        nearCities: ['Aix-en-Provence', 'Aubagne', 'La Ciotat'],
        coordinates: { lat: 43.296482, lng: 5.36978 }
      }
    };
    
    return cityDatabase[city] || {
      postalCodes: [],
      department: 'France',
      avgInterventionTime: '2h',
      nearCities: [],
      buildingTypes: 'maisons individuelles et immeubles'
    };
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
  
  private getInterventionTime(fromCity: string, toCity: string): string {
    // Logique simplifiée - normalement calculé via API de distance
    return '30min';
  }
  
  private generateOpeningHours(schedule: any): any[] {
    // TODO: Convertir le format schedule en OpeningHoursSpecification
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
}

export const seoContentGenerator = new SEOContentGenerator();
// Bibliothèque de contenu ultra-complète pour génération optimale

export class ContentLibraryService {
  // Variations de titres par métier et contexte
  private headlines = {
    plumber: {
      home: {
        urgent: [
          "Urgence Plomberie {city} - Intervention en 30 minutes 24h/7j",
          "SOS Fuite d'eau {city} ? {companyName} intervient immédiatement",
          "Plombier d'urgence à {city} - Disponible maintenant au {phone}",
          "Dépannage plomberie express {city} - {companyName} à votre service",
          "Problème de plomberie ? Intervention rapide garantie à {city}",
          "Plombier {city} : Urgence 24/24 et 7/7 - Devis gratuit",
          "{companyName} - Votre plombier d'urgence de confiance à {city}",
          "Fuite ? Bouchage ? {companyName} dépanne en 30 min à {city}",
          "Service d'urgence plomberie {city} - Tarifs transparents",
          "Besoin d'un plombier maintenant ? {companyName} arrive vite"
        ],
        professional: [
          "{companyName} - Expert plombier à {city} depuis {years} ans",
          "Plomberie professionnelle à {city} - Qualité et garantie",
          "Votre artisan plombier de confiance à {city} - {companyName}",
          "Installation et dépannage plomberie {city} - Travail soigné",
          "{companyName} : Plombier certifié RGE à {city}",
          "Solutions plomberie durables à {city} - Devis gratuit",
          "Plombier qualifié {city} - {years} ans d'expérience",
          "Entreprise de plomberie {city} - {companyName} à votre écoute",
          "Maître plombier à {city} - Expertise et savoir-faire",
          "Plomberie générale {city} - {companyName}, la référence locale"
        ],
        local: [
          "Plombier à {city} et environs - {companyName} près de chez vous",
          "Votre plombier local à {city} - Intervention rapide",
          "{companyName} - Artisan plombier du quartier à {city}",
          "Plomberie de proximité {city} - Connaissance du secteur",
          "Plombier {city} centre et alentours - Devis gratuit",
          "Service plomberie local {city} - {companyName} à 10 min",
          "Artisan plombier {city} - Présent depuis {years} ans",
          "Votre voisin plombier à {city} - Service personnalisé",
          "Plombier du coin à {city} - Prix justes, travail honnête",
          "{companyName} - Le plombier que {city} recommande"
        ],
        premium: [
          "Plomberie haut de gamme {city} - {companyName} Excellence",
          "Services plomberie premium à {city} - Finitions parfaites",
          "{companyName} - L'art de la plomberie à {city}",
          "Plombier d'exception {city} - Prestations sur mesure",
          "Solutions plomberie luxe {city} - {companyName} Prestige",
          "Maître artisan plombier {city} - Créations uniques",
          "Plomberie design et innovation à {city} - {companyName}",
          "Expert plombier haute gamme {city} - Matériaux nobles",
          "{companyName} - Plomberie d'architecte à {city}",
          "Services plomberie exclusifs {city} - Satisfaction garantie"
        ]
      },
      service: {
        installation: [
          "Installation {pageName} à {city} - {companyName} Expert",
          "{pageName} par {companyName} - Pose professionnelle {city}",
          "Service {pageName} {city} - Installation garantie",
          "Spécialiste {pageName} à {city} - Devis gratuit",
          "{companyName} : Expert {pageName} depuis {years} ans"
        ],
        repair: [
          "Réparation {pageName} {city} - Intervention rapide",
          "Dépannage {pageName} à {city} - {companyName} répare tout",
          "{pageName} en panne ? {companyName} intervient à {city}",
          "Service réparation {pageName} {city} - Diagnostic gratuit",
          "SOS {pageName} {city} - {companyName} à votre secours"
        ],
        maintenance: [
          "Entretien {pageName} {city} - Prolongez la durée de vie",
          "Maintenance {pageName} à {city} par {companyName}",
          "Contrat entretien {pageName} {city} - Tranquillité assurée",
          "{companyName} : Votre partenaire entretien {pageName}",
          "Service maintenance {pageName} {city} - Évitez les pannes"
        ]
      },
      local: {
        residential: [
          "Plombier {localCity} - {companyName} au service des habitants",
          "{companyName} : Votre plombier de quartier à {localCity}",
          "Dépannage plomberie {localCity} - Artisan local disponible",
          "Plomberie {localCity} - {companyName} connaît votre secteur",
          "Service plombier rapide à {localCity} - Prix locaux"
        ],
        commercial: [
          "Plombier professionnel {localCity} - Entreprises et commerces",
          "{companyName} : Plomberie commerciale à {localCity}",
          "Services plomberie pro {localCity} - Devis entreprise",
          "Maintenance plomberie {localCity} pour professionnels",
          "Plombier {localCity} - Solutions pour votre business"
        ]
      }
    },
    electrician: {
      home: {
        urgent: [
          "Électricien urgence {city} - Panne de courant résolue rapidement",
          "SOS Électricité {city} - {companyName} intervient 24h/24",
          "Court-circuit ? {companyName} dépanne immédiatement à {city}",
          "Urgence électrique {city} - Intervention en 30 minutes",
          "Panne électrique {city} ? Appelez {companyName} maintenant",
          "Électricien d'urgence {city} - Diagnostic et réparation rapide",
          "{companyName} - Dépannage électrique express à {city}",
          "Coupure de courant {city} - Service urgence {phone}",
          "Problème électrique urgent ? {companyName} arrive vite",
          "Électricité en panne {city} - Intervention immédiate garantie"
        ],
        professional: [
          "{companyName} - Électricien certifié Qualifelec à {city}",
          "Installation électrique {city} - Normes NFC 15-100 respectées",
          "Votre électricien professionnel à {city} depuis {years} ans",
          "Électricité générale {city} - {companyName} Expert",
          "Mise aux normes électriques {city} - Sécurité garantie",
          "{companyName} : Maître électricien agréé à {city}",
          "Solutions électriques innovantes {city} - Devis gratuit",
          "Électricien qualifié {city} - Installations et rénovations",
          "Entreprise d'électricité {city} - {companyName} certifié",
          "Expert électricien {city} - Conseil et réalisation"
        ],
        safety: [
          "Sécurité électrique {city} - {companyName} protège votre foyer",
          "Mise en sécurité électrique {city} - Évitez les risques",
          "{companyName} : Diagnostic sécurité électrique à {city}",
          "Protection électrique {city} - Installation différentiels",
          "Électricien {city} - Votre sécurité est notre priorité",
          "Conformité électrique {city} - {companyName} vous accompagne",
          "Prévention risques électriques {city} - Audit gratuit",
          "Sécurisation installation électrique {city} - Normes 2024",
          "{companyName} - Expert sécurité électrique à {city}",
          "Électricité aux normes {city} - Certificat Consuel"
        ]
      }
    },
    // Ajouter tous les autres métiers...
  };

  // Descriptions de services enrichies
  private serviceDescriptions = {
    plumber: {
      'débouchage canalisation': [
        {
          tone: 'urgent',
          text: "Canalisation bouchée ? {companyName} intervient en urgence avec un équipement professionnel haute pression. Débouchage garanti sans casse, diagnostic caméra offert. Intervention 24h/7j à {city}."
        },
        {
          tone: 'technical',
          text: "Service de débouchage professionnel utilisant les dernières technologies : hydrocureur haute pression, furet électrique, caméra d'inspection. {companyName} diagnostique et élimine tous types de bouchons à {city}."
        },
        {
          tone: 'reassuring',
          text: "Ne laissez pas un bouchon gâcher votre journée. {companyName} débouche vos canalisations en douceur, sans endommager vos installations. Service propre et efficace à {city}, satisfaction garantie."
        }
      ],
      'recherche de fuite': [
        {
          tone: 'expert',
          text: "Détection de fuite sans destruction par {companyName}. Utilisation de technologies avancées : caméra thermique, gaz traceur, corrélateur acoustique. Localisation précise et réparation durable à {city}."
        },
        {
          tone: 'economic',
          text: "Une fuite cachée peut coûter cher. {companyName} la détecte rapidement pour éviter surconsommation et dégâts des eaux. Intervention rapide à {city}, devis transparent."
        }
      ]
    }
  };

  // Paragraphes modulaires
  private contentBlocks = {
    expertise: {
      years: [
        "Fort de {years} années d'expérience dans le domaine, {companyName} a développé une expertise reconnue sur {city} et sa région.",
        "Depuis {years} ans, {companyName} met son savoir-faire au service des habitants de {city}, garantissant des interventions de qualité.",
        "Avec {years} ans de métier, notre équipe maîtrise parfaitement tous les aspects de notre profession à {city}.",
        "{years} années d'expérience nous ont permis de devenir la référence en matière de {businessType} à {city}.",
        "L'expérience acquise pendant {years} ans fait de {companyName} votre partenaire de confiance à {city}."
      ],
      certifications: [
        "Certifié RGE et Qualibat, {companyName} garantit des travaux conformes aux normes les plus strictes.",
        "Nos certifications professionnelles attestent de notre engagement qualité et de notre expertise technique.",
        "Entreprise certifiée, nous respectons scrupuleusement les normes en vigueur pour votre sécurité.",
        "Les labels qualité obtenus par {companyName} sont le gage d'un travail professionnel et durable.",
        "Agréé par les organismes officiels, {companyName} s'engage sur la qualité de ses prestations."
      ],
      team: [
        "Notre équipe de techniciens qualifiés intervient avec professionnalisme et courtoisie à {city}.",
        "Des artisans passionnés et formés régulièrement composent l'équipe de {companyName}.",
        "Chaque membre de notre équipe est sélectionné pour ses compétences et son sérieux.",
        "L'équipe {companyName} : des professionnels à votre écoute, disponibles et réactifs.",
        "Nos techniciens expérimentés mettent leur expertise au service de vos projets à {city}."
      ]
    },
    trust: {
      guarantee: [
        "Tous nos travaux sont couverts par une garantie décennale pour votre tranquillité d'esprit.",
        "La garantie {companyName} : satisfaction assurée ou nous revenons gratuitement.",
        "Nous garantissons nos interventions et assurons un suivi après travaux.",
        "Votre satisfaction est garantie par contrat, c'est l'engagement {companyName}.",
        "Garantie pièces et main d'œuvre sur toutes nos prestations à {city}."
      ],
      testimonials: [
        "Des centaines de clients satisfaits témoignent de la qualité de nos services à {city}.",
        "La confiance de nos clients est notre plus belle récompense depuis {years} ans.",
        "Recommandé par vos voisins, {companyName} est l'artisan préféré de {city}.",
        "98% de clients satisfaits : les chiffres parlent d'eux-mêmes.",
        "Les avis positifs de nos clients reflètent notre engagement qualité."
      ],
      transparency: [
        "Chez {companyName}, transparence rime avec confiance : devis détaillé et prix fixe garanti.",
        "Pas de surprise sur la facture : nous détaillons chaque prestation avant intervention.",
        "Tarifs clairs et justes, communiqués avant toute intervention à {city}.",
        "La transparence est notre philosophie : vous savez exactement ce que vous payez.",
        "Devis gratuit et sans engagement, prix fermes et définitifs."
      ]
    },
    urgency: {
      availability: [
        "Disponible 24h/24 et 7j/7, {companyName} répond à toutes vos urgences à {city}.",
        "Week-end, jours fériés, nuit : nous sommes toujours là quand vous en avez besoin.",
        "Service d'urgence permanent pour les situations critiques à {city}.",
        "Une urgence ne prévient pas : {companyName} non plus, toujours prêt à intervenir.",
        "Astreinte 24/7 pour garantir une intervention rapide en cas d'urgence."
      ],
      speed: [
        "Intervention en moins de 30 minutes sur {city} et ses environs immédiats.",
        "Rapidité d'intervention : nos équipes sont mobilisées pour arriver au plus vite.",
        "Temps de réponse record : {companyName} s'engage sur des délais courts.",
        "En cas d'urgence, chaque minute compte : nous intervenons en un temps record.",
        "Véhicules équipés et géolocalisés pour une intervention express à {city}."
      ]
    },
    local: {
      proximity: [
        "Implantés à {city} depuis {years} ans, nous connaissons parfaitement votre secteur.",
        "Artisan local, {companyName} privilégie la proximité et le service personnalisé.",
        "Votre voisin artisan : présent dans votre quartier, disponible rapidement.",
        "Entreprise locale de {city}, nous participons à la vie économique de notre ville.",
        "La proximité est notre force : intervention rapide et connaissance du terrain."
      ],
      knowledge: [
        "Notre connaissance approfondie de {city} nous permet d'intervenir efficacement.",
        "Familiers avec les spécificités locales, nous adaptons nos solutions à {city}.",
        "L'expertise locale de {companyName} : un atout pour vos projets à {city}.",
        "Nous connaissons les particularités techniques des bâtiments de {city}.",
        "Ancrage local fort : {companyName} comprend les besoins spécifiques de {city}."
      ]
    },
    quality: {
      materials: [
        "{companyName} utilise exclusivement des matériaux de première qualité, garantis et certifiés.",
        "Nous sélectionnons les meilleures marques pour assurer la durabilité de nos installations.",
        "Matériaux professionnels haut de gamme pour des résultats qui durent dans le temps.",
        "La qualité des matériaux fait la différence : nous ne faisons aucun compromis.",
        "Partenariats avec les plus grands fabricants pour vous offrir le meilleur."
      ],
      workmanship: [
        "Le savoir-faire de {companyName} se traduit par des finitions impeccables et durables.",
        "Travail soigné et minutieux : la marque de fabrique de nos artisans.",
        "Chaque détail compte : nous apportons un soin particulier à toutes nos réalisations.",
        "L'excellence technique au service de vos projets à {city}.",
        "Perfectionnistes dans l'âme, nous visons l'excellence sur chaque chantier."
      ],
      process: [
        "Notre processus de travail rigoureux garantit un résultat optimal à chaque intervention.",
        "De l'étude à la réalisation, {companyName} suit un protocole qualité strict.",
        "Méthodologie éprouvée pour des chantiers maîtrisés de A à Z.",
        "Organisation millimétrée pour respecter délais et budget convenus.",
        "Process qualité certifié pour votre satisfaction totale."
      ]
    },
    innovation: {
      technology: [
        "{companyName} investit dans les dernières technologies pour vous offrir le meilleur service.",
        "Équipements de pointe et techniques innovantes au service de vos projets.",
        "L'innovation technologique pour des solutions plus efficaces et durables.",
        "Toujours à la pointe : nous adoptons les meilleures innovations du secteur.",
        "Technologies modernes pour diagnostic précis et interventions optimales."
      ],
      ecology: [
        "Engagé pour l'environnement, {companyName} privilégie les solutions éco-responsables.",
        "Solutions durables et respectueuses de l'environnement à {city}.",
        "Réduisez votre empreinte écologique avec nos installations économes.",
        "Le développement durable au cœur de nos préoccupations professionnelles.",
        "Matériaux écologiques et techniques vertes pour préserver notre planète."
      ]
    }
  };

  // FAQ enrichies par métier et contexte
  private faqTemplates = {
    plumber: {
      general: [
        {
          q: "Comment obtenir rapidement un devis pour mes travaux de plomberie ?",
          a: "Contactez {companyName} au {phone} ou via notre formulaire en ligne. Nous nous déplaçons gratuitement à {city} pour évaluer vos besoins et vous remettre un devis détaillé sous 24h."
        },
        {
          q: "Quels sont vos tarifs pour une intervention de plomberie ?",
          a: "Nos tarifs dépendent de la nature de l'intervention. Pour une urgence, comptez à partir de 80€ TTC. Pour des travaux planifiés, nous établissons toujours un devis gratuit et transparent avant toute intervention à {city}."
        },
        {
          q: "Intervenez-vous pour les urgences plomberie le week-end ?",
          a: "Oui, {companyName} assure un service d'urgence 24h/24 et 7j/7, week-ends et jours fériés inclus. Nous intervenons en moins d'une heure sur {city} et ses environs."
        },
        {
          q: "Proposez-vous des garanties sur vos travaux de plomberie ?",
          a: "Absolument. Tous nos travaux sont couverts par notre garantie décennale. Les pièces sont garanties 2 ans et nous offrons une garantie satisfaction : si le problème persiste, nous revenons gratuitement."
        },
        {
          q: "Quels moyens de paiement acceptez-vous ?",
          a: "{companyName} accepte les paiements par chèque, carte bancaire, virement et espèces. Pour les gros travaux, nous proposons des facilités de paiement en plusieurs fois sans frais."
        }
      ],
      technical: [
        {
          q: "Comment détecter une fuite d'eau cachée ?",
          a: "Les signes incluent : augmentation anormale de la facture d'eau, traces d'humidité, baisse de pression. {companyName} utilise des caméras thermiques et détecteurs acoustiques pour localiser précisément les fuites sans casser."
        },
        {
          q: "Que faire en cas de canalisation bouchée ?",
          a: "N'utilisez pas de produits chimiques agressifs. Contactez {companyName} : nous intervenons avec un matériel professionnel (furet, hydrocureur) pour déboucher efficacement sans endommager vos canalisations."
        },
        {
          q: "À quelle fréquence faire entretenir son chauffe-eau ?",
          a: "Un entretien annuel est recommandé pour prolonger la durée de vie de votre chauffe-eau et optimiser ses performances. {companyName} propose des contrats d'entretien avantageux à {city}."
        }
      ],
      local: [
        {
          q: "Dans quelles zones intervenez-vous autour de {city} ?",
          a: "{companyName} intervient à {city} et dans un rayon de 30 km alentour. Nous couvrons l'ensemble du département pour les projets importants. Frais de déplacement offerts dans {city} intra-muros."
        },
        {
          q: "Connaissez-vous les spécificités des installations de {city} ?",
          a: "Parfaitement. Présents à {city} depuis {years} ans, nous connaissons les particularités locales : type de canalisations, qualité de l'eau, réglementations municipales. Cette expertise locale est un vrai plus."
        }
      ]
    }
  };

  // Méthodes pour obtenir du contenu varié
  getHeadline(businessType: string, pageType: string, tone: string, context: any): string {
    const headlines = this.headlines[businessType]?.[pageType]?.[tone] || this.headlines[businessType]?.home?.professional || [];
    const randomIndex = Math.floor(Math.random() * headlines.length);
    return this.replaceVariables(headlines[randomIndex] || '', context);
  }

  getServiceDescription(businessType: string, serviceName: string, tone: string, context: any): string {
    const descriptions = this.serviceDescriptions[businessType]?.[serviceName.toLowerCase()] || [];
    const matching = descriptions.find(d => d.tone === tone) || descriptions[0];
    return this.replaceVariables(matching?.text || '', context);
  }

  getContentBlock(category: string, subcategory: string, context: any): string {
    const blocks = this.contentBlocks[category]?.[subcategory] || [];
    const randomIndex = Math.floor(Math.random() * blocks.length);
    return this.replaceVariables(blocks[randomIndex] || '', context);
  }

  getFAQ(businessType: string, category: string, context: any): Array<{question: string, answer: string}> {
    const faqs = this.faqTemplates[businessType]?.[category] || this.faqTemplates[businessType]?.general || [];
    return faqs.map(faq => ({
      question: this.replaceVariables(faq.q, context),
      answer: this.replaceVariables(faq.a, context)
    }));
  }

  // Générateur de contenu composite
  generateRichContent(businessType: string, pageType: string, context: any): string {
    const blocks = [];
    
    // Introduction avec headline varié
    const tone = this.selectTone(context);
    blocks.push(this.getHeadline(businessType, pageType, tone, context));
    
    // Paragraphe d'expertise
    blocks.push(this.getContentBlock('expertise', 'years', context));
    
    // Paragraphe de confiance
    blocks.push(this.getContentBlock('trust', 'guarantee', context));
    
    // Paragraphe local si pertinent
    if (pageType === 'local') {
      blocks.push(this.getContentBlock('local', 'proximity', context));
    }
    
    // Paragraphe qualité
    blocks.push(this.getContentBlock('quality', 'workmanship', context));
    
    return blocks.join('\n\n');
  }

  private selectTone(context: any): string {
    // Logique pour sélectionner le ton approprié
    if (context.emergency247) return 'urgent';
    if (context.yearsOfExperience > 20) return 'professional';
    if (context.localFocus) return 'local';
    return 'professional';
  }

  private replaceVariables(template: string, context: any): string {
    return template
      .replace(/\{companyName\}/g, context.companyName || '')
      .replace(/\{city\}/g, context.city || '')
      .replace(/\{localCity\}/g, context.localCity || context.city || '')
      .replace(/\{businessType\}/g, context.businessType || '')
      .replace(/\{years\}/g, context.years || context.yearsOfExperience || '10')
      .replace(/\{phone\}/g, context.phone || '')
      .replace(/\{pageName\}/g, context.pageName || '')
      .replace(/\{year\}/g, new Date().getFullYear().toString());
  }
}

export const contentLibrary = new ContentLibraryService();
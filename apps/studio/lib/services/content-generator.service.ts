import { ClientFormData } from '@/types/client-form';
import { GeneratedPage } from './ai-site-generator.service';
import { getBusinessFeatures, isUrgencyBusiness } from './business-templates';
import { contentLibrary } from './content-library.service';

interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
}

interface ContentTemplate {
  title: string[];
  description: string[];
  keywords: string[];
  headlines: string[];
}

export class ContentGeneratorService {
  private contentTemplates: Record<string, Record<string, ContentTemplate>>;

  constructor() {
    this.contentTemplates = this.initializeTemplates();
  }

  async generatePageSEO(page: GeneratedPage, formData: ClientFormData, businessType: string): Promise<PageSEO> {
    const companyName = formData.businessInfo?.companyName || 'Notre entreprise';
    const city = formData.contact?.address?.city || formData.serviceArea?.cities?.[0] || 'votre ville';
    const mainService = formData.services?.mainServices?.[0]?.name || formData.businessInfo?.businessType || 'services';
    
    // Déterminer le type de page
    const pageType = this.detectPageType(page);
    
    // Obtenir le template approprié
    const template = this.getContentTemplate(businessType, pageType);
    
    // Générer le contenu SEO
    const seo: PageSEO = {
      title: this.generateTitle(template, page, { companyName, city, mainService }),
      description: this.generateDescription(template, page, { companyName, city, mainService }),
      keywords: this.generateKeywords(template, page, { companyName, city, mainService, businessType })
    };

    return seo;
  }

  async generateHeadline(pageType: string, businessType: string, context: any): Promise<string> {
    // Utiliser la bibliothèque enrichie si disponible
    const tone = this.selectTone(context);
    const libraryHeadline = contentLibrary.getHeadline(businessType, pageType, tone, context);
    
    if (libraryHeadline) {
      return libraryHeadline;
    }
    
    // Fallback sur les templates de base
    const template = this.getContentTemplate(businessType, pageType);
    const headlines = template.headlines;
    const headline = headlines[Math.floor(Math.random() * headlines.length)];
    return this.replaceVariables(headline, context);
  }

  async generateParagraph(topic: string, businessType: string, context: any): Promise<string> {
    // Utiliser la bibliothèque enrichie pour du contenu plus varié
    const richContent = contentLibrary.generateRichContent(businessType, topic, context);
    if (richContent) {
      return richContent;
    }
    
    // Fallback sur les templates de base
    const templates = this.getParagraphTemplates(businessType, topic);
    const template = templates[Math.floor(Math.random() * templates.length)];
    return this.replaceVariables(template, context);
  }

  async generateServiceDescription(serviceName: string, businessType: string, context: any): Promise<string> {
    // Descriptions personnalisées par service et business type
    const serviceDescriptions: Record<string, Record<string, string>> = {
      plumber: {
        'débouchage canalisation': `Notre équipe à ${context.city} intervient rapidement pour déboucher vos canalisations. Avec ${context.companyName}, fini les éviers bouchés et les WC qui refoulent. Nous utilisons du matériel professionnel haute pression pour un résultat durable.`,
        'recherche de fuite': `Fuite d'eau invisible ? ${context.companyName} localise précisément l'origine de votre fuite à ${context.city} grâce à nos détecteurs thermiques et acoustiques dernière génération. Économisez sur votre facture d'eau !`,
        'installation sanitaire': `Installation complète ou rénovation de votre salle de bain à ${context.city}. ${context.companyName} pose vos équipements sanitaires avec précision : douche, baignoire, WC, lavabo. Travail soigné garanti.`,
        'chauffe-eau': `Votre chauffe-eau est en panne ? ${context.companyName} répare ou remplace votre ballon d'eau chaude à ${context.city}. Installation rapide de chauffe-eau électrique, gaz ou thermodynamique. Retrouvez l'eau chaude rapidement !`,
        'dépannage plomberie': `Fuite, engorgement, panne ? ${context.companyName} dépanne tous vos problèmes de plomberie à ${context.city}. Intervention express, diagnostic gratuit, réparation durable. Votre confort est notre priorité.`,
        'rénovation salle de bain': `Transformez votre salle de bain avec ${context.companyName} à ${context.city}. Du design à la réalisation, nous gérons tout : plomberie, carrelage, électricité. Créons ensemble votre espace bien-être.`
      },
      electrician: {
        'mise aux normes': `${context.companyName} met votre installation électrique aux normes NFC 15-100 à ${context.city}. Tableau électrique, différentiels, mise à la terre : nous sécurisons votre habitation. Certificat de conformité inclus.`,
        'tableau électrique': `Remplacement ou rénovation de votre tableau électrique à ${context.city}. ${context.companyName} installe des tableaux modernes avec disjoncteurs différentiels pour protéger vos équipements et votre famille.`,
        'dépannage électrique': `Panne de courant ? Court-circuit ? ${context.companyName} dépanne votre installation électrique 24h/7j à ${context.city}. Diagnostic rapide et réparation immédiate par nos électriciens qualifiés.`,
        'installation domotique': `Transformez votre maison en maison connectée avec ${context.companyName} à ${context.city}. Éclairage intelligent, volets automatiques, chauffage connecté : contrôlez tout depuis votre smartphone.`,
        'éclairage': `${context.companyName} crée votre ambiance lumineuse idéale à ${context.city}. LED, spots encastrés, lustres design : nous installons tous types d'éclairages. Économies d'énergie garanties avec nos solutions modernes.`,
        'installation électrique': `Construction ou rénovation ? ${context.companyName} réalise votre installation électrique complète à ${context.city}. Câblage, prises, interrupteurs : tout est pensé pour votre confort et sécurité.`
      },
      carpenter: {
        'pose de parquet': `${context.companyName} pose tous types de parquets à ${context.city} : massif, contrecollé, stratifié. Pose clouée, collée ou flottante selon vos besoins. Finition impeccable pour un sol qui dure dans le temps.`,
        'aménagement sur mesure': `Créez l'intérieur de vos rêves avec ${context.companyName} à ${context.city}. Bibliothèques, dressings, placards sur mesure : nous concevons et fabriquons des meubles adaptés à votre espace.`,
        'escalier bois': `Fabrication et pose d'escaliers en bois sur mesure à ${context.city}. ${context.companyName} crée des escaliers uniques : droit, tournant, hélicoïdal. Essence de bois au choix, finition personnalisée.`,
        'porte et fenêtre': `Installation de portes et fenêtres bois à ${context.city} par ${context.companyName}. Menuiseries sur mesure pour une isolation optimale. Bois certifié, finition haute qualité, pose dans les règles de l'art.`,
        'terrasse bois': `${context.companyName} construit votre terrasse bois à ${context.city}. Bois exotique ou composite, nous créons votre espace extérieur idéal. Structure solide, esthétique soignée, entretien minimal.`,
        'cuisine sur mesure': `Votre cuisine de rêve par ${context.companyName} à ${context.city}. Conception 3D, fabrication artisanale, pose millimétrique. Chaque détail compte pour créer votre cuisine unique et fonctionnelle.`
      },
      painter: {
        'peinture intérieure': `Redonnez vie à votre intérieur avec ${context.companyName} à ${context.city}. Peinture murs et plafonds, choix des couleurs, protection des sols. Finition mate, satinée ou brillante selon vos goûts.`,
        'peinture extérieure': `${context.companyName} protège et embellit vos façades à ${context.city}. Peinture extérieure résistante aux intempéries, traitement anti-mousse inclus. Votre maison retrouve son éclat d'origine.`,
        'enduit décoratif': `Sublimez vos murs avec les enduits décoratifs de ${context.companyName} à ${context.city}. Stuc, tadelakt, béton ciré : créez une ambiance unique. Application professionnelle pour un rendu parfait.`,
        'ravalement façade': `Ravalement de façade complet par ${context.companyName} à ${context.city}. Nettoyage, réparation, peinture : nous redonnons une seconde jeunesse à votre bâtiment. Devis gratuit et détaillé.`,
        'papier peint': `${context.companyName} pose tous types de papiers peints à ${context.city}. Traditionnel, intissé, vinyle, panoramique : nous maîtrisons toutes les techniques. Raccords parfaits, finition impeccable.`,
        'décoration intérieure': `Confiez votre décoration à ${context.companyName} à ${context.city}. Conseil couleurs, techniques décoratives, réalisation complète. Nous transformons vos espaces selon vos envies et votre personnalité.`
      },
      mason: {
        'maçonnerie générale': `${context.companyName} réalise tous vos travaux de maçonnerie à ${context.city}. Construction de murs, dalles, fondations : nous bâtissons solide et durable. Respect des normes et des délais.`,
        'extension maison': `Agrandissez votre espace de vie avec ${context.companyName} à ${context.city}. Extension maison en parpaing, brique ou ossature. Étude personnalisée, permis de construire, réalisation clé en main.`,
        'terrasse extérieure': `Création de terrasses extérieures par ${context.companyName} à ${context.city}. Terrasse béton, carrelée ou en pierre naturelle. Étanchéité garantie, finition soignée pour profiter de votre extérieur.`,
        'rénovation': `${context.companyName} rénove votre bien immobilier à ${context.city}. Démolition, reconstruction, mise aux normes : nous transformons l'ancien en neuf. Accompagnement de A à Z dans votre projet.`,
        'construction piscine': `Réalisez votre projet piscine avec ${context.companyName} à ${context.city}. Terrassement, structure béton, étanchéité, finitions : nous construisons votre piscine de A à Z. Baignade garantie pour l'été !`,
        'mur de clôture': `${context.companyName} construit vos murs de clôture à ${context.city}. Parpaing, pierre, béton décoratif : nous sécurisons et embellissons votre propriété. Fondations solides, finition soignée.`
      }
    };

    const businessDescriptions = serviceDescriptions[businessType] || serviceDescriptions.plumber;
    const normalizedService = serviceName.toLowerCase();
    
    // Chercher une correspondance exacte ou partielle
    for (const [key, description] of Object.entries(businessDescriptions)) {
      if (normalizedService.includes(key) || key.includes(normalizedService)) {
        return description;
      }
    }
    
    // Si pas de correspondance, utiliser la description générique personnalisée
    return `${context.companyName} propose ses services de ${serviceName} à ${context.city}. Nos professionnels qualifiés interviennent avec sérieux et efficacité. Devis gratuit, travail garanti, satisfaction assurée.`;
  }

  async generateCTA(urgency: boolean, businessType: string, context: any): Promise<string> {
    const templates = urgency ? this.getUrgencyCTATemplates() : this.getStandardCTATemplates();
    const template = templates[Math.floor(Math.random() * templates.length)];
    return this.replaceVariables(template, context);
  }

  private detectPageType(page: GeneratedPage): string {
    if (page.isHomePage) return 'home';
    if (page.slug.startsWith('/services/')) return 'service';
    if (page.slug.startsWith('/zones/')) return 'local';
    if (page.slug === '/contact') return 'contact';
    if (page.slug === '/urgence') return 'urgency';
    if (page.slug.includes('realisation') || page.slug.includes('galerie')) return 'portfolio';
    return 'default';
  }

  private generateTitle(template: ContentTemplate, page: GeneratedPage, context: any): string {
    const titles = template.title;
    let title = titles[Math.floor(Math.random() * titles.length)];
    
    // Ajouter le nom de la page si ce n'est pas l'accueil
    if (!page.isHomePage) {
      context.pageName = page.name;
    }
    
    return this.replaceVariables(title, context);
  }

  private generateDescription(template: ContentTemplate, page: GeneratedPage, context: any): string {
    const descriptions = template.description;
    let description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // Personnaliser selon le type de page
    if (page.slug.startsWith('/zones/')) {
      // Extraire la ville du slug
      const cityFromSlug = page.name.split(' ').slice(-1)[0];
      context.localCity = cityFromSlug;
    }
    
    return this.replaceVariables(description, context);
  }

  private generateKeywords(template: ContentTemplate, page: GeneratedPage, context: any): string[] {
    const baseKeywords = [...template.keywords];
    const keywords: string[] = [];
    
    // Ajouter des mots-clés spécifiques
    keywords.push(context.businessType);
    keywords.push(`${context.businessType} ${context.city}`);
    
    if (context.mainService) {
      keywords.push(context.mainService.toLowerCase());
      keywords.push(`${context.mainService} ${context.city}`);
    }
    
    // Ajouter les mots-clés du template
    baseKeywords.forEach(keyword => {
      keywords.push(this.replaceVariables(keyword, context));
    });
    
    // Ajouter des mots-clés de page locale
    if (page.slug.startsWith('/zones/')) {
      const cityFromSlug = page.name.split(' ').slice(-1)[0];
      keywords.push(`${context.businessType} ${cityFromSlug}`);
      keywords.push(`artisan ${cityFromSlug}`);
      keywords.push(`dépannage ${cityFromSlug}`);
    }
    
    return [...new Set(keywords)]; // Éliminer les doublons
  }

  private replaceVariables(template: string, context: any): string {
    return template
      .replace(/\{companyName\}/g, context.companyName || '')
      .replace(/\{city\}/g, context.city || '')
      .replace(/\{mainService\}/g, context.mainService || '')
      .replace(/\{businessType\}/g, context.businessType || '')
      .replace(/\{pageName\}/g, context.pageName || '')
      .replace(/\{localCity\}/g, context.localCity || context.city || '')
      .replace(/\{phone\}/g, context.phone || '')
      .replace(/\{email\}/g, context.email || '')
      .replace(/\{year\}/g, new Date().getFullYear().toString());
  }

  private getContentTemplate(businessType: string, pageType: string): ContentTemplate {
    const businessTemplates = this.contentTemplates[businessType] || this.contentTemplates.default;
    return businessTemplates[pageType] || businessTemplates.default;
  }

  private selectTone(context: any): string {
    // Sélectionner le ton approprié selon le contexte
    if (context.emergency247 || isUrgencyBusiness(context.businessType)) return 'urgent';
    if (context.yearsOfExperience && parseInt(context.yearsOfExperience) > 20) return 'professional';
    if (context.localCity || context.localFocus) return 'local';
    if (context.premium) return 'premium';
    return 'professional';
  }

  private initializeTemplates(): Record<string, Record<string, ContentTemplate>> {
    return {
      plumber: {
        home: {
          title: [
            '{companyName} - Plombier à {city} | Dépannage 24h/7j',
            'Plomberie {city} - {companyName} | Urgence et Installation',
            '{companyName} | Votre Plombier de Confiance à {city}'
          ],
          description: [
            '{companyName}, votre plombier à {city}. Intervention rapide 24h/7j pour tous vos problèmes de plomberie. Dépannage, installation, rénovation. Devis gratuit.',
            'Besoin d\'un plombier à {city} ? {companyName} intervient en urgence pour fuites, débouchage, installation sanitaire. Tarifs transparents, satisfaction garantie.',
            'Plombier professionnel à {city}. {companyName} assure dépannage d\'urgence, réparation fuite d\'eau, débouchage canalisation. Intervention rapide, prix justes.'
          ],
          keywords: [
            'plombier {city}',
            'dépannage plomberie',
            'urgence plombier',
            'fuite eau',
            'débouchage canalisation',
            'installation sanitaire'
          ],
          headlines: [
            'Votre Plombier d\'Urgence à {city} - Intervention 24h/7j',
            'Problème de Plomberie ? {companyName} Intervient Rapidement',
            'Expert Plombier à {city} - Dépannage et Installation'
          ]
        },
        service: {
          title: [
            '{pageName} à {city} - {companyName}',
            '{companyName} : Expert en {pageName} à {city}',
            '{pageName} par {companyName} - Plombier {city}'
          ],
          description: [
            '{companyName} propose ses services de {pageName} à {city} et environs. Intervention rapide, travail soigné, tarifs compétitifs. Contactez-nous pour un devis gratuit.',
            'Spécialiste {pageName} à {city}. {companyName} garantit une intervention professionnelle et des solutions durables. Urgence disponible 24h/7j.',
            'Besoin d\'un service de {pageName} ? {companyName}, plombier à {city}, assure des prestations de qualité avec garantie. Devis gratuit sur demande.'
          ],
          keywords: [
            '{pageName} {city}',
            '{pageName} plombier',
            'service {pageName}',
            'tarif {pageName}'
          ],
          headlines: [
            'Service {pageName} Professionnel à {city}',
            '{pageName} : Intervention Rapide et Efficace',
            'Expert {pageName} - Solutions Durables'
          ]
        },
        local: {
          title: [
            'Plombier {localCity} - {companyName} | Intervention Rapide',
            '{companyName} : Votre Plombier à {localCity} et Environs',
            'Dépannage Plomberie {localCity} - {companyName} 24h/7j'
          ],
          description: [
            '{companyName} intervient à {localCity} pour tous vos besoins en plomberie. Dépannage urgent, réparation, installation. Plombier local disponible 24h/7j.',
            'Plombier professionnel basé près de {localCity}. {companyName} assure interventions rapides, devis gratuits, tarifs transparents. Urgence plomberie 7j/7.',
            'Vous cherchez un plombier à {localCity} ? {companyName} propose dépannage, débouchage, recherche de fuite. Intervention en 30 minutes, satisfaction garantie.'
          ],
          keywords: [
            'plombier {localCity}',
            'urgence plomberie {localCity}',
            'dépannage {localCity}',
            'artisan plombier {localCity}'
          ],
          headlines: [
            'Plombier à {localCity} - Intervention en 30 Minutes',
            'Urgence Plomberie {localCity} - Disponible 24h/7j',
            'Votre Artisan Plombier de Proximité à {localCity}'
          ]
        },
        urgency: {
          title: [
            'Urgence Plombier {city} 24h/7j - {companyName}',
            'Plombier Urgence {city} - Intervention Immédiate',
            '{companyName} : Dépannage Plomberie Urgent {city}'
          ],
          description: [
            'Urgence plomberie à {city} ? {companyName} intervient 24h/7j en moins de 30 minutes. Fuite d\'eau, canalisation bouchée, panne chauffe-eau. Tarif clair, sans surprise.',
            'Service d\'urgence plomberie {city} disponible 24h/24, 7j/7. {companyName} répare rapidement fuites, débouche canalisations, répare sanitaires. Devis immédiat.',
            '{companyName}, votre plombier d\'urgence à {city}. Intervention express pour tout problème : fuite, engorgement, panne. Techniciens qualifiés, prix transparents.'
          ],
          keywords: [
            'urgence plombier {city}',
            'plombier 24h/24',
            'dépannage urgent',
            'intervention immédiate'
          ],
          headlines: [
            'Urgence Plomberie ? Nous Intervenons en 30 Minutes !',
            'Fuite d\'Eau ? Canalisation Bouchée ? Appelez-Nous !',
            'Service d\'Urgence 24h/7j - Intervention Immédiate'
          ]
        },
        default: {
          title: ['{pageName} - {companyName} | Plombier {city}'],
          description: ['{companyName} : {pageName}. Services de plomberie professionnels à {city}. Contactez-nous pour plus d\'informations.'],
          keywords: ['{pageName}', 'plombier {city}'],
          headlines: ['{pageName} par {companyName}']
        }
      },
      electrician: {
        home: {
          title: [
            '{companyName} - Électricien à {city} | Dépannage et Installation',
            'Électricien {city} - {companyName} | Mise aux Normes, Urgence',
            '{companyName} | Électricien Certifié à {city}'
          ],
          description: [
            '{companyName}, électricien qualifié à {city}. Dépannage électrique, mise aux normes, installation. Intervention rapide, devis gratuit. Certifié Qualifelec.',
            'Besoin d\'un électricien à {city} ? {companyName} assure dépannage urgent, rénovation électrique, mise en conformité. Travail garanti, tarifs transparents.',
            'Électricien professionnel à {city}. {companyName} intervient pour panne électrique, tableau électrique, installation domotique. Service 24h/7j disponible.'
          ],
          keywords: [
            'électricien {city}',
            'dépannage électrique',
            'mise aux normes',
            'installation électrique',
            'tableau électrique',
            'urgence électricien'
          ],
          headlines: [
            'Votre Électricien de Confiance à {city}',
            'Installation et Dépannage Électrique - Certifié Qualifelec',
            'Électricien Expert à {city} - Intervention Rapide'
          ]
        },
        service: {
          title: [
            '{pageName} à {city} - {companyName} Électricien',
            '{companyName} : Spécialiste {pageName} à {city}',
            '{pageName} - Électricien {companyName} {city}'
          ],
          description: [
            '{companyName} réalise vos travaux de {pageName} à {city}. Électricien certifié, respect des normes NFC 15-100, garantie décennale. Devis gratuit rapide.',
            'Expert en {pageName} à {city}, {companyName} assure des prestations de qualité. Diagnostic gratuit, solutions adaptées, tarifs compétitifs.',
            'Pour vos besoins en {pageName}, faites confiance à {companyName}, électricien à {city}. Intervention professionnelle, matériel de qualité, satisfaction garantie.'
          ],
          keywords: [
            '{pageName} {city}',
            '{pageName} électricien',
            'tarif {pageName}',
            'entreprise {pageName}'
          ],
          headlines: [
            '{pageName} par des Professionnels Certifiés',
            'Service {pageName} - Qualité et Sécurité Garanties',
            '{pageName} : Solutions Sur Mesure pour Votre Projet'
          ]
        },
        local: {
          title: [
            'Électricien {localCity} - {companyName} | Service Local',
            '{companyName} : Électricien à {localCity} et Alentours',
            'Dépannage Électrique {localCity} - {companyName}'
          ],
          description: [
            '{companyName}, votre électricien local à {localCity}. Dépannage rapide, installation, rénovation électrique. Devis gratuit, intervention sous 2h.',
            'Électricien professionnel intervenant à {localCity}. {companyName} assure tous travaux électriques : mise aux normes, dépannage, installation. Tarifs clairs.',
            'Besoin d\'un électricien à {localCity} ? {companyName} propose services complets : urgence, rénovation, domotique. Technicien qualifié, prix justes.'
          ],
          keywords: [
            'électricien {localCity}',
            'dépannage électrique {localCity}',
            'artisan électricien {localCity}',
            'urgence électricité {localCity}'
          ],
          headlines: [
            'Électricien à {localCity} - Intervention Rapide',
            'Votre Électricien de Proximité à {localCity}',
            'Service Électrique Local {localCity} - Disponible 7j/7'
          ]
        },
        default: {
          title: ['{pageName} - {companyName} | Électricien {city}'],
          description: ['{companyName} : {pageName}. Services d\'électricité professionnels à {city}. Contactez-nous pour un devis gratuit.'],
          keywords: ['{pageName}', 'électricien {city}'],
          headlines: ['{pageName} par {companyName}']
        }
      },
      // Template par défaut pour les autres métiers
      default: {
        home: {
          title: [
            '{companyName} - {businessType} à {city} | Artisan Professionnel',
            '{businessType} {city} - {companyName} | Devis Gratuit',
            '{companyName} | Votre {businessType} de Confiance à {city}'
          ],
          description: [
            '{companyName}, votre {businessType} à {city}. Services professionnels de qualité, intervention rapide, devis gratuit. Artisan qualifié à votre service.',
            '{businessType} professionnel à {city}. {companyName} assure tous vos travaux avec sérieux et expertise. Garantie décennale, tarifs compétitifs.',
            'Besoin d\'un {businessType} à {city} ? {companyName} propose services complets, travail soigné, respect des délais. Satisfaction client garantie.'
          ],
          keywords: [
            '{businessType} {city}',
            'artisan {businessType}',
            'devis {businessType}',
            'entreprise {businessType}'
          ],
          headlines: [
            'Votre {businessType} Professionnel à {city}',
            '{companyName} - Expert {businessType} depuis {year}',
            'Artisan {businessType} de Confiance - Devis Gratuit'
          ]
        },
        service: {
          title: [
            '{pageName} à {city} - {companyName}',
            '{companyName} : {pageName} par un Pro',
            '{pageName} - {businessType} {companyName} {city}'
          ],
          description: [
            '{companyName} propose {pageName} à {city} et environs. Travail de qualité, tarifs transparents, satisfaction garantie. Contactez-nous pour un devis.',
            'Service {pageName} par {companyName}, {businessType} à {city}. Expertise reconnue, matériaux de qualité, respect des délais. Devis gratuit rapide.',
            'Pour vos besoins en {pageName}, faites appel à {companyName}. Artisan {businessType} qualifié à {city}, nous garantissons un travail soigné.'
          ],
          keywords: [
            '{pageName} {city}',
            '{pageName} {businessType}',
            'prix {pageName}',
            'devis {pageName}'
          ],
          headlines: [
            '{pageName} - Travail de Qualité Garanti',
            'Service {pageName} par des Professionnels',
            '{pageName} : Expertise et Savoir-Faire'
          ]
        },
        local: {
          title: [
            '{businessType} {localCity} - {companyName}',
            '{companyName} : Artisan {businessType} à {localCity}',
            '{businessType} près de {localCity} - {companyName}'
          ],
          description: [
            '{companyName}, votre {businessType} local à {localCity}. Services professionnels, devis gratuit, intervention rapide. Artisan de confiance près de chez vous.',
            'Artisan {businessType} intervenant à {localCity} et alentours. {companyName} assure travaux de qualité, tarifs justes, satisfaction garantie.',
            'Vous cherchez un {businessType} à {localCity} ? {companyName} propose expertise locale, services complets, prix compétitifs. Contactez-nous !'
          ],
          keywords: [
            '{businessType} {localCity}',
            'artisan {localCity}',
            '{businessType} près de {localCity}',
            'entreprise {businessType} {localCity}'
          ],
          headlines: [
            '{businessType} à {localCity} - Service de Proximité',
            'Votre Artisan {businessType} Local à {localCity}',
            '{companyName} - {businessType} près de {localCity}'
          ]
        },
        default: {
          title: ['{pageName} - {companyName}'],
          description: ['{companyName} : {pageName}. Services professionnels à {city}. Contactez-nous pour plus d\'informations.'],
          keywords: ['{pageName}', '{businessType} {city}'],
          headlines: ['{pageName}']
        }
      }
    };
  }

  private getParagraphTemplates(businessType: string, topic: string): string[] {
    const templates: Record<string, Record<string, string[]>> = {
      plumber: {
        expertise: [
          'Avec plus de 20 ans d\'expérience dans la plomberie, {companyName} maîtrise toutes les techniques modernes et traditionnelles. Notre équipe de plombiers qualifiés intervient sur tous types d\'installations, du simple dépannage à la rénovation complète de votre système de plomberie.',
          'Chez {companyName}, nous mettons notre expertise au service de votre confort. Formés aux dernières normes en vigueur, nos plombiers assurent des interventions rapides et efficaces, que ce soit pour une urgence ou des travaux planifiés.',
          'Notre savoir-faire en plomberie nous permet de diagnostiquer rapidement l\'origine de vos problèmes et d\'apporter des solutions durables. {companyName} s\'engage à utiliser des matériaux de qualité et des techniques éprouvées pour garantir la pérennité de nos interventions.'
        ],
        urgency: [
          'Une fuite d\'eau ? Une canalisation bouchée ? {companyName} intervient en urgence 24h/24 et 7j/7 à {city} et ses environs. Notre équipe de plombiers est mobilisable en moins de 30 minutes pour résoudre vos problèmes de plomberie les plus urgents.',
          'Les urgences plomberie n\'attendent pas ! C\'est pourquoi {companyName} a mis en place un service d\'intervention rapide disponible jour et nuit. Nos véhicules sont équipés de tout le matériel nécessaire pour traiter efficacement la majorité des situations d\'urgence.',
          'Face à une urgence plomberie, chaque minute compte. {companyName} comprend l\'importance d\'une intervention rapide. Notre centrale d\'appel est disponible 24h/7j et nos techniciens sont prêts à intervenir immédiatement pour limiter les dégâts.'
        ],
        quality: [
          '{companyName} s\'engage à fournir des prestations de plomberie de haute qualité. Nous utilisons exclusivement des matériaux certifiés et des équipements professionnels. Chaque intervention fait l\'objet d\'un contrôle qualité rigoureux pour assurer votre satisfaction totale.',
          'La qualité est au cœur de nos préoccupations. Chez {companyName}, nous formons continuellement nos plombiers aux dernières techniques et nous sélectionnons soigneusement nos fournisseurs pour vous garantir des installations durables et performantes.',
          'Notre réputation s\'est construite sur la qualité de nos interventions. {companyName} ne fait aucun compromis sur la qualité des matériaux utilisés et le soin apporté à chaque chantier. Nous garantissons nos travaux et assurons un suivi après intervention.'
        ]
      },
      electrician: {
        expertise: [
          'Fort de nombreuses années d\'expérience, {companyName} est votre partenaire de confiance pour tous vos travaux d\'électricité. Nos électriciens certifiés maîtrisent l\'ensemble des normes NFC 15-100 et garantissent des installations sûres et conformes.',
          '{companyName} dispose d\'une équipe d\'électriciens hautement qualifiés, régulièrement formés aux dernières évolutions technologiques. De la simple prise électrique à l\'installation domotique complète, nous apportons notre expertise à chaque projet.',
          'L\'électricité nécessite un savoir-faire pointu et une connaissance approfondie des normes de sécurité. Chez {companyName}, nos techniciens allient compétence technique et rigueur pour vous offrir des prestations électriques irréprochables.'
        ],
        safety: [
          'La sécurité électrique est notre priorité absolue. {companyName} réalise des diagnostics complets de vos installations pour identifier et corriger tout risque potentiel. Nous mettons en place des solutions conformes aux normes les plus strictes pour protéger votre famille et vos biens.',
          'Une installation électrique défaillante peut avoir des conséquences graves. C\'est pourquoi {companyName} accorde une importance particulière à la sécurité. Nos électriciens vérifient systématiquement la conformité de vos équipements et proposent les mises aux normes nécessaires.',
          '{companyName} s\'engage pour votre sécurité. Nous utilisons du matériel certifié CE et NF, et nos installations sont conçues pour prévenir tout risque d\'électrocution ou d\'incendie. La protection de votre foyer est notre engagement quotidien.'
        ],
        innovation: [
          'L\'électricité évolue constamment et {companyName} reste à la pointe de l\'innovation. Nous proposons des solutions modernes comme la domotique, les éclairages LED intelligents et les systèmes de gestion d\'énergie pour optimiser votre confort et réduire vos factures.',
          'Chez {companyName}, nous intégrons les dernières technologies dans nos installations électriques. Maison connectée, automatismes, économies d\'énergie : nous vous accompagnons dans la modernisation de votre habitat pour un confort optimal.',
          'Les nouvelles technologies électriques offrent des possibilités infinies. {companyName} vous conseille et installe les équipements les plus innovants : bornes de recharge pour véhicules électriques, panneaux photovoltaïques, systèmes intelligents de gestion énergétique.'
        ]
      },
      default: {
        expertise: [
          '{companyName} met à votre disposition son expertise et son savoir-faire acquis au fil des années. Notre équipe de professionnels qualifiés s\'engage à vous fournir des prestations de haute qualité, adaptées à vos besoins spécifiques.',
          'L\'expérience et le professionnalisme sont les piliers de {companyName}. Nous maîtrisons parfaitement notre métier et restons constamment informés des dernières évolutions techniques pour vous offrir les meilleures solutions.',
          'Chez {companyName}, chaque projet est unique. Notre expertise nous permet d\'analyser précisément vos besoins et de proposer des solutions sur mesure. La satisfaction de nos clients témoigne de notre engagement qualité.'
        ],
        quality: [
          'La qualité est notre signature. {companyName} sélectionne rigoureusement ses matériaux et applique des méthodes de travail éprouvées. Chaque réalisation fait l\'objet d\'un contrôle minutieux pour garantir un résultat à la hauteur de vos attentes.',
          '{companyName} s\'engage à fournir un travail irréprochable. Nous utilisons des matériaux de première qualité et nos artisans apportent le plus grand soin à chaque étape de votre projet. Votre satisfaction est notre priorité absolue.',
          'L\'excellence est notre standard. Chez {companyName}, nous ne faisons aucun compromis sur la qualité. Du choix des matériaux à la finition, chaque détail compte pour vous offrir une prestation digne des meilleurs artisans.'
        ],
        trust: [
          'La confiance se construit sur la transparence et l\'honnêteté. {companyName} vous propose des devis détaillés sans surprise et respecte scrupuleusement les délais annoncés. Notre réputation s\'est bâtie sur la satisfaction de nos nombreux clients.',
          'Choisir {companyName}, c\'est opter pour un partenaire de confiance. Nous privilégions la communication claire, le respect des engagements et la qualité du service. Nos clients nous recommandent car ils savent qu\'ils peuvent compter sur nous.',
          '{companyName} a gagné la confiance de centaines de clients grâce à son sérieux et son professionnalisme. Nous mettons un point d\'honneur à respecter nos engagements et à dépasser vos attentes sur chaque projet.'
        ]
      }
    };

    const businessTemplates = templates[businessType] || templates.default;
    return businessTemplates[topic] || businessTemplates.expertise;
  }

  private getServiceDescriptionTemplates(businessType: string): Record<string, string> {
    const templates: Record<string, Record<string, string>> = {
      plumber: {
        'débouchage canalisation': '{companyName} intervient rapidement pour le débouchage de vos canalisations. Équipés de matériel professionnel (furet électrique, caméra d\'inspection, hydrocureur), nos plombiers éliminent efficacement tous types de bouchons. Intervention garantie sans dégradation de vos installations.',
        'recherche de fuite': 'Une fuite d\'eau non visible peut causer des dégâts importants. {companyName} utilise des techniques de pointe (caméra thermique, gaz traceur, corrélation acoustique) pour localiser précisément l\'origine des fuites sans destruction inutile. Diagnostic précis et réparation durable garantis.',
        'installation sanitaire': '{companyName} réalise l\'installation complète de vos équipements sanitaires : WC, lavabo, douche, baignoire. Nos plombiers assurent le raccordement, l\'étanchéité parfaite et la mise en service. Nous travaillons avec les meilleures marques pour une satisfaction durable.',
        'rénovation salle de bain': 'Transformez votre salle de bain avec {companyName}. De la conception à la réalisation, nous gérons l\'ensemble des travaux : plomberie, carrelage, électricité, ventilation. Notre expertise garantit une rénovation réussie, fonctionnelle et esthétique.',
        'dépannage chauffe-eau': 'Panne de chauffe-eau ? {companyName} diagnostique et répare rapidement tous types de chauffe-eau : électrique, gaz, thermodynamique. Remplacement de résistance, groupe de sécurité, thermostat. Nous assurons aussi l\'installation de chauffe-eau neufs avec mise aux normes.',
        default: '{companyName} propose un service complet et professionnel. Notre équipe qualifiée intervient avec efficacité et rigueur pour garantir votre satisfaction. Matériel de qualité, respect des normes, tarifs transparents : nous mettons tout en œuvre pour la réussite de votre projet.'
      },
      electrician: {
        'mise aux normes': 'La mise aux normes électriques est essentielle pour votre sécurité. {companyName} réalise un diagnostic complet de votre installation et effectue les travaux nécessaires : tableau électrique, différentiels, prises de terre. Attestation de conformité Consuel délivrée.',
        'installation tableau électrique': 'Le tableau électrique est le cœur de votre installation. {companyName} installe et rénove vos tableaux avec des équipements de protection modernes : disjoncteurs différentiels, parafoudre, délesteur. Configuration optimale pour sécurité maximale et économies d\'énergie.',
        'dépannage électrique': 'Panne de courant ? Court-circuit ? {companyName} intervient rapidement pour identifier et résoudre vos problèmes électriques. Diagnostic précis, réparation sécurisée, remise en service immédiate. Service d\'urgence disponible 24h/7j pour les situations critiques.',
        'installation domotique': 'Entrez dans l\'ère de la maison intelligente avec {companyName}. Installation de systèmes domotiques complets : éclairage intelligent, volets automatisés, chauffage connecté, alarme. Programmation personnalisée pour un confort optimal et des économies d\'énergie.',
        'rénovation électrique': '{companyName} prend en charge la rénovation complète de votre installation électrique. Remplacement des câbles vétustes, création de nouveaux circuits, ajout de prises et points lumineux. Travaux réalisés dans le respect des normes NFC 15-100.',
        default: '{companyName} assure des prestations électriques de haute qualité. Installation, dépannage, rénovation : nos électriciens certifiés interviennent avec professionnalisme. Sécurité, conformité, performance : nous garantissons des solutions adaptées à vos besoins.'
      },
      default: {
        default: '{companyName} met son expertise à votre service pour réaliser vos projets. Qualité des matériaux, respect des délais, finitions soignées : nous nous engageons à fournir un travail irréprochable. Devis gratuit et conseils personnalisés pour tous vos besoins.'
      }
    };

    return templates[businessType] || templates.default;
  }

  private getUrgencyCTATemplates(): string[] {
    return [
      'Urgence ? Appelez-nous maintenant au {phone} !',
      'Intervention immédiate 24h/7j - Contactez {companyName}',
      'Besoin d\'aide rapidement ? Notre équipe intervient en 30 minutes',
      'Ne laissez pas la situation s\'aggraver - Appelez {companyName} !',
      'Service d\'urgence disponible - Un technicien à votre service 24h/24'
    ];
  }

  private getStandardCTATemplates(): string[] {
    return [
      'Demandez votre devis gratuit dès maintenant',
      'Contactez {companyName} pour un conseil personnalisé',
      'Prêt à démarrer votre projet ? Parlons-en !',
      'Obtenez une estimation gratuite en quelques clics',
      'Faites confiance à {companyName} pour vos travaux'
    ];
  }
}
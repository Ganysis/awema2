export class ContentGenerator {
  async generate(pageData: any): Promise<any> {
    // Pour l'instant, retourner des contenus pré-définis
    // Plus tard, on pourra intégrer Claude ou OpenAI ici
    
    const industry = this.detectIndustry(pageData.url);
    
    return {
      hero: {
        title: this.generateTitle(industry),
        subtitle: this.generateSubtitle(industry),
        urgencyText: 'Intervention 24/7'
      },
      services: this.generateServices(industry),
      testimonials: this.generateTestimonials(industry),
      about: this.generateAbout(industry)
    };
  }

  private detectIndustry(url: string): string {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('plomb')) return 'plumber';
    if (urlLower.includes('electr')) return 'electrician';
    if (urlLower.includes('chauff')) return 'heating';
    if (urlLower.includes('serru')) return 'locksmith';
    if (urlLower.includes('menuis')) return 'carpenter';
    if (urlLower.includes('peint')) return 'painter';
    
    return 'general';
  }

  private generateTitle(industry: string): string {
    const titles: Record<string, string> = {
      plumber: 'Plombier Expert 24/7',
      electrician: 'Électricien Certifié',
      heating: 'Chauffagiste Professionnel',
      locksmith: 'Serrurier Urgence',
      carpenter: 'Menuisier Artisan',
      painter: 'Peintre Décorateur',
      general: 'Artisan Professionnel'
    };
    
    return titles[industry] || titles.general;
  }

  private generateSubtitle(industry: string): string {
    const subtitles: Record<string, string> = {
      plumber: 'Dépannage rapide • Installation • Rénovation',
      electrician: 'Mise aux normes • Dépannage • Installation',
      heating: 'Installation • Entretien • Dépannage chaudière',
      locksmith: 'Ouverture de porte • Blindage • Serrures',
      carpenter: 'Sur-mesure • Rénovation • Agencement',
      painter: 'Intérieur • Extérieur • Décoration',
      general: 'Service de qualité • Prix transparents'
    };
    
    return subtitles[industry] || subtitles.general;
  }

  private generateServices(industry: string): any[] {
    const serviceTemplates: Record<string, any[]> = {
      plumber: [
        {
          title: 'Débouchage Urgent',
          description: 'Intervention rapide pour tous types de canalisations',
          price: 'Dès 89€',
          urgent: true
        },
        {
          title: 'Fuite d\'Eau',
          description: 'Détection et réparation de fuites',
          price: 'Dès 120€',
          urgent: true
        },
        {
          title: 'Installation Sanitaire',
          description: 'Pose complète salle de bain et cuisine',
          price: 'Sur devis'
        },
        {
          title: 'Chauffe-eau',
          description: 'Installation et dépannage toutes marques',
          price: 'Dès 350€'
        }
      ],
      electrician: [
        {
          title: 'Panne Électrique',
          description: 'Diagnostic et réparation urgente',
          price: 'Dès 95€',
          urgent: true
        },
        {
          title: 'Mise aux Normes',
          description: 'Tableau électrique NF C 15-100',
          price: 'Dès 890€'
        },
        {
          title: 'Installation Neuve',
          description: 'Électricité complète maison/appartement',
          price: 'Sur devis'
        },
        {
          title: 'Domotique',
          description: 'Maison connectée et économies d\'énergie',
          price: 'Dès 1500€'
        }
      ]
    };
    
    return serviceTemplates[industry] || serviceTemplates.plumber;
  }

  private generateTestimonials(industry: string): any[] {
    return [
      {
        author: 'Sophie M.',
        rating: 5,
        text: 'Intervention rapide et efficace. Travail très propre et professionnel. Je recommande !',
        service: 'Dépannage urgent'
      },
      {
        author: 'Pierre L.',
        rating: 5,
        text: 'Excellent rapport qualité/prix. L\'équipe est ponctuelle et très compétente.',
        service: 'Installation'
      },
      {
        author: 'Marie D.',
        rating: 5,
        text: 'Très satisfaite du service. Devis respecté et travail de qualité.',
        service: 'Rénovation'
      }
    ];
  }

  private generateAbout(industry: string): string {
    const abouts: Record<string, string> = {
      plumber: 'Fort de plus de 15 ans d\'expérience, notre équipe de plombiers qualifiés intervient rapidement pour tous vos besoins en plomberie. Disponibles 24h/24 et 7j/7, nous garantissons un travail de qualité avec des tarifs transparents.',
      electrician: 'Électriciens certifiés Qualifelec, nous assurons tous vos travaux d\'électricité en respectant les normes en vigueur. Notre expertise nous permet d\'intervenir sur tous types d\'installations, du dépannage urgent à la rénovation complète.',
      general: 'Entreprise familiale depuis 1990, nous mettons notre savoir-faire artisanal au service de votre satisfaction. Notre équipe qualifiée intervient avec professionnalisme et efficacité.'
    };
    
    return abouts[industry] || abouts.general;
  }
}
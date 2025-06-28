/**
 * Service de configuration DNS pour Netlify
 * Génère les instructions de configuration DNS selon le domaine choisi
 */

export interface DNSRecord {
  type: 'A' | 'AAAA' | 'CNAME' | 'TXT';
  name: string;
  value: string;
  priority?: number;
  ttl?: number;
}

export interface DNSConfiguration {
  domain: string;
  subdomain?: string;
  records: DNSRecord[];
  instructions: {
    fr: string[];
    registrars: {
      [key: string]: {
        name: string;
        steps: string[];
        documentation?: string;
      };
    };
  };
  verificationRecord: DNSRecord;
}

export class DNSConfigService {
  private static readonly NETLIFY_LOAD_BALANCER_IP = '75.2.60.5';
  private static readonly NETLIFY_APEX_DOMAIN = 'apex-loadbalancer.netlify.com';

  /**
   * Génère la configuration DNS complète pour un domaine personnalisé
   */
  static generateDNSConfiguration(customDomain: string, siteName: string): DNSConfiguration {
    // Analyser le domaine
    const { domain, subdomain, isApex } = this.parseDomain(customDomain);
    
    // Générer les enregistrements DNS
    const records: DNSRecord[] = [];
    
    if (isApex) {
      // Configuration pour domaine apex (exemple.com)
      records.push({
        type: 'A',
        name: '@',
        value: this.NETLIFY_LOAD_BALANCER_IP,
        ttl: 3600
      });
      
      // Record CNAME pour www
      records.push({
        type: 'CNAME',
        name: 'www',
        value: `${siteName}.netlify.app`,
        ttl: 3600
      });
    } else {
      // Configuration pour sous-domaine (www.exemple.com)
      records.push({
        type: 'CNAME',
        name: subdomain || 'www',
        value: `${siteName}.netlify.app`,
        ttl: 3600
      });
    }

    // Enregistrement de vérification
    const verificationRecord: DNSRecord = {
      type: 'TXT',
      name: '_netlify',
      value: `${siteName}.netlify.app`,
      ttl: 3600
    };
    
    records.push(verificationRecord);

    // Générer les instructions
    const instructions = this.generateInstructions(domain, subdomain, isApex, siteName);

    return {
      domain,
      subdomain,
      records,
      instructions,
      verificationRecord
    };
  }

  /**
   * Parse un domaine pour extraire le domaine principal et le sous-domaine
   */
  private static parseDomain(customDomain: string): { domain: string; subdomain?: string; isApex: boolean } {
    // Retirer le protocole si présent
    const cleanDomain = customDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    const parts = cleanDomain.split('.');
    
    // Cas simple : exemple.com (apex) ou www.exemple.com (subdomain)
    if (parts.length === 2) {
      return {
        domain: cleanDomain,
        isApex: true
      };
    } else if (parts.length === 3 && parts[0] === 'www') {
      return {
        domain: parts.slice(1).join('.'),
        subdomain: 'www',
        isApex: false
      };
    } else if (parts.length === 3) {
      return {
        domain: parts.slice(1).join('.'),
        subdomain: parts[0],
        isApex: false
      };
    }
    
    // Cas plus complexe (sous-sous-domaines)
    return {
      domain: parts.slice(-2).join('.'),
      subdomain: parts.slice(0, -2).join('.'),
      isApex: false
    };
  }

  /**
   * Génère les instructions de configuration pour différents registrars
   */
  private static generateInstructions(domain: string, subdomain: string | undefined, isApex: boolean, siteName: string): DNSConfiguration['instructions'] {
    const baseInstructions = isApex ? [
      `1. Connectez-vous à votre gestionnaire de domaine (registrar)`,
      `2. Accédez à la gestion DNS du domaine ${domain}`,
      `3. Ajoutez un enregistrement A : @ → ${this.NETLIFY_LOAD_BALANCER_IP}`,
      `4. Ajoutez un enregistrement CNAME : www → ${siteName}.netlify.app`,
      `5. Ajoutez un enregistrement TXT : _netlify → ${siteName}.netlify.app`,
      `6. Attendez la propagation DNS (5 minutes à 48 heures)`
    ] : [
      `1. Connectez-vous à votre gestionnaire de domaine (registrar)`,
      `2. Accédez à la gestion DNS du domaine ${domain}`,
      `3. Ajoutez un enregistrement CNAME : ${subdomain || 'www'} → ${siteName}.netlify.app`,
      `4. Ajoutez un enregistrement TXT : _netlify → ${siteName}.netlify.app`,
      `5. Attendez la propagation DNS (5 minutes à 48 heures)`
    ];

    const registrars = {
      ovh: {
        name: 'OVH',
        steps: [
          'Connectez-vous à votre espace client OVH',
          'Cliquez sur "Domaines" dans le menu',
          `Sélectionnez ${domain}`,
          'Cliquez sur l\'onglet "Zone DNS"',
          'Cliquez sur "Ajouter une entrée"',
          ...this.getOVHSpecificSteps(isApex, subdomain, siteName),
          'Validez les modifications'
        ],
        documentation: 'https://docs.ovh.com/fr/domains/editer-ma-zone-dns/'
      },
      gandi: {
        name: 'Gandi',
        steps: [
          'Connectez-vous à votre compte Gandi',
          `Sélectionnez le domaine ${domain}`,
          'Cliquez sur "DNS" dans le menu',
          'Cliquez sur "Ajouter un enregistrement"',
          ...this.getGandiSpecificSteps(isApex, subdomain, siteName),
          'Sauvegardez les modifications'
        ],
        documentation: 'https://docs.gandi.net/fr/nom_domaine/gestion_dns/index.html'
      },
      ionos: {
        name: '1&1 IONOS',
        steps: [
          'Connectez-vous à votre espace client IONOS',
          'Accédez à "Domaines & SSL"',
          `Cliquez sur ${domain}`,
          'Sélectionnez "Ajuster les paramètres DNS"',
          ...this.getIONOSSpecificSteps(isApex, subdomain, siteName),
          'Enregistrez les modifications'
        ],
        documentation: 'https://www.ionos.fr/assistance/domaines/configurer-les-enregistrements-dns/'
      },
      godaddy: {
        name: 'GoDaddy',
        steps: [
          'Connectez-vous à votre compte GoDaddy',
          'Accédez à "Mes domaines"',
          `Cliquez sur "DNS" à côté de ${domain}`,
          'Cliquez sur "Ajouter"',
          ...this.getGoDaddySpecificSteps(isApex, subdomain, siteName),
          'Enregistrez les modifications'
        ],
        documentation: 'https://fr.godaddy.com/help/gerer-les-enregistrements-dns-680'
      }
    };

    return {
      fr: baseInstructions,
      registrars
    };
  }

  private static getOVHSpecificSteps(isApex: boolean, subdomain: string | undefined, siteName: string): string[] {
    if (isApex) {
      return [
        'Ajoutez un enregistrement de type "A" : Sous-domaine vide, Cible : 75.2.60.5',
        `Ajoutez un enregistrement de type "CNAME" : Sous-domaine "www", Cible : ${siteName}.netlify.app.`,
        `Ajoutez un enregistrement de type "TXT" : Sous-domaine "_netlify", Cible : "${siteName}.netlify.app"`
      ];
    }
    return [
      `Ajoutez un enregistrement de type "CNAME" : Sous-domaine "${subdomain || 'www'}", Cible : ${siteName}.netlify.app.`,
      `Ajoutez un enregistrement de type "TXT" : Sous-domaine "_netlify", Cible : "${siteName}.netlify.app"`
    ];
  }

  private static getGandiSpecificSteps(isApex: boolean, subdomain: string | undefined, siteName: string): string[] {
    if (isApex) {
      return [
        'Type : A, Nom : @, Valeur : 75.2.60.5, TTL : 10800',
        `Type : CNAME, Nom : www, Valeur : ${siteName}.netlify.app, TTL : 10800`,
        `Type : TXT, Nom : _netlify, Valeur : ${siteName}.netlify.app, TTL : 10800`
      ];
    }
    return [
      `Type : CNAME, Nom : ${subdomain || 'www'}, Valeur : ${siteName}.netlify.app, TTL : 10800`,
      `Type : TXT, Nom : _netlify, Valeur : ${siteName}.netlify.app, TTL : 10800`
    ];
  }

  private static getIONOSSpecificSteps(isApex: boolean, subdomain: string | undefined, siteName: string): string[] {
    if (isApex) {
      return [
        'Créez un enregistrement A : Hôte : @, Pointe vers : 75.2.60.5',
        `Créez un enregistrement CNAME : Hôte : www, Pointe vers : ${siteName}.netlify.app`,
        `Créez un enregistrement TXT : Hôte : _netlify, Valeur : ${siteName}.netlify.app`
      ];
    }
    return [
      `Créez un enregistrement CNAME : Hôte : ${subdomain || 'www'}, Pointe vers : ${siteName}.netlify.app`,
      `Créez un enregistrement TXT : Hôte : _netlify, Valeur : ${siteName}.netlify.app`
    ];
  }

  private static getGoDaddySpecificSteps(isApex: boolean, subdomain: string | undefined, siteName: string): string[] {
    if (isApex) {
      return [
        'Type : A, Nom : @, Valeur : 75.2.60.5, TTL : 600 secondes',
        `Type : CNAME, Nom : www, Valeur : ${siteName}.netlify.app, TTL : 600 secondes`,
        `Type : TXT, Nom : _netlify, Valeur : ${siteName}.netlify.app, TTL : 600 secondes`
      ];
    }
    return [
      `Type : CNAME, Nom : ${subdomain || 'www'}, Valeur : ${siteName}.netlify.app, TTL : 600 secondes`,
      `Type : TXT, Nom : _netlify, Valeur : ${siteName}.netlify.app, TTL : 600 secondes`
    ];
  }

  /**
   * Génère un fichier d'instructions DNS pour l'export
   */
  static generateDNSInstructionsFile(config: DNSConfiguration): string {
    let content = `# Configuration DNS pour ${config.domain}

## 🌐 Enregistrements DNS à configurer

`;

    // Tableau des enregistrements
    content += `| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
`;

    config.records.forEach(record => {
      content += `| ${record.type} | ${record.name} | ${record.value} | ${record.ttl || 3600} |\n`;
    });

    // Instructions générales
    content += `\n## 📋 Instructions générales\n\n`;
    config.instructions.fr.forEach((step, index) => {
      content += `${step}\n`;
    });

    // Instructions par registrar
    content += `\n## 🏢 Instructions par hébergeur\n\n`;
    
    Object.entries(config.instructions.registrars).forEach(([key, registrar]) => {
      content += `### ${registrar.name}\n\n`;
      registrar.steps.forEach((step, index) => {
        content += `${index + 1}. ${step}\n`;
      });
      if (registrar.documentation) {
        content += `\n📚 Documentation : ${registrar.documentation}\n`;
      }
      content += '\n';
    });

    // Notes importantes
    content += `## ⚠️ Notes importantes

- La propagation DNS peut prendre de 5 minutes à 48 heures
- Pendant cette période, votre site reste accessible via ${config.domain.replace(/^www\./, '')}.netlify.app
- Une fois la propagation terminée, Netlify activera automatiquement le SSL (HTTPS)
- Si vous rencontrez des problèmes, vérifiez que tous les enregistrements sont correctement configurés

## 🔍 Vérification

Pour vérifier que vos enregistrements DNS sont correctement configurés :

1. Utilisez un outil en ligne comme [DNS Checker](https://dnschecker.org/)
2. Vérifiez chaque enregistrement configuré
3. Attendez que tous les serveurs DNS affichent les bonnes valeurs

## 🆘 Support

Si vous avez besoin d'aide :
- Documentation Netlify : https://docs.netlify.com/domains-https/custom-domains/
- Support de votre registrar (voir liens ci-dessus)
`;

    return content;
  }
}
export interface LegalMentionsData {
  // Informations sur l'entreprise
  companyName: string;
  legalForm?: string; // SARL, SAS, Auto-entrepreneur, etc.
  capital?: string;
  siret?: string;
  rcs?: string;
  vatNumber?: string;
  
  // Adresse
  address: string;
  postalCode: string;
  city: string;
  country?: string;
  
  // Contact
  phone?: string;
  email: string;
  
  // Responsable de publication
  publisherName: string;
  publisherTitle?: string;
  
  // Hébergement
  hostingProvider?: string;
  hostingAddress?: string;
  hostingPhone?: string;
  
  // Options
  includeCookiePolicy?: boolean;
  includePrivacyPolicy?: boolean;
  includeTermsOfService?: boolean;
}

export class LegalMentionsGenerator {
  static generate(data: LegalMentionsData): string {
    const sections: string[] = [];
    
    // En-tête
    sections.push(`
      <div class="legal-mentions-container max-w-4xl mx-auto py-12 px-4">
        <h1 class="text-3xl font-bold mb-8">Mentions Légales</h1>
    `);
    
    // 1. Éditeur du site
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
        <div class="space-y-2">
          <p><strong>${data.companyName}</strong></p>
          ${data.legalForm ? `<p>Forme juridique : ${data.legalForm}</p>` : ''}
          ${data.capital ? `<p>Capital social : ${data.capital}</p>` : ''}
          ${data.siret ? `<p>SIRET : ${data.siret}</p>` : ''}
          ${data.rcs ? `<p>RCS : ${data.rcs}</p>` : ''}
          ${data.vatNumber ? `<p>N° TVA intracommunautaire : ${data.vatNumber}</p>` : ''}
          <p>Adresse : ${data.address}, ${data.postalCode} ${data.city}${data.country ? `, ${data.country}` : ''}</p>
          ${data.phone ? `<p>Téléphone : ${data.phone}</p>` : ''}
          <p>Email : <a href="mailto:${data.email}" class="text-primary-600 hover:underline">${data.email}</a></p>
        </div>
      </section>
    `);
    
    // 2. Directeur de publication
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">2. Directeur de la publication</h2>
        <div class="space-y-2">
          <p><strong>${data.publisherName}</strong>${data.publisherTitle ? ` - ${data.publisherTitle}` : ''}</p>
          <p>Contact : <a href="mailto:${data.email}" class="text-primary-600 hover:underline">${data.email}</a></p>
        </div>
      </section>
    `);
    
    // 3. Hébergement
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">3. Hébergement</h2>
        <div class="space-y-2">
          ${data.hostingProvider ? `
            <p><strong>${data.hostingProvider}</strong></p>
            ${data.hostingAddress ? `<p>${data.hostingAddress}</p>` : ''}
            ${data.hostingPhone ? `<p>Téléphone : ${data.hostingPhone}</p>` : ''}
          ` : `
            <p><strong>Netlify, Inc.</strong></p>
            <p>2325 3rd Street, Suite 296</p>
            <p>San Francisco, California 94107</p>
            <p>United States</p>
          `}
        </div>
      </section>
    `);
    
    // 4. Propriété intellectuelle
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
        <div class="space-y-2">
          <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
        </div>
      </section>
    `);
    
    // 5. Cookies (optionnel)
    if (data.includeCookiePolicy) {
      sections.push(`
        <section class="mb-8">
          <h2 class="text-2xl font-semibold mb-4">5. Cookies</h2>
          <div class="space-y-2">
            <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies.</p>
            <p>Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site pourraient ne pas fonctionner correctement.</p>
          </div>
        </section>
      `);
    }
    
    // 6. Protection des données personnelles (optionnel mais recommandé)
    if (data.includePrivacyPolicy) {
      sections.push(`
        <section class="mb-8">
          <h2 class="text-2xl font-semibold mb-4">${data.includeCookiePolicy ? '6' : '5'}. Protection des données personnelles</h2>
          <div class="space-y-2">
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés », vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.</p>
            <p>Pour exercer ces droits, vous pouvez nous contacter :</p>
            <ul class="list-disc list-inside ml-4">
              <li>Par email : <a href="mailto:${data.email}" class="text-primary-600 hover:underline">${data.email}</a></li>
              ${data.phone ? `<li>Par téléphone : ${data.phone}</li>` : ''}
              <li>Par courrier : ${data.companyName}, ${data.address}, ${data.postalCode} ${data.city}</li>
            </ul>
            <p>Les données collectées sur ce site sont uniquement destinées à un usage interne. En aucun cas, ces données ne seront cédées ou vendues à des tiers.</p>
          </div>
        </section>
      `);
    }
    
    // 7. Responsabilité
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">${this.getSectionNumber(data)}. Responsabilité</h2>
        <div class="space-y-2">
          <p>Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.</p>
          <p>${data.companyName} ne saurait être tenu responsable de l'utilisation faite de ces informations, et de tout préjudice direct ou indirect pouvant en découler.</p>
        </div>
      </section>
    `);
    
    // 8. Liens hypertextes
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">${this.getSectionNumber(data, 1)}. Liens hypertextes</h2>
        <div class="space-y-2">
          <p>Les sites liés directement ou indirectement au site de ${data.companyName} ne sont pas sous son contrôle. Par conséquent, ${data.companyName} n'assume aucune responsabilité quant aux informations publiées sur ces sites.</p>
          <p>Les liens vers des sites partenaires ou externes sont fournis à titre de service pour les utilisateurs et n'impliquent aucune caution quant à leur contenu.</p>
        </div>
      </section>
    `);
    
    // Date de mise à jour
    const today = new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    sections.push(`
        <div class="mt-12 pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-600">Dernière mise à jour : ${today}</p>
        </div>
      </div>
    `);
    
    return sections.join('');
  }
  
  private static getSectionNumber(data: LegalMentionsData, offset: number = 0): number {
    let baseNumber = 5;
    if (data.includeCookiePolicy) baseNumber++;
    if (data.includePrivacyPolicy) baseNumber++;
    return baseNumber + offset;
  }
  
  static generatePrivacyPolicy(data: LegalMentionsData): string {
    const sections: string[] = [];
    
    sections.push(`
      <div class="privacy-policy-container max-w-4xl mx-auto py-12 px-4">
        <h1 class="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
        <p class="mb-6">Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    `);
    
    // Introduction
    sections.push(`
      <section class="mb-8">
        <p>${data.companyName} s'engage à protéger la vie privée des visiteurs de son site web. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.</p>
      </section>
    `);
    
    // Types de données collectées
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">1. Données collectées</h2>
        <div class="space-y-2">
          <p>Nous pouvons collecter les types de données suivants :</p>
          <ul class="list-disc list-inside ml-4">
            <li>Informations de contact (nom, email, téléphone) via nos formulaires</li>
            <li>Données de navigation (pages visitées, temps passé sur le site)</li>
            <li>Adresse IP et informations sur le navigateur</li>
            <li>Cookies et technologies similaires</li>
          </ul>
        </div>
      </section>
    `);
    
    // Utilisation des données
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">2. Utilisation des données</h2>
        <div class="space-y-2">
          <p>Vos données sont utilisées pour :</p>
          <ul class="list-disc list-inside ml-4">
            <li>Répondre à vos demandes de contact</li>
            <li>Améliorer notre site web et nos services</li>
            <li>Envoyer des informations sur nos services (avec votre consentement)</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </div>
      </section>
    `);
    
    // Protection des données
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">3. Protection des données</h2>
        <div class="space-y-2">
          <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.</p>
          <p>Vos données sont hébergées sur des serveurs sécurisés et ne sont accessibles qu'au personnel autorisé.</p>
        </div>
      </section>
    `);
    
    // Droits des utilisateurs
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">4. Vos droits</h2>
        <div class="space-y-2">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul class="list-disc list-inside ml-4">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
          <p class="mt-4">Pour exercer ces droits, contactez-nous à : <a href="mailto:${data.email}" class="text-primary-600 hover:underline">${data.email}</a></p>
        </div>
      </section>
    `);
    
    // Contact
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">5. Contact</h2>
        <div class="space-y-2">
          <p>Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter :</p>
          <p><strong>${data.companyName}</strong></p>
          <p>${data.address}, ${data.postalCode} ${data.city}</p>
          <p>Email : <a href="mailto:${data.email}" class="text-primary-600 hover:underline">${data.email}</a></p>
          ${data.phone ? `<p>Téléphone : ${data.phone}</p>` : ''}
        </div>
      </section>
    `);
    
    sections.push(`
      </div>
    `);
    
    return sections.join('');
  }
  
  static generateTermsOfService(data: LegalMentionsData): string {
    const sections: string[] = [];
    
    sections.push(`
      <div class="terms-container max-w-4xl mx-auto py-12 px-4">
        <h1 class="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
        <p class="mb-6">En vigueur au ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    `);
    
    // Objet
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Article 1 : Objet</h2>
        <div class="space-y-2">
          <p>Les présentes conditions générales d'utilisation ont pour objet l'encadrement juridique de l'utilisation du site ${data.companyName} et de ses services.</p>
          <p>Ce contrat est conclu entre : Le gérant du site internet, ci-après désigné « l'Éditeur », et toute personne physique ou morale souhaitant accéder au site et à ses services, ci-après appelé « l'Utilisateur ».</p>
        </div>
      </section>
    `);
    
    // Mentions légales
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Article 2 : Mentions légales</h2>
        <div class="space-y-2">
          <p>L'édition du site ${data.companyName} est assurée par ${data.companyName}${data.legalForm ? ` ${data.legalForm}` : ''}${data.capital ? ` au capital de ${data.capital}` : ''}, dont le siège social est situé au ${data.address}, ${data.postalCode} ${data.city}.</p>
          ${data.siret ? `<p>SIRET : ${data.siret}</p>` : ''}
          <p>Le directeur de publication est ${data.publisherName}.</p>
        </div>
      </section>
    `);
    
    // Accès aux services
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Article 3 : Accès aux services</h2>
        <div class="space-y-2">
          <p>Le site permet à l'Utilisateur un accès gratuit aux services suivants :</p>
          <ul class="list-disc list-inside ml-4">
            <li>Présentation de l'entreprise et de ses services</li>
            <li>Formulaire de contact</li>
            <li>Galerie de réalisations</li>
            <li>Informations pratiques</li>
          </ul>
          <p>Le site est accessible gratuitement depuis n'importe où par tout utilisateur disposant d'un accès à Internet.</p>
        </div>
      </section>
    `);
    
    // Propriété intellectuelle
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Article 4 : Propriété intellectuelle</h2>
        <div class="space-y-2">
          <p>Les marques, logos, signes et tout autre contenu du site font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.</p>
          <p>L'Utilisateur sollicite l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus.</p>
        </div>
      </section>
    `);
    
    // Données personnelles
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Article 5 : Données personnelles</h2>
        <div class="space-y-2">
          <p>Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément au RGPD.</p>
          <p>Pour plus d'informations, consultez notre politique de confidentialité.</p>
        </div>
      </section>
    `);
    
    // Responsabilité et force majeure
    sections.push(`
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Article 6 : Responsabilité</h2>
        <div class="space-y-2">
          <p>Les sources des informations diffusées sur le site sont réputées fiables. Toutefois, le site se réserve la faculté d'une non-garantie de la fiabilité des sources.</p>
          <p>Le site décline toute responsabilité en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.</p>
        </div>
      </section>
    `);
    
    sections.push(`
      </div>
    `);
    
    return sections.join('');
  }
}
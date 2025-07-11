// Concept : API CMS centralisée pour tous les sites AWEMA
export class CMSCentralAPI {
  private apiUrl = 'https://cms.votre-domaine.fr/api';
  
  constructor(private siteId: string, private apiKey: string) {}
  
  // Récupérer le contenu
  async getContent(section: string) {
    const response = await fetch(`${this.apiUrl}/sites/${this.siteId}/content/${section}`, {
      headers: {
        'X-API-Key': this.apiKey
      }
    });
    return response.json();
  }
  
  // Mettre à jour le contenu
  async updateContent(section: string, data: any) {
    const response = await fetch(`${this.apiUrl}/sites/${this.siteId}/content/${section}`, {
      method: 'PUT',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  
  // Widget d'édition à injecter dans le site
  static injectEditWidget(siteId: string, apiKey: string) {
    return `
    <!-- AWEMA CMS Widget -->
    <script>
      window.AWEMA_CMS = {
        siteId: '${siteId}',
        apiKey: '${apiKey}',
        apiUrl: 'https://cms.votre-domaine.fr'
      };
    </script>
    <script src="https://cms.votre-domaine.fr/widget.js" defer></script>
    `;
  }
}
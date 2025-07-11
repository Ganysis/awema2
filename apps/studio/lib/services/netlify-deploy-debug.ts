// Script de debug pour vérifier le statut du déploiement
export async function checkDeploymentStatus(netlifyToken: string, siteName: string) {
  try {
    const response = await fetch(`https://api.netlify.com/api/v1/sites`, {
      headers: {
        'Authorization': `Bearer ${netlifyToken}`
      }
    });
    
    const sites = await response.json();
    const site = sites.find((s: any) => s.name === siteName);
    
    if (site) {
      console.log('Site trouvé:', {
        id: site.id,
        name: site.name,
        url: site.url,
        ssl_url: site.ssl_url,
        admin_url: site.admin_url,
        created_at: site.created_at,
        updated_at: site.updated_at
      });
      
      // Vérifier les déploiements récents
      const deploysResponse = await fetch(`https://api.netlify.com/api/v1/sites/${site.id}/deploys?per_page=5`, {
        headers: {
          'Authorization': `Bearer ${netlifyToken}`
        }
      });
      
      const deploys = await deploysResponse.json();
      console.log('Déploiements récents:', deploys.map((d: any) => ({
        id: d.id,
        state: d.state,
        created_at: d.created_at,
        published_at: d.published_at,
        error_message: d.error_message
      })));
    } else {
      console.log('Site non trouvé sur Netlify');
    }
  } catch (error) {
    console.error('Erreur de vérification:', error);
  }
}
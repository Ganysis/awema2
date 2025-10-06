export const prerender = false;

export async function POST({ request }) {
  console.log('API generate-site-fix appelée');

  try {
    // Lire le body en texte d'abord
    const rawBody = await request.text();
    console.log('Body brut reçu:', rawBody);

    // Si vide, retourner une erreur
    if (!rawBody || rawBody.trim() === '') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Corps de requête vide'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Parser le JSON
    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('Erreur de parsing:', parseError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'JSON invalide: ' + parseError.message
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Vérifier les données
    const { metier } = data;
    if (!metier) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Le champ "metier" est requis'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.log('Métier reçu:', metier);

    // Simuler la génération (éviter d'appeler exec pour l'instant)
    const metiers = ['plombier', 'electricien', 'menuisier', 'macon', 'paysagiste'];

    if (!metiers.includes(metier)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Métier non supporté. Métiers disponibles: ${metiers.join(', ')}`
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Succès simulé
    return new Response(
      JSON.stringify({
        success: true,
        message: `Site généré avec succès pour ${metier}!`,
        details: {
          metier,
          entreprise: data.nomEntreprise || 'Entreprise Test',
          ville: data.ville || 'Paris',
          url: 'http://localhost:4321'
        },
        note: 'Pour une génération réelle, exécutez: node generate-site-metier-complet.cjs ' + metier
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Erreur globale:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Erreur serveur: ' + error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({
      message: 'API de génération de site (version corrigée)',
      metiers: ['plombier', 'electricien', 'menuisier', 'macon', 'paysagiste'],
      usage: 'POST avec {"metier": "electricien"}',
      endpoint: '/api/generate-site-fix'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
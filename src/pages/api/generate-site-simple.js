import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function POST({ request }) {
  try {
    // Parse le body
    let data;
    try {
      data = await request.json();
    } catch (e) {
      console.error('Erreur parsing JSON:', e);
      return new Response(JSON.stringify({
        success: false,
        error: 'JSON invalide'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { metier } = data;

    if (!metier) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Métier requis'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Vérifier que le script existe
    const projectRoot = path.resolve(__dirname, '../../..');
    const scriptPath = path.join(projectRoot, 'generate-site-metier-complet.cjs');

    if (!fs.existsSync(scriptPath)) {
      return new Response(JSON.stringify({
        success: false,
        error: `Script non trouvé: ${scriptPath}`
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simuler la génération (pour test)
    console.log(`🚀 Simulation de génération pour ${metier}`);

    // Dans un vrai cas, on appellerait le script ici
    // Pour l'instant, on simule le succès

    return new Response(JSON.stringify({
      success: true,
      message: `Site configuré pour ${metier}!`,
      details: {
        metier,
        entreprise: data.nomEntreprise || 'Entreprise Test',
        ville: data.ville || 'Paris',
        url: 'http://localhost:4321'
      },
      note: "Pour générer réellement, exécutez: node generate-site-metier-complet.cjs " + metier
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Erreur:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Erreur inconnue'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({
    message: 'API de génération de site',
    metiers: ['plombier', 'electricien', 'menuisier', 'macon', 'paysagiste'],
    usage: 'POST avec {metier: "electricien"}'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
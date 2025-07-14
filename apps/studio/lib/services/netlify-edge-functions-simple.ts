/**
 * Générateur simplifié de Netlify Edge Functions
 * Authentification basique sans dépendance Supabase
 */

export class NetlifyEdgeFunctionsSimple {
  /**
   * Génère le fichier netlify.toml
   */
  generateNetlifyToml(): string {
    return `# Configuration Netlify
[build]
  publish = "."

# Edge Functions pour le CMS
[[edge_functions]]
  path = "/api/cms/*"
  function = "cms-handler"

# Headers de sécurité
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"`;
  }

  /**
   * Génère l'Edge Function simplifiée
   */
  generateEdgeFunction(siteId: string, initialBlocks: any[] = []): string {
    return `// netlify/edge-functions/cms-handler.ts
import { Context } from "https://edge.netlify.com";

const SITE_ID = "${siteId}";

// Utilisateur par défaut (en production, utiliser une vraie DB)
const DEFAULT_USER = {
  email: "admin@admin.fr",
  password: "admin",
  role: "admin"
};

// Stockage en mémoire (sera réinitialisé à chaque redémarrage)
let siteData = {
  pages: [
    {
      id: "home-page",
      page_title: "Accueil",
      page_slug: "/",
      blocks: ${JSON.stringify(initialBlocks)},
      seo: {
        title: "Bienvenue",
        description: "Site créé avec AWEMA"
      }
    }
  ]
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Headers CORS
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  };

  // Handle preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    // Router simple
    if (path === "/api/cms/auth/login") {
      return handleLogin(request, headers);
    } else if (path === "/api/cms/content") {
      return handleContent(request, headers);
    } else if (path === "/api/cms/health") {
      return new Response(
        JSON.stringify({ status: "ok", message: "CMS API is running" }),
        { status: 200, headers }
      );
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      { status: 404, headers }
    );
  } catch (error) {
    console.error("Edge Function Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error.message }),
      { status: 500, headers }
    );
  }
};

async function handleLogin(request: Request, headers: any) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    // Authentification basique
    if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
      const session = {
        user: {
          id: "1",
          email: DEFAULT_USER.email,
          role: DEFAULT_USER.role,
          site_id: SITE_ID
        },
        token: crypto.randomUUID(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      return new Response(
        JSON.stringify({ success: true, session }),
        { status: 200, headers }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid credentials" }),
      { status: 401, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers }
    );
  }
}

async function handleContent(request: Request, headers: any) {
  switch (request.method) {
    case "GET":
      // Retourner les pages
      return new Response(
        JSON.stringify(siteData.pages),
        { status: 200, headers }
      );

    case "PUT":
      // Mettre à jour une page
      try {
        const body = await request.json();
        const { id, data } = body;
        
        const pageIndex = siteData.pages.findIndex(p => p.id === id);
        if (pageIndex >= 0) {
          siteData.pages[pageIndex] = {
            ...siteData.pages[pageIndex],
            ...data,
            updated_at: new Date().toISOString()
          };
          
          return new Response(
            JSON.stringify({ success: true, page: siteData.pages[pageIndex] }),
            { status: 200, headers }
          );
        }
        
        return new Response(
          JSON.stringify({ error: "Page not found" }),
          { status: 404, headers }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Invalid request body" }),
          { status: 400, headers }
        );
      }

    default:
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers }
      );
  }
}`;
  }
}
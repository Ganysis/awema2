import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Map pour stocker les tentatives de connexion
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();

// Nettoyer les anciennes entrées toutes les heures
setInterval(() => {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  
  for (const [key, value] of loginAttempts.entries()) {
    if (now - value.firstAttempt > oneHour) {
      loginAttempts.delete(key);
    }
  }
}, 60 * 60 * 1000);

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, password, siteId } = await req.json()
    
    // Obtenir l'IP du client
    const clientIp = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    // Clé pour le rate limiting
    const rateLimitKey = `${clientIp}_${siteId}`;
    
    // Vérifier le rate limiting
    const attempts = loginAttempts.get(rateLimitKey) || { count: 0, firstAttempt: Date.now() };
    const now = Date.now();
    const fifteenMinutes = 15 * 60 * 1000;
    
    // Réinitialiser après 15 minutes
    if (now - attempts.firstAttempt > fifteenMinutes) {
      attempts.count = 0;
      attempts.firstAttempt = now;
    }
    
    // Vérifier si trop de tentatives
    if (attempts.count >= 5) {
      const remainingTime = Math.ceil((fifteenMinutes - (now - attempts.firstAttempt)) / 60000);
      return new Response(
        JSON.stringify({ 
          error: `Trop de tentatives. Réessayez dans ${remainingTime} minutes.` 
        }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    // Incrémenter les tentatives
    attempts.count++;
    loginAttempts.set(rateLimitKey, attempts);
    
    // Créer le client Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Vérifier les identifiants
    const { data: authResult, error: authError } = await supabase
      .rpc('verify_user_password', {
        user_email: email,
        user_password: password,
        user_site_id: siteId
      });
    
    if (authError || !authResult || authResult.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Email ou mot de passe incorrect' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    // Réinitialiser les tentatives en cas de succès
    loginAttempts.delete(rateLimitKey);
    
    const user = authResult[0];
    
    // Créer un token simple (en production, utiliser JWT)
    const token = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      siteId: user.site_id,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24h
    }));
    
    return new Response(
      JSON.stringify({ 
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.full_name
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
    
  } catch (error) {
    console.error('Erreur login:', error)
    
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
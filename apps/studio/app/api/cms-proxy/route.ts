import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Client Supabase avec clé service pour bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: NextRequest) {
  // Headers CORS permissifs pour TOUS les domaines
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const { action, ...params } = await request.json();

    let result;
    switch (action) {
      case 'login':
        const { data: authData } = await supabase.rpc('verify_user_password', {
          user_email: params.email,
          user_password: params.password,
          user_site_id: params.site_id
        });
        result = authData?.[0] || null;
        break;

      case 'getContent':
        const { data: content } = await supabase
          .from('cms_content')
          .select('*')
          .eq('site_id', params.site_id)
          .order('created_at', { ascending: false });
        result = content;
        break;

      case 'updateContent':
        const { data: updated } = await supabase
          .from('cms_content')
          .update(params.data)
          .eq('id', params.id)
          .select();
        result = updated;
        break;

      case 'createContent':
        const { data: created } = await supabase
          .from('cms_content')
          .insert(params.data)
          .select();
        result = created;
        break;

      case 'getMedia':
        const { data: media } = await supabase
          .from('cms_media')
          .select('*')
          .eq('site_id', params.site_id);
        result = media;
        break;

      case 'uploadMedia':
        const { data: uploaded } = await supabase
          .from('cms_media')
          .insert(params.data)
          .select();
        result = uploaded;
        break;

      default:
        throw new Error(`Action inconnue: ${action}`);
    }

    return NextResponse.json({ success: true, data: result }, { headers });
  } catch (error: any) {
    console.error('Erreur CMS Proxy:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400, headers }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
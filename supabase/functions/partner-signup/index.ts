import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PartnerSignupRequest {
  email: string;
  password: string;
  partnerType: 'vendor' | 'affiliate' | 'distributor';
  businessName: string;
  businessEmail: string;
  businessPhone?: string;
  description?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client with service role
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const body: PartnerSignupRequest = await req.json();
    
    console.log('Partner signup attempt:', { email: body.email, partnerType: body.partnerType });

    // Validate required fields
    if (!body.email || !body.password || !body.partnerType || !body.businessName || !body.businessEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input lengths
    if (body.businessName.trim().length < 2 || body.businessName.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Business name must be between 2 and 100 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.businessEmail.length > 255 || !body.businessEmail.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Invalid business email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.description && body.description.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Description must be less than 1000 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.businessPhone && body.businessPhone.length > 20) {
      return new Response(
        JSON.stringify({ error: 'Phone number too long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check password strength
    if (body.password.length < 8) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 8 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create user account
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true, // Auto-confirm for now
    });

    if (authError || !authData.user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: authError?.message || 'Failed to create account' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User created:', authData.user.id);

    // Insert partner record with validated data
    const { error: partnerError } = await supabaseAdmin.from('partners').insert({
      user_id: authData.user.id,
      partner_type: body.partnerType,
      business_name: body.businessName.trim(),
      business_email: body.businessEmail.trim().toLowerCase(),
      business_phone: body.businessPhone?.trim() || null,
      description: body.description?.trim() || null,
      status: 'pending',
    });

    if (partnerError) {
      console.error('Partner insert error:', partnerError);
      // Cleanup: delete the user if partner creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return new Response(
        JSON.stringify({ error: 'Failed to create partner profile' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Assign partner role (using service role, bypasses RLS)
    const { error: roleError } = await supabaseAdmin.from('user_roles').insert({
      user_id: authData.user.id,
      role: 'partner',
    });

    if (roleError) {
      console.error('Role assignment error:', roleError);
      return new Response(
        JSON.stringify({ error: 'Failed to assign role' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Partner signup complete:', authData.user.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        user: { id: authData.user.id, email: authData.user.email }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WorkerSignupRequest {
  email: string;
  password: string;
  workerId: string;
  roleType: 'admin' | 'worker';
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

    const body: WorkerSignupRequest = await req.json();
    
    console.log('Worker/Admin signup attempt:', { email: body.email, roleType: body.roleType });

    // Validate required fields
    if (!body.email || !body.password || !body.roleType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate password strength
    if (body.password.length < 8) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 8 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For admin role, verify if this is the first admin (bootstrap case)
    if (body.roleType === 'admin') {
      const { count } = await supabaseAdmin
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'admin');

      // Only allow admin creation if no admins exist (bootstrap) or if called by existing admin
      // For production, you'd verify the caller is an existing admin
      if (count && count > 0) {
        // For now, reject non-bootstrap admin creation
        // In production, verify JWT and check if caller has admin role
        return new Response(
          JSON.stringify({ error: 'Admin creation requires authorization from existing admin' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // For worker role, verify workerId if provided
    if (body.roleType === 'worker' && body.workerId) {
      if (body.workerId.trim().length < 3 || body.workerId.length > 20) {
        return new Response(
          JSON.stringify({ error: 'Invalid worker ID format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if worker ID exists and is not already assigned
      const { data: existingWorker } = await supabaseAdmin
        .from('workers')
        .select('user_id')
        .eq('worker_id', body.workerId.toUpperCase())
        .maybeSingle();

      if (existingWorker?.user_id) {
        return new Response(
          JSON.stringify({ error: 'Worker ID already assigned to another account' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
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

    // If worker role and worker ID provided, update worker record
    if (body.roleType === 'worker' && body.workerId) {
      const { error: workerError } = await supabaseAdmin
        .from('workers')
        .update({ user_id: authData.user.id })
        .eq('worker_id', body.workerId.toUpperCase());

      if (workerError) {
        console.error('Worker update error:', workerError);
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        return new Response(
          JSON.stringify({ error: 'Worker ID not found or invalid' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Assign role (using service role, bypasses RLS)
    const { error: roleError } = await supabaseAdmin.from('user_roles').insert({
      user_id: authData.user.id,
      role: body.roleType,
    });

    if (roleError) {
      console.error('Role assignment error:', roleError);
      return new Response(
        JSON.stringify({ error: 'Failed to assign role' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Worker/Admin signup complete:', authData.user.id);

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

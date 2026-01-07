import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[POST-PURCHASE-SESSION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    });

    const { session_id } = await req.json();
    if (!session_id) throw new Error("session_id is required");
    
    logStep("Processing session", { session_id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ 
        success: false,
        message: "Payment not completed"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.customer_details?.name || session.metadata?.customer_name || '';
    const isSubscription = session.mode === 'subscription';
    const planTier = session.metadata?.plan_tier || 'starter';

    if (!customerEmail) {
      throw new Error("No customer email found in session");
    }

    logStep("Customer details", { email: customerEmail, name: customerName, isSubscription, planTier });

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    let userId: string | null = null;
    let isNewUser = false;
    let magicLinkUrl: string | null = null;

    if (!listError && existingUsers?.users) {
      const existingUser = existingUsers.users.find(u => u.email?.toLowerCase() === customerEmail.toLowerCase());
      if (existingUser) {
        userId = existingUser.id;
        logStep("Found existing user", { userId });
      }
    }

    // If no existing user, create one
    if (!userId) {
      logStep("Creating new user account");
      
      // Generate a secure random password (user will use magic link to access)
      const tempPassword = crypto.randomUUID() + crypto.randomUUID();
      
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: customerEmail,
        password: tempPassword,
        email_confirm: true, // Auto-confirm since they paid
        user_metadata: {
          full_name: customerName,
          subscription_tier: planTier,
          created_via: 'post_purchase',
        }
      });

      if (createError) {
        logStep("Error creating user", { error: createError.message });
        // Don't fail - user can still access via normal signup
      } else if (newUser?.user) {
        userId = newUser.user.id;
        isNewUser = true;
        logStep("Created new user", { userId });

        // Create profile record
        const nameParts = customerName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .upsert({
            id: userId,
            first_name: firstName,
            last_name: lastName,
            account_status: 'active',
          }, { onConflict: 'id' });

        if (profileError) {
          logStep("Warning: Profile creation failed", { error: profileError.message });
        }

        // Assign user role based on subscription type
        const userRole = isSubscription ? 'senior' : 'user';
        const { error: roleError } = await supabaseAdmin
          .from('user_roles')
          .upsert({
            user_id: userId,
            role: userRole,
          }, { onConflict: 'user_id' });

        if (roleError) {
          logStep("Warning: Role assignment failed", { error: roleError.message });
        }
      }
    }

    // Generate magic link for seamless login
    if (userId) {
      const origin = req.headers.get("origin") || "https://invisionnetwork.org";
      const redirectTo = isSubscription ? `${origin}/portal/senior` : `${origin}/portal`;

      const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: customerEmail,
        options: {
          redirectTo: redirectTo,
        }
      });

      if (linkError) {
        logStep("Warning: Magic link generation failed", { error: linkError.message });
      } else if (linkData?.properties?.action_link) {
        magicLinkUrl = linkData.properties.action_link;
        logStep("Magic link generated", { redirectTo });
      }
    }

    // Determine the appropriate dashboard based on purchase type
    let dashboardPath = '/portal';
    if (isSubscription) {
      dashboardPath = '/portal/senior';
    }

    const response = {
      success: true,
      user_id: userId,
      is_new_user: isNewUser,
      magic_link: magicLinkUrl,
      dashboard_path: dashboardPath,
      customer_email: customerEmail,
      customer_name: customerName,
      is_subscription: isSubscription,
      plan_tier: planTier,
    };

    logStep("Session processing complete", { userId, isNewUser, hasMagicLink: !!magicLinkUrl });

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

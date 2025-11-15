import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  console.log(`[CREATE-SUBSCRIPTION-CHECKOUT] ${step}${details ? ` - ${JSON.stringify(details)}` : ''}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { priceId, serviceName, planTier, discountCode } = await req.json();
    logStep("Request data", { priceId, serviceName, planTier, discountCode });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("No existing customer found");
    }

    // Handle discount code
    let coupon = null;
    if (discountCode) {
      logStep("Processing discount code", { code: discountCode });
      
      // Validate discount code via database
      const { data: discountData, error: discountError } = await supabaseClient
        .from('discount_codes')
        .select('*')
        .eq('code', discountCode.toUpperCase())
        .eq('is_active', true)
        .single();

      if (discountError || !discountData) {
        logStep("Invalid discount code", { error: discountError });
      } else {
        // Check if discount is expired
        const now = new Date();
        const validFrom = new Date(discountData.valid_from);
        const validUntil = discountData.valid_until ? new Date(discountData.valid_until) : null;
        
        if (now >= validFrom && (!validUntil || now <= validUntil)) {
          // Check usage limits
          if (!discountData.max_uses || discountData.current_uses < discountData.max_uses) {
            // Create Stripe coupon
            const couponData: any = {
              duration: 'once',
              name: discountData.description || discountData.code,
            };

            if (discountData.type === 'percentage') {
              couponData.percent_off = discountData.value;
            } else {
              couponData.amount_off = discountData.value;
              couponData.currency = 'usd';
            }

            coupon = await stripe.coupons.create(couponData);
            logStep("Created Stripe coupon", { couponId: coupon.id });

            // Increment usage
            await supabaseClient
              .from('discount_codes')
              .update({ current_uses: discountData.current_uses + 1 })
              .eq('id', discountData.id);
          }
        }
      }
    }

    // Create checkout session
    const sessionConfig: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/portal?subscription=success`,
      cancel_url: `${req.headers.get("origin")}/portal?subscription=cancelled`,
      metadata: {
        user_id: user.id,
        service_name: serviceName,
        plan_tier: planTier,
      },
    };

    if (coupon) {
      sessionConfig.discounts = [{ coupon: coupon.id }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

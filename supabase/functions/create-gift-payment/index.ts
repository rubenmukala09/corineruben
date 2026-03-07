import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Stripe secret key not configured");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    const { amount, guestName, message, origin } = await req.json();

    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    const siteOrigin = origin || "https://smart-union-hub.lovable.app";

    // Create a Stripe Checkout Session for one-time payment
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Wedding Gift from ${guestName || "Anonymous"}`,
              description: message || "A heartfelt wedding gift 💕",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteOrigin}/?gift=success&amount=${amount}&name=${encodeURIComponent(guestName || "Anonymous")}`,
      cancel_url: `${siteOrigin}/?gift=cancelled`,
      metadata: {
        guest_name: guestName || "Anonymous",
        message: message || "",
        amount: String(amount),
        source: "wedding_gift",
      },
    });

    // Record gift in database (pending status tracked via Stripe metadata)
    try {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );
      await supabaseClient.from("gifts").insert({
        from_name: guestName || "Anonymous",
        amount: amount,
        message: message || null,
      });
    } catch (dbErr) {
      console.error("Failed to record gift in DB:", dbErr);
      // Don't block payment if DB insert fails
    }

    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating checkout session:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
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
            unit_amount: amount * 100, // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteOrigin}/?gift=success&amount=${amount}`,
      cancel_url: `${siteOrigin}/?gift=cancelled`,
      metadata: {
        guest_name: guestName || "Anonymous",
        message: message || "",
        source: "wedding_gift",
      },
    });

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

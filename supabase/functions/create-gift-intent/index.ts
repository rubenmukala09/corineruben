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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Stripe secret key not configured");

    const publishableKey = Deno.env.get("STRIPE_PUBLISHABLE_KEY");
    if (!publishableKey) throw new Error("Stripe publishable key not configured");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const { amount, guestName, message } = await req.json();

    if (!amount || amount <= 0) throw new Error("Invalid amount");

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: "usd",
      metadata: {
        guest_name: guestName || "Anonymous",
        message: message || "",
        source: "wedding_gift",
      },
      description: `Wedding Gift from ${guestName || "Anonymous"}`,
    });

    // Gift is recorded in DB only after successful payment (in send-gift-confirmation)

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        publishableKey,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating payment intent:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

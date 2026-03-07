import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Map tier amounts (in dollars) to Stripe price IDs
const PRICE_MAP: Record<number, string> = {
  60: "price_1T8SA31zcEEWFefragoNBjYI",
  100: "price_1T8SAe1zcEEWFefrBjKWjnyr",
  200: "price_1T8SAn1zcEEWFefrIxLPQga6",
  500: "price_1T8SBG1zcEEWFefr7P5kMTjz",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const { amount, guestName, message } = await req.json();

    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    const priceId = PRICE_MAP[amount];
    const origin = req.headers.get("origin") || "https://smart-union-hub.lovable.app";

    let sessionConfig: any = {
      mode: "payment",
      success_url: `${origin}/?gift=success`,
      cancel_url: `${origin}/?gift=cancelled`,
      metadata: {
        guest_name: guestName || "Anonymous",
        message: message || "",
      },
    };

    if (priceId) {
      // Use pre-created price for standard tiers
      sessionConfig.line_items = [{ price: priceId, quantity: 1 }];
    } else {
      // Custom amount - use price_data
      sessionConfig.line_items = [{
        price_data: {
          currency: "usd",
          product_data: {
            name: `Wedding Gift - Custom $${amount}`,
            description: "A loving contribution to the wedding",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating gift payment:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

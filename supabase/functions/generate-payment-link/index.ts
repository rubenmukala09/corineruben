import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GENERATE-PAYMENT-LINK] ${step}${detailsStr}`);
};

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    logStep("Stripe key verified");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const body = await req.json();
    const { amount, items = [] } = body;

    logStep("Request body parsed", { amount, itemCount: items.length });

    if (!amount || amount < 50) {
      throw new Error("Amount must be at least 50 cents");
    }

    // Create line items for the payment link
    const lineItems = items.length > 0 
      ? items.map((item: CartItem) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }))
      : [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Order Total',
            },
            unit_amount: amount,
          },
          quantity: 1,
        }];

    // Create a payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: lineItems,
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${req.headers.get("origin") || 'https://invisionnetwork.org'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        },
      },
    });

    logStep("Payment link created", { 
      paymentLinkId: paymentLink.id,
      url: paymentLink.url
    });

    return new Response(JSON.stringify({
      url: paymentLink.url,
      id: paymentLink.id,
    }), {
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

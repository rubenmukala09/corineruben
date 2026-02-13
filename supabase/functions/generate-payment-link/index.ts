import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[${timestamp}] [QR-PAYMENT-LINK] ${step}${detailsStr}`);
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

  const requestId = crypto.randomUUID().slice(0, 8);
  logStep(`Request ${requestId} - Function invoked`, { method: req.method });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep(`Request ${requestId} - ERROR: Missing STRIPE_SECRET_KEY`);
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    logStep(`Request ${requestId} - Stripe key verified`);

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    const body = await req.json();
    const { amount, items = [], customerEmail, customerName } = body;

    logStep(`Request ${requestId} - Parsed request`, {
      amount,
      itemCount: items.length,
      customerEmail: customerEmail
        ? `${customerEmail.slice(0, 3)}***`
        : "not provided",
      customerName: customerName || "not provided",
      items: items.map((i: CartItem) => ({
        name: i.name,
        qty: i.quantity,
        price: i.price,
      })),
    });

    if (!amount || amount < 50) {
      logStep(`Request ${requestId} - ERROR: Invalid amount`, { amount });
      throw new Error("Amount must be at least 50 cents");
    }

    // Calculate total from items for verification
    const calculatedTotal =
      items.length > 0
        ? items.reduce(
            (sum: number, item: CartItem) =>
              sum + item.price * item.quantity * 100,
            0,
          )
        : amount;

    logStep(`Request ${requestId} - Amount verification`, {
      providedAmount: amount,
      calculatedTotal,
      match: Math.abs(calculatedTotal - amount) < 2,
    });

    // Create line items for the payment link
    const lineItems =
      items.length > 0
        ? items.map((item: CartItem) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          }))
        : [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Order Total",
                },
                unit_amount: amount,
              },
              quantity: 1,
            },
          ];

    logStep(`Request ${requestId} - Creating Stripe payment link`, {
      lineItemCount: lineItems.length,
    });

    const origin = req.headers.get("origin") || "https://invisionnetwork.org";

    // Create a payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: lineItems,
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&method=qr`,
        },
      },
      metadata: {
        request_id: requestId,
        customer_email: customerEmail || "",
        customer_name: customerName || "",
        item_count: String(items.length),
        payment_method: "qr_code",
      },
    });

    logStep(`Request ${requestId} - Payment link created successfully`, {
      paymentLinkId: paymentLink.id,
      url: paymentLink.url?.slice(0, 50) + "...",
      active: paymentLink.active,
    });

    // Log to database if available
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from("analytics_events").insert({
          event_name: "qr_payment_link_generated",
          event_category: "payment",
          event_data: {
            request_id: requestId,
            payment_link_id: paymentLink.id,
            amount_cents: amount,
            item_count: items.length,
            customer_email: customerEmail || null,
          },
        });

        logStep(`Request ${requestId} - Analytics event logged`);
      }
    } catch (analyticsError) {
      logStep(
        `Request ${requestId} - Analytics logging failed (non-critical)`,
        {
          error: String(analyticsError),
        },
      );
    }

    return new Response(
      JSON.stringify({
        url: paymentLink.url,
        id: paymentLink.id,
        requestId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep(`Request ${requestId} - FATAL ERROR`, {
      message: errorMessage,
      stack: error instanceof Error ? error.stack?.slice(0, 200) : undefined,
    });

    return new Response(
      JSON.stringify({
        error: errorMessage,
        requestId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

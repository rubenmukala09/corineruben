import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CREATE-CART-PAYMENT-INTENT] ${step}${detailsStr}`);
};

interface CartItem {
  id: string;
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

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    const body = await req.json();
    const {
      amount, // Amount in cents
      customerEmail,
      customerName,
      isVeteran = false,
      items = [],
      metadata = {},
    } = body;

    logStep("Request body parsed", {
      amount,
      customerEmail,
      isVeteran,
      itemCount: items.length,
    });

    if (!amount || !customerEmail) {
      throw new Error("Missing required fields: amount, customerEmail");
    }

    if (amount < 50) {
      throw new Error("Amount must be at least 50 cents");
    }

    // Check if customer already exists
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });
    let customerId: string;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create new customer
      const newCustomer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          isVeteran: isVeteran ? "true" : "false",
        },
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    // Build items description for metadata
    const itemsDescription = items
      .map((item: CartItem) => `${item.name} x${item.quantity}`)
      .join(", ");

    // Create PaymentIntent with the raw amount
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customerId,
      amount: Math.round(amount), // Ensure it's an integer
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        isVeteran: isVeteran ? "true" : "false",
        customerName: customerName || "",
        itemsDescription: itemsDescription.substring(0, 500), // Stripe metadata limit
        itemCount: items.length.toString(),
        ...metadata,
      },
    });

    logStep("PaymentIntent created", {
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      clientSecret: paymentIntent.client_secret ? "present" : "missing",
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId,
        amount: paymentIntent.amount,
        type: "payment",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

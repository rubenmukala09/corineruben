import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT-INTENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
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
    const { 
      priceId, 
      mode, // 'payment' or 'subscription'
      customerEmail, 
      customerName,
      isVeteran = false,
      metadata = {}
    } = body;

    logStep("Request body parsed", { priceId, mode, customerEmail, isVeteran });

    if (!priceId || !mode || !customerEmail) {
      throw new Error("Missing required fields: priceId, mode, customerEmail");
    }

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
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
          isVeteran: isVeteran ? 'true' : 'false',
          ...metadata
        }
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    // Get price details to calculate amount
    const price = await stripe.prices.retrieve(priceId);
    logStep("Price retrieved", { priceId, amount: price.unit_amount });

    if (mode === "subscription") {
      // Create subscription with incomplete status to get client secret
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: { 
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          isVeteran: isVeteran ? 'true' : 'false',
          customerName: customerName || '',
          ...metadata
        }
      });

      const invoice = subscription.latest_invoice as Stripe.Invoice;
      
      // Safely access payment_intent
      if (!invoice || !invoice.payment_intent) {
        logStep("ERROR: No payment intent on invoice", { 
          subscriptionId: subscription.id,
          invoiceId: invoice?.id,
          invoiceStatus: invoice?.status
        });
        throw new Error("Failed to create subscription payment intent");
      }
      
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

      if (!paymentIntent.client_secret) {
        logStep("ERROR: No client secret on payment intent", { 
          paymentIntentId: paymentIntent.id,
          paymentIntentStatus: paymentIntent.status
        });
        throw new Error("Failed to get payment client secret");
      }

      logStep("Subscription created", { 
        subscriptionId: subscription.id, 
        paymentIntentId: paymentIntent.id,
        clientSecret: "present" 
      });

      return new Response(JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        subscriptionId: subscription.id,
        customerId,
        amount: price.unit_amount,
        type: "subscription"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });

    } else {
      // One-time payment - create PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        customer: customerId,
        amount: price.unit_amount!,
        currency: price.currency,
        automatic_payment_methods: { enabled: true },
        metadata: {
          priceId,
          isVeteran: isVeteran ? 'true' : 'false',
          customerName: customerName || '',
          ...metadata
        }
      });

      logStep("PaymentIntent created", { 
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret ? "present" : "missing"
      });

      return new Response(JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId,
        amount: price.unit_amount,
        type: "payment"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

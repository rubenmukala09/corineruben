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
        expand: ["latest_invoice.payment_intent", "pending_setup_intent"],
        metadata: {
          isVeteran: isVeteran ? 'true' : 'false',
          customerName: customerName || '',
          ...metadata
        }
      });

      logStep("Subscription created", { subscriptionId: subscription.id });

      let clientSecret: string | null = null;
      let paymentIntentId: string | null = null;
      const invoice = subscription.latest_invoice as Stripe.Invoice | null;

      // Strategy 1: Try to get client_secret from invoice's payment_intent
      if (invoice?.payment_intent && typeof invoice.payment_intent !== 'string') {
        const pi = invoice.payment_intent as Stripe.PaymentIntent;
        if (pi.client_secret) {
          clientSecret = pi.client_secret;
          paymentIntentId = pi.id;
          logStep("Got client_secret from invoice payment_intent", { paymentIntentId });
        }
      }

      // Strategy 2: Try pending_setup_intent (for $0 trials or setup-only flows)
      if (!clientSecret && subscription.pending_setup_intent) {
        const setupIntent = typeof subscription.pending_setup_intent === 'string'
          ? await stripe.setupIntents.retrieve(subscription.pending_setup_intent)
          : subscription.pending_setup_intent as Stripe.SetupIntent;
        
        if (setupIntent.client_secret) {
          clientSecret = setupIntent.client_secret;
          logStep("Got client_secret from pending_setup_intent", { setupIntentId: setupIntent.id });
          
          return new Response(JSON.stringify({
            clientSecret,
            subscriptionId: subscription.id,
            customerId,
            amount: price.unit_amount,
            type: "setup" // Different type for frontend to handle
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
      }

      // Strategy 3: Manually create a PaymentIntent for the subscription's first invoice
      if (!clientSecret && invoice) {
        logStep("Creating manual PaymentIntent for subscription invoice", { invoiceId: invoice.id });
        
        const manualPaymentIntent = await stripe.paymentIntents.create({
          customer: customerId,
          amount: price.unit_amount!,
          currency: price.currency,
          automatic_payment_methods: { enabled: true },
          metadata: {
            subscriptionId: subscription.id,
            invoiceId: invoice.id,
            priceId,
            isVeteran: isVeteran ? 'true' : 'false',
            customerName: customerName || '',
          }
        });

        clientSecret = manualPaymentIntent.client_secret;
        paymentIntentId = manualPaymentIntent.id;
        logStep("Manual PaymentIntent created", { paymentIntentId });
      }

      // Final check - if we still don't have a client secret, error out
      if (!clientSecret) {
        logStep("ERROR: Could not obtain client_secret after all strategies", {
          subscriptionId: subscription.id,
          invoiceId: invoice?.id,
          invoiceStatus: invoice?.status
        });
        throw new Error("Failed to create payment intent for subscription");
      }

      logStep("Returning subscription response", { 
        subscriptionId: subscription.id, 
        paymentIntentId,
        clientSecret: "present" 
      });

      return new Response(JSON.stringify({
        clientSecret,
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

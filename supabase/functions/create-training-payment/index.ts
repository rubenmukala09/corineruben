import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-TRAINING-PAYMENT] ${step}${detailsStr}`);
};

interface TrainingPaymentRequest {
  serviceType: string;
  serviceName: string;
  serviceTier?: string;
  amount: number; // in dollars
  customerEmail: string;
  customerName: string;
  isVeteran?: boolean;
  preferredDate?: string;
  phone?: string;
  message?: string;
  state?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const {
      serviceType,
      serviceName,
      serviceTier,
      amount,
      customerEmail,
      customerName,
      isVeteran = false,
      preferredDate,
      phone,
      message,
      state
    }: TrainingPaymentRequest = await req.json();

    logStep("Request data", { serviceType, serviceName, amount, customerEmail, isVeteran });

    if (!customerEmail || !customerName || !amount) {
      throw new Error("Missing required fields: customerEmail, customerName, or amount");
    }

    // Calculate veteran discount (10%)
    const veteranDiscount = isVeteran ? amount * 0.10 : 0;
    const finalAmount = amount - veteranDiscount;
    const amountInCents = Math.round(finalAmount * 100);

    logStep("Calculated pricing", { 
      originalAmount: amount, 
      veteranDiscount, 
      finalAmount, 
      amountInCents 
    });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId: string | undefined;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create new customer
      const newCustomer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        phone: phone || undefined,
        metadata: {
          isVeteran: isVeteran ? 'true' : 'false',
          state: state || ''
        }
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    // Create payment intent with metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      customer: customerId,
      metadata: {
        paymentType: 'training',
        serviceType,
        serviceName,
        serviceTier: serviceTier || '',
        isVeteran: isVeteran ? 'true' : 'false',
        veteranDiscount: veteranDiscount.toString(),
        originalAmount: amount.toString(),
        preferredDate: preferredDate || '',
        customerName,
        customerEmail,
        phone: phone || '',
        message: message || '',
        state: state || ''
      },
      automatic_payment_methods: {
        enabled: true,
      },
      description: `Training: ${serviceName}${serviceTier ? ` - ${serviceTier}` : ''}`
    });

    logStep("Created payment intent", { 
      paymentIntentId: paymentIntent.id, 
      amount: amountInCents 
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId,
        amount: amountInCents,
        originalAmount: amount,
        veteranDiscount,
        finalAmount
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[PROCESS-DONATION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    logStep("Function started");
    
    const { 
      donorName, 
      email, 
      amount, 
      donationType, 
      message,
      donationId 
    } = await req.json();

    logStep("Request data", { donorName, email, amount, donationType, donationId });

    if (!email || !amount || amount < 5) {
      throw new Error("Email and amount (minimum $5) are required");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists or create one
    let customerId;
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email,
        name: donorName,
        metadata: { source: 'donation' }
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    const origin = req.headers.get("origin") || "https://invisionnetwork.org";
    
    let session;
    
    if (donationType === 'monthly') {
      // Create recurring donation via subscription checkout
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Monthly Donation',
                description: `Monthly recurring donation to InVision Network`,
              },
              unit_amount: Math.round(amount * 100),
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=donation`,
        cancel_url: `${origin}/payment-canceled`,
        metadata: {
          donation_id: donationId || '',
          donation_type: 'monthly',
          donor_name: donorName,
          message: message || '',
        },
      });
      logStep("Created subscription checkout session", { sessionId: session.id });
    } else {
      // Create one-time donation via payment checkout
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'One-Time Donation',
                description: `One-time donation to InVision Network`,
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=donation`,
        cancel_url: `${origin}/payment-canceled`,
        metadata: {
          donation_id: donationId || '',
          donation_type: 'one-time',
          donor_name: donorName,
          message: message || '',
        },
      });
      logStep("Created payment checkout session", { sessionId: session.id });
    }

    // Update donation record with pending status
    if (donationId) {
      await supabaseClient
        .from('donations')
        .update({ 
          stripe_payment_id: session.id,
          payment_status: 'processing'
        })
        .eq('id', donationId);
      logStep("Updated donation record", { donationId });
    }

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
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

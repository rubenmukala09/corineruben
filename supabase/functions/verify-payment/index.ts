import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const { session_id } = await req.json();
    if (!session_id) throw new Error("session_id is required");
    
    logStep("Verifying session", { session_id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    // Retrieve the checkout session with expanded line items
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'line_items.data.price.product'],
    });

    logStep("Session retrieved", { 
      status: session.payment_status,
      mode: session.mode,
      customer_email: session.customer_email
    });

    if (session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ 
        verified: false,
        status: session.payment_status,
        message: "Payment not completed"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Determine product types from line items
    const lineItems = session.line_items?.data || [];
    let hasDigital = false;
    let hasPhysical = false;
    let isSubscription = session.mode === 'subscription';
    const productNames: string[] = [];

    for (const item of lineItems) {
      const product = item.price?.product;
      if (typeof product === 'object' && product !== null) {
        const productName = (product as any).name || 'Product';
        productNames.push(productName);
        
        // Check product metadata or name for type
        const metadata = (product as any).metadata || {};
        const name = productName.toLowerCase();
        
        if (metadata.type === 'digital' || 
            name.includes('guide') || 
            name.includes('training') || 
            name.includes('course') ||
            name.includes('book') ||
            name.includes('ebook')) {
          hasDigital = true;
        } else if (metadata.type === 'physical' ||
            name.includes('key') ||
            name.includes('wallet') ||
            name.includes('usb') ||
            name.includes('cover')) {
          hasPhysical = true;
        }
      }
    }

    // Initialize Supabase client for database updates
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Update order status if we have an order_id in metadata
    const orderId = session.metadata?.order_id;
    if (orderId) {
      const { error: updateError } = await supabaseClient
        .from('partner_orders')
        .update({ 
          status: 'paid',
          payment_status: 'completed'
        })
        .eq('id', orderId);
      
      if (updateError) {
        logStep("Error updating order", { error: updateError.message });
      } else {
        logStep("Order updated to paid", { orderId });
      }
    }

    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.customer_details?.name;

    // Automatically trigger digital product delivery if there are digital products
    if (hasDigital && customerEmail) {
      logStep("Triggering digital product delivery", { email: customerEmail, products: productNames });
      
      try {
        const digitalProducts = productNames.map(name => ({
          name,
          download_url: `https://avoafweoebstkgjnbadv.supabase.co/storage/v1/object/public/digital-products/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}.pdf`
        }));

        // Call send-digital-download function
        const downloadResponse = await fetch(
          `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-digital-download`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
            },
            body: JSON.stringify({
              customer_email: customerEmail,
              customer_name: customerName,
              products: digitalProducts,
              order_id: orderId,
            }),
          }
        );

        const downloadResult = await downloadResponse.json();
        logStep("Digital delivery result", downloadResult);
      } catch (deliveryError) {
        logStep("Warning: Digital delivery failed", { error: String(deliveryError) });
        // Don't fail the entire verification if delivery fails
      }
    }

    // Prepare response
    const response = {
      verified: true,
      status: 'paid',
      mode: session.mode,
      customer_email: customerEmail,
      product_type: hasPhysical && hasDigital ? 'mixed' : hasDigital ? 'digital' : hasPhysical ? 'physical' : 'subscription',
      is_subscription: isSubscription,
      products: productNames,
      amount_total: session.amount_total,
      currency: session.currency,
      digital_delivery_triggered: hasDigital,
    };

    logStep("Verification complete", response);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage, verified: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

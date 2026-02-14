import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[${timestamp}] [VERIFY-PAYMENT-LINK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID().slice(0, 8);
  logStep(`Request ${requestId} - Verification started`);

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep(`Request ${requestId} - ERROR: Missing STRIPE_SECRET_KEY`);
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    const body = await req.json();
    const { paymentLinkId, sessionId } = body;

    logStep(`Request ${requestId} - Checking payment`, {
      paymentLinkId: paymentLinkId?.slice(0, 10) + "...",
      sessionId: sessionId?.slice(0, 10) + "...",
    });

    if (!paymentLinkId && !sessionId) {
      throw new Error("paymentLinkId or sessionId required");
    }

    // If we have a session ID, check it directly
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        logStep(`Request ${requestId} - Session retrieved`, {
          status: session.payment_status,
          amount: session.amount_total,
        });

        return new Response(
          JSON.stringify({
            paid: session.payment_status === "paid",
            status: session.payment_status,
            amount: session.amount_total,
            customerEmail: session.customer_details?.email,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      } catch (err) {
        logStep(`Request ${requestId} - Session check failed`, {
          error: String(err),
        });
      }
    }

    // Check payment link sessions
    if (paymentLinkId) {
      const sessions = await stripe.checkout.sessions.list({
        payment_link: paymentLinkId,
        limit: 5,
      });

      logStep(`Request ${requestId} - Found sessions`, {
        count: sessions.data.length,
      });

      const paidSession = sessions.data.find(
        (s: any) => s.payment_status === "paid",
      );

      if (paidSession) {
        logStep(`Request ${requestId} - Payment confirmed`, {
          sessionId: paidSession.id,
          amount: paidSession.amount_total,
        });

        return new Response(
          JSON.stringify({
            paid: true,
            status: "paid",
            amount: paidSession.amount_total,
            customerEmail: paidSession.customer_details?.email,
            sessionId: paidSession.id,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      }
    }

    logStep(`Request ${requestId} - Payment not found yet`);

    return new Response(
      JSON.stringify({
        paid: false,
        status: "pending",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep(`Request ${requestId} - ERROR`, { message: errorMessage });

    return new Response(
      JSON.stringify({
        error: errorMessage,
        paid: false,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

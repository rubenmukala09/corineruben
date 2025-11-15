import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, type, data } = await req.json();
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(resendApiKey);

    let subject = "";
    let html = "";

    switch (type) {
      case "subscription_created":
        subject = `Welcome to ${data.serviceName}!`;
        html = `
          <h1>Subscription Confirmed</h1>
          <p>Thank you for subscribing to ${data.serviceName} - ${data.planTier}!</p>
          <p><strong>Amount:</strong> $${(data.amount / 100).toFixed(2)}/month</p>
          <p><strong>Next billing date:</strong> ${new Date(data.nextBillingDate).toLocaleDateString()}</p>
          <p>You can manage your subscription anytime from your portal.</p>
        `;
        break;

      case "payment_success":
        subject = "Payment Successful";
        html = `
          <h1>Payment Received</h1>
          <p>Your payment of $${(data.amount / 100).toFixed(2)} has been successfully processed.</p>
          <p><strong>Next billing date:</strong> ${new Date(data.nextBillingDate).toLocaleDateString()}</p>
        `;
        break;

      case "payment_failed":
        subject = "Payment Failed - Action Required";
        html = `
          <h1>Payment Failed</h1>
          <p>We were unable to process your payment of $${(data.amount / 100).toFixed(2)}.</p>
          <p>Please update your payment method to avoid service interruption.</p>
          <p><a href="${data.updatePaymentUrl}">Update Payment Method</a></p>
        `;
        break;

      case "subscription_cancelled":
        subject = "Subscription Cancelled";
        html = `
          <h1>Subscription Cancelled</h1>
          <p>Your subscription to ${data.serviceName} has been cancelled.</p>
          <p>You will continue to have access until ${new Date(data.endDate).toLocaleDateString()}.</p>
        `;
        break;

      default:
        throw new Error("Unknown email type");
    }

    const emailResponse = await resend.emails.send({
      from: "InVision <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
    });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

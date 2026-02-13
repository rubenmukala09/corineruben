import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const webhook = await req.json();

    console.log("Received webhook:", webhook.type);

    const emailId = webhook.data?.email_id;
    if (!emailId) {
      throw new Error("No email ID in webhook");
    }

    // Find the email delivery log by resend_email_id
    const { data: logEntry, error: findError } = await supabase
      .from("email_delivery_logs")
      .select("*")
      .eq("resend_email_id", emailId)
      .single();

    if (findError || !logEntry) {
      console.log("Email log not found for ID:", emailId);
      return new Response(JSON.stringify({ message: "Email log not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update based on webhook type
    const updates: Record<string, unknown> = {};

    switch (webhook.type) {
      case "email.delivered":
        updates.delivered_at = new Date().toISOString();
        break;

      case "email.opened":
        updates.opened_at = new Date().toISOString();
        break;

      case "email.clicked":
        updates.clicked_at = new Date().toISOString();
        break;

      case "email.bounced":
        updates.bounced = true;
        updates.bounce_reason = webhook.data?.reason || "Unknown";
        break;

      case "email.complained":
        // Handle spam complaints
        updates.metadata = {
          ...logEntry.metadata,
          complained: true,
          complaint_date: new Date().toISOString(),
        };
        break;

      default:
        console.log("Unhandled webhook type:", webhook.type);
    }

    // Update the email delivery log
    if (Object.keys(updates).length > 0) {
      await supabase
        .from("email_delivery_logs")
        .update(updates)
        .eq("id", logEntry.id);
    }

    // Update campaign metrics if applicable
    if (logEntry.campaign_name && logEntry.campaign_name !== "Automated") {
      await updateCampaignMetrics(supabase, webhook.type);
    }

    return new Response(
      JSON.stringify({ message: "Webhook processed successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error in process-email-webhooks:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

async function updateCampaignMetrics(
  supabase: ReturnType<typeof createClient>,
  webhookType: string,
) {
  // Recalculate open and click rates for campaigns
  // This would involve aggregating data from email_delivery_logs
  // For now, we'll just log it
  console.log("Should update campaign metrics for:", webhookType);
}

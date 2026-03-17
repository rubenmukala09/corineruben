import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// deno-lint-ignore no-explicit-any
type SupabaseClient = any;

type Campaign = {
  id: string;
  campaign_type: string;
  schedule_config?: {
    frequency?: string;
    day_of_month?: number;
  } | null;
  target_audience?: string | null;
  template_id?: string | null;
  sent_count?: number | null;
};

type EmailRow = {
  email: string;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch active campaigns that need processing
    const { data: activeCampaigns, error: campaignsError } = await supabase
      .from("email_campaigns")
      .select("*")
      .eq("status", "active");

    if (campaignsError) throw campaignsError;

    if (!activeCampaigns || activeCampaigns.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active campaigns", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const campaigns = activeCampaigns as Campaign[];

    console.log(`Processing ${campaigns.length} active campaigns...`);

    let scheduledCount = 0;

    for (const campaign of campaigns) {
      try {
        // Handle different campaign types
        if (campaign.campaign_type === "recurring") {
          // Check if it's time to send based on schedule_config
          const scheduleConfig = campaign.schedule_config ?? {};
          const now = new Date();

          // Example: Monthly newsletter on 1st of month
          if (scheduleConfig.frequency === "monthly") {
            const dayOfMonth = now.getDate();
            const scheduledDay = scheduleConfig.day_of_month || 1;

            if (dayOfMonth === scheduledDay) {
              // Check if already sent this month
              const { data: recentSends } = await supabase
                .from("scheduled_emails")
                .select("id")
                .eq("campaign_id", campaign.id)
                .gte(
                  "created_at",
                  new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
                )
                .limit(1);

              if (!recentSends || recentSends.length === 0) {
                // Schedule emails for all subscribers
                await scheduleForCampaign(supabase, campaign);
                scheduledCount++;
              }
            }
          }
        } else if (campaign.campaign_type === "one-time") {
          // Check if already sent
          const { data: existingSends } = await supabase
            .from("scheduled_emails")
            .select("id")
            .eq("campaign_id", campaign.id)
            .limit(1);

          if (!existingSends || existingSends.length === 0) {
            await scheduleForCampaign(supabase, campaign);
            scheduledCount++;

            // Mark campaign as completed
            await supabase
              .from("email_campaigns")
              .update({ status: "completed" })
              .eq("id", campaign.id);
          }
        }
      } catch (error) {
        console.error(`Error processing campaign ${campaign.id}:`, error);
      }
    }

    // Trigger send-automated-email function
    if (scheduledCount > 0) {
      await fetch(`${SUPABASE_URL}/functions/v1/send-automated-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Campaign scheduling complete",
        campaigns_processed: campaigns.length,
        emails_scheduled: scheduledCount,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error in schedule-campaign-emails:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

async function scheduleForCampaign(
  supabase: SupabaseClient,
  campaign: Campaign,
) {
  // Get target audience
  let recipients: string[] = [];

  if (campaign.target_audience === "all_subscribers") {
    const { data: subscribers } = await supabase
      .from("newsletter_subscribers")
      .select("email");
    recipients = (subscribers as EmailRow[] | null)?.map((s) => s.email) || [];
  } else if (campaign.target_audience === "new_customers") {
    const { data: newCustomers } = await supabase
      .from("booking_requests")
      .select("email")
      .gte(
        "created_at",
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      );
    recipients = (newCustomers as EmailRow[] | null)?.map((c) => c.email) || [];
  }

  // Schedule emails for each recipient
  const emailsToInsert = recipients.map((email) => ({
    recipient_email: email,
    template_id: campaign.template_id,
    campaign_id: campaign.id,
    scheduled_for: new Date().toISOString(),
    template_data: {},
  }));

  if (emailsToInsert.length > 0) {
    await supabase.from("scheduled_emails").insert(emailsToInsert);

    // Update campaign sent count
    await supabase
      .from("email_campaigns")
      .update({
        sent_count: (campaign.sent_count ?? 0) + emailsToInsert.length,
      })
      .eq("id", campaign.id);
  }
}

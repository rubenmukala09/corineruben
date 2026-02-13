import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ScheduledEmail {
  id: string;
  recipient_email: string;
  template_id: string;
  template_data: Record<string, string>;
  campaign_id?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch pending emails scheduled for now or earlier
    const { data: pendingEmails, error: fetchError } = await supabase
      .from("scheduled_emails")
      .select("*, email_templates(name, subject, html_body, text_body)")
      .eq("status", "pending")
      .lte("scheduled_for", new Date().toISOString())
      .lt("attempts", 3)
      .limit(50);

    if (fetchError) throw fetchError;

    if (!pendingEmails || pendingEmails.length === 0) {
      return new Response(
        JSON.stringify({ message: "No emails to send", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log(`Processing ${pendingEmails.length} emails...`);

    let successCount = 0;
    let failureCount = 0;

    for (const email of pendingEmails) {
      try {
        const template = email.email_templates;
        if (!template) {
          throw new Error("Template not found");
        }

        // Render template with data
        let htmlBody = template.html_body;
        let subject = template.subject;
        let textBody = template.text_body || "";

        // Replace template variables
        if (email.template_data) {
          for (const [key, value] of Object.entries(email.template_data)) {
            const regex = new RegExp(`{{${key}}}`, "g");
            htmlBody = htmlBody.replace(regex, String(value));
            subject = subject.replace(regex, String(value));
            textBody = textBody.replace(regex, String(value));
          }
        }

        // Send email via Resend
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "InVision Network <noreply@invisionnetwork.org>",
            to: [email.recipient_email],
            subject: subject,
            html: htmlBody,
            text: textBody,
          }),
        });

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
          throw new Error(resendData.message || "Failed to send email");
        }

        // Update email status to sent
        await supabase
          .from("scheduled_emails")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
          })
          .eq("id", email.id);

        // Log successful delivery
        await supabase.from("email_delivery_logs").insert({
          scheduled_email_id: email.id,
          recipient_email: email.recipient_email,
          template_name: template.name,
          campaign_name: email.campaign_id ? "Campaign" : "Automated",
          sent_at: new Date().toISOString(),
          resend_email_id: resendData.id,
          metadata: { resend_response: resendData },
        });

        successCount++;
      } catch (error: any) {
        console.error(`Failed to send email ${email.id}:`, error);

        // Update email with error and increment attempts
        await supabase
          .from("scheduled_emails")
          .update({
            status: "failed",
            error_message: error.message || "Unknown error",
            attempts: email.attempts + 1,
          })
          .eq("id", email.id);

        failureCount++;
      }
    }

    return new Response(
      JSON.stringify({
        message: "Email processing complete",
        processed: pendingEmails.length,
        success: successCount,
        failed: failureCount,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    console.error("Error in send-automated-email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

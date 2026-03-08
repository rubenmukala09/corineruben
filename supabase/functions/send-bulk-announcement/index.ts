import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    // Verify authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Unauthorized");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Unauthorized");

    const { subject, content } = await req.json();
    if (!subject?.trim() || !content?.trim()) throw new Error("Subject and content are required");

    // Gather all unique emails from newsletter_subscribers + rsvps
    const [subRes, rsvpRes] = await Promise.all([
      supabase.from("newsletter_subscribers").select("email"),
      supabase.from("rsvps").select("email").not("email", "is", null),
    ]);

    const emailSet = new Set<string>();
    if (subRes.data) subRes.data.forEach((s: { email: string }) => emailSet.add(s.email.toLowerCase()));
    if (rsvpRes.data) rsvpRes.data.forEach((r: { email: string | null }) => {
      if (r.email) emailSet.add(r.email.toLowerCase());
    });

    const allEmails = Array.from(emailSet);

    if (allEmails.length === 0) {
      return new Response(JSON.stringify({ success: true, sent: 0, message: "No recipients found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Send in batches of 50 (Resend batch limit)
    let sentCount = 0;
    const batchSize = 50;

    for (let i = 0; i < allEmails.length; i += batchSize) {
      const batch = allEmails.slice(i, i + batchSize);

      const emailPromises = batch.map((email) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `Corine & Ruben <${Deno.env.get("SENDER_EMAIL") ?? "onboarding@resend.dev"}>`,
            to: [email],
            subject: subject.trim(),
            html: `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <span style="font-size: 48px;">💌</span>
                  <h1 style="color: #7c3aed; font-size: 28px; margin: 16px 0 8px;">${subject.trim()}</h1>
                  <p style="color: #6b7280; font-size: 14px;">A message from Corine & Ruben</p>
                </div>
                <div style="background: #f9fafb; border-radius: 16px; padding: 24px; margin: 24px 0;">
                  <div style="color: #374151; font-size: 14px; line-height: 1.8;">
                    ${content.trim().replace(/\n/g, "<br />")}
                  </div>
                </div>
                <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                  <p style="color: #374151; font-size: 14px; margin: 0;">With all our love,</p>
                  <p style="color: #7c3aed; font-size: 18px; font-weight: bold; margin: 8px 0;">Corine & Ruben 💕</p>
                </div>
              </div>
            `,
          }),
        }).then(async (r) => {
          await r.text(); // consume body
          return r.ok;
        })
      );

      const results = await Promise.all(emailPromises);
      sentCount += results.filter(Boolean).length;
    }

    console.log(`Bulk email sent to ${sentCount}/${allEmails.length} recipients`);

    return new Response(JSON.stringify({ success: true, sent: sentCount, total: allEmails.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error sending bulk announcement:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

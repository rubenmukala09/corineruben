import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function sendEmail(apiKey: string, payload: object): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.text();
      console.warn("Resend rejected email:", err);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("Resend fetch error:", e);
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const { name, email, message } = await req.json();
    if (!name || !email || !message) throw new Error("Missing required fields: name, email, message");

    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "corrinemaloba@gmail.com";
    const FROM_TEST   = "onboarding@resend.dev";

    // Always sends to account owner — works without domain verification
    await sendEmail(RESEND_API_KEY, {
      from: `Wedding Website <${FROM_TEST}>`,
      to: [ADMIN_EMAIL],
      subject: `New contact message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px;">
          <h2 style="color: #7c3aed; margin-bottom: 4px;">New Contact Form Submission 📬</h2>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 20px;" />
          <table style="width:100%; font-size:14px; color:#374151; border-collapse:collapse;">
            <tr><td style="padding:6px 0; font-weight:600; width:100px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding:6px 0; font-weight:600;">Email</td><td><a href="mailto:${email}" style="color:#7c3aed;">${email}</a></td></tr>
          </table>
          <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #7c3aed;">
            <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.7;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
          <p style="font-size:12px; color:#9ca3af; margin-top:24px;">Sent from your wedding website · corineandruben.com</p>
        </div>`,
    });

    return new Response(JSON.stringify({ success: true, emailSent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-contact-email error:", msg);
    return new Response(
      JSON.stringify({ success: false, emailSent: false, reason: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  }
});

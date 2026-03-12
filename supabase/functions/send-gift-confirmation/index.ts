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

    const { guestName, guestEmail, amount, message } = await req.json();

    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "corrinemaloba@gmail.com";
    const FROM_TEST   = "onboarding@resend.dev";
    const FROM_PROD   = Deno.env.get("SENDER_EMAIL") ?? FROM_TEST;

    // Admin notification — always reaches inbox (account owner)
    await sendEmail(RESEND_API_KEY, {
      from: `Wedding Website <${FROM_TEST}>`,
      to: [ADMIN_EMAIL],
      subject: `New gift received from ${guestName ?? "a guest"} 💝`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px;">
          <h2 style="color: #7c3aed; margin-bottom: 4px;">New Gift Received 💝</h2>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 20px;" />
          <table style="width:100%; font-size:14px; color:#374151; border-collapse:collapse;">
            <tr><td style="padding:6px 0; font-weight:600; width:100px;">From</td><td>${guestName ?? "—"}</td></tr>
            <tr><td style="padding:6px 0; font-weight:600;">Email</td><td>${guestEmail ?? "—"}</td></tr>
            <tr><td style="padding:6px 0; font-weight:600;">Amount</td><td style="color:#7c3aed; font-weight:700;">$${amount}</td></tr>
            ${message ? `<tr><td style="padding:6px 0; font-weight:600; vertical-align:top;">Message</td><td style="font-style:italic;">"${message}"</td></tr>` : ""}
          </table>
          <p style="font-size:12px; color:#9ca3af; margin-top:24px;">Sent from your wedding website · corineandruben.com</p>
        </div>`,
    });

    // Guest thank-you (works once custom domain is verified in Resend)
    if (guestEmail) {
      await sendEmail(RESEND_API_KEY, {
        from: `Wedding Gifts <${FROM_PROD}>`,
        to: [guestEmail],
        subject: `Thank you for your generous gift, ${guestName ?? "Friend"}! 💕`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 32px;">
              <span style="font-size: 48px;">💝</span>
              <h1 style="color: #7c3aed; font-size: 28px; margin: 16px 0 8px;">Thank You So Much!</h1>
              <p style="color: #6b7280; font-size: 14px;">Your generosity means the world to us</p>
            </div>
            <div style="background: #f9fafb; border-radius: 16px; padding: 24px; margin: 24px 0; text-align: center;">
              <p style="color: #374151; font-size: 16px; margin: 0 0 8px;">Dear <strong>${guestName ?? "Friend"}</strong>,</p>
              <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0;">
                We are deeply grateful for your generous gift of
                <strong style="color: #7c3aed; font-size: 20px;">$${amount}</strong>.
                Your love and support mean everything to us as we begin this new chapter together.
              </p>
            </div>
            ${message ? `
              <div style="border-left: 3px solid #7c3aed; padding: 12px 16px; margin: 24px 0; background: #faf5ff; border-radius: 0 12px 12px 0;">
                <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px;">Your message:</p>
                <p style="color: #374151; font-size: 14px; font-style: italic; margin: 0;">"${message}"</p>
              </div>` : ""}
            <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              <p style="color: #374151; font-size: 14px; margin: 0;">With all our love,</p>
              <p style="color: #7c3aed; font-size: 18px; font-weight: bold; margin: 8px 0;">Corine &amp; Ruben 💕</p>
            </div>
          </div>`,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-gift-confirmation error:", msg);
    return new Response(
      JSON.stringify({ success: false, reason: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  }
});

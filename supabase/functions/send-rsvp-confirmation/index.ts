import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Send one email via Resend; returns true on success, false on failure (never throws).
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

    const { guestName, guestEmail, attending, guests } = await req.json();

    // ── Admin email (account-owner address — works without domain verification) ──
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "corrinemaloba@gmail.com";
    const FROM_TEST   = "onboarding@resend.dev";             // Resend's pre-verified sender
    const FROM_PROD   = Deno.env.get("SENDER_EMAIL") ?? FROM_TEST;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px;">
        <h2 style="color: #7c3aed; margin-bottom: 4px;">New RSVP received 💌</h2>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 20px;" />
        <table style="width:100%; font-size:14px; color:#374151; border-collapse:collapse;">
          <tr><td style="padding:6px 0; font-weight:600; width:120px;">Name</td><td>${guestName ?? "—"}</td></tr>
          <tr><td style="padding:6px 0; font-weight:600;">Email</td><td>${guestEmail ?? "—"}</td></tr>
          <tr><td style="padding:6px 0; font-weight:600;">Attending</td><td>${attending ? "✅ Yes" : "❌ No"}</td></tr>
          ${attending ? `<tr><td style="padding:6px 0; font-weight:600;">Guests</td><td>${guests ?? 1}</td></tr>` : ""}
        </table>
        <p style="margin-top:24px; font-size:12px; color:#9ca3af;">Sent from your wedding website · corineandruben.com</p>
      </div>`;

    // This always reaches the inbox (account owner = corrinemaloba@gmail.com)
    await sendEmail(RESEND_API_KEY, {
      from: `Wedding Website <${FROM_TEST}>`,
      to: [ADMIN_EMAIL],
      subject: `New RSVP: ${guestName ?? "Guest"} — ${attending ? "Attending ✅" : "Not attending ❌"}`,
      html: adminHtml,
    });

    // ── Guest confirmation (works once a custom domain is verified in Resend) ──
    if (guestEmail) {
      const guestHtml = `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
          <div style="text-align: center; margin-bottom: 32px;">
            <span style="font-size: 48px;">${attending ? "🎉" : "💕"}</span>
            <h1 style="color: #7c3aed; font-size: 28px; margin: 16px 0 8px;">
              ${attending ? "RSVP Confirmed!" : "Thank You for Responding"}
            </h1>
            <p style="color: #6b7280; font-size: 14px;">Corine &amp; Ruben's Wedding</p>
          </div>
          <div style="background: #f9fafb; border-radius: 16px; padding: 24px; margin: 24px 0;">
            <p style="color: #374151; font-size: 16px; margin: 0 0 8px;">Dear <strong>${guestName}</strong>,</p>
            ${attending
              ? `<p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0 0 12px;">
                  Thank you for confirming your attendance${guests > 1 ? ` with ${guests} guests` : ""}!
                  We are thrilled you'll celebrate this special day with us.
                 </p>
                 <p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0;">
                   We can't wait to share this beautiful moment with you. ✨
                 </p>`
              : `<p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0;">
                   Thank you for letting us know. We understand and will truly miss having you there.
                   You are always in our hearts! 💕
                 </p>`}
          </div>
          <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="color: #374151; font-size: 14px; margin: 0;">With all our love,</p>
            <p style="color: #7c3aed; font-size: 18px; font-weight: bold; margin: 8px 0;">Corine &amp; Ruben 💕</p>
          </div>
        </div>`;

      await sendEmail(RESEND_API_KEY, {
        from: `Wedding RSVP <${FROM_PROD}>`,
        to: [guestEmail],
        subject: attending
          ? `We're so excited to see you, ${guestName}! 🎉`
          : `We'll miss you, ${guestName} 💕`,
        html: guestHtml,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-rsvp-confirmation error:", msg);
    return new Response(
      JSON.stringify({ success: false, reason: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  }
});

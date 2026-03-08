import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    const { guestName, guestEmail, attending, guests } = await req.json();

    if (!guestEmail) {
      return new Response(JSON.stringify({ success: false, reason: "no_email" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const subject = attending
      ? `We're so excited to see you, ${guestName}! 🎉`
      : `We'll miss you, ${guestName} 💕`;

    const bodyContent = attending
      ? `
        <p style="color: #374151; font-size: 16px; margin: 0 0 8px;">Dear <strong>${guestName}</strong>,</p>
        <p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0 0 16px;">
          Thank you so much for confirming your attendance${guests > 1 ? ` with ${guests} guest${guests > 1 ? 's' : ''}` : ''}! 
          We are thrilled and honored that you'll be celebrating this special day with us.
        </p>
        <p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0;">
          We can't wait to share this beautiful moment with you. More details will follow as the big day approaches! ✨
        </p>
      `
      : `
        <p style="color: #374151; font-size: 16px; margin: 0 0 8px;">Dear <strong>${guestName}</strong>,</p>
        <p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0;">
          Thank you for letting us know. We understand and will truly miss having you there. 
          You are always in our hearts, and we hope to celebrate with you another time! 💕
        </p>
      `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Wedding RSVP <${Deno.env.get("SENDER_EMAIL") ?? "onboarding@resend.dev"}>`,
        to: [guestEmail],
        subject,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 32px;">
              <span style="font-size: 48px;">${attending ? '🎉' : '💕'}</span>
              <h1 style="color: #7c3aed; font-size: 28px; margin: 16px 0 8px;">
                ${attending ? 'RSVP Confirmed!' : 'Thank You for Responding'}
              </h1>
              <p style="color: #6b7280; font-size: 14px;">Corine & Ruben's Wedding</p>
            </div>
            <div style="background: #f9fafb; border-radius: 16px; padding: 24px; margin: 24px 0;">
              ${bodyContent}
            </div>
            <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              <p style="color: #374151; font-size: 14px; margin: 0;">With all our love,</p>
              <p style="color: #7c3aed; font-size: 18px; font-weight: bold; margin: 8px 0;">Corine & Ruben 💕</p>
              <p style="color: #9ca3af; font-size: 11px; margin-top: 16px;">
                Stay tuned for updates and announcements about our special day!
              </p>
            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", JSON.stringify(data));
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error sending RSVP confirmation:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

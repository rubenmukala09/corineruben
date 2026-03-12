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
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, message");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `Wedding Contact <${Deno.env.get("SENDER_EMAIL") ?? "onboarding@resend.dev"}>`,
        to: [Deno.env.get("ADMIN_EMAIL") ?? "delivered@resend.dev"],
        subject: `New Contact from ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #7c3aed; font-size: 24px; border-bottom: 2px solid #e5e7eb; padding-bottom: 16px;">
              New Contact Form Submission
            </h1>
            <div style="margin: 24px 0;">
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0; font-style: italic; color: #374151;">${message}</p>
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 32px;">Sent from your wedding website contact form</p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn("Resend could not send contact email:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ success: false, emailSent: false, reason: data?.name ?? "resend_error" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    return new Response(JSON.stringify({ success: true, emailSent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error sending contact email:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, emailSent: false, reason: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  }
});

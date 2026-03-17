import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function generateAccessId(length = 10): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => chars[b % chars.length]).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerEmail, customerName, bookIds, stripeSessionId, amountPaid } =
      await req.json();

    if (!customerEmail || !customerName || !bookIds?.length) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Generate unique access ID (retry up to 5 times for uniqueness)
    let accessId = "";
    for (let i = 0; i < 5; i++) {
      accessId = generateAccessId(10);
      const { data: existing } = await supabase
        .from("book_purchases")
        .select("id")
        .eq("access_id", accessId)
        .maybeSingle();
      if (!existing) break;
    }

    // Insert purchase record
    const { error: insertError } = await supabase.from("book_purchases").insert({
      access_id: accessId,
      customer_email: customerEmail.toLowerCase().trim(),
      customer_name: customerName.trim(),
      book_ids: bookIds,
      stripe_session_id: stripeSessionId || null,
      amount_paid: amountPaid || 0,
    });

    if (insertError) {
      throw new Error(`Failed to save purchase: ${insertError.message}`);
    }

    // Send email with access ID via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "InVision Network <noreply@invisionnetwork.org>",
            to: [customerEmail],
            subject: "Your Book Access ID — InVision Network",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 30px; border-radius: 12px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0 0 10px;">📚 Your Books Are Ready!</h1>
                  <p style="color: #a0aec0; margin: 0;">Thank you for your purchase, ${customerName}!</p>
                </div>
                <div style="padding: 30px 20px; background: #ffffff;">
                  <p style="color: #333; font-size: 16px;">Your unique Access ID is:</p>
                  <div style="background: #f7fafc; border: 2px dashed #4a90d9; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #1a1a2e; font-family: monospace;">${accessId}</span>
                  </div>
                  <p style="color: #555; font-size: 14px;">
                    <strong>How to read your books:</strong><br/>
                    1. Visit <a href="https://invisionnetwork.org/resources">invisionnetwork.org/resources</a><br/>
                    2. Click <strong>"📖 Read Your Books"</strong><br/>
                    3. Enter your email and Access ID<br/>
                    4. Start reading!
                  </p>
                  <p style="color: #999; font-size: 12px; margin-top: 20px;">
                    Keep this email safe — you'll need the Access ID each time you want to read your books.
                    Books can only be read online and cannot be downloaded or printed.
                  </p>
                </div>
                <div style="text-align: center; padding: 20px; color: #999; font-size: 11px;">
                  © InVision Network • Department of Literature
                </div>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Email send failed (non-blocking):", emailErr);
      }
    }

    return new Response(
      JSON.stringify({ accessId, success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("generate-book-access error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

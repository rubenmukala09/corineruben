import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Send Verification Code Edge Function
 * 
 * PUBLIC ENDPOINT (verify_jwt = false)
 * 
 * RATE LIMITING ADVISORY (Post-Launch Security):
 * This function sends verification codes and is vulnerable to:
 * - SMS/Email bombing attacks
 * - Account enumeration
 * - Verification code brute-force
 * 
 * Recommended limits:
 * - 3 code requests per email per hour
 * - 5 code requests per IP per hour
 * - Block after 5 failed verification attempts
 * - Implement progressive delays between requests
 * 
 * Implementation options:
 * 1. Track request count per email in database
 * 2. Use Upstash Redis for fast rate limiting
 * 3. Implement exponential backoff
 * 4. Add CAPTCHA after 2 requests
 */

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { email } = await req.json();

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await supabase.from("verification_codes").insert({
      email, code, expires_at: expiresAt.toISOString(), attempts: 0, used: false,
    });

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: [email],
        subject: "Your InVision Network Verification Code",
        html: `<h1>Your code: ${code}</h1><p>Expires in 10 minutes.</p>`,
      }),
    });

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: 3 requests per minute per IP (stricter for password reset)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    console.log(`[RATE LIMIT] IP ${ip} exceeded limit. Retry after ${retryAfter}s`);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("x-real-ip") || 
                   "unknown";
  
  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many password reset requests. Please wait before trying again." }),
      {
        status: 429,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(rateCheck.retryAfter)
        },
      }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { email } = await req.json();

    // Validate email domain
    if (!email.toLowerCase().endsWith('@invisionnetwork.org')) {
      return new Response(
        JSON.stringify({ 
          error: "Password reset is only available for InVision Network email addresses" 
        }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tokenArray = new Uint8Array(32);
    crypto.getRandomValues(tokenArray);
    const token = Array.from(tokenArray, byte => byte.toString(16).padStart(2, '0')).join('');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await supabase.from("password_reset_tokens").insert({
      email, token, expires_at: expiresAt.toISOString(), used: false,
    });

    const resetUrl = `${req.headers.get("origin")}/reset-password?token=${token}`;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: [email],
        subject: "Password Reset - InVision Network",
        html: `<h1>Reset Your Password</h1><p><a href="${resetUrl}">Click here to reset</a></p><p>Link expires in 1 hour.</p>`,
      }),
    });

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

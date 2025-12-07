import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
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
      JSON.stringify({ valid: false, error: "Too many requests. Please try again later." }),
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
    const { code, serviceType, amount } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { data: discountData, error } = await supabaseClient
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !discountData) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid discount code" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const appliesTo = discountData.applies_to as string[];
    if (!appliesTo.includes('all') && !appliesTo.includes(serviceType)) {
      return new Response(
        JSON.stringify({ valid: false, error: "Discount code not applicable to this service" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const now = new Date();
    const validFrom = new Date(discountData.valid_from);
    const validUntil = discountData.valid_until ? new Date(discountData.valid_until) : null;

    if (now < validFrom) {
      return new Response(
        JSON.stringify({ valid: false, error: "Discount code not yet valid" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (validUntil && now > validUntil) {
      return new Response(
        JSON.stringify({ valid: false, error: "Discount code has expired" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (discountData.max_uses && discountData.current_uses >= discountData.max_uses) {
      return new Response(
        JSON.stringify({ valid: false, error: "Discount code has reached maximum uses" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    let discountAmount = 0;
    if (discountData.type === 'percentage') {
      discountAmount = Math.round((amount * discountData.value) / 100);
    } else {
      discountAmount = discountData.value;
    }

    return new Response(
      JSON.stringify({
        valid: true,
        discount: {
          code: discountData.code,
          description: discountData.description,
          type: discountData.type,
          value: discountData.value,
          discountAmount,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ valid: false, error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

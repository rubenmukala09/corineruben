import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, serviceType, amount } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Fetch discount code
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

    // Check if code applies to this service
    const appliesTo = discountData.applies_to as string[];
    if (!appliesTo.includes('all') && !appliesTo.includes(serviceType)) {
      return new Response(
        JSON.stringify({ valid: false, error: "Discount code not applicable to this service" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Check validity dates
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

    // Check usage limits
    if (discountData.max_uses && discountData.current_uses >= discountData.max_uses) {
      return new Response(
        JSON.stringify({ valid: false, error: "Discount code has reached maximum uses" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Calculate discount
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

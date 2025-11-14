import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const { email, code } = await req.json();

    console.log("Verifying code for:", email);

    // Get latest unused code for this email
    const { data: codeData, error: fetchError } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !codeData) {
      console.log("No valid code found");
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: "No verification code found. Please request a new one." 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if code expired
    if (new Date(codeData.expires_at) < new Date()) {
      console.log("Code expired");
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: "This code has expired. Please request a new one." 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check attempts
    if (codeData.attempts >= 3) {
      console.log("Too many attempts");
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: "Too many attempts. Please request a new code." 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if code matches
    if (codeData.code !== code) {
      console.log("Invalid code");
      
      // Increment attempts
      await supabase
        .from("verification_codes")
        .update({ attempts: codeData.attempts + 1 })
        .eq("id", codeData.id);

      const attemptsLeft = 3 - (codeData.attempts + 1);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: `Invalid code. ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} remaining.`,
          attemptsLeft
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark code as used
    await supabase
      .from("verification_codes")
      .update({ used: true })
      .eq("id", codeData.id);

    console.log("Code verified successfully");

    return new Response(
      JSON.stringify({ valid: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in verify-code:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
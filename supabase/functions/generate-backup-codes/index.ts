import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate random backup codes
function generateBackupCodes(count = 10): string[] {
  const codes: string[] = [];
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Excluding confusing characters
  
  for (let i = 0; i < count; i++) {
    const randomBytes = new Uint8Array(8);
    crypto.getRandomValues(randomBytes);
    const code = Array.from(randomBytes)
      .map(b => chars[b % chars.length])
      .join("");
    // Format as XXXX-XXXX
    codes.push(`${code.slice(0, 4)}-${code.slice(4, 8)}`);
  }
  
  return codes;
}

// Hash backup code for storage
async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code.replace("-", ""));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user from token
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if 2FA is set up
    const { data: settings, error: settingsError } = await supabase
      .from("user_2fa_settings")
      .select("id, is_enabled")
      .eq("user_id", user.id)
      .single();

    if (settingsError || !settings) {
      return new Response(
        JSON.stringify({ error: "2FA must be set up first" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate new backup codes
    const plainCodes = generateBackupCodes(10);
    const hashedCodes = await Promise.all(plainCodes.map(code => hashCode(code)));

    // Store hashed codes
    await supabase
      .from("user_2fa_settings")
      .update({
        backup_codes: hashedCodes,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    console.log(`[GENERATE-BACKUP-CODES] Generated 10 backup codes for user ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        codes: plainCodes, // Return plain codes to user - they must save these!
        message: "Save these codes securely. Each can only be used once.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[GENERATE-BACKUP-CODES] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

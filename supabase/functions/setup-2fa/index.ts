import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Generate a random base32 secret for TOTP
function generateSecret(length = 32): string {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map((byte) => base32chars[byte % 32])
    .join("");
}

// Simple XOR encryption with key
function encryptSecret(secret: string, key: string): string {
  const encoder = new TextEncoder();
  const secretBytes = encoder.encode(secret);
  const keyBytes = encoder.encode(key);
  
  const encrypted = new Uint8Array(secretBytes.length);
  for (let i = 0; i < secretBytes.length; i++) {
    encrypted[i] = secretBytes[i] ^ keyBytes[i % keyBytes.length];
  }
  
  return btoa(String.fromCharCode(...encrypted));
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
    const encryptionKey = Deno.env.get("TOTP_ENCRYPTION_KEY") || supabaseServiceKey.slice(0, 32);
    
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

    // Generate TOTP secret
    const secret = generateSecret();
    const encryptedSecret = encryptSecret(secret, encryptionKey);

    // Check if 2FA settings exist
    const { data: existing } = await supabase
      .from("user_2fa_settings")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (existing) {
      // Update existing record
      await supabase
        .from("user_2fa_settings")
        .update({
          encrypted_totp_secret: encryptedSecret,
          is_enabled: false,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
    } else {
      // Create new record
      await supabase
        .from("user_2fa_settings")
        .insert({
          user_id: user.id,
          encrypted_totp_secret: encryptedSecret,
          is_enabled: false,
        });
    }

    // Generate QR code URL (otpauth format)
    const issuer = "InVision Network";
    const accountName = user.email || user.id;
    const otpauthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

    console.log(`[SETUP-2FA] Generated 2FA secret for user ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        secret, // Plain secret for user to manually enter if QR fails
        otpauthUrl, // For QR code generation on client
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUrl)}`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[SETUP-2FA] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Decrypt secret
function decryptSecret(encrypted: string, key: string): string {
  const decoder = new TextDecoder();
  const encryptedBytes = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
  const keyBytes = new TextEncoder().encode(key);
  
  const decrypted = new Uint8Array(encryptedBytes.length);
  for (let i = 0; i < encryptedBytes.length; i++) {
    decrypted[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
  }
  
  return decoder.decode(decrypted);
}

// Base32 decode
function base32Decode(input: string): Uint8Array {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bits: number[] = [];
  
  for (const char of input.toUpperCase()) {
    const val = base32chars.indexOf(char);
    if (val === -1) continue;
    for (let i = 4; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
  }
  
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | bits[i * 8 + j];
    }
    bytes[i] = byte;
  }
  
  return bytes;
}

// HMAC-SHA1
async function hmacSha1(key: Uint8Array, message: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new Uint8Array(key) as unknown as ArrayBuffer,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new Uint8Array(message) as unknown as ArrayBuffer);
  return new Uint8Array(signature);
}

// Generate TOTP
async function generateTOTP(secret: string, timeStep = 30, digits = 6): Promise<string> {
  const key = base32Decode(secret);
  const time = Math.floor(Date.now() / 1000 / timeStep);
  
  const timeBytes = new Uint8Array(8);
  for (let i = 7; i >= 0; i--) {
    timeBytes[i] = time & 0xff;
    // @ts-ignore
    time >>= 8;
  }
  
  const hmac = await hmacSha1(key, timeBytes);
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code = ((hmac[offset] & 0x7f) << 24) |
               ((hmac[offset + 1] & 0xff) << 16) |
               ((hmac[offset + 2] & 0xff) << 8) |
               (hmac[offset + 3] & 0xff);
  
  return String(code % Math.pow(10, digits)).padStart(digits, "0");
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

    const { code, enableAfterVerify } = await req.json();

    if (!code || code.length !== 6) {
      return new Response(
        JSON.stringify({ error: "Invalid code format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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

    // Get 2FA settings
    const { data: settings, error: settingsError } = await supabase
      .from("user_2fa_settings")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (settingsError || !settings || !settings.encrypted_totp_secret) {
      return new Response(
        JSON.stringify({ error: "2FA not set up" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Decrypt and verify TOTP
    const secret = decryptSecret(settings.encrypted_totp_secret, encryptionKey);
    
    // Check current and adjacent time windows for clock drift tolerance
    const timeStep = 30;
    const currentTime = Math.floor(Date.now() / 1000 / timeStep);
    let isValid = false;

    for (let i = -1; i <= 1; i++) {
      const checkTime = currentTime + i;
      const timeBytes = new Uint8Array(8);
      let t = checkTime;
      for (let j = 7; j >= 0; j--) {
        timeBytes[j] = t & 0xff;
        t = Math.floor(t / 256);
      }
      
      const expectedCode = await generateTOTP(secret);
      if (code === expectedCode) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      console.log(`[VERIFY-2FA] Invalid code for user ${user.id}`);
      return new Response(
        JSON.stringify({ error: "Invalid verification code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update last used and optionally enable 2FA
    const updateData: any = {
      last_used_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (enableAfterVerify) {
      updateData.is_enabled = true;
    }

    await supabase
      .from("user_2fa_settings")
      .update(updateData)
      .eq("user_id", user.id);

    console.log(`[VERIFY-2FA] Successful verification for user ${user.id}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        enabled: enableAfterVerify || settings.is_enabled
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[VERIFY-2FA] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

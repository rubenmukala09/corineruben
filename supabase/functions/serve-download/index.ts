import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SERVE-DOWNLOAD] ${step}${detailsStr}`);
};

// Validate the download token
function validateToken(token: string): { valid: boolean; orderId?: string; productName?: string } {
  try {
    const decoded = atob(token);
    const parts = decoded.split(':');
    
    if (parts.length !== 4) {
      return { valid: false };
    }
    
    const [orderId, productName, expiryStr, providedHash] = parts;
    const expiry = parseInt(expiryStr, 10);
    
    // Check if token has expired
    if (Date.now() > expiry) {
      logStep("Token expired", { expiry, now: Date.now() });
      return { valid: false };
    }
    
    // Recreate the hash to verify
    const payload = `${orderId}:${productName}:${expiryStr}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(payload + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data[i];
      hash = hash & hash;
    }
    const expectedHash = Math.abs(hash).toString(16);
    
    if (providedHash !== expectedHash) {
      logStep("Invalid hash", { provided: providedHash, expected: expectedHash });
      return { valid: false };
    }
    
    return { valid: true, orderId, productName };
  } catch (error) {
    logStep("Token validation error", { error: String(error) });
    return { valid: false };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
      return new Response(
        '<html><body><h1>Invalid Download Link</h1><p>No download token provided.</p></body></html>',
        { 
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 400 
        }
      );
    }

    // Validate the token
    const { valid, orderId, productName } = validateToken(token);
    
    if (!valid) {
      return new Response(
        `<html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
            <h1 style="color: #dc2626;">Download Link Expired or Invalid</h1>
            <p>This download link has expired or is invalid.</p>
            <p>Download links are valid for 24 hours after purchase.</p>
            <p>Please contact <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a> for assistance.</p>
          </body>
        </html>`,
        { 
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 403 
        }
      );
    }

    logStep("Token validated", { orderId, productName });

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the file from storage
    const fileName = productName?.toLowerCase().replace(/\s+/g, '-') + '.pdf';
    const { data: fileData, error: fileError } = await supabaseClient.storage
      .from('digital-products')
      .download(fileName);

    if (fileError || !fileData) {
      logStep("File not found", { fileName, error: fileError?.message });
      
      // Fallback: redirect to a placeholder or return friendly message
      return new Response(
        `<html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
            <h1 style="color: #6D28D9;">Download Processing</h1>
            <p>Thank you for your purchase of <strong>${productName}</strong>!</p>
            <p>Your digital product is being prepared and will be emailed to you shortly.</p>
            <p>If you don't receive it within 1 hour, please contact <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a>.</p>
          </body>
        </html>`,
        { 
          headers: { ...corsHeaders, "Content-Type": "text/html" },
          status: 200 
        }
      );
    }

    // Log the download
    await supabaseClient.from('activity_log').insert({
      action: 'DIGITAL_DOWNLOAD',
      entity_type: 'digital_product',
      entity_id: orderId,
      details: { productName, fileName, timestamp: new Date().toISOString() }
    });

    logStep("Serving file", { fileName, size: fileData.size });

    // Return the file
    return new Response(fileData, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      `<html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
          <h1 style="color: #dc2626;">Download Error</h1>
          <p>An error occurred while processing your download.</p>
          <p>Please contact <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a> for assistance.</p>
        </body>
      </html>`,
      { 
        headers: { ...corsHeaders, "Content-Type": "text/html" },
        status: 500 
      }
    );
  }
});
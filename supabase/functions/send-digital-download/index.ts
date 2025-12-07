import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-DIGITAL-DOWNLOAD] ${step}${detailsStr}`);
};

interface DownloadRequest {
  customer_email: string;
  customer_name?: string;
  products: Array<{
    name: string;
    id?: string;
    download_url?: string;
  }>;
  order_id?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) throw new Error("RESEND_API_KEY is not set");

    const { customer_email, customer_name, products, order_id }: DownloadRequest = await req.json();
    
    if (!customer_email) throw new Error("customer_email is required");
    if (!products || products.length === 0) throw new Error("products array is required");

    logStep("Processing download request", { customer_email, productCount: products.length });

    const resend = new Resend(resendKey);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Generate download links with 24-hour expiry
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    // Build product list HTML for email
    const productListHtml = products.map(product => {
      const downloadButton = product.download_url 
        ? `<a href="${product.download_url}" style="display: inline-block; background: linear-gradient(135deg, #9333ea 0%, #06b6d4 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 8px 0;">Download ${product.name}</a>`
        : `<p style="color: #666;">Download link will be sent separately for: ${product.name}</p>`;
      
      return `
        <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #9333ea;">
          <h3 style="margin: 0 0 12px 0; color: #1a1a2e;">${product.name}</h3>
          ${downloadButton}
        </div>
      `;
    }).join('');

    // Send email with download links
    const emailResponse = await resend.emails.send({
      from: "InVision Network <onboarding@resend.dev>",
      to: [customer_email],
      subject: "Your Digital Products Are Ready! 📦",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="background: linear-gradient(135deg, #9333ea 0%, #06b6d4 100%); padding: 24px; border-radius: 16px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Thank You for Your Purchase!</h1>
            </div>
          </div>
          
          <p style="font-size: 16px;">Hi ${customer_name || 'there'},</p>
          
          <p style="font-size: 16px;">Great news! Your digital products are ready for download. Click the buttons below to access your purchases:</p>
          
          ${productListHtml}
          
          <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin: 24px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Important:</strong> Download links expire in 24 hours. Please download your products promptly.
            </p>
          </div>
          
          ${order_id ? `<p style="font-size: 14px; color: #666;">Order Reference: ${order_id}</p>` : ''}
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
          
          <div style="text-align: center;">
            <p style="font-size: 14px; color: #666;">Need help? Contact us at</p>
            <a href="mailto:hello@invisionnetwork.org" style="color: #9333ea; text-decoration: none; font-weight: bold;">hello@invisionnetwork.org</a>
          </div>
          
          <div style="text-align: center; margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              © ${new Date().getFullYear()} InVision Network. Protecting Ohio Families from AI-Powered Scams.
            </p>
          </div>
          
        </body>
        </html>
      `,
    });

    logStep("Email sent successfully", { response: emailResponse });

    // Log the delivery in database if order_id provided
    if (order_id) {
      const { error: updateError } = await supabaseClient
        .from('partner_orders')
        .update({ 
          status: 'completed',
          notes: `Digital products delivered via email at ${new Date().toISOString()}`
        })
        .eq('id', order_id);
      
      if (updateError) {
        logStep("Warning: Could not update order status", { error: updateError.message });
      } else {
        logStep("Order status updated to completed", { order_id });
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      expiresAt: expiryTime
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage, success: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

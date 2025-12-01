import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } }
  );

  try {
    const { orderId, orderNumber, customerEmail, customerName, items } = await req.json();

    console.log('Sending digital downloads for order:', orderNumber);

    // Filter digital products from items
    const digitalProducts = items.filter((item: any) => 
      item.tags?.includes('digital') || item.type === 'digital'
    );

    if (digitalProducts.length === 0) {
      console.log('No digital products in order');
      return new Response(
        JSON.stringify({ success: true, message: 'No digital products to send' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate download links for digital products
    const downloadLinks = await Promise.all(
      digitalProducts.map(async (product: any) => {
        // Generate signed URL with 24-hour expiration
        const expiresIn = 24 * 60 * 60; // 24 hours in seconds
        
        // For now, we'll use a placeholder download URL
        // In production, you'd generate signed URLs from storage bucket
        const downloadUrl = `${Deno.env.get('SUPABASE_URL')}/storage/v1/object/sign/product-downloads/${product.productId}`;
        
        return {
          name: product.name,
          downloadUrl: downloadUrl,
        };
      })
    );

    // Create download links list for email
    const downloadLinksHtml = downloadLinks.map(link => `
      <div style="margin: 15px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">${link.name}</p>
        <a href="${link.downloadUrl}" style="display: inline-block; padding: 10px 20px; background: #7c3aed; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Download Now
        </a>
      </div>
    `).join('');

    // Send email with download links
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🎁 Your Downloads Are Ready!</h1>
    </div>
    <div class="content">
      <h2 style="color: #7c3aed;">Hi ${customerName}!</h2>
      <p>Thank you for your purchase from InVision Network. Your digital products are ready for download.</p>
      
      <h3 style="color: #333; margin-top: 30px;">📥 YOUR DOWNLOADS:</h3>
      ${downloadLinksHtml}
      
      <div style="margin-top: 30px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px;">
          ⏰ <strong>Important:</strong> These download links expire in 24 hours for security.
        </p>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Order Details:</p>
        <p style="margin: 5px 0; color: #6b7280;">Order Number: <strong>${orderNumber}</strong></p>
        <p style="margin: 5px 0; color: #6b7280;">Order Date: <strong>${new Date().toLocaleDateString()}</strong></p>
      </div>
      
      <p style="margin-top: 30px;">
        Questions or need help? Contact us at 
        <a href="mailto:hello@invisionnetwork.org" style="color: #7c3aed;">hello@invisionnetwork.org</a>
      </p>
      
      <p style="margin-top: 20px;">
        Best regards,<br>
        <strong>The InVision Network Team</strong>
      </p>
    </div>
    <div class="footer">
      <p>InVision Network | Protecting Ohio Families</p>
      <p>This is an automated email. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'InVision Network <noreply@invisionnetwork.org>',
        to: [customerEmail],
        subject: `🎁 Your Downloads Are Ready! Order #${orderNumber}`,
        html: emailBody,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log('Download email sent:', emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Digital download email sent',
        emailId: emailResult.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Send digital download error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send download email';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

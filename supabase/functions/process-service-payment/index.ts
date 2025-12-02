import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

/**
 * Process Service Payment Edge Function
 * 
 * PUBLIC ENDPOINT (verify_jwt = false)
 * 
 * RATE LIMITING ADVISORY (Post-Launch Security):
 * This function processes payments and is publicly accessible.
 * Implement rate limiting to prevent:
 * - Card testing attacks
 * - Payment fraud
 * - API abuse
 * 
 * Recommended limits:
 * - 5 payment attempts per IP per hour
 * - 3 failed payment attempts triggers temporary block
 * - Velocity checks for unusual purchase patterns
 * 
 * Implementation options:
 * 1. Stripe Radar for fraud detection (already enabled)
 * 2. Upstash Redis for request counting
 * 3. IP reputation checking
 * 4. Device fingerprinting for repeat offenders
 */

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
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const { 
      paymentMethodId, 
      amount, 
      currency, 
      customerInfo,
      serviceType,
      serviceName,
      inquiryId,
      metadata 
    } = await req.json();

    console.log('Processing service payment:', { 
      amount, 
      currency, 
      serviceName,
      inquiryId 
    });

    // Create payment intent with detailed metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      receipt_email: customerInfo.email,
      description: `${serviceName} - InVision Network`,
      metadata: {
        service_type: serviceType,
        service_name: serviceName,
        inquiry_id: inquiryId,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone || '',
        company_name: customerInfo.companyName || '',
        is_veteran: metadata.is_veteran ? 'true' : 'false',
        veteran_discount: metadata.veteran_discount?.toString() || '0',
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    // Update service inquiry with payment information
    const { error: updateError } = await supabaseAdmin
      .from('service_inquiries')
      .update({
        status: 'paid',
        stripe_payment_id: paymentIntent.id,
      })
      .eq('id', inquiryId);

    if (updateError) {
      console.error('Error updating inquiry:', updateError);
      throw new Error(`Failed to update inquiry: ${updateError.message}`);
    }

    console.log('Service inquiry updated with payment info');

    // Send comprehensive confirmation email
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey) {
      let serviceDetails = '';
      
      // Service-specific details
      if (serviceName.includes('Landing Page')) {
        serviceDetails = `
What's Included:
✓ Single high-converting page design
✓ Mobile-responsive layout
✓ Lead capture form integration
✓ SEO optimization basics
✓ Hosting setup assistance
✓ 2 rounds of revisions included
✓ Professional copywriting support
✓ Fast 5-7 day turnaround
        `.trim();
      } else if (serviceName.includes('Business Website')) {
        serviceDetails = `
What's Included:
✓ Up to 5 custom-designed pages
✓ Mobile-responsive layout
✓ Contact form integration
✓ Basic SEO setup
✓ Blog/News section
✓ Social media integration
✓ Google Analytics setup
✓ 3 rounds of revisions
✓ Professional design consultation
✓ 2-3 week project timeline
        `.trim();
      } else if (serviceName.includes('AI Vetting') || serviceName.includes('Thinking of Buying')) {
        serviceDetails = `
What's Included:
✓ Complete security risk assessment
✓ ROI calculation with real numbers
✓ Hidden costs analysis
✓ Vendor reliability check
✓ 3-5 alternative recommendations
✓ "Buy / Don't Buy / Wait" recommendation
✓ Written report (delivered within 5 business days)
✓ 30-minute consultation call to discuss findings
        `.trim();
      } else if (serviceName.includes('Security Audit') || serviceName.includes('Already Using')) {
        serviceDetails = `
What's Included:
✓ Full security vulnerability scan
✓ Data leak assessment
✓ Prompt injection testing
✓ Vendor contract review
✓ Compliance gap analysis (GDPR, HIPAA, etc.)
✓ Risk mitigation roadmap
✓ Implementation priority list
✓ 60-minute strategy call
✓ 30-day follow-up support
        `.trim();
      }

      const emailBody = `
Thank you for your purchase from InVision Network!

SERVICE PURCHASED:
${serviceName}
Amount: $${(amount / 100).toFixed(2)}

${serviceDetails}

PAYMENT DETAILS:
Transaction ID: ${paymentIntent.id}
Payment Date: ${new Date().toLocaleDateString()}
Status: Confirmed ✓

CUSTOMER INFORMATION:
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone || 'Not provided'}
${customerInfo.companyName ? `Company: ${customerInfo.companyName}` : ''}

NEXT STEPS:
Our team will contact you within 24 hours to:
• Confirm project details and requirements
• Schedule your initial consultation or project kickoff
• Answer any questions you may have
• Provide a detailed timeline for your service

${metadata.is_veteran ? `
🇺🇸 Thank you for your service! Your 10% veteran discount of $${metadata.veteran_discount.toFixed(2)} has been applied.
` : ''}

Questions? Contact us anytime at hello@invisionnetwork.org

We're excited to work with you!

Best regards,
InVision Network Team
      `.trim();

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'InVision Network <noreply@invisionnetwork.org>',
          to: [customerInfo.email],
          subject: `Payment Confirmed - ${serviceName} - InVision Network`,
          text: emailBody,
        }),
      });

      console.log('Confirmation email sent to:', customerInfo.email);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        paymentIntentId: paymentIntent.id,
        inquiryId: inquiryId,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Service payment error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Service payment processing failed';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

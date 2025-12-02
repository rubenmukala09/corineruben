import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

/**
 * Process Donation Edge Function
 * 
 * PUBLIC ENDPOINT (verify_jwt = false)
 * 
 * RATE LIMITING ADVISORY (Post-Launch Security):
 * This function processes payments and is publicly accessible.
 * Implement rate limiting to prevent:
 * - Card testing attacks
 * - Donation fraud
 * - API abuse
 * 
 * Recommended limits:
 * - 5 donation attempts per IP per hour
 * - 3 failed payment attempts triggers temporary block
 * - Email-based rate limiting (1 donation per email per minute)
 * 
 * Implementation options:
 * 1. Stripe Radar for fraud detection (already enabled)
 * 2. Upstash Redis for request counting
 * 3. CAPTCHA for amounts over $100
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

    const { paymentMethodId, amount, currency, donorInfo, donationType, message } = await req.json();

    console.log('Processing donation:', { amount, currency, donationType, donorName: donorInfo.name });

    // Create or get Stripe customer
    const customers = await stripe.customers.list({ email: donorInfo.email, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: donorInfo.email,
        name: donorInfo.name,
        phone: donorInfo.phone,
      });
      customerId = customer.id;
    }

    let stripePaymentId = null;
    let paymentStatus = 'pending';

    if (donationType === 'one-time') {
      // One-time payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        receipt_email: donorInfo.email,
        metadata: {
          donor_name: donorInfo.name,
          donor_email: donorInfo.email,
          donation_type: donationType,
        },
      });

      console.log('Payment intent created:', paymentIntent.id);
      stripePaymentId = paymentIntent.id;
      
      if (paymentIntent.status === 'succeeded') {
        paymentStatus = 'paid';
      }
    } else {
      // Monthly recurring subscription
      // Create a price for this donation amount
      const price = await stripe.prices.create({
        unit_amount: amount,
        currency,
        recurring: { interval: 'month' },
        product_data: {
          name: 'Monthly Donation',
        },
      });

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: price.id }],
        default_payment_method: paymentMethodId,
        metadata: {
          donor_name: donorInfo.name,
          donor_email: donorInfo.email,
          donation_type: donationType,
        },
      });

      console.log('Subscription created:', subscription.id);
      stripePaymentId = subscription.id;
      
      if (subscription.status === 'active' || subscription.status === 'trialing') {
        paymentStatus = 'paid';
      }
    }

    // Insert donation record
    const { data: donation, error: donationError } = await supabaseAdmin
      .from('donations')
      .insert({
        donor_name: donorInfo.name,
        email: donorInfo.email,
        amount: amount / 100, // Convert cents to dollars
        donation_type: donationType,
        message: message || null,
        payment_status: paymentStatus,
        stripe_payment_id: stripePaymentId,
      })
      .select()
      .single();

    if (donationError) {
      console.error('Error creating donation record:', donationError);
      throw new Error(`Failed to create donation record: ${donationError.message}`);
    }

    console.log('Donation record created:', donation.id);

    // Send thank you email
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (resendApiKey && paymentStatus === 'paid') {
      const emailBody = `
Dear ${donorInfo.name},

Thank you for your generous ${donationType === 'monthly' ? 'monthly' : 'one-time'} donation of $${(amount / 100).toFixed(2)} to InVision Network!

Your support helps us protect and empower our community by providing critical cybersecurity education and scam prevention services.

${donationType === 'monthly' ? 'Your monthly donation will be automatically processed each month. You can manage or cancel your subscription at any time by contacting us.' : ''}

Donation Details:
Amount: $${(amount / 100).toFixed(2)}
Type: ${donationType === 'one-time' ? 'One-time' : 'Monthly Recurring'}
Transaction ID: ${stripePaymentId}
Date: ${new Date().toLocaleDateString()}

Your contribution makes a real difference in helping families stay safe from AI-powered scams and cyber threats.

With gratitude,
InVision Network Team

Questions? Contact us at hello@invisionnetwork.org
      `.trim();

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'InVision Network <noreply@invisionnetwork.org>',
          to: [donorInfo.email],
          subject: `Thank You for Your ${donationType === 'monthly' ? 'Monthly' : ''} Donation - InVision Network`,
          text: emailBody,
        }),
      });

      console.log('Thank you email sent to:', donorInfo.email);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        donationId: donation.id,
        stripePaymentId,
        paymentStatus
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Donation processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Donation processing failed';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
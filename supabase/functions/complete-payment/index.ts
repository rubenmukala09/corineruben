import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[COMPLETE-PAYMENT] ${step}${detailsStr}`);
};

interface CompletePaymentRequest {
  paymentType: 'donation' | 'subscription' | 'product' | 'service' | 'training';
  paymentIntentId?: string;
  sessionId?: string;
  recordId?: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  productName?: string;
  serviceTier?: string;
  preferredDate?: string;
  isVeteran?: boolean;
  metadata?: Record<string, any>;
}

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "InVision Network <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Email send failed:", error);
    throw new Error("Failed to send email");
  }
  
  return response.json();
}

async function sendAdminNotification(subject: string, html: string) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: ["hello@invisionnetwork.org"],
        subject,
        html,
      }),
    });
  } catch (error) {
    console.error("Admin notification failed:", error);
    // Don't throw - admin notification is secondary
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    logStep("Function started");
    
    const {
      paymentType,
      paymentIntentId,
      sessionId,
      recordId,
      customerEmail,
      customerName,
      amount,
      productName,
      serviceTier,
      preferredDate,
      isVeteran,
      metadata
    }: CompletePaymentRequest = await req.json();

    logStep("Request data", { paymentType, paymentIntentId, sessionId, recordId, customerEmail });

    const formattedAmount = `$${(amount / 100).toFixed(2)}`;
    const requestNumber = `TRN-${Date.now().toString().slice(-8)}`;

    switch (paymentType) {
      case 'donation': {
        // Update donation status
        if (recordId) {
          await supabaseClient
            .from('donations')
            .update({ 
              payment_status: 'completed',
              stripe_payment_id: paymentIntentId || sessionId,
              updated_at: new Date().toISOString()
            })
            .eq('id', recordId);
          logStep("Updated donation record", { recordId });
        }

        // Send thank-you email with trust messaging
        await sendEmail(
          customerEmail,
          "Thank You for Your Generous Gift! 💖 - InVision Network",
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #6D28D9; margin-bottom: 10px;">Thank You for Trusting InVision Network! 💜</h1>
              </div>
              
              <p style="font-size: 16px;">Dear ${customerName},</p>
              
              <p>Your generous donation of <strong>${formattedAmount}</strong> has been received and confirmed. Your trust in our mission means the world to us.</p>
              
              <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">✓ Payment Confirmed</h2>
                <p><strong>Amount:</strong> ${formattedAmount}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Transaction ID:</strong> ${paymentIntentId || sessionId || 'N/A'}</p>
              </div>
              
              <div style="background: #faf5ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e9d5ff;">
                <h3 style="color: #6D28D9; margin-top: 0;">Your Impact</h3>
                <p>Your contribution helps us:</p>
                <ul style="padding-left: 20px;">
                  <li>Protect seniors from online scams</li>
                  <li>Provide free security training to families</li>
                  <li>Support veterans and those in need</li>
                  <li>Develop new protection technologies</li>
                </ul>
              </div>
              
              <p>A tax receipt will be sent separately for your records.</p>
              
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
                </p>
              </div>
              
              <p style="margin-top: 30px;">With heartfelt gratitude,<br><strong>The InVision Network Team</strong></p>
            </div>
          `
        );
        logStep("Sent donation thank-you email");
        break;
      }

      case 'subscription': {
        // Send welcome email with trust messaging
        await sendEmail(
          customerEmail,
          `Payment Confirmed - Welcome to ${productName || 'Your Subscription'}! 🛡️ - InVision Network`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #6D28D9; margin-bottom: 10px;">Thank You for Trusting InVision Network! 💜</h1>
              </div>
              
              <p style="font-size: 16px;">Welcome, ${customerName}! 🎉</p>
              
              <p>Your payment has been confirmed and your subscription is now active. We're honored that you've chosen us to help protect your family.</p>
              
              <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">✓ Payment Confirmed</h2>
                <p><strong>Plan:</strong> ${productName}</p>
                <p><strong>Amount:</strong> ${formattedAmount}/month</p>
                <p><strong>Status:</strong> Active ✓</p>
              </div>
              
              <h3 style="color: #6D28D9;">What's Next?</h3>
              <ol style="padding-left: 20px; line-height: 1.8;">
                <li>Access your dashboard to manage your subscription</li>
                <li>Set up your profile and preferences</li>
                <li>Forward suspicious emails/texts for instant analysis</li>
                <li>Explore all features included in your plan</li>
              </ol>
              
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
                </p>
              </div>
              
              <p style="margin-top: 30px;">Welcome aboard!<br><strong>The InVision Network Team</strong></p>
            </div>
          `
        );
        logStep("Sent subscription welcome email");
        break;
      }

      case 'product': {
        // Product payments are handled by process-payment edge function
        logStep("Product payment - handled separately");
        break;
      }

      case 'training': {
        // Create booking record with paid status
        const { data: bookingData, error: bookingError } = await supabaseClient
          .from('booking_requests')
          .insert([{
            full_name: customerName,
            email: customerEmail,
            service_type: 'training',
            service_name: productName || 'Training Session',
            service_tier: serviceTier || null,
            preferred_dates: preferredDate || null,
            is_veteran: isVeteran || false,
            request_number: requestNumber,
            status: 'paid',
            base_price: amount / 100,
            final_price: amount / 100,
            metadata: metadata || {}
          }])
          .select()
          .single();

        if (bookingError) {
          console.error("Failed to create booking record:", bookingError);
        } else {
          logStep("Created paid booking record", { bookingId: bookingData?.id, requestNumber });
        }

        // Send payment confirmation email with trust messaging
        await sendEmail(
          customerEmail,
          `Payment Confirmed - ${productName || 'Training Session'} | InVision Network`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #6D28D9; margin-bottom: 10px;">Thank You for Trusting InVision Network! 💜</h1>
              </div>
              
              <p style="font-size: 16px;">Dear ${customerName},</p>
              
              <p>Your payment has been confirmed and your training session is booked! We're excited to help you master cybersecurity protection.</p>
              
              <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">✓ Payment Confirmed</h2>
                <p><strong>Reference Number:</strong> ${requestNumber}</p>
                <p><strong>Training:</strong> ${productName || 'Training Session'}${serviceTier ? ` (${serviceTier})` : ''}</p>
                <p><strong>Amount Paid:</strong> ${formattedAmount}</p>
                ${isVeteran ? '<p><strong>Veteran Discount Applied:</strong> 10% off ✓</p>' : ''}
                ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
              </div>
              
              <h3 style="color: #6D28D9;">What Happens Next?</h3>
              <ol style="padding-left: 20px; line-height: 1.8;">
                <li><strong>Within 24 hours:</strong> Our team will contact you to confirm your exact session time</li>
                <li><strong>Before your session:</strong> You'll receive a calendar invite with all details</li>
                <li><strong>Training materials:</strong> Pre-session materials will be sent to your email</li>
                <li><strong>After training:</strong> You'll receive a certificate of completion</li>
              </ol>
              
              <div style="background: #faf5ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e9d5ff;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>🔒 Your trust means everything to us.</strong> We're committed to protecting you and your family from online threats. Your personal information is secure and will never be shared.
                </p>
              </div>
              
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
                </p>
              </div>
              
              <p style="margin-top: 30px;">We look forward to training you!<br><strong>The InVision Network Team</strong></p>
            </div>
          `
        );
        logStep("Sent training payment confirmation email");

        // Send admin notification
        await sendAdminNotification(
          `💰 New Paid Training Booking - ${requestNumber}`,
          `
            <h1>New Paid Training Booking!</h1>
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <p><strong>💰 PAYMENT CONFIRMED</strong></p>
            </div>
            <p><strong>Reference:</strong> ${requestNumber}</p>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Training:</strong> ${productName || 'Training Session'}${serviceTier ? ` (${serviceTier})` : ''}</p>
            <p><strong>Amount:</strong> ${formattedAmount}</p>
            <p><strong>Veteran:</strong> ${isVeteran ? 'Yes (10% discount applied)' : 'No'}</p>
            ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
            <hr>
            <p><strong>Action Required:</strong> Contact customer within 24 hours to confirm session time.</p>
          `
        );
        logStep("Sent admin notification");
        break;
      }

      case 'service': {
        // Update service booking/inquiry status if applicable
        if (recordId) {
          await supabaseClient
            .from('booking_requests')
            .update({ 
              status: 'paid',
              updated_at: new Date().toISOString()
            })
            .eq('id', recordId);
        }

        await sendEmail(
          customerEmail,
          `Payment Confirmed - ${productName || 'Service'} | InVision Network`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #6D28D9; margin-bottom: 10px;">Thank You for Trusting InVision Network! 💜</h1>
              </div>
              
              <p style="font-size: 16px;">Dear ${customerName},</p>
              
              <p>Your payment of <strong>${formattedAmount}</strong> for <strong>${productName || 'your service'}</strong> has been confirmed.</p>
              
              <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">✓ Payment Confirmed</h2>
                <p>Our team will contact you within 24 hours to schedule your service.</p>
              </div>
              
              <div style="background: #faf5ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e9d5ff;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>🔒 Your trust means everything to us.</strong> We're committed to providing you with exceptional service and protecting your interests.
                </p>
              </div>
              
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
                </p>
              </div>
              
              <p style="margin-top: 30px;">Thank you for choosing InVision Network!<br><strong>The InVision Network Team</strong></p>
            </div>
          `
        );
        logStep("Sent service payment confirmation email");
        break;
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Payment completed successfully", requestNumber }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-BOOKING-CONFIRMATION] ${step}${detailsStr}`);
};

interface BookingConfirmationRequest {
  email: string;
  name: string;
  serviceName: string;
  requestNumber: string;
  preferredDate?: string;
  serviceType?: string;
  isFreeInquiry?: boolean;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const {
      email,
      name,
      serviceName,
      requestNumber,
      preferredDate,
      serviceType,
      isFreeInquiry = true
    }: BookingConfirmationRequest = await req.json();

    logStep("Request data", { email, name, serviceName, requestNumber, isFreeInquiry });

    // This function is now for FREE inquiries/consultations only
    // Paid bookings go through complete-payment function

    // Send confirmation email to customer with trust messaging
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: [email],
        subject: `Inquiry Received - ${serviceName} | InVision Network`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px 0;">
              <h1 style="color: #6D28D9; margin-bottom: 10px;">Thank You for Trusting InVision Network! 💜</h1>
            </div>
            
            <p style="font-size: 16px;">Hi ${name},</p>
            
            <p>Thank you for reaching out! We've received your inquiry and our team will contact you within <strong>24 hours</strong>.</p>
            
            <div style="background: linear-gradient(135deg, #ede9fe, #ddd6fe); padding: 25px; border-radius: 12px; margin: 25px 0;">
              <h2 style="color: #6D28D9; margin-top: 0;">Inquiry Details</h2>
              <p><strong>Reference Number:</strong> ${requestNumber}</p>
              <p><strong>Service:</strong> ${serviceName}</p>
              ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
              <p><strong>Status:</strong> Pending Review</p>
            </div>
            
            <h3 style="color: #6D28D9;">What Happens Next?</h3>
            <ol style="padding-left: 20px; line-height: 1.8;">
              <li>Our team reviews your request</li>
              <li>We'll contact you to discuss your needs</li>
              <li>Receive a customized quote or plan</li>
              <li>Proceed with payment when ready</li>
            </ol>
            
            <div style="background: #faf5ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e9d5ff;">
              <p style="margin: 0; font-size: 14px;">
                <strong>🔒 Your trust is important to us.</strong> We never ask for passwords, OTPs, or banking information via email or phone. All payments are processed securely through our website.
              </p>
            </div>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
              </p>
            </div>
            
            <p style="margin-top: 30px;">We look forward to serving you!<br><strong>The InVision Network Team</strong></p>
          </div>
        `,
      }),
    });

    if (!customerEmailResponse.ok) {
      const error = await customerEmailResponse.text();
      console.error("Customer email send failed:", error);
      throw new Error("Failed to send customer email");
    }

    logStep("Customer confirmation email sent");

    // Send notification to admin
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "InVision Network <onboarding@resend.dev>",
        to: ["hello@invisionnetwork.org"],
        subject: `📋 New Inquiry - ${requestNumber}`,
        html: `
          <h1>New Service Inquiry</h1>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 10px 0; border: 1px solid #fcd34d;">
            <p style="margin: 0;"><strong>⏳ PENDING - No payment yet</strong></p>
          </div>
          <p><strong>Reference:</strong> ${requestNumber}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${serviceName}</p>
          ${serviceType ? `<p><strong>Type:</strong> ${serviceType}</p>` : ''}
          ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
          <hr>
          <p><strong>Action Required:</strong> Review and respond within 24 hours to discuss pricing and convert to paid booking.</p>
        `,
      }),
    });

    logStep("Admin notification sent");

    return new Response(
      JSON.stringify({ success: true, message: "Confirmation emails sent" }),
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

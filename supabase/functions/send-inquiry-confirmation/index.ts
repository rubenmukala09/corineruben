import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-INQUIRY-CONFIRMATION] ${step}${detailsStr}`);
};

interface InquiryConfirmationRequest {
  email: string;
  name: string;
  serviceName: string;
  inquiryNumber: string;
  servicePrice?: number;
  companyName?: string;
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
      inquiryNumber,
      servicePrice,
      companyName,
    }: InquiryConfirmationRequest = await req.json();

    logStep("Request data", { email, name, serviceName, inquiryNumber });

    // Send confirmation email to customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [email],
        subject: `Inquiry Received - ${serviceName} | InVision Network`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6D28D9;">Thank You for Your Inquiry! 🚀</h1>
            
            <p>Hi ${name},</p>
            
            <p>We've received your inquiry about <strong>${serviceName}</strong> and our team is excited to help you!</p>
            
            <div style="background: linear-gradient(135deg, #ede9fe, #ddd6fe); padding: 20px; border-radius: 12px; margin: 20px 0;">
              <h2 style="color: #6D28D9; margin-top: 0;">Inquiry Details</h2>
              <p><strong>Reference Number:</strong> ${inquiryNumber}</p>
              <p><strong>Service:</strong> ${serviceName}</p>
              ${servicePrice ? `<p><strong>Starting at:</strong> $${servicePrice.toLocaleString()}</p>` : ""}
              ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ""}
            </div>
            
            <h3>What Happens Next?</h3>
            <ol>
              <li><strong>Within 24 hours:</strong> A member of our team will reach out</li>
              <li><strong>Discovery call:</strong> We'll discuss your specific needs</li>
              <li><strong>Custom proposal:</strong> Receive a tailored solution</li>
              <li><strong>Get started:</strong> Begin your transformation journey</li>
            </ol>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Need immediate assistance?</strong><br>
                📞 Call: <a href="tel:9373018749">(937) 301-8749</a><br>
                📧 Email: <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a>
              </p>
            </div>
            
            <p style="margin-top: 30px;">We're looking forward to working with you!<br><strong>The InVision Network Team</strong></p>
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
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: ["hello@invisionnetwork.org"],
        subject: `New Service Inquiry - ${inquiryNumber} - ${serviceName}`,
        html: `
          <h1>New Service Inquiry</h1>
          <p><strong>Reference:</strong> ${inquiryNumber}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ""}
          <p><strong>Service:</strong> ${serviceName}</p>
          ${servicePrice ? `<p><strong>Price:</strong> $${servicePrice.toLocaleString()}</p>` : ""}
          <hr>
          <p><small>Action required: Contact within 24 hours</small></p>
        `,
      }),
    });

    logStep("Admin notification sent");

    return new Response(
      JSON.stringify({ success: true, message: "Confirmation emails sent" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

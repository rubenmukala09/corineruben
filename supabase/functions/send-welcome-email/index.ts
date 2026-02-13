import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, role, roleDisplayName } = await req.json();

    if (!email || !firstName) {
      return new Response(
        JSON.stringify({ error: "Email and firstName are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const origin = req.headers.get("origin") || "https://invisionnetwork.org";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to InVision Network</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to InVision Network!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Hi ${firstName},</p>
            
            <p style="font-size: 16px; color: #374151;">
              Your staff account has been successfully created. Welcome to the InVision Network team!
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Your Role:</strong></p>
              <p style="margin: 5px 0 0 0; color: #111827; font-size: 16px; font-weight: 600;">${roleDisplayName || "Staff Member"}</p>
              
              <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;"><strong>Email:</strong></p>
              <p style="margin: 5px 0 0 0; color: #111827; font-size: 16px;">${email}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${origin}/login" 
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Sign In to Your Dashboard
              </a>
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>🔐 Security Tip:</strong> Keep your password secure and never share your login credentials with anyone.
              </p>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
              If you have any questions or need assistance, please contact our support team at 
              <a href="mailto:support@invisionnetwork.org" style="color: #667eea; text-decoration: none;">support@invisionnetwork.org</a>
            </p>
            
            <p style="font-size: 14px; color: #6b7280;">
              Best regards,<br>
              <strong>The InVision Network Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af; margin: 5px 0;">
              © ${new Date().getFullYear()} InVision Network. All rights reserved.
            </p>
            <p style="font-size: 12px; color: #9ca3af; margin: 5px 0;">
              You received this email because a staff account was created for you.
            </p>
          </div>
        </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [email],
        subject: "Welcome to InVision Network - Your Account is Ready",
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await response.json();
    console.log("Welcome email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, messageId: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

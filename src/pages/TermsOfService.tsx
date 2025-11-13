import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-8">Terms of Service</h1>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <Card className="p-8 mb-8">
              <div className="space-y-8 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to InVision Network. By accessing or using our scam protection services, training programs, AI business solutions, or website (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Services Overview</h2>
                  <p className="text-muted-foreground mb-4">InVision Network provides:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>ScamShield Protection:</strong> Threat analysis and scam detection services</li>
                    <li><strong>Training Programs:</strong> Educational sessions on cybersecurity and scam prevention</li>
                    <li><strong>AI Business Solutions:</strong> Custom AI automation, websites, and AI Service Insurance</li>
                    <li><strong>Educational Resources:</strong> Guides, tools, and scam prevention materials</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Eligibility and Account Registration</h2>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Eligibility</h3>
                  <p className="text-muted-foreground mb-3">
                    You must be at least 18 years old to use our Services. By using our Services, you represent that you meet this age requirement and have the authority to enter into this agreement.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-4">Account Security</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You must notify us immediately of any unauthorized access to your account</li>
                    <li>You are responsible for all activities that occur under your account</li>
                    <li>You agree to provide accurate, current, and complete information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Service-Specific Terms</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-4">ScamShield Protection Services</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Analysis Services:</strong> We provide analysis of submitted materials to identify potential scams, but we do not guarantee 100% accuracy in threat detection</li>
                    <li><strong>Response Times:</strong> Response times are estimates and may vary based on submission volume and complexity</li>
                    <li><strong>Content Submission:</strong> You grant us permission to analyze and retain submitted content for threat intelligence purposes</li>
                    <li><strong>Not Legal Advice:</strong> Our guidance is educational only and does not constitute legal advice</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Training Programs</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Participation:</strong> You agree to actively participate and engage during training sessions</li>
                    <li><strong>Recording:</strong> Some sessions may be recorded for quality assurance; you will be notified in advance</li>
                    <li><strong>Certificates:</strong> Certificates are issued upon successful completion of training requirements</li>
                    <li><strong>Cancellation:</strong> Cancellations must be made 24 hours in advance for a full refund</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">AI Business Solutions</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Custom Development:</strong> Project scope, timeline, and deliverables will be defined in a separate agreement</li>
                    <li><strong>Intellectual Property:</strong> Upon final payment, you own the delivered solution; we retain the right to reuse general methodologies</li>
                    <li><strong>AI Service Insurance:</strong> Coverage terms are detailed in the insurance policy document</li>
                    <li><strong>Maintenance:</strong> Ongoing support and maintenance services are available separately</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Payment and Billing</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-4">Fees and Charges</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>All fees are in U.S. Dollars unless otherwise specified</li>
                    <li>Subscription services are billed in advance on a monthly or annual basis</li>
                    <li>Custom project fees are outlined in individual service agreements</li>
                    <li>You authorize us to charge your payment method for all fees incurred</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Refund Policy</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>ScamShield Services:</strong> 60-day money-back guarantee for new subscribers</li>
                    <li><strong>Training Programs:</strong> Full refund if cancelled 24+ hours before session</li>
                    <li><strong>Custom Projects:</strong> Refund terms specified in project agreement</li>
                    <li><strong>No refunds:</strong> After service has been delivered or training completed</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Automatic Renewal</h3>
                  <p className="text-muted-foreground">
                    Subscription services automatically renew unless cancelled at least 24 hours before the renewal date. You can cancel through your account dashboard or by contacting customer support.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Acceptable Use Policy</h2>
                  <p className="text-muted-foreground mb-3">You agree NOT to:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Use our Services for any illegal or unauthorized purpose</li>
                    <li>Submit malicious code, viruses, or harmful content</li>
                    <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                    <li>Harass, abuse, or harm other users or our staff</li>
                    <li>Reverse engineer, decompile, or disassemble our software</li>
                    <li>Resell or redistribute our Services without authorization</li>
                    <li>Use automated systems to access Services without permission</li>
                    <li>Submit false or misleading information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Intellectual Property Rights</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-4">Our Content</h3>
                  <p className="text-muted-foreground mb-3">
                    All content, trademarks, logos, and intellectual property on our website and in our Services are owned by InVision Network or licensed to us. You may not use, copy, or distribute our content without written permission, except as necessary to use our Services.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Your Content</h3>
                  <p className="text-muted-foreground">
                    You retain ownership of content you submit to us. By submitting content, you grant us a non-exclusive, worldwide license to use, analyze, and store that content to provide Services and improve threat detection capabilities.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Disclaimers and Limitations of Liability</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-4">Service Disclaimer</h3>
                  <p className="text-muted-foreground mb-3">
                    OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>100% accuracy in scam detection or threat analysis</li>
                    <li>Prevention of all fraud or financial losses</li>
                    <li>Uninterrupted or error-free service operation</li>
                    <li>Specific results from training programs or AI solutions</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Limitation of Liability</h3>
                  <p className="text-muted-foreground">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, INVISION NETWORK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION ARISING FROM YOUR USE OF OUR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR SERVICES IN THE PAST 12 MONTHS.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                  <p className="text-muted-foreground">
                    You agree to indemnify, defend, and hold harmless InVision Network, its officers, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of Services, violation of these Terms, or infringement of any third-party rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Termination</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-4">Your Right to Terminate</h3>
                  <p className="text-muted-foreground mb-3">
                    You may cancel your account or subscription at any time through your account dashboard or by contacting customer support. Upon cancellation, you will retain access through the end of your current billing period.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Our Right to Terminate</h3>
                  <p className="text-muted-foreground">
                    We reserve the right to suspend or terminate your access to Services immediately, without notice, if you violate these Terms, engage in fraudulent activity, or for any reason that threatens the security or integrity of our Services or other users.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-4">Informal Resolution</h3>
                  <p className="text-muted-foreground mb-3">
                    Before filing any legal claim, you agree to contact us at <a href="mailto:legal@invisionnetwork.com" className="text-primary hover:underline">legal@invisionnetwork.com</a> to attempt to resolve the dispute informally.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Arbitration</h3>
                  <p className="text-muted-foreground mb-3">
                    Any disputes that cannot be resolved informally will be settled through binding arbitration in accordance with the American Arbitration Association rules, conducted in Ohio. You waive your right to participate in class actions.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Governing Law</h3>
                  <p className="text-muted-foreground">
                    These Terms are governed by the laws of the State of Ohio, without regard to conflict of law principles.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                  <p className="text-muted-foreground">
                    We may modify these Terms at any time. We will notify you of material changes via email or prominent notice on our website at least 30 days before the changes take effect. Your continued use of Services after changes become effective constitutes acceptance of the modified Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">General Provisions</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and InVision Network</li>
                    <li><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect</li>
                    <li><strong>Waiver:</strong> Our failure to enforce any right does not constitute a waiver of that right</li>
                    <li><strong>Assignment:</strong> You may not assign these Terms without our written consent</li>
                    <li><strong>Force Majeure:</strong> We are not liable for delays or failures due to circumstances beyond our reasonable control</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground mb-4">
                    For questions about these Terms of Service:
                  </p>
                  <div className="bg-muted p-6 rounded-lg">
                    <p className="text-foreground font-semibold mb-2">InVision Network</p>
                    <p className="text-muted-foreground">Email: <a href="mailto:legal@invisionnetwork.com" className="text-primary hover:underline">legal@invisionnetwork.com</a></p>
                    <p className="text-muted-foreground">Phone: <a href="tel:9375550199" className="text-primary hover:underline">(937) 555-0199</a></p>
                    <p className="text-muted-foreground">Serving Dayton, Kettering & Greater Miami Valley, Ohio</p>
                  </div>
                </section>

                <section className="border-t pt-6 mt-8">
                  <p className="text-sm text-muted-foreground italic">
                    By using InVision Network services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                </section>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;

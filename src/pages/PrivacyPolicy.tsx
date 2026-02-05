import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ReadingProgressBar from "@/components/ReadingProgressBar";

function PrivacyPolicy() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <ReadingProgressBar />
      <Navigation />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Privacy Policy</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Your privacy matters to us. This policy explains how we collect, use, and protect your information when you use InVision Network's services.
            </p>

            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                {[
                  "Information We Collect", "How We Use Your Information", "How We Share Your Information", 
                  "Data Security", "Your Rights", "Data Retention", "Cookies & Tracking",
                  "Third-Party Links", "Children's Privacy", "International Users", 
                  "California Residents (CCPA)", "European Users (GDPR)", "Changes to This Policy", "Contact Us"
                ].map((title, i) => (
                  <button key={i} onClick={() => scrollToSection(`privacy-section-${i+1}`)} 
                    className="text-left text-primary hover:text-primary/80">
                    {i+1}. {title}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-8 mb-8">
              <div className="space-y-12 text-foreground">
                <section id="privacy-section-1">
                  <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">Information You Provide Directly</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Contact Information:</strong> Name, email address, phone number (from contact forms, account registration, and purchases)</li>
                    <li><strong>Billing Information:</strong> Credit/debit card details processed securely through Stripe. We never store your full card number</li>
                    <li><strong>Account Information:</strong> Username, password (encrypted), profile preferences, and communication settings</li>
                    <li><strong>Veteran Verification:</strong> Military ID, DD-214 form, or VA documentation to verify veteran status for discounts</li>
                    <li><strong>Service Requests:</strong> Information about suspicious items, scams you've encountered, or services you're requesting</li>
                    <li><strong>Communication Records:</strong> Emails, chat messages, and phone call notes from interactions with our team</li>
                    <li><strong>Survey Responses:</strong> Feedback, testimonials, and satisfaction ratings you choose to provide</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Device Information:</strong> IP address, browser type and version, operating system, device type, and screen resolution</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, scroll depth, and navigation paths</li>
                    <li><strong>Referral Information:</strong> How you arrived at our website (search engine, social media, referral link)</li>
                    <li><strong>Cookies & Similar Technologies:</strong> See Section 7 for detailed information about our cookie usage</li>
                    <li><strong>Location Data:</strong> General geographic location based on IP address (not precise GPS location)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Information from Third Parties</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Payment Processors:</strong> Transaction confirmation, payment status, and fraud prevention signals from Stripe</li>
                    <li><strong>Social Media:</strong> If you connect social accounts, we may receive your public profile information</li>
                    <li><strong>Partner Referrals:</strong> Affiliate or partner information if you were referred through a partner program</li>
                  </ul>
                </section>

                <section id="privacy-section-2">
                  <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">We use your information for the following purposes:</p>
                  
                  <h3 className="text-lg font-semibold mb-2">Providing Services</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Processing your orders and delivering products or services</li>
                    <li>Scheduling and conducting training sessions</li>
                    <li>Managing your account and subscription</li>
                    <li>Providing customer support and responding to inquiries</li>
                    <li>Verifying veteran status for applicable discounts</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Improving Our Services</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Analyzing usage patterns to improve website functionality</li>
                    <li>Developing new features and services based on user feedback</li>
                    <li>Conducting research and analysis to enhance user experience</li>
                    <li>Testing new features and improvements</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Communication</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Sending transactional emails (order confirmations, receipts, appointment reminders)</li>
                    <li>Providing security alerts and scam warnings (if opted in)</li>
                    <li>Sending marketing communications (with your consent)</li>
                    <li>Responding to your questions and requests</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Security & Compliance</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Protecting against fraud, abuse, and unauthorized access</li>
                    <li>Enforcing our Terms of Service and other policies</li>
                    <li>Complying with legal obligations and regulatory requirements</li>
                    <li>Responding to legal requests and preventing harm</li>
                  </ul>
                </section>

                <section id="privacy-section-3">
                  <h2 className="text-2xl font-bold mb-4">3. How We Share Your Information</h2>
                  <p className="text-muted-foreground mb-4">
                    <strong>We do not sell your personal information.</strong> We may share your information in the following circumstances:
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-2">Service Providers</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li><strong>Payment Processing:</strong> Stripe processes payments on our behalf</li>
                    <li><strong>Email Services:</strong> Email delivery and newsletter management</li>
                    <li><strong>Video Conferencing:</strong> Zoom for virtual training sessions</li>
                    <li><strong>Analytics:</strong> Website analytics providers to understand usage patterns</li>
                    <li><strong>Cloud Hosting:</strong> Secure cloud infrastructure providers</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Legal Requirements</h3>
                  <p className="text-muted-foreground mb-4">
                    We may disclose your information if required by law or if we believe in good faith that such disclosure is necessary to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Comply with legal process, court order, or government request</li>
                    <li>Protect the rights, property, or safety of InVision Network, our users, or others</li>
                    <li>Investigate suspected fraud or illegal activity</li>
                    <li>Enforce our Terms of Service</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Business Transfers</h3>
                  <p className="text-muted-foreground">
                    If InVision Network is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change.
                  </p>
                </section>

                <section id="privacy-section-4">
                  <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                  <p className="text-muted-foreground mb-4">
                    We take the security of your personal information seriously and implement industry-standard security measures:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS/SSL</li>
                    <li><strong>Password Protection:</strong> Passwords are hashed using industry-standard algorithms. We never store plain-text passwords</li>
                    <li><strong>Access Controls:</strong> Employee access to personal data is limited and logged</li>
                    <li><strong>Regular Audits:</strong> We conduct regular security assessments and vulnerability testing</li>
                    <li><strong>Payment Security:</strong> Payment processing is handled by PCI-DSS compliant providers (Stripe)</li>
                    <li><strong>Data Minimization:</strong> We only collect data necessary for the intended purpose</li>
                    <li><strong>Secure Storage:</strong> Sensitive documents (veteran IDs) are stored in encrypted, access-controlled storage</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    <strong>Important:</strong> No method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </section>

                <section id="privacy-section-5">
                  <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                  <p className="text-muted-foreground mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                    <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                    <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                    <li><strong>Restrict Processing:</strong> Request that we limit how we use your data</li>
                    <li><strong>Object:</strong> Object to certain types of processing</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    To exercise any of these rights, contact us at <a href="mailto:privacy@invisionnetwork.org" className="text-primary hover:underline">privacy@invisionnetwork.org</a>. We will respond within 30 days.
                  </p>
                </section>

                <section id="privacy-section-6">
                  <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
                  <p className="text-muted-foreground mb-4">
                    We retain your personal information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Account Information:</strong> Retained while your account is active, plus 7 years after closure for legal compliance</li>
                    <li><strong>Transaction Records:</strong> 7 years for tax and accounting purposes</li>
                    <li><strong>Communication Records:</strong> 3 years after the last communication</li>
                    <li><strong>Veteran Documentation:</strong> Deleted after verification is complete (within 90 days) unless you request we retain it</li>
                    <li><strong>Marketing Preferences:</strong> Until you unsubscribe or request deletion</li>
                    <li><strong>Website Analytics:</strong> Anonymized after 26 months</li>
                  </ul>
                </section>

                <section id="privacy-section-7">
                  <h2 className="text-2xl font-bold mb-4">7. Cookies & Tracking</h2>
                  <p className="text-muted-foreground mb-4">
                    We use cookies and similar tracking technologies to collect and track information about your use of our Services:
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground mb-4">
                    Required for the website to function properly. These cannot be disabled.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Session management and authentication</li>
                    <li>Shopping cart functionality</li>
                    <li>Security features</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-muted-foreground mb-4">
                    Help us understand how visitors interact with our website.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Page views and navigation patterns</li>
                    <li>Time spent on pages</li>
                    <li>Error tracking</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Managing Cookies</h3>
                  <p className="text-muted-foreground">
                    You can manage your cookie preferences through our cookie consent banner or through your browser settings. Note that disabling certain cookies may affect website functionality.
                  </p>
                </section>

                <section id="privacy-section-8">
                  <h2 className="text-2xl font-bold mb-4">8. Third-Party Links</h2>
                  <p className="text-muted-foreground mb-4">
                    Our website may contain links to third-party websites, services, or applications that are not operated by us. This Privacy Policy does not apply to those third-party services.
                  </p>
                  <p className="text-muted-foreground">
                    We are not responsible for the privacy practices of third-party websites. We encourage you to review the privacy policies of any third-party services you visit.
                  </p>
                </section>

                <section id="privacy-section-9">
                  <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
                  <p className="text-muted-foreground mb-4">
                    Our Services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:privacy@invisionnetwork.org" className="text-primary hover:underline">privacy@invisionnetwork.org</a>, and we will take steps to delete such information.
                  </p>
                  <p className="text-muted-foreground">
                    For users between 13 and 18, parental consent is required to use our Services.
                  </p>
                </section>

                <section id="privacy-section-10">
                  <h2 className="text-2xl font-bold mb-4">10. International Users</h2>
                  <p className="text-muted-foreground mb-4">
                    InVision Network is based in the United States. If you access our Services from outside the United States, your information may be transferred to, stored, and processed in the United States where our servers are located.
                  </p>
                  <p className="text-muted-foreground">
                    By using our Services, you consent to the transfer of your information to the United States and acknowledge that U.S. data protection laws may differ from those in your country of residence.
                  </p>
                </section>

                <section id="privacy-section-11">
                  <h2 className="text-2xl font-bold mb-4">11. California Residents (CCPA)</h2>
                  <p className="text-muted-foreground mb-4">
                    If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li><strong>Right to Know:</strong> You can request disclosure of the categories and specific pieces of personal information we've collected about you</li>
                    <li><strong>Right to Delete:</strong> You can request deletion of your personal information, subject to certain exceptions</li>
                    <li><strong>Right to Opt-Out:</strong> You can opt-out of the "sale" of personal information (we do not sell personal information)</li>
                    <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    <strong>Categories of Information Collected:</strong> Identifiers, commercial information, internet activity, geolocation data, and professional information.
                  </p>
                  <p className="text-muted-foreground">
                    To submit a CCPA request, contact us at <a href="mailto:privacy@invisionnetwork.org" className="text-primary hover:underline">privacy@invisionnetwork.org</a> or call (937) 301-8749.
                  </p>
                </section>

                <section id="privacy-section-12">
                  <h2 className="text-2xl font-bold mb-4">12. European Users (GDPR)</h2>
                  <p className="text-muted-foreground mb-4">
                    If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have rights under the General Data Protection Regulation (GDPR):
                  </p>
                  
                  <h3 className="text-lg font-semibold mb-2">Legal Basis for Processing</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li><strong>Contract:</strong> Processing necessary to perform our contract with you</li>
                    <li><strong>Legitimate Interests:</strong> Processing for our legitimate business interests</li>
                    <li><strong>Consent:</strong> Processing based on your consent (marketing)</li>
                    <li><strong>Legal Obligation:</strong> Processing required by law</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Your GDPR Rights</h3>
                  <p className="text-muted-foreground mb-4">
                    In addition to the rights listed in Section 5, you have the right to lodge a complaint with a supervisory authority if you believe your rights have been violated.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">Data Transfers</h3>
                  <p className="text-muted-foreground">
                    When we transfer your data outside the EEA, we use appropriate safeguards such as Standard Contractual Clauses approved by the European Commission.
                  </p>
                </section>

                <section id="privacy-section-13">
                  <h2 className="text-2xl font-bold mb-4">13. Changes to This Policy</h2>
                  <p className="text-muted-foreground mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>How we notify you of changes:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Updating the "Last Updated" date at the top of this policy</li>
                    <li>Posting a notice on our website for significant changes</li>
                    <li>Sending an email notification for material changes affecting your rights</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    We encourage you to review this policy periodically. Your continued use of our Services after any changes indicates your acceptance of the updated policy.
                  </p>
                </section>

                <section id="privacy-section-14">
                  <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> <a href="mailto:privacy@invisionnetwork.org" className="text-primary hover:underline">privacy@invisionnetwork.org</a></p>
                    <p><strong>Phone:</strong> (937) 301-8749</p>
                    <p><strong>Mail:</strong> InVision Network LLC, Privacy Office, Greater Dayton Area, OH</p>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    We aim to respond to all inquiries within 30 days.
                  </p>
                </section>
              </div>
            </Card>

            <div className="text-center">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF Version
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;

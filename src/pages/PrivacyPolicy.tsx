import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-8">Privacy Policy</h1>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <Card className="p-8 mb-8">
              <div className="space-y-8 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Our Commitment to Your Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At InVision Network, protecting your personal information is fundamental to everything we do. This Privacy Policy explains how we collect, use, protect, and share your information when you use our scam protection services, training programs, and AI business solutions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Name, email address, phone number when you register or contact us</li>
                    <li>Payment information when you purchase our services</li>
                    <li>Content you submit for scam analysis (emails, texts, screenshots, voice recordings)</li>
                    <li>Training session participation data and certificates</li>
                    <li>Business information if you use our AI services</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Information We Collect Automatically</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Device information (browser type, operating system)</li>
                    <li>Usage data (pages visited, features used, time spent)</li>
                    <li>IP address and general location data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Scam Protection Services:</strong> Analyze suspicious content you submit to detect threats</li>
                    <li><strong>Training Programs:</strong> Deliver educational content and issue certificates</li>
                    <li><strong>Service Delivery:</strong> Process payments, send confirmations, and provide customer support</li>
                    <li><strong>Communication:</strong> Send service updates, scam alerts, and educational resources</li>
                    <li><strong>Improvement:</strong> Enhance our services, develop new features, and improve security</li>
                    <li><strong>Legal Compliance:</strong> Meet regulatory requirements and protect our legal rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">How We Protect Your Information</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Encryption:</strong> All data transmission uses industry-standard SSL/TLS encryption</p>
                    <p><strong>Access Controls:</strong> Strict employee access policies with role-based permissions</p>
                    <p><strong>Secure Storage:</strong> Data stored on encrypted, SOC 2 compliant servers</p>
                    <p><strong>Regular Audits:</strong> Security assessments and vulnerability testing</p>
                    <p><strong>Incident Response:</strong> Documented procedures for data breach notification</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
                  <p className="text-muted-foreground mb-4">
                    We do NOT sell your personal information. We may share your information only in these limited circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Service Providers:</strong> Third-party vendors who help deliver our services (payment processors, email providers) under strict confidentiality agreements</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
                  <p className="text-muted-foreground mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                    <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                    <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                    <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                    <li><strong>Object:</strong> Object to certain types of data processing</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    To exercise these rights, contact us at <a href="mailto:privacy@invisionnetwork.com" className="text-primary hover:underline">privacy@invisionnetwork.com</a>
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
                  <p className="text-muted-foreground mb-3">
                    We use cookies to improve your experience and understand how our services are used:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Essential Cookies:</strong> Required for site functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    You can control cookies through your browser settings, but disabling them may affect site functionality.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                  <p className="text-muted-foreground">
                    We retain your information only as long as necessary to provide services and comply with legal obligations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
                    <li>Account information: Duration of service plus 7 years for financial records</li>
                    <li>Scam analysis submissions: 2 years for threat intelligence purposes</li>
                    <li>Training certificates: Indefinitely for verification purposes</li>
                    <li>Marketing data: Until you unsubscribe or request deletion</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                  <p className="text-muted-foreground">
                    Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">California Privacy Rights (CCPA)</h2>
                  <p className="text-muted-foreground">
                    California residents have additional rights under the California Consumer Privacy Act. You may request information about personal information collected, request deletion, and opt-out of sale (though we do not sell personal information).
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">International Users</h2>
                  <p className="text-muted-foreground">
                    Our services are based in the United States. If you access our services from outside the U.S., your information will be transferred to and processed in the United States, which may have different data protection laws than your country.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or prominent notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have questions, concerns, or requests regarding this Privacy Policy:
                  </p>
                  <div className="bg-muted p-6 rounded-lg">
                    <p className="text-foreground font-semibold mb-2">InVision Network</p>
                    <p className="text-muted-foreground">Email: <a href="mailto:privacy@invisionnetwork.com" className="text-primary hover:underline">privacy@invisionnetwork.com</a></p>
                    <p className="text-muted-foreground">Phone: <a href="tel:9375550199" className="text-primary hover:underline">(937) 555-0199</a></p>
                    <p className="text-muted-foreground">Address: Dayton, Ohio</p>
                  </div>
                </section>

                <section className="border-t pt-6 mt-8">
                  <p className="text-sm text-muted-foreground italic">
                    This Privacy Policy was last updated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. We are committed to protecting your privacy and maintaining your trust.
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

export default PrivacyPolicy;

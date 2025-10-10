import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <Hero
        useTransitioningBackground={true}
        headline="Privacy Policy"
        subheadline="How we protect and handle your personal information"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                <strong>Last Updated:</strong> January 1, 2025
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us when you register for training, sign up for services, or contact us:
              </p>
              <ul>
                <li>Name, email address, phone number</li>
                <li>Payment information (processed securely by our payment processor)</li>
                <li>Service preferences and feedback</li>
                <li>Communication history with our team</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Send you educational content and marketing communications (with your consent)</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do NOT sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:
              </p>
              <ul>
                <li>With service providers who assist in our operations (payment processing, email delivery)</li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>With your explicit consent</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul>
                <li>SSL/TLS encryption for data in transit</li>
                <li>Encrypted storage of sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Limited employee access to personal data</li>
              </ul>

              <h2>5. Your Privacy Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>

              <h2>6. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to improve your experience, analyze site usage, and deliver personalized content. You can control cookie preferences through your browser settings.
              </p>

              <h2>7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.
              </p>

              <h2>8. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul>
                <li>Email: privacy@invisionnetwork.com</li>
                <li>Phone: (937) 555-1234</li>
                <li>Mail: InVision Network, 123 Main Street, Dayton, OH 45402</li>
              </ul>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-3">GDPR & CCPA Compliance</h3>
                <p className="mb-2">
                  InVision Network complies with GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act).
                </p>
                <p>
                  EU and California residents have additional rights. Please contact us to exercise these rights.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;

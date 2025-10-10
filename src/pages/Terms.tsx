import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <Hero
        useTransitioningBackground={true}
        headline="Terms of Service"
        subheadline="Please read these terms carefully before using our services"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                <strong>Last Updated:</strong> January 1, 2025
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using InVision Network's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>

              <h2>2. Description of Services</h2>
              <p>
                InVision Network provides educational services related to AI security, scam prevention, and digital safety training. Our services include:
              </p>
              <ul>
                <li>AI security training programs (Zoom and in-person)</li>
                <li>Family Scam Shield scam analysis service</li>
                <li>Business AI consulting and automation</li>
                <li>Educational resources and support</li>
              </ul>

              <h2>3. Educational Services Disclaimer</h2>
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="font-bold mb-2">IMPORTANT:</p>
                <p>
                  InVision Network provides educational services ONLY. We are NOT:
                </p>
                <ul className="mt-2">
                  <li>Licensed cybersecurity professionals</li>
                  <li>Legal, financial, or tax advisors</li>
                  <li>Law enforcement or emergency services</li>
                  <li>Certified IT support or device repair service</li>
                </ul>
              </div>

              <h2>4. Emergency Situations</h2>
              <p>
                In case of active fraud, identity theft, or criminal activity:
              </p>
              <ol>
                <li>Contact local law enforcement (911 for emergencies)</li>
                <li>Call your bank's fraud department using the official phone number on your card</li>
                <li>Report to FTC at IdentityTheft.gov</li>
                <li>Then contact InVision for educational support</li>
              </ol>

              <h2>5. Privacy Policy</h2>
              <p>
                We NEVER request:
              </p>
              <ul>
                <li>Passwords or 2FA codes</li>
                <li>Bank account information or credit card details (except through secure payment processor)</li>
                <li>Social Security numbers</li>
                <li>Remote access to your devices</li>
              </ul>
              <p>
                If anyone claiming to be from InVision requests this information, it is a scam. Report it immediately.
              </p>

              <h2>6. Payment Terms</h2>
              <p>
                Training programs and services require payment in advance. Prices are subject to change with notice. Payment is processed securely through our third-party payment processor.
              </p>

              <h2>7. Refund Policy</h2>
              <p>
                We offer a 7-day satisfaction guarantee for most services. Refund requests must be submitted within 7 days of purchase. See our full Refund Policy for details.
              </p>

              <h2>8. User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use our services for illegal purposes</li>
                <li>Harass, abuse, or harm others</li>
                <li>Impersonate InVision staff or misrepresent your affiliation</li>
                <li>Share training materials without permission</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>

              <h2>9. Intellectual Property</h2>
              <p>
                All training materials, course content, scripts, and resources provided by InVision Network are protected by copyright. You may use them for personal protection purposes but may not reproduce, distribute, or sell them without written permission.
              </p>

              <h2>10. Limitation of Liability</h2>
              <p>
                InVision Network provides educational services to help you protect yourself from scams. However:
              </p>
              <ul>
                <li>We cannot guarantee prevention of all fraud attempts</li>
                <li>We are not liable for losses resulting from scams or fraud</li>
                <li>Our advice is educational and should be combined with official guidance from banks, law enforcement, and legal counsel</li>
                <li>Maximum liability is limited to the amount paid for services</li>
              </ul>

              <h2>11. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless InVision Network from any claims, damages, or expenses arising from your use of our services or violation of these terms.
              </p>

              <h2>12. Modifications to Services</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.
              </p>

              <h2>13. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Ohio, United States. Disputes will be resolved in courts located in Montgomery County, Ohio.
              </p>

              <h2>14. Contact Information</h2>
              <p>
                For questions about these Terms of Service:
              </p>
              <ul>
                <li>Email: legal@invisionnetwork.com</li>
                <li>Phone: (937) 555-1234</li>
                <li>Mail: InVision Network, 123 Main Street, Dayton, OH 45402</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;

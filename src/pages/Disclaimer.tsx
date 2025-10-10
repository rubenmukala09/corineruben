import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <Hero
        useTransitioningBackground={true}
        headline="Disclaimer"
        subheadline="Important information about our services and limitations"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="not-prose bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">PLEASE READ CAREFULLY</h3>
                    <p className="text-muted-foreground">
                      InVision Network provides educational services ONLY. We are not cybersecurity professionals, legal advisors, financial consultants, or law enforcement.
                    </p>
                  </div>
                </div>
              </div>

              <h2>Educational Services Only</h2>
              <p>
                All information, training, and advice provided by InVision Network is for educational purposes only. Our services are designed to:
              </p>
              <ul>
                <li>Increase awareness of AI-powered scams and fraud tactics</li>
                <li>Teach practical prevention and detection strategies</li>
                <li>Provide scripts and protocols for common scam scenarios</li>
                <li>Offer analysis of suspicious communications (Scam Shield)</li>
              </ul>

              <h2>What We Are NOT</h2>
              <p>InVision Network and its trainers are NOT:</p>
              <ul>
                <li>Licensed cybersecurity professionals or penetration testers</li>
                <li>Legal counsel or attorneys (cannot provide legal advice)</li>
                <li>Financial advisors or tax professionals</li>
                <li>Licensed mental health counselors or therapists</li>
                <li>Law enforcement or government agency</li>
                <li>Technical IT support or device repair service</li>
                <li>Insurance providers or claims adjusters</li>
              </ul>

              <h2>No Guarantee of Protection</h2>
              <p>
                While our training significantly improves your ability to recognize and avoid scams, we CANNOT guarantee:
              </p>
              <ul>
                <li>Prevention of all fraud attempts or scams</li>
                <li>Recovery of funds lost to scammers</li>
                <li>Detection of all deepfakes, phishing emails, or fraudulent communications</li>
                <li>Protection from all forms of cyber attacks</li>
                <li>Specific outcomes from following our recommendations</li>
              </ul>

              <h2>Emergency Response</h2>
              <p>
                InVision Network is NOT an emergency response service. If you are experiencing:
              </p>
              <ul>
                <li><strong>Active fraud or theft:</strong> Call 911 and your bank immediately</li>
                <li><strong>Identity theft:</strong> Contact FTC at IdentityTheft.gov</li>
                <li><strong>Cyber attack:</strong> Contact your IT department or cybersecurity professional</li>
                <li><strong>Legal issues:</strong> Consult with an attorney</li>
              </ul>

              <h2>Scam Shield Service Limitations</h2>
              <p>
                Our Scam Shield scam analysis service:
              </p>
              <ul>
                <li>Provides risk assessments based on known scam patterns</li>
                <li>May not detect brand-new or highly sophisticated scams</li>
                <li>Should be one part of your overall security strategy</li>
                <li>Does NOT replace official verification through trusted channels</li>
                <li>Response times are estimates and may vary</li>
              </ul>

              <h2>Third-Party Tools & Resources</h2>
              <p>
                We may recommend third-party tools, software, or resources. InVision Network:
              </p>
              <ul>
                <li>Does not endorse or guarantee third-party products</li>
                <li>Is not responsible for third-party service quality or security</li>
                <li>Recommends you conduct your own research before purchasing</li>
                <li>May receive affiliate commissions (disclosed when applicable)</li>
              </ul>

              <h2>Accuracy of Information</h2>
              <p>
                We strive to provide accurate, up-to-date information. However:
              </p>
              <ul>
                <li>Scam tactics evolve rapidly; information may become outdated</li>
                <li>We cannot verify all user-submitted suspicious items with 100% certainty</li>
                <li>Our training reflects current knowledge but cannot cover all scenarios</li>
                <li>You should verify important information through multiple sources</li>
              </ul>

              <h2>User Responsibility</h2>
              <p>
                By using our services, you acknowledge that:
              </p>
              <ul>
                <li>You are responsible for your own security decisions</li>
                <li>You will verify urgent requests through official channels</li>
                <li>You will contact appropriate authorities in emergencies</li>
                <li>You understand our educational limitations</li>
                <li>You will use common sense and critical thinking</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, InVision Network and its owners, employees, trainers, and contractors shall not be liable for:
              </p>
              <ul>
                <li>Financial losses resulting from scams or fraud</li>
                <li>Damages from following or not following our advice</li>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Losses exceeding the amount paid for our services</li>
              </ul>

              <h2>Professional Advice Disclaimer</h2>
              <p>
                Nothing in our training or services constitutes:
              </p>
              <ul>
                <li>Legal, financial, tax, or professional advice</li>
                <li>Official cybersecurity certification or credential</li>
                <li>Endorsement of specific security products or services</li>
                <li>Medical or mental health counseling</li>
              </ul>
              <p>
                Always consult with appropriate licensed professionals for specific advice regarding your situation.
              </p>

              <h2>Updates to This Disclaimer</h2>
              <p>
                We may update this disclaimer as our services evolve or as required by law. Material changes will be communicated to active clients.
              </p>

              <h2>Questions</h2>
              <p>
                If you have questions about this disclaimer or our services:
              </p>
              <ul>
                <li>Email: legal@invisionnetwork.com</li>
                <li>Phone: (937) 555-1234</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Disclaimer;

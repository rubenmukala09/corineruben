import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { AlertTriangle } from "lucide-react";

function Disclaimer() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="AI & Service Disclaimer | InVision Network"
        description="Important disclaimers about AI limitations, service scope, and liability for InVision Network services."
      />
      <Navigation />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              <h1 className="text-center mb-0">Disclaimer</h1>
            </div>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <Card className="p-8 mb-8">
              <div className="space-y-12 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. AI Limitations Disclaimer</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="font-semibold text-foreground">IMPORTANT: Please read this section carefully before using any AI-powered service.</p>
                    <p>Artificial Intelligence (AI) systems, including those provided by InVision Network, have inherent limitations:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>AI Can Make Errors:</strong> AI outputs may be inaccurate, incomplete, or inappropriate. AI-generated responses should not be considered infallible or a substitute for professional judgment.</li>
                      <li><strong>Human Review Recommended:</strong> We strongly recommend human review of all AI-generated content, decisions, and actions before implementation, especially for critical business operations.</li>
                      <li><strong>No Guaranteed Outcomes:</strong> We do not guarantee specific results, ROI, revenue increases, or other business outcomes from using our AI services.</li>
                      <li><strong>Evolving Technology:</strong> AI technology is rapidly evolving. The capabilities and limitations of AI systems may change over time.</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">2. Service Scope Disclaimer</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>InVision Network provides technology and automation services. We are NOT:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Licensed attorneys or legal advisors</li>
                      <li>Licensed financial advisors or accountants</li>
                      <li>Licensed cybersecurity professionals (CISSP, etc.)</li>
                      <li>Healthcare providers or medical professionals</li>
                      <li>Insurance underwriters or licensed insurance agents</li>
                    </ul>
                    <p className="mt-4">Our services are educational and technological in nature. For legal, financial, medical, or specialized professional advice, please consult with appropriately licensed professionals.</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">3. Client Responsibility</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>By using our services, you acknowledge and accept responsibility for:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Accuracy of Information:</strong> You are responsible for the accuracy and completeness of all information you provide to us.</li>
                      <li><strong>Appropriate Use:</strong> You agree to use our AI services in accordance with all applicable laws and regulations.</li>
                      <li><strong>Human Oversight:</strong> You accept responsibility for providing appropriate human oversight of AI-powered systems.</li>
                      <li><strong>Backup Systems:</strong> Critical business operations should have backup systems and processes in place.</li>
                      <li><strong>Compliance:</strong> Ensuring your use of our services complies with industry-specific regulations (HIPAA, PCI-DSS, etc.).</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>InVision Network shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</li>
                      <li>Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim.</li>
                      <li>We are not liable for losses resulting from AI errors, third-party service failures, or factors outside our reasonable control.</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>Our services may integrate with or rely upon third-party services including but not limited to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Cloud hosting providers (AWS, Google Cloud, etc.)</li>
                      <li>AI model providers (OpenAI, Google AI, etc.)</li>
                      <li>Communication platforms (Twilio, SendGrid, etc.)</li>
                      <li>Payment processors (Stripe)</li>
                    </ul>
                    <p className="mt-4">We are not responsible for the availability, accuracy, or performance of third-party services. Third-party services are governed by their own terms of service and privacy policies.</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">6. No Warranty</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Implied warranties of merchantability</li>
                      <li>Fitness for a particular purpose</li>
                      <li>Non-infringement</li>
                      <li>Accuracy or reliability of results</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">7. Indemnification</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>You agree to indemnify, defend, and hold harmless InVision Network, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, liabilities, and expenses arising from:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your use of our services</li>
                      <li>Your violation of these terms or any applicable law</li>
                      <li>Content or data you provide to us</li>
                      <li>Your failure to maintain appropriate human oversight of AI systems</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">8. Fraud & Emergency Situations</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="font-semibold text-foreground">IMPORTANT: Our services are NOT a substitute for emergency services.</p>
                    <p>In case of active fraud, identity theft, or criminal activity:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Contact local law enforcement (911) immediately</li>
                      <li>Contact your bank's fraud department using official phone numbers</li>
                      <li>Report to the FTC at IdentityTheft.gov</li>
                    </ul>
                    <p className="mt-4 font-semibold">We never request passwords, 2FA codes, bank account information, or Social Security numbers.</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Questions about this disclaimer should be directed to:</p>
                    <p><strong>Email:</strong> <a href="mailto:legal@invisionnetwork.org" className="text-primary">legal@invisionnetwork.org</a></p>
                    <p><strong>Phone:</strong> (937) 555-0199</p>
                  </div>
                </section>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Disclaimer;
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

function RefundsPolicy() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Refunds & Billing Policy | InVision Network"
        description="Our refund policy, billing terms, and cancellation procedures for all InVision Network services."
      />
      <Navigation />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Refunds & Billing Policy</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <Card className="p-8 mb-8">
              <div className="space-y-12 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Payment Terms</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>All payments are processed securely through Stripe. We accept major credit cards, debit cards, and ACH bank transfers for eligible purchases.</p>
                    <p><strong>Project-Based Services:</strong> Custom AI agents, website design, and other project-based services require a 50% deposit to begin work, with the remaining balance due upon project completion.</p>
                    <p><strong>Subscription Services:</strong> AI Service Insurance and maintenance plans are billed at the start of each billing period (monthly or annually).</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">2. 30-Day Satisfaction Guarantee</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>We stand behind our work. If you're not satisfied with our services within the first 30 days of delivery, contact us and we'll work to make it right.</p>
                    <p><strong>What's Covered:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>AI agent implementations that don't meet agreed specifications</li>
                      <li>Website designs that significantly deviate from approved mockups</li>
                      <li>Services that fail to function as described</li>
                    </ul>
                    <p><strong>What's Not Covered:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Changes in business requirements after project completion</li>
                      <li>Third-party service outages or limitations</li>
                      <li>Issues caused by client modifications or misuse</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">3. Refund Eligibility</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Full Refunds:</strong> Available if we are unable to deliver the agreed-upon service, or if the service fails to meet documented specifications within 30 days.</p>
                    <p><strong>Partial Refunds:</strong> May be offered for services partially completed, calculated based on work delivered and approved.</p>
                    <p><strong>No Refunds:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>After 30 days from service delivery</li>
                      <li>For completed and approved work</li>
                      <li>Training sessions that have been attended</li>
                      <li>Digital products after download/access</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">4. Subscription Cancellations</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p><strong>Monthly Subscriptions:</strong> Cancel anytime before your next billing date. Your service will continue until the end of the current billing period.</p>
                    <p><strong>Annual Subscriptions:</strong> Prorated refunds are available within the first 60 days. After 60 days, you may cancel but no refund will be issued; service continues until period end.</p>
                    <p><strong>How to Cancel:</strong> Email support@invisionnetwork.org or use the customer portal to cancel your subscription.</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">5. Chargebacks & Disputes</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>We encourage you to contact us directly before initiating a chargeback with your bank. We're committed to resolving issues fairly and quickly.</p>
                    <p>Initiating a chargeback without first contacting us may result in:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Immediate suspension of services</li>
                      <li>Inability to use our services in the future</li>
                      <li>Additional fees if the dispute is found in our favor</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">6. Late Payments</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>For project-based services, final payment is due within 15 days of project completion notification.</p>
                    <p>Late payments may result in:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>1.5% monthly interest on overdue amounts</li>
                      <li>Suspension of ongoing services</li>
                      <li>Removal of deployed solutions until payment is received</li>
                    </ul>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">7. Price Changes</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>We reserve the right to change pricing at any time. For subscription services, you'll be notified at least 30 days before any price increase takes effect.</p>
                    <p>Existing quotes and contracts are honored at the agreed price for their duration.</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">8. How to Request a Refund</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>To request a refund, please contact us with:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Your order/invoice number</li>
                      <li>The email used for the purchase</li>
                      <li>Detailed reason for the refund request</li>
                      <li>Any relevant documentation</li>
                    </ul>
                    <p className="mt-4">
                      <strong>Email:</strong> <a href="mailto:billing@invisionnetwork.org" className="text-primary">billing@invisionnetwork.org</a><br />
                      <strong>Phone:</strong> (937) 555-0199
                    </p>
                    <p className="mt-4">We aim to respond to all refund requests within 3 business days.</p>
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

export default RefundsPolicy;
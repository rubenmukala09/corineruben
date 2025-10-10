import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

const Refund = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <Hero
        useTransitioningBackground={true}
        headline="Refund Policy"
        subheadline="Our commitment to your satisfaction"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                <strong>Last Updated:</strong> January 1, 2025
              </p>

              <h2>7-Day Satisfaction Guarantee</h2>
              <p>
                We stand behind the quality of our training and services. If you're not satisfied with your experience, you can request a full refund within 7 days of purchase for most services.
              </p>

              <h2>Eligible for Refunds</h2>
              <div className="not-prose space-y-3 my-6">
                {[
                  "Training programs (Zoom or in-person) - if requested before the training date",
                  "Family Scam Shield monthly subscription - within first 7 days",
                  "Business consulting services - before work begins",
                  "Gift certificates - within 7 days if unused"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <h2>NOT Eligible for Refunds</h2>
              <div className="not-prose space-y-3 my-6">
                {[
                  "Training sessions already completed",
                  "Services already rendered",
                  "Downloadable digital products after download",
                  "Subscriptions after the initial 7-day period",
                  "Physical security products after shipping"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <h2>How to Request a Refund</h2>
              <ol>
                <li>Contact us within 7 days of purchase</li>
                <li>Provide your order number and reason for refund</li>
                <li>Allow 5-7 business days for processing</li>
                <li>Refund will be issued to original payment method</li>
              </ol>

              <h2>Partial Refunds</h2>
              <p>
                In certain situations, partial refunds may be granted at our discretion:
              </p>
              <ul>
                <li>Rescheduling fees deducted from refund</li>
                <li>Administrative fees for complex requests</li>
                <li>Partial service completion</li>
              </ul>

              <h2>Rescheduling vs. Refunds</h2>
              <p>
                Before requesting a refund, consider rescheduling:
              </p>
              <ul>
                <li><strong>Family Small Group:</strong> One free reschedule with 14 days notice</li>
                <li><strong>Priority Private:</strong> Easy rescheduling with 24 hours notice</li>
                <li><strong>Single Small Group:</strong> No rescheduling available</li>
              </ul>

              <h2>Subscription Cancellations</h2>
              <p>
                Family Scam Shield subscriptions:
              </p>
              <ul>
                <li>Cancel anytime, no questions asked</li>
                <li>Access continues until end of current billing period</li>
                <li>No prorated refunds for mid-cycle cancellations (except within initial 7 days)</li>
              </ul>

              <h2>Exceptions & Special Circumstances</h2>
              <p>
                We understand that life happens. Contact us if you experience:
              </p>
              <ul>
                <li>Medical emergencies</li>
                <li>Family crises</li>
                <li>Natural disasters or extreme circumstances</li>
              </ul>
              <p>
                We will work with you to find a fair solution, which may include rescheduling, credit, or refund.
              </p>

              <h2>Contact Us for Refunds</h2>
              <div className="not-prose bg-primary/5 p-6 rounded-lg border border-primary/20 mt-6">
                <p className="font-bold mb-3">To request a refund, contact us:</p>
                <ul className="space-y-2">
                  <li>Email: refunds@invisionnetwork.com</li>
                  <li>Phone: (937) 555-1234</li>
                  <li>Include: Order number, purchase date, reason for refund</li>
                </ul>
                <Button asChild className="mt-4">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Refund;

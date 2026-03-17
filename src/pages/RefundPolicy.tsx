import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SITE } from "@/config/site";

function RefundPolicy() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Refund Policy"
        description="Understand refund eligibility, timelines, and the 30-day satisfaction guarantee."
      />
      <Navigation />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Refund Policy</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase. This
              policy outlines our refund and return procedures.
            </p>

            {/* Quick Overview Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <Card className="p-6 border-green-500/20 bg-green-500/5">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">30-Day Money Back</h3>
                    <p className="text-sm text-muted-foreground">
                      All digital products and new subscriptions include a
                      30-day satisfaction guarantee.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 border-blue-500/20 bg-blue-500/5">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Fast Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Refunds are processed within 5-10 business days after
                      approval.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 mb-8">
              <div className="space-y-10 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Digital Products</h2>
                  <p className="text-muted-foreground mb-4">
                    This includes e-books, digital guides, online courses,
                    and digital resources.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Eligible for Refund
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Request made within 30 days of purchase</li>
                      <li>Reason for dissatisfaction provided</li>
                      <li>First refund request for that product</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      Not Eligible
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Request made after 30 days</li>
                      <li>Repeated refund requests for the same product</li>
                      <li>Evidence of product misuse or redistribution</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Subscription Services
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    This includes ScamShield protection plans and Website
                    Insurance subscriptions.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">
                    New Subscribers
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      <strong>30-day money-back guarantee</strong> on your first
                      billing cycle
                    </li>
                    <li>
                      Full refund if requested within 30 days of initial
                      purchase
                    </li>
                    <li>Cancel anytime with no questions asked</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">
                    Existing Subscribers
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Cancel at any time through your account settings</li>
                    <li>
                      Access continues until the end of your current billing
                      period
                    </li>
                    <li>
                      No pro-rated refunds for partial months after the initial
                      30-day period
                    </li>
                    <li>
                      Annual subscribers may receive pro-rated refunds for
                      unused months at our discretion
                    </li>
                  </ul>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-amber-600">
                      <AlertCircle className="h-5 w-5" />
                      Auto-Renewal Notice
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Subscriptions automatically renew unless cancelled before
                      the renewal date. We'll send a reminder email 7 days
                      before your renewal.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Training & Consultation Services
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    This includes individual and group training sessions,
                    workshops, and consulting appointments.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">48+ Hours Notice</h4>
                        <p className="text-sm text-muted-foreground">
                          Full refund or free rescheduling
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                      <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">24-48 Hours Notice</h4>
                        <p className="text-sm text-muted-foreground">
                          50% refund or rescheduling with $25 fee
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">
                          Less Than 24 Hours / No-Show
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          No refund. Session may be rescheduled for a $50 fee.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-4">
                    <strong>Completed Sessions:</strong> Once a training session
                    has been completed, refunds are generally not available. If
                    you're unsatisfied with the quality of training, please
                    contact us within 24 hours to discuss a resolution.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Physical Products</h2>
                  <p className="text-muted-foreground mb-4">
                    This includes security devices, printed materials,
                    merchandise, and shipped items.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">
                    Return Conditions
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Return request made within 30 days of delivery</li>
                    <li>Item must be unused and in original packaging</li>
                    <li>
                      Include all accessories, manuals, and original receipt
                    </li>
                    <li>
                      Items must not be damaged (except manufacturing defects)
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Return Process</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      Contact{" "}
                      <a
                        href={`mailto:${SITE.emails.returns}`}
                        className="text-primary hover:underline"
                      >
                        {SITE.emails.returns}
                      </a>{" "}
                      with your order number
                    </li>
                    <li>
                      Receive return authorization and shipping label (for
                      defective items)
                    </li>
                    <li>Ship item back within 14 days of authorization</li>
                    <li>
                      Refund processed within 10 business days of receiving
                      return
                    </li>
                  </ol>

                  <h3 className="text-lg font-semibold mb-2">Shipping Costs</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      <strong>Defective/Wrong Item:</strong> We pay return
                      shipping
                    </li>
                    <li>
                      <strong>Changed Mind:</strong> Customer pays return
                      shipping
                    </li>
                    <li>
                      <strong>Original shipping costs:</strong> Non-refundable
                      unless item was defective
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Business Services</h2>
                  <p className="text-muted-foreground mb-4">
                    This includes AI automation, website design, and custom
                    consulting projects.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      <strong>Before Work Begins:</strong> Full refund minus any
                      consultation fees
                    </li>
                    <li>
                      <strong>Work in Progress:</strong> Refund for incomplete
                      milestones only
                    </li>
                    <li>
                      <strong>Completed Deliverables:</strong> Non-refundable
                      once approved
                    </li>
                    <li>
                      Custom projects are subject to individual contract terms
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    How to Request a Refund
                  </h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      To request a refund, please contact us with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Your order number or transaction ID</li>
                      <li>Email address used for purchase</li>
                      <li>Reason for refund request</li>
                      <li>
                        Any supporting documentation (photos for damaged items)
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <p className="text-muted-foreground mb-2">
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${SITE.emails.support}`}
                        className="text-primary hover:underline"
                      >
                        {SITE.emails.support}
                      </a>
                    </p>
                    <p className="text-muted-foreground mb-2">
                      <strong>Phone:</strong>{" "}
                      <a
                        href={SITE.phone.tel}
                        className="text-primary hover:underline"
                      >
                        {SITE.phone.display}
                      </a>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Response time: 1-2 business days
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Exceptions</h2>
                  <p className="text-muted-foreground mb-4">
                    Refunds will not be provided in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Violation of our Terms of Service</li>
                    <li>Fraudulent transactions or chargebacks</li>
                    <li>
                      Products purchased more than 30 days ago (unless
                      defective)
                    </li>
                    <li>
                      Gift purchases (original purchaser must request refund)
                    </li>
                    <li>Bundle/promotional items may have modified terms</li>
                    <li>Items marked as "Final Sale" or "Non-Refundable"</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Chargebacks</h2>
                  <p className="text-muted-foreground mb-4">
                    If you believe there's an error with your charge, please
                    contact us first before initiating a chargeback with your
                    bank. We're committed to resolving issues quickly and
                    fairly.
                  </p>
                  <p className="text-muted-foreground">
                    Initiating a chargeback without contacting us first may
                    result in account suspension and collection of any amounts
                    owed.
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
}

export default RefundPolicy;

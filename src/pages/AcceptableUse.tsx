import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SITE } from "@/config/site";

function AcceptableUse() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Acceptable Use Policy"
        description="Review the acceptable and prohibited uses of InVision Network services."
      />
      <Navigation />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Acceptable Use Policy</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              This policy outlines the acceptable and prohibited uses of
              InVision Network's services and website.
            </p>

            <Card className="p-8 mb-8">
              <div className="space-y-10 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Purpose</h2>
                  <p className="text-muted-foreground">
                    This Acceptable Use Policy ("AUP") sets forth rules and
                    guidelines for using InVision Network's services, website,
                    and digital products. By using our services, you agree to
                    comply with this policy. Violations may result in suspension
                    or termination of your account.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Permitted Uses
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    You may use our services for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Accessing and using purchased products and services for
                      personal or business purposes
                    </li>
                    <li>
                      Attending training sessions and educational programs
                    </li>
                    <li>
                      Using ScamShield and other protection services for
                      legitimate security purposes
                    </li>
                    <li>
                      Submitting suspicious items for analysis as part of our
                      services
                    </li>
                    <li>
                      Communicating with our team for support and inquiries
                    </li>
                    <li>Sharing our public content with proper attribution</li>
                    <li>
                      Participating in community discussions and providing
                      feedback
                    </li>
                    <li>
                      Using our business services for legitimate commercial
                      purposes
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-500" />
                    Prohibited Activities
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    The following activities are strictly prohibited:
                  </p>

                  <h3 className="text-lg font-semibold mb-2 mt-6">
                    Illegal Activities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      Using our services to commit, plan, or promote any illegal
                      activity
                    </li>
                    <li>
                      Violating any federal, state, local, or international laws
                      or regulations
                    </li>
                    <li>
                      Engaging in money laundering, fraud, or other financial
                      crimes
                    </li>
                    <li>Distributing illegal content or materials</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">
                    Harmful Conduct
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      Harassing, threatening, or intimidating other users or our
                      staff
                    </li>
                    <li>Stalking, bullying, or engaging in abusive behavior</li>
                    <li>Impersonating any person, business, or entity</li>
                    <li>Spreading false information or defamatory content</li>
                    <li>
                      Discriminating based on race, gender, religion,
                      nationality, disability, or other protected
                      characteristics
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">
                    Security Violations
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      Attempting to gain unauthorized access to our systems or
                      other user accounts
                    </li>
                    <li>
                      Circumventing security measures, authentication systems,
                      or access controls
                    </li>
                    <li>
                      Transmitting viruses, malware, ransomware, or other
                      harmful code
                    </li>
                    <li>
                      Conducting denial-of-service attacks or overwhelming our
                      systems
                    </li>
                    <li>
                      Probing, scanning, or testing the vulnerability of our
                      systems without authorization
                    </li>
                    <li>
                      Intercepting or monitoring traffic without authorization
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">
                    Intellectual Property Violations
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      Copying, distributing, or reselling our courses, training
                      materials, or products without authorization
                    </li>
                    <li>
                      Removing or altering copyright notices or proprietary
                      markings
                    </li>
                    <li>
                      Infringing on patents, trademarks, trade secrets, or other
                      intellectual property rights
                    </li>
                    <li>
                      Using our brand, logo, or name without written permission
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">Service Abuse</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      Creating multiple accounts to abuse free trials or
                      promotions
                    </li>
                    <li>Sharing account credentials with unauthorized users</li>
                    <li>
                      Falsely claiming veteran or first responder status for
                      discounts
                    </li>
                    <li>Filing fraudulent refund requests or chargebacks</li>
                    <li>
                      Using automated systems (bots, scrapers) without
                      authorization
                    </li>
                    <li>Excessive API calls or system resource consumption</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-2">
                    Spam & Unwanted Communications
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Sending unsolicited bulk emails or messages</li>
                    <li>
                      Using our services to send spam or phishing attempts
                    </li>
                    <li>
                      Harvesting email addresses or contact information from our
                      platform
                    </li>
                    <li>
                      Advertising or promoting unrelated products or services
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                    Content Guidelines
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    When submitting content (reviews, testimonials, messages,
                    etc.), you agree not to post:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>False, misleading, or deceptive content</li>
                    <li>
                      Obscene, pornographic, or sexually explicit material
                    </li>
                    <li>Content promoting violence, self-harm, or terrorism</li>
                    <li>Hate speech or content that promotes discrimination</li>
                    <li>
                      Personal information of others without their consent
                    </li>
                    <li>Content that violates any third party's rights</li>
                    <li>Commercial solicitations or advertisements</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Enforcement</h2>
                  <p className="text-muted-foreground mb-4">
                    We reserve the right to investigate violations of this
                    policy and take appropriate action, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      <strong>Warning:</strong> For first-time or minor
                      violations
                    </li>
                    <li>
                      <strong>Suspension:</strong> Temporary removal of access
                      to services
                    </li>
                    <li>
                      <strong>Termination:</strong> Permanent account closure
                      without refund
                    </li>
                    <li>
                      <strong>Legal Action:</strong> Pursuing legal remedies for
                      serious violations
                    </li>
                    <li>
                      <strong>Reporting:</strong> Notifying law enforcement when
                      appropriate
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    The severity of the action will depend on the nature,
                    frequency, and impact of the violation.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Reporting Violations
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    If you become aware of any violation of this policy, please
                    report it to us immediately:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${SITE.emails.abuse}`}
                        className="text-primary hover:underline"
                      >
                        {SITE.emails.abuse}
                      </a>
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a
                        href={SITE.phone.tel}
                        className="text-primary hover:underline"
                      >
                        {SITE.phone.display}
                      </a>
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Please include as much detail as possible, including
                    screenshots, URLs, and dates of the violation.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="text-muted-foreground">
                    We may update this Acceptable Use Policy from time to time.
                    We will notify users of any material changes by posting the
                    new policy on our website. Your continued use of our
                    services after any changes indicates your acceptance of the
                    updated policy.
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

export default AcceptableUse;

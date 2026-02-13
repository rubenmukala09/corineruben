import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Shield, Phone, ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SITE } from "@/config/site";

function Disclaimer() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Disclaimer"
        description="Important information about the nature and limitations of InVision Network services."
      />
      <Navigation />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Disclaimer</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Important information about the nature of our services and
              limitations.
            </p>

            {/* Important Notice */}
            <Card className="p-6 mb-8 border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-amber-500 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold mb-2">Important Notice</h2>
                  <p className="text-muted-foreground">
                    Please read this disclaimer carefully before using InVision
                    Network's services. By using our services, you acknowledge
                    that you have read, understood, and agree to be bound by
                    this disclaimer.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 mb-8">
              <div className="space-y-10 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Educational Services Only
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    InVision Network provides{" "}
                    <strong>educational services only</strong>. We are not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Law enforcement or private investigators</li>
                    <li>Attorneys or legal advisors</li>
                    <li>Licensed cybersecurity professionals</li>
                    <li>Financial advisors or accountants</li>
                    <li>Medical or healthcare professionals</li>
                    <li>Insurance agents or adjusters</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Our services are designed to educate and inform, not to
                    replace professional legal, financial, medical, or law
                    enforcement services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    No Guarantee of Protection
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    While we strive to provide the best possible education and
                    tools for scam prevention,{" "}
                    <strong>
                      we cannot guarantee that you will not become a victim of
                      fraud or scams
                    </strong>
                    . Scammers constantly evolve their tactics, and even the
                    most vigilant individuals can be targeted.
                  </p>
                  <p className="text-muted-foreground">
                    Our training and tools are meant to reduce your risk, not
                    eliminate it entirely. Your individual results may vary
                    based on your circumstances, attention, and application of
                    the materials provided.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Phone className="h-6 w-6 text-red-500" />
                    Emergency Situations
                  </h2>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                    <p className="text-muted-foreground mb-4">
                      <strong>
                        If you are experiencing active fraud, identity theft, or
                        criminal activity:
                      </strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>
                        <strong>Contact local law enforcement (911)</strong> for
                        immediate threats
                      </li>
                      <li>
                        <strong>
                          Call your bank's fraud department immediately
                        </strong>{" "}
                        using the number on the back of your card
                      </li>
                      <li>
                        <strong>Report to the FTC</strong> at{" "}
                        <a
                          href="https://IdentityTheft.gov"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          IdentityTheft.gov
                        </a>
                      </li>
                      <li>
                        <strong>File a complaint with the FBI's IC3</strong> at{" "}
                        <a
                          href="https://ic3.gov"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          ic3.gov
                        </a>
                      </li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      <strong>Do not wait.</strong> Time is critical in fraud
                      situations. Act immediately.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Security Warning</h2>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground">
                        <strong>
                          InVision Network will NEVER ask you for:
                        </strong>
                      </p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                      <li>Your passwords or login credentials</li>
                      <li>Two-factor authentication (2FA) codes</li>
                      <li>Bank account numbers or PINs</li>
                      <li>
                        Credit card numbers (except through our secure checkout)
                      </li>
                      <li>Social Security numbers</li>
                      <li>Gift card numbers or activation codes</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      If anyone claiming to be from InVision Network asks for
                      this information, it is a scam. Please report it
                      immediately.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    No Professional Advice
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    The information provided through our services, website,
                    training programs, and educational materials is for general
                    informational purposes only and should not be considered:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>
                      <strong>Legal Advice:</strong> Consult a licensed attorney
                      for legal matters
                    </li>
                    <li>
                      <strong>Financial Advice:</strong> Consult a licensed
                      financial advisor for investment decisions
                    </li>
                    <li>
                      <strong>Tax Advice:</strong> Consult a CPA or tax
                      professional for tax matters
                    </li>
                    <li>
                      <strong>Medical Advice:</strong> Consult a healthcare
                      provider for health concerns
                    </li>
                    <li>
                      <strong>Cybersecurity Audit:</strong> Consult certified
                      security professionals for business security assessments
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    Always seek the advice of qualified professionals for
                    specific situations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Third-Party Links & Services
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Our website and services may contain links to third-party
                    websites, resources, or tools. These links are provided for
                    your convenience only. We do not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Control or endorse third-party content</li>
                    <li>Guarantee the accuracy of third-party information</li>
                    <li>
                      Accept responsibility for third-party privacy practices
                    </li>
                    <li>
                      Warrant that third-party sites are free from viruses or
                      malware
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Use third-party links at your own risk and review their
                    terms and privacy policies.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Testimonials & Success Stories
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Testimonials and success stories displayed on our website
                    represent individual experiences. They are:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Not guarantees of future results</li>
                    <li>
                      Based on the specific circumstances of each individual
                    </li>
                    <li>Possibly exceptional and not typical outcomes</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Your results may differ based on your effort, background,
                    and circumstances.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Accuracy of Information
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We make every effort to ensure the accuracy of information
                    on our website and in our materials. However:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Scam tactics and technology change rapidly</li>
                    <li>Information may become outdated</li>
                    <li>We cannot guarantee 100% accuracy at all times</li>
                    <li>Typographical or technical errors may occur</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    If you notice any errors or outdated information, please
                    contact us so we can update our materials.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Affiliate Disclosure
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Some links on our website may be affiliate links. This means
                    we may earn a commission if you make a purchase through
                    these links, at no additional cost to you. We only recommend
                    products and services we believe will add value to our
                    users.
                  </p>
                  <p className="text-muted-foreground">
                    Affiliate relationships do not influence our editorial
                    content or recommendations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    To the fullest extent permitted by law, InVision Network and
                    its owners, employees, partners, and affiliates shall not be
                    liable for any direct, indirect, incidental, special,
                    consequential, or punitive damages arising from:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Your use of or inability to use our services</li>
                    <li>Any errors or omissions in our content</li>
                    <li>
                      Any financial losses due to scams or fraud, regardless of
                      whether you used our services
                    </li>
                    <li>Any actions taken based on information we provide</li>
                    <li>Third-party actions or websites</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this disclaimer, please
                    contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href={`mailto:${SITE.emails.legal}`}
                        className="text-primary hover:underline"
                      >
                        {SITE.emails.legal}
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
                    <p>
                      <strong>Address:</strong> {SITE.name} LLC,{" "}
                      {SITE.location.areaLabel}, {SITE.location.region}
                    </p>
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

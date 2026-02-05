import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import ReadingProgressBar from "@/components/ReadingProgressBar";

function TermsOfService() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <ReadingProgressBar />
      <Navigation />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Terms of Service</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-center text-muted-foreground mb-12">
              By using InVision Network, you agree to these terms. Please read them carefully.
            </p>

            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                {[
                  "Acceptance of Terms", "Eligibility", "Description of Services", "Account Registration",
                  "Payment Terms", "Subscriptions & Auto-Renewal", "Refund Policy", "Acceptable Use",
                  "Intellectual Property", "User Content", "Disclaimer of Warranties", "Limitation of Liability",
                  "Indemnification", "Third-Party Services", "Privacy", "Modifications to Service",
                  "Termination", "Dispute Resolution", "Governing Law", "Contact"
                ].map((title, i) => (
                  <button key={i} onClick={() => scrollToSection(`tos-section-${i+1}`)} 
                    className="text-left text-primary hover:text-primary/80">
                    {i+1}. {title}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-8 mb-8">
              <div className="space-y-12 text-foreground">
                <section id="tos-section-1">
                  <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground mb-4">
                    By accessing or using InVision Network's website, services, products, or applications (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use our Services.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    These Terms constitute a legally binding agreement between you and InVision Network LLC ("Company," "we," "us," or "our"). We may update these Terms at any time by posting revisions on our website. Your continued use of the Services after any changes indicates your acceptance of the new Terms.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>IMPORTANT:</strong> These Terms contain a mandatory arbitration provision that requires the use of arbitration on an individual basis to resolve disputes, rather than jury trials or class actions. Please read Section 18 carefully.
                  </p>
                </section>

                <section id="tos-section-2">
                  <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
                  <p className="text-muted-foreground mb-4">
                    You must be at least 18 years of age to use our Services. By using the Services, you represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>You are at least 18 years of age</li>
                    <li>You have the legal capacity to enter into binding contracts</li>
                    <li>You are not barred from using the Services under applicable law</li>
                    <li>You will provide accurate and complete information during registration</li>
                    <li>If you are using the Services on behalf of an organization, you have authority to bind that organization to these Terms</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    If you are under 18, you may only use the Services with the involvement of a parent or guardian who agrees to be bound by these Terms.
                  </p>
                </section>

                <section id="tos-section-3">
                  <h2 className="text-2xl font-bold mb-4">3. Description of Services</h2>
                  <p className="text-muted-foreground mb-4">
                    InVision Network provides educational services, training programs, and technology solutions focused on AI security and scam prevention. Our Services include but are not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li><strong>ScamShield Protection:</strong> AI-powered scam detection and prevention services</li>
                    <li><strong>Training Programs:</strong> Individual and group classes on technology safety, scam awareness, and AI literacy</li>
                    <li><strong>Business Solutions:</strong> AI automation, website design, and security consulting for businesses</li>
                    <li><strong>Digital Products:</strong> Educational books, guides, and downloadable resources</li>
                    <li><strong>Physical Products:</strong> Security devices, printed materials, and merchandise</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    <strong>EDUCATIONAL PURPOSE ONLY:</strong> Our Services are educational in nature. We are NOT law enforcement, attorneys, licensed private investigators, financial advisors, or licensed cybersecurity professionals. We do not provide legal, financial, tax, or medical advice.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>NOT A SUBSTITUTE FOR EMERGENCY SERVICES:</strong> If you are experiencing active fraud, identity theft, or criminal activity, contact local law enforcement (911), your bank's fraud department immediately, and report to the FTC at IdentityTheft.gov.
                  </p>
                </section>

                <section id="tos-section-4">
                  <h2 className="text-2xl font-bold mb-4">4. Account Registration</h2>
                  <p className="text-muted-foreground mb-4">
                    To access certain features of our Services, you must create an account. When you create an account, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Keep your password confidential and secure</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Accept responsibility for all activities that occur under your account</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, not current, or incomplete, or if we reasonably believe that your account is being used fraudulently or in violation of these Terms.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Security:</strong> We will never ask you for your password, 2FA codes, bank account numbers, credit card numbers, or Social Security number via email, phone, or chat. Any such request is fraudulent.
                  </p>
                </section>

                <section id="tos-section-5">
                  <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
                  <p className="text-muted-foreground mb-4">
                    By purchasing any product or service from InVision Network, you agree to pay all applicable fees and charges. All payments are processed securely through Stripe, our third-party payment processor.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li><strong>Currency:</strong> All prices are listed in U.S. Dollars (USD) unless otherwise specified</li>
                    <li><strong>Taxes:</strong> You are responsible for any applicable taxes in your jurisdiction</li>
                    <li><strong>Payment Methods:</strong> We accept major credit cards, debit cards, Apple Pay, and Google Pay</li>
                    <li><strong>Authorization:</strong> You authorize us to charge your payment method for all fees and charges</li>
                    <li><strong>Declined Payments:</strong> We are not responsible if a transaction is declined by your bank or credit card company</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    <strong>Veteran Discount:</strong> We offer a 10% discount to verified veterans and first responders. Proof of service may be required. Fraudulent claims of veteran status will result in account termination and may be reported to appropriate authorities.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Pricing Changes:</strong> We reserve the right to change our prices at any time. Price changes for subscriptions will take effect at the beginning of the next billing cycle.
                  </p>
                </section>

                <section id="tos-section-6">
                  <h2 className="text-2xl font-bold mb-4">6. Subscriptions & Auto-Renewal</h2>
                  <p className="text-muted-foreground mb-4">
                    Some of our Services are offered on a subscription basis. By subscribing, you agree to the following:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li><strong>Billing Cycle:</strong> Subscriptions are billed monthly or annually, depending on your selected plan</li>
                    <li><strong>Auto-Renewal:</strong> Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date</li>
                    <li><strong>Cancellation:</strong> You may cancel your subscription at any time through your account settings or by contacting support</li>
                    <li><strong>No Pro-Rated Refunds:</strong> If you cancel mid-cycle, you will retain access until the end of your current billing period but will not receive a pro-rated refund</li>
                  </ul>
                  <p className="text-muted-foreground">
                    <strong>Free Trials:</strong> If you sign up for a free trial, you will be automatically charged when the trial ends unless you cancel before the trial period expires.
                  </p>
                </section>

                <section id="tos-section-7">
                  <h2 className="text-2xl font-bold mb-4">7. Refund Policy</h2>
                  <p className="text-muted-foreground mb-4">
                    We want you to be satisfied with your purchase. Our refund policy is as follows:
                  </p>
                  <h3 className="text-lg font-semibold mb-2">Digital Products</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>30-day satisfaction guarantee from the date of purchase</li>
                    <li>Refund requests must include reason for dissatisfaction</li>
                    <li>Refunds are processed within 5-10 business days</li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2">Subscriptions</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>30-day money-back guarantee for new subscribers</li>
                    <li>Cancel anytime; access continues until end of billing period</li>
                    <li>No refunds for partial months after the 30-day guarantee period</li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2">Training Services</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Full refund if cancelled 48+ hours before scheduled session</li>
                    <li>50% refund if cancelled 24-48 hours before scheduled session</li>
                    <li>No refund for cancellations less than 24 hours or no-shows</li>
                    <li>Rescheduling available with 24+ hours notice</li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2">Physical Products</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>30-day return window from delivery date</li>
                    <li>Items must be unused and in original packaging</li>
                    <li>Customer is responsible for return shipping costs</li>
                    <li>Refund processed within 10 business days of receiving return</li>
                  </ul>
                  <p className="text-muted-foreground">
                    To request a refund, contact <a href="mailto:support@invisionnetwork.org" className="text-primary hover:underline">support@invisionnetwork.org</a> with your order number and reason for the request.
                  </p>
                </section>

                <section id="tos-section-8">
                  <h2 className="text-2xl font-bold mb-4">8. Acceptable Use</h2>
                  <p className="text-muted-foreground mb-4">
                    You agree not to use the Services for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Services. Prohibited activities include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Violating any applicable laws, regulations, or third-party rights</li>
                    <li>Transmitting any viruses, malware, or other malicious code</li>
                    <li>Attempting to gain unauthorized access to our systems or other users' accounts</li>
                    <li>Using the Services to harass, abuse, or harm others</li>
                    <li>Impersonating any person or entity, or falsely claiming affiliation</li>
                    <li>Interfering with the proper functioning of the Services</li>
                    <li>Scraping, data mining, or using automated systems to access the Services</li>
                    <li>Reselling or redistributing our Services without authorization</li>
                    <li>Using our Services to send spam or unsolicited communications</li>
                    <li>Engaging in any fraudulent activity, including falsely claiming veteran status</li>
                  </ul>
                </section>

                <section id="tos-section-9">
                  <h2 className="text-2xl font-bold mb-4">9. Intellectual Property</h2>
                  <p className="text-muted-foreground mb-4">
                    All content, features, and functionality of the Services (including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, software, course materials, and training content) are the exclusive property of InVision Network or our licensors and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>The "InVision Network" name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of InVision Network</li>
                    <li>You may not use our trademarks without our prior written permission</li>
                    <li>Course materials and training content are licensed for personal, non-commercial use only</li>
                    <li>You may not reproduce, distribute, modify, or create derivative works from our content</li>
                  </ul>
                  <p className="text-muted-foreground">
                    <strong>Limited License:</strong> We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal, non-commercial purposes in accordance with these Terms.
                  </p>
                </section>

                <section id="tos-section-10">
                  <h2 className="text-2xl font-bold mb-4">10. User Content</h2>
                  <p className="text-muted-foreground mb-4">
                    You may have the opportunity to submit or post content through our Services, including reviews, testimonials, comments, and feedback ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content for any purpose.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    You represent and warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>You own or have the necessary rights to submit the User Content</li>
                    <li>The User Content does not violate any third-party rights</li>
                    <li>The User Content is accurate and not misleading</li>
                    <li>The User Content does not contain any harmful, offensive, or illegal material</li>
                  </ul>
                </section>

                <section id="tos-section-11">
                  <h2 className="text-2xl font-bold mb-4">11. Disclaimer of Warranties</h2>
                  <p className="text-muted-foreground mb-4">
                    <strong>THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong> To the fullest extent permitted by law, InVision Network disclaims all warranties, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                    <li>Warranties that the Services will be uninterrupted, error-free, or secure</li>
                    <li>Warranties regarding the accuracy, reliability, or completeness of any information provided</li>
                    <li>Warranties that our Services will protect you from all scams or fraud</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    <strong>NO GUARANTEE OF RESULTS:</strong> We do not guarantee that our training, products, or services will prevent you from becoming a victim of fraud or scams. Your individual results may vary based on your circumstances, attention, and application of the materials.
                  </p>
                  <p className="text-muted-foreground">
                    Some jurisdictions do not allow the exclusion of certain warranties, so some of the above exclusions may not apply to you.
                  </p>
                </section>

                <section id="tos-section-12">
                  <h2 className="text-2xl font-bold mb-4">12. Limitation of Liability</h2>
                  <p className="text-muted-foreground mb-4">
                    <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, INVISION NETWORK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</strong>, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Loss of profits, revenue, data, or goodwill</li>
                    <li>Cost of substitute goods or services</li>
                    <li>Personal injury or property damage</li>
                    <li>Any matter beyond our reasonable control</li>
                    <li>Financial losses due to scams or fraud despite using our Services</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    <strong>MAXIMUM LIABILITY:</strong> In no event shall our total liability to you for all claims arising from or related to these Terms or the Services exceed the greater of (a) the amount you paid us in the twelve (12) months preceding the claim, or (b) one hundred dollars ($100.00).
                  </p>
                  <p className="text-muted-foreground">
                    These limitations apply regardless of the theory of liability and even if we have been advised of the possibility of such damages.
                  </p>
                </section>

                <section id="tos-section-13">
                  <h2 className="text-2xl font-bold mb-4">13. Indemnification</h2>
                  <p className="text-muted-foreground mb-4">
                    You agree to defend, indemnify, and hold harmless InVision Network, its officers, directors, employees, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any third-party rights</li>
                    <li>Your use of the Services</li>
                    <li>Any User Content you submit</li>
                    <li>Your negligent or wrongful conduct</li>
                  </ul>
                </section>

                <section id="tos-section-14">
                  <h2 className="text-2xl font-bold mb-4">14. Third-Party Services</h2>
                  <p className="text-muted-foreground mb-4">
                    Our Services may contain links to third-party websites or services that are not owned or controlled by InVision Network. We use the following third-party services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li><strong>Stripe:</strong> Payment processing</li>
                    <li><strong>Zoom:</strong> Virtual training sessions</li>
                    <li><strong>Google Analytics:</strong> Website analytics</li>
                    <li><strong>Various AI providers:</strong> AI-powered features</li>
                  </ul>
                  <p className="text-muted-foreground">
                    We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any third-party services.
                  </p>
                </section>

                <section id="tos-section-15">
                  <h2 className="text-2xl font-bold mb-4">15. Privacy</h2>
                  <p className="text-muted-foreground mb-4">
                    Your privacy is important to us. Our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> explains how we collect, use, and protect your personal information. By using our Services, you consent to the collection and use of your information as described in our Privacy Policy.
                  </p>
                  <p className="text-muted-foreground">
                    The Privacy Policy is incorporated into and made part of these Terms of Service.
                  </p>
                </section>

                <section id="tos-section-16">
                  <h2 className="text-2xl font-bold mb-4">16. Modifications to Service</h2>
                  <p className="text-muted-foreground mb-4">
                    We reserve the right to modify, suspend, or discontinue any part of the Services at any time, with or without notice. We may also impose limits on certain features or restrict access to parts of the Services.
                  </p>
                  <p className="text-muted-foreground">
                    We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Services.
                  </p>
                </section>

                <section id="tos-section-17">
                  <h2 className="text-2xl font-bold mb-4">17. Termination</h2>
                  <p className="text-muted-foreground mb-4">
                    We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                    <li>Breach of these Terms</li>
                    <li>Fraudulent or illegal activity</li>
                    <li>Non-payment of fees</li>
                    <li>Conduct that we determine is harmful to other users or our business</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    Upon termination:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Your right to use the Services will immediately cease</li>
                    <li>You must cease all use of downloaded materials</li>
                    <li>Provisions that by their nature should survive termination shall survive</li>
                    <li>We are not obligated to provide refunds upon termination for cause</li>
                  </ul>
                </section>

                <section id="tos-section-18">
                  <h2 className="text-2xl font-bold mb-4">18. Dispute Resolution & Arbitration</h2>
                  <p className="text-muted-foreground mb-4">
                    <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.</strong>
                  </p>
                  <h3 className="text-lg font-semibold mb-2">Informal Resolution</h3>
                  <p className="text-muted-foreground mb-4">
                    Before filing any claim, you agree to attempt to resolve any dispute by contacting us at <a href="mailto:legal@invisionnetwork.org" className="text-primary">legal@invisionnetwork.org</a>. We will attempt to resolve the dispute informally within 60 days.
                  </p>
                  <h3 className="text-lg font-semibold mb-2">Binding Arbitration</h3>
                  <p className="text-muted-foreground mb-4">
                    If we cannot resolve a dispute informally, you and InVision Network agree that any dispute, claim, or controversy arising out of or relating to these Terms or your use of the Services shall be resolved by binding individual arbitration administered by the American Arbitration Association ("AAA") in accordance with its Consumer Arbitration Rules.
                  </p>
                  <h3 className="text-lg font-semibold mb-2">Class Action Waiver</h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>YOU AND INVISION NETWORK AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.</strong>
                  </p>
                  <h3 className="text-lg font-semibold mb-2">Small Claims Exception</h3>
                  <p className="text-muted-foreground">
                    Notwithstanding the above, either party may seek relief in small claims court for disputes within the court's jurisdiction.
                  </p>
                </section>

                <section id="tos-section-19">
                  <h2 className="text-2xl font-bold mb-4">19. Governing Law</h2>
                  <p className="text-muted-foreground mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of the State of Ohio, United States, without regard to its conflict of law provisions.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy and any other legal notices published by us, constitute the entire agreement between you and InVision Network regarding the Services.
                  </p>
                </section>

                <section id="tos-section-20">
                  <h2 className="text-2xl font-bold mb-4">20. Contact</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> <a href="mailto:legal@invisionnetwork.org" className="text-primary hover:underline">legal@invisionnetwork.org</a></p>
                    <p><strong>Phone:</strong> (937) 301-8749</p>
                    <p><strong>Address:</strong> InVision Network LLC, Greater Dayton Area, OH</p>
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

export default TermsOfService;

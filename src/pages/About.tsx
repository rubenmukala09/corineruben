import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Lock, BookOpen, Users2, Shield, DollarSign, Award, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-about-new.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroImage}
        headline="Founded by Families, For Families"
        subheadline="After watching loved ones nearly lose thousands to AI-powered scams, we built InVision Network—the protection system we wish existed."
      />

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Our Story</h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                InVision Network was born from a close call. When our founder's mother nearly wired $10,000 to a scammer using a
                deepfake "grandson voice," we realized seniors weren't falling for old scams—they were being targeted by artificial
                intelligence so sophisticated it could mimic family members perfectly.
              </p>
              <p>
                The resources available? Either too technical, too condescending, or just generic "be careful" warnings. No real tools.
                No step-by-step scripts. No one treating seniors like the intelligent adults they are. So we created InVision Network:
                respectful education, actionable tools, and ongoing support—without the tech jargon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 shadow-medium">
            <blockquote className="text-2xl md:text-3xl font-bold text-center leading-relaxed text-foreground">
              "To empower 100,000 families with the knowledge and confidence to outsmart AI scammers—and help businesses use AI safely
              and effectively."
            </blockquote>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Respect Over Fear</h3>
                  <p className="text-muted-foreground">
                    We don't patronize. We don't use scare tactics. We educate with clarity and dignity.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Privacy is Sacred</h3>
                  <p className="text-muted-foreground">
                    We will NEVER ask for passwords, bank info, or Social Security numbers. Period.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Plain English, Always</h3>
                  <p className="text-muted-foreground">
                    No jargon. No tech-speak. Just clear, actionable guidance anyone can follow.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Community First</h3>
                  <p className="text-muted-foreground">
                    20% of profits go to free training for veterans, cancer patients, and underserved communities.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Community Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">500+</p>
              <p className="text-muted-foreground">Families Trained</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">$2M+</p>
              <p className="text-muted-foreground">in Fraud Prevented</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Free Sessions for Veterans</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-4xl font-bold gradient-text-primary mb-2">30+</p>
              <p className="text-muted-foreground">Cancer Patient Scholarships</p>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-lg text-muted-foreground">
              <strong>Our Mission:</strong> For every 10 training enrollments, we sponsor 1 FREE training seat for a senior in need
              through partnerships with local senior centers and churches.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Certifications & Partnerships</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-accent" />
                <span className="font-bold">BBB Accredited</span>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <span className="font-bold">Veteran-Owned Certified</span>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center gap-3">
                <Users2 className="w-8 h-8 text-accent" />
                <span className="font-bold">Ohio Small Business Association</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Service Areas</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-8 h-8 text-accent" />
                    <h3 className="text-2xl font-bold">Headquarters</h3>
                  </div>
                  <p className="text-xl mb-4">Dayton, Ohio</p>
                  <p className="text-muted-foreground mb-4">Local Service Areas:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Dayton</li>
                    <li>• Kettering</li>
                    <li>• Centerville</li>
                    <li>• Springboro</li>
                    <li>• Beavercreek</li>
                    <li>• Huber Heights</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-accent" />
                    <h3 className="text-2xl font-bold">Nationwide Service</h3>
                  </div>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Live Zoom training available to all 50 states</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>In-person training available nationwide (travel covered by InVision)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Family Scam Shield available anywhere</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-8">Want to Join Our Mission?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/training">BOOK TRAINING</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/contact">PARTNER WITH US</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/donate">DONATE A TRAINING SEAT</Link>
            </Button>
          </div>
          <p className="mt-6 text-white/90 text-lg">
            Questions? Call <a href="tel:9375551234" className="underline hover:text-white font-semibold">(937) 555-1234</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
